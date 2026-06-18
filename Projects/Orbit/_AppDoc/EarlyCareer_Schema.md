# Early Careers Module — Schema Reference
> BLR World HRMS (Orbit) · Phase 3 — Early Careers & Internship Module
> OmmNoMi Automation LLP · Issued for IKAROS · v1.0 · 18 June 2026
> Follows OmmNoMi Standard SOP strictly.

---

## Google Sheet: Orbit Main (Extended)

> All new tables are added to the **existing** Orbit Main spreadsheet.
> System tables (_Per User Settings, AppUser, AppViews, AppSettings, AppVariables, AppTriggers, AppTimeline, AppResources) are already present — do NOT re-create.

---

## Section 1: AppVariables — New Rows to Add

> Add the following rows to the existing `AppVariables` table.
> Append `U_People_Admin` and `U_Intern` and `U_University_Coordinator` to the existing `AppUserRoles` VariableList.

| ID | Tags | ValueControl | Title | Description |
|----|------|-------------|-------|-------------|
| `U_People_Admin` | ID Connected to Variable | Enum | People Admin (HR) | Full intern lifecycle access |
| `U_Intern` | ID Connected to Variable | Enum | Intern | Self-service intern access |
| `U_University_Coordinator` | ID Connected to Variable | Enum | University Coordinator | Read-only sponsored intern progress view |
| `InternStatus_List` | ID is used in Code | VariableList | Intern Status Values | Controls Internship.Status enum |
| `IS_Applied` | ID Connected to Variable | Enum | Applied | Lifecycle: Application stage |
| `IS_Shortlisted` | ID Connected to Variable | Enum | Shortlisted | Lifecycle: Shortlisted |
| `IS_Offered` | ID Connected to Variable | Enum | Offered | Lifecycle: Offer extended |
| `IS_AgreementSent` | ID Connected to Variable | Enum | Agreement Sent | Lifecycle: Agreement dispatched |
| `IS_Onboarding` | ID Connected to Variable | Enum | Onboarding | Lifecycle: Active onboarding |
| `IS_Active` | ID Connected to Variable | Enum | Active | Lifecycle: Live internship |
| `IS_MidReview` | ID Connected to Variable | Enum | Mid Review | Lifecycle: Mid-point review in progress |
| `IS_FinalReview` | ID Connected to Variable | Enum | Final Review | Lifecycle: End-of-term review in progress |
| `IS_Completed` | ID Connected to Variable | Enum | Completed | Lifecycle: Successfully completed |
| `IS_Converted` | ID Connected to Variable | Enum | Converted | Lifecycle: Converted to full employee |
| `IS_Withdrawn` | ID Connected to Variable | Enum | Withdrawn | Lifecycle: Withdrawn/dropped |
| `EPIC_List` | ID is used in Code | VariableList | EPIC Component Values | Drives LearningRecord.EpicComponent enum |
| `EPIC_E` | ID Connected to Variable | Enum | Experiential | On-the-job work, shadowing, projects |
| `EPIC_P` | ID Connected to Variable | Enum | People | Feedback, mentoring, peer groups |
| `EPIC_I` | ID Connected to Variable | Enum | Investigation | Articles, videos, micro-learning |
| `EPIC_C` | ID Connected to Variable | Enum | Courses | E-learning, workshops, certifications |

---

## Section 2: AppSettings — New Rows to Add

| ID | Tags | Table | Title | Description | Decimal |
|----|------|-------|-------|-------------|---------|
| `PassportMinValidityMonths` | ID is used in Code | Internship | Passport Minimum Validity | Min passport validity (months) beyond internship end date | 7 |
| `InternWeeklyReminderDay` | ID is used in Code | LearningRecord | Learning Reminder Day | Day of week (1=Mon) to send weekly EPIC reminder | 1 |
| `InternFeedbackDaysBeforeEnd` | ID is used in Code | InternFeedback | Feedback Dispatch Lead Time | Days before end date to dispatch the feedback form | 14 |
| `ReviewCadenceDays` | ID is used in Code | InternReview | Regular Review Cadence | Days between Regular reviews (7=weekly, 14=biweekly) | 7 |

---

## Section 3: Employee Table — New Columns (Extensions)

> Append these columns to the EXISTING `Employee` table in Google Sheets.
> Virtual Columns (VC) require NO spreadsheet column — configure only in AppSheet editor.

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `EmploymentType` | Enum | — | — | — | Extend existing Type enum. Add: `Intern` value. Display Name: "Employment Type". |
| `InternshipID` | Enum Ref → Internship | — | — | — | Links employee to their Internship profile. Show_If: `[EmploymentType] = "Intern"` |
| `UniversityID` | Enum Ref → University | — | — | — | Show_If: `[EmploymentType] = "Intern"`. Phase B table. |
| `UniversityProgramme` | Text | — | — | — | e.g. "Exeter Pathways". Display Name: "University Programme". Show_If: `[EmploymentType] = "Intern"` |
| `AcademicSupervisor` | Text | — | — | — | University-side contact name. Show_If: `[EmploymentType] = "Intern"` |
| `ExpectedGraduation` | Date | — | — | — | Show_If: `[EmploymentType] = "Intern"` |
| `IsIntern` (VC) | Virtual | `[EmploymentType] = "Intern"` | — | — | Boolean VC. Used in slices and bot conditions. |
| `InternshipStatus` (VC) | Virtual | `[InternshipID].[Status]` | — | — | Dereferences status for dashboard display. |
| `InternReviewCount` (VC) | Virtual | `COUNT(SELECT(InternReview[ID], [InternshipID] = [InternshipID]))` | — | — | Cross-table lineage count. |

