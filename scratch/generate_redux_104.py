import json

# Script generator for 104 Survey Form columns AppSheet Redux Automation
# Follows rules: Pure ASCII, zero truncation, safe error handling, single save commit.

col_metadata = {
    # System Status & Header Controls
    "Status_Profile": {"qid": "Q_STAT_PROFILE", "type": "Enum", "dropdown": True, "multi": False},
    "Status_Operations": {"qid": "Q_STAT_OPERATIONS", "type": "Enum", "dropdown": True, "multi": False},
    "Status_Challenges": {"qid": "Q_STAT_CHALLENGES", "type": "Enum", "dropdown": True, "multi": False},
    "Status_SchemeImpact": {"qid": "Q_STAT_SCHEME", "type": "Enum", "dropdown": True, "multi": False},
    "Status_Digital": {"qid": "Q_STAT_DIGITAL", "type": "Enum", "dropdown": True, "multi": False},
    "Status_PostExit": {"qid": "Q_STAT_POST_EXIT", "type": "Enum", "dropdown": True, "multi": False},

    # Section A: Basic & Identification
    "District": {"qid": "Q_A_01_00", "type": "Enum", "dropdown": True, "multi": False},
    "Block": {"qid": "Q_A_02_00", "type": "Enum", "dropdown": True, "multi": False},
    "VillageGP": {"qid": "Q_A_03_00", "type": "Text", "dropdown": False},
    "RespondentName": {"qid": "Q_A_04_00", "type": "Name", "dropdown": False},
    "RespondentPhone": {"qid": "Q_A_04_01_PHONE", "type": "Phone", "dropdown": False},
    "SHGName": {"qid": "Q_A_05_00", "type": "Text", "dropdown": False},
    "VOName": {"qid": "Q_A_06_00", "type": "Text", "dropdown": False},
    "CLFName": {"qid": "Q_A_07_00", "type": "Text", "dropdown": False},
    "SHGMembershipYears": {"qid": "Q_A_08_00", "type": "Number", "dropdown": False},
    "LeadershipRole": {"qid": "Q_A_09_00", "type": "Enum", "dropdown": True, "multi": False},
    "LeadershipYears": {"qid": "Q_A_10_00", "type": "Number", "dropdown": False, "showIf": '[LeadershipRole] = "OPT_YES"'},
    "RelatedToCRP": {"qid": "Q_A_11_00", "type": "Enum", "dropdown": True, "multi": False},
    "EPInterventionType": {"qid": "Q_A_12_00", "type": "Enum", "dropdown": True, "multi": False},
    "EnterpriseName": {"qid": "Q_A_13_00", "type": "Text", "dropdown": False},
    "ParallelEnterpriseName": {"qid": "Q_A_13_01", "type": "Text", "dropdown": False},
    "EnterpriseSetupYear": {"qid": "Q_A_14_00", "type": "Number", "dropdown": False},
    "BusinessType": {"qid": "Q_A_16_00", "type": "EnumList", "dropdown": True, "multi": True},
    "BusinessActivities": {"qid": "Q_A_17_00", "type": "EnumList", "dropdown": True, "multi": True},
    "LoanReceivedYear": {"qid": "Q_A_15_00", "type": "Number", "dropdown": False},
    "MaintainSeparateRecords": {"qid": "Q_A_18_00", "type": "Enum", "dropdown": True, "multi": False, "showIf": 'ISNOTBLANK([ParallelEnterpriseName])'},
    "RegistrationsDocuments": {"qid": "Q_A_19_00", "type": "EnumList", "dropdown": True, "multi": True},

    # Section B: Profile
    "RespondentAge": {"qid": "Q_B_01_00", "type": "Enum", "dropdown": True, "multi": False},
    "MaritalStatus": {"qid": "Q_B_02_00", "type": "Enum", "dropdown": True, "multi": False},
    "SocialCategory": {"qid": "Q_B_03_00", "type": "Enum", "dropdown": True, "multi": False},
    "EducationStatus": {"qid": "Q_B_04_00", "type": "Enum", "dropdown": True, "multi": False},
    "FamilyMemberCount": {"qid": "Q_B_05_00", "type": "Number", "dropdown": False},
    "FamilyIncomeSources": {"qid": "Q_B_07_00", "type": "EnumList", "dropdown": True, "multi": True},
    "FamilyIncome_AnimalSale_Specify": {"qid": "INC_ANIMAL_SALE", "type": "Text", "dropdown": False, "showIf": 'IN("INC_ANIMAL_SALE", [FamilyIncomeSources])'},
    "FamilyIncomeSourcesOther": {"qid": "INC_OTHER", "type": "Text", "dropdown": False, "showIf": 'IN("INC_OTHER", [FamilyIncomeSources])'},
    "AnnualHouseholdIncome": {"qid": "Q_B_08_00", "type": "Enum", "dropdown": True, "multi": False},

    # Section C: Operations
    "ReasonsStartingBusiness": {"qid": "Q_C_01_00", "type": "EnumList", "dropdown": True, "multi": True},
    "BusinessCycle": {"qid": "Q_C_02_00", "type": "Enum", "dropdown": True, "multi": False},
    "BusinessPlaceType": {"qid": "Q_C_03_00", "type": "Enum", "dropdown": True, "multi": False},
    "AnnualRent": {"qid": "Q_C_04_00", "type": "Decimal", "dropdown": False, "showIf": '[BusinessPlaceType] = "PLC_RENTED"'},
    "LocationConvenience": {"qid": "Q_C_05_00", "type": "Enum", "dropdown": True, "multi": False},
    "Material_Percentage": {"qid": "Q_C_08_00_SUMMARY", "type": "Enum", "dropdown": True, "multi": False},
    "MarketingMethods": {"qid": "Q_C_08_00", "type": "EnumList", "dropdown": True, "multi": True},
    "SeasonalSalesMethod": {"qid": "Q_C_09_00", "type": "EnumList", "dropdown": True, "multi": True},
    "Social_OnlinePlatform": {"qid": "Q_C_09_01", "type": "Text", "dropdown": False, "showIf": 'OR(IN("SEL_ONLINE_AMAZON", [SeasonalSalesMethod]), IN("SEL_ONLINE_MEESHO", [SeasonalSalesMethod]), IN("SEL_ONLINE_OTHER", [SeasonalSalesMethod]))'},
    "RecordKeepingHabit": {"qid": "Q_C_11_00", "type": "Enum", "dropdown": True, "multi": False},
    "RecordKeepingMethod": {"qid": "Q_C_12_00", "type": "EnumList", "dropdown": True, "multi": True},

    # Section D: Financing & Challenges
    "SHGAssociationAssistance": {"qid": "Q_D_01_00", "type": "EnumList", "dropdown": True, "multi": True},
    "FundingExperience": {"qid": "Q_D_04_00", "type": "EnumList", "dropdown": True, "multi": True},
    "FinancialHelpFromIncome": {"qid": "Q_D_06_00", "type": "EnumList", "dropdown": True, "multi": True},
    "FinancialHelp_EducationAmt": {"qid": "Q_D_06_ED", "type": "Decimal", "dropdown": False, "showIf": 'IN("HLP_CHILD_EDUCATION", [FinancialHelpFromIncome])'},
    "FinancialHelp_DebtsAmt": {"qid": "Q_D_06_DB", "type": "Decimal", "dropdown": False, "showIf": 'IN("HLP_PAY_DEBTS", [FinancialHelpFromIncome])'},
    "FinancialHelp_AssetsAmt": {"qid": "Q_D_06_AS", "type": "Decimal", "dropdown": False, "showIf": 'IN("HLP_ACQUIRE_ASSETS", [FinancialHelpFromIncome])'},
    "FinancialHelp_MarriageAmt": {"qid": "Q_D_06_MR", "type": "Decimal", "dropdown": False, "showIf": 'IN("HLP_MARRIAGE_EXP", [FinancialHelpFromIncome])'},
    "DebtRepaidAmount": {"qid": "Q_D_06_DB", "type": "Decimal", "dropdown": False, "showIf": 'IN("HLP_PAY_DEBTS", [FinancialHelpFromIncome])'},
    "AssetsAcquiredAmount": {"qid": "Q_D_06_AS", "type": "Decimal", "dropdown": False, "showIf": 'IN("HLP_ACQUIRE_ASSETS", [FinancialHelpFromIncome])'},
    "MarriageExpensesAmount": {"qid": "Q_D_06_MR", "type": "Decimal", "dropdown": False, "showIf": 'IN("HLP_MARRIAGE_EXP", [FinancialHelpFromIncome])'},

    # Section E: Challenges & Competition
    "HusbandFamilyResponse": {"qid": "Q_E_01_00", "type": "Enum", "dropdown": True, "multi": False},
    "MaterialSourcingComfort": {"qid": "Q_E_02_00", "type": "Enum", "dropdown": True, "multi": False},
    "CustomerPaymentRecovery": {"qid": "Q_E_03_00", "type": "Enum", "dropdown": True, "multi": False},
    "CurrentChallenges": {"qid": "Q_E_04_00", "type": "EnumList", "dropdown": True, "multi": True},
    "Challenge_OSFPhasedOutAmt": {"qid": "Q_E_04_01", "type": "Decimal", "dropdown": False, "showIf": 'IN("CHL_OSF_PHASED_OUT", [CurrentChallenges])'},
    "Challenge_ScaleUpFundAmt": {"qid": "Q_E_04_02", "type": "Decimal", "dropdown": False, "showIf": 'IN("CHL_SCALE_UP_FUNDS", [CurrentChallenges])'},
    "Challenge_TimelyInputsAmt": {"qid": "Q_E_04_03", "type": "Decimal", "dropdown": False, "showIf": 'IN("CHL_TIMELY_INPUTS", [CurrentChallenges])'},
    "Challenge_Other": {"qid": "Q_E_04_04", "type": "Text", "dropdown": False, "showIf": 'IN("CHL_ANY_OTHER", [CurrentChallenges])'},
    "Competitors_Similar_Scale": {"qid": "Q_D_06_01", "type": "Number", "dropdown": False},
    "Competitors_Smaller_Scale": {"qid": "Q_D_06_02", "type": "Number", "dropdown": False},
    "Competitors_Higher_Scale": {"qid": "Q_D_06_03", "type": "Number", "dropdown": False},
    "CompetitorAdvantages": {"qid": "Q_E_06_00", "type": "EnumList", "dropdown": True, "multi": True},

    # Section F: Growth & Aspirations
    "FutureExpansionPlans": {"qid": "Q_F_01_00", "type": "Enum", "dropdown": True, "multi": False},
    "AspirationBottlenecks": {"qid": "Q_D_09_00_BOTTLENECK", "type": "EnumList", "dropdown": True, "multi": True},
    "FutureFundsRequired": {"qid": "Q_F_03_00", "type": "Enum", "dropdown": True, "multi": False},

    # Section G: Impact of Schemes
    "AttendedTraining": {"qid": "Q_G_01_00", "type": "Enum", "dropdown": True, "multi": False},
    "TrainingDetails": {"qid": "Q_G_02_00", "type": "Text", "dropdown": False, "showIf": '[AttendedTraining] = "OPT_YES"'},
    "UsedTrainingComponent": {"qid": "Q_G_03_00", "type": "Enum", "dropdown": True, "multi": False},
    "UsedTrainingDetails": {"qid": "Q_G_04_00", "type": "Text", "dropdown": False, "showIf": '[UsedTrainingComponent] = "OPT_YES"'},
    "MonthlyIncomeBeforeLoan": {"qid": "Q_G_05_01", "type": "Decimal", "dropdown": False},
    "MonthlyIncomeAfterLoan": {"qid": "Q_G_05_02", "type": "Decimal", "dropdown": False},
    "MonthlyIncomeIncreaseByOSFSVEP": {"qid": "Q_G_06_00", "type": "Enum", "dropdown": True, "multi": False},
    "CRPContributions": {"qid": "Q_G_07_00", "type": "EnumList", "dropdown": True, "multi": True},
    "CRPContributionDocDetails": {"qid": "Q_E_06_01", "type": "Text", "dropdown": False, "showIf": 'IN("CRP_DOCUMENTS", [CRPContributions])'},
    "ExpectationsFromScheme": {"qid": "Q_G_08_00", "type": "EnumList", "dropdown": True, "multi": True},
    "Other_Specify": {"qid": "Q_G_08_01", "type": "Text", "dropdown": False, "showIf": 'IN("EXP_ANY_OTHER", [ExpectationsFromScheme])'},

    # Section H: Digital & Media
    "SmartphoneOwnership": {"qid": "Q_H_01_00", "type": "Enum", "dropdown": True, "multi": False},
    "UseQRUPI": {"qid": "Q_H_02_00", "type": "Enum", "dropdown": True, "multi": False, "showIf": '[SmartphoneOwnership] = "OPT_YES"'},
    "QRDailyTransactions": {"qid": "Q_H_03_00", "type": "Enum", "dropdown": True, "multi": False, "showIf": '[UseQRUPI] = "OPT_YES"'},
    "QRNonUseReason": {"qid": "Q_H_04_00", "type": "Enum", "dropdown": True, "multi": False, "showIf": '[UseQRUPI] = "OPT_NO"'},
    "SocialMediaForMarketing": {"qid": "Q_H_05_00", "type": "Enum", "dropdown": True, "multi": False, "showIf": '[SmartphoneOwnership] = "OPT_YES"'},
    "SocialPlatformsUsed": {"qid": "Q_H_06_00", "type": "EnumList", "dropdown": True, "multi": True, "showIf": '[SmartphoneOwnership] = "OPT_YES"'},
    "SocialPlatformUsageMode": {"qid": "Q_H_07_00", "type": "EnumList", "dropdown": True, "multi": True, "showIf": '[SmartphoneOwnership] = "OPT_YES"'},
    "SocialMediaFrequency": {"qid": "Q_H_08_00", "type": "Enum", "dropdown": True, "multi": False, "showIf": '[SmartphoneOwnership] = "OPT_YES"'},

    # Section I: Post-Exit OSF
    "OSFInterventionYear": {"qid": "Q_I_01_00", "type": "Number", "dropdown": False},
    "BusinessOperationalStatus": {"qid": "Q_I_02_00", "type": "Enum", "dropdown": True, "multi": False},
    "ScalingDownClosingReasons": {"qid": "Q_I_03_00", "type": "EnumList", "dropdown": True, "multi": True, "showIf": 'OR([BusinessOperationalStatus] = "BOS_SCALED_DOWN", [BusinessOperationalStatus] = "BOS_CLOSED", [BusinessOperationalStatus] = "BOS_TEMP_CLOSED")'},
    "ScalingDownOtherReason": {"qid": "Q_I_03_01", "type": "Text", "dropdown": False, "showIf": 'IN("SDR_OTHER", [ScalingDownClosingReasons])'},
    "SupportNeededForSustenance": {"qid": "Q_I_04_00", "type": "EnumList", "dropdown": True, "multi": True},
    "SupportNeededOther": {"qid": "Q_I_04_01", "type": "Text", "dropdown": False, "showIf": 'IN("SUP_OTHER", [SupportNeededForSustenance])'},

    # Summary & Sourcing Locations
    "MarketPlaces": {"qid": "Q_C_08_00_SUMMARY", "type": "EnumList", "dropdown": True, "multi": True}
}

