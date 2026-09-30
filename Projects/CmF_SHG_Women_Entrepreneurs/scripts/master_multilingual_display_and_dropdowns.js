/**
 * ==============================================================================
 * OmmNoMi Master Multilingual DisplayName & Dropdown Configuration
 * Project: CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * 100% Pure ASCII, Zero Syntax Errors, Tested with node -c
 * 1. Survey: 79 Questions -> DisplayName = LOOKUP(QID, AppVariables, ID, Label)
 * 2. Survey: 48 Dropdowns -> Enum/EnumList Ref -> AppVariables (Valid_If = SPLIT(...))
 * 3. 5 Sub-Tables: Ref to Survey, IsPartOf=true, Keys, DisplayNames, Options
 * 4. Activates AppSheet Cloud SAVE button
 * ==============================================================================
 */

(function runOmmNoMiMultilingualSetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Multilingual DisplayNames & Dropdowns Setup ===");

    // 1. Locate Redux Store
    var store = window.appStore;
    if (!store) {
      var candidates = [
        document.querySelector('.ExpressionControl'),
        document.querySelector('[role="grid"]'),
        document.querySelector('#root'),
        document.body
      ];
      for (var i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        if (!el) continue;
        var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
            store = f.memoizedProps.store;
            window.appStore = store;
            break;
          }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
            store = f.stateNode.store;
            window.appStore = store;
            break;
          }
          f = f.return;
        }
        if (store) break;
      }
    }

    if (!store) {
      console.error("[FAIL] Redux store not found! Please click any table/column in AppSheet Editor first.");
      return;
    }

    var state = store.getState();
    var historyItem = state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate;
    var schemas = historyItem && historyItem.AppData && historyItem.AppData.DataSchemas;
    if (!schemas) {
      console.error("[FAIL] DataSchemas not found in Redux state.");
      return;
    }

    // Map table schemas
    var schemaMap = {};
    schemas.forEach(function(s, idx) {
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = { schema: s, idx: idx };
      schemaMap[clean] = { schema: s, idx: idx };
      if (s.TableName) schemaMap[s.TableName] = { schema: s, idx: idx };
    });

    console.log("[INFO] Mapped Tables:", Object.keys(schemaMap).filter(function(k){ return !k.endsWith('_Schema'); }).join(', '));

    var nameValueDict = {};
    var count = 0;

    function setColProp(schemaIdx, colIdx, prop, val) {
      var key = 'AppData.DataSchemas[' + schemaIdx + '].Attributes[' + colIdx + '].' + prop;
      nameValueDict[key] = val;
      count++;
    }

    // 2. TypeAuxData Templates for Enum/EnumList BaseType Ref -> AppVariables
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

    // 3. Configure Survey Table: All 79 Questions DisplayNames & Dropdowns
    var surveyItem = schemaMap['Survey'];
    var QMAP = {
  "District": {
    "qid": "Q_A_01_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "Block": {
    "qid": "Q_A_02_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "VillageGP": {
    "qid": "Q_A_03_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "RespondentName": {
    "qid": "Q_A_04_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "SHGName": {
    "qid": "Q_A_05_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "VOName": {
    "qid": "Q_A_06_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "CLFName": {
    "qid": "Q_A_07_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "SHGMembershipYears": {
    "qid": "Q_A_08_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "LeadershipRole": {
    "qid": "Q_A_09_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "LeadershipYears": {
    "qid": "Q_A_10_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "RelatedToCRP": {
    "qid": "Q_A_11_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "EPInterventionType": {
    "qid": "Q_A_12_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "EnterpriseName": {
    "qid": "Q_A_13_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "EnterpriseSetupYear": {
    "qid": "Q_A_14_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "LoanReceivedYear": {
    "qid": "Q_A_15_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "BusinessType": {
    "qid": "Q_A_16_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "BusinessActivities": {
    "qid": "Q_A_17_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "MaintainSeparateRecords": {
    "qid": "Q_A_18_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "RespondentPhone": {
    "qid": "Q_A_04_01_PHONE",
    "is_dropdown": false,
    "is_multi": false
  },
  "RegistrationsDocuments": {
    "qid": "Q_A_20_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "RespondentAge": {
    "qid": "Q_B_01_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "MaritalStatus": {
    "qid": "Q_B_02_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "SocialCategory": {
    "qid": "Q_B_03_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "EducationStatus": {
    "qid": "Q_B_04_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "FamilyMemberCount": {
    "qid": "Q_B_05_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "FamilyAdultsCount": {
    "qid": "Q_B_06_01",
    "is_dropdown": false,
    "is_multi": false
  },
  "FamilyChildrenCount": {
    "qid": "Q_B_06_02",
    "is_dropdown": false,
    "is_multi": false
  },
  "FamilyTotalEarning": {
    "qid": "Q_B_06_03",
    "is_dropdown": false,
    "is_multi": false
  },
  "FamilyMaleEarning": {
    "qid": "Q_B_06_04",
    "is_dropdown": false,
    "is_multi": false
  },
  "FamilyFemaleEarning": {
    "qid": "Q_B_06_05",
    "is_dropdown": false,
    "is_multi": false
  },
  "FamilyDisabledCount": {
    "qid": "Q_B_06_06",
    "is_dropdown": false,
    "is_multi": false
  },
  "FamilyIncomeSources": {
    "qid": "Q_B_07_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "AnnualHouseholdIncome": {
    "qid": "Q_B_08_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "ReasonsStartingBusiness": {
    "qid": "Q_C_01_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "BusinessCycle": {
    "qid": "Q_C_02_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "BusinessPlaceType": {
    "qid": "Q_C_03_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "MonthlyRent": {
    "qid": "Q_C_04_00_MRENT",
    "is_dropdown": false,
    "is_multi": false
  },
  "LocationConvenience": {
    "qid": "Q_C_05_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "MaterialSourcingPct": {
    "qid": "Q_C_08_00_SUMMARY",
    "is_dropdown": false,
    "is_multi": false
  },
  "MarketingMethods": {
    "qid": "Q_C_09_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "SeasonalSalesMethod": {
    "qid": "Q_C_10_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "SocialMediaForMarketing": {
    "qid": "Q_C_11_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "SalesChannelsPct": {
    "qid": "Q_C_12_00_SUMMARY",
    "is_dropdown": false,
    "is_multi": false
  },
  "RecordKeepingHabit": {
    "qid": "Q_C_13_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "RecordKeepingMethod": {
    "qid": "Q_C_14_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "SHGAssociationAssistance": {
    "qid": "Q_C_18_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "MonthlyIncomeIncreaseByOSFSVEP": {
    "qid": "Q_C_21_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "FinancialHelpFromIncome": {
    "qid": "Q_C_23_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "HusbandFamilyResponse": {
    "qid": "Q_D_01_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "MaterialSourcingComfort": {
    "qid": "Q_D_02_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "CustomerPaymentRecovery": {
    "qid": "Q_D_03_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "FundingExperience": {
    "qid": "Q_D_04_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "CurrentChallenges": {
    "qid": "Q_D_05_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "Competitors_Same_Scale": {
    "qid": "Q_D_06_SameScale",
    "is_dropdown": false,
    "is_multi": false
  },
  "Competitors_Smaller_Scale": {
    "qid": "Q_D_06_SmallerScale",
    "is_dropdown": false,
    "is_multi": false
  },
  "Competitors_Higher_Scale": {
    "qid": "Q_D_06_HigherScale",
    "is_dropdown": false,
    "is_multi": false
  },
  "CompetitorAdvantages": {
    "qid": "Q_D_07_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "FutureExpansionPlans": {
    "qid": "Q_D_08_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "AspirationBottlenecks": {
    "qid": "Q_D_09_00_BOTTLENECK",
    "is_dropdown": true,
    "is_multi": true
  },
  "AttendedTraining": {
    "qid": "Q_E_01_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "TrainingDetails": {
    "qid": "Q_E_02_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "UsedTrainingComponent": {
    "qid": "Q_E_03_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "UsedTrainingDetails": {
    "qid": "Q_E_04_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "MonthlyIncomeBeforeLoan": {
    "qid": "Q_E_05_01",
    "is_dropdown": false,
    "is_multi": false
  },
  "MonthlyIncomeAfterLoan": {
    "qid": "Q_E_05_02",
    "is_dropdown": false,
    "is_multi": false
  },
  "CRPContributions": {
    "qid": "Q_E_06_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "ExpectationsFromScheme": {
    "qid": "Q_E_07_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "SmartphoneOwnership": {
    "qid": "Q_F_01_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "UseQRUPI": {
    "qid": "Q_F_02_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "QRDailyTransactions": {
    "qid": "Q_F_03_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "QRNonUseReason": {
    "qid": "Q_F_04_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "SocialPlatformsUsed": {
    "qid": "Q_F_05_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "SocialPlatformUsageMode": {
    "qid": "Q_F_06_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "SocialMediaFrequency": {
    "qid": "Q_F_07_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "OSFInterventionYear": {
    "qid": "Q_G_01_00",
    "is_dropdown": false,
    "is_multi": false
  },
  "BusinessOperationalStatus": {
    "qid": "Q_G_02_00",
    "is_dropdown": true,
    "is_multi": false
  },
  "BusinessClosureYear": {
    "qid": "Q_G_02_01",
    "is_dropdown": false,
    "is_multi": false
  },
  "ScalingDownClosingReasons": {
    "qid": "Q_G_03_00",
    "is_dropdown": true,
    "is_multi": true
  },
  "SupportNeededForSustenance": {
    "qid": "Q_G_04_00",
    "is_dropdown": true,
    "is_multi": true
  }
};

    if (surveyItem) {
      var sIdx = surveyItem.idx;
      var sAttrs = surveyItem.schema.Attributes || [];
      var surveyUpdated = 0;

      sAttrs.forEach(function(attr, aIdx) {
        var colName = attr.Name;
        if (!colName || !QMAP[colName]) return;

        var qInfo = QMAP[colName];
        var qId = qInfo.qid;
        var isDropdown = qInfo.is_dropdown;
        var isMulti = qInfo.is_multi;

        // 3a. DisplayName Formula
        setColProp(sIdx, aIdx, 'DisplayName', '=LOOKUP("' + qId + '", "AppVariables", "ID", "Label")');

        // 3b. Multilingual Dropdown Relations
        if (isDropdown) {
          var validIfFormula = '=SPLIT(LOOKUP("' + qId + '", "AppVariables", "ID", "VariableList"), " , ")';
          setColProp(sIdx, aIdx, 'ValidIf', validIfFormula);
          setColProp(sIdx, aIdx, 'Valid_If', validIfFormula);
          setColProp(sIdx, aIdx, 'ReferencedTableName', 'AppVariables');

          if (isMulti) {
            setColProp(sIdx, aIdx, 'Type', 'EnumList');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumListTypeAux);
          } else {
            setColProp(sIdx, aIdx, 'Type', 'Enum');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumTypeAux);
          }
        }

        surveyUpdated++;
      });

      console.log("[OK] Configured " + surveyUpdated + " columns on Survey table!");
    }

    // 4. Configure 5 Child Sub-Tables (Ref to Survey, IsPartOf=true, DisplayNames, Options)
    var subConfigs = {
      'Survey_Labor': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Activity': { dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' },
        'Involvement_Type': {
          dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")',
          isDropdown: true
        },
        'Family_Members_Count': { dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' },
        'Hired_Help_Count': { dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' },
        'Amount_Paid_Last_Year': {
          dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")',
          isDropdown: true
        }
      },
      'Survey_Turnover': {
        'Survey_ID': { isRef: true, refTable: 'Survey', isPartOf: true },
        'ID': { initial: 'UNIQUEID()', isKey: true },
        'Season': {
          dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")',
          isDropdown: true
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
          isDropdown: true
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
        console.warn("[WARN] Sub-table not found: " + tblName);
        return;
      }
      var subIdx = item.idx;
      var attrs = item.schema.Attributes || [];
      var conf = subConfigs[tblName];

      attrs.forEach(function(attr, aIdx) {
        var c = conf[attr.Name];
        if (!c) return;
        if (c.isRef) {
          setColProp(subIdx, aIdx, 'Type', 'Ref');
          setColProp(subIdx, aIdx, 'ReferencedTableName', c.refTable);
          setColProp(subIdx, aIdx, 'IsPartOf', c.isPartOf);
        }
        if (c.initial) setColProp(subIdx, aIdx, 'InitialValue', c.initial);
        if (c.isKey !== undefined) setColProp(subIdx, aIdx, 'IsKey', c.isKey);
        if (c.dName) setColProp(subIdx, aIdx, 'DisplayName', c.dName);
        if (c.validIf) {
          setColProp(subIdx, aIdx, 'ValidIf', c.validIf);
          setColProp(subIdx, aIdx, 'Valid_If', c.validIf);
          setColProp(subIdx, aIdx, 'Type', 'Enum');
          setColProp(subIdx, aIdx, 'EnumListElementTypeName', 'Ref');
          setColProp(subIdx, aIdx, 'ReferencedTableName', 'AppVariables');
          setColProp(subIdx, aIdx, 'TypeAuxData', enumTypeAux);
        }
      });
      console.log("[OK] Configured sub-table: " + tblName);
    });

    // 5. Dispatch batch mutation to AppSheet Redux store
    if (count > 0) {
      store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
      });

      store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

      console.log("===============================================================");
      console.log("[SUCCESS] " + count + " Properties Updated! DisplayNames & Multilingual Dropdowns Applied!");
      console.log("[NEXT STEP] Ab AppSheet me upar right corner me blue SAVE button par click karein!");
      console.log("===============================================================");
    } else {
      console.log("[WARN] No properties were queued for update.");
    }
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
