import csv
import json

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

appvars = {}
with open(appvar_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    headers = next(reader)
    id_idx = headers.index('ID')
    ctrl_idx = headers.index('ValueControl')
    title_idx = headers.index('Title')
    thi_idx = headers.index('Title_hi')
    tags_idx = headers.index('Tags')
    for r in reader:
        cid = r[id_idx].strip()
        appvars[cid] = {
            'ctrl': r[ctrl_idx].strip(),
            'title': r[title_idx].strip(),
            'title_hi': r[thi_idx].strip(),
            'tags': r[tags_idx].strip()
        }

# Grouped inventory of columns
sections = {
    "Section A: Basic Details (Respondent & Enterprise Overview)": [
        ("District", "Q_A_01_00", "Enum (Ref)", "District", "जिला"),
        ("Block", "Q_A_02_00", "Enum (Ref)", "Block", "ब्लॉक / खंड"),
        ("VillageGP", "Q_A_03_00", "Text", "Village / Gram Panchayat", "गांव / ग्राम पंचायत"),
        ("RespondentName", "Q_A_04_00", "Name", "Respondent Name", "उत्तरदाता का नाम"),
        ("ContactNumber", "Q_A_04_01", "Phone", "Contact Number (Mobile)", "संपर्क नंबर (मोबाइल)"),
        ("SHGName", "Q_A_05_00", "Text", "SHG Name", "स्वयं सहायता समूह (SHG) का नाम"),
        ("VOName", "Q_A_06_00", "Text", "VO Name", "ग्राम संगठन (VO) का नाम"),
        ("CLFName", "Q_A_07_00", "Text", "CLF Name", "सीएलएफ का नाम"),
        ("SHGMembershipYears", "Q_A_08_00", "Number", "Years of SHG membership", "SHG सदस्यता के वर्ष"),
        ("LeadershipRole", "Q_A_09_00", "Enum (Ref)", "Have you been in a leadership role in SHG/CLF/VO?", "क्या आप SHG/CLF/VO में किसी नेतृत्व पद पर रही हैं?"),
        ("LeadershipYears", "Q_A_10_00", "Number", "Years of experience in leadership roles?", "नेतृत्व पदों पर अनुभव के वर्ष"),
        ("RelatedToCRP", "Q_A_11_00", "Enum (Ref)", "Are you related to any of the SVEP/OSF CRP?", "क्या आप किसी SVEP/OSF सीआरपी से संबंधित/रिश्तेदार हैं?"),
        ("EPInterventionType", "Q_A_12_00", "Enum (Ref)", "Type of Enterprise Promotion (EP) intervention", "उद्यम संवर्धन (EP) हस्तक्षेप का प्रकार"),
        ("EnterpriseName", "Q_A_13_00", "Text", "Enterprise Name", "उद्यम / दुकान का नाम"),
        ("ParallelEnterpriseName", "Q_A_13_01", "Text", "Parallel Enterprise Name (if running two businesses)", "दूसरे समानांतर उद्यम का नाम (यदि दो व्यवसाय हैं)"),
        ("EnterpriseSetupYear", "Q_A_14_00", "Number", "Years of setting up enterprise (Year or count)", "उद्यम स्थापित करने का वर्ष / अवधि"),
        ("LoanReceivedYear", "Q_A_15_00", "Number", "Year of receiving SVEP/OSF loan?", "SVEP/OSF ऋण प्राप्त करने का वर्ष"),
        ("BusinessType", "Q_A_16_00", "EnumList (Ref)", "Type of business enterprise (Multiselect)", "व्यावसायिक उद्यम का प्रकार"),
        ("BusinessActivities", "Q_A_17_00", "EnumList (Ref)", "Main business activities of the enterprise (Multiselect)", "उद्यम की मुख्य व्यावसायिक गतिविधियां"),
        ("BusinessActivitiesOther", "Q_A_17_01", "Text", "Specify other business activity", "अन्य व्यावसायिक गतिविधि का विवरण दें"),
        ("MaintainSeparateRecords", "Q_A_18_00", "Enum (Ref)", "Do you maintain separate records for all the businesses?", "क्या आप सभी व्यवसायों के लिए अलग-अलग रिकॉर्ड/हिसाब रखती हैं?"),
        ("RegistrationsDocuments", "Q_A_20_00", "EnumList (Ref)", "Do you have the following registrations / documents?", "क्या आपके पास निम्नलिखित पंजीकरण / दस्तावेज हैं?"),
        ("RegistrationsDocumentsOther", "Q_A_20_01", "Text", "Specify other enterprise registration / document", "अन्य पंजीकरण / दस्तावेज का विवरण दें")
    ],
    "Section B: Respondent & Household Profile": [
        ("RespondentAge", "Q_B_01_00", "Enum (Ref)", "What is the age of the respondent?", "उत्तरदाता की आयु क्या है?"),
        ("MaritalStatus", "Q_B_02_00", "Enum (Ref)", "What is the marital status?", "वैवाहिक स्थिति क्या है?"),
        ("SocialCategory", "Q_B_03_00", "Enum (Ref)", "What is the social category / caste?", "सामाजिक वर्ग / जाति क्या है?"),
        ("EducationStatus", "Q_B_04_00", "Enum (Ref)", "What is the education status?", "शैक्षणिक योग्यता क्या है?"),
        ("FamilyMemberCount", "Q_B_05_00", "Number", "How many members are in the family?", "परिवार में कुल कितने सदस्य हैं?"),
        ("FamilyAdultsCount", "Q_B_06_01", "Number", "Adults (Above 18 years)", "वयस्क (18 वर्ष से अधिक)"),
        ("FamilyChildrenCount", "Q_B_06_02", "Number", "Children (Below 18 years)", "बच्चे (18 वर्ष से कम)"),
        ("FamilyTotalEarning", "Q_B_06_03", "Number", "Total earning members", "कुल कमाने वाले सदस्य"),
        ("FamilyMaleEarning", "Q_B_06_04", "Number", "Male earning members", "पुरुष कमाने वाले सदस्य"),
        ("FamilyFemaleEarning", "Q_B_06_05", "Number", "Female earning members", "महिला कमाने वाली सदस्य"),
        ("FamilyDisabledCount", "Q_B_06_06", "Number", "Members with disability", "दिव्यांग सदस्य"),
        ("FamilyIncomeSources", "Q_B_07_00", "EnumList (Ref)", "What are your family's sources of income? (Multiselect)", "आपके परिवार की आय के क्या स्रोत हैं?"),
        ("AnnualHouseholdIncome", "Q_B_08_00", "Enum (Ref)", "Annual household income from all sources", "सभी स्रोतों से आपके परिवार की कुल वार्षिक आय कितनी है?")
    ],
    "Section C: Enterprise Operations & Capital Management": [
        ("ReasonsStartingBusiness", "Q_C_01_00", "EnumList (Ref)", "Reasons for starting the business? (Multiselect)", "व्यवसाय शुरू करने के क्या कारण रहे?"),
        ("BusinessCycle", "Q_C_02_00", "Enum (Ref)", "Describe your business cycle", "अपने व्यवसाय चक्र का विवरण दें"),
        ("BusinessCycleOther", "Q_C_02_01", "Text", "Specify other business cycle", "अन्य व्यवसाय चक्र का विवरण दें"),
        ("BusinessPlaceType", "Q_C_03_00", "Enum (Ref)", "What is the type of business place? (Own/Rented)", "व्यवसाय स्थल का प्रकार क्या है?"),
        ("AnnualRent", "Q_C_04_00", "Decimal", "If rented, what is annual rent? (Rs)", "यदि किराए पर है, तो वार्षिक किराया कितना है? (रु)"),
        ("MonthlyRent", "Q_C_04_00_MRENT", "Decimal", "If rented, what is monthly rent? (Rs)", "यदि किराए पर है, तो मासिक किराया कितना है? (रु)"),
        ("LocationConvenience", "Q_C_05_00", "Enum (Ref)", "Is premise location convenient for customers?", "क्या आपके परिसर का स्थान ग्राहकों के लिए सुविधाजनक है?"),
        ("LocationConvenienceOther", "Q_C_05_01", "Text", "Specify other location remark", "स्थान सुविधा पर अन्य टिप्पणी"),
        ("AnnualSalaryBill", "Q_C_07_00", "Enum (Ref)", "Annual salary bill paid to hired help", "मजदूरों/सहायकों को दिया जाने वाला वार्षिक वेतन कितना है?"),
        ("MaterialSourcingPct", "Q_C_08_00_SUMMARY", "Text / Header", "Material sourcing % summary", "सामग्री खरीद का प्रतिशत विवरण"),
        ("Sourcing_NearbyTown_Pct", "Q_C_08_NearbyTown", "Enum (Ref)", "Material sourcing % from Nearby town/district", "पास का कस्बा / जिला से सामग्री खरीद का %"),
        ("Sourcing_Jaipur_Pct", "Q_C_08_Jaipur", "Enum (Ref)", "Material sourcing % from Jaipur", "जयपुर से सामग्री खरीद का %"),
        ("Sourcing_OutsideState_Pct", "Q_C_08_OutsideState", "Enum (Ref)", "Material sourcing % from Outside state", "राज्य के बाहर से सामग्री खरीद का %"),
        ("Sourcing_Online_Pct", "Q_C_08_Online", "Enum (Ref)", "Material sourcing % from Online (Amazon/Meesho)", "ऑनलाइन ऑर्डर से सामग्री खरीद का %"),
        ("Sourcing_WhatsApp_Pct", "Q_C_08_WhatsApp", "Enum (Ref)", "Material sourcing % from WhatsApp orders", "व्हाट्सएप से सामग्री खरीद का %"),
        ("MarketingMethods", "Q_C_09_00", "EnumList (Ref)", "How do you market your products/services? (Multiselect)", "आप अपने उत्पादों/सेवाओं का प्रचार कैसे करती हैं?"),
        ("MarketingMethodsOther", "Q_C_09_01", "Text", "Specify other marketing method", "अन्य मार्केटिंग तरीके का विवरण दें"),
        ("SeasonalSalesMethod", "Q_C_10_00", "Enum (Ref)", "In seasonal production, how do you sell?", "मौसमी उत्पादन की स्थिति में बिक्री कैसे करती हैं?"),
        ("SeasonalSalesOnlinePlatform", "Q_C_10_01", "Text", "Specify online platform used", "उपयोग किए गए ऑनलाइन प्लेटफॉर्म का नाम"),
        ("SeasonalSalesOther", "Q_C_10_02", "Text", "Specify other seasonal sales method", "अन्य मौसमी बिक्री तरीके का विवरण दें"),
        ("SocialMediaForMarketing", "Q_C_11_00", "Enum (Ref)", "Do you use social media for marketing?", "क्या आप मार्केटिंग के लिए सोशल मीडिया का उपयोग करती हैं?"),
        ("SocialMediaForMarketingOther", "Q_C_11_01", "Text", "Specify other social media reason", "अन्य सोशल मीडिया कारण का विवरण दें"),
        ("SalesChannelsPct", "Q_C_12_00_SUMMARY", "Text / Header", "Sales channels % summary", "विभिन्न माध्यमों से बिक्री का प्रतिशत"),
        ("SalesChannel_Online_Pct", "Q_C_12_Online", "Enum (Ref)", "% products/services sold through Online platforms", "ऑनलाइन प्लेटफॉर्म के माध्यम से बिक्री का %"),
        ("SalesChannel_WhatsApp_Pct", "Q_C_12_WhatsApp", "Enum (Ref)", "% products/services sold through WhatsApp", "व्हाट्सएप के माध्यम से बिक्री का %"),
        ("SalesChannel_Instagram_Pct", "Q_C_12_Instagram", "Enum (Ref)", "% products/services sold through Instagram", "इंस्टाग्राम के माध्यम से बिक्री का %"),
        ("SalesChannel_Premise_Pct", "Q_C_12_Premise", "Enum (Ref)", "% products/services sold through Your shop", "आपकी दुकान / परिसर के माध्यम से बिक्री का %"),
        ("SalesChannel_Traders_Pct", "Q_C_12_Traders", "Enum (Ref)", "% products/services sold through Local traders", "स्थानीय व्यापारी / दुकानदार के माध्यम से बिक्री का %"),
        ("SalesChannel_Haat_Pct", "Q_C_12_Haat", "Enum (Ref)", "% products/services sold through Local haat/market", "स्थानीय हाट / बाजार के माध्यम से बिक्री का %"),
        ("SalesChannel_Saras_Pct", "Q_C_12_Saras", "Enum (Ref)", "% products/services sold through Saras fair", "सरस मेला के माध्यम से बिक्री का %"),
        ("RecordKeepingHabit", "Q_C_13_00", "Enum (Ref)", "Do you maintain written records of transactions?", "क्या आप व्यावसायिक लेन-देन का लिखित रिकॉर्ड रखती हैं?"),
        ("RecordKeepingMethod", "Q_C_14_00", "Enum (Ref)", "How do you maintain business transactions?", "आप व्यावसायिक लेन-देन का हिसाब कैसे रखती हैं?"),
        ("RecordKeepingOther", "Q_C_14_01", "Text", "Specify other record keeping method", "अन्य हिसाब पद्धति का विवरण दें"),
        ("InitialStartCapital", "Q_C_16_00", "Decimal", "With how much money did you start the enterprise? (Rs)", "आपने कितने रुपयों से उद्यम शुरू किया था? (रु)"),
        ("InitialCapitalArranged", "Q_C_17_00", "Enum (Ref)", "How did you arrange this starting amount?", "आपने यह राशि कैसे जुटाई थी?"),
        ("SHGAssociationAssistance", "Q_C_18_00", "EnumList (Ref)", "How has SHG association helped your enterprise? (Multiselect)", "SHG से जुड़ाव ने आपके उद्यम में किस प्रकार सहायता की?"),
        ("MonthlyIncomeIncreaseByOSFSVEP", "Q_C_21_00", "Enum (Ref)", "Monthly income increased directly due to OSF/SVEP loans", "OSF/SVEP ऋण के कारण औसत मासिक आय में वृद्धि"),
        ("FinancialHelpFromIncome", "Q_C_23_00", "EnumList (Ref)", "How has income helped you financially? (Multiselect)", "उद्यम से हुई आय ने आपकी आर्थिक रूप से कैसे मदद की?"),
        ("FinancialHelp_EducationAmt", "Q_C_23_01", "Decimal", "Education expenses contribution amount (Rs)", "शिक्षा में योगदान राशि (रु)"),
        ("FinancialHelp_DebtsAmt", "Q_C_23_02", "Decimal", "Family debts paid amount (Rs)", "कर्ज चुकाने में योगदान राशि (रु)"),
        ("FinancialHelp_AssetsAmt", "Q_C_23_03", "Decimal", "Assets acquisition contribution amount (Rs)", "परिसंपत्ति निर्माण में योगदान राशि (रु)"),
        ("FinancialHelp_MarriageAmt", "Q_C_23_04", "Decimal", "Marriage expenses contribution amount (Rs)", "विवाह खर्च में योगदान राशि (रु)")
    ],
    "Section D: Ease of Doing Business & Challenges": [
        ("HusbandFamilyResponse", "Q_D_01_00", "EnumList (Ref)", "Husband's/Family's response towards your enterprise? (Multiselect)", "आपके उद्यम के प्रति आपके पति/परिवार का क्या रुख रहा है?"),
        ("MaterialSourcingComfort", "Q_D_02_00", "Enum (Ref)", "Level of comfort in sourcing material?", "सामग्री खरीदने और लाने में आपका सहूलियत स्तर क्या है?"),
        ("CustomerPaymentRecovery", "Q_D_03_00", "Enum (Ref)", "Are you able to recover money/debts from customers?", "क्या आप ग्राहकों से पैसे/उधारी की वसूली कर पाती हैं?"),
        ("FundingExperience", "Q_D_04_00", "EnumList (Ref)", "Experience in funding your business? (Multiselect)", "व्यवसाय के लिए पूंजी जुटाने में आपका क्या अनुभव रहा है?"),
        ("CurrentChallenges", "Q_D_05_00", "EnumList (Ref)", "Challenges you are facing now? (Multiselect)", "वर्तमान में आप किन चुनौतियों का सामना कर रही हैं?"),
        ("Challenge_OSFPhasedOutAmt", "Q_D_05_01", "Decimal", "OSF phased out fund deficit amount (Rs)", "OSF समाप्ति से हुई कमी की राशि (रु)"),
        ("Challenge_ScaleUpFundAmt", "Q_D_05_02", "Decimal", "Scale up funds required amount (Rs)", "व्यवसाय विस्तार हेतु आवश्यक राशि (रु)"),
        ("Challenge_RenovationFundAmt", "Q_D_05_03", "Decimal", "Renovation funds required amount (Rs)", "दुकान सुधार हेतु आवश्यक राशि (रु)"),
        ("Challenge_TimelyInputsAmt", "Q_D_05_04", "Decimal", "Timely inputs funds required amount (Rs)", "उत्पादन सामग्री हेतु समय पर आवश्यक राशि (रु)"),
        ("Challenge_InventoryHelpAmt", "Q_D_05_05", "Decimal", "Current value of unsold inventory (Rs)", "बिना बिके स्टॉक का वर्तमान मूल्य (रु)"),
        ("Challenge_Other", "Q_D_05_06", "Text", "Specify other challenge remark", "अन्य चुनौती का विवरण दें"),
        ("Competitors_Same_Scale", "Q_D_06_SameScale", "Number", "How many people have business at same scale?", "आपके समान स्तर का व्यवसाय कितने लोगों का है?"),
        ("Competitors_Smaller_Scale", "Q_D_06_SmallerScale", "Number", "How many people have business at smaller scale?", "छोटे स्तर का व्यवसाय कितने लोगों का है?"),
        ("Competitors_Higher_Scale", "Q_D_06_HigherScale", "Number", "How many people have business at larger scale?", "बड़े स्तर का व्यवसाय कितने लोगों का है?"),
        ("CompetitorAdvantages", "Q_D_07_00", "EnumList (Ref)", "Advantage you have over competitors? (Multiselect)", "प्रतिस्पर्धियों की तुलना में आपकी क्या बढ़त है?"),
        ("CompetitorAdvantagesOther", "Q_D_07_01", "Text", "Specify other competitor advantage", "अन्य प्रतिस्पर्धी लाभ का विवरण दें"),
        ("FutureExpansionPlans", "Q_D_08_00", "Enum (Ref)", "Do you have plans to expand your business? (Yes/No)", "क्या आपकी भविष्य में व्यवसाय विस्तार की योजना है?"),
        ("FutureBusinessPlansOther", "Q_D_08_01", "Text", "If yes, specify expansion plans", "यदि हाँ, तो विस्तार योजना का विवरण दें"),
        ("AspirationConstraints", "Q_D_09_00", "EnumList (Ref)", "What stops you from achieving business aspirations? (Multiselect)", "व्यवसाय के सपनों को पूरा करने में क्या रुकावटें हैं?"),
        ("AspirationConstraintsOther", "Q_D_09_01", "Text", "Specify other aspiration constraint", "अन्य रुकावट का विवरण दें"),
        ("AspirationBottlenecks", "Q_D_09_00_BOTTLENECK", "EnumList (Ref)", "Key bottlenecks in growth", "विकास में प्रमुख बाधाएं")
    ],
    "Section E: Impact of SVEP / OSF Schemes": [
        ("AttendedTraining", "Q_E_01_00", "Enum (Ref)", "Attended any training under SVEP/OSF? (Yes/No)", "क्या आपने SVEP/OSF के तहत कोई प्रशिक्षण लिया है?"),
        ("TrainingDetails", "Q_E_02_00", "Text", "If Yes, specify training topic / trade", "यदि हाँ, तो प्रशिक्षण का विवरण दें"),
        ("UsedTrainingComponent", "Q_E_03_00", "Enum (Ref)", "Did you use training component in enterprise? (Yes/No)", "क्या आपने उद्यम में प्रशिक्षण का उपयोग किया?"),
        ("UsedTrainingDetails", "Q_E_04_00", "Text", "If Yes, specify which component used", "यदि हाँ, तो बताएं क्या उपयोग किया"),
        ("MonthlyIncomeBeforeLoan", "Q_E_05_01", "Decimal", "Monthly income BEFORE changes (Rs)", "ऋण से हुए बदलाव से पहले मासिक आय (रु)"),
        ("MonthlyIncomeAfterLoan", "Q_E_05_02", "Decimal", "Monthly income AFTER changes (Rs)", "ऋण से हुए बदलाव के बाद मासिक आय (रु)"),
        ("CRPContributions", "Q_E_06_00", "EnumList (Ref)", "CRP contributions towards your enterprise (Multiselect)", "उद्यम में सीआरपी (CRP) का योगदान"),
        ("CRPContributionDocDetails", "Q_E_06_01", "Text", "If getting documents, specify which documents", "दस्तावेज बनवाने में सीआरपी सहायता का विवरण"),
        ("ExpectationsFromScheme", "Q_E_07_00", "LongText", "Expectations from SVEP/OSF scheme in future", "भविष्य में SVEP/OSF योजना से अपेक्षाएं")
    ],
    "Section F: Online Transactions & Social Media": [
        ("SmartphoneOwnership", "Q_F_01_00", "Enum (Ref)", "Do you or family member own smartphone?", "क्या आपके या परिवार के पास स्मार्टफोन है?"),
        ("UseQRUPI", "Q_F_02_00", "Enum (Ref)", "Do you use QR code / UPI for money transactions? (Yes/No)", "क्या आप लेन-देन के लिए QR / UPI का उपयोग करती हैं?"),
        ("QRDailyTransactions", "Q_F_03_00", "Enum (Ref)", "How many QR/online transactions in a day?", "प्रतिदिन कितने QR/ऑनलाइन लेन-देन होते हैं?"),
        ("QRNonUseReason", "Q_F_04_00", "Enum (Ref)", "Reason for not using QR code / UPI", "QR कोड / UPI का उपयोग न करने का कारण"),
        ("SocialPlatformsUsed", "Q_F_05_00", "EnumList (Ref)", "Which social media platforms do you use? (Multiselect)", "आप कौन से सोशल मीडिया प्लेटफॉर्म उपयोग करती हैं?"),
        ("SocialPlatformUsageMode", "Q_F_06_00", "EnumList (Ref)", "How do you use social media? (Multiselect)", "आप सोशल मीडिया का उपयोग किस प्रकार करती हैं?"),
        ("SocialMediaFrequency", "Q_F_07_00", "Enum (Ref)", "Frequency of social media usage", "सोशल मीडिया उपयोग की आवृत्ति / समय")
    ],
    "Section G: Post-Exit OSF (Phased Out Blocks)": [
        ("OSFInterventionYear", "Q_G_01_00", "Number", "Year of OSF support / intervention", "OSF सहायता / जुड़ाव का वर्ष"),
        ("BusinessOperationalStatus", "Q_G_02_00", "Enum (Ref)", "Current operational status of business", "व्यवसाय की वर्तमान संचालन स्थिति"),
        ("BusinessClosureYear", "Q_G_02_01", "Number", "If closed, year of business closure", "यदि बंद हुआ, तो बंद होने का वर्ष"),
        ("ScalingDownClosingReasons", "Q_G_03_00", "EnumList (Ref)", "Reasons for scaling down or closing business (Multiselect)", "काम कम करने या बंद करने के कारण"),
        ("ScalingDownOtherReason", "Q_G_03_01", "Text", "Specify other closure reason", "अन्य कारण का विवरण दें"),
        ("SupportNeededForSustenance", "Q_G_04_00", "EnumList (Ref)", "Support needed for business sustenance / revival (Multiselect)", "व्यवसाय बनाए रखने / पुनर्जीवित करने हेतु आवश्यक सहायता"),
        ("SupportNeededOther", "Q_G_04_01", "Text", "Specify other support needed", "अन्य आवश्यक सहायता का विवरण दें")
    ]
}

subtables = {
    "Sub-Table 1: Survey_Labor (Q6 - Involvement of Family & Hired Labor)": [
        ("Survey_ID", "Survey_Labor", "Ref", "Parent Survey Reference", "मुख्य सर्वे पहचान (Ref)"),
        ("ID", "Survey_Labor", "Text (Key)", "Unique Row Key", "विशिष्ट पहचान (Key)"),
        ("Activity", "COL_LABOR_ACTIVITY", "Enum (Ref)", "Business Activity (Purchase, Prod, Sale, etc.)", "व्यावसायिक गतिविधि (सामग्री खरीद, उत्पादन, बिक्री, आदि)"),
        ("Involvement_Type", "COL_LABOR_INVOLVEMENT", "Enum (Ref)", "Involvement level of family members", "परिवार के सदस्यों की भागीदारी (नियमित, कभी-कभार, आदि)"),
        ("Family_Members_Count", "COL_LABOR_FAM_COUNT", "Number", "Family members involved (Count)", "शामिल परिवार के सदस्य (संख्या)"),
        ("Hired_Help_Count", "COL_LABOR_HIRED_COUNT", "Number", "Hired help involved (Count)", "रखे गए मजदूर / सहायक (संख्या)"),
        ("Amount_Paid_Last_Year", "COL_LABOR_AMOUNT_PAID", "Enum (Ref)", "Amount paid to hired labor in last one year", "मजदूरों को पिछले 1 वर्ष में भुगतान राशि")
    ],
    "Sub-Table 2: Survey_Turnover (Q15 - Turnover & Net Profit by Season)": [
        ("Survey_ID", "Survey_Turnover", "Ref", "Parent Survey Reference", "मुख्य सर्वे पहचान (Ref)"),
        ("ID", "Survey_Turnover", "Text (Key)", "Unique Row Key", "विशिष्ट पहचान (Key)"),
        ("Season", "COL_TURN_SEASON", "Enum (Ref)", "Season Type (Peak, Average, Lean)", "सीजन का प्रकार (चरम बिक्री, सामान्य बिक्री, मंदी)"),
        ("Duration_Months", "COL_TURN_DURATION", "Number", "Duration in months (Count)", "सीजन की अवधि (महीनों में)"),
        ("Monthly_Sales", "COL_TURN_SALES", "Price / Decimal", "Average monthly sales (Rs)", "औसत मासिक बिक्री (रु)"),
        ("Monthly_Net_Profit", "COL_TURN_PROFIT", "Price / Decimal", "Monthly net profit (excluding expenditures) [Rs]", "मासिक शुद्ध आय / मुनाफा [रु]")
    ],
    "Sub-Table 3: Survey_Capital_Arrangement (Q17 - Capital Sources over Duration)": [
        ("Survey_ID", "Survey_Capital_Arrangement", "Ref", "Parent Survey Reference", "मुख्य सर्वे पहचान (Ref)"),
        ("ID", "Survey_Capital_Arrangement", "Text (Key)", "Unique Row Key", "विशिष्ट पहचान (Key)"),
        ("Source", "COL_CAP_SOURCE", "Enum (Ref)", "Capital Source (Own Savings, Family, SHG, Bank, etc.)", "पूंजी का स्रोत (अपनी बचत, रिश्तेदार, SHG, बैंक, आदि)"),
        ("Amount_First_Year", "COL_CAP_YR1", "Price / Decimal", "First year amount arranged (Rs)", "पहले वर्ष की राशि (रु)"),
        ("Amount_In_Between_Years", "COL_CAP_MID", "Price / Decimal", "Amount arranged in between years (Rs)", "बीच के वर्षों की राशि (रु)"),
        ("Amount_Current_Year_2026_27", "COL_CAP_CUR", "Price / Decimal", "Current year (2026-27) amount arranged [Rs]", "वर्तमान वर्ष (2026-27) की राशि [रु]"),
        ("Amount_Pending", "COL_CAP_PEN", "Price / Decimal", "Amount pending / balance to be repaid (Rs)", "बकाया / चुकता करने हेतु शेष राशि (रु)")
    ],
    "Sub-Table 4: Survey_Loan_Usage (Q18 - Loan Usage by Source)": [
        ("Survey_ID", "Survey_Loan_Usage", "Ref", "Parent Survey Reference", "मुख्य सर्वे पहचान (Ref)"),
        ("ID", "Survey_Loan_Usage", "Text (Key)", "Unique Row Key", "विशिष्ट पहचान (Key)"),
        ("Source", "COL_LOAN_SOURCE", "Enum (Ref)", "Loan Source (SHG, OSF, Bank, Mudra, etc.)", "ऋण का स्रोत (SHG, OSF, बैंक, मुद्रा, आदि)"),
        ("Loan_Usage_Purpose", "COL_LOAN_USAGE", "Enum (Ref)", "How loan was used in business (Shop setup, Machine, Stock, etc.)", "ऋण का व्यवसाय में क्या उपयोग किया?")
    ],
    "Sub-Table 5: Survey_Business_Changes (Q20 - Trajectory & Business Changes)": [
        ("Survey_ID", "Survey_Business_Changes", "Ref", "Parent Survey Reference", "मुख्य सर्वे पहचान (Ref)"),
        ("ID", "Survey_Business_Changes", "Text (Key)", "Unique Row Key", "विशिष्ट पहचान (Key)"),
        ("Indicator_Heading", "COL_CHG_HEADING", "Enum (Ref)", "Performance Indicator (Sales, Income, Stock, Assets)", "व्यावसायिक संकेतक (बिक्री, आय, स्टॉक, परिसंपत्ति)"),
        ("First_Year_Value", "COL_CHG_YR1", "Text / Decimal", "First year value (Don't remember / Rs)", "पहला वर्ष (याद नहीं / रु)"),
        ("Current_Year_Value", "COL_CHG_CUR", "Price / Decimal", "Current year value (Rs)", "वर्तमान वर्ष (रु)")
    ]
}

# Output json structure for easy markdown generation
with open(r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\Navigation_Map.json', 'w', encoding='utf-8') as f:
    json.dump({'sections': sections, 'subtables': subtables}, f, indent=2, ensure_ascii=False)

print("Saved Navigation_Map.json")
