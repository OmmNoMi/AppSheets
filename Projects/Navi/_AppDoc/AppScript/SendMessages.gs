/**
 * SendMessages.gs — Single-Table RingCentral SMS Dispatcher for ONDT
 * Works off the unified "RingCentralSMS" sheet with a "Location" column.
 */

var UNIFIED_SMS_SHEET_NAME = "RingCentralSMS";

/**
 * Send all pending messages, optionally filtered by location.
 *
 * @param {string} [locationFilter] Optional location name (e.g. "Fremont", "Tracy")
 * @return {Object} summary { processed, sent, failed, skipped }
 */
function sendMessages(locationFilter) {
  var targetLocation = locationFilter ? String(locationFilter).trim() : null;
  var profile = getProfileForLocation(targetLocation);

  var creds = getProfile_(profile);
  var fromNumber = creds.fromNumber;
  if (!fromNumber || fromNumber.indexOf('X') !== -1) {
    throw new Error('Set "fromNumber" in RC_PROFILES.' + profile + ' to a real E.164 number.');
  }

  var ss = SpreadsheetApp.openById(NAVI_CONFIG.SPREADSHEETS.NAVI_OPS);
  var sheet = ss.getSheetByName(UNIFIED_SMS_SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet "' + UNIFIED_SMS_SHEET_NAME + '" not found in spreadsheet.');
  }

  var range = sheet.getDataRange();
  var values = range.getValues();
  if (values.length < 2) {
    Logger.log('No data rows in sheet "%s".', UNIFIED_SMS_SHEET_NAME);
    return { processed: 0, sent: 0, failed: 0, skipped: 0 };
  }

  var headers = values[0];
  var col = _mapHeaders_(headers, [
    'IID', 'Location', 'EmployeeName', 'EmployeePhoneNumber', 'TextMessage',
    'MessageStatus', 'SendBy', 'SentOn'
  ]);

  var summary = { processed: 0, sent: 0, failed: 0, skipped: 0 };

  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var rowNum = r + 1;

    var rowLocation = String(row[col.Location] || '').trim();
    if (targetLocation && rowLocation.toLowerCase() !== targetLocation.toLowerCase()) {
      continue; // Filter by requested location
    }

    var phone = String(row[col.EmployeePhoneNumber] || '').trim();
    var text  = String(row[col.TextMessage] || '').trim();
    var existingStatus = String(row[col.MessageStatus] || '').trim();
    var name = String(row[col.EmployeeName] || '').trim();

    if (!phone && !text && !name) continue;

    summary.processed++;

    if (!phone || !text) {
      summary.skipped++;
      _writeRowResult_(sheet, rowNum, col, 'Skipped: missing ' + (!phone ? 'phone' : 'text'), '', '');
      continue;
    }

    var SKIP_STATUSES = ['Sent', 'Delivered', 'Success'];
    if (SKIP_STATUSES.indexOf(existingStatus) !== -1) {
      summary.skipped++;
      continue;
    }

    var rowProfile = getProfileForLocation(rowLocation || targetLocation);
    var rowCreds = getProfile_(rowProfile);
    var rowFromNumber = rowCreds.fromNumber || fromNumber;

    var to = _normalizePhone_(phone);
    var result;
    try {
      result = sendSMS(to, rowFromNumber, text, rowProfile);
    } catch (e) {
      summary.failed++;
      _writeRowResult_(sheet, rowNum, col, 'Error: ' + e.message, rowFromNumber, new Date());
      continue;
    }

    var statusToWrite = result.status || (result.result === 'Success' ? 'Sent' : 'SubmitRejected');
    _writeRowResult_(sheet, rowNum, col, statusToWrite, rowFromNumber, new Date());

    if (result.result === 'Success' || result.ok) {
      summary.sent++;
    } else {
      summary.failed++;
    }
  }

  Logger.log('Done. Processed=%s Sent=%s Failed=%s Skipped=%s',
             summary.processed, summary.sent, summary.failed, summary.skipped);
  return summary;
}

function sendAllPendingMessages() {
  return sendMessages(null);
}

function _mapHeaders_(headerRow, requiredHeaders) {
  var norm = function (s) { return String(s || '').trim().toLowerCase(); };
  var map = {};
  for (var i = 0; i < headerRow.length; i++) {
    var h = String(headerRow[i] || '').trim();
    if (h) map[norm(h)] = i;
  }
  var out = {};
  var missing = [];
  for (var j = 0; j < requiredHeaders.length; j++) {
    var name = requiredHeaders[j];
    var idx = map[norm(name)];
    if (idx === undefined) missing.push(name);
    else out[name] = idx;
  }
  if (missing.length) {
    throw new Error('Missing required column header(s): ' + missing.join(', '));
  }
  return out;
}

function _writeRowResult_(sheet, rowNum, col, status, sendBy, sentOn) {
  if (status !== undefined && status !== null) {
    sheet.getRange(rowNum, col.MessageStatus + 1).setValue(status);
  }
  if (sendBy !== undefined && sendBy !== null && sendBy !== '') {
    sheet.getRange(rowNum, col.SendBy + 1).setValue(sendBy);
  }
  if (sentOn !== undefined && sentOn !== null && sentOn !== '') {
    sheet.getRange(rowNum, col.SentOn + 1).setValue(sentOn);
  }
  SpreadsheetApp.flush();
}

function _normalizePhone_(raw) {
  var s = String(raw).trim();
  if (s.charAt(0) === '+') return s;
  var digits = s.replace(/\D/g, '');
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits.charAt(0) === '1') return '+' + digits;
  return '+' + digits;
}
