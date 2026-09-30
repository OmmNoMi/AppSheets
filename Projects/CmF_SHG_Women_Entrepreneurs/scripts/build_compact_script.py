import csv
import json
import re

with open(r'scratch/WCH/Survey.html', 'r', encoding='utf-8') as f:
    html = f.read()

trs = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
header_row = []
for tr in trs:
    tds = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.DOTALL)
    clean = [re.sub(r'<[^>]+>', '', t).strip() for t in tds]
    if 'RespondentName' in clean:
        header_row = [c for c in clean if c]
        break

with open(r'Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
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

# Format: 'Col': ['QID', is_drop, is_multi]
lines = []
for c in survey_cols:
    info = col_info.get(c, {})
    is_drop = 1 if (info.get('has_vlist') or info.get('vctrl') in ['Enum', 'EnumList']) else 0
    is_multi = 1 if info.get('is_multi') else 0
    qid = info.get('qid', '')
    lines.append(f'      "{c}": ["{qid}", {is_drop}, {is_multi}]')

qmap_str = "{\n" + ",\n".join(lines) + "\n    }"

js_code = f'''// ==============================================================================
// OmmNoMi Master Multilingual DisplayName & Dropdown Configuration
// ==============================================================================
(function runOmmNoMiMultilingualSetup() {{
  try {{
    console.clear();
    console.log("=== [OmmNoMi] Starting Multilingual DisplayNames & Dropdowns Setup ===");

    // 1. Locate Store
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
    if (!store) return console.error("[FAIL] Store not found! AppSheet editor me kisi column par click karein.");

    var h = store.getState().appTemplate.history[0].appTemplate;
    var schemas = h.AppData && h.AppData.DataSchemas;
    if (!schemas) return console.error("[FAIL] DataSchemas not found.");

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
    function setColProp(sIdx, cIdx, prop, val) {{
      nameValueDict['AppData.DataSchemas[' + sIdx + '].Attributes[' + cIdx + '].' + prop] = val;
      count++;
    }}

    var refQ = JSON.stringify({{ ReferencedTableName: "AppVariables", ReferencedRootTableName: "AppVariables", ReferencedType: "Text", ReferencedKeyColumn: "ID", IsAPartOf: false, InputMode: "Auto" }});
    var enumListAux = JSON.stringify({{ ElementType: "Ref", ElementTypeQualifier: refQ, ItemSeparator: " , " }});
    var enumAux = JSON.stringify({{ EnumValues: [], AllowOtherValues: false, AutoCompleteOtherValues: true, BaseType: "Ref", BaseTypeQualifier: refQ, EnumInputMode: "Auto" }});

    // 2. Configure Survey Table: 79 Questions
    var surveyItem = schemaMap['Survey'];
    var QMAP = {qmap_str};

    if (surveyItem) {{
      var sIdx = surveyItem.idx;
      var sAttrs = surveyItem.schema.Attributes || [];
      var surveyUpdated = 0;
      sAttrs.forEach(function(attr, aIdx) {{
        var c = attr.Name;
        if (!c || !QMAP[c]) return;
        var info = QMAP[c];
        var qid = info[0], isDrop = info[1], isMulti = info[2];

        setColProp(sIdx, aIdx, 'DisplayName', '=LOOKUP("' + qid + '", "AppVariables", "ID", "Label")');
        if (isDrop) {{
          var vF = '=SPLIT(LOOKUP("' + qid + '", "AppVariables", "ID", "VariableList"), " , ")';
          setColProp(sIdx, aIdx, 'ValidIf', vF);
          setColProp(sIdx, aIdx, 'Valid_If', vF);
          setColProp(sIdx, aIdx, 'ReferencedTableName', 'AppVariables');
          if (isMulti) {{
            setColProp(sIdx, aIdx, 'Type', 'EnumList');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumListAux);
          }} else {{
            setColProp(sIdx, aIdx, 'Type', 'Enum');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumAux);
          }}
        }}
        surveyUpdated++;
      }});
      console.log("[OK] Configured " + surveyUpdated + " Survey columns.");
    }}

    // 3. Configure 5 Sub-Tables
    var subConfigs = {{
      'Survey_Labor': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Activity': {{ dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' }},
        'Involvement_Type': {{ dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")' }},
        'Family_Members_Count': {{ dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' }},
        'Hired_Help_Count': {{ dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' }},
        'Amount_Paid_Last_Year': {{ dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")' }}
      }},
      'Survey_Turnover': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Season': {{ dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")' }},
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
        'Loan_Usage_Purpose': {{ dName: '=LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "Label")', validIf: '=SPLIT(LOOKUP("COL_LOAN_USAGE", "AppVariables", "ID", "VariableList"), " , ")' }}
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
        if (c.isRef) {{ setColProp(subIdx, aIdx, 'Type', 'Ref'); setColProp(subIdx, aIdx, 'ReferencedTableName', c.refTable); setColProp(subIdx, aIdx, 'IsPartOf', c.isPartOf); }}
        if (c.initial) setColProp(subIdx, aIdx, 'InitialValue', c.initial);
        if (c.isKey !== undefined) setColProp(subIdx, aIdx, 'IsKey', c.isKey);
        if (c.dName) setColProp(subIdx, aIdx, 'DisplayName', c.dName);
        if (c.validIf) {{
          setColProp(subIdx, aIdx, 'ValidIf', c.validIf);
          setColProp(subIdx, aIdx, 'Valid_If', c.validIf);
          setColProp(subIdx, aIdx, 'Type', 'Enum');
          setColProp(subIdx, aIdx, 'EnumListElementTypeName', 'Ref');
          setColProp(subIdx, aIdx, 'ReferencedTableName', 'AppVariables');
          setColProp(subIdx, aIdx, 'TypeAuxData', enumAux);
        }}
      }});
      console.log("[OK] Configured sub-table: " + tbl);
    }});

    // 4. Batch Dispatch to Redux
    if (count > 0) {{
      store.dispatch({{ type: 'SET_EDITOR_OPTIONS', nameValueDict: nameValueDict, recordHistory: true, ignoreConstraints: false, skipNavigation: false }});
      store.dispatch({{ type: 'SHOW_SAVE_BUTTON', value: true }});
      console.log("=== [SUCCESS] " + count + " Properties Updated! Blue SAVE button active! ===");
    }}
  }} catch (err) {{
    console.error("[ERROR]", err);
  }}
}})();
'''

out_path = r'projects/CmF_SHG_Women_Entrepreneurs/scripts/master_multilingual_display_and_dropdowns_compact.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_code)

print(f"Compact file created: {out_path} ({len(js_code)} bytes, {len(js_code.splitlines())} lines)")
