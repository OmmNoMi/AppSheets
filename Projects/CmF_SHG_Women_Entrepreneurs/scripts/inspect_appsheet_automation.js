// =========================================================================
// OmmNoMi: Inspect AppSheet Automation Schema & Orbit-Style Bot Structure
// Size: Under 50 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectAutomationSchema() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Inspecting AppSheet Automation & Bots ===");

        var store = window.appStore;
        if (!store) {
            var root = document.querySelector('#root') || document.body;
            var fKey = Object.keys(root).find(function(k) { return k.indexOf('reactFiber') >= 0; });
            var f = root[fKey];
            while (f) {
                if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; window.appStore = store; break; }
                f = f.return;
            }
        }
        if (!store) { console.error("[ERROR] Redux store not found."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);

        console.log("1. State Automation Keys:", state.automation ? Object.keys(state.automation) : "none");
        
        var autoKeysInH = [];
        for (var k in h) {
            var lk = k.toLowerCase();
            if (lk.indexOf('auto') >= 0 || lk.indexOf('bot') >= 0 || lk.indexOf('rule') >= 0 || lk.indexOf('event') >= 0 || lk.indexOf('process') >= 0 || lk.indexOf('task') >= 0) {
                autoKeysInH.push(k);
            }
        }
        console.log("2. Automation Keys in AppTemplate (h):", autoKeysInH);

        autoKeysInH.forEach(function(key) {
            var val = h[key];
            var count = Array.isArray(val) ? val.length : (val && typeof val === 'object' ? Object.keys(val).length : typeof val);
            console.log("   -> " + key + ":", count, Array.isArray(val) && val.length > 0 ? val[0] : (typeof val === 'object' ? val : ''));
        });

        if (h.AppData) {
            var adKeys = Object.keys(h.AppData).filter(function(k) {
                var lk = k.toLowerCase();
                return lk.indexOf('auto') >= 0 || lk.indexOf('bot') >= 0 || lk.indexOf('rule') >= 0 || lk.indexOf('action') >= 0;
            });
            console.log("3. AppData Automation/Action Keys:", adKeys);
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
