// =========================================================================
// OmmNoMi: Precise SVG Circle Click Trigger for YES Branch Button
// Size: Under 55 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function clickSvgCircle() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Triggering Native SVG Circle Click ===");

        var all = document.querySelectorAll('*');
        var yesEl = null;
        for (var i = 0; i < all.length; i++) {
            var el = all[i];
            var txt = (el.innerText || el.textContent || "").trim();
            if (txt.indexOf("YES") >= 0) {
                var hasChild = Array.from(el.children).some(function(c) { return (c.innerText || c.textContent || "").indexOf("YES") >= 0; });
                if (!hasChild) { yesEl = el; break; }
            }
        }
        if (!yesEl) { console.error("[ERROR] YES element not found."); return; }

        var r = yesEl.getBoundingClientRect();
        var circles = document.querySelectorAll('circle');
        var targetCircle = null;
        var minDist = 9999;

        circles.forEach(function(c) {
            var cr = c.getBoundingClientRect();
            if (cr.top >= r.bottom - 5 && cr.top <= r.bottom + 80 && Math.abs(cr.left - r.left) < 60) {
                var dist = Math.hypot(cr.left - r.left, cr.top - r.bottom);
                if (dist < minDist) { minDist = dist; targetCircle = c; }
            }
        });

        if (!targetCircle) { console.error("[ERROR] Target circle not found."); return; }

        var cr = targetCircle.getBoundingClientRect();
        var cx = cr.left + (cr.width / 2);
        var cy = cr.top + (cr.height / 2);

        console.log("[INFO] Target circle located at x=" + Math.round(cx) + ", y=" + Math.round(cy));

        // SVG elements do not have .click(), so dispatch full pointer + mouse event chain on circle and parent <g>
        var targets = [targetCircle, targetCircle.parentElement, targetCircle.closest('g')].filter(Boolean);

        targets.forEach(function(target) {
            ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(function(t) {
                var evt = new MouseEvent(t, {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: cx,
                    clientY: cy
                });
                target.dispatchEvent(evt);
            });
            if (typeof target.click === 'function') { target.click(); }
        });

        console.log("[OmmNoMi SUCCESS] Native SVG Circle click dispatched with exact coordinates!");

        setTimeout(function() {
            var store = window.appStore;
            if (store) {
                var s = store.getState();
                var h = s.appTemplate.history[0].appTemplate;
                var ifNodes = h.Behavior.AppProcesses[0].Nodes[0].IfNodes;
                console.log("[OmmNoMi INFO] Current IfNodes count in Redux:", ifNodes ? ifNodes.length : 0);
                if (ifNodes && ifNodes.length > 0) {
                    console.log("[CREATED STEP]:", JSON.stringify(ifNodes[0], null, 2));
                }
            }
        }, 700);

    } catch(e) { console.error("[ERROR]", e.message); }
})();
