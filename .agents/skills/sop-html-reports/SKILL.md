---
name: sop-html-reports
description: >
  Standard Operating Procedure for creating and styling OmmNoMi HTML and PDF reports.
  Use this skill when generating, modifying, or styling any exported document, PDF, incident audit,
  feature release report, SRS, or HTML template. Trigger on: "create report", "audit report",
  "HTML template", "PDF export", "feature release", "incident report", "work update document".
---

# HTML & PDF Reports — OmmNoMi Standard

> **When to use this skill:**
> - Generating a **new** HTML/PDF document of any type (incident audit, feature release, SRS, work update)
> - Applying or correcting **OmmNoMi branding** to an existing template
> - Reviewing whether an HTML report follows the colour, typography, layout, or header/footer standards
>
> **Do NOT use for:** plain Markdown documentation files, AppSheet in-app UI styling, or Google Docs.

This SOP defines the structure, styling, typography, CTA buttons, and header/footer rules for all OmmNoMi HTML templates used for PDF exports (e.g., Feature Release Reports, Incident Audits, SRS), matching `Orbit/Orbit_Comprehensive_Project_Report.html`.

---

## 1. Brand Identity & Spelling Rules (MANDATORY B1–B3)

- **Plain Text Identity (Rule B1):**
  - Always spell the company name strictly as **`OmmNoMi`** in CamelCase.
  - Never write `OMMNOMI`, `Ommnomi`, `OmmNomi`, or `ommnomi`.
  - In CSS, ensure `text-transform: none` is set on headers/tables where `OmmNoMi` appears so CSS transforms don't force all-caps.
- **Brand Colors (Rule B2):**
  - **Blue (Ethical & Excellence):** `#4285F4` (Primary blue: `#1a73e8`, dark blue: `#174EA6`)
  - **Green (Ecological & Equity):** `#34A853` (Text green: `#137333`)
  - **Red (Entrepreneurial):** `#EA4335`
  - **Yellow (Enthusiasm):** `#FBBC05` (Dark yellow text: `#b06000`)
  - **Purple (Empowerment):** `#673AB7`
- **Typography Hierarchy (Rule B3):**
  - **Body Text:** `Roboto Serif` (serif, elegant, highly legible; size `11px`, line-height `1.5`).
  - **Headings, Titles, Badges, Table Headers, & Brand Tags:** `Roboto` (bold, geometric, clean).

```css
body {
  font-family: 'Roboto Serif', Georgia, serif;
  font-size: 11px;
  line-height: 1.5;
  color: #202124;
}

h1, h2, h3, .sh, table th, .faq-q, .meta-label, .doc-type, .hero-title, .role-label, .control-badge, .fbrand, .sig-title {
  font-family: 'Roboto', sans-serif;
}
```

---

## 2. Mandatory Header & Hero Block Layout

Every report MUST use this exact hero block, logo row, document control block, and 4-color stripe:

```html
<div class="hero">
  <div class="hero-left">
    <div class="logo-row">
      <img class="logo-img" src="data:image/png;base64,..." alt="OmmNoMi Logo" />
    </div>
    <div class="hero-title">Report Title</div>
    <div class="hero-sub">Subtitle &nbsp;·&nbsp; Category &nbsp;·&nbsp; Type</div>
  </div>
  <div class="doc-control">
    <span class="control-badge">COMPREHENSIVE AUDIT</span>
    <span class="control-text">Doc Ref: ONM-XXX-2026-001</span>
    <span class="control-text">Version: v1.0.0</span>
    <span class="control-text">Date: July 31, 2026</span>
  </div>
</div>
<div class="stripe"></div>
```

### Critical Header Layout Rules:
1. **Single-Line Hero Title Constraint:**
   - Long hero titles (e.g. `Orbit HRMS — Comprehensive Audit & Strategic Enterprise Services`) MUST set `font-size: 15px; font-weight: 700; white-space: nowrap;` so the entire title fits cleanly on **ONE SINGLE LINE** across an A4 page width without orphan line wraps.
2. **Document Control Box Integrity:**
   - Apply `white-space: nowrap;` and `flex-shrink: 0;` to `.doc-control`, `.control-badge`, and `.control-text`. This prevents text like `COMPREHENSIVE AUDIT` or `Doc Ref: ONM-ORB-2026-002` from breaking awkwardly into multiple lines (e.g. `002` wrapping to a new line).
3. **Logo Image Aspect Ratio:**
   - Set `.hero .logo-img` with `height: 24px; width: auto; max-width: 220px; object-fit: contain; display: block;` to prevent horizontal distortion or overflow.

---

## 3. Mandatory Permanent Footer Structure

Every report MUST include the complete footer structure with the official logo image, full headquarters address, tagline, and circular social link icons:

```html
<div class="footer">
  <div class="footer-left">
    <img class="footer-logo-img" src="data:image/png;base64,..." alt="OmmNoMi Logo" />
    <div class="faddr">
      © OmmNoMi<br>
      1/1 Vill. Kalouta PO Mahun Teh. Karsog Distt. Mandi Himachal Pradesh, India 175010
    </div>
  </div>
  <div class="footer-right">
    <div class="footer-tagline">Unlocking Business Potential Through Automation</div>
    <div class="social-links">
      <a href="https://ommnomi.in" target="_blank" class="social-link" title="Official Website" style="color:#4285F4;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://www.linkedin.com/company/ommnomi/" target="_blank" class="social-link" title="LinkedIn" style="color:#0A66C2;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://github.com/OmmNoMi" target="_blank" class="social-link" title="GitHub" style="color:#181717;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://www.instagram.com/ommnomi_automation/" target="_blank" class="social-link" title="Instagram" style="color:#E4405F;"><svg viewBox="0 0 24 24">...</svg></a>
    </div>
  </div>
</div>
```

