# Early Careers Module — UX Views & Role Configuration
> BLR World HRMS (Orbit) · Phase 3 — Early Careers & Internship Module
> OmmNoMi Automation LLP · Issued for IKAROS · v1.0 · 18 June 2026

Follows OmmNoMi UX SOP: Deck for mobile lists, Table for bulk data, Dashboard for module overviews, Detail (side-by-side) for record inspection.

---

## Role Configuration

### New AppVariables Roles to Add

| Role Value | Display Name | Access Level Summary |
|-----------|-------------|---------------------|
| `U_People_Admin` | People Admin (HR) | Full intern lifecycle access: create, manage, approve, run reports |
| `U_Intern` | Intern | Self-service: own record, own tasks, own EPIC log, own reviews (read-only), own feedback |
| `U_University_Coordinator` | University Coordinator | Read-only: progress view for their sponsored interns only, via row-level security |

### Role Check Formulas

```appsheet
// HR / People Admin check
ISNOTBLANK(INTERSECT({"U_People_Admin","U_System_Admin"}, SPLIT(ANY(Me[Roles]), ",")))

// Line Manager check (existing)
ISNOTBLANK(INTERSECT({"U_Reporting_Officer","U_System_Admin"}, SPLIT(ANY(Me[Roles]), ",")))

// Intern self-service check
ISNOTBLANK(INTERSECT({"U_Intern"}, SPLIT(ANY(Me[Roles]), ",")))

// University Coordinator check
ISNOTBLANK(INTERSECT({"U_University_Coordinator"}, SPLIT(ANY(Me[Roles]), ",")))
```

---

## A8: Phase A UX Views

### HR Module: Intern Dashboard
**View Name**: `InternDash`
**View Type**: Dashboard
**Show_If**: `ISNOTBLANK(INTERSECT({"U_People_Admin","U_System_Admin"}, SPLIT(ANY(Me[Roles]),",")))`

**Dashboard Composition**:
| Panel | View | Type | Notes |
|-------|------|------|-------|
| Top row | `InternStats_Card` | Detail | Key stats: Active interns count, open compliance items, pending reviews |
| Row 2 left | `InternshipActive` | Deck | Active interns list |
| Row 2 right | `ComplianceItem_Board` | Table | Open compliance items grouped by Status |
| Row 3 left | `InternReview_Pending` | Deck | Reviews pending manager sign-off |
| Row 3 right | `InternDocument_Expiry` | Table | Intern docs with expiry within 30 days |

---

### HR View: All Interns (Active)
**View Name**: `InternshipActive`
**View Type**: Table
**Data Source**: Slice `InternshipActive`
**Sort**: `StartDate DESC`
**Quick Edit Columns**: `Status`
**Search**: Enabled
**Columns Shown**: `Label`, `Type`, `Department`, `Country`, `Status`, `StartDate`, `EndDate`, `DurationWeeks`, `ActiveComplianceCount`, `InternReviewCount`

**Status Format Rules** (OmmNoMi UX SOP):
| Status | Color | Icon |
|--------|-------|------|
| Applied | Gray | ✏️ |
| Shortlisted | Blue | 🔵 |
| Offered | Blue | 📩 |
| Agreement Sent | Orange | 📋 |
| Onboarding | Orange | ⏳ |
| Active | Green | ✅ |
| Mid Review | Blue | 📊 |
| Final Review | Orange | 📊 |
| Completed | Green | 🏆 |
| Converted | Green | 🚀 |
| Withdrawn | Red | ❌ |

---

### HR View: Compliance Board
**View Name**: `ComplianceItem_Board`
**View Type**: Table
**Data Source**: Slice `InternComplianceDocs` (Documents table, filtered to `ISNOTBLANK([InternshipID])`)
**Group By**: `InternshipID` (display as Label)
**Sort**: `ComplianceStatus` (Required first)
**Columns Shown**: `Employee.[Label]`, `DocType.[Name]`, `DocType.[DocCategory]`, `ComplianceStatus`, `File`, `DueDate`, `SubStatus`
**Show_If**: HR and Admin roles only

> ℹ️ `ComplianceStatus` replaces the original `Status` column from the old ComplianceItem table. `SubStatus` (existing Documents column) shows whether HR has verified the obtained document.

**Compliance Status Format**:
| Status | Color | Icon |
|--------|-------|------|
| Required | Red | 🔴 |
| In Progress | Orange | ⏳ |
| Obtained | Green | ✅ |
| Not Required | Gray | — |

