# Project Info — Transcend IntakeSystem
> Living document. Update in place. WHY decisions changed → Decisions.md.

---

## Project Overview
| Field | Value |
|-------|-------|
| Client | Transcend Counseling & Wellness |
| Contact | David Phelan, LPC (Owner) |
| Website | https://www.transcendaz.com/ |
| App Name | Transcend IntakeSystem |
| Phase | Phase 1 |
| Meeting Date | 2026-05-27 |
| Compliance | **HIPAA** — Google Workspace BAA required |
| AppSheet App URL | *(to be added)* |
| Google Sheet URL | https://docs.google.com/spreadsheets/d/1SF8eqy9Ye7U15K--ZpXpKXkAAGhaKWutkJvhvdIBunw/ |
| Antigravity Conversation | 66b44410-0436-4611-b5b3-47a9d5f42539 |

---

## Users / Personas
| Persona | Role (AppAccess) | Hours Available | Key Actions |
|---------|-----------------|----------------|-------------|
| David Phelan (Owner) | System_Admin | All hours | Full access, approve, configure |
| Admin Assistant (Philippines) | Operations_Manager | 8am–12pm AZ | Process intakes, send docs, manage clients |
| Therapist (future) | Therapist_View | Session hours | View client record only |

---

## Feature Matrix

### Phase 1 — Painkillers (Build Now)
- [x] Connect Google Form responses sheet to AppSheet
- [ ] Process intake → create structured Client + child records
- [ ] Button: Generate all 5 documents (App Script → Google Doc)
- [ ] Google Drive: auto-create per-client folder (Shared Drive, HIPAA)
- [ ] E-signature initiation (DocuSign API preferred; Google e-Sign fallback = manual)
- [ ] Track document status: Generated → Sent → Signed → Uploaded
- [ ] Hourly App Script bot: auto-process new form submissions (no manual button needed)
- [ ] Admin dashboard: see all clients by status
- [ ] AppSheet built-in SMS: send intake form link from dashboard

### Phase 2 — Vitamins (Plan Now, Build Later)
- [ ] Twilio + Google Voice routing for auto SMS on missed calls
- [ ] Insurance verification workflow with status tracking
- [ ] Appointment scheduling integration
- [ ] Billing/invoice status tracking
- [ ] EAP-specific workflow branch
- [ ] Multi-therapist assignment and caseload dashboard

---

## Core Entities & ERD

| Table | Type | Relates To | Relationship |
|-------|------|-----------|-------------|
| AppUser | System | AppAccess | Roles → Enum Ref |
| IntakeForm | Operational | Client | One-to-One (raw → processed) |
| Client | Operational (Core) | AppUser (therapist) | Many-to-One |
| ClientInsurance | Operational | Client | Many-to-One (child) |
| ClientPayment | Operational | Client | One-to-One (child) |
| ClientMedication | Operational | Client | Many-to-One (child) |
| ClientDocument | Operational | Client | Many-to-One (child) |

**Normalization decision**: Google Form stores 3 medication rows as flat columns. AppSheet schema uses `ClientMedication` child table — one record per medication. App Script creates child records during intake processing.

---

## Status Lifecycle

### Client.Status
```
New → IntakeReceived → DocsGenerated → AwaitingSignature → Signed → InsuranceVerifying → Scheduled → Active → Archived
```
- Triggered by: Action buttons and/or hourly App Script bot
- `New`: Created manually or auto-created from intake processing
- `IntakeReceived`: Google Form submitted, raw data linked
- `DocsGenerated`: App Script generated Google Doc + organized in Drive
- `AwaitingSignature`: DocuSign/Google e-Sign request sent
- `Signed`: Signed PDF received and saved to Drive
- `InsuranceVerifying`: Manual step, benefits check in progress
- `Scheduled`: First appointment booked
- `Active`: Ongoing client
- `Archived`: Discharged or inactive

### ClientDocument.Status
```
Pending → Generating → Generated → SentForSignature → Signed → UploadedToEMR
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

Output: One merged Google Doc → Google e-Sign (manual) OR DocuSign (automated)

---

## Consent Capture Strategy
Two questions added to Google Form intake (or captured in AppSheet before doc generation):
1. **"Do you wish to receive communication by email?"** → `ConsentEmail` (Yes/No)
2. **"Do you wish to receive telehealth (video/phone) services?"** → `ConsentTelehealth` (Yes/No)

App Script uses these flags to include the correct pre-written consent paragraph in the merged document. Client only signs — no free-text entry needed.

---

## E-Signature Decision
| Option | API Available | Automation Level | Cost |
|--------|-------------|-----------------|------|
| Google e-Sign | ❌ No API | Manual only (staff opens Doc, enters email) | Free |
| DocuSign | ✅ Yes | Fully automated from AppSheet | Paid |
| AppSheet → DocuSign | ✅ | Trigger from button or bot | Preferred |

**Current decision**: Start with Google e-Sign (manual) for Phase 1. Upgrade to DocuSign API in Phase 1.5 when DocuSign account is set up.

---

## Google Drive Structure (Shared Drive — HIPAA)
```
Shared Drive: Transcend_Clients/
└── [ClientID]_[LastName]_[FirstName]/
    ├── IntakePackage_[ClientID]_[Date].gdoc   ← Generated Google Doc (pre-sign)
    ├── SignedContract_[ClientID]_[Date].pdf    ← Signed PDF (post-sign)
    └── InsuranceCards/
        ├── InsuranceCard_Front.jpg
        └── InsuranceCard_Back.jpg
```

---

## SMS Intake Link Sending
- **Phase 1**: AppSheet built-in SMS (US only, no Twilio needed)
  - Button on Client/IntakeForm record: `Send_IntakeLink`
  - AppSheet sends SMS with Google Form URL to `Client.PrimaryMobile`
- **Phase 2**: Twilio API + Google Voice routing for auto-trigger on missed calls

---

## Current Scope (Phase 1)
**In Scope**:
- Google Form → AppSheet intake processing
- Client record management (demographics, insurance, payment, medications)
- App Script document generation (Google Doc, merged 5 forms)
- Drive folder creation and file organization
- E-signature workflow (manual Google e-Sign for now)
- Document status tracking
- Admin dashboard with client pipeline view
- AppSheet SMS for intake link delivery

**Out of Scope (Phase 1)**:
- EMR portal integration (manual upload by admin)
- Appointment scheduling
- Insurance billing/claims
- Twilio/Google Voice automated routing
- DocuSign API (Phase 1.5)
- Therapist-facing views (Phase 2)

---

## Deployment Status
| Milestone | Status | Date |
|-----------|--------|------|
| Project folder created | ✅ Done | 2026-05-31 |
| Schema designed | 🔄 In Progress | |
| Google Sheet connected | ⬜ | |
| System tables set up | ⬜ | |
| Operational tables built | ⬜ | |
| App Script: doc generation | ⬜ | |
| App Script: hourly bot | ⬜ | |
| Drive structure set up | ⬜ | |
| Actions configured | ⬜ | |
| Admin dashboard | ⬜ | |
| Deployed to David | ⬜ | |
| David signed off | ⬜ | |
