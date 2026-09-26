// ==============================================================================
// OmmNoMi Master Universal Survey Configurator (Supports Exact & Prefixed Names)
// Sets: DisplayName (=LOOKUP), Type, Valid_If (=SPLIT(LOOKUP(...))), TypeAuxData
// 100% Pure ASCII, Zero Syntax Errors, Validated with node -c
// ==============================================================================
(function runOmmNoMiUniversalSurveySetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Universal Survey Configuration ===");

    // 0. Auto-close open modal if any to prevent React draft state conflicts
    var closeButtons = document.querySelectorAll('button[aria-label="Close"], button[aria-label="Cancel"]');
    closeButtons.forEach(function(b) { b.click(); });

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

    // Ensure AppVariables has Title as Label column
    if (appVarIdx !== -1) {
      var vAttrs = schemas[appVarIdx].Attributes || [];
      for (var vi = 0; vi < vAttrs.length; vi++) {
        if (vAttrs[vi].Name === 'Title') {
          dict['AppData.DataSchemas[' + appVarIdx + '].Attributes[' + vi + '].IsLabel'] = true;
          schemas[appVarIdx].Attributes[vi].IsLabel = true;
        }
      }
    }

    var attrs = schemas[surveyIdx].Attributes || [];
    var attrMap = {};
    for (var ai = 0; ai < attrs.length; ai++) {
      attrMap[attrs[ai].Name] = ai;
    }

    // Ref Qualifier for AppVariables
    var refQualifier = JSON.stringify({
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      InputMode: "Auto",
      Valid_If: null,
      Error_Message_If_Invalid: null,
      Show_If: null,
      Required_If: null,
      Editable_If: null,
      Reset_If: null,
      Suggested_Values: null
    });

    var CONFIGS = {
    "Status_Profile": {
        "qid": "Q_STAT_PROFILE",
        "type": "Enum",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Status_Operations": {
        "qid": "Q_STAT_OPERATIONS",
        "type": "Enum",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Status_Challenges": {
        "qid": "Q_STAT_CHALLENGES",
        "type": "Enum",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Status_SchemeImpact": {
        "qid": "Q_STAT_SCHEME",
        "type": "Enum",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Status_Digital": {
        "qid": "Q_STAT_DIGITAL",
        "type": "Enum",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Status_PostExit": {
        "qid": "Q_STAT_POST_EXIT",
        "type": "Enum",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "District": {
        "qid": "Q_A_01",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "Block": {
        "qid": "Q_A_02",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "VillageGP": {
        "qid": "Q_A_03",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "RespondentName": {
        "qid": "Q_A_04",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "RespondentPhone": {
        "qid": "Q_A_05",
        "type": "Phone",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "SHGName": {
        "qid": "Q_A_06",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "VOName": {
        "qid": "Q_A_07",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "CLFName": {
        "qid": "Q_A_08",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "SHGMembershipYears": {
        "qid": "Q_A_09",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "LeadershipRole": {
        "qid": "Q_A_10",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_10\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "LeadershipYears": {
        "qid": "Q_A_11",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "RelatedToCRP": {
        "qid": "Q_A_12",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_12\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "EPInterventionType": {
        "qid": "Q_A_13",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_13\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "EnterpriseName": {
        "qid": "Q_A_14",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "ParallelEnterpriseName": {
        "qid": "Q_A_14",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "EnterpriseSetupYear": {
        "qid": "Q_A_15",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "BusinessType": {
        "qid": "Q_A_16",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_16\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "BusinessActivities": {
        "qid": "Q_A_17",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_17\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "BusinessActivitiesOther": {
        "qid": "Q_A_17",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "LoanReceivedYear": {
        "qid": "Q_A_18",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "MaintainSeparateRecords": {
        "qid": "Q_A_19",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_19\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "RegistrationsDocuments": {
        "qid": "Q_A_20",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_A_20\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "RespondentAge": {
        "qid": "Q_B_01",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_B_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "MaritalStatus": {
        "qid": "Q_B_02",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_B_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SocialCategory": {
        "qid": "Q_B_03",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_B_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "EducationStatus": {
        "qid": "Q_B_04",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_B_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "FamilyMemberCount": {
        "qid": "Q_B_05",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "FamilyIncomeSources": {
        "qid": "Q_B_07",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_B_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "FamilyIncome_AnimalSale_Specify": {
        "qid": "Q_B_07",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "FamilyIncomeSourcesOther": {
        "qid": "Q_B_07",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "AnnualHouseholdIncome": {
        "qid": "Q_B_08",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_B_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "ReasonsStartingBusiness": {
        "qid": "Q_C_01",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "BusinessCycle": {
        "qid": "Q_C_02",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "BusinessPlaceType": {
        "qid": "Q_C_03",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "AnnualRent": {
        "qid": "Q_C_04",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "LocationConvenience": {
        "qid": "Q_C_05",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "Material_Percentage": {
        "qid": "Q_C_07_01",
        "type": "Section",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "MarketingMethods": {
        "qid": "Q_C_08",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SeasonalSalesMethod": {
        "qid": "Q_C_09",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_09\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "Social_OnlinePlatform": {
        "qid": "Q_C_09",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "RecordKeepingHabit": {
        "qid": "Q_C_11",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_11\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "RecordKeepingMethod": {
        "qid": "Q_C_12",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_C_12\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SHGAssociationAssistance": {
        "qid": "Q_D_01",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_D_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "FundingExperience": {
        "qid": "Q_D_04",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_D_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "FinancialHelpFromIncome": {
        "qid": "Q_D_06",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_D_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "FinancialHelp_EducationAmt": {
        "qid": "Q_D_06",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "FinancialHelp_DebtsAmt": {
        "qid": "Q_D_06",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "FinancialHelp_AssetsAmt": {
        "qid": "Q_D_06",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "FinancialHelp_MarriageAmt": {
        "qid": "Q_D_06",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "DebtRepaidAmount": {
        "qid": "Q_D_06",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "AssetsAcquiredAmount": {
        "qid": "Q_D_06",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "MarriageExpensesAmount": {
        "qid": "Q_D_06",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "HusbandFamilyResponse": {
        "qid": "Q_E_01",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_E_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "MaterialSourcingComfort": {
        "qid": "Q_E_02",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_E_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "CustomerPaymentRecovery": {
        "qid": "Q_E_03",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_E_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "CurrentChallenges": {
        "qid": "Q_E_04",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_E_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "Challenge_OSFPhasedOutAmt": {
        "qid": "Q_E_04",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Challenge_ScaleUpFundAmt": {
        "qid": "Q_E_04",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Challenge_TimelyInputsAmt": {
        "qid": "Q_E_04",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Challenge_Other": {
        "qid": "Q_E_04",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Competitors_Similar_Scale": {
        "qid": "Q_E_05_Count",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Competitors_Smaller_Scale": {
        "qid": "Q_E_05_Smaller",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Competitors_Higher_Scale": {
        "qid": "Q_E_05_Higher",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "CompetitorAdvantages": {
        "qid": "Q_E_06",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_E_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "FutureExpansionPlans": {
        "qid": "Q_F_01",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_F_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "AspirationBottlenecks": {
        "qid": "Q_F_02",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_F_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "FutureFundsRequired": {
        "qid": "Q_F_03",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "AttendedTraining": {
        "qid": "Q_G_01",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_G_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "TrainingDetails": {
        "qid": "Q_G_02",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "UsedTrainingComponent": {
        "qid": "Q_G_03",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_G_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "UsedTrainingDetails": {
        "qid": "Q_G_04",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "MonthlyIncomeBeforeLoan": {
        "qid": "Q_G_05",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_G_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "MonthlyIncomeAfterLoan": {
        "qid": "Q_G_06",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "MonthlyIncomeIncreaseByOSFSVEP": {
        "qid": "Q_G_06",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "CRPContributions": {
        "qid": "Q_G_07",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_G_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "CRPContributionDocDetails": {
        "qid": "Q_G_07",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "ExpectationsFromScheme": {
        "qid": "Q_G_08",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_G_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "Other_Specify": {
        "qid": "Q_G_08",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "SmartphoneOwnership": {
        "qid": "Q_H_01",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_H_01\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "UseQRUPI": {
        "qid": "Q_H_02",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_H_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "QRDailyTransactions": {
        "qid": "Q_H_03",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "QRNonUseReason": {
        "qid": "Q_H_04",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_H_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SocialMediaForMarketing": {
        "qid": "Q_H_05",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_H_05\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SocialPlatformsUsed": {
        "qid": "Q_H_06",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_H_06\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SocialPlatformUsageMode": {
        "qid": "Q_H_07",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_H_07\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SocialMediaFrequency": {
        "qid": "Q_H_08",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_H_08\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "OSFInterventionYear": {
        "qid": "Q_I_01",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "BusinessOperationalStatus": {
        "qid": "Q_I_02",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_I_02\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "ScalingDownClosingReasons": {
        "qid": "Q_I_03",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_I_03\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "ScalingDownOtherReason": {
        "qid": "Q_I_03",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "SupportNeededForSustenance": {
        "qid": "Q_I_04",
        "type": "EnumList",
        "is_choice": true,
        "is_multi": true,
        "is_buttons": false,
        "validif": "=SPLIT(LOOKUP(\"Q_I_04\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SupportNeededOther": {
        "qid": "Q_I_04",
        "type": "Text",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "Status": {
        "qid": "STAT_DRAFT",
        "type": "Enum",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "MonthlyRent": {
        "qid": "Q_C_04",
        "type": "Decimal",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "MaterialSourcingPct": {
        "qid": "MAIN_PCT_SCALE_5",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": true,
        "validif": "=SPLIT(LOOKUP(\"MAIN_PCT_SCALE_5\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "SalesChannelsPct": {
        "qid": "MAIN_PCT_SCALE_SALES",
        "type": "Enum",
        "is_choice": true,
        "is_multi": false,
        "is_buttons": true,
        "validif": "=SPLIT(LOOKUP(\"MAIN_PCT_SCALE_SALES\", \"AppVariables\", \"ID\", \"VariableList\"), \" , \")"
    },
    "Competitors_Same_Scale": {
        "qid": "Q_E_05_Count",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    },
    "BusinessClosureYear": {
        "qid": "Q_I_02",
        "type": "Number",
        "is_choice": false,
        "is_multi": false,
        "is_buttons": false,
        "validif": ""
    }
};

    var updated = 0;
    for (var colName in CONFIGS) {
      var cfg = CONFIGS[colName];
      var qid = cfg.qid;
      var targetType = cfg.type;
      var isChoice = cfg.is_choice;
      var isMulti = cfg.is_multi;
      var isButtons = cfg.is_buttons;
      var validIfFormula = cfg.validif;

      // Match either direct name (e.g. "District") or prefixed name (e.g. "Q_A_01_District")
      var matchedIdx = -1;
      if (attrMap[colName] !== undefined) {
        matchedIdx = attrMap[colName];
      } else {
        // try finding by suffix
        for (var aName in attrMap) {
          if (aName.endsWith('_' + colName) || aName === colName) {
            matchedIdx = attrMap[aName];
            break;
          }
        }
      }

      if (matchedIdx === -1) continue;

      var attr = attrs[matchedIdx];
      var p = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + matchedIdx + ']';

      // 1. DisplayName
      var dnFormula = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Title")';
      attr.DisplayName = dnFormula;
      dict[p + '.DisplayName'] = dnFormula;

      // 2. Configure Choice / Dropdowns with Valid_If & Ref
      if (isChoice) {
        attr.Type = targetType;
        attr.Valid_If = validIfFormula;
        attr.ValidIf = validIfFormula;
        attr.Suggested_Values = validIfFormula;
        attr.SuggestedValues = validIfFormula;
        attr.ReferencedTableName = 'AppVariables';
        attr.ReferencedRootTableName = 'AppVariables';

        dict[p + '.Type'] = targetType;
        dict[p + '.Valid_If'] = validIfFormula;
        dict[p + '.ValidIf'] = validIfFormula;
        dict[p + '.Suggested_Values'] = validIfFormula;
        dict[p + '.SuggestedValues'] = validIfFormula;
        dict[p + '.ReferencedTableName'] = 'AppVariables';

        var auxObj = {
          EnumValues: [],
          AllowOtherValues: false,
          AutoCompleteOtherValues: false,
          EnumInputMode: isButtons ? "Buttons" : "Auto",
          Valid_If: validIfFormula,
          Suggested_Values: validIfFormula
        };

        if (isMulti) {
          auxObj.ElementType = "Ref";
          auxObj.ElementTypeQualifier = refQualifier;
          auxObj.ItemSeparator = " , ";
          attr.EnumListElementTypeName = "Ref";
          dict[p + '.EnumListElementTypeName'] = "Ref";
        } else {
          auxObj.BaseType = "Ref";
          auxObj.BaseTypeQualifier = refQualifier;
        }

        var auxStr = JSON.stringify(auxObj);
        attr.TypeAuxData = auxStr;
        dict[p + '.TypeAuxData'] = auxStr;
      } else if (targetType === 'Number' || targetType === 'Decimal' || targetType === 'Phone' || targetType === 'Text') {
        attr.Type = targetType;
        dict[p + '.Type'] = targetType;
      }

      updated++;
    }

    console.log("[INFO] Configured " + updated + " columns for Survey table.");

    // 3. Dispatch Redux Actions
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] " + updated + " columns updated with DisplayName & ValidIf! ===");
    console.log("[ACTION] Blue SAVE button in AppSheet header is now active. Click SAVE to commit!");
  } catch(e) {
    console.error("[FAIL] Error:", e);
  }
})();
