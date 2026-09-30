(function setFamilyDisplayNames() {
  try {
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) {
          return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance');
        });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
            window.appStore = f.memoizedProps.store;
            return window.appStore;
          }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
            window.appStore = f.stateNode.store;
            return window.appStore;
          }
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) { console.error("[FAIL] AppSheet Redux store not found."); return; }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) { console.error("[FAIL] AppTemplate not found."); return; }

    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var sIdx = schemas.findIndex(function(s) {
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'FamilyAdultsCount' || a.Name === 'FamilyMemberCount'; });
    });
    if (sIdx === -1) {
      sIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey');
      });
    }
    if (sIdx === -1) { console.error("[FAIL] Survey schema not found."); return; }

    var targets = {
      "FamilyMemberCount": '=LOOKUP("Q_B_05_00", "AppVariables", "ID", "Label")',
      "FamilyAdultsCount": '=LOOKUP("Q_B_06_01", "AppVariables", "ID", "Label")',
      "FamilyChildrenCount": '=LOOKUP("Q_B_06_02", "AppVariables", "ID", "Label")',
      "FamilyTotalEarning": '=LOOKUP("Q_B_06_03", "AppVariables", "ID", "Label")',
      "FamilyMaleEarning": '=LOOKUP("Q_B_06_04", "AppVariables", "ID", "Label")',
      "FamilyFemaleEarning": '=LOOKUP("Q_B_06_05", "AppVariables", "ID", "Label")',
      "FamilyDisabledCount": '=LOOKUP("Q_B_06_06", "AppVariables", "ID", "Label")'
    };

    var dict = {};
    var count = 0;
    var attrs = schemas[sIdx].Attributes || [];

    attrs.forEach(function(a, idx) {
      if (targets[a.Name]) {
        var f = targets[a.Name];
        var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "]";
        a.DisplayName = f;
        dict[p + ".DisplayName"] = f;
        count++;
        console.log("[OK] " + a.Name + " DisplayName set to: " + f);
      }
    });

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] Successfully updated DisplayName for " + count + " Family columns! Click SAVE in AppSheet.");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
