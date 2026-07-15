# Decisions Log — BLR World HRMS (Orbit)
> **Append-only.** Never delete or edit previous entries.
> This file captures WHY decisions were made — the Schema.md captures WHAT the current state is.

---

## Log

### 2026-06-01 Project Initialized
**Context**: New project started for BLR World to digitize employee HR operations.
**Decision**: Created project folder `projects/Orbit` from templates.
**Reason**: Standard OmmNoMi onboarding.
**Impact**: Project scaffolding created.
**Pattern**: Not reusable

### 2026-06-01 Dubai Timezone & Locale Setup
**Context**: Client operates in Dubai, UAE (GST - UTC+4) and requires dates formatted in DD/MM/YYYY.
**Decision**: Configure all DateTime values using `UTCNOW()` and calculate offsets in AppSheet or let the client UI translate automatically. Store all date properties formatted as DD/MM/YYYY in Google Sheets.
**Reason**: Standardizing on UTC storage prevents sync conflicts across mobile devices.
**Impact**: Initial value formulas for dates use `TODAY()` or date portion of `UTCNOW()`.
**Pattern**: Not reusable

### 2026-06-01 Weighted Performance Review Scoring
**Context**: Performance review framework dictates that the final score is weighted 30% from the Mid-Year Review and 70% from the Annual Appraisal.
**Decision**: Evaluative scoring is modeled in `ManagerEvaluation` per cycle. The final aggregate rating is calculated as `(MidYearScore * 0.3) + (AnnualScore * 0.7)` at the employee profile level or in summary reporting.
**Reason**: Separate evaluation entries per cycle are merged into employee profile aggregates without creating duplicate profile fields.
**Impact**: `ManagerEvaluation` stores cycle ratings; `Employee` table has virtual metrics to pull scores.
**Pattern**: Not reusable

### 2026-06-01 GPS Geofencing for AttendanceDaily
**Context**: Prevent unauthorized check-ins. Attendance must be logged from the corporate office in Dubai.
**Decision**: Validate check-ins using `HERE()` and calculate `CheckInOffset` and `CheckOutOffset` in meters against office coordinates stored in `AppSetting` (`DubaiOfficeLatitude = 25.2048`, `DubaiOfficeLongitude = 55.2708`). Restrict status to "Invalid GPS" if offset is > 150 meters.
**Reason**: Strict labor law compliance and verification.
**Impact**: `AttendanceDaily` uses `HERE()` to compute offsets; checks status on check-in/out.
**Pattern**: Reusable (GPS-Validated Check-in geofencing)

### 2026-06-01 Drive Folder Movement Automation
**Context**: Auto-organize Google Drive folders as employees transition from Onboarding -> Probation -> Confirmed -> Terminated.
**Decision**: Trigger a Google Apps Script execution via AppSheet Webhook (`AppTrigger`) to move folders between parent directories (`Onboarding/`, `Active/`, `Archived/`) on status transitions.
**Reason**: Avoid manual Drive file sorting and maintain compliance.
**Impact**: Apps Script connects to Google Drive API, renames/moves directories, and updates `Employee.DriveFolderURL`.
**Pattern**: Reusable (Google Drive Folder Lifecycle Automator)

### 2026-06-01 Schema Standards Enforcement
**Context**: Adhere strictly to OmmNoMi standard naming.
**Decision**: Normalize tables to singular PascalCase (e.g. `Employee` and `LeaveAllocation`). Use prefix-based column names for relationships (e.g. `AppUserLineManagerID` instead of `LineManager`) and prefix aggregates (e.g. `LeaveAllocationBalance` and `ExpenseClaimTotal`).
**Reason**: Clean, AI-ready relational data models.
**Impact**: Unified schema layout.
**Pattern**: SP-001 / FP-001

