/**
 * Bulk SMS sender driven by the NAVI_OPS spreadsheet.
 *
 * Depends on RingCentralSMS.gs (uses sendSMS() and getProfile_()).
 *
 * Sheet structure (column order can change — looked up by header name):
 *   IID | EmployeeName | EmployeePhoneNumber | TextMessage |
 *   MessageStatus | SendBy | SentOn
 *
 * Behavior:
 *   - Iterates every data row of the chosen sheet.
 *   - Skips rows missing phone or text.
 *   - Skips rows already marked Sent/Delivered (so re-runs don't duplicate).
 *   - Sends via sendSMS() using the matching profile.
 *   - Writes MessageStatus, SendBy (the from-number), and SentOn (timestamp).
 */

var NAVI_OPS_SPREADSHEET_NAME = NAVI_OPS;

var LOCATION_CONFIG = {
  tracy:   { sheet: 'SMSTracy',   profile: 'tracy' },
  fremont: { sheet: 'SMSFremont', profile: 'fremont' }
};

/**
 * Send all pending messages for a location.
 *
 * @param {string} location "Tracy" or "Fremont"
 * @return {Object} summary { processed, sent, failed, skipped }
 */
function sendMessages(location) {
  if (!location) throw new Error('sendMessages requires a location (e.g. "Tracy" or "Fremont").');

  var key = String(location).toLowerCase();
  var cfg = LOCATION_CONFIG[key];
  if (!cfg) {
    throw new Error('Unknown location "' + location + '". Valid: ' +
                    Object.keys(LOCATION_CONFIG).join(', '));
  }

  var profile = cfg.profile;
  var creds = getProfile_(profile);
  var fromNumber = creds.fromNumber;
  if (!fromNumber || fromNumber.indexOf('X') !== -1) {
    throw new Error('Set "fromNumber" in RC_PROFILES.' + profile + ' to a real E.164 number.');
  }

  var ss = SpreadsheetApp.openById(NAVI_OPS);
  var sheetName=cfg.sheet;
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Sheet "' + sheetName + '" not found in ' + NAVI_OPS_SPREADSHEET_NAME + '.');
  }
  var range = sheet.getDataRange();
  var values = range.getValues();
  if (values.length < 2) {
    Logger.log('[%s] No data rows in sheet "%s".', location, cfg.sheet);
    return { processed: 0, sent: 0, failed: 0, skipped: 0 };
  }

  var headers = values[0];
  var col = _mapHeaders_(headers, [
    'IID', 'EmployeeName', 'EmployeePhoneNumber', 'TextMessage',
    'MessageStatus', 'SendBy', 'SentOn'
  ]);

  var summary = { processed: 0, sent: 0, failed: 0, skipped: 0 };

  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var rowNum = r + 1; // 1-based for sheet APIs
    var phone = String(row[col.EmployeePhoneNumber] || '').trim();
    var text  = String(row[col.TextMessage] || '').trim();
    var existingStatus = String(row[col.MessageStatus] || '').trim();
    var name = String(row[col.EmployeeName] || '').trim();

    // Skip totally blank rows.
    if (!phone && !text && !name) continue;

    summary.processed++;

    if (!phone || !text) {
      summary.skipped++;
      _writeRowResult_(sheet, rowNum, col,
        'Skipped: missing ' + (!phone ? 'phone' : 'text'), '', '');
      Logger.log('[%s] Row %s skipped — missing phone or text.', location, rowNum);
      continue;
    }

    // Skip only rows that already succeeded. Anything else (Pending,
    // SubmitRejected, DeliveryFailed, SendingFailed, blank, etc.) is re-attempted.
    var SKIP_STATUSES = ['Sent', 'Delivered', 'Success'];
    if (SKIP_STATUSES.indexOf(existingStatus) !== -1) {
      summary.skipped++;
      Logger.log('[%s] Row %s skipped — already %s.', location, rowNum, existingStatus);
      continue;
    }

    var to = _normalizePhone_(phone);
    var result;
    try {
      result = sendSMS(to, fromNumber, text, profile);
    } catch (e) {
      summary.failed++;
      _writeRowResult_(sheet, rowNum, col, 'Error: ' + e.message, fromNumber, new Date());
      Logger.log('[%s] Row %s ERROR: %s', location, rowNum, e.message);
      continue;
    }

    var statusToWrite = result.status || (result.result === 'Success' ? 'Sent' : 'SubmitRejected');
    _writeRowResult_(sheet, rowNum, col, statusToWrite, fromNumber, new Date());

    if (result.result === 'Success') {
      summary.sent++;
      Logger.log('[%s] Row %s %s — %s -> %s', location, rowNum, result.result, fromNumber, to);
    } else {
      summary.failed++;
      Logger.log('[%s] Row %s FAIL — %s', location, rowNum, result.message || result.status);
    }
  }

  Logger.log('[%s] Done. Processed=%s Sent=%s Failed=%s Skipped=%s',
             location, summary.processed, summary.sent, summary.failed, summary.skipped);
  return summary;
}

/**
 * Builds a {HeaderName: zeroBasedIndex} map and validates required headers exist.
 * Match is case-insensitive and whitespace-insensitive.
 */
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

/**
 * Writes MessageStatus / SendBy / SentOn for a single row.
 */
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

/**
 * Best-effort E.164 normalization for US numbers. Values starting with "+"
 * are kept as-is. Otherwise digits are extracted and a leading "+1" is added
 * (assuming US/CA).
 */
function _normalizePhone_(raw) {
  var s = String(raw).trim();
  if (s.charAt(0) === '+') return s;
  var digits = s.replace(/\D/g, '');
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits.charAt(0) === '1') return '+' + digits;
  return '+' + digits;
}

/* Convenience entry points to wire up to buttons / time-driven triggers. */
function sendMessagesTracy()   { return sendMessages('Tracy'); }
function sendMessagesFremont() { return sendMessages('Fremont'); }
