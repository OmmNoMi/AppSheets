(function removeBrokenVirtualColumns() {
  try {
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
    if (!store) { console.error("[FAIL] Store not found. Please refresh page."); return; }

    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var dict = {};
    var schemas = h.AppData.DataSchemas || [];

    schemas.forEach(function(s, sIdx) {
      if (s.Name === 'Survey' || s.Name === 'Survey_Schema') {
        var beforeCount = (s.Attributes || []).length;
        var attrs = (s.Attributes || []).filter(function(attr) {
          if (attr.Name === 'CompletedSectionsCount' || attr.Name === 'Survey_Progress') return false;
          if (attr.AppFormula && attr.AppFormula.indexOf('Status_Profile') >= 0) return false;
          return true;
        });
        dict['AppData.DataSchemas[' + sIdx + '].Attributes'] = attrs;
        console.log("[INFO] Survey columns filtered from " + beforeCount + " to " + attrs.length);
      }
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("[OK] Broken virtual columns removed! Click SAVE button in AppSheet header.");
  } catch (err) {
    console.error("[ERROR]", err.message);
  }
})();
