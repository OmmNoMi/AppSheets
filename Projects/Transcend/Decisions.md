# Decisions Log — Transcend IntakeSystem
> Append-only. Never edit past entries. Current state → Schema.md / ProjectInfo.md.

---

### 2026-05-31 — Project Initialized
**Context**: First meeting with David Phelan (2026-05-27). New AppSheet project for intake processing.
**Decision**: Created project folder from OmmNoMi template.
**Reason**: Standard OmmNoMi onboarding protocol.
**Impact**: All project files created under `Projects/Transcend_IntakeSystem/`
**Pattern**: Not reusable (standard onboarding)

---

### 2026-05-31 — Separate AppSheet App (Not Merged with Existing Task App)
**Context**: David asked whether to merge with existing task management app or build new.
**Decision**: Separate AppSheet application with a cross-app navigation button.
**Reason**: Existing task app covers multiple businesses. Transcend intake is a standalone clinical workflow. Separation keeps schemas clean and allows independent scaling. Apps can be linked via navigation button.
**Impact**: New Google Sheets workbook required. New AppSheet app.
**Pattern**: Not reusable (project-specific context)

---

### 2026-05-31 — App Script for Document Generation (Not AppSheet PDF)
**Context**: Need to generate 5 documents merged into 1 for client signature.
**Decision**: Use Google App Script to generate Google Docs from templates — not AppSheet's built-in PDF renderer.
**Reason**: AppSheet uses HTML-based PDF renderer with significant formatting limitations. Google Docs via App Script gives full formatting control, allows conditional section inclusion (consent paragraphs), and — critically — e-signatures can only be initiated from Google Docs, not PDFs.
**Impact**: Requires App Script project linked to the Google Sheet. AppSheet triggers scripts via webhook/scheduled automation.
**Pattern**: AP-004 (to be added) — "App Script for complex document generation"

---

### 2026-05-31 — Consent Questions Captured at Intake (Not Post-Facto)
**Context**: Service contract has two opt-in/opt-out sections: Email Consent and Telehealth Consent. David initially considered a free-text field in the e-sign document.
**Decision**: Add `ConsentEmail` (Yes/No) and `ConsentTelehealth` (Yes/No) to the Google Form intake. App Script uses these flags to include the correct pre-written paragraph in the merged document. Client sees the statement already filled — they just sign.
**Reason**: Free-text in e-sign doc is confusing for non-tech-savvy clients. Pre-determined paragraph eliminates ambiguity and is legally cleaner (explicit statement vs. typed "I do"). Capturing at intake means no extra step after document generation.
**Impact**: Two questions added to Google Form (or captured in AppSheet pre-generation if form not yet updated). Two columns in Client table: `ConsentEmail`, `ConsentTelehealth`.
**Pattern**: Not reusable in exact form, but see FP-003 pattern idea — "Consent-driven document versioning"

---

### 2026-05-31 — Google e-Sign Phase 1, DocuSign Phase 1.5
**Context**: Need automated e-signature. Google e-Sign has no public API (as of 2026-05). DocuSign has full API.
**Decision**: Phase 1 = Google e-Sign (manual — admin opens Google Doc, enters client email, sends). Phase 1.5 = migrate to DocuSign API once account is set up, enabling full automation from AppSheet.
**Reason**: Google e-Sign is free and already in client's Google Workspace. DocuSign requires paid account + API setup. Phase 1 gets value immediately; Phase 1.5 adds full automation.
**Impact**: `AppSetting.DocuSignEnabled = FALSE` initially. `ClientDocument` table has both Google Doc and DocuSign fields ready. Bot automation will check this flag before sending.
**Pattern**: Not reusable

---

### 2026-05-31 — HIPAA/PCI Compliance: Card Number Not Stored in AppSheet
**Context**: Google Form collects full card number and security code. AppSheet would normally import all columns.
**Decision**: App Script reads the raw form sheet, extracts last 4 digits of card number only, writes `CardLast4` to `ClientPayment`. Full card number and CVV are NEVER written to AppSheet tables. Raw form sheet access restricted to admin only.
**Reason**: Storing full card numbers in AppSheet/Google Sheets violates PCI DSS. CVV must never be stored anywhere. HIPAA requires minimum necessary information principle.
**Impact**: `ClientPayment` table has `CardLast4` (Text) only — no full card field. App Script function `extractLast4()` handles this. Security Code column excluded entirely from AppSheet schema.
**Pattern**: BF-006 (to add) — "HIPAA/PCI: Extract last 4 from payment forms"

