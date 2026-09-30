function addMatrixHeaders() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AppVariables");
  var existing = sheet.getRange("A:A").getValues().flat();
  var newRows = [
    ["Q_C_06_00","Survey","Related_Q6_Labor","QuestionPrompt, SectionC, Matrix","InlineTable","Q6. Involvement of family members and hired help in business operations","Section C Q6 Labor Header","Subtable Header",6,"Q6. Involvement of family members and hired help in business operations","","","","","","","Q6. व्यवसाय में परिवार के सदस्यों एवं भाड़े के सहायकों की भागीदारी","Q6. काम-धंधे में कुटुंब रा जणां और मजूरां री भागीदारी","users","DevHardi","09/23/2026 14:40:00"],
    ["Q_C_15_00","Survey","Related_Q15_Turnover","QuestionPrompt, SectionC, Matrix","InlineTable","Q15. Turnover and income from the enterprise","Section C Q15 Turnover Header","Subtable Header",15,"Q15. Turnover and income from the enterprise","","","","","","","Q15. उद्यम से टर्नओवर और आय","Q15. काम-धंधे सूं बिक्री और कमाई","trending-up","DevHardi","09/23/2026 14:40:00"],
    ["Q_C_19_00","Survey","Related_Q19_Capital","QuestionPrompt, SectionC, Matrix","InlineTable","Q19. Capital arranged over the enterprise duration","Section C Q19 Capital Header","Subtable Header",19,"Q19. Capital arranged over the enterprise duration","","","","","","","Q19. उद्यम अवधि के दौरान पूंजी की व्यवस्था","Q19. काम-धंधे सारु पूंजी रो इंतज़ाम","dollar-sign","DevHardi","09/23/2026 14:40:00"],
    ["Q_C_20_00","Survey","Related_Q20_Loan_Usage","QuestionPrompt, SectionC, Matrix","InlineTable","Q20. Utilization of loans taken from different sources","Section C Q20 Loan Usage Header","Subtable Header",20,"Q20. Utilization of loans taken from different sources","","","","","","","Q20. विभिन्न स्रोतों से लिए गए ऋण का उपयोग","Q20. अलग-अलग साधनां सूं लिया गया लोन रो उपयोग","credit-card","DevHardi","09/23/2026 14:40:00"],
    ["Q_C_22_00","Survey","Related_Q22_Trajectory","QuestionPrompt, SectionC, Matrix","InlineTable","Q22. Changes in the business over time","Section C Q22 Trajectory Header","Subtable Header",22,"Q22. Changes in the business over time","","","","","","","Q22. व्यवसाय में आए बदलाव","Q22. काम-धंधे में आया बदलाव","activity","DevHardi","09/23/2026 14:40:00"]
  ];
  var toAdd = newRows.filter(function(r) { return existing.indexOf(r[0]) === -1; });
  if (toAdd.length > 0) {
    sheet.getRange(sheet.getLastRow() + 1, 1, toAdd.length, toAdd[0].length).setValues(toAdd);
    SpreadsheetApp.getUi().alert("SUCCESS: Added " + toAdd.length + " rows to AppVariables!");
  } else {
    SpreadsheetApp.getUi().alert("INFO: All 5 rows already exist in AppVariables!");
  }
}
