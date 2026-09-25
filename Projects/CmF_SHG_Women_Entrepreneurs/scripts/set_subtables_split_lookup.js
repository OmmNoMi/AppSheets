// ==============================================================================
// OmmNoMi: Sub-Tables Multilingual SPLIT(LOOKUP(...)) Redux Injector (< 55 lines)
// ==============================================================================
(function setSubtablesSplitLookup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Setting SPLIT(LOOKUP(...)) Multilingual Sub-Tables ===");

    var store = window.appStore || (function() {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i], k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); });
        var f = k && el[k];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) return f.memoizedProps.store;
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) return f.stateNode.store;
          f = f.return;
        }
      }
    })();
    if (!store) return console.error("[FAIL] Store not found. Editor me kisi column par click karein.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));
    var actions = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataActions) || []));

    var tblVarMap = {
      Survey_Labor: { Activity: 'COL_LABOR_ACTIVITY', Activity_Name: 'COL_LABOR_ACTIVITY' },
      Survey_Turnover: { Season: 'COL_TURN_SEASON', Season_Type: 'COL_TURN_SEASON' },
      Survey_Capital_Arrangement: { Source: 'COL_CAP_SOURCE', Capital_Source: 'COL_CAP_SOURCE' },
      Survey_Loan_Usage: { Source: 'COL_LOAN_SOURCE', Loan_Usage_Purpose: 'COL_LOAN_USAGE', Loan_Usage: 'COL_LOAN_USAGE' },
      Survey_Business_Changes: { Indicator_Heading: 'COL_CHG_HEADING' }
    };

    schemas.forEach(function(s) {
      var colMap = tblVarMap[s.Name];
      if (colMap) {
        (s.Attributes || []).forEach(function(a) {
          if (colMap[a.Name]) {
            var varId = colMap[a.Name];
            var aux = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData || '{}') : (a.TypeAuxData || {});
            a.Type = 'Enum';
            aux.Valid_If = '=SPLIT(LOOKUP("' + varId + '", "AppVariables", "ID", "VariableList"), " , ")';
            aux.BaseType = 'Ref';
            aux.ReferencedTableName = 'AppVariables';
            aux.EnumInputMode = 'Dropdown';
            aux.EnumValues = null;
            aux.AllowOtherValues = false;
            aux.BaseTypeQualifier = JSON.stringify({ ReferencedTableName: 'AppVariables', ReferencedKeyColumn: 'ID' });
            a.TypeAuxData = JSON.stringify(aux);
          }
        });
      }
    });

    var cleanActions = actions.filter(function(a) { return a.Name !== 'Btn_Capital_Loans'; });
    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: { 'AppData.DataSchemas': schemas, 'AppData.DataActions': cleanActions }, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Q6, Q15, Q17, Q18, Q20 Configured with SPLIT(LOOKUP(...))! Click SAVE! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
