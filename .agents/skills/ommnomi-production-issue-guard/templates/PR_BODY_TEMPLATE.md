# {{EXACT_CLEAR_ISSUE_TITLE}}

Fixes #{{ISSUE_NUMBER}}

---

## 1. Executive Summary & Persona Impact
* **Executive Summary**: {{EXECUTIVE_SUMMARY_HUMAN_READABLE}}
* **Persona Hurt**: {{PERSONA_HURT_IN_SIMPLE_WORDS}}
* **Business Severity**: {{SEVERITY}}
* **Production Invariant Protected**: {{INVARIANT_PROTECTED}}

---

## 2. Root Cause Analysis (Why This Happened - 5 Whys)

### 2.1 Trigger vs. Underlying Systemic Cause
* **Immediate Trigger**: {{IMMEDIATE_TRIGGER}}
* **Underlying Systemic Root Cause**: {{SYSTEMIC_ROOT_CAUSE}}

### 2.2 The 5-Whys Decomposition
1. **Why #1**: {{WHY_1}}
2. **Why #2**: {{WHY_2}}
3. **Why #3**: {{WHY_3}}
4. **Why #4**: {{WHY_4}}
5. **Why #5 (Systemic / Architectural Process)**: {{WHY_5}}

---

## 3. Mistake-Proofing (Action Items to Prevent Recurrence)

| Action Item | Classification | Owner | Tracking Link | Status |
| :--- | :--- | :--- | :--- | :--- |
| {{ACTION_1_TITLE}} | **Prevent** | Hardik Sharma | #{{ISSUE_NUMBER}} | **DONE** |
| {{ACTION_2_TITLE}} | **Mitigate** | Hardik Sharma | #{{ISSUE_NUMBER}} | **DONE** |
| {{ACTION_3_TITLE}} | **Detect** | Nomeshwer Sharma | #{{ISSUE_NUMBER}} | **DONE** |

---

## 4. Dual-Viewport Visual Forensic Evidence & Pixel Diffs

### 4.1 Desktop Viewport (1280 × 800)
| 🔴 Pre-Fix Broken State | 🟢 Post-Fix Verified State |
| :---: | :---: |
| <img src="{{PRE_FIX_DESKTOP_RAW_GITHUB_URL}}" alt="Pre-Fix Desktop" width="450" /> | <img src="{{POST_FIX_DESKTOP_RAW_GITHUB_URL}}" alt="Post-Fix Desktop" width="450" /> |
| *{{PRE_FIX_DESKTOP_CAPTION}}* | *{{POST_FIX_DESKTOP_CAPTION}}* |

### 4.2 Mobile Viewport (375 × 812)
| 🔴 Pre-Fix Mobile State | 🟢 Post-Fix Verified State |
| :---: | :---: |
| <img src="{{PRE_FIX_MOBILE_RAW_GITHUB_URL}}" alt="Pre-Fix Mobile" width="280" /> | <img src="{{POST_FIX_MOBILE_RAW_GITHUB_URL}}" alt="Post-Fix Mobile" width="280" /> |
| *{{PRE_FIX_MOBILE_CAPTION}}* | *{{POST_FIX_MOBILE_CAPTION}}* |

---

## 5. Surgical Code Anatomy ("Only That Line & That Place")

### Summary of Modified Files:
* `{{FILE_1_PATH}}`: {{FILE_1_SUMMARY}}

---

## 6. TDD++ Red-to-Green Verification Proof

### 6.1 🔴 Red State Terminal Proof (Before Fix)
```
{{RED_TEST_OUTPUT}}
```

### 6.2 🟢 Green State Terminal Proof (After Fix)
```
{{GREEN_TEST_OUTPUT}}
```

---

## 7. Full 4-Tier Zero-Regression CI Verification

| Quality Gate | Suite Name | Tests Executed | Passed | Failed | Status |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Tier 1 (Frontend)** | Vitest (Vue 3, Store & Accessibility) | {{TIER1_TOTAL}} | {{TIER1_PASSED}} | 0 | **100% PASS** |
| **Tier 2 (Backend)** | Frappe Python Test Suite | {{TIER2_TOTAL}} | {{TIER2_PASSED}} | 0 | **100% PASS** |
| **Tier 3 (Mutation)** | Automated Mutation Hardening Gate | {{TIER3_TOTAL}} | {{TIER3_KILLED}} | 0 | **100% KILLED** |
| **Tier 4 (Structural)**| Template Linter (`check_www_html.py`) | {{TIER4_TOTAL}} | {{TIER4_PASSED}} | 0 | **0 ERRORS** |
