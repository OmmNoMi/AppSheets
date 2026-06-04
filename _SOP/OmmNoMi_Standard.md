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
Each persona must have an **Access Level** mapped to a role value in `AppVariables` (e.g., `U_Employee`, `U_System_Admin`).

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
- System tables: `AppUser`, `AppViews`, `AppSettings`, `AppVariables`, `AppTriggers`, `AppTimeline`, `AppResources`
  - Note: system tables (except AppUser) use **plural form** — match exactly as shown

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
| User photo | `Photo` | AppUser and person-type tables |
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

### Mandatory System Audit Columns (Every Operational Table)
| Column | Type | Initial Value | Editable_If | Reset on Edit |
|--------|------|--------------|-------------|---------------|
| `ID` | Text | `UNIQUEID()` | `ISBLANK([_THIS])` | — |
| `CreatedBy` | Enum Ref → AppUser (Me slice) | `ANY(Me[ID])` | `ISBLANK([_THIS])` | No |
| `CreatedOn` | DateTime | `NOW()` | `ISBLANK([_THIS])` | No |
| `LastEditBy` | Enum Ref → AppUser (Me slice) | `ANY(Me[ID])` | `ISBLANK([_THIS])` | Yes |
| `LastEditOn` | DateTime | `NOW()` | `ISBLANK([_THIS])` | Yes |
| `Label` | Virtual Column | Dynamic expression | — | — |

> **ID format exception**: `AppUser.ID` uses `=UPPER(TEXT(LEFT(UNIQUEID(), 4)))` — short 4-char uppercase human-readable ID. All other tables use `UNIQUEID()` directly.
> **Timestamp note**: Use `NOW()` (not `UTCNOW()`) in Initial Value and Reset formulas — AppSheet's date locale (en-GB) handles timezone display. UTCNOW() is still correct in App Formulas for computed fields that need strict UTC output.

---

## §3 Base App — System Tables (Foundation Architecture)

**Every new AppSheet project starts by copying the Base App.** The following 8 tables are pre-built and must not be removed or renamed. Add operational tables on top of these.

---

### Table 1: `_Per User Settings`
**Purpose**: Per-user personalization settings. One row per logged-in user, auto-managed by AppSheet.

| Column | Type | Notes |
|--------|------|-------|
| `_THISUSER` | Text (Key) | System-managed, `onlyvalue` |
| `_EMAIL` | Email | App formula: `USEREMAIL()` |
| `_NAME` | Name | App formula: `USERNAME()` |
| `Me` | Enum Ref → Me (slice of AppUser) | App formula: `ANY(Me[ID])`. Display name: "Logged in As". Links the current session to the AppUser record. |
| `AccessKey` | Text | Label column. Show_If: `=1=2` (always hidden). Reset on edit: Yes. Used for multi-user/shared device control. |
| `Country Option`, `Language Option` | Enum | Per-user locale preferences |

> **Do not edit this table's structure.** It is managed by AppSheet. Add project-specific user preferences via new columns only if needed.

---

### Table 2: `AppUser`
**Purpose**: All registered app users. The identity backbone of every app.

| Column | Type | Initial Value / Formula | Notes |
|--------|------|------------------------|-------|
| `ID` | Text (Key) | Manual short code | **Not auto-generated.** OmmNoMi dev accounts use human-defined IDs: `DevNomi`, `DevHardi`, `OmmNoMi`. Client admin accounts use a meaningful code (e.g., `DavidP`). Regular end-user accounts use `=UPPER(TEXT(LEFT(UNIQUEID(), 4)))`. |
| `Photo` | Image | — | Folder: `AppResources/AppUsers`. Label column. |
| `Email` | Email | — | AppSheet login email. Searchable. |
| `Name` | Name | — | Full name. Label column. Searchable. |
| `Roles` | EnumList (Ref → AppVariables) | `="U_Employee"` | Multi-role support. Values sourced from `AppVariables` row `AppUserRoles`. Suggested_Values: `SPLIT(LOOKUP("AppUserRoles","AppVariables","ID","VariableList")," , ")` |
| `AccessKey` | Text | `="Not in Use"` | Hidden. For shared-device or kiosk mode. |
| `Status` | Enum | `="Active"` | Values: `["Active","Inactive"]` |
| `LastEditedBy` | Enum Ref → AppUser | `=ANY(Me[ID])` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: Yes. |
| `LastEditedOn` | DateTime | `=NOW()` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: Yes. |
| `RolesList` | List (VC) | App formula: `SPLIT([Roles]," , ")` | Virtual. Used for role intersection checks. |

