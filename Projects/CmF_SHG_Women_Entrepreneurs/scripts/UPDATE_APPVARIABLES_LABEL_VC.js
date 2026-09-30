// ==============================================================================
// OmmNoMi AppVariables Label Virtual Column Updater
// AppSheet Native: Uses IF(ISNOTBLANK(...)) because COALESCE does not exist in AppSheet
// Protocol: SOP A4 (Redux Dispatch) & SOP A5 (DevTools Pure ASCII)
// ==============================================================================
(function updateAppVariablesLabelVC() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Updating AppVariables Label Virtual Column ===");

    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length; i++) {
        var k = Object.keys(els[i]).find(function(key) {
          return key.startsWith('__reactFiber') || key.startsWith('__reactInternalInstance');
        });
        if (k) {
          var f = els[i][k];
          while (f) {
            if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
              store = f.memoizedProps.store;
              break;
            }
            f = f.return;
          }
          if (store) break;
        }
      }
    }

    if (!store) {
      console.error("[FAIL] Redux store not found. Please open AppSheet editor.");
      return;
    }

    var state = store.getState();
    var history = state.appTemplate && state.appTemplate.history;
    var appData = history && history[0] && history[0].appTemplate && history[0].appTemplate.AppData;
    var schemas = appData && appData.DataSchemas;

    if (!schemas) {
      console.error("[FAIL] DataSchemas not found in Redux state.");
      return;
    }

    var avIdx = -1;
    for (var s = 0; s < schemas.length; s++) {
      if (schemas[s].Name === "AppVariables") {
        avIdx = s;
        break;
      }
    }

    if (avIdx === -1) {
      console.error("[FAIL] Table AppVariables not found in DataSchemas.");
      return;
    }

    var attrs = schemas[avIdx].Attributes;
    var labelIdx = -1;
    var idIdx = -1;

    for (var a = 0; a < attrs.length; a++) {
      if (attrs[a].Name === "Label") labelIdx = a;
      if (attrs[a].Name === "ID") idIdx = a;
    }

    var newFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_RAJ", "Rajasthani", "raj")), IF(ISNOTBLANK([Title_raj]), [Title_raj], IF(ISNOTBLANK([Title_hi]), [Title_hi], [Title])), IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("LANG_HI", "Hindi", "hi")), IF(ISNOTBLANK([Title_hi]), [Title_hi], [Title]), TRUE, [Title])';
    var nameValueDict = {};
    var prefix = "AppData.DataSchemas[" + avIdx + "].Attributes[";

    if (labelIdx !== -1) {
      nameValueDict[prefix + labelIdx + "].AppFormula"] = newFormula;
      nameValueDict[prefix + labelIdx + "].IsLabel"] = true;
      nameValueDict[prefix + labelIdx + "].IsKey"] = false;
      nameValueDict[prefix + labelIdx + "].Type"] = "Text";
    }

    if (idIdx !== -1) {
      nameValueDict[prefix + idIdx + "].IsKey"] = true;
      nameValueDict[prefix + idIdx + "].IsLabel"] = false;
    }

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] AppVariables Label formula updated successfully!");
    console.log("[OK] Click SAVE in AppSheet editor to commit changes.");
  } catch (err) {
    console.error("[ERROR]", err.message);
  }
})();
