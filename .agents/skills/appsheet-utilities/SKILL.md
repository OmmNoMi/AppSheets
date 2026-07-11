---
name: appsheet-utilities
description: Scripts and utilities for AppSheet development, including the HTML documentation parser, Auto-Column Builder, and Schema Linter. Use this when you need to extract schema data, add columns to Google Sheets, or lint a schema for violations.
---

# AppSheet Utilities

This skill contains all utility scripts for AppSheet development.
All scripts are in the `scripts/` subdirectory.

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
