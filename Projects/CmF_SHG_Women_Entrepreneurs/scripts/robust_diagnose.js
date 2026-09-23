// =========================================================================
// OmmNoMi: Robust Diagnostic with React Fiber Store Finder
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function robustDiagnose() {
    try {
        var store = window.appStore;
        if (!store) {
            var all = document.querySelectorAll('*');
            for (var i = 0; i < all.length; i++) {
                var el = all[i];
                var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
                if (!fKey) continue;
                var f = el[fKey];
                while (f) {
                    if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                        store = f.memoizedProps.store; window.appStore = store; break;
                    }
                    if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
                        store = f.stateNode.store; window.appStore = store; break;
                    }
                    f = f.return;
                }
                if (store) break;
            }
        }
        if (!store) { console.error("[ERROR] Store not found. Page par kahin bhi ek click karke dobara run karein."); return; }

        var state = store.getState();
        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);

        var actions = (h && h.AppData && h.AppData.DataActions) || [];
        console.log("[OmmNoMi INFO] Total Actions in AppData:", actions.length);
        if (actions.length > 0) {
            console.log("[SAMPLE ACTION]:", JSON.stringify(actions[0], null, 2));
        }

        var tasks = (h && h.Behavior && h.Behavior.Tasks) || [];
        console.log("[OmmNoMi INFO] Total Behavior Tasks:", tasks.length);
        if (tasks.length > 0) {
            console.log("[SAMPLE TASK]:", JSON.stringify(tasks[0], null, 2));
        }

        var procs = (h && h.Behavior && h.Behavior.AppProcesses) || [];
        console.log("[OmmNoMi INFO] AppProcesses:", JSON.stringify(procs, null, 2));

    } catch(e) { console.error("[ERROR]", e.message); }
})();
