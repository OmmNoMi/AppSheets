/**
 * GOOGLE APPS SCRIPT: REWRITE Q9 SELLING METHODS (13 VERBATIM OPTIONS)
 */
function REWRITE_Q9_SELLING_METHODS_APPVARIABLES() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) {
    Logger.log("[FAIL] AppVariables sheet not found!");
    return;
  }

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

  var all13Sel = "SEL_NOT_REL , SEL_PRODUCE_WAIT_ORDERS , SEL_DOOR_TO_DOOR , SEL_PRIOR_ORDERS , SEL_LOCAL_HAAT , SEL_SARAS_FAIR , SEL_INSTAGRAM , SEL_WHATSAPP , SEL_ONLINE_AMAZON , SEL_ONLINE_MEESHO , SEL_ONLINE_OTHER , SEL_RAJEEVIKA , SEL_OTHER";

  var existingIds = {};
  for (var i = 1; i < data.length; i++) {
    var rowId = data[i][idCol];
    existingIds[rowId] = i + 1;
    if (rowId === "Q_C_09_00") {
      sheet.getRange(i + 1, vcCol + 1).setValue("EnumList");
      sheet.getRange(i + 1, titleCol + 1).setValue("Q9. How do you sell your products/services? (Multiselect)");
      sheet.getRange(i + 1, descCol + 1).setValue("Q9. How do you sell your products/services? (Multiselect)");
      sheet.getRange(i + 1, enumValCol + 1).setValue("Q9. How do you sell your products/services? (Multiselect)");
      sheet.getRange(i + 1, vlistCol + 1).setValue(all13Sel);
      sheet.getRange(i + 1, titleHiCol + 1).setValue("Q9. आप अपने उत्पादों/सेवाओं की बिक्री कैसे करती हैं? (बहु-चयन)");
      sheet.getRange(i + 1, titleRajCol + 1).setValue("Q9. थे आपरा माल/सेवावां री बिक्री कियां करो हो?");
      Logger.log("[OK] Updated Q_C_09_00 to Clean Title and 13 options");
    }
  }

  var newOptions = [
    ["SEL_NOT_REL", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "Not relevant", "Not relevant for this business", "Selling Method Option", "", "Not relevant", "", "", "", "", "", "", "लागू नहीं / प्रासंगिक नहीं", "लागू कोनी", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_PRODUCE_WAIT_ORDERS", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "In case of production related business, I produce slightly more than my last year sales and wait for orders", "Produce slightly more than last year sales and wait for orders", "Selling Method Option", "", "In case of production related business, I produce slightly more than my last year sales and wait for orders", "", "", "", "", "", "", "उत्पादन से जुड़े व्यवसाय में, मैं पिछले साल की बिक्री से थोड़ा अधिक उत्पादन करती हूँ और ऑर्डर का इंतजार करती हूँ", "उत्पादन काम में, म्हे पाछले साल सूं थोड़ो बत्ती माल बणा’र आर्डर री बाट जोवां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_DOOR_TO_DOOR", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I visit local traders/shopkeepers with my products and do door to door selling", "Visit local traders and do door to door selling", "Selling Method Option", "", "I visit local traders/shopkeepers with my products and do door to door selling", "", "", "", "", "", "", "मैं अपने उत्पादों के साथ स्थानीय व्यापारियों/दुकानदारों के पास जाती हूँ और घर-घर जाकर बिक्री करती हूँ", "म्हे माल ले’र दुकानदारां कनै अर घरे-घरे जा’र बेचण रो काम करां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_PRIOR_ORDERS", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I take orders from my usual clients few weeks prior to production/peak season and then sell", "Take orders prior to peak season and then sell", "Selling Method Option", "", "I take orders from my usual clients few weeks prior to production/peak season and then sell", "", "", "", "", "", "", "मैं उत्पादन/पीक सीजन से कुछ हफ्ते पहले अपने नियमित ग्राहकों से ऑर्डर लेती हूँ और फिर बेचती हूँ", "म्हे सीजन सूं पैली ई गिरायकां सूं आर्डर ले’र पछै माल बेचां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_LOCAL_HAAT", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I sell in local haat/weekly market", "Sell in local haat or weekly market", "Selling Method Option", "", "I sell in local haat/weekly market", "", "", "", "", "", "", "मैं स्थानीय हाट / साप्ताहिक बाजार में बेचती हूँ", "म्हे लोकल हाट / सातावारिया बजार में बेचां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_SARAS_FAIR", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I sell in Saras fair", "Sell in Saras fair / exhibitions", "Selling Method Option", "", "I sell in Saras fair", "", "", "", "", "", "", "मैं सरस मेले में बेचती हूँ", "म्हे सरस मेला में बेचां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_INSTAGRAM", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I get orders via instagram", "Get customer orders via Instagram", "Selling Method Option", "", "I get orders via instagram", "", "", "", "", "", "", "मुझे इंस्टाग्राम के माध्यम से ऑर्डर मिलते हैं", "म्हाने इंस्टाग्राम पै आर्डर मिलै", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_WHATSAPP", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I get orders via whatsapp", "Get customer orders via WhatsApp", "Selling Method Option", "", "I get orders via whatsapp", "", "", "", "", "", "", "मुझे व्हाट्सएप के माध्यम से ऑर्डर मिलते हैं", "म्हाने व्हाट्सएप पै आर्डर मिलै", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_ONLINE_AMAZON", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I use online platforms like Amazon", "Sell products online via Amazon", "Selling Method Option", "", "I use online platforms like Amazon", "", "", "", "", "", "", "मैं अमेज़न (Amazon) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "म्हे अमेज़न (Amazon) जैसी ऑनलाइन साइट रो उपयोग करां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_ONLINE_MEESHO", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I use online platform like Meesho", "Sell products online via Meesho", "Selling Method Option", "", "I use online platform like Meesho", "", "", "", "", "", "", "मैं मीशो (Meesho) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "म्हे मीशो (Meesho) जैसी ऑनलाइन साइट रो उपयोग करां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_ONLINE_OTHER", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I use any other online platform", "Sell products via other online platforms", "Selling Method Option", "", "I use any other online platform", "", "", "", "", "", "", "मैं किसी अन्य ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "म्हे दूजी कोई ऑनलाइन साइट रो उपयोग करां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_RAJEEVIKA", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "I use RAJEEVIKA website", "Sell products via RAJEEVIKA website / portal", "Selling Method Option", "", "I use RAJEEVIKA website", "", "", "", "", "", "", "मैं राजीविका (RAJEEVIKA) वेबसाइट / पोर्टल का उपयोग करती हूँ", "म्हे राजीविका वेबसाइट रो उपयोग करां", "", "Antigravity", "09/26/2026 09:50:00"],
    ["SEL_OTHER", "Survey", "SeasonalSalesMethod", "SellingMethodOption, SubOption", "Enum", "Any other, specify", "Any other selling method", "Selling Method Option", "", "Any other, specify", "", "", "", "", "", "", "अन्य कोई तरीका (विवरण दें)", "दूजो कोई तरीको (ब्यौरो दो)", "", "Antigravity", "09/26/2026 09:50:00"]
  ];

  for (var r = 0; r < newOptions.length; r++) {
    var optId = newOptions[r][0];
    if (!existingIds[optId]) {
      sheet.appendRow(newOptions[r]);
      Logger.log("[OK] Appended " + optId);
    }
  }

  Logger.log("=== Q9 SELLING METHODS 13-OPTIONS SYNC COMPLETED SUCCESSFULLY ===");
}
