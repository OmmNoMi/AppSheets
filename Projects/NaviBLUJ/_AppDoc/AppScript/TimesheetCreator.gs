// ✅ Optimized version of _generateTimesheetPDF with timing logs
function _generateTimesheetPDF(location, startDateStr, enableLogging = false) {
  if (isTodayTimesheetSaturday()) {
    Logger.log("✅ Today is an timesheet Saturday.");
  } else {
    Logger.log("❌ Today is NOT an timesheet Saturday.");
    return;
  }
  const EMPLOYEE_SPREADSHEET_ID = "1DmHlAzrVXYWO9L8dnsLTSVF9opcepWz7lPPARfhO0Do";
  const MAIN_SPREADSHEET_ID = "1i-uiuU9JI7RwXgdI-IrwZQoZN1VjXMPboDNjN4FUN9o";
  const TEMPLATE_SHEET_NAME = "Duplicate";
  const EMPLOYEE_SHEET_NAME = "Employee";
  const TEMP_SPREADSHEET_FOLDER_ID = "1PO8xFBf1fkz_j0GBPO8QzyhPIV1fZdSR";
  const DESTINATION_FOLDER_ID = "1lOxYdkIDNbFXSbyAxYrT20jVjJMLyukZ";

  const excludedNames = [
    "Prabhjot Singh", "Daisy Rivera", "Bishnoi", "Elias Lopez Balmes",
    "Pawanjot Singh", "Kavleen Batra", "Arvinder Kaur"
  ];

  const timer = (label) => {
    const start = Date.now();
    return () => {
      const end = Date.now();
      const duration = ((end - start) / 1000).toFixed(2);
      if (enableLogging) Logger.log(`${label}: ${duration}s`);
    };
  };

  const startDate = getLocalDateFromString(startDateStr);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 13);

  const t_loadSheets = timer("🔹 Sheet & Template Load");
  const templateSS = SpreadsheetApp.openById(MAIN_SPREADSHEET_ID);
  const templateSheet = templateSS.getSheetByName(TEMPLATE_SHEET_NAME);
  const employeeSS = SpreadsheetApp.openById(EMPLOYEE_SPREADSHEET_ID);
  const employeeSheet = employeeSS.getSheetByName(EMPLOYEE_SHEET_NAME);
  const data = employeeSheet.getDataRange().getValues();
  t_loadSheets();

  const t_filter = timer("🔹 Employee Filter & Prep");
  const headers = data[0];
  const rows = data.slice(1);
  const colIndex = {};
  headers.forEach((col, i) => colIndex[col.trim()] = i);

  const COL_EMPLOYEE_STATUS = colIndex["EmployeeStatus"];
  const COL_LOCATION = colIndex["Location"];
  const COL_NAME = colIndex["Name"];
  const COL_ADPID = colIndex["ADPID"];

  if ([COL_EMPLOYEE_STATUS, COL_LOCATION, COL_NAME, COL_ADPID].some(i => i === undefined)) {
    throw new Error("Missing one or more required columns in the Employee sheet.");
  }

  const employees = rows
    .filter(row => {
      const status = row[COL_EMPLOYEE_STATUS];
      const empLocation = row[COL_LOCATION];
      const name = row[COL_NAME]?.toString().toLowerCase() || "";
      const shouldExclude = excludedNames.some(ex => name.includes(ex.toLowerCase()));
      return status !== "Terminated" && status !== "Start Termination" && status !== "Not Working" && empLocation === location && !shouldExclude;
    })
    .map(row => ({ name: row[COL_NAME], adpCode: row[COL_ADPID], startDate: new Date(startDate) }))
    .sort((a, b) => a.name.localeCompare(b.name));
  t_filter();

  if (enableLogging) Logger.log(`✅ Total Employees: ${employees.length}`);
  if (employees.length === 0) return;

  const t_createSS = timer("🔹 Spreadsheet Creation + Template Setup");
  const combinedSS = SpreadsheetApp.create("Combined Timesheets");
  const combinedSsId = combinedSS.getId();
  const tempFolder = DriveApp.getFolderById(TEMP_SPREADSHEET_FOLDER_ID);
  tempFolder.addFile(DriveApp.getFileById(combinedSsId));
  DriveApp.getRootFolder().removeFile(DriveApp.getFileById(combinedSsId));

  const payEndDate = new Date(startDate);
  payEndDate.setDate(startDate.getDate() + 13);

  const baseSheet = templateSheet.copyTo(combinedSS).setName("__BASE__");
  const dateValues = [];
  for (let i = 0; i < 14; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    dateValues.push([day]);
  }
  baseSheet.getRange(6, 1, 7, 1).setValues(dateValues.slice(0, 7));
  baseSheet.getRange(14, 1, 7, 1).setValues(dateValues.slice(7));

  const headerValues = [["", "", "", "", "Pay Start Date", startDate, "", "Pay End Date", payEndDate]];
  baseSheet.getRange("B3:J3").setValues(headerValues);
  t_createSS();

  const t_cloneSheets = timer("🔹 Employee Sheet Generation");
  employees.forEach((emp, index) => {
    const sheet = baseSheet.copyTo(combinedSS);
    const employeeValue = [[emp.name, "", "", " " + emp.adpCode]];
    sheet.getRange("B3:E3").setValues(employeeValue);
    sheet.setName((index + 1).toString());
  });
  t_cloneSheets();

  const t_cleanup = timer("🔹 Sheet Cleanup & PDF Export");
  combinedSS.deleteSheet(baseSheet);
  const defaultSheet = combinedSS.getSheetByName("Sheet1");
  if (defaultSheet) combinedSS.deleteSheet(defaultSheet);

  const filename = `Timesheets_${location}`;
  const pdfBlob = exportSpreadsheetAsLandscapePDF(combinedSsId, filename);
  const destFolder = DriveApp.getFolderById(DESTINATION_FOLDER_ID);
  const existing = destFolder.getFilesByName(filename + ".pdf");
  while (existing.hasNext()) existing.next().setTrashed(true);
  destFolder.createFile(pdfBlob);

  DriveApp.getFileById(combinedSsId).setTrashed(true);
  t_cleanup();

  if (enableLogging) Logger.log(`📄 PDF Created: ${filename}.pdf`);
}

