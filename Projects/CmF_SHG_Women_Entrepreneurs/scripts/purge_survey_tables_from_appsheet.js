/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Purge Obsolete 'Survey_Tables' from AppSheet Redux
 * Fixes: "Data table 'Survey_Tables' is not accessible: Unable to parse range 'Survey_Tables'"
 * ==============================================================================
 */

(function purgeSurveyTablesFromAppSheet() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Purging Obsolete 'Survey_Tables' from AppSheet ===");

    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { window.appStore = f.memoizedProps.store; return window.appStore; }
          if (f.stateNode?.store?.dispatch) { window.appStore = f.stateNode.store; return window.appStore; }
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) {
      console.error("[ERROR] Store nahi mila. Page refresh karke dobara run karein.");
      return;
    }

    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var dict = {};

    // 1. Remove Survey_Tables from DataSchemas
    var schemas = (h.AppData.DataSchemas || []).filter(s => s.Name !== 'Survey_Tables');
    dict['AppData.DataSchemas'] = schemas;

    // 2. Remove slices of Survey_Tables
    var slices = (h.AppData.TableSlices || []).filter(s => s.SourceTable !== 'Survey_Tables');
    dict['AppData.TableSlices'] = slices;

    // 3. Remove actions referencing Survey_Tables
    var actions = (h.AppData.DataActions || []).filter(a => {
      if (a.Table === 'Survey_Tables') return false;
      if (a.ActionDefinition && a.ActionDefinition.ReferencedTable === 'Survey_Tables') return false;
      return true;
    });
    dict['AppData.DataActions'] = actions;

    // 4. Remove VCs on Survey referencing Survey_Tables
    schemas.forEach(function(s, sIdx) {
      if (s.Name === 'Survey') {
        var attrs = (s.Attributes || []).filter(attr => {
          if (attr.Name === 'Related Survey_Tables') return false;
          if (attr.AppFormula && attr.AppFormula.indexOf('Survey_Tables') >= 0) return false;
          return true;
        });
        dict['AppData.DataSchemas[' + sIdx + '].Attributes'] = attrs;
      }
    });

    // 5. Remove Views on Survey_Tables
    var controls = (h.Presentation.Controls || []).filter(c => {
      var t = c.ViewDefinition?.Table;
      if (t === 'Survey_Tables' || t === 'Slice_Q6_Labor' || t === 'Slice_Q15_Turnover' || t === 'Slice_Q22_Trajectory') return false;
      return true;
    });
    dict['Presentation.Controls'] = controls;

    // 6. Dispatch & Activate Save Button
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] Purged 'Survey_Tables' from AppSheet! Click SAVE to commit ===");
  } catch (err) {
    console.error("[OmmNoMi ERROR]", err.message);
  }
})();
