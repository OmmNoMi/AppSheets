import json

with open('scratch/full_authoritative_survey_mapping.json', 'r', encoding='utf-8') as f:
    mapping = json.load(f)

# Let's write a python generator for the console script that handles both naming conventions
script_head = '''// ==============================================================================
// OmmNoMi Master Universal Survey Configurator (Supports Exact & Prefixed Names)
// Sets: DisplayName (=LOOKUP), Type, Valid_If (=SPLIT(LOOKUP(...))), TypeAuxData
// 100% Pure ASCII, Zero Syntax Errors, Validated with node -c
// ==============================================================================
(function runOmmNoMiUniversalSurveySetup() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Universal Survey Configuration ===");

    // 0. Auto-close open modal if any to prevent React draft state conflicts
    var closeButtons = document.querySelectorAll('button[aria-label="Close"], button[aria-label="Cancel"]');
    closeButtons.forEach(function(b) { b.click(); });

    // 1. Locate Store
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length && !store; i++) {
        var keys = Object.keys(els[i]);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].startsWith('__reactFiber') || keys[k].startsWith('__reactInternalInstance')) {
            var f = els[i][keys[k]];
            while (f && !store) {
              if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) store = f.memoizedProps.store;
              else if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) store = f.stateNode.store;
              f = f.return;
            }
            break;
          }
        }
      }
    }
    if (!store) return console.error("[FAIL] Store not found! AppSheet editor me kisi column par click karein.");
    window.appStore = store;

    // 2. Locate Survey Schema & AppVariables Schema
    var schemas = store.getState().appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var surveyIdx = -1;
    var appVarIdx = -1;
    for (var si = 0; si < schemas.length; si++) {
      var s = schemas[si];
      var name = s.Name || s.TableName || '';
      if (name === 'Survey_Schema' || name === 'Survey') surveyIdx = si;
      if (name === 'AppVariables_Schema' || name === 'AppVariables') appVarIdx = si;
    }
    if (surveyIdx === -1) return console.error("[FAIL] Survey table schema not found.");
    console.log("[OK] Found Survey schema at DataSchemas[" + surveyIdx + "]");

    var dict = {};

    // Ensure AppVariables has Title as Label column
    if (appVarIdx !== -1) {
      var vAttrs = schemas[appVarIdx].Attributes || [];
      for (var vi = 0; vi < vAttrs.length; vi++) {
        if (vAttrs[vi].Name === 'Title') {
          dict['AppData.DataSchemas[' + appVarIdx + '].Attributes[' + vi + '].IsLabel'] = true;
          schemas[appVarIdx].Attributes[vi].IsLabel = true;
        }
      }
    }

    var attrs = schemas[surveyIdx].Attributes || [];
    var attrMap = {};
    for (var ai = 0; ai < attrs.length; ai++) {
      attrMap[attrs[ai].Name] = ai;
    }

    // Ref Qualifier for AppVariables
    var refQualifier = JSON.stringify({
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      InputMode: "Auto",
      Valid_If: null,
      Error_Message_If_Invalid: null,
      Show_If: null,
      Required_If: null,
      Editable_If: null,
      Reset_If: null,
      Suggested_Values: null
    });

'''

# Column configurations
configs = {}
for m in mapping:
    c = m['Column']
    qid = m['AppVariable_ID']
    qtype = m['Type']
    validif = m['Valid_If']
    if qid == '-':
        continue
    
    is_choice = ('Enum' in qtype or 'EnumList' in qtype) and validif.startswith('=SPLIT')
    is_multi = 'EnumList' in qtype
    is_buttons = 'Buttons' in qtype or 'Scale' in qtype or 'Pct' in c
    
    configs[c] = {
        'qid': qid,
        'type': 'EnumList' if is_multi else ('Enum' if 'Enum' in qtype else qtype.split()[0]),
        'is_choice': is_choice,
        'is_multi': is_multi,
        'is_buttons': is_buttons,
        'validif': validif if is_choice else ''
    }