**Pre-seeded OmmNoMi dev accounts (present in every app):**
| ID | Email | Name | Role |
|----|-------|------|------|
| `DevNomi` | nomeshwer@ommnomi.in | Nomeshwer Sharma | U_System_Admin |
| `DevHardi` | hardiksharma80912@gmail.com | Hardik Sharma | U_System_Admin |
| `OmmNoMi` | team@ommnomi.in | OmmNoMi Automation | U_System_Admin |

> These 3 records must be present in every client app during development. They are removed or deactivated at handover unless ongoing support is contracted.

**Me Slice** (always present, always named `Me`):
```
Filter: AND(
  [Email] = USEREMAIL(),
  OR([AccessKey] = "Not in Use", USERSETTINGS("AccessKey") = [AccessKey]),
  [Status] = "Active"
)
Update mode: READ_ONLY
```

Use `ANY(Me[ID])`, `ANY(Me[Roles])`, `ANY(Me[Name])` everywhere — avoids LOOKUP overhead.

**Role check pattern** (use this in all Condition/Show_If/Editable_If fields):
```
ISNOTBLANK(INTERSECT({"U_System_Admin"}, SPLIT(ANY(Me[Roles]), ",")))
```
For multiple allowed roles:
```
ISNOTBLANK(INTERSECT({"U_System_Admin","U_People_Admin"}, SPLIT(ANY(Me[Roles]), ",")))
```

**AppUser Actions** (built-in):
- `Add` — only if `U_System_Admin`
- `Edit` — only if `U_System_Admin`  
- `Delete` — only if `U_System_Admin` AND `[Status]="Inactive"` AND `ISBLANK([Email])`
- `Compose Email (Email)` — system email action, fires if `NOT(ISBLANK([Email]))`

---

### Table 3: `AppViews`
**Purpose**: Dynamic navigation registry. Controls which views/modules appear in the app menu and who can see them. New modules are launched by adding rows here — no app editor changes needed.

| Column | Type | Notes |
|--------|------|-------|
| `ID` | Text (Key) | Manual or UNIQUEID |
| `Type` | Enum | e.g., `"Admin"`, `"Menu"`, `"Dashboard"` |
| `View` | Enum | AppSheet view name to navigate to |
| `Group` | Enum | Navigation group: `"Users"`, `"Profile"`, or custom |
| `Category` | Enum | Sub-grouping for display |
| `Name` | Name (Label) | Display name shown in the nav card |
| `Description` | Text | Subtitle shown under the name |
| `Icon` | Image | Icon from AppResources |
| `Link` | URL | External link (takes priority over AppLink in OnCardClick) |
| `AllowValues` | EnumList | Filtered view values (used when Group = "Users") |
| `AllowMultiple` | EnumList | Multi-value filter options |
| `AllowRoles` | EnumList (Ref → AppVariables) | Roles that can see this view entry. Suggested from `AppUserRoles` variable. |
| `LastEditBy` | Enum Ref → AppUser | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: Yes. |
| `LastEditOn` | DateTime | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: Yes. |
| `AppLink` | App (VC) | Computed navigation target. Formula: `IFS(ISNOTBLANK([Link]),"",1=1,SWITCH([Group],"Users",LINKTOFILTEREDVIEW("Users",IN([Status],LIST([AllowValues]))),"Profile",LINKTOROW(ANY(Me[ID]),"My_Profile"),LINKTOVIEW([View])))` |

