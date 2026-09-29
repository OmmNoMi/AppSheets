(function injectSurveyDisplayNamesAndEnumRefs() {
  try {
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) {
          return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance');
        });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
            window.appStore = f.memoizedProps.store;
            return window.appStore;
          }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
            window.appStore = f.stateNode.store;
            return window.appStore;
          }
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) {
      console.error("[FAIL] AppSheet Redux store not found. Ensure AppSheet Editor is open.");
      return;
    }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) {
      console.error("[FAIL] AppTemplate not found in Redux state.");
      return;
    }

    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var surveyIdx = schemas.findIndex(function(s) {
      return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey') ||
             (s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed'; }));
    });

    if (surveyIdx === -1) {
      console.error("[FAIL] Survey schema not found in AppData.DataSchemas.");
      return;
    }

    var columnRules = {
  "SubTable_FamilyCount": {
    "qId": "Q_B_05_CUSTOM",
    "displayName": "=LOOKUP(\"Q_B_05_CUSTOM\", \"AppVariables\", \"ID\", \"Label\")"
  },
  "District": {
    "qId": "Q_A_01",
    "displayName": "=LOOKUP(\"Q_A_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Block": {
    "qId": "Q_A_02",
    "displayName": "=LOOKUP(\"Q_A_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "VillageGP": {
    "qId": "Q_A_03",
    "displayName": "=LOOKUP(\"Q_A_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "RespondentName": {
    "qId": "Q_A_04",
    "displayName": "=LOOKUP(\"Q_A_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "RespondentPhone": {
    "qId": "Q_A_05",
    "displayName": "=LOOKUP(\"Q_A_05\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Phone"
  },
  "SHGName": {
    "qId": "Q_A_06",
    "displayName": "=LOOKUP(\"Q_A_06\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "VOName": {
    "qId": "Q_A_07",
    "displayName": "=LOOKUP(\"Q_A_07\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "CLFName": {
    "qId": "Q_A_08",
    "displayName": "=LOOKUP(\"Q_A_08\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "SHGMembershipYears": {
    "qId": "Q_A_09",
    "displayName": "=LOOKUP(\"Q_A_09\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "LeadershipRole": {
    "qId": "Q_A_10",
    "displayName": "=LOOKUP(\"Q_A_10\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_10\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "LeadershipYears": {
    "qId": "Q_A_11",
    "displayName": "=LOOKUP(\"Q_A_11\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "RelatedToCRP": {
    "qId": "Q_A_12",
    "displayName": "=LOOKUP(\"Q_A_12\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_12\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "EPInterventionType": {
    "qId": "Q_A_13",
    "displayName": "=LOOKUP(\"Q_A_13\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_13\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "EnterpriseName": {
    "qId": "Q_A_14",
    "displayName": "=LOOKUP(\"Q_A_14\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "EnterpriseSetupYear": {
    "qId": "Q_A_15",
    "displayName": "=LOOKUP(\"Q_A_15\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "BusinessType": {
    "qId": "Q_A_16",
    "displayName": "=LOOKUP(\"Q_A_16\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_16\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "BusinessActivities": {
    "qId": "Q_A_17",
    "displayName": "=LOOKUP(\"Q_A_17\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_17\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "LoanReceivedYear": {
    "qId": "Q_A_18",
    "displayName": "=LOOKUP(\"Q_A_18\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "MaintainSeparateRecords": {
    "qId": "Q_A_19",
    "displayName": "=LOOKUP(\"Q_A_19\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_19\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "RegistrationsDocuments": {
    "qId": "Q_A_20",
    "displayName": "=LOOKUP(\"Q_A_20\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_A_20\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "RespondentAge": {
    "qId": "Q_B_01",
    "displayName": "=LOOKUP(\"Q_B_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_B_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "MaritalStatus": {
    "qId": "Q_B_02",
    "displayName": "=LOOKUP(\"Q_B_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_B_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SocialCategory": {
    "qId": "Q_B_03",
    "displayName": "=LOOKUP(\"Q_B_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_B_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "EducationStatus": {
    "qId": "Q_B_04",
    "displayName": "=LOOKUP(\"Q_B_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_B_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "FamilyMemberCount": {
    "qId": "Q_B_05",
    "displayName": "=LOOKUP(\"Q_B_05\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "FamilyAdultsCount": {
    "qId": "Q_B_06_01",
    "displayName": "=LOOKUP(\"Q_B_06_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "FamilyChildrenCount": {
    "qId": "Q_B_06_02",
    "displayName": "=LOOKUP(\"Q_B_06_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "FamilyTotalEarning": {
    "qId": "Q_B_06_03",
    "displayName": "=LOOKUP(\"Q_B_06_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "FamilyMaleEarning": {
    "qId": "Q_B_06_04",
    "displayName": "=LOOKUP(\"Q_B_06_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "FamilyFemaleEarning": {
    "qId": "Q_B_06_05",
    "displayName": "=LOOKUP(\"Q_B_06_05\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "FamilyDisabledCount": {
    "qId": "Q_B_06_06",
    "displayName": "=LOOKUP(\"Q_B_06_06\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "FamilyIncomeSources": {
    "qId": "Q_B_07",
    "displayName": "=LOOKUP(\"Q_B_07\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_B_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "AnnualHouseholdIncome": {
    "qId": "Q_B_08",
    "displayName": "=LOOKUP(\"Q_B_08\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_B_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "ReasonsStartingBusiness": {
    "qId": "Q_C_01",
    "displayName": "=LOOKUP(\"Q_C_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "BusinessCycle": {
    "qId": "Q_C_02",
    "displayName": "=LOOKUP(\"Q_C_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "BusinessPlaceType": {
    "qId": "Q_C_03",
    "displayName": "=LOOKUP(\"Q_C_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "MonthlyRent": {
    "qId": "Q_C_04",
    "displayName": "=LOOKUP(\"Q_C_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "LocationConvenience": {
    "qId": "Q_C_05",
    "displayName": "=LOOKUP(\"Q_C_05\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Related_Q6_Labor": {
    "qId": "Q_C_06_TABLE",
    "displayName": "=LOOKUP(\"Q_C_06_TABLE\", \"AppVariables\", \"ID\", \"Label\")"
  },
  "Sourcing_NearbyTown_Pct": {
    "qId": "Q_C_07_01",
    "displayName": "=LOOKUP(\"Q_C_07_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_07_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Sourcing_Jaipur_Pct": {
    "qId": "Q_C_07_02",
    "displayName": "=LOOKUP(\"Q_C_07_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_07_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Sourcing_OutsideState_Pct": {
    "qId": "Q_C_07_03",
    "displayName": "=LOOKUP(\"Q_C_07_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_07_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Sourcing_Online_Pct": {
    "qId": "Q_C_07_04",
    "displayName": "=LOOKUP(\"Q_C_07_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_07_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "MarketingMethods": {
    "qId": "Q_C_08",
    "displayName": "=LOOKUP(\"Q_C_08\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SeasonalSalesMethod": {
    "qId": "Q_C_09",
    "displayName": "=LOOKUP(\"Q_C_09\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_09\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SalesChannel_Online_Pct": {
    "qId": "Q_C_10_01",
    "displayName": "=LOOKUP(\"Q_C_10_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_10_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SalesChannel_WhatsApp_Pct": {
    "qId": "Q_C_10_02",
    "displayName": "=LOOKUP(\"Q_C_10_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_10_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SalesChannel_Instagram_Pct": {
    "qId": "Q_C_10_03",
    "displayName": "=LOOKUP(\"Q_C_10_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_10_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SalesChannel_Premise_Pct": {
    "qId": "Q_C_10_04",
    "displayName": "=LOOKUP(\"Q_C_10_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_10_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SalesChannel_Traders_Pct": {
    "qId": "Q_C_10_05",
    "displayName": "=LOOKUP(\"Q_C_10_05\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_10_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SalesChannel_Haat_Pct": {
    "qId": "Q_C_10_06",
    "displayName": "=LOOKUP(\"Q_C_10_06\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_10_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SalesChannel_Saras_Pct": {
    "qId": "Q_C_10_07",
    "displayName": "=LOOKUP(\"Q_C_10_07\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_10_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "RecordKeepingHabit": {
    "qId": "Q_C_11",
    "displayName": "=LOOKUP(\"Q_C_11\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_11\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "RecordKeepingMethod": {
    "qId": "Q_C_12",
    "displayName": "=LOOKUP(\"Q_C_12\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_C_12\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Related_Q15_Turnover": {
    "qId": "Q_C_13_TABLE",
    "displayName": "=LOOKUP(\"Q_C_13_TABLE\", \"AppVariables\", \"ID\", \"Label\")"
  },
  "SHGAssociationAssistance": {
    "qId": "Q_D_01",
    "displayName": "=LOOKUP(\"Q_D_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_D_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Related_Q19_Capital": {
    "qId": "Q_D_02_TABLE",
    "displayName": "=LOOKUP(\"Q_D_02_TABLE\", \"AppVariables\", \"ID\", \"Label\")"
  },
  "Related_Q20_Loan_Usage": {
    "qId": "Q_D_03_TABLE",
    "displayName": "=LOOKUP(\"Q_D_03_TABLE\", \"AppVariables\", \"ID\", \"Label\")"
  },
  "FundingExperience": {
    "qId": "Q_D_04",
    "displayName": "=LOOKUP(\"Q_D_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_D_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Related_Q22_Trajectory": {
    "qId": "Q_D_05_TABLE",
    "displayName": "=LOOKUP(\"Q_D_05_TABLE\", \"AppVariables\", \"ID\", \"Label\")"
  },
  "FinancialHelpFromIncome": {
    "qId": "Q_D_06",
    "displayName": "=LOOKUP(\"Q_D_06\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_D_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "HusbandFamilyResponse": {
    "qId": "Q_E_01",
    "displayName": "=LOOKUP(\"Q_E_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_E_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "MaterialSourcingComfort": {
    "qId": "Q_E_02",
    "displayName": "=LOOKUP(\"Q_E_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_E_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "CustomerPaymentRecovery": {
    "qId": "Q_E_03",
    "displayName": "=LOOKUP(\"Q_E_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_E_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "CurrentChallenges": {
    "qId": "Q_E_04",
    "displayName": "=LOOKUP(\"Q_E_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_E_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Competitors_Similar_Scale": {
    "qId": "Q_E_05_01",
    "displayName": "=LOOKUP(\"Q_E_05_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "Competitors_Smaller_Scale": {
    "qId": "Q_E_05_02",
    "displayName": "=LOOKUP(\"Q_E_05_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "Competitors_Higher_Scale": {
    "qId": "Q_E_05_03",
    "displayName": "=LOOKUP(\"Q_E_05_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "CompetitorAdvantages": {
    "qId": "Q_E_06",
    "displayName": "=LOOKUP(\"Q_E_06\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_E_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "FutureExpansionPlans": {
    "qId": "Q_F_01",
    "displayName": "=LOOKUP(\"Q_F_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_F_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "AspirationBottlenecks": {
    "qId": "Q_F_02",
    "displayName": "=LOOKUP(\"Q_F_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_F_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "FutureFundsRequired": {
    "qId": "Q_F_03",
    "displayName": "=LOOKUP(\"Q_F_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_F_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "AttendedTraining": {
    "qId": "Q_G_01",
    "displayName": "=LOOKUP(\"Q_G_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_G_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "TrainingDetails": {
    "qId": "Q_G_02",
    "displayName": "=LOOKUP(\"Q_G_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "UsedTrainingComponent": {
    "qId": "Q_G_03",
    "displayName": "=LOOKUP(\"Q_G_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_G_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "UsedTrainingDetails": {
    "qId": "Q_G_04",
    "displayName": "=LOOKUP(\"Q_G_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Text"
  },
  "MonthlyIncomeBeforeLoan": {
    "qId": "Q_G_05_01",
    "displayName": "=LOOKUP(\"Q_G_05_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "MonthlyIncomeAfterLoan": {
    "qId": "Q_G_05_02",
    "displayName": "=LOOKUP(\"Q_G_05_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "MonthlyIncomeIncreaseByOSFSVEP": {
    "qId": "Q_G_06",
    "displayName": "=LOOKUP(\"Q_G_06\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_G_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "CRPContributions": {
    "qId": "Q_G_07",
    "displayName": "=LOOKUP(\"Q_G_07\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_G_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "ExpectationsFromScheme": {
    "qId": "Q_G_08",
    "displayName": "=LOOKUP(\"Q_G_08\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_G_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SmartphoneOwnership": {
    "qId": "Q_H_01",
    "displayName": "=LOOKUP(\"Q_H_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "UseQRUPI": {
    "qId": "Q_H_02",
    "displayName": "=LOOKUP(\"Q_H_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "QRDailyTransactions": {
    "qId": "Q_H_03",
    "displayName": "=LOOKUP(\"Q_H_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "QRNonUseReason": {
    "qId": "Q_H_04",
    "displayName": "=LOOKUP(\"Q_H_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SocialMediaForMarketing": {
    "qId": "Q_H_05",
    "displayName": "=LOOKUP(\"Q_H_05\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SocialPlatformsUsed": {
    "qId": "Q_H_06",
    "displayName": "=LOOKUP(\"Q_H_06\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SocialPlatformUsageMode": {
    "qId": "Q_H_07",
    "displayName": "=LOOKUP(\"Q_H_07\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SocialMediaFrequency": {
    "qId": "Q_H_08",
    "displayName": "=LOOKUP(\"Q_H_08\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_H_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "OSFInterventionYear": {
    "qId": "Q_I_01",
    "displayName": "=LOOKUP(\"Q_I_01\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Number"
  },
  "BusinessOperationalStatus": {
    "qId": "Q_I_02",
    "displayName": "=LOOKUP(\"Q_I_02\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "isEnumList": false,
    "validIf": "=SPLIT(LOOKUP(\"Q_I_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "ScalingDownClosingReasons": {
    "qId": "Q_I_03",
    "displayName": "=LOOKUP(\"Q_I_03\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_I_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "SupportNeededForSustenance": {
    "qId": "Q_I_04",
    "displayName": "=LOOKUP(\"Q_I_04\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "EnumList",
    "isEnumList": true,
    "validIf": "=SPLIT(LOOKUP(\"Q_I_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Status": {
    "qId": "COL_STATUS",
    "displayName": "=LOOKUP(\"COL_STATUS\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "validIf": "=SPLIT(LOOKUP(\"COL_STATUS\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Language": {
    "qId": "COL_LANGUAGE",
    "displayName": "=LOOKUP(\"COL_LANGUAGE\", \"AppVariables\", \"ID\", \"Label\")",
    "type": "Enum",
    "validIf": "=SPLIT(LOOKUP(\"COL_LANGUAGE\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
  },
  "Date": {
    "displayName": "Survey Date",
    "type": "Date"
  },
  "InvestigatorID": {
    "displayName": "Investigator",
    "type": "Ref",
    "refTable": "AppUser"
  }
};

    var dict = {};
    var sAttrs = schemas[surveyIdx].Attributes || [];
    var count = 0;

    sAttrs.forEach(function(a, idx) {
      var colName = a.Name;
      var r = columnRules[colName];
      if (!r) return;

      var p = "AppData.DataSchemas[" + surveyIdx + "].Attributes[" + idx + "]";
      
      var auxObj = {};
      if (a.TypeAuxData) {
        try {
          auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData);
        } catch(e) {}
      }

      if (r.displayName) {
        a.DisplayName = r.displayName;
        dict[p + ".DisplayName"] = r.displayName;
      }

      if (r.type === 'Enum' || r.type === 'EnumList') {
        a.Type = r.type;
        dict[p + ".Type"] = r.type;
        a.ReferencedTableName = 'AppVariables';
        dict[p + ".ReferencedTableName"] = 'AppVariables';
        a.ReferencedRootTableName = 'AppVariables';
        dict[p + ".ReferencedRootTableName"] = 'AppVariables';
        auxObj.ReferencedTableName = 'AppVariables';
        auxObj.ReferencedRootTableName = 'AppVariables';

        if (r.isEnumList) {
          a.EnumListElementTypeName = 'Ref';
          dict[p + ".EnumListElementTypeName"] = 'Ref';
          auxObj.EnumListElementTypeName = 'Ref';
        }

        if (r.validIf) {
          a.Valid_If = r.validIf;
          a.ValidIf = r.validIf;
          dict[p + ".Valid_If"] = r.validIf;
          dict[p + ".ValidIf"] = r.validIf;
          auxObj.Valid_If = r.validIf;
          auxObj.ValidIf = r.validIf;

          a.Suggested_Values = r.validIf;
          a.SuggestedValues = r.validIf;
          dict[p + ".Suggested_Values"] = r.validIf;
          dict[p + ".SuggestedValues"] = r.validIf;
          auxObj.Suggested_Values = r.validIf;
          auxObj.SuggestedValues = r.validIf;
        }
      } else if (r.type && r.type !== 'Ref_Table') {
        a.Type = r.type;
        dict[p + ".Type"] = r.type;
      }

      var auxStr = JSON.stringify(auxObj);
      a.TypeAuxData = auxStr;
      dict[p + ".TypeAuxData"] = auxStr;

      count++;
    });

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });

    console.log("==================================================");
    console.log("[SUCCESS] Applied DisplayName and Enum Ref to " + count + " columns in Survey table!");
    console.log("[ACTION] Click the blue SAVE button in AppSheet header to commit changes.");
    console.log("==================================================");
  } catch (err) {
    console.error("[ERROR] Failed to inject DisplayNames and Enum Refs:", err.message);
  }
})();
