import json

with open('scratch/full_authoritative_survey_mapping.json', 'r', encoding='utf-8') as f:
    mapping = json.load(f)

compact_list = []
for m in mapping:
    c = m['Column']
    qid = m['AppVariable_ID']
    qtype = m['Type']
    validif = m['Valid_If']
    if qid == '-':
        continue
    
    flag = 'T'
    if 'EnumList' in qtype:
        flag = 'L'
    elif 'Buttons' in qtype:
        flag = 'B'
    elif 'Enum' in qtype:
        flag = 'E'
    elif 'Number' in qtype:
        flag = 'N'
    elif 'Decimal' in qtype:
        flag = 'D'
    elif 'Phone' in qtype:
        flag = 'P'
    
    target_scale = ""
    if 'MAIN_PCT_SCALE_5' in validif:
        target_scale = "MAIN_PCT_SCALE_5"
    elif 'MAIN_PCT_SCALE_SALES' in validif:
        target_scale = "MAIN_PCT_SCALE_SALES"
        
    compact_list.append([c, qid, flag, target_scale])

items_json = json.dumps(compact_list)

template = """// ==============================================================================
// OmmNoMi Compact Master Survey Configurator
// Dual-Delivery: Complete script at projects/CmF_SHG_Women_Entrepreneurs/scripts/
// ==============================================================================
(function runCompactSurveySetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Setting Survey DisplayNames & Valid_If ===");

    var store = window.appStore || (function() {
      var all = document.querySelectorAll('*');
      for (var i = 0; i < all.length; i++) {
        var k = Object.keys(all[i]).find(function(x) { return x.startsWith('__reactFiber') || x.startsWith('__reactInternal'); });
        var f = k && all[i][k];
        while (f) {
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) return f.memoizedProps.store;
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) return f.stateNode.store;
          f = f.return;
        }
      }
    })();
    if (!store) return console.error("[FAIL] Store not found! Editor me kisi column par click karein.");
    window.appStore = store;

    var schemas = store.getState().appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var sIdx = -1, vIdx = -1;
    for (var i = 0; i < schemas.length; i++) {
      var n = schemas[i].Name || schemas[i].TableName || '';
      if (n === 'Survey' || n === 'Survey_Schema') sIdx = i;
      if (n === 'AppVariables' || n === 'AppVariables_Schema') vIdx = i;
    }
    if (sIdx === -1) return console.error("[FAIL] Survey schema not found.");

    var dict = {}, attrs = schemas[sIdx].Attributes || [], aMap = {};
    for (var j = 0; j < attrs.length; j++) aMap[attrs[j].Name] = j;

    var refQ = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedKeyColumn: "ID" });
    var ITEMS = __ITEMS_JSON__;

    var count = 0;
    ITEMS.forEach(function(item) {
      var col = item[0], qid = item[1], flag = item[2], scale = item[3];
      var idx = aMap[col];
      if (idx === undefined) {
        for (var k in aMap) { if (k.endsWith('_' + col)) { idx = aMap[k]; break; } }
      }
      if (idx === undefined) return;

      var p = 'AppData.DataSchemas[' + sIdx + '].Attributes[' + idx + ']';
      var attr = attrs[idx];
      var dn = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Title")';
      attr.DisplayName = dn;
      dict[p + '.DisplayName'] = dn;

      if (flag === 'E' || flag === 'L' || flag === 'B') {
        var tid = scale ? scale : qid;
        var vf = '=SPLIT(LOOKUP("' + tid + '", "AppVariables", "ID", "VariableList"), " , ")';
        var isMulti = (flag === 'L');
        var t = isMulti ? 'EnumList' : 'Enum';
        attr.Type = t; attr.Valid_If = vf; attr.ValidIf = vf; attr.Suggested_Values = vf; attr.SuggestedValues = vf;
        dict[p + '.Type'] = t; dict[p + '.Valid_If'] = vf; dict[p + '.ValidIf'] = vf; dict[p + '.Suggested_Values'] = vf; dict[p + '.SuggestedValues'] = vf;
        dict[p + '.ReferencedTableName'] = 'AppVariables';

        var aux = { EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: false, EnumInputMode: (flag === 'B' ? "Buttons" : "Auto"), Valid_If: vf, Suggested_Values: vf };
        if (isMulti) { aux.ElementType = "Ref"; aux.ElementTypeQualifier = refQ; aux.ItemSeparator = " , "; dict[p + '.EnumListElementTypeName'] = "Ref"; }
        else { aux.BaseType = "Ref"; aux.BaseTypeQualifier = refQ; }
        attr.TypeAuxData = JSON.stringify(aux);
        dict[p + '.TypeAuxData'] = JSON.stringify(aux);
      } else {
        var dt = (flag === 'N' ? 'Number' : (flag === 'D' ? 'Decimal' : (flag === 'P' ? 'Phone' : 'Text')));
        attr.Type = dt; dict[p + '.Type'] = dt;
      }
      count++;
    });

    store.dispatch({ type: 'SET_EDITOR_OPTIONS', nameValueDict: dict, recordHistory: true, ignoreConstraints: false, skipNavigation: false });
    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });
    console.log("=== [SUCCESS] " + count + " Survey columns configured with DisplayName & ValidIf! Click SAVE! ===");
  } catch(e) { console.error("[FAIL]", e); }
})();
"""

script = template.replace('__ITEMS_JSON__', items_json)
with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/INJECT_SURVEY_COMPACT_RUNNER.js', 'w', encoding='utf-8') as f:
    f.write(script)

print("Saved projects/CmF_SHG_Women_Entrepreneurs/scripts/INJECT_SURVEY_COMPACT_RUNNER.js")
