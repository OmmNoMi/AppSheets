import os
import json
import csv

PROJECT_DIR = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs"
DATA_DIR = os.path.join(PROJECT_DIR, "data")

sheets_config = {}

for name in ['Survey', 'AppVariables', 'AppUser', 'SamplingFrame']:
    csv_file = os.path.join(DATA_DIR, f"{name}.csv")
    with open(csv_file, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        sheets_config[name] = [row for row in reader]

js_code = f"""/**
 * OmmNoMi Automation LLP - Database Auto-Setup Script
 * Target: https://docs.google.com/spreadsheets/d/12VvgSR7GL0Qt6EnPHE4K8AgKb6CTRD8dzT6NzfJzA1I/edit
 * 
 * Features:
 * 1. Automatically cleans and deletes all old/unwanted sheets.
 * 2. Creates the 4 required sheets (Survey, AppVariables, AppUser, SamplingFrame).
 * 3. Applies OmmNoMi brand styling (Roboto, #4285F4 Blue, #34A853 Green).
 * 4. Outputs a comprehensive execution report in both Logger.log / console.log and UI dialog.
 */

function setupDatabase() {{
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const startTime = new Date();
  
  console.log('=======================================================');
  console.log('🚀 OmmNoMi Automation — Survey Engine Setup Started');
  console.log('🕒 Start Time: ' + startTime.toLocaleString());
  console.log('📄 Spreadsheet: ' + ss.getName() + ' (' + ss.getId() + ')');
  console.log('=======================================================');
  
  const sheetsConfig = {json.dumps(sheets_config, ensure_ascii=False)};
  
  const targetSheetNames = ['Survey', 'AppVariables', 'AppUser', 'SamplingFrame'];
  
  // Step 1: Create a safety sheet to avoid "Cannot delete all sheets" error
  let tempSheet = ss.getSheetByName('Temp_Setup_Safety');
  if (!tempSheet) {{
    tempSheet = ss.insertSheet('Temp_Setup_Safety');
  }}
  
  // Step 2: Delete all old sheets that are NOT in targetSheetNames
  console.log('\\n--- STEP 1: CLEANING UP OLD SHEETS ---');
  let deletedSheets = [];
  const existingSheets = ss.getSheets();
  existingSheets.forEach(sheet => {{
    const sName = sheet.getName();
    if (sName !== 'Temp_Setup_Safety' && !targetSheetNames.includes(sName)) {{
      try {{
        ss.deleteSheet(sheet);
        deletedSheets.push(sName);
        console.log('🗑️ Deleted old sheet: ' + sName);
      }} catch (e) {{
        console.warn('⚠️ Could not delete sheet ' + sName + ': ' + e.message);
      }}
    }}
  }});
  if (deletedSheets.length === 0) {{
    console.log('ℹ️ No extraneous old sheets found to delete.');
  }}

  // Step 3: Populate and style each target sheet
  console.log('\\n--- STEP 2: CREATING & POPULATING TARGET SHEETS ---');
  let reportSummary = [];

  for (const [sheetName, rows] of Object.entries(sheetsConfig)) {{
    let sheet = ss.getSheetByName(sheetName);
    let isNew = false;
    if (!sheet) {{
      sheet = ss.insertSheet(sheetName);
      isNew = true;
    }} else {{
      sheet.clear();
      sheet.clearFormats();
    }}
    
    if (rows && rows.length > 0) {{
      const numRows = rows.length;
      const numCols = rows[0].length;
      
      const curMaxRows = sheet.getMaxRows();
      const curMaxCols = sheet.getMaxColumns();
      if (curMaxRows < numRows) {{
        sheet.insertRowsAfter(curMaxRows, numRows - curMaxRows);
      }} else if (curMaxRows > numRows + 20 && curMaxRows > 100) {{
        sheet.deleteRows(numRows + 1, curMaxRows - numRows);
      }}
      
      if (curMaxCols < numCols) {{
        sheet.insertColumnsAfter(curMaxCols, numCols - curMaxCols);
      }} else if (curMaxCols > numCols + 5 && curMaxCols > 50) {{
        sheet.deleteColumns(numCols + 1, curMaxCols - numCols);
      }}
      
      const dataRange = sheet.getRange(1, 1, numRows, numCols);
      dataRange.setValues(rows);
      dataRange.setFontFamily('Roboto');
      
      const headerRange = sheet.getRange(1, 1, 1, numCols);
      headerRange.setFontSize(11)
                 .setFontWeight('bold')
                 .setFontColor('#FFFFFF')
                 .setHorizontalAlignment('center')
                 .setVerticalAlignment('middle');
      
      if (sheetName === 'Survey' || sheetName === 'AppVariables') {{
        headerRange.setBackground('#4285F4'); // OmmNoMi Brand Blue
      }} else {{
        headerRange.setBackground('#34A853'); // OmmNoMi Brand Green
      }}
      sheet.setFrozenRows(1);
      
      const statusMsg = (isNew ? 'Created new' : 'Replaced existing') + ' [' + sheetName + '] with ' + numCols + ' columns and ' + numRows + ' rows.';
      console.log('✅ ' + statusMsg);
      reportSummary.push({{
        name: sheetName,
        columns: numCols,
        rows: numRows,
        status: isNew ? 'Created' : 'Updated'
      }});
    }}
  }}

  // Step 4: Remove the safety temporary sheet
  try {{
    ss.deleteSheet(tempSheet);
  }} catch (e) {{}}

  // Move sheets into proper tab order: Survey, AppVariables, AppUser, SamplingFrame
  targetSheetNames.forEach((sName, idx) => {{
    const s = ss.getSheetByName(sName);
    if (s) {{
      ss.setActiveSheet(s);
      ss.moveActiveSheet(idx + 1);
    }}
  }});
  ss.setActiveSheet(ss.getSheetByName('Survey'));

  const endTime = new Date();
  const elapsedSec = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\\n=======================================================');
  console.log('🎉 EXECUTION COMPLETED SUCCESSFULLY');
  console.log('⏱️ Total Time Elapsed: ' + elapsedSec + ' seconds');
  console.log('📊 REPORT SUMMARY:');
  reportSummary.forEach(r => {{
    console.log('   - ' + r.name + ': ' + r.status + ' (' + r.columns + ' cols x ' + r.rows + ' rows)');
  }});
  console.log('=======================================================');

  let uiMessage = '🎉 Database Setup Execution Report\\n\\n';
  uiMessage += '⏱️ Completed in ' + elapsedSec + ' seconds\\n\\n';
  if (deletedSheets.length > 0) {{
    uiMessage += '🗑️ Deleted Old Sheets: ' + deletedSheets.join(', ') + '\\n\\n';
  }}
  uiMessage += '📊 Configured Tabs:\\n';
  reportSummary.forEach(r => {{
    uiMessage += '  • ' + r.name + ' (' + r.columns + ' columns, ' + r.rows + ' rows)\\n';
  }});
  uiMessage += '\\n✅ All 4 master tabs are ready for AppSheet!';
  
  SpreadsheetApp.getUi().alert('OmmNoMi Survey Engine — Setup Report', uiMessage, SpreadsheetApp.getUi().ButtonSet.OK);
}}

function addRolesAndUserAudit() {{
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const appVarsSheet = ss.getSheetByName("AppVariables");
  const newRoles = [
    ["ROLE_INVESTIGATOR", "AppVariables", "Role", "Option, System", "Enum", "Field Investigator", "Surveys and data collection", "Role Option", "", "Field Investigator", "", "", "", "", "", "", "फील्ड अन्वेषक", "फील्ड अन्वेषक", "user", "DevHardi", new Date().toLocaleString()],
    ["ROLE_SUPERVISOR", "AppVariables", "Role", "Option, System", "Enum", "Field Supervisor", "Verifying and managing field surveys", "Role Option", "", "Field Supervisor", "", "", "", "", "", "", "फील्ड सुपरवाइजर", "फील्ड सुपरवाइजर", "shield", "DevHardi", new Date().toLocaleString()],
    ["ROLE_ADMIN", "AppVariables", "Role", "Option, System", "Enum", "Admin", "Full administrative and reporting access", "Role Option", "", "Admin", "", "", "", "", "", "", "एडमिन", "एडमिन", "settings", "DevHardi", new Date().toLocaleString()],
    ["Q_SYS_ROLE", "AppUser", "Role", "QuestionPrompt, System", "VariableList", "User Role", "AppUser role selector", "", "", "User Role", "", "ROLE_INVESTIGATOR , ROLE_SUPERVISOR , ROLE_ADMIN", "", "", "", "", "उपयोगकर्ता भूमिका", "उपयोगकर्ता भूमिका", "", "DevHardi", new Date().toLocaleString()]
  ];
  appVarsSheet.getRange(appVarsSheet.getLastRow() + 1, 1, newRoles.length, newRoles[0].length).setValues(newRoles);

  const userSheet = ss.getSheetByName("AppUser");
  userSheet.clear();
  const userRows = [
    ["ID", "Name", "Email", "Role", "District", "Language", "DailyTarget", "Status", "LastEditBy", "LastEditOn"],
    ["DevNomi", "Nomeshwer Sharma", "nomeshwer@ommnomi.in", "ROLE_ADMIN", "DIST_JAIPUR", "LANG_EN", 0, "Active", "DevNomi", new Date().toLocaleString()],
    ["DevHardi", "Hardik Sharma", "hardiksharma80912@gmail.com", "ROLE_ADMIN", "DIST_JAIPUR", "LANG_EN", 0, "Active", "DevHardi", new Date().toLocaleString()],
    ["USR_001", "Kavita Meena", "surveyor1@ommnomi.in", "ROLE_INVESTIGATOR", "DIST_BARAN", "LANG_HI", 10, "Active", "DevHardi", new Date().toLocaleString()],
    ["USR_002", "Sunita Sharma", "surveyor2@ommnomi.in", "ROLE_INVESTIGATOR", "DIST_CHURU", "LANG_RAJ", 10, "Active", "DevHardi", new Date().toLocaleString()],
    ["USR_003", "Shehnaz Jahan", "supervisor@ommnomi.in", "ROLE_SUPERVISOR", "DIST_BARAN", "LANG_HI", 20, "Active", "DevHardi", new Date().toLocaleString()]
  ];
  userSheet.getRange(1, 1, userRows.length, userRows[0].length).setValues(userRows);
  userSheet.getRange(1, 1, 1, userRows[0].length).setFontFamily("Roboto").setFontWeight("bold").setBackground("#34A853").setFontColor("#FFFFFF");
  
  SpreadsheetApp.getUi().alert("✅ Roles and AppUser updated with OmmNoMi SOP columns!");
}}
"""

with open(os.path.join(PROJECT_DIR, "Setup_Google_Sheet.js"), "w", encoding="utf-8") as f:
    f.write(js_code)

print("✅ Setup_Google_Sheet.js successfully updated with Roles & SOP AppUser structure!")
