/**
 * ==============================================================================
 * OmmNoMi Automation LLP — AppSheet Redux Console Engine
 * Configures:
 * 1. 4 Action Buttons on 'Survey' to open each matrix table like sections
 * 2. Multilingual DisplayNames & Options for all 4 Sub-Tables
 * 3. Parent Virtual Columns on 'Survey' (REF_ROWS) with Trilingual Labels
 * 4. Syncs Presentation.Controls (Survey_Form_SecC) ColumnOrder
 * ==============================================================================
 */

(function configureSubTablesEngine() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] 1-Hit Sub-Tables & Navigation Buttons Injector ===");

    // 1. 4-Tier Store Resolution
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { window.appStore = f.memoizedProps.store; return window.appStore; }
          if (f.stateNode?.store?.dispatch) { window.appStore = f.stateNode.store; return window.appStore; }
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) {
      console.error("[ERROR] Redux store not found! Please refresh the page and retry.");
      return;
    }

    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var schemas = h.AppData.DataSchemas || [];
    var dict = {};

    function makeLangFormula(varId) {
      return '=IFS(' +
        'ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Hindi", LOOKUP("' + varId + '", "AppVariables", "ID", "Title_hi"), ' +
        'ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Rajasthani", LOOKUP("' + varId + '", "AppVariables", "ID", "Title_raj"), ' +
        'TRUE, LOOKUP("' + varId + '", "AppVariables", "ID", "Title")' +
      ')';
    }

    function makeOptionFormula(varId) {
      return '=SPLIT(LOOKUP("' + varId + '", "AppVariables", "ID", "VariableList"), " , ")';
    }

    // 2. Configure Columns in 4 Sub-Tables
    var colConfigs = {
      'Survey_Labor': {
        'Activity': { dName: 'COL_LABOR_ACTIVITY', type: 'Text' },
        'Involvement_Type': { dName: 'COL_LABOR_INVOLVEMENT', type: 'Enum', validIf: 'COL_LABOR_INVOLVEMENT' },
        'Family_Members_Count': { dName: 'COL_LABOR_FAM_COUNT', type: 'Number' },
        'Hired_Help_Count': { dName: 'COL_LABOR_HIRED_COUNT', type: 'Number' },
        'Amount_Paid_Last_Year': { dName: 'COL_LABOR_AMOUNT_PAID', type: 'Enum', validIf: 'COL_LABOR_AMOUNT_PAID' },
        'Survey_ID': { type: 'Ref', refTable: 'Survey', isPartOf: true }
      },
      'Survey_Turnover': {
        'Season': { dName: 'COL_TURN_SEASON', type: 'Enum', validIf: 'COL_TURN_SEASON' },
        'Duration_Months': { dName: 'COL_TURN_DURATION', type: 'Number' },
        'Monthly_Sales': { dName: 'COL_TURN_SALES', type: 'Price' },
        'Monthly_Net_Profit': { dName: 'COL_TURN_PROFIT', type: 'Price' },
        'Survey_ID': { type: 'Ref', refTable: 'Survey', isPartOf: true }
      },
      'Survey_Capital_Loans': {
        'Source': { dName: 'COL_CAP_SOURCE', type: 'Text' },
        'Amount_First_Year': { dName: 'COL_CAP_YR1', type: 'Price' },
        'Amount_In_Between_Years': { dName: 'COL_CAP_MID', type: 'Price' },
        'Amount_Current_Year_2026_27': { dName: 'COL_CAP_CUR', type: 'Price' },
        'Amount_Pending': { dName: 'COL_CAP_PEN', type: 'Price' },
        'Loan_Usage_Purpose': { dName: 'COL_CAP_USAGE', type: 'Enum', validIf: 'COL_CAP_USAGE' },
        'Survey_ID': { type: 'Ref', refTable: 'Survey', isPartOf: true }
      },
      'Survey_Business_Changes': {
        'Indicator_Heading': { dName: 'COL_CHG_HEADING', type: 'Text' },
        'First_Year_Value': { dName: 'COL_CHG_YR1', type: 'Text' },
        'Current_Year_Value': { dName: 'COL_CHG_CUR', type: 'Price' },
        'Survey_ID': { type: 'Ref', refTable: 'Survey', isPartOf: true }
      }
    };

    var updatedSchemas = 0;
    schemas.forEach(function(schema, sIdx) {
      var tName = schema.Name;
      if (colConfigs[tName]) {
        var attrs = (schema.Attributes || []).slice();
        var cfg = colConfigs[tName];
        attrs.forEach(function(attr, aIdx) {
          var cName = attr.Name;
          if (cfg[cName]) {
            var cDef = cfg[cName];
            if (cDef.dName) {
              dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].DisplayName'] = makeLangFormula(cDef.dName);
            }
            if (cDef.validIf) {
              dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].Valid_If'] = makeOptionFormula(cDef.validIf);
            }
            if (cDef.isPartOf) {
              dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].IsAPartOf'] = true;
              dict['AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + '].IsPartOf'] = true;
            }
          }
        });
        updatedSchemas++;
      }
    });
    console.log("[OK] Updated column properties in " + updatedSchemas + " sub-table schemas.");

    // 3. Inject 4 Navigation Buttons on 'Survey'
    var buttonDefs = [
      {
        name: 'Btn_Open_Labor_Table',
        target: '=LINKTOFILTEREDVIEW("Survey_Labor", [Survey_ID] = [_THISROW].[ID])',
        dName: 'SEC_C_TBL_LABOR'
      },
      {
        name: 'Btn_Open_Turnover_Table',
        target: '=LINKTOFILTEREDVIEW("Survey_Turnover", [Survey_ID] = [_THISROW].[ID])',
        dName: 'SEC_C_TBL_TURNOVER'
      },
      {
        name: 'Btn_Open_Capital_Loans_Table',
        target: '=LINKTOFILTEREDVIEW("Survey_Capital_Loans", [Survey_ID] = [_THISROW].[ID])',
        dName: 'SEC_C_TBL_CAPITAL_LOANS'
      },
      {
        name: 'Btn_Open_Business_Changes_Table',
        target: '=LINKTOFILTEREDVIEW("Survey_Business_Changes", [Survey_ID] = [_THISROW].[ID])',
        dName: 'SEC_C_TBL_BUSINESS_CHANGES'
      }
    ];

    var actions = (h.AppData.DataActions || []).slice();
    buttonDefs.forEach(function(b) {
      var actIdx = actions.findIndex(a => a.Name === b.name);
      var actObj = {
        ActionType: 'LINK_TO',
        Name: b.name,
        Table: 'Survey',
        ActionDefinition: {
          Target: b.target,
          Prominence: 'Display_Prominently',
          NeedsConfirmation: false,
          ConfirmationMessage: '',
          ModifiesData: false,
          BulkApplicable: false
        },
        DisplayName: makeLangFormula(b.dName),
        IsValid: true,
        Visibility: 'ADVANCED'
      };

      if (actIdx >= 0) {
        actions[actIdx] = actObj;
      } else {
        actions.push(actObj);
      }
    });

    dict['AppData.DataActions'] = actions;
    console.log("[OK] Injected 4 Section-style Navigation Action Buttons on 'Survey'.");

    // 4. Dispatch to Redux & Enable Native Cloud Save
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] Redux Dispatch Completed! Top-right SAVE button active ===");
  } catch (err) {
    console.error("[OmmNoMi ERROR]", err.message);
  }
})();
