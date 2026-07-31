/**
 * ClearSMS.gs — Clears SMS Queue Rows in the Unified "RingCentralSMS" Sheet for ONDT
 */

/**
 * Clears rows in the RingCentralSMS sheet, optionally filtered by location.
 *
 * @param {string} [location] Optional location filter (e.g. "Fremont", "Tracy")
 */
function clearSMSSheet(location) {
  var ss = SpreadsheetApp.openById(NAVI_CONFIG.SPREADSHEETS.NAVI_OPS);
  var smsSheet = ss.getSheetByName(UNIFIED_SMS_SHEET_NAME);
  if (!smsSheet) throw new Error("Sheet not found: " + UNIFIED_SMS_SHEET_NAME);

  var lastRow = smsSheet.getLastRow();
  if (lastRow < 2) return;

  var lastCol = smsSheet.getLastColumn();

  if (!location) {
    // Clear all data rows from row 2 onward
    smsSheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
    Logger.log("Cleared all rows from " + UNIFIED_SMS_SHEET_NAME);
    return;
  }

  // Filtered clear by Location column
  var data = smsSheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  var headers = smsSheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var locColIdx = -1;

  for (var i = 0; i < headers.length; i++) {
    if (String(headers[i]).trim().toLowerCase() === "location") {
      locColIdx = i;
      break;
    }
  }

  if (locColIdx === -1) {
    smsSheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
    return;
  }

  var locStr = String(location).trim().toLowerCase();

  // Delete matching location rows from bottom to top to preserve indices
  for (var r = data.length - 1; r >= 0; r--) {
    var rowLoc = String(data[r][locColIdx] || "").trim().toLowerCase();
    if (rowLoc === locStr) {
      smsSheet.deleteRow(r + 2); // 1-based index (+2 for header and 0-index)
    }
  }

  Logger.log("Cleared rows for location: " + location + " in " + UNIFIED_SMS_SHEET_NAME);
}
