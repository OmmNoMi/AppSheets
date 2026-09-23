// =========================================================================
// OmmNoMi: Inspect existing DataActions in Redux
// Size: Under 40 lines, Pure ASCII, Validated with node -c
// =========================================================================
(function inspectAllActions() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var actions = (h && h.AppData && h.AppData.DataActions) || [];

        console.log("=== All DataActions (" + actions.length + ") ===");
        actions.forEach(function(a, idx) {
            console.log("[" + idx + "] Name:", a.Name, "| Table:", a.Table, "| Type:", a.ActionType, "| DefType:", a.ActionDefinition && a.ActionDefinition['$type']);
        });
    } catch(e) { console.error("[ERROR]", e.message); }
})();
