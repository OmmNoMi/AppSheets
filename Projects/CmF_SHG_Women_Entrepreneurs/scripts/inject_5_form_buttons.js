(function create5TableButtons() {
  try {
    var store = window.appStore;
    if (!store) {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber'); });
        var f = k ? el[k] : null;
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
          f = f.return;
        }
        if (store) break;
      }
    }
    if (!store) return console.error('[FAIL] Store not found. Click on any column in AppSheet first.');

    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var actions = h.AppData.DataActions || [];
    var tpl = actions.find(function(a) {
      return (a.Name || '').indexOf('Section') >= 0 || (a.ActionType || '').indexOf('LINK') >= 0;
    }) || actions[0];

    var defs = [
      ['Btn_Labor', 'users', '=LOOKUP("SEC_C_TBL_LABOR", "AppVariables", "ID", "Label")', 'LINKTOFILTEREDVIEW("Survey_Labor_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Turnover', 'dollar', '=LOOKUP("SEC_C_TBL_TURNOVER", "AppVariables", "ID", "Label")', 'LINKTOFILTEREDVIEW("Survey_Turnover_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Capital', 'briefcase', '=LOOKUP("SEC_C_TBL_CAP_ARRANGE", "AppVariables", "ID", "Label")', 'LINKTOFILTEREDVIEW("Survey_Capital_Arrangement_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Loan_Usage', 'credit-card', '=LOOKUP("SEC_C_TBL_LOAN_USE", "AppVariables", "ID", "Label")', 'LINKTOFILTEREDVIEW("Survey_Loan_Usage_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Business_Changes', 'trending-up', '=LOOKUP("SEC_C_TBL_BUSINESS_CHANGES", "AppVariables", "ID", "Label")', 'LINKTOFILTEREDVIEW("Survey_Business_Changes_Inline", [Survey_ID] = [_THISROW].[ID])']
    ];

    var dict = {};
    var baseIdx = actions.length;

    defs.forEach(function(d, i) {
      var act = JSON.parse(JSON.stringify(tpl));
      act.Name = d[0];
      act.Table = 'Survey';
      act.ReferencedTable = 'Survey';
      act.Icon = d[1];
      act.DisplayName = d[2];
      act.Prominence = 'DISPLAY_PROMINENTLY';
      if (act.ActionDefinition) act.ActionDefinition.ViewName = d[3];
      dict['AppData.DataActions[' + (baseIdx + i) + ']'] = act;
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('[SUCCESS] 5 Sub-Table Buttons Injected! Cloud SAVE button is active!');
  } catch(e) { console.error('[ERROR]', e); }
})();
