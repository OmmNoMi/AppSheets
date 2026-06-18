# Early Careers Module — Automations & Bots Reference
> BLR World HRMS (Orbit) · Phase 3 — Early Careers & Internship Module
> OmmNoMi Automation LLP · Issued for IKAROS · v1.0 · 18 June 2026

All bots follow OmmNoMi Automation SOP:
- `ADDS_ONLY` for notification bots — never `ADDS_AND_UPDATES`
- Scheduled bots run at **08:00 AM GST (04:00 AM UTC)** — aligned to Dubai business start
- Complex multi-step work queued via `AppTriggers` pattern
- All document generation via Google Apps Script webhook (existing pattern)
- AppTimeline used for date-based bot execution logging

---

## Bot A1: Intern Onboarding Generator

| Setting | Value |
|---------|-------|
| **Name** | `Bot_InternOnboardingGenerator` |
| **Event** | `ADDS_AND_UPDATES` on `Internship` |
| **Condition** | `AND([Status] = "Onboarding", [_THISROW_BEFORE].[Status] <> "Onboarding", COUNT(SELECT(TaskList[ID], AND([EmployeeID]=[EmployeeID], CONTAINS([Category],"Internship Onboarding")))) = 0)` |
| **Purpose** | Generates role-based onboarding tasks and creates the intern's Google Drive folder when status first moves to "Onboarding". Idempotency check (`COUNT = 0`) prevents duplicate task generation. |

**Step 1 — Create Internship Onboarding tasks from CheckList templates:**
```
// Use the existing CheckList → TaskList pattern.
// For each CheckList row where Type = "Internship Onboarding" (excluding PRO for non-Gulf),
// execute the existing Create_Tasks action which creates a TaskList row.

Filter: SELECT(CheckList[ID], AND([Type]="Internship Onboarding", [Status]="Active",
  OR([TaskCategory] <> "PRO", IN([_THISROW].[Country], {"UAE","Saudi Arabia","Qatar"}))
))
// The Create_Tasks action on CheckList sets:
//   TaskList.Employee       = [Internship].[EmployeeID]
//   TaskList.Category       = [CheckList].[TaskCategory]
//   TaskList.TaskName       = [CheckList].[TaskName]
//   TaskList.TaskDescription = [CheckList].[TaskDescription]
//   TaskList.AssignedTo     = [CheckList].[AssignedTo]
//   TaskList.StartDate      = [Internship].[StartDate]
//   TaskList.DueDate        = WORKDAY([StartDate], [CheckList].[DueDays])
//   TaskList.Status         = "Pending"
//   TaskList.CheckList      = [CheckList].[ID]
```

> ⚠️ **Implementation note**: AppSheet does not support a native "for-each on filtered table" bot step that calls another table's action. Use a multi-step Data Change bot with one Add Row step per CheckList template (since the 6 templates are fixed). Alternatively, use an Apps Script webhook that calls the AppSheet API to batch-create TaskList rows. The Apps Script approach is cleaner for the PRO conditional.

**Step 6 — Trigger Drive Folder Creation:**
```
Action: Add row to AppTriggers
AppTrigger = "CreateInternDriveFolder"   (AppSettings ID — must be seeded)
RefTable   = "Internship"
RefValue   = [ID]
Bot        = TRUE
```
> The existing Apps Script (Drive Folder Lifecycle pattern) is reused. A new AppSettings row `CreateInternDriveFolder` is added to route intern folder creation under the relevant Project's Drive directory.

**Step 7 — Notify Line Manager:**
```
Action: Send email notification
To:      [AppUserLineManagerID].[Email]
Subject: "New Intern Onboarding: {{intern name}} starts {{start date}}"
Body:    Dynamic email body with intern name, type, start date, and link to record.
```

---

## Bot A2: Agreement & NDA Generator

| Setting | Value |
|---------|-------|
| **Name** | `Bot_AgreementNDAGenerator` |
| **Event** | `ADDS_AND_UPDATES` on `Internship` |
| **Condition** | `AND([Status] = "Agreement Sent", [_THISROW_BEFORE].[Status] <> "Agreement Sent")` |
| **Purpose** | Fires when HR clicks `Approved_SendAgreement`. Generates the internship agreement + NDA from Google Docs templates via Apps Script webhook. Files PDFs to the intern's Drive folder. Logs to EmployeeDocument and Communication. |

