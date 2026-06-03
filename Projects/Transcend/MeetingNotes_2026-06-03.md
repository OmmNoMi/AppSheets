# Meeting Notes — Jun 3, 2026
**Project:** Transcend Counseling & Wellness — Full Business Solution
**Attendees:** David Phelan LPC (Client), Nomeshwer Sharma (OmmNoMi), Hardik Sharma / Harry (OmmNoMi)
**Duration:** ~32 minutes

---

## Agenda Recap
Follow-up on Phase 1 build progress. Scope expanded from intake-only to a broader clinical operations system covering session management, notes, and role-based access.

---

## Key Decisions

### 1. Terminology Correction — "Intake" vs "Client Information Form"
> **Resolved:** What we previously called the "intake form" is now the **Client Information Form** (data collection). The word "intake" at Transcend refers to the **first appointment/session** with a client — not the form.

- Client Information Form = Google Form that collects demographics, insurance, consents
- Intake Session = first booked appointment with David

### 2. Schema Expansion — Session & Session Notes Tables
> Two new tables added to the data model.

| Table | Purpose |
|-------|---------|
| `Session` | Holds date, time, and client reference for each booked appointment |
| `SessionNotes` | Child table of Session — multiple notes per session allowed |

Full revised ERD:
```
Client (1) → (many) Session (1) → (many) SessionNotes
```

### 3. Therapist Assignment — Per Client, Not Per Session
> Therapist is assigned once at the Client profile level. The assistant does NOT select a therapist each time a session is created.

- Two other therapists at the practice use personal emails and manage their own notes externally (in Therapy Notes EHR)
- They will NOT be given AppSheet access in Phase 1
- No `Therapist` table needed in Phase 1

### 4. Role-Based Permissions — Finalized
| Role | Access |
|------|--------|
| `System_Admin` (David) | Full access — all tables, all records, all history |
| `Operations_Manager` (Admin Assistant) | All client records (any time range) + session dates/times. **Cannot see:** SessionNotes, clinical history documents |

> Assistant can see **that** sessions happened (dates/times), but NOT **what** was said (notes).

### 5. Client Status Color Coding — Confirmed for AppSheet
David's current spreadsheet uses color to track where new clients are in the pipeline. This will be replicated as a `Status` field in the Client table:

| Color | Status Value | Meaning |
|-------|-------------|---------|
| 🔴 Red | `Not Proceeding` | Client decided not to move forward (e.g., out-of-network insurance) |
| 🟡 Yellow | `Awaiting Intake Session` | Docs signed; waiting to schedule or confirm first appointment |
| 🟢 Green | `Intake Complete` | First appointment has occurred |

> This sits alongside the full status lifecycle already designed. These three values map to the later stages of `AwaitingSignature → Scheduled → Active`.

### 6. Google Doc / Sheet Templates — Disposition
- **Session Notes Google Sheet template** (`input`, `output`, `menus` tabs) → **ignore those tabs**; the relevant structure is being rebuilt natively in AppSheet
- **History/Clinical Notes Google Doc** → internal only; will be replaced by `SessionNotes` table in AppSheet
- **Signed Contract Google Doc** → still the only document that requires upload to Therapy Notes EHR (unchanged)

### 7. Post-Session Client Feedback Form — Scoped for Future
David confirmed interest in a post-session feedback form. Agreed to design for it architecturally so it can be added without rework.

- One feedback form per session
- Client fills via Google Form or AppSheet link after session
- Responses attached to the corresponding Session record
- **Not built in Phase 1 — architecture must accommodate it**

### 8. App Ownership During Development
David is unavailable the week of Jun 9. Decision: OmmNoMi retains AppSheet app ownership during build. Transfer to David's account when the app is fully complete and ready for handover.

---

## Confirmed Operational Workflow (End-to-End Recap)

```
1. Contact received (call or email) from prospective client
2. Admin Assistant sends Client Information Form link (via AppSheet SMS or email)
3. Client submits Google Form → AppSheet receives intake
4. Admin Assistant opens AppSheet → triggers document generation (App Script → Google Doc)
5. Admin Assistant sends e-signature request from within AppSheet (Google e-Sign / DocuSign)
6. Client signs → signed PDF saved to Shared Drive (HIPAA folder structure)
7. Admin Assistant uploads signed document to Therapy Notes EHR (manual step)
8. Client schedules first appointment via Therapy Notes EHR (exports to Google Calendar)
9. Admin Assistant creates a Session record in AppSheet to track the appointment
10. David conducts session → creates SessionNotes in AppSheet
11. Client status updated accordingly (Yellow → Green after first appointment)
```

---

## Future Expansion (Flagged, Not Scoped)
David uses additional spreadsheets that may be brought into AppSheet later:

| Spreadsheet | Purpose | Notes |
|-------------|---------|-------|
| Anticipated Income tracker | Per-client insurance rate × sessions = expected revenue | Foundation must support insurance rate fields |
| Post-Session Checklist | Track: note written, EHR entry made, billing submitted | Could become a checklist child table on Session |

> **Action for OmmNoMi:** Ensure the `Client` table has an `InsuranceRate` or `InsurancePlan` field, and the `Session` table can support a future `PostSessionChecklist` child table without schema rework.

---

## Next Steps

| Owner | Action |
|-------|--------|
| David Phelan LPC | Share the Google Sheets session notes template and Google Doc clinical history template |
| David Phelan LPC | Compile and send list of all other operational spreadsheets / processes for review |
| Nomeshwer Sharma | Analyze historical data to identify required columns and scope additional dev effort |
| OmmNoMi (team) | Update schema to include Session, SessionNotes tables and revised Client.Status values |
| OmmNoMi (team) | Retain app ownership during David's unavailability (week of Jun 9); proceed with build |

---

## Open Questions
- [ ] Which insurance rate fields does the income tracker use? (To be clarified when David shares spreadsheet)
- [ ] Post-session feedback form: what specific questions does David want to capture?
- [ ] Confirm whether the two other therapists will ever need AppSheet access (Phase 2 decision)
