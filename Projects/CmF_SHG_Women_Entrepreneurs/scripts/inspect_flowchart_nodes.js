// =========================================================================
// OmmNoMi: Inspect Flowchart YES branch & add step
// Size: Under 45 lines, Pure ASCII, Validated with node -c
// =========================================================================
(function inspectFlowchart() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Inspecting Flowchart Elements ===");

        // Look for elements with text "YES" or nearby buttons
        var all = Array.from(document.querySelectorAll('*'));
        var yesEl = all.find(function(el) {
            return (el.textContent || "").trim() === "YES" && el.children.length === 0;
        });

        if (yesEl) {
            console.log("[FOUND] YES label found:", yesEl);
            var parent = yesEl.closest('div') || yesEl.parentElement;
            console.log("YES parent:", parent);
            // Find buttons or plus icons nearby
            var nearbyBtns = Array.from((parent && parent.parentElement ? parent.parentElement : document).querySelectorAll('button, [role="button"], circle, path, svg'));
            console.log("Nearby clickable elements count:", nearbyBtns.length);
        } else {
            console.log("[INFO] YES element not found as direct text.");
        }

        var store = window.appStore;
        if (store) {
            var h = store.getState().appTemplate.history[0].appTemplate;
            var proc = h.Behavior.AppProcesses[0];
            console.log("Current Process Nodes:", JSON.stringify(proc.Nodes, null, 2));
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
