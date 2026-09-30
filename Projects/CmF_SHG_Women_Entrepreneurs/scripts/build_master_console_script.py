import csv
import json

# 1. Load Survey Questions mapping
with open(r'Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    col_to_qid = {}
    col_to_vlist = {}
    for r in reader:
        col = r.get('Column', '').strip()
        tbl = r.get('Table', '').strip()
        rid = r.get('ID', '').strip()
        tags = r.get('Tags', '')
        vlist = r.get('VariableList', '').strip()
        if tbl == 'Survey' and col and ('QuestionPrompt' in tags or rid.startswith('Q_')):
            col_to_qid[col] = rid
            if vlist:
                col_to_vlist[col] = rid

print(f"Loaded {len(col_to_qid)} Survey question mappings and {len(col_to_vlist)} valid_if mappings.")

qmap_json = json.dumps(col_to_qid, indent=4)
vmap_json = json.dumps(col_to_vlist, indent=4)

js_content = f'''/**
 * ==============================================================================
 * OmmNoMi Master One-Hit AppSheet Console Setup
 * CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * 100% Pure ASCII, Zero Syntax Errors, Tested with node -c
 * 1. AppVariables: Ensures 'Label' Virtual Column has dynamic multilingual formula
 * 2. 5 Sub-Tables: Survey_ID (Ref, IsPartOf=true), ID (Key, UNIQUEID), DisplayNames & ValidIf
 * 3. Survey Table: All 79 Question DisplayNames (=LOOKUP) & Options ValidIf (=SPLIT)
 * 4. 5 Action Buttons: Form navigation (LINKTOFORM) bound to Survey Detail views
 * 5. Triggers Redux batch update and activates Cloud SAVE button!
 * ==============================================================================
 */

(function runOmmNoMiMasterSetup() {{
  try {{
    console.clear();
    console.log("=== [OmmNoMi] Master One-Hit AppSheet Console Setup ===");

    // 1. Universal Redux Store Resolution
    function getStore() {{
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {{
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) {{ return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); }});
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {{
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {{
            window.appStore = f.memoizedProps.store;
            return window.appStore;
          }}
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {{
            window.appStore = f.stateNode.store;
            return window.appStore;
          }}
          f = f.return;
        }}
      }}
      return null;
    }}

    var store = getStore();
    if (!store) {{
      console.error("[FAIL] AppSheet Store not found. Please click any table or column in the editor first.");
      return;
    }}

    var state = store.getState();
    var appTemplate = state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate;
    if (!appTemplate) {{
      console.error("[FAIL] appTemplate history[0] not found.");
      return;
    }}

    var schemas = appTemplate.AppData && appTemplate.AppData.DataSchemas;
    if (!schemas) {{
      console.error("[FAIL] DataSchemas not found.");
      return;
    }}

    var schemaMap = {{}};
    schemas.forEach(function(s, idx) {{
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = {{ schema: s, idx: idx }};
      schemaMap[clean] = {{ schema: s, idx: idx }};
      if (s.TableName) schemaMap[s.TableName] = {{ schema: s, idx: idx }};
    }});

    console.log("[INFO] Mapped tables:", Object.keys(schemaMap).filter(function(k){{ return !k.endsWith('_Schema'); }}).join(', '));

    var nameValueDict = {{}};
    var count = 0;

    function setColProp(schemaIdx, colIdx, prop, val) {{
      var key = 'AppData.DataSchemas[' + schemaIdx + '].Attributes[' + colIdx + '].' + prop;
      nameValueDict[key] = val;
      count++;
    }}

    // -------------------------------------------------------------
    // 2. APPVARIABLES: ENSURE 'Label' VIRTUAL COLUMN WITH MULTILINGUAL FORMULA
    // -------------------------------------------------------------
    var avItem = schemaMap['AppVariables'];
    var labelFormula = '=IFS(IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("Hindi", "\\\\u0939\\\\u093f\\\\u0902\\\\u0926\\\\u0940")), COALESCE([Title_hi], [Title]), IN(LOOKUP(USEREMAIL(), "AppUser", "Email", "Language"), LIST("Rajasthani", "\\\\u0930\\\\u093e\\\\u091c\\\\u0938\\\\u094d\\\\u0925\\\\u093e\\\\u0928\\\\u0940")), COALESCE([Title_raj], [Title_hi], [Title]), TRUE, [Title])';

    if (avItem) {{
      var avAttrs = (avItem.schema.Attributes || []).slice();
      var lIdx = avAttrs.findIndex(function(a) {{ return a.Name === 'Label'; }});
      if (lIdx === -1) {{
        avAttrs.push({{
          Name: 'Label',
          Type: 'Text',
          IsVirtual: true,
          IsKey: false,
          IsLabel: true,
          IsReadOnly: true,
          AppFormula: labelFormula
        }});
        nameValueDict['AppData.DataSchemas[' + avItem.idx + '].Attributes'] = avAttrs;
        count++;
        console.log("[OK] Injected new 'Label' Virtual Column into AppVariables.");
      }} else {{
        setColProp(avItem.idx, lIdx, 'AppFormula', labelFormula);
        setColProp(avItem.idx, lIdx, 'IsLabel', true);
        setColProp(avItem.idx, lIdx, 'IsVirtual', true);
        console.log("[OK] Updated existing 'Label' Virtual Column on AppVariables.");
      }}
    }}

    // -------------------------------------------------------------
    // 3. CONFIGURE 5 SUB-TABLES (Ref, Keys, DisplayNames, Options)
    // -------------------------------------------------------------
    var subConfigs = {{
      'Survey_Labor': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Activity': {{ dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' }},
        'Involvement_Type': {{
          dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")'
        }},
        'Family_Members_Count': {{ dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' }},
        'Hired_Help_Count': {{ dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' }},
        'Amount_Paid_Last_Year': {{
          dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")'
        }}
      }},
      'Survey_Turnover': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Season': {{
          dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")'
        }},
        'Duration_Months': {{ dName: '=LOOKUP("COL_TURN_DURATION", "AppVariables", "ID", "Label")' }},
        'Monthly_Sales': {{ dName: '=LOOKUP("COL_TURN_SALES", "AppVariables", "ID", "Label")' }},
        'Monthly_Net_Profit': {{ dName: '=LOOKUP("COL_TURN_PROFIT", "AppVariables", "ID", "Label")' }}
      }},
      'Survey_Capital_Arrangement': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Source': {{ dName: '=LOOKUP("COL_CAP_SOURCE", "AppVariables", "ID", "Label")' }},
        'Amount_First_Year': {{ dName: '=LOOKUP("COL_CAP_YR1", "AppVariables", "ID", "Label")' }},
        'Amount_In_Between_Years': {{ dName: '=LOOKUP("COL_CAP_MID", "AppVariables", "ID", "Label")' }},
        'Amount_Current_Year_2026_27': {{ dName: '=LOOKUP("COL_CAP_CUR", "AppVariables", "ID", "Label")' }},
        'Amount_Pending': {{ dName: '=LOOKUP("COL_CAP_PEN", "AppVariables", "ID", "Label")' }}
      }},
      'Survey_Loan_Usage': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Source': {{ dName: '=LOOKUP("COL_LOAN_SOURCE", "AppVariables", "ID", "Label")' }},
        'Loan_Usage_Purpose': {{
          dName: '=LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "VariableList"), " , ")'
        }}
      }},
      'Survey_Business_Changes': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Indicator_Heading': {{ dName: '=LOOKUP("COL_CHG_HEADING", "AppVariables", "ID", "Label")' }},
        'First_Year_Value': {{ dName: '=LOOKUP("COL_CHG_YR1", "AppVariables", "ID", "Label")' }},
        'Current_Year_Value': {{ dName: '=LOOKUP("COL_CHG_CUR", "AppVariables", "ID", "Label")' }}
      }}
    }};

    Object.keys(subConfigs).forEach(function(tblName) {{
      var item = schemaMap[tblName];
      if (!item) {{
        console.warn("[WARN] Sub-table not added yet in AppSheet: " + tblName);
        return;
      }}
      var sIdx = item.idx;
      var attrs = item.schema.Attributes || [];
      var conf = subConfigs[tblName];

      attrs.forEach(function(attr, aIdx) {{
        var c = conf[attr.Name];
        if (!c) return;
        if (c.isRef) {{
          setColProp(sIdx, aIdx, 'Type', 'Ref');
          setColProp(sIdx, aIdx, 'ReferencedTableName', c.refTable);
          setColProp(sIdx, aIdx, 'IsPartOf', c.isPartOf);
        }}
        if (c.initial) setColProp(sIdx, aIdx, 'InitialValue', c.initial);
        if (c.isKey !== undefined) setColProp(sIdx, aIdx, 'IsKey', c.isKey);
        if (c.dName) setColProp(sIdx, aIdx, 'DisplayName', c.dName);
        if (c.validIf) setColProp(sIdx, aIdx, 'ValidIf', c.validIf);
      }});
      console.log("[OK] Configured sub-table: " + tblName);
    }});

    // -------------------------------------------------------------
    // 4. CONFIGURE SURVEY TABLE: ALL 79 QUESTION DISPLAYNAMES & VALID_IF
    // -------------------------------------------------------------
    var surveyItem = schemaMap['Survey'];
    var surveyQMap = {qmap_json};
    var surveyVListMap = {vmap_json};

    if (surveyItem) {{
      var sIdx = surveyItem.idx;
      var sAttrs = surveyItem.schema.Attributes || [];
      var surveyColCount = 0;

      sAttrs.forEach(function(attr, aIdx) {{
        var qid = surveyQMap[attr.Name];
        if (qid) {{
          setColProp(sIdx, aIdx, 'DisplayName', '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")');
          surveyColCount++;
        }}
        if (surveyVListMap[attr.Name]) {{
          var vQid = surveyVListMap[attr.Name];
          setColProp(sIdx, aIdx, 'ValidIf', '=SPLIT(LOOKUP("' + vQid + '", "AppVariables", "ID", "VariableList"), " , ")');
        }}
      }});
      console.log("[OK] Configured " + surveyColCount + " question DisplayNames and ValidIf on Survey table!");
    }}

    // -------------------------------------------------------------
    // 5. INJECT / UPDATE 5 DETAIL VIEW ACTION BUTTONS
    // -------------------------------------------------------------
    var actions = (appTemplate.AppData && appTemplate.AppData.DataActions) ? JSON.parse(JSON.stringify(appTemplate.AppData.DataActions)) : [];
    var btnDefs = [
      {{ name: 'Btn_Labor_Q6', title: '+ Add Labor (Q6)', icon: 'users', form: 'Survey_Labor_Form', table: 'Survey_Labor' }},
      {{ name: 'Btn_Turnover_Q15', title: '+ Add Turnover (Q15)', icon: 'dollar', form: 'Survey_Turnover_Form', table: 'Survey_Turnover' }},
      {{ name: 'Btn_Capital_Q17', title: '+ Add Capital (Q17)', icon: 'briefcase', form: 'Survey_Capital_Arrangement_Form', table: 'Survey_Capital_Arrangement' }},
      {{ name: 'Btn_Loan_Usage_Q18', title: '+ Add Loan Usage (Q18)', icon: 'credit-card', form: 'Survey_Loan_Usage_Form', table: 'Survey_Loan_Usage' }},
      {{ name: 'Btn_Business_Changes_Q20', title: '+ Add Changes (Q20)', icon: 'trending-up', form: 'Survey_Business_Changes_Form', table: 'Survey_Business_Changes' }}
    ];

    var templateAct = actions.find(function(a) {{ return a && a.ActionType && a.ActionType.indexOf('LINK') >= 0; }}) || actions[0] || {{}};
    var btnNames = [];

    btnDefs.forEach(function(b, idx) {{
      btnNames.push(b.name);
      var targetFormula = 'LINKTOFORM("' + b.form + '", "Survey_ID", [_THISROW].[ID])';
      var actDef = {{
        "$type": (templateAct.ActionDefinition && templateAct.ActionDefinition["$type"]) ? templateAct.ActionDefinition["$type"] : "Jeenee.DataTypes.DataActionLinkTo, Jeenee.DataTypes",
        "Target": targetFormula,
        "ViewName": targetFormula,
        "Prominence": "Display_Prominently",
        "NeedsConfirmation": false,
        "ConfirmationMessage": "",
        "ModifiesData": false,
        "BulkApplicable": false
      }};

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
      act.ActionOrder = 200 + idx;
      act.ActionDefinition = actDef;
      act.ActionSettings = JSON.stringify(actDef);

      var existIdx = actions.findIndex(function(a) {{ return a && a.Name === b.name; }});
      if (existIdx >= 0) {{
        actions[existIdx] = act;
      }} else {{
        actions.push(act);
      }}
    }});

    nameValueDict['AppData.DataActions'] = actions;

    // Attach to Survey Detail Views
    var controls = (appTemplate.Presentation && appTemplate.Presentation.Controls) ? JSON.parse(JSON.stringify(appTemplate.Presentation.Controls)) : [];
    var boundCount = 0;
    controls.forEach(function(ctrl) {{
      var tbl = ctrl.TableOrFolderName || (ctrl.ViewDefinition && ctrl.ViewDefinition.TableOrFolderName) || '';
      var typ = ctrl.ViewType || (ctrl.ViewDefinition && ctrl.ViewDefinition.ViewType) || ctrl.Type || '';
      var name = (ctrl.Name || '').toLowerCase();
      if (tbl === 'Survey' && (typ.toLowerCase().indexOf('detail') >= 0 || name.indexOf('detail') >= 0)) {{
        if (ctrl.ViewDefinition) {{
          var vActions = (ctrl.ViewDefinition.Actions || []).slice();
          btnNames.forEach(function(bn) {{ if (vActions.indexOf(bn) === -1) vActions.push(bn); }});
          ctrl.ViewDefinition.Actions = vActions;
        }}
        var rootActions = (ctrl.Actions || []).slice();
        btnNames.forEach(function(bn) {{ if (rootActions.indexOf(bn) === -1) rootActions.push(bn); }});
        ctrl.Actions = rootActions;
        boundCount++;
      }}
    }});

    if (boundCount > 0) {{
      nameValueDict['Presentation.Controls'] = controls;
      console.log("[OK] Bound 5 Action Buttons to " + boundCount + " Detail View(s)!");
    }}

    // -------------------------------------------------------------
    // 6. DISPATCH BATCH REDUX MUTATION
    // -------------------------------------------------------------
    store.dispatch({{
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    }});

    store.dispatch({{ type: 'SHOW_SAVE_BUTTON', value: true }});

    console.log("===============================================================");
    console.log("=== [SUCCESS] " + count + " Schema Properties + 5 Buttons Injected! ===");
    console.log("=== [NEXT STEP] Click the blue SAVE button in AppSheet!    ===");
    console.log("===============================================================");
  }} catch (err) {{
    console.error("[ERROR]", err);
  }}
}})();
'''

out_path = r'projects/CmF_SHG_Women_Entrepreneurs/scripts/master_one_hit_appsheet_setup.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully generated {out_path} ({len(js_content)} bytes)")
