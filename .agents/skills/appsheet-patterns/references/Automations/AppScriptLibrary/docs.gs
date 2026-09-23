/**
 * Google Docs Integration Library
 * Standard library file for OmmNoMi AppScript projects.
 *
 * Provides functions for creating and manipulating Google Docs from templates.
 * Handles token replacement, PDF conversion, and conditional section rendering (Show-If).
 */

/**
 * Creates a new Google Doc from a template, performs token replacement,
 * handles Show-If conditional sections, and optionally exports to PDF.
 *
 * @param {object} fileObj Configuration object for the file creation:
 *   - templateId  {string}  The ID of the template Google Doc (required).
 *   - folderId    {string}  The ID of the destination folder (required).
 *   - fileName    {string}  The name of the new file (required).
 *   - exportAsPdf {boolean} If true, exports to PDF and trashes the doc copy.
 * @param {object} paramObj Key-value pairs for token replacement (e.g. { "{{ClientName}}": "John Doe" }).
 * @param {object} [conditionsObj] Optional object of boolean flags for Show-If sections
 *   (e.g. { 'EMAIL_CONSENT': true, 'TEXT_CONSENT': false }).
 * @returns {object} { fileId, fileURL, fileName } on success, or { error: string } on failure.
 */
function createGoogleDoc(fileObj, paramObj, conditionsObj) {
  const ctx = 'createGoogleDoc';

  // Defensive: safeParse if caller passed JSON strings
  if (typeof fileObj === 'string')  fileObj  = safeParse(fileObj, 'fileObj');
  if (typeof paramObj === 'string') paramObj = safeParse(paramObj, 'paramObj');
  if (typeof conditionsObj === 'string') conditionsObj = safeParse(conditionsObj, 'conditionsObj');

  const templateId  = fileObj.templateId;
  const folderId    = fileObj.folderId;
  const fileName    = fileObj.fileName;
  const exportAsPdf = fileObj.exportAsPdf === true || fileObj.exportAsPdf === 'true';

  if (!templateId || !folderId || !fileName) {
    const msg = "fileObj must contain 'templateId', 'folderId', and 'fileName'.";
    log('ERROR', ctx, msg);
    return { error: msg };
  }

  log('INFO', ctx, `Starting — template: ${templateId} → folder: ${folderId} → file: "${fileName}"`);

  let newFile = null;

  try {
    const destinationFolder = DriveApp.getFolderById(folderId);
    const templateFile      = DriveApp.getFileById(templateId);

    // Copy template
    newFile = templateFile.makeCopy(fileName, destinationFolder);
    log('INFO', ctx, `Template copied — new file ID: ${newFile.getId()}`);

    const doc    = DocumentApp.openById(newFile.getId());
    const body   = doc.getBody();
    const header = doc.getHeader();
    const footer = doc.getFooter();

    // Helper functions for Google Form text matching
    const isAff = (v) => {
      if (!v) return false;
      const s = String(v).trim().toLowerCase();
      return s.startsWith('yes') || s.startsWith('true') || (s.includes('consent') && !s.includes('not') && !s.includes("don't") && !s.startsWith('no'));
    };
    const isTxt = (v) => {
      if (!v) return false;
      const s = String(v).trim().toLowerCase();
      if (s.includes("don't") || s.includes('not') || s.startsWith('no')) return false;
      return s.startsWith('yes') || s.includes('send text') || s.includes('it is ok');
    };

    // --- Resolve Conditions (Show-If logic) ---
    let resolvedConditions = conditionsObj;
    if (!resolvedConditions && paramObj) {
      resolvedConditions = {
        'EMAIL_CONSENT':       isAff(paramObj.ConsentEmail) || paramObj.ShowEmailConsent === true || paramObj.ShowEmailConsent === 'true',
        'TEXT_CONSENT':        isTxt(paramObj.ConsentMobileSMS) || paramObj.ShowTextConsent === true || paramObj.ShowTextConsent === 'true',
        'TELEHEALTH_CONSENT':  isAff(paramObj.ConsentTelehealth) || paramObj.ShowTelehealthConsent === true || paramObj.ShowTelehealthConsent === 'true',
        'REGINA_SUPERVISION':  (paramObj.ProviderPreference && String(paramObj.ProviderPreference).includes('Regina')) || paramObj.ShowReginaSupervision === true || paramObj.ShowReginaSupervision === 'true',
        'SHANNON_SUPERVISION': (paramObj.ProviderPreference && String(paramObj.ProviderPreference).includes('Shannon')) || paramObj.ShowShannonSupervision === true || paramObj.ShowShannonSupervision === 'true',
        'COB_FORM':            Boolean(
          paramObj.AdditionalInsuranceCompany ||
          paramObj['{{AdditionalInsuranceCompany}}'] ||
          paramObj.ShowCOBForm === true ||
          paramObj.ShowCOBForm === 'true' ||
          (paramObj.OnlyInsurancePlan && String(paramObj.OnlyInsurancePlan).trim().toLowerCase().startsWith('no')) ||
          (paramObj.UseInsurance && String(paramObj.UseInsurance).toLowerCase().includes('secondary'))
        )
      };
    }

    if (resolvedConditions && typeof resolvedConditions === 'object') {
      log('INFO', ctx, `Evaluating conditional sections: ${JSON.stringify(resolvedConditions)}`);
      for (const sectionTag in resolvedConditions) {
        const shouldShow = Boolean(resolvedConditions[sectionTag]);
        const startMarker = `{{START_${sectionTag}}}`;
        const endMarker   = `{{END_${sectionTag}}}`;
        removeOrKeepSection(body, startMarker, endMarker, shouldShow);
      }
    } else {
      log('WARN', ctx, 'No conditions found — skipping conditional sections.');
    }

    // --- Replace Placeholders ---
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
    log('INFO', ctx, `Replaced ${replacementCount} placeholder keys.`);

    doc.saveAndClose();

    let finalFile = newFile;
    if (exportAsPdf) {
      log('INFO', ctx, 'Exporting document to PDF...');
      const pdfBlob = newFile.getAs(MimeType.PDF);
      
      const pdfName = fileName.replace(/\.[^/.]+$/, "") + ".pdf";
      pdfBlob.setName(pdfName);
      
      finalFile = destinationFolder.createFile(pdfBlob);
      newFile.setTrashed(true);
      log('INFO', ctx, 'PDF created and temporary Google Doc removed.');
    }

    const result = {
      fileId:   finalFile.getId(),
      fileURL:  finalFile.getUrl(),
      fileName: fileName
    };

    log('SUCCESS', ctx, `Completed successfully: "${fileName}" (${result.fileId})`);
    return result;

  } catch (e) {
    log('ERROR', ctx, `Failed during replacement — ${e.message}`);

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

/**
 * Removes or keeps a conditional section in a Google Doc.
 * @param {DocumentApp.Body} body
 * @param {string} startTag - e.g., "{{START_EMAIL_CONSENT}}"
 * @param {string} endTag   - e.g., "{{END_EMAIL_CONSENT}}"
 * @param {boolean} shouldShow
 */
function removeOrKeepSection(body, startTag, endTag, shouldShow) {
  const ctx = 'removeOrKeepSection';
  const startFound = body.findText(escapeRegex(startTag));
  const endFound   = body.findText(escapeRegex(endTag));

  if (!startFound) {
    log('WARN', ctx, `Start tag not found in template: ${startTag}`);
    return;
  }
  if (!endFound) {
    log('WARN', ctx, `End tag not found in template: ${endTag}`);
    return;
  }

  const startElem = startFound.getElement();
  const endElem   = endFound.getElement();

  const startPara = startElem.getParent();
  const endPara   = endElem.getParent();
  const parent    = startPara.getParent();

  if (shouldShow) {
    log('INFO', ctx, `SHOW section: Keeping "${startTag}" content and removing markers.`);
    body.replaceText(escapeRegex(startTag), '');
    body.replaceText(escapeRegex(endTag), '');
  } else {
    log('INFO', ctx, `HIDE section: Deleting all content between "${startTag}" and "${endTag}".`);
    const startIndex = parent.getChildIndex(startPara);
    const endIndex   = parent.getChildIndex(endPara);

    // Google Docs requires at least one element in the Body at all times.
    // If deleting up to the very end of the document, append a temporary paragraph first.
    if (endIndex >= parent.getNumChildren() - 1) {
      body.appendParagraph('');
    }

    for (let i = endIndex; i >= startIndex; i--) {
      if (parent.getNumChildren() > 1) {
        parent.removeChild(parent.getChild(i));
      } else {
        const remainingChild = parent.getChild(0);
        if (remainingChild.clear) remainingChild.clear();
      }
    }
  }
}
