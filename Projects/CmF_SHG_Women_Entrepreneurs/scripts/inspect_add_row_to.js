// =========================================================================
// OmmNoMi: Inspect exact properties of DataActionAddRowTo in Module 663518
// Size: Under 30 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectAddRowTo() {
    try {
        var w = window;
        for (var k in w) {
            if (k.startsWith("webpackChunk") && Array.isArray(w[k])) {
                w[k].forEach(function(chunk) {
                    if (chunk && chunk[1] && chunk[1][663518]) {
                        var fnStr = chunk[1][663518].toString();
                        var idx = fnStr.indexOf("DataActionAddRowTo");
                        console.log("=== DataActionAddRowTo Schema Snippet ===");
                        console.log(fnStr.substring(idx - 50, idx + 500));
                    }
                });
            }
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
