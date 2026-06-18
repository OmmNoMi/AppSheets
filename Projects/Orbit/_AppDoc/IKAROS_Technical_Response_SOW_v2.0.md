# **Technical Response to Orbit SOW v2.0**

## **Orbit — Early Careers & Internship Module**

| Field | Detail |
| :---- | :---- |
| **Prepared by** | OmmNoMi Automation LLP (Nomeshwer Sharma, Lead Developer) |
| **Prepared for** | IKAROS Digital Team — Mohammad Aqeel (Project Sponsor) |
| **On behalf of** | BLR World (Orbit People Platform) |
| **In response to** | Developer Technical Scope of Work v2.0 — issued 8 June 2026 |
| **Response date** | 18 June 2026 |
| **Classification** | Confidential — for IKAROS and Orbit project team |

## 

## **1\. Scope Acceptance**

OmmNoMi Automation has reviewed the SOW v2.0 in full, including all 16 sections and Appendices B and C. We formally accept the fixed scope defined in Sections 5 and 6\.

Because we have identified significant structural reuse within the existing Orbit architecture (detailed in Section 2.2), we are able to reduce the required development effort. Furthermore, applying our standard **$25/hour** rate, we offer the full delivery at **$2,000 (80 hours)** rather than the originally budgeted $3,160 (96 hours).

We are ready to initiate Phase A upon receipt of the 50% advance invoice based on these revised figures.

## **2\. Technical Approach**

### **2.1 Additive Module Strategy**

The Early Careers module is designed as a **purely additive extension** of the live Orbit app. No existing tables, bots, views, or security logic are modified destructively. Every new feature is layered on top of what already works. This protects the Phase 1 and Phase 2 functionality in production throughout the build.

### **2.2 Reuse-First Architecture**

Before creating any new table or bot, we verified every requirement against the live Orbit schema (v1.102403, parsed 12 June 2026). The guiding principle is: **if an equivalent pattern already exists in Orbit, extend it — do not duplicate it.**

Applying this principle, our build has already identified two significant improvements over the initial design in the SOW:

**Compliance architecture — revised:**

The SOW (Section 6.10) specifies two new tables: Compliance\_Rules (config) and Compliance\_Items (per-intern operational). During technical design we found that Orbit already has an **identical structural pattern** in production:

DocType (config/type definition) → Documents (per-employee document instances)

Compliance requirements — work permits, NOCs, insurance certificates — *are* document types. Rather than create two new tables that mirror an existing pattern, we extend the existing ones:

* DocType is extended with 6 new columns: Country, DocCategory, AppliesWhen, IsMandatory, IsComplianceRequirement, NationalityScope. A slice (DocType\_ComplianceRules) filters to compliance rows only.  
* Documents is extended with 3 new columns: InternshipID, ComplianceStatus, DueDate. A Documents row with InternshipID set *is* a compliance item. The existing DocType.RedAlert / OrangeAlert / YellowAlert expiry alerting system applies automatically to every compliance document — no additional configuration required.

**Onboarding task generation — revised:**

The SOW specifies that the onboarding bot creates role-based tasks for Line Manager, HR, IT, Accounts and PRO. Orbit already has a CheckList → TaskList template-to-instance mechanism in production. Rather than hardcoding field values inside bot steps, we add 6 new rows to CheckList with Type \= "Internship Onboarding" and the bot fires the existing Create\_Tasks action against them. This is the *exact same mechanism* BLR World already uses for employee onboarding — no new bot logic to maintain.

**Net architectural improvement:**

| Metric | SOW Assumption | OmmNoMi Build |
| :---- | :---- | :---- |
| New Google Sheet tabs | 9 | **7** |
| Existing tables extended | 3 | **5** |
| AppSheet tables (new \+ extended) | 12 | **10** |
| Compliance alert system | Build from scratch | **Inherited from DocType** |
| Onboarding task pattern | Custom bot steps | **Existing CheckList** → **TaskList** |

These changes reduce build complexity, reduce maintenance surface, and directly align with BLR World's existing workflow patterns — making the module immediately familiar to the HR team.

## **3\. Full Delivery Plan**

### **Phase A — Core Module (Priority Scope)**

