# Deployment Checklist — [Client Name] [App Name]
> Copied from `_SOP/Deployment.md`. Fill in as you go before go-live.

---

## Pre-Deployment Checks

### Database Integrity
- [ ] No table uses `_RowNumber` as key — every table has `ID` with `TEXT(UNIQUEID())`
- [ ] All ID columns in Google Sheets formatted as **Plain Text**
- [ ] No spreadsheet formulas in Google Sheets
- [ ] All tab names match AppSheet table names exactly (PascalCase)
- [ ] Virtual Column collision check completed

### System Columns
- [ ] Every table has: `ID`, `CreatedBy`, `CreatedOn`, `LastEditBy`, `LastEditOn`, `Label` (VC)
- [ ] `CreatedBy` / `CreatedOn`: Reset on Edit = FALSE
- [ ] `LastEditBy` / `LastEditOn`: Reset on Edit = TRUE
- [ ] All ID and timestamp fields: `Editable_If` = OFF or `ISBLANK([_THIS])`
- [ ] `Label` VC generates meaningful human-readable string

### Security & Access
- [ ] Tested as "User" role — no Admin views visible
- [ ] Tested as "User" — locked fields cannot be edited
- [ ] AppAccess table defines all role-module combinations
- [ ] `Me` slice filter correct: `AND([AccessEmail] = USEREMAIL(), [Status] = "Active")`
- [ ] All sensitive views have correct Slice + Security Filter

### Performance
- [ ] Performance Profiler run on all Virtual Columns
- [ ] Any VC >100ms converted to physical column
- [ ] No full-table SELECT() where list deref is possible
- [ ] All Ref columns using Enum Ref

### Actions
- [ ] Every operational table has `Sync_[TableName]` action
- [ ] All Sync_ actions tested
- [ ] Custom `Add_` actions replace system defaults on filtered views
- [ ] All Action `Only If` conditions verified
- [ ] Status lifecycle tested end-to-end

### Automations
- [ ] Every automation triggered manually once
- [ ] Notification bots use `ADDS_ONLY`
- [ ] Scheduled bots set to correct UTC time
- [ ] Webhooks log to AppTrigger table
- [ ] PDF paths follow standard

### UX
- [ ] Format rules applied for all Status values
- [ ] User-facing error messages set in `Valid_If`
- [ ] Display Names set for client-specific labels
- [ ] Dashboard views created for main modules
- [ ] System columns hidden from forms

### Final
- [ ] Client users added to AppUser with correct roles
- [ ] End-to-end test as each persona
- [ ] `AppSetting` and `AppVariable` populated
- [ ] Project folder fully updated in `Projects/`
- [ ] Learnings added to `Learnings.md`

---
**Sign-off Date**: ___________  
**Deployed By**: ___________  
**Client Confirmed**: ___________