**Admin_View Slice**:
```
Filter: AND([Type] = "Admin", ISNOTBLANK(INTERSECT([AllowRoles], SPLIT(ANY(Me[Roles]), ","))))
Update mode: UPDATES_ONLY
```

**Pre-seeded AppViews entries (present in every app — never delete):**

| ID | Category | Name | Purpose | Link |
|----|----------|------|---------|------|
| `AppSettings` | System | App Settings | Security and default variables | — |
| `AppViews` | System | App Views | Views and filters | — |
| `AppVariables` | System | App Variables | App behaviour configuration | — |
| `AppTriggers` | System | AppTriggers | System trigger for automation | — |
| `UsersA` | Users | Active Users | Users who can access the app | Filter: Active |
| `UsersB` | Users | Inactive Users | Users who are now inactive | Filter: Inactive |
| `Users` | Users | All App Users | All app users | — |
| `OmmNoMi_Support` | @ OmmNoMi Automation | Email Support | Contact Developer | mailto:support@ommnomi.in |
| `OmmNoMi_Helpdesk` | @ OmmNoMi Automation | Helpdesk Portal | Open Support Tickets | https://ommnomi.in/helpdesk/my-tickets |
| `OmmNoMi_Project` | @ OmmNoMi Automation | Documentation | View Project Details | — |
| `OmmNoMi_Website` | @ OmmNoMi Automation | Our Website | Visit OmmNoMi | https://ommnomi.in |

All pre-seeded entries have `AllowRoles = U_System_Admin` — only system admins see this admin panel.

**Protection rule**: Records with `CONTAINS([ID], "OmmNoMi")` cannot be deleted — these are OmmNoMi-branded system entries.

---

### Table 4: `AppSettings`
**Purpose**: App-wide configuration and enforcement rules. Each row defines a named setting with rich metadata — not a simple key-value store. Settings can be enforced via data table, column, view, or trigger.

| Column | Type | Notes |
|--------|------|-------|
| `ID` | Text (Key) | `UNIQUEID()`. Used as the lookup key in formulas. |
| `Tags` | EnumList | `["ID is used in Code","DataTable based Enforcement","DataColumn based Enforcement","View based Enforcement","Trigger based Enforcement"]` |
| `Table` | Enum | Which operational table this setting applies to |
| `Trigger` | Enum | Which AppTriggers type this setting controls |
| `View` | Enum | Which AppSheet view this setting controls |
| `Column` | Enum | Which column this setting applies to |
| `Title` | Text (Label) | Human-readable name of the setting |
| `Description` | LongText | What this setting does |
| `Roles` | EnumList (Ref → AppVariables) | Roles allowed to trigger/use this setting |
| `Decimal` | Number | Numeric setting value (display name overridden per context, e.g., "Days") |
| `Date` | Date | Date-type setting value. Initial: `TODAY()` |
| `AllowedValues` | EnumList | Valid input values when this setting is referenced by AppTriggers |
| `LastEditBy` / `LastEditOn` | Audit | Standard pattern |

**Reading a setting value**:
```
// Get a numeric value
LOOKUP("SettingID", "AppSettings", "ID", "Decimal")

// Get allowed values list
SPLIT(TEXT(LOOKUP("SettingID", "AppSettings", "ID", "AllowedValues")), ",")

// Check role access against a setting
ISNOTBLANK(INTERSECT([AllowRoles], SPLIT(ANY(Me[Roles]), ",")))
```

> **AppSettings starts empty in the Base Template.** Add rows only when a project-specific setting is needed. Tag every row whose `ID` is hardcoded in a formula or action with `"ID is used in Code"` to prevent accidental changes.

---

### Table 5: `AppVariables`
**Purpose**: Typed dynamic variables that change during app operation — role lists, dropdown values, toggles, counters. More powerful than AppSettings: each row stores a value in a specific typed field, shown/hidden by `ValueControl`.

