/**
 * RingCentral SMS sender for Google Apps Script — multi-profile, single file.
 *
 * Fill in the credentials for each profile (Tracy, Fremont, Recruitment) in
 * the RC_PROFILES block below. Then call:
 *
 *   sendSMS(toNumber, fromNumber, text, "tracy");
 *   sendSMS(toNumber, fromNumber, text, "fremont");
 *   sendSMS(toNumber, fromNumber, text, "recruitment");
 *
 * Or run one of the test functions at the bottom.
 */

var RC_PROFILES = {
  tracy: {
    "clientId": "5lCwGUtiusFb0Kt3BnjIjW",
    "clientSecret": "6hQWfi7Y1AEcrC2fjzWD7bfcu7JtX1tABcQiGmRzdXMb",
    "jwt": "eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLnJpbmdjZW50cmFsLmNvbS9yZXN0YXBpL29hdXRoL3Rva2VuIiwic3ViIjoiMzIzMzYwNDAxMSIsImlzcyI6Imh0dHBzOi8vcGxhdGZvcm0ucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozOTI1MzIxMjA3LCJpYXQiOjE3Nzc4Mzc1NjAsImp0aSI6Ik5pTmxTR2t2UkYyNVZZZDNtNzVVeHcifQ.dm_hB6gD8GH4aQMAk1m9rII3oD_qDW40U5I-Rm7ZYFDp2-jolq_brQNNFkxZYQDPMEKdZ43XlDEJj4Qt2Gjbr9OAAeAaJFlx2h-MDnbexije422pePEbvOeSUK_9RzBHbxckn8DbJWqo_wUXzEy3xKTUlHnMec06FpZlmNKCRuSKXXMxCgakTUA64BhAIU1dt7HKOPAk2kTbhbgxJAz8picTeR-olikwOTMYpZFXuVDrlpPRd7nJeGPtyFud47d3HWHj524YuG7-zL3i7ZnDtjBqIDO-_Vc9G8MK17XirGLrTbhzfhDuEOsPKwO4p04VmcjcNdjwCTwofuKcoWkLuA",
    server:       'https://platform.ringcentral.com',
    fromNumber:   '+12094446644'   // Tracy's RingCentral SMS number
  },
  fremont: {
    "clientId": "5lCwGUtiusFb0Kt3BnjIjW",
    "clientSecret": "6hQWfi7Y1AEcrC2fjzWD7bfcu7JtX1tABcQiGmRzdXMb",
    "jwt": "eyJraWQiOiI4NzYyZjU5OGQwNTk0NGRiODZiZjVjYTk3ODA0NzYwOCIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJodHRwczovL3BsYXRmb3JtLnJpbmdjZW50cmFsLmNvbS9yZXN0YXBpL29hdXRoL3Rva2VuIiwic3ViIjoiMzIzMzYwMzAxMSIsImlzcyI6Imh0dHBzOi8vcGxhdGZvcm0ucmluZ2NlbnRyYWwuY29tIiwiZXhwIjozOTI1MzIxOTgwLCJpYXQiOjE3Nzc4MzgzMzMsImp0aSI6IldSNEIyUlAxVFBxNXRQbE9aMkZvTkEifQ.YIRANVS_vF-_VL1TrnJKnymOrwRqUxZoHd1rB-mwY4ZJ_xBn1M0ldkikgaSEs5V-szTXbUe4Fq5Q-gkYWArrmI9pKDZeAabdXclggTc8o8KzPlCo0vaizgmV6I8xUsiLughc0xoPV1m4YvMb77YE-g-Zmq5Q-IlTzemFcm7-RFE678ytB9zzzXm9MSXEfF5yWpH7D24UYJrqR65M3KfCidiZrKwm5GFqZa2mUqM9MREvHc1dmyNQzP9Txbinzsj-MF-NWcQWuGP5ft8wwxThQ5mhZRwcB8QaAJnN1nyJVANJGNYm4avM8jIhNyt2s2iAWotJI9PeSR8pBQzx79U8BQ",
    server:       'https://platform.ringcentral.com',
    fromNumber:   '+15109038003'   // Fremont's RingCentral SMS number
  },
  recruitment: {
    clientId:     'PASTE_RECRUITMENT_CLIENT_ID',
    clientSecret: 'PASTE_RECRUITMENT_CLIENT_SECRET',
    jwt:          'PASTE_RECRUITMENT_JWT',
    server:       'https://platform.ringcentral.com',
    fromNumber:   '+15109038008'   // Recruitment's RingCentral SMS number
  }
};

