# Meeting Notes — Transcend Intake & Clinical System

> **Date**: August 7, 2026 (21:26 IST)  
> **Participants**: David Phelan (LPC), Nomeshwer Sharma (`OmmNoMi`), Hardik Sharma (`OmmNoMi`), Admin Assistant  
> **Topic**: Status Update & System Configuration (Intake, Documents, Session Notes & Progress Tracking Restructuring)  
> **Document Type**: `MEETING NOTES (REVISED & VERIFIED AGAINST TRANSCRIPT)`  

---

## Executive Summary & True Architecture Scope

During the August 7 meeting, David Phelan and the `OmmNoMi` team analyzed the operational separation between David's Electronic Medical Record (EHR) system and AppSheet:

1. **EHR vs. AppSheet Role Separation**:
   - **EHR System**: Handles scheduling, appointment planning, billing, and official medical records. AppSheet does **NOT** need to track planned sessions, start/end times, or appointment statuses.
   - **AppSheet System**: Used exclusively for **Private Clinical Session Notes** and **Longitudinal Goal Progress Tracking**.

2. **Client Screen UI Optimization**:
   - Remove inline `Related Sessions` and `Related SessionNotes` list clutter from the main Client detail view.
   - Implement a dedicated **`View Notes` Action Button** on `Client` to open a clean chronological list view (Date + Clinical Notes side-by-side).

3. **Data Structure Restructuring for Progress Graphing**:
   - **Standalone `Session` Table Removed**: Completely deprecated.
   - **Separation of Clinical Notes vs. Goal Progress**:
     - *Clinical Notes*: Narrative entry per session date (Date + Private Note).
     - *Treatment Goals & Progress*: Structured records tracking progress scores/metrics on 3–4 ongoing client goals over time to enable longitudinal graphing (awaiting sample data spreadsheet from David).

---

## Verified Aligned Decisions

* **Google Form Response Limit Removed**: Disabled single-response limit so parents can submit separate intake entries for multiple children.
* **Deprecation of Standalone `Session` Table**: Removed `Session` table. Scheduling/planning remains in EHR.
* **Client UI Cleanup & `View Notes` Action**: Removed inline related lists from `Client_Detail`; added `View Notes` action button navigating directly to notes list.
* **Separation of Notes Narrative & Goal Metrics**: Recognized that flat columns cannot be graphed over time. System will separate narrative notes from multi-goal progress scoring.
* **Document Naming Standard**: Format established: `[Last Name], [First Name], [Client Number], [Document Title], [Date]`.
* **Google Form Ownership Transfer**: Ownership transferred to `David Phelan`'s primary account; permanent document target set to `AA Current Clients`.

---

## Action Items Checklist

### OmmNoMi Technical Team Tasks
- [ ] **[Hardik Sharma]** Hide Draft Contracts: Display signed contract PDF and automatically hide draft contract link once signed PDF is uploaded.
- [ ] **[Hardik Sharma & Nomeshwer Sharma]** Client UI Cleanup: Remove `Related Sessions` and `Related SessionNotes` from `Client_Detail`; add **`View Notes`** action button.
- [ ] **[Hardik Sharma & Nomeshwer Sharma]** Database Restructuring: Deprecate `Session` table; implement lightweight `SessionNotes` table (Date + Clinical Note narrative).
- [ ] **[Nomeshwer Sharma]** Progress Tracking Schema: Prepare schema structure for multi-goal progress tracking & graphing once David sends example data.
- [ ] **[Nomeshwer Sharma]** Drive Automation Scope: Finalize Workspace permissions for file movement to `AA Current Clients`.

### Client Tasks (David Phelan)
- [ ] **[David Phelan]** Send Progress Data Examples: Share sample tracking spreadsheets/metrics for 3–4 ongoing treatment goals to finalize graphing data structure.
- [ ] **[David Phelan]** Contract Template Review: Confirm any text/section modifications for the therapy contract template.

---

## Key Transcript References

* **`00:37:53`**: David explains current workflow — scanning past clinical history using Date + Note side-by-side.
* **`00:41:49`**: David requests a **`View Notes`** button on Client screen and hiding inline related lists.
* **`00:45:20`**: David explains goal progress tracking — 3 to 4 ongoing goals tracked per session, requiring longitudinal graphing over time.
* **`00:46:34`**: Nomeshwer & David agree to remove `Session` table completely since scheduling is handled in EHR.
* **`00:47:46`**: David agrees to send sample progress tracking spreadsheet to design optimal graphing database.
