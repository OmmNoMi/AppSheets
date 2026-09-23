// =========================================================================
// OmmNoMi: Inspect Bot, Event, Process Details in Behavior
// Size: Under 40 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectBotDetails() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Inspecting Bot Details ===");

        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);

        if (!h || !h.Behavior) {
            console.error("[ERROR] Behavior not found in state");
            return;
        }

        console.log("1. AppBots:", JSON.stringify(h.Behavior.AppBots, null, 2));
        console.log("2. AppEvents:", JSON.stringify(h.Behavior.AppEvents, null, 2));
        console.log("3. AppProcesses:", JSON.stringify(h.Behavior.AppProcesses, null, 2));
        console.log("4. Tasks:", JSON.stringify(h.Behavior.Tasks, null, 2));
    } catch(e) { console.error("[ERROR]", e.message); }
})();
