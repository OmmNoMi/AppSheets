# Project Info — Navi BLUJ
> This is a **living document**. Update in place — do not create duplicates.
> History of WHY decisions changed belongs in `Decisions.md`.

---

## Project Overview
| Field | Value |
|-------|-------|
| Client | Navi (Blue Jay location) |
| App Name | NAVI-BLUJ |
| AppSheet App ID | 26c9e581-8e82-4531-84a4-deb04e645fb1 |
| Phase | Active / Existing App (Documentation Only) |
| Documented | 2026-07-11 |
| Branched From | Navi ONDT (long ago — now independently evolved) |
| AppSheet App URL | *(fill in)* |
| Google Sheet URL | *(fill in)* |

> ⚠️ This app is a **long-separated branch** of Navi ONDT. It has evolved very differently.
> Do NOT assume parity with ONDT when working on BLUJ. Always reference `_AppDoc/BLUJ_schema.md`.

---

## App Scale (as of 2026-07-11 documentation)
| Metric | Count |
|--------|-------|
| Tables | 420 |
| Columns | 10,666 |
| Slices | 90 |
| Views | 480 |
| Actions | 810 |
| Format Rules | 372 |
| Workflow Rules | 0 |

---

## Key Differences from Navi ONDT
| Area | ONDT | BLUJ |
|------|------|------|
| Table count | 323 | 420 (+97) |
| Column count | 8,682 | 10,666 (+1,984) |
| Multi-location | Single location | **Fremont + Tracy** (dual-location) |
| Roster tables | `Roster` (single) | `RosterFremont`, `RosterTracy` |
| Planning tables | `Planning` (single) | `PlanningFremont`, `PlanningTracy` |
| Efficiency tables | `Efficiency` (single) | `EfficiencyFremont`, `EfficiencyTracy` |
| WHC tables | `WHC` (single) | `WHC` + `WHC_Tracy` |
| Spreadsheet structure | Per-table `.gsheet` files | Consolidated named GSheets |
| Additional modules | — | Relay Trip Management, Compliance, DOT Audit, AMXL Services, Modified Duty, Attendance |

---

## Spreadsheet Architecture (BLUJ-specific)
| GSheet File | Tables Hosted |
|------------|---------------|
| `Candidate` | Candidate, Ads |
| `Employee` | Employee, RosterFremont, Everyday, Week, PlanningFremont, Schedule, ActionsCalling, Inventory, Compliance |
| `Fleet` | Fleet, FleetDocs, Repairs, Notes |
| `Incident` | Incident, Contact, Injury, IncidentDocuments, ContactAssignment, WorkHistory, IncidentNotes, Treatment, Followup, IncidentForm, Policy, Premium, Notice |
| `Scorecard` | Scorecard, POD, Tenured |
| `Performance` | Performance, Uniform, Criterion, DAReview, PerformanceGuidelines |
| `Users` | Users, ADP, PayCal, WHC, AppSettings, AppViews, AppTriggers, Invoice, AppVariables |
| `NaviOPS` | PlanningTracy, RosterTracy, EmployeeDocs, Notifications, WeeklyReport, DailyHours, CallBackFremont, ADPReport, DADaily, DailyAPIReport, RoutesDaily, Attendance, EverydayIssue, SMSFremont, SMSTracy |
| `NaviFleet` | DOTAudit, CommonDocs, DOTLatestAuditRecord, Rentals |
| `NaviHR` | JJKRenewals, Payroll |
| `NaviMain` | WHC_Tracy, EmployeeAudit, Separation, Income, EfficiencyTracy, PayrollHours, PayCheck |
| `NaviPerformance` | KnowledgeArticles, CDF |
| `NaviReports` | WSTDeliveredPackages, WSTServiceDetails, WSTUnplannedDelays, WSTWeeklyReport, AMXLServices |
| `NaviClaims` | Worker5020, ModifiedDuty |
| `RelayTripManagement` | ImportRelayPaymentDetails, ImportRelayTrips, RelayRoutes |
| `naviI9Verification` | i9Tracking |

---

## User Stories (Personas)
| Persona | Role (AppAccess) | Key Need |
|---------|-----------------|----------|
| Admin | Admin / SuperAdmin / HR | Full access — manage employees, fleet, incidents, payroll |
| Manager / DSP | Manager | Scheduling, performance reviews, DA management |
| Dispatcher | Dispatcher | Roster, route assignment, daily operations |
| DA (Delivery Associate) | Driver | View own schedule, report issues |

---

## Core Entities & ERD
| Table | Type | Relates To | Relationship |
|-------|------|-----------|-------------|
| Candidate | Operational | Onboarding | One-to-One (pipeline) |
| Onboarding | Operational | Employee | One-to-One (hire flow) |
| Employee | Core | Roster*, Schedule, WHC, Performance, Separation | One-to-Many |
| RosterFremont | Operational | Employee, Week, PlanningFremont | Daily attendance (Fremont) |
| RosterTracy | Operational | Employee, Week, PlanningTracy | Daily attendance (Tracy) |
| Fleet | Core | FleetAssignment, Repairs, FleetDocs, DOTAudit | One-to-Many |
| Incident | Operational | Injury, Contact, IncidentDocuments, IncidentForm | One-to-Many |
| WHC | Operational | Employee, Everyday | Weekly Hours Calculation (Fremont) |
| WHC_Tracy | Operational | Employee, Everyday | Weekly Hours Calculation (Tracy) |
| DAReview | Operational | Employee | Performance review events |
| Separation | Operational | Employee | Termination records |
| RelayRoutes | Operational | ImportRelayTrips | Relay trip data |

---

## Deployment Status
| Milestone | Status | Date |
|-----------|--------|------|
| Documentation imported | ✅ Done | 2026-07-11 |
| Schema parsed | ✅ Done | 2026-07-11 |
| ProjectInfo created | ✅ Done | 2026-07-11 |
| Decisions log initialized | ✅ Done | 2026-07-11 |
