# The Ultimate AppSheet Development Framework: The OmmNoMi Standard
## A Comprehensive Master SOP, Universal Formula Catalog, and Advanced Training Manual Version 0.5

This master guide constitutes the official Standard Operating Procedure (SOP) utilized for the end-to-end engineering, maintenance, and iterative enhancement of AppSheet application codebases.

---

## 📖 1. Purpose & Core Goals
This document serves as the definitive architectural blueprint for all AppSheet applications developed within this ecosystem. Unlike small, isolated tools, our focus is the construction and maintenance of a Full Business Operation System. By adhering to these standards, we ensure:

- **Engineering Consistency:** Every application follows a predictable logic flow, making it easier for team members to debug or enhance existing apps during monthly maintenance cycles.
- **Scalability & Performance:** Databases are architected for high-volume data without "sync lag". We prioritize `O(1)` lookups via dereferencing over expensive `O(N)` scans via `SELECT()` or `LOOKUP()`.
- **AI-Native Development:** The structure is specifically designed to be machine-readable, allowing LLMs to interpret project requirements and generate perfect schemas instantly.
- **Operation Partner Philosophy:** The core logic remains robust and the codebase stays clean as we keep improving and adding new phases.

---

## 🏗️ 2. Phase 1: Strategic Planning (The Project Info)
Before editing cells in Google Sheets, a Project Info document must be finalized:
- **User Stories (Personas):** Define roles, interactions, and access levels (e.g., `Role_Field`, `Role_Admin`).
- **Feature Matrix:** Categorize as **Painkillers** (immediate operational bottlenecks fixes) or **Vitamins** (long-term scalability enhancements).
- **Core Entities & ERD:** Identify primary tables and relationships. Use "Join Tables" for Many-to-Many relationships.
- **Workflows & State Machines:** Map the Status Lifecycle: `Draft -> Pending Review -> Approved -> In Progress -> Completed -> Archived`. Trigger transitions via action buttons.

---

## 📂 3. Phase 2: Structural Database Design (Google Sheets)
A clean database structure is critical.

### 3.1. Naming, Formatting & Performance
- **Table Names:** Singular nouns in `PascalCase` (e.g., `Employee`, `InventoryItem`). Child tables inherit parent prefix (e.g., parent `Sales` has child `SalesItem`).
- **Column Names:** Singular nouns in `PascalCase` without spaces. Short, precise, and generic (e.g., `Code` instead of `StudentCode`).
- **The Virtual Column Collision Check:**
  > [!IMPORTANT]
  > Before adding any new physical column to the Google Sheet, you MUST verify that a Virtual Column with the exact same name does not already exist in the AppSheet editor.
  > If it exists, you must first delete it in AppSheet, save/sync, add the physical column in Google Sheets, and then regenerate the schema.
- **Cross-Table Relational Naming (The Lineage Rule):** When referencing or pulling data from a different table, prefix the new column name with the target table name (e.g., `AttendanceDailyCount` in the `AttendanceRequest` table).
- **Attributes:**
  - Use `Name` for people and `Title` for objects/tasks/documents.
  - Course credits must be configured as `Integer` (no decimals).
  - Use `Type` for primary classification, and `Category` for subsets.
  - Use `Status` for high-level workflow, and `SubStatus` for details.
  - Use `Image`, `File`, and `Link` for media/connectivity. Use display names as an abstraction layer (e.g., map `Mobile` to `Primary WhatsApp`).
  - Use `Description` for user-facing summaries, and `Notes` for internal commentary.
  - Use `Mobile` and `Email` globally for contact information.
- **Sheet Tabs & Slices:** Tab names match AppSheet table names exactly (no spaces). Slices follow `PascalCase` and relate back to their source table (e.g., `SalesPending`).
- **Zero Spreadsheet Formulas:** MANDATORY. Never use `=SUM()` or `=VLOOKUP()` in Google Sheets.
- **MANDATORY ID Formatting:** Highlight the ID column in Sheets, set *Format -> Number -> Plain Text*, and use `TEXT(UNIQUEID())` in AppSheet.

