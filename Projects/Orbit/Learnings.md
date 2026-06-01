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

---

## Already Promoted
*(Items confirmed moved to _Patterns/PATTERNS_INDEX.md)*

| Pattern ID | Summary | Date Promoted |
|-----------|---------|--------------|
| | | |

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
