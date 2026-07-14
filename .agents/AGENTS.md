# OmmNoMi Workspace Rules

Any coding agent working in this repository MUST strictly follow the OmmNoMi Brand Guidelines.

## 1. The Plain Text Identity (Mandatory Spelling)
* Never write the company name in lowercase, all caps, or other styles.
* It **must always** be spelled exactly as: **`OmmNoMi`**
* This CamelCase rhythm preserves the visual weight of our "Next-gen Integration" (N & i) and "Operational Management" (O & M) pillars.

## 2. Vibrant Color Palette & Hex Codes
When styling user interfaces, custom HTML components, or PDF reports, use the following exact hex codes:
* **Blue (Ethical & Excellence):** `#4285F4`
* **Green (Ecological & Equity):** `#34A853`
* **Red (Entrepreneurial):** `#EA4335`
* **Yellow (Enthusiasm):** `#FBBC05`
* **Purple (Empowerment):** `#673AB7`

## 3. Typography
* **Headings:** Modern, bold, geometric Sans-Serif (such as `Roboto`, `Open Sans`, or `Google Sans`).
* **Body Text:** Clean, highly legible text (such as `Roboto Serif` or standard body font stacks).

## 4. Visual Assets Directory
All raw brand images (logo icons, variations, and banners) are stored under:
* **Brand Assets Directory:** `file:///c:/Users/hardi/AppSheets/.agents/brand/`
* **Detailed Guidelines Markdown:** [OMMNOMI_BRAND.md](file:///c:/Users/hardi/AppSheets/.agents/brand/OMMNOMI_BRAND.md)

## 5. Documentation Style Guide (SRS, Audits, Work Updates)
All OmmNoMi documents must follow a strict, professional layout protocol:
* **Header Structure:** Every document begins with a clean header showing the OmmNoMi Brand inline text: `<span style="font-family:'Roboto',sans-serif;font-weight:900;"><span style="color:#4285f4;">Omm</span><span style="color:#34a853;">No</span><span style="color:#ea4335;">M</span><span style="color:#fbbc05;">i</span></span> Automation LLP`.
* **Badges:** Use a standardized right-aligned color badge to indicate the type of document (e.g. `INCIDENT REPORT` in `#4285F4`, `SRS` in `#673AB7`, `WORK UPDATE` in `#34A853`).
* **Metadata Grid:** Standardize metadata cards (Employee, Jurisdiction, Date, Status, etc.) in a grey container background (`#f8f9fa`) with thin borders (`#dadce0`) and rounded corners (`6px`).
* **Typography Hierarchy:**
  * Titles and Headings: `Roboto` (bold, geometric, clean).
  * Body, Descriptions, and Lists: `Roboto Serif` (serif, elegant, readable).
* **Section Dividers:** Separate major document sections with a horizontal line (`<hr>` or `---`) styled using the brand blue (`#4285F4`) or grey (`#dadce0`).
* **Highlight Color Coding:**
  * **Success/Action Completed:** Green (`#34A853`).
  * **Warning/Incident/High Priority:** Red (`#EA4335`).
  * **Informational/Low Priority:** Blue (`#4285F4`).
  * **Pending/Medium Priority:** Yellow (`#FBBC05`) or Purple (`#673AB7`).

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
- If dealing with schema structures, you must proactively rely on `.agents/skills/appsheet-utilities/scripts/parse_appdoc.py` to extract exact truth rather than guessing.
- If the HTML export is known to lack data (e.g., Enum values), proactively inform the user of this limitation immediately rather than waiting for an error to occur.
