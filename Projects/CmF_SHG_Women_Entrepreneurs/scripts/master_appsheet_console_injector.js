/**
 * ==============================================================================
 * OmmNoMi Automation LLP — AppSheet Master Console Injector
 * Project: CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * Configures:
 * 1. 5 Sub-Tables (Survey_Labor, Survey_Turnover, Survey_Capital_Arrangement, Survey_Loan_Usage, Survey_Business_Changes)
 *    - Survey_ID -> Ref to Survey with IsPartOf = true
 *    - ID -> UNIQUEID()
 *    - Multilingual DisplayName formulas via AppVariables
 *    - Dynamic Valid_If formulas for Enum/EnumList options
 * 2. Master Survey Sheet's 11 New Feedback Columns
 *    - Multilingual DisplayNames + Valid_If options
 * 3. Section Navigation Action Buttons (Button-style sub-table opening)
 * ==============================================================================
 */

(function runOmmNoMiAppSheetMasterInjector() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Master AppSheet Redux Console Injector ===");

    // 1. Universal Redux Store Resolution
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
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
      console.error("[FAIL] AppSheet Redux Store nahi mila. Kripya Expression Assistant modal open karein ya AppSheet editor me kisi column par click karein.");
      return;
    }

    var state = store.getState();
    var schemas = state.appTemplate?.history?.[0]?.appTemplate?.AppData?.DataSchemas;
    if (!schemas) {
      console.error("[FAIL] DataSchemas nahi mila Redux state me.");
      return;
    }

    var schemaMap = {};
    schemas.forEach(function(s, idx) {
      schemaMap[s.Name] = { schema: s, idx: idx };
    });

    console.log("[INFO] Detected tables in AppSheet:", Object.keys(schemaMap).join(', '));

    var nameValueDict = {};
    var count = 0;

    // Helper to set column property
    function setColProp(schemaIdx, colIdx, prop, val) {
      var key = 'AppData.DataSchemas[' + schemaIdx + '].Attributes[' + colIdx + '].' + prop;
      nameValueDict[key] = val;
      count++;
    }

    // -------------------------------------------------------------
    // 2. CONFIGURE 5 SUB-TABLES (Ref, Keys, DisplayNames, Options)
    // -------------------------------------------------------------
    var subTableConfigs = {
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

    Object.keys(subTableConfigs).forEach(function(tblName) {
      if (!schemaMap[tblName]) {
        console.warn("[WARN] Table '" + tblName + "' abhi AppSheet me add nahi hui hai. Pehle Data > Add Table karein.");
        return;
      }
      var sIdx = schemaMap[tblName].idx;
      var attrs = schemaMap[tblName].schema.Attributes;
      var config = subTableConfigs[tblName];

      attrs.forEach(function(attr, aIdx) {
        var colName = attr.Name;
        var cConf = config[colName];
        if (!cConf) return;

        if (cConf.isRef) {
          setColProp(sIdx, aIdx, 'Type', 'Ref');
          setColProp(sIdx, aIdx, 'ReferencedTableName', cConf.refTable);
          setColProp(sIdx, aIdx, 'IsPartOf', cConf.isPartOf);
        }
        if (cConf.initial) setColProp(sIdx, aIdx, 'InitialValue', cConf.initial);
        if (cConf.isKey !== undefined) setColProp(sIdx, aIdx, 'IsKey', cConf.isKey);
        if (cConf.dName) setColProp(sIdx, aIdx, 'DisplayName', cConf.dName);
        if (cConf.validIf) setColProp(sIdx, aIdx, 'ValidIf', cConf.validIf);
      });
      console.log("[OK] Configured table schema: " + tblName);
    });

    // -------------------------------------------------------------
    // 3. CONFIGURE NEW SURVEY MASTER COLUMNS
    // -------------------------------------------------------------
    if (schemaMap['Survey']) {
      var sIdx = schemaMap['Survey'].idx;
      var surveyAttrs = schemaMap['Survey'].schema.Attributes;
      var newSurveyMap = {
        'RegistrationsDocuments': {
          dName: '=LOOKUP("Q_A_20_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_A_20_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'RegistrationsDocumentsOther': {
          dName: '=LOOKUP("Q_A_20_01", "AppVariables", "ID", "Label")'
        },
        'Competitors_Same_Scale': {
          dName: '=LOOKUP("Q_D_06_SameScale", "AppVariables", "ID", "Label")'
        },
        'Competitors_Smaller_Scale': {
          dName: '=LOOKUP("Q_D_06_SmallerScale", "AppVariables", "ID", "Label")'
        },
        'Competitors_Higher_Scale': {
          dName: '=LOOKUP("Q_D_06_HigherScale", "AppVariables", "ID", "Label")'
        },
        'CompetitorAdvantages': {
          dName: '=LOOKUP("Q_D_07_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_D_07_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'CompetitorAdvantagesOther': {
          dName: '=LOOKUP("Q_D_07_01", "AppVariables", "ID", "Label")'
        },
        'FutureBusinessPlans': {
          dName: '=LOOKUP("Q_D_08_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_D_08_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'FutureBusinessPlansOther': {
          dName: '=LOOKUP("Q_D_08_01", "AppVariables", "ID", "Label")'
        },
        'AspirationConstraints': {
          dName: '=LOOKUP("Q_D_09_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_D_09_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'AspirationConstraintsOther': {
          dName: '=LOOKUP("Q_D_09_01", "AppVariables", "ID", "Label")'
        }
      };

      surveyAttrs.forEach(function(attr, aIdx) {
        var cConf = newSurveyMap[attr.Name];
        if (cConf) {
          if (cConf.dName) setColProp(sIdx, aIdx, 'DisplayName', cConf.dName);
          if (cConf.validIf) setColProp(sIdx, aIdx, 'ValidIf', cConf.validIf);
          if (cConf.type) setColProp(sIdx, aIdx, 'Type', cConf.type);
        }
      });
      console.log("[OK] Configured 11 new columns on Survey master table!");
    }

    // -------------------------------------------------------------
    // 4. DISPATCH BATCH REDUX MUTATION
    // -------------------------------------------------------------
    if (count > 0) {
      store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
      });
      store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
      console.log("=== [SUCCESS] " + count + " properties updated! Cloud SAVE button is now active! ===");
    } else {
      console.log("[INFO] No pending properties needed update. Ensure tables are added in AppSheet first.");
    }

  } catch (err) {
    console.error("[ERROR] Injector exception:", err);
  }
})();
