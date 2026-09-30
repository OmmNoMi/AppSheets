import csv
import json
import re

# Read Survey HTML
with open('scratch/WCH/Survey.html', 'r', encoding='utf-8') as f:
    html = f.read()

trs = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
header_row = []
for tr in trs:
    tds = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.DOTALL)
    clean = [re.sub(r'<[^>]+>', '', t).strip() for t in tds]
    if 'RespondentName' in clean:
        header_row = [c for c in clean if c]
        break

# Read AppVariables
with open('Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    col_info = {}
    for r in reader:
        col = r.get('Column', '').strip()
        tbl = r.get('Table', '').strip()
        rid = r.get('ID', '').strip()
        tags = r.get('Tags', '')
        vctrl = r.get('ValueControl', '').strip()
        vlist = r.get('VariableList', '').strip()
        if tbl == 'Survey' and col and ('QuestionPrompt' in tags or rid.startswith('Q_')):
            col_info[col] = {
                'qid': rid,
                'vctrl': vctrl,
                'is_multi': vctrl == 'EnumList',
                'has_vlist': bool(vlist)
            }

ignore_cols = ['ID', 'Status', 'InvestigatorID', 'CreatedOn', 'Latitude', 'Longitude', 'LastEditedBy', 'LastEditedOn']
survey_cols = [c for c in header_row if c not in ignore_cols]

# Build dictionary: ColName -> [QID, is_dropdown, is_multi]
qmap_lines = []
for c in survey_cols:
    info = col_info.get(c, {})
    is_drop = 1 if (info.get('has_vlist') or info.get('vctrl') in ['Enum', 'EnumList']) else 0
    is_multi = 1 if info.get('is_multi') else 0
    qid = info.get('qid', '')
    qmap_lines.append(f'      "{c}": ["{qid}", {is_drop}, {is_multi}]')

qmap_code = "{\n" + ",\n".join(qmap_lines) + "\n    }"

js_code = f'''// ==============================================================================
// OmmNoMi Definitive Multilingual Dropdown & DisplayName Engine
// Pure ASCII, C# Backend Deserializer Compliant, Full TypeAuxData Sync
// ==============================================================================
(function runDefinitiveMultilingualEngine() {{
  try {{
    console.clear();
    console.log("=== [OmmNoMi] Injecting Definitive Multilingual Dropdowns & DisplayNames ===");

    // 1. Universal Redux Store Resolution
    var store = window.appStore;
    if (!store) {{
      var candidates = [document.querySelector('.ExpressionControl'), document.querySelector('[role="grid"]'), document.querySelector('#root'), document.body];
      for (var i = 0; i < candidates.length; i++) {{
        var el = candidates[i];
        if (!el) continue;
        var fKey = Object.keys(el).find(function(k) {{ return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); }});
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {{
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {{ store = f.memoizedProps.store; window.appStore = store; break; }}
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {{ store = f.stateNode.store; window.appStore = store; break; }}
          f = f.return;
        }}
        if (store) break;
      }}
    }}
    if (!store) return console.error("[FAIL] Redux Store not found! Editor me kisi column par click karein.");

    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;
    var schemas = h && h.AppData && h.AppData.DataSchemas;
    if (!schemas) return console.error("[FAIL] DataSchemas not found in Redux state.");

    // Map all table schemas (handles '_Schema' suffix)
    var schemaMap = {{}};
    schemas.forEach(function(s, idx) {{
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = {{ schema: s, idx: idx }};
      schemaMap[clean] = {{ schema: s, idx: idx }};
      if (s.TableName) schemaMap[s.TableName] = {{ schema: s, idx: idx }};
    }});

    var nameValueDict = {{}};
    var count = 0;

    // Type qualifiers for BaseType: Ref -> AppVariables
    var refTypeQual = JSON.stringify({{
      MaxLength: null, MinLength: null, LongTextFormatting: "Plain Text",
      IsMulticolumnKey: false, Valid_If: null, Error_Message_If_Invalid: null,
      Show_If: null, Required_If: null, Editable_If: null, Reset_If: null, Suggested_Values: null
    }});

    var baseQualifierStr = JSON.stringify({{
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedTypeQualifier: refTypeQual,
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      RelationshipName: null,
      InputMode: "Auto",
      Valid_If: null,
      Error_Message_If_Invalid: null,
      Show_If: null,
      Required_If: null,
      Editable_If: null,
      Reset_If: null,
      Suggested_Values: null
    }});

    // 2. Configure Survey Table: 79 Questions
    var surveyItem = schemaMap['Survey'];
    var QMAP = {qmap_code};

    if (surveyItem) {{
      var sIdx = surveyItem.idx;
      var sAttrs = surveyItem.schema.Attributes || [];
      var surveyDropCount = 0;

      sAttrs.forEach(function(attr, aIdx) {{
        var c = attr.Name;
        if (!c || !QMAP[c]) return;

        var info = QMAP[c];
        var qid = info[0], isDrop = info[1], isMulti = info[2];
        var p = 'AppData.DataSchemas[' + sIdx + '].Attributes[' + aIdx + ']';

        // 2a. Set Multilingual Question Title
        var dnFormula = '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")';
        attr.DisplayName = dnFormula;
        nameValueDict[p + '.DisplayName'] = dnFormula;
        count++;

        // 2b. Set Multilingual Dropdown Options
        if (isDrop) {{
          var validIf = (c === 'Block')
            ? '=SELECT(AppVariables[ID], AND([Column] = "Block", [Description] = [_THISROW].[District]))'
            : '=SPLIT(LOOKUP("' + qid + '", "AppVariables", "ID", "VariableList"), " , ")';

          var targetType = isMulti ? 'EnumList' : 'Enum';

          // Build TypeAuxData with Valid_If & Suggested_Values INSIDE IT
          var auxObj = {{}};
          if (attr.TypeAuxData) {{
            try {{ auxObj = typeof attr.TypeAuxData === 'string' ? JSON.parse(attr.TypeAuxData) : Object.assign({{}}, attr.TypeAuxData); }} catch(e) {{}}
          }}

          auxObj.BaseType = "Ref";
          auxObj.ReferencedTableName = "AppVariables";
          auxObj.ReferencedRootTableName = "AppVariables";
          auxObj.BaseTypeQualifier = baseQualifierStr;
          auxObj.AllowOtherValues = false;
          auxObj.AutoCompleteOtherValues = false;
          auxObj.EnumValues = [];
          auxObj.Valid_If = validIf;
          auxObj.Suggested_Values = validIf;
          auxObj.EnumInputMode = "Auto";
          auxObj.UseDropdown = true;

          if (isMulti) {{
            auxObj.ElementType = "Ref";
            auxObj.ElementTypeQualifier = baseQualifierStr;
            auxObj.ItemSeparator = " , ";
            attr.EnumListElementTypeName = "Ref";
            nameValueDict[p + '.EnumListElementTypeName'] = "Ref";
          }}

          var auxStr = JSON.stringify(auxObj);

          // Mutate in-memory attribute object
          attr.Type = targetType;
          attr.BaseType = "Ref";
          attr.ReferencedTableName = "AppVariables";
          attr.ReferencedRootTableName = "AppVariables";
          attr.Valid_If = validIf;
          attr.ValidIf = validIf;
          attr.Suggested_Values = validIf;
          attr.SuggestedValues = validIf;
          attr.EnumValues = [];
          attr.TypeAuxData = auxStr;

          // Push into Redux nameValueDict
          nameValueDict[p + '.Type'] = targetType;
          nameValueDict[p + '.BaseType'] = "Ref";
          nameValueDict[p + '.ReferencedTableName'] = "AppVariables";
          nameValueDict[p + '.ReferencedRootTableName'] = "AppVariables";
          nameValueDict[p + '.TypeAuxData'] = auxStr;
          nameValueDict[p + '.Valid_If'] = validIf;
          nameValueDict[p + '.ValidIf'] = validIf;
          nameValueDict[p + '.Suggested_Values'] = validIf;
          nameValueDict[p + '.SuggestedValues'] = validIf;
          nameValueDict[p + '.EnumValues'] = [];

          surveyDropCount++;
          count += 9;
        }}
      }});

      console.log("[OK] Survey Table: " + Object.keys(QMAP).length + " DisplayNames & " + surveyDropCount + " Multilingual Dropdowns configured!");
    }}

    // 3. Configure 5 Child Sub-Tables (Ref, Key, DisplayNames, Dropdowns)
    var subConfigs = {{
      'Survey_Labor': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Activity': {{ dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' }},
        'Involvement_Type': {{
          dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
        }},
        'Family_Members_Count': {{ dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' }},
        'Hired_Help_Count': {{ dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' }},
        'Amount_Paid_Last_Year': {{
          dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
        }}
      }},
      'Survey_Turnover': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Season': {{
          dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
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
          validIf: '=SPLIT(LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "VariableList"), " , ")',
          isDrop: true
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

    Object.keys(subConfigs).forEach(function(tbl) {{
      var item = schemaMap[tbl];
      if (!item) return;
      var subIdx = item.idx, attrs = item.schema.Attributes || [], conf = subConfigs[tbl];

      attrs.forEach(function(attr, aIdx) {{
        var c = conf[attr.Name];
        if (!c) return;
        var p = 'AppData.DataSchemas[' + subIdx + '].Attributes[' + aIdx + ']';

        if (c.isRef) {{
          attr.Type = 'Ref'; attr.ReferencedTableName = c.refTable; attr.IsPartOf = c.isPartOf;
          nameValueDict[p + '.Type'] = 'Ref';
          nameValueDict[p + '.ReferencedTableName'] = c.refTable;
          nameValueDict[p + '.IsPartOf'] = c.isPartOf;
          count += 3;
        }}
        if (c.initial) {{
          attr.InitialValue = c.initial;
          nameValueDict[p + '.InitialValue'] = c.initial;
          count++;
        }}
        if (c.isKey !== undefined) {{
          attr.IsKey = c.isKey;
          nameValueDict[p + '.IsKey'] = c.isKey;
          count++;
        }}
        if (c.dName) {{
          attr.DisplayName = c.dName;
          nameValueDict[p + '.DisplayName'] = c.dName;
          count++;
        }}
        if (c.validIf) {{
          var auxObj = {{ BaseType: "Ref", ReferencedTableName: "AppVariables", BaseTypeQualifier: baseQualifierStr, AllowOtherValues: false, AutoCompleteOtherValues: false, EnumValues: [], Valid_If: c.validIf, Suggested_Values: c.validIf, EnumInputMode: "Auto", UseDropdown: true }};
          var auxStr = JSON.stringify(auxObj);

          attr.Type = 'Enum';
          attr.BaseType = 'Ref';
          attr.ReferencedTableName = 'AppVariables';
          attr.Valid_If = c.validIf;
          attr.ValidIf = c.validIf;
          attr.Suggested_Values = c.validIf;
          attr.SuggestedValues = c.validIf;
          attr.EnumValues = [];
          attr.TypeAuxData = auxStr;

          nameValueDict[p + '.Type'] = 'Enum';
          nameValueDict[p + '.BaseType'] = 'Ref';
          nameValueDict[p + '.ReferencedTableName'] = 'AppVariables';
          nameValueDict[p + '.TypeAuxData'] = auxStr;
          nameValueDict[p + '.Valid_If'] = c.validIf;
          nameValueDict[p + '.ValidIf'] = c.validIf;
          nameValueDict[p + '.Suggested_Values'] = c.validIf;
          nameValueDict[p + '.SuggestedValues'] = c.validIf;
          nameValueDict[p + '.EnumValues'] = [];
          count += 9;
        }}
      }});
      console.log("[OK] Sub-table configured: " + tbl);
    }});

    // 4. Batch Dispatch to Redux Store
    if (count > 0) {{
      store.dispatch({{
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
      }});

      // Trigger recalculation in AppSheet emulator
      try {{
        store.dispatch({{ type: 'editingEmulator/setTriggerRecalculation', payload: true }});
        store.dispatch({{ type: 'editingEmulator/setTriggerRecalculation', payload: false }});
      }} catch(e) {{}}

      store.dispatch({{ type: 'SHOW_SAVE_BUTTON', value: true }});

      console.log("===============================================================");
      console.log("=== [SUCCESS] " + count + " Properties Injected with Full TypeAuxData & Valid_If! ===");
      console.log("=== [ACTION] Click the blue SAVE button in AppSheet top right corner! ===");
      console.log("===============================================================");
    }}
  }} catch (err) {{
    console.error("[ERROR]", err);
  }}
}})();
'''

out_path = 'projects/CmF_SHG_Women_Entrepreneurs/scripts/inject_definitive_multilingual_dropdowns.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"File created: {out_path} ({len(js_code)} bytes, {len(js_code.splitlines())} lines)")