**Step 1 — Trigger Apps Script webhook:**
```appsheet
Action: Call a webhook
URL:    [Apps Script Webhook URL from AppSettings("AgreementScriptURL")]
Body:   {
  "internshipID": "{{[ID]}}",
  "employeeName": "{{[EmployeeID].[FirstName]}} {{[EmployeeID].[LastName]}}",
  "internType": "{{[Type]}}",
  "startDate": "{{[StartDate]}}",
  "endDate": "{{[EndDate]}}",
  "lineManager": "{{[AppUserLineManagerID].[Name]}}",
  "driveFolderID": "{{[DriveFolderID]}}"
}
```

> **Apps Script logic**: Copies the Agreement template, replaces `{{placeholders}}`, exports to PDF, moves to `[DriveFolderID]`, and returns the `fileURL`. Follows OmmNoMi AppScript rules: try/catch, `replaceText()` on plain text placeholders (no Smart Chips), `setTrashed()` on failure.

**Step 2 — Create EmployeeDocument row (Agreement):**
```
Action: Add a new row to EmployeeDocument
EmployeeID         = [EmployeeID]
Type               = "Internship Agreement"
VerificationStatus = "Pending"
```

**Step 3 — Create EmployeeDocument row (NDA):**
```
Action: Add a new row to EmployeeDocument
EmployeeID         = [EmployeeID]
Type               = "Internship NDA"
VerificationStatus = "Pending"
```

**Step 4 — Notify Intern (if BLR email available):**
```
Action: Send email
To:     [EmployeeID].[Email]
Subject: "Your Internship Agreement is Ready — BLR World"
Body:   Dynamic email. Instructs intern to sign and return.
```

---

## Bot A3: Compliance Builder

| Setting | Value |
|---------|-------|
| **Name** | `Bot_ComplianceBuilder` |
| **Event** | `ADDS_AND_UPDATES` on `Internship` |
| **Condition** | `AND(ISNOTBLANK([Country]), COUNT(SELECT(Documents[ID], AND([InternshipID]=[_THISROW].[ID]))) = 0)` |
| **Purpose** | Runs when Country is set for the first time. Queries the `DocType` table (via the `DocType_ComplianceRules` slice: `IsComplianceRequirement = TRUE`) for all rules matching the intern's country, and creates `Documents` rows for each — one per compliance requirement. Uses the existing DocType→Documents pattern. Idempotency check prevents duplication. |

**Step 1 — For each matching DocType row, add a Documents row:**
```appsheet
// Filter DocType_ComplianceRules slice where:
//   [Country] = [Internship].[Country] OR [Country] = "All"

Action: For each matching DocType row, Add a new row to Documents:
  Employee          = [_THISROW].[EmployeeID]        // intern employee ref
  DocType           = [DocType].[ID]                 // compliance rule ref
  InternshipID      = [_THISROW].[ID]                // write-once intern link
  ComplianceStatus  = "Required"                     // default status
  // ItemName, DocCategory, IsMandatory all dereferenced from DocType — no copy needed
  // DueDate left blank — HR sets per-item as needed
```

> **Implementation note**: AppSheet bots support "Add a row" steps but not native loops over a filtered set. Use one of:
> - **Option A** (Pure AppSheet): A separate scheduled or triggered process that uses `FILTER()` and creates rows one-by-one. Requires a known maximum number of compliance rules per country (current max = 4 for Saudi Arabia).
> - **Option B** (Apps Script webhook — recommended): Bot calls an Apps Script webhook that uses the AppSheet API to batch-create Documents rows in a single call. Cleaner, no row count limit, consistent with the existing Drive/agreement generation pattern.

**Step 2 — Notify HR of generated items:**
```
Action: Send notification to HR Admin
Subject: "Compliance items generated for {{intern name}} ({{country}})"
Body:   Lists item count and links to Compliance Board.
```

---

## Bot A4: Passport Validity Check

| Setting | Value |
|---------|-------|
| **Name** | `Bot_PassportValidityCheck` |
| **Event** | `ADDS_AND_UPDATES` on `EmployeeDocument` |
| **Condition** | `AND([Type] = "Passport", ISNOTBLANK([DateOfExpiry]), [EmployeeID].[IsIntern] = TRUE)` |
| **Purpose** | When a passport is uploaded or updated for an intern, checks expiry date against internship end date + 7 months (SOW requirement). Sets NotificationStatus accordingly. |

