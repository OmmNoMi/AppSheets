# <span style="font-family:'Roboto',sans-serif;font-weight:900;"><span style="color:#4285f4;">Omm</span><span style="color:#34a853;">No</span><span style="color:#ea4335;">M</span><span style="color:#fbbc05;">i</span></span> Automation LLP
## System Schema & Configuration Guide — CmF SHG Women Entrepreneurs Study
### CINI Architecture: "One Form, One Table" Trilingual Engine

---

<div style="background-color:#f8f9fa; border:1px solid #dadce0; border-radius:6px; padding:12px 15px; margin-bottom:16px;">
  <table style="width:100%; border:none; margin:0; font-family:'Roboto',sans-serif; font-size:12px;">
    <tr>
      <td><strong>Application:</strong> SHG Women Entrepreneurs Study</td>
      <td><strong>Architecture:</strong> One Form, One Table (CINI Pattern)</td>
      <td><strong>Languages:</strong> English, Hindi (हिन्दी), Rajasthani (राजस्थानी)</td>
    </tr>
    <tr>
      <td><strong>Client:</strong> Centre for microFinance (CmF) & RAJEEVIKA</td>
      <td><strong>Lead Engineers:</strong> Nomeshwer Sharma & Hardik Sharma</td>
      <td><strong>Version:</strong> 2.0 (Final CMF Feedback)</td>
    </tr>
  </table>
</div>

---

## 1. Architecture Overview (The "One Form, One Table" Advantage)

In field research and quantitative survey analysis, joining multi-tier relational tables for reporting creates immense overhead. To deliver effortless data analysis and SPSS/Excel export, this application uses the **CINI Survey Architecture**:
1. **Single Flat Operational Table (`Survey`)**: Every question in Sections A through G is captured as a dedicated physical column in the master `Survey` table. 1 survey = 1 complete flat row.
2. **Multi-Page Wizard Form**: The AppSheet Form view uses `Page_Break` show columns to divide the survey into 7 manageable sections with forward/back buttons and zero screen clutter.
3. **Trilingual Metadata Engine (`AppVariables`)**: Prompts and option choices are stored in `AppVariables` with `Title` (English), `Title_hi` (Hindi), and `Title_raj` (Rajasthani).
4. **User-Controlled Language Switcher (`AppUser`)**: Surveyors and managers can toggle their language preference in `AppUser[Language]`. All question labels and dropdown choices instantly adapt.
5. **Enumerator Dashboard & Daily Target Tracker**: Form fillers see their daily quota (e.g. 10 surveys/day), completed count today, pending drafts, and a prominent **"➕ Start Next Survey"** button.

---

## 2. Google Sheets Level (Physical Tabs & Columns)

The Google Sheets master database consists of only **4 physical tabs**:

```
Universal_Dynamic_Survey_Engine.xlsx
├── Survey             (Master Table — 227 Physical Columns covering Sections A through G)
├── AppVariables       (System Dictionary — 529 Trilingual Prompt & Choice Rows)
├── AppUser            (Surveyors & Authentication — Language, DailyTarget, Role)
└── SamplingFrame      (Master Quotas — 5 Pilot Districts & Blocks)
```

