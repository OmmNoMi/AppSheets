---
name: sop-html-reports
description: Standard Operating Procedure for creating and styling OmmNoMi HTML and PDF reports. Use this skill when generating, modifying, or styling exported documents, PDFs, or HTML templates.
---

# HTML & PDF Reports — OmmNoMi Standard

This SOP defines the structure, styling, and typography for all OmmNoMi HTML templates used for PDF exports (e.g., Feature Release Reports, Incident Audits, SRS).

## 1. Typography Hierarchy
All OmmNoMi documents must follow this strict typography rule:
* **Body Text (Paragraphs, Lists, Table Data, FAQ Answers):** `Roboto Serif` (serif, elegant, highly legible).
* **Headings, Titles, Badges, Table Headers, and Brand Tags:** `Roboto` (bold, geometric, clean).

```css
body {
  font-family: 'Roboto Serif', Georgia, serif;
}

h1, h2, h3, .sh, table th, .faq-q, .meta-label, .doc-type, .doc-title, .role-label, .control-badge, .fbrand, .sig-title {
  font-family: 'Roboto', sans-serif;
}
```

## 2. Branding and Colors
* Use the official OmmNoMi color palette:
  * Blue: `#4285F4`
  * Green: `#34A853`
  * Red: `#EA4335`
  * Yellow: `#FBBC05`
  * Purple: `#673AB7`
* Use Blue `#4285F4` for accents (e.g., callout left borders).
* Use Purple `#673AB7` for specific headers like FAQ questions (`.faq-q`).
* Avoid "blue overload" — use dark grey (`#202124` or `#5f6368`) for text and table headers to ensure high contrast, keeping brand colors as accents.

## 3. Layout & Tiles (Box Aesthetics)
All container elements (tables, callouts, FAQs, checklists) should look like floating "tiles" with consistent styling:
* **Background:** White (`#ffffff`) or near-white (`#fdfefe`).
* **Border:** Light grey (`#dadce0` or `#e2e8f0`). Solid 1px.
* **Border Radius:** `6px` for all rounded corners (tables, cards).
* **Shadow:** Subtle box shadow (e.g., `box-shadow: 0 1px 3px rgba(0,0,0,0.05);`).

### Tables
To maintain the tile look, tables must *not* use `border-collapse: collapse;`.
```css
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #dadce0;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
}
table th {
  background: #5f6368;
  color: #ffffff;
}
```

## 4. Signatures & Clickable Links
* Profile names in signatures must be clickable links targeting the official OmmNoMi associate profiles (e.g., `https://ommnomi.in/associate/hardiksharma`).
* Links should be blue (`#1a73e8`) and include a standard SVG "external link" icon to denote clickability.
* Example HTML structure for signature title:
```html
<a href="https://ommnomi.in/associate/hardiksharma" class="sig-title" target="_blank">
  HARDIK SHARMA
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 4px;">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
</a>
```

## 5. CSS Casing
* Do not force `text-transform: uppercase;` on body or answer text. Let the natural casing type directly from the user's document display. Headings and badges may be uppercased.
