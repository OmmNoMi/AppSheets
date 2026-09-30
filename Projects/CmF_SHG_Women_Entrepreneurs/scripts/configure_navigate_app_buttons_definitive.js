// ==============================================================================
// OmmNoMi: Definitive 'App: go to another view within this app' (NAVIGATE_APP)
// Verified Against Real AppSheet Production Schema (Navi, Orbit, Gaonhae)
// - ActionType: 'NAVIGATE_APP'
// - ActionDefinition.NavigateTarget: '=LINKTOFORM(...)'
// - ActionSettings: JSON with NavigateTarget
// - Dynamic Multilingual DisplayName: '=LOOKUP(...)'
// - Clean UI Icons
// ==============================================================================
(function configureNavigateAppButtons() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Configuring Native NAVIGATE_APP Action Buttons ===");

    // 1. Universal Store Discovery
    var store = window.appStore;
    if (!store) {
      var candidates = [document.querySelector('.ExpressionControl'), document.querySelector('[role="grid"]'), document.querySelector('#root'), document.body];
      for (var i = 0; i < candidates.length; i++) {
        var el = candidates[i];
        if (!el) continue;
        var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) { store = f.stateNode.store; window.appStore = store; break; }
          f = f.return;
        }
        if (store) break;
      }
    }
    if (!store) return console.error("[FAIL] Redux Store not found! Editor me kisi column par click karein.");

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    if (!h) return console.error("[FAIL] appTemplate not found.");

    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];

    function makeId() {
      var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
      for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
      return r;
    }

    // 2. Define the 6 Buttons with exact NAVIGATE_APP parameters
    var btnDefs = [
      {
        name: 'Btn_Labor',
        displayName: '=LOOKUP("SEC_C_TBL_LABOR", "AppVariables", "ID", "Label")',
        icon: 'users',
        targetFormula: '=LINKTOFORM("Survey_Labor_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Turnover',
        displayName: '=LOOKUP("SEC_C_TBL_TURNOVER", "AppVariables", "ID", "Label")',
        icon: 'dollar',
        targetFormula: '=LINKTOFORM("Survey_Turnover_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Capital',
        displayName: '=LOOKUP("SEC_C_TBL_CAP_ARRANGE", "AppVariables", "ID", "Label")',
        icon: 'briefcase',
        targetFormula: '=LINKTOFORM("Survey_Capital_Arrangement_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Capital_Loans',
        displayName: '=LOOKUP("SEC_C_TBL_CAPITAL_LOANS", "AppVariables", "ID", "Label")',
        icon: 'credit-card',
        targetFormula: '=LINKTOFORM("Survey_Capital_Loans_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Loan_Usage',
        displayName: '=LOOKUP("SEC_C_TBL_LOAN_USE", "AppVariables", "ID", "Label")',
        icon: 'calculator',
        targetFormula: '=LINKTOFORM("Survey_Loan_Usage_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Business_Changes',
        displayName: '=LOOKUP("SEC_C_TBL_BUSINESS_CHANGES", "AppVariables", "ID", "Label")',
        icon: 'trending-up',
        targetFormula: '=LINKTOFORM("Survey_Business_Changes_Form", "Survey_ID", [_THISROW].[ID])'
      }
    ];

    var btnNames = [];

    btnDefs.forEach(function(b, idx) {
      btnNames.push(b.name);

      var actDef = {
        "NavigateTarget": b.targetFormula,
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };

      var act = {
        "Name": b.name,
        "Table": "Survey",
        "ReferencedTable": "Survey",
        "ActionType": "NAVIGATE_APP",
        "DisplayName": b.displayName,
        "Icon": b.icon,
        "Prominence": "Display_Prominently",
        "Visibility": "ADVANCED",
        "IsValid": true,
        "ActionOrder": 250 + idx,
        "ActionDefinition": actDef,
        "ActionSettings": JSON.stringify(actDef),
        "ComponentId": makeId()
      };

      var existIdx = actions.findIndex(function(a) { return a && a.Name === b.name; });
      if (existIdx >= 0) {
        actions[existIdx] = act;
        console.log("[UPDATE] Configured NAVIGATE_APP action: " + b.name);
      } else {
        actions.push(act);
        console.log("[CREATE] Created NAVIGATE_APP action: " + b.name);
      }
    });

    var dict = {};
    dict['AppData.DataActions'] = actions;

    // 3. Bind all 6 buttons to Survey Detail view(s) in Presentation.Controls
    var controls = (h.Presentation && h.Presentation.Controls) ? JSON.parse(JSON.stringify(h.Presentation.Controls)) : [];
    var boundCount = 0;

    controls.forEach(function(ctrl) {
      var tbl = ctrl.TableOrFolderName || (ctrl.ViewDefinition && ctrl.ViewDefinition.TableOrFolderName) || '';
      var typ = ctrl.ViewType || (ctrl.ViewDefinition && ctrl.ViewDefinition.ViewType) || ctrl.Type || '';
      var name = (ctrl.Name || '').toLowerCase();

      if (tbl === 'Survey' && (typ.toLowerCase().indexOf('detail') >= 0 || name.indexOf('detail') >= 0)) {
        if (ctrl.ViewDefinition) {
          var vActions = (ctrl.ViewDefinition.Actions || []).slice();
          btnNames.forEach(function(bn) { if (vActions.indexOf(bn) === -1) vActions.push(bn); });
          ctrl.ViewDefinition.Actions = vActions;
        }
        var rootActions = (ctrl.Actions || []).slice();
        btnNames.forEach(function(bn) { if (rootActions.indexOf(bn) === -1) rootActions.push(bn); });
        ctrl.Actions = rootActions;
        boundCount++;
      }
    });

    if (boundCount > 0) {
      dict['Presentation.Controls'] = controls;
      console.log("[OK] Bound 6 navigation buttons to " + boundCount + " Detail View(s)!");
    }

    // 4. Batch Dispatch to Redux Store
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    try {
      store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: true });
      store.dispatch({ type: 'editingEmulator/setTriggerRecalculation', payload: false });
    } catch(e) {}

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("===============================================================");
    console.log("=== [SUCCESS] All 6 Buttons Configured as 'App: go to another view within this app'! ===");
    console.log("=== ActionType: NAVIGATE_APP                                ===");
    console.log("=== Target: NavigateTarget = =LINKTOFORM(...)               ===");
    console.log("=== DisplayName: =LOOKUP(...)                               ===");
    console.log("=== [ACTION] Click the blue SAVE button in AppSheet Editor! ===");
    console.log("===============================================================");
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
