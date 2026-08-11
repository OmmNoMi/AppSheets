import csv
import json
import os

# Comprehensive AppVariables Master Data integrating all client research findings:
# - SHG_Women_Entrepreneurs_Study_Plan.docx.md
# - Copy of Data Analysis Prototype.xlsx
# - Copy of Survey question research (1).md

APP_VARIABLES_DATA = [
    # System Roles
    {"ID": "ROLE_INVESTIGATOR", "Category": "Role", "SubCategory": "System", "Title": "Field Investigator", "Title_hi": "क्षेत्र अन्वेषक", "Title_local": "क्षेत्र अन्वेषक", "Description": "Field enumerator role", "VariableList": "", "ValueControl": "Text"},
    {"ID": "ROLE_SUPERVISOR", "Category": "Role", "SubCategory": "System", "Title": "Field Supervisor", "Title_hi": "क्षेत्र पर्यवेक्षक", "Title_local": "क्षेत्र पर्यवेक्षक", "Description": "Supervisor and QA role", "VariableList": "", "ValueControl": "Text"},
    {"ID": "ROLE_RESEARCHER", "Category": "Role", "SubCategory": "System", "Title": "Lead Researcher", "Title_hi": "मुख्य शोधकर्ता", "Title_local": "मुख्य शोधकर्ता", "Description": "Research & analytics lead role", "VariableList": "", "ValueControl": "Text"},

    # Lens 1: Profile & Agency
    {"ID": "Q_P_01_00", "Category": "Question", "SubCategory": "Profile", "Title": "Social category / caste of entrepreneur?", "Title_hi": "उद्यमी की सामाजिक श्रेणी / जाति क्या है?", "Title_local": "उद्यमी की सामाजिक श्रेणी / जाति का है?", "Description": "Social category profiling", "VariableList": "OPT_CST_SC, OPT_CST_ST, OPT_CST_OBC, OPT_CST_GEN", "ValueControl": "Enum"},
    {"ID": "OPT_CST_SC", "Category": "Option", "SubCategory": "Profile", "Title": "Scheduled Caste (SC)", "Title_hi": "अनुसूचित जाति (SC)", "Title_local": "अनुसूचित जाति (SC)", "Description": "SC Category", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_CST_ST", "Category": "Option", "SubCategory": "Profile", "Title": "Scheduled Tribe (ST)", "Title_hi": "अनुसूचित जनजाति (ST)", "Title_local": "अनुसूचित जनजाति (ST)", "Description": "ST Category", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_CST_OBC", "Category": "Option", "SubCategory": "Profile", "Title": "Other Backward Class (OBC)", "Title_hi": "अन्य पिछड़ा वर्ग (OBC)", "Title_local": "अन्य पिछड़ा वर्ग (OBC)", "Description": "OBC Category", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_CST_GEN", "Category": "Option", "SubCategory": "Profile", "Title": "General Category", "Title_hi": "सामान्य वर्ग", "Title_local": "सामान्य वर्ग", "Description": "General Category", "VariableList": "", "ValueControl": "Text"},

    {"ID": "Q_P_02_00", "Category": "Question", "SubCategory": "Profile", "Title": "Ownership structure of enterprise?", "Title_hi": "उद्यम का स्वामित्व प्रकार क्या है?", "Title_local": "उद्यम रो मालिक कौन है?", "Description": "Ownership model", "VariableList": "OPT_OWN_SELF, OPT_OWN_HUSBAND, OPT_OWN_FAMILY, OPT_OWN_GROUP", "ValueControl": "Enum"},
    {"ID": "OPT_OWN_SELF", "Category": "Option", "SubCategory": "Profile", "Title": "Self (Woman Entrepreneur)", "Title_hi": "स्वयं (महिला उद्यमी)", "Title_local": "खुद री", "Description": "Self", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_OWN_HUSBAND", "Category": "Option", "SubCategory": "Profile", "Title": "Husband's enterprise", "Title_hi": "पति का उद्यम", "Title_local": "पति रो", "Description": "Husband", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_OWN_FAMILY", "Category": "Option", "SubCategory": "Profile", "Title": "Joint Family Business", "Title_hi": "संयुक्त परिवार व्यवसाय", "Title_local": "परिवार रो धंधो", "Description": "Family", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_OWN_GROUP", "Category": "Option", "SubCategory": "Profile", "Title": "Women's Group / SHG Enterprise", "Title_hi": "महिला समूह / एसएचजी उद्यम", "Title_local": "समूह रो काम", "Description": "Group", "VariableList": "", "ValueControl": "Text"},

    {"ID": "Q_P_03_00", "Category": "Question", "SubCategory": "Profile", "Title": "Is entrepreneur a first-generation business owner?", "Title_hi": "क्या उद्यमी प्रथम पीढ़ी की व्यवसायी है?", "Title_local": "का पहली बार व्यापार कर रही है?", "Description": "First gen status", "VariableList": "OPT_GEN_1ST, OPT_GEN_EXP", "ValueControl": "Enum"},
    {"ID": "OPT_GEN_1ST", "Category": "Option", "SubCategory": "Profile", "Title": "First-generation entrepreneur (No prior business background)", "Title_hi": "प्रथम पीढ़ी की उद्यमी (कोई पूर्व व्यावसायिक पृष्ठभूमि नहीं)", "Title_local": "पहली पीढ़ी उद्यमी", "Description": "First Gen", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GEN_EXP", "Category": "Option", "SubCategory": "Profile", "Title": "Had prior business experience / traditional family trade", "Title_hi": "पूर्व व्यावसायिक अनुभव या पारंपरिक पारिवारिक व्यापार", "Title_local": "पुराना अनुभव", "Description": "Experienced", "VariableList": "", "ValueControl": "Text"},

    # SHG Formation & Loan Dose Metrics (From Research Doc)
    {"ID": "Q_P_04_00", "Category": "Question", "SubCategory": "Profile", "Title": "Age of underlying SHG (in years)?", "Title_hi": "एसएचजी के गठन की आयु (वर्षों में)?", "Title_local": "समूह कितना साल पुरानो है?", "Description": "SHG age", "VariableList": "OPT_SHG_Y1, OPT_SHG_Y23, OPT_SHG_Y35, OPT_SHG_Y5PLUS", "ValueControl": "Enum"},
    {"ID": "OPT_SHG_Y1", "Category": "Option", "SubCategory": "Profile", "Title": "Less than 1 year (Dose 1)", "Title_hi": "1 वर्ष से कम (पहली खुराक)", "Title_local": "1 साल सूं कम", "Description": "Year 1", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_SHG_Y23", "Category": "Option", "SubCategory": "Profile", "Title": "1 - 3 years (Dose 2)", "Title_hi": "1 - 3 वर्ष (दूसरी खुराक)", "Title_local": "1-3 साल", "Description": "Year 1-3", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_SHG_Y35", "Category": "Option", "SubCategory": "Profile", "Title": "3 - 5 years (Dose 3 - Enterprise Threshold)", "Title_hi": "3 - 5 वर्ष (तीसरी खुराक - उद्यम देहरी)", "Title_local": "3-5 साल", "Description": "Year 3-5", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_SHG_Y5PLUS", "Category": "Option", "SubCategory": "Profile", "Title": "More than 5 years (Dose 4 & 5 Mature SHG)", "Title_hi": "5 वर्ष से अधिक (चौथी व पाँचवीं खुराक)", "Title_local": "5 साल सूं ज्यादा", "Description": "Year 5+", "VariableList": "", "ValueControl": "Text"},

    {"ID": "Q_P_05_00", "Category": "Question", "SubCategory": "Profile", "Title": "SHG Credit Dose level reached?", "Title_hi": "एसएचजी ऋण खुराक का स्तर क्या है?", "Title_local": "कौन सी किश्त/डोज मिली है?", "Description": "Credit dose tier", "VariableList": "OPT_DOS_1, OPT_DOS_2, OPT_DOS_3, OPT_DOS_4PLUS", "ValueControl": "Enum"},
    {"ID": "OPT_DOS_1", "Category": "Option", "SubCategory": "Profile", "Title": "1st Credit Dose (Predominantly Consumption)", "Title_hi": "1ली ऋण खुराक (मुख्यतः उपभोग)", "Title_local": "1ली डोज", "Description": "Dose 1", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_DOS_2", "Category": "Option", "SubCategory": "Profile", "Title": "2nd Credit Dose (Consumption & Working Capital)", "Title_hi": "2री ऋण खुराक (उपभोग एवं कार्यशील पूँजी)", "Title_local": "2री डोज", "Description": "Dose 2", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_DOS_3", "Category": "Option", "SubCategory": "Profile", "Title": "3rd Credit Dose (Enterprise Investment - Enterprise Relevant)", "Title_hi": "3री ऋण खुराक (उद्यम निवेश योग्य)", "Title_local": "3री डोज (उद्यम)", "Description": "Dose 3", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_DOS_4PLUS", "Category": "Option", "SubCategory": "Profile", "Title": "4th / 5th Credit Dose (Enterprise Scaling / Expansion)", "Title_hi": "4थी / 5वीं ऋण खुराक (उद्यम विस्तार)", "Title_local": "4थी/5वीं डोज", "Description": "Dose 4+", "VariableList": "", "ValueControl": "Text"},

    # Smartphone & Digital Literacy
    {"ID": "Q_P_06_00", "Category": "Question", "SubCategory": "Profile", "Title": "Mobile Phone usage patterns by SHG member?", "Title_hi": "महिला द्वारा मोबाइल फोन का उपयोग?", "Title_local": "फोन रो इस्तेमाल कईं-कईं में करो?", "Description": "Smartphone usage", "VariableList": "OPT_USE_CALL, OPT_USE_BANK, OPT_USE_SHG, OPT_USE_UPI, OPT_USE_SHOP, OPT_USE_SM, OPT_USE_ENT", "ValueControl": "EnumList"},
    {"ID": "OPT_USE_CALL", "Category": "Option", "SubCategory": "Profile", "Title": "Phone calls only", "Title_hi": "केवल फोन कॉल", "Title_local": "सिर्फ फोन बात करवा में", "Description": "Calls", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_USE_BANK", "Category": "Option", "SubCategory": "Profile", "Title": "Banking communication / SMS alerts", "Title_hi": "बैंकिंग एसएमएस और जानकारी", "Title_local": "बैंक मैसेज", "Description": "Banking", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_USE_SHG", "Category": "Option", "SubCategory": "Profile", "Title": "SHG & CLF WhatsApp groups", "Title_hi": "एसएचजी / सीएलएफ व्हाट्सएप ग्रुप", "Title_local": "समूह व्हाट्सएप ग्रुप", "Description": "SHG group", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_USE_UPI", "Category": "Option", "SubCategory": "Profile", "Title": "Digital Payments (PhonePe, GooglePay, Paytm)", "Title_hi": "डिजिटल भुगतान (फोनपे, गूगलपे)", "Title_local": "ऑनलाइन पैसो ट्रांसफर", "Description": "UPI", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_USE_SHOP", "Category": "Option", "SubCategory": "Profile", "Title": "Online shopping (Meesho, Flipkart, eSaras)", "Title_hi": "ऑनलाइन खरीदारी (मीशो, फ्लिपकार्ट, ई-सरस)", "Title_local": "ऑनलाइन सामान मंगावा में", "Description": "Online shopping", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_USE_SM", "Category": "Option", "SubCategory": "Profile", "Title": "Social Media Business (Instagram, WhatsApp Business)", "Title_hi": "सोशल मीडिया बिज़नेस", "Title_local": "इंस्टा/व्हाट्सएप बिज़नेस", "Description": "Social Business", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_USE_ENT", "Category": "Option", "SubCategory": "Profile", "Title": "Entertainment (YouTube, Reels)", "Title_hi": "मनोरंजन (यूट्यूब, रील्स)", "Title_local": "यूट्यूब / रील्स देखना", "Description": "Entertainment", "VariableList": "", "ValueControl": "Text"},

    # Lens 2: Business Motivation & Push/Pull Mechanics
    {"ID": "Q_B_01_00", "Category": "Question", "SubCategory": "Business", "Title": "Primary motivation driver (Push vs Pull)?", "Title_hi": "उद्यम शुरू करने की मुख्य वजह (मजबूरी या अवसर)?", "Title_local": "काम शुरू करवा री मुख्य वजह का थी?", "Description": "Push vs Pull motivation", "VariableList": "OPT_MOT_PUSH_INC, OPT_MOT_PUSH_EMP, OPT_MOT_PULL_OPP, OPT_MOT_PULL_PAS, OPT_MOT_FAM_LEG", "ValueControl": "Enum"},
    {"ID": "OPT_MOT_PUSH_INC", "Category": "Option", "SubCategory": "Business", "Title": "Necessity/Push: Household financial distress / rising expenses", "Title_hi": "मजबूरी/पुश: घरेलू वित्तीय संकट / बढ़ते खर्च", "Title_local": "घर खर्चा री मजबूरी", "Description": "Push Income", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_MOT_PUSH_EMP", "Category": "Option", "SubCategory": "Business", "Title": "Necessity/Push: Lack of alternate wage employment", "Title_hi": "मजबूरी/पुश: वैकल्पिक मजदूरी/रोजगार का अभाव", "Title_local": "दूसरा काम नी मिलने सूं", "Description": "Push Employment", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_MOT_PULL_OPP", "Category": "Option", "SubCategory": "Business", "Title": "Opportunity/Pull: Identified clear market gap / local opportunity", "Title_hi": "अवसर/पुल: स्थानीय बाजार में स्पष्ट अवसर देखा", "Title_local": "बाजार में नया काम दिख्यो", "Description": "Pull Opportunity", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_MOT_PULL_PAS", "Category": "Option", "SubCategory": "Business", "Title": "Opportunity/Pull: Entrepreneurial passion & ambition", "Title_hi": "अवसर/पुल: व्यापारिक आकांक्षा व स्वावलंबन इच्छा", "Title_local": "खुद रो काम करवा रो शौक", "Description": "Pull Ambition", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_MOT_FAM_LEG", "Category": "Option", "SubCategory": "Business", "Title": "Traditional Family Business continuation", "Title_hi": "पारंपरिक पारिवारिक व्यवसाय को जारी रखना", "Title_local": "खानदानी धंधो", "Description": "Family Legacy", "VariableList": "", "ValueControl": "Text"},

    # Gender Obstacles Lens
    {"ID": "Q_G_01_00", "Category": "Question", "SubCategory": "GenderObstacles", "Title": "Faced obstacles in enterprise due to gender/social norms?", "Title_hi": "क्या महिला होने या सामाजिक मान्यताओं के कारण बाधाएँ आईं?", "Title_local": "लुगाई होने रे कारण कोई परेशानी आई का?", "Description": "Gender obstacle check", "VariableList": "OPT_OBS_YES, OPT_OBS_NO", "ValueControl": "Enum"},
    {"ID": "OPT_OBS_YES", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Yes, faced gender-based obstacles", "Title_hi": "हाँ, बाधाओं का सामना करना पड़ा", "Title_local": "हाँ परेशानी आई", "Description": "Yes", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_OBS_NO", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "No gender obstacles faced", "Title_hi": "नहीं, कोई बाधा नहीं आई", "Title_local": "ना कोई परेशानी नी आई", "Description": "No", "VariableList": "", "ValueControl": "Text"},

    {"ID": "Q_G_02_00", "Category": "Question", "SubCategory": "GenderObstacles", "Title": "Specific business areas where obstacles occurred?", "Title_hi": "व्यवसाय के किन क्षेत्रों में बाधाएँ आईं?", "Title_local": "का-का काम में अड़चन आई?", "Description": "Obstacle breakdown", "VariableList": "OPT_GBO_RENT, OPT_GBO_SAFETY, OPT_GBO_MAT_COST, OPT_GBO_VENDOR, OPT_GBO_TRANS, OPT_GBO_SALE_TERMS, OPT_GBO_INTEREST, OPT_GBO_CUST, OPT_GBO_ACCT, OPT_GBO_RECOVERY, OPT_GBO_PURDAH", "ValueControl": "EnumList"},
    {"ID": "OPT_GBO_RENT", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Denied shop premise on rent due to being a woman", "Title_hi": "महिला होने पर किराए पर दुकान देने से इंकार", "Title_local": "दुकान भाड़े पर नी मिली", "Description": "Rent denial", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_SAFETY", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Reaching distant wholesale markets is unsafe / mobility restricted", "Title_hi": "दूर बाजार जाने में सुरक्षा चिंता व आवाजाही पर रोक", "Title_local": "आवाजाही और सुरक्षा री चिंता", "Description": "Safety & Mobility", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_MAT_COST", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Charged higher raw material purchase costs", "Title_hi": "कच्चा माल खरीदने में अधिक दाम वसूला जाना", "Title_local": "सामान महँगो दियो", "Description": "Material price bias", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_VENDOR", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Difficult to find reliable supply vendors", "Title_hi": "विश्वसनीय विक्रेता मिलने में कठिनाई", "Title_local": "भरोसेमंद सप्लायर नी मिलना", "Description": "Vendor supply", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_TRANS", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Charged higher transportation costs", "Title_hi": "अधिक परिवहन/भाड़ा शुल्क लिया जाना", "Title_local": "गाड़ी भाड़ो ज्यादा लेवो", "Description": "Transport bias", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_SALE_TERMS", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Unfavourable sale terms from buyers/wholesalers", "Title_hi": "बिक्री की प्रतिकूल शर्तें", "Title_local": "बिक्री में खराब शर्तें", "Description": "Unfavourable terms", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_INTEREST", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Higher interest rate demanded by informal lenders", "Title_hi": "साहूकारों द्वारा अधिक ब्याज दर माँगना", "Title_local": "ज्यादा ब्याज माँगना", "Description": "Interest bias", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_CUST", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Difficulty in dealing/interacting with male customers", "Title_hi": "पुरुष ग्राहकों से बातचीत में हिचकिचाहट/कठिनाई", "Title_local": "ग्राहक सूं बात करवा में दिक्कत", "Description": "Customer interaction", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_ACCT", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Difficulty maintaining financial accounts/bookkeeping", "Title_hi": "खाता-बही और हिसाब रखने में दिक्कत", "Title_local": "हिसाब-किताब रखबो औखा पडना", "Description": "Accounting", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_RECOVERY", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Difficulty recovering credit/udhaar from male customers", "Title_hi": "उधार पैसा वापस वसूलने में कठिनाई", "Title_local": "उधारी रा पैसा वापस निकालना औखा", "Description": "Credit recovery", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_GBO_PURDAH", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Purdah / Ghoonghat social restriction on public interaction", "Title_hi": "पर्दा प्रथा / घूँघट की सामाजिक बंदिश", "Title_local": "पर्दा प्रथा री बंदिश", "Description": "Purdah restriction", "VariableList": "", "ValueControl": "Text"},

    # Solutions & Coping Mechanisms
    {"ID": "Q_G_03_00", "Category": "Question", "SubCategory": "GenderObstacles", "Title": "Coping mechanisms / solutions adopted for gender obstacles?", "Title_hi": "इन बाधाओं से निपटने के लिए क्या समाधान अपनाया?", "Title_local": "इन अड़चना सूं पार पावा के का उपाय कियो?", "Description": "Solutions", "VariableList": "OPT_SOL_MALE_PURCH, OPT_SOL_MALE_SALE, OPT_SOL_MALE_OPS, OPT_SOL_CASH_ONLY, OPT_SOL_COMPROMISE", "ValueControl": "EnumList"},
    {"ID": "OPT_SOL_MALE_PURCH", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Husband or male relative handles wholesale purchase", "Title_hi": "पति या पुरुष रिश्तेदार थोक खरीदारी संभालते हैं", "Title_local": "पति या भाई सामान लावे है", "Description": "Male purchase", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_SOL_MALE_SALE", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Husband or male relative handles external sales", "Title_hi": "पति या पुरुष रिश्तेदार बिक्री संभालते हैं", "Title_local": "पति/पुरुष बेचे है", "Description": "Male sales", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_SOL_MALE_OPS", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Husband handles heavy machinery/operations", "Title_hi": "पति भारी काम/मशीन संचालन संभालते हैं", "Title_local": "मशीन रो काम पति करे है", "Description": "Male ops", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_SOL_CASH_ONLY", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Conduct strict cash-only transactions (no credit)", "Title_hi": "केवल नकद व्यापार करना (कोई उधार नहीं)", "Title_local": "सिर्फ रोड़ा पैसो (नकद) काम", "Description": "Cash only", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_SOL_COMPROMISE", "Category": "Option", "SubCategory": "GenderObstacles", "Title": "Compromise and work with existing local vendors", "Title_hi": "मौजूदा स्थानीय विक्रेताओं के साथ ही काम चलाना", "Title_local": "पुराना दुकानदार सूं ही काम चलाना", "Description": "Compromise", "VariableList": "", "ValueControl": "Text"},

    # Reinvestment & Profit Allocation (J-PAL Research Dimension)
    {"ID": "Q_E_05_00", "Category": "Question", "SubCategory": "Performance", "Title": "How is enterprise profit predominantly allocated?", "Title_hi": "उद्यम के लाभ का मुख्य उपयोग कहाँ होता है?", "Title_local": "मुनाफे रा रुपया कठे ख़र्च होवे है?", "Description": "Profit allocation", "VariableList": "OPT_PRF_CONS, OPT_PRF_EDU, OPT_PRF_HUSBAND_BIZ, OPT_PRF_SHG_EMI, OPT_PRF_BIZ_REINVEST", "ValueControl": "EnumList"},
    {"ID": "OPT_PRF_CONS", "Category": "Option", "SubCategory": "Performance", "Title": "Household consumption & daily food expenses", "Title_hi": "घरेलू उपभोग और दैनिक भोजन खर्च", "Title_local": "घर रो राशन खर्च", "Description": "Household consumption", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_PRF_EDU", "Category": "Option", "SubCategory": "Performance", "Title": "Children's education & healthcare emergencies", "Title_hi": "बच्चों की शिक्षा और स्वास्थ्य खर्च", "Title_local": "टाबरा री पढ़ाई व दवाई", "Description": "Education & Health", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_PRF_HUSBAND_BIZ", "Category": "Option", "SubCategory": "Performance", "Title": "Reallocated to husband's or family enterprise", "Title_hi": "पति या परिवार के व्यवसाय में हस्तांतरित", "Title_local": "पति रे काम में लगा दिया", "Description": "Husband's enterprise", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_PRF_SHG_EMI", "Category": "Option", "SubCategory": "Performance", "Title": "SHG / Loan EMI repayments", "Title_hi": "एसएचजी / बैंक ऋण की किश्त (EMI)", "Title_local": "लोन री किश्त", "Description": "Loan EMI", "VariableList": "", "ValueControl": "Text"},
    {"ID": "OPT_PRF_BIZ_REINVEST", "Category": "Option", "SubCategory": "Performance", "Title": "Reinvested in own enterprise expansion / inventory", "Title_hi": "अपने व्यवसाय के विस्तार / इन्वेंट्री में पुनर्निवेश", "Title_local": "खुद री दुकान में वापस लगाया", "Description": "Reinvested", "VariableList": "", "ValueControl": "Text"},
]

SAMPLING_FRAME_DATA = [
    {"ID": "DIST_CHURU", "DistrictName": "Churu", "AgroZone": "Arid West (Desert)", "EnterpriseDatasetRecords": 921, "TargetQuota": 55, "ModelCLFStatus": "TRUE", "TotalCLFs": 26, "RegisteredCLFs": 26, "NRETPFoundingDistrict": "TRUE"},
    {"ID": "DIST_DAUSA", "DistrictName": "Dausa", "AgroZone": "Semi-Arid Central", "EnterpriseDatasetRecords": 493, "TargetQuota": 55, "ModelCLFStatus": "TRUE", "TotalCLFs": 23, "RegisteredCLFs": 21, "NRETPFoundingDistrict": "FALSE"},
    {"ID": "DIST_DUNGARPUR", "DistrictName": "Dungarpur", "AgroZone": "Southern Tribal Belt", "EnterpriseDatasetRecords": 211, "TargetQuota": 55, "ModelCLFStatus": "TRUE", "TotalCLFs": 34, "RegisteredCLFs": 30, "NRETPFoundingDistrict": "TRUE"},
    {"ID": "DIST_BARAN", "DistrictName": "Baran", "AgroZone": "Fertile East (Hadoti)", "EnterpriseDatasetRecords": 117, "TargetQuota": 55, "ModelCLFStatus": "TRUE", "TotalCLFs": 27, "RegisteredCLFs": 27, "NRETPFoundingDistrict": "TRUE"},
]

def generate_csv_files(output_dir):
    os.makedirs(output_dir, exist_ok=True)
    
    # Write AppVariables.csv
    app_vars_path = os.path.join(output_dir, "AppVariables.csv")
    with open(app_vars_path, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["ID", "Category", "SubCategory", "Title", "Title_hi", "Title_local", "Description", "VariableList", "ValueControl"])
        writer.writeheader()
        for row in APP_VARIABLES_DATA:
            writer.writerow(row)
    print(f"Updated {app_vars_path} with {len(APP_VARIABLES_DATA)} indicators.")

    # Write SamplingFrame.csv
    sampling_path = os.path.join(output_dir, "SamplingFrame.csv")
    with open(sampling_path, mode="w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["ID", "DistrictName", "AgroZone", "EnterpriseDatasetRecords", "TargetQuota", "ModelCLFStatus", "TotalCLFs", "RegisteredCLFs", "NRETPFoundingDistrict"])
        writer.writeheader()
        for row in SAMPLING_FRAME_DATA:
            writer.writerow(row)
    print(f"Updated {sampling_path} with {len(SAMPLING_FRAME_DATA)} district records.")

if __name__ == "__main__":
    target_dir = "/Users/ommnomi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/data"
    generate_csv_files(target_dir)
