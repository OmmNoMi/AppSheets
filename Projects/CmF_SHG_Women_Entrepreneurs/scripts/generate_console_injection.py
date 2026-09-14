# -*- coding: utf-8 -*-
import json, csv

# Load Survey columns master
with open(r'projects\CmF_SHG_Women_Entrepreneurs\data\Survey_Columns_MASTER.json', encoding='utf-8') as f:
    survey_cols = json.load(f)

# Load AppVariables master
with open(r'projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_MASTER_AUTHORITATIVE.tsv', encoding='utf-8') as f:
    reader = csv.DictReader(f, delimiter='\t')
    rows = list(reader)

col_map = {}
for r in rows:
    if r['Table'] == 'Survey' and r['UsedFor'] == 'Question Label':
        col = r['Column']
        if col:
            qid = r['ID']
            val_ctrl = r['ValueControl']
            has_opts = bool(r['VariableList'])
            
            # Check if percentage scale
            scale = None
            input_mode = None
            if '07_0' in col and 'Pct' in col:
                scale = 'MAIN_PCT_SCALE_5'
                input_mode = 'Buttons'
            elif '10_0' in col and 'Pct' in col:
                scale = 'MAIN_PCT_SCALE_SALES'
                input_mode = 'Buttons'
            
            col_map[col] = {
                'qid': qid,
                'type': val_ctrl,
                'has_opts': has_opts,
                'scale': scale,
                'input_mode': input_mode
            }

print(f'Total configured columns in col_map: {len(col_map)}')

