# BF-006: Google Form Sheet Integration Rules
> Pattern from: Transcend_IntakeSystem | Status: Design-verified

## Problem
Connecting an existing Google Form response sheet to AppSheet causes common errors:
- Renaming form columns in AppSheet breaks form output mapping
- Adding columns in the middle of the sheet corrupts column index references
- Using `_RowNumber` as key is unreliable (rows can shift)

## Rules (Always Follow)

### 1. Never Rename Form Columns in AppSheet
- Google Form outputs columns with exact names — AppSheet must match these exactly
- To show a friendlier name → use the **Display Name** property in AppSheet, NOT column rename
- Example: Column `"Primary Phone Number"` → Display Name: "Client Phone"

### 2. Add Admin Columns at the END Only
- All custom admin columns (ProcessedStatus, ClientID, ProcessedOn, ProcessedBy) must be added as the rightmost columns in the sheet
- Never insert columns between existing form columns

### 3. Set Key = Timestamp
- Google Form auto-generates a Timestamp for every submission
- Use `Timestamp` as the AppSheet Key column (it's unique per submission)
- Never use `_RowNumber` as key

### 4. Admin Column Defaults (Add to Right of Sheet)
| Column | Type | AppSheet Initial Value | Notes |
|--------|------|----------------------|-------|
| ProcessedStatus | Enum | `"New"` | New / Processing / Processed / Failed |
| ClientID | Text | — | Written by App Script after processing |
| ProcessedOn | DateTime | — | Written by App Script |
| ProcessedBy | Text | — | "Bot" or AppUser.ID |

### 5. Restrict Form Sheet Access
- In Google Sheets sharing: grant form sheet access only to admin role
- AppSheet security filter on IntakeForm: `IN("Admin", ANY(Me[Roles]))` OR `IN("Operations_Manager", ANY(Me[Roles]))`
- Regular users should never see the raw form data (especially if it contains sensitive fields)

### 6. Mark Form Columns as Not Editable in AppSheet
- Form columns: set `Editable_If = FALSE` in AppSheet to prevent accidental edits
- Only admin columns should be editable

## When to Use
Every project that uses Google Form as a data source connected to AppSheet.

## Source Project
Transcend_IntakeSystem | 2026-05-31
