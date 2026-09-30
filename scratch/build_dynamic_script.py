import json

with open('scratch/escaped_formulas.json', 'r') as f:
    formulas = json.load(f)

q17_formula = formulas['q17'].replace('"', '\\"')
q6_formula = formulas['q6'].replace('"', '\\"')

js_code = f"""// ==============================================================================
// OmmNoMi: Dynamic Multilingual Switcher for Q17 & Q6 (< 55 lines, Pure ASCII)
// ==============================================================================
(function setDynamicMultilingual() {{
  try {{
    console.clear();
    console.log("=== [OmmNoMi] Applying Dynamic Multilingual Switcher (Q17 & Q6) ===");

    var store = window.appStore || (function() {{
      var el = document.querySelector('.ExpressionControl') || document.querySelector('[role="grid"]') || document.body;
      var k = Object.keys(el).find(function(x) {{ return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); }});
      var f = el && el[k];
      while (f) {{
        if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store;
        if (f.stateNode && f.stateNode.store) return f.stateNode.store;
        f = f.return;
      }}
    }})();
    if (!store) return console.error("[FAIL] Store not found.");
    window.appStore = store;

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));

    var fQ17 = "{q17_formula}";
    var fQ6 = "{q6_formula}";

    schemas.forEach(function(schema) {{
      var isCap = (schema.Name || '').indexOf('Capital') >= 0;
      var isLabor = (schema.Name || '').indexOf('Labor') >= 0;

      (schema.Attributes || []).forEach(function(attr) {{
        var isSrc = isCap && (attr.Name === 'Source' || attr.Name === 'Capital_Source' || attr.Name === 'Source_Name');
        var isAct = (isLabor && (attr.Name === 'Activity' || attr.Name === 'Activity_Name')) || attr.Name === 'BusinessActivity';

        if (isSrc || attr.Name === 'InitialCapitalArranged') {{
          var aux = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{{}}') : (attr.TypeAuxData || {{}});
          attr.Type = attr.Name === 'InitialCapitalArranged' ? 'EnumList' : 'Enum';
          aux.Suggested_Values = fQ17; aux.EnumValues = null; aux.BaseType = 'Text'; aux.EnumInputMode = 'Dropdown'; aux.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name + " with Dynamic Q17");
        }}
        if (isAct) {{
          var aux2 = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData || '{{}}') : (attr.TypeAuxData || {{}});
          attr.Type = 'Enum';
          aux2.Suggested_Values = fQ6; aux2.EnumValues = null; aux2.BaseType = 'Text'; aux2.EnumInputMode = 'Dropdown'; aux2.AllowOtherValues = true;
          attr.TypeAuxData = JSON.stringify(aux2);
          console.log("[OK] Updated " + schema.Name + "." + attr.Name + " with Dynamic Q6");
        }}
      }});
    }});

    store.dispatch({{ type: 'SET_EDITOR_OPTIONS', nameValueDict: {{ 'AppData.DataSchemas': schemas }}, recordHistory: true, ignoreConstraints: false, skipNavigation: false }});
    store.dispatch({{ type: 'SHOW_SAVE_BUTTON', value: true }});
    console.log("=== [SUCCESS] Dynamic Multilingual Switcher Applied! Click SAVE in AppSheet! ===");
  }} catch(e) {{ console.error("[FAIL]", e); }}
}})();
"""

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/inject_dynamic_multilingual_q17_q6.js', 'w', encoding='ascii') as f:
    f.write(js_code)
