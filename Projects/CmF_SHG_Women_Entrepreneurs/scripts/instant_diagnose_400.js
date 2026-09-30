// ==============================================================================
// OmmNoMi: Instant Diagnostic for Error 400
// ==============================================================================
(function diagnoseNow() {
  try {
    var store = window.appStore;
    if (!store) return console.error("No store");
    var state = store.getState();
    var h = (state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || state.appTemplate.current;

    console.log("=== 1. LAST SAVE ERROR ===");
    console.log("lastSaveError:", state.appTemplate && state.appTemplate.lastSaveError);
    console.log("saveStatus:", state.appTemplate && state.appTemplate.saveStatus);
    console.log("errors:", state.errors || state.error);

    console.log("=== 2. SAMPLE NATIVE ACTIONS ===");
    var actions = (h.AppData && h.AppData.DataActions) || [];
    actions.slice(0, 3).forEach(function(a) {
      console.log("Action Name:", a.Name, "Type:", a.ActionType, "Keys:", Object.keys(a));
      if (a.ActionDefinition) console.log("  ActionDefinition:", a.ActionDefinition);
    });

    console.log("=== 3. BTN_CAPITAL ACTION ===");
    var cap = actions.find(function(a) { return a.Name === 'Btn_Capital'; });
    console.log("Btn_Capital:", JSON.stringify(cap, null, 2));

    console.log("=== 4. SURVEY_LABOR ID ATTRIBUTE KEYS ===");
    var schemas = h.AppData && h.AppData.DataSchemas || [];
    var labor = schemas.find(function(s) { return s.Name === 'Survey_Labor'; });
    if (labor && labor.Attributes) {
      var idAttr = labor.Attributes.find(function(a) { return a.Name === 'ID'; });
      console.log("ID Attribute keys:", Object.keys(idAttr));
      console.log("ID Attribute object:", idAttr);
    }
  } catch(e) { console.error(e); }
})();
