import json

with open("c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/scripts/generate_strict_sync_script.py", "r") as f:
    code = f.read()

exec(code, globals())

part1 = [v for v in strict_variables if v[3] in ["Metadata", "Section A", "Section B", "Section C"]]
part2 = [v for v in strict_variables if v[3] in ["Section D", "Section E", "Section F", "Section G"]]

print(f"Part 1 length: {len(part1)}")
print(f"Part 2 length: {len(part2)}")

p1_joined = ",\n".join(["    " + json.dumps(v) for v in part1])
p1_code = """function setupAppVariablesPart1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var vSh = ss.getSheetByName("AppVariables") || ss.insertSheet("AppVariables");
  var vCols = ["ID", "Scope", "Name", "Category", "Type", "Label", "VariableList"];
  var rows = [
""" + p1_joined + """
  ];
  vSh.clear();
  vSh.getRange(1, 1, 1, vCols.length).setValues([vCols]).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
  vSh.setRowHeight(1, 35).setFrozenRows(1);
  vSh.getRange(2, 1, rows.length, vCols.length).setValues(rows);
  SpreadsheetApp.getUi().alert("SUCCESS: AppVariables Part 1 (Sections A, B, C) written!");
}
"""

with open("c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/scripts/setup_appvariables_part1.gs", "w", encoding="ascii") as f:
    f.write(p1_code)

p2_joined = ",\n".join(["    " + json.dumps(v) for v in part2])
p2_code = """function setupAppVariablesPart2() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var vSh = ss.getSheetByName("AppVariables") || ss.insertSheet("AppVariables");
  var vCols = ["ID", "Scope", "Name", "Category", "Type", "Label", "VariableList"];
  var rows = [
""" + p2_joined + """
  ];
  var lr = vSh.getLastRow();
  vSh.getRange(lr + 1, 1, rows.length, vCols.length).setValues(rows);
  SpreadsheetApp.getUi().alert("SUCCESS: AppVariables Part 2 (Sections D, E, F, G) appended!");
}
"""

with open("c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/scripts/setup_appvariables_part2.gs", "w", encoding="ascii") as f:
    f.write(p2_code)

print("Created setup_appvariables_part1.gs and setup_appvariables_part2.gs successfully!")
