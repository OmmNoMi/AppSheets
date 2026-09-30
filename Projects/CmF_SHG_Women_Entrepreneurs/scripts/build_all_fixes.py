# -*- coding: utf-8 -*-
"""
Comprehensive Fix Engine for All 42 Testing Team Comments
AppSheet: SHG_Women
Three Languages: English (Title_en), Hindi (Title_hi), Rajasthani (Title_raj)
"""
import csv
import json
import os

APPVARIABLES_CSV = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

# New / Updated Options in All 3 Languages
NEW_OPTIONS = [
    # Comment #5: Profit Ideas
    {
        "ID": "CRP_PROFIT_IDEAS",
        "Module": "AppVariables",
        "SubModule": "CRPContribution",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "They gave us new ideas to improve our profit",
        "Description": "CRP Option",
        "DefaultValue": "They gave us new ideas to improve our profit",
        "Title_hi": "मुनाफा बढ़ाने के नए विचार और तरीके बताए",
        "Title_raj": "मुनाफो बढ़ावण रा नवा तरीका बताया",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #13: Husband & Family Support Dynamics (6 statements)
    {
        "ID": "SUPP_HUSBAND_ENCOURAGE",
        "Module": "AppVariables",
        "SubModule": "HusbandFamilySupport",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "My husband encourages and actively supports my business",
        "Description": "Husband Support Option",
        "DefaultValue": "My husband encourages and actively supports my business",
        "Title_hi": "मेरे पति मुझे प्रोत्साहित करते हैं और व्यवसाय में सक्रिय सहयोग देते हैं",
        "Title_raj": "म्हारा पति म्हाने हिम्मत देवै अर काम में पूरो हाथ बंटावै",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "SUPP_HUSBAND_FINANCE",
        "Module": "AppVariables",
        "SubModule": "HusbandFamilySupport",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Husband helps in purchasing materials and managing finances",
        "Description": "Husband Support Option",
        "DefaultValue": "Husband helps in purchasing materials and managing finances",
        "Title_hi": "पति सामान लाने और पैसों के हिसाब-किताब में मदद करते हैं",
        "Title_raj": "पति माल लावण अर पीसां रा हिसाब-किताब में मदद करै",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "SUPP_FAMILY_CHORES",
        "Module": "AppVariables",
        "SubModule": "HusbandFamilySupport",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Family members share household chores so I get time for business",
        "Description": "Husband Support Option",
        "DefaultValue": "Family members share household chores so I get time for business",
        "Title_hi": "परिवार के सदस्य घर के कामों में हाथ बंटाते हैं ताकि मुझे व्यवसाय का समय मिले",
        "Title_raj": "घर का लोग घर रो काम संभालै ताकी म्हाने धंधे रो टेम मिल सकै",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "SUPP_NEUTRAL_NO_INTERFERENCE",
        "Module": "AppVariables",
        "SubModule": "HusbandFamilySupport",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Husband and family are neutral; they neither help nor oppose",
        "Description": "Husband Support Option",
        "DefaultValue": "Husband and family are neutral; they neither help nor oppose",
        "Title_hi": "पति और परिवार तटस्थ हैं; न तो मदद करते हैं और न ही विरोध करते हैं",
        "Title_raj": "पति अर घर का लोग राजी-गैरराजी कोनी, ना मदद करै ना रोकै",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "SUPP_INITIAL_OPPOSITION",
        "Module": "AppVariables",
        "SubModule": "HusbandFamilySupport",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Initially opposed, but supported after seeing business profits",
        "Description": "Husband Support Option",
        "DefaultValue": "Initially opposed, but supported after seeing business profits",
        "Title_hi": "शुरुआत में विरोध था, लेकिन मुनाफा देखकर अब समर्थन करते हैं",
        "Title_raj": "पैली तो ना-नुकर करता, पण कमाई देख'र अब साथ देवे",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "SUPP_NO_SUPPORT_OPPOSED",
        "Module": "AppVariables",
        "SubModule": "HusbandFamilySupport",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Do not support; prefer that I do only household work",
        "Description": "Husband Support Option",
        "DefaultValue": "Do not support; prefer that I do only household work",
        "Title_hi": "समर्थन नहीं करते; चाहते हैं कि मैं केवल घर का काम संभालूं",
        "Title_raj": "साथ कोनी देवे, कहवे घर रो ई काम-धंधो करो",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #14: Don't Remember
    {
        "ID": "OPT_DONT_REMEMBER",
        "Module": "AppVariables",
        "SubModule": "CommonOptions",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Don’t remember / Not sure",
        "Description": "Common Option",
        "DefaultValue": "Don’t remember / Not sure",
        "Title_hi": "याद नहीं / पक्का पता नहीं",
        "Title_raj": "याद कोनी / पक्को ठा कोनी",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #20: Registration Doc
    {
        "ID": "CHG_REGISTRATION_DOCS",
        "Module": "AppVariables",
        "SubModule": "EnterpriseChanges",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Got required registration / license / documents made",
        "Description": "Enterprise Change Option",
        "DefaultValue": "Got required registration / license / documents made",
        "Title_hi": "व्यवसाय के लिए जरूरी रजिस्ट्रेशन / लाइसेंस / कागजात बनवाए",
        "Title_raj": "धंधे खातर जरूरी रजिस्ट्रेशन व सरकारी कागज बणवाया",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #22: Specific Business Registration choices
    {
        "ID": "REG_UDYAM_AADHAR",
        "Module": "AppVariables",
        "SubModule": "RegistrationType",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Udyam Aadhar / MSME Registration",
        "Description": "Registration Option",
        "DefaultValue": "Udyam Aadhar / MSME Registration",
        "Title_hi": "उद्यम आधार / एमएसएमई (MSME) पंजीकरण",
        "Title_raj": "उद्यम आधार / एमएसएमई में नाव जुड़वायो",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "REG_FSSAI_TRADE_LICENSE",
        "Module": "AppVariables",
        "SubModule": "RegistrationType",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "FSSAI / Food License / Trade License",
        "Description": "Registration Option",
        "DefaultValue": "FSSAI / Food License / Trade License",
        "Title_hi": "एफएसएसएआई (FSSAI) खाद्य लाइसेंस / व्यापार लाइसेंस",
        "Title_raj": "खाद्य लाइसेंस (FSSAI) / धंधे रो लाइसेंस",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #26: Digital Sales Channels (6 options)
    {
        "ID": "ORD_INSTAGRAM",
        "Module": "AppVariables",
        "SubModule": "SalesChannels",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "I get orders via Instagram",
        "Description": "Sales Channel Option",
        "DefaultValue": "I get orders via Instagram",
        "Title_hi": "मुझे इंस्टाग्राम (Instagram) के माध्यम से ऑर्डर मिलते हैं",
        "Title_raj": "म्हाने इंस्टाग्राम सूं गिराक रा ऑर्डर मिलै",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "ORD_WHATSAPP",
        "Module": "AppVariables",
        "SubModule": "SalesChannels",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "I get orders via WhatsApp",
        "Description": "Sales Channel Option",
        "DefaultValue": "I get orders via WhatsApp",
        "Title_hi": "मुझे व्हाट्सएप (WhatsApp) के माध्यम से ऑर्डर मिलते हैं",
        "Title_raj": "म्हाने व्हाट्सएप सूं ऑर्डर मिलै",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "ORD_PHONE_CALL",
        "Module": "AppVariables",
        "SubModule": "SalesChannels",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "I get orders over phone calls",
        "Description": "Sales Channel Option",
        "DefaultValue": "I get orders over phone calls",
        "Title_hi": "मुझे फोन कॉल पर ऑर्डर मिलते हैं",
        "Title_raj": "म्हाने फोन कॉल माथे ऑर्डर मिलै",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "ORD_DIRECT_STORE",
        "Module": "AppVariables",
        "SubModule": "SalesChannels",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Customers come directly to my shop / home",
        "Description": "Sales Channel Option",
        "DefaultValue": "Customers come directly to my shop / home",
        "Title_hi": "ग्राहक सीधे मेरी दुकान / घर पर आकर खरीदते हैं",
        "Title_raj": "गिराक सीधा म्हारी दुकान या घरे आ’र खरीदे",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "ORD_LOCAL_TRADERS",
        "Module": "AppVariables",
        "SubModule": "SalesChannels",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Local traders / shopkeepers purchase in bulk",
        "Description": "Sales Channel Option",
        "DefaultValue": "Local traders / shopkeepers purchase in bulk",
        "Title_hi": "स्थानीय व्यापारी / दुकानदार थोक में माल खरीदते हैं",
        "Title_raj": "गाम-कस्बे रा व्यापारी थोक में माल लेवे",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "ORD_DOOR_TO_DOOR",
        "Module": "AppVariables",
        "SubModule": "SalesChannels",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Door-to-door direct sales in village / locality",
        "Description": "Sales Channel Option",
        "DefaultValue": "Door-to-door direct sales in village / locality",
        "Title_hi": "गांव व मोहल्ले में घर-घर जाकर सीधा विक्रय",
        "Title_raj": "गाम व ढाणी में घरां-घरां जा’र बेचणो",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #27: WhatsApp under marketing
    {
        "ID": "MKT_WHATSAPP",
        "Module": "AppVariables",
        "SubModule": "MarketingMedia",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "WhatsApp groups and status updates",
        "Description": "Marketing Option",
        "DefaultValue": "WhatsApp groups and status updates",
        "Title_hi": "व्हाट्सएप ग्रुप और स्टेटस अपडेट के जरिए प्रचार",
        "Title_raj": "व्हाट्सएप ग्रुप अर स्टेटस लगा'र प्रचार करूँ",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #35: Missing 3 product categories (total 29)
    {
        "ID": "PROD_BEAUTY_PARLOUR",
        "Module": "AppVariables",
        "SubModule": "ProductCategories",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Beauty parlour / Cosmetics services",
        "Description": "Product Option",
        "DefaultValue": "Beauty parlour / Cosmetics services",
        "Title_hi": "ब्यूटी पार्लर / सौंदर्य प्रसाधन सेवाएं",
        "Title_raj": "ब्यूटी पार्लर व शृंगार रो काम",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "PROD_DAIRY_VALUE_ADD",
        "Module": "AppVariables",
        "SubModule": "ProductCategories",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Dairy products (Ghee, Paneer, Mawa, Curd)",
        "Description": "Product Option",
        "DefaultValue": "Dairy products (Ghee, Paneer, Mawa, Curd)",
        "Title_hi": "डेयरी उत्पाद (घी, पनीर, मावा, दही)",
        "Title_raj": "दूध-दही, घी, पनीर रो काम",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    {
        "ID": "PROD_HANDICRAFTS_ZARI",
        "Module": "AppVariables",
        "SubModule": "ProductCategories",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Handicrafts / Zari / Traditional Embroidery",
        "Description": "Product Option",
        "DefaultValue": "Handicrafts / Zari / Traditional Embroidery",
        "Title_hi": "हस्तशिल्प / जरी / कशीदाकारी / पारंपरिक कढ़ाई",
        "Title_raj": "हाथ रो काम, जरी-कशीदाकारी व कढाई",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #40: Income tier Above Rs 4,00,001
    {
        "ID": "INC_ABOVE_4L",
        "Module": "AppVariables",
        "SubModule": "IncomeBracket",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Above Rs 4,00,000",
        "Description": "Income Option",
        "DefaultValue": "Above Rs 4,00,000",
        "Title_hi": "रु 4,00,000 से अधिक",
        "Title_raj": "4 लाख सूं बत्ता",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    },
    # Comment #38: Sale of animals as income / capital source
    {
        "ID": "CAP_SALE_ANIMALS",
        "Module": "AppVariables",
        "SubModule": "CapitalSources",
        "VariableType": "Option",
        "ValueControl": "Enum",
        "Title_en": "Sale of livestock / animals",
        "Description": "Capital Source Option",
        "DefaultValue": "Sale of livestock / animals",
        "Title_hi": "पशु / पशुधन की बिक्री",
        "Title_raj": "ढोर-ढांखर (पशु) बेच'र",
        "CreatedBy": "Antigravity",
        "CreatedOn": "09/25/2026 21:15:00"
    }
]

print(f"Total new options to add: {len(NEW_OPTIONS)}")
