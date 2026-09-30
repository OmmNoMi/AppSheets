// ==============================================================================
// OmmNoMi: Inspect Exact Error 400 Response & Btn_Labor State (< 30 lines)
// ==============================================================================
(function inspectExactError() {
  try {
    var store = window.appStore;
    var state = store ? store.getState() : {};
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);

    console.log("=== 1. REDUX SAVE ERROR ===");
    console.log("lastSaveError:", state.appTemplate && state.appTemplate.lastSaveError);
    console.log("saveStatus:", state.appTemplate && state.appTemplate.saveStatus);
    console.log("errors:", state.errors);
    console.log("editorSettings errors:", state.editorSettings && state.editorSettings.errors);

    console.log("=== 2. BTN_LABOR ACTION DUMP ===");
    var actions = (h && h.AppData && h.AppData.DataActions) || [];
    var btn = actions.find(function(a) { return a && a.Name === 'Btn_Labor'; });
    console.log("Btn_Labor:", JSON.stringify(btn, null, 2));

    console.log("=== 3. RECENT FAILED NETWORK REQUESTS ===");
    var reqs = window.performance.getEntriesByType('resource').filter(function(r) {
      return r.name.indexOf('/api/') >= 0 || r.name.indexOf('save') >= 0 || r.name.indexOf('template') >= 0;
    });
    reqs.slice(-5).forEach(function(r) { console.log(r.name, "Duration:", r.duration); });
  } catch(e) { console.error(e); }
})();
