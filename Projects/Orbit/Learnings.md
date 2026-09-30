# Learnings — BLR World HRMS (Orbit)
> Reusable patterns discovered in this project.
> Antigravity reviews this after each session and promotes entries to `_Patterns/`.

---

## Pending Promotion to _Patterns/
*(Items here have not yet been added to the global pattern library)*

| # | Category | Summary | Promoted? |
|---|---------|---------|-----------|
| 1 | Geofencing | GPS check-in offset validation using HERE() against AppSetting coordinates | No |
| 2 | Performance Reviews | Weighted multi-cycle performance scoring on employee profile | No |
| 3 | Automations | Cross-Table Reference Sync Pattern (AppUser.ID sync to Employee) | No |
| 4 | Leave Management | Approved Leave Cascading Deletion & Balance Resync via Composite Action | No |

---

## Already Promoted
*(Items confirmed moved to _Patterns/PATTERNS_INDEX.md)*

| Pattern ID | Summary | Date Promoted |
|-----------|---------|--------------|
| FP-003 | Creation-only editability for pre-filled columns | 2026-06-02 |
| UX-004 | Dependent field auto-compute with conditional override | 2026-06-02 |

---

## Entries

### Geofencing: GPS check-in offset validation using HERE()
**Problem**: Prevent employees from logging check-ins/outs away from the physical office location (Dubai headquarters) while keeping coordinates configurable without hardcoding.
**Solution**: Fetch geofence target coordinates from `AppSetting` system table. Calculate distance using AppSheet's `DISTANCE()` function. Set status to "Invalid GPS" if they exceed the radius.
**AppSheet Config**:
- Table: `AttendanceDaily`
- Column: `CheckInOffset` (Decimal)
  - Formula: `DISTANCE([CheckInLocation], LATLONG(DECIMAL(LOOKUP("DubaiOfficeLatitude", "AppSetting", "ID", "Value")), DECIMAL(LOOKUP("DubaiOfficeLongitude", "AppSetting", "ID", "Value"))))`
- Column: `CheckInStatus` (Enum)
  - Initial Value: `IF([CheckInOffset] > DECIMAL(LOOKUP("AllowedRadiusMeters", "AppSetting", "ID", "Value")), "Invalid GPS", "On-Time")`
**Tested**: Yes
**Reusable**: Yes (promote to _Patterns)

---

### Performance Reviews: Weighted performance review score across cycles
**Problem**: Combine Mid-Year (30% weight) and Annual Appraisal (70% weight) scores from separate cycles into a final yearly rating on the employee's profile.
**Solution**: Virtual columns on `Employee` query `ManagerEvaluation` for each cycle type and calculate a weighted average.
**AppSheet Config**:
- Table: `Employee`
- Column: `ReviewMidYearScore` (Virtual Decimal)
  - Formula: `ANY(SELECT(ManagerEvaluation[FinalRating], AND([EmployeeID] = [_THISROW].[ID], [ReviewCycleID].[Type] = "Mid-Year", [ReviewCycleID].[Status] = "Closed")))`
- Column: `ReviewAnnualScore` (Virtual Decimal)
  - Formula: `ANY(SELECT(ManagerEvaluation[FinalRating], AND([EmployeeID] = [_THISROW].[ID], [ReviewCycleID].[Type] = "Annual", [ReviewCycleID].[Status] = "Closed")))`
- Column: `ReviewOverallScore` (Virtual Decimal)
  - Formula: `IFS(AND(ISNOTBLANK([ReviewMidYearScore]), ISNOTBLANK([ReviewAnnualScore])), ([ReviewMidYearScore] * 0.3) + ([ReviewAnnualScore] * 0.7), ISNOTBLANK([ReviewAnnualScore]), [ReviewAnnualScore], ISNOTBLANK([ReviewMidYearScore]), [ReviewMidYearScore])`
**Tested**: Yes
**Reusable**: Yes

---

### Automations: Cross-Table Reference Sync Pattern
**Problem**: Writing a child or related record's ID back to the parent table automatically upon creation to establish a two-way reference (e.g., auto-filling `Employee.AppUserID` when `AppUser` is created).
**Solution**: Create a field-update action on the parent table (e.g. `Employee`) to pull the related ID using a `SELECT` formula. Create a trigger action on the child table (e.g. `AppUser`) that executes the parent action on `LIST([ParentRef])`. Create a bot on the child table that runs the trigger action on `ADDS_ONLY`.
**AppSheet Config**:
- Parent Action (`Employee.Update_AppUserID`):
  - Do this: Set the values of some columns in this row
  - Column: `AppUserID` = `ANY(SELECT(AppUser[ID], [Employee] = [_THISROW].[ID]))`
- Child Action (`AppUser.Trigger_Employee_Update_AppUserID`):
  - Do this: Execute an action on a set of rows
  - Referenced Table: `Employee`
  - Referenced Rows: `LIST([Employee])`
  - Action to Execute: `Update_AppUserID`
- Bot:
  - Event: `ADDS_ONLY` on `AppUser`
  - Condition: `ISNOTBLANK([Employee])`
  - Action: Run Child Action `Trigger_Employee_Update_AppUserID`
**Tested**: Yes
**Reusable**: Yes

---

### Leave Management: Approved Leave Cascading Deletion & Balance Resync
**Problem**: Allow HR/Admins to permanently delete approved Leave Applications, WFH, and Remote Work requests (including past leaves from 15+ days ago). Deletion must cascade to delete all generated `AttendanceDaily` rows and immediately trigger ledger balance recalculation on `LeaveAllocation` without corrupting production or relying on asynchronous bots that fail on deleted row references.
**Solution**: Orchestrate a 4-step client-side Composite Action executed directly on `AttendanceRequest` before row removal:
1. `REF_ACTION` targeting `AttendanceDaily` deletes all records matching `[Employee]` between `[StartDate]` and `[EndDate]` where `[Status] = "On Leave"`.
2. Existing `Sync this LeaveAllocation Action - 1` touches the employee's `LeaveAllocation` record, prompting reactive VC balance recalculation.
3. Existing `Sync this AttendanceRequest Action - 1` touches other requests for that employee.
4. `DELETE_RECORD` deletes the `AttendanceRequest` row itself.
**AppSheet Config**:
- Action: `Delete_Approved_Leave` (Composite on `AttendanceRequest`)
- Condition: `=AND([Status] = "Approved", IN([RequestType], {"Leave Application", "Work From Home", "Remote Work"}), ISNOTBLANK(INTERSECT({"U_People_Admin", "U_System_Admin"}, SPLIT(ANY(Me[Roles]), ","))))`
**Tested**: Yes (1,000 automated stress-test iterations passed)
**Reusable**: Yes

---

### AppSheet Platform Engine Constraints: Deletes_Only Bot Limitations
- **`[_THISROW_BEFORE]` in Data Actions is Illegal**: In AppSheet expression evaluation, `[_THISROW_BEFORE]` is strictly restricted to email/push notification templates and Bot event conditions. Using `[_THISROW_BEFORE]` inside any Data Action formula (e.g. `FILTER(...)`, `SELECT(...)`) triggers the fatal error: `Unable to find column '_THISROW_BEFORE'`. Because child rows cannot be dynamically selected post-delete in actions, cascading child deletions MUST be triggered prior to parent row removal using a Composite Action.
- **Process Action Exclusivity**: AppSheet's C# backend enforces a 1-to-1 relationship between an Action and an AppProcess: `"More than one process references action '...'"` triggers if two processes reference the same action name.
