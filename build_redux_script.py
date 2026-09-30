# -*- coding: utf-8 -*-
"""
Generates Redux DevTools Console Script to configure Survey schema columns:
- Sets DisplayName to multilingual formula looking up AppVariables Title, Title_hi, Title_raj
- Sets Valid_If for Enums/EnumLists to SELECT(AppVariables[EnumValue], [Column] = "<col>")
"""

import json

with open('survey_columns_map.json', 'r', encoding='utf-8') as f:
    cols_map = json.load(f)

js_rules = {}

for sec, qnum, prompt, col, ctype in cols_map:
    # Determine label ID
    lbl_id = None
    if sec == "Section A":
        lbl_id = f"LBL_A{qnum[1:]}"
    elif sec == "Section B":
        lbl_id = f"LBL_B{qnum[1:]}"
    elif sec == "Section C":
        lbl_id = f"LBL_C{qnum[1:]}"
    elif sec == "Section D":
        lbl_id = f"LBL_D{qnum[1:]}"
    elif sec == "Section E":
        lbl_id = f"LBL_E{qnum[1:]}"
    elif sec == "Section F":
        lbl_id = f"LBL_F{qnum[1:]}"
    elif sec == "Section G":
        lbl_id = f"LBL_G{qnum[1:]}"
    elif sec == "Section H":
        lbl_id = f"LBL_H{qnum[1:]}"
    elif sec == "Section I":
        lbl_id = f"LBL_I{qnum[1:]}"
    
    rule = {
        "lbl_id": lbl_id,
        "type": ctype,
        "displayName": f'=IFS(LOOKUP(USEREMAIL(), "AppUser", "Email", "PreferredLanguage") = "hi", LOOKUP("{lbl_id}", "AppVariables", "ID", "Title_hi"), LOOKUP(USEREMAIL(), "AppUser", "Email", "PreferredLanguage") = "raj", LOOKUP("{lbl_id}", "AppVariables", "ID", "Title_raj"), TRUE, LOOKUP("{lbl_id}", "AppVariables", "ID", "Title"))'
    }
    if ctype in ["Enum", "EnumList"] and col not in ["District", "Block"]:
        rule["validIf"] = f'=SELECT(AppVariables[EnumValue], [Column] = "{col}")'
    
    js_rules[col] = rule

script_content = f"""(function syncAllExactDocxLabelsAndEnums() {{
  try {{
    function getStore() {{
      if (window.appStore && window.appStore.dispatch) return window.appStore;
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {{
        var el = all[i];
        var fKey = Object.keys(el).find(function(k) {{
          return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance');
        }});
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
      console.error("[FAIL] AppSheet Redux store not found. Ensure AppSheet Editor is open.");
      return;
    }}

    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    if (!h) {{
      console.error("[FAIL] AppTemplate not found in Redux state.");
      return;
    }}

    var schemas = (h.AppData && h.AppData.DataSchemas) || [];
    var surveyIdx = schemas.findIndex(function(s) {{
      return s && (s.Name === 'Survey_Schema' || s.Name === 'Survey') ||
             (s && s.Attributes && s.Attributes.some(function(a) {{ return a.Name === 'SocialPlatformsUsed'; }}));
    }});

    if (surveyIdx === -1) {{
      console.error("[FAIL] Survey schema not found in AppData.DataSchemas.");
      return;
    }}

    var schema = schemas[surveyIdx];
    var attrs = schema.Attributes || [];
    var rules = {json.dumps(js_rules, indent=4)};

    var dict = {{}};
    var count = 0;

    Object.keys(rules).forEach(function(colName) {{
      var aIdx = attrs.findIndex(function(a) {{ return a && a.Name === colName; }});
      if (aIdx >= 0) {{
        var r = rules[colName];
        var basePath = "AppData.DataSchemas[" + surveyIdx + "].Attributes[" + aIdx + "].";
        
        if (r.displayName) {{
          dict[basePath + "Display_Name"] = r.displayName;
          dict[basePath + "DisplayName"] = r.displayName;
        }}
        if (r.validIf) {{
          dict[basePath + "Valid_If"] = r.validIf;
          dict[basePath + "ValidIf"] = r.validIf;
        }}
        count++;
      }}
    }});

    console.log("[INFO] Dispatching exact docx display names & valid_if rules for " + count + " columns...");
    store.dispatch({{
      type: "SET_EDITOR_OPTIONS",
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    }});

    store.dispatch({{
      type: "SHOW_SAVE_BUTTON",
      value: true
    }});

    console.log("=== [SUCCESS] " + count + " Survey columns configured with 100% verbatim DOCX rules! ===");
    console.log("[INFO] Click the native cloud Save button in AppSheet header to commit changes.");
  }} catch (e) {{
    console.error("[FAIL] Exception during configuration:", e);
  }}
}})();
"""

out_file = "projects/CmF_SHG_Women_Entrepreneurs/scripts/SYNC_ALL_EXACT_DOCX_LABELS_AND_ENUMS.js"
with open(out_file, "w", encoding="utf-8") as f:
    f.write(script_content)

print(f"[OK] Generated Redux console script: {out_file}")
