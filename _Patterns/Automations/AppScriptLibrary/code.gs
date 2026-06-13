/**
 * ─────────────────────────────────────────────────────────
 * code.gs — Project-Specific Business Logic
 * OmmNoMi AppScript Standard Library
 * ─────────────────────────────────────────────────────────
 *
 * This is the ONLY file that changes between projects.
 * All library files (utils.gs, docs.gs, folders.gs, etc.) stay identical.
 *
 * HOW TO ADD A NEW ACTION:
 *   1. Write your function below (e.g. processNewIntake).
 *   2. Add a route inside doPost() in webhook.gs:
 *        if (action === 'processIntake') return createJsonResponse(processNewIntake(payload.data));
 *   3. In AppSheet, create an Automation → Webhook with body:
 *        { "action": "processIntake", "secret": "<WEBHOOK_SECRET>", "data": { ... } }
 *
 * ERROR STRATEGY:
 *   Your functions here are top-level / AppSheet-facing.
 *   Always return { error: string } on failure — never throw.
 *   AppSheet reads ReturnValue.error to detect failures.
 *
 * EXAMPLE FUNCTION TEMPLATE:
 * ─────────────────────────────────────────────────────────
 *
 * function myAction(data) {
 *   const ctx = 'myAction';
 *   log('INFO', ctx, 'Starting...');
 *
 *   try {
 *     // your logic here
 *     log('SUCCESS', ctx, 'Done.');
 *     return { result: 'value' };
 *   } catch (e) {
 *     log('ERROR', ctx, e.message);
 *     return { error: e.message };
 *   }
 * }
 *
 * ─────────────────────────────────────────────────────────
 */

// ─── SCRIPT PROPERTIES (set in Apps Script → Project Settings) ───
// WEBHOOK_SECRET  — shared secret for AppSheet webhook authentication
// APP_NAME        — friendly name shown in doGet() health check response
// ─────────────────────────────────────────────────────────────────

// Add your project functions below:
