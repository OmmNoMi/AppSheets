# OmmNoMi AppSheet Workspace Rules

These rules apply to ALL tasks in this workspace. Any agent working here MUST follow them automatically, without waiting to be asked.

---

## Brand Rules

### B1. The Plain Text Identity (Mandatory Spelling)
* Never write the company name in lowercase, all caps, or other styles.
* It **must always** be spelled exactly as: **`OmmNoMi`**
* This CamelCase rhythm preserves the visual weight of our "Next-gen Integration" (N & i) and "Operational Management" (O & M) pillars.

### B2. Vibrant Color Palette & Hex Codes
When styling user interfaces, custom HTML components, or PDF reports, use the following exact hex codes:
* **Blue (Ethical & Excellence):** `#4285F4`
* **Green (Ecological & Equity):** `#34A853`
* **Red (Entrepreneurial):** `#EA4335`
* **Yellow (Enthusiasm):** `#FBBC05`
* **Purple (Empowerment):** `#673AB7`

### B3. Typography
* **Headings:** Modern, bold, geometric Sans-Serif (`Roboto`, `Open Sans`, or `Google Sans`).
* **Body Text:** Clean, highly legible serif (`Roboto Serif` or standard serif font stacks).

### B4. Visual Assets Directory
All raw brand images (logo icons, variations, and banners) are stored in this repository at:
* **Brand Assets Directory:** `.agents/brand/`
* **Mandatory Official Logo:** `.agents/brand/ommnomi_logo.png`
* **Detailed Guidelines:** [OMMNOMI_BRAND.md](.agents/brand/OMMNOMI_BRAND.md)

> Use **repository-relative paths** when referencing brand assets. Never hardcode absolute OS paths.

### B6. Mandatory Lifetime Logo Rule
* The official full-color horizontal lockup logo (`.agents/brand/ommnomi_logo.png`) is the **exclusive, mandatory logo** for all documents, reports, headers, and footers.
* Never substitute with third-party logos, outdated icons, or generic placeholders.


### B5. Documentation Style Guide (SRS, Audits, Work Updates)
All OmmNoMi documents must follow a strict, professional layout protocol:
* **Header Structure:** Every document begins with a clean header showing the OmmNoMi Brand inline text:
  `<span style="font-family:'Roboto',sans-serif;font-weight:900;"><span style="color:#4285f4;">Omm</span><span style="color:#34a853;">No</span><span style="color:#ea4335;">M</span><span style="color:#fbbc05;">i</span></span> Automation LLP`
* **Badges:** Use a standardized right-aligned color badge to indicate the type of document (e.g. `INCIDENT REPORT` in `#4285F4`, `SRS` in `#673AB7`, `WORK UPDATE` in `#34A853`).
* **Metadata Grid:** Standardize metadata cards (Employee, Jurisdiction, Date, Status, etc.) in a grey container background (`#f8f9fa`) with thin borders (`#dadce0`) and rounded corners (`6px`).
* **Typography Hierarchy:**
  * Titles and Headings: `Roboto` (bold, geometric, clean).
  * Body, Descriptions, and Lists: `Roboto Serif` (serif, elegant, readable).
* **Section Dividers:** Separate major document sections with a horizontal line (`<hr>` or `---`) styled using brand blue (`#4285F4`) or grey (`#dadce0`).
* **Highlight Color Coding:**
  * **Success / Action Completed:** Green (`#34A853`).
  * **Warning / Incident / High Priority:** Red (`#EA4335`).
  * **Informational / Low Priority:** Blue (`#4285F4`).
  * **Pending / Medium Priority:** Yellow (`#FBBC05`) or Purple (`#673AB7`).

