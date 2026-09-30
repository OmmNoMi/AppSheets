// ==============================================================================
// OmmNoMi: Set Exact Q17 Capital Source Options (< 52 lines, Pure ASCII)
// ==============================================================================
(function setExactCapitalSourceOptions() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Setting Exact Q17 Capital Source Options ===");

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
    if (!store) return console.error("[FAIL] Store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));

    var exactCapSources = [
      "Own Savings", "Financed by family member", "Profit from business",
      "Mortgaged gold/silver", "Sold gold/silver", "Loan from family",
      "Loan from moneylender", "Loan from SHG", "Loan from OSF/SVEP",
      "Subsidy/grant under OSF/SVEP", "Loan from private saving groups/BC",
      "Loan from NBFC", "Mudra loan", "Loan from banks"
    ];

    schemas.forEach(function(schema) {
      var isCap = (schema.Name || '').indexOf('Capital') >= 0;
      (schema.Attributes || []).forEach(function(attr) {
        var isSrc = isCap && (attr.Name === 'Source' || attr.Name === 'Capital_Source' || attr.Name === 'Source_Name');
        var isInit = attr.Name === 'InitialCapitalArranged';
        if (isSrc || isInit) {
          var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
          attr.Type = isInit ? 'EnumList' : 'Enum';
          aux.EnumValues = exactCapSources;
          aux.BaseType = 'Text';
          aux.EnumInputMode = 'Dropdown';
          aux.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name);
        }
      });
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: { 'AppData.DataSchemas': schemas }, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Q17 Capital Sources applied! Click SAVE in AppSheet! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
