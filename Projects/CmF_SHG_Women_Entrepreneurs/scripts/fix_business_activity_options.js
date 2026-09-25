// ==============================================================================
// OmmNoMi: Add Dropdown Options to Business Activity (< 55 lines, Pure ASCII)
// ==============================================================================
(function fixBusinessActivityOptions() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Adding Dropdown Options to Business Activity ===");

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

    var laborOps = ["Purchase of material", "Production", "Servicing", "Social media / Marketing", "Sales / Dealing with customers", "Accounting / Record keeping"];
    var bizTrades = ["Vegetable / Fruit", "Grocery", "Fancy / Cosmetic / General store", "Apparel / fabric", "Electric goods", "Flour mill (Chakki)", "Beauty parlour", "Auto-mechanic", "E-mitra / Online kiosk", "Transport", "Tent house", "Mobile repair shop", "Stone cutting", "Sanitary napkin making", "Handicraft", "Dairy / Milk collection", "Juice", "Food processing (pickle/badi/papad)", "Food making (Sweets/Namkeen/hotel)", "Sweet box making", "Flag making", "Leather products", "Stone idols", "Any other activity"];

    schemas.forEach(function(schema) {
      (schema.Attributes || []).forEach(function(attr) {
        var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
        var isLabor = schema.Name === 'Survey_Labor' && (attr.Name === 'Activity' || attr.Name === 'Activity_Name');
        var isBiz = attr.Name === 'BusinessActivities' || attr.Name === 'BusinessActivity';

        if (isLabor || isBiz) {
          attr.Type = isBiz ? 'EnumList' : 'Enum';
          aux.EnumValues = isLabor ? laborOps : bizTrades;
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
    console.log("=== [SUCCESS] Options Added! Blue SAVE button enabled. Click SAVE! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
