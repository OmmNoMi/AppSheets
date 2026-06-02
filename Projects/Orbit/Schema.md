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
| AttendanceRequest | AttendanceRequest | Operational | Time Off in Lieu (TOIL) & Regularization |
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

**AppVariable Initial Values (Leave Types)**:
| ID (Key) | Group | Type | Label | Value (Category) |
|---------|-------|------|-------|------------------|
| Leave_Type | Leave_Type | Enum | | LT_Sick, LT_Anul, LT_Stdy, LT_TOIL, LT_Ernd, LT_Pater, LT_Mater, LT_Comp, LT_LOP, LT_Unpaid |
| LT_Sick | Leave_Type | Enum | Sick Leave | Att_PL |
| LT_Anul | Leave_Type | Enum | Annual Leave | Att_PL |
| LT_Stdy | Leave_Type | Enum | Study Leave | Att_PL |
| LT_TOIL | Leave_Type | Enum | TOIL (Time Off In Lieu) | Att_PL |
| LT_Ernd | Leave_Type | Enum | Earned Leave | Att_PL |
| LT_Pater | Leave_Type | Enum | Paternity Leave | Att_PL |
| LT_Mater | Leave_Type | Enum | Maternity Leave | Att_PL |
| LT_Comp | Leave_Type | Enum | Compensatory Leave | Att_PL |
| LT_Compe | Leave_Type | Enum | Compassionate Leave | Att_PL |
| LT_LOP | Leave_Type | Enum | LOP (Loss of Pay) | Att_UL |
| LT_Unpaid | Leave_Type | Enum | Unpaid | Att_UL |

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