### 2026-06-01 Two-Way AppUser to Employee Link Automation
**Context**: When an administrator creates a user profile (`AppUser`), the corresponding `Employee.AppUserID` must be updated automatically to maintain reference integrity.
**Decision**: Created a two-way sync automation. An AppSheet bot triggers on `ADDS_ONLY` to the `AppUser` table, calling a trigger action on the related `Employee` row which updates its `AppUserID` column via `ANY(SELECT(AppUser[ID], [Employee] = [_THISROW].[ID]))`.
**Reason**: Avoids requiring manual selection of the `AppUser` on the Employee profile, simplifying the onboarding workflow.
**Impact**: `Employee.AppUserID` is auto-populated upon user creation.
**Pattern**: Reusable (Cross-Table Reference Sync Pattern)

### 2026-06-02 AttendanceRequest Table & Employee Immutability
**Context**: Required a way to handle Time Off in Lieu (TOIL) and Attendance Regularization requests, explicitly linking them to employees and optionally daily logs.
**Decision**: Added `AttendanceRequest` table to the schema. Set the `Editable_If` rule for the `EmployeeID` column strictly to `ISBLANK([_THIS])`.
**Reason**: To ensure that the requested employee is immutable once the request is created. Even if a People Admin makes the request on behalf of an employee, the employee target cannot be swapped out afterwards.
**Impact**: `AttendanceRequest` table introduced; `EmployeeID` field locks after creation for all users.
**Pattern**: Reusable (Creation-Only Column Restriction)

---

### 2026-06-18 Phase 3 — Early Careers Module Kickoff
**Context**: IKAROS engaged OmmNoMi as technical development partner to build the Orbit Early Careers & Internship Module per SOW v2.0 (8 June 2026). Client is BLR World; IKAROS is the project sponsor.
**Decision**: Phase 3 is treated as an additive module on top of the existing Orbit Phase 1 and Phase 2 codebase. No new AppSheet app or Google Sheet is created — all new tables are added to the existing Orbit Main spreadsheet.
**Reason**: Maximum reuse of existing Employee, TaskList, EmployeeDocument, CandidateSubmission, Project, and Approval infrastructure. Avoids data duplication and preserves the existing data model integrity.
**Impact**: 9 new Google Sheet tabs, 3 extended existing tables, 3 new AppVariables roles, 4 new AppSettings, 12 new bots.
**Pattern**: Reusable (Additive Module Pattern — extend existing Base App)

### 2026-06-18 Internship Status as 11-State Machine
**Context**: SOW defines 11 status states for the intern lifecycle.
**Decision**: Implement all status transitions via AppSheet Action buttons ONLY — no manual text editing of the Status field. Actions are role-gated and condition-gated to enforce valid transitions.
**Reason**: Mirrors the existing Orbit Employee status engine pattern. Prevents data corruption from invalid status entries. Ensures automation bots trigger correctly (bots watch for specific status transitions).
**Impact**: 8 Action buttons on the Internship table covering all valid forward transitions + 1 withdrawal action. Status field is Enum sourced from InternStatus_List AppVariable.
**Pattern**: Reusable (State Machine via Action Buttons — extended from Employee pattern)

### 2026-06-18 Compliance Engine — Rules Table + Auto-Build Bot
**Context**: SOW requires jurisdiction-specific compliance items to be automatically generated per intern based on their country.
**Decision**: Use a two-table pattern: `ComplianceRule` (config, pre-seeded once from SOW Appendix B) and `ComplianceItem` (operational, auto-generated per intern). The `Bot_ComplianceBuilder` creates items via AppSheet "For each row" automation step when Country is first set on an Internship.
**Reason**: Separating rules from instances allows the compliance engine to be updated (new country added, rule changed) without touching any existing intern records. Idempotency check (COUNT = 0) prevents duplicate item generation.
**Impact**: ComplianceRule pre-seeded with 12 rules across 5 jurisdictions. ComplianceItem auto-populated on country selection. Bot triggers only once per internship.
**Pattern**: Reusable (Rules Table + Instance Builder Pattern)

