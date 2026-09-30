js_code = '''// ==============================================================================
// OmmNoMi: Perfect 'App: Go to another view' (LINKTOFORM) Sub-Table Buttons
// 1. Strict ActionType: 'LINK_TO' (App: go to another view within this app)
// 2. Strict C# Type: 'Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes'
// 3. Dynamic Multilingual DisplayName: =LOOKUP("SEC_C_TBL_...", "AppVariables", "ID", "Label")
// 4. Proper Icons: users, dollar, briefcase, credit-card, calculator, trending-up
// 5. Formula: LINKTOFORM("<Table>_Form", "Survey_ID", [_THISROW].[ID])
// 6. Bound to Survey Detail Views
// ==============================================================================
(function fixLinkToFormButtonsPerfect() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Configuring Perfect LINKTOFORM Navigation Buttons ===");

    // 1. Locate Redux Store
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
    if (!store) return console.error("[FAIL] Store not found! Editor me kisi column par click karein.");

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    if (!h) return console.error("[FAIL] appTemplate not found.");

    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];

    // Helper: ComponentId generator
    function makeId() {
      var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
      for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
      return r;
    }

    // 2. Define the 6 Buttons with exact dynamic names, formulas & icons
    var btnDefs = [
      {
        name: 'Btn_Labor',
        displayNameFormula: '=LOOKUP("SEC_C_TBL_LABOR", "AppVariables", "ID", "Label")',
        icon: 'users',
        targetFormula: 'LINKTOFORM("Survey_Labor_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Turnover',
        displayNameFormula: '=LOOKUP("SEC_C_TBL_TURNOVER", "AppVariables", "ID", "Label")',
        icon: 'dollar',
        targetFormula: 'LINKTOFORM("Survey_Turnover_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Capital',
        displayNameFormula: '=LOOKUP("SEC_C_TBL_CAP_ARRANGE", "AppVariables", "ID", "Label")',
        icon: 'briefcase',
        targetFormula: 'LINKTOFORM("Survey_Capital_Arrangement_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Capital_Loans',
        displayNameFormula: '=LOOKUP("SEC_C_TBL_CAPITAL_LOANS", "AppVariables", "ID", "Label")',
        icon: 'credit-card',
        targetFormula: 'LINKTOFORM("Survey_Capital_Loans_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Loan_Usage',
        displayNameFormula: '=LOOKUP("SEC_C_TBL_LOAN_USE", "AppVariables", "ID", "Label")',
        icon: 'calculator',
        targetFormula: 'LINKTOFORM("Survey_Loan_Usage_Form", "Survey_ID", [_THISROW].[ID])'
      },
      {
        name: 'Btn_Business_Changes',
        displayNameFormula: '=LOOKUP("SEC_C_TBL_BUSINESS_CHANGES", "AppVariables", "ID", "Label")',
        icon: 'trending-up',
        targetFormula: 'LINKTOFORM("Survey_Business_Changes_Form", "Survey_ID", [_THISROW].[ID])'
      }
    ];

    var btnNames = [];

    btnDefs.forEach(function(b, idx) {
      btnNames.push(b.name);

      // C# backend compliant DataActionLinkTo definition
      var actDef = {
        "$type": "Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes",
        "Target": b.targetFormula,
        "ViewName": b.targetFormula,
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
        "ActionType": "LINK_TO",
        "DisplayName": b.displayNameFormula,
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
        console.log("[UPDATE] Configured as 'Go to another view': " + b.name);
      } else {
        actions.push(act);
        console.log("[CREATE] Created 'Go to another view' button: " + b.name);
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
    console.log("=== [SUCCESS] All 6 Buttons Configured as 'Go to another view'! ===");
    console.log("=== Dynamic DisplayNames: =LOOKUP(...)                     ===");
    console.log("=== Target Formula: LINKTOFORM(...)                        ===");
    console.log("=== [ACTION] Click the blue SAVE button in AppSheet Editor!  ===");
    console.log("===============================================================");
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
'''

out_path = 'projects/CmF_SHG_Women_Entrepreneurs/scripts/fix_linktoform_buttons_perfect.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"File created: {out_path} ({len(js_code)} bytes, {len(js_code.splitlines())} lines)")