**New Employee Slices:**
| Slice Name | Filter Condition | Update Mode |
|-----------|-----------------|-------------|
| `EmployeeIntern` | `[IsIntern] = TRUE` | UPDATES_ONLY |
| `EmployeeInternActive` | `AND([IsIntern] = TRUE, IN([InternshipStatus], {"Onboarding","Active","Mid Review","Final Review"}))` | UPDATES_ONLY |
| `EmployeeMyInterns` | `AND([IsIntern] = TRUE, [AppUserLineManagerID] = ANY(Me[ID]))` | UPDATES_ONLY |

---

## Section 4: EmployeeDocument Table — Enum Extensions

> Extend the existing `Type` column enum list. DO NOT change existing values.

**Add to `EmployeeDocument.Type` Enum:**
- `Internship Agreement`
- `Internship NDA`
- `NOC (No Objection Certificate)`
- `Certificate of Eligibility`
- `Completion Certificate`
- `Internship Summary Report`

**New EmployeeDocument Slice:**
| Slice Name | Filter |
|-----------|--------|
| `InternDocuments` | `IN([Type], {"Internship Agreement","Internship NDA","NOC (No Objection Certificate)","Certificate of Eligibility","Completion Certificate","Internship Summary Report"})` |

---

## Section 5: TaskList Table — Category Enum Extensions

> Extend the existing `Category` (or create if not present) column on TaskList.

**Add to `TaskList.Category` Enum (new values):**
- `Internship Onboarding - HR`
- `Internship Onboarding - Line Manager`
- `Internship Onboarding - IT`
- `Internship Onboarding - Accounts`
- `Internship Onboarding - PRO`
- `Creative Futures - EPIC`
- `Intern Review - Mid`
- `Intern Review - End`

---

## Section 6: Internship Table (NEW — Core)

**Purpose**: One record per intern engagement. The spine of the entire Early Careers module.
**Parent**: Employee (One-to-One for intern employees)
**Google Sheet Tab Name**: `Internship`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | Plain text format in Sheets. |
| `EmployeeID` | Enum Ref → Employee | — | `ISBLANK([_THIS])` | — | The intern. Required. Points to Employee where EmploymentType = Intern. Valid_If: `FILTER("Employee", [EmploymentType]="Intern")` |
| `CandidateSubmissionID` | Enum Ref → CandidateSubmission | — | — | — | Source application. Optional. Display Name: "Source Application". |
| `Type` | Enum | — | — | — | Values: `Experience`, `Project`, `Annual`, `Pathway`. Display Name: "Internship Type". Required. |
| `Department` | Enum | — | — | — | Reuses Employee.Department enum values. |
| `ProjectID` | Enum Ref → Project | — | — | — | Root Drive folder parent project. Display Name: "Project / Business Unit". |
| `AppUserLineManagerID` | Enum Ref → AppUser | — | — | — | Reporting officer. Display Name: "Line Manager". |
| `AppUserMentorID` | Enum Ref → AppUser | — | — | — | Assigned mentor. Display Name: "Mentor". |
| `Country` | Enum | — | — | — | Values: `UAE`, `Qatar`, `Saudi Arabia`, `Japan`, `UK`. Drives compliance engine. |
| `StartDate` | Date | — | — | — | Required. |
| `EndDate` | Date | — | — | — | Required. Drives feedback dispatch, expiry checks. |
| `CompensationType` | Enum | `"Unpaid"` | — | — | Values: `Paid`, `Unpaid`, `Stipend`. Display Name: "Compensation Type". |
| `StipendAmount` | Price | — | — | — | Currency: AED. Decimals: 2. Show_If: `[CompensationType] = "Stipend"`. Display Name: "Stipend Amount (AED)". |
| `Status` | Enum | `"Applied"` | — | — | Controlled values from InternStatus_List AppVariable. Status transitions via Action buttons ONLY — never manual. |
| `CohortID` | Enum Ref → Cohort | — | — | — | Intake cohort grouping. Phase B table. |
| `AgreementSigned` | Yes/No | `FALSE` | — | — | Display Name: "Agreement Signed". |
| `AgreementSignedDate` | Date | — | — | — | Show_If: `[AgreementSigned] = TRUE`. Display Name: "Signed On". |
| `RecommendForHire` | Enum | — | — | — | Values: `Yes`, `No`, `Yes - Pending Conditions`. Set at final review only. Display Name: "Recommend for Hire". Show_If: `IN([Status], {"Final Review","Completed","Converted"})` |
| `CertificateIssued` | Yes/No | `FALSE` | — | — | Display Name: "Certificate Issued". |
| `CertificateIssuedDate` | Date | — | — | — | Show_If: `[CertificateIssued] = TRUE`. |
| `DriveFolderID` | Text | — | `ISBLANK([_THIS])` | — | Intern-specific Drive folder ID. |
| `DriveFolderURL` | URL | — | `ISBLANK([_THIS])` | — | Intern Drive folder link. |
| `Notes` | LongText | — | — | — | Internal HR commentary. |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| `CreatedOn` | DateTime | `NOW()` | OFF | FALSE | |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| `LastEditOn` | DateTime | `NOW()` | OFF | TRUE | |
| `DurationWeeks` (VC) | Virtual | `IF(AND(ISNOTBLANK([StartDate]),ISNOTBLANK([EndDate])), ROUND(([EndDate]-[StartDate])/7,0), 0)` | — | — | Computed duration in weeks. |
| `PassportExpiryCheck` (VC) | Virtual | `IF(ISBLANK([EmployeeID].[InternPassportExpiry]), "No Passport on File", IF([EmployeeID].[InternPassportExpiry] >= EDATE([EndDate],7), "✅ Valid", IF([EmployeeID].[InternPassportExpiry] >= [EndDate], "⚠️ Warning - Under 7 Months", "❌ Expired / Insufficient")))` | — | — | Checks passport against 7-month rule. Requires InternPassportExpiry VC on Employee (dereferenced from EmployeeDocument). |
| `ActiveComplianceCount` (VC) | Virtual | `COUNT(SELECT(ComplianceItem[ID], AND([InternshipID]=[_THISROW].[ID], IN([Status],{"Required","In Progress"}))))` | — | — | Cross-table lineage. Display Name: "Open Compliance Items". |
| `PendingTaskCount` (VC) | Virtual | `COUNT(SELECT(TaskList[ID], AND([EmployeeID]=[EmployeeID], [Status]="Pending")))` | — | — | Cross-table lineage. |
| `LearningRecordCount` (VC) | Virtual | `COUNT(SELECT(LearningRecord[ID], [InternshipID]=[_THISROW].[ID]))` | — | — | Cross-table lineage. |
| `Label` (VC) | Virtual | `CONCATENATE([EmployeeID].[Label], " (", [Type], " - ", [Country], ")")` | — | — | |

