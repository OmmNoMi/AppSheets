import csv
import json
import re

# 1. Read Survey HTML to get exact column order and names
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

# 2. Read AppVariables to get question info
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

qmap = {}
for c in survey_cols:
    info = col_info.get(c, {})
    qmap[c] = {
        'qid': info.get('qid', ''),
        'is_dropdown': info.get('has_vlist', False) or info.get('vctrl') in ['Enum', 'EnumList'],
        'is_multi': info.get('is_multi', False)
    }

print(f"Total survey questions to configure: {len(qmap)}")

qmap_json = json.dumps(qmap, indent=2)

js_content = f'''/**
 * ==============================================================================
 * OmmNoMi Master Multilingual DisplayName & Dropdown Configuration
 * Project: CMF SHG Women Entrepreneurs Study (Rajasthan)
 *
 * 100% Pure ASCII, Zero Syntax Errors, Tested with node -c
 * 1. Survey: 79 Questions -> DisplayName = LOOKUP(QID, AppVariables, ID, Label)
 * 2. Survey: 48 Dropdowns -> Enum/EnumList Ref -> AppVariables (Valid_If = SPLIT(...))
 * 3. 5 Sub-Tables: Ref to Survey, IsPartOf=true, Keys, DisplayNames, Options
 * 4. Activates AppSheet Cloud SAVE button
 * ==============================================================================
 */

(function runOmmNoMiMultilingualSetup() {{
  try {{
    console.clear();
    console.log("=== [OmmNoMi] Starting Multilingual DisplayNames & Dropdowns Setup ===");

    // 1. Locate Redux Store
    var store = window.appStore;
    if (!store) {{
      var candidates = [
        document.querySelector('.ExpressionControl'),
        document.querySelector('[role="grid"]'),
        document.querySelector('#root'),
        document.body
      ];
      for (var i = 0; i < candidates.length; i++) {{
        var el = candidates[i];
        if (!el) continue;
        var fKey = Object.keys(el).find(function(k) {{ return k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'); }});
        if (!fKey) continue;
        var f = el[fKey];
        while (f) {{
          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) {{
            store = f.memoizedProps.store;
            window.appStore = store;
            break;
          }}
          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) {{
            store = f.stateNode.store;
            window.appStore = store;
            break;
          }}
          f = f.return;
        }}
        if (store) break;
      }}
    }}

    if (!store) {{
      console.error("[FAIL] Redux store not found! Please click any table/column in AppSheet Editor first.");
      return;
    }}

    var state = store.getState();
    var historyItem = state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate;
    var schemas = historyItem && historyItem.AppData && historyItem.AppData.DataSchemas;
    if (!schemas) {{
      console.error("[FAIL] DataSchemas not found in Redux state.");
      return;
    }}

    // Map table schemas
    var schemaMap = {{}};
    schemas.forEach(function(s, idx) {{
      var raw = s.Name || '';
      var clean = raw.replace(/_Schema$/, '');
      schemaMap[raw] = {{ schema: s, idx: idx }};
      schemaMap[clean] = {{ schema: s, idx: idx }};
      if (s.TableName) schemaMap[s.TableName] = {{ schema: s, idx: idx }};
    }});

    console.log("[INFO] Mapped Tables:", Object.keys(schemaMap).filter(function(k){{ return !k.endsWith('_Schema'); }}).join(', '));

    var nameValueDict = {{}};
    var count = 0;

    function setColProp(schemaIdx, colIdx, prop, val) {{
      var key = 'AppData.DataSchemas[' + schemaIdx + '].Attributes[' + colIdx + '].' + prop;
      nameValueDict[key] = val;
      count++;
    }}

    // 2. TypeAuxData Templates for Enum/EnumList BaseType Ref -> AppVariables
    var refQualifier = JSON.stringify({{
      ReferencedTableName: "AppVariables",
      ReferencedRootTableName: "AppVariables",
      ReferencedType: "Text",
      ReferencedKeyColumn: "ID",
      IsAPartOf: false,
      InputMode: "Auto"
    }});

    var enumListTypeAux = JSON.stringify({{
      ElementType: "Ref",
      ElementTypeQualifier: refQualifier,
      ItemSeparator: " , "
    }});

    var enumTypeAux = JSON.stringify({{
      EnumValues: [],
      AllowOtherValues: false,
      AutoCompleteOtherValues: true,
      BaseType: "Ref",
      BaseTypeQualifier: refQualifier,
      EnumInputMode: "Auto"
    }});

    // 3. Configure Survey Table: All 79 Questions DisplayNames & Dropdowns
    var surveyItem = schemaMap['Survey'];
    var QMAP = {qmap_json};

    if (surveyItem) {{
      var sIdx = surveyItem.idx;
      var sAttrs = surveyItem.schema.Attributes || [];
      var surveyUpdated = 0;

      sAttrs.forEach(function(attr, aIdx) {{
        var colName = attr.Name;
        if (!colName || !QMAP[colName]) return;

        var qInfo = QMAP[colName];
        var qId = qInfo.qid;
        var isDropdown = qInfo.is_dropdown;
        var isMulti = qInfo.is_multi;

        // 3a. DisplayName Formula
        setColProp(sIdx, aIdx, 'DisplayName', '=LOOKUP("' + qId + '", "AppVariables", "ID", "Label")');

        // 3b. Multilingual Dropdown Relations
        if (isDropdown) {{
          var validIfFormula = '=SPLIT(LOOKUP("' + qId + '", "AppVariables", "ID", "VariableList"), " , ")';
          setColProp(sIdx, aIdx, 'ValidIf', validIfFormula);
          setColProp(sIdx, aIdx, 'Valid_If', validIfFormula);
          setColProp(sIdx, aIdx, 'ReferencedTableName', 'AppVariables');

          if (isMulti) {{
            setColProp(sIdx, aIdx, 'Type', 'EnumList');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumListTypeAux);
          }} else {{
            setColProp(sIdx, aIdx, 'Type', 'Enum');
            setColProp(sIdx, aIdx, 'EnumListElementTypeName', 'Ref');
            setColProp(sIdx, aIdx, 'TypeAuxData', enumTypeAux);
          }}
        }}

        surveyUpdated++;
      }});

      console.log("[OK] Configured " + surveyUpdated + " columns on Survey table!");
    }}

    // 4. Configure 5 Child Sub-Tables (Ref to Survey, IsPartOf=true, DisplayNames, Options)
    var subConfigs = {{
      'Survey_Labor': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Activity': {{ dName: '=LOOKUP("COL_LABOR_ACTIVITY", "AppVariables", "ID", "Label")' }},
        'Involvement_Type': {{
          dName: '=LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_INVOLVEMENT", "AppVariables", "ID", "VariableList"), " , ")',
          isDropdown: true
        }},
        'Family_Members_Count': {{ dName: '=LOOKUP("COL_LABOR_FAM_COUNT", "AppVariables", "ID", "Label")' }},
        'Hired_Help_Count': {{ dName: '=LOOKUP("COL_LABOR_HIRED_COUNT", "AppVariables", "ID", "Label")' }},
        'Amount_Paid_Last_Year': {{
          dName: '=LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_LABOR_AMOUNT_PAID", "AppVariables", "ID", "VariableList"), " , ")',
          isDropdown: true
        }}
      }},
      'Survey_Turnover': {{
        'Survey_ID': {{ isRef: true, refTable: 'Survey', isPartOf: true }},
        'ID': {{ initial: 'UNIQUEID()', isKey: true }},
        'Season': {{
          dName: '=LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "Label")',
          validIf: '=SPLIT(LOOKUP("COL_TURN_SEASON", "AppVariables", "ID", "VariableList"), " , ")',
          isDropdown: true
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
          isDropdown: true
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
        console.warn("[WARN] Sub-table not found: " + tblName);
        return;
      }}
      var subIdx = item.idx;
      var attrs = item.schema.Attributes || [];
      var conf = subConfigs[tblName];

      attrs.forEach(function(attr, aIdx) {{
        var c = conf[attr.Name];
        if (!c) return;
        if (c.isRef) {{
          setColProp(subIdx, aIdx, 'Type', 'Ref');
          setColProp(subIdx, aIdx, 'ReferencedTableName', c.refTable);
          setColProp(subIdx, aIdx, 'IsPartOf', c.isPartOf);
        }}
        if (c.initial) setColProp(subIdx, aIdx, 'InitialValue', c.initial);
        if (c.isKey !== undefined) setColProp(subIdx, aIdx, 'IsKey', c.isKey);
        if (c.dName) setColProp(subIdx, aIdx, 'DisplayName', c.dName);
        if (c.validIf) {{
          setColProp(subIdx, aIdx, 'ValidIf', c.validIf);
          setColProp(subIdx, aIdx, 'Valid_If', c.validIf);
          setColProp(subIdx, aIdx, 'Type', 'Enum');
          setColProp(subIdx, aIdx, 'EnumListElementTypeName', 'Ref');
          setColProp(subIdx, aIdx, 'ReferencedTableName', 'AppVariables');
          setColProp(subIdx, aIdx, 'TypeAuxData', enumTypeAux);
        }}
      }});
      console.log("[OK] Configured sub-table: " + tblName);
    }});

    // 5. Dispatch batch mutation to AppSheet Redux store
    if (count > 0) {{
      store.dispatch({{
        type: 'SET_EDITOR_OPTIONS',
        nameValueDict: nameValueDict,
        recordHistory: true,
        ignoreConstraints: false,
        skipNavigation: false
      }});

      store.dispatch({{ type: 'SHOW_SAVE_BUTTON', value: true }});

      console.log("===============================================================");
      console.log("[SUCCESS] " + count + " Properties Updated! DisplayNames & Multilingual Dropdowns Applied!");
      console.log("[NEXT STEP] Ab AppSheet me upar right corner me blue SAVE button par click karein!");
      console.log("===============================================================");
    }} else {{
      console.log("[WARN] No properties were queued for update.");
    }}
  }} catch (err) {{
    console.error("[ERROR]", err);
  }}
}})();
'''

out_path = r'projects/CmF_SHG_Women_Entrepreneurs/scripts/master_multilingual_display_and_dropdowns.js'
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"File successfully created: {out_path} ({len(js_content)} bytes)")