---

### 2026-05-31 — Medications Normalized to Child Table (Not Flat Columns)
**Context**: Google Form stores up to 3 medications as flat column groups (Medication1_Name, Medication1_Dosage, etc.).
**Decision**: AppSheet schema uses `ClientMedication` child table — one record per medication, not flat columns. App Script during intake processing creates individual `ClientMedication` rows.
**Reason**: Flat columns break when clients have more than 3 medications (future phase). Child table is scalable, queryable, and follows relational design. `[Related ClientMedications]` list deref works cleanly.
**Impact**: IntakeForm keeps flat columns (Google Form output, unmodified). App Script normalizes into ClientMedication during processing. Schema future-proof for more than 3 medications.
**Pattern**: SP-002 (to add) — "Normalize flat form columns to child table during intake processing"

---

### 2026-05-31 — Hourly App Script Bot for Intake Auto-Processing
**Context**: David's admin assistant works 8am–12pm AZ only. New client form submissions happen any time. David wants the flow from form submission to document generation to be automatic.
**Decision**: App Script time-based trigger runs every hour. Checks IntakeForm sheet for rows where `ProcessedStatus = "New"`. For each, creates Client + child records, creates Drive folder, sets `ProcessedStatus = "Processed"`. Manual "Generate Docs" button still available for re-runs.
**Reason**: AppSheet automations (ADDS_ONLY bots) have limitations with external script triggers. App Script time-based trigger is more reliable for Google Sheets → App Script workflows. `BotProcessingEnabled` AppSetting flag allows admin to pause the bot.
**Impact**: App Script project needs time-based trigger set to every 1 hour. AppTrigger table logs each bot run.
**Pattern**: AU-004 (to add) — "Hourly App Script bot for Google Form auto-processing"

---

### 2026-05-31 — Google Drive Shared Drive (Not My Drive) for HIPAA
**Context**: Client documents contain PHI (Protected Health Information). Need organized, access-controlled file storage.
**Decision**: Use Google Workspace **Shared Drive** (not personal "My Drive"). Folder per client: `[ClientID]_[LastName]_[FirstName]/`. Root folder ID stored in `AppSetting.DriveFolderID`.
**Reason**: Shared Drive is owned by the organization (not an individual). If an employee leaves, files are not lost. HIPAA requires organizational control over PHI. Shared Drive supports granular permission management.
**Impact**: Requires Google Workspace admin to create Shared Drive "Transcend_Clients". App Script uses `Drive.Files.create()` with `driveId` parameter. `AppSetting.DriveFolderID` stores root Shared Drive ID.
**Pattern**: SP-003 (to add) — "HIPAA-compliant Shared Drive folder structure for client files"

---

### 2026-06-03 — Scope Expanded: Intake System → Full Business Solution
**Context**: Jun 3 meeting revealed David's needs extend well beyond intake processing. Session management, clinical notes, and role-based access are required now.
**Decision**: Project renamed from "Transcend IntakeSystem" to "Transcend" to reflect full business solution scope.
**Reason**: David uses multiple fragmented spreadsheets (session notes, history, income tracking, billing checklist). A unified AppSheet solution replaces all of them progressively.
**Impact**: Feature Matrix updated. Phase 2 now includes Session, SessionNotes, and future billing/income modules. Project folder renamed to `Projects/Transcend/`.
**Pattern**: Not reusable

---

### 2026-06-03 — Terminology Fix: "Intake" Redefined
**Context**: Discovered during Jun 3 meeting that David uses "intake" to mean the first appointment/session, not the data collection form.
**Decision**: Google Form = "Client Information Form". First appointment = "Intake Session". Reflected in UI labels, status values, and all documentation.
**Reason**: Shared vocabulary prevents miscommunication during build and client reviews.
**Impact**: `Client.Status` value updated from `IntakeReceived` to `ClientInfoReceived`. Status `Scheduled` renamed to `AwaitingIntakeSession`. `IntakeComplete` = first appointment done.
**Pattern**: Not reusable

