// =========================================================================
// OmmNoMi: Master 5 Sub-Table Buttons Injector for Survey Detail
// 100% Pure ASCII, C# Backend Deserializer Compliant
// =========================================================================
(function create5SubTableButtonsFinal() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Injecting 5 Sub-Table Form Action Buttons ===");

    // 1. Universal Redux Store Resolution
    var store = window.appStore;
    if (!store) {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) { return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps?.store?.dispatch) { store = f.memoizedProps.store; window.appStore = store; break; }
          if (f.stateNode?.store?.dispatch) { window.appStore = f.stateNode.store; window.appStore = store; break; }
          f = f.return;
        }
        if (store) break;
      }
    }

    if (!store) {
      console.error("[FAIL] AppSheet Store nahi mila. Editor me kisi column/view par click karein.");
      return;
    }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) {
      console.error("[FAIL] appTemplate not found in Redux state.");
      return;
    }

    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];
    console.log("[INFO] Total existing actions in app:", actions.length);

    // 2. Locate an existing Section Navigation Action as template
    var template = actions.find(function(a) {
      var at = (a.ActionType || '');
      var nm = (a.Name || '');
      var dn = (a.DisplayName || '');
      return at.indexOf('LINK') >= 0 || nm.indexOf('Section') >= 0 || dn.indexOf('Section') >= 0 || nm.indexOf('SEC_') >= 0;
    }) || actions.find(function(a) {
      return a.Table === 'Survey' && a.Prominence && a.Prominence.indexOf('Display') >= 0;
    }) || actions[0] || {};

    console.log("[INFO] Using template action:", template.Name || "default", "| ActionType:", template.ActionType);

    // Helper: ComponentId generator
    function makeId() {
      var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
      for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
      return r;
    }

    // 3. Define the 5 Matrix Sub-Table Buttons
    var buttonDefs = [
      {
        name: 'Btn_Labor_Q6',
        displayName: 'Labor & Help (Q6)',
        icon: 'users',
        target: 'LINKTOFILTEREDVIEW("Survey_Labor_Inline", [Survey_ID] = [_THISROW].[ID])'
      },
      {
        name: 'Btn_Turnover_Q15',
        displayName: 'Turnover & Profit (Q15)',
        icon: 'dollar',
        target: 'LINKTOFILTEREDVIEW("Survey_Turnover_Inline", [Survey_ID] = [_THISROW].[ID])'
      },
      {
        name: 'Btn_Capital_Q17',
        displayName: 'Capital Arranged (Q17)',
        icon: 'briefcase',
        target: 'LINKTOFILTEREDVIEW("Survey_Capital_Arrangement_Inline", [Survey_ID] = [_THISROW].[ID])'
      },
      {
        name: 'Btn_Loan_Usage_Q18',
        displayName: 'Loan Usage (Q18)',
        icon: 'credit-card',
        target: 'LINKTOFILTEREDVIEW("Survey_Loan_Usage_Inline", [Survey_ID] = [_THISROW].[ID])'
      },
      {
        name: 'Btn_Business_Changes_Q20',
        displayName: 'Business Changes (Q20)',
        icon: 'trending-up',
        target: 'LINKTOFILTEREDVIEW("Survey_Business_Changes_Inline", [Survey_ID] = [_THISROW].[ID])'
      }
    ];

    var btnNames = [];

    buttonDefs.forEach(function(b, idx) {
      btnNames.push(b.name);

      var actDef = {
        "$type": (template.ActionDefinition && template.ActionDefinition["$type"]) ? template.ActionDefinition["$type"] : "Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes",
        "Target": b.target,
        "ViewName": b.target,
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };

      var act = JSON.parse(JSON.stringify(template));
      act.Name = b.name;
      act.Table = 'Survey';
      act.ReferencedTable = 'Survey';
      act.ActionType = template.ActionType || 'LINK_TO';
      act.DisplayName = b.displayName;
      act.Icon = b.icon;
      act.Prominence = 'Display_Prominently';
      act.Visibility = 'ADVANCED';
      act.IsValid = true;
      act.ActionOrder = 200 + idx;
      act.ActionDefinition = actDef;
      act.ActionSettings = JSON.stringify(actDef);
      if (!act.ComponentId) act.ComponentId = makeId();

      var existIdx = actions.findIndex(function(a) { return a && a.Name === b.name; });
      if (existIdx >= 0) {
        actions[existIdx] = act;
        console.log("[UPDATE] Action updated:", b.name);
      } else {
        actions.push(act);
        console.log("[CREATE] Action created:", b.name);
      }
    });

    var dict = {};
    // CRITICAL: Replace whole DataActions array so Redux commits all elements!
    dict['AppData.DataActions'] = actions;

    // 4. Attach all 5 buttons to ALL Survey Detail Views in Presentation.Controls
    var controls = (h.Presentation && h.Presentation.Controls) ? JSON.parse(JSON.stringify(h.Presentation.Controls)) : [];
    var boundCount = 0;

    controls.forEach(function(ctrl, cIdx) {
      var tbl = ctrl.TableOrFolderName || (ctrl.ViewDefinition && ctrl.ViewDefinition.TableOrFolderName) || '';
      var typ = ctrl.ViewType || (ctrl.ViewDefinition && ctrl.ViewDefinition.ViewType) || ctrl.Type || '';
      var name = (ctrl.Name || '').toLowerCase();

      if (tbl === 'Survey' && (typ.toLowerCase().indexOf('detail') >= 0 || name.indexOf('detail') >= 0)) {
        console.log("[MATCH] Found Survey Detail View:", ctrl.Name);

        // Update ViewDefinition.Actions if present
        if (ctrl.ViewDefinition) {
          var vActions = (ctrl.ViewDefinition.Actions || []).slice();
          btnNames.forEach(function(bn) {
            if (vActions.indexOf(bn) === -1) vActions.push(bn);
          });
          ctrl.ViewDefinition.Actions = vActions;
        }

        // Update root Actions array if present
        var rootActions = (ctrl.Actions || []).slice();
        btnNames.forEach(function(bn) {
          if (rootActions.indexOf(bn) === -1) rootActions.push(bn);
        });
        ctrl.Actions = rootActions;

        boundCount++;
      }
    });

    if (boundCount > 0) {
      dict['Presentation.Controls'] = controls;
      console.log("[OK] Bound 5 buttons to " + boundCount + " Detail view(s)!");
    }

    // 5. Dispatch SET_EDITOR_OPTIONS & SHOW_SAVE_BUTTON
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=======================================================");
    console.log("[SUCCESS] 5 Form Action Buttons Injected Successfully!");
    console.log("[ACTION REQUIRED] Click the blue SAVE button in AppSheet!");
    console.log("=======================================================");
  } catch(e) {
    console.error("[ERROR]", e.message, e.stack);
  }
})();
