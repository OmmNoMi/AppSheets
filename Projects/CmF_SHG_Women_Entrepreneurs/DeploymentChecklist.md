# Deployment Checklist — CmF SHG Women Entrepreneurs Study Pilot App

Pre-deployment verification checklist to ensure zero data loss, exact schema alignment, and field readiness.

---

## 1. Schema & Data Model Readiness
- [ ] All Google Sheet tabs created with exact column header spelling (`Survey`, `ProfileAgency`, `BusinessInclination`, `EnterprisePerformance`, `InstitutionalSupport`, `MultiSelect`, `AppVariables`, `SamplingFrame`, `SupervisorAudit`).
- [ ] `AppVariables` pre-seeded with all 40+ questionnaire prompts (`Q_*`) and answer options (`OPT_*`) in English, Hindi, and local dialects.
- [ ] Virtual Column `Label` configured on `AppVariables` with dynamic language resolution.
- [ ] `SamplingFrame` pre-loaded with Churu, Dausa, Dungarpur, and Baran district baseline metrics.

## 2. AppSheet Configuration & Security
- [ ] `Ref` columns linked correctly with `IsPartOf=TRUE` on sub-module tables.
- [ ] Validation rules (`Valid_If`) active for trade, age cohort, and caste category fields.
- [ ] GPS auto-capture working on form initialization (`HERE()`).
- [ ] Offline sync and storage enabled for field tablet operation.
- [ ] User role security filters configured (`Field Investigator`, `Supervisor`, `Researcher/Admin`).

## 3. Field Testing & Verification
- [ ] Preliminary field tool testing completed in 1 pilot district.
- [ ] 2 test survey records submitted, reviewed, and verified by supervisor.
- [ ] Export script tested to confirm clean JSON/CSV dataset extraction for analytics pipeline.
