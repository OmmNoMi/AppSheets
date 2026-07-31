function updateEverydayFromRouteDaily() {
  var EVERYDAY_SHEET_NAME = "Everyday";
  var LIMIT_EVERYDAY_ROWS = 200;    // only last two hundred rows from Everyday
  var pushToEveryday = true;        // set false for dry run

  var ss = SpreadsheetApp.openById(NAVI_OPS);

  var routeDailySheet = ss.getSheetByName("RoutesDaily");
  var everydaySheet = ss.getSheetByName(EVERYDAY_SHEET_NAME);
  var employeeSheet = ss.getSheetByName("Employee");

  if (!routeDailySheet || !everydaySheet || !employeeSheet) {
    Logger.log("Missing RoutesDaily or Everyday2 or Employee sheet");
    return;
  }

  // build TransporterId to EmployeeId map for employees whose status is not Terminated
  var empRange = employeeSheet.getDataRange();
  var empValues = empRange.getValues();
  if (empValues.length < 2) {
    Logger.log("Employee sheet has no data rows");
    return;
  }

  var empHeaders = empValues[0];
  var empIdCol = getHeaderIndex_(empHeaders, "EmployeeID");
  var empTransporterCol = getHeaderIndex_(empHeaders, "TransporterID");
  var empStatusCol = getHeaderIndex_(empHeaders, "EmployeeStatus");

  if (empIdCol === -1 || empTransporterCol === -1 || empStatusCol === -1) {
    Logger.log("Employee sheet missing EmployeeID or TransporterID or EmployeeStatus");
    return;
  }

  var transporterToEmployee = {};

  for (var i = 1; i < empValues.length; i++) {
    var erow = empValues[i];
    var empId = erow[empIdCol];
    var transporterId = erow[empTransporterCol];
    var statusVal = erow[empStatusCol];

    if (!empId || !transporterId) {
      continue;
    }

    var statusStr = String(statusVal || "").toLowerCase();
    if (statusStr === "terminated") {
      continue;
    }

    var tKey = String(transporterId).trim();
    if (!tKey) {
      continue;
    }

    transporterToEmployee[tKey] = String(empId).trim();
  }

  if (Object.keys(transporterToEmployee).length === 0) {
    Logger.log("No active transporter to employee mappings found");
    return;
  }

  // read RoutesDaily
  var rdRange = routeDailySheet.getDataRange();
  var rdValues = rdRange.getValues();
  if (rdValues.length < 2) {
    Logger.log("RoutesDaily has no data rows");
    return;
  }

  var rdHeaders = rdValues[0];

  var rdRouteCodeCol = getHeaderIndex_(rdHeaders, "Route code");
  var rdRouteDurationCol = getHeaderIndex_(rdHeaders, "Route Duration");
  var rdAllStopsCol = getHeaderIndex_(rdHeaders, "All stops");
  var rdDateCol = getHeaderIndex_(rdHeaders, "Date");
  var rdTransporterCol = getHeaderIndex_(rdHeaders, "Transporter Id");

  if (rdRouteCodeCol === -1 || rdRouteDurationCol === -1 ||
      rdAllStopsCol === -1 || rdDateCol === -1 || rdTransporterCol === -1) {
    Logger.log("RoutesDaily missing Route code or Route Duration or All stops or Date or Transporter Id");
    return;
  }

  // read Everyday2 header and limit to last LIMIT_EVERYDAY_ROWS rows
  var lastRow = everydaySheet.getLastRow();
  var lastCol = everydaySheet.getLastColumn();

  if (lastRow < 2) {
    Logger.log("Everyday2 has no data rows");
    return;
  }

  var headerRange = everydaySheet.getRange(1, 1, 1, lastCol);
  var evHeaders = headerRange.getValues()[0];

  var evDateCol = getHeaderIndex_(evHeaders, "Date");
  var evEmpIdCol = getHeaderIndex_(evHeaders, "EmployeeID");
  var evRouteCol = getHeaderIndex_(evHeaders, "Route");
  var evRouteDurationCol = getHeaderIndex_(evHeaders, "RouteDuration");
  var evStopsCol = getHeaderIndex_(evHeaders, "Stops");

  if (evDateCol === -1 || evEmpIdCol === -1 ||
      evRouteCol === -1 || evRouteDurationCol === -1 || evStopsCol === -1) {
    Logger.log("Everyday2 missing Date or EmployeeId or Route or RouteDuration or Stops");
    return;
  }

  var dataRowCount = lastRow - 1; // excluding header
  var dataStartRow;
  if (dataRowCount <= LIMIT_EVERYDAY_ROWS) {
    dataStartRow = 2;
  } else {
    dataStartRow = lastRow - LIMIT_EVERYDAY_ROWS + 1;
  }
  var numRows = lastRow - dataStartRow + 1;

  var evRange = everydaySheet.getRange(dataStartRow, 1, numRows, lastCol);
  var evData = evRange.getValues();

  Logger.log("Processing Everyday2 rows from " + dataStartRow + " to " + lastRow + " total " + numRows + " rows");

  // build index of Everyday2 rows by Date key plus EmployeeId
  var everydayIndex = {};

  for (var r = 0; r < evData.length; r++) {
    var evRow = evData[r];
    var dateVal = evRow[evDateCol];
    var empIdVal = evRow[evEmpIdCol];

    if (!dateVal || !empIdVal) {
      continue;
    }

    var dKey = makeDateKey_(dateVal);
    if (!dKey) {
      continue;
    }

    var empIdStr = String(empIdVal).trim();
    if (!empIdStr) {
      continue;
    }

    var key = dKey + "||" + empIdStr;
    everydayIndex[key] = r;
  }

  var updatedCount = 0;

  // loop RoutesDaily rows and update Everyday2 by TransporterId and Date
  for (var j = 1; j < rdValues.length; j++) {
    var rdRow = rdValues[j];
    var routeCode = rdRow[rdRouteCodeCol];
    var routeDuration = rdRow[rdRouteDurationCol];
    var allStops = rdRow[rdAllStopsCol];
    var dateValRD = rdRow[rdDateCol];
    var transporterVal = rdRow[rdTransporterCol];

    if (!dateValRD || !transporterVal) {
      continue;
    }

    var dateKeyRD = makeDateKey_(dateValRD);
    if (!dateKeyRD) {
      continue;
    }

    var transporterKey = String(transporterVal).trim();
    if (!transporterKey) {
      continue;
    }

    var empIdForTransporter = transporterToEmployee[transporterKey];
    if (!empIdForTransporter) {
      continue;
    }

    var mapKey = dateKeyRD + "||" + empIdForTransporter;
    var evIndex = everydayIndex[mapKey];
    if (evIndex == null) {
      continue;
    }

    var eRow = evData[evIndex];
    var changed = false;

    // always override Route
    if (routeCode !== "" && routeCode != null) {
      eRow[evRouteCol] = routeCode;
      changed = true;
    }

    // always override RouteDuration and convert from minutes to HH colon MM colon SS
    if (routeDuration !== "" && routeDuration != null) {
      var converted = convertMinutesToHHMMSS_(routeDuration);
      eRow[evRouteDurationCol] = converted;
      changed = true;
    }

    // only fill Stops if blank
    if ((eRow[evStopsCol] === "" || eRow[evStopsCol] == null) &&
        allStops !== "" && allStops != null) {
      eRow[evStopsCol] = allStops;
      changed = true;
    }

    if (changed) {
      updatedCount++;
      Logger.log(
        "For " + dateKeyRD +
        " updating EmployeeId " + empIdForTransporter +
        " transporter " + transporterKey +
        " route " + routeCode +
        " RouteDuration=" + eRow[evRouteDurationCol] +
        " Stops=" + eRow[evStopsCol]
      );
    }
  }

  if (updatedCount === 0) {
    Logger.log("No updates applied. Either no matches or Everyday2 already had values");
  } else {
    Logger.log("Total rows updated in Everyday2 from RoutesDaily " + updatedCount);
  }

  if (pushToEveryday && updatedCount > 0) {
    evRange.setValues(evData);
    Logger.log("Everyday2 updated on sheet");
  } else if (!pushToEveryday && updatedCount > 0) {
    Logger.log("Dry run completed. Changes not written to Everyday2");
  }

  clearReportData(routeDailySheet,"RoutesDaily")
}

// get header index by exact text
function getHeaderIndex_(headers, name) {
  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim() === String(name).trim()) {
      return i;
    }
  }
  return -1;
}

// normalize date to a key string
function makeDateKey_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), "yyyy/MM/dd");
  }

  var d = new Date(value);
  if (!isNaN(d)) {
    return Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy/MM/dd");
  }

  if (value != null && value !== "") {
    return String(value).trim();
  }

  return "";
}

// convert minutes to HH colon MM colon SS
function convertMinutesToHHMMSS_(mins) {
  if (mins == null || mins === "") {
    return "";
  }

  var total = parseInt(mins, 10);
  if (isNaN(total)) {
    return String(mins);
  }

  var h = Math.floor(total / 60);
  var m = total % 60;
  var s = 0;

  return (
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    "00"
  );
}
