// ==============================================================================
// OmmNoMi: Inspect Schema Table Names (< 20 lines)
// ==============================================================================
(function listSchemas() {
  try {
    var store = window.appStore;
    var state = store.getState();
    var h = (state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || state.appTemplate.current;
    var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
    console.log("Total DataSchemas:", schemas.length);
    schemas.forEach(function(s, idx) {
      console.log("[" + idx + "] Name:", s.Name, "| TableName:", s.TableName, "| Attributes count:", (s.Attributes || []).length);
    });
  } catch(e) { console.error(e); }
})();
