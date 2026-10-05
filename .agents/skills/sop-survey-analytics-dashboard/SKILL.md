---
name: sop-survey-analytics-dashboard
description: >
  Standard Operating Procedure for generating interactive survey analytics dashboards,
  multi-district/block filtering engines, dual-MIME spreadsheet clipboard copying (TSV + HTML),
  and dynamic pipeline synchronization from Google Sheets survey datasets.
---

# OmmNoMi SOP — Interactive Survey Analytics & Dashboard Protocol

> **OmmNoMi Automation LLP** | Standard Operating Procedure  
> **Target:** Interactive Analytics Dashboards, Multi-District Survey Engines, Client Deliverables  
> **Applicability:** All field survey analyses, impact assessments, and executive analytics tools.

---

## 1. Core Architecture & Deliverable Standards

### A1. Single-File Publishable Architecture
- The executive dashboard must compile to **1 single self-contained HTML file** (e.g., `CmF_Rajasthan_Survey_Analysis_Dashboard.html`).
- **Zero Server Dependency**: 100% offline-ready. Double-clicking the file in any browser (Chrome, Edge, Safari, Firefox) immediately loads all charts, filters, and tables.
- **Embedded Dataset & Logic**: All survey records, JSON schema mappings, typography, and styling must be directly embedded.

### A2. Multi-Select Dropdown Filter Engine
When dealing with multi-tiered geographical survey datasets (e.g. 33+ Districts and hundreds of Blocks):
- **Checkbox Dropdown Pattern**: Never use horizontal pill buttons that overflow screen width. Always use custom multi-select dropdown menus containing checkboxes for each district and block.
- **Bulk Action Controls**: Provide `Select All` and `Clear All` buttons inside each dropdown menu.
- **Live Counter Labels**: The dropdown trigger button must reflect active selection state (e.g. `All Districts (56)`, `Dausa (53)`, `2 Districts Selected`, `None Selected (0)`).
- **Auto-Close on Blur**: Automatically close open menus when clicking anywhere outside `.custom-dropdown`.

---

## 2. Dual-MIME Spreadsheet Table Clipboard Protocol

Clients and leadership frequently copy data points from dashboards into spreadsheets (Google Sheets / Excel) or reports.

### B1. 1-Click Copy on Every Table / Indicator
- Every question card, summary table, and tenure matrix must include a dedicated `Copy Table` button.
- **Instant Visual Feedback**: When clicked, the button must transition to **`Copied!`** in brand green (`#34A853`) with `.copied` class for 1.8 seconds, then seamlessly revert to `Copy Table`.

### B2. Dual-MIME Clipboard Engine (`text/html` + `text/plain`)
The clipboard dispatcher must write both MIME types simultaneously using `navigator.clipboard.write([new ClipboardItem(...)])`:
1. **`text/plain` (TSV — Tab-Separated Values)**:
   - Uses `\t` between columns and `\n` between rows.
   - When the user presses `Ctrl+V` in Google Sheets or Excel, values paste directly into native grid cells across exact rows and columns with zero distorted layout or merged text.
2. **`text/html` (Clean Inline-Styled Table)**:
   - Renders a clean `<table>` element with inline border styling, header background, and right-aligned numeric cells.
   - When pasted into Google Docs, Word, or Notion, it pastes as an already-formatted visual table.

### B3. Mandatory Data Provenance Header
Every copied table payload MUST embed top metadata rows answering the exact origin of the data:
```text
Table 1.0: Leadership Role in SHG / VO / CLF
Source Column: [In leadership role in SHG] | Master Sheet: 1.0_SHG_Leadership
Filter Scope: 53 Women Entrepreneurs (1 District · 1 Block selected)

Category / Indicator	Count (WE)	Share (%)
Holds Leadership Office	37	69.8%
General SHG Member	16	30.2%
Total Sample	53	100.0%
```
- **Line 1**: Table Number & Formal Question Title.
- **Line 2**: Original Survey Database Column name and Master Excel Sheet name.
- **Line 3**: Current Filter Scope (Districts, Blocks, Sample Size $N$).

### B4. Fallback Clipboard Execution
If `navigator.clipboard.write` is rejected (e.g. headless browser or restricted security context), the script must execute an automated fallback:
- Create a temporary invisible `<textarea>`, insert TSV text, call `document.execCommand('copy')`, and remove the element immediately.

---

## 3. Engineering & Code Integrity Invariants

