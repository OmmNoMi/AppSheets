# Project Handover Document: SHALI KUL™ Web Platform

**Project Name:** SHALI KUL™ Official Product & B2B Web Platform  
**Repository:** [https://github.com/OmmNoMi/Biz_ShaliKul.git](https://github.com/OmmNoMi/Biz_ShaliKul.git)  
**Primary Branch:** `main` (Latest Commit: `ee45301`)  
**Deployment Target:** Frappe version-16 App (`shali_kul`) / WSL2 Ubuntu-26.04  
**Primary Endpoint:** `http://localhost:8000/ShaliKul`  
**Brand:** SHALI KUL™ (Automotive Thermal & Radiator Fluids)  
**Date of Handover:** 2026-10-29  

---

## 1. Executive Summary

The **SHALI KUL™** web portal has been designed, refined, and consolidated into an ultra-clean, high-conversion, legally safe digital storefront. The site caters to automobile spare parts retailers, mechanic workshops, commercial fleet managers, and vehicle owners across India.

### Core Objectives Delivered:
1. **Single-File Architecture:** Consolidated all disparate code and templates into a unified, clean production template: `ShaliKul.html`.
2. **100% Legal & Regulatory Shield:** Complete elimination of unauthorized government certifications (BIS / IS 5759, NABL, Legal Metrology) and false OEM endorsements that could pose legal risk to a private-label sole proprietorship.
3. **Responsive Dual-Mode UX:** Overhauled mobile comparison section from an unreadable squished 3-column table into touch-friendly stacked cards, while preserving the spacious corporate table on desktop viewports.
4. **Minimal, High-Prestige Navbar:** Reduced navigation clutter to 4 concise, single-line links (`Products`, `Applications`, `Why Shali Kul`, `Dealers`) with a streamlined circular WhatsApp action and single high-impact CTA button.
5. **Asset & Footprint Optimization:** Removed ~10 MB of unused 3D meshes and redundant backups, resulting in a lightweight, lightning-fast application.
6. **Version Control Deployment:** Initialized and cleanly pushed the entire verified application structure to GitHub.

---

## 2. GitHub Repository & Codebase Structure

The clean codebase is hosted at **[OmmNoMi/Biz_ShaliKul](https://github.com/OmmNoMi/Biz_ShaliKul)**:

```
Biz_ShaliKul/
├── .gitignore                      # Git ignore rules (pycache, backups, OS files)
├── README.md                       # Repository overview and setup guide
├── ShaliKul.html                   # Standalone single-file HTML for browser preview
├── pyproject.toml                  # Frappe app metadata
├── license.txt                     # MIT License
└── shali_kul/
    ├── __init__.py                 # Python package init
    ├── hooks.py                    # Website routing and app hooks
    ├── modules.txt                 # Frappe modules declaration
    ├── patches.txt                 # Database/schema patch tracking
    ├── public/
    │   ├── icons/                  # High-precision vector brand assets (SVG)
    │   │   ├── shali-kul-logo.svg
    │   │   ├── shali-kul-logo-white.svg
    │   │   ├── shali-kul-logo-stacked.svg
    │   │   ├── shali-kul-logo-mono.svg
    │   │   ├── shali-kul-icon.svg
    │   │   └── shali-kul-emblem.svg
    │   ├── manifest.json           # Web app manifest configuration
    │   └── sw.js                   # Lightweight service worker
    └── www/
        ├── ShaliKul.html           # Unified production website template
        └── ShaliKul.py             # Server-side context controller
```

---

## 3. Legal & Business Model Compliance Shield

> [!IMPORTANT]
> The platform is strictly aligned with the commercial reality of a **Private-Label / Sole Proprietorship Trading Enterprise**. All content has been vetted against the **Consumer Protection Act, 2019** and **Bureau of Indian Standards Act, 2016**.

| Area | Previous Risky Implementation | Current Legally Safe Implementation |
| :--- | :--- | :--- |
| **Government Standards** | Claimed `IS 5759 Type II Certified` & `Bureau of Indian Standards` | Removed completely. Emphasizes real physical performance (anti-boil, anti-rust, freeze guard). |
| **Laboratory Testing** | Claimed `NABL Accredited Laboratory Benchmark` | Replaced with practical engine care comparisons (Tap Water vs SHALI KUL™). |
| **OEM Relationships** | Implied official certifications from Tata, Maruti, Mahindra, etc. | Reframed as universal aftermarket compatibility across vehicle segments. |
| **Entity Designation** | Displayed `SHALI KUL AUTOMOBILES` / `SHALI KUL ENTERPRISES` | Standardized strictly to **SHALI KUL™** across headers, copy, and copyright notices. |
| **Bottle Seals** | Included fake `IS 5759 CERTIFIED` gold seals on vector bottles | Replaced with `100% QUALITY GUARANTEED` authentic packaging seals. |

---

## 4. UI/UX Design System Specifications

### A. Color Palette
* **Deep Royal Blue:** `#0B4EA2` (Primary Brand & CTAs)
* **Dark Navy Accent:** `#062B5C` / `#031733` (Headers & Footers)
* **Soft Blue Tints:** `#F0F5FC` / `#E1EDFB` (Card Badges & Backgrounds)
* **Silver & Slate:** `#A7A7A7`, `#6E737B`, `#F8FAFC` (Canister Accents & Secondary Text)
* **Emerald Accent:** `#10B981` (WhatsApp Desk & Positive Benefits)

### B. Typography Hierarchy
* **Brand Headings:** `'Montserrat'`, sans-serif (Weights: 700, 800, 900)
* **Body & Technical Data:** `'Inter'`, system-ui, sans-serif (Weights: 400, 500, 600)

### C. Responsive Dual-Mode Comparison Engine
* **Desktop (`md:block`, min-width: 650px):** Formatted as a high-contrast corporate engineering comparison matrix between **SHALI KUL™ Coolant** and **Normal Tap Water / Cheap Dyes**.
* **Mobile (`block md:hidden`):** Replaces squished 3-column table with 6 dedicated comparison cards:
  1. *Boil-Over Prevention* (+128°C under pressure vs 100°C boil-over)
  2. *Rust & Brown Sludge* (Active anti-rust inhibitors vs brown sludge)
  3. *Radiator Tube Choking* (Anti-scaling chemistry vs lime-scale deposits)
  4. *Water Pump Life* (Mechanical seal lubrication vs pump seal failure)
  5. *Sub-Zero Winter Protection* (Freeze guard vs cracked engine blocks)
  6. *Safety on Aluminum* (Multi-metal safe vs head gasket corrosion)

---

## 5. Product Packaging Suite

The platform highlights 4 standardized industrial packaging configurations using realistic SVG vector artwork (eliminating heavy 3D GLB load times):

1. **1 Litre Retail Top-Up Bottle:** Anti-slip finger grips, narrow neck, IS-ready retail counter format.
2. **5 Litre Heavy-Duty Jerrycan (Best-Seller):** Ergonomic molded top carry handle, fluid level sight gauge, dual-tone silver/blue body.
3. **20 Litre Garage Bulk Carboy:** Heavy-duty reinforced container for multi-bay workshops and earthmovers.
4. **210 Litre Commercial Drum:** Cold-rolled steel barrel in royal blue enamel with dual rolling hoops and 2" bung closure.

---

## 6. Server & Deployment Operations Runbook

### Environment Details:
* **Operating System:** Ubuntu 26.04 LTS (WSL2 on Windows host)
* **Framework:** Frappe Framework version-16
* **App Directory:** `/home/hardi/frappe-bench/version-16/apps/shali_kul`
* **Local Master File:** `c:\Users\hardi\Downloads\Hardik Download\ShaliKul.html`

### Starting the Local Development Server:
```bash
# In WSL:
cd /home/hardi/frappe-bench/version-16
bench serve --port 8000
```

### Routing Rules (`shali_kul/hooks.py`):
All route variants cleanly point to `ShaliKul.html`:
```python
website_route_rules = [
    {"from_route": "/ShaliKul", "to_route": "ShaliKul"},
    {"from_route": "/shali-kul", "to_route": "ShaliKul"},
    {"from_route": "/shali_kul", "to_route": "ShaliKul"},
    {"from_route": "/shalikul", "to_route": "ShaliKul"},
]
```

### Git Workflow for Future Updates:
```bash
# From Windows PowerShell or WSL:
cd \\wsl$\Ubuntu-26.04\home\hardi\frappe-bench\version-16\apps\shali_kul
git status
git add -A
git commit -m "feat: description of update"
git push origin main
```

---

## 7. Handover Checklist & Verification Status

- [x] Unused `.bak` and duplicate `.html` files deleted.
- [x] Heavy 3D models (`models/`, `textures/`, `draco/`) removed from repository.
- [x] Navigation bar simplified to 4 clean links with single CTA.
- [x] Mobile comparison cards tested on 390x844 viewport (0 text wrapping issues).
- [x] Desktop table verified on 1280x800 viewport.
- [x] All BIS, NABL, and false OEM references removed.
- [x] Primary page tested via HTTP 200 OK on `http://localhost:8000/ShaliKul`.
- [x] Pushed and verified on GitHub `OmmNoMi/Biz_ShaliKul` (`main` branch).