### Physical Tabs Summary
1. **`Survey`**:
   - `ID` (Key)
   - `Status` (Draft, Submitted, Verified)
   - `InvestigatorID` (Surveyor email)
   - `CreatedOn` (Timestamp)
   - `Latitude`, `Longitude` (GPS Coordinates)
   - **Section A (Basic Details)**: `District`, `Block`, `VillageGP`, `RespondentName`, `ContactNumber`, `SHGName`, `VOName`, `CLFName`, `SHGMembershipYears`, `LeadershipRole`, `LeadershipYears`, `RelatedToCRP`, `EPInterventionType`, `EnterpriseName`, `ParallelEnterpriseName`, `EnterpriseSetupYear`, `LoanReceivedYear`, `BusinessType`, `BusinessActivities`, `BusinessActivitiesOther`.
   - **Section B (Household Profile)**: `RespondentAge`, `MaritalStatus`, `SocialCategory`, `EducationStatus`, `FamilyMemberCount`, `FamilyAdultsCount`, `FamilyChildrenCount`, `FamilyTotalEarning`, `FamilyMaleEarning`, `FamilyFemaleEarning`, `FamilyDisabledCount`, `FamilyIncomeSources`, `AnnualHouseholdIncome`.
   - **Section C (Enterprise Operations)**: `ReasonsStartingBusiness`, `BusinessCycle`, `BusinessCycleOther`, `BusinessPlaceType`, `AnnualRent`, `LocationConvenience`, `LocationConvenienceOther`, 24 labor matrix columns (`Labor_[Activity]_[Involvement/FamilyCount/HiredCount/AmountPaid]`), `AnnualSalaryBill`, 5 sourcing % columns (`Sourcing_[Place]_Pct`), `MarketingMethods`, `MarketingMethodsOther`, `SeasonalSalesMethod`, `SeasonalSalesOnlinePlatform`, `SeasonalSalesOther`, `SocialMediaForMarketing`, `SocialMediaForMarketingOther`, 7 sales channel % columns (`SalesChannel_[Channel]_Pct`), `RecordKeepingHabit`, `RecordKeepingMethod`, `RecordKeepingOther`, 9 seasonal turnover columns (`Turnover_[Peak/Avg/Lean]_[Months/Sales/Profit]`), `InitialStartCapital`, `InitialCapitalArranged`, `SHGAssociationAssistance`, 70 capital source matrix columns (`Cap_[Source]_[Yr1/Mid/Cur/Pending/Usage]`), `MonthlyIncomeIncreaseByOSFSVEP`, 12 business trajectory columns (`Trajectory_[Metric]_[Yr1/Cur]`), `FinancialHelpFromIncome`, 4 financial help amounts (`FinancialHelp_[Education/Debts/Assets/Marriage]Amt`).
   - **Section D (Challenges)**: `HusbandFamilyResponse`, `MaterialSourcingComfort`, `CustomerPaymentRecovery`, `FundingExperience`, `CurrentChallenges`, 6 challenge amount columns (`Challenge_[OSF/ScaleUp/Renovation/TimelyInputs/Inventory/Other]Amt`).
   - **Section E (Scheme Impact)**: `AttendedTraining`, `TrainingDetails`, `UsedTrainingComponent`, `UsedTrainingDetails`, `MonthlyIncomeBeforeLoan`, `MonthlyIncomeAfterLoan`, `CRPContributions`, `CRPContributionDocDetails`, `ExpectationsFromScheme`.
   - **Section F (Digital & Social Media)**: `SmartphoneOwnership`, `UseQRUPI`, `QRDailyTransactions`, `QRNonUseReason`, `SocialPlatformsUsed`, `SocialPlatformUsageMode`, `SocialMediaFrequency`.
   - **Section G (Post-Exit OSF)**: `OSFInterventionYear`, `BusinessOperationalStatus`, `BusinessClosureYear`, `ScalingDownClosingReasons`, `ScalingDownOtherReason`, `SupportNeededForSustenance`, `SupportNeededOther`.

---

## 3. AppSheet Level (Re-generation & Column Configuration)

### A. Dynamic Trilingual Label Formula
On every question column, configure the **Display Name** formula:
```excel
IFS(
  ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Hindi", LOOKUP("Q_A_01_00", "AppVariables", "ID", "Title_hi"),
  ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Rajasthani", LOOKUP("Q_A_01_00", "AppVariables", "ID", "Title_raj"),
  1=1, LOOKUP("Q_A_01_00", "AppVariables", "ID", "Title")
)
```
*(Replace `"Q_A_01_00"` with the exact Question ID from `ALL_SURVEY_QUESTIONS.md`)*.

### B. Dynamic Trilingual Virtual Column on `AppVariables`
On table `AppVariables`, set column **`Label`** (IsLabel = `TRUE`):
```excel
IFS(
  ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Hindi", [Title_hi],
  ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Rajasthani", [Title_raj],
  1=1, [Title]
)
```
*Result: Every dropdown (`Ref -> AppVariables`) automatically displays choices in the user's selected language!*

---

## 4. Column Type Level & Rules

