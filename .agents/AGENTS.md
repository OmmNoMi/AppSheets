# Global AppSheet Workspace Rules

These rules apply to ALL tasks within this workspace. You MUST follow them automatically, without waiting for the user to ask you to follow them.

## 1. Strict SOP Adherence
Whenever there is a documented Standard Operating Procedure (SOP) in a Skill (like `appsheet-module-migration`), you must execute the steps in the **exact order** specified by the SOP. Do not jump ahead, and do not skip verification steps.

## 2. AppSheet Configuration Protocol
When instructing the user to configure AppSheet tables, ALWAYS separate the instructions strictly into:
1. **Google Sheets Level**: Physical columns to add/delete.
2. **AppSheet Level**: Re-generation of the table structure.
3. **Column Type Level**: Explicitly detailing `Type`, `Initial Value`, and crucially, ensuring `Ref` columns are correctly configured to avoid invalid dereference errors.
4. **Virtual Column Level**: VCs must ONLY be added in the AppSheet editor, never the Google Sheet.

## 3. Tool Usage Enforcement
- If dealing with schema structures, you must proactively rely on `parse_appdoc.py` to extract exact truth rather than guessing.
- If the HTML export is known to lack data (e.g., Enum values), proactively inform the user of this limitation immediately rather than waiting for an error to occur.
