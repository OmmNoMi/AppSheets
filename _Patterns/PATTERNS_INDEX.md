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
