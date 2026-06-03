# Project Info — Transcend Counseling & Wellness
> Living document. Update in place. WHY decisions changed → Decisions.md.

---

## Project Overview
| Field | Value |
|-------|-------|
| Client | Transcend Counseling & Wellness |
| Contact | David Phelan, LPC (Owner) |
| Website | https://www.transcendaz.com/ |
| App Name | Transcend (Full Business Solution) |
| Phase | Phase 1 |
| Last Meeting | 2026-06-03 |
| Compliance | **HIPAA** — Google Workspace BAA required |
| AppSheet App URL | *(to be added)* |
| Google Sheet URL | https://docs.google.com/spreadsheets/d/1SF8eqy9Ye7U15K--ZpXpKXkAAGhaKWutkJvhvdIBunw/ |
| App Ownership | OmmNoMi (during build) → Transfer to David on completion |
| Antigravity Conversation | 66b44410-0436-4611-b5b3-47a9d5f42539 |

---

## Users / Personas
| Persona | AppSheet Role | Hours Available | Key Actions |
|---------|--------------|----------------|-------------|
| David Phelan LPC (Owner) | U_System_Admin | All hours | Full access — all tables, all history, session notes |
| Admin Assistant (Philippines) | U_Operations_Manager | 8am–12pm AZ | Client pipeline, intake processing, docs, scheduling — no session notes |
| Other Therapists (future Phase 2) | *(not in Phase 1)* | — | Keep own notes externally in Therapy Notes EHR |

**Permission boundary (confirmed Jun 3)**:
- `U_Operations_Manager` can see: all Client records (any time range), Session dates/times
- `U_Operations_Manager` cannot see: SessionNotes, clinical history documents
- `U_System_Admin` (David): full access to everything

---

## Terminology
| Term | Meaning at Transcend |
|------|---------------------|
| **Client Information Form** | Google Form that collects demographics, insurance, consents (what we previously called "intake form") |
| **Intake Session** | The first appointment with a client — NOT the form |
| **Intake Complete** | Client has had their first appointment |

---

## Feature Matrix

### Phase 1 — Painkillers (Build Now)
- [x] Connect Google Form responses sheet to AppSheet
- [ ] Process intake → create structured Client + child records
- [ ] Button: Generate all 5 documents (App Script → Google Doc)
- [ ] Google Drive: auto-create per-client folder (Shared Drive, HIPAA)
- [ ] E-signature initiation (Google e-Sign manual for now)
- [ ] Track document status: Generated → Sent → Signed → Uploaded to EHR
- [ ] Hourly App Script bot: auto-process new form submissions
- [ ] Admin dashboard: see all clients by status (Red/Yellow/Green pipeline)
- [ ] AppSheet built-in SMS: send intake form link from dashboard
- [ ] Session table: manually create session records from AppSheet
- [ ] SessionNotes table: David captures clinical notes per session
- [ ] Role-based access: Assistant sees clients/sessions, not notes

### Phase 1.5 — Quick Follow-on
- [ ] DocuSign API integration (upgrade from manual Google e-Sign)

### Phase 2 — Vitamins (Plan Now, Build Later)
- [ ] Post-session client feedback form (Google Form linked to Session)
- [ ] Anticipated income tracker (insurance rate × sessions = expected revenue)
- [ ] Post-session billing checklist (note written, EHR entry, billing submitted)
- [ ] Insurance verification workflow with status tracking
- [ ] Twilio + Google Voice routing for auto SMS on missed calls
- [ ] EAP-specific workflow branch
- [ ] Multi-therapist access (other therapists use personal emails — Phase 2 decision pending)

---

## Core Entities & ERD

| Table | Type | Relates To | Relationship |
|-------|------|-----------|-------------|
| AppUser | System | AppVariables (roles) | Roles → EnumList Ref |
| IntakeForm | Operational | Client | One-to-One (raw → processed) |
| Client | Operational (Core) | AppUser (therapist) | Many-to-One |
| ClientInsurance | Operational | Client | Many-to-One (child) |
| ClientPayment | Operational | Client | One-to-One (child) |
| ClientMedication | Operational | Client | Many-to-One (child) |
| ClientDocument | Operational | Client | Many-to-One (child) |
| **Session** | Operational | Client | One-to-Many (child) — added Jun 3 |
| **SessionNotes** | Operational | Session | One-to-Many (child) — added Jun 3 |

**ERD summary**:
```
Client (1) → (many) ClientInsurance
Client (1) → (1) ClientPayment
Client (1) → (many) ClientMedication
Client (1) → (many) ClientDocument
Client (1) → (many) Session (1) → (many) SessionNotes
```

**Key design decisions**:
- Therapist assigned at **Client level** (not per Session) — confirmed Jun 3
- Other therapists keep notes externally in Therapy Notes EHR — NOT in this app (Phase 1)
- Google Form stores 3 medications as flat columns → App Script normalizes to ClientMedication child rows

---

## Status Lifecycle

