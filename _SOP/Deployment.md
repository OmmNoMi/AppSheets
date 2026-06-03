# Deployment Checklist — OmmNoMi Standard
> Copy this into `Projects/[Name]/DeploymentChecklist.md` before go-live. Mark each item ✅ when done.

---

## Pre-Deployment Checks

### Database Integrity
- [ ] No table uses `_RowNumber` as key — every operational table has `ID` column with `UNIQUEID()`
- [ ] All ID columns in Google Sheets are formatted as **Plain Text** (Format → Number → Plain Text)
- [ ] No `=SUM()`, `=VLOOKUP()`, or any formula exists in Google Sheets cells
- [ ] All sheet tab names match AppSheet table names exactly (PascalCase, no spaces)
- [ ] Virtual Column collision check completed — no physical column shares a name with a VC

### System Tables
- [ ] All 7 Base App system tables present: `AppUser`, `AppViews`, `AppVariables`, `AppSettings`, `AppTimeline`, `AppTriggers`, `_Per User Settings`
- [ ] 3 OmmNoMi dev accounts present in AppUser: `DevNomi`, `DevHardi`, `OmmNoMi`
- [ ] 11 pre-seeded AppViews entries present (including 4 OmmNoMi-branded entries)
- [ ] 6 AppVariables base rows present (`AppUserRoles` + 5 role rows)
- [ ] AppTimeline seeded with 365 rows for current year
- [ ] Project-specific roles added to AppVariables and included in `AppUserRoles.VariableList`
- [ ] Project-specific AppSettings rows added as needed

### Operational Table Columns
- [ ] Every operational table has: `ID`, `CreatedBy`, `CreatedOn`, `LastEditBy`, `LastEditOn`, `Label` (VC)
- [ ] `CreatedBy` and `CreatedOn`: `Editable_If = ISBLANK([_THIS])`, Reset on Edit = No
- [ ] `LastEditBy` and `LastEditOn`: `Editable_If = ISBLANK([_THIS])`, Reset on Edit = **Yes**
- [ ] `Label` VC formula generates meaningful human-readable string
- [ ] Note: AppUser uses `LastEditedBy` / `LastEditedOn` (with 'd') — this is correct, do not rename

### Security & Access
- [ ] Log in as each role via "Preview as" — confirm correct views visible/hidden
- [ ] Log in as lowest-permission role — confirm locked fields cannot be edited
- [ ] All role checks use `ISNOTBLANK(INTERSECT({"U_RoleName"}, SPLIT(ANY(Me[Roles]),",")))` pattern
- [ ] `Me` slice filter confirmed: `AND([Email]=USEREMAIL(), OR([AccessKey]="Not in Use", USERSETTINGS("AccessKey")=[AccessKey]), [Status]="Active")`
- [ ] Every sensitive view has correct Slice + Security Filter
- [ ] OmmNoMi-branded AppViews entries (`CONTAINS([ID],"OmmNoMi")`) protected from deletion

### Performance
- [ ] Run Performance Profiler on all Virtual Columns
- [ ] Any VC taking >100ms: convert to physical column with Reset-on-Edit Initial Value
- [ ] No SELECT() on full large tables — use list dereferencing where possible
- [ ] All Ref columns using Enum Ref (not standard Ref)

### Actions
- [ ] Every major operational table has `Sync_[TableName]` action (sets `LastEditOn = NOW()`)
- [ ] All `Sync_` actions tested — confirm LastEditOn updates and App Formulas refresh
- [ ] Custom `Add_` actions replace system defaults on all filtered views
- [ ] All Action `Only If` conditions verified (no ghost buttons)
- [ ] Status transition actions tested through full lifecycle

### Automations
- [ ] Every automation manually triggered once before go-live
- [ ] Notification bots use `ADDS_ONLY` (not ADDS_AND_UPDATES)
- [ ] Scheduled bots verified at correct UTC time
- [ ] Bots that process by date write to `AppTimeline` (AppTrigger + TriggerValue + TriggeredOn)
- [ ] Runtime trigger rows use `AppTriggers` table (created by actions, consumed by bots)
- [ ] PDF file paths follow standard: `OmmNoMi_Reports/[Dept]/[ID]_[Timestamp]`

### UX
- [ ] Format rules applied for all Status values (Urgent, Completed, In Progress, etc.)
- [ ] All user-facing error messages customized in `Valid_If` properties
- [ ] Display Names set for all client-specific column labels (not renaming columns)
- [ ] Dashboard views (`[Module]_Dash`) created for all main modules
- [ ] Form views do not show system audit columns (`Show_If = CONTEXT("View") <> "Form"`)

### Handover
- [ ] Client user accounts added to AppUser with correct roles
- [ ] OmmNoMi dev accounts set to `Status = "Inactive"` unless ongoing support contracted
- [ ] Test end-to-end workflow as each user persona
- [ ] `AppSettings` and `AppVariables` tables populated with all project-specific values
- [ ] Project folder in `/Users/ommnomi/AppSheets/Projects/[Name]/` fully updated
- [ ] All learnings added to `Decisions.md` and patterns promoted to `_Patterns/`
- [ ] AppTimeline rows seeded for next year if app goes live after October

---
**Sign-off Date**: ___________
**Deployed By**: ___________
**Client Confirmed**: ___________