// Default profile when sendSMS() is called without one.
var RC_DEFAULT_PROFILE = 'None';

/**
 * Sends an SMS using the given profile and returns the final delivery status.
 *
 * Returned object:
 *   {
 *     ok: true|false,
 *     status: "Sent"|"Delivered"|"DeliveryFailed"|"SendingFailed"|"Queued"|...,
 *     outcome: "sent"|"delivered"|"rejected"|"pending"|"unknown",
 *     messageId, profile, to, from, sendResponse, statusResponse
 *   }
 *
 * @param {string} toNumber   E.164 recipient
 * @param {string} fromNumber E.164 sender (must belong to the profile's user)
 * @param {string} text       Message body
 * @param {string} [profile]  "tracy" | "fremont" | "recruitment"  (default: RC_DEFAULT_PROFILE)
 * @return {Object}
 */
function sendSMS(toNumber, fromNumber, text, profile) {
  if (!toNumber || !fromNumber || !text) {
    throw new Error('sendSMS requires toNumber, fromNumber, and text.');
  }
  profile = profile || RC_DEFAULT_PROFILE;

  var creds = getProfile_(profile);
  var serverUrl = creds.server || 'https://platform.ringcentral.com';
  var accessToken = getAccessToken_(serverUrl, creds, profile);

  var url = serverUrl + '/restapi/v1.0/account/~/extension/~/sms';
  var payload = {
    from: { phoneNumber: fromNumber },
    to: [{ phoneNumber: toNumber }],
    text: text
  };

  var response = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + accessToken },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  var code = response.getResponseCode();
  var body = response.getContentText();
  if (code < 200 || code >= 300) {
    Logger.log('[%s] SMS submission rejected (HTTP %s): %s', profile, code, body);
    return {
      ok: false,
      status: 'SubmitRejected',
      outcome: 'rejected',
      httpStatus: code,
      profile: profile,
      to: toNumber,
      from: fromNumber,
      sendResponse: safeJsonParse_(body) || body
    };
  }

  var sendJson = JSON.parse(body);
  Logger.log('[%s] SMS submitted. Message id: %s, initial status: %s',
             profile, sendJson.id, sendJson.messageStatus);

  var finalStatus = pollMessageStatus_(serverUrl, accessToken, sendJson.id);
  var outcome = classifyMessageStatus_(finalStatus.messageStatus);

  Logger.log('[%s] SMS final status: %s (outcome: %s)',
             profile, finalStatus.messageStatus, outcome);

  return {
    ok: outcome === 'sent' || outcome === 'delivered',
    status: finalStatus.messageStatus,
    outcome: outcome,
    messageId: sendJson.id,
    profile: profile,
    to: toNumber,
    from: fromNumber,
    sendResponse: sendJson,
    statusResponse: finalStatus
  };
}

/**
 * Returns the credentials object for a profile, or throws if missing/unfilled.
 */
function getProfile_(profile) {
  var creds = RC_PROFILES[profile];
  if (!creds) {
    throw new Error('Unknown profile "' + profile + '". Valid: ' +
                    Object.keys(RC_PROFILES).join(', '));
  }
  if (!creds.clientId || !creds.clientSecret || !creds.jwt ||
      String(creds.clientId).indexOf('PASTE_') === 0 ||
      String(creds.clientSecret).indexOf('PASTE_') === 0 ||
      String(creds.jwt).indexOf('PASTE_') === 0) {
    throw new Error('Profile "' + profile +
      '" is not fully configured. Fill in clientId, clientSecret, and jwt in RC_PROFILES.');
  }
  return creds;
}

/**
 * Exchanges the personal JWT for an OAuth access token. Token cached per profile.
 */
