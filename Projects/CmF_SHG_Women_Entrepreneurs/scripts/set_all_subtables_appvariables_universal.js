// ==============================================================================
// OmmNoMi: Universal Store Discovery & Dynamic Sub-Tables (< 50 lines)
// ==============================================================================
(function setAllSubTablesDynamicUniversal() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Universal Store Discovery & Dynamic Sub-Tables ===");

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

    function makeDyn(expr) {
      return '=IFS(' +
        'ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Hindi", SELECT(AppVariables[Title_hi], ' + expr + '), ' +
        'ANY(SELECT(AppUser[Language], [Email] = USEREMAIL())) = "Rajasthani", SELECT(AppVariables[Title_raj], ' + expr + '), ' +
        'TRUE, SELECT(AppVariables[Title], ' + expr + '))';
    }

    var r = {
      Activity: makeDyn('[Column] = "Row_Item_Labor"'), Activity_Name: makeDyn('[Column] = "Row_Item_Labor"'),
      Season: makeDyn('[Column] = "Row_Item_Turnover"'), Season_Type: makeDyn('[Column] = "Row_Item_Turnover"'),
      Source: makeDyn('[Column] = "Row_Item_Capital"'), Capital_Source: makeDyn('[Column] = "Row_Item_Capital"'), InitialCapitalArranged: makeDyn('[Column] = "Row_Item_Capital"'),
      Loan_Usage_Purpose: makeDyn('STARTSWITH([ID], "USE_")'), Loan_Usage: makeDyn('STARTSWITH([ID], "USE_")'),
      Indicator_Heading: makeDyn('[Column] = "Row_Item_Trajectory"')
    };

    schemas.forEach(function(s) {
      (s.Attributes || []).forEach(function(a) {
        if (r[a.Name]) {
          var aux = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData || '{}') : (a.TypeAuxData || {});
          a.Type = a.Name === 'InitialCapitalArranged' ? 'EnumList' : 'Enum';
          aux.Suggested_Values = r[a.Name]; aux.EnumValues = null; aux.BaseType = 'Text'; aux.EnumInputMode = 'Dropdown'; aux.AllowOtherValues = true;
          a.TypeAuxData = JSON.stringify(aux);
        }
      });
    });

    var cleanActions = actions.filter(function(a) { return a.Name !== 'Btn_Capital_Loans'; });
    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: { 'AppData.DataSchemas': schemas, 'AppData.DataActions': cleanActions }, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Q6, Q15, Q17, Q18, Q20 Configured from AppVariables! Click SAVE! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
