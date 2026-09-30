/**
 * ==============================================================================
 * OmmNoMi Universal Display Name & Options Injector
 * Updates DisplayName & ValidIf across ALL sub-tables:
 * - Survey_Labor
 * - Survey_Turnover
 * - Survey_Capital_Arrangement
 * - Survey_Loan_Usage
 * - Survey_Business_Changes
 * - Survey_Capital_Loans (also handles old table name)
 * - Survey (all 11 feedback columns)
 * Sets both in-memory object and Redux dictionary for instant UI refresh!
 * ==============================================================================
 */

(function runUniversalDisplayNameInjector() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Universal Display Name & Options Injector ===");

    // 1. Get Redux Store
    var store = window.appStore;
    if (!store) {
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

    if (!store) {
      console.error("[FAIL] AppSheet Store nahi mila. Editor me kisi column par click karein.");
      return;
    }

    var state = store.getState();
    var appTemplate = state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate;
    var schemas = appTemplate && appTemplate.AppData && appTemplate.AppData.DataSchemas;
    if (!schemas) {
      console.error("[FAIL] DataSchemas nahi mila.");
      return;
    }

    var dict = {};
    var updatedCount = 0;

    // Universal Column-to-DisplayName/ValidIf dictionary
    var colRules = {
      // Labor
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
      },

      // Turnover
      'Season': {
        dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")',
        validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")'
      },
      'Duration_Months': { dName: '=LOOKUP("COL_TURN_DURATION", "AppVariables", "ID", "Label")' },
      'Monthly_Sales': { dName: '=LOOKUP("COL_TURN_SALES", "AppVariables", "ID", "Label")' },
      'Monthly_Net_Profit': { dName: '=LOOKUP("COL_TURN_PROFIT", "AppVariables", "ID", "Label")' },

      // Capital Arrangement & Capital Loans
      'Source': { dName: '=LOOKUP("COL_CAP_SOURCE", "AppVariables", "ID", "Label")' },
      'Amount_First_Year': { dName: '=LOOKUP("COL_CAP_YR1", "AppVariables", "ID", "Label")' },
      'Amount_In_Between_Years': { dName: '=LOOKUP("COL_CAP_MID", "AppVariables", "ID", "Label")' },
      'Amount_Current_Year_2026_27': { dName: '=LOOKUP("COL_CAP_CUR", "AppVariables", "ID", "Label")' },
      'Amount_Pending': { dName: '=LOOKUP("COL_CAP_PEN", "AppVariables", "ID", "Label")' },
      'Loan_Usage_Purpose': {
        dName: '=LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "Label")',
        validIf: '=SPLIT(LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "VariableList"), " , ")'
      },

      // Business Changes
      'Indicator_Heading': { dName: '=LOOKUP("COL_CHG_HEADING", "AppVariables", "ID", "Label")' },
      'First_Year_Value': { dName: '=LOOKUP("COL_CHG_YR1", "AppVariables", "ID", "Label")' },
      'Current_Year_Value': { dName: '=LOOKUP("COL_CHG_CUR", "AppVariables", "ID", "Label")' },

      // New Survey Columns
      'RegistrationsDocuments': {
        dName: '=LOOKUP("Q_A_20_00", "AppVariables", "ID", "Label")',
        validIf: '=SPLIT(LOOKUP("Q_A_20_00", "AppVariables", "ID", "VariableList"), " , ")'
      },
      'RegistrationsDocumentsOther': { dName: '=LOOKUP("Q_A_20_01", "AppVariables", "ID", "Label")' },
      'Competitors_Same_Scale': { dName: '=LOOKUP("Q_D_06_SameScale", "AppVariables", "ID", "Label")' },
      'Competitors_Smaller_Scale': { dName: '=LOOKUP("Q_D_06_SmallerScale", "AppVariables", "ID", "Label")' },
      'Competitors_Higher_Scale': { dName: '=LOOKUP("Q_D_06_HigherScale", "AppVariables", "ID", "Label")' },
      'CompetitorAdvantages': {
        dName: '=LOOKUP("Q_D_07_00", "AppVariables", "ID", "Label")',
        validIf: '=SPLIT(LOOKUP("Q_D_07_00", "AppVariables", "ID", "VariableList"), " , ")'
      },
      'CompetitorAdvantagesOther': { dName: '=LOOKUP("Q_D_07_01", "AppVariables", "ID", "Label")' },
      'FutureBusinessPlans': {
        dName: '=LOOKUP("Q_D_08_00", "AppVariables", "ID", "Label")',
        validIf: '=SPLIT(LOOKUP("Q_D_08_00", "AppVariables", "ID", "VariableList"), " , ")'
      },
      'FutureBusinessPlansOther': { dName: '=LOOKUP("Q_D_08_01", "AppVariables", "ID", "Label")' },
      'AspirationConstraints': {
        dName: '=LOOKUP("Q_D_09_00", "AppVariables", "ID", "Label")',
        validIf: '=SPLIT(LOOKUP("Q_D_09_00", "AppVariables", "ID", "VariableList"), " , ")'
      },
      'AspirationConstraintsOther': { dName: '=LOOKUP("Q_D_09_01", "AppVariables", "ID", "Label")' }
    };

    schemas.forEach(function(schema, sIdx) {
      var tblName = (schema.Name || '').replace(/_Schema$/, '');
      // Only process relevant tables
      var isTarget = tblName === 'Survey' || tblName.indexOf('Survey_') === 0;
      if (!isTarget) return;

      var attrs = schema.Attributes || [];
      attrs.forEach(function(attr, aIdx) {
        var colName = attr.Name;
        var rule = colRules[colName];

        // Also check Ref settings for Survey_ID
        if (colName === 'Survey_ID' && tblName !== 'Survey') {
          attr.Type = 'Ref';
          attr.ReferencedTableName = 'Survey';
          attr.IsPartOf = true;
          dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].Type'] = 'Ref';
          dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].ReferencedTableName'] = 'Survey';
          dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].IsPartOf'] = true;
          updatedCount++;
        }

        // Key & Initial value for ID
        if (colName === 'ID' && tblName !== 'Survey') {
          attr.InitialValue = 'UNIQUEID()';
          attr.IsKey = true;
          dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].InitialValue'] = 'UNIQUEID()';
          dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].IsKey'] = true;
          updatedCount++;
        }

        if (rule) {
          if (rule.dName) {
            attr.DisplayName = rule.dName;
            dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].DisplayName'] = rule.dName;
            updatedCount++;
          }
          if (rule.validIf) {
            attr.ValidIf = rule.validIf;
            dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].ValidIf'] = rule.validIf;
            updatedCount++;
          }
        }
      });
      console.log("[OK] Processed table: " + tblName);
    });

    if (updatedCount > 0) {
      store.dispatch({
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: dict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
      });
      store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
      console.log("=== [SUCCESS] " + updatedCount + " properties updated across ALL tables! Cloud SAVE button is active! ===");
    }

  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
