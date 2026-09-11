(function applySectionFShowIf() {
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
      return s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed'; });
    });
    if (sIdx === -1) {
      sIdx = schemas.findIndex(function(s) {
        return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey' || (s.AppTable && s.AppTable.Name === 'Survey'));
      });
    }
    if (sIdx === -1) {
      console.error("[FAIL] Survey schema not found. Existing schemas:", schemas.map(function(s) { return s.Name; }));
      return;
    }

    var dict = {};
    var count = 0;
    var attrs = schemas[sIdx].Attributes || [];

    var socShowIf = '=AND(ISNOTBLANK([SocialPlatformsUsed]), NOT(IN("SOC_NONE", [SocialPlatformsUsed])))';

    var targets = {
      "SocialPlatformUsageMode": socShowIf,
      "SocialMediaFrequency": socShowIf,
      "QRDailyTransactions": '=[UseQRUPI] = "OPT_YES"',
      "QRNonUseReason": '=[UseQRUPI] = "OPT_NO"'
    };

    attrs.forEach(function(a, idx) {
      if (targets[a.Name]) {
        var f = targets[a.Name];
        var p = "AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "]";
        
        a.Show_If = f;
        a.ShowIf = f;
        dict[p + ".Show_If"] = f;
        dict[p + ".ShowIf"] = f;

        var auxObj = {};
        if (a.TypeAuxData) {
          try {
            auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData);
          } catch(e) {}
        }
        auxObj.Show_If = f;
        auxObj.ShowIf = f;
        var auxStr = JSON.stringify(auxObj);
        a.TypeAuxData = auxStr;
        dict[p + ".TypeAuxData"] = auxStr;
        
        count++;
        console.log("[OK] Configured Show_If for: " + a.Name + " => " + f);
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
    console.log("[OK] Successfully injected ID-based Show_If rules for " + count + " columns. Click SAVE in AppSheet!");
  } catch(err) {
    console.error("[ERROR]", err.message);
  }
})();
