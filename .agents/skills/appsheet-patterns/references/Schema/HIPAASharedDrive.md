# SP-003: HIPAA-Compliant Shared Drive Structure for Client Files
> Pattern from: Transcend_IntakeSystem | Status: Design-verified

## Problem
PHI (Protected Health Information) files cannot be stored in an individual's "My Drive":
- If employee leaves, files become inaccessible or orphaned
- Insufficient organizational control for HIPAA compliance
- No central access management

## Solution
Use **Google Workspace Shared Drive** (not personal My Drive).

**Drive Structure**:
```
Shared Drive: [ClientName]_Clients/
└── [ClientID]_[LastName]_[FirstName]/
    ├── IntakePackage_[ClientID]_[Date].gdoc
    ├── SignedContract_[ClientID]_[Date].pdf
    └── SupportingDocs/
        ├── InsuranceCard_Front.jpg
        └── InsuranceCard_Back.jpg
```

**AppSheet Schema**:
- Parent table: `DriveFolderID` (Text, Editable_If = ISBLANK) — Google Drive folder ID
- Parent table: `DriveFolderURL` (URL) — Direct link
- `AppSetting.DriveFolderID` = root Shared Drive folder ID (set once at setup)

**App Script**:
```javascript
function createClientDriveFolder(clientId, lastName, firstName) {
  const rootFolderId = getAppSetting('DriveFolderID');
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  const folderName = `${clientId}_${lastName}_${firstName}`;
  const clientFolder = rootFolder.createFolder(folderName);
  return {
    id: clientFolder.getId(),
    url: clientFolder.getUrl()
  };
}
```

Note: For Shared Drive, use `Drive.Files.create()` with `supportsAllDrives: true` and `driveId` parameter if using Advanced Drive Service.

## When to Use
Any project handling PHI (HIPAA), student records (FERPA), or other regulated data requiring organizational file ownership.

## Source Project
Transcend_IntakeSystem | 2026-05-31
