/**
 * =========================================================================
 * OmmNoMi Automation - Google Apps Script: Complete Survey Database Updater
 * =========================================================================
 * 
 * Target: CmF & RAJEEVIKA Study - SHG Women Entrepreneurs Survey Database
 * 
 * Kaise chalana hai (How to run):
 * 1. Apni Google Sheet kholein.
 * 2. Menu me 'Extensions' -> 'Apps Script' par click karein.
 * 3. Ye poora code copy karke wahan paste karein (purane code ko replace kar sakte hain ya naye file me daalein).
 * 4. Upar dropdown se 'runAllOmmNoMiUpdates' select karein aur 'Run' (▶️) button dabayein.
 * 5. Ek baar permissions allow karein, sab kuch automatically update ho jayega!
 */

function runAllOmmNoMiUpdates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  // 1. Update Activities Prefixes [T], [S], [P]
  const countActivities = updateActivityPrefixes(ss);
  
  // 2. Verify and Add Section C Table Question Options (INV, PCT, USE)
  const countOptionsAdded = verifySectionCTableOptions(ss);
  
  const msg = "🚀 [OmmNoMi] Updates Completed Successfully!\n\n" +
              "1. " + countActivities + " Business Activities updated with [T], [S], [P] prefixes.\n" +
              "2. Section C Table Options checked (Added: " + countOptionsAdded + " missing options).\n\n" +
              "Ab AppSheet Editor me jaakar 'Sync' ya 'Save' karein!";
  
  Logger.log(msg);
  ui.alert("OmmNoMi Automation", msg, ui.ButtonSet.OK);
}

/**
 * 1. Updates 25 Q14 Business Activities with [T], [S], [P] prefixes
 */
