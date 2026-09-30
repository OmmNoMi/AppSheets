---
name: appsheet-utilities
description: Scripts and utilities for AppSheet development, including the HTML documentation parser, AppVariables processor, Auto-Column Builder, and Schema Linter. Use this when you need to extract schema data, parse AppVariables, add columns to Google Sheets, or lint a schema for violations.
---

# AppSheet Utilities

This skill contains all utility scripts for AppSheet development.
All scripts are in the `scripts/` subdirectory.

---

## ⚠️ New Developer Setup (One-Time, Per Machine)

`credentials.json` and `token.json` are **gitignored** and must be set up locally on each machine.

1. Go to [GCP Console](https://console.cloud.google.com/auth/clients?project=ommnomi-appsheet-integrations)
2. Click **OmmNoMi AppSheet Integration** → Download JSON
3. Rename the file to `credentials.json`
4. Place it at: `.agents/skills/appsheet-utilities/credentials.json`
5. Run any script — a browser popup will appear **once** for Google login. After that, `token.json` is saved automatically and no further login is needed.

> **Note:** Each developer logs in with their own Google account. They must be a member of `ommnomi.in` to access the GCP project.

---

## 1. parse_appdoc.py — Schema Parser

Extracts structured schema data from AppSheet's exported HTML documentation.

```bash
python3 scripts/parse_appdoc.py <input.html> --output <output.md>
```

**When to use:** ALWAYS run this before answering any schema questions. Never guess schema structures.

---

## 2. sheets_api.py — Auto-Column Builder

Safely appends new column headers to row 1 of a Google Sheet.

```bash
# Dry-run (safe, shows what would happen)
python3 scripts/sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "Col1,Col2,Col3"

# Live execution (writes to the sheet, requires manual 'YES' confirmation)
python3 scripts/sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "Col1,Col2,Col3" --execute
```

**What you need each time:**
- `SPREADSHEET_ID`: The long ID from your Google Sheet URL (e.g., `1BxiM...`).
- `TAB_NAME`: The exact name of the worksheet tab.
- `columns`: A comma-separated list of new column headers to add.

**First-time setup (one-time only):**
1. Go to https://console.cloud.google.com
2. Create a project (or use existing).
3. Enable the **Google Sheets API**.
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth Client ID**.
5. Application type: **Desktop App**.
6. Download the JSON file and save it as `.agents/skills/appsheet-utilities/credentials.json`.
7. Run the script once — a browser window will open for Google login. After logging in, a `token.json` will be saved automatically for all future runs.

**Safety:** Default mode is always dry-run. `--execute` flag + manual `YES` confirmation is required to write to production.

---

## 3. linter.py — Schema Linter

Analyzes a parsed schema markdown file and reports technical debt violations.

```bash
python3 scripts/linter.py <path_to_schema.md>

# Example:
python3 scripts/linter.py /Users/ommnomi/AppSheets/Projects/Navi/_AppDoc/Navi_schema.md
```

**What it checks:**
- ❌ Hardcoded Enum values (should use AppVariables pattern)
- ❌ Invalid dereferences (`[Col].[Field]` where `Col` is not a `Ref`)
- ❌ Tables missing a Key column
- ⚠️  Tables missing a Label column (causes Refs to show raw IDs)

**When to use:** Run after every major migration or before deployment to catch regressions.

---

## 4. parse_appvariables.py — AppVariables Processor

Parses the AppSheet **AppVariables CSV export** and produces:
- A grouped **Markdown reference** (AI-context-optimized, parallel to `parse_appdoc.py`)
- An optional **JSON export** for machine-readable cross-referencing and linting

> ⚠️  The AppDoc HTML alone does NOT capture AppVariable values. You MUST run this script
> alongside `parse_appdoc.py` to have a complete picture of the app.

```bash
# Minimal — writes output next to the CSV
python3 scripts/parse_appvariables.py <AppVariables.csv>

# Also emit JSON (for cross-referencing with linter or other scripts)
python3 scripts/parse_appvariables.py <AppVariables.csv> --json

# Scope to a specific tag group (e.g. only Options, Company, Email)
python3 scripts/parse_appvariables.py <AppVariables.csv> --filter-tag Options

# Custom output path
python3 scripts/parse_appvariables.py <AppVariables.csv> --output /path/to/output.md
```

**What it produces per variable:**
- `ID`, `Type`, `Tags`, `ValueControl`
- Resolved value (Enum label, Multi option list, Decimal, URL, Photo path, etc.)
- `EnumList` (dependent list for Enum-type variables)
- `UsedFor` and `Description` notes

**ValueControl types handled:**
| Control | Value Field Used |
|---------|------------------|
| `Multi` | `MultiValues` → rendered as bullet list |
| `Enum` | `EnumValue` + optional `EnumList` |
| `Decimal` | `Decimal` |
| `URL` | `URL` |
| `Photo` | `Photo` (AppResources path) + `URL` |
| `File` | `File` (AppResources path) |
| `Date` | `DateValue` |

**When to use:** ALWAYS run this alongside `parse_appdoc.py` before answering any questions
that involve Enum options, configuration values, rates, or company constants.

---

## 5. appsheet_redux_injector_template.js — Modern Editor Batch Column Injector

Atomic batch injector that sets column properties (`DisplayName`, `AppFormula`, `InitialValue`, etc.) across dozens or hundreds of columns simultaneously directly via AppSheet's Redux store.

```javascript
// Location: .agents/skills/appsheet-utilities/scripts/appsheet_redux_injector_template.js
```

**Key Advantages over DOM / Virtual Scroll Automation:**
- ⚡ **Instant Execution (<100ms)** for 200+ columns simultaneously.
- 🛡️ **Zero DOM Virtualization Dropouts:** Bypasses `ReactVirtualized__Grid` row recycling completely.
- 🎯 **Direct Redux State Commit:** Updates `appTemplate.AppData.DataSchemas[].Attributes[]` and activates the native AppSheet cloud Save button via `{ type: 'SHOW_SAVE_BUTTON', value: true }`.
- 🔒 **Self-Cleaning:** Automatically deletes temporary store references upon completion.

**When to use:** Whenever batch configuring more than 10 columns in the AppSheet modern web editor.
