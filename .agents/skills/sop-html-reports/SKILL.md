---
name: sop-html-reports
description: >
  Standard Operating Procedure for creating and styling OmmNoMi HTML and PDF reports.
  Use this skill when generating, modifying, or styling any exported document, PDF, incident audit,
  feature release report, SRS, or HTML template. Trigger on: "create report", "audit report",
  "HTML template", "PDF export", "feature release", "incident report", "work update document".
---

# HTML & PDF Reports — OmmNoMi Standard

## MANDATORY RULES (READ FIRST)

### Rule 1 — ONE FILE ONLY
Never create two separate files for the same day's deliverable. All work updates, feature releases, and incidents go into a **single HTML file**, compiled to **one PDF**.

### Rule 2 — USE THE TEMPLATE BELOW
Always use the embedded template as your structural base. Do **not** invent a new layout. Copy it, then fill in the content.

### Rule 3 — LOGO: Use `<img>` tag with repo-relative path
The logo image is at `.agents/brand/icon_logo.jpg` from the workspace root.  
When writing HTML files inside `Projects/Orbit/`, use:
```html
<img class="logo-img" src="../../.agents/brand/icon_logo.jpg" alt="OmmNoMi Logo" />
```

### Rule 4 — PDF COMPILATION: Always use `--print-to-pdf-no-header`
```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu \
  --print-to-pdf-no-header \
  --print-to-pdf="/path/to/output.pdf" \
  "/path/to/input.html"
```
Never use `--run-all-compositor-stages-before-draw`. Always use `--print-to-pdf-no-header` to remove the browser timestamp and URL from the PDF output.

### Rule 5 — FOOTER SOCIAL LINKS
Always include all 7 social icons in the footer: Website, LinkedIn, YouTube, GitHub, Instagram, X (Twitter), Discord.

### Rule 6 — SIGNATURES
Both signatories:
- **Nomeshwer Sharma** → `https://ommnomi.in/associate/nomeshwer` — Business Process Developer & Implementor
- **Hardik Sharma** → `https://ommnomi.in/associate/whardiksharma` — Assistant Developer · Product Research & Development

### Rule 7 — HEADER STRIPE POSITIONING & SPACING
- The 4-color OmmNoMi stripe (`#4285F4`, `#34A853`, `#EA4335`, `#FBBC05`) must sit **strictly below** the logo lockup and page header block as an underline/divider.
- Always include explicit breathing room (`14px`–`20px` margin) below the colored bar before the first section heading or hero element.

### Rule 8 — MULTI-COLUMN CARDS & VERTICAL FILL QA
- In multi-column grids (like 2x2 Pillar Cards), ensure cards are **100% structurally identical**:
  1. Equal header and image dimensions (`58px`–`68px` thumbnail).
  2. A concise definition paragraph (`10px`–`11px`, `1.45` line-height).
  3. Structured checkpoints (6–7 high-impact, 3–5 word lines with green checkmarks `✓`).
  4. Single-line tech badges (`flex-wrap: nowrap`, `overflow: hidden`, `white-space: nowrap`) to guarantee symmetrical card heights across columns.
  5. Never enclose bullet items in cramped, undersized sub-boxes that create trailing internal whitespace.

### Rule 9 — ZERO TEXT OVERFLOW & FOOTER CLEARANCE
- **Ribbons & Badges**: Set `overflow: hidden` and test printable width (A4 printable width is ~`178mm` after padding). Keep pill badge text concise (e.g., `Logistics & Trade`, `Field Ops & Research`) so badges never clip or spill over container borders.
- **Footer Clearance**: Always apply `margin-top: 16px–20px` and `padding-top: 10px` above the footer border to ensure bottom cards never touch or crowd the footer.

