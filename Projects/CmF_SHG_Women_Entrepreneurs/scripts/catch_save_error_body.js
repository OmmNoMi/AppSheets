// ==============================================================================
// OmmNoMi: Network Interceptor & Webpack Schema Extractor (< 50 lines)
// ==============================================================================
(function interceptAndDiagnose() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] 1. Intercepting Server Save Requests ===");

    // Intercept Fetch
    var origFetch = window.fetch;
    window.fetch = function() {
      return origFetch.apply(this, arguments).then(function(res) {
        if (!res.ok) {
          res.clone().text().then(function(txt) {
            console.error("=== [SERVER ERROR " + res.status + " DETAILS] ===");
            console.error(txt);
          });
        }
        return res;
      });
    };

    // Intercept XHR
    var origSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
      this.addEventListener('load', function() {
        if (this.status >= 400) {
          console.error("=== [XHR SERVER ERROR " + this.status + " DETAILS] ===");
          console.error(this.responseText);
        }
      });
      return origSend.apply(this, arguments);
    };

    console.log("[OK] Network interceptor ACTIVE! Click the Blue SAVE button now, and the exact server error will appear here!");

    console.log("=== 2. Checking Webpack for Action Schemas ===");
    for (var k in window) {
      if (k.startsWith("webpackChunk") && Array.isArray(window[k])) {
        window[k].forEach(function(chunk) {
          if (chunk && chunk[1]) {
            for (var modId in chunk[1]) {
              var str = chunk[1][modId].toString();
              if (str.indexOf("DataActionLinkTo") >= 0 || str.indexOf("NAVIGATE_APP") >= 0) {
                console.log("Found in module " + modId + ":");
                var m = str.match(/\{[^{}]*"ActionType"\s*:\s*"(NAVIGATE_APP|LINK_TO)"[^{}]*\}/g);
                if (m) m.slice(0, 3).forEach(function(x) { console.log(x); });
                var m2 = str.match(/Jeenee\.DataTypes\.DataAction[A-Za-z0-9_]+/g);
                if (m2) console.log("Classes:", Array.from(new Set(m2)));
              }
            }
          }
        });
      }
    }
  } catch(e) { console.error(e); }
})();
