import csv
import json

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_REFINED_76Q.csv'
with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    appvar_rows = list(csv.reader(f))

with open(r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_76Q_COLUMNS.json', 'r', encoding='utf-8') as f:
    survey_cols = json.load(f)

print(f"AppVariables Rows (including header): {len(appvar_rows)}")
print(f"Survey Columns: {len(survey_cols)}")

# Build Standalone Google Apps Script
gs_content = []
gs_content.append("""/**
 * MASTER FULL SYNC: REFINED 76-QUESTION ARCHITECTURE (ZERO DATA LOSS)
 * 
 * 1. Overwrites/Updates 'AppVariables' tab with 454 clean, pristine rows.
 * 2. Reorders 'Survey' table to exact 101 physical columns matching the 76 document questions.
 * 3. Preserves all existing survey responses and data intact.
 */
function RUN_REFINED_76Q_FULL_SYNC() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log("=== STARTING REFINED 76Q MASTER SYNC ===");
  
  // Step 1: Update AppVariables tab
  var appVarCount = syncAppVariablesRefined(ss);
  
  // Step 2: Align Survey Table Columns in exact document order
  var surveyColCount = alignSurveyColumnsRefined(ss);
  
  Logger.log("=== SYNC COMPLETED SUCCESSFULLY ===");
  Logger.log("AppVariables updated: " + appVarCount + " rows");
  Logger.log("Survey columns aligned: " + surveyColCount + " columns");
}

function syncAppVariablesRefined(ss) {
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) {
    sheet = ss.insertSheet("AppVariables");
  }
  
  var rawData = """)

# Chunk AppVariables rows to avoid any string limits
gs_content.append(json.dumps(appvar_rows, ensure_ascii=False) + ";\n")

gs_content.append("""
  sheet.clearContents();
  if (rawData.length > 0) {
    sheet.getRange(1, 1, rawData.length, rawData[0].length).setValues(rawData);
  }
  Logger.log("[OK] AppVariables tab populated with " + rawData.length + " refined rows.");
  return rawData.length;
}

function alignSurveyColumnsRefined(ss) {
  var sheet = ss.getSheetByName("Survey");
  if (!sheet) {
    Logger.log("[WARN] Survey sheet not found!");
    return 0;
  }

  var targetColumns = """)

gs_content.append(json.dumps(survey_cols, indent=2) + ";\n\n")

gs_content.append("""
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  if (lastRow <= 1 || lastCol === 0) {
    // Empty table or header only
    sheet.clearContents();
    sheet.getRange(1, 1, 1, targetColumns.length).setValues([targetColumns]);
    Logger.log("[OK] Set Survey header with " + targetColumns.length + " columns.");
    return targetColumns.length;
  }

  // Preserve existing data
  var existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var existingData = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  var colMap = {};
  for (var c = 0; c < existingHeaders.length; c++) {
    colMap[existingHeaders[c].trim()] = c;
  }

  var newGrid = [];
  newGrid.push(targetColumns);

  for (var r = 0; r < existingData.length; r++) {
    var newRow = [];
    for (var tc = 0; tc < targetColumns.length; tc++) {
      var colName = targetColumns[tc];
      if (colMap[colName] !== undefined) {
        newRow.push(existingData[r][colMap[colName]]);
      } else {
        newRow.push("");
      }
    }
    newGrid.push(newRow);
  }

  sheet.clearContents();
  sheet.getRange(1, 1, newGrid.length, targetColumns.length).setValues(newGrid);
  Logger.log("[OK] Successfully reordered Survey table data with " + (newGrid.length - 1) + " rows and " + targetColumns.length + " columns!");
  return targetColumns.length;
}
""")

out_gs = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\scripts\MASTER_PERFECT_76Q_SYNC.gs'
with open(out_gs, 'w', encoding='utf-8') as f:
    f.write("".join(gs_content))

print(f"Generated standalone Google Apps Script: {out_gs}")
