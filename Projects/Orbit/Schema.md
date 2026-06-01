# Schema — BLR World HRMS (Orbit)
> **Always reflects CURRENT state.** When columns change, update in place.
> History of schema decisions goes in `Decisions.md`.

---

## Google Sheets Structure
| Tab Name | AppSheet Table | Type | Notes |
|----------|---------------|------|-------|
| AppUser | AppUser | System | Standard OmmNoMi system table |
| AppAccess | AppAccess | System | System permissions config |
| AppView | AppView | System | Dynamic UX navigation |
| AppSetting | AppSetting | System | Key-value application constants |
| AppVariable | AppVariable | System | Dynamic workflow variables |
| AppTrigger | AppTrigger | System | Automation & integration queue |
| Employee | Employee | Operational (Core) | Central employee profile |
| EmployeeDocument | EmployeeDocument | Operational | Visas, passports, contracts |
| Project | Project | Operational | Master list of project bubbles |
| TaskList | TaskList | Operational | Onboarding/offboarding task tracker |
| CandidateSubmission | CandidateSubmission | Operational | Google Form staging area |
| ReviewCycle | ReviewCycle | Operational | Appraisal cycles (Annual, Mid-Year) |
| Objective | Objective | Operational | Employee objectives (3 to 10 per cycle) |
| SelfEvaluation | SelfEvaluation | Operational | Self-assessment ratings & comments |
| ManagerEvaluation | ManagerEvaluation | Operational | Manager assessment, development plans |
| AttendanceDaily | AttendanceDaily | Operational | GPS check-in/out attendance logs |
| LeaveAllocation | LeaveAllocation | Operational | Leave ledger (accrued vs used days) |
| ExpenseClaim | ExpenseClaim | Operational | AED financial claims & receipt attachments |
| Approval | Approval | Operational | Generic audit logs of approvals |

---

## System Tables
> Standard columns — see `_Patterns/Schema/SystemTables.md` for full config.
> Only note project-specific deviations here.

**AppUser deviations**: *(none)*

**AppUser Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Trigger_Employee_Update_AppUserID` | Execute `Update_AppUserID` on `LIST([Employee])` | `ISNOTBLANK([Employee])` |

**AppAccess Modules**: System, Employee, Attendance, Review, Finance
**AppAccess Levels**: SuperAdmin, HRManager, HRStaff, LineManager, Employee, FinanceAdmin

**Initial AppAccess rows**:
| ID | Module | AccessLevel |
|----|--------|------------|
| System_SuperAdmin | System | SuperAdmin |
| Employee_HRManager | Employee | HRManager |
| Employee_HRStaff | Employee | HRStaff |
| Attendance_LineManager | Attendance | LineManager |
| Review_Employee | Review | Employee |
| Finance_FinanceAdmin | Finance | FinanceAdmin |

**AppSetting Initial Values**:
| ID (Key) | Value | Description |
|---------|-------|-------------|
| CompanyName | BLR World | Company legal name |
| ClientDriveFolderID | *(Google Drive shared folder ID)* | Main HR Shared Folder ID |
| GeofenceLatitude | 25.2048 | Corporate office latitude (Dubai location) |
| GeofenceLongitude | 55.2708 | Corporate office longitude (Dubai location) |
| GeofenceRadiusMeters | 150.0 | Allowed check-in radius from corporate office |

---

## Operational Tables

### Employee
**Purpose**: Centralized employee directory. Represents active, onboarding, and archived team members.
**Parent Table**: None (Core entity)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | Plain text UUID |
| Code | Text | — | — | — | Display Name: "Employee ID" (Unique, alphanumeric) |
| FirstName | Text | — | — | — | |
| LastName | Text | — | — | — | |
| Email | Email | — | — | — | Primary work email |
| Mobile | Phone | — | — | — | Primary contact number |
| Status | Enum | `"Onboarding"` | — | — | Onboarding, Probation, Confirmed, Terminated |
| AppUserID | Enum Ref → AppUser | — | — | — | System login account association |
| AppUserLineManagerID | Enum Ref → AppUser | — | — | — | Reporting Officer / Line Manager account |
| Department | Enum | — | — | — | HR, Finance, Operations, Sales, Marketing, etc. |
| Designation | Text | — | — | — | Display Name: "Job Title" |
| DateOfJoining | Date | — | — | — | Display Name: "Joining Date" |
| DateOfConfirmation | Date | — | — | — | Display Name: "Confirmation Date" |
| DateOfTermination | Date | — | — | — | Display Name: "Termination Date" |
| DriveFolderID | Text | — | `ISBLANK([_THIS])` | — | Google Drive folder ID for files |
| DriveFolderURL | URL | — | `ISBLANK([_THIS])` | — | Link to folder |
| Notes | LongText | — | — | — | Internal HR commentary |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([Code], " - ", [FirstName], " ", [LastName])` | — | — | |
| AttendanceDailyCount (VC) | Virtual | `COUNT([Related AttendanceDaily])` | — | — | Lineage count |
| LeaveAllocationBalance (VC) | Virtual | `SUM([Related LeaveAllocation][LeaveAllocationDays])` | — | — | Lineage ledger sum |
| ExpenseClaimTotal (VC) | Virtual | `SUM(SELECT([Related ExpenseClaim][Amount], [Status] = "Approved"))` | — | — | Lineage sum of approved |
| TaskListPendingCount (VC) | Virtual | `COUNT(SELECT([Related TaskList][ID], [Status] = "Pending"))` | — | — | Lineage count |

