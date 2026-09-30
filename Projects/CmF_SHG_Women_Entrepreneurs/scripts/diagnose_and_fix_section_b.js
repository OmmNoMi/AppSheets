(function diagnoseAndFixSectionB() {
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
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'FamilyAdultsCount' || a.Name === 'SocialPlatformsUsed'; });
    });
    if (sIdx === -1) {
      sIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey');
      });
    }
    if (sIdx === -1) { console.error("[FAIL] Survey schema not found."); return; }

    var attrs = schemas[sIdx].Attributes || [];
    console.log("=== [DIAGNOSIS] Current Section B Attributes ===");
    attrs.forEach(function(a, idx) {
      if (a.Name.indexOf('Family') >= 0 || a.Name.indexOf('Adult') >= 0 || a.Name.indexOf('Child') >= 0 || a.Name.indexOf('Earn') >= 0) {
        console.log("Col[" + idx + "] Name: '" + a.Name + "' | DisplayName: '" + (a.DisplayName || "") + "' | ShowIf: '" + (a.Show_If || a.ShowIf || "") + "'");
      }
    });

    var dict = {};
    var count = 0;

    // Correct target mapping for Section B
    var correctMap = {
      "FamilyMemberCount": '=LOOKUP("Q_B_05_00", "AppVariables", "ID", "Title")',
      "FamilyAdultsCount": '=LOOKUP("Q_B_06_01", "AppVariables", "ID", "Title")',
      "FamilyChildrenCount": '=LOOKUP("Q_B_06_02", "AppVariables", "ID", "Title")',
      "FamilyTotalEarning": '=LOOKUP("Q_B_06_03", "AppVariables", "ID", "Title")',
      "FamilyMaleEarning": '=LOOKUP("Q_B_06_04", "AppVariables", "ID", "Title")',
      "FamilyFemaleEarning": '=LOOKUP("Q_B_06_05", "AppVariables", "ID", "Title")',
      "FamilyDisabledCount": '=LOOKUP("Q_B_06_06", "AppVariables", "ID", "Title")'
    };

    // Columns that might be duplicate/ghost columns
    var ghostNames = ["Adults (Above 18)", "Children", "Total earning members", "Male earning members", "Female earning members", "Members with disability"];

    attrs.forEach(function(a, idx) {
      var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "]";

      // If it's one of the official columns, fix its DisplayName
      if (correctMap[a.Name]) {
        var f = correctMap[a.Name];
        a.DisplayName = f;
        dict[p + ".DisplayName"] = f;
        count++;
      }

      // If it's a ghost/duplicate column, hide it
      if (ghostNames.indexOf(a.Name) >= 0) {
        a.Show_If = "FALSE";
        a.ShowIf = "FALSE";
        a.IsHidden = true;
        dict[p + ".Show_If"] = "FALSE";
        dict[p + ".ShowIf"] = "FALSE";
        dict[p + ".IsHidden"] = true;
        console.log("[FIX] Hidden ghost column: " + a.Name);
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
    console.log("[OK] Updated " + count + " Section B columns with correct Display Names! Click SAVE in AppSheet.");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
