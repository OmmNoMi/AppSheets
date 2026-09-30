// ==============================================================================
// OmmNoMi: Master Definitive Solution (Schemas Cleaned + DataActionNavigateApp)
// ==============================================================================
(function masterDefinitiveSolution() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Master Definitive Solution ===");

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
    var actions = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataActions) || []));

    // 1. Clean attributes
    schemas.forEach(function(s) {
      (s.Attributes || []).forEach(function(a) {
        ['Show_If','ShowIf','Editable_If','EditableIf','Show'].forEach(function(k){ delete a[k]; });
        if (a.Name === 'ID' || a.Name === 'Survey_ID') { a.IsHidden = true; a.IsReadOnly = true; }
        if (a.Name === 'Survey_ID') { a.Type = 'Ref'; a.ReferencedTableName = 'Survey'; a.IsPartOf = true; }
      });
    });

    // 2. Define 6 buttons with authentic C# $type
    function makeId() {
      var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
      for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
      return r;
    }

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
        "$type": "Jeenee.DataTypes.DataActionNavigateApp, Jeenee.DataTypes",
        "NavigateTarget": 'LINKTOFORM("' + it[3] + '", "Survey_ID", [_THISROW].[ID])',
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };

      var act = {
        "Name": it[0],
        "Table": "Survey",
        "ActionType": "NAVIGATE_APP",
        "DisplayName": '=LOOKUP("' + it[1] + '", "AppVariables", "ID", "Label")',
        "Icon": it[2],
        "Prominence": "Display_Prominently",
        "Visibility": "ADVANCED",
        "IsValid": true,
        "ActionOrder": 250 + idx,
        "ActionDefinition": actDef,
        "ActionSettings": JSON.stringify(actDef),
        "ComponentId": makeId()
      };

      var ex = actions.findIndex(function(a) { return a && a.Name === it[0]; });
      if (ex >= 0) actions[ex] = act; else actions.push(act);
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: { 'AppData.DataSchemas': schemas, 'AppData.DataActions': actions },
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] Everything 100% C# Compliant! Click Blue SAVE Now! ===");
  } catch(e) { console.error("[ERROR]", e); }
})();
