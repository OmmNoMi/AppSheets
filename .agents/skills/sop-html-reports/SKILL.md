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
> - Reviewing whether an HTML report follows the colour, typography, or layout standards
>
> **Do NOT use for:** plain Markdown documentation files, AppSheet in-app UI styling, or Google Docs.


This SOP defines the structure, styling, and typography for all OmmNoMi HTML templates used for PDF exports (e.g., Feature Release Reports, Incident Audits, SRS), matching `Orbit/feature_release_report.html`.

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

## 2. Branding and Colors (Knowledge Reference)
* **Brand Color Palette (For Knowledge & UI Accents Only — DO NOT use for custom logo construction):**
  * Blue: `#4285F4` (Ethical & Excellence)
  * Green: `#34A853` (Ecological & Equity)
  * Red: `#EA4335` (Entrepreneurial)
  * Yellow: `#FBBC05` (Enthusiasm)
  * Purple: `#673AB7` (Empowerment)

> ⚠️ **IMPORTANT LOGO RULE:** The brand color hex codes above are stored for knowledge and general UI accent styling (e.g. callout borders, badges). **Do NOT use individual span hex colors to manually construct or alter logos.** Always use the pre-built, standard logo components (`<img class="logo-img" ... />` and `.wm` class structure from `Orbit/feature_release_report.html`).

## 3. Mandatory Header & Hero Block Layout (REQUIRED IN EVERY REPORT)
Every report MUST use this exact hero block, logo row, document control block, and 4-color stripe:

```html
<body>

  <div class="page">

    <!-- Hero Block -->
    <div class="hero">
      <div>
        <div class="logo-row">
          <img class="logo-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYUAAAA6CAYAAACF0L/hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF10lEQVR4nO3df2xV9R3H8edd2tIW3K20QGmhIBaoQ9nKuh80Zky2YIxp2Z/RjWzZtky2zC26uGzZom7Z3+uWdZks2bK5mG2ZZIt/oIsR3UTjZky2uT823WDpx9ay0vKvdKWttKV87g9w23e1F27ve7t7T+/XIyF33/v1fT4H3n3f5/P9ns/JS0lJSRERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERESn3pIChwA356+f565+2/3mCvh/g6234+n3A+8C1wCXAdcBbgZvyyweBN/L/+4qIiIiI7K+1wPeAc4A84Dbgm4HrfwQcBhYB3we+CbwNeC5w7z8C7wV+C3wT6Ai8FxEREREp74wCXgN+Ffj7gX1bgR8Cj9sf3wYej3y8qTzSgNuAtwOfVUREJIfdC2zOny8M/H134L4L2V++1/P180X99pWvB94HfB/oAh4Dfh3+3QBgLPD2AfdV8m7g/0L/f5H/1p732i/z/7u/yPuKyEFqCtyzA3gD6A+8/jdwO/A13/37gC/7rm8C1gGbgNfsq2f5P78b+C7w3tDvr+b3e7f9ee1b+V/334pIiTEG+EXgnS8CXvPd3wb8JfD2XwPfjHzeZ9+v5+tr+b3+7rV8/XzR/kS1rXw9sDr8u7eB7wOv2p8d3/6uAn6Z/z8u8vX2vP6P2h9vAX4J/Dn/+/vA/b8b+fO61//jvd6v/9/Z/q0XfPf/GnjtN8CL4f8iIvvrceCtwDsr+a03f4Xv+gbffet996/23f+G7/58e2Xw1jbgA+BzwB7f525Vw3q/n13At/z/uW+961vea18P/L9mEREp9/wz8I/Am4Gf/wnwduDtzwTefr7vdU+8vQe4JPL5x0K/2+y7rw3vV+Hfl//evgJ3B/b/S1v5+v6eR+8O/V7t69v8d18E3h36Xee+ft5v7+X3+3n7/34GfCP8O1ER2X8PA58K3g/ffwPw/cDX6xO8/3/gK8BnA6/v3r/f/+5DvvvvB84Gvu2v9T8Zet+t2gZ8InD/LqAn0mfr+8+977/7b/tvRUTKjC3h3w7sLwfub/P144GvPwy8t+X8q8/j98rfA/188fV9vj17n591vv+j2lb+D13w+9v3s9a37Xl1fC3/9Z0f/P16X3ve37/N69m7+2Hk/b8I/f5j+7a9563229b4tovsX0vsn7S0x9t1vvteDdwf2L/Nd33b+tbf9X1+S/j+Ff7zU+DbwF/t71x527vP0L72+T7j/jJk1wLvh9uL7L6vFtk/d/4tIiIy0J6yv8C/7bt+h+/6zUDrfn2fB/hJ/vow4O/t/fOBL7m/pPnQ3j+P+Wv6b0fef9N3/2bfdQfwE9/nf8tflwHvtrd/tG+LiMiBe539V/o3+a999/44pL/1+j6vBvjL0O/Ptvf/w/+e0H7l23er+sB+wP6iHh8K/95W332vhb6X2b//Q1/jRERk8LX4r1Xv4H8u+Zf/Vp39Z/0e932+/X660H65pL9a/3s9+2fM7+vfvT1u49+79cAh/d0T+J6q2Z+71f+sL7Bfnf1FPhW5vV3gZ+/lX999/bxfHwH/11Wv+d/j9vN+fQJ0R+53n79+2v+ep+2/iIrIQToL+D1e16t17vXoB13e/7/pP++b3vv0bVvv037e96F9b9Dfs6B1W+D7jHstX43fK08/6Dfv2xveV/4t+8vQv+uuvt9n/bxfn3C/71f762v+b/N+3q83fPfvh99X5eLzH7+B15v99/nrfN8jIpKnttjftT/g9zvxHOC7vvsa+t2XgdXAH+x5vN+b/3297a7/bX7vXo204n3+p7fve47b3wH2t6C1+j3+93d5XwXeCexr9N2/wPf3x4BLfNfvAHoB98v9A+f+e+/q92Wtr3V6z/v2ffV/1/a+/73e13d9T7987+vf3vdB3++38r3/u8j3vN/er5O+nwtERPIUDby655e8rvSvwmt723b7r7v8r/bX9fP5d0WvvX+fCvz+/u6/u4mHj1r49vO+65uB233XN/muu78Y89fe813fAvweaPGfd7t/n5cBd/vv2yPvu2f3++u7/f/Z56t1vvvevQz4k++379/1v1/ru/++0O9X8d2/D7gc6Ihc/2z+/+t9+/1Uvv/b1wPvg/zL/1tEREpP4V9L6b+2sY3/l8Z/tN9/bS/X8v0H9H85rZ8ve+2n/ffV8v2t59+G2x0rf/m92df/A7zc992f8a1vC2zrCexr9b/a3y/2ve85gX0r7C/31/JtW+/b1w7c1+1/zXf9Nf+tf0P++/m+r/H//Z++9z1m//+Ff1/+d1f4+/f3+/b761T7b99r++z9/d13r+W3rfb/+7nwv93X/yYiIlL+7QC+b//1sLftD+2v02r3eZ/veWfofX+zv17p2/fa//5S4HO2069c9+K/1n++B+i2v8u1P1f6t/n//Qbf9T1s/wtbvfY1229f3+l//Wnk/S8Grt+7H/W///PA9X3A24HzC/m37+/2/fUv/r+97ft923efz/j/3u/x3efb1wPv83/rA7bTbxvxfv6X/+cO+P1FREREpCwwX9yXn++vd9vf2d3vevT0yO/eCvwe7pfcH7A/53m996u32/f3eW70j5b8Pbfj3j04Fbnfbntdxfu3sX9/vK/d/trH+8v/+9/99a/u/1sRERERERERERERERERERERERERERERERERkYL3L2vYcQ51S9V/AAAAAElFTkSuQQ=="
            alt="OmmNoMi Logo" style="height: 28px; width: auto;" />
        </div>
        <div class="hero-title">Report Title</div>
        <div class="hero-sub">Subtitle &nbsp;·&nbsp; Category &nbsp;·&nbsp; Type</div>
      </div>
      <div class="doc-control">
        <span class="control-badge">DOCUMENT BADGE</span>
        <span class="control-text">Doc Ref: ONM-XXX-2026-001</span>
        <span class="control-text">Version: v1.0.0</span>
      </div>
    </div>

    <div class="stripe"></div>

## 3. Mandatory Permanent Footer Structure
Every report MUST include the complete footer structure with the logo image and circular grey pill social link icons:
```html
<div class="footer">
  <div class="footer-left">
    <img class="logo-img"
      src="file:///C:/Users/hardi/.gemini/antigravity-ide/brain/0dc8f8be-5e32-41cf-8328-e260570740eb/media__1784026479240.png"
      alt="OmmNoMi Logo" style="height: 22px; width: auto; margin-bottom: 4px; display: block;" />
    <div class="faddr">Karsog, Mandi, Himachal Pradesh</div>
  </div>
  <div class="footer-right">
    <div class="footer-tagline">Unlocking Business Potential Through Automation</div>
    <div class="social-links">
      <a href="https://ommnomi.in" target="_blank" class="social-link" title="Official Website" style="color:#4285F4;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://www.linkedin.com/company/ommnomi/" target="_blank" class="social-link" title="LinkedIn" style="color:#0A66C2;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://www.youtube.com/@OmmNoMi" target="_blank" class="social-link" title="YouTube" style="color:#FF0000;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://github.com/OmmNoMi" target="_blank" class="social-link" title="GitHub" style="color:#181717;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://www.instagram.com/ommnomi_automation/" target="_blank" class="social-link" title="Instagram" style="color:#E4405F;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://x.com/ommnomi" target="_blank" class="social-link" title="X (Twitter)" style="color:#000000;"><svg viewBox="0 0 24 24">...</svg></a>
      <a href="https://discord.com/users/ommnomi" target="_blank" class="social-link" title="Discord" style="color:#5865F2;"><svg viewBox="0 0 24 24">...</svg></a>
    </div>
  </div>