function updateActivityPrefixes(ss) {
  const avSheet = ss.getSheetByName("AppVariables");
  if (!avSheet) {
    throw new Error("'AppVariables' sheet nahi mili!");
  }
  
  const data = avSheet.getDataRange().getValues();
  const headers = data[0];
  
  const idCol = headers.indexOf("ID");
  const titleCol = headers.indexOf("Title");
  const titleHiCol = headers.indexOf("Title_hi");
  const titleRajCol = headers.indexOf("Title_raj");
  
  if (idCol === -1 || titleCol === -1) {
    throw new Error("'ID' ya 'Title' column nahi mila AppVariables me!");
  }
  
  const PREFIX_MAP = {
    // Trading [T]
    "ACT_VEG_FRUIT": { title: "[T] Vegetable / Fruit", hi: "[T] सब्जी / फल", raj: "[T] सब्जी / फल" },
    "ACT_GROCERY": { title: "[T] Grocery", hi: "[T] किराना", raj: "[T] किराणा" },
    "ACT_FANCY_STORE": { title: "[T] Fancy / Cosmetic / General store", hi: "[T] फैंसी / कॉस्मेटिक / जनरल स्टोर", raj: "[T] प्रसाधन / जनरल स्टोर" },
    "ACT_APPAREL": { title: "[T] Apparel / fabric", hi: "[T] कपड़ा / रेडीमेड वस्त्र", raj: "[T] कपड़ा / वेशभूषा" },
    "ACT_ELECTRIC_GOODS": { title: "[T] Electric goods", hi: "[T] इलेक्ट्रिक सामान", raj: "[T] बिजली रो सामान" },
    "ACT_STONE_SHOP": { title: "[T] Stone shop", hi: "[T] पत्थर की दुकान", raj: "[T] भाटां/पत्थर री दुकान" },
    
    // Servicing [S]
    "ACT_FLOUR_MILL": { title: "[S] Flour mill (Chakki)", hi: "[S] आटा चक्की", raj: "[S] आटा चक्की" },
    "ACT_TAILORING": { title: "[S] Tailoring", hi: "[S] सिलाई / टेलरिंग", raj: "[S] सिलाई / दर्जी काम" },
    "ACT_BEAUTY_PARLOUR": { title: "[S] Beauty parlour", hi: "[S] ब्यूटी पार्लर", raj: "[S] ब्यूटी पार्लर" },
    "ACT_AUTO_REPAIR": { title: "[S] Auto-mechanic / two-wheeler repair", hi: "[S] ऑटो मैकेनिक / दोपहिया मरम्मत", raj: "[S] गाड़ी/मोटरसाइकिल मिस्त्री" },
    "ACT_EMITRA": { title: "[S] E-mitra / Online kiosk", hi: "[S] ई-मित्र / ऑनलाइन केंद्र", raj: "[S] ई-मित्र केंद्र" },
    "ACT_TRANSPORT": { title: "[S] Transport", hi: "[S] परिवहन / वाहन", raj: "[S] गाड़ी भाड़ा / परिवहन" },
    "ACT_TENT_HOUSE": { title: "[S] Tent house", hi: "[S] टेंट हाउस", raj: "[S] टेंट हाउस" },
    "ACT_MOBILE_REPAIR": { title: "[S] Mobile repair shop", hi: "[S] मोबाइल रिपेयर दुकान", raj: "[S] मोबाइल ठीक करण री दुकान" },
    "ACT_STONE_CUTTING": { title: "[S] Stone cutting", hi: "[S] पत्थर कटाई", raj: "[S] पत्थर कटाई" },
    
    // Production [P]
    "ACT_SANITARY_NAPKIN": { title: "[P] Sanitary napkin making", hi: "[P] सैनिटरी नैपकिन निर्माण", raj: "[P] सैनिटरी पैड बणावण" },
    "ACT_HANDICRAFT": { title: "[P] Handicraft", hi: "[P] हस्तशिल्प / कसीदाकारी", raj: "[P] हाथ रो काम / कसीदाकारी" },
    "ACT_DAIRY_MILK": { title: "[P] Dairy shop / Milk collection centre", hi: "[P] डेयरी दुकान / दुग्ध संकलन केंद्र", raj: "[P] दूध डेरी / संकलन केंद्र" },
    "ACT_JUICE": { title: "[P] Juice", hi: "[P] जूस की दुकान", raj: "[P] जूस री दुकान" },
    "ACT_FOOD_PROCESSING": { title: "[P] Food processing (pickle/badi/papad)", hi: "[P] खाद्य प्रसंस्करण (अचार/बड़ी/पापड़ निर्माण)", raj: "[P] अचार, पापड़, बड़ी बणावण" },
    "ACT_FOOD_MAKING": { title: "[P] Food making (Sweets/Namkeen/hotel)", hi: "[P] मिठाई / नमकीन / ढाबा / होटल", raj: "[P] मिठाई / नमकीन / होटल" },
    "ACT_SWEET_BOX": { title: "[P] Sweet box making", hi: "[P] मिठाई के डिब्बे बनाना", raj: "[P] मिठाई रा डिब्बा बणावण" },
    "ACT_FLAG_MAKING": { title: "[P] Flag making", hi: "[P] झंडा निर्माण", raj: "[P] झंडा बणावण" },
    "ACT_LEATHER_PRODUCTS": { title: "[P] Leather products", hi: "[P] चमड़े के उत्पाद / जूते", raj: "[P] चामड़ा रो काम / जूता" },
    "ACT_STONE_IDOLS": { title: "[P] Stone idols", hi: "[P] पत्थर की मूर्तियां", raj: "[P] पत्थर री मूर्तियां बणावण" },
    
    // Other (as is)
    "ACT_ANY_OTHER": { title: "Any other activity", hi: "अन्य कोई गतिविधि", raj: "दूजो कोई काम" }
  };
  
  let updatedCount = 0;
  for (let r = 1; r < data.length; r++) {
    const rowId = String(data[r][idCol]).trim();
    if (PREFIX_MAP[rowId]) {
      const item = PREFIX_MAP[rowId];
      data[r][titleCol] = item.title;
      if (titleHiCol !== -1) data[r][titleHiCol] = item.hi;
      if (titleRajCol !== -1) data[r][titleRajCol] = item.raj;
      updatedCount++;
    }
  }
  
  avSheet.getRange(1, 1, data.length, headers.length).setValues(data);
  return updatedCount;
}

/**
 * 2. Checks and inserts missing Section C Table Options (INV, PCT, USE) into AppVariables
 */