### Client.Status
```
New
→ ClientInfoReceived      (Google Form submitted)
→ DocsGenerated           (App Script created Google Doc)
→ AwaitingSignature       (e-sign request sent)
→ Signed                  (client completed signature)
→ InsuranceVerifying      (benefits check in progress — manual)
→ AwaitingIntakeSession   🟡 Yellow — waiting for first appointment
→ IntakeComplete          🟢 Green — first appointment occurred
→ Active                  (ongoing client)
→ NotProceeding           🔴 Red — decided not to work with us
→ Archived                (discharged or inactive)
```

### ClientDocument.Status
```
Pending → Generating → Generated → SentForSignature → Signed → UploadedToEMR
```

### Session.Status
```
Scheduled → Completed / Cancelled / NoShow
```

---

## Document Generation Logic (5 Forms → 1 Google Doc)
All generated via **App Script** (not AppSheet PDF — format limitations).

| Source Section | Template Section | Condition |
|---------------|-----------------|-----------|
| Client Info Form | Always included | — |
| Insurance Form | Always included | — |
| Credit Card Authorization | Always included | — |
| Medication List | Always included | Even if empty |
| Service Contract | Always included | Always |
| ↳ Email Consent paragraph | `ConsentEmail = Yes` version | Based on intake answer |
| ↳ No Email Consent paragraph | `ConsentEmail = No` version | Based on intake answer |
| ↳ Telehealth Consent paragraph | `ConsentTelehealth = Yes` version | Based on intake answer |
| ↳ No Telehealth paragraph | `ConsentTelehealth = No` version | Based on intake answer |

Output: One merged Google Doc → Google e-Sign (manual Phase 1) OR DocuSign (Phase 1.5)

**Only document requiring EHR upload**: the signed contract (the one David previously shared with Nomeshwer that contains client signatures). Session notes are captured in AppSheet only.

---

## Consent Capture Strategy
Two fields added to Client table (captured at intake or in AppSheet before doc generation):
1. `ConsentEmail` (Yes/No) — "Do you wish to receive communication by email?"
2. `ConsentTelehealth` (Yes/No) — "Do you wish to receive telehealth services?"

App Script uses these flags to include the correct pre-written paragraph. Client sees the statement already written — they just sign.

---

## E-Signature Decision
| Option | API | Automation Level | Cost | Status |
|--------|-----|-----------------|------|--------|
| Google e-Sign | ❌ No API | Manual — admin opens Doc, enters email, sends | Free | **Phase 1** |
| DocuSign | ✅ Yes | Fully automated from AppSheet button | Paid | Phase 1.5 |

---

## Google Drive Structure (Shared Drive — HIPAA)
```
Shared Drive: Transcend_Clients/
└── [ClientID]_[LastName]_[FirstName]/
    ├── IntakePackage_[ClientID]_[Date].gdoc   ← Generated Google Doc (pre-sign)
    ├── SignedContract_[ClientID]_[Date].pdf    ← Signed PDF (post-sign, upload to EHR)
    └── InsuranceCards/
        ├── InsuranceCard_Front.jpg
        └── InsuranceCard_Back.jpg
```

---

## Confirmed End-to-End Workflow
```
1.  Contact received (call or email) from prospective client
2.  Admin Assistant sends Client Information Form link (AppSheet SMS or email)
3.  Client submits Google Form → AppSheet receives intake
4.  Admin Assistant triggers document generation (App Script → Google Doc)
5.  Admin Assistant sends e-signature request (Google e-Sign / DocuSign)
6.  Client signs → signed PDF saved to Shared Drive
7.  Admin Assistant uploads signed document to Therapy Notes EHR (manual)
8.  Client schedules first appointment via Therapy Notes EHR (exports to Google Calendar)
9.  Admin Assistant creates Session record in AppSheet to track the appointment
10. David conducts session → creates SessionNotes in AppSheet
11. Client status updated to AwaitingIntakeSession (Yellow) → IntakeComplete (Green) after first session
```

---

## Future Expansion Architecture Notes
The following modules are flagged for Phase 2. The database foundation must support them:
- `Client.InsuranceRate` field planned for income tracking module
- `Session` table designed to support a future `SessionFeedback` child table (one Google Form response per session)
- `Session` must support a future `PostSessionChecklist` child (note written, EHR entry, billing submitted)
- David to share: list of additional operational spreadsheets for review

---

## Deployment Status
| Milestone | Status | Date |
|-----------|--------|------|
| Project folder created | ✅ Done | 2026-05-31 |
| Schema designed | ✅ Done | 2026-06-04 |
| Jun 3 scope expansion incorporated | ✅ Done | 2026-06-04 |
| Google Sheet connected | ⬜ | |
| Base App system tables set up | ⬜ | |
| Operational tables built | ⬜ | |
| App Script: doc generation | ⬜ | |
| App Script: hourly intake bot | ⬜ | |
| Drive structure set up | ⬜ | |
| Role-based permissions configured | ⬜ | |
| Actions configured | ⬜ | |
| Admin dashboard | ⬜ | |
| Deployed to David | ⬜ | |
| David signed off | ⬜ | |
