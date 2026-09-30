/**
 * OmmNoMi: Populate VariableList for Q6, Q15, Q17, Q18, Q20 in AppVariables Sheet
 * Run this in Google Sheets: Extensions > Apps Script > Run 'updateSubtableVariableLists'
 */
function updateSubtableVariableLists() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("AppVariables sheet not found!");
    return;
  }
  
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idIdx = headers.indexOf("ID");
  var varListIdx = headers.indexOf("VariableList");
  
  if (idIdx === -1 || varListIdx === -1) {
    SpreadsheetApp.getUi().alert("ID or VariableList column not found in AppVariables!");
    return;
  }
  
  var updates = {
    "COL_LABOR_ACTIVITY": "ROW_LABOR_PURCHASE , ROW_LABOR_PROD , ROW_LABOR_SERV , ROW_LABOR_MKTG , ROW_LABOR_SALE , ROW_LABOR_RECORD , ROW_LABOR_OTHER",
    "COL_TURN_SEASON": "ROW_TURN_PEAK , ROW_TURN_AVG , ROW_TURN_LEAN",
    "COL_CAP_SOURCE": "ROW_CAP_SAVINGS , ROW_CAP_FAMILY , ROW_CAP_PROFIT , ROW_CAP_MORTG_GOLD , ROW_CAP_SOLD_GOLD , ROW_CAP_FAM_LOAN , ROW_CAP_MONEYLENDER , ROW_CAP_SHG_LOAN , ROW_CAP_OSF_LOAN , ROW_CAP_OSF_SUBSIDY , ROW_CAP_PRIV_SAVING , ROW_CAP_NBFC , ROW_CAP_MUDRA , ROW_CAP_BANK , ROW_CAP_OTHER",
    "COL_LOAN_SOURCE": "ROW_CAP_SAVINGS , ROW_CAP_FAMILY , ROW_CAP_PROFIT , ROW_CAP_MORTG_GOLD , ROW_CAP_SOLD_GOLD , ROW_CAP_FAM_LOAN , ROW_CAP_MONEYLENDER , ROW_CAP_SHG_LOAN , ROW_CAP_OSF_LOAN , ROW_CAP_OSF_SUBSIDY , ROW_CAP_PRIV_SAVING , ROW_CAP_NBFC , ROW_CAP_MUDRA , ROW_CAP_BANK , ROW_CAP_OTHER",
    "COL_LOAN_USAGE": "USE_SEED_CAPITAL , USE_NEW_MACHINE , USE_ASSETS_STORE , USE_EXPAND_SPACE , USE_RANGE_VARIETY , USE_SCALE_VOLUME , USE_VEHICLE , USE_TRANSPORT , USE_SMARTPHONE , USE_OTHER , USE_NOT_USED",
    "COL_CHG_HEADING": "ROW_TRAJ_SALES , ROW_TRAJ_INCOME , ROW_TRAJ_STOCK , ROW_TRAJ_INPUTS , ROW_TRAJ_FINISHED , ROW_TRAJ_ASSETS"
  };
  
  var count = 0;
  for (var r = 1; r < data.length; r++) {
    var rowId = String(data[r][idIdx]).trim();
    if (updates[rowId]) {
      sheet.getRange(r + 1, varListIdx + 1).setValue(updates[rowId]);
      count++;
    }
  }
  
  SpreadsheetApp.getUi().alert("Success! Updated " + count + " VariableList entries in AppVariables.");
}
