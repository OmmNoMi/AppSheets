(function updateButtonsToForm() {
  try {
    var store = window.appStore;
    if (!store) {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var k = Object.keys(all[i]).find(function(x) { return x.startsWith('__reactFiber'); });
        var f = k ? all[i][k] : null;
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store) { store = f.memoizedProps.store; window.appStore = store; break; }
          f = f.return;
        }
        if (store) break;
      }
    }
    if (!store) return console.error('[FAIL] Store not found');

    var h = store.getState().appTemplate.history[0].appTemplate;
    var acts = h.AppData.DataActions || [];
    var dict = {};
    var defs = {
      'Btn_Labor': ['+ Add Labor (Q6)', 'LINKTOFORM("Survey_Labor_Form", "Survey_ID", [_THISROW].[ID])'],
      'Btn_Turnover': ['+ Add Turnover (Q15)', 'LINKTOFORM("Survey_Turnover_Form", "Survey_ID", [_THISROW].[ID])'],
      'Btn_Capital': ['+ Add Capital (Q17)', 'LINKTOFORM("Survey_Capital_Arrangement_Form", "Survey_ID", [_THISROW].[ID])'],
      'Btn_Loan_Usage': ['+ Add Loan Usage (Q18)', 'LINKTOFORM("Survey_Loan_Usage_Form", "Survey_ID", [_THISROW].[ID])'],
      'Btn_Business_Changes': ['+ Add Changes (Q20)', 'LINKTOFORM("Survey_Business_Changes_Form", "Survey_ID", [_THISROW].[ID])']
    };

    var updated = 0;
    acts.forEach(function(a, i) {
      if (defs[a.Name]) {
        var d = defs[a.Name];
        dict['AppData.DataActions[' + i + '].DisplayName'] = d[0];
        dict['AppData.DataActions[' + i + '].ActionDefinition.Target'] = d[1];
        dict['AppData.DataActions[' + i + '].ActionDefinition.ViewName'] = d[1];
        updated++;
      }
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('[SUCCESS] Converted ' + updated + ' buttons to direct FORM opening! Click SAVE in AppSheet!');
  } catch(e) { console.error('[ERROR]', e.message); }
})();
