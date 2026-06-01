# OmmNoMi Standard — AppSheet Development SOP
> OmmNoMi Automation LLP | Version: Living Document | Last Updated: See git history

---

## §Philosophy
OmmNoMi does not build "small tools." We build **Full Business Operation Systems** on AppSheet. We act as a virtual data-handling department for clients — clean, scalable, AI-ready, modular, and built for continuous monthly improvement.

**Operation Partner Philosophy**: Every deployment is an ongoing partnership. The codebase must support phased enhancements without technical debt accumulation.

---

## §1 Strategic Planning
Before any sheet is touched:

### User Stories Format
`As a [Role], I need to [action] so that [outcome].`
Each persona must have an **Access Level** mapped to AppAccess (e.g., `Role_Field`, `Role_Admin`).

### Feature Matrix
| Type | Definition | Rule |
|------|-----------|------|
| **Painkiller** | Mandatory for current phase — system fails without it | Build now |
| **Vitamin** | Long-term value, nice-to-have | Plan schema now, build later |

### ERD Relationships
- One-to-Many: One Employee → many AttendanceLogs
- Many-to-Many: Always use a Join Table (e.g., `ProjectTag`) — never raw multi-select for relational data

### Status Lifecycle (State Machine)
Every record must follow a defined path. Transitions via **Action buttons only** — never manual text entry.
```
Draft → Pending Review → Approved → In Progress → Completed → Archived
```

---

## §2 Database Design (Google Sheets)

### Critical Rules
| Rule | Detail |
|------|--------|
| Zero spreadsheet formulas | Never use =SUM(), =VLOOKUP() etc. Breaks sync. |
| Plain Text ID formatting | Format → Number → Plain Text for all ID columns |
| Tab names = Table names | Exact match, PascalCase, no spaces |
| Virtual Column collision check | Before adding physical column, verify no VC with same name exists |

### Table Naming
- Singular PascalCase nouns: `Employee`, `InventoryItem`
- Parent/child relationship preserved in name: `Sales` → `SalesItem`
- System tables prefixed: `AppUser`, `AppView`, `AppAccess`, `AppVariable`, `AppTrigger`, `AppSetting`

### Column Naming
| Purpose | Column Name | Notes |
|---------|-------------|-------|
| Primary key | `ID` | Always first column |
| Person name | `Name` | People/entities |
| Object name | `Title` | Tasks, docs, objects |
| Primary classification | `Type` | |
| Secondary classification | `Category` | |
| Workflow state | `Status` | |
| Granular detail | `SubStatus` | |
| Primary image | `Image` | |
| Primary document | `File` | |
| External URL | `Link` | |
| User-facing summary | `Description` | |
| Internal commentary | `Notes` | |
| Phone/WhatsApp | `Mobile` | Never PhoneNumber/WhatsApp |
| Email | `Email` | Never WorkEmail/PersonalEmail |
| Credits (integer only) | explicit Integer type | No decimals |

### Cross-Table Lineage Rule (Mandatory)
When a column in Table A aggregates/references data from Table B, prefix the column name with Table B's PascalCase name.
```
✅ AttendanceDailyCount   (in Employee table, counting AttendanceDaily records)
❌ DailyCount             (ambiguous — which daily?)
❌ TotalAttendance        (doesn't indicate source table)
```

### Mandatory System Audit Columns (Every Table)
| Column | Type | Initial Value | Editable_If | Reset on Edit |
|--------|------|--------------|-------------|---------------|
| `ID` | Text | `TEXT(UNIQUEID())` | OFF | — |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | FALSE |
| `CreatedOn` | DateTime | `UTCNOW()` | OFF | FALSE |
| `LastEditBy` | Enum Ref → AppUser | `ANY(Me[ID])` | OFF | TRUE |
| `LastEditOn` | DateTime | `UTCNOW()` | OFF | TRUE |
| `Label` | Virtual Column | Dynamic expression | — | — |

---

## §3 System Tables (Foundation Architecture)

### AppUser
Columns: `ID`, `FirstName`, `LastName`, `Mobile`, `Roles`, `AccessEmail`, `UserEmail`, `AccessKey`, `Status`, `LastEditBy`, `LastEditOn`

**Me Slice**: Filter = `AND([AccessEmail] = USEREMAIL(), [Status] = "Active")`
Use `ANY(Me[Roles])`, `ANY(Me[ID])`, `ANY(Me[FirstName])` everywhere — avoids heavy LOOKUP.

### AppAccess
Defines permission levels: combines Modules (System, Employee, Finance…) with Access Levels (Admin, Manager, Field…).
Roles column in AppUser → Enum Ref to AppAccess.

### AppView
Controls dynamic navigation and module visibility. New modules launched dynamically via this table.

### AppSetting
Key-value store for static app-wide constants.
Access: `LOOKUP("SettingName", "AppSetting", "ID", "Value")`

### AppVariable
Dynamic operational values that change frequently (counters, toggles, etc.).

### AppTrigger
Manages statuses of background processes, webhooks, and multi-step triggers.

---

## §4 AppSheet Editor Configuration

### Editable_If Rules
| Pattern | Formula | Use Case |
|---------|---------|----------|
| Write-once | `ISBLANK([_THIS])` | Legal/compliance fields, ID, timestamps |
| Hide from forms | `CONTEXT("View") <> "Form"` | Show_If — keep forms clean |

### Performance: Dereferencing over Functions
| Avoid | Prefer | Why |
|-------|--------|-----|
| `LOOKUP(...)` | `[RefCol].[TargetColumn]` | O(1) vs O(N) |
| `SELECT(Table[Col], ...)` | `[Related List][Column]` | O(1) list deref |
| Full-table SELECT | `SUM(SELECT([Related SalesItems][Price], [Tax]=0.18))` | Filter already-dereferenced list |

### Enum Ref Mandate
Never use standard Ref for simple selections.
- Set column Type = `Enum`, Base Type = `Ref`
- Reason: Standard Ref adds unwanted "Add" button and inline views; Enum Ref gives clean dropdown + relational link

---

## §AI-Schema
**Master Prompt for Gemini — use verbatim:**

```
System: You are an Expert AppSheet Architect. Based on the OmmNoMi Standard SOP and the following Project Info, generate a complete Google Sheets database schema. Use PascalCase for both columns and tables. No spaces. Include system tables: AppUser, AppView, AppAccess, AppVariable, AppTrigger, AppSetting. Every operational table must include ID (Key), CreatedBy (Enum Ref), CreatedOn (DateTime), LastEditBy (Enum Ref), LastEditOn (DateTime). Use UTCNOW() for all timestamps. Use Mobile and Email as generic contact columns. Apply ISBLANK([_THIS]) for Editable_If on all ID and timestamp fields. Use TEXT(UNIQUEID()) for Primary Keys. Suggest the Me slice logic and three primary UX Format Rules. Output a Markdown table per sheet: Name | Type | Initial Value / App Formula.

Project Info: [INSERT PROJECT REQUIREMENTS]
```
