import json

with open('c:/Users/hardi/AppSheets/projects/CmF_SHG_Women_Entrepreneurs/data/Missing_AppVariables_57_Rows.tsv', 'r', encoding='utf-8') as f:
    lines = [line.strip().split('\t') for line in f if line.strip()]

js_lines = [
    'function addAllMissingAppVariables() {',
    '  var ss = SpreadsheetApp.getActiveSpreadsheet();',
    '  var sheet = ss.getSheetByName("AppVariables");',
    '  if (!sheet) {',
    '    SpreadsheetApp.getUi().alert("ERROR: Tab AppVariables not found in spreadsheet!");',
    '    return;',
    '  }',
    '',
    '  var existing = sheet.getRange("A:A").getValues().flat().filter(String);',
    '  Logger.log("=== START: Checking AppVariables tab ===");',
    '  Logger.log("Existing IDs found: " + existing.length);',
    '',
    '  // 57 Trilingual Rows (5 Headers + 21 Columns + 31 Multilingual Options)',
    '  // Description (col 7) is strictly empty "" so DisplayName is 100% visible',
    '  var rows = ' + json.dumps(lines, ensure_ascii=False) + ';',
    '',
    '  var toAdd = [];',
    '  for (var i = 0; i < rows.length; i++) {',
    '    var r = rows[i];',
    '    var id = r[0];',
    '    if (existing.indexOf(id) === -1) {',
    '      toAdd.push(r);',
    '      Logger.log("[TO ADD] " + id + " | " + r[2] + " | " + r[5]);',
    '    } else {',
    '      Logger.log("[EXISTS] " + id + " already in sheet. Skipping.");',
    '    }',
    '  }',
    '',
    '  if (toAdd.length > 0) {',
    '    var startRow = sheet.getLastRow() + 1;',
    '    sheet.getRange(startRow, 1, toAdd.length, toAdd[0].length).setValues(toAdd);',
    '    Logger.log("=== DONE: Appended " + toAdd.length + " rows starting at row " + startRow + " ===");',
    '    SpreadsheetApp.getUi().alert("SUCCESS: Added " + toAdd.length + " new rows to AppVariables tab!\\nRow " + startRow + " to " + (startRow + toAdd.length - 1));',
    '  } else {',
    '    Logger.log("=== DONE: All 57 rows already present in AppVariables ===");',
    '    SpreadsheetApp.getUi().alert("INFO: All 57 rows already exist in AppVariables! Nothing to add.");',
    '  }',
    '}',
    ''
]

js_code = '\n'.join(js_lines)

with open('c:/Users/hardi/AppSheets/projects/CmF_SHG_Women_Entrepreneurs/scripts/Add_All_Missing_AppVariables.gs', 'w', encoding='utf-8') as f:
    f.write(js_code)

with open('c:/Users/hardi/AppSheets/projects/CmF_SHG_Women_Entrepreneurs/scripts/Add_All_Missing_AppVariables.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print('Updated Add_All_Missing_AppVariables.gs and .js with 57 rows')
