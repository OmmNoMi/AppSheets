import json

with open("c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/scripts/generate_strict_sync_script.py", "r") as f:
    code = f.read()

exec(code, globals())

# strict_variables: [ID, Scope, Name, Category, Type, Label, VariableList]
# Let's verify each has 7 fields:
for v in strict_variables:
    assert len(v) == 7

cols = [v[0] for v in strict_variables]
cols_json = json.dumps(cols)

# Build compact rows: [Name, Category, Type, Label, VariableList]
compact_rows = [[v[2], v[3], v[4], v[5], v[6]] for v in strict_variables]
rows_lines = ",\n".join(["    " + json.dumps(r) for r in compact_rows])

gs_script = f"""// ==============================================================================
// OmmNoMi: Master Database & AppVariables One-Click Sync
// Exact 85 Columns, Strictly 15 Section C Questions, 100% Pure ASCII
// ==============================================================================
function updateDatabaseAndVariablesMaster() {{
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. UPDATE SURVEY TABLE (Exact 85 Columns)
  var cols = {cols_json};
  var sh = ss.getSheetByName("Survey") || ss.insertSheet("Survey");
  var lr = sh.getLastRow(), lc = sh.getLastColumn();
  var oldH = (lr && lc) ? sh.getRange(1, 1, 1, lc).getValues()[0] : [];
  var oldD = (lr > 1) ? sh.getRange(2, 1, lr - 1, lc).getValues() : [];

  var newD = oldD.map(function(r) {{
    var m = {{}}; oldH.forEach(function(h, i) {{ m[h] = r[i]; }});
    return cols.map(function(k) {{
      if (m[k] !== undefined) return m[k];
      if (k === "RespondentPhone" && m["ContactNumber"] !== undefined) return m["ContactNumber"];
      if (k === "MonthlyRent" && m["AnnualRent"] !== undefined) return m["AnnualRent"];
      return "";
    }});
  }});

  sh.clear();
  sh.getRange(1, 1, 1, cols.length).setValues([cols]).setBackground("#1a73e8").setFontColor("#fff").setFontWeight("bold");
  sh.setRowHeight(1, 35).setFrozenRows(1);
  if (newD.length) sh.getRange(2, 1, newD.length, cols.length).setValues(newD);

  // 2. UPDATE APPVARIABLES TABLE (Exact 85 Questions & Options)
  var vSh = ss.getSheetByName("AppVariables") || ss.insertSheet("AppVariables");
  var vHeaders = ["ID", "Scope", "Name", "Category", "Type", "Label", "VariableList"];
  var rawData = [
{rows_lines}
  ];

  var finalVars = rawData.map(function(item) {{
    return [item[0], "Survey", item[0], item[1], item[2], item[3], item[4]];
  }});

  vSh.clear();
  vSh.getRange(1, 1, 1, vHeaders.length).setValues([vHeaders]).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
  vSh.setRowHeight(1, 35).setFrozenRows(1);
  vSh.getRange(2, 1, finalVars.length, vHeaders.length).setValues(finalVars);

  // 3. VERIFY 5 SUB-TABLES
  var sub = {{
    "Survey_Labor": "ID,Survey_ID,Activity,Involvement_Type,Family_Members_Count,Hired_Help_Count,Amount_Paid_Last_Year,Remarks".split(","),
    "Survey_Turnover": "ID,Survey_ID,Season,Duration_Months,Monthly_Sales,Monthly_Net_Profit,Remarks".split(","),
    "Survey_Capital_Arrangement": "ID,Survey_ID,Source,Amount_First_Year,Amount_In_Between_Years,Amount_Current_Year_2026_27,Amount_Pending,Remarks".split(","),
    "Survey_Loan_Usage": "ID,Survey_ID,Source,Loan_Usage_Purpose,Remarks".split(","),
    "Survey_Business_Changes": "ID,Survey_ID,Indicator_Heading,First_Year_Value,Current_Year_Value,Remarks".split(",")
  }};
  for (var t in sub) {{
    var s = ss.getSheetByName(t) || ss.insertSheet(t);
    if (s.getLastRow() === 0) {{
      s.getRange(1, 1, 1, sub[t].length).setValues([sub[t]]).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
      s.setRowHeight(1, 35).setFrozenRows(1);
    }}
  }}

  SpreadsheetApp.getUi().alert("SUCCESS: Survey (85 columns), AppVariables (85 variables), and 5 Sub-Tables updated!");
}}
"""

with open("c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/scripts/update_database_and_variables_master.gs", "w", encoding="ascii") as f:
    f.write(gs_script)

print("Generated update_database_and_variables_master.gs successfully!")
