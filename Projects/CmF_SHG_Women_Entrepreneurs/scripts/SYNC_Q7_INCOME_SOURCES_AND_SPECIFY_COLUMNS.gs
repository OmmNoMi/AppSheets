/**
 * GOOGLE APPS SCRIPT: ADD Q7 INCOME SOURCES (14 OPTIONS) + 2 SPECIFY COLUMNS
 * 
 * 1. Updates Q7 (Q_B_07_00) VariableList with all 14 options (including g. Sale of animals & n. Any other, specify).
 * 2. Adds INC_ANIMAL_SALE, INC_OTHER, Q_B_07_01, Q_B_07_02 to AppVariables tab.
 * 3. Safely inserts FamilyIncome_AnimalSale_Specify and FamilyIncomeSourcesOther into Survey sheet right after FamilyIncomeSources.
 */
function SYNC_Q7_INCOME_SOURCES_AND_SPECIFY_COLUMNS() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // ==========================================
  // PART 1: UPDATE APPVARIABLES TAB
  // ==========================================
  var appVarSheet = ss.getSheetByName("AppVariables");
  if (!appVarSheet) {
    Logger.log("[FAIL] AppVariables sheet not found!");
    return;
  }

  var data = appVarSheet.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf("ID");
  var vlistCol = headers.indexOf("VariableList");

  var all14IncomeList = "INC_AGRI , INC_SALARY , INC_WAGES , INC_SELF_EMP , INC_NTFP , INC_DAIRY , INC_ANIMAL_SALE , INC_ANIMAL_PROD , INC_FAMILY_ENT , INC_RESP_ENT , INC_MNREGA , INC_PENSION , INC_RENT , INC_OTHER";

  var existingIds = {};
  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][idCol];
    existingIds[rowId] = i + 1;
    if (rowId === "Q_B_07_00") {
      appVarSheet.getRange(i + 1, vlistCol + 1).setValue(all14IncomeList);
      Logger.log("[OK] Updated Q_B_07_00 VariableList with 14 options");
    }
  }

  var newAppVarRows = [
    ["INC_ANIMAL_SALE", "Survey", "IncomeSource", "IncomeSourceOption, SubOption", "Enum", "Sale of animals", "Income from sale of livestock / animals", "Income Source Option", "", "Sale of animals", "", "", "", "", "", "", "पशु बिक्री (जानवरों का बेचना)", "पशु बेचना / लेन-देन", "", "Antigravity", "09/26/2026 08:45:00"],
    ["INC_OTHER", "Survey", "IncomeSource", "IncomeSourceOption, SubOption", "Enum", "Any other, specify", "Any other source of household income", "Income Source Option", "", "Any other, specify", "", "", "", "", "", "", "अन्य कोई स्रोत (विवरण दें)", "दूजो कोई स्रोत", "", "Antigravity", "09/26/2026 08:45:00"],
    ["Q_B_07_01", "Survey", "FamilyIncome_AnimalSale_Specify", "QuestionPrompt, SectionB, Order:35.1", "Text", "Q7.1 Sale of animals (Specify details / type of animals)", "Specify details and type of animals sold", "Survey Question", "35.1", "Q7.1 Sale of animals (Specify details / type of animals)", "", "", "", "", "", "", "Q7.1 पशु बिक्री का विवरण (कौन से पशु / विवरण दें)", "Q7.1 पशु बिक्री रो विवरण (कुणसा पशु / ब्यौरो)", "", "Antigravity", "09/26/2026 08:45:00"],
    ["Q_B_07_02", "Survey", "FamilyIncomeSourcesOther", "QuestionPrompt, SectionB, Order:35.2", "Text", "Q7.2 Any other source of income (Specify)", "Specify any other source of family income", "Survey Question", "35.2", "Q7.2 Any other source of income (Specify)", "", "", "", "", "", "", "Q7.2 अन्य आय का स्रोत (विवरण दें)", "Q7.2 दूजी आमदनी रो स्रोत (ब्यौरो दो)", "", "Antigravity", "09/26/2026 08:45:00"]
  ];

  for (var r = 0; r < newAppVarRows.length; r++) {
    var optId = newAppVarRows[r][0];
    if (existingIds[optId]) {
      Logger.log("[INFO] " + optId + " already exists in AppVariables at row " + existingIds[optId]);
    } else {
      appVarSheet.appendRow(newAppVarRows[r]);
      Logger.log("[OK] Appended " + optId + " to AppVariables");
    }
  }

  // ==========================================
  // PART 2: SAFELY UPDATE SURVEY SHEET COLUMNS
  // ==========================================
  var surveySheet = ss.getSheetByName("Survey");
  if (surveySheet) {
    var sHeaders = surveySheet.getRange(1, 1, 1, surveySheet.getLastColumn()).getValues()[0];
    var incomeSourcesIdx = sHeaders.indexOf("FamilyIncomeSources");
    
    if (incomeSourcesIdx !== -1) {
      var hasAnimalCol = sHeaders.indexOf("FamilyIncome_AnimalSale_Specify") !== -1;
      var hasOtherCol = sHeaders.indexOf("FamilyIncomeSourcesOther") !== -1;
      
      // Insert right after FamilyIncomeSources (1-based index)
      var insertAfterCol = incomeSourcesIdx + 1;
      
      if (!hasAnimalCol) {
        surveySheet.insertColumnAfter(insertAfterCol);
        surveySheet.getRange(1, insertAfterCol + 1).setValue("FamilyIncome_AnimalSale_Specify");
        Logger.log("[OK] Inserted column 'FamilyIncome_AnimalSale_Specify' into Survey sheet");
        insertAfterCol++;
      }
      
      if (!hasOtherCol) {
        surveySheet.insertColumnAfter(insertAfterCol);
        surveySheet.getRange(1, insertAfterCol + 1).setValue("FamilyIncomeSourcesOther");
        Logger.log("[OK] Inserted column 'FamilyIncomeSourcesOther' into Survey sheet");
      }
    }
  }

  Logger.log("=== FULL Q7 INCOME SOURCES SYNC COMPLETED WITH ZERO DATA LOSS ===");
}
