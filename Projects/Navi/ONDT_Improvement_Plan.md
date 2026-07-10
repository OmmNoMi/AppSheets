# ONDT Core Improvement & Modernization Plan

> **Context**: While the Studio 0172 (`S0172 Navi`) branch is receiving a 1:1 migration of the BLUJ modules (DA Onboarding, DA Audit, and Vehicle Inspection), the core **Navi ONDT** master app should not just copy BLUJ blindly. When migrating these modules back to ONDT, several architectural and UX improvements should be made to modernize the platform and clean up technical debt.

---

## 1. Schema & Data Cleanup (Technical Debt Removal)

Before bringing in the new BLUJ modules, ONDT's legacy schema must be strictly pruned to prevent database bloat and conflicting workflows.

- **Purge Obsolete Onboarding Columns**: Completely drop `1Onboarding`, `2Onboarding`, `Day1`, `TrainingDay2`, `Documents`, and `Missing Documents`. 
- **Refactor `EmployeeID`**: ONDT currently relies on string-based Employee IDs during onboarding. Shift entirely to `Ref` types pointing to the `Employee` table (matching BLUJ's relational architecture).
- **Consolidate Legacy Repairs**: ONDT tracks repairs directly on the `Inspection` table (`OpenRepairs`, `RepairDesc`, `RepairType`, etc.). This should be stripped out and migrated to a dedicated `Repairs` or `Maintenance` child table to allow 1-to-Many repair tracking per inspection.

## 2. UX & Form Improvements

The user experience during data entry can be heavily optimized using AppSheet's dynamic form features.

- **Dynamic Rejection Reasons via `AppVariables`**: As seen in the `Candidate` table, the `RejectionReason` field is an `EnumList`. Instead of hardcoding the dropdown values directly into the column definition, you should drive these dynamically using the ONDT `AppVariables` table.
  - **Step 1 (Create Variable)**: Add a new row to the `AppVariables` table (either in the app or Google Sheet).
    - `ID`: `CandidateRejectionReasons`
    - `ValueControl`: `Multi`
    - `Title`: `Candidate Rejection Reasons`
    - `MultiValues`: Enter the comma-separated list: `Experience answers unclear, Communication, Lacking soft skills, Insufficient Customer Obsession, Lacking On-road awareness, Lack of BT Experience, Lack of Initiative, Poor Problem-Solving Skills, Inability to Handle Pressure, Expectations Mismatch, Not Good Fit`
  - **Step 2 (AppSheet Config)**: In the `Candidate` table for the `RejectionReason` column:
    - Set **Show_If** strictly to: `=[Decision]="Rejected"`
    - Under **Data Validity**, set **Valid_If** to the following formula:
      ```appsheet
      =SORT(
        SPLIT(LOOKUP(
          "CandidateRejectionReasons",
          "AppVariables",
          "ID",
          "MultiValues"
        ), ","),
        FALSE
      )
      ```
    - Set the **Type** to `EnumList` (with base type `Enum`).
- **Logical Sectioning via `Show` Columns**: The `DOTAudit` table has 100+ columns. In ONDT, ensure that `Show` columns (`Page Header` and `Section Header`) are utilized properly (Inside Cab, Front of Vehicle, Passenger Side, Driver Side, Final Review) so the auditor doesn't face a massive scrolling form.

## 3. Automation & Action Upgrades

ONDT's automation workflows should be upgraded to use the latest AppSheet Bot architecture rather than legacy workflows.

- **Decoupled Audit Rollups**: 
  - When `DOTAudit` is implemented, ensure the `DOTLatestAuditRecord` table is updated via a streamlined **Data Change Bot** rather than chained grouped actions. 
  - If a vehicle fails an audit (`VehicleStatus` = Grounded), the bot should automatically push the `GroundingReason` directly to the parent `Fleet` record and trigger a notification to the Dispatch team.
- **Onboarding Status Automation**: 
  - Instead of requiring manual updates, tie the `CortexStatus`, `Relay`, and `Road Test Status` fields in the `Onboarding` table to a Bot that automatically transitions the main Candidate phase once all three DSP platforms are marked as "Active" or "Passed".

## 4. Scalability for Multi-Tenant / Multi-DSP

Since ONDT is used for clients like Studio 0172, the architecture must support variations between different DSPs.

- **Abstracted Platform IDs**: Not all DSPs use the exact same third-party tracking. Columns like `TransporterId` and `JJKId` should ideally be managed in a flexible key-value `AppVariables` or `Integrations` table if more platforms are added in the future, rather than hardcoding endless columns in the `Onboarding` table.
