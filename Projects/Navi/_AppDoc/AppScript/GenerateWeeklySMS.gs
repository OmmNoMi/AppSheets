/**
 * GenerateWeeklySMS.gs — Schedule Notification Payload Generator for ONDT
 * Writes payloads to the unified "RingCentralSMS" sheet with Location set.
 */

function generateWeeklySMS(location, weekNumber) {
  var loc = location || NAVI_CONFIG.DEFAULT_LOCATION;
  clearSMSSheet(loc);

  if (!weekNumber) throw new Error("weekNumber is required (e.g. '2026-16')");

  var ss = SpreadsheetApp.openById(NAVI_CONFIG.SPREADSHEETS.NAVI_OPS);

  var scheduleSheet = ss.getSheetByName("Schedule");
  if (!scheduleSheet) throw new Error("Sheet not found: Schedule");

  var smsSheet = ss.getSheetByName(UNIFIED_SMS_SHEET_NAME);
  if (!smsSheet) throw new Error("Sheet not found: " + UNIFIED_SMS_SHEET_NAME);

  var employeeSheet = ss.getSheetByName("Employee");
  if (!employeeSheet) throw new Error("Sheet not found: Employee");

  var schedValues = scheduleSheet.getDataRange().getValues();
  if (schedValues.length < 2) return;
  var schedHeaders = schedValues[0];
  var schIdx = _buildIndex(schedHeaders);
  _requireCols(schIdx, ["EmployeeID", "Week", "Date", "Status", "WorkType", "Location"], "Schedule");

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
  var weekKey = String(weekNumber).trim();

  var byEmployee = {};

  for (var r = 1; r < schedValues.length; r++) {
    var row = schedValues[r];
    var rowLoc = String(row[schIdx.Location] || "").trim();
    if (loc && rowLoc.toLowerCase() !== loc.toLowerCase()) continue;

    var rowWeek = String(row[schIdx.Week] || "").trim();
    if (rowWeek !== weekKey) continue;

    var empId = String(row[schIdx.EmployeeID] || "").trim();
    if (!empId) continue;

    var dateVal = row[schIdx.Date];
    var dateObj = _toDate(dateVal, tz);
    if (!dateObj) continue;

    var status = String(row[schIdx.Status] || "").trim();
    var workType = String(row[schIdx.WorkType] || "").trim();

    var dayWorkText = "";
    if (status && status.toUpperCase() !== "OFF" && workType) {
      dayWorkText = workType;
    }

    var dow = dateObj.getDay();
    if (!byEmployee[empId]) byEmployee[empId] = {};
    byEmployee[empId][dow] = { date: dateObj, workType: dayWorkText };
  }

  var dayLabels = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  var sentBy = Session.getActiveUser().getEmail() || "system";
  var sentOn = new Date();
  var newRows = [];

  for (var empId2 in byEmployee) {
    var emp = employeeMap[empId2];
    if (!emp || !emp.phone) continue;

    var dayMap = byEmployee[empId2];

    var anyDate = null;
    for (var d = 0; d < 7; d++) {
      if (dayMap[d]) { anyDate = dayMap[d].date; break; }
    }
    if (!anyDate) continue;
    var sunday = new Date(anyDate);
    sunday.setDate(sunday.getDate() - sunday.getDay());

    var hasWork = false;
    for (var d2 = 0; d2 < 7; d2++) {
      if (dayMap[d2] && dayMap[d2].workType) { hasWork = true; break; }
    }
    if (!hasWork) continue;

    var lines = [];
    lines.push("You are scheduled to work the following days in the upcoming week:");
    lines.push("");

    for (var d3 = 0; d3 < 7; d3++) {
      if (!(dayMap[d3] && dayMap[d3].workType)) continue;
      var dayDate = new Date(sunday);
      dayDate.setDate(sunday.getDate() + d3);
      var mmdd = (dayDate.getMonth() + 1) + "/" + dayDate.getDate();
      lines.push(dayLabels[d3] + " " + mmdd + " - " + dayMap[d3].workType);
    }

    lines.push("");
    lines.push("Please confirm receipt.");

    newRows.push([
      Utilities.getUuid(),
      loc,
      emp.name,
      _normalizePhone(emp.phone),
      lines.join("\n"),
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

function _toDate(v, tz) {
  if (!v) return null;
  if (v instanceof Date) return v;
  var s = String(v).trim();
  if (!s) return null;
  var parts;
  if (s.indexOf("/") !== -1) {
    parts = s.split("/");
    if (parts.length === 3) {
      var m = parseInt(parts[0], 10);
      var d = parseInt(parts[1], 10);
      var y = parseInt(parts[2], 10);
      if (!isNaN(m) && !isNaN(d) && !isNaN(y)) return new Date(y, m - 1, d);
    }
  }
  if (s.indexOf("-") !== -1) {
    parts = s.split("-");
    if (parts.length === 3) {
      var y2 = parseInt(parts[0], 10);
      var m2 = parseInt(parts[1], 10);
      var d2 = parseInt(parts[2], 10);
      if (!isNaN(m2) && !isNaN(d2) && !isNaN(y2)) return new Date(y2, m2 - 1, d2);
    }
  }
  var ts = Date.parse(s);
  return isNaN(ts) ? null : new Date(ts);
}
