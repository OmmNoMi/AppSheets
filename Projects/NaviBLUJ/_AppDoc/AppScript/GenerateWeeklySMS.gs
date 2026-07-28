function _testGenerateWeeklySMSFremont() {
  generateWeeklySMS("Fremont", "2026-16");
}

function _testGenerateWeeklySMSTracy() {
  generateWeeklySMS("Tracy", "2026-16");
}

/**
 * Generates a weekly schedule SMS for each employee scheduled in the given
 * location and week, and writes them to the corresponding SMS sheet.
 *
 * @param {string} location   - "Fremont" or "Tracy"
 * @param {string} weekNumber - Value matching the Schedule sheet's "Week" column (e.g. "2026-16")
 */
function generateWeeklySMS(location, weekNumber) {
  clearSMSSheet(location);
  if (!weekNumber) throw new Error("weekNumber is required (e.g. '2026-16')");

  var smsSheetName;
  if (location === "Fremont") {
    smsSheetName = "SMSFremont";
  } else if (location === "Tracy") {
    smsSheetName = "SMSTracy";
  } else {
    throw new Error("Unsupported location: " + location);
  }

  var ss = SpreadsheetApp.openById(NAVI_OPS);

  var scheduleSheet = ss.getSheetByName("Schedule");
  if (!scheduleSheet) throw new Error("Sheet not found: Schedule");

  var smsSheet = ss.getSheetByName(smsSheetName);
  if (!smsSheet) throw new Error("Sheet not found: " + smsSheetName);

  if (smsSheet.getLastRow() > 1) {
    throw new Error(smsSheetName + " already has data. Please clear rows from row 2 onward before generating new SMS.");
  }

  var employeeSheet = ss.getSheetByName("Employee");
  if (!employeeSheet) throw new Error("Sheet not found: Employee");

  // ---- Schedule columns ----
  var schedValues = scheduleSheet.getDataRange().getValues();
  if (schedValues.length < 2) return;
  var schedHeaders = schedValues[0];
  var schIdx = _buildIndex(schedHeaders);
  _requireCols(schIdx, ["EmployeeID", "Week", "Date", "Status", "WorkType", "Location"], "Schedule");

  // ---- Employee map ----
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

  // ---- Group schedule rows by employee ----
  // employeeId -> { dayOfWeek (0=Sun..6=Sat) -> { date: Date, workType: string } }
  var byEmployee = {};

  for (var r = 1; r < schedValues.length; r++) {
    var row = schedValues[r];
    var rowLoc = String(row[schIdx.Location] || "").trim();
    if (rowLoc !== location) continue;

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

    var dow = dateObj.getDay(); // 0=Sun .. 6=Sat
    if (!byEmployee[empId]) byEmployee[empId] = {};
    byEmployee[empId][dow] = { date: dateObj, workType: dayWorkText };
  }

  // ---- Build messages ----
  var dayLabels = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  var sentBy = Session.getActiveUser().getEmail() || "system";
  var sentOn = new Date();
  var newRows = [];

  for (var empId2 in byEmployee) {
    var emp = employeeMap[empId2];
    if (!emp || !emp.phone) continue;

    var dayMap = byEmployee[empId2];

    // Determine Sunday of the week from any known date
    var anyDate = null;
    for (var d = 0; d < 7; d++) {
      if (dayMap[d]) { anyDate = dayMap[d].date; break; }
    }
    if (!anyDate) continue;
    var sunday = new Date(anyDate);
    sunday.setDate(sunday.getDate() - sunday.getDay());

    // Skip if no actual scheduled work this week
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
      emp.name,
      _normalizePhone(emp.phone),
      lines.join("\n"),
      "Pending",
      sentBy,
      sentOn
    ]);
  }

  if (newRows.length === 0) return;

  // ---- Write to SMS sheet using dynamic columns ----
  var smsHeaders = smsSheet.getRange(1, 1, 1, smsSheet.getLastColumn()).getValues()[0];
  var sIdx = _buildIndex(smsHeaders);
  _requireCols(sIdx, ["IID", "EmployeeName", "EmployeePhoneNumber", "TextMessage", "MessageStatus", "SendBy", "SentOn"], smsSheetName);

  var width = smsHeaders.length;
  var startRow = smsSheet.getLastRow() + 1;
  var output = [];
  for (var k = 0; k < newRows.length; k++) {
    var src = newRows[k];
    var line = new Array(width).fill("");
    line[sIdx.IID] = src[0];
    line[sIdx.EmployeeName] = src[1];
    line[sIdx.EmployeePhoneNumber] = src[2];
    line[sIdx.TextMessage] = src[3];
    line[sIdx.MessageStatus] = src[4];
    line[sIdx.SendBy] = src[5];
    line[sIdx.SentOn] = src[6];
    output.push(line);
  }
  smsSheet.getRange(startRow, 1, output.length, width).setValues(output);
}

// ---------- Helpers ----------

function _toDate(v, tz) {
  if (!v) return null;
  if (v instanceof Date) return v;
  // Try parsing strings like "4/16/2026" or "2026-04-16"
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
