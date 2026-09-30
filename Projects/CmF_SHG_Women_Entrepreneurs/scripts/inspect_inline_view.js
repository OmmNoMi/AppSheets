// =========================================================================
// OmmNoMi: Inspect Survey_Tables Views in Presentation.Controls
// Size: Under 35 lines, Pure ASCII, Validated with node -c
// =========================================================================
(function inspectInlineViews() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var controls = (h && h.Presentation && h.Presentation.Controls) || [];

        console.log("=== Survey_Tables Views in Presentation.Controls ===");
        controls.forEach(function(ctl, idx) {
            if (ctl && (ctl.TableOrFolderName === 'Survey_Tables' || (ctl.Name && ctl.Name.indexOf('Survey_Tables') >= 0))) {
                console.log("[" + idx + "] Name:", ctl.Name, "| Type/Action:", ctl.Action, "| DisplayName:", ctl.DisplayName);
                var set = typeof ctl.Settings === 'string' ? JSON.parse(ctl.Settings) : (ctl.Settings || {});
                console.log("    Settings:", JSON.stringify(set));
            }
        });
    } catch(e) { console.error("[ERROR]", e.message); }
})();
