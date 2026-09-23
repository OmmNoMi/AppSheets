// =========================================================================
// OmmNoMi: Inspect updateAppProcessNode and insertNewNode source code
// Size: Under 40 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function inspectProcessNodeCode() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Inspecting updateAppProcessNode & Tasks ===");

        // Search Webpack modules for updateAppProcessNode or insertNewNode
        var w = window;
        var foundSources = [];
        for (var k in w) {
            if (k.startsWith("webpackChunk") && Array.isArray(w[k])) {
                w[k].forEach(function(chunk) {
                    if (chunk && chunk[1]) {
                        for (var mId in chunk[1]) {
                            var fnStr = chunk[1][mId].toString();
                            if (fnStr.indexOf("updateAppProcessNode") >= 0 || fnStr.indexOf("insertNewNode") >= 0) {
                                // Extract the snippet around insertNewNode or updateAppProcessNode
                                var idx = fnStr.indexOf("insertNewNode");
                                if (idx >= 0) {
                                    foundSources.push(fnStr.substring(idx - 50, idx + 400));
                                }
                                var idx2 = fnStr.indexOf("updateAppProcessNode");
                                if (idx2 >= 0) {
                                    foundSources.push(fnStr.substring(idx2 - 50, idx2 + 400));
                                }
                            }
                        }
                    }
                });
            }
        }

        console.log("Found source snippets (" + foundSources.length + "):");
        foundSources.slice(0, 3).forEach(function(src, i) {
            console.log("--- Snippet " + i + " ---");
            console.log(src);
        });

    } catch(e) { console.error("[ERROR]", e.message); }
})();
