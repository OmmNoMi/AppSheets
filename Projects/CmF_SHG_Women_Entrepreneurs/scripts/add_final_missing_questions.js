function addFinalMissingQuestions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var appVarSheet = ss.getSheetByName('AppVariables');
  var surveySheet = ss.getSheetByName('Survey');
  
  // 1. Add columns to Survey sheet
  if (surveySheet) {
    var surveyHeaders = surveySheet.getRange(1, 1, 1, surveySheet.getLastColumn()).getValues()[0];
    var colsToAdd = ['MaintainSeparateRecords', 'Competitors_Similar_Scale', 'Competitors_Smaller_Scale', 'Competitors_Higher_Scale'];
    for (var i = 0; i < colsToAdd.length; i++) {
      if (surveyHeaders.indexOf(colsToAdd[i]) === -1) {
        surveySheet.getRange(1, surveySheet.getLastColumn() + 1).setValue(colsToAdd[i]);
        Logger.log('Added column: ' + colsToAdd[i]);
      }
    }
  }
  
  // 2. Add AppVariables rows
  if (appVarSheet) {
    var rows = [["Q_A_18_00", "Survey", "MaintainSeparateRecords", "Prompt", "Enum", "Do you maintain separate records for all the businesses?", "", "Survey Question", "", "", "Yes,No", "", "", "", "", "", "क्या आप सभी व्यवसायों के लिए अलग-अलग हिसाब-किताब / रिकॉर्ड रखती हैं?", "का थे सगळा धंधां रो अलग-अलग हिसाब-किताब रखो हो?", "", "Antigravity", "09/25/2026 21:35:00"], ["Q_D_06_01", "Survey", "Competitors_Similar_Scale", "Prompt", "Number", "How many in your village have a similar business scale as yours?", "", "Survey Question", "", "", "", "", "", "", "", "", "आपके गांव में आपके समान स्तर के कितने व्यवसायी हैं?", "थारे गाम में थारे बराबर रो कितरो व्यापार/धंधो है?", "", "Antigravity", "09/25/2026 21:35:00"], ["Q_D_06_02", "Survey", "Competitors_Smaller_Scale", "Prompt", "Number", "How many in your village have a smaller business scale than yours?", "", "Survey Question", "", "", "", "", "", "", "", "", "आपके गांव में आपसे छोटे स्तर के कितने व्यवसायी हैं?", "थारे गाम में थारै सूं छोटो कितरो काम-धंधो है?", "", "Antigravity", "09/25/2026 21:35:00"], ["Q_D_06_03", "Survey", "Competitors_Higher_Scale", "Prompt", "Number", "How many in your village have a higher business scale than yours?", "", "Survey Question", "", "", "", "", "", "", "", "", "आपके गांव में आपसे बड़े स्तर के कितने व्यवसायी हैं?", "थारे गाम में थारै सूं मोटो कितरो व्यापार है?", "", "Antigravity", "09/25/2026 21:35:00"]];
    appVarSheet.getRange(appVarSheet.getLastRow() + 1, 1, rows.length, rows[0].length).setValues(rows);
    Logger.log('Appended final missing question prompts to AppVariables');
  }
  
  return 'SUCCESS: Added final missing questions!';
}
