# Project Learnings & Knowledge Capture — CmF SHG Women Entrepreneurs Study

This document captures field learnings, architectural patterns, DevTools automation rules, and AppSheet engine gotchas discovered during the implementation of the CmF SHG Women Entrepreneurs Study App.

---

## Technical & Architecture Learnings (AppSheet Modern Editor)

### 1. Form View ColumnOrder Isolation (`Presentation.Controls`)
- **Discovery**: In the modern AppSheet Web Editor, Form and Table views are NOT stored in `AppData.AppViews` or `AppViews`. They reside inside **`h.Presentation.Controls`** array (e.g., `Presentation.Controls[12]` for `Survey_Form_SecC`).
- **The Gotcha**: If a Form view has an explicit `ColumnOrder` defined, AppSheet strictly ignores any columns not in that array—even if they are active in the schema and have `Show_If = true`. Newly added Virtual Columns (such as `Related_Q6_Labor`) **will remain completely invisible** until explicitly injected into the form's `ColumnOrder`.
- **Dual Update Requirement**: `ColumnOrder` is duplicated in two properties and must be synchronized together:
  1. `control.ViewDefinition.ColumnOrder` (Array of column name strings).
  2. `control.Settings` (JSON-encoded string containing `{"ColumnOrder":[...], ...}`).

---

### 2. Inline Child Subtable `[ New ]` Button Protocol
- **Discovery**: For an inline child subtable to render with an interactive `[ New ]` / `[ Add ]` button inside a parent Form view:
  1. **REF_ROWS Formula Only**: The Virtual Column on the parent table MUST use `=REF_ROWS("Child_Table_Or_Slice", "Foreign_Key_Col")`. Using `=SELECT(...)` only renders a read-only list of keys with NO `[ New ]` button.
  2. **IsAPartOf Requirement**: The child table's foreign key (`Survey_ID` in `Survey_Tables`) must have `IsAPartOf = true` inside `TypeAuxData`.
  3. **Slice UpdateMode**: When pointing `REF_ROWS` to a filtered Slice (e.g. `Slice_Q6_Labor`), the slice in `AppData.TableSlices` must have `UpdateMode: 7` (Adds, Updates, and Deletes enabled).

---

### 3. Slices Storage Architecture (`AppData.TableSlices`)
- **Discovery**: AppSheet stores table slices in **`h.AppData.TableSlices`** as an Array of slice objects.
- **Slice Schema**:
  ```javascript
  {
    Name: "Slice_Q6_Labor",
    SourceTable: "Survey_Tables",
    Columns: childColsArray,
    Actions: ["**auto**"],
    FilterCondition: '=[Table_Type] = "Q6_Labor"',
    AllowedUpdates: 0,
    UpdateMode: 7,
    IsValid: true,
    Visibility: "ALWAYS",
    DisableAutoUpdate: false
  }
  ```
- **State Mutation**: When dispatching via Redux `SET_EDITOR_OPTIONS`, update `dict["AppData.TableSlices"] = slicesArray`.

---

### 4. Browser DevTools Console Execution Protocol (SOP-A5)
- **Root Cause of Past Syntax Errors**:
  - **Windows Clipboard Truncation**: Pasting code blocks longer than 60–70 lines into Chrome DevTools frequently truncates tokens mid-stream, triggering `Uncaught SyntaxError: Invalid or unexpected token`.
  - **Multi-Byte Unicode Mangling**: Unicode box-drawing characters (`╔═`, `║`) or emojis (`🚀`, `✅`, `❌`) corrupt clipboard buffers on Windows.
- **Permanent Preventive Rules**:
  - **Strict Pure ASCII**: Use plain ASCII text only (`[OK]`, `[ERROR]`, `===`). Zero multi-byte unicode in JS literals.
  - **Bite-Sized Chunks (<60 Lines)**: Split multi-step automations into Step 1 (Schema/Slices) and Step 2 (Form/View).
  - **Dual Delivery**: Always persist the complete script in `projects/<project>/scripts/` first, then provide bite-sized snippets in chat.
  - **Pre-Validation**: Always validate scripts with `node -c <file>.js` before providing them.

---

### 5. Display Name Division / Formula Parsing Gotcha
- **Problem**: In AppSheet schemas, unquoted DisplayNames containing hyphens, slashes, or special symbols (e.g. `Women-led Enterprise`, `Sales/Turnover`) get interpreted by the AppSheet formula engine as arithmetic operators (`-` subtraction, `/` division).
- **Rule**: All textual DisplayNames in Redux dispatches MUST be explicitly quoted as string formulas: `='="Text Label"'`.

