(function create5Buttons() {
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
    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];
    var tpl = actions.find(function(a) { return (a.ActionType||'').indexOf('LINK') >= 0 || (a.Name||'').indexOf('Section') >= 0; }) || actions[0] || {};
    
    var defs = [
      ['Btn_Labor_Q6', 'users', 'Labor & Help (Q6)', 'LINKTOFILTEREDVIEW("Survey_Labor_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Turnover_Q15', 'dollar', 'Turnover & Profit (Q15)', 'LINKTOFILTEREDVIEW("Survey_Turnover_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Capital_Q17', 'briefcase', 'Capital Arranged (Q17)', 'LINKTOFILTEREDVIEW("Survey_Capital_Arrangement_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Loan_Usage_Q18', 'credit-card', 'Loan Usage (Q18)', 'LINKTOFILTEREDVIEW("Survey_Loan_Usage_Inline", [Survey_ID] = [_THISROW].[ID])'],
      ['Btn_Business_Changes_Q20', 'trending-up', 'Business Changes (Q20)', 'LINKTOFILTEREDVIEW("Survey_Business_Changes_Inline", [Survey_ID] = [_THISROW].[ID])']
    ];

    var btnNames = [];
    defs.forEach(function(d) {
      btnNames.push(d[0]);
      var act = JSON.parse(JSON.stringify(tpl));
      act.Name = d[0]; act.Table = 'Survey'; act.ReferencedTable = 'Survey';
      act.Icon = d[1]; act.DisplayName = d[2]; act.Prominence = 'Display_Prominently';
      act.ActionType = tpl.ActionType || 'LINK_TO'; act.IsValid = true; act.Visibility = 'ADVANCED';
      var actDef = { "$type": "Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes", "Target": d[3], "ViewName": d[3], "Prominence": "Display_Prominently", "ModifiesData": false };
      act.ActionDefinition = actDef; act.ActionSettings = JSON.stringify(actDef);
      var idx = actions.findIndex(function(a) { return a && a.Name === d[0]; });
      if (idx >= 0) actions[idx] = act; else actions.push(act);
    });

    var dict = {};
    dict['AppData.DataActions'] = actions;

    var controls = (h.Presentation && h.Presentation.Controls) ? JSON.parse(JSON.stringify(h.Presentation.Controls)) : [];
    controls.forEach(function(c) {
      var n = (c.Name || '').toLowerCase();
      var t = c.TableOrFolderName || (c.ViewDefinition && c.ViewDefinition.TableOrFolderName) || '';
      if (t === 'Survey' && (n.indexOf('detail') >= 0 || (c.ViewType||'').toLowerCase().indexOf('detail') >= 0)) {
        if (c.ViewDefinition) {
          var va = (c.ViewDefinition.Actions || []).slice();
          btnNames.forEach(function(b) { if (va.indexOf(b) === -1) va.push(b); });
          c.ViewDefinition.Actions = va;
        }
        var ra = (c.Actions || []).slice();
        btnNames.forEach(function(b) { if (ra.indexOf(b) === -1) ra.push(b); });
        c.Actions = ra;
      }
    });
    dict['Presentation.Controls'] = controls;

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log('=== [SUCCESS] 5 Sub-Table Buttons Attached & Ready! Click SAVE! ===');
  } catch(e) { console.error('[ERROR]', e); }
})();
