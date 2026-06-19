/**
 * Transcend Counseling & Wellness — App Script Business Logic
 * Put this in code.gs in the Apps Script editor.
 */

const TEMPLATE_IDS = {
  // TODO: Replace with actual Google Doc Template IDs
  INTAKE_TEMPLATE: 'YOUR_TEMPLATE_ID_HERE', 
};

/**
 * Creates a HIPAA-compliant Shared Drive folder for a new client.
 * Webhook Action: 'createDriveFolder'
 * 
 * Expected data:
 * {
 *   "ClientID": "CUST-0001",
 *   "FirstName": "John",
 *   "LastName": "Doe"
 * }
 */
function createClientDriveFolder(data) {
  const ctx = 'createClientDriveFolder';
  log('INFO', ctx, 'Creating Drive folder for client: ' + data.ClientID);
  
  const rootDriveId = PropertiesService.getScriptProperties().getProperty('DRIVE_FOLDER_ID');
  if (!rootDriveId) {
    throw new Error('DRIVE_FOLDER_ID Script Property is not set.');
  }
  
  const folderName = `${data.ClientID}_${data.LastName}_${data.FirstName}`;
  
  // Uses getOrCreateFolderByPath from folders.gs
  const result = getOrCreateFolderByPath(rootDriveId, folderName);
  
  if (result.error) {
    log('ERROR', ctx, result.error);
    return result;
  }
  
  return { FolderID: result.id, FolderURL: result.url };
}

/**
 * Generates the intake package (contract + info) based on the template.
 * Webhook Action: 'generateDocs'
 * 
 * Expected data:
 * {
 *   "ClientID": "CUST-0001",
 *   "FolderID": "1A2B3C...", 
 *   "paramObj": { ... all the AppSheet mapping ... }
 * }
 */
function generateIntakePackage(data) {
  const ctx = 'generateIntakePackage';
  log('INFO', ctx, 'Generating intake docs for client: ' + data.ClientID);
  
  if (!data.FolderID) {
    return { error: 'No FolderID provided. Cannot generate documents.' };
  }
  
  // Use createGoogleDoc from docs.gs
  const fileObj = {
    templateId: TEMPLATE_IDS.INTAKE_TEMPLATE,
    folderId: data.FolderID,
    fileName: `IntakePackage_${data.ClientID}_${new Date().toISOString().split('T')[0]}`
  };
  
  // AppSheet will send the fully formatted JSON string for paramObj, parse it safely
  let params = data.paramObj;
  if (typeof params === 'string') {
    params = safeParse(params, 'paramObj');
  }
  
  const docResult = createGoogleDoc(fileObj, params);
  
  if (docResult.error) {
    log('ERROR', ctx, docResult.error);
    return docResult;
  }
  
  // Return the new document info back to AppSheet so it can save the link
  return {
    DocumentURL: docResult.fileURL,
    DocumentID: docResult.fileId
  };
}
