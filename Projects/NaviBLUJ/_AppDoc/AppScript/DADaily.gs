function updateEverydayFromDADaily() {
  var pushToEveryday = true;  // set false for dry run
  var MAX_EVERYDAY_ROWS = 200;

  var ss = SpreadsheetApp.openById(NAVI_OPS);
  var ssFleet = SpreadsheetApp.openById(NAVI_FLEET_ID);

  var employeeSheet = ss.getSheetByName("Employee");
  var everydaySheet = ss.getSheetByName("Everyday");
  var daDailySheet = ss.getSheetByName("DADaily");
  var fleetSheet = ssFleet.getSheetByName("Fleet");

  if (!employeeSheet || !everydaySheet || !daDailySheet) {
    throw new Error("Sheet missing. Required sheets: Employee, Everyday, DADaily.");
  }

  var EMPLOYEE_COLS = {
    employeeId: "EmployeeID",
    transporterId: "TransporterID",
    status: "EmployeeStatus",
    name: "Name"
  };

  var DADAILY_COLS = {
    transporterId: "Transporter Id",
    routeCode: "Route code",
    allStops: "All stops",
    totalPackages: "total packages",
    signIn: "App sign in:",
    signOut: "App sign out:",
    vin: "cortex_vin_number"  // VIN coming from DADaily
  };

  var EVERYDAY_COLS = {
    date: "Date",
    employeeId: "EmployeeID",
    route: "Route",
    stops: "Stops",
    pkgs: "PKGS",
    appLogin: "AppLogin",
    appLogout: "AppLogout",
    fleetId: "FleetID"        // assumes Everyday has FleetID column
  };

  var FLEET_COLS = {
    vin: "VIN",
    fleetId: "FleetID"
  };

  function getColIndex(headers, label, context) {
    var idx = headers.indexOf(label);
    if (idx === -1) {
      throw new Error("Column " + label + " not found in " + context + " sheet.");
    }
    return idx;
  }

  function cleanTimeValue(value) {
    if (!value) return "";
    var text = value.toString().trim().toLowerCase();
    return text === "missing" ? "" : value;
  }

  function parseDate(val) {
    if (val instanceof Date) {
      return new Date(val.getFullYear(), val.getMonth(), val.getDate());
    }
    if (typeof val === "string" && val.indexOf("/") !== -1) {
      var parts = val.split("/");
      if (parts.length === 3) {
        var month = parseInt(parts[0], 10) - 1;
        var day = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          return new Date(year, month, day);
        }
      }
    }
    return null;
  }

  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var todayStr = Utilities.formatDate(today, Session.getScriptTimeZone(), "MM/dd/yyyy");

  // Step 1: active EmployeeID to TransporterID map
  var empData = employeeSheet.getDataRange().getValues();
  if (empData.length < 2) return;

  var empHeaders = empData[0];
  var empIdCol = getColIndex(empHeaders, EMPLOYEE_COLS.employeeId, "Employee");
  var empTransporterCol = getColIndex(empHeaders, EMPLOYEE_COLS.transporterId, "Employee");
  var empStatusCol = getColIndex(empHeaders, EMPLOYEE_COLS.status, "Employee");
  var empNameCol = getColIndex(empHeaders, EMPLOYEE_COLS.name, "Employee");

  var empToTransporter = {};
  var empToName = {};

  for (var i = 1; i < empData.length; i++) {
    var row = empData[i];
    var status = (row[empStatusCol] || "").toString().trim().toLowerCase();
    if (status !== "terminated" && !isBlank(status)) {
      var empId = row[empIdCol];
      var transporterId = row[empTransporterCol];
      var empName = row[empNameCol];
      if (!isBlank(empId) && !isBlank(transporterId)) {
        empToTransporter[empId] = transporterId;
        empToName[empId] = empName || "Unknown";
      }
    }
  }

  // Step 2: read DADaily into maps including VIN
  var daData = daDailySheet.getDataRange().getValues();
  if (daData.length < 2) return;

  var daHeaders = daData[0];
  var daTransporterCol = getColIndex(daHeaders, DADAILY_COLS.transporterId, "DADaily");
  var daRouteCol = getColIndex(daHeaders, DADAILY_COLS.routeCode, "DADaily");
  var daAllStopsCol = getColIndex(daHeaders, DADAILY_COLS.allStops, "DADaily");
  var daTotalPkgsCol = getColIndex(daHeaders, DADAILY_COLS.totalPackages, "DADaily");
  var daSignInCol = getColIndex(daHeaders, DADAILY_COLS.signIn, "DADaily");
  var daSignOutCol = getColIndex(daHeaders, DADAILY_COLS.signOut, "DADaily");
  var daVinCol = getColIndex(daHeaders, DADAILY_COLS.vin, "DADaily");

  var transporterToInfo = {};
  var routeStats = {};

  for (var j = 1; j < daData.length; j++) {
    var daRow = daData[j];

    var tId = daRow[daTransporterCol];
    if (!isBlank(tId)) {
      if (!transporterToInfo[tId]) {
        transporterToInfo[tId] = {};
      }
      transporterToInfo[tId].signIn = cleanTimeValue(daRow[daSignInCol]);
      transporterToInfo[tId].signOut = cleanTimeValue(daRow[daSignOutCol]);

      var vinVal = daRow[daVinCol];
      if (!isBlank(vinVal)) {
        transporterToInfo[tId].vin = vinVal.toString().trim();
      }
    }

    var routeVal = daRow[daRouteCol];
    if (!isBlank(routeVal)) {
      var routeId = routeVal.toString().trim();
      if (!routeStats[routeId]) {
        routeStats[routeId] = { count: 0, row: null };
      }
      routeStats[routeId].count++;
      routeStats[routeId].row = daRow;
    }
  }

  var uniqueRoutes = {};
  for (var routeId in routeStats) {
    if (routeStats[routeId].count === 1) {
      var rRow = routeStats[routeId].row;
      uniqueRoutes[routeId] = {
        allStops: rRow[daAllStopsCol],
        totalPackages: rRow[daTotalPkgsCol]
      };
    }
  }

  // Step 3: Fleet mapping from NAVI Fleet file
  var vinToFleetId = {};
  if (fleetSheet) {
    var fleetData = fleetSheet.getDataRange().getValues();
    if (fleetData.length < 2) {
      Logger.log("Fleet sheet has no data rows");
    } else {
      var fleetHdr = fleetData[0];
      var fVinCol = getColIndex(fleetHdr, FLEET_COLS.vin, "Fleet");
      var fFleetIdCol = getColIndex(fleetHdr, FLEET_COLS.fleetId, "Fleet");

      for (var f = 1; f < fleetData.length; f++) {
        var fr = fleetData[f];
        var vin = fr[fVinCol];
        var fleetId = fr[fFleetIdCol];
        if (!isBlank(vin) && !isBlank(fleetId)) {
          vinToFleetId[vin.toString().trim()] = fleetId;
        }
      }
    }
  } else {
    Logger.log("Fleet sheet Fleet not found in fleet file");
  }

  // Step 4: process Everyday rows with detailed reasons
  var lastRowEv = everydaySheet.getLastRow();
  if (lastRowEv < 2) return;

  var lastColEv = everydaySheet.getLastColumn();

  var startRowEv = 2;
  var rowCountEv = lastRowEv - startRowEv + 1;
  if (rowCountEv > MAX_EVERYDAY_ROWS) {
    startRowEv = lastRowEv - MAX_EVERYDAY_ROWS + 1;
    rowCountEv = MAX_EVERYDAY_ROWS;
  }

  var everydayRange = everydaySheet.getRange(startRowEv, 1, rowCountEv, lastColEv);
  var everydayData = everydayRange.getValues();

  var everydayHeaders = everydaySheet.getRange(1, 1, 1, lastColEv).getValues()[0];
  var evDateCol = getColIndex(everydayHeaders, EVERYDAY_COLS.date, "Everyday");
  var evEmpIdCol = getColIndex(everydayHeaders, EVERYDAY_COLS.employeeId, "Everyday");
  var evRouteCol = getColIndex(everydayHeaders, EVERYDAY_COLS.route, "Everyday");
  var evStopsCol = getColIndex(everydayHeaders, EVERYDAY_COLS.stops, "Everyday");
  var evPkgsCol = getColIndex(everydayHeaders, EVERYDAY_COLS.pkgs, "Everyday");
  var evAppLoginCol = getColIndex(everydayHeaders, EVERYDAY_COLS.appLogin, "Everyday");
  var evAppLogoutCol = getColIndex(everydayHeaders, EVERYDAY_COLS.appLogout, "Everyday");
  var evFleetCol = everydayHeaders.indexOf(EVERYDAY_COLS.fleetId);

  var updated = false;
  var updatesCount = 0;

  var reasonDateNotToday = 0;
  var reasonNoEmployeeId = 0;
  var reasonNoMappedTransporter = 0;
  var reasonNoApplicableData = 0;
  var rowReasons = [];

  for (var r = 0; r < everydayData.length; r++) {
    var rowIndex = startRowEv + r;
    var rowEv = everydayData[r];

    var d = parseDate(rowEv[evDateCol]);
    if (!d || d.getTime() !== today.getTime()) {
      reasonDateNotToday++;
      rowReasons.push("Row " + rowIndex + ": date not today (" + (rowEv[evDateCol] || "") + ")");
      continue;
    }

    var evEmpId = rowEv[evEmpIdCol];
    if (isBlank(evEmpId)) {
      reasonNoEmployeeId++;
      rowReasons.push("Row " + rowIndex + ": missing EmployeeID");
      continue;
    }

    var mappedTransporterId = empToTransporter[evEmpId];
    if (!mappedTransporterId) {
      reasonNoMappedTransporter++;
      rowReasons.push("Row " + rowIndex + ": no active TransporterID mapping for EmployeeID " + evEmpId);
      continue;
    }

    var updatedFields = [];

    var info = transporterToInfo[mappedTransporterId] || {};

    // AppLogin and AppLogout
    if (!isBlank(info.signIn) && isBlank(rowEv[evAppLoginCol])) {
      rowEv[evAppLoginCol] = info.signIn;
      updatedFields.push("AppLogin");
    }

    if (!isBlank(info.signOut) && isBlank(rowEv[evAppLogoutCol])) {
      rowEv[evAppLogoutCol] = info.signOut;
      updatedFields.push("AppLogout");
    }

    // Route based updates if route valid and no pipe
    var evRouteVal = rowEv[evRouteCol];
    if (!isBlank(evRouteVal)) {
      var routeKey = evRouteVal.toString().trim();
      if (routeKey.indexOf("|") === -1) {
        var routeInfo = uniqueRoutes[routeKey];
        if (routeInfo) {
          if (isBlank(rowEv[evStopsCol]) && !isBlank(routeInfo.allStops)) {
            rowEv[evStopsCol] = routeInfo.allStops;
            updatedFields.push("Stops");
          }
          if (isBlank(rowEv[evPkgsCol]) && !isBlank(routeInfo.totalPackages)) {
            rowEv[evPkgsCol] = routeInfo.totalPackages;
            updatedFields.push("PKGS");
          }
        }
      }
    }

    // FleetID from VIN coming from DADaily map
    if (evFleetCol !== -1 && !isBlank(info.vin) && Object.keys(vinToFleetId).length > 0) {
      if (isBlank(rowEv[evFleetCol])) {
        var vinKey = info.vin;
        var fleetIdMatch = vinToFleetId[vinKey];
        if (!isBlank(fleetIdMatch)) {
          rowEv[evFleetCol] = fleetIdMatch;
          updatedFields.push("FleetID");
        }
      }
    }

    if (updatedFields.length > 0) {
      updated = true;
      updatesCount += updatedFields.length;
      var empName = empToName[evEmpId] || "Unknown";
      Logger.log("For " + todayStr + " updating " + empName + " with details: " + updatedFields.join(", "));
    } else {
      reasonNoApplicableData++;
      rowReasons.push(
        "Row " + rowIndex + ": no applicable new data (either already filled or no matching DADaily or Fleet data under rules)"
      );
    }
  }

  if (updated) {
    if (pushToEveryday) {
      everydayRange.setValues(everydayData);
      Logger.log("Updated " + updatesCount + " fields total for " + todayStr);
      // assuming clearReportData is defined elsewhere in your project
      clearReportData(daDailySheet, "DADaily");
    } else {
      Logger.log("pushToEveryday is false. " + updatesCount + " potential updates were detected but not written. DADaily not cleared.");
    }
  } else {
    Logger.log("No updates applied for " + todayStr + ". Detailed reasons:");
    Logger.log("Rows not for today: " + reasonDateNotToday);
    Logger.log("Rows with missing EmployeeID: " + reasonNoEmployeeId);
    Logger.log("Rows with no active TransporterID mapping: " + reasonNoMappedTransporter);
    Logger.log("Rows for today and mapped but no applicable new data: " + reasonNoApplicableData);
    for (var k = 0; k < rowReasons.length; k++) {
      Logger.log(rowReasons[k]);
    }
  }
}
