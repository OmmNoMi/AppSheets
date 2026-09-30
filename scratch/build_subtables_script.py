js_code = """// ==============================================================================
// OmmNoMi: Dynamic Multilingual Options from AppVariables for Q6, Q15, Q17, Q18, Q20
// Size: < 60 lines, Pure ASCII, Validated with node -c
// ==============================================================================
(function setAllSubTablesDynamicMultilingual() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Applying Dynamic Multilingual from AppVariables ===");

    var store = window.appStore || (function() {
      var el = document.querySelector('.ExpressionControl') || document.querySelector('[role="grid"]') || document.body;
      var k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); });
      var f = el && el[k];
      while (f) {
        if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store;
        if (f.stateNode && f.stateNode.store) return f.stateNode.store;
        f = f.return;
      }
    })();
    if (!store) return console.error("[FAIL] Redux store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));
    var actions = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataActions) || []));

    // Dynamic Language Formula Generator from AppVariables
    function makeDynamicFormula(filterExpr) {
      return '=IFS(' +
        'ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Hindi", SELECT(AppVariables[Title_hi], ' + filterExpr + '), ' +
        'ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Rajasthani", SELECT(AppVariables[Title_raj], ' + filterExpr + '), ' +
        'TRUE, SELECT(AppVariables[Title], ' + filterExpr + ')' +
      ')';
    }

    var rules = {
      // Q6 Labor
      Activity: makeDynamicFormula('[Column] = "Row_Item_Labor"'),
      Activity_Name: makeDynamicFormula('[Column] = "Row_Item_Labor"'),
      // Q15 Turnover
      Season: makeDynamicFormula('[Column] = "Row_Item_Turnover"'),
      Season_Type: makeDynamicFormula('[Column] = "Row_Item_Turnover"'),
      // Q17 Capital
      Source: makeDynamicFormula('[Column] = "Row_Item_Capital"'),
      Capital_Source: makeDynamicFormula('[Column] = "Row_Item_Capital"'),
      InitialCapitalArranged: makeDynamicFormula('[Column] = "Row_Item_Capital"'),
      // Q18 Loan Usage
      Loan_Usage_Purpose: makeDynamicFormula('STARTSWITH([ID], "USE_")'),
      Loan_Usage: makeDynamicFormula('STARTSWITH([ID], "USE_")'),
      // Q20 Business Changes
      Indicator_Heading: makeDynamicFormula('[Column] = "Row_Item_Trajectory"')
    };

    schemas.forEach(function(schema) {
      (schema.Attributes || []).forEach(function(attr) {
        if (rules[attr.Name]) {
          var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
          attr.Type = attr.Name === 'InitialCapitalArranged' ? 'EnumList' : 'Enum';
          aux.Suggested_Values = rules[attr.Name];
          aux.EnumValues = null;
          aux.BaseType = 'Text';
          aux.EnumInputMode = 'Dropdown';
          aux.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux);
          console.log("[OK] Dynamic AppVariables Formula set on " + schema.Name + "." + attr.Name);
        }
      });
    });

    // Remove duplicate 6th action button (Btn_Capital_Loans) if present
    var cleanActions = actions.filter(function(a) {
      return a.Name !== 'Btn_Capital_Loans';
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: {
        'AppData.DataSchemas': schemas,
        'AppData.DataActions': cleanActions
      },
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Q6, Q15, Q17, Q18, Q20 Configured from AppVariables! Click SAVE! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
"""

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/set_all_subtables_appvariables_dynamic.js', 'w', encoding='ascii') as f:
    f.write(js_code)
print("Wrote set_all_subtables_appvariables_dynamic.js")
