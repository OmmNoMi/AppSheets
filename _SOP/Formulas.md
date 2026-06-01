# Formula Library — OmmNoMi Standard

## I. Audit Stamp Formulas
| Column | Formula | Notes |
|--------|---------|-------|
| ID | `TEXT(UNIQUEID())` | Initial Value only |
| CreatedBy | `ANY(Me[ID])` | Reset on Edit: FALSE |
| CreatedOn | `UTCNOW()` | Reset on Edit: FALSE |
| LastEditBy | `ANY(Me[ID])` | Reset on Edit: TRUE |
| LastEditOn | `UTCNOW()` | Reset on Edit: TRUE |
| Label (VC) | `CONCATENATE([Code], " - ", [Name])` | Adjust per table |

**Rule**: Always UTCNOW(), never NOW(). AppSheet auto-translates UTC to local time in the UI.

---

## II. Security & Identity
```
// Check if current user is Admin
IN("Admin", ANY(Me[Roles]))

// Check if user has any of multiple roles
COUNT(INTERSECT(ANY(Me[Roles]), LIST("Manager", "Director"))) > 0

// Filter data to current user's department
[Department] = ANY(Me[Department])

// Restrict view to record owner
[CreatedBy] = ANY(Me[ID])

// Is current user the assigned person?
[AssignedTo] = ANY(Me[ID])
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

## VII. AppSetting / AppVariable Lookup
```
// Read a setting value
LOOKUP("SettingName", "AppSetting", "ID", "Value")

// Read a variable value
LOOKUP("VarName", "AppVariable", "ID", "Value")
```

---

## VIII. File / Automation Paths
```
// Standard PDF path for generated reports
CONCATENATE("OmmNoMi_Reports/", [Department], "/", [ID], "_", TEXT(UTCNOW(), "YYYYMMDD_HHMM"))
```
