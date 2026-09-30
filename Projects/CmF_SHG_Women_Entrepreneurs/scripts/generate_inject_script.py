import csv
import json

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

survey_map = {}
with open(appvar_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    headers = next(reader)
    id_idx = headers.index('ID')
    tbl_idx = headers.index('Table')
    col_idx = headers.index('Column')
    ctrl_idx = headers.index('ValueControl')
    var_idx = headers.index('VariableList')
    
    for r in reader:
        tbl = r[tbl_idx].strip()
        ctrl = r[ctrl_idx].strip()
        cid = r[id_idx].strip()
        col = r[col_idx].strip()
        vlist = r[var_idx].strip()
        if ctrl in ('Enum', 'EnumList', 'VariableList') and vlist:
            if tbl == 'Survey':
                is_multi = 1 if ctrl == 'EnumList' else 0
                survey_map[col] = [cid, is_multi]

subtable_map = {
    'Survey_Labor': {
        'Activity': ['COL_LABOR_ACTIVITY', 0],
        'Activity_Name': ['COL_LABOR_ACTIVITY', 0],
        'Involvement_Type': ['COL_LABOR_INVOLVEMENT', 0],
        'Amount_Paid_Last_Year': ['COL_LABOR_AMOUNT_PAID', 0]
    },
    'Survey_Turnover': {
        'Season': ['COL_TURN_SEASON', 0],
        'Season_Type': ['COL_TURN_SEASON', 0]
    },
    'Survey_Capital_Arrangement': {
        'Source': ['COL_CAP_SOURCE', 0],
        'Capital_Source': ['COL_CAP_SOURCE', 0]
    },
    'Survey_Loan_Usage': {
        'Source': ['COL_LOAN_SOURCE', 0],
        'Loan_Usage_Purpose': ['COL_LOAN_USAGE', 0],
        'Loan_Usage': ['COL_LOAN_USAGE', 0]
    },
    'Survey_Business_Changes': {
        'Indicator_Heading': ['COL_CHG_HEADING', 0]
    }
}

survey_json = json.dumps(survey_map, separators=(',', ':'))
sub_json = json.dumps(subtable_map, separators=(',', ':'))

lines = [
    '// ==============================================================================',
    '// OmmNoMi: Set ALL Options to Enum/EnumList with BaseType Ref -> AppVariables',
    '// Pure ASCII, C# Deserializer Compliant',
    '// ==============================================================================',
    '(function setAllOptionsRefAppVariables() {',
    '  try {',
    '    console.clear();',
    '    console.log("=== [OmmNoMi] Setting ALL Option Columns to Ref -> AppVariables ===");',
    '',
    '    var store = window.appStore || (function() {',
    '      var all = document.querySelectorAll("*");',
    '      for (var i = 0; i < all.length; i++) {',
    '        var el = all[i], k = Object.keys(el).find(function(x) { return x.startsWith("__reactFiber") || x.startsWith("__reactInternal"); });',
    '        var f = k && el[k];',
    '        while (f) {',
    '          if (f.memoizedProps && f.memoizedProps.store && f.memoizedProps.store.dispatch) return f.memoizedProps.store;',
    '          if (f.stateNode && f.stateNode.store && f.stateNode.store.dispatch) return f.stateNode.store;',
    '          f = f.return;',
    '        }',
    '      }',
    '    })();',
    '    if (!store) return console.error("[FAIL] Store not found. Editor me kisi column par click karein.");',
    '    window.appStore = store;',
    '',
    '    var h = (store.getState().appTemplate.history && store.getState().appTemplate.history[0] && store.getState().appTemplate.history[0].appTemplate) || store.getState().appTemplate.current;',
    '    var schemas = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataSchemas) || []));',
    '    var actions = JSON.parse(JSON.stringify((h.AppData && h.AppData.DataActions) || []));',
    '',
    '    var surveyMap = ' + survey_json + ';',
    '    var subMap = ' + sub_json + ';',
    '',
    '    var totalUpdated = 0;',
    '',
    '    schemas.forEach(function(s) {',
    '      var sName = (s.Name || "").replace(/_Schema$/, "");',
    '      (s.Attributes || []).forEach(function(a) {',
    '        var match = null;',
    '        if (sName === "Survey" && surveyMap[a.Name]) {',
    '          match = surveyMap[a.Name];',
    '        } else if (subMap[sName] && subMap[sName][a.Name]) {',
    '          match = subMap[sName][a.Name];',
    '        }',
    '',
    '        if (match) {',
    '          var qid = match[0];',
    '          var isMulti = match[1] === 1;',
    '          var validIf = (a.Name === "Block")',
    '            ? \'=SELECT(AppVariables[ID], AND([Column] = "Block", [Description] = [_THISROW].[District]))\'',
    '            : \'=SPLIT(LOOKUP("\' + qid + \'", "AppVariables", "ID", "VariableList"), " , ")\';',
    '',
    '          var targetType = isMulti ? "EnumList" : "Enum";',
    '          var aux = typeof a.TypeAuxData === "string" ? JSON.parse(a.TypeAuxData || "{}") : (a.TypeAuxData || {});',
    '',
    '          a.Type = targetType;',
    '          a.BaseType = "Ref";',
    '          a.ReferencedTableName = "AppVariables";',
    '          a.ReferencedRootTableName = "AppVariables";',
    '          a.Valid_If = validIf;',
    '          a.ValidIf = validIf;',
    '          a.Suggested_Values = validIf;',
    '          a.SuggestedValues = validIf;',
    '          a.DisplayName = \'=LOOKUP("\' + qid + \'", "AppVariables", "ID", "Label")\';',
    '          a.EnumValues = null;',
    '',
    '          aux.BaseType = "Ref";',
    '          aux.ReferencedTableName = "AppVariables";',
    '          aux.ReferencedRootTableName = "AppVariables";',
    '          aux.AllowOtherValues = false;',
    '          aux.EnumValues = null;',
    '          aux.Valid_If = validIf;',
    '          aux.Suggested_Values = validIf;',
    '          aux.EnumInputMode = "Dropdown";',
    '          aux.BaseTypeQualifier = JSON.stringify({ ReferencedTableName: "AppVariables", ReferencedKeyColumn: "ID" });',
    '',
    '          if (isMulti) {',
    '            aux.ElementType = "Ref";',
    '            aux.ElementTypeQualifier = aux.BaseTypeQualifier;',
    '            aux.ItemSeparator = " , ";',
    '            a.EnumListElementTypeName = "Ref";',
    '          }',
    '',
    '          a.TypeAuxData = JSON.stringify(aux);',
    '          totalUpdated++;',
    '        }',
    '      });',
    '    });',
    '',
    '    var cleanActions = actions.filter(function(a) { return a.Name !== "Btn_Capital_Loans"; });',
    '',
    '    store.dispatch({',
    '      type: "SET_EDITOR_OPTIONS",',
    '      nameValueDict: {',
    '        "AppData.DataSchemas": schemas,',
    '        "AppData.DataActions": cleanActions',
    '      },',
    '      recordHistory: true,',
    '      ignoreConstraints: false,',
    '      skipNavigation: false',
    '    });',
    '',
    '    store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });',
    '    console.log("=== [SUCCESS] " + totalUpdated + " Option Columns Updated to Ref -> AppVariables! Click SAVE! ===");',
    '  } catch(e) { console.error("[FAIL]", e); }',
    '})();',
    ''
]

out_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\scripts\inject_all_options_ref_appvariables.js'
with open(out_path, 'w', encoding='ascii') as f:
    f.write('\n'.join(lines))

print(f'Successfully wrote {out_path} ({len(lines)} lines)')
