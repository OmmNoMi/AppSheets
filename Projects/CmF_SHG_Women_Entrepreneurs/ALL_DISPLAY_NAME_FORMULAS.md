# OmmNoMi AppSheet Survey Engine — Display Name Formulas Reference

This document contains all 227 column Display Name formulas for the `Survey` table in Google AppSheet.

Each formula dynamically looks up the trilingual label from `AppVariables` based on the logged-in surveyor's language.


## Section A: Basic Details (26 Columns)

| # | Column Name | Question / Meaning | AppSheet Display Name Formula |
|---|---|---|---|
| 1 | `Status_Profile` | Profile Section Status | `=LOOKUP("Q_STAT_PROFILE", "AppVariables", "ID", "Label")` |
| 2 | `Status_Operations` | Operations Section Status | `=LOOKUP("Q_STAT_OPERATIONS", "AppVariables", "ID", "Label")` |
| 3 | `Status_Challenges` | Challenges Section Status | `=LOOKUP("Q_STAT_CHALLENGES", "AppVariables", "ID", "Label")` |
| 4 | `Status_SchemeImpact` | Scheme Impact Section Status | `=LOOKUP("Q_STAT_SCHEME", "AppVariables", "ID", "Label")` |
| 5 | `Status_Digital` | Digital Media Section Status | `=LOOKUP("Q_STAT_DIGITAL", "AppVariables", "ID", "Label")` |
| 6 | `Status_PostExit` | Post-Exit OSF Section Status | `=LOOKUP("Q_STAT_POST_EXIT", "AppVariables", "ID", "Label")` |
| 7 | `District` | District | `=LOOKUP("Q_A_01_00", "AppVariables", "ID", "Label")` |
| 8 | `Block` | Block | `=LOOKUP("Q_A_02_00", "AppVariables", "ID", "Label")` |
| 9 | `VillageGP` | Village / Gram Panchayat | `=LOOKUP("Q_A_03_00", "AppVariables", "ID", "Label")` |
| 10 | `RespondentName` | Respondent Name | `=LOOKUP("Q_A_04_00", "AppVariables", "ID", "Label")` |
| 11 | `ContactNumber` | Contact Number | `=LOOKUP("Q_A_04_01", "AppVariables", "ID", "Label")` |
| 12 | `SHGName` | SHG Name | `=LOOKUP("Q_A_05_00", "AppVariables", "ID", "Label")` |
| 13 | `VOName` | VO Name | `=LOOKUP("Q_A_06_00", "AppVariables", "ID", "Label")` |
| 14 | `CLFName` | CLF Name | `=LOOKUP("Q_A_07_00", "AppVariables", "ID", "Label")` |
| 15 | `SHGMembershipYears` | Years of SHG membership | `=LOOKUP("Q_A_08_00", "AppVariables", "ID", "Label")` |
| 16 | `LeadershipRole` | Have you been in a leadership role in SHG/CLF/VO? | `=LOOKUP("Q_A_09_00", "AppVariables", "ID", "Label")` |
| 17 | `LeadershipYears` | Years of experience in leadership roles? | `=LOOKUP("Q_A_10_00", "AppVariables", "ID", "Label")` |
| 18 | `RelatedToCRP` | Are you related to any of the SVEP/OSF CRP? | `=LOOKUP("Q_A_11_00", "AppVariables", "ID", "Label")` |
| 19 | `EPInterventionType` | Type of Enterprise Promotion (EP) intervention | `=LOOKUP("Q_A_12_00", "AppVariables", "ID", "Label")` |
| 20 | `EnterpriseName` | Enterprise Name | `=LOOKUP("Q_A_13_00", "AppVariables", "ID", "Label")` |
| 21 | `ParallelEnterpriseName` | Parallel Enterprise Name (if running two businesses) | `=LOOKUP("Q_A_13_01", "AppVariables", "ID", "Label")` |
| 22 | `EnterpriseSetupYear` | Years of setting up enterprise (Year or count) | `=LOOKUP("Q_A_14_00", "AppVariables", "ID", "Label")` |
| 23 | `LoanReceivedYear` | Year of receiving SVEP/OSF loan? | `=LOOKUP("Q_A_15_00", "AppVariables", "ID", "Label")` |
| 24 | `BusinessType` | Type of business enterprise (Multiselect) | `=LOOKUP("Q_A_16_00", "AppVariables", "ID", "Label")` |
| 25 | `BusinessActivities` | Main business activities of the enterprise (Multiselect) | `=LOOKUP("Q_A_17_00", "AppVariables", "ID", "Label")` |
| 26 | `BusinessActivitiesOther` | Specify other business activity (if selected Any other) | `=LOOKUP("Q_A_17_01", "AppVariables", "ID", "Label")` |

---

## Section B: Respondent & Household Profile (13 Columns)

