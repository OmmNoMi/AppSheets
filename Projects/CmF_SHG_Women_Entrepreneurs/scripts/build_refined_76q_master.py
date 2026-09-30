import csv
import json

# Define the exact 76 Questions Master with their Column Name, Section, Type, Options, and Trilingual Titles
sections_data = [
    # ==================== SECTION A ====================
    {
        "id": "Q_A_01", "col": "District", "sec": "SectionA", "type": "Enum",
        "title": "Q1. District", "title_hi": "Q1. जिला", "title_raj": "Q1. जिलो",
        "options": [
            ("DIST_BARAN", "Baran", "Baran", "बारां", "बारां"),
            ("DIST_CHURU", "Churu", "Churu", "चूरू", "चूरू"),
            ("DIST_DAUSA", "Dausa", "Dausa", "दौसा", "दौसा"),
            ("DIST_DUNGARPUR", "Dungarpur", "Dungarpur", "डूंगरपुर", "डूंगरपुर"),
            ("DIST_JODHPUR", "Jodhpur", "Jodhpur", "जोधपुर", "जोधपुर")
        ]
    },
    {
        "id": "Q_A_02", "col": "Block", "sec": "SectionA", "type": "Enum",
        "title": "Q2. Block", "title_hi": "Q2. ब्लॉक / खंड", "title_raj": "Q2. ब्लॉक",
        "options": [
            ("BLK_CHHIPABAROD", "Chhipabarod", "Chhipabarod", "छीपाबड़ौद", "छीपाबड़ौद"),
            ("BLK_BARAN", "Baran", "Baran", "बारां", "बारां"),
            ("BLK_RATANGARH", "Ratangarh", "Ratangarh", "रतनगढ़", "रतनगढ़"),
            ("BLK_SUJANGARH", "Sujangarh", "Sujangarh", "सुजानगढ़", "सुजानगढ़"),
            ("BLK_SIKANDRA", "Sikandra", "Sikandra", "सिकंदरा", "सिकंदरा"),
            ("BLK_SAGWARA", "Sagwara", "Sagwara", "सागवाड़ा", "सागवाड़ा"),
            ("BLK_GALIAKOT", "Galiakot", "Galiakot", "गलियाकोट", "गलियाकोट"),
            ("BLK_MANDOR", "Mandor", "Mandor", "मंडोर", "मंडोर"),
            ("BLK_LUNI", "Luni", "Luni", "लूणी", "लूणी"),
            ("BLK_SHERGADH", "Shergadh", "Shergadh", "शेरगढ़", "शेरगढ़")
        ]
    },
    {"id": "Q_A_03", "col": "VillageGP", "sec": "SectionA", "type": "Text", "title": "Q3. Village/GP", "title_hi": "Q3. गांव / ग्राम पंचायत", "title_raj": "Q3. गाँव / ग्राम पंचायत"},
    {"id": "Q_A_04", "col": "RespondentName", "sec": "SectionA", "type": "Text", "title": "Q4. Respondent Name", "title_hi": "Q4. उत्तरदाता का नाम", "title_raj": "Q4. उत्तरदाता रो नाम"},
    {"id": "Q_A_05", "col": "RespondentPhone", "sec": "SectionA", "type": "Phone", "title": "Q5. Respondent’s phone number", "title_hi": "Q5. संपर्क नंबर (मोबाइल)", "title_raj": "Q5. मोबाइल नंबर"},
    {"id": "Q_A_06", "col": "SHGName", "sec": "SectionA", "type": "Text", "title": "Q6. SHG Name", "title_hi": "Q6. स्वयं सहायता समूह (SHG) का नाम", "title_raj": "Q6. समूह (SHG) रो नाम"},
    {"id": "Q_A_07", "col": "VOName", "sec": "SectionA", "type": "Text", "title": "Q7. VO Name", "title_hi": "Q7. ग्राम संगठन (VO) का नाम", "title_raj": "Q7. ग्राम संगठन (VO) रो नाम"},
    {"id": "Q_A_08", "col": "CLFName", "sec": "SectionA", "type": "Text", "title": "Q8. CLF Name", "title_hi": "Q8. क्लस्टर लेवल फेडरेशन (CLF) का नाम", "title_raj": "Q8. सीएलएफ (CLF) रो नाम"},
    {"id": "Q_A_09", "col": "SHGMembershipYears", "sec": "SectionA", "type": "Number", "title": "Q9. Years of SHG membership", "title_hi": "Q9. स्वयं सहायता समूह से कितने वर्षों से जुड़ी हैं?", "title_raj": "Q9. समूह में कित्ता साल सूं जुड़ेड़ा हो?"},
    {
        "id": "Q_A_10", "col": "LeadershipRole", "sec": "SectionA", "type": "Enum",
        "title": "Q10. Have you been in a leadership role in SHG/CLF/VO?", "title_hi": "Q10. क्या आप SHG/VO/CLF में किसी नेतृत्व पद (अध्यक्ष/सचिव/कोषाध्यक्ष) पर हैं?", "title_raj": "Q10. कांई थे समूह/VO/CLF में पदाधिकारी/लीडर हो?",
        "options": [("OPT_YES", "Yes", "Yes", "हाँ", "हाँ"), ("OPT_NO", "No", "No", "नहीं", "नी")]
    },
    {"id": "Q_A_11", "col": "LeadershipYears", "sec": "SectionA", "type": "Number", "title": "Q11. Years of experience in leadership roles?", "title_hi": "Q11. नेतृत्व पद पर कितने वर्षों का अनुभव है?", "title_raj": "Q11. पद पै कित्ता साल रो अनुभव है?"},
    {
        "id": "Q_A_12", "col": "RelatedToCRP", "sec": "SectionA", "type": "Enum",
        "title": "Q12. Are you related to any of the SVEP/OSF CRP?", "title_hi": "Q12. क्या आप SVEP/OSF के किसी CRP (उद्यम मित्र) की रिश्तेदार हैं?", "title_raj": "Q12. कांई थे कोई CRP रा रिश्तेदार हो?",
        "options": [("OPT_YES", "Yes", "Yes", "हाँ", "हाँ"), ("OPT_NO", "No", "No", "नहीं", "नी")]
    },
    {
        "id": "Q_A_13", "col": "EPInterventionType", "sec": "SectionA", "type": "Enum",
        "title": "Q13. Type of Enterprise Promotion (EP) intervention", "title_hi": "Q13. उद्यम संवर्धन योजना का प्रकार", "title_raj": "Q13. उद्यम योजना रो प्रकार",
        "options": [
            ("INT_SVEP", "SVEP", "SVEP (Startup Village Entrepreneurship Program)", "एसवीईपी (स्टार्टअप विलेज एंटरप्रेन्योरशिप प्रोग्राम)", "एसवीईपी"),
            ("INT_OSF", "OSF", "OSF (One Stop Facility)", "ओएसएफ (वन स्टॉप फैसिलिटी)", "ओएसएफ"),
            ("INT_OSF_PHASED", "OSF phased out", "OSF Phased Out", "ओएसएफ फेज आउट", "ओएसएफ फेज आउट"),
            ("INT_DONT_KNOW", "Don't know", "Don't Know", "पता नहीं", "ठा नी")
        ]
    },
    {"id": "Q_A_14", "col": "EnterpriseName", "sec": "SectionA", "type": "Text", "title": "Q14. Enterprise Name", "title_hi": "Q14. उद्यम का नाम", "title_raj": "Q14. उद्यम/दुकान रो नाम"},
    {"id": "Q_A_15", "col": "EnterpriseSetupYear", "sec": "SectionA", "type": "Number", "title": "Q15. Years of setting up enterprise", "title_hi": "Q15. उद्यम की स्थापना का वर्ष", "title_raj": "Q15. काम-धंधो सरू करण रो साल"},
    {
        "id": "Q_A_16", "col": "BusinessType", "sec": "SectionA", "type": "EnumList",
        "title": "Q16. Type of business enterprise (Multiselect)", "title_hi": "Q16. व्यवसाय / उद्यम का प्रकार (बहु-चयन)", "title_raj": "Q16. धंधे रो प्रकार",
        "options": [
            ("BTY_TRADING", "Trading", "Trading", "ट्रेडिंग / व्यापार", "व्यापार"),
            ("BTY_SERVICING", "Servicing", "Servicing", "सर्विसिंग / सेवा", "सेवा"),
            ("BTY_MANUFACTURING", "Manufacturing/ production", "Manufacturing / Production", "मैन्युफैक्चरिंग / उत्पादन", "उत्पादन")
        ]
    },
    {
        "id": "Q_A_17", "col": "BusinessActivities", "sec": "SectionA", "type": "EnumList",
        "title": "Q17. Main business activities of the enterprise (Multiselect)", "title_hi": "Q17. उद्यम की मुख्य व्यावसायिक गतिविधियां (बहु-चयन)", "title_raj": "Q17. उद्यम री मुख्य गतिविधियां",
        "options": [
            ("ACT_VEG_FRUIT", "Vegetable/Fruit", "[T] Vegetable / Fruit", "[T] सब्जी / फल", "[T] सब्जी / फल"),
            ("ACT_GROCERY", "Grocery", "[T] Grocery", "[T] किराना", "[T] किराणा"),
            ("ACT_FANCY_STORE", "Fancy/Cosmetic/General store", "[T] Fancy / Cosmetic / General store", "[T] फैंसी / कॉस्मेटिक / जनरल स्टोर", "[T] प्रसाधन / जनरल स्टोर"),
            ("ACT_APPAREL", "Apparel/fabric", "[T] Apparel / fabric", "[T] कपड़ा / रेडीमेड वस्त्र", "[T] कपड़ा / वेशभूषा"),
            ("ACT_ELECTRIC_GOODS", "Electric goods", "[T] Electric goods", "[T] इलेक्ट्रिक सामान", "[T] बिजली रो सामान"),
            ("ACT_STONE_SHOP", "Stone shop", "[T] Stone shop", "[T] पत्थर की दुकान", "[T] भाटां/पत्थर री दुकान"),
            ("ACT_AGRI_INPUT", "Agri-input retail", "[T] Agri-input retail", "[T] कृषि आदान खुदरा (खाद/बीज/दवाई)", "[T] खाद-बीज री दुकान"),
            ("ACT_AI_BREEDING", "AI/breeding kits", "[T] AI / breeding kits", "[T] कृत्रिम गर्भाधान (AI) / ब्रीडिंग किट", "[T] पशु गर्भाधान / ब्रीडिंग किट"),
            ("ACT_GOAT_TRADING", "Goat trading", "[T] Goat trading", "[T] बकरी व्यापार / पशु क्रय-विक्रय", "[T] बकरी लेन-देन / बकरा व्यापार"),
            ("ACT_FLOUR_MILL", "Flour mill", "[S] Flour mill (Chakki)", "[S] आटा चक्की", "[S] आटा चक्की"),
            ("ACT_TAILORING", "Tailoring", "[S] Tailoring", "[S] सिलाई / टेलरिंग", "[S] सिलाई / दर्जी काम"),
            ("ACT_BEAUTY_PARLOUR", "Beauty parlour", "[S] Beauty parlour", "[S] ब्यूटी पार्लर", "[S] ब्यूटी पार्लर"),
            ("ACT_AUTO_REPAIR", "Auto-mechanic/ two-wheeler repair", "[S] Auto-mechanic / two-wheeler repair", "[S] ऑटो मैकेनिक / दोपहिया मरम्मत", "[S] गाड़ी/मोटरसाइकिल मिस्त्री"),
            ("ACT_EMITRA", "E-mitra", "[S] E-mitra / Online kiosk", "[S] ई-मित्र / ऑनलाइन केंद्र", "[S] ई-मित्र केंद्र"),
            ("ACT_TRANSPORT", "Transport", "[S] Transport", "[S] परिवहन / वाहन", "[S] गाड़ी भाड़ा / परिवहन"),
            ("ACT_TENT_HOUSE", "Tent house", "[S] Tent house", "[S] टेंट हाउस", "[S] टेंट हाउस"),
            ("ACT_MOBILE_REPAIR", "Mobile repair shop", "[S] Mobile repair shop", "[S] मोबाइल रिपेयर दुकान", "[S] मोबाइल ठीक करण री दुकान"),
            ("ACT_STONE_CUTTING", "Stone cutting", "[S] Stone cutting", "[S] पत्थर कटाई", "[S] पत्थर कटाई"),
            ("ACT_SANITARY_NAPKIN", "Sanitary napkin making", "[P] Sanitary napkin making", "[P] सैनिटरी नैपकिन निर्माण", "[P] सैनिटरी पैड बणावण"),
            ("ACT_HANDICRAFT", "Handicraft", "[P] Handicraft", "[P] हस्तशिल्प / कसीदाकारी", "[P] हाथ रो काम / कसीदाकारी"),
            ("ACT_DAIRY_MILK", "Dairy shop/Milk collection centre", "[P] Dairy shop / Milk collection centre", "[P] डेयरी दुकान / दुग्ध संकलन केंद्र", "[P] दूध डेरी / संकलन केंद्र"),
            ("ACT_JUICE", "Juice", "[P] Juice", "[P] जूस की दुकान", "[P] जूस री दुकान"),
            ("ACT_FOOD_PROCESSING", "Food processing (pickle/badi/papad making)", "[P] Food processing (pickle/badi/papad)", "[P] खाद्य प्रसंस्करण (अचार/बड़ी/पापड़ निर्माण)", "[P] अचार, पापड़, बड़ी बणावण"),
            ("ACT_FOOD_MAKING", "Food making (Sweets/Namkeen/hotel)", "[P] Food making (Sweets/Namkeen/hotel)", "[P] मिठाई / नमकीन / ढाबा / होटल", "[P] मिठाई / नमकीन / होटल"),
            ("ACT_SWEET_BOX", "Sweet box making", "[P] Sweet box making", "[P] मिठाई के डिब्बे बनाना", "[P] मिठाई रा डिब्बा बणावण"),
            ("ACT_FLAG_MAKING", "Flag making", "[P] Flag making", "[P] झंडा निर्माण", "[P] झंडा बणावण"),
            ("ACT_LEATHER_PRODUCTS", "Leather products", "[P] Leather products", "[P] चमड़े के उत्पाद / जूते", "[P] चामड़ा रो काम / जूता"),
            ("ACT_STONE_IDOLS", "Stone idols", "[P] Stone idols", "[P] पत्थर की मूर्तियां", "[P] पत्थर री मूर्तियां बणावण"),
            ("ACT_ANY_OTHER", "Any other", "Any other activity", "अन्य कोई गतिविधि", "दूजो कोई काम")
        ]
    },
    {"id": "Q_A_18", "col": "LoanReceivedYear", "sec": "SectionA", "type": "Number", "title": "Q18. Years of receiving SVEP/OSF loan?", "title_hi": "Q18. SVEP/OSF ऋण किस वर्ष में प्राप्त हुआ?", "title_raj": "Q18. लोन किण साल में मिल्यो?"},
    {
        "id": "Q_A_19", "col": "MaintainSeparateRecords", "sec": "SectionA", "type": "Enum",
        "title": "Q19. Do you maintain separate records for all the businesses", "title_hi": "Q19. क्या आप सभी व्यवसायों के अलग-अलग खाते/रिकॉर्ड रखती हैं?", "title_raj": "Q19. कांई थे सगळा कामां रो अलग हिसाब राखो हो?",
        "options": [("OPT_YES", "Yes", "Yes", "हाँ", "हाँ"), ("OPT_NO", "No", "No", "नहीं", "नी")]
    },
    {
        "id": "Q_A_20", "col": "RegistrationsDocuments", "sec": "SectionA", "type": "EnumList",
        "title": "Q20. Do you have the following registrations/documents?", "title_hi": "Q20. क्या आपके पास निम्नलिखित पंजीकरण / दस्तावेज हैं?", "title_raj": "Q20. कांई थारे कनै ये कागज/दस्तावेज है?",
        "options": [
            ("DOC_PAN", "PAN card", "PAN Card", "पैन कार्ड", "पैन कार्ड"),
            ("DOC_AADHAR", "Aadhar card", "Aadhar Card", "आधार कार्ड", "आधार कार्ड"),
            ("DOC_UDYAM", "Udyam Aadhar", "Udyam Aadhar / MSME", "उद्यम आधार (MSME)", "उद्यम आधार"),
            ("DOC_SHOP_EST", "Shop and Establishment registration", "Shop & Establishment Act Registration", "दुकान एवं स्थापना पंजीकरण (गुमाश्ता)", "दुकान पंजीकरण"),
            ("DOC_FSSAI", "FSSAI", "FSSAI (Food License)", "एफएसएसएआई (खाद्य लाइसेंस)", "खाद्य लाइसेंस"),
            ("DOC_CASTE", "Caste certificate", "Caste Certificate", "जाति प्रमाण पत्र", "जाति प्रमाण पत्र"),
            ("DOC_INCOME", "Income certificate", "Income Certificate", "आय प्रमाण पत्र", "आय प्रमाण पत्र")
        ]
    },

    # ==================== SECTION B ====================
    {
        "id": "Q_B_01", "col": "RespondentAge", "sec": "SectionB", "type": "Enum",
        "title": "Q1. What is the age of the respondent?", "title_hi": "Q1. उत्तरदाता की आयु क्या है?", "title_raj": "Q1. थारी उमर कित्ती है?",
        "options": [
            ("AGE_18_25", "18-25", "18-25 years", "18-25 वर्ष", "18-25 साल"),
            ("AGE_26_35", "26-35", "26-35 years", "26-35 वर्ष", "26-35 साल"),
            ("AGE_36_45", "36-45", "36-45 years", "36-45 वर्ष", "36-45 साल"),
            ("AGE_46_55", "46-55", "46-55 years", "46-55 वर्ष", "46-55 साल"),
            ("AGE_ABOVE_55", "Above 55", "Above 55 years", "55 वर्ष से अधिक", "55 साल सूं बत्ती")
        ]
    },
    {
        "id": "Q_B_02", "col": "MaritalStatus", "sec": "SectionB", "type": "Enum",
        "title": "Q2. What is the marital status?", "title_hi": "Q2. वैवाहिक स्थिति क्या है?", "title_raj": "Q2. ब्याह री स्थिति",
        "options": [
            ("MAR_SINGLE", "Single", "Single / Unmarried", "अविवाहित", "कुंवारी"),
            ("MAR_MARRIED", "Married", "Married", "विवाहित", "परणी"),
            ("MAR_WIDOWED", "Widowed", "Widowed", "विधवा", "रांड"),
            ("MAR_SEPARATED", "Separated", "Separated", "अलग रह रही", "न्यारी"),
            ("MAR_DIVORCED", "Divorced", "Divorced", "तलाकशुदा", "छूटा-छेड़ा")
        ]
    },
    {
        "id": "Q_B_03", "col": "SocialCategory", "sec": "SectionB", "type": "Enum",
        "title": "Q3. What is the social category?", "title_hi": "Q3. सामाजिक श्रेणी / जाति वर्ग", "title_raj": "Q3. सामाजिक वर्ग / जात",
        "options": [
            ("CST_SC", "SC", "Scheduled Caste (SC)", "अनुसूचित जाति (SC)", "अनुसूचित जाति (SC)"),
            ("CST_ST", "ST", "Scheduled Tribe (ST)", "अनुसूचित जनजाति (ST)", "अनुसूचित जनजाति (ST)"),
            ("CST_OBC", "OBC", "Other Backward Classes (OBC)", "अन्य पिछड़ा वर्ग (OBC)", "अन्य पिछड़ा वर्ग (OBC)"),
            ("CST_GEN", "General", "General", "सामान्य (General)", "सामान्य (General)")
        ]
    },
    {
        "id": "Q_B_04", "col": "EducationStatus", "sec": "SectionB", "type": "Enum",
        "title": "Q4. What is the education status?", "title_hi": "Q4. उत्तरदाता की शैक्षिक योग्यता क्या है?", "title_raj": "Q4. थारी पढ़ाई-लिखाई कित्ती है?",
        "options": [
            ("EDU_ILLITERATE", "Illiterate", "Illiterate", "निरक्षर", "अनपढ़"),
            ("EDU_ILLITERATE_CALC", "Illiterate but able to calculate", "Illiterate (can sign & calculate)", "निरक्षर (हस्ताक्षर और गणना में सक्षम)", "दस्तखत अर हिसाब जाणती"),
            ("EDU_5TH", "Upto 5th", "Primary (up to 5th)", "प्राथमिक (5वीं तक)", "5वीं तांई"),
            ("EDU_8TH", "Upto 8th", "Middle (up to 8th)", "माध्यमिक (8वीं तक)", "8वीं तांई"),
            ("EDU_10TH", "Upto 10th", "Secondary (10th)", "10वीं", "10वीं"),
            ("EDU_12TH", "Upto 12th", "Senior Secondary (12th)", "12वीं", "12वीं"),
            ("EDU_DIPLOMA", "Diploma", "Diploma / ITI", "डिप्लोमा / आईटीआई", "डिप्लोमा"),
            ("EDU_GRADUATE", "Graduate", "Graduate & Above", "स्नातक या उससे अधिक", "कॉलेज पास"),
            ("EDU_BED", "B.Ed", "Professional Degree / B.Ed.", "व्यावसायिक डिग्री (B.Ed आदि)", "डिग्री")
        ]
    },
    {"id": "Q_B_05", "col": "FamilyMemberCount", "sec": "SectionB", "type": "Number", "title": "Q5. How many members are in the family? ------- (count)", "title_hi": "Q5. परिवार में कुल कितने सदस्य हैं? ------- (संख्या)", "title_raj": "Q5. परिवार में कुल कित्ता सदस्य है? ------- (गिनती)"},
    {"id": "Q_B_06_01", "col": "FamilyAdultsCount", "sec": "SectionB", "type": "Number", "title": "Adults (Above 18)-------", "title_hi": "वयस्क (18 वर्ष से ऊपर)-------", "title_raj": "बड़ा (18 सूं ऊपर)-------"},
    {"id": "Q_B_06_02", "col": "FamilyChildrenCount", "sec": "SectionB", "type": "Number", "title": "Children —-------", "title_hi": "बच्चे (18 वर्ष से कम)-------", "title_raj": "टाबर (18 सूं कम)-------"},
    {"id": "Q_B_06_03", "col": "FamilyTotalEarning", "sec": "SectionB", "type": "Number", "title": "Total earning members ------", "title_hi": "कुल कमाने वाले सदस्य------", "title_raj": "कुल कमावणिया सदस्य------"},
    {"id": "Q_B_06_04", "col": "FamilyMaleEarning", "sec": "SectionB", "type": "Number", "title": "Male earning members—----", "title_hi": "पुरुष कमाने वाले सदस्य-------", "title_raj": "आदमी कमावणिया-------"},
    {"id": "Q_B_06_05", "col": "FamilyFemaleEarning", "sec": "SectionB", "type": "Number", "title": "Female earning members—----", "title_hi": "महिला कमाने वाली सदस्य-------", "title_raj": "लुगायां कमावणिया-------"},
    {"id": "Q_B_06_06", "col": "FamilyDisabledCount", "sec": "SectionB", "type": "Number", "title": "Members with disability-------", "title_hi": "दिव्यांग सदस्य-------", "title_raj": "दिव्यांग सदस्य-------"},
    {
        "id": "Q_B_07", "col": "FamilyIncomeSources", "sec": "SectionB", "type": "EnumList",
        "title": "Q7. What are your family’s sources of income? (Multiselect)", "title_hi": "Q7. आपके परिवार की आय के मुख्य स्रोत क्या हैं? (बहु-चयन)", "title_raj": "Q7. थारे परिवार री आमदनी रा मुख्य स्रोत कांई है?",
        "options": [
            ("INC_AGRI", "Agricultural income", "Agricultural income", "कृषि आय (खेती)", "खेती-बाड़ी री कमाई"),
            ("INC_SALARY", "Fixed Salary", "Fixed Salary", "नियमित वेतन / नौकरी", "पक्की तनख्वाह / नौकरी"),
            ("INC_WAGES", "Wages", "Wages", "दैनिक मजदूरी", "मजूरी"),
            ("INC_SELF_EMP", "Self employed", "Self employed", "स्वरोजगार", "खुद रो रोजगार"),
            ("INC_NTFP", "NTFP sale", "NTFP sale", "लघु वनोपज (NTFP) बिक्री", "जंगल री उपज बेचान"),
            ("INC_DAIRY", "Dairying", "Dairying", "डेयरी व्यवसाय", "दूध-डेरी रो काम"),
            ("INC_ANIMAL_SALE", "Sale of animals", "Sale of animals", "पशु बिक्री (जानवरों का बेचना)", "पशु बेचना / लेन-देन"),
            ("INC_ANIMAL_PROD", "Animal products", "Animal products", "पशु उत्पाद बिक्री", "पशु उत्पाद बेचान"),
            ("INC_FAMILY_ENT", "Family/husband’s enterprise", "Family/husband's enterprise", "परिवार / पति का उद्यम", "घर रो / धणी रो धंधो"),
            ("INC_RESP_ENT", "Respondent’s enterprise", "Respondent's enterprise", "उत्तरदाता का स्वयं का उद्यम", "थारो खुद रो धंधो"),
            ("INC_MNREGA", "MNREGA", "MNREGA", "मनरेगा", "नरेगा मजूरी"),
            ("INC_PENSION", "Pension", "Pension", "पेंशन", "पेंशन"),
            ("INC_RENT", "Rent from properties", "Rent from properties", "मकान / दुकान किराया", "किरायो"),
            ("INC_OTHER", "Any other, specify", "Any other, specify", "अन्य कोई स्रोत (विवरण दें)", "दूजो कोई स्रोत")
        ]
    },
    {
        "id": "Q_B_08", "col": "AnnualHouseholdIncome", "sec": "SectionB", "type": "Enum",
        "title": "Q8. What is your annual household income and monetary benefits from all sources (including respondent’s enterprise)?", "title_hi": "Q8. सभी स्रोतों से आपके परिवार की कुल वार्षिक आय कितनी है?", "title_raj": "Q8. सगळा कामां सूं साल री कुल कमाई कित्ती है?",
        "options": [
            ("INC_LT_80K", "Less than Rs 80,000", "Less than Rs 80,000", "₹80,000 से कम", "80 हजार सूं कम"),
            ("INC_80K_120K", "Rs 80,000 to Rs 1,20,000", "Rs 80,000 to Rs 1,20,000", "₹80,000 से ₹1,20,000", "80 हजार सूं 1.20 लाख"),
            ("INC_120K_160K", "Rs 1,20,001 to Rs 1,60,000", "Rs 1,20,000 to Rs 1,60,000", "₹1,20,001 से ₹1,60,000", "1.20 लाख सूं 1.60 लाख"),
            ("INC_160K_200K", "Rs 1,60,001 to Rs 2,00,000", "Rs 1,60,000 to Rs 2,00,000", "₹1,60,001 से ₹2,00,000", "1.60 लाख सूं 2 लाख"),
            ("INC_200K_240K", "Rs 2,00,001 to Rs 2,40,000", "Rs 2,00,000 to Rs 2,40,000", "₹2,00,001 से ₹2,40,000", "2 लाख सूं 2.40 लाख"),
            ("INC_240K_280K", "Rs 2,40,001 to Rs 2,80,000", "Rs 2,40,000 to Rs 2,80,000", "₹2,40,001 से ₹2,80,000", "2.40 लाख सूं 2.80 लाख"),
            ("INC_280K_320K", "Rs 2,80,001 to Rs 3,20,000", "Rs 2,80,000 to Rs 3,20,000", "₹2,80,001 से ₹3,20,000", "2.80 लाख सूं 3.20 लाख"),
            ("INC_320K_360K", "Rs 3,20,001 to Rs 3,60,000", "Rs 3,20,000 to Rs 3,60,000", "₹3,20,001 से ₹3,60,000", "3.20 लाख सूं 3.60 लाख"),
            ("INC_360K_400K", "Rs 3,60,001 to Rs 4,00,000", "Rs 3,60,000 to Rs 4,00,000", "₹3,60,001 से ₹4,00,000", "3.60 लाख सूं 4 लाख"),
            ("INC_GT_400K", "Above Rs 4,00,001", "Above Rs 4,00,000", "₹4,00,000 से अधिक", "4 लाख सूं बत्ती")
        ]
    },

    # ==================== SECTION C ====================
    {
        "id": "Q_C_01", "col": "ReasonsStartingBusiness", "sec": "SectionC", "type": "EnumList",
        "title": "Q1. Reasons for starting the business? (Multiselect)", "title_hi": "Q1. व्यवसाय शुरू करने के क्या कारण थे? (बहु-चयन)", "title_raj": "Q1. काम-धंधो सरू करण रा कारण",
        "options": [
            ("RSN_SETBACK", "My family faced a financial setback, and I needed to earn", "Family faced financial setback, needed to earn", "परिवार में आर्थिक तंगी थी, इसलिए कमाना जरूरी था", "घर में आर्थिक तंगी ही, ई वास्ते कमाई जरूरी ही"),
            ("RSN_RISING_EXP", "Our expenses were rising, and my family needed an alternate source of income", "Expenses were rising, needed alternate income", "खर्चे बढ़ रहे थे, अतिरिक्त आय स्रोत चाहिए था", "खर्चा बढ़ रिया हा, आमदनी रो दूजो स्रोत चाहिजे हो"),
            ("RSN_OWN_VENTURE", "I always wanted to own/run my own business", "Always wanted to own/run my own business", "हमेशा से खुद का व्यवसाय शुरू करने की इच्छा थी", "म्हारो खुद रो धंधो करण री हमेशा इच्छा ही"),
            ("RSN_LEARNT_SKILL", "I learnt the skill and wanted to start my own venture.", "Learnt skill and wanted to start own venture", "हुनर सीखा और खुद का काम शुरू करना चाहती थी", "हुनर सीख लियो हो अर खुद रो काम करनो चाहवती ही"),
            ("RSN_FROM_WAGE", "I was doing the same work as wage labour and later decided to start own venture", "Was wage labourer, decided to start own venture", "पहले मजदूरी करती थी, फिर खुद का काम शुरू करने का सोचा", "पैली मजूरी करती ही, पछै खुद रो काम सरू कियो"),
            ("RSN_ALL_SHG_LOAN", "All SHG members were getting loans for enterprise so I also decided to take and start enterprise", "All SHG members getting loan, so I also took", "SHG में सबको लोन मिल रहा था तो मैंने भी लिया", "समूह में सगळा लोन ले रिया हा तो म्हे भी लियो"),
            ("RSN_CRP_ENCOURAGED", "The OSF/SVEP CRP encouraged me to start the enterprise", "OSF/SVEP CRP encouraged me", "OSF/SVEP के CRP (उद्यम मित्र) ने प्रेरित किया", "सीआरपी दीदी म्हाने धंधो सरू करण ने बोल्यो"),
            ("RSN_CLF_ENCOURAGED", "The CLF encouraged me to start the enterprise", "CLF encouraged me", "सीएलएफ (CLF) ने प्रेरित किया", "सीएलएफ म्हाने प्रेरित कियो"),
            ("RSN_OTHER", "Any other (Specify)", "Any other reason", "अन्य कोई कारण", "दूजो कोई कारण")
        ]
    },
    {
        "id": "Q_C_02", "col": "BusinessCycle", "sec": "SectionC", "type": "Enum",
        "title": "Q2. Describe your business cycle?", "title_hi": "Q2. आपके व्यवसाय का चक्र (संचालन अवधि) कैसा है?", "title_raj": "Q2. धंधो साल में कियां चालै?",
        "options": [
            ("CYC_REGULAR_HOURS", "Operational for regular hours throughout the year", "Regular hours daily round the year", "पूरे साल रोजाना नियमित घंटे", "सालो-साल रोज नियमित चालै"),
            ("CYC_WHENEVER_CUSTOMER", "Operational whenever the customer arrives throughout the year", "Whenever customers demand / drop in", "जब ग्राहक आते हैं, पूरे साल", "जद ग्राहक आवै जद चालै"),
            ("CYC_BOTH_ROUND_YEAR", "Both production and sales operational throughout the year", "Both (Daily & On Demand)", "उत्पादन और बिक्री दोनों पूरे साल", "बणावण अर बेचण दोन्नू सालो-साल"),
            ("CYC_ON_ORDER_ONLY", "Production and sale only on receiving order", "Round the year, strictly on advance order", "केवल अग्रिम ऑर्डर मिलने पर", "खाली आर्डर मिल्या पै"),
            ("CYC_SEASONAL_ROUND", "Seasonal production and sale throughout the year", "Seasonal, but round the clock during season", "मौसमी उत्पादन, साल भर बिक्री", "सीजन में बणावण अर साल भर बेचण"),
            ("CYC_FEW_MONTHS", "Production and sale is limited to few months", "Only for few days / weeks / months in whole year", "साल में कुछ ही महीनों तक सीमित", "साल में कुछेक महीना ई चालै"),
            ("CYC_OTHER", "Any other, specify", "Other (Specify)", "अन्य (विवरण दें)", "दूजो कोई तरीको")
        ]
    },
    {
        "id": "Q_C_03", "col": "BusinessPlaceType", "sec": "SectionC", "type": "Enum",
        "title": "Q3. What is the type of business place?", "title_hi": "Q3. व्यवसाय स्थल का प्रकार क्या है?", "title_raj": "Q3. दुकान/काम री जगा किण री है?",
        "options": [
            ("PLC_OWN", "Own", "Own Premises / House", "खुद का परिसर / घर", "खुद्को घर / परिसर"),
            ("PLC_RENTED", "Rented", "Rented Premises / Shop", "किराए का परिसर / दुकान", "किरायै री दुकान")
        ]
    },
    {"id": "Q_C_04", "col": "MonthlyRent", "sec": "SectionC", "type": "Number", "title": "Q4. If rented, what is monthly rent? Rs______", "title_hi": "Q4. यदि किराए पर है, तो मासिक किराया कितना है? ₹______", "title_raj": "Q4. किरायै पै है तो महीनै रो किरायो कित्तो है? ₹______"},
    {
        "id": "Q_C_05", "col": "LocationConvenience", "sec": "SectionC", "type": "Enum",
        "title": "Q5. Is the location of your premise convenient for your customers?", "title_hi": "Q5. क्या आपका व्यावसायिक स्थान ग्राहकों के लिए सुविधाजनक है?", "title_raj": "Q5. कांई दुकान री जगा गिरायकां वास्ते सही है?",
        "options": [
            ("LOC_CONVENIENT", "Yes, my location is very convenient to attract customers", "Yes, location is very convenient", "हाँ, स्थान ग्राहकों को आकर्षित करने के लिए बहुत सुविधाजनक है", "हाँ, जगा गिरायकां सारू घणी बढ़िया है"),
            ("LOC_CHANGED_LOC", "Yes, I changed my location to get the clients", "Yes, changed location to get clients", "हाँ, ग्राहकों को पाने के लिए मैंने स्थान बदला", "हाँ, गिरायकां वास्ते म्हे जगा बदली"),
            ("LOC_HOME_CANT_MOVE", "No, but I operate from home and can’t move to other location", "Operate from home, cannot move", "नहीं, घर से काम करती हूँ और दूसरी जगह नहीं जा सकती", "नी, घर सूं काम करां अर दूजी जगा नी जा सका"),
            ("LOC_AFFORD_ONLY", "No, but I can afford only this space", "Can afford only this space", "नहीं, लेकिन केवल यही स्थान वहन कर सकती हूँ", "नी, पण खाली इत्ती जगा रो ई भाड़ो दे सका"),
            ("LOC_OTHER", "Any other, specify", "Other (Specify)", "अन्य (विवरण दें)", "दूजो कोई कारण")
        ]
    },
    {"id": "Q_C_06_TABLE", "col": "Related_Q6_Labor", "sec": "SectionC", "type": "Ref_Table", "title": "Q6. Involvement of family members and hired help in business operations", "title_hi": "Q6. पारिवारिक सदस्यों एवं किराए के श्रमिकों की भागीदारी", "title_raj": "Q6. घर रा लोग अर मजदूरां रो काम"},
    {"id": "Q_C_07_01", "col": "Sourcing_NearbyTown_Pct", "sec": "SectionC", "type": "Enum", "title": "Nearby town/district", "title_hi": "आसपास के कस्बे / जिले से", "title_raj": "नेड़े रा कस्बा / जिले सूं"},
    {"id": "Q_C_07_02", "col": "Sourcing_Jaipur_Pct", "sec": "SectionC", "type": "Enum", "title": "Wholesale market within state", "title_hi": "राज्य के भीतर थोक बाजार से", "title_raj": "राजस्थान रा थोक बाजार सूं"},
    {"id": "Q_C_07_03", "col": "Sourcing_OutsideState_Pct", "sec": "SectionC", "type": "Enum", "title": "Wholesale market outside the state", "title_hi": "राज्य के बाहर थोक बाजार से", "title_raj": "बाहर रा थोक बाजार सूं"},
    {"id": "Q_C_07_04", "col": "Sourcing_Online_Pct", "sec": "SectionC", "type": "Enum", "title": "Order online (Amazon/Misho)", "title_hi": "ऑनलाइन ऑर्डर (Amazon/Meesho) से", "title_raj": "ऑनलाइन ऑर्डर सूं"},
    {
        "id": "Q_C_08", "col": "MarketingMethods", "sec": "SectionC", "type": "EnumList",
        "title": "Q8. How do you market your products/services? (Multiselect)", "title_hi": "Q8. आप अपने उत्पादों/सेवाओं का प्रचार (मार्केटिंग) कैसे करती हैं? (बहु-चयन)", "title_raj": "Q8. थे आपरा माल रो प्रचार कियां करो हो?",
        "options": [
            ("MKT_SHOP_ONLY", "My shop is the only place where I talk about my products/services", "My shop is the only place where I talk about my products/services", "मेरी दुकान ही एकमात्र जगह है जहाँ मैं उत्पादों की बात करती हूँ", "म्हारी दुकान पै ई म्हे गिरायकां ने माल बतावां"),
            ("MKT_NAME_BOARD", "I have name board outside my premises with details of my products/services", "I have name board outside my premises with details of my products/services", "दुकान/घर के बाहर बोर्ड लगा है जिस पर उत्पादों का विवरण है", "दुकान/घर रै बारै बोर्ड लाग्यो है"),
            ("MKT_DOOR_TO_DOOR", "I visit local traders/shopkeepers with my samples", "I visit local traders/shopkeepers with my samples", "मैं अपने नमूनों (सैंपल) के साथ व्यापारियों/दुकानदारों के पास जाती हूँ", "म्हे सैंपल ले’र दुकानदारां कनै जावां"),
            ("MKT_SHG_MEETINGS", "I talk about my products/services in SHG meetings", "I talk about my products/services in SHG meetings", "मैं SHG की बैठकों में अपने उत्पादों/सेवाओं की बात करती हूँ", "म्हे समूह (SHG) री बैठकां में माल री बात करां"),
            ("MKT_TRADERS_SAMPLES", "I visit local traders/shopkeepers with samples of my products", "I visit local traders/shopkeepers with samples of my products", "मैं स्थानीय व्यापारियों/दुकानदारों से संपर्क करती हूँ", "म्हे गाँव-गुवाड़ में दूजी दुकानदारां सूं मिलां"),
            ("MKT_INSTA_WHATSAPP", "I market actively on instagram and whatsapp", "I market actively on instagram and whatsapp", "मैं इंस्टाग्राम और व्हाट्सएप पर सक्रिय रूप से प्रचार/मार्केटिंग करती हूँ", "म्हे इंस्टाग्राम अर व्हाट्सएप पै प्रचार करां"),
            ("MKT_WAIT_ENQUIRIES", "I wait for people to make enquiries", "I wait for people to make enquiries", "मैं ग्राहकों के खुद आकर पूछने का इंतजार करती हूँ", "म्हे गिरायकां रै खुद पूछण री बाट जोवां"),
            ("MKT_DONT_KNOW_HOW", "I do not know how to market my products/services", "I do not know how to market my products/services", "मुझे नहीं पता कि उत्पादों का प्रचार कैसे किया जाए", "म्हाने प्रचार करण रो तरीको ठा कोनी"),
            ("MKT_NO_NEED", "I don't feel the need to market my products/services", "I don't feel the need to market my products/services", "मुझे प्रचार/मार्केटिंग करने की आवश्यकता महसूस नहीं होती", "म्हाने प्रचार करण री कोई जरूरत कोनी लागे"),
            ("MKT_OTHER", "Any other, specify", "Any other, specify", "अन्य कोई तरीका (विवरण दें)", "दूजो कोई तरीको (ब्यौरो दो)")
        ]
    },
    {
        "id": "Q_C_09", "col": "SeasonalSalesMethod", "sec": "SectionC", "type": "EnumList",
        "title": "Q9. How do you sell your products/services?", "title_hi": "Q9. आप अपने उत्पादों/सेवाओं की बिक्री कैसे करती हैं?", "title_raj": "Q9. थे आपरा माल/सेवावां री बिक्री कियां करो हो?",
        "options": [
            ("SEL_NOT_REL", "Not relevant", "Not relevant", "लागू नहीं / प्रासंगिक नहीं", "लागू कोनी"),
            ("SEL_PRODUCE_WAIT_ORDERS", "In case of production related business, I produce slightly more than my last year sales and wait for orders", "In case of production related business, I produce slightly more than my last year sales and wait for orders", "उत्पादन से जुड़े व्यवसाय में, मैं पिछले साल की बिक्री से थोड़ा अधिक उत्पादन करती हूँ और ऑर्डर का इंतजार करती हूँ", "उत्पादन काम में, म्हे पाछले साल सूं थोड़ो बत्ती माल बणा’र आर्डर री बाट जोवां"),
            ("SEL_DOOR_TO_DOOR", "I visit local traders/shopkeepers with my products and do door to door selling", "I visit local traders/shopkeepers with my products and do door to door selling", "मैं अपने उत्पादों के साथ व्यापारियों/दुकानदारों के पास जाती हूँ और घर-घर जाकर बिक्री करती हूँ", "म्हे माल ले’र दुकानदारां कनै अर घरे-घरे जा’र बेचण रो काम करां"),
            ("SEL_PRIOR_ORDERS", "I take orders from my usual clients few weeks prior to production/peak season and then sell", "I take orders from my usual clients few weeks prior to production/peak season and then sell", "मैं उत्पादन/पीक सीजन से कुछ हफ्ते पहले नियमित ग्राहकों से ऑर्डर लेती हूँ और फिर बेचती हूँ", "म्हे सीजन सूं पैली ई गिरायकां सूं आर्डर ले’र पछै माल बेचां"),
            ("SEL_LOCAL_HAAT", "I sell in local haat/weekly market", "I sell in local haat/weekly market", "मैं स्थानीय हाट / साप्ताहिक बाजार में बेचती हूँ", "म्हे लोकल हाट / सातावारिया बजार में बेचां"),
            ("SEL_SARAS_FAIR", "I sell in Saras fair", "I sell in Saras fair", "मैं सरस मेले में बेचती हूँ", "म्हे सरस मेला में बेचां"),
            ("SEL_INSTAGRAM", "I get orders via instagram", "I get orders via instagram", "मुझे इंस्टाग्राम के माध्यम से ऑर्डर मिलते हैं", "म्हाने इंस्टाग्राम पै आर्डर मिलै"),
            ("SEL_WHATSAPP", "I get orders via whatsapp", "I get orders via whatsapp", "मुझे व्हाट्सएप के माध्यम से ऑर्डर मिलते हैं", "म्हाने व्हाट्सएप पै आर्डर मिलै"),
            ("SEL_ONLINE_AMAZON", "I use online platforms like Amazon", "I use online platforms like Amazon", "मैं अमेज़न (Amazon) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "म्हे अमेज़न (Amazon) जैसी ऑनलाइन साइट रो उपयोग करां"),
            ("SEL_ONLINE_MEESHO", "I use online platform like Meesho", "I use online platform like Meesho", "मैं मीशो (Meesho) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "म्हे मीशो (Meesho) जैसी ऑनलाइन साइट रो उपयोग करां"),
            ("SEL_ONLINE_OTHER", "I use any other online platform", "I use any other online platform", "मैं किसी अन्य ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "म्हे दूजी कोई ऑनलाइन साइट रो उपयोग करां"),
            ("SEL_RAJEEVIKA", "I use RAJEEVIKA website", "I use RAJEEVIKA website", "मैं राजीविका (RAJEEVIKA) वेबसाइट / पोर्टल का उपयोग करती हूँ", "म्हे राजीविका वेबसाइट रो उपयोग करां"),
            ("SEL_OTHER", "Any other, specify", "Any other, specify", "अन्य कोई तरीका (विवरण दें)", "दूजो कोई तरीको (ब्यौरो दो)")
        ]
    },
    {"id": "Q_C_10_01", "col": "SalesChannel_Online_Pct", "sec": "SectionC", "type": "Enum", "title": "Online platforms", "title_hi": "ऑनलाइन प्लेटफॉर्म (Online platforms)", "title_raj": "ऑनलाइन साइट्स"},
    {"id": "Q_C_10_02", "col": "SalesChannel_WhatsApp_Pct", "sec": "SectionC", "type": "Enum", "title": "Whatsapp", "title_hi": "व्हाट्सएप (WhatsApp)", "title_raj": "व्हाट्सएप"},
    {"id": "Q_C_10_03", "col": "SalesChannel_Instagram_Pct", "sec": "SectionC", "type": "Enum", "title": "Instagram", "title_hi": "इंस्टाग्राम (Instagram)", "title_raj": "इंस्टाग्राम"},
    {"id": "Q_C_10_04", "col": "SalesChannel_Premise_Pct", "sec": "SectionC", "type": "Enum", "title": "Your premise", "title_hi": "आपकी अपनी दुकान / परिसर से", "title_raj": "खुद् री दुकान सूं"},
    {"id": "Q_C_10_05", "col": "SalesChannel_Traders_Pct", "sec": "SectionC", "type": "Enum", "title": "Local traders/shopkeepers", "title_hi": "स्थानीय व्यापारियों / दुकानदारों के माध्यम से", "title_raj": "लोकल दुकानदारां सूं"},
    {"id": "Q_C_10_06", "col": "SalesChannel_Haat_Pct", "sec": "SectionC", "type": "Enum", "title": "Local haat/market", "title_hi": "स्थानीय हाट / साप्ताहिक बाजार", "title_raj": "लोकल हाट / सातावारिया बजार"},
    {"id": "Q_C_10_07", "col": "SalesChannel_Saras_Pct", "sec": "SectionC", "type": "Enum", "title": "Saras fair", "title_hi": "सरस मेला", "title_raj": "सरस मेला"},
    {
        "id": "Q_C_11", "col": "RecordKeepingHabit", "sec": "SectionC", "type": "Enum",
        "title": "Q11. Do you maintain written records of business transactions?", "title_hi": "Q11. क्या आप व्यावसायिक लेन-देन का लिखित रिकॉर्ड रखती हैं?", "title_raj": "Q11. कांई थे लेन-देन रो लिखित हिसाब राखो हो?",
        "options": [
            ("RKH_ALWAYS_DONE", "Yes, I have always been doing it", "Yes, I have always been doing it", "हाँ, मैं हमेशा से ऐसा करती आ रही हूँ", "हाँ, म्हे हमेशा सूं हिसाब राखती आई हां"),
            ("RKH_AFTER_CRP_TRAIN", "Yes, I started doing after being trained by OSF/SVEP CRP", "Yes, started after being trained by OSF/SVEP CRP", "हाँ, OSF/SVEP CRP द्वारा प्रशिक्षण के बाद शुरू किया", "हाँ, सीआरपी दीदी रै सिखावण रै बाद सरू कियो"),
            ("RKH_FAMILY_MAINTAINS", "Yes, my family member maintains but i dont check", "Yes, family member maintains but I don’t check", "हाँ, परिवार का सदस्य रखता है पर मैं चेक नहीं करती", "हाँ, घर रो सदस्य राखै पण म्हे नी देखां"),
            ("RKH_HIRED_HELP", "Yes, I have hired help to do that", "Yes, hired help to do that", "हाँ, इसके लिए मुनीम/सहायक रखा हुआ है", "हाँ, हिसाब सारू आदमी राख्योड़ो है"),
            ("RKH_NOT_REGULAR", "I don't record regularly", "Don't record regularly", "मैं नियमित रूप से रिकॉर्ड नहीं रखती", "म्हे रोज-रोज हिसाब कोनी राखां"),
            ("RKH_NO_RECORD", "I don't maintain any records at all", "Don't maintain any records at all", "मैं कोई रिकॉर्ड नहीं रखती", "म्हे कोई हिसाब-किताब कोनी राखां")
        ]
    },
    {
        "id": "Q_C_12", "col": "RecordKeepingMethod", "sec": "SectionC", "type": "EnumList",
        "title": "Q12. How do you maintain business transactions?", "title_hi": "Q12. आप व्यावसायिक लेन-देन का हिसाब कैसे रखती हैं?", "title_raj": "Q12. थे लेन-देन रो हिसाब कियां राखो हो?",
        "options": [
            ("RKT_RECEIPT_BILLS", "Receipt book/bills", "Receipt book/bills", "रसीद बुक / बिल", "रसीद बही / बिल"),
            ("RKT_PURCHASE_SALE_REG", "purchase and sale register", "purchase and sale register", "क्रय-विक्रय (खरीद-बिक्री) रजिस्टर", "खरीद-बेचान रो रजिस्टर"),
            ("RKT_ONLY_DEBT", "Only debt register", "Only debt register", "केवल उधार / बही खाता रजिस्टर", "खाली उधारी रो खातो"),
            ("RKT_DAILY_DIARY", "Maintain daily diary", "Maintain daily diary", "दैनिक डायरी मेंटेन करती हूँ", "रोज री डायरी राखूं"),
            ("RKT_CRP_DIARY", "Maintain daily diary as taught by OSF/SVEP CRP", "Maintain daily diary as taught by OSF/SVEP CRP", "OSF/SVEP CRP द्वारा सिखाए अनुसार दैनिक डायरी रखती हूँ", "सीआरपी दीदी रै सिखाये मुजब रोज डायरी राखूं"),
            ("RKT_DIGITAL_APPS", "Maintain digital records using Mera Bill, Bahi Khata", "Maintain digital records using Mera Bill, Bahi Khata", "मेरा बिल, बही खाता जैसे ऐप से डिजिटल रिकॉर्ड रखती हूँ", "मेरा बिल / बही खाता ऐप सूं हिसाब राखूं"),
            ("RKT_NOT_REGULAR", "Don’t record regularly", "Don’t record regularly", "नियमित रूप से रिकॉर्ड नहीं रखती", "रोज-रोज हिसाब कोनी राखूं"),
            ("RKT_FAMILY_BOOK", "My family member maintains a book", "My family member maintains a book", "परिवार का कोई सदस्य हिसाब की किताब रखता है", "घर रो कोई दूजो सदस्य हिसाब राखै"),
            ("RKT_NO_RECORD", "I don't maintain any record", "I don't maintain any record", "मैं कोई रिकॉर्ड / हिसाब नहीं रखती", "म्हे कोई हिसाब-किताब कोनी राखां"),
            ("RKT_OTHER", "Any other, specify", "Any other, specify", "अन्य कोई तरीका (विवरण दें)", "दूजो कोई तरीको (ब्यौरो दो)")
        ]
    },
    {"id": "Q_C_13_TABLE", "col": "Related_Q15_Turnover", "sec": "SectionC", "type": "Ref_Table", "title": "Q13. Turnover and income from the enterprise", "title_hi": "Q13. उद्यम का टर्नओवर एवं मासिक आय", "title_raj": "Q13. कुल बिक्री अर कमाई"},

    # ==================== SECTION D ====================
    {
        "id": "Q_D_01", "col": "SHGAssociationAssistance", "sec": "SectionD", "type": "EnumList",
        "title": "Q1. How has the SHG association helped in your enterprise? (Multiselect)", "title_hi": "Q1. स्वयं सहायता समूह से जुड़ने से आपके उद्यम में क्या मदद मिली? (बहु-चयन)", "title_raj": "Q1. समूह सूं जुड़बा सूं धंधे में कांई मदद मिली?",
        "options": [
            ("SHG_SKILL_TRAIN", "Attended the skill training offered by SHG", "Attended skill training offered by SHG", "समूह द्वारा आयोजित कौशल प्रशिक्षण में भाग लिया", "समूह री ट्रेनिंग में भाग लियो"),
            ("SHG_BIZ_INFO", "Got information about the scope of business from SHG meetings", "Got business scope information from SHG meetings", "समूह बैठकों से व्यवसाय के अवसरों की जानकारी मिली", "बैठकां सूं काम-धंधे री जाणकारी मिली"),
            ("SHG_DOCS_HELP", "Got required registration/documents made", "Got required registrations/documents made", "आवश्यक दस्तावेज/पंजीकरण बनवाने में मदद मिली", "कागज/पंजीकरण बणावण में मदद मिली"),
            ("SHG_SUBSIDY_GRANT", "Got subsidy/grant due to SHG.", "Got subsidy/grant due to SHG", "समूह के माध्यम से सब्सिडी/अनुदान मिला", "समूह रै जरिये सब्सिडी/अनुदान मिल्यो"),
            ("SHG_SEED_LOAN", "Took loan from SHG to buy material to initiate the business", "Took loan from SHG to initiate business", "व्यवसाय शुरू करने के लिए समूह से ऋण लिया", "धंधो सरू करण सारू समूह सूं लोन लियो"),
            ("SHG_REGULAR_LOAN", "Take loans from SHG regularly as per business requirements", "Take loans from SHG regularly as needed", "व्यवसाय की जरूरत अनुसार नियमित ऋण लेती हूँ", "जरूरत मुजब समूह सूं लोन लेवती रहूं"),
            ("SHG_CRP_GUIDE", "OSF/SVEP CRP guided me in setting up the business", "OSF/SVEP CRP guided in setting up business", "CRP (उद्यम मित्र) ने उद्यम स्थापित करने में मार्गदर्शन दिया", "सीआरपी दीदी धंधो जमावण में मदद करी"),
            ("SHG_MUDRA_LOAN", "OSF/SVEP CRP helped me to get Mudra loan", "OSF/SVEP CRP helped get Mudra loan", "CRP ने मुद्रा ऋण (Mudra Loan) दिलाने में सहायता की", "सीआरपी मुद्रा लोन देवावण में मदद करी"),
            ("SHG_BANK_LOAN", "OSF/SVEP CRP helped me to get bank loan", "OSF/SVEP CRP helped get bank loan", "CRP ने बैंक ऋण दिलाने में सहायता की", "सीआरपी बैंक सूं लोन देवावण में मदद करी")
        ]
    },
    {"id": "Q_D_02_TABLE", "col": "Related_Q19_Capital", "sec": "SectionD", "type": "Ref_Table", "title": "Q2. How have you arranged capital over the enterprise duration?", "title_hi": "Q2. उद्यम अवधि के दौरान पूंजी की व्यवस्था कैसे की?", "title_raj": "Q2. धंधे सारू पैशां री व्यवस्था कियां करी?"},
    {"id": "Q_D_03_TABLE", "col": "Related_Q20_Loan_Usage", "sec": "SectionD", "type": "Ref_Table", "title": "Q3. How did you use the loans taken from different sources?", "title_hi": "Q3. विभिन्न स्रोतों से लिए गए ऋण का उपयोग कैसे किया?", "title_raj": "Q3. लोन रा पैशां रो उपयोग किण काम में लियो?"},
    {
        "id": "Q_D_04", "col": "FundingExperience", "sec": "SectionD", "type": "EnumList",
        "title": "Q4. What has been your experience in funding your business? (Multiselect)", "title_hi": "Q4. व्यवसाय के वित्तपोषण (फंडिंग) का आपका क्या अनुभव रहा है? (बहु-चयन)", "title_raj": "Q4. धंधे सारू पैशां रो इंतजाम करण रो अनुभव",
        "options": [
            ("FEX_SHG_SUFFICIENT", "SHG loan is sufficient for the current scale of my business", "SHG loan is sufficient for current scale", "समूह का ऋण वर्तमान व्यवसाय के लिए पर्याप्त है", "समूह रो लोन म्हारे काम सारू पूरो है"),
            ("FEX_PLOUGH_EARNINGS", "I regularly plough in my business earnings", "Regularly plough in business earnings", "व्यवसाय की कमाई को दोबारा व्यवसाय में लगाती हूँ", "कमाई पाछी धंधे में ई लगावां"),
            ("FEX_SHG_SMALLER", "SHG loan size is smaller than my requirement", "SHG loan size is smaller than requirement", "समूह का ऋण मेरी आवश्यकता से कम है", "समूह रो लोन म्हारी जरूरत सूं कम है"),
            ("FEX_EASY_MONEYLENDER", "I get the required loan easily from the moneylender/NBFIs.", "Easily get loan from moneylender/NBFIs", "साहूकार/NBFI से आसानी से ऋण मिल जाता है", "साहूकार सूं लोन आराम सूं मिल जावै"),
            ("FEX_FAMILY_HELP", "My family members help me with funds and loans", "Family members help with funds and loans", "परिवार के सदस्य फंड और लोन में मदद करते हैं", "घर रा लोग पैशां री मदद करै"),
            ("FEX_HIGH_INTEREST", "I don't prefer money lender or NBFIs as the interest rate is high", "Don't prefer moneylender due to high interest", "साहूकार/NBFI से नहीं लेती क्योंकि ब्याज दर बहुत अधिक है", "साहूकार सूं कोनी लेवां, ब्याज घणो लागै"),
            ("FEX_SHORT_REPAY", "I don't prefer money lender or NBFIs as the repayment time is shorter for my convenience", "Don't prefer moneylender due to short repayment", "साहूकार/NBFI की चुकौती अवधि बहुत छोटी होती है", "चुकावण रो टेम घणो कम मिलै")
        ]
    },
    {"id": "Q_D_05_TABLE", "col": "Related_Q22_Trajectory", "sec": "SectionD", "type": "Ref_Table", "title": "Q5. What changes have happened in your business?", "title_hi": "Q5. आपके व्यवसाय में क्या परिवर्तन हुए हैं? (प्रगति)", "title_raj": "Q5. थारे काम-धंधे में कांई बदलाव आया?"},
    {
        "id": "Q_D_06", "col": "FinancialHelpFromIncome", "sec": "SectionD", "type": "EnumList",
        "title": "Q6. How has the income from the enterprise helped you financially? (Multiselect)", "title_hi": "Q6. उद्यम की आय से आपको आर्थिक रूप से क्या मदद मिली है? (बहु-चयन)", "title_raj": "Q6. धंधे री कमाई सूं थारे घर में कांई आर्थिक मदद मिली?",
        "options": [
            ("FHLP_NO_ASK_FAMILY", "I don’t need to ask money from my husband/family for my needs.", "Don't need to ask money from family", "अपनी जरूरतों के लिए पति/परिवार से पैसे मांगने की जरूरत नहीं पड़ती", "म्हारी जरूरत सारू धणी/घर वाळां सूं मांगणा नी पड़े"),
            ("FHLP_BIGGEST_INCOME", "The income from enterprise is the biggest source of income for my family", "Enterprise is biggest income source for family", "उद्यम की आय मेरे परिवार की आय का सबसे बड़ा स्रोत है", "धंधे री कमाई म्हारे घर री सबसे बड़ी आमदनी है"),
            ("FHLP_CHILD_EDUCATION", "The income from enterprise is used in covering education related expenses for my children. Specify amount", "Covering education expenses for children", "बच्चों की पढ़ाई का खर्च उठाने में मदद मिली", "टाबरां री पढ़ाई रो खारचो निकळ्यो"),
            ("FHLP_FAMILY_DEBTS", "I have been able to pay the family debts. Specify amount", "Able to pay family debts", "परिवार के पुराने कर्जे चुकाने में सक्षम हुई", "घर रो पुरानो कर्जो चुका दियो"),
            ("FHLP_ACQUIRE_ASSETS", "I have contributed money in acquiring assets for my family Specify amount", "Contributed in acquiring assets for family", "परिवार के लिए संपत्ति (गाड़ी/जमीन/मकान) खरीदने में योगदान दिया", "घर री संपत्ति बणावण में मदद करी"),
            ("FHLP_MARRIAGE_EXP", "I have contributed money for marriage expenses. Specify amount", "Contributed money for marriage expenses", "परिवार में शादी-ब्याह के खर्चों में योगदान दिया", "ब्याह-शादी रा खर्चा में मदद करी"),
            ("FHLP_OTHER", "Any other (Please specify)", "Any other financial help", "अन्य कोई आर्थिक मदद (विवरण दें)", "दूजी कोई आर्थिक मदद")
        ]
    },

    # ==================== SECTION E ====================
    {
        "id": "Q_E_01", "col": "HusbandFamilyResponse", "sec": "SectionE", "type": "EnumList",
        "title": "Q1. How has been your husband’s response towards your enterprise? (Multiselect)", "title_hi": "Q1. आपके उद्यम के प्रति आपके पति/परिवार का क्या रुख रहा है? (बहु-चयन)", "title_raj": "Q1. थारे धंधे सारू पति/घर वाळां रो कांई रुख रह्यो?",
        "options": [
            ("HRESP_NEED_HELP", "I need help from my family in running my enterprise more effectively", "Need help from family to run effectively", "उद्यम को बेहतर चलाने के लिए परिवार से मदद की जरूरत है", "काम सही चलावण सारू घर वाळां री मदद चाहिजे"),
            ("HRESP_LATER_SUPPORT", "My husband was not supportive initially, but now helps when required", "Husband not supportive initially, now helps", "शुरुआत में पति का सहयोग नहीं था, लेकिन अब जरूरत पड़ने पर मदद करते हैं", "पैली पति नी मानता हा, पण अबै मदद करै"),
            ("HRESP_FINANCIAL", "My husband supports/supported me financially", "Husband supports financially", "पति ने आर्थिक रूप से मेरा पूरा सहयोग किया", "पति पैशां री पूरी मदद करी"),
            ("HRESP_FULL_SUPPORT", "I have full support of my husband/family and helped me in every possible way", "Full support of husband/family in every way", "पति और परिवार का पूरा सहयोग है, हर तरह से मदद करते हैं", "पति अर घर वाळां रो पूरो साथ है"),
            ("HRESP_NO_SUPPORT", "I am running my enterprise without anyone’s support", "Running enterprise without anyone's support", "मैं बिना किसी के सहयोग के खुद अपना उद्यम चला रही हूँ", "म्हे बिना किणी रै सहारे खुद धंधो चलावां")
        ]
    },
    {
        "id": "Q_E_02", "col": "MaterialSourcingComfort", "sec": "SectionE", "type": "Enum",
        "title": "Q2. What is your level of comfort in sourcing material?", "title_hi": "Q2. कच्चा माल लाने / खरीदने में आपकी सहजता का स्तर क्या है?", "title_raj": "Q2. माल लावण में थे कित्ता सहज हो?",
        "options": [
            ("SRC_TRAVEL_ALONE", "I travel alone and I handle negotiations independently", "Travel alone & negotiate independently", "अकेले यात्रा करती हूँ और मोल-भाव खुद संभालती हूँ", "एकली जावां अर मोल-भाव खुद करां"),
            ("SRC_NEED_COMPANION", "I need travel companion but I handle negotiations independently", "Need companion, negotiate independently", "साथ में किसी का होना जरूरी है पर मोल-भाव खुद करती हूँ", "साथी चाहिजे, पण मोल-भाव खुद करां"),
            ("SRC_FAMILY_HANDLES", "My family member handles the purchase", "Family member handles purchase", "परिवार का कोई सदस्य ही माल की खरीदारी करता है", "घर रो कोई सदस्य ई माल लावै"),
            ("SRC_CRP_HELPS", "OSF/SVEP CRP helps in sourcing material", "OSF/SVEP CRP helps in sourcing", "CRP (उद्यम मित्र) माल लाने/खरीदने में मदद करते हैं", "सीआरपी माल लावण में मदद करै"),
            ("SRC_WANT_DIFF_PLACES", "I want to source material from different places but I need support", "Want to source from outside, need support", "बाहरी बाजारों से माल लाना चाहती हूँ लेकिन मदद चाहिए", "बाहर सूं माल लावणो चाहवां पण मदद चाहिजे"),
            ("SRC_CONTENT_NEARBY", "I am content to source material from nearby market", "Content with nearby market", "आसपास के बाजार से माल लाकर ही संतुष्ट हूँ", "नेड़े रा बजार सूं माल ला’र राजी हां")
        ]
    },
    {
        "id": "Q_E_03", "col": "CustomerPaymentRecovery", "sec": "SectionE", "type": "Enum",
        "title": "Q3. Are you able to recover money from customers?", "title_hi": "Q3. क्या आप ग्राहकों से समय पर अपना पैसा/उधारी वसूल पाती हैं?", "title_raj": "Q3. गिरायकां सूं उधारी रो पैसो पाछो मिल जावै कांई?",
        "options": [
            ("REC_NO_ISSUES", "Yes, I don’t face any issues", "Yes, don't face any issues", "हाँ, मुझे वसूली में कोई परेशानी नहीं होती", "हाँ, पैशां री कोई दिक्कत कोनी आवै"),
            ("REC_CASH_ONLY", "Yes, but I conduct only cash transactions", "Yes, but only cash transactions", "हाँ, लेकिन मैं केवल नकद में ही व्यापार करती हूँ", "हाँ, पण म्हे खाली रोकड़ में ई काम करां"),
            ("REC_EVENTUALLY_PAYS", "Yes, eventually everyone pays", "Yes, eventually everyone pays", "हाँ, थोड़ा समय लगता है पर अंत में सब दे देते हैं", "हाँ, थोड़ा टेम लागै पण पैसो मिल जावै"),
            ("REC_LEARNT_NEGOTIATE", "Yes, but I have learnt over the years how to negotiate.", "Learnt over years how to negotiate", "हाँ, समय के साथ मैंने पैसे वसूलना और बात करना सीख लिया है", "हाँ, अबै म्हे उधारी मांगणी सीख ली"),
            ("REC_HUSBAND_RECOVERS", "No, but my husband is able to recover", "Husband is able to recover", "नहीं, लेकिन मेरे पति वसूली कर लेते हैं", "नी, पण म्हारा पति पैसो पाछो ले आवै"),
            ("REC_LOSSES_DEBT", "No, my business has suffered losses due to debt.", "Suffered losses due to debt", "नहीं, उधारी डूबने के कारण व्यवसाय में नुकसान हुआ है", "नी, उधारी डूबबा सूं नुकसान हुयो है")
        ]
    },
    {
        "id": "Q_E_04", "col": "CurrentChallenges", "sec": "SectionE", "type": "EnumList",
        "title": "Q4. What are the challenges you are facing now? (Multiselect)", "title_hi": "Q4. वर्तमान में आप किन प्रमुख चुनौतियों का सामना कर रही हैं? (बहु-चयन)", "title_raj": "Q4. आज रै टेम में थारे सामनै कांई अड़चनां है?",
        "options": [
            ("CH_OSF_PHASED", "OSF is phased out now which has affected fund sufficiency. Specify amount", "OSF phased out affecting fund sufficiency", "OSF योजना बंद होने से फंड की कमी हो गई है", "योजना बंद होबा सूं पैशां री कमी आई"),
            ("CH_TIMELY_FUNDS", "I need timely access to funds to buy inputs before the production/peak season begins. Specify amount", "Need timely funds before peak season", "सीजन से पहले माल खरीदने के लिए समय पर फंड चाहिए", "सीजन सूं पैली माल सारू टेम पै पैसो चाहिजे"),
            ("CH_BIGGER_MARKET", "I need support to access bigger market to source material/inputs at lower cost", "Need support to access bigger markets", "कम कीमत पर माल लाने के लिए बड़े बाजारों तक पहुंच चाहिए", "सस्तो माल लावण सारू बड़ा बजार री पहुंच चाहिजे"),
            ("CH_SELLING_INVENTORY", "I need help in selling my inventory.", "Need help in selling inventory", "बने हुए माल / स्टॉक को बेचने में मदद चाहिए", "बण्योड़ो माल बेचण में सहायता चाहिजे"),
            ("CH_SOCIAL_MEDIA_LEARN", "I need help in learning use of social media", "Need help learning social media", "सोशल मीडिया और ऑनलाइन प्रचार सीखने में मदद चाहिए", "सोशल मीडिया चलावण सीखणो चाहिजे"),
            ("CH_OTHER", "Any other, specify", "Any other challenge", "अन्य कोई चुनौती (विवरण दें)", "दूजी कोई अड़चन")
        ]
    },
    {"id": "Q_E_05_01", "col": "Competitors_Similar_Scale", "sec": "SectionE", "type": "Number", "title": "Same business scale ______", "title_hi": "समान स्तर के व्यवसाय की संख्या ______", "title_raj": "बराबर रा धंधेदार ______"},
    {"id": "Q_E_05_02", "col": "Competitors_Smaller_Scale", "sec": "SectionE", "type": "Number", "title": "Smaller business scale than yours_______", "title_hi": "आपसे छोटे स्तर के व्यवसाय की संख्या _______", "title_raj": "छोटा धंधेदार _______"},
    {"id": "Q_E_05_03", "col": "Competitors_Higher_Scale", "sec": "SectionE", "type": "Number", "title": "Higher business scale than yours_________", "title_hi": "आपसे बड़े स्तर के व्यवसाय की संख्या _________", "title_raj": "बड़ा धंधेदार _________"},
    {
        "id": "Q_E_06", "col": "CompetitorAdvantages", "sec": "SectionE", "type": "EnumList",
        "title": "Q6. What advantage do you have over your competitors? (Multiselect)", "title_hi": "Q6. प्रतिस्पर्धियों (अन्य दुकानदारों) की तुलना में आपकी क्या विशेषताएं/फायदे हैं? (बहु-चयन)", "title_raj": "Q6. दूजा दुकानदारां सूं थारे में कांई खास बात है?",
        "options": [
            ("ADV_BETTER_LOC", "I operate from a better location", "Operate from better location", "मेरी दुकान बेहतर और चलती जगह पर है", "म्हारी दुकान घणी अच्छी जगा पै है"),
            ("ADV_SHOP_VS_HOME", "I operate from a shop while they operate from home", "Operate from shop vs home", "मेरी पक्की दुकान है जबकि वे घर से काम करते हैं", "म्हारी दुकान है अर बांको घर सूं काम है"),
            ("ADV_VARIETY", "I offer a wide variety of products/services", "Wide variety of products/services", "मेरे पास माल और वैरायटी ज्यादा है", "म्हारे कनै माल री वैरायटी घणी है"),
            ("ADV_DISCOUNTS", "I offer discounts and still able to make profit", "Offer discounts & make profit", "मैं छूट (डिस्काउंट) देती हूँ फिर भी मुनाफा कमाती हूँ", "म्हे छूट दे’र भी नफो कमा लेवां"),
            ("ADV_QUALITY", "I offer better quality of products/services", "Better quality of products/services", "मेरे उत्पादों/सेवाओं की गुणवत्ता बेहतर है", "म्हारा माल री क्वालिटी घणी बढ़िया है"),
            ("ADV_CREDIT", "I sell my products/services on credit", "Sell on credit", "मैं ग्राहकों को उधारी की सुविधा देती हूँ", "म्हे गिरायकां ने उधारी री सुविधा देवां"),
            ("ADV_FAST_DELIVERY", "I take less time to supply products/deliver services", "Less time to deliver", "मैं कम समय में माल तैयार/डिलीवर कर देती हूँ", "म्हे जल्दी माल तैयार कर’र दे देवां"),
            ("ADV_SOCIAL_MEDIA", "I use social media to market my products/services", "Use social media to market", "मैं सोशल मीडिया का उपयोग करके प्रचार करती हूँ", "म्हे सोशल मीडिया पै प्रचार करां"),
            ("ADV_OTHER", "Any other, specify", "Any other advantage", "अन्य कोई विशेषता (विवरण दें)", "दूजी कोई खासियत"),
            ("ADV_NONE", "I don't have any advantage", "No advantage", "कोई विशेष फायदा नहीं है", "कोई खास बात कोनी")
        ]
    },

    # ==================== SECTION F ====================
    {
        "id": "Q_F_01", "col": "FutureExpansionPlans", "sec": "SectionF", "type": "Enum",
        "title": "Q1. For next one year, what are your plans to increase the scale of your business?", "title_hi": "Q1. अगले एक वर्ष में अपने व्यवसाय को बढ़ाने के लिए आपकी क्या योजनाएं हैं?", "title_raj": "Q1. आवणिया एक साल में धंधो बढ़ावण री कांई योजना है?",
        "options": [
            ("EXP_BETTER_LOC", "I want to shift to a better location", "Shift to better location", "बेहतर स्थान पर दुकान शिफ्ट करना चाहती हूँ", "अच्छी जगा पै दुकान ले जावणी चाहवां"),
            ("EXP_ATTRACTIVE_SHOP", "I want to make my shop/premise more attractive to customers", "Make shop more attractive", "दुकान को अधिक सुंदर व आकर्षक बनाना चाहती हूँ", "दुकान ने और बढ़िया सजावणी चाहवां"),
            ("EXP_SAME_LOC_SCALE", "I want to expand my current business at the same location (more stock/customers/scale)", "Expand current business at same location", "इसी जगह पर व्यवसाय और स्टॉक बढ़ाना चाहती हूँ", "ई जगा पै माल अर धंधो बढ़ावणो चाहवां"),
            ("EXP_OPEN_BRANCH", "I want to open a branch/second unit of the same business elsewhere", "Open branch / second unit", "दूसरी जगह एक और शाखा/यूनिट खोलना चाहती हूँ", "दूजी जगा एक और दुकान खोलणी चाहवां"),
            ("EXP_DIVERSIFY", "I want to diversify into a related product/service (e.g., add new items to sell)", "Diversify into related products/services", "नया मिलता-जुलता सामान/सेवा जोड़ना चाहती हूँ", "नयो सामान/काम जोड़नो चाहवां"),
            ("EXP_SECOND_VENTURE", "I want to start a completely different, second enterprise", "Start different second enterprise", "एक बिल्कुल अलग नया व्यवसाय शुरू करना चाहती हूँ", "एक न्यारो ई नयो काम सरू करनो चाहवां"),
            ("EXP_FORMALISE", "I want to formalise my business (registration, GST, etc.) to access more/larger customers", "Formalise business (GST, registrations)", "व्यवसाय का औपचारिक पंजीकरण (GST आदि) कराना चाहती हूँ", "दुकान रो पक्को रजिस्ट्रेशन/GST करावणी चाहवां"),
            ("EXP_ONLINE_MARKETS", "I want to move from local/door-to-door sales to online or wider markets", "Move to online / wider markets", "स्थानीय से ऑनलाइन या बड़े बाजारों में जाना चाहती हूँ", "ऑनलाइन या बड़ा बजार में माल बेचणो चाहवां"),
            ("EXP_HIRE_HELP", "I want to hire more people to help run the business", "Hire more people", "काम के लिए और लोगों को नौकरी पर रखना चाहती हूँ", "काम सारू और मजदूरां ने राखणी चाहवां"),
            ("EXP_HANDOVER_FAMILY", "I want to hand over the business to a family member and reduce my own involvement", "Handover to family member", "व्यवसाय परिवार के किसी सदस्य को सौंपना चाहती हूँ", "काम घर वाळां ने संभळावणो चाहवां"),
            ("EXP_SATISFIED_NO_EXP", "I am satisfied with the current scale and don't want to expand", "Satisfied, don't want to expand", "वर्तमान स्थिति से संतुष्ट हूँ, विस्तार नहीं करना", "अबै जत्तो है बीं सूं राजी हां"),
            ("EXP_SHUT_DOWN", "I want to shut down or exit this enterprise", "Want to shut down / exit", "व्यवसाय बंद करना चाहती हूँ", "काम-धंधो बंद करनो चाहवां"),
            ("EXP_OTHER", "Any other, specify", "Other plan (Specify)", "अन्य कोई योजना (विवरण दें)", "दूजी कोई योजना"),
            ("EXP_CANT_SAY", "Can't say / haven't thought about it", "Can't say / haven't thought", "कुछ कह नहीं सकती / सोचा नहीं है", "कांई ठा / सोच्यो कोनी")
        ]
    },
    {
        "id": "Q_F_02", "col": "AspirationBottlenecks", "sec": "SectionF", "type": "EnumList",
        "title": "Q2. What is holding you back from pursuing these aspirations? (Multiselect)", "title_hi": "Q2. इन आकांक्षाओं/योजनाओं को पूरा करने में क्या बाधाएं आ रही हैं? (बहु-चयन)", "title_raj": "Q2. योजनावां पूरी करण में कांई रुकावट आ री है?",
        "options": [
            ("BOT_CAPITAL", "Lack of capital/funds", "Lack of capital / funds", "पूंजी / पैसों की कमी", "पैशां री कमी"),
            ("BOT_FAMILY_SUPPORT", "Lack of family support/time due to household responsibilities", "Lack of family support / time", "पारिवारिक सहयोग की कमी या घरेलू जिम्मेदारियां", "घर रो टेम नी मिल पावै"),
            ("BOT_MARKET_ACCESS", "Lack of market access/demand beyond current customer base", "Lack of market access / demand", "बाजार तक पहुंच या मांग की कमी", "बजार री पहुंच कोनी"),
            ("BOT_SKILLS_TRAINING", "Lack of skills/training needed for the next step", "Lack of skills / training", "आगे बढ़ने के लिए जरूरी हुनर/प्रशिक्षण की कमी", "ट्रेनिंग / हुनर री कमी"),
            ("BOT_HEALTH_PERSONAL", "Health or personal constraints", "Health or personal constraints", "स्वास्थ्य या व्यक्तिगत परेशानियां", "तबीयत या निजी परेशानी"),
            ("BOT_NOTHING_WORKING", "Nothing is holding me back, I am already working towards it", "Nothing holding back, working towards it", "कोई रुकावट नहीं है, मैं इस पर काम कर रही हूँ", "कोई रुकावट कोनी, म्हे काम कर री हां"),
            ("BOT_OTHER", "Any other, specify", "Any other bottleneck", "अन्य कोई कारण (विवरण दें)", "दूजो कोई कारण")
        ]
    },
    {
        "id": "Q_F_03", "col": "FutureFundsRequired", "sec": "SectionF", "type": "Enum",
        "title": "Q3. How much funds do you need to fund your plan?", "title_hi": "Q3. अपनी योजना को पूरा करने के लिए आपको कितने फंड/पूंजी की आवश्यकता है?", "title_raj": "Q3. योजना सारू कित्ता पैशां री जरूरत है?",
        "options": [
            ("FND_UPTO_1L", "Upto Rs 1,00,000", "Upto Rs 1,00,000", "₹1,00,000 तक", "1 लाख तांई"),
            ("FND_1L_3L", "Rs 1,00,001-Rs 3,00,000", "Rs 1,00,001 to Rs 3,00,000", "₹1,00,001 से ₹3,00,000", "1 सूं 3 लाख तांई"),
            ("FND_3L_5L", "Rs 3,00,001-Rs 5,00,000", "Rs 3,00,001 to Rs 5,00,000", "₹3,00,001 से ₹5,00,000", "3 सूं 5 लाख तांई"),
            ("FND_5L_7L", "Rs 5,00,001-Rs 7,00,000", "Rs 5,00,001 to Rs 7,00,000", "₹5,00,001 से ₹7,00,000", "5 सूं 7 लाख तांई"),
            ("FND_7L_9L", "Rs 7,00,001-Rs 9,00,000", "Rs 7,00,001 to Rs 9,00,000", "₹7,00,001 से ₹9,00,000", "7 सूं 9 लाख तांई"),
            ("FND_GT_9L", "More than 9,00,000", "More than Rs 9,00,000", "₹9,00,000 से अधिक", "9 लाख सूं बत्ती")
        ]
    },

    # ==================== SECTION G ====================
    {
        "id": "Q_G_01", "col": "AttendedTraining", "sec": "SectionG", "type": "Enum",
        "title": "Q1. Have you attended any training under SVEP/OSF?", "title_hi": "Q1. क्या आपने SVEP/OSF के तहत कोई प्रशिक्षण लिया है?", "title_raj": "Q1. कांई थे योजना में कोई ट्रेनिंग ली ही?",
        "options": [("OPT_YES", "Yes", "Yes", "हाँ", "हाँ"), ("OPT_NO", "No", "No", "नहीं", "नी")]
    },
    {"id": "Q_G_02", "col": "TrainingDetails", "sec": "SectionG", "type": "Text", "title": "Q2. If Yes, specify__________", "title_hi": "Q2. यदि हाँ, तो विवरण दें__________", "title_raj": "Q2. हाँ तो ब्यौरो दो__________"},
    {
        "id": "Q_G_03", "col": "UsedTrainingComponent", "sec": "SectionG", "type": "Enum",
        "title": "Q3. Did you use any training component in your enterprise?", "title_hi": "Q3. क्या आपने प्रशिक्षण की सीख का उपयोग अपने उद्यम में किया?", "title_raj": "Q3. कांई ट्रेनिंग री सीख काम में ली?",
        "options": [("OPT_YES", "Yes", "Yes", "हाँ", "हाँ"), ("OPT_NO", "No", "No", "नहीं", "नी")]
    },
    {"id": "Q_G_04", "col": "UsedTrainingDetails", "sec": "SectionG", "type": "Text", "title": "Q4. If Yes, specify__________", "title_hi": "Q4. यदि हाँ, तो विवरण दें__________", "title_raj": "Q4. हाँ तो ब्यौरो दो__________"},
    {"id": "Q_G_05_01", "col": "MonthlyIncomeBeforeLoan", "sec": "SectionG", "type": "Number", "title": "Income before the changes: Rs-------", "title_hi": "ऋण/बदलाव से पहले मासिक आय: ₹-------", "title_raj": "बदलाव सूं पैली आमदनी: ₹-------"},
    {"id": "Q_G_05_02", "col": "MonthlyIncomeAfterLoan", "sec": "SectionG", "type": "Number", "title": "Income after the changes: Rs---------", "title_hi": "ऋण/बदलाव के बाद मासिक आय: ₹---------", "title_raj": "बदलाव रै बाद आमदनी: ₹---------"},
    {
        "id": "Q_G_06", "col": "MonthlyIncomeIncreaseByOSFSVEP", "sec": "SectionG", "type": "Enum",
        "title": "Q6. Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?", "title_hi": "Q6. OSF/SVEP ऋण और बदलावों से आपकी औसत मासिक आय में कितनी वृद्धि हुई?", "title_raj": "Q6. योजना रै लोन सूं महिने री कमाई कित्ती बढ़ी?",
        "options": [
            ("INC_UPTO_2K", "Upto Rs 2000", "Upto Rs 2000", "₹2,000 तक", "2000 तांई"),
            ("INC_2K_3K", "Rs 2000 to Rs 3000", "Rs 2000 to Rs 3000", "₹2,000 से ₹3,000", "2000 सूं 3000"),
            ("INC_3K_4K", "Rs 3000 to Rs 4000", "Rs 3000 to Rs 4000", "₹3,000 से ₹4,000", "3000 सूं 4000"),
            ("INC_4K_5K", "Rs 4000 to Rs 5000", "Rs 4000 to Rs 5000", "₹4,000 से ₹5,000", "4000 सूं 5000"),
            ("INC_5K_6K", "Rs 5000 to Rs 6000", "Rs 5000 to Rs 6000", "₹5,000 से ₹6,000", "5000 सूं 6000"),
            ("INC_GT_6K", "Above Rs 6000", "Above Rs 6000", "₹6,000 से अधिक", "6000 सूं बत्ती"),
            ("INC_CANT_SAY", "Cant say", "Cant say", "कह नहीं सकती", "ठा नी")
        ]
    },
    {
        "id": "Q_G_07", "col": "CRPContributions", "sec": "SectionG", "type": "EnumList",
        "title": "Q7. What has been the contribution of SVEP/OSF CRP in your enterprise? (Multiselect)", "title_hi": "Q7. आपके उद्यम में SVEP/OSF CRP (उद्यम मित्र) का क्या योगदान रहा है? (बहु-चयन)", "title_raj": "Q7. थारे धंधे में सीआरपी दीदी रो कांई योगदान रह्यो?",
        "options": [
            ("CRP_SUBSIDY", "Accessing subsidy", "Accessing subsidy", "सब्सिडी/अनुदान दिलाने में मदद की", "सब्सिडी देवावण में मदद करी"),
            ("CRP_DOCS", "Getting necessary documents. Specify Aadhar/PAN Card/Income certificate/Caste certificate/Udhayam aadhar/ FSSAI certificate/Shop registration", "Getting necessary documents (PAN/Aadhar/Udyam/FSSAI)", "जरूरी दस्तावेज और लाइसेंस बनवाने में मदद की", "कागज अर लाइसेंस बणावण में मदद करी"),
            ("CRP_BIZ_PLAN", "They helped us to understand business plans", "Helped understand business plans", "बिजनेस प्लान और व्यवसाय को समझने में मदद की", "बिजनेस प्लान समझावण में मदद करी"),
            ("CRP_PROFIT_IDEAS", "They gave us new ideas to improve our profit.", "Gave new ideas to improve profit", "मुनाफा बढ़ाने के नए उपाय बताए", "नफो बढ़ावण रा नया विचार दिया"),
            ("CRP_RECORDS", "They trained us on maintaining records which we didn’t know earlier", "Trained on maintaining records", "बही-खाता और हिसाब-किताब रखने का प्रशिक्षण दिया", "हिसाब-किताब राखणो सिखायो"),
            ("CRP_BANK_LOAN", "They helped in accessing loans from bank", "Helped accessing loans from bank", "बैंक से ऋण दिलाने में मदद की", "बैंक सूं लोन देवावण में मदद करी"),
            ("CRP_COMM_SKILLS", "They helped in our communication skills", "Helped in communication skills", "बातचीत और संवाद कौशल सुधारने में मदद की", "बोलचाल अर व्यवहार सिखायो"),
            ("CRP_MARKETING", "They helped in marketing", "Helped in marketing", "प्रचार-प्रसार और मार्केटिंग में मदद की", "प्रचार-प्रसार में मदद करी"),
            ("CRP_INSTAGRAM", "They helped in learning use of instagram", "Helped learning use of Instagram", "इंस्टाग्राम और सोशल मीडिया का उपयोग सिखाया", "इंस्टाग्राम चलावणो सिखायो"),
            ("CRP_COMPETITORS", "They helped us to understand our competitors and suggested ways to beat the competition.", "Helped understand competitors & strategies", "प्रतिस्पर्धियों को समझने और आगे बढ़ने के उपाय बताए", "दूजा दुकानदारां सूं आगे बढ़ण रा उपाय बताया")
        ]
    },
    {
        "id": "Q_G_08", "col": "ExpectationsFromScheme", "sec": "SectionG", "type": "EnumList",
        "title": "Q8. What are your expectations from the SVEP/OSF scheme?", "title_hi": "Q8. SVEP/OSF योजना से आपकी क्या अपेक्षाएं हैं?", "title_raj": "Q8. योजना सूं थारी कांई उम्मीद है?",
        "options": [
            ("EXP_BIGGER_LOAN", "Need bigger loan amount", "Need bigger loan amount", "बड़ी ऋण राशि (लोन) की आवश्यकता है", "बड़ा लोन री जरूरत है"),
            ("EXP_MUDRA_HELP", "Need help in accessing Mudra loan", "Need help accessing Mudra loan", "मुद्रा लोन (Mudra Loan) दिलाने में मदद चाहिए", "मुद्रा लोन देवावण में मदद चाहिजे"),
            ("EXP_CRP_GUIDANCE", "Need more guidance of SBDP/SVEP CRPs", "Need more guidance of CRPs", "CRP (उद्यम मित्र) का अधिक मार्गदर्शन चाहिए", "सीआरपी रो और मार्गदर्शन चाहिजे"),
            ("EXP_BIGGER_MARKETS", "Need help to access bigger markets", "Need help to access bigger markets", "बड़े बाजारों तक पहुंच में मदद चाहिए", "बड़ा बजार तक पहुंच में मदद चाहिजे"),
            ("EXP_ONLINE_PURCHASE", "Need help with online purchase", "Need help with online purchase", "ऑनलाइन कच्चा माल खरीदने में मदद चाहिए", "ऑनलाइन माल खरीदण में मदद चाहिजे"),
            ("EXP_INSTA_HELP", "Need help with instagram", "Need help with Instagram / social media", "इंस्टाग्राम और सोशल मीडिया प्रचार में मदद चाहिए", "इंस्टाग्राम चलावण में मदद चाहिजे"),
            ("EXP_BIZ_TRAININGS", "Need my business specific trainings", "Need business specific trainings", "मेरे व्यवसाय से संबंधित विशेष प्रशिक्षण चाहिए", "म्हारे धंधे री खास ट्रेनिंग चाहिजे"),
            ("EXP_OTHER", "Any other, Specify", "Any other expectation", "अन्य कोई अपेक्षा (विवरण दें)", "दूजी कोई उम्मीद")
        ]
    },

    # ==================== SECTION H ====================
    {
        "id": "Q_H_01", "col": "SmartphoneOwnership", "sec": "SectionH", "type": "Enum",
        "title": "Q1. Do you own a smart phone?", "title_hi": "Q1. क्या आपके पास स्मार्टफोन (टच वाला फोन) है?", "title_raj": "Q1. कांई थारे कनै बड़ो फोन (स्मार्टफोन) है?",
        "options": [
            ("PHN_OWN", "Yes", "Yes, own a smartphone", "हाँ, खुद का स्मार्टफोन है", "हाँ, म्हारो खुद रो स्मार्टफोन है"),
            ("PHN_NO", "No", "No", "नहीं", "नी"),
            ("PHN_FAMILY_ACCESS", "No, but i have access to smart phone", "No, but have access to family smartphone", "नहीं, लेकिन परिवार में स्मार्टफोन का उपयोग कर सकती हूँ", "नी, पण घर में बड़ो फोन काम ले सकां")
        ]
    },
    {
        "id": "Q_H_02", "col": "UseQRUPI", "sec": "SectionH", "type": "Enum",
        "title": "Q2. Do you use QR code/mobile banking for money transactions?", "title_hi": "Q2. क्या आप पैसों के लेन-देन के लिए QR कोड / UPI (PhonePe, Paytm, GPay) का उपयोग करती हैं?", "title_raj": "Q2. कांई थे QR कोड / फोन पे / गूगल पे काम में लेवो हो?",
        "options": [("OPT_YES", "Yes", "Yes", "हाँ", "हाँ"), ("OPT_NO", "No", "No", "नहीं", "नी")]
    },
    {
        "id": "Q_H_03", "col": "QRDailyTransactions", "sec": "SectionH", "type": "Enum",
        "title": "Q3. If yes, daily how many transactions in your business are done using QR code/mobile banking?", "title_hi": "Q3. यदि हाँ, तो रोजाना व्यवसाय में QR कोड / UPI से लगभग कितने लेन-देन होते हैं?", "title_raj": "Q3. हाँ तो रोज QR कोड सूं कित्ता लेन-देन होवै?",
        "options": [
            ("QR_1_4", "1-4", "1-4 transactions daily", "1-4 लेन-देन", "1-4 लेन-देन"),
            ("QR_5_10", "5-10", "5-10 transactions daily", "5-10 लेन-देन", "5-10 लेन-देन"),
            ("QR_10_20", "10-20", "10-20 transactions daily", "10-20 लेन-देन", "10-20 लेन-देन"),
            ("QR_20_40", "20-40", "20-40 transactions daily", "20-40 लेन-देन", "20-40 लेन-देन"),
            ("QR_GT_40", "More than 40", "More than 40 transactions daily", "40 से अधिक लेन-देन", "40 सूं बत्ती")
        ]
    },
    {
        "id": "Q_H_04", "col": "QRNonUseReason", "sec": "SectionH", "type": "Enum",
        "title": "Q4. If no, reason for not using QR code/mobile banking for money related transactions", "title_hi": "Q4. यदि नहीं, तो QR कोड / मोबाइल बैंकिंग का उपयोग न करने का क्या कारण है?", "title_raj": "Q4. नी तो QR कोड नी काम लेवण रो कारण",
        "options": [
            ("NOQR_NO_PHONE", "Since I don’t own smart phone, it is difficult to transact", "Don't own smartphone, difficult to transact", "स्मार्टफोन नहीं है, इसलिए लेन-देन करना कठिन है", "स्मार्टफोन कोनी ई वास्ते लेन-देन नी होवै"),
            ("NOQR_FEW_CUSTOMERS", "Not many customers use smart phone for payments", "Not many customers use smartphone for payment", "अधिकतर ग्राहक ऑनलाइन पेमेंट नहीं करते", "घणा गिराहक ऑनलाइन पेमेंट कोनी करै"),
            ("NOQR_DONT_KNOW_HOW", "I don’t know how to use and monitor transactions with QR code/mobile banking", "Don't know how to use / monitor QR transactions", "मुझे QR कोड चलाना और चेक करना नहीं आता", "म्हाने QR कोड चलावणो नी आवै"),
            ("NOQR_NOT_APPLICABLE", "Not applicable", "Not applicable", "लागू नहीं", "लागू कोनी")
        ]
    },
    {
        "id": "Q_H_05", "col": "SocialMediaForMarketing", "sec": "SectionH", "type": "Enum",
        "title": "Q5. Do you use social media for marketing?", "title_hi": "Q5. क्या आप प्रचार और मार्केटिंग के लिए सोशल मीडिया का उपयोग करती हैं?", "title_raj": "Q5. कांई थे प्रचार सारू सोशल मीडिया काम में लेवो हो?",
        "options": [
            ("SMM_WHATSAPP_ORDERS", "I regularly share images on whatsapp to get orders", "Regularly share images on WhatsApp to get orders", "व्हाट्सएप पर नियमित फोटो भेजकर ऑर्डर लेती हूँ", "व्हाट्सएप पै फोटो भेज’र आर्डर लेवां"),
            ("SMM_INSTA_ORDERS", "I regularly share images/reels on instagram to get orders", "Regularly share images/reels on Instagram", "इंस्टाग्राम पर नियमित फोटो/रील डालकर ऑर्डर लेती हूँ", "इंस्टाग्राम पै फोटो/रील डाल’र आर्डर लेवां"),
            ("SMM_NO_SMARTPHONE", "It is important but I don’t have access to smart phone", "Important, but don't have smartphone", "जरूरी है लेकिन मेरे पास स्मार्टफोन नहीं है", "जरूरी है पण म्हारै कनै बड़ो फोन कोनी"),
            ("SMM_DONT_KNOW_USE", "I do not use because I don't know how to use whatsapp/ instagram", "Don't know how to use WhatsApp / Instagram", "उपयोग नहीं करती क्योंकि मुझे चलाना नहीं आता", "म्हाने चलावणो कोनी आवै"),
            ("SMM_NO_TIME_LEARN", "I don't have time to learn and use social media", "Don't have time to learn and use", "सीखने और चलाने का समय नहीं मिलता", "सीखण रो टेम कोनी मिलै"),
            ("SMM_DONT_WANT", "I don't want to use social media", "Don't want to use social media", "मैं सोशल मीडिया का उपयोग नहीं करना चाहती", "म्हे काम में नी लेवणो चाहवां"),
            ("SMM_OTHER", "Any other, specify", "Any other reason", "अन्य कोई कारण (विवरण दें)", "दूजो कोई कारण")
        ]
    },
    {
        "id": "Q_H_06", "col": "SocialPlatformsUsed", "sec": "SectionH", "type": "EnumList",
        "title": "Q6. Which social media platforms do you use for your business? (Multiselect)", "title_hi": "Q6. व्यवसाय के लिए आप किन सोशल मीडिया प्लेटफॉर्म का उपयोग करती हैं? (बहु-चयन)", "title_raj": "Q6. धंधे सारू कुणसा सोशल मीडिया ऐप काम में लेवो हो?",
        "options": [
            ("SMP_WHATSAPP", "Whatsapp", "WhatsApp", "व्हाट्सएप (WhatsApp)", "व्हाट्सएप"),
            ("SMP_INSTAGRAM", "Instagram", "Instagram", "इंस्टाग्राम (Instagram)", "इंस्टाग्राम"),
            ("SMP_PINTEREST", "Pinterest", "Pinterest", "पिंटरेस्ट (Pinterest)", "पिंटरेस्ट"),
            ("SMP_FACEBOOK", "Facebook", "Facebook", "फेसबुक (Facebook)", "फेसबुक"),
            ("SMP_SNAPCHAT", "Snapchat", "Snapchat", "स्नैपचैट (Snapchat)", "स्नैपचैट"),
            ("SMP_NONE", "Don’t use social media", "Don't use social media", "सोशल मीडिया का उपयोग नहीं करती", "सोशल मीडिया कोनी काम लेवां")
        ]
    },
    {
        "id": "Q_H_07", "col": "SocialPlatformUsageMode", "sec": "SectionH", "type": "Enum",
        "title": "Q7. How do you use these platforms in your business?", "title_hi": "Q7. व्यवसाय में आप इन प्लेटफॉर्म का उपयोग किस प्रकार करती हैं?", "title_raj": "Q7. धंधे में सोशल मीडिया रो उपयोग कियां करो हो?",
        "options": [
            ("SMU_PRICE_ORDERS", "Use texts to ask/share prices and book orders", "Use texts to share prices and book orders", "कीमत बताने और ऑर्डर बुक करने के लिए मैसेज करती हूँ", "भाव बतावण अर आर्डर लेवण सारू मैसेज करां"),
            ("SMU_SHARE_IMAGES", "Share images to promote business", "Share images to promote business", "व्यवसाय के प्रचार के लिए फोटो शेयर करती हूँ", "प्रचार सारू फोटो शेयर करां"),
            ("SMU_VENDOR_ENQUIRY", "Share images to enquire about the availability of products to vendors", "Enquire about product availability from vendors", "थोक विक्रेताओं से माल की उपलब्धता पूछने के लिए", "व्यापारियां सूं माल पूछण सारू"),
            ("SMU_NEW_IDEAS", "Get new ideas and information about new products/services", "Get new ideas and info on products/services", "नए उत्पादों और डिजाइनों की जानकारी लेने के लिए", "नया डिजाइन अर माल री जाणकारी सारू"),
            ("SMU_NONE", "Don’t use social media", "Don't use social media", "सोशल मीडिया का उपयोग नहीं करती", "कोनी काम लेवां")
        ]
    },
    {
        "id": "Q_H_08", "col": "SocialMediaFrequency", "sec": "SectionH", "type": "Enum",
        "title": "Q8. How often do you use social media for your business?", "title_hi": "Q8. व्यवसाय के लिए आप कितनी बार सोशल मीडिया का उपयोग करती हैं?", "title_raj": "Q8. धंधे सारू सोशल मीडिया कित्ती बार काम में लेवो हो?",
        "options": [
            ("SMF_DAILY", "Daily", "Daily", "रोजाना (Daily)", "रोज"),
            ("SMF_2_3_WEEK", "Twice or thrice a week", "Twice or thrice a week", "सप्ताह में दो-तीन बार", "हफ्ते में दो-तीन बार"),
            ("SMF_4_5_MONTH", "Four-five times a month", "Four-five times a month", "महीने में चार-पाँच बार", "महिने में 4-5 बार"),
            ("SMF_OCCASIONAL", "Only on occasions", "Only on occasions", "केवल विशेष अवसरों/त्योहारों पर", "खाली तिंवार-मौके पै"),
            ("SMF_NONE", "Don’t use social media", "Don't use social media", "सोशल मीडिया का उपयोग नहीं करती", "कोनी काम लेवां")
        ]
    },

    # ==================== SECTION I ====================
    {"id": "Q_I_01", "col": "OSFInterventionYear", "sec": "SectionI", "type": "Number", "title": "Q1. In which year was the OSF intervention made?-------", "title_hi": "Q1. OSF योजना का सहयोग किस वर्ष मिला था?-------", "title_raj": "Q1. OSF योजना रो फायदो किण साल मिल्यो हो?-------"},
    {
        "id": "Q_I_02", "col": "BusinessOperationalStatus", "sec": "SectionI", "type": "Enum",
        "title": "Q2. Is your business still operational?", "title_hi": "Q2. क्या आपका व्यवसाय अभी भी चालू है?", "title_raj": "Q2. कांई थारो काम-धंधो अबै भी चालू है?",
        "options": [
            ("BSTAT_REDUCED", "Yes but the sale has reduced", "Yes, but sales reduced", "हाँ, लेकिन बिक्री कम हो गई है", "हाँ, पण बिक्री कम हो गी"),
            ("BSTAT_INCREASED", "Yes but the scale has increased", "Yes, scale increased", "हाँ, और व्यवसाय का स्तर बढ़ा है", "हाँ, अर काम बढ़्यो है"),
            ("BSTAT_SAME", "Yes, but the scale has remained the same.", "Yes, scale remained same", "हाँ, लेकिन पहले जैसा ही चल रहा है", "हाँ, पण पैली जिसो ई चालै"),
            ("BSTAT_CLOSED", "No. If no, specify the year when it was closed……..", "No, closed (Specify closure year)", "नहीं, बंद हो चुका है (वर्ष बताएं)", "नी, बंद हो गयो")
        ]
    },
    {
        "id": "Q_I_03", "col": "ScalingDownClosingReasons", "sec": "SectionI", "type": "EnumList",
        "title": "Q3. What are the reasons for scaling down the business/closing the business?", "title_hi": "Q3. व्यवसाय कम होने या बंद होने के क्या प्रमुख कारण रहे हैं?", "title_raj": "Q3. धंधो कम होबा या बंद होबा रा कारण कांई हा?",
        "options": [
            ("SDR_NO_GUIDE", "Sales reduced over the years as there was no one guiding us.", "Sales reduced as no one guiding", "मार्गदर्शन न मिलने से धीरे-धीरे बिक्री कम हो गई", "समझावणियो कोई नी हो ई वास्ते काम घट्यो"),
            ("SDR_NO_LOAN", "Needed more capital to source material but there was no source of loan", "Needed more capital, no loan source", "माल खरीदने के लिए और पूंजी चाहिए थी पर लोन नहीं मिला", "पैशां री कमी ही अर लोन नी मिल्यो"),
            ("SDR_BANK_REFUSED", "Banks refused to give us loan", "Banks refused loan", "बैंकों ने ऋण देने से मना कर दिया", "बैंक लोन देण सूं मना कर दियो"),
            ("SDR_NO_NEW_CUSTOMERS", "Unable to reach new customers.", "Unable to reach new customers", "नए ग्राहकों तक नहीं पहुँच पाए", "नया गिराहक नी जुड़ पाया"),
            ("SDR_COMPETITORS_DISCOUNT", "New competitors in the market offering discounts", "New competitors offering discounts", "बाजार में नए प्रतिस्पर्धी छूट देकर माल बेचने लगे", "नया दुकानदार डिस्काउंट दे’र माल बेचण लाग्या"),
            ("SDR_OTHER", "Any other, specify……..", "Any other reason", "अन्य कोई कारण (विवरण दें)", "दूजो कोई कारण"),
            ("SDR_DONT_KNOW", "Don’t know", "Don't know", "पता नहीं", "ठा नी")
        ]
    },
    {
        "id": "Q_I_04", "col": "SupportNeededForSustenance", "sec": "SectionI", "type": "EnumList",
        "title": "Q4. What kind of support could have helped you to manage your business?", "title_hi": "Q4. किस प्रकार के सहयोग से आप अपने व्यवसाय को बेहतर तरीके से चला सकती थीं?", "title_raj": "Q4. किण मदद सूं थारो धंधो सही चाल सकतो हो?",
        "options": [
            ("SUP_OSF_LOAN", "Continued access to OSF loan", "Continued access to OSF loan", "OSF ऋण की निरंतर सुविधा मिलती रहती", "योजना रो लोन लगातार मिलतो रहतो"),
            ("SUP_CRP_GUIDE", "Continued support by OSF CRPs", "Continued support by OSF CRPs", "CRP (उद्यम मित्र) का निरंतर मार्गदर्शन मिलता रहता", "सीआरपी दीदी रो साथ लगातार रहतो"),
            ("SUP_OTHER", "Any other, specify", "Any other support", "अन्य कोई सहयोग (विवरण दें)", "दूजी कोई मदद")
        ]
    }
]

# Generate clean Survey physical columns list
system_cols = ["ID", "CreatedOn", "Date", "InvestigatorID", "Latitude", "Longitude", "Status", "Language"]
survey_cols = list(system_cols)

for q in sections_data:
    if q["col"] not in survey_cols:
        survey_cols.append(q["col"])

print(f"Total Refined Survey Columns: {len(survey_cols)}")

# Build clean AppVariables rows
appvar_rows = []

# System Variables
sys_vars = [
    ("CompanyName", "General", "", "", "Text", "OmmNoMi Automation LLP", "Company Name", "Branding", "", "OmmNoMi Automation LLP", "", "", "", "", "", "", "OmmNoMi Automation LLP", "OmmNoMi Automation LLP", ""),
    ("AppName", "General", "", "", "Text", "SHG Women Entrepreneurs Survey", "App Name", "Branding", "", "SHG Women Entrepreneurs Survey", "", "", "", "", "", "", "एसएचजी महिला उद्यमी सर्वेक्षण", "एसएचजी महिला उद्यमी सर्वेक्षण", ""),
    ("ROLE_INVESTIGATOR", "AppUser", "Role", "UserRole", "Enum", "Field Investigator", "Field Investigator", "Role Definition", "", "Field Investigator", "", "", "", "", "", "", "फील्ड अन्वेषक", "फील्ड अन्वेषक", ""),
    ("ROLE_SUPERVISOR", "AppUser", "Role", "UserRole", "Enum", "Field Supervisor", "Field Supervisor", "Role Definition", "", "Field Supervisor", "", "", "", "", "", "", "फील्ड सुपरवाइजर", "फील्ड सुपरवाइजर", ""),
    ("ROLE_ADMIN", "AppUser", "Role", "UserRole", "Enum", "Admin", "Admin", "Role Definition", "", "Admin", "", "", "", "", "", "", "व्यवस्थापक (Admin)", "व्यवस्थापक (Admin)", ""),
    ("LANG_EN", "AppUser", "PreferredLanguage", "SystemLanguage", "Enum", "English", "English", "Language Option", "", "en", "", "", "", "", "", "", "English", "English", ""),
    ("LANG_HI", "AppUser", "PreferredLanguage", "SystemLanguage", "Enum", "Hindi", "Hindi", "Language Option", "", "hi", "", "", "", "", "", "", "हिन्दी", "हिन्दी", ""),
    ("LANG_RAJ", "AppUser", "PreferredLanguage", "SystemLanguage", "Enum", "Rajasthani", "Rajasthani", "Language Option", "", "raj", "", "", "", "", "", "", "राजस्थानी", "राजस्थानी", ""),
    ("STAT_DRAFT", "Survey", "Status", "SurveyStatus", "Enum", "Draft", "Draft Status", "Workflow Status", "", "Draft", "", "", "", "", "", "", "प्रारूप (Draft)", "कच्चो (Draft)", ""),
    ("STAT_SUBMITTED", "Survey", "Status", "SurveyStatus", "Enum", "Submitted", "Submitted Status", "Workflow Status", "", "Submitted", "", "", "", "", "", "", "जमा किया गया (Submitted)", "जमा कियो (Submitted)", ""),
    ("STAT_VERIFIED", "Survey", "Status", "SurveyStatus", "Enum", "Verified", "Verified Status", "Workflow Status", "", "Verified", "", "", "", "", "", "", "सत्यापित (Verified)", "जाँच्योड़ो (Verified)", ""),
    ("Q_B_05_CUSTOM", "Survey", "SubTable_FamilyCount", "QuestionPrompt, SectionB, CustomSubTable", "SubTable", "Q6. Give details of the family members? (count)", "Give details of the family members? (count)", "Question_Group", "29", "Q6. Give details of the family members? (count)", "", "", "", "", "", "", "Q6. परिवार के सदस्यों का विवरण दें? (गिनती)", "Q6. परिवार रा सदस्यां रो ब्यौरो दो? (गिनती)", "")
]

for sv in sys_vars:
    appvar_rows.append({
        "ID": sv[0], "Table": sv[1], "Column": sv[2], "Tags": sv[3], "ValueControl": sv[4],
        "Title": sv[5], "Description": sv[6], "UsedFor": sv[7], "Decimal": sv[8], "EnumValue": sv[9],
        "EnumList": sv[10], "VariableList": sv[11], "DateValue": sv[12], "Photo": sv[13], "URL": sv[14], "File": sv[15],
        "Title_hi": sv[16], "Title_raj": sv[17], "ActionIcon": sv[18], "LastEditBy": "Antigravity", "LastEditOn": "09/26/2026 11:30:00"
    })

# Percentage groups
pct_5_opts = [
    ("PCT_0", "0%", "0%", "0%", "0%"),
    ("PCT_25", "25%", "25%", "25%", "25%"),
    ("PCT_50", "50%", "50%", "50%", "50%"),
    ("PCT_75", "75%", "75%", "75%", "75%"),
    ("PCT_100", "100%", "100%", "100%", "100%")
]
for p in pct_5_opts:
    appvar_rows.append({
        "ID": p[0], "Table": "Survey", "Column": "MaterialSourcingPct", "Tags": "PctOption, SubOption", "ValueControl": "Enum",
        "Title": p[1], "Description": p[2], "UsedFor": "Percentage Option", "Decimal": "", "EnumValue": p[1],
        "EnumList": "", "VariableList": "", "DateValue": "", "Photo": "", "URL": "", "File": "",
        "Title_hi": p[3], "Title_raj": p[4], "ActionIcon": "", "LastEditBy": "Antigravity", "LastEditOn": "09/26/2026 11:30:00"
    })

pct_8_opts = [
    ("PCT15_0", "0%", "0%", "0%", "0%"),
    ("PCT15_15", "upto 15%", "Upto 15%", "15% तक", "15% तांई"),
    ("PCT15_30", "upto 30%", "Upto 30%", "30% तक", "30% तांई"),
    ("PCT15_45", "upto 45%", "Upto 45%", "45% तक", "45% तांई"),
    ("PCT15_60", "upto 60%", "Upto 60%", "60% तक", "60% तांई"),
    ("PCT15_75", "upto 75%", "Upto 75%", "75% तक", "75% तांई"),
    ("PCT15_90", "upto 90%", "Upto 90%", "90% तक", "90% तांई"),
    ("PCT15_100", "100%", "100%", "100%", "100%")
]
for p in pct_8_opts:
    appvar_rows.append({
        "ID": p[0], "Table": "Survey", "Column": "SalesChannelsPct", "Tags": "PctOption, SubOption", "ValueControl": "Enum",
        "Title": p[1], "Description": p[2], "UsedFor": "Percentage Option", "Decimal": "", "EnumValue": p[1],
        "EnumList": "", "VariableList": "", "DateValue": "", "Photo": "", "URL": "", "File": "",
        "Title_hi": p[3], "Title_raj": p[4], "ActionIcon": "", "LastEditBy": "Antigravity", "LastEditOn": "09/26/2026 11:30:00"
    })

# Add Questions & Options
pct5_vlist_str = " , ".join([p[0] for p in pct_5_opts])
pct8_vlist_str = " , ".join([p[0] for p in pct_8_opts])

for q in sections_data:
    vlist_str = ""
    if "options" in q:
        vlist_str = " , ".join([opt[0] for opt in q["options"]])
        # Add option rows
        for opt in q["options"]:
            appvar_rows.append({
                "ID": opt[0], "Table": "Survey", "Column": q["col"], "Tags": f"{q['sec']}_Option, SubOption", "ValueControl": "Enum",
                "Title": opt[2], "Description": opt[2], "UsedFor": f"{q['col']} Option", "Decimal": "", "EnumValue": opt[1],
                "EnumList": "", "VariableList": "", "DateValue": "", "Photo": "", "URL": "", "File": "",
                "Title_hi": opt[3], "Title_raj": opt[4], "ActionIcon": "", "LastEditBy": "Antigravity", "LastEditOn": "09/26/2026 11:30:00"
            })
    elif q["id"].startswith("Q_C_07_"):
        vlist_str = pct5_vlist_str
    elif q["id"].startswith("Q_C_10_"):
        vlist_str = pct8_vlist_str

    # Add Question Row
    appvar_rows.append({
        "ID": q["id"], "Table": "Survey", "Column": q["col"], "Tags": f"QuestionPrompt, {q['sec']}", "ValueControl": q["type"],
        "Title": q["title"], "Description": q["title"], "UsedFor": "Survey Question", "Decimal": "", "EnumValue": q["title"],
        "EnumList": "", "VariableList": vlist_str, "DateValue": "", "Photo": "", "URL": "", "File": "",
        "Title_hi": q["title_hi"], "Title_raj": q["title_raj"], "ActionIcon": "", "LastEditBy": "Antigravity", "LastEditOn": "09/26/2026 11:30:00"
    })

print(f"Total Clean AppVariables Rows: {len(appvar_rows)}")

# Save Refined Files
out_appvar_csv = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_REFINED_76Q.csv'
fieldnames = ['ID', 'Table', 'Column', 'Tags', 'ValueControl', 'Title', 'Description', 'UsedFor', 'Decimal', 'EnumValue', 'EnumList', 'VariableList', 'DateValue', 'Photo', 'URL', 'File', 'Title_hi', 'Title_raj', 'ActionIcon', 'LastEditBy', 'LastEditOn']

with open(out_appvar_csv, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(appvar_rows)

print(f"Saved refined AppVariables CSV: {out_appvar_csv}")

# Save Survey Schema Columns JSON
out_survey_cols = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_76Q_COLUMNS.json'
with open(out_survey_cols, 'w', encoding='utf-8') as f:
    json.dump(survey_cols, f, indent=2)

print(f"Saved {len(survey_cols)} Survey columns JSON: {out_survey_cols}")
