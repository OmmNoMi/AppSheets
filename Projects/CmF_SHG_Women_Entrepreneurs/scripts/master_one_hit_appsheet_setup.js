/**
 * ==============================================================================
 * OmmNoMi Master One-Hit AppSheet Console Setup
 * CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * 100% Pure ASCII, Zero Syntax Errors, Tested with node -c
 * 1. AppVariables: Ensures 'Label' Virtual Column has dynamic multilingual formula
 * 2. 5 Sub-Tables: Survey_ID (Ref, IsPartOf=true), ID (Key, UNIQUEID), DisplayNames & ValidIf
 * 3. Survey Table: All 79 Question DisplayNames (=LOOKUP) & Options ValidIf (=SPLIT)
 * 4. 5 Action Buttons: Form navigation (LINKTOFORM) bound to Survey Detail views
 * 5. Triggers Redux batch update and activates Cloud SAVE button!
 * ==============================================================================
 */

(function runOmmNoMiMasterSetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Master One-Hit AppSheet Console Setup ===");

    // 1. Universal Redux Store Resolution
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
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
      console.error("[FAIL] AppSheet Store not found. Please click any table or column in the editor first.");
      return;
    }

    var state = store.getState();
    var appTemplate = state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate;
    if (!appTemplate) {
      console.error("[FAIL] appTemplate history[0] not found.");
      return;
    }

    var schemas = appTemplate.AppData && appTemplate.AppData.DataSchemas;
    if (!schemas) {
      console.error("[FAIL] DataSchemas not found.");
      return;
    }

    var schemaMap = {};
    schemas.forEach(function(s, idx) {
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = { schema: s, idx: idx };
      schemaMap[clean] = { schema: s, idx: idx };
      if (s.TableName) schemaMap[s.TableName] = { schema: s, idx: idx };
    });

    console.log("[INFO] Mapped tables:", Object.keys(schemaMap).filter(function(k){ return !k.endsWith('_Schema'); }).join(', '));

    var nameValueDict = {};
    var count = 0;

    function setColProp(schemaIdx, colIdx, prop, val) {
      var key = 'AppData.DataSchemas[' + schemaIdx + '].Attributes[' + colIdx + '].' + prop;
      nameValueDict[key] = val;
      count++;
    }

    // -------------------------------------------------------------
    // 2. APPVARIABLES: ENSURE 'Label' VIRTUAL COLUMN WITH MULTILINGUAL FORMULA
    // -------------------------------------------------------------
    var avItem = schemaMap['AppVariables'];
    var labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("Hindi", "\\u0939\\u093f\\u0902\\u0926\\u0940")), COALESCE([Title_hi], [Title]), IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("Rajasthani", "\\u0930\\u093e\\u091c\\u0938\\u094d\\u0925\\u093e\\u0928\\u0940")), COALESCE([Title_raj], [Title_hi], [Title]), TRUE, [Title])';

    if (avItem) {
      var avAttrs = (avItem.schema.Attributes || []).slice();
      var lIdx = avAttrs.findIndex(function(a) { return a.Name === 'Label'; });
      if (lIdx === -1) {
        avAttrs.push({
          Name: 'Label',
          Type: 'Text',
          IsVirtual: true,
          IsKey: false,
          IsLabel: true,
          IsReadOnly: true,
          AppFormula: labelFormula
        });
        nameValueDict['AppData.DataSchemas[' + avItem.idx + '].Attributes'] = avAttrs;
        count++;
        console.log("[OK] Injected new 'Label' Virtual Column into AppVariables.");
      } else {
        setColProp(avItem.idx, lIdx, 'AppFormula', labelFormula);
        setColProp(avItem.idx, lIdx, 'IsLabel', true);
        setColProp(avItem.idx, lIdx, 'IsVirtual', true);
        console.log("[OK] Updated existing 'Label' Virtual Column on AppVariables.");
      }
    }

    // -------------------------------------------------------------
    // 3. CONFIGURE 5 SUB-TABLES (Ref, Keys, DisplayNames, Options)
    // -------------------------------------------------------------
    var subConfigs = {
      'Survey_Labor': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Activity': { dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' },
        'Involvement_Type': {
          dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")'
        },
        'Family_Members_Count': { dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' },
        'Hired_Help_Count': { dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' },
        'Amount_Paid_Last_Year': {
          dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")'
        }
      },
      'Survey_Turnover': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Season': {
          dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")'
        },
        'Duration_Months': { dName: '=LOOKUP("COL_TURN_DURATION", "AppVariables", "ID", "Label")' },
        'Monthly_Sales': { dName: '=LOOKUP("COL_TURN_SALES", "AppVariables", "ID", "Label")' },
        'Monthly_Net_Profit': { dName: '=LOOKUP("COL_TURN_PROFIT", "AppVariables", "ID", "Label")' }
      },
      'Survey_Capital_Arrangement': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Source': { dName: '=LOOKUP("COL_CAP_SOURCE", "AppVariables", "ID", "Label")' },
        'Amount_First_Year': { dName: '=LOOKUP("COL_CAP_YR1", "AppVariables", "ID", "Label")' },
        'Amount_In_Between_Years': { dName: '=LOOKUP("COL_CAP_MID", "AppVariables", "ID", "Label")' },
        'Amount_Current_Year_2026_27': { dName: '=LOOKUP("COL_CAP_CUR", "AppVariables", "ID", "Label")' },
        'Amount_Pending': { dName: '=LOOKUP("COL_CAP_PEN", "AppVariables", "ID", "Label")' }
      },
      'Survey_Loan_Usage': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Source': { dName: '=LOOKUP("COL_LOAN_SOURCE", "AppVariables", "ID", "Label")' },
        'Loan_Usage_Purpose': {
          dName: '=LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "VariableList"), " , ")'
        }
      },
      'Survey_Business_Changes': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Indicator_Heading': { dName: '=LOOKUP("COL_CHG_HEADING", "AppVariables", "ID", "Label")' },
        'First_Year_Value': { dName: '=LOOKUP("COL_CHG_YR1", "AppVariables", "ID", "Label")' },
        'Current_Year_Value': { dName: '=LOOKUP("COL_CHG_CUR", "AppVariables", "ID", "Label")' }
      }
    };

    Object.keys(subConfigs).forEach(function(tblName) {
      var item = schemaMap[tblName];
      if (!item) {
        console.warn("[WARN] Sub-table not added yet in AppSheet: " + tblName);
        return;
      }
      var sIdx = item.idx;
      var attrs = item.schema.Attributes || [];
      var conf = subConfigs[tblName];

      attrs.forEach(function(attr, aIdx) {
        var c = conf[attr.Name];
        if (!c) return;
        if (c.isRef) {
          setColProp(sIdx, aIdx, 'Type', 'Ref');
          setColProp(sIdx, aIdx, 'ReferencedTableName', c.refTable);
          setColProp(sIdx, aIdx, 'IsPartOf', c.isPartOf);
        }
        if (c.initial) setColProp(sIdx, aIdx, 'InitialValue', c.initial);
        if (c.isKey !== undefined) setColProp(sIdx, aIdx, 'IsKey', c.isKey);
        if (c.dName) setColProp(sIdx, aIdx, 'DisplayName', c.dName);
        if (c.validIf) setColProp(sIdx, aIdx, 'ValidIf', c.validIf);
      });
      console.log("[OK] Configured sub-table: " + tblName);
    });

    // -------------------------------------------------------------
    // 4. CONFIGURE SURVEY TABLE: ALL 79 QUESTION DISPLAYNAMES & VALID_IF
    // -------------------------------------------------------------
    var surveyItem = schemaMap['Survey'];
    var surveyQMap = {
    "Status_Profile": "Q_STAT_PROFILE",
    "Status_Operations": "Q_STAT_OPERATIONS",
    "Status_Challenges": "Q_STAT_CHALLENGES",
    "Status_SchemeImpact": "Q_STAT_SCHEME",
    "Status_Digital": "Q_STAT_DIGITAL",
    "Status_PostExit": "Q_STAT_POST_EXIT",
    "District": "Q_A_01_00",
    "Block": "Q_A_02_00",
    "VillageGP": "Q_A_03_00",
    "RespondentName": "Q_A_04_00",
    "ContactNumber": "Q_A_04_01",
    "SHGName": "Q_A_05_00",
    "VOName": "Q_A_06_00",
    "CLFName": "Q_A_07_00",
    "SHGMembershipYears": "Q_A_08_00",
    "LeadershipRole": "Q_A_09_00",
    "LeadershipYears": "Q_A_10_00",
    "RelatedToCRP": "Q_A_11_00",
    "EPInterventionType": "Q_A_12_00",
    "EnterpriseName": "Q_A_13_00",
    "ParallelEnterpriseName": "Q_A_13_01",
    "EnterpriseSetupYear": "Q_A_14_00",
    "LoanReceivedYear": "Q_A_15_00",
    "BusinessType": "Q_A_16_00",
    "BusinessActivities": "Q_A_17_00",
    "BusinessActivitiesOther": "Q_A_17_01",
    "RespondentAge": "Q_B_01_00",
    "MaritalStatus": "Q_B_02_00",
    "SocialCategory": "Q_B_03_00",
    "EducationStatus": "Q_B_04_00",
    "FamilyMemberCount": "Q_B_05_00",
    "FamilyAdultsCount": "Q_B_06_01",
    "FamilyChildrenCount": "Q_B_06_02",
    "FamilyTotalEarning": "Q_B_06_03",
    "FamilyMaleEarning": "Q_B_06_04",
    "FamilyFemaleEarning": "Q_B_06_05",
    "FamilyDisabledCount": "Q_B_06_06",
    "FamilyIncomeSources": "Q_B_07_00",
    "AnnualHouseholdIncome": "Q_B_08_00",
    "ReasonsStartingBusiness": "Q_C_01_00",
    "BusinessCycle": "Q_C_02_00",
    "BusinessCycleOther": "Q_C_02_01",
    "BusinessPlaceType": "Q_C_03_00",
    "AnnualRent": "Q_C_04_00",
    "LocationConvenience": "Q_C_05_00",
    "LocationConvenienceOther": "Q_C_05_01",
    "Labor_Purchase_Involvement": "Q_C_06_Purchase_INV",
    "Labor_Purchase_FamilyCount": "Q_C_06_Purchase_FAM",
    "Labor_Purchase_HiredCount": "Q_C_06_Purchase_HIRED",
    "Labor_Purchase_AmountPaid": "Q_C_06_Purchase_AMT",
    "Labor_Prod_Involvement": "Q_C_06_Prod_INV",
    "Labor_Prod_FamilyCount": "Q_C_06_Prod_FAM",
    "Labor_Prod_HiredCount": "Q_C_06_Prod_HIRED",
    "Labor_Prod_AmountPaid": "Q_C_06_Prod_AMT",
    "Labor_Serv_Involvement": "Q_C_06_Serv_INV",
    "Labor_Serv_FamilyCount": "Q_C_06_Serv_FAM",
    "Labor_Serv_HiredCount": "Q_C_06_Serv_HIRED",
    "Labor_Serv_AmountPaid": "Q_C_06_Serv_AMT",
    "Labor_Mktg_Involvement": "Q_C_06_Mktg_INV",
    "Labor_Mktg_FamilyCount": "Q_C_06_Mktg_FAM",
    "Labor_Mktg_HiredCount": "Q_C_06_Mktg_HIRED",
    "Labor_Mktg_AmountPaid": "Q_C_06_Mktg_AMT",
    "Labor_Sale_Involvement": "Q_C_06_Sale_INV",
    "Labor_Sale_FamilyCount": "Q_C_06_Sale_FAM",
    "Labor_Sale_HiredCount": "Q_C_06_Sale_HIRED",
    "Labor_Sale_AmountPaid": "Q_C_06_Sale_AMT",
    "Labor_Record_Involvement": "Q_C_06_Record_INV",
    "Labor_Record_FamilyCount": "Q_C_06_Record_FAM",
    "Labor_Record_HiredCount": "Q_C_06_Record_HIRED",
    "Labor_Record_AmountPaid": "Q_C_06_Record_AMT",
    "AnnualSalaryBill": "Q_C_07_00",
    "Sourcing_NearbyTown_Pct": "Q_C_08_NearbyTown",
    "Sourcing_Jaipur_Pct": "Q_C_08_Jaipur",
    "Sourcing_OutsideState_Pct": "Q_C_08_OutsideState",
    "Sourcing_Online_Pct": "Q_C_08_Online",
    "Sourcing_WhatsApp_Pct": "Q_C_08_WhatsApp",
    "MarketingMethods": "Q_C_09_00",
    "MarketingMethodsOther": "Q_C_09_01",
    "SeasonalSalesMethod": "Q_C_10_00",
    "SeasonalSalesOnlinePlatform": "Q_C_10_01",
    "SeasonalSalesOther": "Q_C_10_02",
    "SocialMediaForMarketing": "Q_C_11_00",
    "SocialMediaForMarketingOther": "Q_C_11_01",
    "SalesChannel_Online_Pct": "Q_C_12_Online",
    "SalesChannel_WhatsApp_Pct": "Q_C_12_WhatsApp",
    "SalesChannel_Instagram_Pct": "Q_C_12_Instagram",
    "SalesChannel_Premise_Pct": "Q_C_12_Premise",
    "SalesChannel_Traders_Pct": "Q_C_12_Traders",
    "SalesChannel_Haat_Pct": "Q_C_12_Haat",
    "SalesChannel_Saras_Pct": "Q_C_12_Saras",
    "RecordKeepingHabit": "Q_C_13_00",
    "RecordKeepingMethod": "Q_C_14_00",
    "RecordKeepingOther": "Q_C_14_01",
    "Turnover_Peak_Months": "Q_C_15_Peak_MTH",
    "Turnover_Peak_Sales": "Q_C_15_Peak_SALES",
    "Turnover_Peak_Profit": "Q_C_15_Peak_PROFIT",
    "Turnover_Avg_Months": "Q_C_15_Avg_MTH",
    "Turnover_Avg_Sales": "Q_C_15_Avg_SALES",
    "Turnover_Avg_Profit": "Q_C_15_Avg_PROFIT",
    "Turnover_Lean_Months": "Q_C_15_Lean_MTH",
    "Turnover_Lean_Sales": "Q_C_15_Lean_SALES",
    "Turnover_Lean_Profit": "Q_C_15_Lean_PROFIT",
    "InitialStartCapital": "Q_C_16_00",
    "InitialCapitalArranged": "Q_C_17_00",
    "SHGAssociationAssistance": "Q_C_18_00",
    "Cap_OwnSavings_Yr1": "Q_C_19_OwnSavings_YR1",
    "Cap_OwnSavings_Mid": "Q_C_19_OwnSavings_MID",
    "Cap_OwnSavings_Cur": "Q_C_19_OwnSavings_CUR",
    "Cap_OwnSavings_Pending": "Q_C_19_OwnSavings_PEN",
    "Cap_OwnSavings_Usage": "Q_C_20_OwnSavings_USE",
    "Cap_Family_Yr1": "Q_C_19_Family_YR1",
    "Cap_Family_Mid": "Q_C_19_Family_MID",
    "Cap_Family_Cur": "Q_C_19_Family_CUR",
    "Cap_Family_Pending": "Q_C_19_Family_PEN",
    "Cap_Family_Usage": "Q_C_20_Family_USE",
    "Cap_Profit_Yr1": "Q_C_19_Profit_YR1",
    "Cap_Profit_Mid": "Q_C_19_Profit_MID",
    "Cap_Profit_Cur": "Q_C_19_Profit_CUR",
    "Cap_Profit_Pending": "Q_C_19_Profit_PEN",
    "Cap_Profit_Usage": "Q_C_20_Profit_USE",
    "Cap_MortgGold_Yr1": "Q_C_19_MortgGold_YR1",
    "Cap_MortgGold_Mid": "Q_C_19_MortgGold_MID",
    "Cap_MortgGold_Cur": "Q_C_19_MortgGold_CUR",
    "Cap_MortgGold_Pending": "Q_C_19_MortgGold_PEN",
    "Cap_MortgGold_Usage": "Q_C_20_MortgGold_USE",
    "Cap_SoldGold_Yr1": "Q_C_19_SoldGold_YR1",
    "Cap_SoldGold_Mid": "Q_C_19_SoldGold_MID",
    "Cap_SoldGold_Cur": "Q_C_19_SoldGold_CUR",
    "Cap_SoldGold_Pending": "Q_C_19_SoldGold_PEN",
    "Cap_SoldGold_Usage": "Q_C_20_SoldGold_USE",
    "Cap_FamLoan_Yr1": "Q_C_19_FamLoan_YR1",
    "Cap_FamLoan_Mid": "Q_C_19_FamLoan_MID",
    "Cap_FamLoan_Cur": "Q_C_19_FamLoan_CUR",
    "Cap_FamLoan_Pending": "Q_C_19_FamLoan_PEN",
    "Cap_FamLoan_Usage": "Q_C_20_FamLoan_USE",
    "Cap_Moneylender_Yr1": "Q_C_19_Moneylender_YR1",
    "Cap_Moneylender_Mid": "Q_C_19_Moneylender_MID",
    "Cap_Moneylender_Cur": "Q_C_19_Moneylender_CUR",
    "Cap_Moneylender_Pending": "Q_C_19_Moneylender_PEN",
    "Cap_Moneylender_Usage": "Q_C_20_Moneylender_USE",
    "Cap_SHGLoan_Yr1": "Q_C_19_SHGLoan_YR1",
    "Cap_SHGLoan_Mid": "Q_C_19_SHGLoan_MID",
    "Cap_SHGLoan_Cur": "Q_C_19_SHGLoan_CUR",
    "Cap_SHGLoan_Pending": "Q_C_19_SHGLoan_PEN",
    "Cap_SHGLoan_Usage": "Q_C_20_SHGLoan_USE",
    "Cap_OSFSVEPLoan_Yr1": "Q_C_19_OSFSVEPLoan_YR1",
    "Cap_OSFSVEPLoan_Mid": "Q_C_19_OSFSVEPLoan_MID",
    "Cap_OSFSVEPLoan_Cur": "Q_C_19_OSFSVEPLoan_CUR",
    "Cap_OSFSVEPLoan_Pending": "Q_C_19_OSFSVEPLoan_PEN",
    "Cap_OSFSVEPLoan_Usage": "Q_C_20_OSFSVEPLoan_USE",
    "Cap_OSFSubsidy_Yr1": "Q_C_19_OSFSubsidy_YR1",
    "Cap_OSFSubsidy_Mid": "Q_C_19_OSFSubsidy_MID",
    "Cap_OSFSubsidy_Cur": "Q_C_19_OSFSubsidy_CUR",
    "Cap_OSFSubsidy_Pending": "Q_C_19_OSFSubsidy_PEN",
    "Cap_OSFSubsidy_Usage": "Q_C_20_OSFSubsidy_USE",
    "Cap_PrivSaving_Yr1": "Q_C_19_PrivSaving_YR1",
    "Cap_PrivSaving_Mid": "Q_C_19_PrivSaving_MID",
    "Cap_PrivSaving_Cur": "Q_C_19_PrivSaving_CUR",
    "Cap_PrivSaving_Pending": "Q_C_19_PrivSaving_PEN",
    "Cap_PrivSaving_Usage": "Q_C_20_PrivSaving_USE",
    "Cap_NBFC_Yr1": "Q_C_19_NBFC_YR1",
    "Cap_NBFC_Mid": "Q_C_19_NBFC_MID",
    "Cap_NBFC_Cur": "Q_C_19_NBFC_CUR",
    "Cap_NBFC_Pending": "Q_C_19_NBFC_PEN",
    "Cap_NBFC_Usage": "Q_C_20_NBFC_USE",
    "Cap_Mudra_Yr1": "Q_C_19_Mudra_YR1",
    "Cap_Mudra_Mid": "Q_C_19_Mudra_MID",
    "Cap_Mudra_Cur": "Q_C_19_Mudra_CUR",
    "Cap_Mudra_Pending": "Q_C_19_Mudra_PEN",
    "Cap_Mudra_Usage": "Q_C_20_Mudra_USE",
    "Cap_BankLoan_Yr1": "Q_C_19_BankLoan_YR1",
    "Cap_BankLoan_Mid": "Q_C_19_BankLoan_MID",
    "Cap_BankLoan_Cur": "Q_C_19_BankLoan_CUR",
    "Cap_BankLoan_Pending": "Q_C_19_BankLoan_PEN",
    "Cap_BankLoan_Usage": "Q_C_20_BankLoan_USE",
    "MonthlyIncomeIncreaseByOSFSVEP": "Q_C_21_00",
    "Trajectory_Sales_Yr1": "Q_C_22_Sales_YR1",
    "Trajectory_Sales_Cur": "Q_C_22_Sales_CUR",
    "Trajectory_Income_Yr1": "Q_C_22_Income_YR1",
    "Trajectory_Income_Cur": "Q_C_22_Income_CUR",
    "Trajectory_TradeStock_Yr1": "Q_C_22_TradeStock_YR1",
    "Trajectory_TradeStock_Cur": "Q_C_22_TradeStock_CUR",
    "Trajectory_ProdInputs_Yr1": "Q_C_22_ProdInputs_YR1",
    "Trajectory_ProdInputs_Cur": "Q_C_22_ProdInputs_CUR",
    "Trajectory_ProdFinished_Yr1": "Q_C_22_ProdFinished_YR1",
    "Trajectory_ProdFinished_Cur": "Q_C_22_ProdFinished_CUR",
    "Trajectory_ServAssets_Yr1": "Q_C_22_ServAssets_YR1",
    "Trajectory_ServAssets_Cur": "Q_C_22_ServAssets_CUR",
    "FinancialHelpFromIncome": "Q_C_23_00",
    "FinancialHelp_EducationAmt": "Q_C_23_01",
    "FinancialHelp_DebtsAmt": "Q_C_23_02",
    "FinancialHelp_AssetsAmt": "Q_C_23_03",
    "FinancialHelp_MarriageAmt": "Q_C_23_04",
    "HusbandFamilyResponse": "Q_D_01_00",
    "MaterialSourcingComfort": "Q_D_02_00",
    "CustomerPaymentRecovery": "Q_D_03_00",
    "FundingExperience": "Q_D_04_00",
    "CurrentChallenges": "Q_D_05_00",
    "Challenge_OSFPhasedOutAmt": "Q_D_05_01",
    "Challenge_ScaleUpFundAmt": "Q_D_05_02",
    "Challenge_RenovationFundAmt": "Q_D_05_03",
    "Challenge_TimelyInputsAmt": "Q_D_05_04",
    "Challenge_InventoryHelpAmt": "Q_D_05_05",
    "Challenge_Other": "Q_D_05_06",
    "AttendedTraining": "Q_E_01_00",
    "TrainingDetails": "Q_E_02_00",
    "UsedTrainingComponent": "Q_E_03_00",
    "UsedTrainingDetails": "Q_E_04_00",
    "MonthlyIncomeBeforeLoan": "Q_E_05_01",
    "MonthlyIncomeAfterLoan": "Q_E_05_02",
    "CRPContributions": "Q_E_06_00",
    "CRPContributionDocDetails": "Q_E_06_01",
    "ExpectationsFromScheme": "Q_E_07_00",
    "SmartphoneOwnership": "Q_F_01_00",
    "UseQRUPI": "Q_F_02_00",
    "QRDailyTransactions": "Q_F_03_00",
    "QRNonUseReason": "Q_F_04_00",
    "SocialPlatformsUsed": "Q_F_05_00",
    "SocialPlatformUsageMode": "Q_F_06_00",
    "SocialMediaFrequency": "Q_F_07_00",
    "OSFInterventionYear": "Q_G_01_00",
    "BusinessOperationalStatus": "Q_G_02_00",
    "BusinessClosureYear": "Q_G_02_01",
    "ScalingDownClosingReasons": "Q_G_03_00",
    "ScalingDownOtherReason": "Q_G_03_01",
    "SupportNeededForSustenance": "Q_G_04_00",
    "SupportNeededOther": "Q_G_04_01",
    "Related_Q6_Labor": "Q_C_06_00",
    "Related_Q15_Turnover": "Q_C_15_00",
    "Related_Q19_Capital": "Q_C_19_00",
    "Related_Q20_Loan_Usage": "Q_C_20_00",
    "Related_Q22_Trajectory": "Q_C_22_00",
    "RegistrationsDocuments": "Q_A_20_00",
    "RegistrationsDocumentsOther": "Q_A_20_01",
    "Competitors_Same_Scale": "Q_D_06_SameScale",
    "Competitors_Smaller_Scale": "Q_D_06_SmallerScale",
    "Competitors_Higher_Scale": "Q_D_06_HigherScale",
    "CompetitorAdvantages": "Q_D_07_00",
    "CompetitorAdvantagesOther": "Q_D_07_01",
    "FutureExpansionPlans": "Q_D_08_00",
    "FutureBusinessPlansOther": "Q_D_08_01",
    "AspirationConstraints": "Q_D_09_00",
    "AspirationConstraintsOther": "Q_D_09_01",
    "MaintainSeparateRecords": "Q_A_18_00",
    "RespondentPhone": "Q_A_04_01_PHONE",
    "MonthlyRent": "Q_C_04_00_MRENT",
    "MaterialSourcingPct": "Q_C_08_00_SUMMARY",
    "SalesChannelsPct": "Q_C_12_00_SUMMARY",
    "AspirationBottlenecks": "Q_D_09_00_BOTTLENECK"
};
    var surveyVListMap = {
    "Status_Profile": "Q_STAT_PROFILE",
    "Status_Operations": "Q_STAT_OPERATIONS",
    "Status_Challenges": "Q_STAT_CHALLENGES",
    "Status_SchemeImpact": "Q_STAT_SCHEME",
    "Status_Digital": "Q_STAT_DIGITAL",
    "Status_PostExit": "Q_STAT_POST_EXIT",
    "District": "Q_A_01_00",
    "Block": "Q_A_02_00",
    "LeadershipRole": "Q_A_09_00",
    "RelatedToCRP": "Q_A_11_00",
    "EPInterventionType": "Q_A_12_00",
    "BusinessType": "Q_A_16_00",
    "BusinessActivities": "Q_A_17_00",
    "RespondentAge": "Q_B_01_00",
    "MaritalStatus": "Q_B_02_00",
    "SocialCategory": "Q_B_03_00",
    "EducationStatus": "Q_B_04_00",
    "FamilyIncomeSources": "Q_B_07_00",
    "AnnualHouseholdIncome": "Q_B_08_00",
    "ReasonsStartingBusiness": "Q_C_01_00",
    "BusinessCycle": "Q_C_02_00",
    "BusinessPlaceType": "Q_C_03_00",
    "LocationConvenience": "Q_C_05_00",
    "Labor_Purchase_Involvement": "Q_C_06_Purchase_INV",
    "Labor_Prod_Involvement": "Q_C_06_Prod_INV",
    "Labor_Serv_Involvement": "Q_C_06_Serv_INV",
    "Labor_Mktg_Involvement": "Q_C_06_Mktg_INV",
    "Labor_Sale_Involvement": "Q_C_06_Sale_INV",
    "Labor_Record_Involvement": "Q_C_06_Record_INV",
    "AnnualSalaryBill": "Q_C_07_00",
    "Sourcing_NearbyTown_Pct": "Q_C_08_NearbyTown",
    "Sourcing_Jaipur_Pct": "Q_C_08_Jaipur",
    "Sourcing_OutsideState_Pct": "Q_C_08_OutsideState",
    "Sourcing_Online_Pct": "Q_C_08_Online",
    "Sourcing_WhatsApp_Pct": "Q_C_08_WhatsApp",
    "MarketingMethods": "Q_C_09_00",
    "SeasonalSalesMethod": "Q_C_10_00",
    "SocialMediaForMarketing": "Q_C_11_00",
    "SalesChannel_Online_Pct": "Q_C_12_Online",
    "SalesChannel_WhatsApp_Pct": "Q_C_12_WhatsApp",
    "SalesChannel_Instagram_Pct": "Q_C_12_Instagram",
    "SalesChannel_Premise_Pct": "Q_C_12_Premise",
    "SalesChannel_Traders_Pct": "Q_C_12_Traders",
    "SalesChannel_Haat_Pct": "Q_C_12_Haat",
    "SalesChannel_Saras_Pct": "Q_C_12_Saras",
    "RecordKeepingHabit": "Q_C_13_00",
    "RecordKeepingMethod": "Q_C_14_00",
    "InitialCapitalArranged": "Q_C_17_00",
    "SHGAssociationAssistance": "Q_C_18_00",
    "Cap_OwnSavings_Usage": "Q_C_20_OwnSavings_USE",
    "Cap_Family_Usage": "Q_C_20_Family_USE",
    "Cap_Profit_Usage": "Q_C_20_Profit_USE",
    "Cap_MortgGold_Usage": "Q_C_20_MortgGold_USE",
    "Cap_SoldGold_Usage": "Q_C_20_SoldGold_USE",
    "Cap_FamLoan_Usage": "Q_C_20_FamLoan_USE",
    "Cap_Moneylender_Usage": "Q_C_20_Moneylender_USE",
    "Cap_SHGLoan_Usage": "Q_C_20_SHGLoan_USE",
    "Cap_OSFSVEPLoan_Usage": "Q_C_20_OSFSVEPLoan_USE",
    "Cap_OSFSubsidy_Usage": "Q_C_20_OSFSubsidy_USE",
    "Cap_PrivSaving_Usage": "Q_C_20_PrivSaving_USE",
    "Cap_NBFC_Usage": "Q_C_20_NBFC_USE",
    "Cap_Mudra_Usage": "Q_C_20_Mudra_USE",
    "Cap_BankLoan_Usage": "Q_C_20_BankLoan_USE",
    "MonthlyIncomeIncreaseByOSFSVEP": "Q_C_21_00",
    "FinancialHelpFromIncome": "Q_C_23_00",
    "HusbandFamilyResponse": "Q_D_01_00",
    "MaterialSourcingComfort": "Q_D_02_00",
    "CustomerPaymentRecovery": "Q_D_03_00",
    "FundingExperience": "Q_D_04_00",
    "CurrentChallenges": "Q_D_05_00",
    "AttendedTraining": "Q_E_01_00",
    "UsedTrainingComponent": "Q_E_03_00",
    "CRPContributions": "Q_E_06_00",
    "SmartphoneOwnership": "Q_F_01_00",
    "UseQRUPI": "Q_F_02_00",
    "QRDailyTransactions": "Q_F_03_00",
    "QRNonUseReason": "Q_F_04_00",
    "SocialPlatformsUsed": "Q_F_05_00",
    "SocialPlatformUsageMode": "Q_F_06_00",
    "SocialMediaFrequency": "Q_F_07_00",
    "BusinessOperationalStatus": "Q_G_02_00",
    "ScalingDownClosingReasons": "Q_G_03_00",
    "SupportNeededForSustenance": "Q_G_04_00",
    "RegistrationsDocuments": "Q_A_20_00",
    "CompetitorAdvantages": "Q_D_07_00",
    "FutureExpansionPlans": "Q_D_08_00",
    "AspirationConstraints": "Q_D_09_00",
    "MaintainSeparateRecords": "Q_A_18_00",
    "AspirationBottlenecks": "Q_D_09_00_BOTTLENECK"
};

    if (surveyItem) {
      var sIdx = surveyItem.idx;
      var sAttrs = surveyItem.schema.Attributes || [];
      var surveyColCount = 0;

      sAttrs.forEach(function(attr, aIdx) {
        var qid = surveyQMap[attr.Name];
        if (qid) {
          setColProp(sIdx, aIdx, 'DisplayName', '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")');
          surveyColCount++;
        }
        if (surveyVListMap[attr.Name]) {
          var vQid = surveyVListMap[attr.Name];
          setColProp(sIdx, aIdx, 'ValidIf', '=SPLIT(LOOKUP("' + vQid + '", "AppVariables", "ID", "VariableList"), " , ")');
        }
      });
      console.log("[OK] Configured " + surveyColCount + " question DisplayNames and ValidIf on Survey table!");
    }

    // -------------------------------------------------------------
    // 5. INJECT / UPDATE 5 DETAIL VIEW ACTION BUTTONS
    // -------------------------------------------------------------
    var actions = (appTemplate.AppData && appTemplate.AppData.DataActions) ? JSON.parse(JSON.stringify(appTemplate.AppData.DataActions)) : [];
    var btnDefs = [
      { name: 'Btn_Labor_Q6', title: '+ Add Labor (Q6)', icon: 'users', form: 'Survey_Labor_Form', table: 'Survey_Labor' },
      { name: 'Btn_Turnover_Q15', title: '+ Add Turnover (Q15)', icon: 'dollar', form: 'Survey_Turnover_Form', table: 'Survey_Turnover' },
      { name: 'Btn_Capital_Q17', title: '+ Add Capital (Q17)', icon: 'briefcase', form: 'Survey_Capital_Arrangement_Form', table: 'Survey_Capital_Arrangement' },
      { name: 'Btn_Loan_Usage_Q18', title: '+ Add Loan Usage (Q18)', icon: 'credit-card', form: 'Survey_Loan_Usage_Form', table: 'Survey_Loan_Usage' },
      { name: 'Btn_Business_Changes_Q20', title: '+ Add Changes (Q20)', icon: 'trending-up', form: 'Survey_Business_Changes_Form', table: 'Survey_Business_Changes' }
    ];

    var templateAct = actions.find(function(a) { return a && a.ActionType && a.ActionType.indexOf('LINK') >= 0; }) || actions[0] || {};
    var btnNames = [];

    btnDefs.forEach(function(b, idx) {
      btnNames.push(b.name);
      var targetFormula = 'LINKTOFORM("' + b.form + '", "Survey_ID", [_THISROW].[ID])';
      var actDef = {
        "$type": (templateAct.ActionDefinition && templateAct.ActionDefinition["$type"]) ? templateAct.ActionDefinition["$type"] : "Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes",
        "Target": targetFormula,
        "ViewName": targetFormula,
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };

      var act = JSON.parse(JSON.stringify(templateAct));
      act.Name = b.name;
      act.Table = 'Survey';
      act.ReferencedTable = 'Survey';
      act.ActionType = templateAct.ActionType || 'LINK_TO';
      act.DisplayName = b.title;
      act.Icon = b.icon;
      act.Prominence = 'Display_Prominently';
      act.Visibility = 'ADVANCED';
      act.IsValid = true;
      act.ActionOrder = 200 + idx;
      act.ActionDefinition = actDef;
      act.ActionSettings = JSON.stringify(actDef);

      var existIdx = actions.findIndex(function(a) { return a && a.Name === b.name; });
      if (existIdx >= 0) {
        actions[existIdx] = act;
      } else {
        actions.push(act);
      }
    });

    nameValueDict['AppData.DataActions'] = actions;

    // Attach to Survey Detail Views
    var controls = (appTemplate.Presentation && appTemplate.Presentation.Controls) ? JSON.parse(JSON.stringify(appTemplate.Presentation.Controls)) : [];
    var boundCount = 0;
    controls.forEach(function(ctrl) {
      var tbl = ctrl.TableOrFolderName || (ctrl.ViewDefinition && ctrl.ViewDefinition.TableOrFolderName) || '';
      var typ = ctrl.ViewType || (ctrl.ViewDefinition && ctrl.ViewDefinition.ViewType) || ctrl.Type || '';
      var name = (ctrl.Name || '').toLowerCase();
      if (tbl === 'Survey' && (typ.toLowerCase().indexOf('detail') >= 0 || name.indexOf('detail') >= 0)) {
        if (ctrl.ViewDefinition) {
          var vActions = (ctrl.ViewDefinition.Actions || []).slice();
          btnNames.forEach(function(bn) { if (vActions.indexOf(bn) === -1) vActions.push(bn); });
          ctrl.ViewDefinition.Actions = vActions;
        }
        var rootActions = (ctrl.Actions || []).slice();
        btnNames.forEach(function(bn) { if (rootActions.indexOf(bn) === -1) rootActions.push(bn); });
        ctrl.Actions = rootActions;
        boundCount++;
      }
    });

    if (boundCount > 0) {
      nameValueDict['Presentation.Controls'] = controls;
      console.log("[OK] Bound 5 Action Buttons to " + boundCount + " Detail View(s)!");
    }

    // -------------------------------------------------------------
    // 6. DISPATCH BATCH REDUX MUTATION
    // -------------------------------------------------------------
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("===============================================================");
    console.log("=== [SUCCESS] " + count + " Schema Properties + 5 Buttons Injected! ===");
    console.log("=== [NEXT STEP] Click the blue SAVE button in AppSheet!    ===");
    console.log("===============================================================");
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
