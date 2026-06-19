// extractIdFromUrl() and escapeRegex() live in utils.gs — available to all files in this project.

// ─────────────────────────────────────────────
// PRIVATE HELPERS
// ─────────────────────────────────────────────

function findFileByPath(startFolder, filePath) {
  const pathParts = filePath.split('/').filter(p => p.length > 0);
  const fileName  = pathParts.pop();
  let currentFolder = startFolder;

  for (const folderName of pathParts) {
    const folders = currentFolder.getFoldersByName(folderName);
    if (folders.hasNext()) {
      currentFolder = folders.next();
    } else {
      log('WARN', 'findFileByPath', `Subfolder not found: "${folderName}"`);
      return null;
    }
  }

  const files = currentFolder.getFilesByName(fileName);
  if (files.hasNext()) return files.next();

  log('WARN', 'findFileByPath', `File not found: "${fileName}" in "${currentFolder.getName()}"`);
  return null;
}

// getOrCreateFolderByPath() lives in folders.gs — used below instead of duplicating folder logic.

function getExtensionFromMimeType(mimeType) {
  const mimeMap = {
    [MimeType.GOOGLE_DOCS]: '.gdoc', [MimeType.GOOGLE_SHEETS]: '.gsheet', [MimeType.GOOGLE_SLIDES]: '.gslides',
    [MimeType.GOOGLE_FORMS]: '.gform', [MimeType.GOOGLE_DRAWINGS]: '.gdraw',
    [MimeType.MICROSOFT_WORD]: '.docx', [MimeType.MICROSOFT_EXCEL]: '.xlsx', [MimeType.MICROSOFT_POWERPOINT]: '.pptx',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
    'application/pdf': '.pdf', 'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif',
    'text/csv': '.csv', 'text/plain': '.txt', 'application/zip': '.zip',
  };
  return mimeMap[mimeType] || null;
}

function getCorrectedFileName(sourceFile, desiredName) {
  const correctExtension = getExtensionFromMimeType(sourceFile.getMimeType());
  if (!correctExtension) return desiredName;

  const lastDot = desiredName.lastIndexOf('.');
  if (lastDot > 0 && desiredName.substring(lastDot).toLowerCase() === correctExtension.toLowerCase()) {
    return desiredName;
  }
  const baseName = lastDot > 0 ? desiredName.substring(0, lastDot) : desiredName;
  return baseName + correctExtension;
}

// ─────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────

/**
 * Moves a file to a new location and renames it.
 * The source file can be specified by a relative path or a Google Drive URL/ID.
 *
 * @param {string} oldFolderId       Root folder ID for path-based source lookup (ignored if using URL).
 * @param {string} oldFileIdentifier Relative path OR full Google Drive URL of the source file.
 * @param {string} newFolderId       Root folder ID for the destination.
 * @param {string} newFilePath       Destination path + desired file name (extension auto-corrected).
 * @returns {{ fileID, fileURL, fileName, fileThumbnail, folderName, folderURL }|{ error: string }}
 */
function moveAndRenameFileWithPaths(oldFolderId, oldFileIdentifier, newFolderId, newFilePath) {
  const ctx = 'moveAndRenameFileWithPaths';
  log('INFO', ctx, `Moving "${oldFileIdentifier}" → "${newFilePath}"`);

  try {
    let fileToMove = null;
    const extractedId    = extractIdFromUrl(oldFileIdentifier);

    // Resolve source — URL/ID takes priority over path
    if (extractedId.indexOf('/') === -1) {
      try {
        fileToMove = DriveApp.getFileById(extractedId);
        log('INFO', ctx, `Source resolved by ID: "${fileToMove.getName()}"`);
      } catch (e) {
        log('ERROR', ctx, `Could not find file by ID "${extractedId}" — ${e.message}`);
      }
    } else {
      log('INFO', ctx, 'Treating source as relative path');
      const oldStartFolder = DriveApp.getFolderById(oldFolderId);
      fileToMove = findFileByPath(oldStartFolder, oldFileIdentifier);
    }

    if (!fileToMove) {
      log('ERROR', ctx, `File not found: "${oldFileIdentifier}"`);
      return { error: `File not found: "${oldFileIdentifier}"` };
    }

    const newPathParts      = newFilePath.split('/').filter(p => p.length > 0);
    const desiredFileName   = newPathParts.pop();
    const finalFileName     = getCorrectedFileName(fileToMove, desiredFileName);
    // Resolve destination using folders.gs — no duplicate logic here
    const subFolderPath    = newPathParts.join('/');
    const folderResult     = getOrCreateFolderByPath(newFolderId, subFolderPath || '.');
    if (folderResult.error) throw new Error(`Could not resolve destination folder — ${folderResult.error}`);
    const destinationFolder = DriveApp.getFolderById(folderResult.id);

    log('INFO', ctx, `Renaming to "${finalFileName}" and moving to "${destinationFolder.getName()}"`);

    const fileId            = fileToMove.getId();
    const destinationFolderId = destinationFolder.getId();
    const parentIdsToRemove = [];
    const parents = fileToMove.getParents();
    while (parents.hasNext()) parentIdsToRemove.push(parents.next().getId());

    if (parentIdsToRemove.length > 0) {
      Drive.Files.update(
        { name: finalFileName },
        fileId,
        null,
        { addParents: destinationFolderId, removeParents: parentIdsToRemove.join(','), supportsAllDrives: true }
      );
    } else {
      destinationFolder.addFile(fileToMove);
      fileToMove.setName(finalFileName);
    }

    fileToMove = DriveApp.getFileById(fileId);
    log('SUCCESS', ctx, `Moved and renamed to "${finalFileName}"`);

    return {
      fileID:        fileToMove.getId(),
      fileURL:       fileToMove.getUrl(),
      fileName:      fileToMove.getName(),
      fileThumbnail: `https://drive.google.com/thumbnail?id=${fileToMove.getId()}`,
      folderName:    destinationFolder.getName(),
      folderURL:     destinationFolder.getUrl()
    };

  } catch (e) {
    log('ERROR', ctx, e.message);
    return { error: e.message };
  }
}
