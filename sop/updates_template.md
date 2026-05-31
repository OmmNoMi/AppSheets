# App Update Log Template

Use this template to create an `updates.md` file in each individual AppSheet project folder (e.g., `projects/[AppName]/updates.md`) to track development phases, improvements, bugs, and changes.

---

## [App Name] Update History

### [Version / Date] - [Short Title of Update]
- **Developer:** [Name / ID]
- **Status:** [Draft / Under Review / Deployed]
- **Git Commit:** [Short SHA or Message]

#### 🏗️ Schema Changes
*List any physical or virtual column modifications, new tables added, or type overrides.*
- [x] Added `LastEditBy` / `LastEditOn` to target table `X`.
- [ ] Created new child table `Y` to support phase features.

#### 🔘 Expression & Logic Updates
*Log updates to App Formulas, Valid_If, Show_If, Actions, or Automation Bots.*
- [ ] Updated action `Sync_X` to refresh timestamps.
- [ ] Gated status button `Approved_X` with role-based checks.

#### 🤖 Automations & Webhooks
*Describe modifications to background schedules, bots, or webhooks.*
- [ ] Set up bot to trigger PDF generation on record insertion.

#### 🎨 UX & Formats
*Changes to formatting rules, dashboards, views, or system display names.*
- [ ] Styled "Completed" status in Green with ✅ icon.

---
