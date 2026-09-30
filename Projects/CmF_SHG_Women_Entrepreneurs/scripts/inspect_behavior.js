// =========================================================================
// OmmNoMi: Inspect h.Behavior & Automation Objects
// Size: Under 40 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectBehaviorAndAutomation() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Inspecting h.Behavior & Automation Objects ===");

        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);

        if (h && h.Behavior) {
            console.log("1. h.Behavior Keys:", Object.keys(h.Behavior));
            for (var k in h.Behavior) {
                var v = h.Behavior[k];
                var count = Array.isArray(v) ? v.length : (v && typeof v === 'object' ? Object.keys(v).length : typeof v);
                console.log("   -> Behavior." + k + ":", count);
            }
        } else {
            console.log("1. h.Behavior is null or empty");
        }

        // Check if Bots, Events, Processes exist anywhere under h.Behavior
        if (h && h.Behavior) {
            ['Bots', 'Events', 'Processes', 'Tasks', 'Rules', 'Workflows'].forEach(function(item) {
                if (h.Behavior[item]) console.log("   *** FOUND Behavior." + item + ":", h.Behavior[item]);
            });
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
