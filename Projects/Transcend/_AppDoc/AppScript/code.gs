/**
 * ─────────────────────────────────────────────────────────
 * Code.gs — Project-Specific Business Logic
 * OmmNoMi AppScript Standard Library
 * Client: Transcend Counseling & Wellness (TCW)
 * ─────────────────────────────────────────────────────────
 *
 * This is the ONLY file that changes between projects.
 * All library files (utils.gs, docs.gs, folders.gs, etc.) stay identical.
 *
 * HOW TO ADD A NEW ACTION:
 *   1. Write your function below (e.g. generateTherapyContract).
 *   2. Add a route inside doPost() in webhook.gs:
 *        if (action === 'generateTherapyContract') return createJsonResponse(generateTherapyContract(payload.data));
 *   3. In AppSheet, create an Automation → Webhook with body:
 *        { "action": "generateTherapyContract", "secret": "<WEBHOOK_SECRET>", "data": { ... } }
 *
 * ERROR STRATEGY:
 *   Your functions here are top-level / AppSheet-facing.
 *   Always return { error: string } on failure — never throw.
 *   AppSheet reads ReturnValue.error to detect failures.
 * ─────────────────────────────────────────────────────────
 */

// ─── SCRIPT PROPERTIES (set in Apps Script → Project Settings) ───
// WEBHOOK_SECRET  — shared secret for AppSheet webhook authentication
// APP_NAME        — friendly name shown in doGet() health check response
// DRIVE_FOLDER_ID — fallback root folder ID if not passed from AppVariables
// TEMPLATE_ID     — fallback template doc ID if not passed from AppVariables
// ─────────────────────────────────────────────────────────────────

/**
 * Creates a HIPAA-compliant Shared Drive folder for a new client.
 * Webhook Action: 'createDriveFolder'
 *
 * Expected data:
 * { "ClientID": "...", "FirstName": "...", "LastName": "..." }
 */
function createClientDriveFolder(data) {
  const ctx = 'createClientDriveFolder';
  data = data || {};
  const clientId = data.ClientID || data.ID || 'Client';
  log('INFO', ctx, 'Creating Drive folder for client: ' + clientId);

  try {
    const rawRoot = data.RootFolderURL
      || data.RootFolderID
      || PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID');
    const rootDriveId = extractIdFromUrl(rawRoot);

    if (!rootDriveId) return { error: 'No root folder available. Set AppCodeBaseFolder in AppVariables or DRIVE_FOLDER_ID in Script Properties.' };

    const lastName   = data.LastName || '';
    const firstName  = data.FirstName || '';
    const folderName = `${clientId}_${lastName}_${firstName}`.replace(/\s+/g, '_');
    const result     = getOrCreateFolderByPath(rootDriveId, folderName);

    if (result.error) { log('ERROR', ctx, result.error); return result; }

    log('SUCCESS', ctx, `Client folder ready: ${folderName}`);
    return { FolderID: result.id, FolderURL: result.url };
  } catch (e) {
    log('ERROR', ctx, e.message);
    return { error: `Failed to create client Drive folder: ${e.message}` };
  }
}

/**
 * Evaluates whether an intake answer is affirmative (handles "Yes", TRUE, and full Google Form sentences).
 */
/**
 * Evaluates whether an intake answer is affirmative (handles "Yes", TRUE, and full Google Form sentences).
 */
function isAffirmative(val) {
  if (!val) return false;
  const s = String(val).trim().toLowerCase();

  // Strict Negative Check First (Zero False Positives)
  if (s.startsWith('no') || s.includes('not consent') || s.includes("don't") || s.includes('do not') || s.startsWith('false')) {
    return false;
  }

  // Affirmative Check
  return s.startsWith('yes') || s.startsWith('true') || s.includes('i consent') || s.includes('agree');
}

/**
 * Evaluates whether text/SMS consent was given.
 */
function isTextConsent(val) {
  if (!val) return false;
  const s = String(val).trim().toLowerCase();

  // Strict Negative Check First
  if (s.includes("don't") || s.includes('do not') || s.includes('not') || s.startsWith('no') || s.startsWith('false')) {
    return false;
  }

  // Affirmative Check
  return s.startsWith('yes') || s.startsWith('true') || s.includes('send text') || s.includes('it is ok') || s.includes('text message');
}

