import json

js_code = '''// ==============================================================================
// OmmNoMi: Create Sub-Table Buttons on Survey & Hide ID / Survey_ID Columns
// 1. Injects 6 Direct Form Action Buttons on Survey Detail
// 2. Binds buttons to all Survey Detail views in Presentation.Controls
// 3. Hides ID and Survey_ID in all 6 Sub-Tables (Show_If = FALSE, Editable_If = FALSE)
// 4. Sets UNIQUEID() on ID and Ref to Survey with IsPartOf=true on Survey_ID
// ==============================================================================
(function createSubTableButtonsAndHideKeys() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Sub-Table Buttons & Key Hiding Engine ===");

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

    var schemas = h.AppData && h.AppData.DataSchemas;
    if (!schemas) return console.error("[FAIL] DataSchemas not found.");

    var schemaMap = {};
    schemas.forEach(function(s, idx) {
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = { schema: s, idx: idx };
      schemaMap[clean] = { schema: s, idx: idx };
      if (s.TableName) schemaMap[s.TableName] = { schema: s, idx: idx };
    });

    var nameValueDict = {};
    var count = 0;

    // --------------------------------------------------------------------------
    // PART 1: HIDE ID & SURVEY_ID IN ALL 6 SUB-TABLES (NOT EDITABLE & HIDDEN)
    // --------------------------------------------------------------------------
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

        // 1a. Primary Key: ID
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
          count += 8;
        }

        // 1b. Foreign Key: Survey_ID
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
          count += 9;
        }
      });
      console.log("[OK] Hid ID & Survey_ID in table: " + tbl);
    });

    console.log("[OK] Successfully hidden " + hiddenColsCount + " key columns across all sub-tables!");

    // --------------------------------------------------------------------------
    // PART 2: CREATE 6 SUB-TABLE BUTTONS ON SURVEY
    // --------------------------------------------------------------------------
    var actions = (h.AppData && h.AppData.DataActions) ? JSON.parse(JSON.stringify(h.AppData.DataActions)) : [];

    // Find an existing section navigation button as template
    var templateAct = actions.find(function(a) {
      return (a.Name || '').indexOf('Section') >= 0 || (a.ActionType || '').indexOf('LINK') >= 0;
    }) || actions[0] || {};

    var btnDefs = [
      { name: 'Btn_Labor', title: '+ Add Labor (Q6)', icon: 'users', form: 'Survey_Labor_Form' },
      { name: 'Btn_Turnover', title: '+ Add Turnover (Q15)', icon: 'dollar', form: 'Survey_Turnover_Form' },
      { name: 'Btn_Capital', title: '+ Add Capital (Q17)', icon: 'briefcase', form: 'Survey_Capital_Arrangement_Form' },
      { name: 'Btn_Capital_Loans', title: '+ Add Loans (Q17)', icon: 'credit-card', form: 'Survey_Capital_Loans_Form' },
      { name: 'Btn_Loan_Usage', title: '+ Add Loan Usage (Q18)', icon: 'calculator', form: 'Survey_Loan_Usage_Form' },
      { name: 'Btn_Business_Changes', title: '+ Add Changes (Q20)', icon: 'trending-up', form: 'Survey_Business_Changes_Form' }
    ];

    var btnNames = [];

    btnDefs.forEach(function(b, idx) {
      btnNames.push(b.name);
      var targetFormula = 'LINKTOFORM("' + b.form + '", "Survey_ID", [_THISROW].[ID])';

      var actDef = {
        "$type": (templateAct.ActionDefinition && templateAct.ActionDefinition["$type"]) ? templateAct.ActionDefinition["$type"] : "Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes",
        "Target": targetFormula,
        "ViewName": targetFormula,
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      };

      var act = JSON.parse(JSON.stringify(templateAct));
      act.Name = b.name;
      act.Table = 'Survey';
      act.ReferencedTable = 'Survey';
      act.ActionType = templateAct.ActionType || 'LINK_TO';
      act.DisplayName = b.title;
      act.Icon = b.icon;
      act.Prominence = 'Display_Prominently';
      act.Visibility = 'ADVANCED';
      act.IsValid = true;
      act.ActionOrder = 250 + idx;
      act.ActionDefinition = actDef;
      act.ActionSettings = JSON.stringify(actDef);

      var existIdx = actions.findIndex(function(a) { return a && a.Name === b.name; });
      if (existIdx >= 0) {
        actions[existIdx] = act;
      } else {
        actions.push(act);
      }
    });

    nameValueDict['AppData.DataActions'] = actions;

    // --------------------------------------------------------------------------
    // PART 3: BIND BUTTONS TO SURVEY DETAIL VIEWS
    // --------------------------------------------------------------------------
    var controls = (h.Presentation && h.Presentation.Controls) ? JSON.parse(JSON.stringify(h.Presentation.Controls)) : [];
    var boundDetailCount = 0;

    controls.forEach(function(ctrl) {
      var tbl = ctrl.TableOrFolderName || (ctrl.ViewDefinition && ctrl.ViewDefinition.TableOrFolderName) || '';
      var typ = ctrl.ViewType || (ctrl.ViewDefinition && ctrl.ViewDefinition.ViewType) || ctrl.Type || '';
      var name = (ctrl.Name || '').toLowerCase();

      // Attach buttons to Survey Detail view
      if (tbl === 'Survey' && (typ.toLowerCase().indexOf('detail') >= 0 || name.indexOf('detail') >= 0)) {
        if (ctrl.ViewDefinition) {
          var vActions = (ctrl.ViewDefinition.Actions || []).slice();
          btnNames.forEach(function(bn) { if (vActions.indexOf(bn) === -1) vActions.push(bn); });
          ctrl.ViewDefinition.Actions = vActions;
        }
        var rootActions = (ctrl.Actions || []).slice();
        btnNames.forEach(function(bn) { if (rootActions.indexOf(bn) === -1) rootActions.push(bn); });
        ctrl.Actions = rootActions;
        boundDetailCount++;
      }

      // Remove ID and Survey_ID from Form & Detail views of Sub-Tables if ColumnOrder exists
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

    // --------------------------------------------------------------------------
    // PART 4: DISPATCH BATCH REDUX UPDATE & ACTIVATE SAVE
    // --------------------------------------------------------------------------
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
    console.log("=== [SUCCESS] Sub-Table Buttons Created & Keys Hidden!      ===");
    console.log("=== Bound 6 Action Buttons to " + boundDetailCount + " Survey Detail View(s)!  ===");
    console.log("=== Hid 'ID' & 'Survey_ID' from all 6 Sub-Table Forms!       ===");
    console.log("=== [ACTION] Click the blue SAVE button in AppSheet top right! ===");
    console.log("===============================================================");
  } catch (err) {
    console.error("[ERROR]", err);
  }
})();
'''

out_path = 'projects/CmF_SHG_Women_Entrepreneurs/scripts/create_subtable_buttons_and_hide_keys.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"File created: {out_path} ({len(js_code)} bytes, {len(js_code.splitlines())} lines)")