---

## Domain & Field Study Learnings

### 6. AppSheet Survey Engine Patterns
- **Action Grid Navigation**: Using `LINKTOFILTEREDVIEW()` on the parent `Survey` Detail View allows field enumerators to jump smoothly between sub-modules without cluttering the UI.
- **GPS Coordinates**: In rural locations with intermittent GPS signals, initializing `Latitude` and `Longitude` with `HERE()` on form load prevents sync failures.

---

### 7. RAJEEVIKA / SRLM Enterprise Dataset Nuances
- **Trade Categorization**: District MIS records show 13 out of 16 districts are heavily dominated by Kirana/General Store and Tailoring. Sampling must actively enforce representation across secondary anchor trades (Dairy, Agri-input/trading, Food Processing).
- **Informal Financial Recall**: Rural women entrepreneurs rarely maintain formal paper ledgers. Investment and profit figures must be collected with range brackets alongside raw numbers to facilitate triangulation.

---

### 8. Data Integrity & Verification
- **Supervisor Spot-Checks**: Implementing a dedicated `SupervisorAudit` slice enables daily field verification of completed interviews, keeping rejection rates low before final data pipeline export.

---

### 9. AppSheet Form View Inline Child Tables & Redux Array Dispatch
- **REF_ROWS vs SELECT**: AppSheet Form View strictly requires `REF_ROWS("SliceName", "ParentRefCol")` to display the native `[ New ]` / `[ Add ]` button. A `SELECT(...)` expression is treated as a read-only list and will never render an Add button.
- **IsAPartOf Requirement**: Both `IsAPartOf` and `IsPartOf` must be `true` on the child reference attribute and within `TypeAuxData`.
- **Redux Schema Array Mutation**: When adding new Virtual Columns via `SET_EDITOR_OPTIONS`, setting individual path indices (e.g. `Attributes[300].Name`) fails to mutate arrays in the reducer. The full mutated array MUST be assigned directly: `dict["AppData.DataSchemas[" + sIdx + "].Attributes"] = updatedAttrsArray`.
- **Error 400 Root Cause & Native Clone Protocol**: Manually crafting Virtual Column objects for Redux often omits C# backend required fields or mishandles double-stringified `TypeAuxData.ElementTypeQualifier`, triggering HTTP 400 Bad Request on save. ALWAYS clone an existing native reverse reference (like `Related Survey_Tables`) via `JSON.parse(JSON.stringify(baseVC))` to guarantee 100% backend compatibility.

---

### 10. Context-Based Child Table Auto-Fill & Narrow Slice Column Filtering
- **Automatic Discriminator Population**: When using a single child table (`Survey_Tables`) for multiple questions across a survey, auto-fill `Table_Type` dynamically using `CONTEXT("View")` or `CONTEXT("Table")` inside `InitialValue`:
  `=IFS(IN("Labor", CONTEXT("View")), "Q6_Labor", IN("Turnover", CONTEXT("View")), "Q15_Turnover", IN("Capital", CONTEXT("View")), "Q19_Capital", IN("Loan", CONTEXT("View")), "Q20_Loan_Usage", IN("Trajectory", CONTEXT("View")), "Q22_Trajectory", TRUE, "Q6_Labor")`
- **Zero Field Contamination**: Narrow down each slice's `Columns` list in `AppData.TableSlices` to ONLY the specific question's physical columns. When AppSheet renders the child form for that slice, only that question's fields appear.
- **Dynamic Options and Labels**: Use `IFS([Table_Type] = "...", ...)` expressions on `Row_Item.Valid_If` and `Row_Item.DisplayName` to provide context-specific choices without requiring separate sheets.

---

### 11. Column Description Suppresses DisplayName in Subtable / Form Headers
- **The Gotcha**: In AppSheet Form views, if a Virtual Column (such as `Related_Q6_Labor`) or child table has `Description` set, AppSheet prioritizes or renders the description text over `DisplayName`, or hides the display name title altogether in inline views.
- **The Rule**: For all inline subtable Virtual Columns and matrix questions, strictly leave `Description = ""` (empty string) in both the AppSheet column schema and in `AppVariables`. Rely solely on `DisplayName` (using `=LOOKUP(...)`) for all header labels so they are 100% visible and clean.

---