### AttendanceRequest
**Purpose**: Time Off in Lieu (TOIL) and Attendance Regularization requests.
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | Plain text UUID |
| RequestType | Enum | — | `ISBLANK([_THIS])` | — | "Time Off in Lieu (TOIL)", "Attendance Regularization", "Work From Home", "Leave Application", etc. |
| Leave | Enum | `"Full Day"` | — | — | Half Day or Full Day |
| LeaveSession | Enum | — | — | — | e.g. Morning, Afternoon (if Half Day) |
| Employee | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | Cannot be changed after creation. |
| StartDate | Date | `[AttendanceDaily].[Date]` | `OR(ISBLANK([AttendanceDaily]), IN([RequestType], {"Work From Home", "Leave Application", "Remote Work"}))` | `ISNOTBLANK([AttendanceDaily])` | Show_If: `OR(CONTEXT("ViewType") <> "Form", IN([RequestType], {"Work From Home", "Leave Application", "Remote Work"}))` |
| EndDate | Date | `[AttendanceDaily].[Date]` | `OR(ISBLANK([AttendanceDaily]), IN([RequestType], {"Work From Home", "Leave Application", "Remote Work"}))` | `ISNOTBLANK([AttendanceDaily])` | Show_If: `OR(CONTEXT("ViewType") <> "Form", IN([RequestType], {"Work From Home", "Leave Application", "Remote Work"}))` |
| LeaveType | Enum | — | — | — | |
| LeaveAllocation | Ref → LeaveAllocation | — | — | — | |
| LeaveUsed | Decimal | — | — | — | |
| Remarks | Text | — | — | — | Reason or context |
| PendingRow | Text/Number | — | — | — | |
| AttendanceDaily | Enum Ref → AttendanceDaily | — | — | — | Required_If: `IN([RequestType], {"Time Off in Lieu (TOIL)", "Attendance Regularization"})` |
| Description (VC) | Virtual (Text) | `IFS([RequestType]="Time Off in Lieu (TOIL)", CONCATENATE("Worked on: ",TEXT([AttendanceDaily].[Date],"DD MMM YYYY")," | Check-In: ",TEXT([AttendanceDaily].[Office_Check_In],"HH:MM")," | Check-Out: ",TEXT([AttendanceDaily].[Office_Check_Out],"HH:MM")," | Status: ",[AttendanceDaily].[Status]), [RequestType]="Attendance Regularization", CONCATENATE("Recorded Check-In: ",TEXT([AttendanceDaily].[Office_Check_In],"HH:MM")," | Recorded Check-Out: ",TEXT([AttendanceDaily].[Office_Check_Out],"HH:MM")," | Please enter the correct times below."), [RequestType]="Leave Application", CONCATENATE("Leave Balance: ",TEXT([LeaveAllocation].[Available],"0.0")," days available"), IN([RequestType],{"Work From Home","Remote Work"}), CONCATENATE("From: ",TEXT([StartDate],"DD MMM YYYY"),IF(ISNOTBLANK([EndDate]),CONCATENATE(" To: ",TEXT([EndDate],"DD MMM YYYY")),"")), TRUE, CONCATENATE("From: ",TEXT([StartDate],"DD MMM YYYY")))` | — | — | Show_If: `ISNOTBLANK([AttendanceDaily])`. WFH/Remote uses StartDate→EndDate range. TOIL/Regularization uses `Office_Check_In`/`Office_Check_Out` VCs |
| CorrectCheckIn | DateTime | — | — | — | For regularization |
| CorrectCheckOut | DateTime | — | — | — | For regularization |
| Status | Enum | `"Requested"` | — | — | Requested, Approved, Rejected |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([Employee].[Label], " - ", [RequestType], " (", [Status], ")")` | — | — | |

**Actions**:
| Action | Type | Condition | Set Columns |
|--------|------|-----------|-------------|
| `Create_TOIL_Allocation` | Add new row to `LeaveAllocation` | `TRUE` (Triggered by Bot) | `ID`=`TEXT(UNIQUEID())`, `Date`=`TODAY()`, `Employee`=`[Employee]`, `LeaveType`=`"LT_TOIL"`, `Quantity`=`IF([Leave]="Half Day", 0.5, 1.0)`, `StartDate`=`[StartDate]`, `EndDate`=`EDATE([StartDate], 3)` |

---

### LeaveAllocation
**Purpose**: Ledger entries for leaves accrued and taken (ledger balance sheet model).
**Parent Table**: Employee (One-to-Many)

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| ID | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| Date | Date | `TODAY()` | — | — | Date of allocation entry |
| Employee | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | |
| LeaveType | Enum (Ref → AppVariable) | — | — | — | Pulls from AppVariable `Leave_Type` (e.g. LT_Anul, LT_Sick) |
| OfficeLeave | Text | — | — | — | |
| Quantity | Decimal | — | — | — | Total allocated days |
| StartDate | Date | — | — | — | Validity start date |
| EndDate | Date | — | — | — | Validity end date |
| Used | Decimal (VC) | `SUM(SELECT(AttendanceRequest[LeaveUsed], AND([LeaveAllocation] = [_THISROW].[ID], [Status] = "Approved")))` | — | — | Virtual: sum of all approved usage rows for this allocation |
| Available | Decimal (VC) | `[Quantity] - [Used]` | — | — | Virtual: remaining balance |
| CreatedBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| CreatedOn | DateTime | `UTCNOW()` | OFF | FALSE | |
| LastEditBy | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| LastEditOn | DateTime | `UTCNOW()` | OFF | TRUE | |
| Label (VC) | Virtual | `CONCATENATE([Employee].[Label], " - ", [LeaveType], " (", [Quantity], " Days)")` | — | — | |

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
| AttendanceRequest.RequestType | Time Off in Lieu (TOIL), Attendance Regularization, Work From Home, Leave Application, Remote Work |
| AttendanceRequest.Leave | Half Day, Full Day |
| AttendanceRequest.LeaveSession | Morning, Afternoon |
| AttendanceRequest.Status | Requested, Approved, Rejected |
| LeaveAllocation.LeaveType | LT_Sick, LT_Anul, LT_Stdy, LT_TOIL, LT_Ernd, LT_Pater, LT_Mater, LT_Comp, LT_Compe, LT_LOP, LT_Unpaid |
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

### Bot: Auto-Allocate TOIL on Approval
* **Trigger Event**: `UPDATES_ONLY` on `AttendanceRequest` table
* **Trigger Condition**: `AND([RequestType] = "Time Off in Lieu (TOIL)", [Status] = "Approved", [_THISROW_BEFORE].[Status] <> "Approved")`
* **Run Step**: Run Action `Create_TOIL_Allocation` on the current `AttendanceRequest` record.
* **Purpose**: When an admin approves a TOIL request, immediately generate a leave allocation bucket for the employee valid for exactly 3 months from the day the extra work was performed. Amount is based on whether the original shift was Full or Half-Day.