**Internship Slices:**
| Slice Name | Filter | Update Mode | Roles |
|-----------|--------|-------------|-------|
| `InternshipActive` | `IN([Status], {"Onboarding","Active","Mid Review","Final Review"})` | UPDATES_ONLY | U_People_Admin, U_System_Admin |
| `InternshipMyOwn` | `[AppUserLineManagerID] = ANY(Me[ID])` | UPDATES_ONLY | U_Reporting_Officer |
| `InternshipMySelf` | `[EmployeeID].[AppUserID] = ANY(Me[ID])` | READ_ONLY | U_Intern |
| `InternshipByUniversity` | `[EmployeeID].[UniversityID] = LOOKUP(ANY(Me[ID]),"AppUser","ID","UniversityID")` | READ_ONLY | U_University_Coordinator |

**Internship Actions:**
| Action Name | Type | Condition | Set Columns / Behaviour |
|-------------|------|-----------|------------------------|
| `Approved_MoveToOnboarding` | Set column values | `[Status] = "Offered"` | Status = "Onboarding" |
| `Approved_SendAgreement` | Set column values | `[Status] = "Onboarding"` | Status = "Agreement Sent" |
| `Approved_ActivateIntern` | Set column values | `AND([Status] = "Agreement Sent", [AgreementSigned] = TRUE)` | Status = "Active" |
| `Approved_StartMidReview` | Set column values | `[Status] = "Active"` | Status = "Mid Review" |
| `Approved_StartFinalReview` | Set column values | `[Status] = "Mid Review"` | Status = "Final Review" |
| `Approved_CompleteInternship` | Set column values | `[Status] = "Final Review"` | Status = "Completed", CertificateIssued = TRUE, CertificateIssuedDate = TODAY() |
| `Approved_ConvertToEmployee` | Set column values | `AND([Status] = "Completed", [RecommendForHire] = "Yes")` | Status = "Converted" |
| `Rejected_WithdrawInternship` | Set column values | `NOT(IN([Status],{"Completed","Converted","Withdrawn"}))` | Status = "Withdrawn" |
| `Sync_Internship` | Set LastEditOn | TRUE | LastEditOn = NOW(), LastEditBy = ANY(Me[ID]) |

---

## Section 7: DocType Table (EXISTING — Extended)

**Purpose**: The existing `DocType` config table is extended to serve as the compliance rule engine for the internship module. Each DocType row defines a document type — standard HR docs AND jurisdiction-specific compliance requirements are unified here.
**Existing Sheet Tab**: `DocType` — NO new tab needed.
**Update Mode on table**: Change from `UPDATES_ONLY` → `ALL_CHANGES` (required so the bot can read fresh data).

> ℹ️ **Why extend DocType instead of creating ComplianceRule?** DocType already IS the document type definition table. Compliance items (Work Permit, NOC, Insurance) ARE document types. The existing `RedAlert`, `OrangeAlert`, `YellowAlert` columns already handle expiry alerting. Adding 5 columns gives us the full compliance engine for free.

**New columns to ADD to `DocType`:**

| Column | Type | Initial Value / App Formula | Editable_If | Notes |
|--------|------|----------------------------|-------------|-------|
| `Country` | Enum | — | — | UAE, Qatar, Saudi Arabia, Japan, UK, All. `All` = applies to every jurisdiction (standard HR docs). |
| `DocCategory` | Enum | `"Standard HR"` | — | Values: `Work Permit`, `Visa/NOC`, `Insurance`, `Pension/Social`, `Government Portal`, `Standard HR`, `Other`. |
| `AppliesWhen` | Text | — | — | Condition narrative. e.g. "Non-national intern on company visa". |
| `IsMandatory` | Yes/No | `TRUE` | — | Display Name: "Mandatory?". |
| `IsComplianceRequirement` | Yes/No | `FALSE` | — | Display Name: "Compliance Item?". When TRUE, this DocType row is a jurisdiction compliance requirement that the bot will auto-generate per intern. |
| `NationalityScope` | Enum | `"All"` | — | Values: `All`, `National Only`, `Non-National Only`. Drives bot filtering. |

