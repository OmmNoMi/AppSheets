# Deployment Checklist — Transcend IntakeSystem
> Pre-launch checklist specific to this project. HIPAA compliance items marked ⚕️.

---

## Phase 1 Pre-Deployment

### Database Integrity
- [ ] No table uses `_RowNumber` as key — every table has `ID` with `TEXT(UNIQUEID())`
- [ ] All ID columns in Google Sheets formatted as **Plain Text**
- [ ] No spreadsheet formulas in any sheet tab
- [ ] All tab names match AppSheet table names exactly: `AppUser`, `AppAccess`, `AppView`, `AppSetting`, `AppVariable`, `AppTrigger`, `Client`, `ClientInsurance`, `ClientPayment`, `ClientMedication`, `ClientDocument`
- [ ] `Form Responses 1` tab: admin columns added at END only — no form columns renamed or reordered
- [ ] Virtual Column collision check completed on all tables

### System Columns
- [ ] All 7 tables have: `ID`, `CreatedBy`, `CreatedOn`, `LastEditBy`, `LastEditOn`, `Label` (VC)
- [ ] IntakeForm has: `ProcessedStatus`, `ClientID`, `ProcessedOn`, `ProcessedBy` added at right
- [ ] `CreatedBy` / `CreatedOn`: Reset on Edit = FALSE on all tables
- [ ] `LastEditBy` / `LastEditOn`: Reset on Edit = TRUE on all tables
- [ ] `Label` VC generates meaningful string on all tables

### HIPAA / PCI Compliance ⚕️
- [ ] Google Workspace BAA (Business Associate Agreement) confirmed active with David's Google account
- [ ] Google Shared Drive "Transcend_Clients" created — owned by practice org account
- [ ] `Form Responses 1` sheet access restricted to admin only (no therapist or external access)
- [ ] `ClientPayment` table: confirm `CardLast4` only — no full card number column exists in AppSheet
- [ ] Security Code (CVV): confirm NOT imported into any AppSheet table
- [ ] App Script `extractLast4()` tested: inputs "4111111111111111" → outputs "1111"
- [ ] App Script service account has access to Shared Drive only (minimum permissions)
- [ ] `AppSetting.DriveFolderID` = correct Shared Drive root folder ID (not My Drive)

### Security & Access
- [ ] AppAccess rows created: System_Admin, Operations_Manager, Therapist_View
- [ ] David Phelan → `System_Admin` role in AppUser
- [ ] Admin Assistant → `Operations_Manager` role in AppUser
- [ ] Tested as `Operations_Manager` — cannot see AppUser admin functions
- [ ] Tested as `Therapist_View` — cannot edit Client records, cannot see payment data
- [ ] `Me` slice filter working: `AND([AccessEmail] = USEREMAIL(), [Status] = "Active")`
- [ ] `ClientPayment` view: security filter = `IN("Admin", ANY(Me[Roles]))` (only admin sees payment)
- [ ] `ClientInsurance` card images: access restricted to Operations_Manager and above

### AppSetting Values Confirmed
- [ ] `CompanyName` = "Transcend Counseling & Wellness"
- [ ] `IntakeFormURL` = actual Google Form share URL (not edit URL)
- [ ] `DriveFolderID` = actual Shared Drive root folder ID
- [ ] `DocuSignEnabled` = "FALSE" (Phase 1 — Google e-Sign manual)
- [ ] `BotProcessingEnabled` = "TRUE"
- [ ] `SMTPFromEmail` = David's practice email

### App Script
- [ ] App Script project created and linked to Google Sheet
- [ ] `processNewIntakes()` function written and tested with sample form row
- [ ] `createClientDriveFolder()` creates folder in correct Shared Drive location
- [ ] `generateIntakePackage()` generates Google Doc from all 5 templates
- [ ] Consent section logic tested: ConsentEmail=Yes and ConsentEmail=No both render correctly
- [ ] Telehealth consent section logic tested
- [ ] `extractLast4()` tested with valid/invalid card numbers
- [ ] Time-based trigger set: every 1 hour
- [ ] `AppSetting.BotProcessingEnabled` flag respected — bot stops when set to FALSE
- [ ] Each bot run logs to AppTrigger: TriggerName, Status (Success/Failed), count processed

### Actions
- [ ] `Sync_Client` action on Client table — tested, LastEditOn updates
- [ ] `Sync_ClientDocument` action on ClientDocument table — tested
- [ ] `Send_IntakeLink` SMS action tested — sends correct Google Form URL to client mobile
- [ ] `Generate_Docs` manual button triggers App Script correctly
- [ ] `View_GoogleDoc` opens correct Google Doc URL
- [ ] `View_SignedPDF` opens correct signed PDF URL
- [ ] `Approved_Signed` sets Status to "Signed" and fills SignedOn timestamp
- [ ] `Approved_UploadedToEMR` sets Status to "UploadedToEMR" and fills UploadedToEMROn
- [ ] All Action `Only If` conditions verified — no ghost buttons visible

### Automations
- [ ] Bot run manually once — confirms it creates Client record correctly from test form row
- [ ] Bot run with `BotProcessingEnabled = FALSE` — confirms bot skips processing
- [ ] AppTrigger table shows bot run log entries
- [ ] Notification to admin when new client is processed (ADDS_ONLY on Client table)

### UX / Dashboard
- [ ] `Transcend_Dash` dashboard view created with pipeline view (by Status)
- [ ] Format rules applied:
  - `Status = "AwaitingSignature"` → Orange, 🔔
  - `Status = "Signed"` → Green, ✅
  - `Status = "New"` → Gray, 📋
  - `Status = "DocsGenerated"` → Blue, 📄
  - `Status = "UploadedToEMR"` → Green, ✅
- [ ] `ClientPayment` columns hidden from non-admin roles via Show_If
- [ ] System audit columns hidden from all form views
- [ ] Display Names set (e.g., `Mobile` → "Primary Phone", `Email` → "Client Email")
- [ ] IntakeForm `ProcessedStatus` shows color: New=Gray, Processing=Blue, Processed=Green, Failed=Red

### E-Signature Workflow (Manual — Phase 1)
- [ ] David and admin walkthrough tested: open Google Doc → Google e-Sign → enter client email → send
- [ ] Client receives e-sign request successfully (test with David's own email)
- [ ] After signing: signed PDF appears in Drive — admin manually copies URL to `ClientDocument.SignedPDFURL`
- [ ] `Approved_Signed` action used to advance status and timestamp

### Final
- [ ] David's account confirmed as AppUser with System_Admin role
- [ ] Admin Assistant's account confirmed with Operations_Manager role
- [ ] End-to-end test: submit test form → bot processes → docs generated → sent for e-sign → signed → checklist complete
- [ ] All learnings in `Learnings.md` reviewed — reusable ones promoted to `_Patterns/`
- [ ] `ProjectInfo.md` Deployment Status section updated

---
**Sign-off Date**: ___________
**Deployed By**: Nomeshwer Sharma (OmmNoMi)
**Client Confirmed**: David Phelan, LPC
