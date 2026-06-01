# OmmNoMi AppSheet Knowledge Base

## What This Is
This workspace is the **Antigravity Knowledge Base** for all AppSheet development by OmmNoMi Automation LLP.
It stores the SOP, reusable patterns, and all project history so Antigravity can build every new project to the OmmNoMi Standard — consistently, without starting from scratch.

---

## Folder Structure

```
AppSheets/
│
├── _INDEX.md                     ← 🤖 Antigravity reads this FIRST (always)
│
├── _SOP/                         ← Standard Operating Procedures
│   ├── OmmNoMi_Standard.md       ← Full SOP & philosophy
│   ├── Naming.md                 ← Naming rules (tables, columns, slices, actions)
│   ├── Formulas.md               ← Formula library (audit, security, relational, logic)
│   ├── Actions.md                ← Action patterns (Sync_, Add_, Approve_, etc.)
│   ├── Automations.md            ← Bot patterns (overdue, notifications, webhooks)
│   ├── UX.md                     ← Format rules, view types, dashboard patterns
│   └── Deployment.md             ← Pre-launch checklist
│
├── _Patterns/                    ← 🧠 Self-learning cross-project pattern library
│   ├── PATTERNS_INDEX.md         ← Quick-lookup index (search here first)
│   └── Schema/
│       └── SystemTables.md       ← SP-001: Standard system tables scaffold
│
├── _Templates/                   ← Copy these when starting a new project
│   ├── ProjectInfo.md            ← Brief, personas, ERD, feature matrix
│   ├── Schema.md                 ← Living schema document
│   ├── Decisions.md              ← Append-only decision history log
│   ├── Learnings.md              ← Patterns to promote to _Patterns/
│   └── DeploymentChecklist.md    ← Pre-launch checklist
│
└── Projects/                     ← One folder per client project
    └── [ClientName_AppName]/     ← Copy from _Templates/ to start
```

---

## How to Start a New Project
1. Create folder: `Projects/[ClientName_AppName]/`
2. Copy all files from `_Templates/` into it
3. Tell Antigravity: *"New AppSheet project for [Client], here's the brief: [brief]"*
4. Antigravity reads the SOP, checks patterns, generates schema, and fills the project files

---

## How Self-Learning Works
After each project session:
- `Schema.md` → updated in place (always reflects current state)
- `Decisions.md` → new entry appended (why things changed — never edited)
- `Learnings.md` → reusable solutions noted
- `_Patterns/PATTERNS_INDEX.md` → promoted patterns added with cross-project ID

Every project makes the next project faster.

---

## SOP Version
The SOP is a **living document**. All updates go directly into `_SOP/OmmNoMi_Standard.md`.
No version numbers in filenames — use git history or Decisions.md to track evolution.
