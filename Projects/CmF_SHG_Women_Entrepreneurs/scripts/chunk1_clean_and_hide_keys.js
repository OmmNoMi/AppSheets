// ==============================================================================
// Chunk 1: Clean Schemas & Hide Keys (< 40 lines, Pure ASCII)
// ==============================================================================
(function chunk1CleanAndHide() {
  try {
    var store = window.appStore || (function() {
      var el = document.querySelector('.ExpressionControl') || document.querySelector('[role="grid"]') || document.body;
      var k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); });
      var f = el && el[k];
      while (f) {
        if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store;
        if (f.stateNode && f.stateNode.store) return f.stateNode.store;
        f = f.return;
      }
    })();
    if (!store) return console.error("[FAIL] Store not found. Editor me click karein.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));

    schemas.forEach(function(s) {
      (s.Attributes || []).forEach(function(attr) {
        ['Show_If', 'ShowIf', 'Editable_If', 'EditableIf', 'Show'].forEach(function(ik) {
          delete attr[ik];
        });
        if (attr.Name === 'ID') {
          attr.IsHidden = true;
          attr.IsReadOnly = true;
        }
        if (attr.Name === 'Survey_ID') {
          attr.IsHidden = true;
          attr.IsReadOnly = true;
          attr.Type = 'Ref';
          attr.ReferencedTableName = 'Survey';
          attr.IsPartOf = true;
        }
      });
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: { 'AppData.DataSchemas': schemas },
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    console.log("[OK] Chunk 1 Done: Schemas cleaned and keys hidden!");
  } catch(e) { console.error(e); }
})();