| Column | Type | Notes |
|--------|------|-------|
| `ID` | Text (Key) | `UNIQUEID()`. Used as lookup key. |
| `Table` | EnumList | Tables this variable applies to |
| `Column` | EnumList | Columns this variable drives |
| `Tags` | EnumList | `["ID is used in Code","ID Connected to Variable"]` |
| `ValueControl` | EnumList | **Controls which value field is active**: `["Enum","EnumList","VariableList","Date","Decimal","Photo","File","URL"]` |
| `Title` | Text (Label) | Human-readable name |
| `Description` | LongText | What this variable does |
| `UsedFor` | LongText | Where in the app this is referenced |
| `Decimal` | Decimal | Active when `ValueControl` contains `"Decimal"`. Editable_If: `IN("Decimal",[ValueControl])` |
| `EnumValue` | Enum | Active when `ValueControl = "Enum"` |
| `EnumList` | EnumList | Active when `ValueControl = "EnumList"` |
| `VariableList` | EnumList (Ref → AppVariables) | Active when `ValueControl = "VariableList"`. Only references rows tagged `"ID Connected to Variable"`. Valid_If: `FILTER("AppVariables",CONTAINS("ID Connected to Variable",[Tags]))` |
| `DateValue` | Date | Active when `ValueControl = "Date"` |
| `Photo` | Image | Active when `ValueControl = "Photo"` |
| `URL` | URL | Active when `ValueControl = "URL"` |
| `File` | File | Active when `ValueControl = "File"` |
| `LastEditBy` / `LastEditOn` | Audit | Standard pattern |

**Pre-seeded AppVariables rows (present in every app):**

| ID | Tags | ValueControl | Title | VariableList value |
|----|------|-------------|-------|--------------------|
| `AppUserRoles` | ID is used in Code | VariableList | App User Roles | Points to all role rows below |
| `U_System_Admin` | ID Connected to Variable | Enum | System Admin | — |
| `U_System_Manager` | ID Connected to Variable | Enum | System Manager | — |
| `U_System_User` | ID Connected to Variable | Enum | System User | — |
| `U_System_Viewer` | ID Connected to Variable | Enum | System Viewer | — |
| `U_Employee` | ID Connected to Variable | Enum | Employee | — |

**Base role hierarchy:**
| Role | Intended Use |
|------|-------------|
| `U_System_Admin` | Full access — OmmNoMi devs + client owner |
| `U_System_Manager` | Operational manager — can manage most data |
| `U_System_User` | Standard user — CRUD on own records |
| `U_System_Viewer` | Read-only access |
| `U_Employee` | Default role for all new users |

> Add project-specific roles by adding new `ID Connected to Variable` rows and including them in `AppUserRoles.VariableList`. Example: `U_Therapist`, `U_Finance_Manager`.

**`AppUserRoles` variable — how it works:**
- `ID`: `AppUserRoles`
- `ValueControl`: `VariableList`
- `VariableList`: references all rows tagged `"ID Connected to Variable"` — i.e., the 5 role rows above
- This drives the `Roles` dropdown in `AppUser` and the `AllowRoles` dropdown in `AppViews`

**Reading a variable**:
```
// Get the enum value
LOOKUP("AppUserRoles", "AppVariables", "ID", "EnumValue")

// Get comma-separated list for SPLIT()
SPLIT(TEXT(LOOKUP("AppUserRoles", "AppVariables", "ID", "VariableList")), " , ")
```

**Protection rule**: Variables tagged `"ID is used in Code"` cannot be deleted.

---

### Table 6: `AppTriggers`
**Purpose**: Input parameter rows for automations and bots. When a bot or action needs user-provided inputs before running (e.g., pick an employee, pick a date), a row is created here — the AppTrigger ID (from AppSettings) defines what inputs are shown.

