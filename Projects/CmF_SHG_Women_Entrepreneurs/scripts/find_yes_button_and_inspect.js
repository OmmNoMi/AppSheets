// =========================================================================
// OmmNoMi: Inspect Canvas DOM & React Props for the YES (+) button
// Size: Compact, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function findYesButtonAndInspect() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Locating YES (+) Button & React Props ===");

        // 1. Look for SVG / circle / button elements with plus or add
        var allCircles = document.querySelectorAll('circle, button, [role="button"], svg');
        var found = [];
        allCircles.forEach(function(el) {
            var text = el.innerText || el.textContent || "";
            var aria = el.getAttribute("aria-label") || "";
            var title = el.getAttribute("title") || "";
            var cls = el.className ? String(el.className) : "";
            if (aria.toLowerCase().indexOf("add") >= 0 || title.toLowerCase().indexOf("add") >= 0 || text.indexOf("+") >= 0 || cls.indexOf("add") >= 0) {
                found.push(el);
            }
        });
        console.log("Potential Add buttons found in DOM:", found.length);
        found.slice(0, 10).forEach(function(el, i) {
            console.log(i + ": tag=" + el.tagName + " | aria=" + el.getAttribute("aria-label") + " | text=" + el.textContent);
        });

        console.log("--- Searching Webpack for Node Types & Action Types ---");
        var nodeTypes = [];
        var actionTypes = [];
        var actTypeEnums = [];
        var w = window;
        for (var k in w) {
            if (k.startsWith("webpackChunk") && Array.isArray(w[k])) {
                w[k].forEach(function(chunk) {
                    if (chunk && chunk[1]) {
                        for (var mId in chunk[1]) {
                            var fnStr = chunk[1][mId].toString();
                            var mNodes = fnStr.match(/Jeenee\.DataTypes\.ProcessNodes\.[A-Za-z0-9_]+/g);
                            if (mNodes) mNodes.forEach(function(n) { if (nodeTypes.indexOf(n) === -1) nodeTypes.push(n); });
                            var mActs = fnStr.match(/Jeenee\.DataTypes\.DataAction[A-Za-z0-9_]+/g);
                            if (mActs) mActs.forEach(function(a) { if (actionTypes.indexOf(a) === -1) actionTypes.push(a); });
                            var mActTypes = fnStr.match(/["'](ADD_ROW[^"']*|ADD_RECORD|EDIT_RECORD|COMPOSITE|RUN_ACTION|TASK|CHANGE_DATA)["']/g);
                            if (mActTypes) mActTypes.forEach(function(t) { var clean = t.replace(/["']/g, ""); if (actTypeEnums.indexOf(clean) === -1) actTypeEnums.push(clean); });
                        }
                    }
                });
            }
        }
        console.log("Discovered ProcessNodes:", nodeTypes);
        console.log("Discovered DataActions:", actionTypes);
        console.log("Discovered Action Types:", actTypeEnums);

    } catch(e) { console.error("[ERROR]", e.message); }
})();
