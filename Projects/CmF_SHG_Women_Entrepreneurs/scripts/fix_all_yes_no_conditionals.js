// ==============================================================================
// OmmNoMi: Fix Yes/No Conditionals & Expectations (< 55 lines, Pure ASCII)
// ==============================================================================
(function fixAllYesNoAndExpectations() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Fixing Yes/No Conditionals (Sec E & F) ===");

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
    if (!store) return console.error("[FAIL] Redux store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));
    var survey = schemas.find(function(s) {
      return (s.Attributes || []).some(function(a) { return a.Name === 'UseQRUPI' || a.Name === 'ExpectationsFromScheme'; });
    });
    if (!survey) return console.error("[FAIL] Survey schema not found.");

    var r = {
      TrainingDetails: '=OR([AttendedTraining] = TRUE, [AttendedTraining] = "Yes", [AttendedTraining] = "OPT_YES", [AttendedTraining] = "Y")',
      UsedTrainingDetails: '=OR([UsedTrainingComponent] = TRUE, [UsedTrainingComponent] = "Yes", [UsedTrainingComponent] = "OPT_YES", [UsedTrainingComponent] = "Y")',
      QRDailyTransactions: '=OR([UseQRUPI] = TRUE, [UseQRUPI] = "Yes", [UseQRUPI] = "OPT_YES", [UseQRUPI] = "Y")',
      QRNonUseReason: '=OR([UseQRUPI] = FALSE, [UseQRUPI] = "No", [UseQRUPI] = "OPT_NO", [UseQRUPI] = "N")'
    };

    (survey.Attributes || []).forEach(function(attr) {
      var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{}') : (attr.TypeAuxData || {});
      if (attr.Name === 'ExpectationsFromScheme') {
        attr.Type = 'LongText';
        aux.LongTextFormatting = 'Plain Text';
        aux.Suggested_Values = null;
        aux.Valid_If = null;
        delete aux.EnumValues; delete aux.EnumInputMode;
        attr.TypeAuxData = JSON.stringify(aux);
      }
      if (r[attr.Name]) {
        aux.Show_If = r[attr.Name];
        attr.TypeAuxData = JSON.stringify(aux);
      }
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: { 'AppData.DataSchemas': schemas }, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] Done! Blue SAVE button enabled. Click SAVE in AppSheet! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