### B7. Section Integrity & Anti-Cramming Protocol ("No Half-Half")
* **Zero Topic Splitting**: Never allow a section, table, matrix, or signature block to break across page boundaries. If a topic begins on a page, it must conclude on that exact same page. Expand page count rather than splitting or cramming.
* **Anti-Cramming ("No Chipku-Chipku")**: Maintain professional breathing room (minimum 10.5px font size for body text, 12–15px padding on cards, and 12–16px margins between sections).
* **Zero Orphan Word Drops**: Never allow solitary words in labels or headers to drop to a new line (e.g., "Total Engineering Scope" must never wrap "Scope" onto a line alone). Use `white-space: nowrap;` on title/metric containers.
* **Engineering Leads Formatting**: When displaying the two technical leads in metadata, format as:
  - Top line: `Nomeshwer Sharma` (linked to `https://ommnomi.in/associate/nomeshwer`)
  - Bottom line: `& Hardik Sharma` (linked to `https://ommnomi.in/associate/whardiksharma`, with `&` styled inline beside the name; never a lone `&` line).

### B8. Mandatory Two-Row Symmetrical Footer ("Aamne Saamne" Rule)
The final footer on all exported documents and reports MUST follow a strict 2-row center-aligned flex architecture:
* **Row 1 (Top Row)**:
  - **Left**: Official OmmNoMi Logo (`.agents/brand/ommnomi_logo.png`, height: ~23–24px).
  - **Right**: Registered Address (`Karsog, Mandi, Himachal Pradesh, India`, font-size: ~10px, weight: 500).
  - **Alignment**: `display: flex; justify-content: space-between; align-items: center; min-height: 24px;` (Logo & Address on the exact same horizontal baseline).
* **Row 2 (Bottom Row)**:
  - **Left**: Tagline (`Unlocking Business Potential Through Automation`, font-size: ~10px, italic).
  - **Right**: 7 Social Media Icon Circles (Website, LinkedIn, YouTube, GitHub, Instagram, X, Discord, diameter: 22px).
  - **Alignment**: `display: flex; justify-content: space-between; align-items: center; min-height: 24px;` (Tagline & Social Icons on the exact same horizontal baseline).
* **Hierarchy**: Left Column = Logo on top, Tagline below; Right Column = Address on top, Social Icons below.

---

## AppSheet Rules

### A1. Strict SOP Adherence
Whenever there is a documented Standard Operating Procedure (SOP) in a Skill (like `appsheet-module-migration`), execute the steps in the **exact order** specified. Do not jump ahead, and do not skip verification steps.

### A2. AppSheet Configuration Protocol
When instructing the user to configure AppSheet tables, ALWAYS separate the instructions strictly into:
1. **Google Sheets Level**: Physical columns to add/delete.
2. **AppSheet Level**: Re-generation of the table structure.
3. **Column Type Level**: Explicitly detailing `Type`, `Initial Value`, and crucially, ensuring `Ref` columns are correctly configured to avoid invalid dereference errors.
4. **Virtual Column Level**: VCs must ONLY be added in the AppSheet editor, never the Google Sheet.

### A3. Tool Usage Enforcement
- **Schema questions:** Always run `parse_appdoc.py` first to extract exact column/table truth. Never guess schema structures from memory.
- **Enum / options / config values questions:** Always run `parse_appvariables.py` alongside `parse_appdoc.py`. The AppDoc HTML does NOT capture AppVariable values — both scripts are required for a complete picture of the app.
- If either export is known to lack data, proactively inform the user of this limitation immediately rather than waiting for an error.

```bash
# Complete app context — run BOTH:
python3 .agents/skills/appsheet-utilities/scripts/parse_appdoc.py <AppDoc.html> --compact
python3 .agents/skills/appsheet-utilities/scripts/parse_appvariables.py <AppVariables.csv> --json
```

