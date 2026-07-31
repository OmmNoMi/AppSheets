/**
 * RingCentral.gs — RingCentral SMS sender for ONDT / White-Label AppSheets
 * Configurable multi-profile auth powered by NaviConfig.gs
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

/**
 * Sends an SMS using the given profile (or resolved location) and returns delivery status.
 */
function sendSMS(toNumber, fromNumber, text, profile) {
  if (!toNumber || !text) {
    throw new Error('sendSMS requires toNumber and text.');
  }

  profile = profile || NAVI_CONFIG.DEFAULT_PROFILE;
  var creds = getProfile_(profile);
  fromNumber = fromNumber || creds.fromNumber;
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

function getProfile_(profile) {
  var creds = RC_PROFILES[profile];
  if (!creds) {
    creds = RC_PROFILES[NAVI_CONFIG.DEFAULT_PROFILE];
  }
  if (!creds || !creds.clientId || String(creds.clientId).indexOf('PASTE_') === 0) {
    throw new Error('Profile "' + profile + '" is not fully configured.');
  }
  return creds;
}

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

function pollMessageStatus_(serverUrl, accessToken, messageId) {
  var endpoint = serverUrl + '/restapi/v1.0/account/~/extension/~/message-store/' + messageId;
  var maxAttempts = 10;
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
      return { messageStatus: 'Unknown', httpStatus: code, body: body };
    }
    last = JSON.parse(body);
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