---

### HR View: Intern Documents Board
**View Name**: `InternDocuments_Board`
**View Type**: Table
**Data Source**: Slice `InternDocuments`
**Group By**: `Type`
**Sort**: `DateOfExpiry ASC` (soonest expiry first)
**Columns**: `Label`, `Type`, `VerificationStatus`, `DateOfExpiry`, `NotificationStatus`

---

### HR Detail: Internship Record
**View Name**: `Internship_Detail`
**View Type**: Detail (Side-by-side layout on tablet/desktop)
**Sections (using Display Groups)**:

```
📋 Internship Overview
  → Type, Department, Country, Status, StartDate, EndDate, DurationWeeks

👤 People
  → EmployeeID, AppUserLineManagerID, AppUserMentorID, ProjectID

📄 Agreement & Certification
  → AgreementSigned, AgreementSignedDate, CertificateIssued, CertificateIssuedDate, RecommendForHire

🔒 Compliance
  → PassportExpiryCheck (VC), ActiveComplianceCount
  → Inline Related View: ComplianceItem_Inline (child list)

📝 EPIC Learning
  → LearningRecordCount (VC)
  → Inline Related View: LearningRecord_Inline

⭐ Reviews
  → InternReviewCount (VC)
  → Inline Related View: InternReview_Inline

📁 Documents & Drive
  → DriveFolderURL, Notes
  → Inline Related View: InternDocuments_Inline

📊 Tasks
  → PendingTaskCount (VC)
  → Inline Related View: TaskList_Intern_Inline
```

**Action Buttons on Internship_Detail** (role-gated):
| Button | Show_If | Prominence |
|--------|---------|------------|
| `Approved_SendAgreement` | HR role + Status = Onboarding | Prominently displayed |
| `Approved_ActivateIntern` | HR role + Status = Agreement Sent + AgreementSigned = TRUE | Prominently displayed |
| `Approved_MoveToOnboarding` | HR role + Status = Offered | Display overlay |
| `Approved_CompleteInternship` | HR role + Status = Final Review | Prominently displayed |
| `Approved_ConvertToEmployee` | HR role + Status = Completed + RecommendForHire = Yes | Prominently displayed |
| `Rejected_WithdrawInternship` | HR role only | Do not prominently display |

---

### Line Manager View: My Interns
**View Name**: `InternshipMyOwn`
**View Type**: Deck (mobile-first)
**Data Source**: Slice `InternshipMyOwn`
**Image Column**: None (use initial/avatar)
**Primary Header**: `[EmployeeID].[Label]`
**Secondary**: `[Type] · [Country] · [Status]`
**Summary**: `CONCATENATE("Wk ", TEXT([DurationWeeks],"0"), " · ", TEXT([EndDate],"DD MMM YYYY"))`

---

### Line Manager View: Log a Review
**View Name**: `InternReviewMyTeam`
**View Type**: Table
**Data Source**: Slice `InternReviewMyTeam`
**Group By**: `InternshipID` (display label)
**Columns**: `Label`, `ReviewType`, `ReviewDate`, `AverageScore`, `ScoreLabel`, `ManagerSignOff`

**Action on each row**: `Approved_ManagerSignOff` (prominent)

---

### Line Manager View: EPIC Record Review
**View Name**: `LearningRecordMyTeam`
**View Type**: Table
**Data Source**: Slice `LearningRecordMyTeam`
**Group By**: `InternshipID`
**Columns**: `Label`, `WeekNumber`, `EpicComponent`, `ActivityName`, `Status`, `DiscussedOn`
**Action**: `Approved_MarkDiscussed` (on Submitted records)

---

### Intern Self-Service: My Internship Home
**View Name**: `InternshipMySelf`
**View Type**: Detail (single record)
**Data Source**: Slice `InternshipMySelf`
**Note**: Interns see a read-only summary of their own internship record. No status-change actions.

**Sections shown to intern**:
```
🎯 My Internship
  → Type, Department, Country, StartDate, EndDate, DurationWeeks, Status

📋 My Onboarding Tasks
  → Inline: TaskList_MySelf_Inline (filtered to their EmployeeID, Category contains "Internship Onboarding")

📝 My EPIC Learning Log
  → LearningRecordCount
  → Inline: LearningRecord_MySelf_Inline

⭐ My Reviews
  → Inline: InternReview_MySelf_Inline (read-only, shows their review scores)

📄 My Documents
  → Inline: InternDocuments_MySelf_Inline (own document uploads)

🔒 My Compliance Items
  → Inline: ComplianceItem_MySelf_Inline (view status, upload evidence)
```