| Column | Type | Initial Value | Valid_If / Options | Show_If / Condition |
|---|---|---|---|---|
| `ID` | Text (Key) | `=UPPER(UNIQUEID())` | | `Editable_If: ISBLANK([_THIS])` |
| `Status` | Enum | `="Draft"` | Values: `Draft`, `Submitted`, `Verified` | |
| `InvestigatorID` | Ref → `AppUser` | `=USEREMAIL()` | | Auto-assigned |
| `CreatedOn` | DateTime | `=NOW()` | | Auto-stamped |
| `Latitude` | Decimal | `=HERE()[Latitude]` | | GPS |
| `Longitude` | Decimal | `=HERE()[Longitude]` | | GPS |
| `District` | Enum Ref → `AppVariables` | | `SPLIT(LOOKUP("Q_A_01_00","AppVariables","ID","VariableList")," , ")` | Page 1 |
| `Block` | Enum Ref → `AppVariables` | | `FILTER("AppVariables", AND([Column]="Block", [Description]=[_THISROW].[District]))` | Cascades by District |
| `LeadershipYears` | Number | | | `[LeadershipRole] = "OPT_YES"` |
| `ParallelEnterpriseName` | Text | | | Optional second enterprise |
| `AnnualRent` | Price | | | `[BusinessPlaceType] = "PLC_RENTED"` |
| `BusinessActivitiesOther`| Text | | | `IN("ACT_ANY_OTHER", [BusinessActivities])` |
| `SeasonalSalesOnlinePlatform`| Text | | | `[SeasonalSalesMethod] = "SEA_ONLINE_PLATFORM"` |
| `TrainingDetails` | Text | | | `[AttendedTraining] = "OPT_YES"` |
| `UsedTrainingDetails` | Text | | | `[UsedTrainingComponent] = "OPT_YES"` |
| `QRDailyTransactions` | Enum Ref → `AppVariables` | | `SPLIT(LOOKUP("Q_F_03_00","AppVariables","ID","VariableList")," , ")` | `[UseQRUPI] = "OPT_YES"` |
| `QRNonUseReason` | Enum Ref → `AppVariables` | | `SPLIT(LOOKUP("Q_F_04_00","AppVariables","ID","VariableList")," , ")` | `[UseQRUPI] = "OPT_NO"` |
| `BusinessClosureYear` | Number | | | `[BusinessOperationalStatus] = "BOS_CLOSED"` |

---

## 5. Virtual Column Level (Only in AppSheet Editor)

### On Table `Survey`:
1. **`Date`** (Date):
   ```excel
   AppFormula: =DATE([CreatedOn])
   ```
2. **`Label`** (Text, IsLabel = `TRUE`):
   ```excel
   AppFormula: =[RespondentName] & " (" & [EnterpriseName] & ") - " & [District].[Label]
   ```
### On Table `Survey`:
1. **`Date`** (Date):
   ```excel
   AppFormula: =DATE([CreatedOn])
   ```
2. **`Label`** (Text, IsLabel = `TRUE`):
   ```excel
   AppFormula: =[RespondentName] & " (" & [EnterpriseName] & ") - " & [District].[Label]
   ```
3. **`CompletedSectionsCount`** (Number):
   ```excel
   AppFormula: =(
     IF([Status_Profile] = "SEC_DONE", 1, 0) +
     IF([Status_Operations] = "SEC_DONE", 1, 0) +
     IF([Status_Challenges] = "SEC_DONE", 1, 0) +
     IF([Status_SchemeImpact] = "SEC_DONE", 1, 0) +
     IF([Status_Digital] = "SEC_DONE", 1, 0) +
     IF(OR([Status_PostExit] = "SEC_DONE", [Status_PostExit] = "SEC_NA"), 1, 0)
   )
   ```
4. **`ProgressPct`** (Percent):
   ```excel
   AppFormula: =MIN(LIST(1.0, [CompletedSectionsCount] / 6.0))
   ```

### On Table `AppUser`:
1. **`CompletedToday`** (Number):
   ```excel
   AppFormula: =COUNT(FILTER("Survey", AND([InvestigatorID] = [_THISROW].[Email], [Date] = TODAY(), [Status] = "Submitted")))
   ```
2. **`DraftsPending`** (Number):
   ```excel
   AppFormula: =COUNT(FILTER("Survey", AND([InvestigatorID] = [_THISROW].[Email], [Status] = "Draft")))
   ```
3. **`TodayTargetRemaining`** (Number):
   ```excel
   AppFormula: =MAX(LIST(0, [_THISROW].[DailyTarget] - [_THISROW].[CompletedToday]))
   ```
4. **`TodayProgress`** (Percent):
   ```excel
   AppFormula: =IF([DailyTarget] > 0, MIN(LIST(1.0, [CompletedToday] / [DailyTarget])), 0)
   ```

---

## 6. Action-Grid Architecture & Slices Setup (The UI from Screenshot)

