// ==============================================================================
// OmmNoMi: Master Sub-Table Navigation & Key Hiding Engine
// 1. Strict ActionType: 'NAVIGATE_APP' (App: go to another view within this app)
// 2. Target Formula: NavigateTarget = '=LINKTOFORM("<SubTable>_Form", "Survey_ID", [_THISROW].[ID])'
// 3. Dynamic Multilingual DisplayName: '=LOOKUP("SEC_C_TBL_...", "AppVariables", "ID", "Label")'
// 4. UI Icons: users, dollar, briefcase, credit-card, calculator, trending-up
// 5. Hide & Lock 'ID' and 'Survey_ID' on all 6 Child Tables (Show_If=FALSE, Editable_If=FALSE)
// 6. Bind all 6 Action Buttons to Survey Detail View(s)
// ==============================================================================
(function masterConfigureSubTableButtonsAndHideKeys() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Master Sub-Table Buttons & Key Hiding Engine ===");

    // Step 1: Universal Store Discovery
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

    var nameValueDict = {};
    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var schemaMap = {};
    schemas.forEach(function(s, idx) { schemaMap[s.Name] = { schema: s, idx: idx }; });

    // Step 2: Hide & Lock ID and Survey_ID on all 6 Sub-Tables
    var subTables = [
      'Survey_Labor',
      'Survey_Turnover',
      'Survey_Capital_Arrangement',
      'Survey_Capital_Loans',
      'Survey_Loan_Usage',
      'Survey_Business_Changes'
    ];

    var hiddenColsCount = 0;
    subTables.forEach(function(tbl) {
      var item = schemaMap[tbl];
      if (!item) return;

      var sIdx = item.idx;
      var attrs = item.schema.Attributes || [];

      attrs.forEach(function(attr, aIdx) {
        var p = 'AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + ']';

        // Primary Key: ID
        if (attr.Name === 'ID') {
          attr.IsKey = true;
          attr.Show = false;
          attr.Show_If = 'FALSE';
          attr.ShowIf = 'FALSE';
          attr.Editable_If = 'FALSE';
          attr.EditableIf = 'FALSE';
          attr.IsReadOnly = true;
          if (!attr.InitialValue) attr.InitialValue = 'UNIQUEID()';

          nameValueDict[p + '.IsKey'] = true;
          nameValueDict[p + '.Show'] = false;
          nameValueDict[p + '.Show_If'] = 'FALSE';
          nameValueDict[p + '.ShowIf'] = 'FALSE';
          nameValueDict[p + '.Editable_If'] = 'FALSE';
          nameValueDict[p + '.EditableIf'] = 'FALSE';
          nameValueDict[p + '.IsReadOnly'] = true;
          nameValueDict[p + '.InitialValue'] = 'UNIQUEID()';
          hiddenColsCount++;
        }

        // Foreign Key: Survey_ID
        if (attr.Name === 'Survey_ID') {
          attr.Type = 'Ref';
          attr.ReferencedTableName = 'Survey';
          attr.IsPartOf = true;
          attr.Show = false;
          attr.Show_If = 'FALSE';
          attr.ShowIf = 'FALSE';
          attr.Editable_If = 'FALSE';
          attr.EditableIf = 'FALSE';
          attr.IsReadOnly = true;

          nameValueDict[p + '.Type'] = 'Ref';
          nameValueDict[p + '.ReferencedTableName'] = 'Survey';
          nameValueDict[p + '.IsPartOf'] = true;
          nameValueDict[p + '.Show'] = false;
          nameValueDict[p + '.Show_If'] = 'FALSE';
          nameValueDict[p + '.ShowIf'] = 'FALSE';
          nameValueDict[p + '.Editable_If'] = 'FALSE';
          nameValueDict[p + '.EditableIf'] = 'FALSE';
          nameValueDict[p + '.IsReadOnly'] = true;
          hiddenColsCount++;
        }
      });
      console.log("[OK] Hid ID & Survey_ID in table: " + tbl);
    });

    // Step 3: Define 6 Action Buttons with exact NAVIGATE_APP specification
    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];

    function makeId() {
      var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", r = "K";
      for (var i = 0; i < 26; i++) r += c.charAt(Math.floor(Math.random() * c.length));
      return r;
    }

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

    nameValueDict['AppData.DataActions'] = actions;

    // Step 4: Bind Buttons to Survey Detail Views & Remove ID/Survey_ID from SubTable Views
    var controls = (h.Presentation && h.Presentation.Controls) ? JSON.parse(JSON.stringify(h.Presentation.Controls)) : [];
    var boundCount = 0;

    controls.forEach(function(ctrl) {
      var tbl = ctrl.TableOrFolderName || (ctrl.ViewDefinition && ctrl.ViewDefinition.TableOrFolderName) || '';
      var typ = ctrl.ViewType || (ctrl.ViewDefinition && ctrl.ViewDefinition.ViewType) || ctrl.Type || '';
      var name = (ctrl.Name || '').toLowerCase();

      // Bind to Survey Detail view
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

      // Clean ID and Survey_ID from SubTable Form and Detail ColumnOrders
      if (subTables.indexOf(tbl) >= 0) {
        if (ctrl.ViewDefinition && ctrl.ViewDefinition.ColumnOrder) {
          ctrl.ViewDefinition.ColumnOrder = ctrl.ViewDefinition.ColumnOrder.filter(function(col) {
            return col !== 'ID' && col !== 'Survey_ID';
          });
        }
        if (ctrl.ColumnOrder) {
          ctrl.ColumnOrder = ctrl.ColumnOrder.filter(function(col) {
            return col !== 'ID' && col !== 'Survey_ID';
          });
        }
      }
    });

    nameValueDict['Presentation.Controls'] = controls;

    // Step 5: Dispatch Batch Redux Update & Activate Save
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
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
    console.log("=== [SUCCESS] Sub-Table Buttons & Key Hiding Configured!    ===");
    console.log("=== ActionType: NAVIGATE_APP (App: go to another view)      ===");
    console.log("=== Target: NavigateTarget = =LINKTOFORM(...)               ===");
    console.log("=== DisplayName: =LOOKUP(...) Multilingual                  ===");
    console.log("=== Hidden 'ID' and 'Survey_ID' on all 6 child sub-tables!  ===");
    console.log("=== Bound 6 Action Buttons to " + boundCount + " Survey Detail View(s)! ===");
    console.log("=== [ACTION] Click the blue SAVE button in AppSheet top right! ===");
    console.log("===============================================================");
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
