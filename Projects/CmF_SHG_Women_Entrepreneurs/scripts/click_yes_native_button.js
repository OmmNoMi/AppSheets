// =========================================================================
// OmmNoMi: Locate YES Node, Find (+) Button Below It, and Trigger Native Click
// Size: Under 50 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function clickYesNativeButton() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Clicking YES (+) Button ===");

        // 1. Locate the exact YES element
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
        console.log("[INFO] Found YES element:", yesEl.tagName, "at x=" + Math.round(r.left) + ", y=" + Math.round(r.top));

        // 2. Find clickable / circle / button elements within 100px below YES
        var candidates = document.querySelectorAll('button, circle, [role="button"], svg, path, div');
        var bestTarget = null;
        var minDist = 9999;

        candidates.forEach(function(c) {
            var cr = c.getBoundingClientRect();
            // Button must be below YES (cr.top >= r.bottom - 5) and horizontally aligned
            if (cr.top >= (r.bottom - 5) && cr.top <= (r.bottom + 80) && Math.abs(cr.left - r.left) < 60 && cr.width > 0 && cr.height > 0) {
                var dist = Math.hypot(cr.left - r.left, cr.top - r.bottom);
                if (dist < minDist && (c.tagName === 'BUTTON' || c.tagName === 'circle' || c.tagName === 'svg' || c.getAttribute('role') === 'button' || c.className.indexOf('add') >= 0)) {
                    minDist = dist;
                    bestTarget = c;
                }
            }
        });

        // Fallback: use elementFromPoint
        if (!bestTarget) {
            bestTarget = document.elementFromPoint(r.left + r.width / 2, r.bottom + 22);
        }

        console.log("[INFO] Selected Target:", bestTarget ? (bestTarget.tagName + " " + bestTarget.className) : "null");

        if (bestTarget) {
            ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click'].forEach(function(type) {
                var evt = new MouseEvent(type, { bubbles: true, cancelable: true, view: window });
                bestTarget.dispatchEvent(evt);
            });
            bestTarget.click();
            console.log("[OmmNoMi OK] YES (+) button clicked successfully!");
        }

    } catch(e) { console.error("[ERROR]", e.message); }
})();
