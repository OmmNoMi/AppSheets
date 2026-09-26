// ==============================================================================
// OmmNoMi Master Survey Validations, Show_If, Required_If & Year Ranges Injector
// 100% Pure ASCII, Zero Syntax Errors, Validated with node -c
// ==============================================================================
(function runOmmNoMiValidationsSetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Validations, Show_If and Required_If Setup ===");

    // 1. Locate Store
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length && !store; i++) {
        var keys = Object.keys(els[i]);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].startsWith('__reactFiber') || keys[k].startsWith('__reactInternalInstance')) {
            var f = els[i][keys[k]];
            while (f && !store) {
              if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) store = f.memoizedProps.store;
              else if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) store = f.stateNode.store;
              f = f.return;
            }
            break;
          }
        }
      }
    }
    if (!store) return console.error("[FAIL] Store not found! AppSheet editor me kisi column par click karein.");
    window.appStore = store;

    // 2. Locate Survey Schema
    var schemas = store.getState().appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var surveyIdx = -1;
    for (var si = 0; si < schemas.length; si++) {
      var s = schemas[si];
      if (s.Name === 'Survey_Schema' || s.TableName === 'Survey' || s.Name === 'Survey') { surveyIdx = si; break; }
    }
    if (surveyIdx === -1) return console.error("[FAIL] Survey table schema not found.");

    var attrs = schemas[surveyIdx].Attributes || [];
    var attrMap = {};
    for (var ai = 0; ai < attrs.length; ai++) attrMap[attrs[ai].Name] = ai;

    // 3. Validation Rules Map
    var RULES = {
  "Q_A_01_District": {
    "required_if": "TRUE"
  },
  "Q_A_02_Block": {
    "required_if": "TRUE"
  },
  "Q_A_03_VillageGP": {
    "required_if": "TRUE"
  },
  "Q_A_04_RespondentName": {
    "required_if": "TRUE"
  },
  "Q_A_05_RespondentPhone": {
    "required_if": "TRUE",
    "valid_if": "AND(LEN(TEXT([_THIS])) = 10, NUMBER(TEXT([_THIS])) >= 5000000000)",
    "error_msg": "Please enter a valid 10-digit mobile number."
  },
  "Q_A_06_SHGName": {
    "required_if": "TRUE"
  },
  "Q_A_07_VOName": {
    "required_if": "TRUE"
  },
  "Q_A_08_CLFName": {
    "required_if": "TRUE"
  },
  "Q_A_09_SHGMembershipYears": {
    "required_if": "TRUE",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= 40)",
    "error_msg": "Years of membership must be between 0 and 40."
  },
  "Q_A_10_LeadershipRole": {
    "required_if": "TRUE"
  },
  "Q_A_11_LeadershipYears": {
    "show_if": "OR([Q_A_10_LeadershipRole] = \"OPT_YES_Q_A_10\", [Q_A_10_LeadershipRole] = \"Yes\")",
    "required_if": "OR([Q_A_10_LeadershipRole] = \"OPT_YES_Q_A_10\", [Q_A_10_LeadershipRole] = \"Yes\")",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= [Q_A_09_SHGMembershipYears])",
    "error_msg": "Leadership experience cannot exceed total SHG membership years."
  },
  "Q_A_12_RelatedToCRP": {
    "required_if": "TRUE"
  },
  "Q_A_13_EPInterventionType": {
    "required_if": "TRUE"
  },
  "Q_A_14_EnterpriseName": {
    "required_if": "TRUE"
  },
  "Q_A_15_EnterpriseSetupYear": {
    "required_if": "TRUE",
    "valid_if": "AND([_THIS] >= 1980, [_THIS] <= YEAR(TODAY()))",
    "error_msg": "Setup year must be between 1980 and current year."
  },
  "Q_A_16_BusinessType": {
    "required_if": "TRUE"
  },
  "Q_A_17_BusinessActivities": {
    "required_if": "TRUE"
  },
  "Q_A_17_Other": {
    "show_if": "IN(\"ACT_ANY_OTHER\", [Q_A_17_BusinessActivities])",
    "required_if": "IN(\"ACT_ANY_OTHER\", [Q_A_17_BusinessActivities])"
  },
  "Q_A_18_LoanReceivedYear": {
    "required_if": "TRUE",
    "valid_if": "AND([_THIS] >= [Q_A_15_EnterpriseSetupYear], [_THIS] <= YEAR(TODAY()))",
    "error_msg": "Loan year cannot be before enterprise setup year."
  },
  "Q_A_19_MaintainSeparateRecords": {
    "required_if": "TRUE"
  },
  "Q_A_20_RegistrationsDocuments": {
    "required_if": "TRUE"
  },
  "Q_B_01_RespondentAge": {
    "show_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))",
    "required_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))"
  },
  "Q_B_02_MaritalStatus": {
    "show_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))",
    "required_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))"
  },
  "Q_B_03_SocialCategory": {
    "show_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))",
    "required_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))"
  },
  "Q_B_04_EducationStatus": {
    "show_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))",
    "required_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))"
  },
  "Q_B_05_FamilyMemberCount": {
    "show_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))",
    "required_if": "AND(ISNOTBLANK([Q_A_01_District]), ISNOTBLANK([Q_A_04_RespondentName]), ISNOTBLANK([Q_A_14_EnterpriseName]))",
    "valid_if": "AND([_THIS] >= 1, [_THIS] <= 30)",
    "error_msg": "Total family members must be between 1 and 30."
  },
  "Q_B_06_01_Adults": {
    "show_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])",
    "required_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= [Q_B_05_FamilyMemberCount])",
    "error_msg": "Adults cannot exceed total family members."
  },
  "Q_B_06_02_Children": {
    "show_if": "ISNOTBLANK([Q_B_06_01_Adults])",
    "required_if": "ISNOTBLANK([Q_B_06_01_Adults])",
    "valid_if": "[Q_B_06_01_Adults] + [_THIS] = [Q_B_05_FamilyMemberCount]",
    "error_msg": "Adults + Children must equal Total Family Members."
  },
  "Q_B_06_03_TotalEarning": {
    "show_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])",
    "required_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= [Q_B_05_FamilyMemberCount])",
    "error_msg": "Earning members cannot exceed total family members."
  },
  "Q_B_06_04_MaleEarning": {
    "show_if": "ISNOTBLANK([Q_B_06_03_TotalEarning])",
    "required_if": "ISNOTBLANK([Q_B_06_03_TotalEarning])",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= [Q_B_06_03_TotalEarning])"
  },
  "Q_B_06_05_FemaleEarning": {
    "show_if": "ISNOTBLANK([Q_B_06_04_MaleEarning])",
    "required_if": "ISNOTBLANK([Q_B_06_04_MaleEarning])",
    "valid_if": "[Q_B_06_04_MaleEarning] + [_THIS] = [Q_B_06_03_TotalEarning]",
    "error_msg": "Male + Female earning members must equal Total Earning Members."
  },
  "Q_B_06_06_DisabledCount": {
    "show_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])",
    "required_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= [Q_B_05_FamilyMemberCount])"
  },
  "Q_B_07_FamilyIncomeSources": {
    "show_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])",
    "required_if": "ISNOTBLANK([Q_B_05_FamilyMemberCount])"
  },
  "Q_B_07_Other": {
    "show_if": "IN(\"INC_OTHER_Q_B_07\", [Q_B_07_FamilyIncomeSources])",
    "required_if": "IN(\"INC_OTHER_Q_B_07\", [Q_B_07_FamilyIncomeSources])"
  },
  "Q_B_08_AnnualHouseholdIncome": {
    "show_if": "ISNOTBLANK([Q_B_07_FamilyIncomeSources])",
    "required_if": "ISNOTBLANK([Q_B_07_FamilyIncomeSources])"
  },
  "Q_C_01_ReasonsStartingBusiness": {
    "show_if": "ISNOTBLANK([Q_B_08_AnnualHouseholdIncome])",
    "required_if": "ISNOTBLANK([Q_B_08_AnnualHouseholdIncome])"
  },
  "Q_C_01_Other": {
    "show_if": "IN(\"RSN_OTHER_Q_C_01\", [Q_C_01_ReasonsStartingBusiness])",
    "required_if": "IN(\"RSN_OTHER_Q_C_01\", [Q_C_01_ReasonsStartingBusiness])"
  },
  "Q_C_02_BusinessCycle": {
    "show_if": "ISNOTBLANK([Q_C_01_ReasonsStartingBusiness])",
    "required_if": "ISNOTBLANK([Q_C_01_ReasonsStartingBusiness])"
  },
  "Q_C_02_Other": {
    "show_if": "OR([Q_C_02_BusinessCycle] = \"CYC_OTHER\", [Q_C_02_BusinessCycle] = \"Any other, specify\")",
    "required_if": "OR([Q_C_02_BusinessCycle] = \"CYC_OTHER\", [Q_C_02_BusinessCycle] = \"Any other, specify\")"
  },
  "Q_C_03_BusinessPlaceType": {
    "show_if": "ISNOTBLANK([Q_C_02_BusinessCycle])",
    "required_if": "ISNOTBLANK([Q_C_02_BusinessCycle])"
  },
  "Q_C_04_MonthlyRent": {
    "show_if": "OR([Q_C_03_BusinessPlaceType] = \"PLC_RENTED\", [Q_C_03_BusinessPlaceType] = \"Rented\", [Q_C_03_BusinessPlaceType] = \"Rented Premises / Shop\")",
    "required_if": "OR([Q_C_03_BusinessPlaceType] = \"PLC_RENTED\", [Q_C_03_BusinessPlaceType] = \"Rented\", [Q_C_03_BusinessPlaceType] = \"Rented Premises / Shop\")",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= 200000)",
    "error_msg": "Monthly rent must be a valid positive amount."
  },
  "Q_C_05_LocationConvenience": {
    "show_if": "ISNOTBLANK([Q_C_03_BusinessPlaceType])",
    "required_if": "ISNOTBLANK([Q_C_03_BusinessPlaceType])"
  },
  "Q_C_05_Other": {
    "show_if": "OR([Q_C_05_LocationConvenience] = \"LOC_OTHER\", [Q_C_05_LocationConvenience] = \"Any other, specify\")",
    "required_if": "OR([Q_C_05_LocationConvenience] = \"LOC_OTHER\", [Q_C_05_LocationConvenience] = \"Any other, specify\")"
  },
  "Q_C_07_01_NearbyTown_Pct": {
    "required_if": "ISNOTBLANK([Q_C_05_LocationConvenience])"
  },
  "Q_C_07_02_WholesaleState_Pct": {
    "required_if": "ISNOTBLANK([Q_C_05_LocationConvenience])"
  },
  "Q_C_07_03_WholesaleOutside_Pct": {
    "required_if": "ISNOTBLANK([Q_C_05_LocationConvenience])"
  },
  "Q_C_07_04_Online_Pct": {
    "required_if": "ISNOTBLANK([Q_C_05_LocationConvenience])"
  },
  "Q_C_08_MarketingMethods": {
    "required_if": "ISNOTBLANK([Q_C_07_01_NearbyTown_Pct])"
  },
  "Q_C_08_Other": {
    "show_if": "IN(\"MKT_OTHER_Q_C_08\", [Q_C_08_MarketingMethods])",
    "required_if": "IN(\"MKT_OTHER_Q_C_08\", [Q_C_08_MarketingMethods])"
  },
  "Q_C_09_SellingMethods": {
    "required_if": "ISNOTBLANK([Q_C_08_MarketingMethods])"
  },
  "Q_C_09_Other": {
    "show_if": "IN(\"SEL_OTHER_Q_C_09\", [Q_C_09_SellingMethods])",
    "required_if": "IN(\"SEL_OTHER_Q_C_09\", [Q_C_09_SellingMethods])"
  },
  "Q_C_10_01_Online_Pct": {
    "required_if": "ISNOTBLANK([Q_C_09_SellingMethods])"
  },
  "Q_C_10_02_WhatsApp_Pct": {
    "required_if": "ISNOTBLANK([Q_C_09_SellingMethods])"
  },
  "Q_C_10_03_Instagram_Pct": {
    "required_if": "ISNOTBLANK([Q_C_09_SellingMethods])"
  },
  "Q_C_10_04_Premise_Pct": {
    "required_if": "ISNOTBLANK([Q_C_09_SellingMethods])"
  },
  "Q_C_10_05_Traders_Pct": {
    "required_if": "ISNOTBLANK([Q_C_09_SellingMethods])"
  },
  "Q_C_10_06_Haat_Pct": {
    "required_if": "ISNOTBLANK([Q_C_09_SellingMethods])"
  },
  "Q_C_10_07_Saras_Pct": {
    "required_if": "ISNOTBLANK([Q_C_09_SellingMethods])"
  },
  "Q_C_11_RecordKeepingHabit": {
    "required_if": "ISNOTBLANK([Q_C_10_01_Online_Pct])"
  },
  "Q_C_12_RecordKeepingMethod": {
    "show_if": "AND(ISNOTBLANK([Q_C_11_RecordKeepingHabit]), [Q_C_11_RecordKeepingHabit] <> \"RKH_NO_RECORD\", [Q_C_11_RecordKeepingHabit] <> \"Don't maintain any records at all\")",
    "required_if": "AND(ISNOTBLANK([Q_C_11_RecordKeepingHabit]), [Q_C_11_RecordKeepingHabit] <> \"RKH_NO_RECORD\", [Q_C_11_RecordKeepingHabit] <> \"Don't maintain any records at all\")"
  },
  "Q_C_12_Other": {
    "show_if": "IN(\"RKT_OTHER\", [Q_C_12_RecordKeepingMethod])",
    "required_if": "IN(\"RKT_OTHER\", [Q_C_12_RecordKeepingMethod])"
  },
  "Q_D_01_SHGAssociationAssistance": {
    "show_if": "ISNOTBLANK([Q_C_11_RecordKeepingHabit])",
    "required_if": "ISNOTBLANK([Q_C_11_RecordKeepingHabit])"
  },
  "Q_D_04_FundingExperience": {
    "show_if": "ISNOTBLANK([Q_D_01_SHGAssociationAssistance])",
    "required_if": "ISNOTBLANK([Q_D_01_SHGAssociationAssistance])"
  },
  "Q_D_06_FinancialHelpFromIncome": {
    "show_if": "ISNOTBLANK([Q_D_04_FundingExperience])",
    "required_if": "ISNOTBLANK([Q_D_04_FundingExperience])"
  },
  "Q_E_01_HusbandFamilyResponse": {
    "show_if": "ISNOTBLANK([Q_D_06_FinancialHelpFromIncome])",
    "required_if": "ISNOTBLANK([Q_D_06_FinancialHelpFromIncome])"
  },
  "Q_E_02_MaterialSourcingComfort": {
    "show_if": "ISNOTBLANK([Q_E_01_HusbandFamilyResponse])",
    "required_if": "ISNOTBLANK([Q_E_01_HusbandFamilyResponse])"
  },
  "Q_E_03_CustomerPaymentRecovery": {
    "show_if": "ISNOTBLANK([Q_E_02_MaterialSourcingComfort])",
    "required_if": "ISNOTBLANK([Q_E_02_MaterialSourcingComfort])"
  },
  "Q_E_04_CurrentChallenges": {
    "show_if": "ISNOTBLANK([Q_E_03_CustomerPaymentRecovery])",
    "required_if": "ISNOTBLANK([Q_E_03_CustomerPaymentRecovery])"
  },
  "Q_E_04_Other": {
    "show_if": "IN(\"CHL_OTHER\", [Q_E_04_CurrentChallenges])",
    "required_if": "IN(\"CHL_OTHER\", [Q_E_04_CurrentChallenges])"
  },
  "Q_E_05_Competitors_Count": {
    "show_if": "ISNOTBLANK([Q_E_04_CurrentChallenges])",
    "required_if": "ISNOTBLANK([Q_E_04_CurrentChallenges])",
    "valid_if": "[_THIS] >= 0"
  },
  "Q_E_05_Competitors_Smaller": {
    "show_if": "ISNOTBLANK([Q_E_05_Competitors_Count])",
    "valid_if": "[_THIS] >= 0"
  },
  "Q_E_05_Competitors_Higher": {
    "show_if": "ISNOTBLANK([Q_E_05_Competitors_Count])",
    "valid_if": "[_THIS] >= 0"
  },
  "Q_E_06_CompetitorAdvantages": {
    "show_if": "ISNOTBLANK([Q_E_05_Competitors_Count])",
    "required_if": "ISNOTBLANK([Q_E_05_Competitors_Count])"
  },
  "Q_F_01_FutureExpansionPlans": {
    "show_if": "ISNOTBLANK([Q_E_06_CompetitorAdvantages])",
    "required_if": "ISNOTBLANK([Q_E_06_CompetitorAdvantages])"
  },
  "Q_F_02_AspirationBottlenecks": {
    "show_if": "ISNOTBLANK([Q_F_01_FutureExpansionPlans])",
    "required_if": "ISNOTBLANK([Q_F_01_FutureExpansionPlans])"
  },
  "Q_F_03_FutureFundsRequired": {
    "show_if": "ISNOTBLANK([Q_F_02_AspirationBottlenecks])",
    "required_if": "ISNOTBLANK([Q_F_02_AspirationBottlenecks])",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= 5000000)",
    "error_msg": "Funds required must be a valid positive amount."
  },
  "Q_G_01_AttendedTraining": {
    "show_if": "ISNOTBLANK([Q_F_03_FutureFundsRequired])",
    "required_if": "ISNOTBLANK([Q_F_03_FutureFundsRequired])"
  },
  "Q_G_02_TrainingDetails": {
    "show_if": "OR([Q_G_01_AttendedTraining] = \"OPT_YES_Q_G_01\", [Q_G_01_AttendedTraining] = \"Yes\", [Q_G_01_AttendedTraining] = \"OPT_YES\")",
    "required_if": "OR([Q_G_01_AttendedTraining] = \"OPT_YES_Q_G_01\", [Q_G_01_AttendedTraining] = \"Yes\", [Q_G_01_AttendedTraining] = \"OPT_YES\")"
  },
  "Q_G_03_UsedTrainingComponent": {
    "show_if": "OR([Q_G_01_AttendedTraining] = \"OPT_YES_Q_G_01\", [Q_G_01_AttendedTraining] = \"Yes\", [Q_G_01_AttendedTraining] = \"OPT_YES\")",
    "required_if": "OR([Q_G_01_AttendedTraining] = \"OPT_YES_Q_G_01\", [Q_G_01_AttendedTraining] = \"Yes\", [Q_G_01_AttendedTraining] = \"OPT_YES\")"
  },
  "Q_G_04_UsedTrainingDetails": {
    "show_if": "AND(OR([Q_G_01_AttendedTraining] = \"OPT_YES_Q_G_01\", [Q_G_01_AttendedTraining] = \"Yes\"), OR([Q_G_03_UsedTrainingComponent] = \"OPT_YES_Q_G_03\", [Q_G_03_UsedTrainingComponent] = \"Yes\"))",
    "required_if": "AND(OR([Q_G_01_AttendedTraining] = \"OPT_YES_Q_G_01\", [Q_G_01_AttendedTraining] = \"Yes\"), OR([Q_G_03_UsedTrainingComponent] = \"OPT_YES_Q_G_03\", [Q_G_03_UsedTrainingComponent] = \"Yes\"))"
  },
  "Q_G_05_MonthlyIncomeBeforeLoan": {
    "show_if": "ISNOTBLANK([Q_G_01_AttendedTraining])",
    "required_if": "ISNOTBLANK([Q_G_01_AttendedTraining])"
  },
  "Q_G_05_MonthlyIncomeAfterLoan": {
    "show_if": "OR([Q_G_05_MonthlyIncomeBeforeLoan] = \"OPT_YES_Q_G_05\", [Q_G_05_MonthlyIncomeBeforeLoan] = \"Yes\")",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= 500000)"
  },
  "Q_G_06_MonthlyIncomeIncreaseByOSFSVEP": {
    "show_if": "OR([Q_G_05_MonthlyIncomeBeforeLoan] = \"OPT_YES_Q_G_05\", [Q_G_05_MonthlyIncomeBeforeLoan] = \"Yes\")",
    "required_if": "OR([Q_G_05_MonthlyIncomeBeforeLoan] = \"OPT_YES_Q_G_05\", [Q_G_05_MonthlyIncomeBeforeLoan] = \"Yes\")",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= 500000)",
    "error_msg": "Monthly income increase must be a positive amount."
  },
  "Q_G_07_CRPContributions": {
    "show_if": "ISNOTBLANK([Q_G_05_MonthlyIncomeBeforeLoan])",
    "required_if": "ISNOTBLANK([Q_G_05_MonthlyIncomeBeforeLoan])"
  },
  "Q_G_08_ExpectationsFromScheme": {
    "show_if": "ISNOTBLANK([Q_G_07_CRPContributions])",
    "required_if": "ISNOTBLANK([Q_G_07_CRPContributions])"
  },
  "Q_H_01_SmartphoneOwnership": {
    "show_if": "ISNOTBLANK([Q_G_08_ExpectationsFromScheme])",
    "required_if": "ISNOTBLANK([Q_G_08_ExpectationsFromScheme])"
  },
  "Q_H_02_UseQRUPI": {
    "show_if": "OR([Q_H_01_SmartphoneOwnership] = \"OPT_YES_Q_H_01\", [Q_H_01_SmartphoneOwnership] = \"Yes\")",
    "required_if": "OR([Q_H_01_SmartphoneOwnership] = \"OPT_YES_Q_H_01\", [Q_H_01_SmartphoneOwnership] = \"Yes\")"
  },
  "Q_H_03_QRDailyTransactions": {
    "show_if": "AND(OR([Q_H_01_SmartphoneOwnership] = \"OPT_YES_Q_H_01\", [Q_H_01_SmartphoneOwnership] = \"Yes\"), OR([Q_H_02_UseQRUPI] = \"OPT_YES_Q_H_02\", [Q_H_02_UseQRUPI] = \"Yes\"))",
    "required_if": "AND(OR([Q_H_01_SmartphoneOwnership] = \"OPT_YES_Q_H_01\", [Q_H_01_SmartphoneOwnership] = \"Yes\"), OR([Q_H_02_UseQRUPI] = \"OPT_YES_Q_H_02\", [Q_H_02_UseQRUPI] = \"Yes\"))",
    "valid_if": "AND([_THIS] >= 0, [_THIS] <= 1000)"
  },
  "Q_H_04_QRNonUseReason": {
    "show_if": "AND(OR([Q_H_01_SmartphoneOwnership] = \"OPT_YES_Q_H_01\", [Q_H_01_SmartphoneOwnership] = \"Yes\"), OR([Q_H_02_UseQRUPI] = \"OPT_NO_Q_H_02\", [Q_H_02_UseQRUPI] = \"No\"))",
    "required_if": "AND(OR([Q_H_01_SmartphoneOwnership] = \"OPT_YES_Q_H_01\", [Q_H_01_SmartphoneOwnership] = \"Yes\"), OR([Q_H_02_UseQRUPI] = \"OPT_NO_Q_H_02\", [Q_H_02_UseQRUPI] = \"No\"))"
  },
  "Q_H_05_SocialMediaForMarketing": {
    "show_if": "ISNOTBLANK([Q_H_01_SmartphoneOwnership])",
    "required_if": "ISNOTBLANK([Q_H_01_SmartphoneOwnership])"
  },
  "Q_H_06_SocialPlatformsUsed": {
    "show_if": "OR([Q_H_05_SocialMediaForMarketing] = \"OPT_YES_Q_H_05\", [Q_H_05_SocialMediaForMarketing] = \"Yes\")",
    "required_if": "OR([Q_H_05_SocialMediaForMarketing] = \"OPT_YES_Q_H_05\", [Q_H_05_SocialMediaForMarketing] = \"Yes\")"
  },
  "Q_H_07_SocialPlatformUsageMode": {
    "show_if": "OR([Q_H_05_SocialMediaForMarketing] = \"OPT_YES_Q_H_05\", [Q_H_05_SocialMediaForMarketing] = \"Yes\")",
    "required_if": "OR([Q_H_05_SocialMediaForMarketing] = \"OPT_YES_Q_H_05\", [Q_H_05_SocialMediaForMarketing] = \"Yes\")"
  },
  "Q_H_08_SocialMediaFrequency": {
    "show_if": "OR([Q_H_05_SocialMediaForMarketing] = \"OPT_YES_Q_H_05\", [Q_H_05_SocialMediaForMarketing] = \"Yes\")",
    "required_if": "OR([Q_H_05_SocialMediaForMarketing] = \"OPT_YES_Q_H_05\", [Q_H_05_SocialMediaForMarketing] = \"Yes\")"
  },
  "Q_I_01_OSFInterventionYear": {
    "show_if": "ISNOTBLANK([Q_H_01_SmartphoneOwnership])",
    "required_if": "ISNOTBLANK([Q_H_01_SmartphoneOwnership])",
    "valid_if": "AND([_THIS] >= 2010, [_THIS] <= YEAR(TODAY()))",
    "error_msg": "Intervention year must be between 2010 and current year."
  },
  "Q_I_02_BusinessOperationalStatus": {
    "show_if": "ISNOTBLANK([Q_I_01_OSFInterventionYear])",
    "required_if": "ISNOTBLANK([Q_I_01_OSFInterventionYear])"
  },
  "Q_I_03_ReasonsScalingDown": {
    "show_if": "OR([Q_I_02_BusinessOperationalStatus] = \"OPT_NO_Q_I_02\", [Q_I_02_BusinessOperationalStatus] = \"No\", [Q_I_02_BusinessOperationalStatus] = \"Closed\")",
    "required_if": "OR([Q_I_02_BusinessOperationalStatus] = \"OPT_NO_Q_I_02\", [Q_I_02_BusinessOperationalStatus] = \"No\", [Q_I_02_BusinessOperationalStatus] = \"Closed\")"
  },
  "Q_I_04_SupportNeeded": {
    "show_if": "OR([Q_I_02_BusinessOperationalStatus] = \"OPT_NO_Q_I_02\", [Q_I_02_BusinessOperationalStatus] = \"No\", [Q_I_02_BusinessOperationalStatus] = \"Closed\")",
    "required_if": "OR([Q_I_02_BusinessOperationalStatus] = \"OPT_NO_Q_I_02\", [Q_I_02_BusinessOperationalStatus] = \"No\", [Q_I_02_BusinessOperationalStatus] = \"Closed\")"
  }
};

    var dict = {};
    var count = 0;

    for (var col in RULES) {
      if (attrMap[col] === undefined) continue;
      var idx = attrMap[col];
      var r = RULES[col];
      var p = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + ']';

      // 3a. Show_If
      if (r.show_if) {
        var sF = '=' + r.show_if.replace(/^=/, '');
        dict[p + '.Show_If'] = sF;
        dict[p + '.ShowIf'] = sF;
      }

      // 3b. Required_If
      if (r.required_if) {
        var rF = '=' + r.required_if.replace(/^=/, '');
        dict[p + '.Required_If'] = rF;
        dict[p + '.RequiredIf'] = rF;
        if (r.required_if === 'TRUE') {
          dict[p + '.IsRequired'] = true;
        }
      }

      // 3c. Valid_If (Ranges, Logic & Cross-Column)
      if (r.valid_if) {
        var vF = '=' + r.valid_if.replace(/^=/, '');
        dict[p + '.Valid_If'] = vF;
        dict[p + '.ValidIf'] = vF;
      }

      // 3d. Invalid Value Error Message
      if (r.error_msg) {
        dict[p + '.Invalid_Value_Error'] = r.error_msg;
      }

      // Synchronize into TypeAuxData to guarantee persistence
      var a = attrs[idx];
      var auxObj = {};
      if (a.TypeAuxData) {
        try {
          auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData);
        } catch(e) {}
      }
      if (r.show_if) { auxObj.Show_If = '=' + r.show_if.replace(/^=/, ''); auxObj.ShowIf = auxObj.Show_If; }
      if (r.required_if) { auxObj.Required_If = '=' + r.required_if.replace(/^=/, ''); auxObj.RequiredIf = auxObj.Required_If; }
      if (r.valid_if) { auxObj.Valid_If = '=' + r.valid_if.replace(/^=/, ''); auxObj.ValidIf = auxObj.Valid_If; }
      if (r.error_msg) { auxObj.Invalid_Value_Error = r.error_msg; }

      dict[p + '.TypeAuxData'] = JSON.stringify(auxObj);
      count++;
    }

    // 4. Dispatch Redux Action
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    // 5. Activate Native Cloud SAVE Button
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] " + count + " Validations, Show_If, Required_If and Ranges configured! ===");
    console.log("[ACTION] Click the blue SAVE button in AppSheet header to commit changes.");
  } catch (e) {
    console.error("[FAIL] Error during validations injection:", e);
  }
})();
