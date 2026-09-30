// =========================================================================
// OmmNoMi: Inspect & Trigger Native AppSheet Automation Bot Creation
// Size: Under 50 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function seeAndCreateAutomation() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] 1. Inspecting Automation Screen & Store ===");

        var store = window.appStore;
        if (!store) {
            console.error("[ERROR] window.appStore not found. Please click inside AppSheet editor first.");
            return;
        }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var bots = (h && h.Behavior && h.Behavior.AppBots) || [];
        console.log("[INFO] Current AppBots count:", bots.length);

        // Find the "Create my first automation" or "New Bot" button in DOM
        var buttons = Array.from(document.querySelectorAll('button'));
        var targetBtn = buttons.find(function(b) {
            var txt = (b.textContent || "").trim();
            return txt.indexOf("Create my first automation") !== -1 || txt.indexOf("New Bot") !== -1 || txt.indexOf("Add a bot") !== -1;
        });

        if (targetBtn) {
            console.log("[FOUND] Button found:", targetBtn.textContent.trim());
            console.log("[ACTION] Triggering native AppSheet Bot Creation via button.click()...");
            targetBtn.click();

            setTimeout(function() {
                var newState = store.getState();
                var newH = (newState.appTemplate && newState.appTemplate.history && newState.appTemplate.history[0] && newState.appTemplate.history[0].appTemplate) || (newState.appTemplate && newState.appTemplate.current);
                var newBots = (newH && newH.Behavior && newH.Behavior.AppBots) || [];
                var newEvents = (newH && newH.Behavior && newH.Behavior.AppEvents) || [];
                var newProcesses = (newH && newH.Behavior && newH.Behavior.AppProcesses) || [];

                console.log("=== [RESULT AFTER CREATION] ===");
                console.log("AppBots created:", newBots.length, newBots);
                console.log("AppEvents created:", newEvents.length, newEvents);
                console.log("AppProcesses created:", newProcesses.length, newProcesses);
                if (newBots.length > 0) {
                    console.log("[SUCCESS] Native Automation Bot created successfully! Now ready to configure.");
                }
            }, 800);
        } else {
            console.log("[WARN] 'Create my first automation' button not found directly in DOM.");
            console.log("[INFO] Available visible buttons:", buttons.map(function(b) { return (b.textContent || '').trim(); }).filter(Boolean).slice(0, 15));
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