/**
 * Generates the Therapy Services Contract for a client.
 * Webhook Action: 'generateTherapyContract'
 *
 * Dynamically resolves Template ID, destination Folder ID, Show-If conditions, and placeholders.
 *
 * @param {Object} [data] - Dynamic payload passed from AppSheet
 * @returns {{ FileURL: string, FileID: string, FolderID: string }|{ error: string }}
 */
function generateTherapyContract(data) {
  const ctx = 'generateTherapyContract';
  data = data || {};
  const clientId = data.ClientID || data.ID || 'Client';
  log('INFO', ctx, 'Generating Therapy Contract for: ' + clientId);

  try {
    // 1. Dynamic Template Resolution (From AppSheet payload -> Script Properties fallback)
    const rawTemplate = data.TemplateID
      || data.TemplateURL
      || PropertiesService.getScriptProperties().getProperty('TEMPLATE_ID');
    const templateId = extractIdFromUrl(rawTemplate);

    if (!templateId) {
      return { error: 'No Template ID provided in payload (TemplateID/TemplateURL) or Script Properties (TEMPLATE_ID).' };
    }

    // 2. Dynamic Folder Resolution
    let folderId = data.FolderID || data.DriveFolderId;
    if (!folderId) {
      log('INFO', ctx, 'No FolderID passed — auto-resolving client folder.');
      const folderResult = createClientDriveFolder(data);
      if (folderResult.error) return folderResult;
      folderId = folderResult.FolderID;
    }

    // 3. Dynamic File Name
    const clientName = data.ClientName || `${data.FirstName || ''} ${data.LastName || ''}`.trim() || clientId;
    const todayStr   = new Date().toISOString().split('T')[0];
    const fileName   = data.FileName || `TherapyContract_${clientName.replace(/\s+/g, '_')}_${todayStr}`;

    const fileObj = {
      templateId:  templateId,
      folderId:    folderId,
      fileName:    fileName,
      exportAsPdf: data.ExportAsPdf === true || data.ExportAsPdf === 'true'
    };

    // 3b. Policy Holder Fallback Mapping (Ensures fields #1-#6d auto-fill when Client is Policy Holder)
    const clientFirstName = data.FirstName || (data['{{ClientName}}'] ? data['{{ClientName}}'].split(' ')[0] : '');
    const clientLastName  = data.LastName || (data['{{ClientName}}'] ? data['{{ClientName}}'].split(' ').slice(1).join(' ') : '');
    const clientDOB       = data['{{ClientDOB}}'] || data.DateOfBirth || '';
    const clientGender    = data['{{AdministrativeSex}}'] || data.AdministrativeGender || data.Gender || '';
    const clientAddress   = data['{{ClientAddress}}'] || data.Address || '';
    const clientCityState = data['{{ClientCityState}}'] || (data.City && data.State ? `${data.City}, ${data.State}` : '') || '';
    const clientZip       = data['{{ClientZip}}'] || data.ZipCode || '';
    const clientPhone     = data['{{ClientPhone}}'] || data.Phone || '';

    // Primary Insurance Fallback
    const hasPrimaryIns = Boolean(data.PrimaryInsuranceCompany || data['{{InsuranceCompany}}']);
    if (hasPrimaryIns && (!data['{{SubscriberFirstName}}'] || String(data['{{SubscriberFirstName}}']).trim() === '')) {
      data['{{SubscriberRelationship}}'] = data['{{SubscriberRelationship}}'] || 'Self';
      data['{{SubscriberFirstName}}']    = clientFirstName;
      data['{{SubscriberLastName}}']     = clientLastName;
      data['{{SubscriberDOB}}']          = clientDOB;
      data['{{AdministrativeSex}}']      = clientGender;
      data['{{ClientAddress}}']          = clientAddress;
      data['{{ClientCityState}}']        = clientCityState;
      data['{{ClientZip}}']              = clientZip;
      data['{{ClientPhone}}']            = clientPhone;
    }

    // Secondary Insurance Fallback
    const hasSecondaryIns = Boolean(data.AdditionalInsuranceCompany || data['{{AdditionalInsuranceCompany}}']);
    if (hasSecondaryIns && (!data['{{AdditionalSubscriberFirstName}}'] || String(data['{{AdditionalSubscriberFirstName}}']).trim() === '')) {
      data['{{AdditionalSubscriberRelationship}}'] = data['{{AdditionalSubscriberRelationship}}'] || 'Self';
      data['{{AdditionalSubscriberFirstName}}']    = clientFirstName;
      data['{{AdditionalSubscriberLastName}}']     = clientLastName;
      data['{{AdditionalSubscriberDOB}}']          = clientDOB;
      data['{{AdditionalAdministrativeSex}}']      = clientGender;
      data['{{AdditionalSubscriberAddress1}}']     = clientAddress;
      data['{{AdditionalSubscriberCityState}}']    = clientCityState;
      data['{{AdditionalSubscriberZip}}']          = clientZip;
      data['{{AdditionalSubscriberPhone}}']        = clientPhone;
    }

    // 4. Dynamic Show-If Conditions
    const conditions = {
      'EMAIL_CONSENT':       isAffirmative(data.ConsentEmail) || data.ShowEmailConsent === true || data.ShowEmailConsent === 'true',
      'TEXT_CONSENT':        isTextConsent(data.ConsentMobileSMS) || data.ShowTextConsent === true || data.ShowTextConsent === 'true',
      'TELEHEALTH_CONSENT':  isAffirmative(data.ConsentTelehealth) || data.ShowTelehealthConsent === true || data.ShowTelehealthConsent === 'true',
      'REGINA_SUPERVISION':  (data.ProviderPreference && String(data.ProviderPreference).includes('Regina')) || data.ShowReginaSupervision === true || data.ShowReginaSupervision === 'true',
      'SHANNON_SUPERVISION': (data.ProviderPreference && String(data.ProviderPreference).includes('Shannon')) || data.ShowShannonSupervision === true || data.ShowShannonSupervision === 'true',
      'INSURANCE_FORM':      Boolean(
        data.ShowInsuranceForm === true ||
        data.ShowInsuranceForm === 'true' ||
        (
          !(String(data.UseInsurance || '').toLowerCase().includes('self-pay') ||
            String(data.UseInsurance || '').toLowerCase().includes('out-of-pocket') ||
            String(data.UseInsurance || '').toLowerCase().includes('referral')) &&
          (String(data.UseInsurance || '').trim().toLowerCase().startsWith('yes') ||
           Boolean((data.PrimaryInsuranceCompany || data['{{InsuranceCompany}}']) && String(data.PrimaryInsuranceCompany || data['{{InsuranceCompany}}']).trim() !== ''))
        )
      ),
      'SECONDARY_INSURANCE_FORM': Boolean(
        data.AdditionalInsuranceCompany ||
        data['{{AdditionalInsuranceCompany}}'] ||
        data.ShowSecondaryInsuranceForm === true ||
        data.ShowSecondaryInsuranceForm === 'true' ||
        (data.OnlyInsurancePlan && String(data.OnlyInsurancePlan).trim().toLowerCase().startsWith('no')) ||
        (data.UseInsurance && String(data.UseInsurance).toLowerCase().includes('secondary'))
      ),
      'COB_FORM':            Boolean(
        data.AdditionalInsuranceCompany ||
        data['{{AdditionalInsuranceCompany}}'] ||
        data.ShowCOBForm === true ||
        data.ShowCOBForm === 'true' ||
        (data.OnlyInsurancePlan && String(data.OnlyInsurancePlan).trim().toLowerCase().startsWith('no')) ||
        (data.UseInsurance && String(data.UseInsurance).toLowerCase().includes('secondary'))
      )
    };

    // 5. Create Document
    const docResult = createGoogleDoc(fileObj, data, conditions);

    if (docResult.error) { log('ERROR', ctx, docResult.error); return docResult; }

    log('SUCCESS', ctx, `Contract created: ${docResult.fileName}`);
    return {
      FileURL:  docResult.fileURL,
      FileID:   docResult.fileId,
      FolderID: folderId,
    };
  } catch (e) {
    log('ERROR', ctx, e.message);
    return { error: `Failed to generate contract: ${e.message}` };
  }
}
