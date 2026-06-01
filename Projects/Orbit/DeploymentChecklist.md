# Deployment Checklist — BLR World HRMS (Orbit)
> Customized for BLR World HRMS Phase 2 operations.
> Mark items [x] as verified before launching.

---

## Pre-Deployment Verification

### 1. Database & Schema Integrity
- [ ] Every table has: `ID` (Key) using `TEXT(UNIQUEID())`
- [ ] No table uses `_RowNumber` as key
- [ ] All ID columns in Google Sheets are formatted as **Plain Text**
- [ ] Zero spreadsheet formulas exist in Google Sheets (calculated in AppSheet or script)
- [ ] Tab names match AppSheet table names exactly (`Employee`, `AttendanceDaily`, `LeaveAllocation`, etc.)
- [ ] Unique constraints applied to `Employee.Code` to prevent duplicate employee numbers

### 2. Timezone & Locale Setup (Dubai Localization)
- [ ] Dubai office geofence coordinates verified in `AppSetting` (`DubaiOfficeLatitude = 25.2048`, `DubaiOfficeLongitude = 55.2708`)
- [ ] Geofence tolerance radius set in `AppSetting` (`AllowedRadiusMeters = 150.0`)
- [ ] All date formatting in columns is set to DD/MM/YYYY
- [ ] Timezone behavior tested (UTC stored in DB, converted to GST (UTC+4) in views)

### 3. Role-Based Security & Permissions
- [ ] Tested as `Employee` (Only sees own profile, tasks, attendance, self-evals, and claims)
- [ ] Tested as `LineManager` (Sees team dashboards, approves tasks/objectives, conducts manager evaluations)
- [ ] Tested as `HRManager` (Access to override/console, realignment approval queue, can edit Employee IDs)
- [ ] Tested as `FinanceAdmin` (Access to financial expense claims queue)
- [ ] `Me` slice filter verified: `AND([AccessEmail] = USEREMAIL(), [Status] = "Active")`

### 4. Performance & Appraisal Center
- [ ] Objectives setting constrained to min 3 and max 10 per employee
- [ ] Review cycle lock logic tested (objectives and evaluations read-only outside dates)
- [ ] Weighted score calculation verified: Mid-Year (30%) + Annual (70%) final rating formula
- [ ] HR realignment approval queue workflow tested end-to-end

### 5. Attendance & Leaves (Ledger Verification)
- [ ] GPS check-in/out distance offset tested from target latitude/longitude
- [ ] "Invalid GPS" status triggered correctly when checking in > 150m away from office
- [ ] Hourly bot for unmarked check-outs tested (auto-marks "Present" if check-out is missing)
- [ ] Leave deductions ledger tested (approved leave type deducts days from `LeaveAllocation` accrued balance)

### 6. Expense & Claims
- [ ] AED currency display verified with 2 decimals
- [ ] Digital receipt file upload marked as mandatory for claims
- [ ] Approval workflow verified (Draft -> Pending Manager -> Pending Finance -> Approved/Rejected)

### 7. Core Automations
- [ ] Candidate staging ingestion webhook tested (Google Form sync -> profile creation)
- [ ] Document expiry alerts scheduled and tested for Visa, Passport, and Emirates ID (30, 15, 7 days)
- [ ] Google Drive folder creation and movement automated via Apps Script on employee status changes

---
**Sign-off Date**: ___________  
**Deployed By**: ___________  
**Client Confirmed**: ___________
