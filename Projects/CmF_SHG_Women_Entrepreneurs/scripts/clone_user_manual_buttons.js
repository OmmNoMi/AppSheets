// ==============================================================================
// OmmNoMi: Clone Exact Manual User Actions from 'New Action' / 'Action_SecA'
// Size: < 68 lines, Pure ASCII, Validated with node -c
// ==============================================================================
(function cloneUserManualButtons() {
  try {
    console.clear();
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
    var actions = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataActions) || []));
    var template = actions.find(function(a) { return a && a.Name === 'New Action'; }) ||
                   actions.find(function(a) { return a && a.Name === 'Action_SecA'; });
    if (!template) return console.error("[FAIL] Base template not found.");

    function makeId() {
      var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
      for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
      return r;
    }

    var list = [
      ['Btn_Labor', 'SEC_C_TBL_LABOR', 'fa-users', 'Survey_Labor_Form'],
      ['Btn_Turnover', 'SEC_C_TBL_TURNOVER', 'fa-dollar', 'Survey_Turnover_Form'],
      ['Btn_Capital', 'SEC_C_TBL_CAP_ARRANGE', 'fa-briefcase', 'Survey_Capital_Arrangement_Form'],
      ['Btn_Capital_Loans', 'SEC_C_TBL_CAPITAL_LOANS', 'fa-credit-card', 'Survey_Capital_Loans_Form'],
      ['Btn_Loan_Usage', 'SEC_C_TBL_LOAN_USE', 'fa-calculator', 'Survey_Loan_Usage_Form'],
      ['Btn_Business_Changes', 'SEC_C_TBL_BUSINESS_CHANGES', 'fa-chart-line', 'Survey_Business_Changes_Form']
    ];

    list.forEach(function(it, idx) {
      var act = JSON.parse(JSON.stringify(template));
      var target = '=LINKTOFORM("' + it[3] + '", "Survey_ID", [_THISROW].[ID])';
      var actDef = {
        "$type": "Jeenee.DataTypes.DataActionNavigateApp, Jeenee.DataTypes",
        "NavigateTarget": target,
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };
      act.Name = it[0];
      act.DisplayName = '=LOOKUP("' + it[1] + '", "AppVariables", "ID", "Label")';
      act.Icon = it[2];
      act.ActionOrder = 250 + idx;
      act.ComponentId = makeId();
      act.ActionDefinition = actDef;
      act.ActionSettings = JSON.stringify(actDef);
      delete act.ValueEvaluatable;
      delete act.ConditionEvaluatable;
      delete act.Value;

      var ex = actions.findIndex(function(a) { return a && a.Name === it[0]; });
      if (ex >= 0) actions[ex] = act; else actions.push(act);
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: { 'AppData.DataActions': actions },
      recordHistory: true, ignoreConstraints: false, skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("[SUCCESS] Cloned 6 manual buttons from " + template.Name + "! Blue SAVE dabayein!");
  } catch(e) { console.error(e); }
})();
