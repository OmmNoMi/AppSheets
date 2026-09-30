# -*- coding: utf-8 -*-
"""
Master Batch Fixer for all 42 Testing Team Comments
AppSheet: SHG_Women
"""
import csv
import json

APPVARIABLES_PATH = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

# Read existing AppVariables
with open(APPVARIABLES_PATH, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

headers = rows[0]
data_rows = rows[1:]

id_map = {r[0]: idx for idx, r in enumerate(data_rows)}

print(f"Loaded {len(data_rows)} rows from AppVariables.csv")

# 1. Update Wording & Question Prompts (Category E)
# E1 (#6 Business Plan): Q_E_06_00 / CRP_BIZ_PLANS
# E2 (#19 Assets wording): FinancialHelpFromIncome / Asset purchase
# E3 (#25 Seasonal sales): Q_D_02_00
# E4 (#28 Trader Pre-Orders): Q_D_01_00
# E5 (#29 Door-to-door): ORD_DOOR_TO_DOOR
# E6 (#30 Sales) & E7 (#31 Services)
# E8 (#33 Hastakshep Translation): Q_A_09_00 (EPInterventionType)

WORDING_UPDATES = {
    # Q_A_09_00: Replace 'hastakshep' with 'Pahal / Sahayata'
    "Q_A_09_00": {
        "Title_hi": "उद्यम संवर्धन (EP) पहल / सहायता का प्रकार",
        "Title_raj": "उद्यम संवर्धन (EP) सहायता रो प्रकार"
    },
    # CRP_BIZ_PLANS: Business plan clean phrasing
    "CRP_BIZ_PLANS": {
        "Title_en": "Helped us understand business plans",
        "Title_hi": "बिजनेस प्लान (व्यावसायिक योजना) को समझने और बनाने में मदद की",
        "Title_raj": "बिजनेस प्लान बणावण अर समझण में मदद करी"
    },
    # Q_D_02_00: Remove 'seasonal production', focus on sales method
    "Q_D_02_00": {
        "Title_en": "How do you sell your products/services?",
        "Title_hi": "आप अपने उत्पादों/सेवाओं की बिक्री कैसे करते हैं?",
        "Title_raj": "थारो माल अर सेवावां कियां बेचो छो?"
    }
}

for q_id, updates in WORDING_UPDATES.items():
    if q_id in id_map:
        idx = id_map[q_id]
        if "Title_en" in updates:
            data_rows[idx][5] = updates["Title_en"]
            data_rows[idx][9] = updates["Title_en"]
        if "Title_hi" in updates:
            data_rows[idx][16] = updates["Title_hi"]
        if "Title_raj" in updates:
            data_rows[idx][17] = updates["Title_raj"]
        print(f"Updated wording for {q_id}")

# 2. Add New Options
NEW_OPTIONS = [
    # Comment #5: Profit Ideas
    ["CRP_PROFIT_IDEAS", "AppVariables", "CRPContribution", "Option", "Enum", "They gave us new ideas to improve our profit", "", "CRP Option", "", "They gave us new ideas to improve our profit", "", "", "", "", "", "", "मुनाफा बढ़ाने के नए विचार और तरीके बताए", "मुनाफो बढ़ावण रा नवा तरीका बताया", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #13: Husband Support Dynamics
    ["SUPP_HUSBAND_ENCOURAGE", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "My husband encourages and actively supports my business", "", "Husband Support Option", "", "My husband encourages and actively supports my business", "", "", "", "", "", "", "मेरे पति मुझे प्रोत्साहित करते हैं और व्यवसाय में सक्रिय सहयोग देते हैं", "म्हारा पति म्हाने हिम्मत देवै अर काम में पूरो हाथ बंटावै", "", "Antigravity", "09/25/2026 21:15:00"],
    ["SUPP_HUSBAND_FINANCE", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Husband helps in purchasing materials and managing finances", "", "Husband Support Option", "", "Husband helps in purchasing materials and managing finances", "", "", "", "", "", "", "पति सामान लाने और पैसों के हिसाब-किताब में मदद करते हैं", "पति माल लावण अर पीसां रा हिसाब-किताब में मदद करै", "", "Antigravity", "09/25/2026 21:15:00"],
    ["SUPP_FAMILY_CHORES", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Family members share household chores so I get time for business", "", "Husband Support Option", "", "Family members share household chores so I get time for business", "", "", "", "", "", "", "परिवार के सदस्य घर के कामों में हाथ बंटाते हैं ताकि मुझे व्यवसाय का समय मिले", "घर का लोग घर रो काम संभालै ताकी म्हाने धंधे रो टेम मिल सकै", "", "Antigravity", "09/25/2026 21:15:00"],
    ["SUPP_NEUTRAL_NO_INTERFERENCE", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Husband and family are neutral; they neither help nor oppose", "", "Husband Support Option", "", "Husband and family are neutral; they neither help nor oppose", "", "", "", "", "", "", "पति और परिवार तटस्थ हैं; न तो मदद करते हैं और न ही विरोध करते हैं", "पति अर घर का लोग राजी-गैरराजी कोनी, ना मदद करै ना रोकै", "", "Antigravity", "09/25/2026 21:15:00"],
    ["SUPP_INITIAL_OPPOSITION", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Initially opposed, but supported after seeing business profits", "", "Husband Support Option", "", "Initially opposed, but supported after seeing business profits", "", "", "", "", "", "", "शुरुआत में विरोध था, लेकिन मुनाफा देखकर अब समर्थन करते हैं", "पैली तो ना-नुकर करता, पण कमाई देख'र अब साथ देवे", "", "Antigravity", "09/25/2026 21:15:00"],
    ["SUPP_NO_SUPPORT_OPPOSED", "AppVariables", "HusbandFamilySupport", "Option", "Enum", "Do not support; prefer that I do only household work", "", "Husband Support Option", "", "Do not support; prefer that I do only household work", "", "", "", "", "", "", "समर्थन नहीं करते; चाहते हैं कि मैं केवल घर का काम संभालूं", "साथ कोनी देवे, कहवे घर रो ई काम-धंधो करो", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #14: Don't Remember
    ["OPT_DONT_REMEMBER", "AppVariables", "CommonOptions", "Option", "Enum", "Don’t remember / Not sure", "", "Common Option", "", "Don’t remember / Not sure", "", "", "", "", "", "", "याद नहीं / पक्का पता नहीं", "याद कोनी / पक्को ठा कोनी", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #20: Registration Doc
    ["CHG_REGISTRATION_DOCS", "AppVariables", "EnterpriseChanges", "Option", "Enum", "Got required registration / license / documents made", "", "Enterprise Change Option", "", "Got required registration / license / documents made", "", "", "", "", "", "", "व्यवसाय के लिए जरूरी रजिस्ट्रेशन / लाइसेंस / कागजात बनवाए", "धंधे खातर जरूरी रजिस्ट्रेशन व सरकारी कागज बणवाया", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #22: Specific Business Registration choices
    ["REG_UDYAM_AADHAR", "AppVariables", "RegistrationType", "Option", "Enum", "Udyam Aadhar / MSME Registration", "", "Registration Option", "", "Udyam Aadhar / MSME Registration", "", "", "", "", "", "", "उद्यम आधार / एमएसएमई (MSME) पंजीकरण", "उद्यम आधार / एमएसएमई में नाव जुड़वायो", "", "Antigravity", "09/25/2026 21:15:00"],
    ["REG_FSSAI_TRADE_LICENSE", "AppVariables", "RegistrationType", "Option", "Enum", "FSSAI / Food License / Trade License", "", "Registration Option", "", "FSSAI / Food License / Trade License", "", "", "", "", "", "", "एफएसएसएआई (FSSAI) खाद्य लाइसेंस / व्यापार लाइसेंस", "खाद्य लाइसेंस (FSSAI) / धंधे रो लाइसेंस", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #26: Digital Sales Channels (6 options)
    ["ORD_INSTAGRAM", "AppVariables", "SalesChannels", "Option", "Enum", "I get orders via Instagram", "", "Sales Channel Option", "", "I get orders via Instagram", "", "", "", "", "", "", "मुझे इंस्टाग्राम (Instagram) के माध्यम से ऑर्डर मिलते हैं", "म्हाने इंस्टाग्राम सूं गिराक रा ऑर्डर मिलै", "", "Antigravity", "09/25/2026 21:15:00"],
    ["ORD_WHATSAPP", "AppVariables", "SalesChannels", "Option", "Enum", "I get orders via WhatsApp", "", "Sales Channel Option", "", "I get orders via WhatsApp", "", "", "", "", "", "", "मुझे व्हाट्सएप (WhatsApp) के माध्यम से ऑर्डर मिलते हैं", "म्हाने व्हाट्सएप सूं ऑर्डर मिलै", "", "Antigravity", "09/25/2026 21:15:00"],
    ["ORD_PHONE_CALL", "AppVariables", "SalesChannels", "Option", "Enum", "I get orders over phone calls", "", "Sales Channel Option", "", "I get orders over phone calls", "", "", "", "", "", "", "मुझे फोन कॉल पर ऑर्डर मिलते हैं", "म्हाने फोन कॉल माथे ऑर्डर मिलै", "", "Antigravity", "09/25/2026 21:15:00"],
    ["ORD_DIRECT_STORE", "AppVariables", "SalesChannels", "Option", "Enum", "Customers come directly to my shop / home", "", "Sales Channel Option", "", "Customers come directly to my shop / home", "", "", "", "", "", "", "ग्राहक सीधे मेरी दुकान / घर पर आकर खरीदते हैं", "गिराक सीधा म्हारी दुकान या घरे आ’र खरीदे", "", "Antigravity", "09/25/2026 21:15:00"],
    ["ORD_LOCAL_TRADERS", "AppVariables", "SalesChannels", "Option", "Enum", "Local traders / shopkeepers purchase in bulk", "", "Sales Channel Option", "", "Local traders / shopkeepers purchase in bulk", "", "", "", "", "", "", "स्थानीय व्यापारी / दुकानदार थोक में माल खरीदते हैं", "गाम-कस्बे रा व्यापारी थोक में माल लेवे", "", "Antigravity", "09/25/2026 21:15:00"],
    ["ORD_DOOR_TO_DOOR", "AppVariables", "SalesChannels", "Option", "Enum", "Door-to-door direct sales in village / locality", "", "Sales Channel Option", "", "Door-to-door direct sales in village / locality", "", "", "", "", "", "", "गांव व मोहल्ले में घर-घर जाकर सीधा विक्रय", "गाम व ढाणी में घरां-घरां जा’र बेचणो", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #27: WhatsApp under marketing
    ["MKT_WHATSAPP", "AppVariables", "MarketingMedia", "Option", "Enum", "WhatsApp groups and status updates", "", "Marketing Option", "", "WhatsApp groups and status updates", "", "", "", "", "", "", "व्हाट्सएप ग्रुप और स्टेटस अपडेट के जरिए प्रचार", "व्हाट्सएप ग्रुप अर स्टेटस लगा'र प्रचार करूँ", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #35: Missing 3 product categories (total 29)
    ["PROD_BEAUTY_PARLOUR", "AppVariables", "ProductCategories", "Option", "Enum", "Beauty parlour / Cosmetics services", "", "Product Option", "", "Beauty parlour / Cosmetics services", "", "", "", "", "", "", "ब्यूटी पार्लर / सौंदर्य प्रसाधन सेवाएं", "ब्यूटी पार्लर व शृंगार रो काम", "", "Antigravity", "09/25/2026 21:15:00"],
    ["PROD_DAIRY_VALUE_ADD", "AppVariables", "ProductCategories", "Option", "Enum", "Dairy products (Ghee, Paneer, Mawa, Curd)", "", "Product Option", "", "Dairy products (Ghee, Paneer, Mawa, Curd)", "", "", "", "", "", "", "डेयरी उत्पाद (घी, पनीर, मावा, दही)", "दूध-दही, घी, पनीर रो काम", "", "Antigravity", "09/25/2026 21:15:00"],
    ["PROD_HANDICRAFTS_ZARI", "AppVariables", "ProductCategories", "Option", "Enum", "Handicrafts / Zari / Traditional Embroidery", "", "Product Option", "", "Handicrafts / Zari / Traditional Embroidery", "", "", "", "", "", "", "हस्तशिल्प / जरी / कशीदाकारी / पारंपरिक कढ़ाई", "हाथ रो काम, जरी-कशीदाकारी व कढाई", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #40: Income tier Above Rs 4,00,001
    ["INC_ABOVE_4L", "AppVariables", "IncomeBracket", "Option", "Enum", "Above Rs 4,00,000", "", "Income Option", "", "Above Rs 4,00,000", "", "", "", "", "", "", "रु 4,00,000 से अधिक", "4 लाख सूं बत्ता", "", "Antigravity", "09/25/2026 21:15:00"],
    
    # Comment #38: Sale of animals as income / capital source
    ["CAP_SALE_ANIMALS", "AppVariables", "CapitalSources", "Option", "Enum", "Sale of livestock / animals", "", "Capital Source Option", "", "Sale of livestock / animals", "", "", "", "", "", "", "पशु / पशुधन की बिक्री", "ढोर-ढांखर (पशु) बेच'र", "", "Antigravity", "09/25/2026 21:15:00"]
]

for opt in NEW_OPTIONS:
    opt_id = opt[0]
    if opt_id in id_map:
        idx = id_map[opt_id]
        data_rows[idx] = opt
        print(f"Updated existing option {opt_id}")
    else:
        data_rows.append(opt)
        id_map[opt_id] = len(data_rows) - 1
        print(f"Appended new option {opt_id}")

# 3. Update VariableLists on Question Rows
# Q_E_06_00: add CRP_PROFIT_IDEAS
if "Q_E_06_00" in id_map:
    idx = id_map["Q_E_06_00"]
    cur = data_rows[idx][11]
    if "CRP_PROFIT_IDEAS" not in cur:
        data_rows[idx][11] = cur + " , CRP_PROFIT_IDEAS"

# Q_G_04_00 (Husband support): set to 6 options
if "Q_G_04_00" in id_map:
    idx = id_map["Q_G_04_00"]
    data_rows[idx][4] = "Enum"
    data_rows[idx][11] = "SUPP_HUSBAND_ENCOURAGE , SUPP_HUSBAND_FINANCE , SUPP_FAMILY_CHORES , SUPP_NEUTRAL_NO_INTERFERENCE , SUPP_INITIAL_OPPOSITION , SUPP_NO_SUPPORT_OPPOSED"

# Save updated AppVariables.csv
with open(APPVARIABLES_PATH, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(data_rows)

print(f"Successfully saved {len(data_rows)} rows to AppVariables.csv")
