// ==============================================================================
// OmmNoMi Master Dynamic DisplayName & Dynamic Values (Valid_If) Redux Injector
// 100% Pure ASCII, Zero Syntax Errors, Validated with node -c
// ==============================================================================
(function runOmmNoMiDynamicSetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Dynamic DisplayName and Values Setup ===");

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

    // 3. TypeAuxData Templates for Enum / EnumList Ref -> AppVariables
    var refQ = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedRootTableName: "AppVariables", ReferencedType: "Text", ReferencedKeyColumn: "ID", IsAPartOf: false, InputMode: "Auto" });
    var enumListAux = JSON.stringify({ ElementType: "Ref", ElementTypeQualifier: refQ, ItemSeparator: " , " });
    var enumAux = JSON.stringify({ EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: true, BaseType: "Ref", BaseTypeQualifier: refQ, EnumInputMode: "Auto" });
    var enumBtnAux = JSON.stringify({ EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: true, BaseType: "Ref", BaseTypeQualifier: refQ, EnumInputMode: "Buttons" });

    // 4. Map of Columns -> [qid, type, scale, inputMode]
    var M = {
  "Q_A_01_District": [
    "Q_A_01",
    "Enum",
    "",
    ""
  ],
  "Q_A_02_Block": [
    "Q_A_02",
    "Enum",
    "",
    ""
  ],
  "Q_A_03_VillageGP": [
    "Q_A_03",
    "Text",
    "",
    ""
  ],
  "Q_A_04_RespondentName": [
    "Q_A_04",
    "Text",
    "",
    ""
  ],
  "Q_A_05_RespondentPhone": [
    "Q_A_05",
    "Phone",
    "",
    ""
  ],
  "Q_A_06_SHGName": [
    "Q_A_06",
    "Text",
    "",
    ""
  ],
  "Q_A_07_VOName": [
    "Q_A_07",
    "Text",
    "",
    ""
  ],
  "Q_A_08_CLFName": [
    "Q_A_08",
    "Text",
    "",
    ""
  ],
  "Q_A_09_SHGMembershipYears": [
    "Q_A_09",
    "Number",
    "",
    ""
  ],
  "Q_A_10_LeadershipRole": [
    "Q_A_10",
    "Enum",
    "",
    ""
  ],
  "Q_A_11_LeadershipYears": [
    "Q_A_11",
    "Number",
    "",
    ""
  ],
  "Q_A_12_RelatedToCRP": [
    "Q_A_12",
    "Enum",
    "",
    ""
  ],
  "Q_A_13_EPInterventionType": [
    "Q_A_13",
    "Enum",
    "",
    ""
  ],
  "Q_A_14_EnterpriseName": [
    "Q_A_14",
    "Text",
    "",
    ""
  ],
  "Q_A_15_EnterpriseSetupYear": [
    "Q_A_15",
    "Number",
    "",
    ""
  ],
  "Q_A_16_BusinessType": [
    "Q_A_16",
    "EnumList",
    "",
    ""
  ],
  "Q_A_17_BusinessActivities": [
    "Q_A_17",
    "EnumList",
    "",
    ""
  ],
  "Q_A_18_LoanReceivedYear": [
    "Q_A_18",
    "Number",
    "",
    ""
  ],
  "Q_A_19_MaintainSeparateRecords": [
    "Q_A_19",
    "Enum",
    "",
    ""
  ],
  "Q_A_20_RegistrationsDocuments": [
    "Q_A_20",
    "EnumList",
    "",
    ""
  ],
  "Q_B_01_RespondentAge": [
    "Q_B_01",
    "Enum",
    "",
    ""
  ],
  "Q_B_02_MaritalStatus": [
    "Q_B_02",
    "Enum",
    "",
    ""
  ],
  "Q_B_03_SocialCategory": [
    "Q_B_03",
    "Enum",
    "",
    ""
  ],
  "Q_B_04_EducationStatus": [
    "Q_B_04",
    "Enum",
    "",
    ""
  ],
  "Q_B_05_FamilyMemberCount": [
    "Q_B_05",
    "Number",
    "",
    ""
  ],
  "Q_B_06_01_Adults": [
    "Q_B_06_01",
    "Number",
    "",
    ""
  ],
  "Q_B_06_02_Children": [
    "Q_B_06_02",
    "Number",
    "",
    ""
  ],
  "Q_B_06_03_TotalEarning": [
    "Q_B_06_03",
    "Number",
    "",
    ""
  ],
  "Q_B_06_04_MaleEarning": [
    "Q_B_06_04",
    "Number",
    "",
    ""
  ],
  "Q_B_06_05_FemaleEarning": [
    "Q_B_06_05",
    "Number",
    "",
    ""
  ],
  "Q_B_06_06_DisabledCount": [
    "Q_B_06_06",
    "Number",
    "",
    ""
  ],
  "Q_B_07_FamilyIncomeSources": [
    "Q_B_07",
    "EnumList",
    "",
    ""
  ],
  "Q_B_08_AnnualHouseholdIncome": [
    "Q_B_08",
    "Enum",
    "",
    ""
  ],
  "Q_C_01_ReasonsStartingBusiness": [
    "Q_C_01",
    "EnumList",
    "",
    ""
  ],
  "Q_C_02_BusinessCycle": [
    "Q_C_02",
    "Enum",
    "",
    ""
  ],
  "Q_C_03_BusinessPlaceType": [
    "Q_C_03",
    "Enum",
    "",
    ""
  ],
  "Q_C_04_MonthlyRent": [
    "Q_C_04",
    "Number",
    "",
    ""
  ],
  "Q_C_05_LocationConvenience": [
    "Q_C_05",
    "Enum",
    "",
    ""
  ],
  "Q_C_06_Labor_Involvement": [
    "Q_C_06_TABLE",
    "Ref_Table",
    "",
    ""
  ],
  "Q_C_07_01_NearbyTown_Pct": [
    "Q_C_07_01",
    "Enum",
    "MAIN_PCT_SCALE_5",
    "Buttons"
  ],
  "Q_C_07_02_WholesaleState_Pct": [
    "Q_C_07_02",
    "Enum",
    "MAIN_PCT_SCALE_5",
    "Buttons"
  ],
  "Q_C_07_03_WholesaleOutside_Pct": [
    "Q_C_07_03",
    "Enum",
    "MAIN_PCT_SCALE_5",
    "Buttons"
  ],
  "Q_C_07_04_Online_Pct": [
    "Q_C_07_04",
    "Enum",
    "MAIN_PCT_SCALE_5",
    "Buttons"
  ],
  "Q_C_08_MarketingMethods": [
    "Q_C_08",
    "EnumList",
    "",
    ""
  ],
  "Q_C_09_SellingMethods": [
    "Q_C_09",
    "EnumList",
    "",
    ""
  ],
  "Q_C_10_01_Online_Pct": [
    "Q_C_10_01",
    "Enum",
    "MAIN_PCT_SCALE_SALES",
    "Buttons"
  ],
  "Q_C_10_02_WhatsApp_Pct": [
    "Q_C_10_02",
    "Enum",
    "MAIN_PCT_SCALE_SALES",
    "Buttons"
  ],
  "Q_C_10_03_Instagram_Pct": [
    "Q_C_10_03",
    "Enum",
    "MAIN_PCT_SCALE_SALES",
    "Buttons"
  ],
  "Q_C_10_04_Premise_Pct": [
    "Q_C_10_04",
    "Enum",
    "MAIN_PCT_SCALE_SALES",
    "Buttons"
  ],
  "Q_C_10_05_Traders_Pct": [
    "Q_C_10_05",
    "Enum",
    "MAIN_PCT_SCALE_SALES",
    "Buttons"
  ],
  "Q_C_10_06_Haat_Pct": [
    "Q_C_10_06",
    "Enum",
    "MAIN_PCT_SCALE_SALES",
    "Buttons"
  ],
  "Q_C_10_07_Saras_Pct": [
    "Q_C_10_07",
    "Enum",
    "MAIN_PCT_SCALE_SALES",
    "Buttons"
  ],
  "Q_C_11_RecordKeepingHabit": [
    "Q_C_11",
    "Enum",
    "",
    ""
  ],
  "Q_C_12_RecordKeepingMethod": [
    "Q_C_12",
    "EnumList",
    "",
    ""
  ],
  "Q_C_13_Turnover_Income": [
    "Q_C_13_TABLE",
    "Ref_Table",
    "",
    ""
  ],
  "Q_D_01_SHGAssociationAssistance": [
    "Q_D_01",
    "EnumList",
    "",
    ""
  ],
  "Q_D_02_Capital_Arranged": [
    "Q_D_02_TABLE",
    "Ref_Table",
    "",
    ""
  ],
  "Q_D_03_Loan_Usage": [
    "Q_D_03_TABLE",
    "Ref_Table",
    "",
    ""
  ],
  "Q_D_04_FundingExperience": [
    "Q_D_04",
    "EnumList",
    "",
    ""
  ],
  "Q_D_05_Business_Trajectory": [
    "Q_D_05_TABLE",
    "Ref_Table",
    "",
    ""
  ],
  "Q_D_06_FinancialHelpFromIncome": [
    "Q_D_06",
    "EnumList",
    "",
    ""
  ],
  "Q_E_01_HusbandFamilyResponse": [
    "Q_E_01",
    "EnumList",
    "",
    ""
  ],
  "Q_E_02_MaterialSourcingComfort": [
    "Q_E_02",
    "Enum",
    "",
    ""
  ],
  "Q_E_03_CustomerPaymentRecovery": [
    "Q_E_03",
    "Enum",
    "",
    ""
  ],
  "Q_E_04_CurrentChallenges": [
    "Q_E_04",
    "EnumList",
    "",
    ""
  ],
  "Q_E_05_Competitors_Count": [
    "Q_E_05_01",
    "Number",
    "",
    ""
  ],
  "Q_E_05_Competitors_Smaller": [
    "Q_E_05_02",
    "Number",
    "",
    ""
  ],
  "Q_E_05_Competitors_Higher": [
    "Q_E_05_03",
    "Number",
    "",
    ""
  ],
  "Q_E_06_CompetitorAdvantages": [
    "Q_E_06",
    "EnumList",
    "",
    ""
  ],
  "Q_F_01_FutureExpansionPlans": [
    "Q_F_01",
    "Enum",
    "",
    ""
  ],
  "Q_F_02_AspirationBottlenecks": [
    "Q_F_02",
    "EnumList",
    "",
    ""
  ],
  "Q_F_03_FutureFundsRequired": [
    "Q_F_03",
    "Enum",
    "",
    ""
  ],
  "Q_G_01_AttendedTraining": [
    "Q_G_01",
    "Enum",
    "",
    ""
  ],
  "Q_G_02_TrainingDetails": [
    "Q_G_02",
    "Text",
    "",
    ""
  ],
  "Q_G_03_UsedTrainingComponent": [
    "Q_G_03",
    "Enum",
    "",
    ""
  ],
  "Q_G_04_UsedTrainingDetails": [
    "Q_G_04",
    "Text",
    "",
    ""
  ],
  "Q_G_05_MonthlyIncomeBeforeLoan": [
    "Q_G_05_01",
    "Number",
    "",
    ""
  ],
  "Q_G_05_MonthlyIncomeAfterLoan": [
    "Q_G_05_02",
    "Number",
    "",
    ""
  ],
  "Q_G_06_MonthlyIncomeIncreaseByOSFSVEP": [
    "Q_G_06",
    "Enum",
    "",
    ""
  ],
  "Q_G_07_CRPContributions": [
    "Q_G_07",
    "EnumList",
    "",
    ""
  ],
  "Q_G_08_ExpectationsFromScheme": [
    "Q_G_08",
    "EnumList",
    "",
    ""
  ],
  "Q_H_01_SmartphoneOwnership": [
    "Q_H_01",
    "Enum",
    "",
    ""
  ],
  "Q_H_02_UseQRUPI": [
    "Q_H_02",
    "Enum",
    "",
    ""
  ],
  "Q_H_03_QRDailyTransactions": [
    "Q_H_03",
    "Enum",
    "",
    ""
  ],
  "Q_H_04_QRNonUseReason": [
    "Q_H_04",
    "Enum",
    "",
    ""
  ],
  "Q_H_05_SocialMediaForMarketing": [
    "Q_H_05",
    "Enum",
    "",
    ""
  ],
  "Q_H_06_SocialPlatformsUsed": [
    "Q_H_06",
    "EnumList",
    "",
    ""
  ],
  "Q_H_07_SocialPlatformUsageMode": [
    "Q_H_07",
    "Enum",
    "",
    ""
  ],
  "Q_H_08_SocialMediaFrequency": [
    "Q_H_08",
    "Enum",
    "",
    ""
  ],
  "Q_I_01_OSFInterventionYear": [
    "Q_I_01",
    "Number",
    "",
    ""
  ],
  "Q_I_02_BusinessOperationalStatus": [
    "Q_I_02",
    "Enum",
    "",
    ""
  ],
  "Q_I_03_ReasonsScalingDown": [
    "Q_I_03",
    "EnumList",
    "",
    ""
  ],
  "Q_I_04_SupportNeeded": [
    "Q_I_04",
    "EnumList",
    "",
    ""
  ]
};

    var dict = {};
    var updated = 0;

    for (var col in M) {
      if (attrMap[col] === undefined) continue;
      var idx = attrMap[col];
      var info = M[col];
      var qid = info[0];
      var type = info[1];
      var scale = info[2];
      var btn = info[3];

      // 4a. Dynamic DisplayName
      dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].DisplayName'] = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';

      // 4b. Dynamic Values & Type
      if (type === 'Enum' || type === 'EnumList' || scale) {
        var targetId = scale ? scale : qid;
        var validIf = '=SPLIT(LOOKUP("' + targetId + '", "AppVariables", "ID", "VariableList"), " , ")';
        dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].ValidIf'] = validIf;
        dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].Valid_If'] = validIf;
        dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].ReferencedTableName'] = 'AppVariables';

        if (type === 'EnumList') {
          dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].Type'] = 'EnumList';
          dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].EnumListElementTypeName'] = 'Ref';
          dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].TypeAuxData'] = enumListAux;
        } else {
          dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].Type'] = 'Enum';
          dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].EnumListElementTypeName'] = 'Ref';
          dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].TypeAuxData'] = (btn === 'Buttons') ? enumBtnAux : enumAux;
        }
      } else if (type === 'Number' || type === 'Phone' || type === 'Text') {
        dict['AppData.DataSchemas[' + surveyIdx + '].Attributes[' + idx + '].Type'] = type;
      }
      updated++;
    }

    // 5. Dispatch Redux Action & Enable Save
    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] " + updated + " columns configured! Native Cloud Save button is now active. ===");
  } catch (e) {
    console.error("[FAIL] Error:", e);
  }
})();