**Existing columns that remain unchanged and serve the compliance engine:**
| Existing Column | Compliance Use |
|----------------|---------------|
| `Name` | Compliance item name (e.g. "Work Permit", "NOC") |
| `Description` | Guidance note on the requirement |
| `RedAlert` | Days before expiry for urgent alert |
| `OrangeAlert` | Days before expiry for warning |
| `YellowAlert` | Days before expiry for early warning |

**New DocType slice:**
| Slice Name | Filter | Notes |
|-----------|--------|-------|
| `DocType_ComplianceRules` | `[IsComplianceRequirement] = TRUE` | Used by Bot_ComplianceBuilder to query rules. |

**Pre-seeded Compliance DocType data** (add these rows to DocType Google Sheet before go-live):

| Name | Country | DocCategory | IsMandatory | NationalityScope | IsComplianceRequirement | RedAlert | OrangeAlert | YellowAlert |
|------|---------|------------|------------|-----------------|------------------------|----------|-------------|-------------|
| Work Permit | UAE | Work Permit | Yes | All | Yes | 30 | 15 | 7 |
| NOC (No Objection Certificate) | UAE | Visa/NOC | Yes | Non-National Only | Yes | 30 | 15 | 7 |
| Pension (Nafes + ILOE) | UAE | Pension/Social | Yes | National Only | Yes | — | — | — |
| Business Visa | Qatar | Visa/NOC | Yes | Non-National Only | Yes | 30 | 15 | 7 |
| Work Permit | Saudi Arabia | Work Permit | Yes | All | Yes | 30 | 15 | 7 |
| Medical Insurance | Saudi Arabia | Insurance | Yes | All | Yes | 30 | 15 | 7 |
| Qiwa Contract | Saudi Arabia | Government Portal | Yes | National Only | Yes | — | — | — |
| GOSI Registration | Saudi Arabia | Pension/Social | Yes | National Only | Yes | — | — | — |
| Work Permit | Japan | Work Permit | Yes | All | Yes | 30 | 15 | 7 |
| Certificate of Eligibility | Japan | Government Portal | Yes | Non-National Only | Yes | 30 | 15 | 7 |
| Health Insurance | Japan | Insurance | Yes | Non-National Only | Yes | 30 | 15 | 7 |
| Temporary Work Visa (GAE) | UK | Visa/NOC | Yes | Non-National Only | Yes | 90 | 30 | 15 |

---

## Section 8: Documents Table (EXISTING — Extended)

**Purpose**: The existing `Documents` table is extended to serve as the compliance item tracker for interns. A `Documents` row with an `InternshipID` set IS a compliance item — no separate table needed.
**Existing Sheet Tab**: `Document` — NO new tab needed.

> ℹ️ **Why extend Documents instead of creating ComplianceItem?** Documents already has: Employee Ref, DocType Ref, File upload, SubStatus (HR verification), and the DocType expiry alert system. Adding 3 columns gives us intern compliance tracking for free, and all existing document management views/bots continue to work.

**New columns to ADD to `Documents`:**

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `InternshipID` | Enum Ref → Internship | — | `ISBLANK([_THIS])` | — | When set, this document is an intern compliance item. Write-once. Show_If: `[Employee].[IsIntern] = TRUE`. |
| `ComplianceStatus` | Enum | `"Required"` | — | — | Values: `Required`, `In Progress`, `Obtained`, `Not Required`. Show_If: `ISNOTBLANK([InternshipID])`. Display Name: "Compliance Status". |
| `DueDate` | Date | — | — | — | Target date to obtain this compliance document. Show_If: `ISNOTBLANK([InternshipID])`. |

**Existing columns that map to the original ComplianceItem design:**
| Existing Column | Compliance Equivalent |
|----------------|----------------------|
| `DocType` (Ref) | ComplianceRuleID — links to the extended DocType row |
| `DocType.[Name]` | ItemName (dereferenced) |
| `DocType.[DocCategory]` | Category (dereferenced) |
| `DocType.[IsMandatory]` | IsMandatory (dereferenced) |
| `File` | EvidenceFile — the uploaded compliance proof |
| `SubStatus` | VerificationStatus — HR confirms the obtained document is valid |
| `Employee` | Links doc to the intern employee record |

**New Documents slice:**
| Slice Name | Filter | Update Mode | Notes |
|-----------|--------|-------------|-------|
| `InternComplianceDocs` | `AND(ISNOTBLANK([InternshipID]), [Employee].[IsIntern]=TRUE)` | UPDATES_ONLY | Compliance board data source. |
| `InternDocuments_All` | `[Employee].[IsIntern] = TRUE` | UPDATES_ONLY | All documents for interns. |

**Compliance Status Actions (add to Documents table):**
| Action Name | Type | Condition | Behaviour |
|-------------|------|-----------|----------|
| `Approved_MarkObtained` | Set column values | `AND(ISNOTBLANK([InternshipID]),[ComplianceStatus]="In Progress")` | ComplianceStatus = "Obtained", SubStatus = "Verified" |
| `Approved_MarkInProgress` | Set column values | `AND(ISNOTBLANK([InternshipID]),[ComplianceStatus]="Required")` | ComplianceStatus = "In Progress" |
| `Approved_MarkNotRequired` | Set column values | `AND(ISNOTBLANK([InternshipID]),[ComplianceStatus]="Required")` | ComplianceStatus = "Not Required" |

