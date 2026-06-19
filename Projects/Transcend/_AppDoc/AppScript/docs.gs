/**
 * Creates a Google Doc from a template by replacing placeholders with provided data.
 * — safeParse, createJsonResponse, escapeRegex, extractIdFromUrl all live in utils.gs
 *
 * ERROR STRATEGY (OmmNoMi Convention):
 *   Top-level / AppSheet-facing functions → return { error: string } on failure.
 *   Internal helpers → throw, so the caller decides how to handle.
 *   createGoogleDoc is top-level: it always returns an object, never throws to the caller.
 *
 * @param {Object|string} fileObj  { templateId, folderId, fileName, exportAsPdf?: boolean }
 * @param {Object|string} paramObj { "{{Placeholder}}": "value", ... }
 * @returns {{ fileURL: string, fileName: string, fileId: string }|{ error: string }}
 */
function createGoogleDoc(fileObj, paramObj) {
  const ctx = 'createGoogleDoc';

  // --- Parse inputs ---
  try {
    if (typeof fileObj === 'string')  fileObj  = safeParse(fileObj,  'fileObj');
    if (typeof paramObj === 'string') paramObj = safeParse(paramObj, 'paramObj');
  } catch (parseError) {
    log('ERROR', ctx, `Input parsing failed — ${parseError.message}`);
    return { error: `Input parsing failed — ${parseError.message}` };
  }

  // --- Normalize IDs — accept bare IDs or full Drive URLs ---
  let { templateId, folderId, fileName, exportAsPdf } = fileObj;
  templateId = extractIdFromUrl(templateId);
  folderId   = extractIdFromUrl(folderId);

  if (!templateId || !folderId || !fileName) {
    const msg = "fileObj must contain 'templateId', 'folderId', and 'fileName'.";
    log('ERROR', ctx, msg);
    return { error: msg };
  }

  log('INFO', ctx, `Starting — template: ${templateId} → folder: ${folderId} → file: "${fileName}"`);

  let newFile = null; // declared outside try so the catch block can clean it up on partial failure

  try {
    const destinationFolder = DriveApp.getFolderById(folderId);
    const templateFile      = DriveApp.getFileById(templateId);

    // Copy template — if anything below fails, we delete this orphaned file in the catch block
    newFile = templateFile.makeCopy(fileName, destinationFolder);
    log('INFO', ctx, `Template copied — new file ID: ${newFile.getId()}`);

    const doc    = DocumentApp.openById(newFile.getId());
    const body   = doc.getBody();
    const header = doc.getHeader();
    const footer = doc.getFooter();

    let replacementCount = 0;
    for (const placeholder in paramObj) {
      if (Object.prototype.hasOwnProperty.call(paramObj, placeholder)) {
        const value   = paramObj[placeholder] == null ? '' : String(paramObj[placeholder]);
        const safeKey = escapeRegex(placeholder);

        body.replaceText(safeKey, value);
        if (header) header.replaceText(safeKey, value);
        if (footer) footer.replaceText(safeKey, value);
        replacementCount++;
      }
    }

    doc.saveAndClose();

    let finalFile = newFile;
    if (exportAsPdf) {
      log('INFO', ctx, 'Exporting document to PDF...');
      const pdfBlob = newFile.getAs(MimeType.PDF);
      
      // Ensure the name ends with .pdf
      const pdfName = fileName.replace(/\.[^/.]+$/, "") + ".pdf";
      pdfBlob.setName(pdfName);
      
      finalFile = destinationFolder.createFile(pdfBlob);
      newFile.setTrashed(true); // Clean up the temporary Google Doc
      log('INFO', ctx, 'PDF created and temporary Google Doc removed.');
    }

    log('SUCCESS', ctx, `Done — ${replacementCount} placeholder(s) replaced → "${finalFile.getName()}"`);
    return { fileURL: finalFile.getUrl(), fileName: finalFile.getName(), fileId: finalFile.getId() };

  } catch (e) {
    log('ERROR', ctx, `Failed during replacement — ${e.message}`);

    // Orphaned file cleanup — delete the incomplete copy so it doesn't litter the Drive folder
    if (newFile) {
      try {
        newFile.setTrashed(true);
        log('WARN', ctx, `Incomplete file deleted from Drive — "${fileName}"`);
      } catch (deleteError) {
        log('ERROR', ctx, `Could not delete incomplete file (${newFile.getId()}) — ${deleteError.message}`);
      }
    }

    return { error: `Failed to create Google Doc — ${e.message}` };
  }
}
