# Architecture Decisions Log — CmF SHG Women Entrepreneurs Study Project

This document records the key architectural decisions, design choices, and structural tradeoffs made during the development of the SHG Women Entrepreneurs Study Pilot System.

---

## Decision 1: 4-Lens Modular Architecture (Action-Grid Navigation)
- **Date**: 2026-08-10
- **Status**: Approved
- **Context**: The quantitative questionnaire covers over 40 complex indicators across 4 distinct analytical lenses (Profile & Agency, Business Inclination, Performance, Institutional Support). Displaying this in a single long AppSheet form causes respondent fatigue and field input errors on tablet devices.
- **Decision**: Adopt OmmNoMi's Survey Engine Generator pattern. The main `Survey` form captures basic demographics and village metadata. Upon submission, field surveyors enter an Inline Action Grid (Detail View buttons) leading to 4 separate sub-module forms (`ProfileAgency`, `BusinessInclination`, `EnterprisePerformance`, `InstitutionalSupport`).
- **Consequence**: Sub-modules can be completed incrementally or revisited without losing previously saved data.

---

## Decision 2: Centralized Question & Option Management (`AppVariables`)
- **Date**: 2026-08-10
- **Status**: Approved
- **Context**: The study requires field data collection in rural Rajasthan where surveyors speak Hindi and local dialects (Vagdi in Dungarpur, Marwari in Churu).
- **Decision**: Store all question prompts (`Q_*`) and answer choices (`OPT_*`) inside the `AppVariables` system table with multi-column translations (`Title`, `Title_hi`, `Title_local`). AppSheet virtual columns (`Label`) dynamically resolve the display text based on user language preferences.
- **Consequence**: Questionnaire text updates can be pushed without re-generating Google Sheet column structures.

---

## Decision 3: Single Universal Junction Pattern (`MultiSelect`)
- **Date**: 2026-08-10
- **Status**: Approved
- **Context**: Multiple questions across all 4 lenses allow multiple option selections (e.g., training types received, top business challenges, market linkages).
- **Decision**: Avoid creating separate child tables for every multi-choice question. Implement a single universal `MultiSelect` junction table linked via `SurveyID`, storing `QuestionID` and `SelectedOptionID`.
- **Consequence**: Streamlines database schema, simplifies analytics data export, and standardizes multi-choice queries.

---

## Decision 4: Sampling Frame & Quota Floor Guards
- **Date**: 2026-08-10
- **Status**: Approved
- **Context**: The pilot requires 220 total samples across 4 districts (Churu, Dausa, Dungarpur, Baran), with strict sampling constraints:
  1. >50% of achieved sample must be *New Enterprises*.
  2. Minimum floor for SC/ST/OBC entrepreneurs in each district.
  3. Non-farm or farm-value-addition trades only; enterprises aged <2 years excluded.
- **Decision**: Embed real-time quota calculations in `AppSettings` and supervisor views to alert field teams when trade or category quotas are approaching capacity or under-represented.
