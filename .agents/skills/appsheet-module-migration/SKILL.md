---
name: appsheet-module-migration
description: Expertise in migrating AppSheet modules, tables, and workflows between different AppSheet applications (e.g., from BLUJ to ONDT or client branches like Studio 0172). Use this skill when the user asks to copy, port, or migrate a module or table between apps.
---

# AppSheet Module Migration Guidelines

When migrating modules (Tables, Views, Actions, Slices) between two different AppSheet applications, you must follow a strict, methodical approach to avoid schema mismatches, broken references, and AppSheet editor errors.

## 1. Schema Extraction & Comparison
- **Use `parse_appdoc.py`**: Always leverage the Python parsing script in `_Utilities/` to extract schema information from both the Source and Destination apps' HTML documentation.
- **Identify Gaps**: Do not just blindly copy. Map the missing columns, the legacy columns that should be deleted, and the specific Virtual Columns needed.
- **Enum Limitation**: Be aware that AppSheet's built-in HTML documentation **does not export hardcoded Enum/EnumList values**. If the parser misses Enum values, you must ask the user to manually verify them in the editor or migrate them to `AppVariables`.

## 2. Spreadsheet vs. Virtual Columns (Critical Pitfall)
- **Physical Columns**: Must be added to the backend data source (e.g., Google Sheets) *before* touching the AppSheet editor.
- **Virtual Columns (VCs)**: Must **NEVER** be added to the Google Sheet. They are created exclusively inside the AppSheet editor.
  - *Symptom of error*: If a user adds a VC to the Google Sheet, AppSheet will treat it as physical and fail to compute the AppFormula dynamically.
  - *Symptom of error*: If the user creates a VC with a dereference formula (e.g., `[EmployeeId].[Address]`) but forgets to set the base column (`EmployeeId`) to `Ref` type, AppSheet will throw an **"Invalid dereference"** error. Always verify base types!

## 3. Handling Missing Dependencies
Different apps often have slightly different foundation tables (e.g., `Employee`, `Fleet`).
- If a Source app formula relies on `[EmployeeId].[Address]` but the Destination app's `Employee` table does not track addresses, **delete the Virtual Column** or modify the formula. Do not leave broken formulas.
- If a Source app checks a specific tag (`=IN("DOT", [EmployeeId].[Role])`) but the Destination app lacks that column, provide a fallback (e.g., `=TRUE`) or prompt the user to add the missing tag structure.

## 4. Architectural Modernization (Technical Debt)
Migrating a module is the perfect time to upgrade its architecture:
- **Use AppVariables for Enums**: Instead of hardcoding Dropdown values in the editor, migrate them to the `AppVariables` table (or similar settings table). 
  - Standard Pattern: `=SORT(SPLIT(LOOKUP("YourKeyName", "AppVariables", "ID", "MultiValues"), ","), FALSE)`
- **Dynamic UI via Show Columns**: Break up massive forms (like a 100-column Audit table) using `Show` type columns (`Page Header` or `Section Header`).
- **Bots over Actions**: Migrate legacy grouped actions (e.g., rolling up status changes) into declarative AppSheet Bots (Data Change bots) for better performance and debugging.

## 5. Standard Operating Procedure (For the User)
Always present instructions to the user in this exact order:
1. **Google Sheet Updates**: List exactly which physical column headers to add and which legacy ones to delete.
2. **Regeneration**: Instruct the user to hit **Regenerate Structure** in AppSheet.
3. **Type Configuration**: List the column Types and Initial Values to set. (Explicitly mention changing `Text` to `Ref` where necessary).
4. **Virtual Columns**: List the VCs to add via the AppSheet editor along with their `AppFormula`.
