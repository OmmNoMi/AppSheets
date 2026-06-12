# BLR World HRMS (Orbit) — Project Overview

**App Name:** BLR World HRMS — Orbit  
**Client:** BLR World  
**Status:** Phase 2 Development  
**Timezone:** Dubai, UAE (GST - UTC+4)

## What is Orbit?
Orbit is a comprehensive, centralized Human Resources Management System (HRMS) built on AppSheet for BLR World. It transitions their HR workflows into a unified platform, replacing fragmented Google Forms, spreadsheets, and manual tracking. It handles the complete employee lifecycle from onboarding and document compliance to daily attendance, expense claims, and performance appraisals.

## Key Features
### Phase 1 (Core Onboarding & Documents)
- **Employee Info Center:** Central directory for active, probation, and terminated employees.
- **Document Management:** Tracks passports, visas, and Emirates IDs. Includes automated 30/15/7-day expiry alerts and automated Google Drive folder provisioning.
- **Onboarding Automation:** Extracts candidate submissions, auto-generates offer letters, and handles task lists.

### Phase 2 (Performance, Attendance & Expenses)
- **Performance Appraisals:** Manages annual and mid-year review cycles. Includes objective setting, self-evaluations, and manager ratings (with automated 70/30 weighted scoring).
- **GPS-Validated Attendance:** Captures daily check-in/out times verified against a geofence radius (150m) from the Dubai corporate office.
- **Leave Management & TOIL:** Real-time leave balancing (accrued vs. used) and automated granting of Time Off In Lieu (TOIL) upon approval.
- **Digital Expense Claims:** Processes AED financial claims requiring manager/finance approvals and receipt uploads.

## Data Managed (Schema Overview)
The application uses a robust Google Sheets backend with the following key operational areas:

### Core Employee Data
- **`Employee`:** The central entity. Tracks job titles, departments, joining dates, line managers, and current status (Onboarding/Probation/Confirmed/Terminated).
- **`EmployeeDocument`:** Tracks mandatory legal documents and their expiry dates.
- **`TaskList`:** Assigns and tracks tasks related to an employee's onboarding or offboarding.

### Performance Management
- **`ReviewCycle`:** Defines the time windows for appraisals (Annual/Mid-Year).
- **`Objective`:** Performance goals set by employees, requiring manager approval.
- **`SelfEvaluation` & `ManagerEvaluation`:** Stores qualitative feedback, ratings, and final calculated scores.

### Attendance & Finance
- **`AttendanceDaily`:** Logs GPS locations and timestamps for daily check-ins/outs.
- **`LeaveAllocation` & `AttendanceRequest`:** Acts as a ledger system. `LeaveAllocation` holds available days, while `AttendanceRequest` subtracts from them or adds TOIL based on approved requests.
- **`ExpenseClaim`:** Tracks reimbursements in AED, requiring receipt attachments and multi-level approval.
- **`Approval`:** A centralized audit log of all manager and HR decisions across the app.

## Technical Architecture
- **Frontend / UI:** AppSheet App with role-based dynamic navigation (`AppAccess`, `AppView`).
- **Database:** Google Sheets.
- **Automation:** AppSheet Bots (e.g., auto-allocating TOIL, syncing AppUsers) combined with Google Apps Script for automated folder generation and document creation.
- **Security & Access Control:** Six distinct persona levels (SuperAdmin, HRManager, HRStaff, LineManager, Employee, FinanceAdmin) dictating row-level access and editing capabilities.