| Column | Type | Notes |
|--------|------|-------|
| `ID` | Text (Key) | `UNIQUEID()`. Editable_If: `ISBLANK([_THIS])`. Label column. |
| `AppTrigger` | Enum (Ref → AppSettings) | Which trigger/setting this row is executing |
| `Bot` | Yes/No | Initial: `IF(ISBLANK([_THIS]),TRUE,FALSE)` — defaults TRUE (bot-initiated) |
| `Type` | Enum | Trigger category |
| `Table` | Enum | Target table for the trigger |
| `PickEmployee` | Enum (Ref → AppUser) | Show_If: `IN("PickEmployee",SPLIT([AppTrigger].[AllowedValues],","))` — only shown when this input is needed |
| `PickWeekYear` | Enum | Week/Year picker input |
| `PickDate` | Date | Initial: `TODAY()` |
| `PickDateTime` | DateTime | Initial: `NOW()` |
| `ValueText` | Text | Resolved text value. Initial: `=[PickEmployee].[Email]` |
| `RefTable` | Enum | The source table whose record triggered this |
| `RefValue` | Text | The ID of the triggering record |
| `CreatedBy` | Enum Ref → AppUser | `ANY(Me[ID])`. Editable_If: `ISBLANK([_THIS])` |
| `CreatedOn` | DateTime | `NOW()`. Editable_If: `ISBLANK([_THIS])` |
| `Date` | Text (VC) | App formula: `TEXT([CreatedOn],"DD/MM/YYYY")` — used for grouping in the table view |

**How AppTriggers works**:
1. An action on an operational record creates a row in `AppTriggers` with the relevant AppSetting ID and input values
2. A bot (scheduled automation) reads unprocessed `AppTriggers` rows and executes the corresponding logic
3. The `AppTriggers` view is grouped by `Date` (descending) with COUNT aggregate — shows execution history at a glance

> **AppTriggers starts empty in the Base Template.** Rows are created at runtime — either by a user pressing an action button, or by a bot creating a trigger row to queue work. The table is a runtime inbox, not a config table.

---

### Table 7: `AppTimeline`
**Purpose**: A pre-seeded annual calendar that doubles as an automation execution log. Every day of the year has exactly one row. Bots write to these rows when they process work for a given date.

| Column | Type | Notes |
|--------|------|-------|
| `ID` | Text (Key) | Label column. Pre-seeded as the date string (e.g., `2026-03-24 00:00:00`). |
| `Date` | Date | The calendar date. Initial: `TODAY()`. Pre-seeded for every day of the year. |
| `AppTrigger` | Enum (Ref → AppSettings) | Which automation fired for this date. Blank = no automation ran. |
| `TriggerValue` | Text | The ID of the record processed (e.g., an Employee ID or AttendanceRequest ID). |
| `TriggeredOn` | DateTime | Actual timestamp when the automation fired. |

**How AppTimeline works:**
- The sheet is pre-populated with **365 rows** — one row per calendar date for the full year
- Each row starts blank (no AppTrigger, no TriggerValue)
- When a bot runs for a specific date (e.g., `CreateAttendance`), it writes the AppTrigger ID and the processed record's ID into that date's row
- `TriggeredOn` captures the exact execution time
- The table view groups by `Date` descending — most recent automation activity appears at top

**Reading the data:**
- A row with `AppTrigger = "CreateAttendance"` and `TriggerValue = "abc123"` means: on that date, the attendance bot ran and processed record `abc123`
- A row with no AppTrigger = that date was not yet processed by any bot

> AppTimeline is written to by automations only. Add/Edit/Delete actions are restricted to `U_System_Admin`. At year-end, seed the next year's 365 rows before Jan 1 to ensure uninterrupted bot operation.

---

### Table 8: `AppResources`
**Purpose**: In-app documentation library — searchable how-to guides, training videos, reference photos, and downloadable files delivered alongside every app. This is how end users self-serve answers (e.g., "How to Use the Candidate Submission Form", "How to Activate an Employee Profile") without leaving the app or contacting support. Every client delivery ships with a baseline set of standard guides for the modules in scope.

