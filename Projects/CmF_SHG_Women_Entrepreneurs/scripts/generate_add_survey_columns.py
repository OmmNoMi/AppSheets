# -*- coding: utf-8 -*-
"""
Generate Apps Script to add all missing physical columns to Survey sheet
"""

columns_to_add = [
    "FutureFundsRequired",
    "DebtRepaidAmount",
    "AssetsAcquiredAmount",
    "MarriageExpensesAmount",
    "MarketPlaces",
    "ReasonsStartingBusinessOther",
    "MarketingMethodsOther",
    "CurrentChallengesOther",
    "CompetitorAdvantagesOther",
    "FutureExpansionPlansOther",
    "AspirationBottlenecksOther",
    "SupportNeededForSustenanceOther"
]

js_code = f"""
function addMissingColumnsToSurvey() {{
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Survey');
  const lastCol = sheet.getLastColumn();
  const existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  
  const colsToAdd = {columns_to_add};
  const newCols = [];
  
  for (let i = 0; i < colsToAdd.length; i++) {{
    if (!existingHeaders.includes(colsToAdd[i])) {{
      newCols.push(colsToAdd[i]);
    }}
  }}
  
  if (newCols.length > 0) {{
    sheet.getRange(1, lastCol + 1, 1, newCols.length).setValues([newCols]);
    Logger.log('Added ' + newCols.length + ' new columns to Survey sheet: ' + JSON.stringify(newCols));
  }} else {{
    Logger.log('All columns already exist in Survey sheet.');
  }}
}}
"""

with open(r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\scripts\add_survey_columns.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("Generated add_survey_columns.js")