```appsheet
// Derived on EmployeeDocument:
// InternEndDate VC = [EmployeeID].[InternshipID].[EndDate]
// MinValidDate VC  = EDATE([EmployeeID].[InternshipID].[EndDate], 7)

// Bot sets NotificationStatus:
IF([DateOfExpiry] >= [MinValidDate],
  "Active",        // ✅ Valid — 7+ months after end date
  IF([DateOfExpiry] >= [InternEndDate],
    "Warning-30",  // ⚠️ Warning — expires between end date and +7 months
    "Expired"      // ❌ Expires before internship ends
  )
)
```

**Step 1 — Set NotificationStatus on EmployeeDocument:**
```
Action: Set column value
NotificationStatus = (formula above)
```

**Step 2 — Notify HR if Warning or Expired:**
```
Condition: IN([NotificationStatus], {"Warning-30","Expired"})
Action: Send email to HR
Subject: "⚠️ Passport Validity Issue — {{intern name}}"
Body:   Passport expiry date, internship end date, and link to record.
```

---

## Bot A5: Weekly Learning Reminder

| Setting | Value |
|---------|-------|
| **Name** | `Bot_WeeklyLearningReminder` |
| **Event** | Scheduled — Every Monday at 08:00 AM GST |
| **Table** | `Internship` |
| **Row Filter** | `AND(IN([Status],{"Active","Mid Review"}), COUNT(SELECT(LearningRecord[ID], AND([InternshipID]=[_THISROW].[ID], [CreatedOn] >= EOWEEK(TODAY(),-1)-6, [CreatedOn] <= EOWEEK(TODAY(),-1)))) = 0)` |
| **Purpose** | Every Monday, checks each active internship. If no LearningRecord was logged in the previous week, sends a reminder to the intern. |

**Step — Send reminder to intern:**
```
Action: Send email
To:     [EmployeeID].[Email]
Subject: "📝 Don't forget your EPIC log this week!"
Body:   Friendly reminder to log weekly learning activity. Link to My EPIC Log view.
```

---

## Bot A6: Regular Review Cadence Reminder

| Setting | Value |
|---------|-------|
| **Name** | `Bot_ReviewCadenceReminder` |
| **Event** | Scheduled — Every Monday at 08:00 AM GST |
| **Table** | `Internship` |
| **Row Filter** | `AND(IN([Status],{"Active","Mid Review"}), MOD(([TODAY()]-[StartDate]), LOOKUP("ReviewCadenceDays","AppSettings","ID","Decimal")) = 0)` |
| **Purpose** | On the cadence day (weekly or biweekly based on AppSettings), reminds line managers to complete a Regular review for each active intern. |

**Step — Notify Line Manager:**
```
Action: Send email
To:     [AppUserLineManagerID].[Email]
Subject: "📋 Regular Review Due: {{intern name}}"
Body:   Intern name, current week number, link to InternReview form.
```

---

## Bot A7: Mid-Review Trigger

| Setting | Value |
|---------|-------|
| **Name** | `Bot_MidReviewTrigger` |
| **Event** | Scheduled — Daily at 08:00 AM GST |
| **Table** | `Internship` |
| **Row Filter** | `AND([Status] = "Active", TODAY() >= ([StartDate] + INT(([EndDate]-[StartDate])/2)), COUNT(SELECT(InternReview[ID], AND([InternshipID]=[_THISROW].[ID],[ReviewType]="Mid"))) = 0)` |
| **Purpose** | Fires when today reaches the midpoint of the internship. If no Mid review exists yet, creates a TaskList task and notifies the line manager. |

**Step 1 — Create Mid Review Task:**
```
Action: Add row to TaskList
EmployeeID          = [EmployeeID]
Title               = "Mid-Internship Review Due"
Category            = "Intern Review - Mid"
Status              = "Pending"
AppUserAssignedToID = [AppUserLineManagerID]
DueDate             = TODAY() + 5
```

**Step 2 — Update Internship Status:**
```
Action: Set column values on Internship
Status = "Mid Review"
```

