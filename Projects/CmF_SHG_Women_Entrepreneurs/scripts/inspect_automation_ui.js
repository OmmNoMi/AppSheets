// =========================================================================
// OmmNoMi: Inspect Current Automation UI State & Available Actions
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectAutomationUI() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Inspecting Current Automation Screen ===");

        // 1. List all visible buttons and their text
        var buttons = Array.from(document.querySelectorAll('button, [role="button"], a')).filter(function(el) {
            var rect = el.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0 && el.innerText && el.innerText.trim().length > 0;
        });

        console.log("Visible Buttons / Clickable Elements (" + buttons.length + "):");
        buttons.forEach(function(b, i) {
            var txt = b.innerText.trim().replace(/\s+/g, ' ');
            if (txt.length < 80) {
                console.log(" [" + i + "]", txt);
            }
        });

        // 2. Check Redux sideNavigation & editor state
        var store = window.appStore;
        if (store) {
            var state = store.getState();
            console.log("\nSideNav Location:", state.sideNavigation && state.sideNavigation.lastLocation && state.sideNavigation.lastLocation.Automation);
            var h = state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate;
            if (h && h.Behavior) {
                console.log("Behavior.AppBots:", h.Behavior.AppBots ? h.Behavior.AppBots.length : 0);
            }
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