### A4. Modern Editor Bulk Column Automation (Redux Protocol)
When configuring properties (such as `DisplayName`, `AppFormula`, or `InitialValue`) across dozens or hundreds of columns in the modern AppSheet Web Editor:
- **NEVER** recommend manual copy-pasting for each individual column through the Expression Assistant modal.
- **NEVER** use brittle DOM automation or virtual scrolling (`ReactVirtualized__Grid`) loops which cause input rollbacks.
- **ALWAYS** use the direct Redux dispatch pattern:
  1. Access the Redux store via `window.appStore` or React Fiber traversal from `.ExpressionControl` / `[role="grid"]`.
  2. Map column names to target attributes in `state.appTemplate.history[0].appTemplate.AppData.DataSchemas[schemaIdx].Attributes`.
  3. Construct a batch dictionary:
     `nameValueDict['AppData.DataSchemas[' + schemaIdx + '].Attributes[' + idx + '].' + propName] = formula;`
  4. Dispatch `{ type: 'SET_EDITOR_OPTIONS', nameValueDict, recordHistory: true, ignoreConstraints: false, skipNavigation: false }`.
  5. Dispatch `{ type: 'SHOW_SAVE_BUTTON', value: true }` so the user can commit changes with a single click of the native cloud Save button.
  6. Always provide the clean-up snippet to restore normal state and delete temporary references afterwards.

### A5. DevTools Console Script Protocol (Zero Truncation & Zero Syntax Errors)
When delivering JavaScript scripts to run in the browser console (DevTools F12):
- **Pure ASCII Only**: Strictly NEVER use multi-byte unicode characters or emojis (`✅`, `❌`, `🚀`, `╔═`) inside JS string literals or console logs. Multi-byte chars cause Windows clipboard corruption and `Uncaught SyntaxError: Invalid or unexpected token`. Use plain ASCII markers: `[OK]`, `[FAIL]`, `[WARN]`, `[INFO]`, `===`.
- **Dual-Delivery Protocol**: Always save the complete script to a repository file under `projects/<project>/scripts/` first. Then provide a clean, compact snippet in chat.
- **Line Length & Payload Chunking**: Keep snippets strictly bite-sized (<60 lines per chunk) to eliminate clipboard buffer truncation. Always validate scripts with `node -c <file>.js` before providing them. Wrap in `(function(){ try { ... } catch(e) { console.error(e); } })();` to guarantee self-healing execution.

### A6. Single-Child-Table Multi-Matrix Subtable Protocol (Context Auto-Fill)
When multiple matrix/table questions (e.g. Labor, Turnover, Capital, Loans) must be filled as inline child tables:
- **Zero Sheet Fragmentation**: Store ALL matrix data in **1 single Google Sheet** (`Survey_Tables`) using a `Table_Type` discriminator column. Never create separate physical sheets for each matrix question.
- **Context-Based Auto-Fill**: Auto-fill `Table_Type` using `CONTEXT("View")` formula so the enumerator never has to choose the type manually:
  `=IFS(IN("Labor", CONTEXT("View")), "Q6_Labor", IN("Turnover", CONTEXT("View")), "Q15_Turnover", ...)`
- **Narrow Slice Columns**: Configure slices (`Slice_Q6_Labor`, etc.) whose `Columns` array contains ONLY the fields relevant to that question.
- **Native Parent VCs**: Parent table uses `=REF_ROWS("Slice_Name", "Parent_ID")` with `IsAPartOf = true` cloned from native reference templates to avoid Error 400.
- **Dynamic Options**: Use `IFS([Table_Type] = "...", ...)` on `Row_Item` for contextual labels and dropdowns.

### A7. Automation Bot & DataAction Redux Protocol (C# Deserializer Compliant)
When programmatically injecting AppSheet Automation Bots, Processes, or DataActions via DevTools console:
- **Zero Guessing on C# Backend Types**: AppSheet backend deserializer strictly validates JSON against internal C# types (`Jeenee.DataTypes`). Any unknown class name or invalid property returns `Error 400: Something went wrong and your changes couldn't be saved`.
- **Add Row Action Standards**:
  - `ActionType` MUST be `"ADD_RECORD_TO"` (never `"ADD_ROW_TO_ANOTHER_TABLE"`).
  - `ActionDefinition.$type` MUST be `"Jeenee.DataTypes.DataActionAddRowTo, Jeenee.DataTypes"` (never `DataActionAddRow`).
  - Target table key MUST be `"ReferencedTable"` (never `"ReferencedTableName"`).
  - Field mapping key MUST be `"Assignments": [ { "Column": "...", "Value": "..." } ]` (never `"InputParametersUsed"`).
  - Root Action wrapper MUST NOT contain `$type`. `$type` is ONLY placed inside `ActionDefinition`.
