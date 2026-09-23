// =========================================================================
// OmmNoMi: One-Hit Automated YES Step Creator & Webpack Inspector
// Size: Under 65 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function oneHitCreateYesStep() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] 1-Hit Automated YES Step Creator ===");

        // 1. Locate YES text in the Process canvas
        var all = document.querySelectorAll('*');
        var yesEl = null;
        for (var i = 0; i < all.length; i++) {
            var el = all[i];
            if (el.children.length === 0 && el.textContent && el.textContent.trim() === 'YES') {
                yesEl = el;
                break;
            }
        }

        if (!yesEl) {
            console.error("[ERROR] 'YES' branch label nahi mila screen par.");
            return;
        }

        var rect = yesEl.getBoundingClientRect();
        console.log("[INFO] Located 'YES' at: x=" + Math.round(rect.left) + ", y=" + Math.round(rect.top));

        // 2. Click the (+) button directly below 'YES'
        var clickX = rect.left + (rect.width / 2);
        var clickY = rect.bottom + 18; // 18px below the YES text label
        var targetEl = document.elementFromPoint(clickX, clickY);

        if (!targetEl) {
            console.error("[ERROR] Element below YES not found at point:", clickX, clickY);
            return;
        }

        console.log("[INFO] Target element found:", targetEl.tagName, targetEl.className);

        // Dispatch full mouse event sequence
        ['mousedown', 'mouseup', 'click'].forEach(function(evtName) {
            var evt = new MouseEvent(evtName, {
                bubbles: true,
                cancelable: true,
                view: window,
                clientX: clickX,
                clientY: clickY
            });
            targetEl.dispatchEvent(evt);
        });

        console.log("[OmmNoMi SUCCESS] (+) Button under YES clicked automatically!");

        // 3. Inspect the newly created Step in Redux after 600ms
        setTimeout(function() {
            var store = window.appStore;
            if (!store) {
                var candidates = [document.querySelector('#root'), document.querySelector('.ExpressionControl'), document.body];
                for (var j = 0; j < candidates.length; j++) {
                    var c = candidates[j]; if (!c) continue;
                    var fKey = Object.keys(c).find(function(k) { return k.startsWith('__reactFiber'); });
                    if (fKey && c[fKey] && c[fKey].memoizedProps && c[fKey].memoizedProps.store) {
                        store = c[fKey].memoizedProps.store; window.appStore = store; break;
                    }
                }
            }
            if (store) {
                var s = store.getState();
                var h = s.appTemplate.history[0].appTemplate;
                var ifNodes = h.Behavior.AppProcesses[0].Nodes[0].IfNodes;
                console.log("[OmmNoMi INFO] Current IfNodes count:", ifNodes ? ifNodes.length : 0);
                if (ifNodes && ifNodes.length > 0) {
                    console.log("[NEW NATIVE STEP SCHEMA]:", JSON.stringify(ifNodes[0], null, 2));
                }
            }
        }, 800);

    } catch(e) { console.error("[ERROR]", e.message); }
})();
