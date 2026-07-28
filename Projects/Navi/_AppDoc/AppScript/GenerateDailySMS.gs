/**
 * GenerateDailySMS.gs — Shift Confirmation SMS Payload Generator for ONDT
 * Writes payloads directly to the unified "RingCentralSMS" sheet with Location set.
 */

function generateDailySMS(location) {
  var loc = location || NAVI_CONFIG.DEFAULT_LOCATION;
  clearSMSSheet(loc);

  var ss = SpreadsheetApp.openById(NAVI_CONFIG.SPREADSHEETS.NAVI_OPS);

  var rosterSheetName = "Roster" + loc;
  var rosterSheet = ss.getSheetByName(rosterSheetName) || ss.getSheetByName("Roster");
  if (!rosterSheet) throw new Error("Roster sheet not found for location: " + loc);

  var smsSheet = ss.getSheetByName(UNIFIED_SMS_SHEET_NAME);
  if (!smsSheet) throw new Error("Sheet not found: " + UNIFIED_SMS_SHEET_NAME);

  var employeeSheet = ss.getSheetByName("Employee");
  if (!employeeSheet) throw new Error("Sheet not found: Employee");

  var rosterValues = rosterSheet.getDataRange().getValues();
  if (rosterValues.length < 2) return;
  var rosterHeaders = rosterValues[0];
  var rIdx = _buildIndex(rosterHeaders);

  _requireCols(rIdx, ["Date", "EmployeeID", "WorkType", "ReportingTime"], rosterSheetName);

  var empValues = employeeSheet.getDataRange().getValues();
  var eIdx = _buildIndex(empValues[0]);
  _requireCols(eIdx, ["EmployeeID", "Name", "Phone"], "Employee");

  var employeeMap = {};
  for (var i = 1; i < empValues.length; i++) {
    var row = empValues[i];
    var id = String(row[eIdx.EmployeeID] || "").trim();
    if (!id) continue;
    employeeMap[id] = {
      name: row[eIdx.Name] || "",
      phone: row[eIdx.Phone] || ""
    };
  }

  var tz = ss.getSpreadsheetTimeZone();
  var newRows = [];
  var sentBy = Session.getActiveUser().getEmail() || "system";
  var sentOn = new Date();

  var reportingLocationDefault = (loc === "Fremont") ? "44900 Industrial Dr Fremont CA" : "";

  for (var r = 1; r < rosterValues.length; r++) {
    var row = rosterValues[r];
    var workType = String(row[rIdx.WorkType] || "").trim();
    if (!workType) continue;

    var empId = String(row[rIdx.EmployeeID] || "").trim();
    if (!empId) continue;
    var emp = employeeMap[empId];
    if (!emp || !emp.phone) continue;

    var dateVal = row[rIdx.Date];
    var reportingTimeVal = row[rIdx.ReportingTime];
    var reportingLocation = (rIdx.ReportingLocation != null)
      ? String(row[rIdx.ReportingLocation] || "").trim()
      : "";

    var message = _buildMessage(
      loc,
      workType,
      dateVal,
      reportingTimeVal,
      reportingLocation || reportingLocationDefault,
      tz
    );
    if (!message) continue;

    newRows.push([
      Utilities.getUuid(),
      loc,
      emp.name,
      _normalizePhone(emp.phone),
      message,
      "Pending",
      sentBy,
      sentOn
    ]);
  }

  if (newRows.length === 0) return;

  var smsHeaders = smsSheet.getRange(1, 1, 1, smsSheet.getLastColumn()).getValues()[0];
  var sIdx = _buildIndex(smsHeaders);
  _requireCols(sIdx, ["IID", "Location", "EmployeeName", "EmployeePhoneNumber", "TextMessage", "MessageStatus", "SendBy", "SentOn"], UNIFIED_SMS_SHEET_NAME);

  var width = smsHeaders.length;
  var startRow = smsSheet.getLastRow() + 1;
  var output = [];
  for (var k = 0; k < newRows.length; k++) {
    var src = newRows[k];
    var line = new Array(width).fill("");
    line[sIdx.IID] = src[0];
    line[sIdx.Location] = src[1];
    line[sIdx.EmployeeName] = src[2];
    line[sIdx.EmployeePhoneNumber] = src[3];
    line[sIdx.TextMessage] = src[4];
    line[sIdx.MessageStatus] = src[5];
    line[sIdx.SendBy] = src[6];
    line[sIdx.SentOn] = src[7];
    output.push(line);
  }
  smsSheet.getRange(startRow, 1, output.length, width).setValues(output);
}

function _buildIndex(headerRow) {
  var idx = {};
  for (var i = 0; i < headerRow.length; i++) {
    var key = String(headerRow[i] || "").trim();
    if (key) idx[key] = i;
  }
  return idx;
}

function _requireCols(idx, cols, sheetName) {
  var missing = [];
  cols.forEach(function (c) {
    if (idx[c] == null) missing.push(c);
  });
  if (missing.length) {
    throw new Error("Missing columns in " + sheetName + ": " + missing.join(", "));
  }
}

function _normalizePhone(raw) {
  if (raw === null || raw === undefined) return "";
  var digits = String(raw).replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 11 && digits.charAt(0) === "1") {
    digits = digits.substring(1);
  }
  if (digits.length !== 10) return "+" + digits;
  return "+1" + digits;
}

function _formatDate(d, tz) {
  if (!d) return "";
  if (d instanceof Date) return Utilities.formatDate(d, tz, "MM/dd/yyyy");
  return String(d);
}

function _formatTime(t, tz) {
  if (t === null || t === undefined || t === "") return "";
  if (t instanceof Date) return Utilities.formatDate(t, tz, "h:mm a");
  return String(t);
}

function _buildMessage(location, workType, dateVal, reportingTimeVal, reportingLocation, tz) {
  var dateStr = _formatDate(dateVal, tz);
  var timeStr = _formatTime(reportingTimeVal, tz);

  if (location === "Fremont") {
    var fremontTypes = ["Route", "Operations", "Standby", "Helper"];
    if (fremontTypes.indexOf(workType) === -1) return "";
    return "This message is to confirm your shift for " + dateStr +
      " at " + timeStr +
      ". Reporting location is " + reportingLocation +
      ". Please reply to this message to confirm your shift. Thank you.";
  }

  if (location === "Tracy") {
    var tracyConfirmTypes = ["Route", "Ride Along", "Standby", "Operations"];
    if (tracyConfirmTypes.indexOf(workType) !== -1) {
      return "Please confirm your shift for tonight by 10 am today. Your reporting time is " +
        timeStr + " on (" + dateStr + ") at the " + reportingLocation + ".";
    }
    if (workType === "Dispatch Cancelled") {
      return "Your shift for tonight has been cancelled.";
    }
    return "";
  }

  return "This message is to confirm your shift for " + dateStr + " at " + timeStr + ". Please reply to confirm.";
}
