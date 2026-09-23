import json, re

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/Add_All_Missing_AppVariables.gs', 'r', encoding='utf-8') as f:
    text = f.read()

match = re.search(r'var rows = (\[.*?\]);', text, re.DOTALL)
rows = json.loads(match.group(1))

part1 = rows[:26]
part2 = rows[26:]

def make_script(name, data, label):
    header = 'function ' + name + '() {\n'
    header += '  var ss = SpreadsheetApp.getActiveSpreadsheet();\n'
    header += '  var sheet = ss.getSheetByName("AppVariables");\n'
    header += '  if (!sheet) { SpreadsheetApp.getUi().alert("ERROR: Tab AppVariables not found!"); return; }\n\n'
    header += '  var existing = sheet.getRange("A:A").getValues().flat().filter(String);\n'
    header += '  Logger.log("=== START: " + "' + label + '" + " ===");\n\n'
    header += '  var rows = ' + json.dumps(data, ensure_ascii=False) + ';\n\n'
    header += '  var toAdd = [];\n'
    header += '  for (var i = 0; i < rows.length; i++) {\n'
    header += '    var r = rows[i];\n'
    header += '    if (existing.indexOf(r[0]) === -1) {\n'
    header += '      toAdd.push(r);\n'
    header += '      Logger.log("[TO ADD] " + r[0] + " | " + r[2] + " | " + r[5]);\n'
    header += '    } else {\n'
    header += '      Logger.log("[EXISTS] " + r[0] + " already in sheet. Skipping.");\n'
    header += '    }\n'
    header += '  }\n\n'
    header += '  if (toAdd.length > 0) {\n'
    header += '    var startRow = sheet.getLastRow() + 1;\n'
    header += '    sheet.getRange(startRow, 1, toAdd.length, toAdd[0].length).setValues(toAdd);\n'
    header += '    Logger.log("=== DONE: Added " + toAdd.length + " rows at " + startRow + " ===");\n'
    header += '    SpreadsheetApp.getUi().alert("SUCCESS: Added " + toAdd.length + " rows! Starting at row " + startRow);\n'
    header += '  } else {\n'
    header += '    Logger.log("=== DONE: All rows already present ===");\n'
    header += '    SpreadsheetApp.getUi().alert("INFO: All rows already exist!");\n'
    header += '  }\n'
    header += '}\n'
    return header

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/Add_Part1_Headers_And_Columns.gs', 'w', encoding='utf-8') as f:
    f.write(make_script('addPart1_HeadersAndColumns', part1, 'Part 1: Headers & Columns'))

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/Add_Part2_Dropdown_Options.gs', 'w', encoding='utf-8') as f:
    f.write(make_script('addPart2_DropdownOptions', part2, 'Part 2: Multilingual Options'))

print('Successfully generated Part 1 and Part 2!')