| Ref | Activity | What We Build | Hrs |
| :---- | :---- | :---- | :---- |
| A1 | Data model & schema | 7 new sheet tabs; extensions to Employee, DocType, Documents, CheckList; AppVariables; all slices; row-level security | 8 |
| A2 | Lifecycle & status engine | 11-state status machine; all Action buttons with role guards; status format rules; transition conditions | 5 |
| A3 | Onboarding & agreement automation | Bot\_InternOnboardingGenerator (CheckList pattern); Bot\_AgreementNDAGenerator; Apps Script for Google Docs merge \+ Drive filing; signature tracking | 8 |
| A4 | Compliance engine | DocType extension (6 cols); Documents extension (3 cols); DocType\_ComplianceRules slice; Bot\_ComplianceBuilder; Bot\_PassportValidityCheck; 12 pre-seeded rules across 5 jurisdictions (Appendix B) | 6 |
| A5 | EPIC learning records | LearningRecord table; MonthlyCheckIn table; EpicMilestone table; Bot\_WeeklyLearningReminder; intern EPIC view; EPIC component breakdown VC | 8 |
| A6 | Mentoring & reviews | MentorAssignment table; InternReview table (Regular/Mid/End); Bot\_MidReviewTrigger; Bot\_EndReviewTrigger; Bot\_ReviewCadenceReminder; 1–5 rating scale aligned to Orbit standard | 7 |
| A7 | Intern feedback | InternFeedback table (6 Section A ratings \+ Section B free text); Bot\_FeedbackDispatch; OverallScore VC; dashboard rollup | 4 |
| A8 | Self-service & cockpit views | Intern self-service (4 views); Mentor/Manager (4 views); HR Cockpit (5 views); status format rules; role check formulas | 6 |
|  | **Phase A Total** | **Priority scope — complete functional module** | **52** |

### 

### **Phase B — Extended Scope**

| Ref | Activity | What We Build | Hrs |
| :---- | :---- | :---- | :---- |
| B9 | Application intake | CandidateData extension (7 new cols); InternApplications slice; shortlisting view; one-click Internship record creation | 6 |
| B10 | Cohorts & universities | Cohort table; University table (consolidates 3 spreadsheets); Cohort grouping on dashboards | 4 |
| B11 | Certificates & conversion | Certificate table; Bot\_CertificateGenerator (Apps Script PDF merge); Bot\_ConversionHandoff (intern → Employee onboarding) | 5 |
| B12 | Dashboards & reporting | HR\_InternCockpit dashboard; Leadership\_Dash (intake, conversion, satisfaction, EPIC mix by cohort/department) | 5 |
| B13 | QA, UAT & support | Full UAT against Section 16 criteria; bug fix cycle; UAT documentation | 5 |
| B14 | Training & documentation | 7 AppResources entries (in-app guides); user walkthrough document; screen recording guide | 3 |
|  | **Phase B Total** | **Extended scope** | **28** |
|  | **Total** | **Full module, Phases A and B** | **80** |

## **4\. Delivery Timeline**

| Phase | Build effort | BLR review window | Elapsed |
| :---- | :---- | :---- | :---- |
| A — Core | 5–6 weeks | 10 business days | 6–8 weeks |
| B — Extended | 3–4 weeks | 10 business days | 4–6 weeks |
| Contingency buffer | 2 weeks | — | Covers dependencies and review cycles |
| **Total** | **10–12 weeks build** | **included** | **11–13 weeks end to end** |

**Indicative start**: Week of 23 June 2026, upon receipt of Phase A advance. **Indicative Phase A delivery**: Mid-August 2026\. **Indicative Phase B delivery**: Late September / early October 2026\.

## **5\. Clarifications and Assumptions Carried Forward**

The following items from SOW Section 13 are confirmed. We record them here so there is no ambiguity at UAT.

| \# | Assumption / Dependency | OmmNoMi Status |
| :---- | :---- | :---- |
| 1 | Module built on the live Orbit AppSheet app and Google Workspace tenant | Confirmed. We have full access to the live app. |
| 2 | BLR World provides finalised templates for Agreement, NDA, and Certificate | **Dependency — required before A3 build begins.** We can start the data model (A1) and lifecycle engine (A2) in parallel while templates are finalised. |
| 3 | BLR World confirms compliance rules per country | Confirmed. We have mapped all 12 rules from Appendix B. Pre-seeded data is ready. |
| 4 | Interns are issued a BLR account or reachable by email | Confirmed. Self-service views require AppSheet access. Notifications use Gmail. |
| 5 | Phase reviews completed within 10 business days | Confirmed per Section 15\. Automatic acceptance applies after 10 days per the agreed terms. |
| 6 | AppSheet plan supports automation, PDF generation and multi-role security | BLR World's responsibility per Section 15, clause 7\. Current plan should be verified before build start. |
| 7 | Refundable advance (Amendment to Section 15, Clause 3\) | **Amended.** If a phase is rejected and a refund is triggered, the refund will be issued **excluding any applicable GST and transaction charges**. A 100% refund of the advance amount is not possible due to these non-recoverable fees. |

