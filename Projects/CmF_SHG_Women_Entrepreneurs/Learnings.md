# Project Learnings & Knowledge Capture — CmF SHG Women Entrepreneurs Study

This document captures field learnings, data gotchas, and technical patterns discovered during the implementation of the CmF SHG Women Entrepreneurs Study Pilot App.

---

## 1. AppSheet Survey Engine Patterns
- **Action Grid Navigation**: Using `LINKTOFILTEREDVIEW()` on the parent `Survey` Detail View allows field enumerators to jump smoothly between sub-modules without cluttering the UI.
- **GPS Coordinates**: In rural locations with intermittent GPS signals, initializing `Latitude` and `Longitude` with `HERE()` on form load prevents sync failures.

---

## 2. RAJEEVIKA / SRLM Enterprise Dataset Nuances
- **Trade Categorization**: District MIS records show 13 out of 16 districts are heavily dominated by Kirana/General Store and Tailoring. Sampling must actively enforce representation across secondary anchor trades (Dairy, Agri-input/trading, Food Processing).
- **Informal Financial Recall**: Rural women entrepreneurs rarely maintain formal paper ledgers. Investment and profit figures must be collected with range brackets alongside raw numbers to facilitate triangulation.

---

## 3. Data Integrity & Verification
- **Supervisor Spot-Checks**: Implementing a dedicated `SupervisorAudit` slice enables daily field verification of completed interviews, keeping rejection rates low before final data pipeline export.
