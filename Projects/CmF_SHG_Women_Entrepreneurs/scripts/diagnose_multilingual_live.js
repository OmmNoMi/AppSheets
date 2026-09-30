// ==============================================================================
// OmmNoMi: Diagnose Multilingual State & Table Configurations
// ==============================================================================
(function diagnoseMultilingualLive() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Diagnosing Multilingual State ===");

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
    if (!store) return console.error("[FAIL] Store not found.");

    var state = store.getState();
    var h = (state.appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];

    console.log("1. Total schemas found:", schemas.length);
    schemas.forEach(function(s) {
      if ((s.Name || '').indexOf('Survey') >= 0 || (s.Name || '').indexOf('App') >= 0) {
        console.log("  Table:", s.Name);
        (s.Attributes || []).forEach(function(a) {
          if (['Activity', 'Season', 'Source', 'Loan_Usage_Purpose', 'Indicator_Heading', 'Language'].indexOf(a.Name) >= 0) {
            var aux = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData || '{}') : (a.TypeAuxData || {});
            console.log("    Col:", a.Name, "| Type:", a.Type, "| Suggested_Values:", aux.Suggested_Values, "| EnumValues:", aux.EnumValues ? aux.EnumValues.length : 'null');
          }
        });
      }
    });

    console.log("2. tableData in client memory:");
    if (state.tableData) {
      console.log("  Tables loaded in memory:", Object.keys(state.tableData));
      if (state.tableData.AppUser) {
        console.log("  AppUser rows:", Object.keys(state.tableData.AppUser).length);
        console.log("  Sample AppUser:", state.tableData.AppUser[Object.keys(state.tableData.AppUser)[0]]);
      }
      if (state.tableData.AppVariables) {
        console.log("  AppVariables rows:", Object.keys(state.tableData.AppVariables).length);
      }
    } else {
      console.log("  state.tableData is empty/undefined");
    }

  } catch(e) { console.error("[FAIL]", e); }
})();
