// ==============================================================================
// OmmNoMi Master Multilingual DisplayName & Dropdown Configuration
// ==============================================================================
(function runOmmNoMiMultilingualSetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Multilingual DisplayNames & Dropdowns Setup ===");

    // 1. Locate Store
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
    if (!store) return console.error("[FAIL] Store not found! AppSheet editor me kisi column par click karein.");

    var h = store.getState().appTemplate.history[0].appTemplate;
    var schemas = h.AppData && h.AppData.DataSchemas;
    if (!schemas) return console.error("[FAIL] DataSchemas not found.");

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
    function setColProp(sIdx, cIdx, prop, val) {
      nameValueDict['AppData.DataSchemas[' + sIdx + '].Attributes[' + cIdx + '].' + prop] = val;
      count++;
    }

    var refQ = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedRootTableName: "AppVariables", ReferencedType: "Text", ReferencedKeyColumn: "ID", IsAPartOf: false, InputMode: "Auto" });
    var enumListAux = JSON.stringify({ ElementType: "Ref", ElementTypeQualifier: refQ, ItemSeparator: " , " });
    var enumAux = JSON.stringify({ EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: true, BaseType: "Ref", BaseTypeQualifier: refQ, EnumInputMode: "Auto" });

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
      var surveyUpdated = 0;
      sAttrs.forEach(function(attr, aIdx) {
        var c = attr.Name;
        if (!c || !QMAP[c]) return;
        var info = QMAP[c];
        var qid = info[0], isDrop = info[1], isMulti = info[2];

        setColProp(sIdx, aIdx, 'DisplayName', '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")');
        if (isDrop) {
          var vF = '=SPLIT(LOOKUP("' + qid + '", "AppVariables", "ID", "VariableList"), " , ")';
          setColProp(sIdx, aIdx, 'ValidIf', vF);
          setColProp(sIdx, aIdx, 'Valid_If', vF);
          setColProp(sIdx, aIdx, 'ReferencedTableName', 'AppVariables');
          if (isMulti) {
            setColProp(sIdx, aIdx, 'Type', 'EnumList');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumListAux);
          } else {
            setColProp(sIdx, aIdx, 'Type', 'Enum');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumAux);
          }
        }
        surveyUpdated++;
      });
      console.log("[OK] Configured " + surveyUpdated + " Survey columns.");
    }

    // 3. Configure 5 Sub-Tables
    var subConfigs = {
      'Survey_Labor': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Activity': { dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' },
        'Involvement_Type': { dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")' },
        'Family_Members_Count': { dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' },
        'Hired_Help_Count': { dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' },
        'Amount_Paid_Last_Year': { dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")' }
      },
      'Survey_Turnover': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Season': { dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")' },
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
        'Loan_Usage_Purpose': { dName: '=LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "VariableList"), " , ")' }
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
        if (c.isRef) { setColProp(subIdx, aIdx, 'Type', 'Ref'); setColProp(subIdx, aIdx, 'ReferencedTableName', c.refTable); setColProp(subIdx, aIdx, 'IsPartOf', c.isPartOf); }
        if (c.initial) setColProp(subIdx, aIdx, 'InitialValue', c.initial);
        if (c.isKey !== undefined) setColProp(subIdx, aIdx, 'IsKey', c.isKey);
        if (c.dName) setColProp(subIdx, aIdx, 'DisplayName', c.dName);
        if (c.validIf) {
          setColProp(subIdx, aIdx, 'ValidIf', c.validIf);
          setColProp(subIdx, aIdx, 'Valid_If', c.validIf);
          setColProp(subIdx, aIdx, 'Type', 'Enum');
          setColProp(subIdx, aIdx, 'EnumListElementTypeName', 'Ref');
          setColProp(subIdx, aIdx, 'ReferencedTableName', 'AppVariables');
          setColProp(subIdx, aIdx, 'TypeAuxData', enumAux);
        }
      });
      console.log("[OK] Configured sub-table: " + tbl);
    });

    // 4. Batch Dispatch to Redux
    if (count > 0) {
      store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: nameValueDict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
      store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
      console.log("=== [SUCCESS] " + count + " Properties Updated! Blue SAVE button active! ===");
    }
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
