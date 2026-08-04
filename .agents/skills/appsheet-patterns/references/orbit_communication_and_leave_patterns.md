# Orbit App Architectural Patterns: Communication & Leave Modules

This pattern reference contains Orbit-specific architectural knowledge, formulas, and reconciliation rules.

---

## 1. Communication & Notification Formula Standards
When building or troubleshooting AppSheet `Communication` formulas in Orbit (e.g., `Communication[To]` or `Communication[CC]`):

* **Template Placeholder Mappings**:
  - `"LineManagerEmail"` $\rightarrow$ Dereferences `[Employee].[ReportingOfficer].[Email]` with fallback to `[Employee].[TeamEmail]`.
  - `"EmployeeEmail"` $\rightarrow$ Prefers `[Employee].[WorkEmail]`, fallback to `[Employee].[PersonalEmail]` (essential for Onboarding prior to Day 1).
  - `"ProjectTeamEmail"` $\rightarrow$ Dereferences `[Employee].[Project].[TeamEmail]`.

* **Type Safety Protocol**:
  - Because `To` and `CC` are `EnumList` (BaseType: `Email`), single values must be wrapped in `LIST(...)` and comma-separated text must be parsed with `SPLIT(TEXT(...), ",")`.

* **Standard `Communication[To]` Formula**:
  ```appsheet
  IFS(
    CONTAINS([Template].[To], "ProjectTeamEmail"),
      SPLIT(TEXT([Employee].[Project].[TeamEmail]), ","),
    CONTAINS([Template].[To], "EmployeeEmail"),
      LIST(IF(ISNOTBLANK([Employee].[WorkEmail]), [Employee].[WorkEmail], [Employee].[PersonalEmail])),
    CONTAINS([Template].[To], "LineManagerEmail"),
      LIST(IF(ISNOTBLANK([Employee].[ReportingOfficer].[Email]), [Employee].[ReportingOfficer].[Email], [Employee].[TeamEmail])),
    TRUE,
      SPLIT(TEXT([Template].[To]), ",")
  )
  ```

---

## 2. Leave & Attendance Reconciliation & Silent Resync Protocol

* **Three-Table Reconciliation**:
  - `AttendanceRequest` (Status = `Approved`) MUST link to generated child records in `AttendanceDaily` AND deduct `LeaveUsed` from `LeaveAllocation`.
  - Half Day requests (`Leave = "Half Day"`) MUST have equal `StartDate` and `EndDate`, and deduct exactly `0.5` days.

* **Silent Resync (No Unwanted Emails)**:
  - AppSheet approval bots fire on `[_THISROW_BEFORE].[Status] <> "Approved"` and `[_THISROW_AFTER].[Status] = "Approved"`.
  - **CRITICAL**: Never instruct the user to re-approve rows if notification steps will send duplicate emails to employees. Always recommend:
    1. Temporarily disabling the Email step in AppSheet Bot before status reset.
    2. Executing 1-tap data actions.
    3. Direct Google Sheets data correction.

* **Automated Audit Script**:
  - Use `python3 .agents/skills/appsheet-utilities/scripts/audit_leave_attendance.py` whenever verifying exported `AttendanceDaily.csv`, `AttendanceRequest.csv`, and `LeaveAllocation.csv` files.
