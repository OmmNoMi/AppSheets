import csv
import json

# 1. Load Survey Mappings (227 columns)
survey_map = {}
with open('c:/Users/hardi/AppSheets/projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', mode='r', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(reader)
    for row in reader:
        if len(row) >= 3:
            col_name = row[1].strip()
            q_id = row[2].strip()
            if col_name and q_id:
                survey_map[col_name] = q_id

# 2. Add Survey VCs
survey_map['Related_Q6_Labor'] = 'Q_C_06_00'
survey_map['Related_Q15_Turnover'] = 'Q_C_15_00'
survey_map['Related_Q19_Capital'] = 'Q_C_19_00'
survey_map['Related_Q20_Loan_Usage'] = 'Q_C_20_00'
survey_map['Related_Q22_Trajectory'] = 'Q_C_22_00'
survey_map['Related Survey_Tables'] = 'Q_C_06_00'

# 3. Survey_Tables columns
st_map = {
    'Table_Type': 'Q_ST_TABLE_TYPE',
    'Survey_ID': 'Q_ST_SURVEY_ID',
    'ID': 'Q_ST_ID',
    'Row_Item': 'Q_ST_ROW_ITEM',
    'Row_Item_Other': 'Q_ST_ROW_ITEM_OTHER',
    'Labor_Involvement': 'Q_ST_LABOR_INV',
    'Labor_Family_Count': 'Q_ST_LABOR_FAM',
    'Labor_Hired_Count': 'Q_ST_LABOR_HIRED',
    'Labor_Amount_Paid': 'Q_ST_LABOR_AMT',
    'Turnover_Duration_Months': 'Q_ST_TURNOVER_MTH',
    'Turnover_Monthly_Sales': 'Q_ST_TURNOVER_SALES',
    'Turnover_Monthly_Profit': 'Q_ST_TURNOVER_PROFIT',
    'Capital_First_Year': 'Q_ST_CAP_YR1',
    'Capital_In_Between': 'Q_ST_CAP_MID',
    'Capital_Current_Year': 'Q_ST_CAP_CUR',
    'Capital_Pending': 'Q_ST_CAP_PEN',
    'Loan_Usage': 'Q_ST_LOAN_USE',
    'Loan_Usage_Other': 'Q_ST_LOAN_USE_OTHER',
    'Trajectory_First_Year_Mode': 'Q_ST_TRAJ_YR1_MODE',
    'Trajectory_First_Year_Amount': 'Q_ST_TRAJ_YR1_AMT',
    'Trajectory_Current_Year_Amount': 'Q_ST_TRAJ_CUR_AMT'
}

js_lines = [
    '// =========================================================================',
    '// OmmNoMi AppSheet Complete Dynamic Display Names (Survey + Survey_Tables)',
    '// Architecture: =LOOKUP(ID, "AppVariables", "ID", "Label")',
    '// Pure ASCII, Redux Protocol',
    '// =========================================================================',
    '(function applyAllDynamicDisplayNames() {',
    '    try {',
    '        var store = window.appStore;',
    '        if (!store) { console.error("[ERROR] Redux store not found."); return; }',
    '',
    '        var state = store.getState();',
    '        var h = (state.appTemplate && state.appTemplate.history && state.appTemplate.history[0] && state.appTemplate.history[0].appTemplate) || (state.appTemplate && state.appTemplate.current);',
    '        var schemas = (h && h.AppData && h.AppData.DataSchemas) || [];',
    '        var sIdx = schemas.findIndex(function(s) { return s && s.Name && s.Name.indexOf("Survey_Schema") >= 0; });',
    '        var tIdx = schemas.findIndex(function(s) { return s && s.Name && s.Name.indexOf("Survey_Tables_Schema") >= 0; });',
    '',
    '        if (sIdx === -1) { console.error("[ERROR] Survey_Schema not found."); return; }',
    '',
    '        var dict = {};',
    '        var surveyMap = ' + json.dumps(survey_map, separators=(',', ':')) + ';',
    '        var stMap = ' + json.dumps(st_map, separators=(',', ':')) + ';',
    '',
    '        var surveyUpdated = 0;',
    '        schemas[sIdx].Attributes.forEach(function(a, idx) {',
    '            if (surveyMap[a.Name]) {',
    '                var qId = surveyMap[a.Name];',
    '                var formula = "=LOOKUP(\\"" + qId + "\\", \\"AppVariables\\", \\"ID\\", \\"Label\\")";',
    '                a.DisplayName = formula;',
    '                a.Description = "";',
    '                dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].DisplayName"] = formula;',
    '                dict["AppData.DataSchemas[" + sIdx + "].Attributes[" + idx + "].Description"] = "";',
    '                surveyUpdated++;',
    '            }',
    '        });',
    '',
    '        var stUpdated = 0;',
    '        if (tIdx >= 0) {',
    '            schemas[tIdx].Attributes.forEach(function(a, idx) {',
    '                if (stMap[a.Name]) {',
    '                    var qId = stMap[a.Name];',
    '                    var formula = "=LOOKUP(\\"" + qId + "\\", \\"AppVariables\\", \\"ID\\", \\"Label\\")";',
    '                    a.DisplayName = formula;',
    '                    a.Description = "";',
    '                    dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].DisplayName"] = formula;',
    '                    dict["AppData.DataSchemas[" + tIdx + "].Attributes[" + idx + "].Description"] = "";',
    '                    stUpdated++;',
    '                }',
    '            });',
    '        }',
    '',
    '        store.dispatch({ type: "SET_EDITOR_OPTIONS", nameValueDict: dict, recordHistory: true });',
    '        store.dispatch({ type: "SHOW_SAVE_BUTTON", value: true });',
    '',
    '        console.log("[OK] Successfully applied dynamic display names and cleared descriptions!");',
    '        console.log(" -> Survey Table columns updated:", surveyUpdated);',
    '        console.log(" -> Survey_Tables columns updated:", stUpdated);',
    '        console.log(" -> Total attributes updated:", surveyUpdated + stUpdated);',
    '        console.log("[ACTION] Click the top-right blue SAVE button in AppSheet!");',
    '    } catch(err) {',
    '        console.error("[ERROR]", err.message);',
    '    }',
    '})();',
    ''
]

with open('c:/Users/hardi/AppSheets/projects/CmF_SHG_Women_Entrepreneurs/scripts/apply_all_dynamic_display_names.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(js_lines))

print('Wrote scripts/apply_all_dynamic_display_names.js successfully.')
