/**
 * GOOGLE APPS SCRIPT: UPDATE MKT_NAME_BOARD TO FULL TEXT
 */
function FIX_MKT_NAME_BOARD_FULL_TEXT() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf("ID");
  var titleCol = headers.indexOf("Title");
  var descCol = headers.indexOf("Description");
  var enumValCol = headers.indexOf("EnumValue");
  var titleHiCol = headers.indexOf("Title_hi");
  var titleRajCol = headers.indexOf("Title_raj");

  var fullText = "I have name board outside my premises with details of my products/services";

  for (var i = 1; i < data.length; i++) {
    if (data[i][idCol] === "MKT_NAME_BOARD") {
      if (titleCol !== -1) sheet.getRange(i + 1, titleCol + 1).setValue(fullText);
      if (descCol !== -1) sheet.getRange(i + 1, descCol + 1).setValue(fullText);
      if (enumValCol !== -1) sheet.getRange(i + 1, enumValCol + 1).setValue(fullText);
      if (titleHiCol !== -1) sheet.getRange(i + 1, titleHiCol + 1).setValue("दुकान/घर के बाहर बोर्ड लगा है जिस पर मेरे उत्पादों/सेवाओं का विवरण है");
      if (titleRajCol !== -1) sheet.getRange(i + 1, titleRajCol + 1).setValue("दुकान/घर रै बारै बोर्ड लाग्यो है जिण पै म्हारे माल/सेवावां रो ब्यौरो है");
      Logger.log("[OK] Updated MKT_NAME_BOARD to full verbatim text!");
      break;
    }
  }
}
