(function injectSurveyFormButtons() {
  try {
    var store = window.appStore;
    if (!store) {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var k = Object.keys(all[i]).find(x => x.startsWith('__reactFiber'));
        var f = k ? all[i][k] : null;
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
          f = f.return;
        }
        if (store) break;
      }
    }
    if (!store) return console.error("[FAIL] Store not found. Click inside AppSheet editor first.");

    var state = store.getState();
    var h = state.appTemplate.history[0].appTemplate;
    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];
    var tpl = actions.find(a => (a.ActionType||'').indexOf('LINK') >= 0 || (a.Name||'').indexOf('Section') >= 0) || actions[0] || {};

    var defs = [
      ['Btn_Add_Labor', '+ Add Labor (Q6)', 'users', 'LINKTOFORM("Survey_Labor_Form", "Survey_ID", [_THISROW].[ID])'],
      ['Btn_Add_Turnover', '+ Add Turnover (Q15)', 'dollar', 'LINKTOFORM("Survey_Turnover_Form", "Survey_ID", [_THISROW].[ID])'],
      ['Btn_Add_Capital', '+ Add Capital (Q17)', 'briefcase', 'LINKTOFORM("Survey_Capital_Arrangement_Form", "Survey_ID", [_THISROW].[ID])'],
      ['Btn_Add_Loan_Usage', '+ Add Loan Usage (Q18)', 'credit-card', 'LINKTOFORM("Survey_Loan_Usage_Form", "Survey_ID", [_THISROW].[ID])'],
      ['Btn_Add_Business_Changes', '+ Add Changes (Q20)', 'trending-up', 'LINKTOFORM("Survey_Business_Changes_Form", "Survey_ID", [_THISROW].[ID])']
    ];

    var btnNames = [];
    defs.forEach(function(d, i) {
      btnNames.push(d[0]);
      var actDef = { "$type": (tpl.ActionDefinition && tpl.ActionDefinition["$type"]) || "Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes", "Target": d[3], "ViewName": d[3], "Prominence": "DISPLAY_PROMINENTLY", "ModifiesData": false };
      var act = JSON.parse(JSON.stringify(tpl));
      act.Name = d[0]; act.DisplayName = d[1]; act.Icon = d[2]; act.Table = 'Survey'; act.ReferencedTable = 'Survey';
      act.ActionType = tpl.ActionType || 'LINK_TO'; act.Prominence = 'DISPLAY_PROMINENTLY'; act.Visibility = 'ALWAYS'; act.IsValid = true;
      act.ActionOrder = 250 + i; act.ActionDefinition = actDef; act.ActionSettings = JSON.stringify(actDef);
      var idx = actions.findIndex(a => a && a.Name === d[0]);
      if (idx >= 0) actions[idx] = act; else actions.push(act);
    });

    var controls = (h.Presentation && h.Presentation.Controls) ? JSON.parse(JSON.stringify(h.Presentation.Controls)) : [];
    controls.forEach(function(c) {
      var t = c.TableOrFolderName || (c.ViewDefinition && c.ViewDefinition.TableOrFolderName) || '';
      var n = ((c.Name || '') + ' ' + (c.ViewType || '')).toLowerCase();
      if (t === 'Survey' && n.indexOf('detail') >= 0) {
        if (c.ViewDefinition) {
          var va = (c.ViewDefinition.Actions || []).slice();
          btnNames.forEach(b => { if (va.indexOf(b) === -1) va.push(b); });
          c.ViewDefinition.Actions = va;
        }
        var ra = (c.Actions || []).slice();
        btnNames.forEach(b => { if (ra.indexOf(b) === -1) ra.push(b); });
        c.Actions = ra;
      }
    });

    var dict = { 'AppData.DataActions': actions, 'Presentation.Controls': controls };
    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("[OK] 5 Buttons attached to Survey Detail! Click blue SAVE in AppSheet.");
  } catch(e) { console.error("[ERROR]", e.message); }
})();
