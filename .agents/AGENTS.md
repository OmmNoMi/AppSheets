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
* **Detailed Guidelines:** [OMMNOMI_BRAND.md](.agents/brand/OMMNOMI_BRAND.md)

> Use **repository-relative paths** when referencing brand assets. Never hardcode absolute OS paths.

### B5. Documentation Style Guide (SRS, Audits, Work Updates)
All OmmNoMi documents must follow a strict, professional layout protocol:
* **Header & Hero Block Layout:** Every report begins with the exact hero block structure, featuring the official full brand logo (`<img class="logo-img" src="data:image/png;base64,..." style="height: 28px; width: auto;" />`), clean title and subtitle, right-aligned doc control badge box, followed directly by the 4-color brand stripe:
  ```html
  <div class="hero">
    <div>
      <div class="logo-row">
        <img class="logo-img" src="data:image/png;base64,..." alt="OmmNoMi Logo" style="height: 28px; width: auto;" />
      </div>
      <div class="hero-title">Report Title</div>
      <div class="hero-sub">Subtitle &nbsp;·&nbsp; Category &nbsp;·&nbsp; Type</div>
    </div>
    <div class="doc-control">
      <span class="control-badge">BADGE</span>
      <span class="control-text">Doc Ref: ONM-XXX-2026-001</span>
      <span class="control-text">Version: v1.0.0</span>
    </div>
  </div>
  <div class="stripe"></div>
  ```
* **Badges:** Use a standardized right-aligned color badge to indicate the type of document (e.g. `INCIDENT REPORT` in `#4285F4`, `SRS` in `#673AB7`, `WORK UPDATE` in `#34A853`).
* **Dynamic Associate Signatures (For Any Team Member):** Whenever an author or reviewer signature is created in a report, dynamically fetch their official role, headline, link, and tagline from their live OmmNoMi associate profile page at `https://ommnomi.in/associate/<username>` (e.g., `whardiksharma` → `Assistant Developer (Product Research & Development)`, `nomeshwer` → `Founder & Automation Architect (Business Process Developer & Implementor)`).
* **Permanent Full Footer:** Every exported report MUST include the standard OmmNoMi footer containing:
  - Official full brand logo image (`<img class="logo-img" src="..." style="height: 22px; width: auto;" />`) without duplicate text underneath
  - Headquarters address (`Karsog, Mandi, Himachal Pradesh`)
  - Tagline (`Unlocking Business Potential Through Automation`)
  - Full social media SVG icons (Website, LinkedIn, GitHub, YouTube, Instagram, X, Discord).
  * **Warning / Incident / High Priority:** Red (`#EA4335`).
  * **Informational / Low Priority:** Blue (`#4285F4`).
  * **Pending / Medium Priority:** Yellow (`#FBBC05`) or Purple (`#673AB7`).

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