---

## Section 8b: CheckList Table (EXISTING — Extended)

**Purpose**: The existing `CheckList` task template table is extended with Internship Onboarding types. The `Bot_InternOnboardingGenerator` creates `TaskList` rows from these templates — EXACTLY the same mechanism already used for employee onboarding.
**Existing Sheet Tab**: `CheckList` — NO new tab needed.

**Extend `CheckList.Type` enum — add these values:**
- `Internship Onboarding`

**New CheckList rows to seed** (add to CheckList Google Sheet before go-live):

| Type | TaskName | TaskCategory | TaskIndex | AssignedTo | DueDays | Notes |
|------|---------|-------------|----------|-----------|---------|-------|
| Internship Onboarding | Document Collection & ID Setup | HR | 1 | HR Admin | -3 | Before start date |
| Internship Onboarding | Agreement & NDA Dispatch | HR | 2 | HR Admin | -3 | Before start date |
| Internship Onboarding | Workspace & Induction Prep | Line Manager | 3 | Line Manager | 0 | Start date |
| Internship Onboarding | IT Access & Equipment | IT | 4 | IT Support | 0 | Start date |
| Internship Onboarding | Finance & Stipend Setup | Accounts | 5 | Finance | 3 | After start date |
| Internship Onboarding | PRO / Visa Initiation | PRO | 6 | PRO Team | -10 | UAE/KSA/Qatar only — before start date |

---

## Section 9: LearningRecord Table (NEW — EPIC)

**Purpose**: Weekly EPIC learning log entries by the intern.
**Parent**: Internship (One-to-Many)
**Google Sheet Tab Name**: `LearningRecord`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| `InternshipID` | Enum Ref → Internship | — | `ISBLANK([_THIS])` | — | Required. |
| `WeekNumber` | Number | — | — | — | Week number within internship. Display Name: "Week #". |
| `ActivityDate` | Date | `TODAY()` | — | — | Date of the activity. |
| `ActivityName` | Text | — | — | — | Short title of the activity logged. Display Name: "Activity / Task". |
| `EpicComponent` | Enum | — | — | — | Values: `Experiential`, `People`, `Investigation`, `Courses`. Driven by EPIC_List AppVariable. Display Name: "EPIC Category". |
| `WhatDidIDo` | LongText | — | — | — | Display Name: "What did I do?". |
| `WhatDidILearn` | LongText | — | — | — | Display Name: "What did I learn?". |
| `KeyChallenges` | LongText | — | — | — | Display Name: "Key challenges I faced". |
| `PersonalStrengths` | LongText | — | — | — | Display Name: "Personal strengths I demonstrated". |
| `EnjoyedMostLeast` | LongText | — | — | — | Display Name: "What I enjoyed most / least". |
| `DevelopmentNeeds` | LongText | — | — | — | Display Name: "Development needs identified". |
| `Status` | Enum | `"Draft"` | — | — | Values: `Draft`, `Submitted`, `Discussed`. |
| `DiscussedOn` | Date | — | — | — | Set at monthly check-in. Show_If: `[Status] = "Discussed"`. |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| `CreatedOn` | DateTime | `NOW()` | OFF | FALSE | |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| `LastEditOn` | DateTime | `NOW()` | OFF | TRUE | |
| `Label` (VC) | Virtual | `CONCATENATE([InternshipID].[EmployeeID].[Label], " - Wk", [WeekNumber], ": ", [ActivityName])` | — | — | |

**LearningRecord Slices:**
| Slice | Filter | Update Mode |
|-------|--------|-------------|
| `LearningRecordMySelf` | `[InternshipID].[EmployeeID].[AppUserID] = ANY(Me[ID])` | UPDATES_ONLY |
| `LearningRecordMyTeam` | `[InternshipID].[AppUserLineManagerID] = ANY(Me[ID])` | READ_ONLY |

**LearningRecord Actions:**
| Action | Condition | Behaviour |
|--------|-----------|-----------|
| `Approved_SubmitLearning` | `[Status] = "Draft"` | Status = "Submitted" |
| `Approved_MarkDiscussed` | `[Status] = "Submitted"` | Status = "Discussed", DiscussedOn = TODAY() |

---

## Section 10: MonthlyCheckIn Table (NEW)

**Purpose**: Monthly manager-intern meeting record with manager sign-off.
**Parent**: Internship (One-to-Many)
**Google Sheet Tab Name**: `MonthlyCheckIn`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| `InternshipID` | Enum Ref → Internship | — | `ISBLANK([_THIS])` | — | |
| `MonthNumber` | Number | — | — | — | Month 1, 2, 3… within the internship. |
| `MeetingDate` | Date | `TODAY()` | — | — | |
| `KeyLearnings` | LongText | — | — | — | Summary of key learnings this month. |
| `NextStepsAgreed` | LongText | — | — | — | Agreed actions and next steps. |
| `ManagerSignOff` | Yes/No | `FALSE` | — | — | Display Name: "Manager Sign-Off". |
| `ManagerSignOffDate` | Date | — | — | — | Show_If: `[ManagerSignOff] = TRUE`. |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| `CreatedOn` | DateTime | `NOW()` | OFF | FALSE | |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| `LastEditOn` | DateTime | `NOW()` | OFF | TRUE | |
| `Label` (VC) | Virtual | `CONCATENATE([InternshipID].[EmployeeID].[Label], " - Month ", TEXT([MonthNumber],"0"))` | — | — | |