### Rule 10 — GROUNDED TRUTHFUL METRICS ONLY
- Never fabricate unrealistic or unverifiable KPIs (e.g. "99.999% SLA across 500 apps").
- Anchor all metrics to verified project realities in the workspace:
  - Multi-company ERPNext architecture (Singapore 9% GST, Australia 10% GST, 9 physical branches).
  - Dynamic AppVariables-driven offline mobile survey engines.
  - Real-time biometric attendance sync, webhook triggers, and automated invoice/payment reconciliation.

---

## COMPLETE HTML TEMPLATE

Copy this template exactly. Replace only: `{{TITLE}}`, `{{DOC_REF}}`, `{{DATE}}`, `{{REQUESTED_BY}}`, `{{FEATURE}}`, `{{DELIVERY_DATE}}`, `{{PREPARED_BY}}`, `{{PREPARED_BY_URL}}`, `{{SUMMARY}}`, and the body content sections.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{TITLE}} — OmmNoMi</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Serif:ital,opsz,wght=0,8..144,400;1,8..144,400&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Roboto Serif', Georgia, serif;
      background: #f0f2f5;
      color: #202124;
      font-size: 11px;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      padding: 40px 20px;
    }

    @media print {
      body { background: #ffffff; padding: 0; }
      .page { box-shadow: none; border-radius: 0; max-width: 100%; width: 100%; margin: 0; min-height: auto; }
      .sh, table, .role-grid, .checklist, .callout, .signature-section, .faq-grid { page-break-inside: avoid; }
    }

    @page { size: A4; margin: 0; }

    .page {
      width: 100%; max-width: 210mm; min-height: 297mm;
      margin: 0 auto; background: #ffffff;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border-radius: 6px; display: flex; flex-direction: column; overflow: hidden;
    }

    .stripe { height: 6px; background: linear-gradient(to right, #4285F4 25%, #34A853 25% 50%, #EA4335 50% 75%, #FBBC05 75%); }

    /* HERO */
    .hero { background: #ffffff; padding: 24px 32px 20px; border-bottom: 1px solid #dadce0; display: flex; justify-content: space-between; align-items: flex-start; }
    .logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .logo-img { height: 32px; border-radius: 4px; }
    .wm { font-size: 18px; font-weight: 900; font-family: 'Roboto', sans-serif; }
    .wm .o { color: #4285F4; } .wm .n { color: #34A853; } .wm .m { color: #EA4335; } .wm .i { color: #FBBC05; }
    .wm .rest { font-size: 12px; font-weight: 300; color: #80868b; margin-left: 5px; }
    .hero-title { font-family: 'Roboto', sans-serif; font-size: 26px; font-weight: 900; color: #202124; margin-bottom: 4px; }
    .hero-sub { font-size: 11px; color: #5f6368; font-style: italic; }
    .doc-control { text-align: right; display: flex; flex-direction: column; gap: 3px; }
    .control-badge { font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 3px 8px; border-radius: 4px; display: inline-block; align-self: flex-end; background: #e8f0fe; color: #1a73e8; }
    .control-text { font-size: 9px; color: #9aa0a6; font-weight: 500; }

    /* META */
    .meta-section { background: #f8f9fa; border-bottom: 1px solid #dadce0; padding: 20px 32px; display: flex; flex-direction: column; gap: 10px; }
    .meta-row { display: grid; grid-template-columns: 140px 1fr; column-gap: 16px; align-items: baseline; }
    .meta-inline-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 4px; padding-top: 12px; border-top: 1px dashed #dadce0; }
    .meta-inline-group { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; background: #ffffff; padding: 8px 12px; border-radius: 6px; border: 1px solid #eaebed; flex: 1; min-width: 130px; position: relative; }
    .meta-label { font-family: 'Roboto', sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #5f6368; }
    .meta-value { font-size: 11px; font-weight: 500; color: #202124; }
    .meta-value.status-live { color: #137333; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; background: #e6f4ea; padding: 1px 6px; border-radius: 12px; font-size: 10px; }
    .emp-link { color: #1a73e8; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; font-weight: 700; }

    /* BODY */
    .body { padding: 24px 32px; flex: 1; }
    .executive-summary { background: #fdfefe; border: 1px solid #e2e8f0; border-left: 4px solid #34a853; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; }
    .summary-title { font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #2e7d32; margin-bottom: 4px; }
    .summary-text { font-size: 11.5px; color: #334155; font-weight: 500; }

    .sh { font-family: 'Roboto', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #202124; margin-top: 20px; margin-bottom: 10px; padding-bottom: 4px; border-bottom: 1.5px solid #dadce0; display: flex; align-items: center; gap: 6px; }
    .sh::before { content: ''; display: inline-block; width: 3px; height: 11px; background: #4285f4; border-radius: 2px; flex-shrink: 0; }
    .sh:first-of-type { margin-top: 0; }

    .callout { background: #fdfefe; border: 1px solid #e2e8f0; border-left: 4px solid #4285f4; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; font-size: 11.5px; color: #3c4043; line-height: 1.5; }
    .callout .nm { font-family: 'Roboto', sans-serif; font-weight: 700; color: #1a73e8; }

    /* TABLE */
    table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }
    table thead tr { background: #5f6368; }
    table th { font-family: 'Roboto', sans-serif; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #fff; padding: 8px 12px; text-align: left; }
    table tbody td { border-bottom: 1px solid #e8eaed; }
    table tbody tr:last-child td { border-bottom: none; }
    table tbody tr:nth-child(even) { background: #f8f9fa; }
    table td { padding: 8px 12px; font-size: 11px; vertical-align: top; color: #3c4043; }
    table td:first-child { font-weight: 600; white-space: nowrap; color: #202124; }
    table td code { background: #f1f3f4; color: #202124; font-family: monospace; font-size: 10px; padding: 1px 5px; border-radius: 4px; border: 1px solid #dadce0; word-break: break-all; }

    /* CHIPS / ROLES */
    .role-label { font-family: 'Roboto', sans-serif; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .role-grid { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
    .chip { font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 20px; display: flex; align-items: center; gap: 4px; border: 1px solid transparent; }
    .chip.yes { background: #e6f4ea; color: #137333; border-color: #ceead6; }
    .chip.no { background: #fce8e6; color: #c5221f; border-color: #f5c6c2; }
    .dot { width: 5px; height: 5px; border-radius: 50%; }
    .chip.yes .dot { background: #34a853; } .chip.no .dot { background: #ea4335; }

    /* CHECKLIST */
    .checklist { list-style-type: none; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-bottom: 20px; }
    .checklist-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 11px; }
    .checklist-item:last-child { margin-bottom: 0; }
    .checklist-bullet { width: 12px; height: 12px; border: 1px solid #9aa0a6; border-radius: 3px; background: #ffffff; flex-shrink: 0; margin-top: 2px; }
    .checklist-text { color: #3c4043; }

    /* FAQ */
    .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
    .faq-card { background: #fdfefe; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; }
    .faq-q { font-family: 'Roboto', sans-serif; font-weight: 700; color: #673AB7; font-size: 10px; margin-bottom: 4px; }
    .faq-a { font-size: 10.5px; color: #475569; }

    /* SIGNATURE */
    .signature-section { display: grid; grid-template-columns: 1fr 1fr; column-gap: 40px; margin-top: 30px; margin-bottom: 10px; padding-top: 20px; border-top: 1px solid #dadce0; }
    .sig-block { display: flex; flex-direction: column; gap: 3px; }
    .sig-line { height: 35px; border-bottom: 1px dashed #9aa0a6; margin-bottom: 6px; }
    .sig-title { font-family: 'Roboto', sans-serif; font-size: 9.5px; font-weight: 700; color: #1a73e8; text-decoration: none; display: inline-flex; align-items: center; }
    .sig-sub { font-size: 9px; color: #5f6368; }
    .sig-quote { font-size: 8.5px; color: #80868b; font-style: italic; max-width: 250px; line-height: 1.3; margin-top: 2px; }

    /* FOOTER */
    .footer { background: #ffffff; color: #202124; padding: 20px 32px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #dadce0; }
    .fbrand { font-family: 'Roboto', sans-serif; font-size: 14px; font-weight: 900; line-height: 1; margin-bottom: 4px; }
    .fbrand .o { color: #4285F4; } .fbrand .n { color: #34A853; } .fbrand .m { color: #EA4335; } .fbrand .i { color: #FBBC05; }
    .fbrand .rest { font-size: 11px; font-weight: 300; color: #5f6368; margin-left: 4px; }
    .faddr { font-size: 9px; color: #5f6368; }
    .footer-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .footer-tagline { font-size: 10px; font-weight: 500; color: #5f6368; font-style: italic; }
    .social-links { display: flex; flex-wrap: nowrap; gap: 6px; align-items: center; justify-content: flex-end; }
    .social-link { color: #5f6368; display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: #f1f3f4; text-decoration: none; flex-shrink: 0; }
    .social-link svg { width: 11px; height: 11px; fill: currentColor; }
  </style>
</head>
<body>
  <div class="page">

    <!-- ═══════════ HERO ═══════════ -->
    <div class="hero">
      <div>
        <div class="logo-row">
          <img class="logo-img" src="../../.agents/brand/icon_logo.jpg" alt="OmmNoMi Logo" />
          <span class="wm">
            <span class="o">Omm</span><span class="n">No</span><span class="m">M</span><span class="i">i</span>
            <span class="rest">Automation LLP</span>
          </span>
        </div>
        <div class="hero-title">{{TITLE}}</div>
        <div class="hero-sub">Orbit HRMS &nbsp;·&nbsp; BLR World &nbsp;·&nbsp; {{SUBTITLE}}</div>
      </div>
      <div class="doc-control">
        <span class="control-badge">Client Deliverable</span>
        <span class="control-text">Doc Ref: {{DOC_REF}}</span>
        <span class="control-text">Version: v1.0.0</span>
      </div>
    </div>

    <div class="stripe"></div>

    <!-- ═══════════ META ═══════════ -->
    <div class="meta-section">
      <div class="meta-row">
        <div class="meta-label">Requested By</div>
        <div class="meta-value">{{REQUESTED_BY}}</div>
      </div>
      <div class="meta-row" style="margin-top:4px;">
        <div class="meta-label">Subject</div>
        <div class="meta-value">{{FEATURE}}</div>
      </div>
      <div class="meta-inline-row">
        <div class="meta-inline-group">
          <div class="meta-label">Date</div>
          <div class="meta-value">{{DATE}}</div>
        </div>
        <div class="meta-inline-group">
          <div class="meta-label">Delivery Date</div>
          <div class="meta-value">{{DELIVERY_DATE}}</div>
        </div>
        <div class="meta-inline-group">
          <div class="meta-label">Status</div>
          <div class="meta-value"><span class="status-live">✓ Live &amp; Verified</span></div>
        </div>
        <div class="meta-inline-group">
          <div class="meta-label">Prepared By</div>
          <div class="meta-value">
            <a href="{{PREPARED_BY_URL}}" target="_blank" class="emp-link">
              {{PREPARED_BY}}
              <svg style="width:11px;height:11px;fill:currentColor;" viewBox="0 0 24 24">
                <path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3zm-2 11h-4V8h4V6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4h-2v4z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════ BODY ═══════════ -->
    <div class="body">

      <!-- Executive Summary -->
      <div class="executive-summary">
        <div class="summary-title">Executive Summary</div>
        <div class="summary-text">{{SUMMARY}}</div>
      </div>

      <!-- ── SECTION: Add your sections below using .sh headings ── -->
      <div class="sh">Context &amp; Request</div>
      <div class="callout">
        <!-- Fill callout text here. Use <span class="nm">Name</span> for person references. -->
      </div>

      <!-- ── EXAMPLE TABLE ── -->
      <!--
      <div class="sh">Changes Made</div>
      <table>
        <thead><tr><th>Item</th><th>Detail</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>Example</td><td><code>value</code></td><td>description</td></tr>
        </tbody>
      </table>
      -->

      <!-- ── EXAMPLE FAQ ── -->
      <!--
      <div class="sh">Helpful FAQs</div>
      <div class="faq-grid">
        <div class="faq-card">
          <div class="faq-q">Question?</div>
          <div class="faq-a">Answer.</div>
        </div>
      </div>
      -->

      <!-- ═══════════ SIGNATURES ═══════════ -->
      <div class="signature-section">
        <div class="sig-block">
          <div class="sig-line"></div>
          <a href="https://ommnomi.in/associate/nomeshwer" target="_blank" class="sig-title">
            Nomeshwer Sharma
            <svg style="width:9px;height:9px;fill:currentColor;margin-left:4px;" viewBox="0 0 24 24">
              <path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3zm-2 11h-4V8h4V6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4h-2v4z"/>
            </svg>
          </a>
          <div class="sig-sub">Business Process Developer &amp; Implementor</div>
          <div class="sig-quote">To engineer self-sustaining, intelligent operational ecosystems that empower human creativity and eliminate friction.</div>
        </div>
        <div class="sig-block">
          <div class="sig-line"></div>
          <a href="https://ommnomi.in/associate/whardiksharma" target="_blank" class="sig-title">
            Hardik Sharma
            <svg style="width:9px;height:9px;fill:currentColor;margin-left:4px;" viewBox="0 0 24 24">
              <path d="M14 3h7v7h-2V6.41l-9 9-1.41-1.41 9-9H14V3zm-2 11h-4V8h4V6H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4h-2v4z"/>
            </svg>
          </a>
          <div class="sig-sub">Assistant Developer &middot; Product Research &amp; Development</div>
          <div class="sig-quote">To build technical solutions that keep the product at the cutting edge of innovation.</div>
        </div>
      </div>

    </div><!-- /.body -->

    <!-- ═══════════ FOOTER ═══════════ -->
    <div class="footer">
      <div class="footer-left">
        <div class="fbrand"><span class="o">Omm</span><span class="n">No</span><span class="m">M</span><span class="i">i</span><span class="rest">Automation LLP</span></div>
        <div class="faddr">Karsog, Mandi, Himachal Pradesh</div>
      </div>
      <div class="footer-right">
        <div class="footer-tagline">Unlocking Business Potential Through Automation</div>
        <div class="social-links">
          <a href="https://ommnomi.in" target="_blank" class="social-link" title="Website" style="color:#4285F4;">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/ommnomi/" target="_blank" class="social-link" title="LinkedIn" style="color:#0A66C2;">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.youtube.com/@OmmNoMi" target="_blank" class="social-link" title="YouTube" style="color:#FF0000;">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://github.com/OmmNoMi" target="_blank" class="social-link" title="GitHub" style="color:#181717;">
            <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a href="https://www.instagram.com/ommnomi_automation/" target="_blank" class="social-link" title="Instagram" style="color:#E4405F;">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://x.com/ommnomi" target="_blank" class="social-link" title="X (Twitter)" style="color:#000000;">
            <svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
          </a>
          <a href="https://discord.com/users/ommnomi" target="_blank" class="social-link" title="Discord" style="color:#5865F2;">
            <svg viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
          </a>
        </div>
      </div>
    </div><!-- /.footer -->

  </div><!-- /.page -->
</body>
</html>
```

---

## PDF Compilation Command (Copy-Paste Ready)

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu \
  --print-to-pdf-no-header \
  --print-to-pdf="/Users/ommnomi/AppSheets/Projects/Orbit/OUTPUT_NAME.pdf" \
  "/Users/ommnomi/AppSheets/Projects/Orbit/OUTPUT_NAME.html"
```
