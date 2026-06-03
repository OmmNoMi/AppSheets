# Formula Library — OmmNoMi Standard

## I. Audit Stamp Formulas
| Column | Formula | Notes |
|--------|---------|-------|
| ID (operational tables) | `UNIQUEID()` | Initial Value. Editable_If: `ISBLANK([_THIS])` |
| ID (AppUser only) | `=UPPER(TEXT(LEFT(UNIQUEID(), 4)))` | Short 4-char uppercase human-readable ID |
| CreatedBy | `ANY(Me[ID])` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: No |
| CreatedOn | `NOW()` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: No |
| LastEditBy | `ANY(Me[ID])` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: **Yes** |
| LastEditOn | `NOW()` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: **Yes** |
| Label (VC) | `CONCATENATE([Code], " - ", [Name])` | Adjust per table |

**Timestamp rule**: Use `NOW()` in Initial Value and Reset fields. Use `UTCNOW()` in App Formulas for computed/calculated fields that need strict UTC (e.g., overdue calculations, cross-timezone logic). The template uses `NOW()` throughout audit columns.

---

## II. Security & Identity

**Me Slice Filter** (exact formula used in Base App — always name this slice `Me`):
```
AND(
  [Email] = USEREMAIL(),
  OR([AccessKey] = "Not in Use", USERSETTINGS("AccessKey") = [AccessKey]),
  [Status] = "Active"
)
```

```
// Role check — preferred pattern (handles comma-separated EnumList roles)
ISNOTBLANK(INTERSECT({"U_System_Admin"}, SPLIT(ANY(Me[Roles]), ",")))

// Multi-role check
ISNOTBLANK(INTERSECT({"U_System_Admin","U_People_Admin"}, SPLIT(ANY(Me[Roles]), ",")))

// Filter data to current user's record
[CreatedBy] = ANY(Me[ID])

// Is current user the assigned person?
[AssignedTo] = ANY(Me[ID])

// Restrict a view to current user only
[Email] = USEREMAIL()
```

---

## III. Data Lockdown (Write-Once)
```
// Editable_If — makes field write-once (locks after first save)
ISBLANK([_THIS])

// Hide system columns from forms
// In Show_If:
CONTEXT("View") <> "Form"
```

---

## IV. Status & Workflow Logic
```
// Advance status to next stage (use in Action)
SWITCH([Status],
  "New",            "In Progress",
  "In Progress",    "Quality Check",
  "Quality Check",  "Completed",
  [Status]
)

// Overdue check
AND([Status] <> "Completed", [Deadline] < TODAY())

// Is record stuck (no update in 7 days)?
AND([Status] = "In Progress", [LastEditOn] < (NOW() - 7))
```

---

## V. Relational & Aggregation
```
// Single-value deref (prefer over LOOKUP)
[EmployeeID].[Department]

// List deref (prefer over SELECT on full table)
[Related SalesItems][Price]

// Filtered sum on already-dereferenced list
SUM(SELECT([Related SalesItems][Price], [Tax] = 0.18))

// List subtraction (e.g., inventory)
COUNT(SELECT(Orders[ID], [Status]="Pending")) - COUNT(SELECT(Returns[ID], [Status]="Processed"))

// Weighted score
([SelfGrade] * 0.3) + ([ManagerGrade] * 0.7)
```

---

## VI. Navigation & Deep Links
```
// Deep link to specific record
CONCATENATE("#view=Employee_Detail&row=", ENCODEURL([ID]))

// Link to form with pre-filled value (used in custom Add_ actions)
LINKTOFORM("SalesItem_Form", "SalesID", [ID])

// Link to filtered view
LINKTOFILTEREDVIEW("Tasks_Pending", "AssignedTo", ANY(Me[ID]))
```

---

## VII. AppSettings / AppVariables Lookup

AppSettings and AppVariables are NOT simple key-value tables. Each has typed value columns. Read the correct column for each use case.

```
// Read a numeric setting
LOOKUP("SettingID", "AppSettings", "ID", "Decimal")

// Read allowed values for a trigger input
SPLIT(TEXT(LOOKUP("SettingID", "AppSettings", "ID", "AllowedValues")), ",")

// Read an enum variable value
LOOKUP("VarID", "AppVariables", "ID", "EnumValue")

// Read a comma-separated role list for SPLIT() (from AppUserRoles variable)
SPLIT(TEXT(LOOKUP("AppUserRoles", "AppVariables", "ID", "VariableList")), " , ")

// Check if current user's roles include a variable-driven role list
ISNOTBLANK(INTERSECT(
  SPLIT(ANY(Me[Roles]), ","),
  SPLIT(TEXT(LOOKUP("AppUserRoles", "AppVariables", "ID", "EnumList")), " , ")
))
```

---

## VIII. File / Automation Paths
```
// Standard PDF path for generated reports
CONCATENATE("OmmNoMi_Reports/", [Department], "/", [ID], "_", TEXT(UTCNOW(), "YYYYMMDD_HHMM"))
```