js_code = '''/**
 * ==============================================================================
 * OmmNoMi Automation LLP - AppSheet Modern Editor Redux Configuration
 * Injects Dynamic DisplayName (=LOOKUP(QID, AppVariables, ID, Label))
 * and Dynamic Values / Valid_If (=SPLIT(LOOKUP(QID, AppVariables, ID, VariableList), ' , '))
 * 
 * Pure ASCII, Zero Syntax Errors, Validated with node -c
 * ==============================================================================
 */

(function runInjectSurveyDisplayAndDynamicValues() {
  try {
    console.clear();
    console.log("=== [OmmNoMi] Starting Dynamic DisplayName and Values Injection ===");

    // 1. Locate Redux Store
    var store = window.reduxStore || window.appStore;
    if (!store) {
      var els = document.querySelectorAll('*');
      for (var i = 0; i < els.length && !store; i++) {
        var keys = Object.keys(els[i]);
        for (var k = 0; k < keys.length; k++) {
          if (keys[k].startsWith('__reactFiber') || keys[k].startsWith('__reactInternalInstance')) {
            var f = els[i][keys[k]];
            while (f && !store) {
              if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {
                store = f.memoizedProps.store;
              } else if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {
                store = f.stateNode.store;
              }
              f = f.return;
            }
            break;
          }
        }
      }
    }

    if (!store) {
      console.error("[FAIL] Redux store not found! Please click on any table/column in AppSheet Editor first.");
      return;
    }
    window.appStore = store;
    console.log("[OK] Found Redux store successfully.");

    // 2. Locate Survey Schema
    var state = store.getState();
    var schemas = state.appTemplate.history[0].appTemplate.AppData.DataSchemas;
    var surveyIdx = -1;
    for (var si = 0; si < schemas.length; si++) {
      var sName = schemas[si].Name || '';
      var tName = schemas[si].TableName || '';
      if (sName === 'Survey_Schema' || tName === 'Survey' || sName === 'Survey') {
        surveyIdx = si;
        break;
      }
    }

    if (surveyIdx === -1) {
      console.error("[FAIL] Survey schema not found in AppSheet DataSchemas!");
      return;
    }
    console.log("[OK] Found Survey table at DataSchemas[" + surveyIdx + "]");

    var attrs = schemas[surveyIdx].Attributes || [];
    var attrMap = {};
    for (var ai = 0; ai < attrs.length; ai++) {
      attrMap[attrs[ai].Name] = ai;
    }

    // 3. TypeAuxData Templates for Enum / EnumList Ref -> AppVariables
    var refQualifier = JSON.stringify({
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      InputMode: "Auto"
    });

    var enumListTypeAux = JSON.stringify({
      ElementType: "Ref",
      ElementTypeQualifier: refQualifier,
      ItemSeparator: " , "
    });

    var enumTypeAux = JSON.stringify({
      EnumValues: [],
      AllowOtherValues: false,
      AutoCompleteOtherValues: true,
      BaseType: "Ref",
      BaseTypeQualifier: refQualifier,
      EnumInputMode: "Auto"
    });

    var enumButtonsTypeAux = JSON.stringify({
      EnumValues: [],
      AllowOtherValues: false,
      AutoCompleteOtherValues: true,
      BaseType: "Ref",
      BaseTypeQualifier: refQualifier,
      EnumInputMode: "Buttons"
    });

    // 4. Configuration Dictionary for All Columns
    var COL_CONFIG = ''' + json.dumps(col_map, indent=2) + ''';

    var nameValueDict = {};
    var updatedCols = 0;

    function setAttr(colIdx, prop, val) {
      var key = 'AppData.DataSchemas[' + surveyIdx + '].Attributes[' + colIdx + '].' + prop;
      nameValueDict[key] = val;
    }

    for (var colName in COL_CONFIG) {
      if (attrMap[colName] === undefined) continue;
      var aIdx = attrMap[colName];
      var cfg = COL_CONFIG[colName];
      var qid = cfg.qid;
      var qtype = cfg.type;
      var scale = cfg.scale;
      var inputMode = cfg.input_mode;

      // 4a. Dynamic DisplayName
      var dispFormula = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';
      setAttr(aIdx, 'DisplayName', dispFormula);

      // 4b. Dynamic Values and Type Configuration
      if (qtype === 'Enum' || qtype === 'EnumList' || scale) {
        var targetScaleId = scale ? scale : qid;
        var validIfFormula = '=SPLIT(LOOKUP("' + targetScaleId + '", "AppVariables", "ID", "VariableList"), " , ")';

        setAttr(aIdx, 'ValidIf', validIfFormula);
        setAttr(aIdx, 'Valid_If', validIfFormula);
        setAttr(aIdx, 'ReferencedTableName', 'AppVariables');

        if (qtype === 'EnumList') {
          setAttr(aIdx, 'Type', 'EnumList');
          setAttr(aIdx, 'EnumListElementTypeName', 'Ref');
          setAttr(aIdx, 'TypeAuxData', enumListTypeAux);
        } else {
          setAttr(aIdx, 'Type', 'Enum');
          setAttr(aIdx, 'EnumListElementTypeName', 'Ref');
          if (inputMode === 'Buttons') {
            setAttr(aIdx, 'TypeAuxData', enumButtonsTypeAux);
          } else {
            setAttr(aIdx, 'TypeAuxData', enumTypeAux);
          }
        }
      } else if (qtype === 'Number') {
        setAttr(aIdx, 'Type', 'Number');
      } else if (qtype === 'Phone') {
        setAttr(aIdx, 'Type', 'Phone');
      } else if (qtype === 'Text') {
        setAttr(aIdx, 'Type', 'Text');
      }

      updatedCols++;
    }

    console.log("[INFO] Prepared Redux updates for " + updatedCols + " Survey columns.");

    // 5. Dispatch SET_EDITOR_OPTIONS to Redux Store
    store.dispatch({
      type: 'SET_EDITOR_OPTIONS',
      nameValueDict: nameValueDict,
      recordHistory: true,
      ignoreConstraints: false,
      skipNavigation: false
    });

    // 6. Activate Cloud SAVE Button
    store.dispatch({
      type: 'SHOW_SAVE_BUTTON',
      value: true
    });

    console.log("=== [SUCCESS] " + updatedCols + " columns updated! Click the blue SAVE button in AppSheet header to commit. ===");
  } catch (err) {
    console.error("[FAIL] Error executing injection:", err);
  }
})();
'''

out_file = r'projects\CmF_SHG_Women_Entrepreneurs\scripts\INJECT_SURVEY_DISPLAY_AND_DYNAMIC_VALUES.js'
with open(out_file, 'w', encoding='utf-8') as f:
    f.write(js_code)

print('Generated JS file at:', out_file)