### 2026-06-18 Passport Validity — 7-Month Rule Implementation
**Context**: SOW requires a passport validity check: passport expiry must be at least 7 months beyond the internship end date.
**Decision**: Implemented as a bot on `EmployeeDocument` (ADDS_AND_UPDATES, condition: Type = Passport AND IsIntern = TRUE). Bot uses `EDATE([EndDate], 7)` to compute the minimum valid date and sets `NotificationStatus` to Active / Warning-30 / Expired accordingly.
**Reason**: Reuses the existing EmployeeDocument.NotificationStatus enum (Active, Warning-30, Warning-7, Expired) to preserve consistency with the existing document expiry notification system.
**Impact**: Bot_PassportValidityCheck added. Internship.PassportExpiryCheck VC displays traffic-light status on the intern record. HR notified immediately on Warning or Expired result.
**Pattern**: Reusable (Document Validity Check with Minimum Lead Time)

### 2026-06-18 InternReview — Reuses Orbit 1-5 Rating Scale
**Context**: SOW states intern reviews should use the Orbit performance wizard 1-5 scale so scores are comparable with the wider performance engine.
**Decision**: Created a separate `InternReview` table (rather than extending ManagerEvaluation) with four rating dimensions (Quality, Timeliness, Communication, Collaboration) on the same 1-5 Enum scale. AverageScore is a Virtual Column computing the mean. ScoreLabel VC maps to the Orbit rating labels (Exceeds Expectations → Does Not Meet Expectations).
**Reason**: A dedicated table keeps intern review data separate from employee appraisal data, avoiding slice complexity. The shared 1-5 scale preserves cross-cohort comparability.
**Impact**: InternReview table with 2 VCs (AverageScore, ScoreLabel). Mid and End bots trigger review task creation. Regular reviews are on a configurable cadence (AppSettings: ReviewCadenceDays).
**Pattern**: Reusable (Numeric Rating with Label VC pattern)

### 2026-06-18 InternFeedback — Single Standardised Form Replaces 3 Variants
**Context**: SOW notes that BLR World currently has three different feedback form variants. The module must replace these with a single standardised form.
**Decision**: One `InternFeedback` table with 6 Section A rating fields (1-5 Enum) and 5 Section B free text fields. Bot pre-creates a Draft record 14 days before end date (configurable via AppSettings `InternFeedbackDaysBeforeEnd`). Intern fills it in via the `InternFeedback_Form` view.
**Reason**: Pre-creating the record via bot allows deep linking from the email notification directly to the specific form. Intern does not need to navigate or create a new record — just fill and submit.
**Impact**: Bot_FeedbackDispatch added. OverallScore VC auto-calculates mean of 6 dimensions. Scores feed directly into the Leadership Dashboard charts (Phase B).
**Pattern**: Reusable (Bot Pre-Create + Deep Link Form pattern)

### 2026-06-18 University Coordinator Role — Row-Level Security via AppUser
**Context**: SOW specifies an optional University Coordinator persona with read-only access to sponsored interns only.
**Decision**: Add a `UniversityID` column (Enum Ref → University) to the `AppUser` table. The `InternshipByUniversity` slice filters using `[EmployeeID].[UniversityID] = LOOKUP(ANY(Me[ID]),"AppUser","ID","UniversityID")`. This gives each coordinator access to only their institution's interns without any per-record manual gating.
**Reason**: Row-level security via a single AppUser-side attribute is the OmmNoMi standard pattern for partner/affiliate access. Cleaner than managing individual record-level permissions.
**Impact**: AppUser table gains `UniversityID` column (Phase B, add when University table exists). Slice filter is self-maintaining as new interns are added.
**Pattern**: Reusable (Partner Row-Level Security via AppUser Attribute)\n\n### 2026-06-18 Compliance Tables Eliminated — Extend DocType + Documents Instead\n**Context**: During review of the initial ComplianceRule + ComplianceItem design, it was noted that the live Orbit app already has a `DocType` (config) \u2192 `Documents` (instance) pattern that is structurally identical to what ComplianceRule \u2192 ComplianceItem would have been.\n**Decision**: Eliminate `ComplianceRule` and `ComplianceItem` as new tables. Instead:\n1. Extend `DocType` with 6 new columns: `Country`, `DocCategory`, `AppliesWhen`, `IsMandatory`, `IsComplianceRequirement`, `NationalityScope`. A slice `DocType_ComplianceRules` (IsComplianceRequirement=TRUE) serves as the rule filter.\n2. Extend `Documents` with 3 new columns: `InternshipID`, `ComplianceStatus`, `DueDate`. A Documents row with InternshipID set IS a compliance item. Existing DocType expiry alert system (RedAlert/OrangeAlert/YellowAlert) applies automatically.\n3. Extend `CheckList` with `Type = \"Internship Onboarding\"` template rows. Bot_InternOnboardingGenerator now uses the existing CheckList \u2192 TaskList creation pattern instead of hardcoded Add Row steps.\n**Reason**: Avoids 2 new sheet tabs and 2 new AppSheet tables. Reuses the established document lifecycle pattern already understood by the client. All existing document views, alerts, and verification flow apply automatically to compliance items.\n**Impact**: New sheet tabs reduced 9 \u2192 7. Existing tables extended: 3 \u2192 5. DocType update mode changed UPDATES_ONLY \u2192 ALL_CHANGES (bot read requirement). Bot_ComplianceBuilder condition updated to check Documents instead of ComplianceItem.\n**Pattern**: Reusable (Eliminate New Table by Extending Existing Equivalent Pattern)

