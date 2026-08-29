---
name: pattern-patterns-index
description: Architectural pattern for PATTERNS_INDEX. Use this skill when asked to implement or design PATTERNS_INDEX.
---

# Patterns Index — OmmNoMi Cross-Project Learning
> **FOR ANTIGRAVITY**: Search this index FIRST before generating any schema, formula, or action.
> Each entry links to a detailed pattern file. Only fetch the file you need.

---

## How This Works
- Patterns are extracted from real project experience
- Each pattern has: Problem | Solution | Source Project | Verified
- When a new solution works in a project → Antigravity adds it here
- Patterns marked ⭐ are battle-tested across 2+ projects

---

## Schema Patterns
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| SP-001 | Standard system tables scaffold | `Schema/SystemTables.md` | SOP |
| SP-002 | Google Form repeating columns → normalize to child table via App Script | `Schema/FlatFormToChildTable.md` | Transcend |
| SP-003 | HIPAA/FERPA: Shared Drive folder structure for client/student files | `Schema/HIPAASharedDrive.md` | Transcend |
| SP-004 | Google Form sheet connected to AppSheet — integration rules | `Schema/GoogleFormIntegration.md` | Transcend |
| SP-005 | Form Branching & Multi-Row Expansion for flat arrays | `Schema/SP-005_FormBranching.md` | Transcend |

## Formula Patterns
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| FP-001 | Audit stamp full setup | `_SOP/Formulas.md §I` | SOP |
| FP-003 | Creation-only editability for pre-filled columns | `Formulas/FP-003_CreationOnlyEdits.md` | Orbit |
| FP-004 | Contextual Description VC — one field, all request types | `Formulas/FP-004_ContextualDescription.md` | Orbit |

## Action Patterns
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| AP-001 | Prevent filter inheritance on Add | `_SOP/Actions.md §Custom Add` | SOP |
| AP-002 | Force row recalculation | `_SOP/Actions.md §Sync_` | SOP |
| AP-003 | *(Add new patterns here)* | | |
| AP-004 | Upsert child record with auto-filled Initial Values (Passing the Ref) | `_SOP/Automations.md §Action Pattern` | Transcend |

| BF-004 | Form pre-fills wrong Status from filtered view | Use custom Add_ action with LINKTOFORM() | SOP |
| BF-005 | Full card number / CVV in Google Form | HIPAA/PCI: App Script extracts last 4 only, CVV never stored | Transcend |
| BF-006 | Google Form sheet columns renamed/broken in AppSheet | Never rename form cols — use Display Name; add admin cols at END only; use Timestamp as key | Transcend |
| BF-007 | Ref Display vs Database Raw Value | `BugFixes/BF-007_RefDisplayVsRaw.md` | Transcend |
| BF-008 | Action fails silently | `BugFixes/BF-008_SchemaValidation.md` | Transcend |
| BF-009 | Blank email body / wrong recipient in automation email | `BugFixes/BF-009_BlankEmailBody.md` | Navi ONDT |
| BF-010 | Google Doc template missing text / smart quotes / misplaced EndIf | `BugFixes/BF-010_GoogleDocTemplateExpressionSyntax.md` | Navi ONDT |

## UX Patterns
| ID | Use Case | Pattern File | Source |
|----|---------|-------------|--------|
| UX-001 | Module dashboard layout | `_SOP/UX.md §Dashboard` | SOP |
| UX-002 | Status format rules | `_SOP/UX.md §Format Rules` | SOP |
| UX-004 | Dependent field auto-compute with conditional override | `UX/UX-004_DependentFieldOverride.md` | Orbit |

## Automation Patterns
| ID | Use Case | Pattern File | Source |
|----|---------|-------------|--------|
| AU-001 | Nightly overdue bot | `_SOP/Automations.md §Overdue Bot` | SOP |
| AU-002 | ADDS_ONLY notification | `_SOP/Automations.md §Notification` | SOP |
| AU-003 | Conditional document versioning (consent flags → doc version) | `Automations/AU-003_ConsentDocVersioning.md` | Transcend |
| AU-004 | Hourly App Script bot for Google Form auto-processing | `Automations/HourlyFormProcessingBot.md` | Transcend |
| AU-005 | AppTimeline daily calendar bot — claim a date row, log execution | `_SOP/Automations.md §AppTimeline` | Base App |
| AU-006 | AppScript Webhook payload parsing (safeParse fallback) | `_SOP/Automations.md §AppScript` | Transcend |
| AU-007 | Google Docs API limitation: use plain text `{{}}` over smart chips | `_SOP/Automations.md §AppScript` | Transcend |
| AU-008 | Force AppSheet re-auth after `appsscript.json` scope changes | `_SOP/Automations.md §AppScript` | Transcend |
| AU-009 | The `[_THISROW]` Scope Qualifier | `Automations/AU-009_ThisRowScope.md` | Transcend |

---

