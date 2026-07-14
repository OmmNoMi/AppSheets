/**
 * Finds or creates a nested folder structure within a given root folder.
 * Idempotent — safe to call multiple times with the same path.
 *
 * @param {string} rootFolderId The ID of the root Google Drive folder.
 * @param {string} folderPath   Path with "/" separators. E.g. "Clients/2024/Invoices".
 * @returns {{ id: string, url: string }|{ error: string }}
 */
function getOrCreateFolderByPath(rootFolderId, folderPath) {
  const ctx = 'getOrCreateFolderByPath';

  // '.' or empty string means "use the root folder itself" — not an error
  if (!rootFolderId) {
    log('ERROR', ctx, 'Missing rootFolderId');
    return { error: 'Missing rootFolderId' };
  }

  if (!folderPath || folderPath === '.') {
    try {
      const root = DriveApp.getFolderById(rootFolderId);
      log('INFO', ctx, `No subpath — using root folder: "${root.getName()}"`);
      return { id: root.getId(), url: root.getUrl() };
    } catch (e) {
      log('ERROR', ctx, e.message);
      return { error: e.message };
    }
  }

  try {
    let currentFolder = DriveApp.getFolderById(rootFolderId);
    const pathParts   = folderPath.split('/').filter(String);

    for (const folderName of pathParts) {
      const found = currentFolder.getFoldersByName(folderName);
      if (found.hasNext()) {
        currentFolder = found.next();
        log('INFO', ctx, `Exists — "${folderName}"`);
      } else {
        currentFolder = currentFolder.createFolder(folderName);
        log('INFO', ctx, `Created — "${folderName}"`);
      }
    }

    log('SUCCESS', ctx, `Final folder: "${currentFolder.getName()}" (${currentFolder.getId()})`);
    return { id: currentFolder.getId(), url: currentFolder.getUrl() };

  } catch (e) {
    log('ERROR', ctx, e.message);
    return { error: e.message };
  }
}