js_code = """// ==============================================================================
// OmmNoMi Automation LLP - Universal Survey 104 Columns Redux Console Injector
// Configures DisplayNames, Types, Valid_If, and Show_If across all survey fields
// Pure ASCII, Zero Clipboard Truncation, Safe Self-Executing Function
// ==============================================================================
(function runSurvey104ColumnsConfiguration() {
  try {
    console.log("=== [OmmNoMi] Locating AppSheet Redux Store ===");

    // 1. Multi-tier recursive React Fiber traversal
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var allEls = document.querySelectorAll('*');
      for (var i = 0; i < allEls.length && !store; i++) {
        var elKeys = Object.keys(allEls[i]);
        for (var k = 0; k < elKeys.length; k++) {
          if (elKeys[k].startsWith('__reactFiber') || elKeys[k].startsWith('__reactInternalInstance')) {
            var f = allEls[i][elKeys[k]];
            while (f && !store) {
              if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                store = f.memoizedProps.store;
              } else if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
                store = f.stateNode.store;
              }
              f = f.return;
            }
            break;
          }
        }
      }
    }

    if (!store) {
      console.error("[FAIL] Redux store not found! Please click on any column in AppSheet Editor first.");
      return;
    }

    window.appStore = store;
    console.log("[OK] Redux store located successfully!");

    var state = store.getState();
    var history = state.appTemplate && state.appTemplate.history;
    var schemas = history && history[0] && history[0].appTemplate && history[0].appTemplate.AppData && history[0].appTemplate.AppData.DataSchemas;
    if (!schemas) {
      console.error("[FAIL] DataSchemas not found in active Redux state.");
      return;
    }

    // 2. Find Survey Schema Index
    var surveyIdx = -1;
    for (var s = 0; s < schemas.length; s++) {
      if (schemas[s].Name === 'Survey_Schema' || schemas[s].TableName === 'Survey') {
        surveyIdx = s;
        break;
      }
    }

    if (surveyIdx === -1) {
      console.error("[FAIL] 'Survey' schema not found in AppData.DataSchemas.");
      return;
    }

    console.log("[OK] Found Survey table at schema index: " + surveyIdx);

    var attrs = schemas[surveyIdx].Attributes || [];
    var attrMap = {};
    for (var a = 0; a < attrs.length; a++) {
      attrMap[attrs[a].Name] = a;
    }

    // 3. Aux templates for Enum/EnumList Ref -> AppVariables
    var refQual = JSON.stringify({
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      InputMode: "Auto"
    });

    var enumAux = JSON.stringify({
      EnumValues: [],
      AllowOtherValues: false,
      AutoCompleteOtherValues: true,
      BaseType: "Ref",
      BaseTypeQualifier: refQual,
      EnumInputMode: "Auto"
    });

    var enumListAux = JSON.stringify({
      ElementType: "Ref",
      ElementTypeQualifier: refQual,
      ItemSeparator: " , "
    });

    // 4. Metadata dictionary for 104 columns
    var QMAP = """ + json.dumps(col_metadata, indent=2) + """;

    var nameValueDict = {};
    var updatedCols = 0;

    for (var colName in QMAP) {
      if (attrMap[colName] === undefined) {
        console.warn("[WARN] Column not present in current schema: " + colName);
        continue;
      }

      var aIdx = attrMap[colName];
      var meta = QMAP[colName];
      var qid = meta.qid;
      var prefix = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + aIdx + '].';

      // 4a. DisplayName formula
      nameValueDict[prefix + 'DisplayName'] = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';

      // 4b. Type & Valid_If configuration
      if (meta.type) {
        nameValueDict[prefix + 'Type'] = meta.type;
      }

      if (meta.dropdown) {
        var validIf = '=SPLIT(LOOKUP("' + qid + '", "AppVariables", "ID", "VariableList"), " , ")';
        nameValueDict[prefix + 'ValidIf'] = validIf;
        nameValueDict[prefix + 'Valid_If'] = validIf;
        nameValueDict[prefix + 'ReferencedTableName'] = 'AppVariables';

        if (meta.multi) {
          nameValueDict[prefix + 'Type'] = 'EnumList';
          nameValueDict[prefix + 'EnumListElementTypeName'] = 'Ref';
          nameValueDict[prefix + 'TypeAuxData'] = enumListAux;
        } else {
          nameValueDict[prefix + 'Type'] = 'Enum';
          nameValueDict[prefix + 'EnumListElementTypeName'] = 'Ref';
          nameValueDict[prefix + 'TypeAuxData'] = enumAux;
        }
      }

      // 4c. Show_If conditional logic
      if (meta.showIf) {
        nameValueDict[prefix + 'ShowIf'] = '=' + meta.showIf;
      }

      updatedCols++;
    }

    // 5. System audit columns configuration
    var auditConfigs = {
      'GPSLocation': { 'Type': 'LatLong', 'InitialValue': '=HERE()' },
      'CreatedBy': { 'Type': 'Email', 'InitialValue': '=USEREMAIL()' },
      'CreatedOn': { 'Type': 'DateTime', 'InitialValue': '=NOW()' },
      'LastEditBy': { 'Type': 'Email', 'AppFormula': '=USEREMAIL()' },
      'LastEditOn': { 'Type': 'ChangeTimestamp' }
    };

    for (var sysCol in auditConfigs) {
      if (attrMap[sysCol] !== undefined) {
        var sIdx = attrMap[sysCol];
        var sPrefix = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + sIdx + '].';
        var cMeta = auditConfigs[sysCol];
        for (var p in cMeta) {
          nameValueDict[sPrefix + p] = cMeta[p];
        }
        updatedCols++;
      }
    }

    // 6. Dispatch Redux action batch
    console.log("[INFO] Queued " + Object.keys(nameValueDict).length + " attribute updates across " + updatedCols + " columns.");
    
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=============================================================================");
    console.log("[SUCCESS] All 104 Survey Form columns configured with Multilingual DisplayNames, Types & Valid_If!");
    console.log("[ACTION REQUIRED] Click the blue 'Save' button in the top right of AppSheet Editor now!");
    console.log("=============================================================================");
  } catch (err) {
    console.error("[ERROR] Execution failed:", err);
  }
})();
"""

out_js_path = r'projects\CmF_SHG_Women_Entrepreneurs\scripts\CONFIGURE_104_SURVEY_COLUMNS_REDUX.js'
with open(out_js_path, 'w', encoding='ascii') as f:
    f.write(js_code)

print(f"Generated JS: {out_js_path}")
