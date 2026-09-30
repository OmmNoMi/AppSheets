(function fixAndDisplayButtonsNow() {
  try {
    var store = window.appStore;
    if (!store) {
      document.querySelectorAll('*').forEach(function(el) {
        var k = Object.keys(el).find(function(x) { return x.startsWith('__reactFiber'); });
        var f = k ? el[k] : null;
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { store = f.memoizedProps.store; window.appStore = store; return; }
          f = f.return;
        }
      });
    }
    if (!store) return console.error('[FAIL] Store not found. Editor me click karein.');

    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var actions = h.AppData.DataActions || [];
    
    // 1. Find Open_Section_A or any working Section button template
    var secTpl = actions.find(function(a) {
      return (a.Name || '').toLowerCase().indexOf('section_a') >= 0 || (a.DisplayName || '').indexOf('Section A') >= 0;
    }) || actions.find(function(a) {
      return (a.Name || '').indexOf('Section') >= 0;
    }) || actions[0];

    console.log('[INFO] Using template action:', secTpl.Name, '| Prominence:', secTpl.Prominence, '| ActionType:', secTpl.ActionType);

    // 2. Define the 5 Sub-Form Buttons with exact 🔘 styling
    var defs = [
      ['Btn_Labor', 'users', '🔘 Labor & Help (Q6)', 'LINKTOFILTEREDVIEW("Survey_Labor_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Turnover', 'dollar', '🔘 Turnover & Profit (Q15)', 'LINKTOFILTEREDVIEW("Survey_Turnover_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Capital', 'briefcase', '🔘 Capital Arranged (Q17)', 'LINKTOFILTEREDVIEW("Survey_Capital_Arrangement_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Loan_Usage', 'credit-card', '🔘 Loan Usage (Q18)', 'LINKTOFILTEREDVIEW("Survey_Loan_Usage_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Business_Changes', 'trending-up', '🔘 Business Changes (Q20)', 'LINKTOFILTEREDVIEW("Survey_Business_Changes_Inline", [Survey_ID] = [_THISROW].[ID])']
    ];

    var dict = {};
    var btnNames = [];

    defs.forEach(function(d) {
      var name = d[0];
      btnNames.push(name);
      var idx = actions.findIndex(function(a) { return a.Name === name; });
      if (idx === -1) idx = actions.length + btnNames.length;

      var act = JSON.parse(JSON.stringify(secTpl));
      act.Name = name;
      act.Table = 'Survey';
      act.ReferencedTable = 'Survey';
      act.Icon = d[1];
      act.DisplayName = d[2];
      act.Prominence = secTpl.Prominence || 'Display prominently';
      act.ActionType = secTpl.ActionType;
      if (act.ActionDefinition) {
        act.ActionDefinition.ViewName = d[3];
      }
      dict['AppData.DataActions[' + idx + ']'] = act;
    });

    // 3. Attach to ALL Detail views for Survey
    var controls = h.Presentation?.Controls || [];
    controls.forEach(function(c, cIdx) {
      var n = (c.Name || '').toLowerCase();
      var t = (c.TableOrFolderName || c.ViewDefinition?.TableOrFolderName || '');
      if (t === 'Survey' && (n.indexOf('detail') >= 0 || c.ViewType === 'Detail')) {
        var viewDef = c.ViewDefinition || c;
        var actList = (viewDef.Actions || []).slice();
        btnNames.forEach(function(bn) {
          if (actList.indexOf(bn) === -1) actList.push(bn);
        });
        dict['Presentation.Controls[' + cIdx + '].ViewDefinition.Actions'] = actList;
        dict['Presentation.Controls[' + cIdx + '].Actions'] = actList;
        console.log('[OK] Bound 5 buttons to view:', c.Name);
      }
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('=== [SUCCESS] 5 Buttons perfectly configured and attached to Detail card! Click SAVE! ===');
  } catch(e) { console.error('[ERROR]', e); }
})();