### C1. Strict <= 300 Lines Limit per Module
To maintain high modularity and eliminate monolithic scripts:
- **No single Python or JavaScript file may exceed 300 lines**.
- Decouple analytical systems into focused modules:
  - `data_evaluator.py` ($\le 265$ lines): Core mathematical aggregators & survey record parsing.
  - `dashboard_provenance.py` ($\le 260$ lines): Lineage registry of source columns & Excel sheet names.
  - `dashboard_questions.py` ($\le 200$ lines): Question card markup & provenance badge generator.
  - `dashboard_copy_script.py` ($\le 180$ lines): Dual-MIME TSV + HTML clipboard formatter.
  - `dashboard_script.py` ($\le 260$ lines): Dropdown interaction engine & reactive DOM updates.
  - `dashboard_builder.py` ($\le 270$ lines): Master HTML assembler & JSON embedder.

### C2. Zero Inline Quote Interpolation (The `this.value` Invariant)
When generating HTML elements via string concatenation or Python multiline templates:
- **NEVER** interpolate string variables into inline single-quoted event handlers:  
  `onchange="toggleDistrict(\'' + code + '\')"` $\longrightarrow$ **FATAL SYNTAX ERROR** (Python unescapes quotes).
- **ALWAYS** pass `this.value` directly:  
  `<input type="checkbox" value="' + code + '" onchange="toggleDistrict(this.value)">`
- This completely eliminates quote escaping and guarantees zero console syntax crashes.

### C3. Pure ASCII Codebase (Rule A5)
- Never use emojis (`✅`, `❌`, `🚀`, `📋`) inside JavaScript string literals or Python string templates.
- Use clean plain-text indicators (`[OK]`, `[FAIL]`, `Copy Table`, `Copied!`) or standard HTML entities (`&middot;`, `&#9662;`).

---

## 4. OmmNoMi Brand & Presentation Standard

### D1. Lifetime Logo & Zero Duplicate Wordmark
- Header must display ONLY the official logo lockup image:
  `<img class="logo-img" src="{rel_logo}" alt="OmmNoMi Automation LLP">`
- Strictly NEVER place inline wordmark text (`<span>Automation LLP</span>`) next to `ommnomi_logo.png`.

### D2. Vibrant Color Tokens
- **Blue (Identity / General):** `#4285F4`
- **Green (Success / High Adoption / Live):** `#34A853`
- **Red (Critical / Warning / Capital Needs):** `#EA4335`
- **Yellow (Advisory / Commercial Focus):** `#FBBC05`
- **Purple (Empowerment / Training / Governance):** `#673AB7`

### D3. Mandatory Two-Row Symmetrical Footer
The exported dashboard footer must follow the exact 2-row center-aligned flex architecture:
- **Row 1**: Logo on left, Registered Address on right.
- **Row 2**: Tagline on left, 7 Official Vector SVGs on right (Website, LinkedIn, YouTube, GitHub, Instagram, X, Discord).

---

## 5. Automated Verification Checklist

Before publishing or delivering an updated analysis dashboard:
1. **Line Count Audit**: Run `test_engine.py` to verify every file in the engine is strictly $\le 300$ lines.
2. **JavaScript Syntax Verification**: Run `node -e "new Function(scriptMatch[1])"` to ensure zero syntax errors.
3. **Headless Browser Reload**: Verify zero console errors in Chrome DevTools (`<no console messages found>`).
4. **Copy Table Smoke Test**: Verify TSV clipboard output contains proper `\t` delimiters and complete provenance headers.

---

## 6. Mobile & Tablet Responsiveness Protocol

Executive clients frequently inspect dashboards from smartphones (iOS / Android) and tablets:
- **Mandatory Viewport Meta**: Always inject `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">`. Never omit this or mobile browsers will scale down the layout into unreadable microscopic desktop views.
- **Decoupled Stylesheet**: Place mobile media queries in `dashboard_styles.py` to preserve strict $\le 300$ line bounds.
- **Adaptive Breakpoints**:
  - Desktop ($> 768\text{px}$): 4-column KPI grid, 4-column metadata grid, 2/3-column card layouts, 230px dropdowns.
  - Tablet/Mobile ($\le 768\text{px}$): 2-column KPI grid, 2-column metadata, 1-column card layouts, 100% width dropdowns with $\ge 38\text{px}$ touch targets.
  - Small Mobile ($\le 480\text{px}$): 1-column KPI grid, 0 body padding (app-like container), and $\ge 16\text{px}$ input font size on login overlay to prevent iOS Safari auto-zoom bugs.
- **Touch-Friendly Horizontal Scrolling**: Tab navigation (`.cat-bar`) must use `overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch;` to allow smooth native swipe gesture navigation across question lenses.

