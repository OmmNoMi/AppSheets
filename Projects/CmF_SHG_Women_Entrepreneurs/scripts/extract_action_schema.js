// =========================================================================
// OmmNoMi: Extract DataAction Schemas from Module 663518
// Size: Under 45 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function extractActionSchema() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Extracting DataAction Schemas from Module 663518 ===");

        var w = window;
        for (var k in w) {
            if (k.startsWith("webpackChunk") && Array.isArray(w[k])) {
                w[k].forEach(function(chunk) {
                    if (chunk && chunk[1] && chunk[1][663518]) {
                        var fnStr = chunk[1][663518].toString();
                        // Find all occurrences of DataAction
                        var matches = fnStr.match(/([A-Za-z0-9_]+DataAction[A-Za-z0-9_]*|DataAction[A-Za-z0-9_]+):\{[^\}]+"x-default-value":'([^']+)'/g);
                        if (matches) {
                            console.log("Found Action Defaults (" + matches.length + "):");
                            matches.forEach(function(m) { console.log(m); });
                        } else {
                            // Find any x-default-value containing ADD_ROW or DataAction
                            var reg = /"x-default-value":'(\{"\$type":"Jeenee\.DataTypes\.DataAction[^']+)'/g;
                            var m;
                            while ((m = reg.exec(fnStr)) !== null) {
                                console.log("Default Value:", m[1].substring(0, 300));
                            }
                        }
                    }
                });
            }
        }

    } catch(e) { console.error("[ERROR]", e.message); }
})();