### A. The 6 Section Slices (Over Single Flat `Survey` Table)
Create 6 Slices in AppSheet Data > Slices pointing to the `Survey` table:
1. **`Slice_Profile`**: Columns = `ID`, `Status_Profile`, plus all Section B fields (`RespondentAge` ... `AnnualHouseholdIncome`).
2. **`Slice_Operations`**: Columns = `ID`, `Status_Operations`, plus all Section C fields (`ReasonsStartingBusiness` ... `FinancialHelp_MarriageAmt`).
3. **`Slice_Challenges`**: Columns = `ID`, `Status_Challenges`, plus all Section D fields (`HusbandFamilyResponse` ... `Challenge_Other`).
4. **`Slice_SchemeImpact`**: Columns = `ID`, `Status_SchemeImpact`, plus all Section E fields (`AttendedTraining` ... `ExpectationsFromScheme`).
5. **`Slice_Digital`**: Columns = `ID`, `Status_Digital`, plus all Section F fields (`SmartphoneOwnership` ... `SocialMediaFrequency`).
6. **`Slice_PostExit`**: Columns = `ID`, `Status_PostExit`, plus all Section G fields (`OSFInterventionYear` ... `SupportNeededOther`). Row Filter: `OR([District] = "DIST_BARAN", [Block] = "BLK_RATANGARH")`.

### B. Inline Action Grid Buttons (Top of `Survey_Detail` View)
Create these actions on the `Survey` table with **Prominence: Display Prominently**:

| Action Name | Do This | Target / Expression | Icon | Behavior / Only_If |
|---|---|---|---|---|
| **`ACT_Complete`** | `Data: set values of some columns in this row` | `[Status] = "Submitted"` | `check-circle` (Green `#34A853`) | `[ProgressPct] >= 1.0` |
| **`ACT_Profile`** | `App: go to another view within this app` | `=LINKTOROW([ID], "Survey_Profile_Form")` | `user` | `TRUE` |
| **`ACT_Operations`**| `App: go to another view within this app` | `=LINKTOROW([ID], "Survey_Operations_Form")` | `storefront` | `TRUE` |
| **`ACT_Challenges`**| `App: go to another view within this app` | `=LINKTOROW([ID], "Survey_Challenges_Form")` | `trending-up` | `TRUE` |
| **`ACT_SchemeImpact`**| `App: go to another view within this app` | `=LINKTOROW([ID], "Survey_SchemeImpact_Form")` | `account-balance` | `TRUE` |
| **`ACT_Digital`** | `App: go to another view within this app` | `=LINKTOROW([ID], "Survey_Digital_Form")` | `smartphone` | `TRUE` |
| **`ACT_PostExit`** | `App: go to another view within this app` | `=LINKTOROW([ID], "Survey_PostExit_Form")` | `history` | `OR([District] = "DIST_BARAN", [Block] = "BLK_RATANGARH")` |

### C. Dynamic Format Rules (Visual Checkmarks When Done)
Create Format Rules on `Survey`:
- **When Section Done**: E.g. `[Status_Profile] = "SEC_DONE"`, set action icon color to Green `#34A853`.
- **When Section In Progress**: E.g. `[Status_Profile] = "SEC_IN_PROGRESS"`, set action icon color to Yellow `#FBBC05`.
- **When Pending**: Default Brand Blue `#4285F4`.

### D. Enumerator Daily Dashboard (`Surveyor_Dashboard`)
1. **Top KPI Cards**:
   - `🎯 Daily Target: 10`
   - `✅ Completed Today: [CompletedToday]`
   - `⏳ Drafts Pending: [DraftsPending]`
   - `📊 Progress: [TodayProgress]`
2. **"➕ Start Next Survey" Button**:
   - Action Target: `=LINKTOFORM("Survey_Form")`
   - Prominence: Prominent top button
3. **Surveys List**: Deck or Table view of current surveyor's surveys displaying respondent name, trade, village, status badge, and `% Filled`.

---

<div style="border-top:1px solid #dadce0; padding-top:12px; margin-top:24px; font-family:'Roboto',sans-serif; font-size:10px; color:#5f6368;">
  <div style="display:flex; justify-content:space-between; align-items:center; min-height:24px;">
    <span><strong style="color:#4285F4;">OmmNoMi Automation LLP</strong></span>
    <span>Karsog, Mandi, Himachal Pradesh, India</span>
  </div>
  <div style="display:flex; justify-content:space-between; align-items:center; min-height:24px; margin-top:4px;">
    <span style="font-style:italic;">Unlocking Business Potential Through Automation</span>
    <span>🌐 https://ommnomi.in | 📧 contact@ommnomi.in</span>
  </div>
</div>