function verifySectionCTableOptions(ss) {
  const avSheet = ss.getSheetByName("AppVariables");
  const data = avSheet.getDataRange().getValues();
  const headers = data[0];
  const idCol = headers.indexOf("ID");
  
  const existingIds = new Set();
  for (let r = 1; r < data.length; r++) {
    existingIds.add(String(data[r][idCol]).trim());
  }
  
  // Essential Section C Table Options
  const REQUIRED_OPTIONS = [
    // Labor Involvement (Q_C_06)
    { id: "INV_REGULAR", table: "AppVariables", col: "LaborInvolvement", title: "Regular", hi: "नियमित", raj: "रोज/नियमित" },
    { id: "INV_OCCASIONAL", table: "AppVariables", col: "LaborInvolvement", title: "Occasional", hi: "कभी-कभार", raj: "कदे-कदाई" },
    { id: "INV_ONLY_RESP", table: "AppVariables", col: "LaborInvolvement", title: "Only respondent", hi: "केवल उत्तरदाता", raj: "सिर्फ म्हैं खुद" },
    { id: "INV_NOT_RELEVANT", table: "AppVariables", col: "LaborInvolvement", title: "Not relevant", hi: "लागू नहीं", raj: "लागू कोनी" },
    
    // Sourcing & Sales Percentages (Q_C_08 & Q_C_12)
    { id: "PCT_0", table: "AppVariables", col: "Percentage", title: "0%", hi: "0%", raj: "0%" },
    { id: "PCT_25", table: "AppVariables", col: "Percentage", title: "25%", hi: "25%", raj: "25%" },
    { id: "PCT_50", table: "AppVariables", col: "Percentage", title: "50%", hi: "50%", raj: "50%" },
    { id: "PCT_75", table: "AppVariables", col: "Percentage", title: "75%", hi: "75%", raj: "75%" },
    { id: "PCT_100", table: "AppVariables", col: "Percentage", title: "100%", hi: "100%", raj: "100%" },
    
    // Capital Trajectory Loan Usage (Q_C_20)
    { id: "USE_SEED_CAPITAL", table: "AppVariables", col: "LoanUsage", title: "Seed capital to buy material and set up shop", hi: "दुकान स्थापित करने हेतु सामग्री व बीज पूंजी", raj: "दुकान सुरू करण और माल लेवण री पूंजी" },
    { id: "USE_NEW_MACHINE", table: "AppVariables", col: "LoanUsage", title: "Buy new machine to increase production (eg: sewing machine)", hi: "उत्पादन क्षमता बढ़ाने हेतु नई मशीन (उदा. सिलाई मशीन)", raj: "नई मशीन खरीदी (जैसें सिलाई मशीन)" },
    { id: "USE_ASSETS_STORE", table: "AppVariables", col: "LoanUsage", title: "Buy assets to store and sell new products (eg: fridge)", hi: "उत्पाद रखने व बेचने हेतु उपकरण (उदा. फ्रिज)", raj: "फ्रिज या दूजो साधन खरीद्यो" },
    { id: "USE_EXPAND_SPACE", table: "AppVariables", col: "LoanUsage", title: "Get additional space to expand business (eg: flour mill)", hi: "व्यवसाय विस्तार हेतु अतिरिक्त जगह (उदा. चक्की का कमरा)", raj: "दुकान/काम बढ़ावण सारु जगह ली" },
    { id: "USE_RANGE_VARIETY", table: "AppVariables", col: "LoanUsage", title: "Buy more material to increase product range", hi: "उत्पादों की विविधता बढ़ाने हेतु अधिक सामग्री", raj: "नवा-नवा माल री वैरायटी लाई" },
    { id: "USE_SCALE_VOLUME", table: "AppVariables", col: "LoanUsage", title: "Buy more material/inputs to increase scale", hi: "व्यापार का पैमाना और स्टॉक बढ़ाने हेतु", raj: "काम रो दायरो बढ़ायो" },
    { id: "USE_VEHICLE", table: "AppVariables", col: "LoanUsage", title: "Buy vehicle to access new market", hi: "माल लाने-ले जाने हेतु वाहन खरीदा", raj: "गाड़ी/वाहन खरीद्यो" },
    { id: "USE_TRANSPORT", table: "AppVariables", col: "LoanUsage", title: "Access better transport services", hi: "बेहतर परिवहन सेवाओं की व्यवस्था", raj: "भाड़ा/गाड़ी री व्यवस्था करी" },
    { id: "USE_SMARTPHONE", table: "AppVariables", col: "LoanUsage", title: "Buy mobile phone to promote/sell online", hi: "ऑनलाइन प्रचार व बिक्री हेतु मोबाइल फोन खरीदा", raj: "स्मार्टफोन खरीद्यो" },
    { id: "USE_OTHER", table: "AppVariables", col: "LoanUsage", title: "Any other, specify", hi: "अन्य कोई उपयोग", raj: "दूजो कोई उपयोग" },
    { id: "USE_NOT_USED", table: "AppVariables", col: "LoanUsage", title: "Not used the source", hi: "इस स्रोत का उपयोग नहीं किया", raj: "यो साधन काम कोनी लियो" }
  ];
  
  const toAppend = [];
  const nowStr = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");
  
  REQUIRED_OPTIONS.forEach(opt => {
    if (!existingIds.has(opt.id)) {
      const newRow = new Array(headers.length).fill("");
      const setCol = (name, val) => {
        const idx = headers.indexOf(name);
        if (idx !== -1) newRow[idx] = val;
      };
      
      setCol("ID", opt.id);
      setCol("Table", opt.table);
      setCol("Column", opt.col);
      setCol("Tags", "Option, TableQuestion");
      setCol("ValueControl", "Enum");
      setCol("Title", opt.title);
      setCol("UsedFor", "Table Matrix Option");
      setCol("EnumValue", opt.title);
      setCol("Title_hi", opt.hi);
      setCol("Title_raj", opt.raj);
      setCol("LastEditBy", "OmmNoMi AppsScript");
      setCol("LastEditOn", nowStr);
      
      toAppend.push(newRow);
    }
  });
  
  if (toAppend.length > 0) {
    avSheet.getRange(data.length + 1, 1, toAppend.length, headers.length).setValues(toAppend);
  }
  
  return toAppend.length;
}
