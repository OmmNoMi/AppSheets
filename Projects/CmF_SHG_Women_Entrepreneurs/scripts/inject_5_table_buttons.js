/**
 * ==============================================================================
 * OmmNoMi Automation LLP — Sub-Table Action Buttons Injector
 * Creates 5 Navigation Action Buttons on Survey table (matching Section button style)
 * ==============================================================================
 */

(function injectSubTableActionButtons() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Sub-Table Action Buttons Injector ===");

    var store = window.appStore;
    if (!store) {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'));
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { window.appStore = f.memoizedProps.store; break; }
          if (f.stateNode?.store?.dispatch) { window.appStore = f.stateNode.store; break; }
          f = f.return;
        }
        if (window.appStore) break;
      }
      store = window.appStore;
    }

    if (!store) {
      console.error("[FAIL] AppSheet Store nahi mila.");
      return;
    }

    var state = store.getState();
    var appTemplate = state.appTemplate?.history?.[0]?.appTemplate;
    var existingActions = appTemplate?.AppData?.DataActions || [];

    // Find a navigation template action to clone C# types safely
    var navTemplate = existingActions.find(function(a) {
      var at = a.ActionType || '';
      return at.indexOf('LINK') >= 0 || at.indexOf('view') >= 0 || (a.Name || '').indexOf('Open_Section') >= 0;
    });

    if (!navTemplate) {
      console.log("[INFO] Using default standard action template.");
      navTemplate = existingActions[0] || {};
    }

    var buttonsToCreate = [
      {
        name: 'Open_Table_Labor',
        target: 'LINKTOFILTEREDVIEW("Survey_Labor_Inline", [Survey_ID] = [_THISROW].[ID])',
        dName: '=LOOKUP("SEC_C_TBL_LABOR", "AppVariables", "ID", "Label")',
        icon: 'users'
      },
      {
        name: 'Open_Table_Turnover',
        target: 'LINKTOFILTEREDVIEW("Survey_Turnover_Inline", [Survey_ID] = [_THISROW].[ID])',
        dName: '=LOOKUP("SEC_C_TBL_TURNOVER", "AppVariables", "ID", "Label")',
        icon: 'dollar'
      },
      {
        name: 'Open_Table_Capital',
        target: 'LINKTOFILTEREDVIEW("Survey_Capital_Arrangement_Inline", [Survey_ID] = [_THISROW].[ID])',
        dName: '=LOOKUP("SEC_C_TBL_CAP_ARRANGE", "AppVariables", "ID", "Label")',
        icon: 'briefcase'
      },
      {
        name: 'Open_Table_Loan_Usage',
        target: 'LINKTOFILTEREDVIEW("Survey_Loan_Usage_Inline", [Survey_ID] = [_THISROW].[ID])',
        dName: '=LOOKUP("SEC_C_TBL_LOAN_USE", "AppVariables", "ID", "Label")',
        icon: 'credit-card'
      },
      {
        name: 'Open_Table_Business_Changes',
        target: 'LINKTOFILTEREDVIEW("Survey_Business_Changes_Inline", [Survey_ID] = [_THISROW].[ID])',
        dName: '=LOOKUP("SEC_C_TBL_BUSINESS_CHANGES", "AppVariables", "ID", "Label")',
        icon: 'trending-up'
      }
    ];

    var nameValueDict = {};
    var startIdx = existingActions.length;
    var createdCount = 0;

    buttonsToCreate.forEach(function(btn, i) {
      // Check if action already exists
      var existsIdx = existingActions.findIndex(function(a) { return a.Name === btn.name; });
      var targetIdx = existsIdx >= 0 ? existsIdx : (startIdx + createdCount);

      // Deep clone template
      var newAction = JSON.parse(JSON.stringify(navTemplate));
      newAction.Name = btn.name;
      newAction.Table = 'Survey';
      newAction.ReferencedTable = 'Survey';
      newAction.DisplayName = btn.dName;
      newAction.Icon = btn.icon;
      newAction.Prominence = 'DISPLAY_PROMINENTLY';

      // Set target view formula
      if (newAction.ActionDefinition) {
        newAction.ActionDefinition.ViewName = btn.target;
      }

      nameValueDict['AppData.DataActions[' + targetIdx + ']'] = newAction;
      if (existsIdx < 0) createdCount++;
      console.log("[OK] Prepared Action Button: " + btn.name);
    });

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] 5 Navigation Action Buttons injected! SAVE button active! ===");
  } catch (e) {
    console.error("[ERROR]", e);
  }
})();
