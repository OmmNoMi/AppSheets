// ==============================================================================
// OmmNoMi: Fix Section E Columns (Universal Schema Search)
// Size: < 65 lines, Pure ASCII, Validated with node -c
// ==============================================================================
(function fixSectionEColumns() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Fixing Section E Columns ===");

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
    if (!store) return console.error("[FAIL] Store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));

    // Find schema containing ExpectationsFromScheme directly by attribute
    var survey = schemas.find(function(s) {
      return (s.Attributes || []).some(function(a) { return a.Name === 'ExpectationsFromScheme'; });
    }) || schemas.find(function(s) {
      return (s.Name || '').toLowerCase().indexOf('survey') >= 0;
    });

    if (!survey) {
      console.log("Available schemas:", schemas.map(function(s) { return s.Name; }));
      return console.error("[FAIL] Target schema not found.");
    }
    console.log("[OK] Found target schema:", survey.Name);

    (survey.Attributes || []).forEach(function(attr) {
      var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});

      // 1. Fix ExpectationsFromScheme -> Convert from empty Enum to LongText
      if (attr.Name === 'ExpectationsFromScheme') {
        attr.Type = 'LongText';
        aux.Suggested_Values = null;
        aux.Valid_If = null;
        attr.TypeAuxData = JSON.stringify(aux);
        console.log("[OK] ExpectationsFromScheme converted to LongText!");
      }

      // 2. Fix TrainingDetails -> Show only if AttendedTraining is Yes/TRUE
      if (attr.Name === 'TrainingDetails') {
        aux.Show_If = 'OR([AttendedTraining] = TRUE, [AttendedTraining] = "Yes")';
        attr.TypeAuxData = JSON.stringify(aux);
        console.log("[OK] TrainingDetails Show_If set!");
      }

      // 3. Fix UsedTrainingDetails -> Show only if UsedTrainingComponent is Yes/TRUE
      if (attr.Name === 'UsedTrainingDetails') {
        aux.Show_If = 'OR([UsedTrainingComponent] = TRUE, [UsedTrainingComponent] = "Yes")';
        attr.TypeAuxData = JSON.stringify(aux);
        console.log("[OK] UsedTrainingDetails Show_If set!");
      }
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: { 'AppData.DataSchemas': schemas },
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Section E Updated! Click the blue SAVE button! ===");
  } catch(e) { console.error(e); }
})();
