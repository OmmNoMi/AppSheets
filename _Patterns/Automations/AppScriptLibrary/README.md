# OmmNoMi AppScript Standard Library

A portable, project-agnostic Google Apps Script library used across all OmmNoMi AppSheet builds.
Copy the entire folder into a new project's `_AppDoc/AppScript/` directory, then add your custom logic in `code.gs`.

---

## File Structure

| File | Purpose |
|---|---|
| `utils.gs` | Core utilities — logging, parsing, string helpers, HTTP response |
| `folders.gs` | Google Drive folder creation and navigation |
| `docs.gs` | Google Doc generation from templates |
| `move.gs` | Moving and renaming files within Drive |
| `calendar.gs` | Google Calendar event creation |
| `webhook.gs` | AppSheet webhook router (`doPost`) |
| `code.gs` | **Project-specific business logic** — add your custom functions here |

---

## Conventions

### Error Strategy
> **Top-level / AppSheet-facing functions** → always return `{ error: string }` on failure. Never throw to the caller.
> **Internal helpers** → `throw`, so the calling function can decide how to handle it.

This means AppSheet automations can always safely read `ReturnValue.error` to check if something went wrong.

### Logging
All files use the centralized `log()` function from `utils.gs`.

```javascript
log('INFO',    'myFunction', 'Starting process');
log('WARN',    'myFunction', 'Proceeding without optional field');
log('ERROR',   'myFunction', `Drive API failed — ${e.message}`);
log('SUCCESS', 'myFunction', 'Document created');
```

Output in Apps Script console:
```
ℹ️ [myFunction] Starting process
⚠️ [myFunction] Proceeding without optional field
❌ [myFunction] Drive API failed — File not found
✅ [myFunction] Document created
```

### Function Context Pattern
Every function declares `const ctx = 'functionName'` at the top and passes it to every `log()` call.

---

## Function Reference

### `utils.gs`
| Function | Signature | Returns |
|---|---|---|
| `log` | `(level, context, message)` | void |
| `safeParse` | `(str, label)` | object — throws if both JSON.parse and eval fail |
| `extractIdFromUrl` | `(urlOrId)` | string ID |
| `extractLast4` | `(cardNumber)` | string |
| `escapeRegex` | `(str)` | string |
| `createJsonResponse` | `(responseObject)` | ContentService.TextOutput |

### `folders.gs`
| Function | Signature | Returns |
|---|---|---|
| `getOrCreateFolderByPath` | `(rootFolderId, folderPath)` | `{ id, url }` or `{ error }` |

Pass `'.'` or `''` as `folderPath` to return the root folder itself.

### `docs.gs`
| Function | Signature | Returns |
|---|---|---|
| `createGoogleDoc` | `(fileObj, paramObj)` | `{ fileURL, fileName, fileId }` or `{ error }` |

`fileObj` and `paramObj` accept either a JS object or the raw AppSheet string-concat format.
`templateId` and `folderId` accept bare IDs or full Drive URLs.
**Tip:** Add `"exportAsPdf": true` to `fileObj` to automatically generate a PDF instead of a Google Doc.

### `move.gs`
| Function | Signature | Returns |
|---|---|---|
| `moveAndRenameFileWithPaths` | `(oldFolderId, oldFileIdentifier, newFolderId, newFilePath)` | `{ fileID, fileURL, fileName, fileThumbnail, folderName, folderURL }` or `{ error }` |

`oldFileIdentifier` accepts a relative path or a Drive URL.

### `calendar.gs`
| Function | Signature | Returns |
|---|---|---|
| `createEvent` | `(calendarId, title, startTime, endTime, optionsObj?)` | Calendar.Event or null |

### `webhook.gs`
| Function | Purpose |
|---|---|
| `doPost(e)` | Main AppSheet webhook entry point. Routes by `payload.action`. |
| `isAuthorized(payload)` | Checks `payload.secret` against `WEBHOOK_SECRET` Script Property. |

---

## Webhook Setup

### 1. Script Properties (Apps Script → Project Settings)
```
WEBHOOK_SECRET = your-chosen-secret-value
```

### 2. AppSheet Automation Webhook Body
```json
{
  "action": "yourActionName",
  "secret": "your-chosen-secret-value",
  "data": { ... }
}
```

### 3. Add Routes in `code.gs`
```javascript
// In doPost inside webhook.gs, add your routes:
if (action === 'generateDocs') return createJsonResponse(generateIntakePackage(payload.data));
if (action === 'processIntake') return createJsonResponse(processNewIntake(payload.data));
```

---

## AppSheet `paramObj` Format

AI can generate the full `paramObj` expression for you. Paste directly into the AppSheet automation parameter:

```
'{
  "{{ClientName}}": "' & [FullName] & '",
  "{{Date}}": "' & TEXT([JoiningDate], "DD-MM-YYYY") & '"
}'
```

> **Note:** If any value contains an apostrophe (e.g. `O'Brien`), wrap it in AppSheet with `SUBSTITUTE([LastName], "'", "\\'")`.

---

## Shared Drive / HIPAA Notes
- `getOrCreateFolderByPath` and `moveAndRenameFileWithPaths` both pass `supportsAllDrives: true` where applicable.
- Ensure the Apps Script service account has **Editor** access to the Shared Drive root folder.
