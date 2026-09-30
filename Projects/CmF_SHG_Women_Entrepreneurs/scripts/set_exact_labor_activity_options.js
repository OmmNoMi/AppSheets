// ==============================================================================
// OmmNoMi: Set Exact Activity Options in Survey_Labor (< 52 lines, Pure ASCII)
// ==============================================================================
(function setExactLaborActivityOptions() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Setting Exact Activity Dropdown Options ===");

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

    var exactOptions = [
      "Purchase of material",
      "Production",
      "Servicing",
      "Social media marketing",
      "Sale (from shop/door to door/Saras fair/haat)",
      "Record keeping"
    ];

    schemas.forEach(function(schema) {
      (schema.Attributes || []).forEach(function(attr) {
        var isActivityCol = attr.Name === 'Activity' || attr.Name === 'Activity_Name' || attr.Name === 'BusinessActivity';
        var isLabor = (schema.Name || '').indexOf('Labor') >= 0;

        if (isActivityCol || (isLabor && (attr.DisplayName || '').indexOf('Business Activity') >= 0)) {
          var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
          attr.Type = 'Enum';
          aux.EnumValues = exactOptions;
          aux.BaseType = 'Text';
          aux.EnumInputMode = 'Dropdown';
          aux.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name + " with exact 6 options");
        }
      });
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: { 'AppData.DataSchemas': schemas }, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Exact 6 options applied! Click the blue SAVE button in AppSheet! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