- **Composite / Grouped Action Standards**:
  - `ActionType` MUST be `"COMPOSITE"`.
  - `ActionDefinition.$type` MUST be `"Jeenee.DataTypes.DataActionComposite, Jeenee.DataTypes"`.
  - Child actions list MUST be `"Actions": [ { "ActionName": "..." } ]`.
- **Process Node (Step) Standards**:
  - Node running an action MUST use `"NodeType": "RUN_ACTION"` and `$type: "Jeenee.DataTypes.ProcessNodes.RunActionNode, Jeenee.DataTypes"`.
  - MUST supply mandatory backend fields: `"ExprLookup": {}`, `"InputAssignments": []`, `"OutputTableName": null`, `"Comment": null`, `"IsValid": true`, `"Visibility": "ALWAYS"`, `"DisableAutoUpdate": false`.
- **Idempotency Branch Standard**:
  - Every auto-population bot MUST use an If/Else branch (`NodeType: "IF_ELSE"`, `$type: "Jeenee.DataTypes.ProcessNodes.IfElseNode, Jeenee.DataTypes"`) with condition:
    `COUNT(SELECT(<ChildTable>[ID], [<ParentIdCol>] = [_THISROW].[ID])) = 0`
    to guarantee zero duplicate child row creations on subsequent edits.
- **Universal 4-Tier Store Discovery**:
  - Never rely on static element lookups. Always use recursive React Fiber traversal (`while(f) { f = f.return; }`) across `document.querySelectorAll('*')` to ensure store is located on newly loaded or refreshed pages.

### A8. Full-App Generation from SRS via Console Architecture
When an SRS (Software Requirement Specification) is provided, the complete AppSheet application can be generated in 3 clean, zero-error console stages:
1. **Stage 1 (Schema & Columns)**: Inject tables, physical/virtual columns, types, AppFormulas, and multilingual `=LOOKUP(...)` DisplayNames into `AppData.DataSchemas`.
2. **Stage 2 (Presentation & Views)**: Inject Form, Detail, Deck, and Table controls into `Presentation.Controls`. Synchronize both `control.ViewDefinition.ColumnOrder` array and serialized `control.Settings.ColumnOrder` string.
3. **Stage 3 (Behavior & Automation)**: Inject all atomic DataActions (`ADD_RECORD_TO`, `SET_COLUMN_VALUE`), Composite actions, AppEvents (`ADDS_ONLY`), AppProcesses (`IF_ELSE`, `RUN_ACTION`), and AppBots. Single cloud save commits the entire enterprise app in seconds.

---

## Learning & Evolution Rules

### L1. Autonomous SOP Self-Update Protocol (Zero Amnesia)
Whenever any task, bug fix, or edge-case is resolved:
- **Mandatory Autonomous Update**: The agent MUST NOT wait for the user to say "update the SOP". The agent must automatically identify what caused the error, determine the preventive rule, and immediately update the relevant SOP in `.agents/skills/<sop-name>/SKILL.md` or `.agents/AGENTS.md`.
- **Post-Fix Checklist**:
  1. What broke? (Root cause, e.g., clipboard truncation, unquoted display name division, illegal default NOW() formula).
  2. What is the permanent preventive rule?
  3. Update the target SOP file and commit the learning to git / workspace memory.
- **Slash Command Integration**: Remind the user they can also invoke `/learn` at any time to explicitly commit specific patterns to the agent's long-term memory.


