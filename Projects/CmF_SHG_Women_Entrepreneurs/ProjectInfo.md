# Project Info — CmF SHG Women Entrepreneurs Study (Pilot Phase)
> This is a **living document**. Update in place — do not create duplicates.
> History of WHY decisions changed belongs in `Decisions.md`.

---

## Project Overview
| Field | Value |
|-------|-------|
| Client | Centre for microFinance (CmF), Jaipur & RAJEEVIKA / DAY-NRLM |
| App Name | SHG Women Entrepreneurs Survey & Monitoring System |
| Phase | Phase 1 (Pilot Phase - 4 Districts) |
| Start Date | July 2026 |
| Target Completion | September 2026 (60 days across 13 weeks) |
| Client Email Intro | Email from Archana Londhe (7 Aug 2026): Team introduction & briefing |
| Google Doc Brief | [Survey Question Research Document](https://docs.google.com/document/d/1YTuwk7reJ3dPqW2U7sEli8W6nTHFAmPk1Rk1msS7WAQ/edit?tab=t.0) |
| Google Sheet Prototype | [Data Analysis Prototype Sheet](https://docs.google.com/spreadsheets/d/1DGbJP33sVw4oGreWG0---4Rrpj9EsskNLxwkE0lHIE8/edit?gid=0#gid=0) |
| Lead Researcher | Archana Londhe (PGDRM, IRMA) |
| Research Assistant / QA | Shehnaz Jahan (Jaipur-based development professional - Qualitative QA) |
| Lead Data Collection | Krishna Singh (PGDRM, IRMA - Shaishavi Project Consultants) |
| Technology Expert | Nomeshwer Sharma (OmmNoMi Automation LLP - AppSheet & Analytics) |

---

## User Stories (Personas)
| Persona | Role (AppAccess) | Key Need |
|---------|-----------------|----------|
| Women Field Surveyors | Field Investigator | Capture multi-lens survey forms on tablet offline in local language, sync daily |
| Field Supervisor / QA | Field Supervisor | Spot-check completed survey forms, back-check quality, monitor daily progress against quotas |
| Lead Researcher / Analyst | Researcher / Admin | Export clean datasets, review cross-tabs/determinants, track growth metrics & trade distributions |
| CmF / RAJEEVIKA Lead | Client Viewer | View high-level district factsheets, institutional dashboards, and pilot metrics |

```
As a Field Investigator, I need to easily record survey responses across 4 analytical lenses offline so that data capture is smooth and error-free.
As a Field Supervisor, I need real-time validation and spot-checking views so that high data quality and correct quotas (>50% new enterprises) are maintained.
As a Technology Expert / Analyst, I need structured AppVariables and clean relational data exports so that district factsheets and Phase 2 power calculation models can be generated rapidly.
```

---

## Feature Matrix
### Painkillers (Must-have — Phase 1 Pilot)
- [x] Action-Grid Sub-Module Navigation (Modular survey entry)
- [x] `AppVariables` Multilingual Engine (English / Hindi / Regional dialect support)
- [x] Structured 4-Lens Quantitative Questionnaire (Profile, Business Inclination, Performance, Institutional Support)
- [x] Universal `MultiSelect` Junction pattern for multi-choice responses
- [x] District & Block Sampling Frame Lookup & Quota Tracker (>50% new enterprise floor, SC/ST/OBC representation floor)
- [x] Data Quality & Spot-check Supervisor Dashboard
- [x] Offline-first synchronization capabilities

### Vitamins (Nice-to-have — Phase 2 Rollout)
- [ ] Enterprise Financial Ledger Image / Receipt Uploads
- [ ] Automated SMS/WhatsApp follow-ups for repeat enterprise checks
- [ ] GIS mapping of enterprise hubs across all 33 districts of Rajasthan

---

## Core Entities & ERD

| Table | Type | Relates To | Relationship |
|-------|------|-----------|-------------|
| AppUser | System | AppAccess | One-to-Many |
| AppVariables | System | Survey / Options | One-to-Many |
| AppViews | System | AppUser | One-to-Many |
| SamplingFrame | Master | District/CLF | Master lookup for 4 pilot districts |
| Survey | Operational (Parent) | SamplingFrame, AppUser | Primary survey record per entrepreneur |
| ProfileAgency | Sub-Module | Survey | 1-to-1 (Lens 1) |
| BusinessInclination | Sub-Module | Survey | 1-to-1 (Lens 2) |
| EnterprisePerformance | Sub-Module | Survey | 1-to-1 (Lens 3) |
| InstitutionalSupport | Sub-Module | Survey | 1-to-1 (Lens 4) |
| MultiSelect | Operational (Child) | Survey, AppVariables | Universal Junction table for multi-select options |
| SupervisorAudit | Quality Control | Survey, AppUser | Spot-checks and back-checks |

---

## Status Lifecycles

### Survey State Machine
```
[Draft / In-Progress] → [Submitted by Investigator] → [Supervisor Verified / Approved] → [Flown to Analytics Pipeline]
```
Triggered by: *(Submit Form Action / Supervisor Verification Action)*

---

## Modules & Access Levels
| Module | Access Level | Who |
|--------|-------------|-----|
| System Admin | Admin | Nomeshwer Sharma (Tech Lead) |
| Research & Analytics | Manager / Analyst | Archana Londhe (Lead Researcher) |
| Field QA & Verification | Supervisor | Field Supervisor (Research Assistant) |
| Survey Data Collection | Field | 4 Women Field Surveyors |

---

## Current Scope (Pilot Phase)

**In Scope**:
- **4 Pilot Districts**: Churu (Arid West), Dausa (Semi-Arid), Dungarpur (Southern Tribal), Baran (Fertile East).
- **Target Sample**: 220 quantitative entrepreneur surveys (55 per district).
- **Qualitative & Institutional**: IDIs (12), FGDs (12), KIIs (12-16).
- **4 Analytical Lenses**: Profile & Agency, Business Inclination, Performance, Institutional Support.
- **Enterprise Types**: Non-farm enterprises & farm-linked processing/service enterprises (aged >= 2 years).

**Out of Scope** (Phase 2):
- State-wide rollout (remaining districts).
- Enterprises less than 2 years old (excluded from sampling).

---

## Deployment Status
| Milestone | Status | Date |
|-----------|--------|------|
| Study Proposal & Plan Finalized | Completed | July 2026 |
| Scaffolding & Project Structure Setup | Completed | 2026-08-10 |
| Schema & AppVariables Blueprint Designed | In Progress | 2026-08-10 |
| Google Sheet Core Tabs Created | Pending | |
| AppSheet Prototype Built | Pending | |
| Field Testing & Digitize Tool Verification | Pending | Week 4 |
| Pilot Data Collection Live | Pending | Weeks 6-8 |
