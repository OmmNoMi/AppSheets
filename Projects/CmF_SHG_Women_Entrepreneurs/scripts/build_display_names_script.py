import csv, json

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_REFINED_76Q.csv', encoding='utf-8-sig') as f:
    rows = list(csv.DictReader(f))

rules = {}
for r in rows:
    q_id = r.get('ID','').strip()
    col = r.get('Column','').strip()
    v_type = r.get('ValueControl','').strip()
    v_list = r.get('VariableList','').strip()
    if q_id.startswith('Q_') and col:
        rule = {
            'qId': q_id,
            'displayName': f'=LOOKUP("{q_id}", "AppVariables", "ID", "Label")'
        }
        if v_type in ['Enum', 'EnumList'] and v_list:
            rule['type'] = v_type
            rule['isEnumList'] = (v_type == 'EnumList')
            rule['validIf'] = f'=SPLIT(LOOKUP("{q_id}", "AppVariables", "ID", "VariableList"), " , ")'
        elif v_type in ['Number', 'Text', 'Phone', 'Price', 'Decimal']:
            rule['type'] = v_type
        rules[col] = rule

# Also add system columns
system_cols = {
    'Status': {'qId': 'COL_STATUS', 'displayName': '=LOOKUP("COL_STATUS", "AppVariables", "ID", "Label")', 'type': 'Enum', 'validIf': '=SPLIT(LOOKUP("COL_STATUS", "AppVariables", "ID", "VariableList"), " , ")'},
    'Language': {'qId': 'COL_LANGUAGE', 'displayName': '=LOOKUP("COL_LANGUAGE", "AppVariables", "ID", "Label")', 'type': 'Enum', 'validIf': '=SPLIT(LOOKUP("COL_LANGUAGE", "AppVariables", "ID", "VariableList"), " , ")'},
    'Date': {'displayName': 'Survey Date', 'type': 'Date'},
    'InvestigatorID': {'displayName': 'Investigator', 'type': 'Ref', 'refTable': 'AppUser'}
}
rules.update(system_cols)

js_content = '''(function injectSurveyDisplayNamesAndEnumRefs() {
  try {
    function getStore() {
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) {
          return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance');
        });
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
            window.appStore = f.memoizedProps.store;
            return window.appStore;
          }
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
            window.appStore = f.stateNode.store;
            return window.appStore;
          }
          f = f.return;
        }
      }
      return null;
    }

    var store = getStore();
    if (!store) {
      console.error("[FAIL] AppSheet Redux store not found. Ensure AppSheet Editor is open.");
      return;
    }

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) {
      console.error("[FAIL] AppTemplate not found in Redux state.");
      return;
    }

    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var surveyIdx = schemas.findIndex(function(s) {
      return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey') ||
             (s && s.Attributes && s.Attributes.some(function(a) { return a.Name === 'SocialPlatformsUsed'; }));
    });

    if (surveyIdx === -1) {
      console.error("[FAIL] Survey schema not found in AppData.DataSchemas.");
      return;
    }

    var columnRules = ''' + json.dumps(rules, indent=2) + ''';

    var dict = {};
    var sAttrs = schemas[surveyIdx].Attributes || [];
    var count = 0;

    sAttrs.forEach(function(a, idx) {
      var colName = a.Name;
      var r = columnRules[colName];
      if (!r) return;

      var p = "AppData.DataSchemas[" + surveyIdx + "].Attributes[" + idx + "]";
      
      var auxObj = {};
      if (a.TypeAuxData) {
        try {
          auxObj = typeof a.TypeAuxData === 'string' ? JSON.parse(a.TypeAuxData) : Object.assign({}, a.TypeAuxData);
        } catch(e) {}
      }

      if (r.displayName) {
        a.DisplayName = r.displayName;
        dict[p + ".DisplayName"] = r.displayName;
      }

      if (r.type === 'Enum' || r.type === 'EnumList') {
        a.Type = r.type;
        dict[p + ".Type"] = r.type;
        a.ReferencedTableName = 'AppVariables';
        dict[p + ".ReferencedTableName"] = 'AppVariables';
        a.ReferencedRootTableName = 'AppVariables';
        dict[p + ".ReferencedRootTableName"] = 'AppVariables';
        auxObj.ReferencedTableName = 'AppVariables';
        auxObj.ReferencedRootTableName = 'AppVariables';

        if (r.isEnumList) {
          a.EnumListElementTypeName = 'Ref';
          dict[p + ".EnumListElementTypeName"] = 'Ref';
          auxObj.EnumListElementTypeName = 'Ref';
        }

        if (r.validIf) {
          a.Valid_If = r.validIf;
          a.ValidIf = r.validIf;
          dict[p + ".Valid_If"] = r.validIf;
          dict[p + ".ValidIf"] = r.validIf;
          auxObj.Valid_If = r.validIf;
          auxObj.ValidIf = r.validIf;

          a.Suggested_Values = r.validIf;
          a.SuggestedValues = r.validIf;
          dict[p + ".Suggested_Values"] = r.validIf;
          dict[p + ".SuggestedValues"] = r.validIf;
          auxObj.Suggested_Values = r.validIf;
          auxObj.SuggestedValues = r.validIf;
        }
      } else if (r.type && r.type !== 'Ref_Table') {
        a.Type = r.type;
        dict[p + ".Type"] = r.type;
      }

      var auxStr = JSON.stringify(auxObj);
      a.TypeAuxData = auxStr;
      dict[p + ".TypeAuxData"] = auxStr;

      count++;
    });

    store.dispatch({
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });

    console.log("==================================================");
    console.log("[SUCCESS] Applied DisplayName and Enum Ref to " + count + " columns in Survey table!");
    console.log("[ACTION] Click the blue SAVE button in AppSheet header to commit changes.");
    console.log("==================================================");
  } catch (err) {
    console.error("[ERROR] Failed to inject DisplayNames and Enum Refs:", err.message);
  }
})();
'''

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/inject_display_names_and_enum_refs.js', 'w', encoding='utf-8') as out:
    out.write(js_content)

print('File generated successfully!')
