/**
 * OmmNoMi: Inspect existing Action structure
 */
(function inspectAction() {
  try {
    var store = window.appStore;
    if (!store) {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { window.appStore = f.memoizedProps.store; break; }
          if (f.stateNode?.store?.dispatch) { window.appStore = f.stateNode.store; break; }
          f = f.return;
        }
        if (window.appStore) break;
      }
      store = window.appStore;
    }
    if (!store) { console.error("[FAIL] Store not found."); return; }
    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var actions = h.AppData?.DataActions || [];
    var navAction = actions.find(a => (a.ActionType || '').indexOf('LINK') >= 0 || (a.Name || '').indexOf('Open_Section') >= 0);
    if (navAction) {
      console.log("=== Found Navigation Action Template ===");
      console.log(JSON.stringify(navAction, null, 2));
    } else {
      console.log("No existing nav action found. Sample action:", JSON.stringify(actions[0], null, 2));
    }
  } catch (e) {
    console.error(e);
  }
})();
