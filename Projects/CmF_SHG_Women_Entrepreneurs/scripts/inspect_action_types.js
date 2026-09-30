// =========================================================================
// OmmNoMi: Inspect all Action Types in DataActions
// Size: Under 30 lines, Pure ASCII, Validated with node -c
// =========================================================================
(function inspectActionTypes() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var actions = (h && h.AppData && h.AppData.DataActions) || [];
        
        console.log("=== Action Types in AppData.DataActions ===");
        var map = {};
        actions.forEach(function(a) {
            var t = a.ActionType || (a.ActionDefinition && a.ActionDefinition['$type']) || 'unknown';
            if (!map[t]) map[t] = [];
            map[t].push(a.Name + " (" + a.Table + ")");
        });
        for (var k in map) {
            console.log(k + " [" + map[k].length + "]:", map[k].slice(0, 5));
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