**Step 3 — Notify Line Manager:**
```
Action: Send email
To:     [AppUserLineManagerID].[Email]
Subject: "📋 Mid-Internship Review Due: {{intern name}}"
```

---

## Bot A8: End Review Trigger

| Setting | Value |
|---------|-------|
| **Name** | `Bot_EndReviewTrigger` |
| **Event** | Scheduled — Daily at 08:00 AM GST |
| **Table** | `Internship` |
| **Row Filter** | `AND(IN([Status],{"Active","Mid Review"}), TODAY() >= ([EndDate] - 14), COUNT(SELECT(InternReview[ID], AND([InternshipID]=[_THISROW].[ID],[ReviewType]="End"))) = 0)` |
| **Purpose** | Fires 14 days before end date. Creates end review task and moves status to "Final Review". |

**Step 1 — Create End Review Task:**
```
Action: Add row to TaskList
Title               = "End-of-Internship Review Due"
Category            = "Intern Review - End"
AppUserAssignedToID = [AppUserLineManagerID]
DueDate             = [EndDate] - 3
```

**Step 2 — Update Status:**
```
Status = "Final Review"
```

**Step 3 — Notify Line Manager + Intern:**
```
Actions: Send emails to both [AppUserLineManagerID].[Email] and [EmployeeID].[Email]
```

---

## Bot A9: Intern Feedback Dispatch

| Setting | Value |
|---------|-------|
| **Name** | `Bot_FeedbackDispatch` |
| **Event** | Scheduled — Daily at 08:00 AM GST |
| **Table** | `Internship` |
| **Row Filter** | `AND(IN([Status],{"Active","Mid Review","Final Review"}), TODAY() >= ([EndDate] - LOOKUP("InternFeedbackDaysBeforeEnd","AppSettings","ID","Decimal")), COUNT(SELECT(InternFeedback[ID],[InternshipID]=[_THISROW].[ID])) = 0)` |
| **Purpose** | Fires `InternFeedbackDaysBeforeEnd` (default 14) days before end date. Sends the standardised feedback form link to the intern. Creates a pre-filled InternFeedback record in Draft. |

**Step 1 — Create Draft InternFeedback record:**
```
Action: Add row to InternFeedback
InternshipID  = [ID]
SubmittedDate = [EndDate]
```

**Step 2 — Send feedback link to intern:**
```
To:      [EmployeeID].[Email]
Subject: "We'd love your feedback — BLR World Internship"
Body:    Personalised message. Deep link to InternFeedback form in the app.
```

---

## Bot B1: Certificate Generator (Phase B)

| Setting | Value |
|---------|-------|
| **Name** | `Bot_CertificateGenerator` |
| **Event** | `ADDS_AND_UPDATES` on `Internship` |
| **Condition** | `AND([Status] = "Completed", [_THISROW_BEFORE].[Status] <> "Completed", [CertificateIssued] = FALSE, COUNT(SELECT(InternReview[ID],AND([InternshipID]=[_THISROW].[ID],[ReviewType]="End",[ManagerSignOff]=TRUE))) > 0)` |
| **Purpose** | Fires when status moves to Completed AND End review is manager-signed-off. Generates the completion certificate PDF via Apps Script, creates Certificate record, updates Internship. |

**Step 1 — Trigger Apps Script:**
```
Webhook → Apps Script
Body: { internshipID, employeeName, internType, startDate, endDate, issuedBy, driveFolderID }
Script: Copies Certificate template, replaces placeholders, exports PDF to intern Drive folder.
```

**Step 2 — Create Certificate record:**
```
Add row to Certificate:
InternshipID = [ID]
IssueDate    = TODAY()
IssuedBy     = ANY(Me[ID])
```

**Step 3 — Update Internship:**
```
CertificateIssued     = TRUE
CertificateIssuedDate = TODAY()
```

---

## Bot B2: Employee Conversion Handoff (Phase B)

| Setting | Value |
|---------|-------|
| **Name** | `Bot_ConversionHandoff` |
| **Event** | `ADDS_AND_UPDATES` on `Internship` |
| **Condition** | `AND([Status] = "Converted", [_THISROW_BEFORE].[Status] <> "Converted", [RecommendForHire] = "Yes")` |
| **Purpose** | When HR confirms conversion (clicks `Approved_ConvertToEmployee` action), updates the Employee record's EmploymentType from Intern to the appropriate employment type, triggers standard Employee onboarding tasks. |