---

## Section 11: EpicMilestone Table (NEW)

**Purpose**: Optional forward plan showing planned EPIC milestones by month.
**Parent**: Internship (One-to-Many)
**Google Sheet Tab Name**: `EpicMilestone`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| `InternshipID` | Enum Ref → Internship | — | `ISBLANK([_THIS])` | — | |
| `MonthNumber` | Number | — | — | — | Target month number. |
| `EpicComponent` | Enum | — | — | — | Experiential, People, Investigation, Courses. |
| `Topic` | Text | — | — | — | Planned topic or skill area. |
| `Facilitator` | Text | — | — | — | Who will facilitate/lead this milestone. |
| `ScheduledDate` | Date | — | — | — | Target date. |
| `Completed` | Yes/No | `FALSE` | — | — | |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| `CreatedOn` | DateTime | `NOW()` | OFF | FALSE | |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| `LastEditOn` | DateTime | `NOW()` | OFF | TRUE | |
| `Label` (VC) | Virtual | `CONCATENATE([InternshipID].[EmployeeID].[Label], " - M", TEXT([MonthNumber],"0"), " EPIC: ", [Topic])` | — | — | |

---

## Section 12: MentorAssignment Table (NEW)

**Purpose**: Tracks all mentor, supervisor, and site mentor assignments per internship.
**Parent**: Internship (One-to-Many)
**Google Sheet Tab Name**: `MentorAssignment`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| `InternshipID` | Enum Ref → Internship | — | `ISBLANK([_THIS])` | — | |
| `AppUserMentorID` | Enum Ref → AppUser | — | — | — | Display Name: "Mentor". |
| `Role` | Enum | — | — | — | Values: `Lead Mentor`, `Supervisor`, `Site Mentor`. |
| `Specialism` | Text | — | — | — | Mentor's area of expertise. |
| `SessionsPlanned` | Number | `0` | — | — | |
| `SessionsCompleted` | Number | `0` | — | — | |
| `IsActive` | Yes/No | `TRUE` | — | — | Display Name: "Active". |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| `CreatedOn` | DateTime | `NOW()` | OFF | FALSE | |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| `LastEditOn` | DateTime | `NOW()` | OFF | TRUE | |
| `Label` (VC) | Virtual | `CONCATENATE([AppUserMentorID].[Name], " → ", [InternshipID].[EmployeeID].[Label], " (", [Role], ")")` | — | — | |

---

## Section 13: InternReview Table (NEW)

**Purpose**: Regular, Mid, and End-of-internship review records on the standard Orbit 1–5 scale.
**Parent**: Internship (One-to-Many)
**Google Sheet Tab Name**: `InternReview`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| `InternshipID` | Enum Ref → Internship | — | `ISBLANK([_THIS])` | — | |
| `ReviewType` | Enum | — | `ISBLANK([_THIS])` | — | Values: `Regular`, `Mid`, `End`. Write-once. |
| `ReviewDate` | Date | `TODAY()` | — | — | |
| `WeekNumber` | Number | — | — | — | Show_If: `[ReviewType] = "Regular"`. Display Name: "Week #". |
| `QualityRating` | Enum | — | — | — | Values: `1`, `2`, `3`, `4`, `5`. Display Name: "Quality of Work (1-5)". |
| `TimelinessRating` | Enum | — | — | — | Values: `1`, `2`, `3`, `4`, `5`. Display Name: "Timeliness (1-5)". |
| `CommunicationRating` | Enum | — | — | — | Values: `1`, `2`, `3`, `4`, `5`. Display Name: "Communication (1-5)". |
| `CollaborationRating` | Enum | — | — | — | Values: `1`, `2`, `3`, `4`, `5`. Display Name: "Collaboration (1-5)". |
| `AverageScore` (VC) | Virtual | `IF(AND(ISNOTBLANK([QualityRating]),ISNOTBLANK([TimelinessRating]),ISNOTBLANK([CommunicationRating]),ISNOTBLANK([CollaborationRating])), ROUND((VALUE([QualityRating])+VALUE([TimelinessRating])+VALUE([CommunicationRating])+VALUE([CollaborationRating]))/4,2), 0)` | — | — | Auto-calculated mean. |
| `ScoreLabel` (VC) | Virtual | `IFS([AverageScore]>=4.5,"Exceeds Expectations",[AverageScore]>=3.5,"Meets Expectations",[AverageScore]>=2.5,"Partially Meets Expectations",[AverageScore]>=1.5,"Needs Support",TRUE,"Does Not Meet Expectations")` | — | — | Maps numeric score to Orbit label standard. |
| `Strengths` | LongText | — | — | — | |
| `DevelopmentAreas` | LongText | — | — | — | |
| `SupportNeeded` | LongText | — | — | — | |
| `NextSteps` | LongText | — | — | — | |
| `RecommendForHire` | Enum | — | — | — | Values: `Yes`, `No`, `Yes - Pending Conditions`. Show_If: `[ReviewType] = "End"`. Display Name: "Recommend for Hire?". |
| `ManagerSignOff` | Yes/No | `FALSE` | — | — | |
| `ManagerSignOffDate` | Date | — | — | — | Show_If: `[ManagerSignOff] = TRUE`. |
| `InternSignOff` | Yes/No | `FALSE` | — | — | Show_If: `[ReviewType] = "End"`. |
| `InternSignOffDate` | Date | — | — | — | Show_If: `AND([ReviewType]="End",[InternSignOff]=TRUE)`. |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| `CreatedOn` | DateTime | `NOW()` | OFF | FALSE | |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| `LastEditOn` | DateTime | `NOW()` | OFF | TRUE | |
| `Label` (VC) | Virtual | `CONCATENATE([InternshipID].[EmployeeID].[Label], " - ", [ReviewType], " Review (", TEXT([ReviewDate],"DD/MM/YYYY"), ")")` | — | — | |