### Footer Styling Rule:
```css
.footer-logo-img {
  height: 20px;
  width: auto;
  max-width: 220px;
  object-fit: contain;
  display: block;
  margin-bottom: 2px;
}
.faddr {
  font-family: 'Roboto', sans-serif;
  font-size: 8.5px;
  color: #70757a;
  line-height: 1.35;
}
```

---

## 4. Integrated Executive Call-to-Action (CTA) Cards

When adding meeting booking links (e.g., Google Calendar) or interactive service invitations, **do NOT use floating pill buttons with heavy drop shadows** (`box-shadow: 0 2px 6px rgba(26,115,232,0.35)`). Use an **Integrated Executive CTA Card**:

```html
<!-- Executive Meeting Booking CTA Card -->
<div style="background: #f8f9fa; border: 1px solid #dadce0; border-left: 4px solid #1a73e8; border-radius: 6px; padding: 12px 18px; margin-top: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; gap: 16px;">
  <div style="text-align: left;">
    <div style="font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 11px; color: #1a73e8; margin-bottom: 2px; display: flex; align-items: center; gap: 6px;">
      <svg style="width:14px; height:14px; fill:#1a73e8;" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/></svg>
      <span>Schedule Extended Remote Services Discovery Meeting</span>
    </div>
    <div style="font-family: 'Roboto', sans-serif; font-size: 9.5px; color: #5f6368;">
      Book a 1-on-1 consultation call with our solution architects to explore extended workforce integration.
    </div>
  </div>
  <a href="https://calendar.app.google/87e2Beox78s9TUoo7" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; background: #1a73e8; color: #ffffff; text-decoration: none; font-family: 'Roboto', sans-serif; font-size: 10px; font-weight: 700; padding: 8px 16px; border-radius: 4px; white-space: nowrap; flex-shrink: 0;">
    <span>BOOK MEETING</span>
    <svg style="width: 11px; height: 11px; fill: currentColor;" viewBox="0 0 24 24"><path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3zm-2 11h-4V8h4V6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4h-2v4z"/></svg>
  </a>
</div>
```

---

## 5. Tile & Card Aesthetics (Flush Corner Badges)

All container tiles (cards, showcase modules) must follow clean floating tile aesthetics:
- **Background:** White (`#ffffff`).
- **Border:** Light grey (`1px solid #dadce0`).
- **Border Radius:** `6px`.
- **Top Accent Borders:** Color-coded 3.5px top border matching the module category (`#4285F4`, `#34A853`, `#FBBC05`, `#673AB7`).
- **Flush Top-Right Ribbon Tags:**
  ```css
  .card-badge-corner {
    position: absolute;
    top: 0;
    right: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 7.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    padding: 3px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    white-space: nowrap;
  }
  ```

---

## 6. Table Design

Tables must use `border-collapse: separate;` to preserve rounded corners and tile styling:

```css
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #dadce0;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  overflow: hidden;
  margin-bottom: 14px;
  font-size: 10px;
}

table th {
  background: #5f6368;
  color: #ffffff;
  font-weight: 600;
  text-align: left;
  padding: 8px 10px;
  font-size: 9px;
  letter-spacing: 0.3px;
  text-transform: none; /* Preserves exact CamelCase OmmNoMi */
}

table td {
  padding: 8px 10px;
  border-bottom: 1px solid #e8eaed;
  color: #3c4043;
  vertical-align: top;
}
```

---

## 7. Dynamic Associate Role & Signature Protocol

When creating author or reviewer signature blocks, dynamically fetch the associate's official designation, headline, link, and tagline from `https://ommnomi.in/associate/<username>`:

1. **Nomeshwer Sharma (`nomeshwer`):** `Founder & Automation Architect (Business Process Developer & Implementor)`
2. **Hardik Sharma (`whardiksharma`):** `Assistant Developer (Product Research & Development)`
3. **Neha Thakur (`neha`):** `Operations Associate (Data Hygiene & Quality Assurance Specialization)`

```html
<div class="signature-section">
  <div class="sig-box">
    <div class="sig-line"></div>
    <a href="https://ommnomi.in/associate/nomeshwer" target="_blank" class="sig-title">
      NOMESHWER SHARMA
      <svg style="width:9px; height:9px; fill:currentColor; margin-left:3px;" viewBox="0 0 24 24">
        <path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3zm-2 11h-4V8h4V6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4h-2v4z" />
      </svg>
    </a>
    <div class="sig-sub">Founder & Automation Architect (Business Process Developer & Implementor)</div>
    <div class="sig-quote">"Architecting robust, scalable enterprise automations that power business growth."</div>
  </div>
  ...
</div>
```

---

## 8. PDF Compilation Pipeline Command

When generating or updating PDF reports, compile HTML using headless Microsoft Edge to guarantee exact CSS print fidelity:

```powershell
python -c "
import subprocess
subprocess.run([
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '--headless',
    '--no-pdf-header-footer',
    '--print-to-pdf=C:\\Users\\hardi\\AppSheets\\projects\\Orbit\\Orbit_Comprehensive_Project_Report.pdf',
    'file:///C:/Users/hardi/AppSheets/projects/Orbit/Orbit_Comprehensive_Project_Report.html'
], capture_output=True, text=True)
"
```