### 12. Typographic Apostrophes / Smart Quotes in Google Apps Script and Redux
- **The Gotcha**: Typographic quotes or right single quotation marks (e.g. `’` U+2019, such as in Rajasthani colloquial phrasing `राख’र`) trigger `SyntaxError: Invalid or unexpected token` in Google Apps Script / V8 parser when pasted via web browsers or clipboard on Windows.
- **The Rule**: All multilingual strings inside Google Apps Script `.gs` files and DevTools `.js` console scripts must strictly use pure ASCII standard quotes `"` or `'` and standard unicode characters. Typographic smart quotes (`’`, `‘`, `“`, `”`) must be replaced with standard spelling (e.g. `राखकर` instead of `राख’र`) or plain ASCII quotes.

---

### 13. C# Backend Deserializer & Native Action Schema Protocol (Error 400 Resolution)
- **The Root Cause**: AppSheet's cloud backend is built on .NET / C# (`Jeenee.DataTypes.dll`). When Redux dispatches `SET_EDITOR_OPTIONS` and triggers a Cloud Save, the backend Newtonsoft.Json deserializer parses the incoming JSON objects strictly into typed C# classes. If a property name is wrong, an enum value is invalid, or the `$type` metadata is misplaced, the server throws `TypeNotFoundException` or deserialization failure, responding with `HTTP 400 Bad Request: Something went wrong and your changes couldn't be saved`.
- **The Discovery (Module 663518)**: By reverse-engineering AppSheet's Webpack bundles, we uncovered the exact C# schemas:
  - **Add Row Action**:
    - **Class Type**: `Jeenee.DataTypes.DataActionAddRowTo, Jeenee.DataTypes` (NOT `DataActionAddRow`).
    - **ActionType Enum**: `"ADD_RECORD_TO"` (NOT `"ADD_ROW_TO_ANOTHER_TABLE"`).
    - **Target Table Property**: `"ReferencedTable"` (NOT `"ReferencedTableName"`).
    - **Column Values Mapping**: `"Assignments": [ { "Column": "colName", "Value": "formula" } ]` (NOT `"InputParametersUsed"`).
    - **`$type` Placement**: Must reside EXCLUSIVELY inside `ActionDefinition`. Root action object must NEVER have `$type` at its top level.
  - **Composite Group Action**:
    - **Class Type**: `Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes`.
    - **ActionType Enum**: `"COMPOSITE"`.
    - **Children List**: `"Actions": [ { "ActionName": "Action1" }, { "ActionName": "Action2" } ]`.
  - **Process Node (Step in Bot Workflow)**:
    - **Class Type**: `Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes`.
    - **NodeType Enum**: `"RUN_ACTION"`.
    - **Required Fields**: `"ExprLookup": {}`, `"InputAssignments": []`, `"OutputTableName": null`, `"Comment": null`, `"IsValid": true`, `"Visibility": "ALWAYS"`, `"DisableAutoUpdate": false`.

---

### 14. AppSheet Automation Bot Architecture (Bots, Events, Processes & Tasks)
- **Architecture Model**: An AppSheet automation consists of three decoupled components linked by foreign names:
  1. **`Behavior.AppEvents`**: Defines WHEN the trigger fires (e.g. `Table: "Survey"`, `EventType: "Change"`, `ChangeType: "ADDS_ONLY"`).
  2. **`Behavior.AppProcesses`**: Defines WHAT workflow executes (e.g. `Table: "Survey"`, `ProcessNodes: [ IfElseNode, RunActionNode, ... ]`).
  3. **`Behavior.AppBots`**: The orchestrator linking Event to Process (`Event: "Event_Name"`, `Process: "Process_Name"`).
- **The Process Branching Model (`IF_ELSE`)**:
  - `IfElseNode` contains `Condition` (e.g. `=COUNT(SELECT(Survey_Tables[ID], [Survey_ID] = [_THISROW].[ID])) = 0`), `IfNodes: [ ... ]` (the YES branch), and `ElseNodes: [ ... ]` (the NO branch).
  - Both branches accept `RunActionNode` objects pointing to atomic or composite actions.

---

### 15. The "Cannot read properties of null (reading 'Task')" Canvas Bug & Prevention
- **The Crash**: Attempting to simulate mouse clicks or pointer events on SVG canvas nodes (`<circle>`, `(+)` icons under YES/NO branches) triggers AppSheet's React visual process editor handler `updateAppProcessNode`. This handler attempts to dereference `state.Behavior.Tasks`. If `Tasks` array does not contain an existing task template, the engine attempts `null.Task`, throwing `Uncaught TypeError: Cannot read properties of null (reading 'Task')` and freezing the visual editor.
- **The Rule**: NEVER attempt DOM click simulation or SVG pointer events on the visual automation flowchart canvas. ALWAYS mutate the Redux state tree directly (`state.appTemplate.history[0].appTemplate.Behavior.AppProcesses`) via `SET_EDITOR_OPTIONS`. Direct Redux state mutation bypasses UI event listener null pointer exceptions completely.

---

### 16. Master Composite Action Architecture (15 Matrix Child Rows One-Hit Generation)
- **Challenge**: The CmF survey requires 15 fixed child matrix rows in `Survey_Tables` whenever a new `Survey` record is submitted:
  - 3 Rows for Q15 Turnover (Peak, Average, Lean).
  - 6 Rows for Q6 Labor (Purchase, Production, Servicing, Marketing, Sales, Record Keeping).
  - 6 Rows for Q22 Business Trajectory (Sales, Income, Stock, Raw Materials, Finished Goods, Fixed Assets).
- **The Architecture Solution**:
  - Rather than 15 separate bot steps (which makes the workflow diagram unwieldy and slow), define:
    1. **15 Atomic Actions**: Each of type `ADD_RECORD_TO` assigning `ID = UNIQUEID()`, `Survey_ID = [_THISROW].[ID]`, `Table_Type = "..."`, and `Row_Item = "..."`.
    2. **1 Master Composite Action**: `Action_Auto_Create_All_Matrix_Rows` of type `COMPOSITE`, grouping all 15 atomic action names in its `Actions` array.
    3. **1 Single Bot Step**: Pointing the YES branch of `Check_Zero_Existing_Rows` to execute the master composite action.
  - Result: 100% atomic creation of all 15 rows in a single batch transaction.

---

### 17. Robust Multi-Tier Redux Store Discovery via React Fiber Traversal
- **Problem**: When an AppSheet editor page reloads, `window.appStore` is not attached by default. Querying arbitrary elements like `document.querySelector('#root')` often yields detached React roots where `.store` is undefined.
- **The Universal 4-Tier React Fiber Walker**:
  ```javascript
  function getStore() {
    if (window.appStore && window.appStore.dispatch) return window.appStore;
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      var fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
      if (!fKey) continue;
      var f = el[fKey];
      while (f) {
        if (f.memoizedProps?.store?.dispatch) { window.appStore = f.memoizedProps.store; return window.appStore; }
        if (f.stateNode?.store?.dispatch) { window.appStore = f.stateNode.store; return window.appStore; }
        f = f.return;
      }
    }
    return null;
  }
  ```
- **Rule**: Every console script must include this universal finder. Once found, store it globally to `window.appStore` for all subsequent operations.

---

### 18. Full-App Generation from SRS via Browser Console Engine (The End-to-End Blueprint)
- **The Vision**: A developer or AI agent given a functional Software Requirements Specification (SRS) can generate 100% of an enterprise AppSheet app without manual clicking in the GUI.
- **The 3-Phase Execution Pipeline**:
  - **Phase 1: Data Architecture (`AppData.DataSchemas`)**:
    - Add physical columns to Google Sheets, regenerate tables in AppSheet.
    - Run console script to configure column types, `Valid_If`, `InitialValue`, `Show_If`, and multilingual `DisplayName` formulas (`=LOOKUP(...)`).
    - Inject parent Virtual Columns with `=REF_ROWS(...)` and `IsAPartOf = true`.
    - Inject slices (`AppData.TableSlices`) with narrow column sets and `UpdateMode: 7`.
  - **Phase 2: Presentation Controls (`Presentation.Controls`)**:
    - Update Form views by synchronizing `ViewDefinition.ColumnOrder` and JSON-serialized `Settings.ColumnOrder`.
    - Update Deck / Table views with card formats and action buttons.
  - **Phase 3: Behavior & Automations (`AppData.DataActions` & `Behavior`)**:
    - Inject atomic `ADD_RECORD_TO` actions and `COMPOSITE` actions.
    - Inject `AppEvents`, `AppProcesses` with `IF_ELSE` branches and `RunActionNode` steps, and `AppBots`.
    - Trigger `SHOW_SAVE_BUTTON: true` and execute a single cloud save.
- **Speed & Reliability**: A process that normally takes 8 to 12 hours of manual clicking executes in **under 2 seconds** with **zero human error**.

---

### 19. Survey PDF Option Selection & Empty-String Checkbox Immunity Protocol
- **Root Cause**: When a question is skipped or unpopulated (`NaN` in survey data), resolving it to an empty string `""` causes Python substring matching (`"" in opt_label`) to evaluate to `True` for every option in the question. This resulted in both "Yes" and "No" checkboxes (`☑ Yes ☑ No`) being marked on unanswered questions (e.g., Section G Q3). Furthermore, loose substring checks like `"Illiterate" in "Illiterate but able to calculate"` caused dual selections.
- **Permanent Preventive Protocol**:
  1. Filter out all empty, whitespace, and `'nan'` strings from `selected_list`. If `clean_selected` is empty, return `False` immediately.
  2. Perform strict normalized exact matching (`norm_opt == s` or alphanumeric cleaned `c_opt == c_s`).
  3. Never use loose substring containment (`s in opt` or `opt in s`) on short words (<15 chars) or categorical labels (`Yes`, `No`, `Own`, `Illiterate`, `Single`, `SC`, `ST`).
  4. For skipped conditional questions, display both options unchecked and annotate with explicit reason: `(Not applicable — Respondent answered 'No' to Q1: Did not attend training)`.

---

### 20. Elimination of Substring Containment & Prefix Matching Across Long Sentences (Section C Q12 Fix)
- **The Incident**: In Section C, Question 12 (*"How do you maintain business transactions?"*), respondent `KAT-3` answered with 2 options in AppSheet: `RKT_RECEIPT_BILLS` (`"Receipt book/bills"`) and `RKT_DAILY_DIARY` (`"Maintain daily diary"`). However, the generated PDF rendered THREE checked boxes:
  - `[☑] Receipt book/bills`
  - `[☑] Maintain daily diary`
  - `[☑] Maintain daily diary as taught by OSF/SVEP CRP` (FALSE POSITIVE!)
- **Root Cause**: The script permitted substring containment (`c_s in c_opt` or `c_opt in c_s`) and prefix slicing (`[:20]`) for strings `>= 15` characters. Because `"Maintain daily diary"` (18 chars) is a strict substring of `"Maintain daily diary as taught by OSF/SVEP CRP"` (38 chars), the third option erroneously evaluated to `True`. Similarly, common prefixes caused collisions in marketing (`"I regularly share images on whatsapp..."` vs `"I regularly share images/reels on instagram..."`) and CRP contributions (`"They helped us to understand..."`).
- **Permanent Architectural Rule**:
  1. **Strict Normalized Equality ONLY**: Strictly NEVER use `in`, `startswith`, or prefix slices for any option string of ANY length. Always enforce `c_opt == c_s`.
  2. **EnumList Multi-Select Handling**: In AppSheet, comma-separated enums (e.g. `'RKT_RECEIPT_BILLS , RKT_DAILY_DIARY'`) represent distinct discrete choices. Each code resolves to exactly one title/enum value, which matches exactly one option label.
  3. **Bucket Overflow Mapping**: When surveys expand option ranges beyond the questionnaire (e.g., `INC_440K-480K` or `INC_18K_20K`), map them cleanly to the top-level bucket (`Above Rs 4,00,001` or `Above Rs 6000`) inside `resolve_val`.
  4. **Exhaustive Automated Verification**: Before any report compilation, run an exhaustive assertion checking that `len(checked_options) == len(raw_selected_items)` across all 123 questions for all respondents.
### 21. SubTable Recognition Protocol for Mixed-Input Matrix Questions (Section D Q6 Fix)
- **The Discovery**: In Section D, Question 6 (*"How has the income from the enterprise helped you financially?"*), the Word document originally styled the question as a multiselect ballot list. However, because statements c, d, e, and f require specific currency amounts ("Specify amount") while statements a, b, and g are Yes/No confirmations, the AppSheet application implemented this as an inline child subtable (`Question_Group = 'SubTable_BuisenesHelp'`) rather than storing it in the parent `Survey` table (`FinancialHelpFromIncome` column was left `NaN`).
- **The Issue**: When generating survey dossiers, inspecting only parent columns caused Q6 to render with completely blank checkboxes, omitting the respondent's actual recorded entries (`No`, `No`, `Rs 0`, `Rs 0`, `Rs 0`, `Rs 0`, `No`).
- **Permanent Preventive Protocol**:
  1. **Cross-Source Schema Audit**: Whenever a parent survey column evaluates to `NaN` across multiple respondents, immediately query `WCH - SubTable.csv` and `WCH - SubSubTable.csv` by matching question keywords or `ID` in `WCH - AppVariables.csv`.
  2. **Render as Data Matrix**: Render mixed-input and amount-specifying survey questions as structured 2-column or 3-column data tables (`<table class="survey-tbl">`) displaying statement text alongside formatted values (`Yes`/`No` or `Rs X,XX,XXX`).
  3. **Preserve Subtable Values**: Pull values dynamically using `st[(st['Question_Group'] == 'SubTable_BuisenesHelp') & (st['Question'] == q_id)]`, ensuring zero data loss and exact 1-to-1 parity with the mobile AppSheet application.

---

### 22. Mandatory Official SVGs for Footer Social Circles (Zero Emoji Hack Protocol)
- **The Issue**: In the initial report generator script, the 7 social media icon circles in the footer were rendered using unicode emojis (`🌐`, `in`, `▶`, `GH`, `📸`, `𝕏`, `💬`). In headless PDF generation, these emojis rendered inconsistently, producing generic or amateur glyphs rather than the clean, brand-approved OmmNoMi social icons.
- **Root Cause**: Reliance on unicode glyphs rather than embedding the official inline `<svg>` elements defined in `sop-html-reports`.
- **Permanent Preventive Protocol**:
  1. Strictly NEVER use unicode emoji characters or text letters inside footer social circles.
  2. Always use the official OmmNoMi inline `<svg>` vector icons with their exact brand colors:
     - **Website**: `#4285F4` (`viewBox="0 0 24 24"`)
     - **LinkedIn**: `#0A66C2` (`viewBox="0 0 24 24"`)
     - **YouTube**: `#FF0000` (`viewBox="0 0 24 24"`)
     - **GitHub**: `#181717` (`viewBox="0 0 24 24"`)
     - **Instagram**: `#E4405F` (`viewBox="0 0 24 24"`)
     - **X (Twitter)**: `#000000` (`viewBox="0 0 24 24"`)
     - **Discord**: `#5865F2` (`viewBox="0 0 24 24"`)
  3. Style with `width: 22px; height: 22px; border-radius: 50%; background: #f1f3f4; border: 1px solid #e5e7eb;` and `svg { width: 12px; height: 12px; fill: currentColor; }`.
  4. Vector SVGs produce razor-sharp print rendering and reduce PDF file size significantly compared to heavy emoji font embeds.

