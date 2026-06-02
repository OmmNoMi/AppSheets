# Project Info — BLR World HRMS (Orbit)
> This is a **living document**. Update in place — do not create duplicates.
> History of WHY decisions changed belongs in `Decisions.md`.

---

## Project Overview
| Field | Value |
|-------|-------|
| Client | BLR World |
| App Name | BLR World HRMS — Orbit |
| Phase | Phase 2 |
| Start Date | 02/06/2025 (Phase 1) / 03/09/2025 (Phase 2) |
| Antigravity Conversation | 343138bc-a7fc-4868-9544-0eaafc2a6a1f |
| AppSheet App URL | `https://www.appsheet.com/template/AppDoc?appName=BLRWORLDHRMS-418983340&appId=c745d6d9-9b71-44d4-b43e-5612638df213` |
| Google Sheet URL | *(to be added)* |
| Timezone | Dubai, UAE (GST - UTC+4) |
| Date Format | DD/MM/YYYY |

---

## Users / Personas
| Persona | Role (AppAccess) | Key Need | Key Actions |
|---------|-----------------|----------|-------------|
| System Admin | `U_System_Admin` / SuperAdmin | Global override & configuration | Manage user roles, edit Employee IDs to resolve legacy mismatches, reopen performance review cycles |
| HR Manager | `U_HR_Manager` / HRManager | Full HR lifecycle management | End-to-end recruitment, approve/decline document verifications, approve/reject review objective realignments, audit ratings |
| HR Staff | `U_HR_Staff` / HRStaff | Daily operational assistance | Add employees, input details, track check-ins/check-outs, file documents (cannot delete records) |
| Line Manager | `U_Reporting_Officer` / LineManager | Team performance & operations | Set employee objectives, perform manager evaluations, review/approve expense claims, view team calendars |
| Employee | `U_Employee` / Employee | Self-service HR access | Submit self-evaluations, upload document updates, log daily check-in/out, submit expense claims |
| Finance Admin | `U_Finance_Admin` / FinanceAdmin | Financial oversight & claims | Review expenses, verify financial compliance, monitor labor law check-in constraints |

---

## Feature Matrix

### Phase 1 — Painkillers (Core Onboarding & Document Management)
- [x] **Employee Info Center**: Centralized dashboard to search, filter by status (Active, Probation, Terminated), and export contact lists to CSV.
- [x] **Document Management**: Automatically generate, rename, and organize folders in Google Drive per employee. Send alerts at 30, 15, and 7-day marks for Visa, Passport, and Emirates ID expiry.
- [x] **Onboarding Automation**: Extract data from Google Forms candidate submissions to initialize profiles, auto-generate offer letters using Google Docs templates, and manage task lists.
- [x] **Communications Log**: Centralized tracking of sent emails (offer letters, notifications) with status updates.

### Phase 2 — Vitamins (Performance Review, Attendance & Expenses)
- [ ] **Performance Review System**: Automated annual and mid-year appraisal windows. Objective setting (min 3, max 10) with manager approval and HR realignment workflows.
- [ ] **Weighted Review Scoring**: Automated final review score based on a weighted 30% mid-cycle review + 70% annual appraisal formula.
- [ ] **GPS-Validated Attendance**: Check-in and check-out tracking using dynamic offset logic and `HERE()` GPS coordinates, localized to Dubai Time.
- [ ] **Automated Work Calendars & Leaves**: Automatically apply calendars based on location and Iso-Weekday. Dynamically deduct approved leaves from `LeaveAllocation` (Accrued vs Used).
- [ ] **Hourly Present-Marker Bot**: Identify employee shift check-in logs and automatically set status to "Present" if they forget to check out.
- [ ] **Digital Claims**: Submission of AED expense claims requiring digital receipt capture and manager/finance sign-off.
- [ ] **Attendance Requests**: Processing of Time Off in Lieu (TOIL) and Attendance Regularization requests, linked to specific daily attendance logs.

---

## Core Entities & ERD

| Table | Type | Relates To | Relationship |
|-------|------|-----------|-------------|
| AppUser | System | AppAccess | Roles → Enum Ref (Many-to-One) |
| Employees | Operational (Core) | AppUser (Line Manager) | Many-to-One |
| EmployeeDocuments | Operational | Employees | Many-to-One (Child) |
| TaskList | Operational | Employees, AppUser | Many-to-One |
| Projects | Operational | — | Master List |
| CandidateSubmissions | Operational | — | Staging Table (Google Form Sync) |
| ReviewCycles | Operational | — | Time Windows |
| Objectives | Operational | Employees, ReviewCycles | Many-to-One |
| SelfEvaluation | Operational | Employees, ReviewCycles | Many-to-One |
| ManagerEvaluation | Operational | Employees, ReviewCycles | Many-to-One |
| AttendanceDaily | Operational | Employees | Many-to-One (Child) |
| AttendanceRequest | Operational | Employees, AttendanceDaily | Many-to-One (Child) |
| LeaveAllocation | Operational | Employees | Many-to-One (Child) |
| ExpenseClaims | Operational | Employees | Many-to-One (Child) |
| Approvals | Operational | Employees, HR/Manager | Many-to-One |

---

## Status Lifecycles

### Employees.Status
```
Onboarding → Probation → Confirmed → Terminated
```
* **Onboarding**: Form submitted, profiles created, documentation collection in progress.
* **Probation**: First 45 days. Transition triggered by completing Stage 1 onboarding tasks.
* **Confirmed**: Active permanent status (after 6-month review or manual confirmation). Triggers folder migration to "Active" parent folder.
* **Terminated**: Offboarding completed. Triggers folder archiving.

### ReviewCycles.Status
```
Open → Locked → Closed
```
* Date-triggered windows. Outside windows, forms become read-only unless overridden by HR Manager.

---

## Google Drive Folder Lifecycle
* **Recruitment Stage**: Files stored in candidate submission staging area.
* **Onboarding Stage**: Auto-created employee directory inside `Onboarding/` directory.
* **Confirmation Stage**: Move folder process physically relocates folder to `Active/` parent directory.
* **Termination Stage**: Move folder process shifts folder to `Archived/` directory.

---

## Current Scope (Phase 2)
**In Scope**:
* End-to-end performance appraisal module (Objectives, Evaluation, HR approvals for realignment).
* Location-specific GPS check-in/out and automated shift processing.
* Real-time leave balancing and expense claim tracking.
* UAE localization: Dubai timezone, DD/MM/YYYY date formatting, alphanumeric passport fields.

**Out of Scope**:
* Integration with external payroll software (handled via Excel/CSV exports for now).
* Biometric hardware syncing (strictly GPS-based validation in AppSheet).