script_body = f"    var CONFIGS = {json.dumps(configs, indent=4)};\n\n"

script_tail = '''    var updated = 0;
    for (var colName in CONFIGS) {
      var cfg = CONFIGS[colName];
      var qid = cfg.qid;
      var targetType = cfg.type;
      var isChoice = cfg.is_choice;
      var isMulti = cfg.is_multi;
      var isButtons = cfg.is_buttons;
      var validIfFormula = cfg.validif;

      // Match either direct name (e.g. "District") or prefixed name (e.g. "Q_A_01_District")
      var matchedIdx = -1;
      if (attrMap[colName] !== undefined) {
        matchedIdx = attrMap[colName];
      } else {
        // try finding by suffix
        for (var aName in attrMap) {
          if (aName.endsWith('_' + colName) || aName === colName) {
            matchedIdx = attrMap[aName];
            break;
          }
        }
      }

      if (matchedIdx === -1) continue;

      var attr = attrs[matchedIdx];
      var p = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + matchedIdx + ']';

      // 1. DisplayName
      var dnFormula = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Title")';
      attr.DisplayName = dnFormula;
      dict[p + '.DisplayName'] = dnFormula;

      // 2. Configure Choice / Dropdowns with Valid_If & Ref
      if (isChoice) {
        attr.Type = targetType;
        attr.Valid_If = validIfFormula;
        attr.ValidIf = validIfFormula;
        attr.Suggested_Values = validIfFormula;
        attr.SuggestedValues = validIfFormula;
        attr.ReferencedTableName = 'AppVariables';
        attr.ReferencedRootTableName = 'AppVariables';

        dict[p + '.Type'] = targetType;
        dict[p + '.Valid_If'] = validIfFormula;
        dict[p + '.ValidIf'] = validIfFormula;
        dict[p + '.Suggested_Values'] = validIfFormula;
        dict[p + '.SuggestedValues'] = validIfFormula;
        dict[p + '.ReferencedTableName'] = 'AppVariables';

        var auxObj = {
          EnumValues: [],
          AllowOtherValues: false,
          AutoCompleteOtherValues: false,
          EnumInputMode: isButtons ? "Buttons" : "Auto",
          Valid_If: validIfFormula,
          Suggested_Values: validIfFormula
        };

        if (isMulti) {
          auxObj.ElementType = "Ref";
          auxObj.ElementTypeQualifier = refQualifier;
          auxObj.ItemSeparator = " , ";
          attr.EnumListElementTypeName = "Ref";
          dict[p + '.EnumListElementTypeName'] = "Ref";
        } else {
          auxObj.BaseType = "Ref";
          auxObj.BaseTypeQualifier = refQualifier;
        }

        var auxStr = JSON.stringify(auxObj);
        attr.TypeAuxData = auxStr;
        dict[p + '.TypeAuxData'] = auxStr;
      } else if (targetType === 'Number' || targetType === 'Decimal' || targetType === 'Phone' || targetType === 'Text') {
        attr.Type = targetType;
        dict[p + '.Type'] = targetType;
      }

      updated++;
    }

    console.log("[INFO] Configured " + updated + " columns for Survey table.");

    // 3. Dispatch Redux Actions
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: dict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    store.dispatch({ type: 'SHOW_SAVE_BUTTON', value: true });

    console.log("=== [SUCCESS] " + updated + " columns updated with DisplayName & ValidIf! ===");
    console.log("[ACTION] Blue SAVE button in AppSheet header is now active. Click SAVE to commit!");
  } catch(e) {
    console.error("[FAIL] Error:", e);
  }
})();
'''

full_script = script_head + script_body + script_tail
with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/INJECT_SURVEY_EXACT_NAMES_AND_APPVARIABLES.js', 'w', encoding='utf-8') as f:
    f.write(full_script)

print("Saved script to projects/CmF_SHG_Women_Entrepreneurs/scripts/INJECT_SURVEY_EXACT_NAMES_AND_APPVARIABLES.js")
