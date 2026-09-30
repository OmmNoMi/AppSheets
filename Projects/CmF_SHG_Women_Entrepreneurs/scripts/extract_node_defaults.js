// =========================================================================
// OmmNoMi: Extract RunActionNodeDefaults & Node Creation Templates
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function extractNodeDefaults() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Extracting RunActionNodeDefaults ===");

        var w = window;
        var foundFn = null;
        for (var k in w) {
            if (k.startsWith("webpackChunk") && Array.isArray(w[k])) {
                w[k].forEach(function(chunk) {
                    if (chunk && chunk[1]) {
                        for (var mId in chunk[1]) {
                            var fnStr = chunk[1][mId].toString();
                            if (fnStr.indexOf("RunActionNodeDefaults") >= 0) {
                                console.log("Found module with RunActionNodeDefaults: ID=" + mId);
                                var idx = fnStr.indexOf("RunActionNodeDefaults");
                                console.log(fnStr.substring(idx - 100, idx + 600));
                            }
                        }
                    }
                });
            }
        }

    } catch(e) { console.error("[ERROR]", e.message); }
})();
