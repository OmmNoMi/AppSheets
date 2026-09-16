// ==============================================================================
// OmmNoMi: Print exact schema of DataActionNavigateApp (< 25 lines)
// ==============================================================================
(function printNavigateAppSchema() {
  try {
    for (var k in window) {
      if (k.startsWith("webpackChunk") && Array.isArray(window[k])) {
        window[k].forEach(function(chunk) {
          if (chunk && chunk[1] && chunk[1][663518]) {
            var fnStr = chunk[1][663518].toString();
            var idx = fnStr.indexOf("DataActionNavigateApp");
            if (idx >= 0) {
              console.log("=== SCHEMA FOR DataActionNavigateApp ===");
              console.log(fnStr.substring(Math.max(0, idx - 150), idx + 350));
            }
          }
        });
      }
    }
  } catch(e) { console.error(e); }
})();