### 3.2. Mandatory System Audit Columns
Every table must include these columns at the end:
1. `ID` (Primary Key, first column)
2. `CreatedBy` (Internal User ID)
3. `CreatedOn` (Timestamp created, UTC)
4. `LastEditBy` (Last editor user ID, Editable_If = OFF, Reset on Edit = ON)
5. `LastEditOn` (Last sync timestamp, UTC, Editable_If = OFF, Reset on Edit = ON)
6. `Label` (Virtual Column for dynamic label control in dropdowns)

---

## 🏛️ 4. Phase 3: The Foundation Table Architecture (System Tables)
System tables are prefixed with `App[Name]`.

### 4.1. The AppUser Table (Identity & Global Anchor)
- **Scope:** Manages all users.
- **Columns:** `ID`, `FirstName`, `LastName`, `Mobile`, `Roles`, `AccessEmail`, `UserEmail`, `AccessKey`, `Status`, `LastEditBy`, `LastEditOn`.
- **The "Me" Slice Strategy:** Create a slice named `Me` with the filter `AND([AccessEmail] = USEREMAIL(), [Status] = "Active")`. Use `ANY(Me[Roles])` or `ANY(Me[FirstName])` globally for low-overhead logic.

### 4.2. The AppView & AppAccess Architecture
- **AppAccess:** Combines Modules (e.g., `System`, `Employee`) with Access Levels (`Admin`, `Manager`). Link roles via Enum Ref.
- **AppView:** Controls dynamic navigation, branding, and permissions for launching new operational modules dynamically.

### 4.3. The AppVariable & AppSetting Ecosystem
- **AppSetting:** Key-value store for static app constants.
- **AppVariable:** Key-value store for dynamic operational variables.
- **Access Formula:** `LOOKUP("SettingName", "AppSetting", "ID", "Value")`.

### 4.4. The AppTrigger Table
- **Usage:** Central logging of status for background processes, webhooks, and complex multi-step triggers.

---

## 🧪 5. Phase 4: AppSheet Editor Configuration & Logic

### 5.1. System Stamp Formulas
| Column | Initial Value / Setting | Explanation |
| :--- | :--- | :--- |
| `ID` | `TEXT(UNIQUEID())` | Prevents scientific notation. Editable_If: OFF. |
| `CreatedBy` | `ANY(Me[ID])` | Captures creator ID. Reset on Edit: FALSE, Editable_If: OFF. |
| `CreatedOn` | `UTCNOW()` | Original entry time in UTC. Reset on Edit: FALSE, Editable_If: OFF. |
| `LastEditBy` | `ANY(Me[ID])` | Tracks most recent editor. Reset on Edit: TRUE, Editable_If: OFF. |
| `LastEditOn` | `UTCNOW()` | Tracks latest update time in UTC. Reset on Edit: TRUE, Editable_If: OFF. |

> [!WARNING]
> Spanning timezones? Avoid `NOW()`. OmmNoMi mandates `UTCNOW()` for standardized sync and automation reliability.

### 5.2. The "Enum Ref" Mandate
- **Rule:** Set Column Type to `Enum`, and Base Type to `Ref`.
- **Why:** Prevents users from adding messy data inline, providing a cleaner dropdown experience while maintaining the relational link.

### 5.3. Visibility & Advanced Control Logic
- **Data Lockdown:** In `Editable_If`, use `ISBLANK([_THIS])` for write-once fields.
- **Contextual Hiding:** In `Show_If`, use `CONTEXT("View") <> "Form"` to hide system data in forms.
- **High-Performance Relational Navigation:**
  - **Single-Value Dereference:** `[RefColumnID].[TargetColumn]` (preferred over `LOOKUP()`).
  - **List Dereference:** `[Related List][Column]` (preferred over `SELECT()`).
  - **Advanced Filtered Lists:** `SUM(SELECT([Related SalesItems][Price], [Tax] = 0.18))`.

---

## ⚡ 6. Phase 5: Categorized Formula Library

