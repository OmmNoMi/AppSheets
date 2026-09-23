// =========================================================================
// OmmNoMi: Locate Automation / Bots / Tasks across Entire Redux State
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function findAutomationInState() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Locating Automation in Redux State ===");

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
        console.log("1. All State Keys:", Object.keys(state));

        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
        if (h) console.log("2. All AppTemplate (h) Keys:", Object.keys(h));
        if (h && h.AppData) console.log("3. All AppData Keys:", Object.keys(h.AppData));

        // Search state for any key containing 'bot', 'process', 'event', 'rule'
        var foundPaths = [];
        function scan(obj, path, depth) {
            if (!obj || depth > 3) return;
            if (typeof obj !== 'object') return;
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                var k = keys[i];
                var lk = k.toLowerCase();
                if (lk === 'bots' || lk === 'events' || lk === 'processes' || lk === 'tasks' || lk === 'rules' || lk === 'automation') {
                    foundPaths.push(path + "." + k + " (type: " + typeof obj[k] + (Array.isArray(obj[k]) ? ", len: " + obj[k].length : "") + ")");
                }
                scan(obj[k], path + "." + k, depth + 1);
            }
        }
        scan(state, "state", 0);
        console.log("4. Discovered Automation Paths in State:\n", foundPaths.join("\n"));
    } catch(e) { console.error("[ERROR]", e.message); }
})();
