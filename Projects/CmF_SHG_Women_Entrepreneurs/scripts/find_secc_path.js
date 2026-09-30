// =========================================================================
// OmmNoMi: Locate "Survey Form SecC" across entire Redux Store
// Size: Under 30 lines, SOP-A5 Pure ASCII
// =========================================================================
(function findSecCPath() {
    try {
        var store = window.appStore;
        var state = store.getState();
        console.log("state keys:", Object.keys(state));
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (h && h.Presentation) {
            console.log("Presentation keys:", Object.keys(h.Presentation));
        }
        // Search where "Survey Form SecC" or "SecC" appears in h
        var hits = [];
        function scan(obj, path, depth) {
            if (!obj || depth > 5) return;
            for (var k in obj) {
                var val = obj[k];
                if (typeof val === 'string' && val.indexOf('SecC') >= 0) {
                    hits.push(path + "." + k + " = " + val);
                } else if (typeof val === 'object' && val !== null) {
                    scan(val, path + "." + k, depth + 1);
                }
            }
        }
        scan(h, "h", 0);
        console.log("SecC hits in h:", hits.slice(0, 10));
    } catch(e) {
        console.error("[ERROR]", e.message);
    }
})();
