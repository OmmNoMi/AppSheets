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
| Base App Google Sheet data (copy for each project) | `_Templates/Base Template Core.xlsx` |

## 📁 Active Projects

| Client / Project | Status | Folder |
|------------------|--------|--------|
| Transcend Counseling & Wellness | 🔄 In Progress (Phase 1) | `Projects/Transcend/` |
| BLR World — Orbit | 🔄 In Progress (Phase 1) | `Projects/Orbit/` |
| Navi ONDT | 🔄 In Progress (Phase 1) | `Projects/Navi/` |

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

## 🤖 Antigravity LLM Directives (Formatting Rules)
Any LLM reading this Knowledge Base must strictly adhere to the following when writing code or assisting:
1. **No SQL or Python for DB logic:** AppSheet is a no-code engine that sits on top of Google Sheets. Never suggest SQL or Python scripts to manipulate database data. Only suggest AppSheet Data Actions or Google Apps Script.
2. **Code Blocks:** Always wrap AppSheet formulas in ```appsheet code blocks to make them visually distinct.
3. **Uppercase Functions:** Always format AppSheet function names in pure UPPERCASE (e.g., `SELECT()`, `FILTER()`, `ISBLANK()`).
4. **Data Reality:** Always trust the raw spreadsheet key/data (e.g., UniqueID or Timestamp) over the AppSheet "Display Label" shown in the UI. When referencing fields via Ref, use `[RefColumn].[TargetColumn]` directly without lookup formulas.
