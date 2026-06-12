# Learnings — Transcend IntakeSystem
> Reusable patterns discovered in this project. Antigravity promotes entries to `_Patterns/` after verification.

---

## Pending Promotion to _Patterns/
*(All entries promoted — see table below)*


---

## Already Promoted to _Patterns/
| Pattern ID | Summary | Date Promoted |
|-----------|---------|--------------|
| SP-002 | Normalize flat Google Form repeating columns to child table | 2026-05-31 |
| SP-003 | HIPAA Shared Drive structure for client files | 2026-05-31 |
| SP-004 | Google Form sheet integration rules (never rename, add admin cols at end) | 2026-05-31 |
| BF-005 | HIPAA/PCI: App Script extracts last 4 of card number only | 2026-05-31 |
| AU-003 | Consent-driven document versioning (Yes/No flags → doc paragraph) | 2026-05-31 |
| AU-004 | Hourly App Script bot for auto-processing new form submissions | 2026-05-31 |


---

## Detailed Entries

### Schema: Normalize Flat Form Columns to Child Table
**Problem**: Google Form outputs medications as flat column groups (3 sets of 7 columns each = 21 columns). Flat columns break scalability and make AppSheet formulas verbose.
**Solution**: App Script reads all 3 medication column groups during intake processing. Creates one `ClientMedication` record per non-empty medication row. AppSheet uses `[Related ClientMedications]` list dereference.
**AppSheet Config**: `ClientMedication` table with `ClientID` (Enum Ref → Client), `SortOrder` (Number 1/2/3+)
**Tested**: No (schema design only)
**Reusable**: Yes — any project where Google Form has repeating field groups

---

### Schema: HIPAA/PCI Card Data Handling
**Problem**: Google Form collects full card number + CVV. PCI DSS prohibits storing full card numbers. CVV must never be stored anywhere.
**Solution**: App Script reads raw form sheet → extracts `RIGHT([CardNumber], 4)` → writes only `CardLast4` to `ClientPayment`. CVV is never written anywhere. Raw form sheet restricted to admin.
**AppSheet Config**: `ClientPayment.CardLast4` (Text, Editable_If = ISBLANK([_THIS])). No full card column in AppSheet.
**Tested**: No
**Reusable**: Yes — any healthcare or payment-sensitive project

---

### Schema: Google Shared Drive for HIPAA
**Problem**: PHI files cannot live in personal "My Drive" (ownership risk if employee leaves, insufficient org control).
**Solution**: Google Workspace Shared Drive owned by the organization. One subfolder per client: `[ClientID]_[LastName]_[FirstName]/`. Root folder ID in AppSetting. App Script uses `driveId` param in Drive API calls.
**AppSheet Config**: `Client.DriveFolderID` (Text), `Client.DriveFolderURL` (URL). `AppSetting.DriveFolderID` = root Shared Drive folder ID.
**Tested**: No
**Reusable**: Yes — any HIPAA or FERPA compliant project with file storage

---

### Automation: Hourly App Script Bot
**Problem**: Admin only available 8am-12pm AZ. Client form submissions happen 24/7. Need auto-processing without manual button.
**Solution**: App Script `processNewIntakes()` function with `ScriptApp.newTrigger().timeBased().everyHours(1)` trigger. Filters `FormIntake` for `ProcessedStatus = "New"`. Logs each run to AppTrigger table.
**AppSheet Config**: `AppSetting.BotProcessingEnabled` = TRUE/FALSE toggle. `AppTrigger` table records each run with Status (Success/Failed) and count processed.
**Tested**: No
**Reusable**: Yes — any project with Google Form → AppSheet automated processing

---

### Schema: Google Form Sheet Integration Rules
**Problem**: AppSheet imports ALL columns from Google Form sheet. Renaming columns breaks form output. Adding columns in the middle breaks column index mapping.
**Solution**: (1) Never rename form-generated columns in AppSheet — use Display Name property instead. (2) Add admin columns (ProcessedStatus, ClientID, etc.) only at the END (rightmost) of the sheet. (3) Set FormIntake key = Timestamp (auto-generated, unique per submission).
**AppSheet Config**: Column Display Names for all form columns. Admin columns added right of last form column.
**Tested**: No
**Reusable**: Yes — applies to every project using Google Form as data source

---

### Formula: Consent-Driven Document Versioning
**Problem**: Service contract has conditional sections (email consent, telehealth consent). Client needs to actively opt-in or opt-out. Free-text in e-sign doc is confusing.
**Solution**: Two Yes/No fields captured at intake: `ConsentEmail`, `ConsentTelehealth`. App Script uses these as flags to include/exclude the appropriate pre-written paragraph block in the merged Google Doc template. Client just signs — no writing required.
**AppSheet Config**: `Client.ConsentEmail` (Enum: Yes/No), `Client.ConsentTelehealth` (Enum: Yes/No). App Script: `if (consentEmail === 'Yes') { includeSection('email_consent_yes') } else { includeSection('email_consent_no') }`
**Tested**: No
**Reusable**: Yes — any project with conditional document sections based on client preferences
