// =========================================================================
// OmmNoMi: Dump Bot, Event, Process & Action JSON
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function dumpBotJson() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (!h || !h.Behavior) return;

        console.log("=== 1. APP BOTS ===");
        console.log(JSON.stringify(h.Behavior.AppBots, null, 2));

        console.log("=== 2. APP EVENTS ===");
        console.log(JSON.stringify(h.Behavior.AppEvents, null, 2));

        console.log("=== 3. APP PROCESSES ===");
        console.log(JSON.stringify(h.Behavior.AppProcesses, null, 2));

        console.log("=== 4. BEHAVIOR TASKS ===");
        console.log(JSON.stringify(h.Behavior.Tasks, null, 2));

        console.log("=== 5. DATA ACTIONS (First 3) ===");
        var actions = (h.AppData && h.AppData.DataActions) || [];
        console.log("Total Actions:", actions.length);
        if (actions.length > 0) {
            console.log(JSON.stringify(actions.slice(0, 3), null, 2));
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
