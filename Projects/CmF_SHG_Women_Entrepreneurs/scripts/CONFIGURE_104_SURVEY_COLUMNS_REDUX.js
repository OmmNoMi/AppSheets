// ==============================================================================
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
    var QMAP = {
  "Status_Profile": {
    "qid": "Q_STAT_PROFILE",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "Status_Operations": {
    "qid": "Q_STAT_OPERATIONS",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "Status_Challenges": {
    "qid": "Q_STAT_CHALLENGES",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "Status_SchemeImpact": {
    "qid": "Q_STAT_SCHEME",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "Status_Digital": {
    "qid": "Q_STAT_DIGITAL",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "Status_PostExit": {
    "qid": "Q_STAT_POST_EXIT",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "District": {
    "qid": "Q_A_01_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "Block": {
    "qid": "Q_A_02_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "VillageGP": {
    "qid": "Q_A_03_00",
    "type": "Text",
    "dropdown": false
  },
  "RespondentName": {
    "qid": "Q_A_04_00",
    "type": "Name",
    "dropdown": false
  },
  "RespondentPhone": {
    "qid": "Q_A_04_01_PHONE",
    "type": "Phone",
    "dropdown": false
  },
  "SHGName": {
    "qid": "Q_A_05_00",
    "type": "Text",
    "dropdown": false
  },
  "VOName": {
    "qid": "Q_A_06_00",
    "type": "Text",
    "dropdown": false
  },
  "CLFName": {
    "qid": "Q_A_07_00",
    "type": "Text",
    "dropdown": false
  },
  "SHGMembershipYears": {
    "qid": "Q_A_08_00",
    "type": "Number",
    "dropdown": false
  },
  "LeadershipRole": {
    "qid": "Q_A_09_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "LeadershipYears": {
    "qid": "Q_A_10_00",
    "type": "Number",
    "dropdown": false,
    "showIf": "[LeadershipRole] = \"OPT_YES\""
  },
  "RelatedToCRP": {
    "qid": "Q_A_11_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "EPInterventionType": {
    "qid": "Q_A_12_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "EnterpriseName": {
    "qid": "Q_A_13_00",
    "type": "Text",
    "dropdown": false
  },
  "ParallelEnterpriseName": {
    "qid": "Q_A_13_01",
    "type": "Text",
    "dropdown": false
  },
  "EnterpriseSetupYear": {
    "qid": "Q_A_14_00",
    "type": "Number",
    "dropdown": false
  },
  "BusinessType": {
    "qid": "Q_A_16_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "BusinessActivities": {
    "qid": "Q_A_17_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "LoanReceivedYear": {
    "qid": "Q_A_15_00",
    "type": "Number",
    "dropdown": false
  },
  "MaintainSeparateRecords": {
    "qid": "Q_A_18_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false,
    "showIf": "ISNOTBLANK([ParallelEnterpriseName])"
  },
  "RegistrationsDocuments": {
    "qid": "Q_A_19_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "RespondentAge": {
    "qid": "Q_B_01_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "MaritalStatus": {
    "qid": "Q_B_02_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "SocialCategory": {
    "qid": "Q_B_03_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "EducationStatus": {
    "qid": "Q_B_04_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "FamilyMemberCount": {
    "qid": "Q_B_05_00",
    "type": "Number",
    "dropdown": false
  },
  "FamilyIncomeSources": {
    "qid": "Q_B_07_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "FamilyIncome_AnimalSale_Specify": {
    "qid": "INC_ANIMAL_SALE",
    "type": "Text",
    "dropdown": false,
    "showIf": "IN(\"INC_ANIMAL_SALE\", [FamilyIncomeSources])"
  },
  "FamilyIncomeSourcesOther": {
    "qid": "INC_OTHER",
    "type": "Text",
    "dropdown": false,
    "showIf": "IN(\"INC_OTHER\", [FamilyIncomeSources])"
  },
  "AnnualHouseholdIncome": {
    "qid": "Q_B_08_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "ReasonsStartingBusiness": {
    "qid": "Q_C_01_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "BusinessCycle": {
    "qid": "Q_C_02_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "BusinessPlaceType": {
    "qid": "Q_C_03_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "AnnualRent": {
    "qid": "Q_C_04_00",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "[BusinessPlaceType] = \"PLC_RENTED\""
  },
  "LocationConvenience": {
    "qid": "Q_C_05_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "Material_Percentage": {
    "qid": "Q_C_08_00_SUMMARY",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "MarketingMethods": {
    "qid": "Q_C_08_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "SeasonalSalesMethod": {
    "qid": "Q_C_09_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "Social_OnlinePlatform": {
    "qid": "Q_C_09_01",
    "type": "Text",
    "dropdown": false,
    "showIf": "OR(IN(\"SEL_ONLINE_AMAZON\", [SeasonalSalesMethod]), IN(\"SEL_ONLINE_MEESHO\", [SeasonalSalesMethod]), IN(\"SEL_ONLINE_OTHER\", [SeasonalSalesMethod]))"
  },
  "RecordKeepingHabit": {
    "qid": "Q_C_11_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "RecordKeepingMethod": {
    "qid": "Q_C_12_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "SHGAssociationAssistance": {
    "qid": "Q_D_01_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "FundingExperience": {
    "qid": "Q_D_04_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "FinancialHelpFromIncome": {
    "qid": "Q_D_06_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "FinancialHelp_EducationAmt": {
    "qid": "Q_D_06_ED",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"HLP_CHILD_EDUCATION\", [FinancialHelpFromIncome])"
  },
  "FinancialHelp_DebtsAmt": {
    "qid": "Q_D_06_DB",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"HLP_PAY_DEBTS\", [FinancialHelpFromIncome])"
  },
  "FinancialHelp_AssetsAmt": {
    "qid": "Q_D_06_AS",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"HLP_ACQUIRE_ASSETS\", [FinancialHelpFromIncome])"
  },
  "FinancialHelp_MarriageAmt": {
    "qid": "Q_D_06_MR",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"HLP_MARRIAGE_EXP\", [FinancialHelpFromIncome])"
  },
  "DebtRepaidAmount": {
    "qid": "Q_D_06_DB",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"HLP_PAY_DEBTS\", [FinancialHelpFromIncome])"
  },
  "AssetsAcquiredAmount": {
    "qid": "Q_D_06_AS",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"HLP_ACQUIRE_ASSETS\", [FinancialHelpFromIncome])"
  },
  "MarriageExpensesAmount": {
    "qid": "Q_D_06_MR",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"HLP_MARRIAGE_EXP\", [FinancialHelpFromIncome])"
  },
  "HusbandFamilyResponse": {
    "qid": "Q_E_01_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "MaterialSourcingComfort": {
    "qid": "Q_E_02_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "CustomerPaymentRecovery": {
    "qid": "Q_E_03_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "CurrentChallenges": {
    "qid": "Q_E_04_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "Challenge_OSFPhasedOutAmt": {
    "qid": "Q_E_04_01",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"CHL_OSF_PHASED_OUT\", [CurrentChallenges])"
  },
  "Challenge_ScaleUpFundAmt": {
    "qid": "Q_E_04_02",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"CHL_SCALE_UP_FUNDS\", [CurrentChallenges])"
  },
  "Challenge_TimelyInputsAmt": {
    "qid": "Q_E_04_03",
    "type": "Decimal",
    "dropdown": false,
    "showIf": "IN(\"CHL_TIMELY_INPUTS\", [CurrentChallenges])"
  },
  "Challenge_Other": {
    "qid": "Q_E_04_04",
    "type": "Text",
    "dropdown": false,
    "showIf": "IN(\"CHL_ANY_OTHER\", [CurrentChallenges])"
  },
  "Competitors_Similar_Scale": {
    "qid": "Q_D_06_01",
    "type": "Number",
    "dropdown": false
  },
  "Competitors_Smaller_Scale": {
    "qid": "Q_D_06_02",
    "type": "Number",
    "dropdown": false
  },
  "Competitors_Higher_Scale": {
    "qid": "Q_D_06_03",
    "type": "Number",
    "dropdown": false
  },
  "CompetitorAdvantages": {
    "qid": "Q_E_06_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "FutureExpansionPlans": {
    "qid": "Q_F_01_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "AspirationBottlenecks": {
    "qid": "Q_D_09_00_BOTTLENECK",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "FutureFundsRequired": {
    "qid": "Q_F_03_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "AttendedTraining": {
    "qid": "Q_G_01_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "TrainingDetails": {
    "qid": "Q_G_02_00",
    "type": "Text",
    "dropdown": false,
    "showIf": "[AttendedTraining] = \"OPT_YES\""
  },
  "UsedTrainingComponent": {
    "qid": "Q_G_03_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "UsedTrainingDetails": {
    "qid": "Q_G_04_00",
    "type": "Text",
    "dropdown": false,
    "showIf": "[UsedTrainingComponent] = \"OPT_YES\""
  },
  "MonthlyIncomeBeforeLoan": {
    "qid": "Q_G_05_01",
    "type": "Decimal",
    "dropdown": false
  },
  "MonthlyIncomeAfterLoan": {
    "qid": "Q_G_05_02",
    "type": "Decimal",
    "dropdown": false
  },
  "MonthlyIncomeIncreaseByOSFSVEP": {
    "qid": "Q_G_06_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "CRPContributions": {
    "qid": "Q_G_07_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "CRPContributionDocDetails": {
    "qid": "Q_E_06_01",
    "type": "Text",
    "dropdown": false,
    "showIf": "IN(\"CRP_DOCUMENTS\", [CRPContributions])"
  },
  "ExpectationsFromScheme": {
    "qid": "Q_G_08_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "Other_Specify": {
    "qid": "Q_G_08_01",
    "type": "Text",
    "dropdown": false,
    "showIf": "IN(\"EXP_ANY_OTHER\", [ExpectationsFromScheme])"
  },
  "SmartphoneOwnership": {
    "qid": "Q_H_01_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "UseQRUPI": {
    "qid": "Q_H_02_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false,
    "showIf": "[SmartphoneOwnership] = \"OPT_YES\""
  },
  "QRDailyTransactions": {
    "qid": "Q_H_03_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false,
    "showIf": "[UseQRUPI] = \"OPT_YES\""
  },
  "QRNonUseReason": {
    "qid": "Q_H_04_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false,
    "showIf": "[UseQRUPI] = \"OPT_NO\""
  },
  "SocialMediaForMarketing": {
    "qid": "Q_H_05_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false,
    "showIf": "[SmartphoneOwnership] = \"OPT_YES\""
  },
  "SocialPlatformsUsed": {
    "qid": "Q_H_06_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true,
    "showIf": "[SmartphoneOwnership] = \"OPT_YES\""
  },
  "SocialPlatformUsageMode": {
    "qid": "Q_H_07_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true,
    "showIf": "[SmartphoneOwnership] = \"OPT_YES\""
  },
  "SocialMediaFrequency": {
    "qid": "Q_H_08_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false,
    "showIf": "[SmartphoneOwnership] = \"OPT_YES\""
  },
  "OSFInterventionYear": {
    "qid": "Q_I_01_00",
    "type": "Number",
    "dropdown": false
  },
  "BusinessOperationalStatus": {
    "qid": "Q_I_02_00",
    "type": "Enum",
    "dropdown": true,
    "multi": false
  },
  "ScalingDownClosingReasons": {
    "qid": "Q_I_03_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true,
    "showIf": "OR([BusinessOperationalStatus] = \"BOS_SCALED_DOWN\", [BusinessOperationalStatus] = \"BOS_CLOSED\", [BusinessOperationalStatus] = \"BOS_TEMP_CLOSED\")"
  },
  "ScalingDownOtherReason": {
    "qid": "Q_I_03_01",
    "type": "Text",
    "dropdown": false,
    "showIf": "IN(\"SDR_OTHER\", [ScalingDownClosingReasons])"
  },
  "SupportNeededForSustenance": {
    "qid": "Q_I_04_00",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  },
  "SupportNeededOther": {
    "qid": "Q_I_04_01",
    "type": "Text",
    "dropdown": false,
    "showIf": "IN(\"SUP_OTHER\", [SupportNeededForSustenance])"
  },
  "MarketPlaces": {
    "qid": "Q_C_08_00_SUMMARY",
    "type": "EnumList",
    "dropdown": true,
    "multi": true
  }
};

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
