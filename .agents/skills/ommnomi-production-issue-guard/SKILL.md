---
name: ommnomi-production-issue-guard
description: >-
  Universal Fortune-10, Google SRE, and Toyota Poka-Yoke (Mistake-Proof) Production Issue Resolution
  & Zero-Regression Guard Protocol across all OmmNoMi projects (Frappe/ERPNext, AppSheet, Vue 3 PWAs).
  Enforces the RED-BLUE-GREEN Triad, 3D Invariant Matrix (Persona x Viewport x Network), Expand/Contract
  zero-downtime migrations, offline in-flight WAL backward compatibility, perceptual visual diffing,
  4-tier regression CI gates, and Google SRE blameless RCA handover whitepapers.
---

# OmmNoMi Universal Production Issue Resolution & Zero-Regression Guard Protocol

## 1. Executive Philosophy & The Zero-Regression Invariant
In mission-critical enterprise systems, every release to production is an active contract with users, enumerators, managers, and downstream pipelines. When resolving any issue:
> **The Golden Production Invariant (Hyrum's Law Defense)**:  
> *"With a sufficient number of users, every observable behavior of a system is depended on by someone. A patch that fixes one defect must NEVER break an adjacent persona, corrupt historical database records, or drop in-flight offline synchronization payloads."*

Every issue resolution across all OmmNoMi projects must strictly follow the **RED - BLUE - GREEN Engineering Triad**:

```
🔴 RED PHASE (#EA4335)     ──►   🔵 BLUE PHASE (#4285F4)       ──►   🟢 GREEN PHASE (#34A853)
Defect Proof & Failing Test        Surgical Architecture & Poka-Yoke   Zero-Regression CI & Release
```

---

## 2. The 3-Dimensional Invariant Matrix

Every defect and proposed fix must be audited across all 3 dimensions simultaneously before any code is approved:

```
                  ┌───────────────────────────────────────────────┐
                  │                VIEWPORT AXIS                  │
                  │  Desktop (1280px) · Tablet · Mobile (375px)   │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
   ┌─────────────────────────────┐                 ┌─────────────────────────────┐
   │        PERSONA AXIS         │ ◄─────────────► │        NETWORK AXIS         │
   │  Admin · Manager · Analyst  │                 │   Online (Fast 4G/WiFi)     │
   │  Viewer · Surveyor · Guest  │                 │   Low Bandwidth (2G)        │
   │                             │                 │   Offline (IndexedDB WAL)   │
   └─────────────────────────────┘                 └─────────────────────────────┘
```

1. **Persona Dimension**:
   - **System Manager / Administrator**: Full operational oversight intact.
   - **OmniQuery Manager**: Team review, surveyor targets, and audit logs intact.
   - **Project Analyst**: Read, export, and report on responses intact; write/create strictly denied.
   - **Project Viewer**: Read-only on responses intact; export and write strictly denied.
   - **Field Surveyor**: Own draft creation and synchronization intact; zero access to other surveyors' drafts or desk authoring.
   - **Citizen / Guest**: Access to public citizen surveys intact; strictly blocked from private templates and desk routes.
2. **Viewport Dimension**:
   - **Desktop (1280 × 800 @ 2x DPI)**: Workspace navigation, number cards, list filters, form sidebars, and desktop table controls.
   - **Mobile (375 × 812 @ 3x DPI - iPhone SE / Android)**: Touch target clearance (min 44px), card wrapping, bottom action bars, modal sheet transitions, and zero horizontal scrolling.
3. **Network & State Dimension**:
   - **Online (Fast)**: Real-time API sync and instant database persistence.
   - **Offline (WAL Mode)**: Complete standalone operation in remote rural locations (IndexedDB write-ahead-log queue, zero network dependency).
   - **Reconnection Transition**: Automatic idempotent background sync without duplicate records or savepoint transaction deadlocks.

---

## 3. The 10-Phase Operational Lifecycle

### 🔴 Phase 1: Issue Ingestion & Blast-Radius Mapping (RED)
1. Fetch issue via GitHub API tool (`get_issue`). Extract reporter, persona hurt, symptoms, file references, and tester acceptance criteria.
2. Construct the **Blast-Radius Dependency Graph**:
   - Identify all upstream doctypes, child tables, API endpoints, hooks, and client components that reference the target file.
   - Audit historical records (`docstatus = 1` submitted records) and offline client storage contracts.

### 🔴 Phase 2: Persona Impersonation & Pre-Fix Visual Forensics (RED)
1. **The Persona Invariant**: Strictly **ZERO** testing as `Administrator`. Authenticate as the exact restricted persona (e.g. `oq.analyst.test@example.com` or `OmniQuery Manager`).
2. Capture high-fidelity pre-fix visual proof via `chrome-devtools-mcp` or headless automation:
   - **Desktop**: `docs/reports/issue-<number>/pre_fix_desktop.png`
   - **Mobile (375px)**: `docs/reports/issue-<number>/pre_fix_mobile_375px.png`
3. Dump network requests, HTTP status codes, console error logs, and MariaDB traces to `docs/reports/issue-<number>/pre_fix_forensics.json`.

### 🔴 Phase 3: Pre-Flight Baseline Test Gate (RED)
1. Ensure `develop` is clean and up to date:
   ```bash
   git checkout develop && git pull origin develop
   ```
2. Run baseline test suites *before* modifying code:
   ```bash
   npm test
   bench --site <site> run-tests --app <app>
   npm run test:mutation
   ```
3. **Hard Gate**: If baseline fails, STOP immediately. You cannot build on an unstable foundation.

### 🔴 Phase 4: Hermetic TDD++ Red Test Contract (RED)
1. Create isolated branch:
   ```bash
   git checkout -b fix/issue-<number>-<kebab-case-slug>
   ```
2. Author failing test exercising the **real public API** (`frappe.get_list`, `frappe.has_permission`, real HTTP endpoint, or Vitest mount).
3. **Anti-Brittle Rule**: Do NOT mock database controllers or internal permission functions.
4. Execute test: MUST fail with the exact reported defect (**RED STATE PROOF**). Capture failure stack trace.

---

### 🔵 Phase 5: Expand/Contract Zero-Downtime Schema Strategy (BLUE)
When a fix requires modifying schemas, database columns, or fixtures:
1. **Expand (Additive Only)**: Add new columns or child tables with `NULL` or safe defaults (`ALGORITHM=INPLACE, LOCK=NONE`). Never rename or drop existing columns while live traffic is active.
2. **Migrate & Backfill**: Implement dual-writes: new code writes to both old and new columns. Execute data backfilling via batch scripts using `frappe.db.savepoint`.
3. **Contract (Deferred Cleanup)**: Switch reads to the new column. Legacy column deletion is deferred until all clients and replicas are confirmed on the new version.
4. **Historical Immutability**: Existing submitted records (`docstatus = 1`) must remain readable, exportable, and valid.

### 🔵 Phase 6: Offline In-Flight WAL Compatibility (BLUE)
1. Rural field surveyors operate offline for days without updating their app bundle.
2. The server sync endpoint (`omniquery.api.sync.batch_push`) must inspect `schema_version`.
3. If an incoming payload is formatted in a legacy schema version (`schema_version < current_version`), the backend **must automatically forward-migrate the payload** into the current format before saving, rather than rejecting the submission with an HTTP 400 error.
4. **Result**: Zero data loss for rural field enumerators.

### 🔵 Phase 7: Surgical Platform-Native Resolution ("Only That Line & Place") (BLUE)
1. **Surgical Precision**: Restrict modifications strictly to the responsible lines. Zero unrequested refactoring, import shuffling, or comment stripping.
2. **Platform-Native First**: Use Frappe-native DocPerms, User Permissions, standard Geolocation fields, Number Cards, and Dashboard Charts.
3. Strictly **ZERO** customer data transmitted to third-party servers without explicit user site setting.
4. Rebuild assets & migrate:
   ```bash
   npm run build
   bench build --app <app>
   bench --site <site> migrate
   ```

### 🔵 Phase 8: Poka-Yoke Mistake-Proofing & Mutation Hardening (BLUE)
1. **Structural Template Linter**: Run `python3 scripts/check_www_html.py` to prevent DOM/template nesting bugs.
2. **Security Invariant Linters**: Run regex/AST checks preventing unparameterized raw SQL or unapproved external CDNs.
3. **Mutation Testing Gate**: Invert conditions and verify 100% mutant kill score via `npm run test:mutation`.

---

### 🟢 Phase 9: Post-Fix Visual Proof & Perceptual Diffing (GREEN)
1. Re-open UI on `localhost:8000` under the impersonated persona.
2. Capture matching post-fix screenshots:
   - `docs/reports/issue-<number>/post_fix_desktop.png`
   - `docs/reports/issue-<number>/post_fix_mobile_375px.png`
3. Execute **Pixelmatch** perceptual diffing:
   - Mask dynamic elements (timestamps, user avatar, ticking clock).
   - Generate visual diff heatmap (`diff_desktop.png` and `diff_mobile_375px.png`) highlighting unexpected shifts in bright magenta.
   - Any unintended visual shift outside the bug scope halts the release.

### 🟢 Phase 10: 4-Tier Zero-Regression CI Quality Gates (GREEN)
Execute the complete regression verification sequence:
1. **Tier 1 (Frontend Unit & Accessibility)**: `npm test` → 100% pass across all test files.
2. **Tier 2 (Backend Frappe Test Suite)**: `bench run-tests --app <app>` → 100% pass across all tests.
3. **Tier 3 (Mutation Quality Gate)**: `npm run test:mutation` → 100% mutants killed.
4. **Tier 4 (Structural HTML Guard)**: `python3 scripts/check_www_html.py` → 0 errors.

### 🟢 Phase 11: Multi-Role Matrix Invariant Audit (GREEN)
Verify the modified resource across all 5 standard personas:
1. **System Manager**: Unrestricted access intact.
2. **OmniQuery Manager**: Team review, surveyor tracking, and approval flows intact.
3. **Project Analyst**: Read, export, and report access intact; write and create strictly denied.
4. **Project Viewer**: Read-only access intact; export and write strictly denied.
5. **Field Surveyor / Citizen**: Restricted strictly to assigned projects or public link; no desk access.

### 🟢 Phase 12: Google SRE Blameless RCA Handover Whitepaper & PR (GREEN)
Compile `docs/reports/issue-<number>/RESOLUTION_REPORT.md` (and compiled PDF per `sop-html-reports`):
1. **Official OmmNoMi Branding**: Horizontal logo lockup (`.agents/brand/ommnomi_logo.png`, strictly zero duplicate wordmark).
2. **Metadata & Signatures**: Document Ref, Issue ID, Reporter (Nomeshwer Sharma), Resolver (Hardik Sharma), Date, Branch.
3. **Executive Summary & Persona Impact**: Who was blocked, what business process stalled, and quantifiable value.
4. **Google SRE Blameless Root Cause Analysis (5-Whys)**:
   - Immediate Trigger vs. Underlying Systemic Root Cause.
   - 5-Whys tree terminating at architectural processes, never individuals.
5. **Poka-Yoke Action Items Matrix**: Categorized into **Prevent**, **Mitigate**, and **Detect** with owners and tracking links.
6. **Dual-Viewport Visual Matrix & Pixel Diffs**: Side-by-side Before vs. After at Desktop (1280px) and Mobile (375px) with heatmaps.
7. **Surgical Code Anatomy & Blast-Radius Diffs**: Line-by-line diffs with technical rationale.
8. **TDD++ Red-to-Green Test Logs**: Verbatim terminal output proving failure transitioning to passing.
9. **Full 4-Tier CI Regression Proof**: Terminal logs proving 100% pass across all existing suites.
10. **Zero-Downtime Deployment Runbook**: Step-by-step commands for site migration and asset compilation.
11. **Official Two-Row Symmetrical Footer ("Aamne Saamne")**: Registered address on top right, logo on top left; tagline on bottom left, 7 brand vector social links on bottom right.

### 🟢 Phase 13: Pre-Push Iron Gate & PR Assembly (GREEN)
1. Commit with Conventional Commits: `fix(<scope>): <description> (closes #<number>)`.
2. Push to `origin fix/issue-<number>-<slug>`.
3. Open GitHub PR targeting `develop` referencing `Fixes #<number>`.
4. **🚫 Strict Zero-Corporate-Boilerplate Rule for GitHub PR Descriptions**:
   - **Zero Company Logo / Wordmark**: NEVER place `ommnomi_logo.png` or company wordmark in GitHub PR descriptions. Teammates and reviewers already know they work for OmmNoMi.
   - **Zero Classification & Metadata Tables**: Do NOT clutter PRs with `Document Ref: OQ-RES-XX`, `Classification: Production Quality Release...`, or reporter/resolver metadata tables. GitHub natively tracks PR author, reviewers, target branch, date, and commit history.
   - **Zero Footers & Corporate Taglines**: NEVER include physical address footers (`Karsog, Mandi...`), legal entity disclaimers, or social media links in GitHub PR descriptions.
   - **Direct Engineering Structure**: PR body must start directly with `# <Clear Technical Title>` followed by `Fixes #<number>`. Retain only the essential technical content: Executive Summary & Persona Impact, SRE 5-Whys, Poka-Yoke Action Items, Dual-Viewport Visual Proofs (Before vs After photos rendered with absolute raw GitHub image URLs), Surgical Code Anatomy, and 4-Tier CI Test Results.
5. Assign QA Lead `nomeshwer` for staging verification.
6. Ingest the learning into the permanent skill knowledge base.


---

## 4. Universal Platform Adapters

| Domain | Repositories | Forensic Reproduction Adapter (RED) | Surgical Architecture Adapter (BLUE) | CI Regression Adapter (GREEN) |
| :--- | :--- | :--- | :--- | :--- |
| **Frappe & ERPNext** | `omniquery`, `omnitrack`, `ommnomi_website`, `gaonhae`, `hrms` | - Role impersonation (`frappe.set_user`)<br/>- Dual viewport: Desktop 1280px + Mobile 375px<br/>- MariaDB query & error inspection | - Native DocPerms & User Permissions<br/>- Surgical line-level edits<br/>- Expand/Contract schema evolution | - Python test runner: `bench run-tests`<br/>- Vitest frontend runner: `npm test`<br/>- Mutation runner: `npm run test:mutation`<br/>- HTML guard: `check_www_html.py` |
| **AppSheet Systems** | Multi-District Survey Apps, Orbit HRMS, BLR World | - AppSheet "Preview As" role switching<br/>- Mobile viewport emulator (iOS/Android)<br/>- Sync audit log analysis | - Single-child multi-matrix patterns<br/>- Redux batch injection<br/>- Native enum mapping | - Schema linter: `parse_appdoc.py`<br/>- Enum validator: `parse_appvariables.py`<br/>- Redux formula verification |
| **Modern Web / PWA** | Vue 3 PWAs, Vite apps, Webhooks, Cloud APIs | - DevTools network throttling (Slow 3G, Offline)<br/>- IndexedDB / Dexie inspection<br/>- Service worker cache auditing | - Frappe UI / Tailwind standard tokens<br/>- WCAG 2.2 AA accessibility design<br/>- Offline WAL persistence & backward schema migration | - Vitest component & store specs<br/>- Offline chaos tests (`useWAL.chaos.spec.js`)<br/>- 100% accessibility specs<br/>- Pixelmatch visual diffing |

---

## 5. Living Poka-Yoke Knowledge Base & Gotchas

*Every resolved issue must add its permanent rule and failure mode here.*

| Issue # | Component | Root Cause (5-Whys) | Poka-Yoke Preventive Rule | Automated Test / Gate |
| :--- | :--- | :--- | :--- | :--- |
| **#62** | `permissions.py` / DocPerm | Ad-hoc child table permission checks bypassed real Frappe Roles, causing MariaDB 1064 and locking Analysts out of the desk. | Never create parallel permission systems. Use standard Frappe Roles (`OmniQuery Analyst`) with native DocPerms (Read, Export, Report) and User Permissions for row scoping. | `TestPermissions.test_project_analyst_can_read_but_not_write` |
| **#61** | `omniquery_response.js` | OpenStreetMap iframe sent respondent GPS to external servers; map and audio players built via ad-hoc HTML strings. | 100% Frappe-native controls. Use standard Frappe Geolocation field with site tile server. Audio must use native `<audio controls>`. Zero customer data to 3rd-party servers without explicit setting. | `test_security_gates.py` & Vitest privacy assertions |
| **#60** | Workspace / Role Routing | PWA frontend lacked role checks, showing surveyor dashboard to Managers; workspace lacked review queues. | Pass `frappe.get_roles()` in shell boot data. Managers see team progress and review queue; surveyors see targets and field forms. | `SurveyorDashboard.spec.js` role gating & Number Card tests |
| **#10** | `sync.py` / MariaDB | Batch submission failure rolled back entire batch, causing partial sync data loss. | Atomic savepoint isolation: wrap each submission in `frappe.db.savepoint()`. Failed rows logged without aborting valid rows. | `test_batch_push_savepoint_partial_failure_isolation` |
| **#1** | `install.py` / Fixtures | Desktop icon created before Workspace Sidebar existed, causing LinkValidationError during migrate. | Strict fixture dependency ordering: create Workspace, then Sidebar, then Desktop Icon. | `test_after_migrate_recreates_navigation_when_sidebar_is_missing` |
