# DA Onboarding Migration: BLUJ → ONDT

> **Context**: This document details the differences in the DA (Delivery Associate) Onboarding flow between Navi BLUJ and Navi ONDT, and provides step-by-step instructions for bringing ONDT up to parity with BLUJ's more advanced onboarding structure.

---

## 1. Executive Summary

The DA Onboarding process in Navi ONDT **does not match** Navi BLUJ. 

Navi BLUJ has evolved its onboarding flow to include deep integration with DSP/Amazon logistics platforms (Cortex, JJ Keller, Relay) and more granular road test and mentoring steps. ONDT is currently using a legacy onboarding structure with obsolete columns (e.g., `1Onboarding`, `Day1`, `TrainingDay2`).

**To achieve parity in ONDT, you must:**
1. Add 1 missing column to the `Candidate` table.
2. Add 11 missing logistics/status columns to the `Onboarding` table.
3. Remove 8 deprecated legacy columns from the `Onboarding` table to clean up the schema.
4. Update associated Form Views to use the new `Show` columns for section grouping.

---

## 2. Table: `Candidate` Changes

BLUJ tracks why candidates are rejected directly on the candidate profile.

> [!IMPORTANT]  
> Add the following column to the `Candidate` Google Sheet, then regenerate the schema in AppSheet.

| Column Name | AppSheet Type | Notes / Initial Value |
|-------------|---------------|-----------------------|
| `RejectionReason` | **EnumList** | Use this to track granular drop-off reasons (e.g., "No Show", "Background Failed", "Not Interested"). |

---

## 3. Table: `Onboarding` Additions (The Core Migration)

BLUJ tracks multiple third-party platform credentials and road test statuses. 

> [!IMPORTANT]
> Add the following 11 columns to the ONDT `Onboarding` Google Sheet, and configure their types in AppSheet. 

### Section 1: System Groupings (UI)
*Add these as Virtual Columns or physical columns typed as `Show` in AppSheet to group the form logically.*
- `Onboarding` (Type: **Show**, Category: Page Header)
- `JJ Keller` (Type: **Show**, Category: Section Header)

### Section 2: Platform IDs & Statuses
| Column Name | AppSheet Type | Initial Value Formula | Purpose |
|-------------|---------------|-----------------------|---------|
| `TransporterId` | **Text** | | Amazon DA mapping ID |
| `JJKId` | **Text** | | JJ Keller system ID |
| `CortexStatus` | **Enum** | `="Not Active"` | Tracks active/inactive state in Cortex |
| `Fleet` | **Enum** | | Associated fleet account |
| `Badge` | **Enum** | | Badge request/issuance status |
| `Relay` | **Enum** | | Amazon Relay onboarding status |

### Section 3: Training & Road Test
| Column Name | AppSheet Type | Initial Value Formula | Purpose |
|-------------|---------------|-----------------------|---------|
| `Road Test Status` | **Text** | | Current progress of the road test |
| `Road Test Date` | **Date** | `TODAY()` | Date the road test is conducted |
| `Mentor` | **Enum** | | Reference to the employee training the DA |

---

## 4. Table: `Onboarding` Cleanup (Optional but Recommended)

BLUJ has dropped several columns that ONDT still retains. To fully match BLUJ's clean architecture, you should migrate data away from these and delete them from ONDT.

> [!WARNING]
> Before deleting these, check if any legacy automations or bots in ONDT rely on them.

**Legacy Columns to Remove:**
- `1Onboarding`
- `2Onboarding`
- `Day1`
- `TrainingDay2`
- `Documents`
- `Missing Documents`
- `EmployeeID` *(BLUJ uses relational links rather than string EmployeeIDs in this phase)*
- `EmployeeStatus`

---

## 5. Implementation Steps

1. **Google Sheets Updates**:
   - Open the ONDT database.
   - In the `Candidate` sheet, append `RejectionReason`.
   - In the `Onboarding` sheet, append the 9 new physical columns (exclude the 2 `Show` columns).
2. **AppSheet Regeneration**:
   - Go to Data → Tables → `Candidate` → **Regenerate Structure**.
   - Go to Data → Tables → `Onboarding` → **Regenerate Structure**.
3. **AppSheet Configuration**:
   - Apply the types and `Initial Value` formulas listed in the tables above.
   - Add the two Virtual Columns for `Onboarding` and `JJ Keller` as `Show` types to organize the Onboarding Form view.
4. **View Updates**:
   - Navigate to UX → Views → `Onboarding_Form`.
   - Reorder the columns so that the `Show` columns correctly group the DSP data (TransporterId, Cortex, Relay) and the JJ Keller data (JJKId).
5. **Action Updates**:
   - Review the `StartOnboarding` action to ensure it properly populates the new fields if any default assignments are required upon transitioning from Candidate to Onboarding.