**InternReview Slices:**
| Slice | Filter |
|-------|--------|
| `InternReviewMyTeam` | `[InternshipID].[AppUserLineManagerID] = ANY(Me[ID])` |
| `InternReviewMySelf` | `[InternshipID].[EmployeeID].[AppUserID] = ANY(Me[ID])` |

**InternReview Actions:**
| Action | Condition | Behaviour |
|--------|-----------|-----------|
| `Approved_ManagerSignOff` | `[ManagerSignOff] = FALSE` | ManagerSignOff = TRUE, ManagerSignOffDate = TODAY() |
| `Approved_InternSignOff` | `AND([ReviewType]="End",[InternSignOff]=FALSE)` | InternSignOff = TRUE, InternSignOffDate = TODAY() |

---

## Section 14: InternFeedback Table (NEW)

**Purpose**: Standardised intern satisfaction feedback form. Single record per internship. Replaces three previous variants.
**Parent**: Internship (One-to-One)
**Google Sheet Tab Name**: `InternFeedback`

| Column | Type | Initial Value / App Formula | Editable_If | Reset on Edit | Notes |
|--------|------|----------------------------|-------------|---------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | `ISBLANK([_THIS])` | — | |
| `InternshipID` | Enum Ref → Internship | — | `ISBLANK([_THIS])` | — | |
| `SubmittedDate` | Date | `TODAY()` | OFF | FALSE | |
| `RatingExperience` | Enum | — | — | — | 1 to 5. Display Name: "Overall Experience (1-5)". |
| `RatingCulture` | Enum | — | — | — | 1 to 5. Display Name: "Company Culture (1-5)". |
| `RatingTeam` | Enum | — | — | — | 1 to 5. Display Name: "Team & Colleagues (1-5)". |
| `RatingMentorship` | Enum | — | — | — | 1 to 5. Display Name: "Mentorship Quality (1-5)". |
| `RatingWorkload` | Enum | — | — | — | 1 to 5. Display Name: "Workload Balance (1-5)". |
| `RatingOutcome` | Enum | — | — | — | 1 to 5. Display Name: "Learning Outcome (1-5)". |
| `OverallScore` (VC) | Virtual | `IF(AND(ISNOTBLANK([RatingExperience]),ISNOTBLANK([RatingCulture]),ISNOTBLANK([RatingTeam]),ISNOTBLANK([RatingMentorship]),ISNOTBLANK([RatingWorkload]),ISNOTBLANK([RatingOutcome])), ROUND((VALUE([RatingExperience])+VALUE([RatingCulture])+VALUE([RatingTeam])+VALUE([RatingMentorship])+VALUE([RatingWorkload])+VALUE([RatingOutcome]))/6,2), 0)` | — | — | Auto-calculated mean across 6 dimensions. |
| `TextObjectives` | LongText | — | — | — | Display Name: "Were your objectives clear?". |
| `TextKeyLearning` | LongText | — | — | — | Display Name: "Key learning from this internship". |
| `TextExpertiseGained` | LongText | — | — | — | Display Name: "Expertise / skills gained". |
| `TextMostEnjoyed` | LongText | — | — | — | Display Name: "What did you enjoy most?". |
| `TextFutureOpportunities` | LongText | — | — | — | Display Name: "Interest in future opportunities (optional)". Show_If: `[FutureOpportunitiesOptIn] = TRUE`. |
| `TextOther` | LongText | — | — | — | Display Name: "Any other feedback?". |
| `RecommendToBLR` | Yes/No | — | — | — | Display Name: "Would you recommend BLR World to others?". |
| `FutureOpportunitiesOptIn` | Yes/No | `FALSE` | — | — | Display Name: "Open to future opportunities at BLR World?". |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE | |
| `CreatedOn` | DateTime | `NOW()` | OFF | FALSE | |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE | |
| `LastEditOn` | DateTime | `NOW()` | OFF | TRUE | |
| `Label` (VC) | Virtual | `CONCATENATE([InternshipID].[EmployeeID].[Label], " - Feedback (", TEXT([SubmittedDate],"DD/MM/YYYY"), ")")` | — | — | |

---

## Section 15: Phase B Tables

### InternApplication Table (NEW — Phase B)
> Extends CandidateSubmission. Add these columns to the existing `CandidateSubmission` table.

**New Columns on CandidateSubmission for Intern Applications:**

