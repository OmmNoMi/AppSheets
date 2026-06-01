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
