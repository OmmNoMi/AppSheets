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
| SP-005 | Form Branching & Multi-Row Expansion for flat arrays | 2026-06-13 |
| BF-007 | Ref Display vs. Database Raw Value (use raw keys in automation) | 2026-06-13 |
| BF-008 | Schema Validation Mismatches on Custom Action Steps (Text vs Number) | 2026-06-13 |
| AU-009 | The `[_THISROW]` Scope Qualifier in multi-step row generation loops | 2026-06-13 |


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

---

### Schema: Form Branching & Multi-Row Expansion
**Problem**: Users shouldn't see Medication #2 and #3 if they only have 1 medication, but the database needs all medications in a normalized, related table.
**Solution**: (1) Google Form uses branching logic ("Go to section based on answer") to skip Medication 2/3 and route to Submit. (2) AppSheet Bot runs multiple sequential "Add a new row" tasks. It checks if the columns for Med #2/#3 are populated and explicitly maps the flattened form columns into distinct rows in the `Medication` child table.
**AppSheet Config**: 3 sequential Data Actions in the Bot mapping `[_THISROW].[FormIntake].[Medication Name_65]`, etc.
**Tested**: Yes
**Reusable**: Yes — standard pattern for flattening multi-entry forms into relational rows.

---

### Bug Fix: AppSheet "Ref" Display vs. Database Raw Value
**Problem**: AppSheet renders Ref columns as the Display Label in the UI (e.g., "06/13/2026 - John Doe"). Developers mistakenly assume they must use complex `CONTAINS` formulas to extract the ID.
**Solution**: AppSheet always stores the RAW KEY (e.g., the timestamp or UniqueID) in the backend spreadsheet. Direct dereferencing like `[_THISROW].[FormIntake].[ColumnName]` works natively without lookup formulas. Always trust the raw spreadsheet data, not the AppSheet UI rendering.
**AppSheet Config**: Native dereferencing.
**Tested**: Yes
**Reusable**: Yes — core AppSheet conceptual learning.

---

### Bug Fix: Schema Validation Mismatches on Custom Action Steps
**Problem**: Action bots run successfully but silently fail to append rows into child tables.
**Solution**: strict Type validation. If an `Amount` column is typed as `Number`, but a user types "half" or "1 tablet" in a text input, AppSheet rejects the insert entirely. 
**Fix**: Monitor `Manage > Monitor > Audit History` for type conversion crashes. Change unpredictable input columns to `Text` type for system tolerance.
**Tested**: Yes
**Reusable**: Yes — universal debugging step for silent action failures.

---

### Automation: The `[_THISROW]` Scope Qualifier
**Problem**: Mapping `[FormIntake].[Medication Name]` directly inside an automation step on the Client table fails to resolve.
**Solution**: AppSheet loses scope of the active row triggering the bot during multi-step actions. You must explicitly prefix the path with `[_THISROW]` (e.g., `[_THISROW].[FormIntake].[Medication Name]`) to cross-reference columns cleanly.
**Tested**: Yes
**Reusable**: Yes — mandatory for all multi-step row generation loops.
