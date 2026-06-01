# OmmNoMi AppSheet Knowledge Base — Master Index
> **FOR ANTIGRAVITY**: Read this file FIRST. Fetch only the specific section file you need. Do NOT read all files at once.

## 🗂 Knowledge Base Map

| Need | File |
|------|------|
| Full SOP & philosophy | `_SOP/OmmNoMi_Standard.md` |
| Naming rules (tables, columns, slices) | `_SOP/Naming.md` |
| Formula patterns (security, logic, audit) | `_SOP/Formulas.md` |
| Action patterns (Sync_, Add_, Approve_) | `_SOP/Actions.md` |
| Automation / bot patterns | `_SOP/Automations.md` |
| UX, format rules, view types | `_SOP/UX.md` |
| Pre-launch deployment checklist | `_SOP/Deployment.md` |
| Reusable cross-project patterns (SEARCH HERE FIRST) | `_Patterns/PATTERNS_INDEX.md` |
| Start a new project | `_Templates/ProjectInfo.md` |
| Schema design template | `_Templates/Schema.md` |

## 📁 Active Projects

| Client / Project | Status | Folder |
|------------------|--------|--------|
| Transcend Counseling & Wellness — IntakeSystem | 🔄 In Progress (Phase 1) | `Projects/Transcend_IntakeSystem/` |

## 🧠 Self-Learning Protocol
After every project session, Antigravity must:
1. Update `Projects/[Name]/Schema.md` to reflect current state (no duplicates — overwrite)
2. Append new decisions to `Projects/[Name]/Decisions.md` (append-only log)
3. Promote any reusable pattern to `_Patterns/` and update `_Patterns/PATTERNS_INDEX.md`

## 🚦 How to Start a New Project
1. Copy `_Templates/` → `Projects/[ClientName_AppName]/`
2. Fill `ProjectInfo.md` based on client brief
3. Run AI Schema Generation (see `_SOP/OmmNoMi_Standard.md` §AI-Schema)
4. Antigravity generates schema → save to `Schema.md`
5. All decisions → `Decisions.md`

## ⚙️ Core Mandates (Always Active)
- UTCNOW() not NOW() for all timestamps
- TEXT(UNIQUEID()) for all primary keys
- Every table: ID, CreatedBy, CreatedOn, LastEditBy, LastEditOn, Label (VC)
- Enum Ref (not standard Ref) for all dropdown-style relational columns
- Zero spreadsheet formulas in Google Sheets
- Virtual Column collision check before adding any physical column
