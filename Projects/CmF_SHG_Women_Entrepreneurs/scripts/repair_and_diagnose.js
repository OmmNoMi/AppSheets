// ==============================================================================
// OmmNoMi: Diagnose Error 400 & Clean Invalid Redux Properties
// ==============================================================================
(function diagnoseAndClean() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Diagnosing Error 400 & Cleaning Schema ===");

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
    if (!store) return console.error("[FAIL] Store not found.");

    var state = store.getState();
    var h = (state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || state.appTemplate.current;

    console.log("--- 1. LAST SAVE ERROR / STATUS ---");
    console.log("lastSaveError:", state.appTemplate && state.appTemplate.lastSaveError);
    console.log("saveStatus:", state.appTemplate && state.appTemplate.saveStatus);
    if (state.errors) console.log("state.errors:", state.errors);

    console.log("--- 2. INSPECTING EXISTING NATIVE ACTIONS ---");
    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];
    var sampleNative = actions.find(function(a) { return a && a.Name && a.Name.indexOf('Btn_') === -1; });
    if (sampleNative) {
      console.log("Sample Native Action keys:", Object.keys(sampleNative));
      console.log("Sample Native Action object:", JSON.stringify(sampleNative, null, 2));
    }

    console.log("--- 3. INSPECTING CURRENT BTN_CAPITAL ---");
    var btnCap = actions.find(function(a) { return a && a.Name === 'Btn_Capital'; });
    if (btnCap) {
      console.log("Btn_Capital object:", JSON.stringify(btnCap, null, 2));
    }

    console.log("--- 4. CLEANING INVALID ATTRIBUTE PROPERTIES IN SCHEMAS ---");
    var schemas = (h.AppData && h.AppData.DataSchemas) ? JSON.parse(JSON.stringify(h.AppData.DataSchemas)) : [];
    var cleanedPropsCount = 0;

    schemas.forEach(function(s) {
      (s.Attributes || []).forEach(function(attr) {
        var invalidKeys = ['Show_If', 'ShowIf', 'Editable_If', 'EditableIf', 'Show'];
        invalidKeys.forEach(function(ik) {
          if (attr.hasOwnProperty(ik)) {
            delete attr[ik];
            cleanedPropsCount++;
          }
        });
        // Make sure ID and Survey_ID are properly hidden using native IsHidden
        if (attr.Name === 'ID') {
          attr.IsHidden = true;
          attr.IsReadOnly = true;
          attr.IsKey = true;
        }
        if (attr.Name === 'Survey_ID') {
          attr.IsHidden = true;
          attr.IsReadOnly = true;
          attr.Type = 'Ref';
          attr.ReferencedTableName = 'Survey';
          attr.IsPartOf = true;
        }
      });
    });
    console.log("[OK] Cleaned " + cleanedPropsCount + " invalid top-level properties from DataSchemas!");

    // Check Action configuration
    console.log("--- 5. RE-CONFIGURING 6 NAVIGATION ACTIONS ---");
    var btnDefs = [
      { name: 'Btn_Labor', title: '=LOOKUP("SEC_C_TBL_LABOR", "AppVariables", "ID", "Label")', icon: 'users', form: 'Survey_Labor_Form' },
      { name: 'Btn_Turnover', title: '=LOOKUP("SEC_C_TBL_TURNOVER", "AppVariables", "ID", "Label")', icon: 'dollar', form: 'Survey_Turnover_Form' },
      { name: 'Btn_Capital', title: '=LOOKUP("SEC_C_TBL_CAP_ARRANGE", "AppVariables", "ID", "Label")', icon: 'briefcase', form: 'Survey_Capital_Arrangement_Form' },
      { name: 'Btn_Capital_Loans', title: '=LOOKUP("SEC_C_TBL_CAPITAL_LOANS", "AppVariables", "ID", "Label")', icon: 'credit-card', form: 'Survey_Capital_Loans_Form' },
      { name: 'Btn_Loan_Usage', title: '=LOOKUP("SEC_C_TBL_LOAN_USE", "AppVariables", "ID", "Label")', icon: 'calculator', form: 'Survey_Loan_Usage_Form' },
      { name: 'Btn_Business_Changes', title: '=LOOKUP("SEC_C_TBL_BUSINESS_CHANGES", "AppVariables", "ID", "Label")', icon: 'trending-up', form: 'Survey_Business_Changes_Form' }
    ];

    btnDefs.forEach(function(b, idx) {
      var targetFormula = 'LINKTOFORM("' + b.form + '", "Survey_ID", [_THISROW].[ID])';
      var settingsObj = {
        "NavigateTarget": targetFormula,
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
        "DisplayName": b.title,
        "Icon": b.icon,
        "Prominence": "Display_Prominently",
        "Visibility": "ADVANCED",
        "IsValid": true,
        "ActionOrder": 250 + idx,
        "ActionSettings": JSON.stringify(settingsObj)
      };

      var existIdx = actions.findIndex(function(a) { return a && a.Name === b.name; });
      if (existIdx >= 0) {
        actions[existIdx] = act;
      } else {
        actions.push(act);
      }
    });

    var dict = {};
    dict['AppData.DataSchemas'] = schemas;
    dict['AppData.DataActions'] = actions;

    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] Schema Cleaned & Actions Re-Configured! ===");
    console.log("=== Click Save in AppSheet now and see if Error 400 is gone! ===");
  } catch(err) {
    console.error("[ERROR]", err);
  }
})();
