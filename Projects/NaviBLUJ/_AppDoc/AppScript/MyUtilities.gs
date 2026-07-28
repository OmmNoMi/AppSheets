function clearReportData(sheet, sheetName) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    console.log(sheetName+" already empty or header-only");
    return;
  }
  sheet.deleteRows(2, lastRow - 1);
  console.log(`Cleared ${lastRow - 1} rows from `+sheetName);
}

function isBlank(value) {
  if (value === null || value === undefined) {
    return true;
  }

  // strings
  if (typeof value === "string") {
    return value.trim() === "";
  }

  // numbers are treated as not blank, even zero
  if (typeof value === "number") {
    return false;
  }

  // dates are not blank
  if (value instanceof Date && !isNaN(value)) {
    return false;
  }

  // fallback for other types
  return String(value).trim() === "";
}

function buildAdpToEmployeeMap_(employeeSheet, daslocation) {
  const empHeaders = getHeaderMap_(employeeSheet);
  requireHeaders_(empHeaders, ["EmployeeID", "ADPID", "EmployeeStatus", "Location"], "Employee");

  const last = employeeSheet.getLastRow();
  const values = employeeSheet.getRange(
    2,
    1,
    Math.max(0, last - 1),
    employeeSheet.getLastColumn()
  ).getValues();

  const desiredLocation = String(daslocation || "").trim().toLowerCase();
  const map = {};

  for (const row of values) {
    const empId = cellText_(row[empHeaders["EmployeeID"]]);
    const adpId = cellText_(row[empHeaders["ADPID"]]);
    const status = cellText_(row[empHeaders["EmployeeStatus"]]).toLowerCase();
    const location = cellText_(row[empHeaders["Location"]]).toLowerCase();

    if (!empId || !adpId) continue;
    if (status === "terminated") continue;
    if (location !== desiredLocation) continue;

    if (map[adpId]) {
      console.log(`Duplicate ADPID ${adpId} seen for ${map[adpId]} and ${empId}`);
    } else {
      map[adpId] = empId;
    }
  }

  return map;
}