**Step 1 — Update Employee record:**
```
Action: Set column values on Employee ([EmployeeID])
Status         = "Onboarding"   ← resets to onboarding for full employment
EmploymentType = "Full-time"    ← HR updates as appropriate
```

**Step 2 — Create Conversion Task for HR:**
```
Add row to TaskList:
Title    = "Convert Intern to Employee: Update contract + system access"
Category = "Internship Onboarding - HR"
Status   = "Pending"
DueDate  = TODAY() + 5
```

**Step 3 — Notify HR:**
```
To: HR Admin
Subject: "🎉 Intern Conversion: {{intern name}} → Full Employee"
```

---

## Bot B3: Application Intake Notification (Phase B)

| Setting | Value |
|---------|-------|
| **Name** | `Bot_InternApplicationNotify` |
| **Event** | `ADDS_ONLY` on `CandidateSubmission` |
| **Condition** | `[IsInternApplication] = TRUE` |
| **Purpose** | Notifies HR when a new intern application is submitted via the Google Form. |

```
Action: Send notification to HR
Subject: "New Intern Application: {{applicant name}} — {{internship type}}"
Body:   Applicant name, university, type applied for. Link to InternApplications view.
```

---

## Summary: Bot Registry

| Bot ID | Name | Trigger | Phase | Notes |
|--------|------|---------|-------|-------|
| A1 | `Bot_InternOnboardingGenerator` | Status → Onboarding | A | Uses CheckList → TaskList pattern (existing mechanism) |
| A2 | `Bot_AgreementNDAGenerator` | Status → Agreement Sent | A | |
| A3 | `Bot_ComplianceBuilder` | Country set + 0 Documents with InternshipID | A | Queries DocType_ComplianceRules, creates Documents rows |
| A4 | `Bot_PassportValidityCheck` | EmployeeDocument (Passport) ADDS_AND_UPDATES | A | |
| A5 | `Bot_WeeklyLearningReminder` | Scheduled: Every Monday | A | |
| A6 | `Bot_ReviewCadenceReminder` | Scheduled: Every Monday | A | |
| A7 | `Bot_MidReviewTrigger` | Scheduled: Daily | A | |
| A8 | `Bot_EndReviewTrigger` | Scheduled: Daily | A | |
| A9 | `Bot_FeedbackDispatch` | Scheduled: Daily | A | |
| B1 | `Bot_CertificateGenerator` | Status → Completed | B | |
| B2 | `Bot_ConversionHandoff` | Status → Converted | B | |
| B3 | `Bot_InternApplicationNotify` | ADDS_ONLY on CandidateSubmission | B | |

---

## Architectural Changes from Initial Design

> **Raised by**: User review · 18 June 2026

### ComplianceRule → Eliminated (use DocType)
The `ComplianceRule` table has been eliminated. The existing `DocType` table is extended with 6 new columns (`Country`, `DocCategory`, `AppliesWhen`, `IsMandatory`, `IsComplianceRequirement`, `NationalityScope`). The `DocType_ComplianceRules` slice (`IsComplianceRequirement = TRUE`) acts as the rule filter for the bot. **Saves 1 new sheet tab.**

### ComplianceItem → Eliminated (use Documents)
The `ComplianceItem` table has been eliminated. The existing `Documents` table is extended with 3 new columns (`InternshipID`, `ComplianceStatus`, `DueDate`). A `Documents` row with `InternshipID` set IS a compliance item. The existing DocType expiry alert system (RedAlert/OrangeAlert/YellowAlert) applies automatically. **Saves 1 new sheet tab.**

### CheckList → Extended (instead of hardcoded task rows in bot)
The `Bot_InternOnboardingGenerator` no longer hardcodes task field values. Instead it uses the existing CheckList → TaskList creation pattern by adding 6 new CheckList template rows with `Type = "Internship Onboarding"`. **Follows the established Orbit onboarding pattern exactly.**

### Net impact
- New sheet tabs reduced: **9 → 7** (ComplianceRule + ComplianceItem eliminated)
- Existing tables extended: **3 → 5** (DocType + Documents + CheckList now extended)
- Total new tables in AppSheet: **12 → 10**
