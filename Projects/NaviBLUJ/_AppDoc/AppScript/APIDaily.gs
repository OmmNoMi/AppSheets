function syncDailyAPIReportToEveryday() {
  var ssOps = SpreadsheetApp.openById(NAVI_OPS);
  var ssFleet = SpreadsheetApp.openById(NAVI_FLEET_ID);

  var EVERYDAY_SHEET_NAME = "Everyday";

  // control whether AppLogout from API should be pushed
  var PUSH_LOGOUT_FROM_API = false;

  var dailySheet = ssOps.getSheetByName("DailyAPIReport");
  var everydaySheet = ssOps.getSheetByName(EVERYDAY_SHEET_NAME);
  var employeeSheet = ssOps.getSheetByName("Employee");
  var fleetSheet = ssFleet.getSheetByName("Fleet");

  if (!dailySheet || !everydaySheet || !employeeSheet || !fleetSheet) {
    throw new Error("One of the required sheets is missing");
  }

  var DAILY = {
    date: "Date",
    vin: "vinNumber",
    appLogin: "AppLogin",
    mealIn: "MealIn",
    mealOut: "MealOut",
    appLogout: "AppLogout",
    transporterId: "transporterId",
    workPhone: "workPhoneNumber"
  };

  var EV = {
    date: "Date",
    employeeId: "EmployeeID",
    fleetId: "FleetID",
    inventory: "Inventory",
    appLogin: "AppLogin",
    amazonMealIn: "AmazonMealIn",
    amazonMealOut: "AmazonMealOut",
    appLogout: "AppLogout",
    notes: "Notes"
  };

  var EMP = {
    employeeId: "EmployeeID",
    transporterId: "TransporterID",
    status: "EmployeeStatus",
    name: "Name"
  };

  var FLEET = {
    vin: "VIN",
    fleetId: "FleetID"
  };

  function idx(headers, label, context) {
    var i = headers.indexOf(label);
    if (i === -1) {
      throw new Error("Column " + label + " not found in " + context);
    }
    return i;
  }

  function isBlank(v) {
    return v === null || v === "" || v.toString().trim() === "";
  }

  function sourceIsBlank(v) {
    if (v === null || v === "") return true;
    if (v instanceof Date) return false;
    var t = v.toString().trim();
    if (t === "") return true;
    if (t.toLowerCase() === "missing") return true;
    return false;
  }

  function formatTimeOnly(val) {
    if (val instanceof Date) {
      return Utilities.formatDate(val, Session.getScriptTimeZone(), "h:mm a");
    }
    if (val === null || val === "") return "";
    return val.toString().trim();
  }

  function cleanString(val) {
    if (val === null || val === "") return "";
    var t = val.toString().trim();
    if (t.toLowerCase() === "missing") return "";
    return t;
  }

  function parseMDY(val) {
    if (val instanceof Date) {
      return new Date(val.getFullYear(), val.getMonth(), val.getDate());
    }
    if (typeof val === "string" && val.indexOf("/") !== -1) {
      var p = val.split("/");
      if (p.length === 3) {
        var m = parseInt(p[0], 10) - 1;
        var d = parseInt(p[1], 10);
        var y = parseInt(p[2], 10);
        if (!isNaN(m) && !isNaN(d) && !isNaN(y)) {
          return new Date(y, m, d);
        }
      }
    }
    return null;
  }

  function keyDateEmp(dateObj, empId) {
    var ds = Utilities.formatDate(dateObj, Session.getScriptTimeZone(), "MM/dd/yyyy");
    return ds + "||" + empId.toString().trim();
  }

  function pushValueIfEmpty(row, colIndex, sourceVal, fieldName, logPrefix, rowNumber) {
    if (!isBlank(row[colIndex])) {
      return false;
    }
    if (sourceIsBlank(sourceVal)) {
      return false;
    }
    var formatted = formatTimeOnly(sourceVal);
    if (formatted === "") {
      return false;
    }
    row[colIndex] = formatted;
    Logger.log(
      logPrefix +
      " row " + rowNumber +
      " set " + fieldName +
      " to " + formatted
    );
    return true;
  }

  // Employee mapping
  var empData = employeeSheet.getDataRange().getValues();
  if (empData.length < 2) {
    Logger.log("Employee sheet has no data rows");
    return;
  }
  var empHdr = empData[0];
  var empIdCol = idx(empHdr, EMP.employeeId, "Employee");
  var empTransCol = idx(empHdr, EMP.transporterId, "Employee");
  var empStatusCol = idx(empHdr, EMP.status, "Employee");
  var empNameCol = idx(empHdr, EMP.name, "Employee");

  var transporterToEmp = {};
  var empIdToName = {};

  for (var i = 1; i < empData.length; i++) {
    var er = empData[i];
    var status = (er[empStatusCol] || "").toString().trim().toLowerCase();
    if (status !== "terminated") {
      var eId = er[empIdCol];
      var tId = er[empTransCol];
      var eName = er[empNameCol];
      if (!isBlank(eId) && !isBlank(tId)) {
        var eKey = eId.toString().trim();
        var tKey = tId.toString().trim();
        transporterToEmp[tKey] = eKey;
        empIdToName[eKey] = eName || "";
      }
    }
  }

  // Fleet mapping from Navi Fleet file
  var fleetData = fleetSheet.getDataRange().getValues();
  if (fleetData.length < 2) {
    Logger.log("Fleet sheet has no data rows");
    return;
  }
  var fleetHdr = fleetData[0];
  var fVinCol = idx(fleetHdr, FLEET.vin, "Fleet");
  var fFleetIdCol = idx(fleetHdr, FLEET.fleetId, "Fleet");

  var vinToFleetId = {};
  for (var f = 1; f < fleetData.length; f++) {
    var fr = fleetData[f];
    var vin = fr[fVinCol];
    var fleetId = fr[fFleetIdCol];
    if (!isBlank(vin) && !isBlank(fleetId)) {
      vinToFleetId[vin.toString().trim()] = fleetId;
    }
  }

  // DailyAPIReport index by Date plus EmployeeID
  var dData = dailySheet.getDataRange().getValues();
  if (dData.length < 2) {
    Logger.log("DailyAPIReport has no data rows");
    return;
  }
  var dHdr = dData[0];
  var dDateCol = idx(dHdr, DAILY.date, "DailyAPIReport");
  var dVinCol = idx(dHdr, DAILY.vin, "DailyAPIReport");
  var dAppLoginCol = idx(dHdr, DAILY.appLogin, "DailyAPIReport");
  var dMealInCol = idx(dHdr, DAILY.mealIn, "DailyAPIReport");
  var dMealOutCol = idx(dHdr, DAILY.mealOut, "DailyAPIReport");
  var dAppLogoutCol = idx(dHdr, DAILY.appLogout, "DailyAPIReport");
  var dTransCol = idx(dHdr, DAILY.transporterId, "DailyAPIReport");
  var dPhoneCol = idx(dHdr, DAILY.workPhone, "DailyAPIReport");

  var dailyIndex = {};

  for (var j = 1; j < dData.length; j++) {
    var dr = dData[j];
    var dt = parseMDY(dr[dDateCol]);
    var trans = dr[dTransCol];

    if (!dt || isBlank(trans)) {
      continue;
    }

    var empId = transporterToEmp[trans.toString().trim()];
    if (!empId) {
      continue;
    }

    var k = keyDateEmp(dt, empId);

    var appLoginRaw = dr[dAppLoginCol];
    var mealInRaw = dr[dMealInCol];
    var mealOutRaw = dr[dMealOutCol];
    var appLogoutRaw = dr[dAppLogoutCol];
    var vinRaw = dr[dVinCol];
    var phoneRaw = dr[dPhoneCol];

    var vinClean = cleanString(vinRaw);
    var phoneClean = cleanString(phoneRaw);

    if (!dailyIndex[k]) {
      dailyIndex[k] = {
        appLogin: null,
        mealIn: null,
        mealOut: null,
        appLogout: null,
        vin: "",
        phone: ""
      };
    }

    if (!sourceIsBlank(appLoginRaw)) dailyIndex[k].appLogin = appLoginRaw;
    if (!sourceIsBlank(mealInRaw)) dailyIndex[k].mealIn = mealInRaw;
    if (!sourceIsBlank(mealOutRaw)) dailyIndex[k].mealOut = mealOutRaw;
    if (!sourceIsBlank(appLogoutRaw)) dailyIndex[k].appLogout = appLogoutRaw;
    if (vinClean !== "") dailyIndex[k].vin = vinClean;
    if (phoneClean !== "") dailyIndex[k].phone = phoneClean;
  }

  // Everyday last two hundred rows
  var evLastRow = everydaySheet.getLastRow();
  if (evLastRow < 2) {
    Logger.log("Everyday sheet has no data rows");
    return;
  }

  var maxRows = 200;
  var totalDataRows = evLastRow - 1;
  var rowsToRead = totalDataRows > maxRows ? maxRows : totalDataRows;
  var startRow = evLastRow - rowsToRead + 1;

  var evLastCol = everydaySheet.getLastColumn();
  var evRange = everydaySheet.getRange(startRow, 1, rowsToRead, evLastCol);
  var evData = evRange.getValues();
  var evHdr = everydaySheet.getRange(1, 1, 1, evLastCol).getValues()[0];

  var evDateCol = idx(evHdr, EV.date, EVERYDAY_SHEET_NAME);
  var evEmpIdCol = idx(evHdr, EV.employeeId, EVERYDAY_SHEET_NAME);
  var evFleetCol = idx(evHdr, EV.fleetId, EVERYDAY_SHEET_NAME);
  var evInventoryCol = idx(evHdr, EV.inventory, EVERYDAY_SHEET_NAME);
  var evAppLoginCol = idx(evHdr, EV.appLogin, EVERYDAY_SHEET_NAME);
  var evMealInCol = idx(evHdr, EV.amazonMealIn, EVERYDAY_SHEET_NAME);
  var evMealOutCol = idx(evHdr, EV.amazonMealOut, EVERYDAY_SHEET_NAME);
  var evAppLogoutCol = idx(evHdr, EV.appLogout, EVERYDAY_SHEET_NAME);
  var evNotesCol = idx(evHdr, EV.notes, EVERYDAY_SHEET_NAME);

  var updates = 0;

  for (var r = 0; r < evData.length; r++) {
    var row = evData[r];
    var eDate = parseMDY(row[evDateCol]);
    var eEmpId = row[evEmpIdCol];

    if (!eDate || isBlank(eEmpId)) {
      continue;
    }

    var key = keyDateEmp(eDate, eEmpId.toString().trim());
    var api = dailyIndex[key];
    if (!api) {
      continue;
    }

    var changedFields = [];
    var logPrefix = "Updating " + EVERYDAY_SHEET_NAME;

    if (pushValueIfEmpty(row, evAppLoginCol, api.appLogin, "AppLogin", logPrefix, startRow + r)) {
      updates++;
      changedFields.push("AppLogin");
    }
    if (pushValueIfEmpty(row, evMealInCol, api.mealIn, "AmazonMealIn", logPrefix, startRow + r)) {
      updates++;
      changedFields.push("AmazonMealIn");
    }
    if (pushValueIfEmpty(row, evMealOutCol, api.mealOut, "AmazonMealOut", logPrefix, startRow + r)) {
      updates++;
      changedFields.push("AmazonMealOut");
    }

    if (PUSH_LOGOUT_FROM_API) {
      if (pushValueIfEmpty(row, evAppLogoutCol, api.appLogout, "AppLogout", logPrefix, startRow + r)) {
        updates++;
        changedFields.push("AppLogout");
      }
    }

    if (isBlank(row[evFleetCol]) && api.vin !== "") {
      var fleetIdMatch = vinToFleetId[api.vin];
      if (!isBlank(fleetIdMatch)) {
        row[evFleetCol] = fleetIdMatch;
        updates++;
        changedFields.push("FleetID");
        Logger.log(
          logPrefix +
          " row " + (startRow + r) +
          " set FleetID to " + fleetIdMatch +
          " using VIN " + api.vin
        );
      }
    }

    // phone goes into Inventory column only if blank
    if (api.phone !== "" && isBlank(row[evInventoryCol])) {
      row[evInventoryCol] = api.phone;
      updates++;
      changedFields.push("InventoryPhone");
      Logger.log(
        logPrefix +
        " row " + (startRow + r) +
        " set Inventory to phone " + api.phone
      );
    }

    if (changedFields.length > 0) {
      var empName = empIdToName[eEmpId.toString().trim()] || eEmpId;
      var dateStr = Utilities.formatDate(eDate, Session.getScriptTimeZone(), "MM/dd/yyyy");
      Logger.log(
        "For " + dateStr +
        " updating " + empName +
        " with details: " +
        changedFields.join(", ")
      );
    }
  }

  if (updates > 0) {
    evRange.setValues(evData);
    Logger.log("Finished sync. Total fields updated " + updates);
  } else {
    Logger.log("No updates applied. Either no matching API rows or all target fields already filled");
  }
  clearReportData(dailySheet,"DailyAPIReport");
}