---

### 2026-06-03 — Session + SessionNotes Tables Added to Schema
**Context**: David tracks session dates and notes separately per client. Currently via Google Sheets template (one doc per client). Redesigning natively in AppSheet.
**Decision**: Add `Session` table (date, time, client ref) and `SessionNotes` child table (multiple notes per session). Therapist assigned at Client level — not per Session.
**Reason**: Relational structure is cleaner, queryable, and supports future features (billing checklist, feedback form) without rework. Per-client therapist assignment reflects actual practice workflow.
**Impact**: Two new tables added to schema. `Client` table gets `TherapistName` field. `Session` does NOT have a therapist column.
**Pattern**: SP-004 (to add) — "Session + SessionNotes child table pattern for clinical apps"

---

### 2026-06-03 — Other Therapists Excluded from AppSheet (Phase 1)
**Context**: David has two other therapists at the practice. Their notes are kept privately in Therapy Notes EHR, not shared with David's system.
**Decision**: No `Therapist` table in Phase 1. No AppSheet access granted to other therapists. Therapist name stored as a simple Enum or Text field on the Client record.
**Reason**: Other therapists use personal emails and maintain fully independent records. No workflow overlap with David's system. Adding them adds complexity with zero benefit in Phase 1.
**Impact**: `Therapist` table removed from ERD. Client table gets `AssignedTherapist` Enum field (values: David + 2 therapist names).
**Pattern**: Not reusable

---

### 2026-06-03 — Assistant Permission Scope Finalized
**Context**: Admin Assistant (Philippines) needs to manage client pipeline but must not see clinical data.
**Decision**: `Operations_Manager` role can see all Client records (any time range) and Session dates/times. Cannot see `SessionNotes` or clinical history documents. No row-level time restriction.
**Reason**: Assistant needs full visibility of client pipeline for scheduling and admin tasks. Clinical notes are confidential. Time restriction (originally considered: 6-month cap) was dropped — David confirmed no restriction needed on record history.
**Impact**: Slice or security filter on `SessionNotes` table: `USEREMAIL() = [Admin Email]` or role-based filter. `ClientDocument` table: assistant can see file metadata but not clinical history doc category.
**Pattern**: Not reusable (case-specific permissions)

---

### 2026-06-03 — Client Status Simplified for Pipeline Tracking
**Context**: David's current spreadsheet uses three color codes to track where new clients are.
**Decision**: `Client.Status` includes three pipeline-stage values mapping to David's colors: `Not Proceeding` (Red), `Awaiting Intake Session` (Yellow), `Intake Complete` (Green). These sit within the broader status lifecycle.
**Reason**: Replicates existing mental model so adoption is frictionless. Color formatting in AppSheet can mirror the spreadsheet exactly.
**Impact**: `Client.Status` Enum extended. Dashboard view uses conditional formatting: Red/Yellow/Green per status.
**Pattern**: Not reusable (client-specific terminology)

---

### 2026-06-03 — App Ownership Retained During Development (David Unavailable)
**Context**: David is unavailable week of Jun 9, 2026. Planned to transfer app ownership to his account this session.
**Decision**: OmmNoMi retains AppSheet app ownership. Transfer to David's account only when app is fully complete and ready for handover.
**Reason**: Owner account access is needed for certain AppSheet configurations during build. Remote handoffs mid-build are disruptive.
**Impact**: App remains in OmmNoMi AppSheet account. No action needed until handover milestone.
**Pattern**: Not reusable

---

### 2026-06-03 — Post-Session Client Feedback Form — Architecture Reserved
**Context**: David confirmed interest in a post-session feedback form for clients. Not urgent but a clear future need.
**Decision**: Architecture must support it. A `SessionFeedback` child table or linked Google Form response per Session will be added in Phase 2. No build in Phase 1.
**Reason**: Designing the foundation correctly now avoids rework. Session table already has a one-to-many relationship — adding a feedback child table later is straightforward.
**Impact**: No schema change now. Note added to Phase 2 feature matrix.
**Pattern**: Not reusable

---

*(Append new entries below this line)*
