# FP-004: Contextual Description VC — One Field, All Request Types

**Problem**: Different request types need to show different contextual info on the form (TOIL needs check-in/out, WFH needs date range, Leave needs balance). Creating a separate VC per type pollutes the schema.

**Solution**: One `Description` Virtual Column using `IFS()` that renders the correct summary string based on `[RequestType]`. Each branch is fully independent.

**AppSheet Config**:
```appsheet
IFS(
  [RequestType] = "TOIL",
    CONCATENATE("Check-In: ", TEXT([AttendanceDaily].[Office_Check_In], "HH:MM"), " | Check-Out: ", ...),
  [RequestType] = "Attendance Regularization",
    CONCATENATE("Recorded: ", TEXT([AttendanceDaily].[Office_Check_In], "HH:MM"), " | ..."),
  [RequestType] = "Leave Application",
    CONCATENATE("Balance: ", TEXT([LeaveAllocation].[Available], "0.0"), " days"),
  IN([RequestType], {"Work From Home", "Remote Work"}),
    CONCATENATE("From: ", TEXT([StartDate], "DD MMM YYYY"), " To: ", TEXT([EndDate], "DD MMM YYYY")),
  TRUE,
    CONCATENATE("From: ", TEXT([StartDate], "DD MMM YYYY"))
)
```
**Show_If**: `ISNOTBLANK([AttendanceDaily])` or `ISNOTBLANK([StartDate])`

**Key Rules**: Use timezone-corrected VCs (`Office_Check_In`/`Office_Check_Out`) not raw check-in/out columns. Add new `IFS` branches for future request types without touching existing logic.

**Source**: Orbit | 2026-06-02
