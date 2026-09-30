/**
 * ==============================================================================
 * OmmNoMi Automation LLP - AppSheet Modern Editor Redux Configuration
 * Injects Dynamic DisplayName (=LOOKUP(QID, AppVariables, ID, Label))
 * and Dynamic Values / Valid_If (=SPLIT(LOOKUP(QID, AppVariables, ID, VariableList), ' , '))
 * 
 * Pure ASCII, Zero Syntax Errors, Validated with node -c
 * ==============================================================================
 */

(function runInjectSurveyDisplayAndDynamicValues() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Dynamic DisplayName and Values Injection ===");

    // 1. Locate Redux Store
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length && !store; i++) {
        var keys = Object.keys(els[i]);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].startsWith('__reactFiber') || keys[k].startsWith('__reactInternalInstance')) {
            var f = els[i][keys[k]];
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
      console.error("[FAIL] Redux store not found! Please click on any table/column in AppSheet Editor first.");
      return;
    }
    window.appStore = store;
    console.log("[OK] Found Redux store successfully.");

    // 2. Locate Survey Schema
    var state = store.getState();
    var schemas = state.appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var surveyIdx = -1;
    for (var si = 0; si < schemas.length; si++) {
      var sName = schemas[si].Name || '';
      var tName = schemas[si].TableName || '';
      if (sName === 'Survey_Schema' || tName === 'Survey' || sName === 'Survey') {
        surveyIdx = si;
        break;
      }
    }

    if (surveyIdx === -1) {
      console.error("[FAIL] Survey schema not found in AppSheet DataSchemas!");
      return;
    }
    console.log("[OK] Found Survey table at DataSchemas[" + surveyIdx + "]");

    var attrs = schemas[surveyIdx].Attributes || [];
    var attrMap = {};
    for (var ai = 0; ai < attrs.length; ai++) {
      attrMap[attrs[ai].Name] = ai;
    }

    // 3. TypeAuxData Templates for Enum / EnumList Ref -> AppVariables
    var refQualifier = JSON.stringify({
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      InputMode: "Auto"
    });

    var enumListTypeAux = JSON.stringify({
      ElementType: "Ref",
      ElementTypeQualifier: refQualifier,
      ItemSeparator: " , "
    });

    var enumTypeAux = JSON.stringify({
      EnumValues: [],
      AllowOtherValues: false,
      AutoCompleteOtherValues: true,
      BaseType: "Ref",
      BaseTypeQualifier: refQualifier,
      EnumInputMode: "Auto"
    });

    var enumButtonsTypeAux = JSON.stringify({
      EnumValues: [],
      AllowOtherValues: false,
      AutoCompleteOtherValues: true,
      BaseType: "Ref",
      BaseTypeQualifier: refQualifier,
      EnumInputMode: "Buttons"
    });

    // 4. Configuration Dictionary for All Columns
    var COL_CONFIG = {
  "Q_A_01_District": {
    "qid": "Q_A_01",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_02_Block": {
    "qid": "Q_A_02",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_03_VillageGP": {
    "qid": "Q_A_03",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_04_RespondentName": {
    "qid": "Q_A_04",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_05_RespondentPhone": {
    "qid": "Q_A_05",
    "type": "Phone",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_06_SHGName": {
    "qid": "Q_A_06",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_07_VOName": {
    "qid": "Q_A_07",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_08_CLFName": {
    "qid": "Q_A_08",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_09_SHGMembershipYears": {
    "qid": "Q_A_09",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_10_LeadershipRole": {
    "qid": "Q_A_10",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_11_LeadershipYears": {
    "qid": "Q_A_11",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_12_RelatedToCRP": {
    "qid": "Q_A_12",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_13_EPInterventionType": {
    "qid": "Q_A_13",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_14_EnterpriseName": {
    "qid": "Q_A_14",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_15_EnterpriseSetupYear": {
    "qid": "Q_A_15",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_16_BusinessType": {
    "qid": "Q_A_16",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_17_BusinessActivities": {
    "qid": "Q_A_17",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_18_LoanReceivedYear": {
    "qid": "Q_A_18",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_A_19_MaintainSeparateRecords": {
    "qid": "Q_A_19",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_A_20_RegistrationsDocuments": {
    "qid": "Q_A_20",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_B_01_RespondentAge": {
    "qid": "Q_B_01",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_B_02_MaritalStatus": {
    "qid": "Q_B_02",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_B_03_SocialCategory": {
    "qid": "Q_B_03",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_B_04_EducationStatus": {
    "qid": "Q_B_04",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_B_05_FamilyMemberCount": {
    "qid": "Q_B_05",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_B_06_01_Adults": {
    "qid": "Q_B_06_01",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_B_06_02_Children": {
    "qid": "Q_B_06_02",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_B_06_03_TotalEarning": {
    "qid": "Q_B_06_03",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_B_06_04_MaleEarning": {
    "qid": "Q_B_06_04",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_B_06_05_FemaleEarning": {
    "qid": "Q_B_06_05",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_B_06_06_DisabledCount": {
    "qid": "Q_B_06_06",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_B_07_FamilyIncomeSources": {
    "qid": "Q_B_07",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_B_08_AnnualHouseholdIncome": {
    "qid": "Q_B_08",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_01_ReasonsStartingBusiness": {
    "qid": "Q_C_01",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_02_BusinessCycle": {
    "qid": "Q_C_02",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_03_BusinessPlaceType": {
    "qid": "Q_C_03",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_04_MonthlyRent": {
    "qid": "Q_C_04",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_C_05_LocationConvenience": {
    "qid": "Q_C_05",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_06_Labor_Involvement": {
    "qid": "Q_C_06_TABLE",
    "type": "Ref_Table",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_C_07_01_NearbyTown_Pct": {
    "qid": "Q_C_07_01",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_5",
    "input_mode": "Buttons"
  },
  "Q_C_07_02_WholesaleState_Pct": {
    "qid": "Q_C_07_02",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_5",
    "input_mode": "Buttons"
  },
  "Q_C_07_03_WholesaleOutside_Pct": {
    "qid": "Q_C_07_03",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_5",
    "input_mode": "Buttons"
  },
  "Q_C_07_04_Online_Pct": {
    "qid": "Q_C_07_04",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_5",
    "input_mode": "Buttons"
  },
  "Q_C_08_MarketingMethods": {
    "qid": "Q_C_08",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_09_SellingMethods": {
    "qid": "Q_C_09",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_10_01_Online_Pct": {
    "qid": "Q_C_10_01",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_SALES",
    "input_mode": "Buttons"
  },
  "Q_C_10_02_WhatsApp_Pct": {
    "qid": "Q_C_10_02",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_SALES",
    "input_mode": "Buttons"
  },
  "Q_C_10_03_Instagram_Pct": {
    "qid": "Q_C_10_03",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_SALES",
    "input_mode": "Buttons"
  },
  "Q_C_10_04_Premise_Pct": {
    "qid": "Q_C_10_04",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_SALES",
    "input_mode": "Buttons"
  },
  "Q_C_10_05_Traders_Pct": {
    "qid": "Q_C_10_05",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_SALES",
    "input_mode": "Buttons"
  },
  "Q_C_10_06_Haat_Pct": {
    "qid": "Q_C_10_06",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_SALES",
    "input_mode": "Buttons"
  },
  "Q_C_10_07_Saras_Pct": {
    "qid": "Q_C_10_07",
    "type": "Enum",
    "has_opts": false,
    "scale": "MAIN_PCT_SCALE_SALES",
    "input_mode": "Buttons"
  },
  "Q_C_11_RecordKeepingHabit": {
    "qid": "Q_C_11",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_12_RecordKeepingMethod": {
    "qid": "Q_C_12",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_C_13_Turnover_Income": {
    "qid": "Q_C_13_TABLE",
    "type": "Ref_Table",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_D_01_SHGAssociationAssistance": {
    "qid": "Q_D_01",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_D_02_Capital_Arranged": {
    "qid": "Q_D_02_TABLE",
    "type": "Ref_Table",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_D_03_Loan_Usage": {
    "qid": "Q_D_03_TABLE",
    "type": "Ref_Table",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_D_04_FundingExperience": {
    "qid": "Q_D_04",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_D_05_Business_Trajectory": {
    "qid": "Q_D_05_TABLE",
    "type": "Ref_Table",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_D_06_FinancialHelpFromIncome": {
    "qid": "Q_D_06",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_E_01_HusbandFamilyResponse": {
    "qid": "Q_E_01",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_E_02_MaterialSourcingComfort": {
    "qid": "Q_E_02",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_E_03_CustomerPaymentRecovery": {
    "qid": "Q_E_03",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_E_04_CurrentChallenges": {
    "qid": "Q_E_04",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_E_05_Competitors_Count": {
    "qid": "Q_E_05_01",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_E_05_Competitors_Smaller": {
    "qid": "Q_E_05_02",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_E_05_Competitors_Higher": {
    "qid": "Q_E_05_03",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_E_06_CompetitorAdvantages": {
    "qid": "Q_E_06",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_F_01_FutureExpansionPlans": {
    "qid": "Q_F_01",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_F_02_AspirationBottlenecks": {
    "qid": "Q_F_02",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_F_03_FutureFundsRequired": {
    "qid": "Q_F_03",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_G_01_AttendedTraining": {
    "qid": "Q_G_01",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_G_02_TrainingDetails": {
    "qid": "Q_G_02",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_G_03_UsedTrainingComponent": {
    "qid": "Q_G_03",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_G_04_UsedTrainingDetails": {
    "qid": "Q_G_04",
    "type": "Text",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_G_05_MonthlyIncomeBeforeLoan": {
    "qid": "Q_G_05_01",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_G_05_MonthlyIncomeAfterLoan": {
    "qid": "Q_G_05_02",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_G_06_MonthlyIncomeIncreaseByOSFSVEP": {
    "qid": "Q_G_06",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_G_07_CRPContributions": {
    "qid": "Q_G_07",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_G_08_ExpectationsFromScheme": {
    "qid": "Q_G_08",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_01_SmartphoneOwnership": {
    "qid": "Q_H_01",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_02_UseQRUPI": {
    "qid": "Q_H_02",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_03_QRDailyTransactions": {
    "qid": "Q_H_03",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_04_QRNonUseReason": {
    "qid": "Q_H_04",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_05_SocialMediaForMarketing": {
    "qid": "Q_H_05",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_06_SocialPlatformsUsed": {
    "qid": "Q_H_06",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_07_SocialPlatformUsageMode": {
    "qid": "Q_H_07",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_H_08_SocialMediaFrequency": {
    "qid": "Q_H_08",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_I_01_OSFInterventionYear": {
    "qid": "Q_I_01",
    "type": "Number",
    "has_opts": false,
    "scale": null,
    "input_mode": null
  },
  "Q_I_02_BusinessOperationalStatus": {
    "qid": "Q_I_02",
    "type": "Enum",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_I_03_ReasonsScalingDown": {
    "qid": "Q_I_03",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  },
  "Q_I_04_SupportNeeded": {
    "qid": "Q_I_04",
    "type": "EnumList",
    "has_opts": true,
    "scale": null,
    "input_mode": null
  }
};

    var nameValueDict = {};
    var updatedCols = 0;

    function setAttr(colIdx, prop, val) {
      var key = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + colIdx + '].' + prop;
      nameValueDict[key] = val;
    }

    for (var colName in COL_CONFIG) {
      if (attrMap[colName] === undefined) continue;
      var aIdx = attrMap[colName];
      var cfg = COL_CONFIG[colName];
      var qid = cfg.qid;
      var qtype = cfg.type;
      var scale = cfg.scale;
      var inputMode = cfg.input_mode;

      // 4a. Dynamic DisplayName
      var dispFormula = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';
      setAttr(aIdx, 'DisplayName', dispFormula);

      // 4b. Dynamic Values and Type Configuration
      if (qtype === 'Enum' || qtype === 'EnumList' || scale) {
        var targetScaleId = scale ? scale : qid;
        var validIfFormula = '=SPLIT(LOOKUP("' + targetScaleId + '", "AppVariables", "ID", "VariableList"), " , ")';

        setAttr(aIdx, 'ValidIf', validIfFormula);
        setAttr(aIdx, 'Valid_If', validIfFormula);
        setAttr(aIdx, 'ReferencedTableName', 'AppVariables');

        if (qtype === 'EnumList') {
          setAttr(aIdx, 'Type', 'EnumList');
          setAttr(aIdx, 'EnumListElementTypeName', 'Ref');
          setAttr(aIdx, 'TypeAuxData', enumListTypeAux);
        } else {
          setAttr(aIdx, 'Type', 'Enum');
          setAttr(aIdx, 'EnumListElementTypeName', 'Ref');
          if (inputMode === 'Buttons') {
            setAttr(aIdx, 'TypeAuxData', enumButtonsTypeAux);
          } else {
            setAttr(aIdx, 'TypeAuxData', enumTypeAux);
          }
        }
      } else if (qtype === 'Number') {
        setAttr(aIdx, 'Type', 'Number');
      } else if (qtype === 'Phone') {
        setAttr(aIdx, 'Type', 'Phone');
      } else if (qtype === 'Text') {
        setAttr(aIdx, 'Type', 'Text');
      }

      updatedCols++;
    }

    console.log("[INFO] Prepared Redux updates for " + updatedCols + " Survey columns.");

    // 5. Dispatch SET_EDITOR_OPTIONS to Redux Store
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    // 6. Activate Cloud SAVE Button
    store.dispatch({
      type: 'SHOW_SAVE_BUTTON',
      value: true
    });

    console.log("=== [SUCCESS] " + updatedCols + " columns updated! Click the blue SAVE button in AppSheet header to commit. ===");
  } catch (err) {
    console.error("[FAIL] Error executing injection:", err);
  }
})();