| # | Column Name | Question / Meaning | AppSheet Display Name Formula |
|---|---|---|---|
| 1 | `RespondentAge` | What is the age of the respondent? | `=LOOKUP("Q_B_01_00", "AppVariables", "ID", "Label")` |
| 2 | `MaritalStatus` | What is the marital status? | `=LOOKUP("Q_B_02_00", "AppVariables", "ID", "Label")` |
| 3 | `SocialCategory` | What is the social category? | `=LOOKUP("Q_B_03_00", "AppVariables", "ID", "Label")` |
| 4 | `EducationStatus` | What is the education status? | `=LOOKUP("Q_B_04_00", "AppVariables", "ID", "Label")` |
| 5 | `FamilyMemberCount` | How many members are in the family? | `=LOOKUP("Q_B_05_00", "AppVariables", "ID", "Label")` |
| 6 | `FamilyAdultsCount` | Adults (Above 18) | `=LOOKUP("Q_B_06_01", "AppVariables", "ID", "Label")` |
| 7 | `FamilyChildrenCount` | Children | `=LOOKUP("Q_B_06_02", "AppVariables", "ID", "Label")` |
| 8 | `FamilyTotalEarning` | Total earning members | `=LOOKUP("Q_B_06_03", "AppVariables", "ID", "Label")` |
| 9 | `FamilyMaleEarning` | Male earning members | `=LOOKUP("Q_B_06_04", "AppVariables", "ID", "Label")` |
| 10 | `FamilyFemaleEarning` | Female earning members | `=LOOKUP("Q_B_06_05", "AppVariables", "ID", "Label")` |
| 11 | `FamilyDisabledCount` | Members with disability | `=LOOKUP("Q_B_06_06", "AppVariables", "ID", "Label")` |
| 12 | `FamilyIncomeSources` | What are your family’s sources of income? (Multiselect) | `=LOOKUP("Q_B_07_00", "AppVariables", "ID", "Label")` |
| 13 | `AnnualHouseholdIncome` | What is your annual household income and monetary benefits f | `=LOOKUP("Q_B_08_00", "AppVariables", "ID", "Label")` |

---

## Section C: Enterprise Operations (154 Columns)