---

### Intern Self-Service: My EPIC Log
**View Name**: `LearningRecordMySelf`
**View Type**: Deck (mobile-optimised)
**Data Source**: Slice `LearningRecordMySelf`
**Primary**: `[ActivityName]`
**Secondary**: `[EpicComponent] · Week [WeekNumber]`
**Summary**: `[Status]`
**Group By**: `WeekNumber`
**Sort**: `ActivityDate DESC`
**Add button**: Enabled (interns can add their own logs)
**Action**: `Approved_SubmitLearning` (for Draft records)

---

### Intern Self-Service: Submit Feedback
**View Name**: `InternFeedback_Form`
**View Type**: Form
**Data Source**: Slice `InternFeedback` filtered to `[InternshipID].[EmployeeID].[AppUserID] = ANY(Me[ID])`
**Show_If**: Only shown when a Draft InternFeedback record exists for this intern
**Note**: Bot pre-creates the draft record. Intern fills it in via this form.

**Form Column Order**:
1. Rating section header (Display text)
2. RatingExperience, RatingCulture, RatingTeam, RatingMentorship, RatingWorkload, RatingOutcome
3. Written section header
4. TextObjectives, TextKeyLearning, TextExpertiseGained, TextMostEnjoyed
5. RecommendToBLR, FutureOpportunitiesOptIn
6. TextFutureOpportunities (Show_If: FutureOpportunitiesOptIn = TRUE)
7. TextOther

---

### University Coordinator View: Intern Progress
**View Name**: `InternshipByUniversity`
**View Type**: Table (read-only)
**Data Source**: Slice `InternshipByUniversity`
**Update Mode**: READ_ONLY
**Columns**: `Label`, `Type`, `StartDate`, `EndDate`, `Status`, `LearningRecordCount`, `InternReviewCount`
**Show_If**: `ISNOTBLANK(INTERSECT({"U_University_Coordinator"}, SPLIT(ANY(Me[Roles]),",")))`

> Row-level security: The University Coordinator's `AppUser` record must have a `UniversityID` column (Enum Ref → University) added to AppUser, allowing `InternshipByUniversity` slice to filter by `[EmployeeID].[UniversityID] = [CurrentUser].[UniversityID]`.

---

## B12: Phase B Dashboard Views

### Leadership Dashboard
**View Name**: `Leadership_Dash`
**View Type**: Dashboard
**Show_If**: HR + System Admin roles

**Charts to include**:
| Chart | Type | Data |
|-------|------|------|
| Interns by Status | Donut | COUNT(Internship) grouped by Status |
| Interns by Department | Bar | COUNT(Internship) grouped by Department |
| EPIC Activity Mix | Bar | COUNT(LearningRecord) grouped by EpicComponent |
| Average Feedback Score | KPI Card | AVG(InternFeedback.OverallScore) |
| Conversion Rate | KPI Card | COUNT(Internship where Status=Converted) / COUNT(Internship where Status=Completed) |
| Interns by Cohort | Table | COUNT(Internship) grouped by CohortID |

---

### HR Cockpit Dashboard
**View Name**: `HR_InternCockpit`
**View Type**: Dashboard

**Panels**:
| Panel | Content |
|-------|---------|
| Open Compliance Items | ComplianceItem table filtered to Required + In Progress |
| Document Expiry Alerts | EmployeeDocument (intern only) sorted by DateOfExpiry |
| Reviews Due This Week | InternReview where ManagerSignOff = FALSE |
| Interns in Onboarding | Internship where Status = Onboarding |
| Feedback Not Yet Submitted | InternFeedback where FutureOpportunitiesOptIn is blank |

---

## AppResources Entries (Phase B14: Training Documentation)

> Add these rows to AppResources table with `Standard = TRUE`.

| Category | Title | Roles |
|----------|-------|-------|
| Early Careers | How to Create and Manage an Internship Record | U_People_Admin |
| Early Careers | How to Use the Compliance Board | U_People_Admin |
| Early Careers | How to Log Your Weekly EPIC Activity | U_Intern |
| Early Careers | How to Complete a Review | U_Reporting_Officer |
| Early Careers | How to Submit Your Internship Feedback | U_Intern |
| Early Careers | Intern Self-Service Guide — Getting Started | U_Intern |
| Early Careers | University Coordinator — Viewing Intern Progress | U_University_Coordinator |
