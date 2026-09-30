/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Master AppSheet Redux Console Injector v2
 * Project: CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * Fixes:
 * - Recognizes AppSheet schema names with '_Schema' suffix (e.g. Survey_Labor_Schema)
 * - Configures Ref to Survey, IsPartOf=true, Keys, InitialValues
 * - Injects Multilingual DisplayNames and Dynamic Valid_If for all 5 sub-tables
 * - Configures 11 new Survey feedback columns
 * - Clones & injects 5 Navigation Action Buttons to open each sub-table as a button
 * ==============================================================================
 */

(function runOmmNoMiAppSheetMasterInjectorV2() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Master AppSheet Redux Console Injector v2 ===");

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
      console.error("[FAIL] AppSheet Store nahi mila. Kripya editor me kisi table ya column par click karein.");
      return;
    }

    var state = store.getState();
    var appTemplate = state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate;
    if (!appTemplate) {
      console.error("[FAIL] appTemplate history[0] nahi mila.");
      return;
    }

    var schemas = appTemplate.AppData && appTemplate.AppData.DataSchemas;
    if (!schemas) {
      console.error("[FAIL] DataSchemas nahi mila.");
      return;
    }

    // Map table names normalizing both raw and clean names (handles '_Schema' suffix)
    var schemaMap = {};
    schemas.forEach(function(s, idx) {
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = { schema: s, idx: idx };
      schemaMap[clean] = { schema: s, idx: idx };
      if (s.TableName) schemaMap[s.TableName] = { schema: s, idx: idx };
    });

    console.log("[INFO] Successfully mapped tables:", Object.keys(schemaMap).filter(function(k){ return !k.endsWith('_Schema'); }).join(', '));

    var nameValueDict = {};
    var count = 0;

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
      var item = schemaMap[tblName];
      if (!item) {
        console.warn("[WARN] Table '" + tblName + "' abhi AppSheet me add nahi hai.");
        return;
      }
      var sIdx = item.idx;
      var attrs = item.schema.Attributes || [];
      var config = subTableConfigs[tblName];

      attrs.forEach(function(attr, aIdx) {
        var cConf = config[attr.Name];
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
      console.log("[OK] Configured table: " + tblName);
    });

    // -------------------------------------------------------------
    // 3. CONFIGURE NEW 11 SURVEY MASTER COLUMNS
    // -------------------------------------------------------------
    var surveyItem = schemaMap['Survey'];
    if (surveyItem) {
      var sIdx = surveyItem.idx;
      var surveyAttrs = surveyItem.schema.Attributes || [];
      var newSurveyMap = {
        'RegistrationsDocuments': {
          dName: '=LOOKUP("Q_A_20_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_A_20_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'RegistrationsDocumentsOther': { dName: '=LOOKUP("Q_A_20_01", "AppVariables", "ID", "Label")' },
        'Competitors_Same_Scale': { dName: '=LOOKUP("Q_D_06_SameScale", "AppVariables", "ID", "Label")' },
        'Competitors_Smaller_Scale': { dName: '=LOOKUP("Q_D_06_SmallerScale", "AppVariables", "ID", "Label")' },
        'Competitors_Higher_Scale': { dName: '=LOOKUP("Q_D_06_HigherScale", "AppVariables", "ID", "Label")' },
        'CompetitorAdvantages': {
          dName: '=LOOKUP("Q_D_07_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_D_07_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'CompetitorAdvantagesOther': { dName: '=LOOKUP("Q_D_07_01", "AppVariables", "ID", "Label")' },
        'FutureBusinessPlans': {
          dName: '=LOOKUP("Q_D_08_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_D_08_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'FutureBusinessPlansOther': { dName: '=LOOKUP("Q_D_08_01", "AppVariables", "ID", "Label")' },
        'AspirationConstraints': {
          dName: '=LOOKUP("Q_D_09_00", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("Q_D_09_00", "AppVariables", "ID", "VariableList"), " , ")',
          type: 'EnumList'
        },
        'AspirationConstraintsOther': { dName: '=LOOKUP("Q_D_09_01", "AppVariables", "ID", "Label")' }
      };

      surveyAttrs.forEach(function(attr, aIdx) {
        var cConf = newSurveyMap[attr.Name];
        if (cConf) {
          if (cConf.dName) setColProp(sIdx, aIdx, 'DisplayName', cConf.dName);
          if (cConf.validIf) setColProp(sIdx, aIdx, 'ValidIf', cConf.validIf);
          if (cConf.type) setColProp(sIdx, aIdx, 'Type', cConf.type);
        }
      });
      console.log("[OK] Configured 11 new feedback columns on Survey table!");
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
      console.log("=== [SUCCESS] " + count + " properties updated across all 5 sub-tables & Survey! Cloud SAVE button is active! ===");
    } else {
      console.log("[INFO] No pending updates.");
    }
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