function exportSpreadsheetAsLandscapePDF(fileId, pdfName) {
  const url = `https://docs.google.com/spreadsheets/d/${fileId}/export?` +
    `exportFormat=pdf&format=pdf&portrait=false&fitw=true&size=7` +
    `&sheetnames=false&printtitle=false&pagenumbers=false&gridlines=false&fzr=false`;

  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + token }
  });

  return response.getBlob().setName(`${pdfName}.pdf`);
}

function getUpcomingOrTodaySunday() {
  const tz = Session.getScriptTimeZone();
  const now = new Date();
  
  // This gives local date parts safely
  const localDateStr = Utilities.formatDate(now, tz, "yyyy-MM-dd");
  const dateParts = localDateStr.split("-");
  const localYear = parseInt(dateParts[0]);
  const localMonth = parseInt(dateParts[1]) - 1; // JS months are 0-based
  const localDay = parseInt(dateParts[2]);

  const localToday = new Date(localYear, localMonth, localDay); // Local midnight in correct TZ
  const dayOfWeek = localToday.getDay(); // 0 = Sunday, 6 = Saturday

  if (dayOfWeek === 0) {
    return localDateStr; // It's already Sunday
  } else {
    const nextSunday = new Date(localToday);
    nextSunday.setDate(localToday.getDate() + (7 - dayOfWeek));
    return Utilities.formatDate(nextSunday, tz, "yyyy-MM-dd");
  }
}

function isTodayTimesheetSaturday() {
  const alternateSaturdays = [
    "2025-07-26", "2025-08-09", "2025-08-23", "2025-09-06", "2025-09-20",
    "2025-10-04", "2025-10-18", "2025-11-01", "2025-11-15", "2025-11-29",
    "2025-12-13", "2025-12-27", "2026-01-10", "2026-01-24", "2026-02-07",
    "2026-02-21", "2026-03-07", "2026-03-21", "2026-04-04", "2026-04-18",
    "2026-05-02", "2026-05-16", "2026-05-30", "2026-06-13", "2026-06-27",
    "2026-07-11", "2026-07-25", "2026-08-08", "2026-08-22", "2026-09-05",
    "2026-09-19", "2026-10-03", "2026-10-17", "2026-10-31", "2026-11-14",
    "2026-11-28", "2026-12-12", "2026-12-26", "2027-01-09", "2027-01-23",
    "2027-02-06", "2027-02-20", "2027-03-06", "2027-03-20", "2027-04-03",
    "2027-04-17", "2027-05-01", "2027-05-15", "2027-05-29", "2027-06-12",
    "2027-06-26", "2027-07-10"
  ];

  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  return alternateSaturdays.includes(today);
}

function getLocalDateFromString(dateStr) {
  const parts = dateStr.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // months are 0-based
  const day = parseInt(parts[2], 10);

  return new Date(year, month, day); // Correct local midnight
}

function autoGenerateTimesheetForFremont() {
  const sundayDate = getUpcomingOrTodaySunday();
  _generateTimesheetPDF("Fremont", sundayDate, true);
}

function autoGenerateTimesheetForTracy() {
  const sundayDate = getUpcomingOrTodaySunday();
  _generateTimesheetPDF("Tracy", sundayDate, true);
}
