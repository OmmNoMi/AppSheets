// ==============================================================================
// OmmNoMi: Inspect Existing Manual/Custom Survey Actions (Pure Read-Only)
// ==============================================================================
(function inspectCustomActions() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Inspecting Existing Manual/Custom Actions on Survey ===");

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
    if (!store) return console.error("[FAIL] Store not found. Editor me kisi element par click karein.");

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var allActions = (h.AppData && h.AppData.DataActions) || [];

    console.log("Total actions in app:", allActions.length);

    // Filter Survey actions, excluding system delete, edit, add, view ref
    var surveyActions = allActions.filter(function(a) {
      if (!a || a.Table !== 'Survey') return false;
      var name = (a.Name || '').toLowerCase();
      // Ignore system buttons
      if (name === 'delete' || name === 'edit' || name === 'add' || name.startsWith('view ref')) return false;
      return true;
    });

    console.log("=== FOUND " + surveyActions.length + " CUSTOM/MANUAL ACTIONS ON SURVEY ===");

    surveyActions.forEach(function(act, idx) {
      console.log("\n--------------------------------------------------");
      console.log("ACTION #" + (idx + 1) + ": " + act.Name);
      console.log("Full Object:");
      console.log(JSON.stringify(act, null, 2));
    });

  } catch(e) {
    console.error("[ERROR]", e);
  }
})();