**Slices**:
| Slice Name | Filter |
|-----------|--------|
| EmployeeActive | `OR([Status] = "Confirmed", [Status] = "Probation")` |
| EmployeeOnboarding | `[Status] = "Onboarding"` |
| EmployeeMyTeam | `[AppUserLineManagerID] = ANY(Me[ID])` |

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_Employee` | Set LastEditOn = UTCNOW() | TRUE |
| `Approved_Confirm` | Set Status = "Confirmed", DateOfConfirmation = TODAY() | `[Status] = "Probation"` |
| `Terminated_Employee` | Set Status = "Terminated", DateOfTermination = TODAY() | `[Status] <> "Terminated"` |
| `Update_AppUserID` | Set AppUserID = ANY(SELECT(AppUser[ID], [Employee] = [_THISROW].[ID])) | TRUE |

---

### EmployeeDocument
**Purpose**: Employee legal & company documentation tracker (Visa, Passport, Emirates ID).
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | Reference to parent employee |
| Type | Enum | — | — | — | Passport, Emirates ID, Visa, Labor Card, Contract, Other |
| DocumentNumber | Text | — | — | — | Passport/Visa number (Alphanumeric) |
| File | File | — | — | — | Document PDF/Image copy |
| DateOfIssue | Date | — | — | — | Display Name: "Issue Date" |
| DateOfExpiry | Date | — | — | — | Display Name: "Expiry Date" |
| NotificationStatus | Enum | `"Active"` | — | — | Active, Warning-30, Warning-15, Warning-7, Expired |
| VerificationStatus | Enum | `"Pending"` | — | — | Pending, Verified, Rejected |
| VerificationNotes | Text | — | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " - ", [Type])` | — | — | |

**Actions**:
| Action | Type | Condition |
|--------|------|-----------|
| `Sync_EmployeeDocument` | Set LastEditOn = UTCNOW() | TRUE |
| `Approved_VerifyDoc` | Set VerificationStatus = "Verified" | `[VerificationStatus] = "Pending"` |

---

### Project
**Purpose**: Master list of business bubbles or projects for employee assignment.
**Parent Table**: None

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| Code | Text | — | — | — | Project Code |
| Name | Text | — | — | — | Project Name |
| Status | Enum | `"Active"` | — | — | Active, Inactive, Completed |
| Description | LongText | — | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([Code], " - ", [Name])` | — | — | |

---

### TaskList
**Purpose**: Tasks generated automatically or manually during employee lifecycles (onboarding checklists).
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | Associated employee |
| Title | Text | — | — | — | |
| Description | LongText | — | — | — | |
| Status | Enum | `"Pending"` | — | — | Pending, Completed, Cancelled |
| AppUserAssignedToID | Enum Ref → AppUser | — | — | — | User assigned to complete task |
| DueDate | Date | — | — | — | |
| CompletedOn | DateTime | — | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([Title], " (", [Status], ")")` | — | — | |

---

### CandidateSubmission
**Purpose**: Connected directly to Google Form responses sheet.
**Parent Table**: None
**Key**: `Timestamp`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| Timestamp | DateTime (Key) | — | FALSE | FALSE | Auto-generated by Google Form |
| First Name | Text | — | FALSE | FALSE | |
| Last Name | Text | — | FALSE | FALSE | |
| Email Address | Email | — | FALSE | FALSE | |
| Phone Number | Phone | — | FALSE | FALSE | |
| Position Applied For | Text | — | FALSE | FALSE | |
| Upload Resume | File | — | FALSE | FALSE | |
| ProcessedStatus | Enum | `"New"` | — | — | Admin column: New, Processing, Processed, Failed |
| EmployeeID | Enum Ref → Employee | — | — | — | Admin column: created profile reference |
| ProcessedOn | DateTime | — | — | — | Admin column |
| ProcessedBy | Enum Ref → AppUser | — | — | — | Admin column |

---

