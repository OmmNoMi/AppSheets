// ==============================================================================
// OmmNoMi: Fix ActionDefinition Prominence & Complete Setup (< 60 lines)
// ==============================================================================
(function fixProminenceAndActions() {
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
    if (!store) return console.error("[FAIL] Store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var actions = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataActions) || []));

    var list = [
      ['Btn_Labor', 'SEC_C_TBL_LABOR', 'users', 'Survey_Labor_Form'],
      ['Btn_Turnover', 'SEC_C_TBL_TURNOVER', 'dollar', 'Survey_Turnover_Form'],
      ['Btn_Capital', 'SEC_C_TBL_CAP_ARRANGE', 'briefcase', 'Survey_Capital_Arrangement_Form'],
      ['Btn_Capital_Loans', 'SEC_C_TBL_CAPITAL_LOANS', 'credit-card', 'Survey_Capital_Loans_Form'],
      ['Btn_Loan_Usage', 'SEC_C_TBL_LOAN_USE', 'calculator', 'Survey_Loan_Usage_Form'],
      ['Btn_Business_Changes', 'SEC_C_TBL_BUSINESS_CHANGES', 'trending-up', 'Survey_Business_Changes_Form']
    ];

    list.forEach(function(it, idx) {
      var actDef = {
        "NavigateTarget": 'LINKTOFORM("' + it[3] + '", "Survey_ID", [_THISROW].[ID])',
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };
      var act = {
        "Name": it[0], "Table": "Survey", "ReferencedTable": "Survey", "ActionType": "NAVIGATE_APP",
        "DisplayName": '=LOOKUP("' + it[1] + '", "AppVariables", "ID", "Label")',
        "Icon": it[2], "Prominence": "Display_Prominently", "Visibility": "ADVANCED", "IsValid": true,
        "ActionOrder": 250 + idx, "ActionDefinition": actDef, "ActionSettings": JSON.stringify(actDef)
      };
      var ex = actions.findIndex(function(a) { return a && a.Name === it[0]; });
      if (ex >= 0) actions[ex] = act; else actions.push(act);
    });

    // Self-healing: Ensure every action in the entire app has valid ActionDefinition
    actions.forEach(function(a) {
      if (a && !a.ActionDefinition && a.ActionSettings) {
        try { a.ActionDefinition = JSON.parse(a.ActionSettings); } catch(e) {}
      }
      if (a && a.ActionDefinition && !a.ActionDefinition.Prominence) {
        a.ActionDefinition.Prominence = a.Prominence || "Display_Prominently";
      }
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: { 'AppData.DataActions': actions },
      recordHistory: true, ignoreConstraints: false, skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("[OK] Prominence fixed for all actions! Blue SAVE button dabayein!");
  } catch(e) { console.error(e); }
})();