### I. Security & Identity Patterns
- Check if Admin: `IN("Admin", ANY(Me[Roles]))`
- Filter to User's Department: `[Department] = ANY(Me[Department])`
- Restrict to Record Owner: `[CreatedBy] = ANY(Me[ID])`
- Check Role Access List: `COUNT(INTERSECT(ANY(Me[Roles]), LIST("Manager", "Director"))) > 0`

### II. Complex Functional Logic
- List Subtraction: `COUNT(SELECT(Orders[ID], [Status]="Pending")) - COUNT(SELECT(Returns[ID], [Status]="Processed"))`
- Weighted Score: `([SelfGrade] * 0.3) + ([ManagerGrade] * 0.7)`
- Overdue Logic: `AND([Status] <> "Completed", [Deadline] < TODAY())`
- Deep Link: `CONCATENATE("#view=Employee_Detail&row=", ENCODEURL([ID]))`

---

## 🔘 7. Phase 6: Interactive Behavior (Actions)
> [!TIP]
> Forms are for data entry; Buttons are for business processes.

### 7.1. Action Naming Conventions
- Custom Add: `Add_[NewProject]`
- Custom View: `View_[PendingApprovals]`
- Recalculate/Sync: `Sync_[SalesItem]`
- User Input: `Input_[TimeSheetData]`
- Hidden Input: `InputAll_[NewData]`
- Status Transitions: `Verified_`, `Approved_`, or `Rejected_`
- Import/Export: `Import_`, `Export_`
- Filtered Views: `Filter_[SalesPending]`

### 7.2. Automated Status Switches & Gating
Utilize actions to transition status:
```excel
SWITCH([Status], 
  "New", "In Progress", 
  "In Progress", "Quality Check", 
  "Quality Check", "Completed", 
  [Status]
)
```
Gate actions using the *Only if this condition is true* rule (e.g., `AND(ANY(Me[Roles]) = "Manager", [Status] = "Pending Review")`).

### 7.3. The "Sync" Action (Force Recalculation)
Create a row-level force sync:
- **Action Name:** `Sync_[TableName]`
- **Do This:** *Data: set the values of some columns in this row*
- **Set These Columns:** `LastEditOn = UTCNOW()`
- **Prominence:** Display Overlay or Primary with a refresh icon (↻).

### 7.4. Preventing Filter Inheritance on Forms
To default a value originating from a filtered view without locking downstream edits:
1. Ensure the column has a blank App Formula and desired default in **Initial Value**.
2. Create a custom "Add" action using `LINKTOFORM("Target_Form_View", "Column_Name", "Desired_Default_Value")`.
3. Set the system-generated "Add" action behavior condition to `FALSE`.

---

## 🤖 8. Phase 7: Automations & Server-Side Logic
- **PDF Naming:** `CONCATENATE("OmmNoMi_Reports/", [Department], "/", [ID], "_", TEXT(NOW(), "YYYYMMDD_HHMM"))`
- **Scheduled Hygiene:** Run nightly bots at 12:00 AM to mark records as "Overdue".
- **Notification Loops:** Use `ADDS_ONLY` triggers to prevent notifications on simple edits.
- **External Webhooks:** Orchestrated via the `AppTrigger` table.

---

## 🎨 9. Phase 8: UX & Format Rules
- **Status Formatting:**
  - `[Status] = "Urgent"` -> Red, ⚠️, Bold
  - `[Status] = "Completed"` -> Green, ✅
  - `[Status] = "In Progress"` -> Blue, ⏳
- **View Type Standards:**
  - **Deck View:** Mobile lists.
  - **Table View:** Desktop/Dashboard reporting.
  - **Detail View:** "Side-by-side" layout for tablet/desktop.
  - **Gallery View:** Directories and directories catalogs.
- **Module Dashboards:** Named `[Module]_Dash` (e.g., `Employee_Dash`). Combines Detail View with Gallery/Card.

---

## 🚨 10. Troubleshooting & Deployment Checklist
- Check Virtual Columns execution time. If > 100ms, convert to physical columns.
- Test views using "Preview as" a low-permission User Role.
- Ensure `_RowNumber` is **never** used as a primary key.
- Verify ID column spreadsheet formatting is set to "Plain Text".
- Ensure every major operational table has a `Sync_[TableName]` action.