**Additional clarification from SOW Appendix B (Appendix note):**

The SOW correctly flags these items as pending confirmation with BLR World. We recommend resolving them before Phase A UAT, as they affect the compliance engine configuration:

* UAE PDPL and UK GDPR data protection notices for intern data  
* Under-18 restrictions (parental consent flows, if any interns are minors)  
* UK paid vs. unpaid internship legality under National Minimum Wage rules  
* Maximum duration rules by jurisdiction

These are configuration-only changes to the DocType seed data — they do not require additional development and are within scope to adjust.

## **6\. New Table Register**

The following tables will exist in the Orbit database after the full Phase A \+ B build. No existing tables are removed or renamed.

### **New Google Sheet tabs (7)**

| Tab Name | Phase | Purpose |
| :---- | :---- | :---- |
| Internship | A | Core intern record, 11-state lifecycle |
| LearningRecord | A | Weekly EPIC activity log |
| MonthlyCheckIn | A | Manager monthly sign-off |
| EpicMilestone | A | Forward plan by month and EPIC component |
| MentorAssignment | A | Mentor/supervisor assignments per internship |
| InternReview | A | Regular/Mid/End reviews on 1–5 scale |
| InternFeedback | A | Standardised end-of-internship feedback |
| Certificate | B | Certificate issuance records |
| Cohort | B | Intake grouping |
| University | B | Consolidated institution register |

**Note**: CandidateData (Phase B) is extended with 7 new columns, not a new tab. Similarly, DocType, Documents, CheckList, and Employee are extended — no new tabs.

### **Existing tables extended**

| Existing Table | Phase | New Columns Added |
| :---- | :---- | :---- |
| Employee | A | IsIntern (VC), InternshipID (Ref), UniversityID (Ref — Phase B), UniversityProgramme, AcademicSupervisor, ExpectedGraduation |
| DocType | A | Country, DocCategory, AppliesWhen, IsMandatory, IsComplianceRequirement, NationalityScope |
| Documents | A | InternshipID, ComplianceStatus, DueDate |
| CheckList | A | Type enum extended: \+ Internship Onboarding. 6 new template rows seeded. |
| CandidateData | B | UniversityID, Programme, InternshipTypeApplied, CoverNote, ShortlistStatus, ReviewerNotes, ConvertedInternship |

## 

## **7\. Bot & Automation Register**

All 12 bots will be delivered. The two bots with architectural revisions from the SOW design are noted.

| ID | Bot Name | Trigger | Revised from SOW? |
| :---- | :---- | :---- | :---- |
| A1 | Bot\_InternOnboardingGenerator | Status → Onboarding | ✓ — Now uses CheckList → TaskList pattern (not hardcoded steps) |
| A2 | Bot\_AgreementNDAGenerator | Status → Agreement Sent | No change |
| A3 | Bot\_ComplianceBuilder | Country set \+ 0 compliance docs exist | ✓ — Queries DocType\_ComplianceRules slice; creates Documents rows |
| A4 | Bot\_PassportValidityCheck | Passport document added/updated | No change |
| A5 | Bot\_WeeklyLearningReminder | Scheduled — Every Monday | No change |
| A6 | Bot\_ReviewCadenceReminder | Scheduled — Every Monday | No change |
| A7 | Bot\_MidReviewTrigger | Scheduled — Daily | No change |
| A8 | Bot\_EndReviewTrigger | Scheduled — Daily | No change |
| A9 | Bot\_FeedbackDispatch | Scheduled — Daily (end date approaching) | No change |
| B1 | Bot\_CertificateGenerator | Status → Completed | No change |
| B2 | Bot\_ConversionHandoff | Recommend for hire \+ conversion confirmed | No change |
| B3 | Bot\_InternApplicationNotify | ADDS\_ONLY on CandidateData | No change |

## 

## **8\. User Roles and Access**

The module fully reuses the existing Orbit multi-role security model. No new role architecture is required.