### ReviewCycle
**Purpose**: Performance appraisal cycle windows.
**Parent Table**: None

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| Title | Text | — | — | — | e.g. "Annual Appraisal 2025" |
| Type | Enum | `"Annual"` | — | — | Annual, Mid-Year |
| Status | Enum | `"Open"` | — | — | Open, Locked, Closed |
| DateStart | Date | — | — | — | Cycle start date |
| DateEnd | Date | — | — | — | Cycle end date |
| ReviewCycleWeightage | Decimal | `0.70` | — | — | Weightage: e.g. Mid-Year=0.30, Annual=0.70 |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `[Title]` | — | — | |

---

### Objective
**Purpose**: Performance objectives set by employees during review cycles.
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | Owner employee |
| ReviewCycleID | Enum Ref → ReviewCycle | — | `ISBLANK([_THIS])` | — | Appraisal cycle window |
| Title | Text | — | — | — | Objective Title |
| Description | LongText | — | — | — | |
| Weightage | Decimal | `1.0` | — | — | |
| Status | Enum | `"Draft"` | — | — | Draft, Pending Approval, Approved, Realigned |
| RealignmentNotes | Text | — | — | — | HR alignment comments |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " - ", [Title])` | — | — | |

---

### SelfEvaluation
**Purpose**: Employee self-assessments per section (Core Values, Competencies, Objectives).
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | |
| ReviewCycleID | Enum Ref → ReviewCycle | — | `ISBLANK([_THIS])` | — | |
| Section | Enum | — | — | — | Core Values, Core Competencies, Performance Objectives |
| Narrative | LongText | — | — | — | Written response |
| SelfRating | Number | — | — | — | 1 to 5 scale rating |
| File | File | — | — | — | Optional evidence attachment |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " - Self Eval (", [Section], ")")` | — | — | |

---

### ManagerEvaluation
**Purpose**: Line Manager assessment of their direct reports' appraisal sections.
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | |
| ReviewCycleID | Enum Ref → ReviewCycle | — | `ISBLANK([_THIS])` | — | |
| CommentsValues | LongText | — | — | — | Manager values observations |
| RatingValues | Number | — | — | — | 1 to 5 scale |
| CommentsCompetencies | LongText | — | — | — | Manager competencies observations |
| RatingCompetencies | Number | — | — | — | 1 to 5 scale |
| CommentsObjectives | LongText | — | — | — | Manager objectives observations |
| RatingObjectives | Number | — | — | — | 1 to 5 scale |
| FinalRating (VC) | Virtual | `([RatingValues] * 0.20) + ([RatingCompetencies] * 0.20) + ([RatingObjectives] * 0.60)` | — | — | Calculated average score |
| DevelopmentActions | LongText | — | — | — | Focus items & training actions |
| Status | Enum | `"Draft"` | — | — | Draft, Submitted, HR Approved, Realignment Needed |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " - Manager Eval")` | — | — | |

---

### AttendanceDaily
**Purpose**: Daily attendance logging with GPS geofencing verification.
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | |
| Date | Date | `TODAY()` | `ISBLANK([_THIS])` | — | Attendance log date (DD/MM/YYYY) |
| CheckInTime | DateTime | `UTCNOW()` | — | — | UTC timestamp |
| CheckInLocation | LatLong | `HERE()` | — | — | Captured on check-in |
| CheckInOffset | Decimal | — | — | — | Computed distance from geofence office |
| CheckInStatus | Enum | `"On-Time"` | — | — | On-Time, Late, Invalid GPS |
| CheckOutTime | DateTime | — | — | — | UTC timestamp |
| CheckOutLocation | LatLong | — | — | — | Captured on check-out |
| CheckOutOffset | Decimal | — | — | — | Distance from geofence office |
| CheckOutStatus | Enum | — | — | — | Completed, Early, Invalid GPS |
| WorkHours (VC) | Virtual | `IF(ISBLANK([CheckOutTime]), 0.0, HOUR([CheckOutTime] - [CheckInTime]) + (MINUTE([CheckOutTime] - [CheckInTime]) / 60.0))` | — | — | Calculated hour duration |
| Status | Enum | `"Absent"` | — | — | Present, Absent, Half-Day, On Leave, Auto-Completed |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " - ", TEXT([Date], "DD/MM/YYYY"))` | — | — | |

---

