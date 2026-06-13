/**
 * Standard AppSheet Webhook Router
 * Handles all POST requests from AppSheet automations.
 *
 * SECURITY: Requests must include a "secret" field matching the WEBHOOK_SECRET
 * Script Property. Set it once in: Apps Script → Project Settings → Script Properties.
 *
 * Expected payload shape:
 * {
 *   "action": "actionName",
 *   "secret": "your-webhook-secret",
 *   "data":   { ... }
 * }
 */

function isAuthorized(payload) {
  const ctx            = 'isAuthorized';
  const expectedSecret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET');

  if (!expectedSecret) {
    log('WARN', ctx, 'WEBHOOK_SECRET not set — request allowed but INSECURE. Set it before going live.');
    return true;
  }

  if (!payload.secret || payload.secret !== expectedSecret) {
    log('ERROR', ctx, 'Unauthorized request — secret did not match.');
    return false;
  }

  log('INFO', ctx, 'Request authorized.');
  return true;
}

function doPost(e) {
  const ctx = 'doPost';

  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      // Use safeParse to handle AppSheet JSON templates that might have trailing commas or single quotes
      payload = safeParse(e.postData.contents, 'webhookPayload');
    } else if (e.parameter) {
      payload = e.parameter;
    }

    if (!isAuthorized(payload)) {
      return createJsonResponse({ error: 'Unauthorized. Invalid or missing secret.' });
    }

    const action = payload.action;
    if (!action) {
      log('WARN', ctx, 'No action in payload');
      return createJsonResponse({ error: 'No action specified in the payload.' });
    }

    log('INFO', ctx, `Routing action: "${action}"`);

    // ─── Add project-specific routes in code.gs ───────────────────
    // if (action === 'processIntake')  return createJsonResponse(processNewIntake(payload.data));
    // if (action === 'generateDocs')   return createJsonResponse(generateIntakePackage(payload.data));
    // ──────────────────────────────────────────────────────────────

    log('WARN', ctx, `Unknown action: "${action}"`);
    return createJsonResponse({ error: `Unknown action: "${action}". Add a route in code.gs.` });

  } catch (error) {
    log('ERROR', ctx, error.message);
    return createJsonResponse({ error: 'Webhook processing failed.', details: error.message });
  }
}

/**
 * Health check endpoint — triggered when the Web App URL is opened in a browser (GET request).
 * Useful during deployment to confirm the script is live without sending a real POST payload.
 */
function doGet() {
  return createJsonResponse({
    status:    'online',
    app:       PropertiesService.getScriptProperties().getProperty('APP_NAME') || 'OmmNoMi AppScript',
    timestamp: new Date().toISOString(),
    message:   'Webhook is live. Send POST requests with { action, secret, data }.'
  });
}