| Column | Type | Initial Value / Formula | Notes |
|--------|------|------------------------|-------|
| `ID` | Text (Key) | `UNIQUEID()` | Editable_If: `ISBLANK([_THIS])`. Shown as short hex (e.g., `c3cfe2c8`). |
| `Category` | EnumList | — | High-level grouping. Examples: `Onboarding`, `Candidate`, `Employee User Guide`, `Attendance`, `Payroll`. Multi-select — a guide can belong to several categories. |
| `Tags` | EnumList | — | Free-form search keywords. Drives full-text discovery (e.g., `new hire form, banking details, g-form`). Suggested_Values pulled from existing rows to encourage reuse. |
| `Title` | Text (Label) | — | Display name of the guide. Label column. Searchable. |
| `Description` | LongText | — | 1–2 sentence summary shown in card/list views before the user opens the full guide. Plain text only. |
| `Instruction` | LongText (Rich Text / HTML) | — | The full step-by-step body. Supports HTML (`<h2>`, `<ol>`, `<b>`, `<hr>`). Rendered in the detail view. This is the primary content. |
| `Photo` | Image | — | Hero/thumbnail image. Folder: `Resources_Images/`. |
| `Link` | URL | — | External link OR AppSheet `gettablefileurl` link to a streamable copy of the `File` (used so videos play inline instead of forcing a download). |
| `File` | File | — | Downloadable attachment (PDF, MP4, DOCX, etc.). Folder: `Resources_Files_/`. |
| `Video` | URL | — | Optional external video URL (YouTube, Vimeo, Loom). Use `Link` instead when the video is the uploaded `File`. |
| `Roles` | EnumList (Ref → AppVariables) | — | Which roles can see this resource. Suggested_Values: `SPLIT(LOOKUP("AppUserRoles","AppVariables","ID","VariableList")," , ")`. |
| `Standard` | Yes/No | `=TRUE` | `TRUE` = ships as part of the standard OmmNoMi delivery (locked from client edits). `FALSE` = client-authored guide. |
| `LastEditBy` | Enum Ref → AppUser | `=ANY(Me[ID])` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: Yes. |
| `LastEditOn` | DateTime | `=NOW()` | Editable_If: `ISBLANK([_THIS])`. Reset on Edit: Yes. |

**Visibility / Security Slice — `MyResources`:**
```
Filter: ISNOTBLANK(INTERSECT([Roles], SPLIT(ANY(Me[Roles]), ",")))
Update mode: READ_ONLY (for non-admins)
```
Only resources whose `Roles` intersect the current user's roles are visible.

**Views:**
| View Name | Type | Notes |
|-----------|------|-------|
| `Resources` | Gallery / Card | Browseable library grouped by `Category`, sorted by `Title`. Search bar enabled (matches `Title`, `Tags`, `Description`). |
| `Resource_Detail` | Detail | Full `Instruction` render with embedded `Photo`, `Video`/`Link` player, and `File` download. Ref position. |
| `Admin_Resources` | Table | Admin-only CRUD. Show_If: `U_System_Admin`. |

**Add/Edit/Delete rules:**
- Add/Edit allowed only for `U_System_Admin` (OmmNoMi) on rows where `[Standard] = TRUE`.
- Client admins can Add/Edit rows where `[Standard] = FALSE`.
- Delete restricted to `U_System_Admin` AND `[Standard] = FALSE` — standard OmmNoMi-shipped guides cannot be deleted by clients.

**Pre-seeded default row (ships with every Base App copy — `Standard = TRUE`, do not delete):**

| Field | Value |
|-------|-------|
| `ID` | `6d281705` |
| `Category` | `System Configuration` |
| `Tags` | `admin guide, html formatting, resource management, long text setup, content editor, code snippets, system maintenance, How to add and Manage resources in HTML` |
| `Title` | `How to add and Manage resources in HTML` |
| `Description` | *(blank)* |
| `Instruction` | The canonical HTML-authoring prompt (below) — given to any LLM that drafts new Resource rows so output renders cleanly in AppSheet's Long Text (Display as HTML) field. |
| `Photo` | `Resources_Images/6d281705.Photo.052117.png` |
| `Link` / `File` / `Video` | *(blank)* |
| `Roles` | `U_System_Admin` |
| `Standard` | `TRUE` |
| `LastEditBy` | `OmmNoMi` |

**Canonical Instruction body** (the HTML-authoring prompt every project ships with):

