function syncAppVariablesAndSurveyDelta() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var appVarSheet = ss.getSheetByName('AppVariables');
  if (!appVarSheet) {
    Logger.log('AppVariables sheet not found');
    return 'ERROR: AppVariables not found';
  }
  
  // 1. Update existing rows if found
  var data = appVarSheet.getDataRange().getValues();
  var updates = {
    'Q_A_09_00': {
      title_en: 'Have you taken help/initiative to overcome these problems?',
      title_hi: 'क्या आपने इन समस्याओं को दूर करने के लिए कोई पहल / सहायता ली?',
      title_raj: 'का थे ईं समस्यावां नै दूर करण खातर कोई पहल या मदद ली?'
    },
    'Q_D_02_00': {
      title_en: 'What are the monthly / seasonal sales across products?',
      title_hi: 'विभिन्न उत्पादों की मासिक / मौसमी बिक्री कितनी है?',
      title_raj: 'अलग-अलग चीजां री महीने या मौसम री बिक्री कितरी है?'
    },
    'CRP_BIZ_PLANS': {
      title_en: 'They helped in preparing Business Plan',
      title_hi: 'उन्होंने बिज़नेस प्लान बनाने में मदद की',
      title_raj: 'उण बिज़नेस प्लान बणावण में मदद करी'
    },
    'Q_G_04_00': {
      var_list: 'EnterpriseChanges'
    }
  };
  
  var existingIds = {};
  for (var i = 1; i < data.length; i++) {
    var id = String(data[i][0]).trim();
    existingIds[id] = i + 1; // 1-based row index
    if (updates[id]) {
      var u = updates[id];
      if (u.title_en) appVarSheet.getRange(i + 1, 6).setValue(u.title_en);
      if (u.title_hi) appVarSheet.getRange(i + 1, 17).setValue(u.title_hi);
      if (u.title_raj) appVarSheet.getRange(i + 1, 18).setValue(u.title_raj);
      if (u.var_list) appVarSheet.getRange(i + 1, 12).setValue(u.var_list);
      Logger.log('Updated existing row: ' + id);
    }
  }
  
  // 2. Append delta rows
  var deltaRows = [["CRP_PROFIT_IDEAS", "AppVariables", "CRPContribution", "Option", "Enum", "They gave us new ideas to improve our profit", "", "CRP Option", "", "They gave us new ideas to improve our profit", "", "", "", "", "", "", "मुनाफा बढ़ाने के नए विचार और तरीके बताए", "मुनाफो बढ़ावण रा नवा तरीका बताया", "", "Antigravity", "09/25/2026 21:15:00"], ["SUPP_HUSBAND_ENCOURAGE", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "My husband encourages and actively supports my business", "", "Husband Support Option", "", "My husband encourages and actively supports my business", "", "", "", "", "", "", "मेरे पति मुझे प्रोत्साहित करते हैं और व्यवसाय में सक्रिय सहयोग देते हैं", "म्हारा पति म्हाने हिम्मत देवै अर काम में पूरो हाथ बंटावै", "", "Antigravity", "09/25/2026 21:15:00"], ["SUPP_HUSBAND_FINANCE", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Husband helps in purchasing materials and managing finances", "", "Husband Support Option", "", "Husband helps in purchasing materials and managing finances", "", "", "", "", "", "", "पति सामान लाने और पैसों के हिसाब-किताब में मदद करते हैं", "पति माल लावण अर पीसां रा हिसाब-किताब में मदद करै", "", "Antigravity", "09/25/2026 21:15:00"], ["SUPP_FAMILY_CHORES", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Family members share household chores so I get time for business", "", "Husband Support Option", "", "Family members share household chores so I get time for business", "", "", "", "", "", "", "परिवार के सदस्य घर के कामों में हाथ बंटाते हैं ताकि मुझे व्यवसाय का समय मिले", "घर का लोग घर रो काम संभालै ताकी म्हाने धंधे रो टेम मिल सकै", "", "Antigravity", "09/25/2026 21:15:00"], ["SUPP_NEUTRAL_NO_INTERFERENCE", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Husband and family are neutral; they neither help nor oppose", "", "Husband Support Option", "", "Husband and family are neutral; they neither help nor oppose", "", "", "", "", "", "", "पति और परिवार तटस्थ हैं; न तो मदद करते हैं और न ही विरोध करते हैं", "पति अर घर का लोग राजी-गैरराजी कोनी, ना मदद करै ना रोकै", "", "Antigravity", "09/25/2026 21:15:00"], ["SUPP_INITIAL_OPPOSITION", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Initially opposed, but supported after seeing business profits", "", "Husband Support Option", "", "Initially opposed, but supported after seeing business profits", "", "", "", "", "", "", "शुरुआत में विरोध था, लेकिन मुनाफा देखकर अब समर्थन करते हैं", "पैली तो ना-नुकर करता, पण कमाई देख'र अब साथ देवे", "", "Antigravity", "09/25/2026 21:15:00"], ["SUPP_NO_SUPPORT_OPPOSED", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Do not support; prefer that I do only household work", "", "Husband Support Option", "", "Do not support; prefer that I do only household work", "", "", "", "", "", "", "समर्थन नहीं करते; चाहते हैं कि मैं केवल घर का काम संभालूं", "साथ कोनी देवे, कहवे घर रो ई काम-धंधो करो", "", "Antigravity", "09/25/2026 21:15:00"], ["OPT_DONT_REMEMBER", "AppVariables", "CommonOptions", "Option", "Enum", "Don’t remember / Not sure", "", "Common Option", "", "Don’t remember / Not sure", "", "", "", "", "", "", "याद नहीं / पक्का पता नहीं", "याद कोनी / पक्को ठा कोनी", "", "Antigravity", "09/25/2026 21:15:00"], ["CHG_REGISTRATION_DOCS", "AppVariables", "EnterpriseChanges", "Option", "Enum", "Got required registration / license / documents made", "", "Enterprise Change Option", "", "Got required registration / license / documents made", "", "", "", "", "", "", "व्यवसाय के लिए जरूरी रजिस्ट्रेशन / लाइसेंस / कागजात बनवाए", "धंधे खातर जरूरी रजिस्ट्रेशन व सरकारी कागज बणवाया", "", "Antigravity", "09/25/2026 21:15:00"], ["REG_UDYAM_AADHAR", "AppVariables", "RegistrationType", "Option", "Enum", "Udyam Aadhar / MSME Registration", "", "Registration Option", "", "Udyam Aadhar / MSME Registration", "", "", "", "", "", "", "उद्यम आधार / एमएसएमई (MSME) पंजीकरण", "उद्यम आधार / एमएसएमई में नाव जुड़वायो", "", "Antigravity", "09/25/2026 21:15:00"], ["REG_FSSAI_TRADE_LICENSE", "AppVariables", "RegistrationType", "Option", "Enum", "FSSAI / Food License / Trade License", "", "Registration Option", "", "FSSAI / Food License / Trade License", "", "", "", "", "", "", "एफएसएसएआई (FSSAI) खाद्य लाइसेंस / व्यापार लाइसेंस", "खाद्य लाइसेंस (FSSAI) / धंधे रो लाइसेंस", "", "Antigravity", "09/25/2026 21:15:00"], ["ORD_INSTAGRAM", "AppVariables", "SalesChannels", "Option", "Enum", "I get orders via Instagram", "", "Sales Channel Option", "", "I get orders via Instagram", "", "", "", "", "", "", "मुझे इंस्टाग्राम (Instagram) के माध्यम से ऑर्डर मिलते हैं", "म्हाने इंस्टाग्राम सूं गिराक रा ऑर्डर मिलै", "", "Antigravity", "09/25/2026 21:15:00"], ["ORD_WHATSAPP", "AppVariables", "SalesChannels", "Option", "Enum", "I get orders via WhatsApp", "", "Sales Channel Option", "", "I get orders via WhatsApp", "", "", "", "", "", "", "मुझे व्हाट्सएप (WhatsApp) के माध्यम से ऑर्डर मिलते हैं", "म्हाने व्हाट्सएप सूं ऑर्डर मिलै", "", "Antigravity", "09/25/2026 21:15:00"], ["ORD_PHONE_CALL", "AppVariables", "SalesChannels", "Option", "Enum", "I get orders over phone calls", "", "Sales Channel Option", "", "I get orders over phone calls", "", "", "", "", "", "", "मुझे फोन कॉल पर ऑर्डर मिलते हैं", "म्हाने फोन कॉल माथे ऑर्डर मिलै", "", "Antigravity", "09/25/2026 21:15:00"], ["ORD_DIRECT_STORE", "AppVariables", "SalesChannels", "Option", "Enum", "Customers come directly to my shop / home", "", "Sales Channel Option", "", "Customers come directly to my shop / home", "", "", "", "", "", "", "ग्राहक सीधे मेरी दुकान / घर पर आकर खरीदते हैं", "गिराक सीधा म्हारी दुकान या घरे आ’र खरीदे", "", "Antigravity", "09/25/2026 21:15:00"], ["ORD_LOCAL_TRADERS", "AppVariables", "SalesChannels", "Option", "Enum", "Local traders / shopkeepers purchase in bulk", "", "Sales Channel Option", "", "Local traders / shopkeepers purchase in bulk", "", "", "", "", "", "", "स्थानीय व्यापारी / दुकानदार थोक में माल खरीदते हैं", "गाम-कस्बे रा व्यापारी थोक में माल लेवे", "", "Antigravity", "09/25/2026 21:15:00"], ["ORD_DOOR_TO_DOOR", "AppVariables", "SalesChannels", "Option", "Enum", "Door-to-door direct sales in village / locality", "", "Sales Channel Option", "", "Door-to-door direct sales in village / locality", "", "", "", "", "", "", "गांव व मोहल्ले में घर-घर जाकर सीधा विक्रय", "गाम व ढाणी में घरां-घरां जा’र बेचणो", "", "Antigravity", "09/25/2026 21:15:00"], ["MKT_WHATSAPP", "AppVariables", "MarketingMedia", "Option", "Enum", "WhatsApp groups and status updates", "", "Marketing Option", "", "WhatsApp groups and status updates", "", "", "", "", "", "", "व्हाट्सएप ग्रुप और स्टेटस अपडेट के जरिए प्रचार", "व्हाट्सएप ग्रुप अर स्टेटस लगा'र प्रचार करूँ", "", "Antigravity", "09/25/2026 21:15:00"], ["PROD_BEAUTY_PARLOUR", "AppVariables", "ProductCategories", "Option", "Enum", "Beauty parlour / Cosmetics services", "", "Product Option", "", "Beauty parlour / Cosmetics services", "", "", "", "", "", "", "ब्यूटी पार्लर / सौंदर्य प्रसाधन सेवाएं", "ब्यूटी पार्लर व शृंगार रो काम", "", "Antigravity", "09/25/2026 21:15:00"], ["PROD_DAIRY_VALUE_ADD", "AppVariables", "ProductCategories", "Option", "Enum", "Dairy products (Ghee, Paneer, Mawa, Curd)", "", "Product Option", "", "Dairy products (Ghee, Paneer, Mawa, Curd)", "", "", "", "", "", "", "डेयरी उत्पाद (घी, पनीर, मावा, दही)", "दूध-दही, घी, पनीर रो काम", "", "Antigravity", "09/25/2026 21:15:00"], ["PROD_HANDICRAFTS_ZARI", "AppVariables", "ProductCategories", "Option", "Enum", "Handicrafts / Zari / Traditional Embroidery", "", "Product Option", "", "Handicrafts / Zari / Traditional Embroidery", "", "", "", "", "", "", "हस्तशिल्प / जरी / कशीदाकारी / पारंपरिक कढ़ाई", "हाथ रो काम, जरी-कशीदाकारी व कढाई", "", "Antigravity", "09/25/2026 21:15:00"], ["INC_ABOVE_4L", "AppVariables", "IncomeBracket", "Option", "Enum", "Above Rs 4,00,000", "", "Income Option", "", "Above Rs 4,00,000", "", "", "", "", "", "", "रु 4,00,000 से अधिक", "4 लाख सूं बत्ता", "", "Antigravity", "09/25/2026 21:15:00"], ["CAP_SALE_ANIMALS", "AppVariables", "CapitalSources", "Option", "Enum", "Sale of livestock / animals", "", "Capital Source Option", "", "Sale of livestock / animals", "", "", "", "", "", "", "पशु / पशुधन की बिक्री", "ढोर-ढांखर (पशु) बेच'र", "", "Antigravity", "09/25/2026 21:15:00"]];
  var toAppend = [];
  for (var j = 0; j < deltaRows.length; j++) {
    var rowId = deltaRows[j][0];
    if (!existingIds[rowId]) {
      toAppend.push(deltaRows[j]);
    }
  }
  
  if (toAppend.length > 0) {
    appVarSheet.getRange(appVarSheet.getLastRow() + 1, 1, toAppend.length, toAppend[0].length).setValues(toAppend);
    Logger.log('Appended ' + toAppend.length + ' delta rows to AppVariables');
  } else {
    Logger.log('All delta rows already exist in AppVariables');
  }
  
  // 3. Ensure columns exist in Survey sheet
  var surveySheet = ss.getSheetByName('Survey');
  if (surveySheet) {
    var surveyHeaders = surveySheet.getRange(1, 1, 1, surveySheet.getLastColumn()).getValues()[0];
    var neededCols = ['FutureFundsRequired', 'DebtRepaidAmount', 'AssetsAcquiredAmount', 'MarriageExpensesAmount', 'MarketPlaces', 'Other_Specify'];
    var missingCols = [];
    for (var k = 0; k < neededCols.length; k++) {
      if (surveyHeaders.indexOf(neededCols[k]) === -1) {
        missingCols.push(neededCols[k]);
      }
    }
    if (missingCols.length > 0) {
      for (var m = 0; m < missingCols.length; m++) {
        surveySheet.getRange(1, surveySheet.getLastColumn() + 1).setValue(missingCols[m]);
      }
      Logger.log('Added missing columns to Survey: ' + missingCols.join(', '));
    } else {
      Logger.log('All needed columns already present in Survey sheet');
    }
  }
  
  return 'SUCCESS: Delta sync completed successfully! Total appended: ' + toAppend.length;
}
