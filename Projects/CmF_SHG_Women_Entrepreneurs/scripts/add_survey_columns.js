
function addMissingColumnsToSurvey() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Survey');
  const lastCol = sheet.getLastColumn();
  const existingHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  
  const colsToAdd = ['FutureFundsRequired', 'DebtRepaidAmount', 'AssetsAcquiredAmount', 'MarriageExpensesAmount', 'MarketPlaces', 'ReasonsStartingBusinessOther', 'MarketingMethodsOther', 'CurrentChallengesOther', 'CompetitorAdvantagesOther', 'FutureExpansionPlansOther', 'AspirationBottlenecksOther', 'SupportNeededForSustenanceOther'];
  const newCols = [];
  
  for (let i = 0; i < colsToAdd.length; i++) {
    if (!existingHeaders.includes(colsToAdd[i])) {
      newCols.push(colsToAdd[i]);
    }
  }
  
  if (newCols.length > 0) {
    sheet.getRange(1, lastCol + 1, 1, newCols.length).setValues([newCols]);
    Logger.log('Added ' + newCols.length + ' new columns to Survey sheet: ' + JSON.stringify(newCols));
  } else {
    Logger.log('All columns already exist in Survey sheet.');
  }
}