---

### 23. Dynamic Modular Survey Analysis Engine & Strict <= 300 Lines Limit Protocol
- **The Requirement**: The client requested a fully automated, dynamic survey analysis system that can adapt to live data updates across any district (starting with Dausa) and export to multiple formats (`.xlsx`, `.html`, `.csv`). A strict code quality invariant was set: **NO SINGLE FILE may exceed 300 lines**.
- **Architecture & Modular Decomposition**:
  1. `analysis_engine/file_resolver.py` (115 lines): Auto-detects survey files across CLI args, custom directories, `data/`, or `Downloads/`, and strips browser duplicate suffixes `(1)`.
  2. `analysis_engine/schema_loader.py` (164 lines): Dynamically parses `WCH - AppVariables.csv` to resolve questions, enterprise activities, capital sources, and handles bucket overflow normalization.
  3. `analysis_engine/excel_styler.py` (144 lines): Encapsulates brand fonts, fills, borders, number formatting (`FMT_CURRENCY = '"Rs " #,##0'`), table block rendering, and auto-fit columns.
  4. `analysis_engine/finance_builder.py` (224 lines): Builds Part A (29 activities x 14 sources) and Part B (11 usages x 14 sources) with dynamic sector subtotals and grand totals.
  5. `analysis_engine/matrix_builder.py` (214 lines): Builds the Social Category Matrix and Agency & Sourcing sheets.
  6. `analysis_engine/indicators_config.py` (103 lines) & `indicators_builder.py` (154 lines): Decoupled declarative configuration from computational rendering for Tables 1.0 to 28.0.
  7. `analysis_engine/html_report_builder.py` (183 lines): Generates the executive single-page HTML report following `sop-html-reports` with KPI cards and the symmetrical 2-row vector SVG footer.
  8. `generate_survey_analysis_dynamic.py` (156 lines): Unified CLI orchestrator for any target district.
  9. `analysis_engine/test_engine.py` (91 lines): Automated test suite verifying that every file is <= 300 lines, schema loading integrity, and verified deliverable outputs.
- **Permanent File Segregation Protocol**:
  - District analysis deliverables: `reports/district_analysis/<District>/` containing dedicated `excel/`, `html/`, and `csv/` subfolders.
  - Individual respondent questionnaires: `reports/Individual_Respondent_Dossiers/` (isolated from high-level district reports).

