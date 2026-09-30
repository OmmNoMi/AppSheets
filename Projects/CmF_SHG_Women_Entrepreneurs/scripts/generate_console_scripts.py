import re, json

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/apply_all_dynamic_display_names.js', 'r', encoding='utf-8') as f:
    text = f.read()

s_map = json.loads(re.search(r'var surveyMap = ({.*?});', text).group(1))
st_map = json.loads(re.search(r'var stMap = ({.*?});', text).group(1))

# Script 1: Survey Table Display Names (35 lines)
script1 = '''(function applySurveyDisplayNames() {
  try {
    var store = window.appStore || (function() {
      var root = document.querySelector("#app, #root, [role='main']");
      var key = root && Object.keys(root).find(function(k) { return k.startsWith("__reactFiber$"); });
      var f = key ? root[key] : null;
      while (f) { if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store; f = f.return; }
      return null;
    })();
    if (!store) { console.error("[FAIL] Store not found"); return; }
    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
    var sIdx = schemas.findIndex(function(s) { return s && (s.Name === "Survey_Schema" || s.Name === "Survey"); });
    if (sIdx === -1) { console.error("[FAIL] Survey schema not found"); return; }
    var map = ''' + json.dumps(s_map) + ''';
    var dict = {};
    var count = 0;
    schemas[sIdx].Attributes.forEach(function(a, idx) {
      if (map[a.Name]) {
        var f = '=LOOKUP("' + map[a.Name] + '", "AppVariables", "ID", "Label")';
        dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].DisplayName"] = f;
        dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].Description"] = "";
        count++;
      }
    });
    store.dispatch({ type: "SET_EDITOR_OPTIONS", nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] Updated " + count + " Survey columns with dynamic DisplayName!");
  } catch(e) { console.error(e); }
})();'''

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/apply_survey_display_names.js', 'w', encoding='utf-8') as f:
    f.write(script1)

# Script 2: Survey_Tables Complete Configuration (Display Names + Multilingual Enum-Refs) (40 lines)
script2 = '''(function configureSurveyTablesComplete() {
  try {
    var store = window.appStore || (function() {
      var root = document.querySelector("#app, #root, [role='main']");
      var key = root && Object.keys(root).find(function(k) { return k.startsWith("__reactFiber$"); });
      var f = key ? root[key] : null;
      while (f) { if (f.memoizedProps && f.memoizedProps.store) return f.memoizedProps.store; f = f.return; }
      return null;
    })();
    if (!store) { console.error("[FAIL] Store not found"); return; }
    var state = store.getState();
    var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);
    var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];
    var tIdx = schemas.findIndex(function(s) { return s && (s.Name === "Survey_Tables_Schema" || s.Name === "Survey_Tables"); });
    if (tIdx === -1) { console.error("[FAIL] Survey_Tables schema not found"); return; }
    var map = ''' + json.dumps(st_map) + ''';
    var dict = {};
    var count = 0;
    schemas[tIdx].Attributes.forEach(function(a, idx) {
      if (map[a.Name]) {
        var f = '=LOOKUP("' + map[a.Name] + '", "AppVariables", "ID", "Label")';
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].DisplayName"] = f;
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].Description"] = "";
        count++;
      }
      if (a.Name === "Row_Item") {
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].Type"] = "Enum";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].BaseType"] = "Ref";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].ReferencedTableName"] = "AppVariables";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].ReferencedRootTableName"] = "AppVariables";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].Valid_If"] = '=IFS([Table_Type] = "Q6_Labor", SELECT(AppVariables[ID], [Column] = "Row_Item_Labor"), [Table_Type] = "Q15_Turnover", SELECT(AppVariables[ID], [Column] = "Row_Item_Turnover"), IN([Table_Type], LIST("Q19_Capital", "Q20_Loan_Usage")), SELECT(AppVariables[ID], [Column] = "Row_Item_Capital"), [Table_Type] = "Q22_Trajectory", SELECT(AppVariables[ID], [Column] = "Row_Item_Trajectory"), TRUE, SELECT(AppVariables[ID], [Table] = "Survey_Tables"))';
      }
      if (a.Name === "Labor_Involvement") {
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].Type"] = "Enum";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].BaseType"] = "Ref";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].ReferencedTableName"] = "AppVariables";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].ReferencedRootTableName"] = "AppVariables";
        dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].Valid_If"] = '=LIST("INV_REGULAR", "INV_OCCASIONAL", "INV_ONLY_RESP", "INV_NOT_RELEVANT")';
      }
    });
    store.dispatch({ type: "SET_EDITOR_OPTIONS", nameValueDict: dict, recordHistory: true });
    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });
    console.log("[OK] Updated " + count + " Survey_Tables columns with dynamic DisplayNames & multilingual Enum-Refs!");
  } catch(e) { console.error(e); }
})();'''

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/configure_survey_tables_complete.js', 'w', encoding='utf-8') as f:
    f.write(script2)

print('Generated both console scripts successfully!')
