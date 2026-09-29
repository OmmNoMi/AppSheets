// ==============================================================================
// OmmNoMi Definitive Multilingual Dropdown & DisplayName Engine
// Pure ASCII, C# Backend Deserializer Compliant, Full TypeAuxData Sync
// ==============================================================================
(function runDefinitiveMultilingualEngine() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Injecting Definitive Multilingual Dropdowns & DisplayNames ===");

    // 1. Universal Redux Store Resolution
    var store = window.appStore;
    if (!store) {
      var candidates = [document.querySelector('.ExpressionControl'), document.querySelector('[role="grid"]'), document.querySelector('#root'), document.body];
      for (var i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        if (!el) continue;
        var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) { store = f.stateNode.store; window.appStore = store; break; }
          f = f.return;
        }
        if (store) break;
      }
    }
    if (!store) return console.error("[FAIL] Redux Store not found! Editor me kisi column par click karein.");

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = h && h.AppData && h.AppData.DataSchemas;
    if (!schemas) return console.error("[FAIL] DataSchemas not found in Redux state.");

    // Map all table schemas (handles '_Schema' suffix)
    var schemaMap = {};
    schemas.forEach(function(s, idx) {
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = { schema: s, idx: idx };
      schemaMap[clean] = { schema: s, idx: idx };
      if (s.TableName) schemaMap[s.TableName] = { schema: s, idx: idx };
    });

    var nameValueDict = {};
    var count = 0;

    // Type qualifiers for BaseType: Ref -> AppVariables
    var refTypeQual = JSON.stringify({
      MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
      IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
      Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
    });

    var baseQualifierStr = JSON.stringify({
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedTypeQualifier: refTypeQual,
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      RelationshipName: null,
      InputMode: "Auto",
      Valid_If: null,
      Error_Message_If_Invalid: null,
      Show_If: null,
      Required_If: null,
      Editable_If: null,
      Reset_If: null,
      Suggested_Values: null
    });

    // 2. Configure Survey Table: 79 Questions
    var surveyItem = schemaMap['Survey'];
    var QMAP = {
      "District": ["Q_A_01_00", 1, 0],
      "Block": ["Q_A_02_00", 1, 0],
      "VillageGP": ["Q_A_03_00", 0, 0],
      "RespondentName": ["Q_A_04_00", 0, 0],
      "SHGName": ["Q_A_05_00", 0, 0],
      "VOName": ["Q_A_06_00", 0, 0],
      "CLFName": ["Q_A_07_00", 0, 0],
      "SHGMembershipYears": ["Q_A_08_00", 0, 0],
      "LeadershipRole": ["Q_A_09_00", 1, 0],
      "LeadershipYears": ["Q_A_10_00", 0, 0],
      "RelatedToCRP": ["Q_A_11_00", 1, 0],
      "EPInterventionType": ["Q_A_12_00", 1, 0],
      "EnterpriseName": ["Q_A_13_00", 0, 0],
      "EnterpriseSetupYear": ["Q_A_14_00", 0, 0],
      "LoanReceivedYear": ["Q_A_15_00", 0, 0],
      "BusinessType": ["Q_A_16_00", 1, 1],
      "BusinessActivities": ["Q_A_17_00", 1, 1],
      "MaintainSeparateRecords": ["Q_A_18_00", 1, 0],
      "RespondentPhone": ["Q_A_04_01_PHONE", 0, 0],
      "RegistrationsDocuments": ["Q_A_20_00", 1, 1],
      "RespondentAge": ["Q_B_01_00", 1, 0],
      "MaritalStatus": ["Q_B_02_00", 1, 0],
      "SocialCategory": ["Q_B_03_00", 1, 0],
      "EducationStatus": ["Q_B_04_00", 1, 0],
      "FamilyMemberCount": ["Q_B_05_00", 0, 0],
      "FamilyAdultsCount": ["Q_B_06_01", 0, 0],
      "FamilyChildrenCount": ["Q_B_06_02", 0, 0],
      "FamilyTotalEarning": ["Q_B_06_03", 0, 0],
      "FamilyMaleEarning": ["Q_B_06_04", 0, 0],
      "FamilyFemaleEarning": ["Q_B_06_05", 0, 0],
      "FamilyDisabledCount": ["Q_B_06_06", 0, 0],
      "FamilyIncomeSources": ["Q_B_07_00", 1, 1],
      "AnnualHouseholdIncome": ["Q_B_08_00", 1, 0],
      "ReasonsStartingBusiness": ["Q_C_01_00", 1, 1],
      "BusinessCycle": ["Q_C_02_00", 1, 0],
      "BusinessPlaceType": ["Q_C_03_00", 1, 0],
      "MonthlyRent": ["Q_C_04_00_MRENT", 0, 0],
      "LocationConvenience": ["Q_C_05_00", 1, 0],
      "MaterialSourcingPct": ["Q_C_08_00_SUMMARY", 0, 0],
      "MarketingMethods": ["Q_C_09_00", 1, 1],
      "SeasonalSalesMethod": ["Q_C_10_00", 1, 0],
      "SocialMediaForMarketing": ["Q_C_11_00", 1, 0],
      "SalesChannelsPct": ["Q_C_12_00_SUMMARY", 0, 0],
      "RecordKeepingHabit": ["Q_C_13_00", 1, 0],
      "RecordKeepingMethod": ["Q_C_14_00", 1, 0],
      "SHGAssociationAssistance": ["Q_C_18_00", 1, 1],
      "MonthlyIncomeIncreaseByOSFSVEP": ["Q_C_21_00", 1, 0],
      "FinancialHelpFromIncome": ["Q_C_23_00", 1, 1],
      "HusbandFamilyResponse": ["Q_D_01_00", 1, 1],
      "MaterialSourcingComfort": ["Q_D_02_00", 1, 0],
      "CustomerPaymentRecovery": ["Q_D_03_00", 1, 0],
      "FundingExperience": ["Q_D_04_00", 1, 1],
      "CurrentChallenges": ["Q_D_05_00", 1, 1],
      "Competitors_Same_Scale": ["Q_D_06_SameScale", 0, 0],
      "Competitors_Smaller_Scale": ["Q_D_06_SmallerScale", 0, 0],
      "Competitors_Higher_Scale": ["Q_D_06_HigherScale", 0, 0],
      "CompetitorAdvantages": ["Q_D_07_00", 1, 1],
      "FutureExpansionPlans": ["Q_D_08_00", 1, 0],
      "AspirationBottlenecks": ["Q_D_09_00_BOTTLENECK", 1, 1],
      "AttendedTraining": ["Q_E_01_00", 1, 0],
      "TrainingDetails": ["Q_E_02_00", 0, 0],
      "UsedTrainingComponent": ["Q_E_03_00", 1, 0],
      "UsedTrainingDetails": ["Q_E_04_00", 0, 0],
      "MonthlyIncomeBeforeLoan": ["Q_E_05_01", 0, 0],
      "MonthlyIncomeAfterLoan": ["Q_E_05_02", 0, 0],
      "CRPContributions": ["Q_E_06_00", 1, 1],
      "ExpectationsFromScheme": ["Q_E_07_00", 0, 0],
      "SmartphoneOwnership": ["Q_F_01_00", 1, 0],
      "UseQRUPI": ["Q_F_02_00", 1, 0],
      "QRDailyTransactions": ["Q_F_03_00", 1, 0],
      "QRNonUseReason": ["Q_F_04_00", 1, 0],
      "SocialPlatformsUsed": ["Q_F_05_00", 1, 1],
      "SocialPlatformUsageMode": ["Q_F_06_00", 1, 1],
      "SocialMediaFrequency": ["Q_F_07_00", 1, 0],
      "OSFInterventionYear": ["Q_G_01_00", 0, 0],
      "BusinessOperationalStatus": ["Q_G_02_00", 1, 0],
      "BusinessClosureYear": ["Q_G_02_01", 0, 0],
      "ScalingDownClosingReasons": ["Q_G_03_00", 1, 1],
      "SupportNeededForSustenance": ["Q_G_04_00", 1, 1]
    };

    if (surveyItem) {
      var sIdx = surveyItem.idx;
      var sAttrs = surveyItem.schema.Attributes || [];
      var surveyDropCount = 0;

      sAttrs.forEach(function(attr, aIdx) {
        var c = attr.Name;
        if (!c || !QMAP[c]) return;

        var info = QMAP[c];
        var qid = info[0], isDrop = info[1], isMulti = info[2];
        var p = 'AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + ']';

        // 2a. Set Multilingual Question Title
        var dnFormula = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';
        attr.DisplayName = dnFormula;
        nameValueDict[p + '.DisplayName'] = dnFormula;
        count++;

        // 2b. Set Multilingual Dropdown Options
        if (isDrop) {
          var validIf = (c === 'Block')
            ? '=SELECT(AppVariables[ID], AND([Column] = "Block", [Description] = [_THISROW].[District]))'
            : '=SPLIT(LOOKUP("' + qid + '", "AppVariables", "ID", "VariableList"), " , ")';

          var targetType = isMulti ? 'EnumList' : 'Enum';

          // Build TypeAuxData with Valid_If & Suggested_Values INSIDE IT
          var auxObj = {};
          if (attr.TypeAuxData) {
            try { auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : Object.assign({}, attr.TypeAuxData); } catch(e) {}
          }

          auxObj.BaseType = "Ref";
          auxObj.ReferencedTableName = "AppVariables";
          auxObj.ReferencedRootTableName = "AppVariables";
          auxObj.BaseTypeQualifier = baseQualifierStr;
          auxObj.AllowOtherValues = false;
          auxObj.AutoCompleteOtherValues = false;
          auxObj.EnumValues = [];
          auxObj.Valid_If = validIf;
          auxObj.Suggested_Values = validIf;
          auxObj.EnumInputMode = "Auto";
          auxObj.UseDropdown = true;

          if (isMulti) {
            auxObj.ElementType = "Ref";
            auxObj.ElementTypeQualifier = baseQualifierStr;
            auxObj.ItemSeparator = " , ";
            attr.EnumListElementTypeName = "Ref";
            nameValueDict[p + '.EnumListElementTypeName'] = "Ref";
          }

          var auxStr = JSON.stringify(auxObj);

          // Mutate in-memory attribute object
          attr.Type = targetType;
          attr.BaseType = "Ref";
          attr.ReferencedTableName = "AppVariables";
          attr.ReferencedRootTableName = "AppVariables";
          attr.Valid_If = validIf;
          attr.ValidIf = validIf;
          attr.Suggested_Values = validIf;
          attr.SuggestedValues = validIf;
          attr.EnumValues = [];
          attr.TypeAuxData = auxStr;

          // Push into Redux nameValueDict
          nameValueDict[p + '.Type'] = targetType;
          nameValueDict[p + '.BaseType'] = "Ref";
          nameValueDict[p + '.ReferencedTableName'] = "AppVariables";
          nameValueDict[p + '.ReferencedRootTableName'] = "AppVariables";
          nameValueDict[p + '.TypeAuxData'] = auxStr;
          nameValueDict[p + '.Valid_If'] = validIf;
          nameValueDict[p + '.ValidIf'] = validIf;
          nameValueDict[p + '.Suggested_Values'] = validIf;
          nameValueDict[p + '.SuggestedValues'] = validIf;
          nameValueDict[p + '.EnumValues'] = [];

          surveyDropCount++;
          count += 9;
        }
      });

      console.log("[OK] Survey Table: " + Object.keys(QMAP).length + " DisplayNames & " + surveyDropCount + " Multilingual Dropdowns configured!");
    }

    // 3. Configure 5 Child Sub-Tables (Ref, Key, DisplayNames, Dropdowns)
    var subConfigs = {
      'Survey_Labor': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Activity': { dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' },
        'Involvement_Type': {
          dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
        },
        'Family_Members_Count': { dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' },
        'Hired_Help_Count': { dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' },
        'Amount_Paid_Last_Year': {
          dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
        }
      },
      'Survey_Turnover': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Season': {
          dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
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
          validIf: '=SPLIT(LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
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

    Object.keys(subConfigs).forEach(function(tbl) {
      var item = schemaMap[tbl];
      if (!item) return;
      var subIdx = item.idx, attrs = item.schema.Attributes || [], conf = subConfigs[tbl];

      attrs.forEach(function(attr, aIdx) {
        var c = conf[attr.Name];
        if (!c) return;
        var p = 'AppData.DataSchemas[' + subIdx + '].Attributes[' + aIdx + ']';

        if (c.isRef) {
          attr.Type = 'Ref'; attr.ReferencedTableName = c.refTable; attr.IsPartOf = c.isPartOf;
          nameValueDict[p + '.Type'] = 'Ref';
          nameValueDict[p + '.ReferencedTableName'] = c.refTable;
          nameValueDict[p + '.IsPartOf'] = c.isPartOf;
          count += 3;
        }
        if (c.initial) {
          attr.InitialValue = c.initial;
          nameValueDict[p + '.InitialValue'] = c.initial;
          count++;
        }
        if (c.isKey !== undefined) {
          attr.IsKey = c.isKey;
          nameValueDict[p + '.IsKey'] = c.isKey;
          count++;
        }
        if (c.dName) {
          attr.DisplayName = c.dName;
          nameValueDict[p + '.DisplayName'] = c.dName;
          count++;
        }
        if (c.validIf) {
          var auxObj = { BaseType: "Ref", ReferencedTableName: "AppVariables", BaseTypeQualifier: baseQualifierStr, AllowOtherValues: false, AutoCompleteOtherValues: false, EnumValues: [], Valid_If: c.validIf, Suggested_Values: c.validIf, EnumInputMode: "Auto", UseDropdown: true };
          var auxStr = JSON.stringify(auxObj);

          attr.Type = 'Enum';
          attr.BaseType = 'Ref';
          attr.ReferencedTableName = 'AppVariables';
          attr.Valid_If = c.validIf;
          attr.ValidIf = c.validIf;
          attr.Suggested_Values = c.validIf;
          attr.SuggestedValues = c.validIf;
          attr.EnumValues = [];
          attr.TypeAuxData = auxStr;

          nameValueDict[p + '.Type'] = 'Enum';
          nameValueDict[p + '.BaseType'] = 'Ref';
          nameValueDict[p + '.ReferencedTableName'] = 'AppVariables';
          nameValueDict[p + '.TypeAuxData'] = auxStr;
          nameValueDict[p + '.Valid_If'] = c.validIf;
          nameValueDict[p + '.ValidIf'] = c.validIf;
          nameValueDict[p + '.Suggested_Values'] = c.validIf;
          nameValueDict[p + '.SuggestedValues'] = c.validIf;
          nameValueDict[p + '.EnumValues'] = [];
          count += 9;
        }
      });
      console.log("[OK] Sub-table configured: " + tbl);
    });

    // 4. Batch Dispatch to Redux Store
    if (count > 0) {
      store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
      });

      // Trigger recalculation in AppSheet emulator
      try {
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
        store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
      } catch(e) {}

      store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

      console.log("===============================================================");
      console.log("=== [SUCCESS] " + count + " Properties Injected with Full TypeAuxData & Valid_If! ===");
      console.log("=== [ACTION] Click the blue SAVE button in AppSheet top right corner! ===");
      console.log("===============================================================");
    }
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
