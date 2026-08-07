/**
 * Transcend Counseling & Wellness — App Script Business Logic
 * Put this in code.gs in the Apps Script editor.
 */

const TEMPLATE_IDS = {
  // TODO: Replace with actual Google Doc Template IDs
  THERAPY_CONTRACT: 'YOUR_THERAPY_CONTRACT_TEMPLATE_ID_HERE',
};

/**
 * Creates a HIPAA-compliant Shared Drive folder for a new client.
 * Webhook Action: 'createDriveFolder'
 *
 * Expected data:
 * { "ClientID": "...", "FirstName": "...", "LastName": "..." }
 */
function createClientDriveFolder(data) {
  const ctx = 'createClientDriveFolder';
  log('INFO', ctx, 'Creating Drive folder for client: ' + data.ClientID);

  // Accept full Drive URL (from AppVariables) or bare ID (from Script Properties fallback).
  // extractIdFromUrl() handles both formats cleanly.
  const rawRoot     = data.RootFolderURL
    || PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID');
  const rootDriveId = extractIdFromUrl(rawRoot);

  if (!rootDriveId) return { error: 'No root folder available. Set AppCodeBaseFolder in AppVariables or DRIVE_FOLDER_ID in Script Properties.' };

  const folderName = `${data.ClientID}_${data.LastName}_${data.FirstName}`;
  const result     = getOrCreateFolderByPath(rootDriveId, folderName);

  if (result.error) { log('ERROR', ctx, result.error); return result; }

  log('SUCCESS', ctx, `Client folder ready: ${folderName}`);
  return { FolderID: result.id, FolderURL: result.url };
}

/**
 * Generates the Therapy Services Contract for a client.
 * Webhook Action: 'generateTherapyContract'
 *
 * If FolderID is not passed, the folder is auto-created from ClientID/Name.
 *
 * Expected data:
 * {
 *   "ClientID":          "...",
 *   "FolderID":          "..." (optional — auto-created if blank),
 *   "FirstName":         "...",
 *   "LastName":          "...",
 *   "Email":             "...",
 *   "Phone":             "...",
 *   "ConsentEmail":      "Yes/No",
 *   "ConsentTelehealth": "Yes/No"
 * }
 *
 * Returns: { FileURL: "...", FileID: "...", FolderID: "..." }
 */
function generateTherapyContract(data) {
  const ctx = 'generateTherapyContract';
  log('INFO', ctx, 'Generating Therapy Contract for: ' + data.ClientID);

  // Auto-create Drive folder if not passed
  let folderId = data.FolderID;
  if (!folderId) {
    log('INFO', ctx, 'No FolderID passed — creating folder now.');
    const folderResult = createClientDriveFolder(data);
    if (folderResult.error) return folderResult;
    folderId = folderResult.FolderID;
  }

  const fileObj = {
    templateId: TEMPLATE_IDS.THERAPY_CONTRACT,
    folderId:   folderId,
    fileName:   `TherapyContract_${data.ClientID}_${new Date().toISOString().split('T')[0]}`
  };

  // Plain text placeholders {{...}} must be used in the Google Doc template
  const params = {
    '{{FirstName}}':         data.FirstName         || '',
    '{{LastName}}':          data.LastName          || '',
    '{{Email}}':             data.Email             || '',
    '{{Phone}}':             data.Phone             || '',
    '{{ConsentEmail}}':      data.ConsentEmail      || '',
    '{{ConsentTelehealth}}': data.ConsentTelehealth || '',
    '{{ConsentMobileSMS}}':  data.ConsentMobileSMS  || '',
    '{{CardLast4}}':         extractLast4(data.CardNumber || data.CardLast4 || ''),
    '{{DOB}}':               data.DOB               || '',
    '{{Address}}':           data.Address           || '',
    '{{City}}':              data.City              || '',
    '{{State}}':             data.State             || '',
    '{{Zip}}':               data.Zip               || '',
    '{{Today}}':             new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    '{{ClientID}}':          data.ClientID          || '',
  };


  const docResult = createGoogleDoc(fileObj, params);

  if (docResult.error) { log('ERROR', ctx, docResult.error); return docResult; }

  log('SUCCESS', ctx, `Contract created: ${docResult.fileName}`);
  return {
    FileURL:  docResult.fileURL,
    FileID:   docResult.fileId,
    FolderID: folderId,        // Return so AppSheet can write it back to Client.DriveFolderID
  };
}
