// =========================================================================
// OmmNoMi: Print exact ActionType key for DataActionAddRowTo
// Size: Under 25 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function checkActionKey() {
    try {
        var w = window;
        for (var k in w) {
            if (k.startsWith("webpackChunk") && Array.isArray(w[k])) {
                w[k].forEach(function(chunk) {
                    if (chunk && chunk[1] && chunk[1][663518]) {
                        var fnStr = chunk[1][663518].toString();
                        var idx = fnStr.indexOf("DataActionAddRowTo");
                        console.log("=== KEY & SCHEMA FOR DataActionAddRowTo ===");
                        console.log(fnStr.substring(idx - 150, idx + 100));
                        var idx2 = fnStr.indexOf("DataActionComposite");
                        console.log("=== KEY & SCHEMA FOR DataActionComposite ===");
                        console.log(fnStr.substring(idx2 - 150, idx2 + 150));
                    }
                });
            }
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
