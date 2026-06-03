# Action Patterns — OmmNoMi Standard

## Core Principle
> Forms are for **data entry**. Buttons are for **business processes**.
> Never let users manually type a Status value — always use an Action button.

---

## Naming Convention
| Prefix | Use Case | Example |
|--------|----------|---------|
| `Add_` | Custom create/add | `Add_NewProject` |
| `View_` | Navigation | `View_PendingApprovals` |
| `Sync_` | Force recalculation | `Sync_AttendanceRequest` |
| `Input_` | User data input | `Input_TimesheetData` |
| `InputAll_` | Hidden automation input | `InputAll_NewData` |
| `Verified_` | Verification transition | `Verified_Document` |
| `Approved_` | Approval transition | `Approved_Request` |
| `Rejected_` | Rejection transition | `Rejected_Request` |
| `Import_` | Data import | `Import_EmployeeList` |
| `Export_` | Data export | `Export_MonthlyReport` |
| `Filter_` | Launch filtered view | `Filter_SalesPending` |

---

## Standard Action: Status Advance
**Type**: Data: set the values of some columns in this row
```
// Set Status to:
SWITCH([Status],
  "New",            "In Progress",
  "In Progress",    "Quality Check",
  "Quality Check",  "Completed",
  [Status]
)
```

---

## Standard Action: Sync_ (Force Recalculation)
**Purpose**: Forces AppSheet to re-evaluate all App Formulas for a row by updating LastEditOn.
This triggers "Reset on Edit" on other columns, refreshing all computed values.

| Setting | Value |
|---------|-------|
| Name | `Sync_[TableName]` |
| Type | Data: set the values of some columns in this row |
| Set Column | `LastEditOn` = `NOW()` |
| Prominence | Display Overlay OR Primary |
| Icon | ↻ (Refresh) |
| Condition | `TRUE` or `ISNOTBLANK(INTERSECT({"U_System_Admin"},SPLIT(ANY(Me[Roles]),",")))` |

---

## Standard Action: Custom Add (Preventing Filter Inheritance)
**Problem**: System "Add" action inherits filter conditions from the current view (e.g., forces Status = "Approved" on new records from an Approved list view).
**Rule**: Never use App Formula to fix this — it locks the column downstream.

**Solution**:
1. Column `Status`: Blank App Formula. Set **Initial Value** = `"Requested"` (or desired default)
2. Create custom action:
   - Type: `App: go to another view within this app`
   - Target: `LINKTOFORM("Target_Form_View", "ColumnName", "DefaultValue")`
   - Prominence: Display Primary, Plus (+) icon
3. Disable system "Add" action:
   - Only if condition: `FALSE` (or `CONTEXT("View") <> "TargetView"`)

---

## Action Gating (Only If Conditions)
```
// Approve button — only Managers on pending records
AND(
  ISNOTBLANK(INTERSECT({"U_System_Manager","U_System_Admin"}, SPLIT(ANY(Me[Roles]),","))),
  [Status] = "Pending Review"
)

// Delete — only Admins when no related records exist
AND(
  ISBLANK([RelatedTasks]),
  ISNOTBLANK(INTERSECT({"U_System_Admin"}, SPLIT(ANY(Me[Roles]),",")))
)

// Check-In — only owner, today, not yet checked in
AND([Date] = TODAY(), ISBLANK([CheckInTime]), [AppUser] = ANY(Me[ID]))

// Edit — only record creator
[CreatedBy] = ANY(Me[ID])

// Admin only
ISNOTBLANK(INTERSECT({"U_System_Admin"}, SPLIT(ANY(Me[Roles]),",")))
```

---

## Action: Deep Link Navigation
```
// Navigate to related table filtered by current record
LINKTOFILTEREDVIEW("SalesItem_List", "SalesID", [ID])

// Open specific record detail
CONCATENATE("#view=Employee_Detail&row=", ENCODEURL([ID]))

// Open form with pre-filled values
LINKTOFORM("SalesItem_Form", "SalesID", [ID], "Status", "Draft")
```