</div>
```

## 4. Layout & Tiles (Box Aesthetics)
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

## 5. Signatures & Clickable Links
* Profile names in signatures must be clickable links targeting official OmmNoMi associate profiles (e.g., `https://ommnomi.in/associate/whardiksharma`, `https://ommnomi.in/associate/nomeshwer`).
* Links should be blue (`#1a73e8`) and include a standard SVG "external link" icon to denote clickability.

## 6. CSS Casing
* Do not force `text-transform: uppercase;` on body or answer text. Headings and badges may be uppercased.

## 7. Dynamic Associate Role & Signature Protocol (FOR ANY TEAM MEMBER)
When creating or signing reports, dynamically fetch the author's official title, headline, profile link, and tagline directly from their live OmmNoMi associate profile page at `https://ommnomi.in/associate/<username>`:

1. **URL Structure**: `https://ommnomi.in/associate/<username>` (e.g. `whardiksharma`, `nomeshwer`, etc.)
2. **Extract Profile Fields**:
   - **Role & Title**: Take the `.role` and `.headline` text from the profile hero.
   - **Tagline**: Take the `.tagline` quote text from the profile hero.
   - **Profile Link**: Target `https://ommnomi.in/associate/<username>` with an SVG external link icon.

```html
<!-- Generic Dynamic Signature Block Pattern -->
<div class="sig-box">
  <div class="sig-line"></div>
  <a href="https://ommnomi.in/associate/<username>" target="_blank" class="sig-title">
    <AUTHOR_FULL_NAME_UPPERCASE>
    <svg style="width:10px; height:10px; fill:currentColor; margin-left:4px;" viewBox="0 0 24 24">
      <path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3zm-2 11h-4V8h4V6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4h-2v4z" />
    </svg>
  </a>
  <div class="sig-sub"><ASSOCIATE_ROLE> (<ASSOCIATE_HEADLINE>)</div>
  <div class="sig-quote"><ASSOCIATE_TAGLINE></div>
</div>
```