---

### 2026-06-29 AttendanceRequest Delete Restricted to People Admin, Today/Future, Non-Approved Today Rows & Non-TOIL/Regularization Rows
**Context**: Attendance requests (TOIL, Regularization, Leave) link to daily attendance or ledger logs. Deleting past requests, today's already approved requests, or any TOIL/Regularization requests makes the ledger inconsistent and breaks check-in/out audit histories.
**Decision**: Restrict the Delete system action on the `AttendanceRequest` table to `U_People_Admin` and `U_System_Admin` roles. Only allow deletion if:
1. The request's `StartDate` is today or in the future (`[StartDate] >= TODAY()`).
2. The request is not for today and approved (`NOT(AND([StartDate] = TODAY(), [Status] = "Approved"))`).
3. The request type is NOT TOIL or Attendance Regularization (`NOT(IN([RequestType], {"Time Off in Lieu (TOIL)", "Attendance Regularization"}))`).
**Reason**: To protect past attendance check-in/out and leave allocations from being orphaned or broken when a request is deleted. Deletion of past records is strictly blocked. For today's requests, if they are already approved, they have already generated ledger allocations or updated logs, so they cannot be deleted. Future approved requests (excluding TOIL/Regularization) are still deletable. TOIL and Attendance Regularization records are never deletable to maintain absolute ledger safety.
**Impact**: Update the Behavior Condition of the `Delete` action on the `AttendanceRequest` table. Normal employees and non-admin roles cannot delete any requests.
**Pattern**: Reusable (Role-Gated Past-Record, Today-Approved, and TOIL/Regularization Deletion Prevention Pattern)

---

### 2026-06-29 ExpenseClaims Claim_Type Sourced from AppVariables
**Context**: User requested adding new options ("Corporate Debit Card" and "Corporate Credit Card") to the expense claim selection list. The existing `Claim_Type` column in the `ExpenseClaims` table dynamically loads its dropdown options from the `AppVariables` table using the ID `Emp_ExpenceClaim_Type`.
**Decision**: Instead of introducing a new column, update the existing `AppVariables` row `Emp_ExpenceClaim_Type` `EnumValue` setting to: `Travel, Meals, Supplies, Corporate Debit Card, Corporate Credit Card, Other`.
**Reason**: This aligns with OmmNoMi's dynamic variables architecture. AppSheet pulls the options dynamically via `=SPLIT(LOOKUP("Emp_ExpenceClaim_Type", "AppVariables", "ID", "EnumValue"), ", ")`, allowing options to be edited database-side without app redevelopment.
**Impact**: Update the `Schema.md` to document the `Claim_Type` column and the correct Enum values for `Emp_ExpenceClaim_Type`.
**Pattern**: Reusable (Dynamic Variables-Driven Dropdown Pattern)

