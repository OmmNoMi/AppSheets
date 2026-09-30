// =========================================================================
// OmmNoMi: Inspect TableSlices Structure in AppData
// Size: Under 25 lines, SOP-A5 Pure ASCII
// =========================================================================
(function inspectTableSlices() {
    try {
        var store = window.appStore;
        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        var ts = h.AppData.TableSlices;
        console.log("=== TableSlices Inspection ===");
        console.log("Type:", typeof ts);
        console.log("Is Array:", Array.isArray(ts));
        if (Array.isArray(ts)) {
            console.log("Length:", ts.length);
            if (ts.length > 0) {
                console.log("Sample Slice:", JSON.stringify(ts[0], null, 2));
            }
        } else if (ts && typeof ts === "object") {
            console.log("Keys:", Object.keys(ts));
            var firstKey = Object.keys(ts)[0];
            if (firstKey) {
                console.log("Sample Slice (" + firstKey + "):", JSON.stringify(ts[firstKey], null, 2));
            }
        }
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
