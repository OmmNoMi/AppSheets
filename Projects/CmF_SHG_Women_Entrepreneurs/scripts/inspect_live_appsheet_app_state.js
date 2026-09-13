(function setupAppSheetInspector() {
  try {
    // 1. Discover Redux Store
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length && !store; i++) {
        var keys = Object.keys(els[i]);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].startsWith('__reactFiber')) {
            var f = els[i][keys[k]];
            while (f && !store) {
              if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                store = f.memoizedProps.store;
              }
              f = f.return;
            }
            break;
          }
        }
      }
    }
    if (!store) {
      console.error("[FAIL] Redux store not found! Make sure AppSheet Editor is open.");
      return;
    }

    var state = store.getState();
    var appTemplate = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) ? state.appTemplate.history[0].appTemplate : null;
    if (!appTemplate) {
      console.error("[FAIL] AppTemplate not found in store.");
      return;
    }

    // Attach Search Function to Window
    window.searchAppSheet = function(query) {
      if (!query) { console.warn("[WARN] Please provide a search term e.g. searchAppSheet('Year')"); return; }
      var q = query.toLowerCase();
      var schemas = appTemplate.AppData ? appTemplate.AppData.DataSchemas : [];
      var matches = [];

      schemas.forEach(function(s) {
        if (s.Name.toLowerCase().indexOf(q) !== -1 || s.TableName.toLowerCase().indexOf(q) !== -1) {
          matches.push({ type: "Table", table: s.Name, details: s.TableName });
        }
        if (s.Attributes) {
          s.Attributes.forEach(function(a) {
            var name = a.Name || "";
            var formula = a.AppFormula || "";
            var valid = a.Valid_If || a.ValidIf || "";
            var init = a.InitialValue || "";
            var disp = a.DisplayName || "";
            if (name.toLowerCase().indexOf(q) !== -1 || formula.toLowerCase().indexOf(q) !== -1 || valid.toLowerCase().indexOf(q) !== -1 || init.toLowerCase().indexOf(q) !== -1 || disp.toLowerCase().indexOf(q) !== -1) {
              matches.push({
                type: "Column",
                table: s.Name,
                column: name,
                colType: a.Type,
                formula: formula || null,
                validIf: valid || null,
                initialValue: init || null,
                displayName: disp || null,
                range: (a.Min || a.Max || a.NumericTypeSettings) ? { min: a.Min, max: a.Max, settings: a.NumericTypeSettings } : null
              });
            }
          });
        }
      });

      console.log("=== SEARCH RESULTS FOR: '" + query + "' (" + matches.length + " matches) ===");
      console.table(matches);
      return matches;
    };

    // Full Report Function
    window.runAppSheetAudit = function() {
      var report = {
        appName: appTemplate.AppInfo ? appTemplate.AppInfo.Name : "Unknown",
        appId: appTemplate.AppInfo ? appTemplate.AppInfo.Id : "Unknown",
        tables: [],
        yearAndRangeConfigs: [],
        virtualColumns: [],
        views: []
      };

      var schemas = appTemplate.AppData ? appTemplate.AppData.DataSchemas : [];
      schemas.forEach(function(s) {
        var tInfo = { name: s.Name, tableName: s.TableName, totalCols: s.Attributes ? s.Attributes.length : 0 };
        report.tables.push(tInfo);

        if (s.Attributes) {
          s.Attributes.forEach(function(a) {
            var colLower = (a.Name || "").toLowerCase();
            if (colLower.indexOf("year") !== -1 || a.Type === "Progress" || a.Min || a.Max || (a.NumericTypeSettings && (a.NumericTypeSettings.Min || a.NumericTypeSettings.Max))) {
              report.yearAndRangeConfigs.push({
                table: s.Name,
                column: a.Name,
                type: a.Type,
                initialValue: a.InitialValue,
                validIf: a.Valid_If || a.ValidIf,
                range: { min: a.Min, max: a.Max, step: a.Step, settings: a.NumericTypeSettings }
              });
            }
            if (a.AppFormula && (!a.ColumnIndex && a.ColumnIndex !== 0)) {
              report.virtualColumns.push({ table: s.Name, column: a.Name, type: a.Type, formula: a.AppFormula });
            }
          });
        }
      });

      var controls = appTemplate.Presentation ? appTemplate.Presentation.Controls : [];
      controls.forEach(function(c) {
        report.views.push({ name: c.Name, type: c.ViewType, table: c.ForTable, pos: c.Position });
      });

      window.__APPSHEET_STATE_REPORT__ = report;

      console.log("=== APPSHEET LIVE AUDIT SUMMARY ===");
      console.log("[APP]: " + report.appName + " (" + report.appId + ")");
      console.log("[TOTAL TABLES]: " + report.tables.length);
      console.table(report.tables);

      console.log("=== YEAR & RANGE CONFIGURATIONS ===");
      console.table(report.yearAndRangeConfigs);

      console.log("=== VIRTUAL COLUMNS (" + report.virtualColumns.length + ") ===");
      console.table(report.virtualColumns.slice(0, 15));

      console.log("=== VIEWS (" + report.views.length + ") ===");
      console.table(report.views);

      console.log("[INFO] Ready! You can now run:");
      console.log("  * searchAppSheet('Year') -> to search any column/formula");
      console.log("  * copy(window.__APPSHEET_STATE_REPORT__) -> to copy full report to clipboard");
      return report;
    };

    // Auto-run once
    return window.runAppSheetAudit();

  } catch (e) {
    console.error("[ERROR]", e.message);
  }
})();
