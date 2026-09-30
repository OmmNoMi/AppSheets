/**
 * GOOGLE APPS SCRIPT: UPDATE Q10 SALES CHANNELS PERCENTAGE BREAKDOWN
 */
function UPDATE_Q10_SALES_CHANNELS_APPVARIABLES() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf("ID");
  var vcCol = headers.indexOf("ValueControl");
  var titleCol = headers.indexOf("Title");
  var descCol = headers.indexOf("Description");
  var enumValCol = headers.indexOf("EnumValue");
  var vlistCol = headers.indexOf("VariableList");
  var titleHiCol = headers.indexOf("Title_hi");
  var titleRajCol = headers.indexOf("Title_raj");

  var pct15VList = "PCT15_0 , PCT15_15 , PCT15_30 , PCT15_45 , PCT15_60 , PCT15_75 , PCT15_90 , PCT15_100";

  var updates = {
    "Q_C_10_00": { "vc": "Section_Header", "title": "Q10. What percentage of your products/services get sold through following channels?", "title_hi": "Q10. आपके उत्पादों/सेवाओं का कितना प्रतिशत निम्नलिखित माध्यमों से बिकता है?", "title_raj": "Q10. थारे माल/सेवावां रो कित्तो प्रतिशत इण जरिया सूं बिकै है?", "vlist": pct15VList },
    "Q_C_12_00_SUMMARY": { "vc": "Section_Header", "title": "Q10. What percentage of your products/services get sold through following channels?", "title_hi": "Q10. आपके उत्पादों/सेवाओं का कितना प्रतिशत निम्नलिखित माध्यमों से बिकता है?", "title_raj": "Q10. थारे माल/सेवावां रो कित्तो प्रतिशत इण जरिया सूं बिकै है?", "vlist": pct15VList },
    "Q_C_10_01": { "vc": "Enum", "title": "a. Online platforms", "title_hi": "a. ऑनलाइन प्लेटफॉर्म (Online platforms)", "title_raj": "a. ऑनलाइन साइट्स", "vlist": pct15VList },
    "Q_C_10_02": { "vc": "Enum", "title": "b. Whatsapp", "title_hi": "b. व्हाट्सएप (WhatsApp)", "title_raj": "b. व्हाट्सएप", "vlist": pct15VList },
    "Q_C_10_03": { "vc": "Enum", "title": "c. Instagram", "title_hi": "c. इंस्टाग्राम (Instagram)", "title_raj": "c. इंस्टाग्राम", "vlist": pct15VList },
    "Q_C_10_04": { "vc": "Enum", "title": "d. Your premise", "title_hi": "d. आपकी अपनी दुकान / परिसर से", "title_raj": "d. खुद् री दुकान सूं", "vlist": pct15VList },
    "Q_C_10_05": { "vc": "Enum", "title": "e. Local traders/shopkeepers", "title_hi": "e. स्थानीय व्यापारियों / दुकानदारों के माध्यम से", "title_raj": "e. लोकल दुकानदारां सूं", "vlist": pct15VList },
    "Q_C_10_06": { "vc": "Enum", "title": "f. Local haat/market", "title_hi": "f. स्थानीय हाट / साप्ताहिक बाजार", "title_raj": "f. लोकल हाट / सातावारिया बजार", "vlist": pct15VList },
    "Q_C_10_07": { "vc": "Enum", "title": "g. Saras fair", "title_hi": "g. सरस मेला", "title_raj": "g. सरस मेला", "vlist": pct15VList }
  };

  var existingIds = {};
  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][idCol];
    existingIds[rowId] = i + 1;
    if (updates[rowId]) {
      var u = updates[rowId];
      if (vcCol !== -1) sheet.getRange(i + 1, vcCol + 1).setValue(u.vc);
      if (titleCol !== -1) sheet.getRange(i + 1, titleCol + 1).setValue(u.title);
      if (descCol !== -1) sheet.getRange(i + 1, descCol + 1).setValue(u.title);
      if (enumValCol !== -1) sheet.getRange(i + 1, enumValCol + 1).setValue(u.title);
      if (vlistCol !== -1) sheet.getRange(i + 1, vlistCol + 1).setValue(u.vlist);
      if (titleHiCol !== -1) sheet.getRange(i + 1, titleHiCol + 1).setValue(u.title_hi);
      if (titleRajCol !== -1) sheet.getRange(i + 1, titleRajCol + 1).setValue(u.title_raj);
    }
  }

  var pct15Rows = [
    ["PCT15_0", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "0%", "0% of sales", "Sales Channel Percentage Option", "0", "0%", "", "", "", "", "", "", "0%", "0%", "", "Antigravity", "09/26/2026 10:00:00"],
    ["PCT15_15", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "upto 15%", "Upto 15% of sales", "Sales Channel Percentage Option", "15", "upto 15%", "", "", "", "", "", "", "15% तक", "15% तांई", "", "Antigravity", "09/26/2026 10:00:00"],
    ["PCT15_30", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "upto 30%", "Upto 30% of sales", "Sales Channel Percentage Option", "30", "upto 30%", "", "", "", "", "", "", "30% तक", "30% तांई", "", "Antigravity", "09/26/2026 10:00:00"],
    ["PCT15_45", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "upto 45%", "Upto 45% of sales", "Sales Channel Percentage Option", "45", "upto 45%", "", "", "", "", "", "", "45% तक", "45% तांई", "", "Antigravity", "09/26/2026 10:00:00"],
    ["PCT15_60", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "upto 60%", "Upto 60% of sales", "Sales Channel Percentage Option", "60", "upto 60%", "", "", "", "", "", "", "60% तक", "60% तांई", "", "Antigravity", "09/26/2026 10:00:00"],
    ["PCT15_75", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "upto 75%", "Upto 75% of sales", "Sales Channel Percentage Option", "75", "upto 75%", "", "", "", "", "", "", "75% तक", "75% तांई", "", "Antigravity", "09/26/2026 10:00:00"],
    ["PCT15_90", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "upto 90%", "Upto 90% of sales", "Sales Channel Percentage Option", "90", "upto 90%", "", "", "", "", "", "", "90% तक", "90% तांई", "", "Antigravity", "09/26/2026 10:00:00"],
    ["PCT15_100", "Survey", "SalesChannelsPct", "SalesChannelPctOption, SubOption", "Enum", "100%", "100% of sales", "Sales Channel Percentage Option", "100", "100%", "", "", "", "", "", "", "100%", "100%", "", "Antigravity", "09/26/2026 10:00:00"]
  ];

  for (var r = 0; r < pct15Rows.length; r++) {
    var optId = pct15Rows[r][0];
    if (!existingIds[optId]) {
      sheet.appendRow(pct15Rows[r]);
    }
  }
  Logger.log("[OK] Q10 Sales Channels percentage synced successfully!");
}