## Project Overviews (Architecture & Scope)
| Project | Overview File | Focus Areas |
|---------|---------------|-------------|
| Transcend | `../Projects/Transcend/README.md` | Intake automation, Document generation, Pipeline tracking |
| Orbit | `../Projects/Orbit/README.md` | HR lifecycle, Geofenced attendance, Leave ledger, Expense claims |

---

## How Antigravity Adds a New Pattern
When a solution is found during a project session:
1. Add a row to the relevant section above with next ID
2. If the pattern is complex (>3 lines), create `[Category]/Pattern_[ID].md`
3. If simple, inline it in this index file directly
4. Update source project's `Learnings.md` with Promoted = Yes
5. Mark with ⭐ after it's been verified in a second project

---

## Patterns Added — Orbit Phase 3 Session (18 June 2026)

### Schema Patterns (continued)
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| SP-006 | Additive module on existing Base App — new tables added to existing spreadsheet, no new app | Inline: Extend existing Orbit Main sheet. Add new tabs. Add tables in AppSheet editor pointing to new tabs. Extend existing table enums/columns. Never duplicate existing tables. | Orbit Phase 3 |
| SP-007 | Rules table + Instance builder pattern — config table (seeded once) + operational table (auto-built per record) | Inline: `ComplianceRule` (config, static, pre-seeded by dev) + `ComplianceItem` (dynamic, auto-built by bot per intern on trigger). Bot uses `COUNT = 0` idempotency check. Allows rules to be updated without touching existing operational rows. | Orbit Phase 3 |
| SP-008 | Partner row-level security via AppUser attribute — external viewer restricted to their own org's records | Inline: Add `OrgID` (Enum Ref → OrgTable) to `AppUser`. Slice filter: `[RecordField].[OrgID] = LOOKUP(ANY(Me[ID]),"AppUser","ID","OrgID")`. Self-maintaining — no per-record permission rows needed. | Orbit Phase 3 |

### Action Patterns (continued)
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| AP-005 | 11-state lifecycle State Machine — all transitions via Action buttons, no manual text entry | Inline: Define all valid state transitions as AppSheet Actions with condition guards (`[Status] = "X"`). Role-gate actions. Bots watch for specific status values using `[_THISROW_BEFORE].[Status] <> "Target"` to fire only on transition, not on every update. | Orbit Phase 3 |

### Automation Patterns (continued)
| ID | Use Case | Pattern File | Source |
|----|---------|-------------|--------|
| AU-010 | Idempotent child record creation — bot creates children only once, never duplicates | Inline: Add `COUNT(SELECT(ChildTable[ID], [ParentID]=[_THISROW].[ID])) = 0` to bot condition. Without this, every update to the parent re-fires the bot and duplicates children. Critical for compliance items, onboarding tasks, and review records. | Orbit Phase 3 |
| AU-011 | Bot pre-create + deep link form pattern — bot creates a draft record, sends deep link, user fills it in | Inline: Bot creates a Draft record with known IDs pre-filled. Email notification includes `LINKTOROW(record_id, "FormView")` or equivalent. User lands directly on their specific form — no navigation, no record creation needed. Eliminates "wrong record" errors. | Orbit Phase 3 |
| AU-012 | Document validity check with minimum lead time — flag documents expiring within N months of a deadline | Inline: `IF([Expiry] >= EDATE([Deadline], N), "Valid", IF([Expiry] >= [Deadline], "Warning", "Expired"))`. N is stored in AppSettings for easy configuration. Applied on bot trigger (ADDS_AND_UPDATES on the document table). | Orbit Phase 3 |

### Formula Patterns (continued)
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| FP-005 | Numeric Enum rating to label VC — 1-5 Enum score auto-mapped to descriptive label | Inline: Rating stored as Enum ("1","2","3","4","5"). AverageScore VC: `ROUND((VALUE([R1])+VALUE([R2])+VALUE([R3])+VALUE([R4]))/4,2)`. ScoreLabel VC: `IFS([Avg]>=4.5,"Exceeds",[Avg]>=3.5,"Meets",[Avg]>=2.5,"Partially Meets",[Avg]>=1.5,"Needs Support",TRUE,"Does Not Meet")`. Keep rating as Enum (not Number) for clean mobile dropdowns. | Orbit Phase 3 |

---

## Patterns Added — Navi ONDT Session (20 July 2026)

### Automation Patterns (continued)
| ID | Use Case | Pattern File | Source |
|----|---------|-------------|--------|
| AU-013 | Google Doc email body template — merge tag syntax, AppVariables lookup, Shared Drive access rules | `Automations/AU-013_EmailBodyTemplate.md` | Navi ONDT |

### Bug Fix Patterns (continued)
| ID | Problem / Use Case | Pattern File | Source |
|----|-------------------|-------------|--------|
| BF-009 | Blank email body / wrong recipient — 6-cause diagnostic checklist | `BugFixes/BF-009_BlankEmailBody.md` | Navi ONDT |
