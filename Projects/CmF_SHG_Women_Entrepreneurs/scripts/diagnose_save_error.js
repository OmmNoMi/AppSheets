// =========================================================================
// OmmNoMi: Diagnose Error 400 on Save & Inspect Step/Action Structure
// Size: Compact, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function diagnoseSaveError() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Diagnosing Error 400 & Inspecting Redux ===");
        var store = window.appStore;
        if (!store) { console.error("[ERROR] window.appStore not found."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);

        // 1. Inspect Save Errors in Redux State
        console.log("--- 1. Redux Error / Notification State ---");
        var errorKeys = ["errors", "error", "notifications", "alerts", "saveStatus", "lastSaveError", "validationErrors"];
        errorKeys.forEach(function(k) {
            if (state[k]) console.log("state." + k + ":", state[k]);
        });
        if (state.appTemplate) {
            errorKeys.forEach(function(k) {
                if (state.appTemplate[k]) console.log("state.appTemplate." + k + ":", state.appTemplate[k]);
            });
        }

        // 2. Inspect IfNodes currently in the Bot Process
        console.log("--- 2. Process IfNodes Structure ---");
        var procs = (h && h.Behavior && h.Behavior.AppProcesses) || [];
        if (procs.length > 0 && procs[0].Nodes && procs[0].Nodes.length > 0) {
            var branch = procs[0].Nodes[0];
            console.log("Branch Node StepName:", branch.StepName);
            console.log("Branch Node IfNodes:", JSON.stringify(branch.IfNodes, null, 2));
        }

        // 3. Inspect DataActions currently in AppData
        console.log("--- 3. DataActions in AppData ---");
        var actions = (h && h.AppData && h.AppData.DataActions) || [];
        console.log("Total Actions count:", actions.length);
        var custom = actions.filter(function(a) { return a && (a.Name.indexOf("Survey") >= 0 || a.Name.indexOf("Turnover") >= 0); });
        console.log("Custom Actions found:", JSON.stringify(custom, null, 2));

        // 4. Inspect Any Native System Actions for comparison
        var nativeActs = actions.filter(function(a) { return a && a.Name.indexOf("Survey") === -1 && a.Name.indexOf("Turnover") === -1; });
        if (nativeActs.length > 0) {
            console.log("Sample Native Action keys & structure:", JSON.stringify(nativeActs[0], null, 2));
        }

        console.log("=== [END DIAGNOSTIC] Please copy console output and share ===");
    } catch(e) { console.error("[ERROR]", e.message); }
})();