function getAccessToken_(serverUrl, creds, profile) {
  var cache = CacheService.getScriptCache();
  var cacheKey = 'RC_ACCESS_TOKEN_' + profile;
  var cached = cache.get(cacheKey);
  if (cached) return cached;

  var tokenUrl = serverUrl + '/restapi/oauth/token';
  var basic = Utilities.base64Encode(creds.clientId + ':' + creds.clientSecret);

  var response = UrlFetchApp.fetch(tokenUrl, {
    method: 'post',
    headers: {
      Authorization: 'Basic ' + basic,
      Accept: 'application/json'
    },
    contentType: 'application/x-www-form-urlencoded',
    payload: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: creds.jwt
    },
    muteHttpExceptions: true
  });

  var code = response.getResponseCode();
  var body = response.getContentText();
  if (code < 200 || code >= 300) {
    throw new Error('[' + profile + '] RingCentral auth failed (HTTP ' + code + '): ' + body);
  }

  var json = JSON.parse(body);
  var expiresIn = Number(json.expires_in) || 3600;
  cache.put(cacheKey, json.access_token, Math.min(expiresIn - 60, 21000));
  return json.access_token;
}

/**
 * Polls /message-store/{id} until the message leaves "Queued".
 */
function pollMessageStatus_(serverUrl, accessToken, messageId) {
  var endpoint = serverUrl + '/restapi/v1.0/account/~/extension/~/message-store/' + messageId;
  var maxAttempts = 10;   // ~20 seconds total
  var delayMs = 2000;
  var last = null;

  for (var attempt = 1; attempt <= maxAttempts; attempt++) {
    var resp = UrlFetchApp.fetch(endpoint, {
      method: 'get',
      headers: { Authorization: 'Bearer ' + accessToken },
      muteHttpExceptions: true
    });
    var code = resp.getResponseCode();
    var body = resp.getContentText();
    if (code < 200 || code >= 300) {
      Logger.log('message-store fetch failed (HTTP %s): %s', code, body);
      return { messageStatus: 'Unknown', httpStatus: code, body: body };
    }
    last = JSON.parse(body);
    Logger.log('Poll %s/%s — status: %s', attempt, maxAttempts, last.messageStatus);
    if (last.messageStatus && last.messageStatus !== 'Queued') {
      return last;
    }
    Utilities.sleep(delayMs);
  }
  return last || { messageStatus: 'Unknown' };
}

function classifyMessageStatus_(status) {
  switch (status) {
    case 'Sent':            return 'sent';
    case 'Delivered':       return 'delivered';
    case 'DeliveryFailed':
    case 'SendingFailed':   return 'rejected';
    case 'Queued':          return 'pending';
    default:                return 'unknown';
  }
}

function safeJsonParse_(text) {
  try { return JSON.parse(text); } catch (e) { return null; }
}

/* ──────────────────────────────────────────────────────────────────────────
 *  TEST FUNCTIONS — one per profile. All send to +15103712335.
 *  Each uses the "fromNumber" defined in its RC_PROFILES entry.
 * ────────────────────────────────────────────────────────────────────────── */

function _testSendSMSTo5103712335_Tracy() {
  return _runTestSend_('tracy', '+16823131796',
    'Hello from Tracy via Apps Script! (test message)');
}

function _testSendSMSTo5103712335_Fremont() {
  return _runTestSend_('fremont', '+15103712335',
    'Hello from Fremont via Apps Script! (test message)');
}

function _testSendSMSTo5103712335_Recruitment() {
  return _runTestSend_('recruitment', '+15103712335',
    'Hello from Recruitment via Apps Script! (test message)');
}

function _runTestSend_(profile, toNumber, text) {
  var creds = getProfile_(profile);
  var fromNumber = creds.fromNumber;
  if (!fromNumber || fromNumber.indexOf('X') !== -1) {
    throw new Error('Set "fromNumber" in RC_PROFILES.' + profile + ' to a real E.164 number.');
  }

  var result = sendSMS(toNumber, fromNumber, text, profile);
  Logger.log('[%s] Outcome: %s | Status: %s | Message id: %s',
             profile, result.outcome, result.status, result.messageId);
  Logger.log('[%s] Full result: %s', profile, JSON.stringify(result, null, 2));
  return result;
}
