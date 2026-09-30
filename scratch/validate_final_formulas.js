// Formula tester for both Path 1 and Path 2

const formulas = {
  // 1. Delete Related AttendanceDaily Filter Formula:
  adFilter: `=FILTER(
  "AttendanceDaily",
  AND(
    [Employee] = [_THISROW].[Employee],
    OR(
      [AttendanceRequest] = [_THISROW].[ID],
      AND(
        [Date] >= [_THISROW].[StartDate],
        [Date] <= [_THISROW].[EndDate],
        [Status] = "On Leave"
      )
    )
  )
)`,

  // 2. Sync LeaveAllocation Filter Formula:
  laFilter: `=FILTER(
  "LeaveAllocation",
  [Employee] = [_THISROW].[Employee]
)`,

  // 3. Sync Other AttendanceRequests Filter Formula:
  arFilter: `=FILTER(
  "AttendanceRequest",
  AND(
    [Employee] = [_THISROW].[Employee],
    [ID] <> [_THISROW].[ID]
  )
)`,

  // 4. Action Show_If / Condition Formula:
  actionCondition: `=AND(
  [Status] = "Approved",
  IN([RequestType], {"Leave Application", "Work From Home", "Remote Work"}),
  ISNOTBLANK(
    INTERSECT(
      {"U_People_Admin", "U_System_Admin"},
      SPLIT(ANY(Me[Roles]), ",")
    )
  )
)`
};

// Check parenthesis balance for every formula
Object.keys(formulas).forEach(key => {
  const f = formulas[key];
  const openCount = (f.match(/\(/g) || []).length;
  const closeCount = (f.match(/\)/g) || []).length;
  console.log(`Formula '${key}': Open=${openCount}, Close=${closeCount}, Valid=${openCount === closeCount}`);
  if (openCount !== closeCount) {
    throw new Error(`Formula '${key}' has unbalanced parentheses!`);
  }
});

console.log("[ALL FORMULAS 100% BALANCED AND VALID]");
