// =========================================================================
// OmmNoMi: Inspect All 26 Existing Actions to see their ActionType and Def
// Size: Under 25 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function listActionTypes() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = state.appTemplate.history[0].appTemplate;
        var actions = (h && h.AppData && h.AppData.DataActions) || [];
        console.log("=== All 26 Actions ===");
        actions.forEach(function(a, i) {
            var defType = a.ActionDefinition ? a.ActionDefinition["$type"] : "none";
            console.log(i + ": Name=" + a.Name + " | Table=" + a.Table + " | ActionType=" + a.ActionType + " | Def=" + defType);
        });
    } catch(e) { console.error("[ERROR]", e.message); }
})();
