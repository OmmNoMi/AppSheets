// ==============================================================================
// OmmNoMi Master ValidIf Split Lookup Injector
// Injects =SPLIT(LOOKUP(QID, "AppVariables", "ID", "VariableList"), " , ")
// across all 61 choice columns (Enum & EnumList) with Ref to AppVariables
// 100% Pure ASCII, Zero Syntax Errors, Validated with node -c
// ==============================================================================
(function runOmmNoMiValidIfSplitLookup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting ValidIf Split Lookup Setup ===");

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

    // 2. Locate Survey Schema & AppVariables Schema
    var schemas = store.getState().appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var surveyIdx = -1;
    var appVarIdx = -1;
    for (var si = 0; si < schemas.length; si++) {
      var s = schemas[si];
      var name = s.Name || s.TableName || '';
      if (name === 'Survey_Schema' || name === 'Survey') surveyIdx = si;
      if (name === 'AppVariables_Schema' || name === 'AppVariables') appVarIdx = si;
    }
    if (surveyIdx === -1) return console.error("[FAIL] Survey table schema not found.");
    console.log("[OK] Found Survey schema at DataSchemas[" + surveyIdx + "]");

    var dict = {};

    // 3. Ensure AppVariables has Title as Label column
    if (appVarIdx !== -1) {
      var vAttrs = schemas[appVarIdx].Attributes || [];
      for (var vi = 0; vi < vAttrs.length; vi++) {
        if (vAttrs[vi].Name === 'Title') {
          dict['AppData.DataSchemas[' + appVarIdx + '].Attributes[' + vi + '].IsLabel'] = true;
          console.log("[OK] Set AppVariables.Title as IsLabel = true");
        }
      }
    }

    var attrs = schemas[surveyIdx].Attributes || [];
    var attrMap = {};
    for (var ai = 0; ai < attrs.length; ai++) attrMap[attrs[ai].Name] = ai;

    // 4. TypeAuxData Templates for Enum / EnumList Ref -> AppVariables
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

    var enumAutoTypeAux = JSON.stringify({
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

    // 5. Columns Configuration Map
    var DROPDOWNS = {
  "Q_A_01_District": {
    "target_id": "Q_A_01",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_A_02_Block": {
    "target_id": "Q_A_02",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_A_10_LeadershipRole": {
    "target_id": "Q_A_10",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_A_12_RelatedToCRP": {
    "target_id": "Q_A_12",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_A_13_EPInterventionType": {
    "target_id": "Q_A_13",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_A_16_BusinessType": {
    "target_id": "Q_A_16",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_A_17_BusinessActivities": {
    "target_id": "Q_A_17",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_A_19_MaintainSeparateRecords": {
    "target_id": "Q_A_19",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_A_20_RegistrationsDocuments": {
    "target_id": "Q_A_20",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_B_01_RespondentAge": {
    "target_id": "Q_B_01",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_B_02_MaritalStatus": {
    "target_id": "Q_B_02",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_B_03_SocialCategory": {
    "target_id": "Q_B_03",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_B_04_EducationStatus": {
    "target_id": "Q_B_04",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_B_07_FamilyIncomeSources": {
    "target_id": "Q_B_07",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_B_08_AnnualHouseholdIncome": {
    "target_id": "Q_B_08",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_C_01_ReasonsStartingBusiness": {
    "target_id": "Q_C_01",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_C_02_BusinessCycle": {
    "target_id": "Q_C_02",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_C_03_BusinessPlaceType": {
    "target_id": "Q_C_03",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_05_LocationConvenience": {
    "target_id": "Q_C_05",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_C_08_MarketingMethods": {
    "target_id": "Q_C_08",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_C_09_SellingMethods": {
    "target_id": "Q_C_09",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_C_11_RecordKeepingHabit": {
    "target_id": "Q_C_11",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_C_12_RecordKeepingMethod": {
    "target_id": "Q_C_12",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_D_01_SHGAssociationAssistance": {
    "target_id": "Q_D_01",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_D_04_FundingExperience": {
    "target_id": "Q_D_04",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_D_06_FinancialHelpFromIncome": {
    "target_id": "Q_D_06",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_E_01_HusbandFamilyResponse": {
    "target_id": "Q_E_01",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_E_02_MaterialSourcingComfort": {
    "target_id": "Q_E_02",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_E_03_CustomerPaymentRecovery": {
    "target_id": "Q_E_03",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_E_04_CurrentChallenges": {
    "target_id": "Q_E_04",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_E_06_CompetitorAdvantages": {
    "target_id": "Q_E_06",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_F_01_FutureExpansionPlans": {
    "target_id": "Q_F_01",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_F_02_AspirationBottlenecks": {
    "target_id": "Q_F_02",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_F_03_FutureFundsRequired": {
    "target_id": "Q_F_03",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_G_01_AttendedTraining": {
    "target_id": "Q_G_01",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_G_03_UsedTrainingComponent": {
    "target_id": "Q_G_03",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_G_06_MonthlyIncomeIncreaseByOSFSVEP": {
    "target_id": "Q_G_06",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_G_07_CRPContributions": {
    "target_id": "Q_G_07",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_G_08_ExpectationsFromScheme": {
    "target_id": "Q_G_08",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_H_01_SmartphoneOwnership": {
    "target_id": "Q_H_01",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_H_02_UseQRUPI": {
    "target_id": "Q_H_02",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_H_03_QRDailyTransactions": {
    "target_id": "Q_H_03",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_H_04_QRNonUseReason": {
    "target_id": "Q_H_04",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_H_05_SocialMediaForMarketing": {
    "target_id": "Q_H_05",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_H_06_SocialPlatformsUsed": {
    "target_id": "Q_H_06",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_H_07_SocialPlatformUsageMode": {
    "target_id": "Q_H_07",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_H_08_SocialMediaFrequency": {
    "target_id": "Q_H_08",
    "is_multi": false,
    "is_buttons": false
  },
  "Q_I_02_BusinessOperationalStatus": {
    "target_id": "Q_I_02",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_I_03_ReasonsScalingDown": {
    "target_id": "Q_I_03",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_I_04_SupportNeeded": {
    "target_id": "Q_I_04",
    "is_multi": true,
    "is_buttons": false
  },
  "Q_C_07_01_NearbyTown_Pct": {
    "target_id": "MAIN_PCT_SCALE_5",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_07_02_WholesaleState_Pct": {
    "target_id": "MAIN_PCT_SCALE_5",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_07_03_WholesaleOutside_Pct": {
    "target_id": "MAIN_PCT_SCALE_5",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_07_04_Online_Pct": {
    "target_id": "MAIN_PCT_SCALE_5",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_10_01_Online_Pct": {
    "target_id": "MAIN_PCT_SCALE_SALES",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_10_02_WhatsApp_Pct": {
    "target_id": "MAIN_PCT_SCALE_SALES",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_10_03_Instagram_Pct": {
    "target_id": "MAIN_PCT_SCALE_SALES",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_10_04_Premise_Pct": {
    "target_id": "MAIN_PCT_SCALE_SALES",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_10_05_Traders_Pct": {
    "target_id": "MAIN_PCT_SCALE_SALES",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_10_06_Haat_Pct": {
    "target_id": "MAIN_PCT_SCALE_SALES",
    "is_multi": false,
    "is_buttons": true
  },
  "Q_C_10_07_Saras_Pct": {
    "target_id": "MAIN_PCT_SCALE_SALES",
    "is_multi": false,
    "is_buttons": true
  }
};

    var count = 0;
    for (var col in DROPDOWNS) {
      if (attrMap[col] === undefined) continue;
      var aIdx = attrMap[col];
      var cfg = DROPDOWNS[col];
      var targetId = cfg.target_id;
      var isMulti = cfg.is_multi;
      var isButtons = cfg.is_buttons;

      var validIfFormula = '=SPLIT(LOOKUP("' + targetId + '", "AppVariables", "ID", "VariableList"), " , ")';
      var prefix = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + aIdx + ']';

      // 5a. Set ValidIf on top-level
      dict[prefix + '.ValidIf'] = validIfFormula;
      dict[prefix + '.Valid_If'] = validIfFormula;
      dict[prefix + '.ReferencedTableName'] = 'AppVariables';

      // 5b. Set Type & TypeAuxData
      if (isMulti) {
        dict[prefix + '.Type'] = 'EnumList';
        dict[prefix + '.EnumListElementTypeName'] = 'Ref';
        dict[prefix + '.TypeAuxData'] = enumListTypeAux;
      } else {
        dict[prefix + '.Type'] = 'Enum';
        dict[prefix + '.EnumListElementTypeName'] = 'Ref';
        dict[prefix + '.TypeAuxData'] = isButtons ? enumButtonsTypeAux : enumAutoTypeAux;
      }

      count++;
    }

    console.log("[INFO] Configured ValidIf for " + count + " dropdown columns.");

    // 6. Dispatch Redux Actions
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] " + count + " columns updated with ValidIf SPLIT(LOOKUP(...))! ===");
    console.log("[ACTION] Click the blue SAVE button in AppSheet header to commit changes.");
  } catch (e) {
    console.error("[FAIL] Error:", e);
  }
})();