| # | Column Name | Question / Meaning | AppSheet Display Name Formula |
|---|---|---|---|
| 1 | `ReasonsStartingBusiness` | Reasons for starting the business? (Multiselect) | `=LOOKUP("Q_C_01_00", "AppVariables", "ID", "Label")` |
| 2 | `BusinessCycle` | Describe your business cycle? | `=LOOKUP("Q_C_02_00", "AppVariables", "ID", "Label")` |
| 3 | `BusinessCycleOther` | Specify other business cycle | `=LOOKUP("Q_C_02_01", "AppVariables", "ID", "Label")` |
| 4 | `BusinessPlaceType` | What is the type of business place? | `=LOOKUP("Q_C_03_00", "AppVariables", "ID", "Label")` |
| 5 | `AnnualRent` | If rented, what is annual rent? (Rs) | `=LOOKUP("Q_C_04_00", "AppVariables", "ID", "Label")` |
| 6 | `LocationConvenience` | Is the location of your premise convenient for your customer | `=LOOKUP("Q_C_05_00", "AppVariables", "ID", "Label")` |
| 7 | `LocationConvenienceOther` | Specify other location convenience remark | `=LOOKUP("Q_C_05_01", "AppVariables", "ID", "Label")` |
| 8 | `Labor_Purchase_Involvement` | Purchase of material — Involvement of family members | `=LOOKUP("Q_C_06_Purchase_INV", "AppVariables", "ID", "Label")` |
| 9 | `Labor_Purchase_FamilyCount` | Purchase of material — Family members involved (#) | `=LOOKUP("Q_C_06_Purchase_FAM", "AppVariables", "ID", "Label")` |
| 10 | `Labor_Purchase_HiredCount` | Purchase of material — Hired help (#) | `=LOOKUP("Q_C_06_Purchase_HIRED", "AppVariables", "ID", "Label")` |
| 11 | `Labor_Purchase_AmountPaid` | Purchase of material — Amount paid in last one year (Rs) | `=LOOKUP("Q_C_06_Purchase_AMT", "AppVariables", "ID", "Label")` |
| 12 | `Labor_Prod_Involvement` | Production — Involvement of family members | `=LOOKUP("Q_C_06_Prod_INV", "AppVariables", "ID", "Label")` |
| 13 | `Labor_Prod_FamilyCount` | Production — Family members involved (#) | `=LOOKUP("Q_C_06_Prod_FAM", "AppVariables", "ID", "Label")` |
| 14 | `Labor_Prod_HiredCount` | Production — Hired help (#) | `=LOOKUP("Q_C_06_Prod_HIRED", "AppVariables", "ID", "Label")` |
| 15 | `Labor_Prod_AmountPaid` | Production — Amount paid in last one year (Rs) | `=LOOKUP("Q_C_06_Prod_AMT", "AppVariables", "ID", "Label")` |
| 16 | `Labor_Serv_Involvement` | Servicing — Involvement of family members | `=LOOKUP("Q_C_06_Serv_INV", "AppVariables", "ID", "Label")` |
| 17 | `Labor_Serv_FamilyCount` | Servicing — Family members involved (#) | `=LOOKUP("Q_C_06_Serv_FAM", "AppVariables", "ID", "Label")` |
| 18 | `Labor_Serv_HiredCount` | Servicing — Hired help (#) | `=LOOKUP("Q_C_06_Serv_HIRED", "AppVariables", "ID", "Label")` |
| 19 | `Labor_Serv_AmountPaid` | Servicing — Amount paid in last one year (Rs) | `=LOOKUP("Q_C_06_Serv_AMT", "AppVariables", "ID", "Label")` |
| 20 | `Labor_Mktg_Involvement` | Social media marketing — Involvement of family members | `=LOOKUP("Q_C_06_Mktg_INV", "AppVariables", "ID", "Label")` |
| 21 | `Labor_Mktg_FamilyCount` | Social media marketing — Family members involved (#) | `=LOOKUP("Q_C_06_Mktg_FAM", "AppVariables", "ID", "Label")` |
| 22 | `Labor_Mktg_HiredCount` | Social media marketing — Hired help (#) | `=LOOKUP("Q_C_06_Mktg_HIRED", "AppVariables", "ID", "Label")` |
| 23 | `Labor_Mktg_AmountPaid` | Social media marketing — Amount paid in last one year (Rs) | `=LOOKUP("Q_C_06_Mktg_AMT", "AppVariables", "ID", "Label")` |
| 24 | `Labor_Sale_Involvement` | Sale (shop/door to door/haat) — Involvement of family member | `=LOOKUP("Q_C_06_Sale_INV", "AppVariables", "ID", "Label")` |
| 25 | `Labor_Sale_FamilyCount` | Sale (shop/door to door/haat) — Family members involved (#) | `=LOOKUP("Q_C_06_Sale_FAM", "AppVariables", "ID", "Label")` |
| 26 | `Labor_Sale_HiredCount` | Sale (shop/door to door/haat) — Hired help (#) | `=LOOKUP("Q_C_06_Sale_HIRED", "AppVariables", "ID", "Label")` |
| 27 | `Labor_Sale_AmountPaid` | Sale (shop/door to door/haat) — Amount paid in last one year | `=LOOKUP("Q_C_06_Sale_AMT", "AppVariables", "ID", "Label")` |
| 28 | `Labor_Record_Involvement` | Record keeping — Involvement of family members | `=LOOKUP("Q_C_06_Record_INV", "AppVariables", "ID", "Label")` |
| 29 | `Labor_Record_FamilyCount` | Record keeping — Family members involved (#) | `=LOOKUP("Q_C_06_Record_FAM", "AppVariables", "ID", "Label")` |
| 30 | `Labor_Record_HiredCount` | Record keeping — Hired help (#) | `=LOOKUP("Q_C_06_Record_HIRED", "AppVariables", "ID", "Label")` |
| 31 | `Labor_Record_AmountPaid` | Record keeping — Amount paid in last one year (Rs) | `=LOOKUP("Q_C_06_Record_AMT", "AppVariables", "ID", "Label")` |
| 32 | `AnnualSalaryBill` | What is your annual salary bill (paid to hired help)? | `=LOOKUP("Q_C_07_00", "AppVariables", "ID", "Label")` |
| 33 | `Sourcing_NearbyTown_Pct` | Material sourcing % from Nearby town/district | `=LOOKUP("Q_C_08_NearbyTown", "AppVariables", "ID", "Label")` |
| 34 | `Sourcing_Jaipur_Pct` | Material sourcing % from Jaipur | `=LOOKUP("Q_C_08_Jaipur", "AppVariables", "ID", "Label")` |
| 35 | `Sourcing_OutsideState_Pct` | Material sourcing % from Outside the state | `=LOOKUP("Q_C_08_OutsideState", "AppVariables", "ID", "Label")` |
| 36 | `Sourcing_Online_Pct` | Material sourcing % from Order online (Amazon/Meesho) | `=LOOKUP("Q_C_08_Online", "AppVariables", "ID", "Label")` |
| 37 | `Sourcing_WhatsApp_Pct` | Material sourcing % from Order using WhatsApp from existing  | `=LOOKUP("Q_C_08_WhatsApp", "AppVariables", "ID", "Label")` |
| 38 | `MarketingMethods` | How do you market your products/services? (Multiselect) | `=LOOKUP("Q_C_09_00", "AppVariables", "ID", "Label")` |
| 39 | `MarketingMethodsOther` | Specify other marketing method | `=LOOKUP("Q_C_09_01", "AppVariables", "ID", "Label")` |
| 40 | `SeasonalSalesMethod` | In case of seasonal production, how do you sell your product | `=LOOKUP("Q_C_10_00", "AppVariables", "ID", "Label")` |
| 41 | `SeasonalSalesOnlinePlatform` | Specify online platform used | `=LOOKUP("Q_C_10_01", "AppVariables", "ID", "Label")` |
| 42 | `SeasonalSalesOther` | Specify other seasonal method | `=LOOKUP("Q_C_10_02", "AppVariables", "ID", "Label")` |
| 43 | `SocialMediaForMarketing` | Do you use social media for marketing? | `=LOOKUP("Q_C_11_00", "AppVariables", "ID", "Label")` |
| 44 | `SocialMediaForMarketingOther` | Specify other social media reason | `=LOOKUP("Q_C_11_01", "AppVariables", "ID", "Label")` |
| 45 | `SalesChannel_Online_Pct` | % products/services sold through Online platforms | `=LOOKUP("Q_C_12_Online", "AppVariables", "ID", "Label")` |
| 46 | `SalesChannel_WhatsApp_Pct` | % products/services sold through WhatsApp | `=LOOKUP("Q_C_12_WhatsApp", "AppVariables", "ID", "Label")` |
| 47 | `SalesChannel_Instagram_Pct` | % products/services sold through Instagram | `=LOOKUP("Q_C_12_Instagram", "AppVariables", "ID", "Label")` |
| 48 | `SalesChannel_Premise_Pct` | % products/services sold through Your premise / shop | `=LOOKUP("Q_C_12_Premise", "AppVariables", "ID", "Label")` |
| 49 | `SalesChannel_Traders_Pct` | % products/services sold through Local traders / shopkeepers | `=LOOKUP("Q_C_12_Traders", "AppVariables", "ID", "Label")` |
| 50 | `SalesChannel_Haat_Pct` | % products/services sold through Local haat / weekly market | `=LOOKUP("Q_C_12_Haat", "AppVariables", "ID", "Label")` |
| 51 | `SalesChannel_Saras_Pct` | % products/services sold through Saras fair | `=LOOKUP("Q_C_12_Saras", "AppVariables", "ID", "Label")` |
| 52 | `RecordKeepingHabit` | Do you maintain written records of business transactions? | `=LOOKUP("Q_C_13_00", "AppVariables", "ID", "Label")` |
| 53 | `RecordKeepingMethod` | How do you maintain business transactions? | `=LOOKUP("Q_C_14_00", "AppVariables", "ID", "Label")` |
| 54 | `RecordKeepingOther` | Specify other record keeping method | `=LOOKUP("Q_C_14_01", "AppVariables", "ID", "Label")` |
| 55 | `Turnover_Peak_Months` | Peak season — Duration in months (count) | `=LOOKUP("Q_C_15_Peak_MTH", "AppVariables", "ID", "Label")` |
| 56 | `Turnover_Peak_Sales` | Peak season — Monthly sales (Rs) | `=LOOKUP("Q_C_15_Peak_SALES", "AppVariables", "ID", "Label")` |
| 57 | `Turnover_Peak_Profit` | Peak season — Monthly income / profit (Rs) | `=LOOKUP("Q_C_15_Peak_PROFIT", "AppVariables", "ID", "Label")` |
| 58 | `Turnover_Avg_Months` | Average season — Duration in months (count) | `=LOOKUP("Q_C_15_Avg_MTH", "AppVariables", "ID", "Label")` |
| 59 | `Turnover_Avg_Sales` | Average season — Monthly sales (Rs) | `=LOOKUP("Q_C_15_Avg_SALES", "AppVariables", "ID", "Label")` |
| 60 | `Turnover_Avg_Profit` | Average season — Monthly income / profit (Rs) | `=LOOKUP("Q_C_15_Avg_PROFIT", "AppVariables", "ID", "Label")` |
| 61 | `Turnover_Lean_Months` | Lean season — Duration in months (count) | `=LOOKUP("Q_C_15_Lean_MTH", "AppVariables", "ID", "Label")` |
| 62 | `Turnover_Lean_Sales` | Lean season — Monthly sales (Rs) | `=LOOKUP("Q_C_15_Lean_SALES", "AppVariables", "ID", "Label")` |
| 63 | `Turnover_Lean_Profit` | Lean season — Monthly income / profit (Rs) | `=LOOKUP("Q_C_15_Lean_PROFIT", "AppVariables", "ID", "Label")` |
| 64 | `InitialStartCapital` | With how much money did you start the enterprise? (Rs) | `=LOOKUP("Q_C_16_00", "AppVariables", "ID", "Label")` |
| 65 | `InitialCapitalArranged` | How did you arrange this amount? | `=LOOKUP("Q_C_17_00", "AppVariables", "ID", "Label")` |
| 66 | `SHGAssociationAssistance` | How has the SHG association helped in your enterprise? (Mult | `=LOOKUP("Q_C_18_00", "AppVariables", "ID", "Label")` |
| 67 | `Cap_OwnSavings_Yr1` | Own Savings — First year amount (Rs) | `=LOOKUP("Q_C_19_OwnSavings_YR1", "AppVariables", "ID", "Label")` |
| 68 | `Cap_OwnSavings_Mid` | Own Savings — In-between years amount (Rs) | `=LOOKUP("Q_C_19_OwnSavings_MID", "AppVariables", "ID", "Label")` |
| 69 | `Cap_OwnSavings_Cur` | Own Savings — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_OwnSavings_CUR", "AppVariables", "ID", "Label")` |
| 70 | `Cap_OwnSavings_Pending` | Own Savings — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_OwnSavings_PEN", "AppVariables", "ID", "Label")` |
| 71 | `Cap_OwnSavings_Usage` | Own Savings — How loan used in business | `=LOOKUP("Q_C_20_OwnSavings_USE", "AppVariables", "ID", "Label")` |
| 72 | `Cap_Family_Yr1` | Financed by family member — First year amount (Rs) | `=LOOKUP("Q_C_19_Family_YR1", "AppVariables", "ID", "Label")` |
| 73 | `Cap_Family_Mid` | Financed by family member — In-between years amount (Rs) | `=LOOKUP("Q_C_19_Family_MID", "AppVariables", "ID", "Label")` |
| 74 | `Cap_Family_Cur` | Financed by family member — Current year (2026-27) amount (R | `=LOOKUP("Q_C_19_Family_CUR", "AppVariables", "ID", "Label")` |
| 75 | `Cap_Family_Pending` | Financed by family member — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_Family_PEN", "AppVariables", "ID", "Label")` |
| 76 | `Cap_Family_Usage` | Financed by family member — How loan used in business | `=LOOKUP("Q_C_20_Family_USE", "AppVariables", "ID", "Label")` |
| 77 | `Cap_Profit_Yr1` | Profit from business — First year amount (Rs) | `=LOOKUP("Q_C_19_Profit_YR1", "AppVariables", "ID", "Label")` |
| 78 | `Cap_Profit_Mid` | Profit from business — In-between years amount (Rs) | `=LOOKUP("Q_C_19_Profit_MID", "AppVariables", "ID", "Label")` |
| 79 | `Cap_Profit_Cur` | Profit from business — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_Profit_CUR", "AppVariables", "ID", "Label")` |
| 80 | `Cap_Profit_Pending` | Profit from business — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_Profit_PEN", "AppVariables", "ID", "Label")` |
| 81 | `Cap_Profit_Usage` | Profit from business — How loan used in business | `=LOOKUP("Q_C_20_Profit_USE", "AppVariables", "ID", "Label")` |
| 82 | `Cap_MortgGold_Yr1` | Mortgaged gold/silver — First year amount (Rs) | `=LOOKUP("Q_C_19_MortgGold_YR1", "AppVariables", "ID", "Label")` |
| 83 | `Cap_MortgGold_Mid` | Mortgaged gold/silver — In-between years amount (Rs) | `=LOOKUP("Q_C_19_MortgGold_MID", "AppVariables", "ID", "Label")` |
| 84 | `Cap_MortgGold_Cur` | Mortgaged gold/silver — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_MortgGold_CUR", "AppVariables", "ID", "Label")` |
| 85 | `Cap_MortgGold_Pending` | Mortgaged gold/silver — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_MortgGold_PEN", "AppVariables", "ID", "Label")` |
| 86 | `Cap_MortgGold_Usage` | Mortgaged gold/silver — How loan used in business | `=LOOKUP("Q_C_20_MortgGold_USE", "AppVariables", "ID", "Label")` |
| 87 | `Cap_SoldGold_Yr1` | Sold gold/silver — First year amount (Rs) | `=LOOKUP("Q_C_19_SoldGold_YR1", "AppVariables", "ID", "Label")` |
| 88 | `Cap_SoldGold_Mid` | Sold gold/silver — In-between years amount (Rs) | `=LOOKUP("Q_C_19_SoldGold_MID", "AppVariables", "ID", "Label")` |
| 89 | `Cap_SoldGold_Cur` | Sold gold/silver — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_SoldGold_CUR", "AppVariables", "ID", "Label")` |
| 90 | `Cap_SoldGold_Pending` | Sold gold/silver — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_SoldGold_PEN", "AppVariables", "ID", "Label")` |
| 91 | `Cap_SoldGold_Usage` | Sold gold/silver — How loan used in business | `=LOOKUP("Q_C_20_SoldGold_USE", "AppVariables", "ID", "Label")` |
| 92 | `Cap_FamLoan_Yr1` | Loan from family — First year amount (Rs) | `=LOOKUP("Q_C_19_FamLoan_YR1", "AppVariables", "ID", "Label")` |
| 93 | `Cap_FamLoan_Mid` | Loan from family — In-between years amount (Rs) | `=LOOKUP("Q_C_19_FamLoan_MID", "AppVariables", "ID", "Label")` |
| 94 | `Cap_FamLoan_Cur` | Loan from family — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_FamLoan_CUR", "AppVariables", "ID", "Label")` |
| 95 | `Cap_FamLoan_Pending` | Loan from family — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_FamLoan_PEN", "AppVariables", "ID", "Label")` |
| 96 | `Cap_FamLoan_Usage` | Loan from family — How loan used in business | `=LOOKUP("Q_C_20_FamLoan_USE", "AppVariables", "ID", "Label")` |
| 97 | `Cap_Moneylender_Yr1` | Loan from moneylender — First year amount (Rs) | `=LOOKUP("Q_C_19_Moneylender_YR1", "AppVariables", "ID", "Label")` |
| 98 | `Cap_Moneylender_Mid` | Loan from moneylender — In-between years amount (Rs) | `=LOOKUP("Q_C_19_Moneylender_MID", "AppVariables", "ID", "Label")` |
| 99 | `Cap_Moneylender_Cur` | Loan from moneylender — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_Moneylender_CUR", "AppVariables", "ID", "Label")` |
| 100 | `Cap_Moneylender_Pending` | Loan from moneylender — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_Moneylender_PEN", "AppVariables", "ID", "Label")` |
| 101 | `Cap_Moneylender_Usage` | Loan from moneylender — How loan used in business | `=LOOKUP("Q_C_20_Moneylender_USE", "AppVariables", "ID", "Label")` |
| 102 | `Cap_SHGLoan_Yr1` | Loan from SHG — First year amount (Rs) | `=LOOKUP("Q_C_19_SHGLoan_YR1", "AppVariables", "ID", "Label")` |
| 103 | `Cap_SHGLoan_Mid` | Loan from SHG — In-between years amount (Rs) | `=LOOKUP("Q_C_19_SHGLoan_MID", "AppVariables", "ID", "Label")` |
| 104 | `Cap_SHGLoan_Cur` | Loan from SHG — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_SHGLoan_CUR", "AppVariables", "ID", "Label")` |
| 105 | `Cap_SHGLoan_Pending` | Loan from SHG — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_SHGLoan_PEN", "AppVariables", "ID", "Label")` |
| 106 | `Cap_SHGLoan_Usage` | Loan from SHG — How loan used in business | `=LOOKUP("Q_C_20_SHGLoan_USE", "AppVariables", "ID", "Label")` |
| 107 | `Cap_OSFSVEPLoan_Yr1` | Loan from OSF/SVEP — First year amount (Rs) | `=LOOKUP("Q_C_19_OSFSVEPLoan_YR1", "AppVariables", "ID", "Label")` |
| 108 | `Cap_OSFSVEPLoan_Mid` | Loan from OSF/SVEP — In-between years amount (Rs) | `=LOOKUP("Q_C_19_OSFSVEPLoan_MID", "AppVariables", "ID", "Label")` |
| 109 | `Cap_OSFSVEPLoan_Cur` | Loan from OSF/SVEP — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_OSFSVEPLoan_CUR", "AppVariables", "ID", "Label")` |
| 110 | `Cap_OSFSVEPLoan_Pending` | Loan from OSF/SVEP — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_OSFSVEPLoan_PEN", "AppVariables", "ID", "Label")` |
| 111 | `Cap_OSFSVEPLoan_Usage` | Loan from OSF/SVEP — How loan used in business | `=LOOKUP("Q_C_20_OSFSVEPLoan_USE", "AppVariables", "ID", "Label")` |
| 112 | `Cap_OSFSubsidy_Yr1` | Subsidy/grant under OSF/SVEP — First year amount (Rs) | `=LOOKUP("Q_C_19_OSFSubsidy_YR1", "AppVariables", "ID", "Label")` |
| 113 | `Cap_OSFSubsidy_Mid` | Subsidy/grant under OSF/SVEP — In-between years amount (Rs) | `=LOOKUP("Q_C_19_OSFSubsidy_MID", "AppVariables", "ID", "Label")` |
| 114 | `Cap_OSFSubsidy_Cur` | Subsidy/grant under OSF/SVEP — Current year (2026-27) amount | `=LOOKUP("Q_C_19_OSFSubsidy_CUR", "AppVariables", "ID", "Label")` |
| 115 | `Cap_OSFSubsidy_Pending` | Subsidy/grant under OSF/SVEP — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_OSFSubsidy_PEN", "AppVariables", "ID", "Label")` |
| 116 | `Cap_OSFSubsidy_Usage` | Subsidy/grant under OSF/SVEP — How loan used in business | `=LOOKUP("Q_C_20_OSFSubsidy_USE", "AppVariables", "ID", "Label")` |
| 117 | `Cap_PrivSaving_Yr1` | Loan from private saving groups/BC — First year amount (Rs) | `=LOOKUP("Q_C_19_PrivSaving_YR1", "AppVariables", "ID", "Label")` |
| 118 | `Cap_PrivSaving_Mid` | Loan from private saving groups/BC — In-between years amount | `=LOOKUP("Q_C_19_PrivSaving_MID", "AppVariables", "ID", "Label")` |
| 119 | `Cap_PrivSaving_Cur` | Loan from private saving groups/BC — Current year (2026-27)  | `=LOOKUP("Q_C_19_PrivSaving_CUR", "AppVariables", "ID", "Label")` |
| 120 | `Cap_PrivSaving_Pending` | Loan from private saving groups/BC — Amount pending / balanc | `=LOOKUP("Q_C_19_PrivSaving_PEN", "AppVariables", "ID", "Label")` |
| 121 | `Cap_PrivSaving_Usage` | Loan from private saving groups/BC — How loan used in busine | `=LOOKUP("Q_C_20_PrivSaving_USE", "AppVariables", "ID", "Label")` |
| 122 | `Cap_NBFC_Yr1` | Loan from NBFC — First year amount (Rs) | `=LOOKUP("Q_C_19_NBFC_YR1", "AppVariables", "ID", "Label")` |
| 123 | `Cap_NBFC_Mid` | Loan from NBFC — In-between years amount (Rs) | `=LOOKUP("Q_C_19_NBFC_MID", "AppVariables", "ID", "Label")` |
| 124 | `Cap_NBFC_Cur` | Loan from NBFC — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_NBFC_CUR", "AppVariables", "ID", "Label")` |
| 125 | `Cap_NBFC_Pending` | Loan from NBFC — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_NBFC_PEN", "AppVariables", "ID", "Label")` |
| 126 | `Cap_NBFC_Usage` | Loan from NBFC — How loan used in business | `=LOOKUP("Q_C_20_NBFC_USE", "AppVariables", "ID", "Label")` |
| 127 | `Cap_Mudra_Yr1` | Mudra loan — First year amount (Rs) | `=LOOKUP("Q_C_19_Mudra_YR1", "AppVariables", "ID", "Label")` |
| 128 | `Cap_Mudra_Mid` | Mudra loan — In-between years amount (Rs) | `=LOOKUP("Q_C_19_Mudra_MID", "AppVariables", "ID", "Label")` |
| 129 | `Cap_Mudra_Cur` | Mudra loan — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_Mudra_CUR", "AppVariables", "ID", "Label")` |
| 130 | `Cap_Mudra_Pending` | Mudra loan — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_Mudra_PEN", "AppVariables", "ID", "Label")` |
| 131 | `Cap_Mudra_Usage` | Mudra loan — How loan used in business | `=LOOKUP("Q_C_20_Mudra_USE", "AppVariables", "ID", "Label")` |
| 132 | `Cap_BankLoan_Yr1` | Loan from banks — First year amount (Rs) | `=LOOKUP("Q_C_19_BankLoan_YR1", "AppVariables", "ID", "Label")` |
| 133 | `Cap_BankLoan_Mid` | Loan from banks — In-between years amount (Rs) | `=LOOKUP("Q_C_19_BankLoan_MID", "AppVariables", "ID", "Label")` |
| 134 | `Cap_BankLoan_Cur` | Loan from banks — Current year (2026-27) amount (Rs) | `=LOOKUP("Q_C_19_BankLoan_CUR", "AppVariables", "ID", "Label")` |
| 135 | `Cap_BankLoan_Pending` | Loan from banks — Amount pending / balance (Rs) | `=LOOKUP("Q_C_19_BankLoan_PEN", "AppVariables", "ID", "Label")` |
| 136 | `Cap_BankLoan_Usage` | Loan from banks — How loan used in business | `=LOOKUP("Q_C_20_BankLoan_USE", "AppVariables", "ID", "Label")` |
| 137 | `MonthlyIncomeIncreaseByOSFSVEP` | Amount by which monthly income increased directly due to OSF | `=LOOKUP("Q_C_21_00", "AppVariables", "ID", "Label")` |
| 138 | `Trajectory_Sales_Yr1` | Average sales/month (First Year) [Rs] | `=LOOKUP("Q_C_22_Sales_YR1", "AppVariables", "ID", "Label")` |
| 139 | `Trajectory_Sales_Cur` | Average sales/month (Current Year) [Rs] | `=LOOKUP("Q_C_22_Sales_CUR", "AppVariables", "ID", "Label")` |
| 140 | `Trajectory_Income_Yr1` | Average monthly income (First Year) [Rs] | `=LOOKUP("Q_C_22_Income_YR1", "AppVariables", "ID", "Label")` |
| 141 | `Trajectory_Income_Cur` | Average monthly income (Current Year) [Rs] | `=LOOKUP("Q_C_22_Income_CUR", "AppVariables", "ID", "Label")` |
| 142 | `Trajectory_TradeStock_Yr1` | In case of trading, value of inventory/stock (First Year) [R | `=LOOKUP("Q_C_22_TradeStock_YR1", "AppVariables", "ID", "Label")` |
| 143 | `Trajectory_TradeStock_Cur` | In case of trading, value of inventory/stock (Current Year)  | `=LOOKUP("Q_C_22_TradeStock_CUR", "AppVariables", "ID", "Label")` |
| 144 | `Trajectory_ProdInputs_Yr1` | In case of production, value of stock of inputs (First Year) | `=LOOKUP("Q_C_22_ProdInputs_YR1", "AppVariables", "ID", "Label")` |
| 145 | `Trajectory_ProdInputs_Cur` | In case of production, value of stock of inputs (Current Yea | `=LOOKUP("Q_C_22_ProdInputs_CUR", "AppVariables", "ID", "Label")` |
| 146 | `Trajectory_ProdFinished_Yr1` | In case of production, value of finished products (First Yea | `=LOOKUP("Q_C_22_ProdFinished_YR1", "AppVariables", "ID", "Label")` |
| 147 | `Trajectory_ProdFinished_Cur` | In case of production, value of finished products (Current Y | `=LOOKUP("Q_C_22_ProdFinished_CUR", "AppVariables", "ID", "Label")` |
| 148 | `Trajectory_ServAssets_Yr1` | In case of servicing, value of enterprise related assets (Fi | `=LOOKUP("Q_C_22_ServAssets_YR1", "AppVariables", "ID", "Label")` |
| 149 | `Trajectory_ServAssets_Cur` | In case of servicing, value of enterprise related assets (Cu | `=LOOKUP("Q_C_22_ServAssets_CUR", "AppVariables", "ID", "Label")` |
| 150 | `FinancialHelpFromIncome` | How has income from enterprise helped you financially? (Mult | `=LOOKUP("Q_C_23_00", "AppVariables", "ID", "Label")` |
| 151 | `FinancialHelp_EducationAmt` | Education expenses contribution amount (Rs) | `=LOOKUP("Q_C_23_01", "AppVariables", "ID", "Label")` |
| 152 | `FinancialHelp_DebtsAmt` | Family debts paid amount (Rs) | `=LOOKUP("Q_C_23_02", "AppVariables", "ID", "Label")` |
| 153 | `FinancialHelp_AssetsAmt` | Assets acquisition contribution amount (Rs) | `=LOOKUP("Q_C_23_03", "AppVariables", "ID", "Label")` |
| 154 | `FinancialHelp_MarriageAmt` | Marriage expenses contribution amount (Rs) | `=LOOKUP("Q_C_23_04", "AppVariables", "ID", "Label")` |

---

## Section D: Ease of Doing Business & Challenges (11 Columns)

| # | Column Name | Question / Meaning | AppSheet Display Name Formula |
|---|---|---|---|
| 1 | `HusbandFamilyResponse` | How has been your husband’s/Family’s response towards your e | `=LOOKUP("Q_D_01_00", "AppVariables", "ID", "Label")` |
| 2 | `MaterialSourcingComfort` | What is your level of comfort in sourcing material? | `=LOOKUP("Q_D_02_00", "AppVariables", "ID", "Label")` |
| 3 | `CustomerPaymentRecovery` | Are you able to recover money from customers? | `=LOOKUP("Q_D_03_00", "AppVariables", "ID", "Label")` |
| 4 | `FundingExperience` | What has been your experience in funding your business? (Mul | `=LOOKUP("Q_D_04_00", "AppVariables", "ID", "Label")` |
| 5 | `CurrentChallenges` | What are the challenges you are facing now? (Multiselect) | `=LOOKUP("Q_D_05_00", "AppVariables", "ID", "Label")` |
| 6 | `Challenge_OSFPhasedOutAmt` | OSF phased out fund deficit amount (Rs) | `=LOOKUP("Q_D_05_01", "AppVariables", "ID", "Label")` |
| 7 | `Challenge_ScaleUpFundAmt` | Scale up funds required amount (Rs) | `=LOOKUP("Q_D_05_02", "AppVariables", "ID", "Label")` |
| 8 | `Challenge_RenovationFundAmt` | Renovation funds required amount (Rs) | `=LOOKUP("Q_D_05_03", "AppVariables", "ID", "Label")` |
| 9 | `Challenge_TimelyInputsAmt` | Timely inputs funds required amount (Rs) | `=LOOKUP("Q_D_05_04", "AppVariables", "ID", "Label")` |
| 10 | `Challenge_InventoryHelpAmt` | Current value of unsold inventory (Rs) | `=LOOKUP("Q_D_05_05", "AppVariables", "ID", "Label")` |
| 11 | `Challenge_Other` | Specify other challenge remark | `=LOOKUP("Q_D_05_06", "AppVariables", "ID", "Label")` |

---

## Section E: Impact of SVEP/OSF Schemes (9 Columns)

| # | Column Name | Question / Meaning | AppSheet Display Name Formula |
|---|---|---|---|
| 1 | `AttendedTraining` | Have you attended any training under SVEP/OSF? | `=LOOKUP("Q_E_01_00", "AppVariables", "ID", "Label")` |
| 2 | `TrainingDetails` | If Yes, specify training topic / trade | `=LOOKUP("Q_E_02_00", "AppVariables", "ID", "Label")` |
| 3 | `UsedTrainingComponent` | Did you use any training component in your enterprise? | `=LOOKUP("Q_E_03_00", "AppVariables", "ID", "Label")` |
| 4 | `UsedTrainingDetails` | If Yes, specify which component used | `=LOOKUP("Q_E_04_00", "AppVariables", "ID", "Label")` |
| 5 | `MonthlyIncomeBeforeLoan` | Monthly income BEFORE the changes (Rs) | `=LOOKUP("Q_E_05_01", "AppVariables", "ID", "Label")` |
| 6 | `MonthlyIncomeAfterLoan` | Monthly income AFTER the changes (Rs) | `=LOOKUP("Q_E_05_02", "AppVariables", "ID", "Label")` |
| 7 | `CRPContributions` | What has been the contribution of SVEP/OSF CRP in your enter | `=LOOKUP("Q_E_06_00", "AppVariables", "ID", "Label")` |
| 8 | `CRPContributionDocDetails` | Specify documents made with CRP help | `=LOOKUP("Q_E_06_01", "AppVariables", "ID", "Label")` |
| 9 | `ExpectationsFromScheme` | What are your expectations from the SVEP/OSF scheme? | `=LOOKUP("Q_E_07_00", "AppVariables", "ID", "Label")` |

---

## Section F: Online Transactions & Social Media (7 Columns)

| # | Column Name | Question / Meaning | AppSheet Display Name Formula |
|---|---|---|---|
| 1 | `SmartphoneOwnership` | Do you own a smart phone? | `=LOOKUP("Q_F_01_00", "AppVariables", "ID", "Label")` |
| 2 | `UseQRUPI` | Do you use QR code/mobile banking for money transactions? | `=LOOKUP("Q_F_02_00", "AppVariables", "ID", "Label")` |
| 3 | `QRDailyTransactions` | If yes, daily how many transactions done using QR / UPI? | `=LOOKUP("Q_F_03_00", "AppVariables", "ID", "Label")` |
| 4 | `QRNonUseReason` | If no, reason for not using QR code / mobile banking | `=LOOKUP("Q_F_04_00", "AppVariables", "ID", "Label")` |
| 5 | `SocialPlatformsUsed` | Which social media platforms do you use for your business? ( | `=LOOKUP("Q_F_05_00", "AppVariables", "ID", "Label")` |
| 6 | `SocialPlatformUsageMode` | How do you use these platforms in your business? (Multiselec | `=LOOKUP("Q_F_06_00", "AppVariables", "ID", "Label")` |
| 7 | `SocialMediaFrequency` | How often do you use social media for your business? | `=LOOKUP("Q_F_07_00", "AppVariables", "ID", "Label")` |

---

## Section G: Post-Exit OSF in Baran & Ratangarh (7 Columns)

| # | Column Name | Question / Meaning | AppSheet Display Name Formula |
|---|---|---|---|
| 1 | `OSFInterventionYear` | In which year was the OSF intervention made? (Year) | `=LOOKUP("Q_G_01_00", "AppVariables", "ID", "Label")` |
| 2 | `BusinessOperationalStatus` | Is your business still operational? | `=LOOKUP("Q_G_02_00", "AppVariables", "ID", "Label")` |
| 3 | `BusinessClosureYear` | If closed, specify year when it was closed | `=LOOKUP("Q_G_02_01", "AppVariables", "ID", "Label")` |
| 4 | `ScalingDownClosingReasons` | What are the reasons for scaling down the business/closing t | `=LOOKUP("Q_G_03_00", "AppVariables", "ID", "Label")` |
| 5 | `ScalingDownOtherReason` | Specify other closing reason | `=LOOKUP("Q_G_03_01", "AppVariables", "ID", "Label")` |
| 6 | `SupportNeededForSustenance` | What kind of support could have helped you to manage your bu | `=LOOKUP("Q_G_04_00", "AppVariables", "ID", "Label")` |
| 7 | `SupportNeededOther` | Specify other support needed | `=LOOKUP("Q_G_04_01", "AppVariables", "ID", "Label")` |

---
