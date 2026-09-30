// ==============================================================================
// Chunk 2: Configure 6 Buttons & Save (< 55 lines, Pure ASCII)
// ==============================================================================
(function chunk2SetupButtons() {
  try {
    var store = window.appStore;
    if (!store) return console.error("[FAIL] Store not found.");

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

    list.forEach(function(item, idx) {
      var name = item[0], varId = item[1], icon = item[2], form = item[3];
      var target = 'LINKTOFORM("' + form + '", "Survey_ID", [_THISROW].[ID])';
      var settings = {
        "NavigateTarget": target,
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };
      var act = {
        "Name": name,
        "Table": "Survey",
        "ReferencedTable": "Survey",
        "ActionType": "NAVIGATE_APP",
        "DisplayName": '=LOOKUP("' + varId + '", "AppVariables", "ID", "Label")',
        "Icon": icon,
        "Prominence": "Display_Prominently",
        "Visibility": "ADVANCED",
        "IsValid": true,
        "ActionOrder": 250 + idx,
        "ActionSettings": JSON.stringify(settings)
      };

      var ex = actions.findIndex(function(a) { return a && a.Name === name; });
      if (ex >= 0) actions[ex] = act; else actions.push(act);
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: { 'AppData.DataActions': actions },
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("[OK] Chunk 2 Done: 6 Buttons Configured! Ab Blue SAVE button dabayein!");
  } catch(e) { console.error(e); }
})();