| Column | Type | Notes |
|--------|------|-------|
| `IsInternApplication` | Yes/No | Flag to distinguish intern applications from regular candidate submissions. |
| `InternApplicationUniversityID` | Enum Ref → University | Phase B: links to University table. |
| `InternApplicationProgramme` | Text | Display Name: "University Programme". |
| `InternApplicationType` | Enum | Experience, Project, Annual, Pathway. Display Name: "Internship Type Applied For". |
| `InternApplicationCoverNote` | LongText | Display Name: "Cover Note / Personal Statement". |
| `InternApplicationShortlistStatus` | Enum | Values: `New`, `Shortlisted`, `Interview`, `Offer`, `Rejected`. Default: `"New"`. |
| `InternApplicationReviewerNotes` | Text | HR/recruiter notes during shortlisting. |

**New CandidateSubmission Slice:**
| Slice | Filter |
|-------|--------|
| `InternApplications` | `[IsInternApplication] = TRUE` |

---

### Cohort Table (NEW — Phase B)
**Google Sheet Tab Name**: `Cohort`

| Column | Type | Initial Value / App Formula | Notes |
|--------|------|----------------------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | |
| `Name` | Text | — | e.g. "Summer 2026 Cohort". Label column. |
| `IntakePeriod` | Enum | — | Values: `Jan-Mar`, `Apr-Jun`, `Jul-Sep`, `Oct-Dec`. |
| `Year` | Number | — | e.g. 2026. |
| `Status` | Enum | `"Planned"` | Values: `Planned`, `Active`, `Completed`, `Archived`. |
| `Notes` | LongText | — | |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF, FALSE |
| `CreatedOn` | DateTime | `NOW()` | OFF, FALSE |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF, TRUE |
| `LastEditOn` | DateTime | `NOW()` | OFF, TRUE |
| `InternCount` (VC) | Virtual | `COUNT(SELECT(Internship[ID],[CohortID]=[_THISROW].[ID]))` | |
| `Label` (VC) | Virtual | `CONCATENATE([Name], " (", TEXT([Year],"0"), ")")` | |

---

### University Table (NEW — Phase B)
**Google Sheet Tab Name**: `University`

| Column | Type | Initial Value / App Formula | Notes |
|--------|------|----------------------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | |
| `Name` | Text | — | University full name. Label column. |
| `City` | Text | — | |
| `Country` | Enum | — | UAE, Qatar, Saudi Arabia, Japan, UK, Other. |
| `CareerServicesContact` | Text | — | Name of contact at the university. |
| `Email` | Email | — | |
| `Mobile` | Phone | — | |
| `ProgrammeLinks` | LongText | — | Notes on linked programmes. |
| `Status` | Enum | `"Active"` | Values: `Active`, `Inactive`. |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF, FALSE |
| `CreatedOn` | DateTime | `NOW()` | OFF, FALSE |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF, TRUE |
| `LastEditOn` | DateTime | `NOW()` | OFF, TRUE |
| `ActiveInternCount` (VC) | Virtual | `COUNT(SELECT(Employee[ID],AND([UniversityID]=[_THISROW].[ID],[IsIntern]=TRUE)))` | |
| `Label` (VC) | Virtual | `[Name]` | |

---

### Certificate Table (NEW — Phase B)
**Google Sheet Tab Name**: `Certificate`

| Column | Type | Initial Value / App Formula | Notes |
|--------|------|----------------------------|-------|
| `ID` | Text (Key) | `TEXT(UNIQUEID())` | |
| `InternshipID` | Enum Ref → Internship | — | Write-once. |
| `IssueDate` | Date | `TODAY()` | OFF, FALSE |
| `CertificateFile` | File | — | Auto-generated PDF stored in Drive. |
| `RecommendationLetterFile` | File | — | Optional. |
| `IssuedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF, FALSE |
| `CreatedOn` | DateTime | `NOW()` | OFF, FALSE |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF, TRUE |
| `LastEditOn` | DateTime | `NOW()` | OFF, TRUE |
| `Label` (VC) | Virtual | `CONCATENATE([InternshipID].[EmployeeID].[Label], " - Certificate (", TEXT([IssueDate],"DD/MM/YYYY"), ")")` | |

---

## Section 16: AppViews — New Navigation Entries

> Add the following rows to the existing `AppViews` table. Set AllowRoles accordingly.

| ID | Category | Name | View (AppSheet View Name) | AllowRoles |
|----|----------|------|--------------------------|------------|
| `EarlyCareer_HR_Home` | Early Careers | Intern Dashboard | `InternDash` | U_People_Admin, U_System_Admin |
| `EarlyCareer_HR_All` | Early Careers | All Interns | `InternshipActive` | U_People_Admin, U_System_Admin |
| `EarlyCareer_HR_Compliance` | Early Careers | Compliance Board | `ComplianceItem_Board` | U_People_Admin, U_System_Admin |
| `EarlyCareer_HR_Docs` | Early Careers | Intern Documents | `InternDocuments` | U_People_Admin, U_System_Admin |
| `EarlyCareer_LM_MyInterns` | My Interns | My Interns | `InternshipMyOwn` | U_Reporting_Officer |
| `EarlyCareer_LM_Reviews` | My Interns | Log a Review | `InternReviewMyTeam` | U_Reporting_Officer |
| `EarlyCareer_Self_Home` | My Internship | My Internship | `InternshipMySelf` | U_Intern |
| `EarlyCareer_Self_Learning` | My Internship | My EPIC Log | `LearningRecordMySelf` | U_Intern |
| `EarlyCareer_Self_Feedback` | My Internship | Submit Feedback | `InternFeedback_Form` | U_Intern |
| `EarlyCareer_Univ_Progress` | Partner Access | Intern Progress | `InternshipByUniversity` | U_University_Coordinator |