```
Please write HTML for an AppSheet Long Text column (Display as HTML enabled).
The content is:

[Paste your new text here]

Strict Technical Requirements:
- No <div> tags: Use only standard tags like <h2>, <h3>, <ol>, <li>, <p>, <hr>, and <b>.
- No style attributes: AppSheet ignores inline CSS. Use headers (<h2>) for hierarchy instead.
- Minified Formatting: Remove all line breaks, tabs, and extra whitespace between the HTML tags. The entire output must be on one single line to prevent AppSheet from rendering unwanted vertical space.
- Hierarchy: Use an ordered list (<ol>) for steps and a horizontal rule (<hr>) to separate the "What happens next" section.
```

> **Why this is the default delivery row:** every additional `Standard = TRUE` guide added to a client app (e.g., "How to Use the Candidate Submission Form", "How to Activate an Employee Profile") is authored against this prompt to guarantee consistent rendering. Treat row `6d281705` as the source-of-truth style guide for all in-app documentation.

**Additional baseline rows** (added per project scope as `Standard = TRUE`):
| Category | Example Title |
|----------|---------------|
| `Onboarding` | How to Activate an Employee Profile |
| `Employee User Guide` | How to Use the Candidate Submission Form |
| `System` | How to Reset Your Password / Switch Roles |

> **AppResources is the canonical documentation channel for every OmmNoMi delivery.** Authoring guides here (instead of external PDFs or email) keeps documentation versioned with the app, role-gated, and discoverable in-context. Every new module shipped to a client must include a corresponding `Standard = TRUE` row.

---

## §4 AppSheet Editor Configuration

### Editable_If Rules
| Pattern | Formula | Use Case |
|---------|---------|----------|
| Write-once | `ISBLANK([_THIS])` | Audit columns, IDs, timestamps |
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

### Action Naming Conventions
| Prefix | Use Case |
|--------|----------|
| `Add_` | Custom create action |
| `View_` | Navigate to another view/record |
| `Sync_` | Force recalculation (touches LastEditOn) |
| `Input_` / `InputAll_` | User input / bot input actions |
| `Approved_` / `Rejected_` / `Verified_` | Status transition actions |
| `Create_` | Programmatic record creation |
| `Action for [Description]` | General-purpose actions (system-generated style) |

### System View Layout
| View Name | Type | Notes |
|-----------|------|-------|
| `Admin_View` | Card | Admin nav menu. Show_If: `U_System_Admin` only. Grouped by Category. |
| `Admin` | Dashboard | Admin panel with Users sub-view. Ref position. |
| `Settings` | Form | `_Per User Settings` form. Menu position but Visible: NEVER. |
| `My_Profile` | Card | Current user's profile. Ref position. |
| `Users` | Table | AppUser management. Quick edit enabled. |
| `AppSettings` / `AppVariables` / `AppTriggers` / `AppViews` | Table | System config tables. Ref position. |

---

## §AI-Schema
**Master Prompt for Gemini — use verbatim:**

```
System: You are an Expert AppSheet Architect operating under the OmmNoMi Standard SOP.

The Base App already contains 8 system tables: _Per User Settings, AppUser, AppViews, AppSettings, AppVariables, AppTriggers, AppTimeline, AppResources. Do NOT re-generate these.

Based on the following Project Info, generate ONLY the operational tables needed. Use PascalCase for both columns and tables. No spaces. Every operational table must include: ID (Text, Key, UNIQUEID(), Editable_If: ISBLANK([_THIS])), CreatedBy (Enum Ref → AppUser, ANY(Me[ID]), write-once), CreatedOn (DateTime, NOW(), write-once), LastEditBy (Enum Ref → AppUser, ANY(Me[ID]), Reset on Edit: Yes), LastEditOn (DateTime, NOW(), Reset on Edit: Yes). Use Mobile and Email as generic contact columns. Suggest the 3 primary role values to add to AppVariables[AppUserRoles]. Output a Markdown table per sheet: Column | Type | Initial Value / App Formula | Notes.

Project Info: [INSERT PROJECT REQUIREMENTS]
```