### 2026-07-05 Daily Attendance Key and Idempotency Date Format Fix
**Context**: User reported that tomorrow's attendance rows were being created for only 7 employees, and their statuses were being modified/overwritten hourly.
**Decision**: 
1. Fix the date formatting mismatch between the `AttendanceDaily` key and the `Employee.AttendanceToday` virtual column.
   - The key of `AttendanceDaily` is generated as: `=text([Date],"dd/mm/yyyy")&"-"&[Employee]`.
   - The virtual column `Employee.AttendanceToday` formula was incorrect: `=TEXT(TODAY()+1,"MM/DD/YYYY")&"-"&[ID]`.
   - Update `Employee.AttendanceToday` formula to: `=TEXT(TODAY()+1,"DD/MM/YYYY")&"-"&[ID]`.
2. This ensures the `ISBLANK([AttendanceToday].[Status])` guard correctly evaluates to `FALSE` after the row is created, preventing the hourly scheduled bot from continually re-adding/overwriting the daily attendance rows.
**Reason**: Align the date formats so that lookup references evaluate correctly.
**Impact**: Stabilizes hourly sync behaviors, prevents data overwrites, and allows safety net bots to correctly check for missing rows.
### 2026-07-05 AppSheet Scheduled Bots Timezone and Formatting Best Practices
**Context**: Handled edge cases and error prevention for scheduled daily attendance generation bots in AppSheet to prevent timing offsets and data insertion errors.
**Decision**:
1. **Timezone Offset Guard**: Avoid scheduling daily creation bots between 12:00 AM and 04:00 AM local time. This is because AppSheet evaluates `TODAY()` on its server in UTC, creating a mismatch where the server date lags behind the local date (e.g. 2:00 AM GST local time is 10:00 PM UTC of the previous day, causing the bot to generate rows for the wrong day). Schedule daily bots at 08:00 AM local time or later.
2. **Explicit Concatenation & Capitalization**: Use `CONCATENATE(TEXT([Date], "DD/MM/YYYY"), "-", [Employee])` instead of implicit string coercion to guarantee formatting consistency across different database regional settings.
3. **Idempotency Guard**: Always wrap row creation steps in a `FILTER` that verifies the key does not already exist via `ISBLANK(LOOKUP(...))`, preventing duplicate primary key errors during manual triggers.
**Reason**: Prevent server-to-client timezone issues and database formatting mismatches.
**Impact**: Clean, error-free daily automations.

### 2026-07-15 Daily Attendance Today Safety Net (Hourly Scheduled Bot)
**Context**: User requested adding a check and safety net to the daily scheduled bot. If someone deletes the today attendance row, the bot should detect the omission and automatically recreate it during its next hourly check, while preserving the old functionality (pre-creating tomorrow's row at night) and correctly handling all leave, holiday, and weekend use cases globally.
**Decision**:
1. **Single Action Method**: Define a single action `CreateEmployeeAttendanceToday` in the `Employee` table (`ADD_RECORD_TO` the `AttendanceDaily` table for `Date` = `TODAY()`, `Employee` = `[ID]`).
2. **Direct Bot Step Filtering**: Run this action in the hourly scheduled bot using the step filter condition:
   ```appsheet
   AND(
     IN([Status], {"Probation", "Onboarding", "Confirmed"}),
     ISBLANK(
       SELECT(
         AttendanceDaily[ID],
         AND(
           [Employee] = [_THISROW].[ID],
           [Date] = TODAY()
         )
       )
     )
   )
   ```
3. **Dynamic Initial Values Resolution**: Rely on the `AttendanceDaily` table's native Initial Value formulas to automatically resolve holiday checks (comparing `OfficeHoliday` with employee's `Office_Calendar`), leave/request check (matching approved `AttendanceRequest`), and weekend check (evaluating `Office_Shift.Type = "Day Off"`).
**Reason**: Placing the conditional logic directly in the bot step eliminates the need for virtual columns or parent loop actions. Recreating rows using standard values allows native initial values to dynamically and safely calculate status, avoiding redundant logic and hardcoding.
**Impact**: Restores deleted attendance logs within the hour across all global locations, with zero virtual column overhead.
