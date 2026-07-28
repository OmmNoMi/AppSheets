function _testClearSMSFremont() {
  clearSMSSheet("Fremont");
}

function _testClearSMSTracy() {
  clearSMSSheet("Tracy");
}

/**
 * Clears all data rows (from row 2 onward) in the SMS sheet for the given location.
 * Headers are preserved.
 *
 * @param {string} location - "Fremont" or "Tracy"
 */
function clearSMSSheet(location) {
  var smsSheetName;
  if (location === "Fremont") {
    smsSheetName = "SMSFremont";
  } else if (location === "Tracy") {
    smsSheetName = "SMSTracy";
  } else {
    throw new Error("Unsupported location: " + location);
  }

  var ss = SpreadsheetApp.openById(NAVI_OPS);
  var smsSheet = ss.getSheetByName(smsSheetName);
  if (!smsSheet) throw new Error("Sheet not found: " + smsSheetName);

  var lastRow = smsSheet.getLastRow();
  if (lastRow < 2) return;

  var lastCol = smsSheet.getLastColumn();
  smsSheet.getRange(2, 1, lastRow - 1, lastCol).clearContent();
}
