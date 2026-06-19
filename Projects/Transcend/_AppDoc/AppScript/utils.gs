/**
 * Standard Utility Functions
 * Contains generic helpers for string manipulation, data formatting, and common operations.
 */

// ─────────────────────────────────────────────
// LOGGING
// ─────────────────────────────────────────────

/**
 * Centralized logger for consistent output across all library files.
 * Output format:  ✅ [context] message
 *
 * @param {'INFO'|'WARN'|'ERROR'|'SUCCESS'} level  Log level.
 * @param {string} context  Short label — usually the function name, e.g. "createGoogleDoc".
 * @param {string} message  Human-readable description of what happened.
 */
function log(level, context, message) {
  const icons = { INFO: 'ℹ️', WARN: '⚠️', ERROR: '❌', SUCCESS: '✅' };
  const icon  = icons[level] || 'ℹ️';
  Logger.log(`${icon} [${context}] ${message}`);
}

/**
 * Extracts the last 4 digits of a credit card number or any numeric string.
 * Helpful for PCI/HIPAA compliance masking.
 *
 * @param {string|number} cardNumber The raw credit card number.
 * @returns {string} The last 4 digits, or empty string if invalid.
 */
function extractLast4(cardNumber) {
  if (!cardNumber) return "";
  const cleaned = String(cardNumber).replace(/\D/g, '');
  if (cleaned.length < 4) return cleaned;
  return cleaned.slice(-4);
}

/**
 * Extracts a Google Drive file or folder ID from a URL or returns the input as-is if it's already an ID.
 * Handles all common Drive URL formats:
 *   - /d/ID/...         (file view)
 *   - /file/d/ID/...    (file direct)
 *   - id=ID             (query param)
 *   - /folders/ID       (folder)
 *   - thumbnail?id=ID   (thumbnail)
 *
 * @param {string} urlOrId A Google Drive URL or a bare file/folder ID.
 * @returns {string|null} The extracted ID, or null if input is not a string.
 */
function extractIdFromUrl(urlOrId) {
  if (typeof urlOrId !== 'string') return null;
  const regex = /\/d\/([a-zA-Z0-9_-]+)|[?&]id=([a-zA-Z0-9_-]+)|\/folders\/([a-zA-Z0-9_-]+)/;
  const match = urlOrId.match(regex);
  if (match) {
    return match[1] || match[2] || match[3];
  }
  // No URL pattern matched — assume it's already a bare ID
  return urlOrId;
}

/**
 * Escapes all regex special characters in a string so it can be used as a
 * literal pattern in functions like replaceText() that internally treat their
 * first argument as a regular expression.
 *
 * Without this, a placeholder like "{{Total (USD)}}" would crash replaceText()
 * because "(" and ")" are regex special characters.
 *
 * @param {string} str The string to escape.
 * @returns {string} The escaped string safe for use in regex contexts.
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─────────────────────────────────────────────
// PARSING
// ─────────────────────────────────────────────

/**
 * Safely parses a string into a JavaScript object.
 * Strategy:
 *   1. JSON.parse — strict, fast, secure.
 *   2. eval() fallback — handles AppSheet's JS object literal format
 *      (unquoted keys, single-quoted strings, trailing commas).
 *
 * @param {string} str   The string to parse.
 * @param {string} label Label for log context (e.g. "fileObj").
 * @returns {object}
 * @throws {Error} If both strategies fail.
 */
function safeParse(str, label) {
  const ctx = `safeParse:${label}`;
  let jsonError = null;

  try {
    const result = JSON.parse(str);
    log('INFO', ctx, 'Parsed via JSON.parse');
    return result;
  } catch (e) {
    jsonError = e;
    log('INFO', ctx, `JSON.parse failed (${e.message}) — trying eval fallback`);
  }

  try {
    const result = eval('(' + str + ')');
    log('INFO', ctx, 'Parsed via eval fallback');
    log('WARN', ctx, "If a value contained an apostrophe (e.g. O'Brien), use SUBSTITUTE() in AppSheet");
    return result;
  } catch (evalError) {
    log('ERROR', ctx, `Both parsers failed. Raw input:\n${str}`);
    throw new Error(`Could not parse "${label}". JSON: ${jsonError.message}. Eval: ${evalError.message}`);
  }
}

// ─────────────────────────────────────────────
// HTTP RESPONSE
// ─────────────────────────────────────────────

/**
 * Creates a standardized JSON response for Google Apps Script Web Apps.
 * Used by webhook.gs and any doPost/doGet handler.
 *
 * @param {object} responseObject The payload to return as JSON.
 * @returns {ContentService.TextOutput}
 */
function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}
