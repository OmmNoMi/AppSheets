# Deployment Checklist — OmmNoMi Standard
> Copy this into `Projects/[Name]/DeploymentChecklist.md` before go-live. Mark each item ✅ when done.

---

## Pre-Deployment Checks

### Database Integrity
- [ ] No table uses `_RowNumber` as key — every table has `ID` column with `TEXT(UNIQUEID())`
- [ ] All ID columns in Google Sheets are formatted as **Plain Text** (Format → Number → Plain Text)
- [ ] No `=SUM()`, `=VLOOKUP()`, or any formula exists in Google Sheets cells
- [ ] All sheet tab names match AppSheet table names exactly (PascalCase, no spaces)
- [ ] Virtual Column collision check completed — no physical column shares a name with a VC

### System Columns
- [ ] Every table has: `ID`, `CreatedBy`, `CreatedOn`, `LastEditBy`, `LastEditOn`, `Label` (VC)
- [ ] `CreatedBy` and `CreatedOn`: Reset on Edit = FALSE
- [ ] `LastEditBy` and `LastEditOn`: Reset on Edit = TRUE
- [ ] All ID and timestamp fields: `Editable_If` = `ISBLANK([_THIS])` or OFF
- [ ] `Label` VC formula generates meaningful human-readable string

### Security & Access
- [ ] Log in as a "User" role via "Preview as" — confirm no Admin views visible
- [ ] Log in as "User" — confirm locked fields cannot be edited
- [ ] AppAccess table correctly defines all role-module combinations
- [ ] `Me` slice filter: `AND([AccessEmail] = USEREMAIL(), [Status] = "Active")`
- [ ] Every sensitive view has correct Slice + Security Filter

### Performance
- [ ] Run Performance Profiler on all Virtual Columns
- [ ] Any VC taking >100ms: convert to physical column with Reset-on-Edit Initial Value
- [ ] No SELECT() on full large tables — use list dereferencing where possible
- [ ] All Ref columns using Enum Ref (not standard Ref)

### Actions
- [ ] Every major operational table has `Sync_[TableName]` action
- [ ] All `Sync_` actions tested — confirm LastEditOn updates and App Formulas refresh
- [ ] Custom `Add_` actions replace system defaults on all filtered views
- [ ] All Action `Only If` conditions verified (no ghost buttons)
- [ ] Status transition actions tested through full lifecycle

### Automations
- [ ] Every automation manually triggered once before go-live
- [ ] Notification bots use `ADDS_ONLY` (not ADDS_AND_UPDATES)
- [ ] Scheduled bots verified at correct UTC time
- [ ] Webhook triggers log to AppTrigger table
- [ ] PDF file paths follow standard: `OmmNoMi_Reports/[Dept]/[ID]_[Timestamp]`

### UX
- [ ] Format rules applied for all Status values (Urgent, Completed, In Progress, etc.)
- [ ] All user-facing error messages customized in `Valid_If` properties
- [ ] Display Names set for all client-specific column labels (not renaming columns)
- [ ] Dashboard views (`[Module]_Dash`) created for all main modules
- [ ] Form views do not show system audit columns (`Show_If = CONTEXT("View") <> "Form"`)

### Final
- [ ] Client user accounts added to AppUser with correct roles
- [ ] Test end-to-end workflow as each user persona
- [ ] `AppSetting` and `AppVariable` tables populated with initial values
- [ ] Project folder in `/Users/ommnomi/AppSheets/Projects/[Name]/` fully updated
- [ ] All learnings added to `Decisions.md` and patterns promoted to `_Patterns/`

---
**Sign-off Date**: ___________  
**Deployed By**: ___________  
**Client Confirmed**: ___________
