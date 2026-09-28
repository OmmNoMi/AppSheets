# -*- coding: utf-8 -*-
"""
Generate Google Apps Script to sync entire AppVariables table to Google Sheets
"""
import csv
import json

APPVARIABLES_PATH = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(APPVARIABLES_PATH, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

# Prepare chunks of rows to prevent memory limits
rows_json = json.dumps(rows, ensure_ascii=False)

gs_code = f"""
function syncAppVariablesToGoogleSheet() {{
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('AppVariables');
  
  const allRows = {rows_json};
  
  Logger.log('Writing ' + allRows.length + ' rows and ' + allRows[0].length + ' columns to AppVariables...');
  
  // Clear existing data
  sheet.clearContents();
  
  // Set number format to plain text for key columns to prevent auto-conversion of dates
  const numRows = allRows.length;
  const numCols = allRows[0].length;
  
  // Write in batch
  sheet.getRange(1, 1, numRows, numCols).setNumberFormat("@").setValues(allRows);
  
  Logger.log('Successfully synced all ' + numRows + ' rows to Google Sheets AppVariables!');
}}
"""

with open(r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\scripts\sync_appvariables.js', 'w', encoding='utf-8') as f:
    f.write(gs_code)

print("Generated sync_appvariables.js")