### LeaveAllocation
**Purpose**: Ledger entries for leaves accrued and taken (ledger balance sheet model).
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | |
| Type | Enum | `"Usage"` | — | — | Accrual, Usage |
| LeaveType | Enum | — | — | — | Annual Leave, Sick Leave, Maternity Leave, Paternity Leave, Unpaid Leave |
| DateStart | Date | — | — | — | Start date of leave |
| DateEnd | Date | — | — | — | End date of leave |
| LeaveAllocationDays | Decimal | — | — | — | Entitled (+) or Deducted (-) number of days |
| Status | Enum | `"Draft"` | — | — | Draft, Pending Approval, Approved, Rejected |
| Notes | Text | — | — | — | Reason for request |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " - ", [LeaveType], " (", [LeaveAllocationDays], " Days)")` | — | — | |

---

### ExpenseClaim
**Purpose**: Expense capture in AED requiring digital receipts.
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| EmployeeID | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | |
| Title | Text | — | — | — | Expense title/description |
| Category | Enum | — | — | — | Travel, Meals & Entertainment, Office Supplies, Training, Other |
| Amount | Price | — | — | — | Currency: AED, Decimals: 2 |
| Date | Date | `TODAY()` | — | — | Date incurred |
| File | Image | — | — | — | Mandatory receipt upload |
| Status | Enum | `"Draft"` | — | — | Draft, Pending Manager Approval, Pending Finance Approval, Approved, Rejected |
| ManagerNotes | Text | — | — | — | |
| FinanceNotes | Text | — | — | — | |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " - ", [Title], " (", [Amount], " AED)")` | — | — | |

---

### Approval
**Purpose**: Centralized log of status changes and approvals across modules.
**Parent Table**: None

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| RelatedTable | Text | — | `ISBLANK([_THIS])` | — | e.g. "LeaveAllocation", "ExpenseClaim", "Objective" |
| RelatedRecordID | Text | — | `ISBLANK([_THIS])` | — | ID of target record |
| AppUserApproverID | Enum Ref → AppUser | — | — | — | |
| Status | Enum | `"Pending"` | — | — | Pending, Approved, Rejected |
| DecisionDate | DateTime | — | — | — | UTC timestamp |
| Notes | Text | — | — | — | Comments |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([RelatedTable], " Approval (", [Status], ")")` | — | — | |

---

## Enum Values Defined
| Table.Column | Values |
|-------------|--------|
| Employee.Status | Onboarding, Probation, Confirmed, Terminated |
| Employee.Department | HR, Finance, Operations, Sales, Marketing, Executive |
| EmployeeDocument.Type | Passport, Emirates ID, Visa, Labor Card, Contract, Other |
| EmployeeDocument.NotificationStatus | Active, Warning-30, Warning-15, Warning-7, Expired |
| EmployeeDocument.VerificationStatus | Pending, Verified, Rejected |
| TaskList.Status | Pending, Completed, Cancelled |
| CandidateSubmission.ProcessedStatus | New, Processing, Processed, Failed |
| ReviewCycle.Type | Annual, Mid-Year |
| ReviewCycle.Status | Open, Locked, Closed |
| Objective.Status | Draft, Pending Approval, Approved, Realigned |
| SelfEvaluation.Section | Core Values, Core Competencies, Performance Objectives |
| ManagerEvaluation.Status | Draft, Submitted, HR Approved, Realignment Needed |
| AttendanceDaily.CheckInStatus | On-Time, Late, Invalid GPS |
| AttendanceDaily.CheckOutStatus | Completed, Early, Invalid GPS |
| AttendanceDaily.Status | Present, Absent, Half-Day, On Leave, Auto-Completed |
| LeaveAllocation.Type | Accrual, Usage |
| LeaveAllocation.LeaveType | Annual Leave, Sick Leave, Maternity Leave, Paternity Leave, Unpaid Leave |
| LeaveAllocation.Status | Draft, Pending Approval, Approved, Rejected |
| ExpenseClaim.Category | Travel, Meals & Entertainment, Office Supplies, Training, Other |
| ExpenseClaim.Status | Draft, Pending Manager Approval, Pending Finance Approval, Approved, Rejected |
| Approval.Status | Pending, Approved, Rejected |

---

## AppSetting Initial Values
| ID (Key) | Value | Description |
|---------|-------|-------------|
| CompanyName | BLR World | |
| DubaiOfficeLatitude | 25.2048 | For HERE() geofence validation |
| DubaiOfficeLongitude | 55.2708 | For HERE() geofence validation |
| AllowedRadiusMeters | 150.0 | geofence tolerance threshold |

---

## AppAccess Initial Values
| ID | Module | AccessLevel |
|----|--------|------------|
| System_SuperAdmin | System | SuperAdmin |
| Employee_HRManager | Employee | HRManager |
| Employee_HRStaff | Employee | HRStaff |
| Attendance_LineManager | Attendance | LineManager |
| Review_Employee | Review | Employee |
| Finance_FinanceAdmin | Finance | FinanceAdmin |

---

## AppSheet Automations (Bots)

### Bot: Sync AppUser to Employee
* **Trigger Event**: `ADDS_ONLY` on `AppUser` table
* **Trigger Condition**: `ISNOTBLANK([Employee])`
* **Run Step**: Run Action `Trigger_Employee_Update_AppUserID` on the current `AppUser` record.
* **Purpose**: Automatically write the newly created `AppUser.ID` back to the corresponding `Employee` record's `AppUserID` column to establish the two-way relationship.