| Role | Access in the Early Careers module |
| :---- | :---- |
| U\_People\_Admin (HR) | Full access — create and manage internships, compliance, reviews, documents, dashboards |
| U\_Reporting\_Officer (Line Manager / Mentor) | Their interns only — tasks, learning records, reviews, approvals |
| Employee (Intern) | Self-service — own onboarding, document upload, learning log, feedback |
| University Coordinator (Phase B, optional) | Read-only progress for sponsored interns via row-level security (AppUser.UniversityID) |

## 

## **9\. Document Generation Readiness**

All four document types will be generated via Google Docs merge (the existing Orbit Apps Script pattern) and filed automatically to the intern's Drive folder.

| Document | Trigger | BLR Template Required? |
| :---- | :---- | :---- |
| Internship Offer \+ Agreement | Status → Agreement Sent | **Yes — needed before A3 build** |
| NDA | With the Agreement | **Yes — needed before A3 build** |
| Completion Certificate | Status → Completed (Phase B) | Yes — needed before B11 build |
| Internship Summary Report | On Completion | Auto-compiled from learning records — no template needed |

## 

## **10\. UAT Acceptance Readiness**

We will deliver the module ready to test against every UAT criterion in Section 16 of the SOW.

| UAT Criterion | Delivered by | Phase |
| :---- | :---- | :---- |
| Intern created, onboarded, agreement generated \+ filed automatically | A3 | A |
| Country selection generates correct compliance items; expiring passport flagged | A4 | A |
| Intern logs EPIC records; manager completes Regular, Mid and End reviews on 1–5 scale | A5 \+ A6 | A |
| Feedback form dispatched automatically; scores appear on dashboard | A7 \+ A8 | A |
| Completed intern receives generated certificate (Phase B) | B11 | B |
| Pathway intern converted to Employee onboarding (Phase B) | B2 | B |

## 

## **11\. Out of Scope — Confirmed**

We acknowledge and confirm the out-of-scope exclusions in Section 14:

* Custom CSS, external HTML or layouts beyond native AppSheet  
* Payroll processing or live government portal integrations  
* Migration of historic intern records beyond the agreed active cohort  
* Views, automations or fields not listed in Sections 5 and 6  
* Changes to the wider Orbit system outside this module  
* Third-party integrations or e-signature platforms  
* Certificate artwork, legal clause drafting, or training video production

Any requirement outside this list requires a Change Request, quoted and approved separately before any work begins.

## **12\. Next Steps**

| \# | Action | Owner | Target |
| :---- | :---- | :---- | :---- |
| 1 | IKAROS / BLR World countersign this response to confirm engagement | IKAROS / Mohammad Aqeel | By 25 June 2026 |
| 2 | Phase A 50% advance invoice issued by OmmNoMi | OmmNoMi | On countersignature |
| 3 | Phase A advance received and engagement initiated | BLR World | Within 5 business days of invoice |
| 4 | BLR World shares finalised Agreement, NDA, and Certificate templates | BLR World | Before Week 2 (required for A3) |
| 5 | BLR World confirms jurisdiction compliance rules from Appendix B | BLR World | Before Week 3 (required for A4) |
| 6 | Phase A build begins (A1 Data model \+ A2 Status engine in parallel) | OmmNoMi | Week of 23 June 2026 |
| 7 | Phase A delivery for UAT | OmmNoMi | Mid-August 2026 |
| 8 | Phase A UAT window (10 business days) | BLR World | August / September 2026 |
| 9 | Phase B initiated on Phase A acceptance | OmmNoMi | September 2026 |

## 

## **13\. Supporting Technical Documentation**

All detailed build specifications are maintained in the Orbit project documentation repository:

| Document | Location | Contents |
| :---- | :---- | :---- |
| EarlyCareer\_Schema.md | Projects/Orbit/\_AppDoc/ | Full column definitions for all 7 new tables and 5 extended tables, slices, VCs, actions, and seed data |
| EarlyCareer\_Automations.md | Projects/Orbit/\_AppDoc/ | All 12 bots — trigger conditions, step logic, idempotency guards, Apps Script integration points |
| EarlyCareer\_UX\_Views.md | Projects/Orbit/\_AppDoc/ | All UX views across 4 persona sets, role formulas, format rules, AppResources |
| Decisions.md | Projects/Orbit/ | Architectural decisions log, including DocType+Documents compliance design |

These documents are the single source of truth for the physical build and will be shared with the IKAROS team as requested.

*Prepared by OmmNoMi Automation LLP — Nomeshwer Sharma (Lead Developer)*

*18 June 2026*

*Confidential — for IKAROS and Orbit project team only*