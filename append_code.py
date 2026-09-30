# -*- coding: utf-8 -*-
"""
Appends Section C, D, E, F, G, H, I and subtables to generate_all_verbatim_files.py,
then executes the generator to produce all artifacts.
"""

code_to_append = '''
# ==========================================
# SECTION C: Enterprise operations
# ==========================================
# Question Prompts
add_row("LBL_C1", "Survey", "ReasonsStartingBusiness", "QuestionPrompt, SectionC", "Text", "Q1. Reasons for starting the business? (Multiselect)", "Reasons for starting", "Question Label", "Q1. Reasons for starting the business? (Multiselect)", "प्र.1 व्यवसाय शुरू करने के कारण? (बहु-विकल्प)", "प्र.1 धंधो शुरू करण रा कारण? (बहु-विकल्प)")
add_row("LBL_C2", "Survey", "BusinessCycle", "QuestionPrompt, SectionC", "Text", "Q2. Describe your business cycle?", "Business cycle", "Question Label", "Q2. Describe your business cycle?", "प्र.2 अपने व्यवसाय चक्र का वर्णन करें?", "प्र.2 आपरे धंधा रो चक्र बतावो?")
add_row("LBL_C3", "Survey", "BusinessPlaceType", "QuestionPrompt, SectionC", "Text", "Q3. What is the type of business place?", "Business Place Type", "Question Label", "Q3. What is the type of business place?", "प्र.3 व्यावसायिक स्थान का प्रकार क्या है?", "प्र.3 काम री जगां किण भांत री है?")
add_row("LBL_C4", "Survey", "MonthlyRent", "QuestionPrompt, SectionC", "Text", "Q4. If rented, what is monthly rent? Rs______( mention in numbers)", "Monthly Rent", "Question Label", "Q4. If rented, what is monthly rent? Rs______( mention in numbers)", "प्र.4 यदि किराए पर है, तो मासिक किराया कितना है?", "प्र.4 जे भाड़े माथे है, तो महीनवारी भाड़ो कित्तो है?")
add_row("LBL_C5", "Survey", "LocationConvenience", "QuestionPrompt, SectionC", "Text", "Q5. Is the location of your premise convenient for your customers?", "Location Convenience", "Question Label", "Q5. Is the location of your premise convenient for your customers?", "प्र.5 क्या आपके परिसर का स्थान ग्राहकों के लिए सुविधाजनक है?", "प्र.5 कांई थारे धंधा री जगां गिराहकां खातर सुभीते री है?")
add_row("LBL_C6", "Survey", "Related_Q6_Labor", "QuestionPrompt, SectionC", "Text", "Q6. Involvement of family members and hired help in business operations", "Family & Hired Labor", "Question Label", "Q6. Involvement of family members and hired help in business operations", "प्र.6 व्यवसाय में परिवार के सदस्यों एवं भाड़े के श्रमिकों की भागीदारी", "प्र.6 धंधा में घरवाळां अर मजूरां री भागीदारी")
add_row("LBL_C7a", "Survey", "Sourcing_NearbyTown_Pct", "QuestionPrompt, SectionC", "Text", "Nearby town/district (0%/25%/50%/75%/100%)", "Sourcing nearby", "Question Label", "Nearby town/district (0%/25%/50%/75%/100%)", "आस-पास का कस्बा / जिला", "आस-पास रो कस्बो / जिलो")
add_row("LBL_C7b", "Survey", "Sourcing_Jaipur_Pct", "QuestionPrompt, SectionC", "Text", "Wholesale market within state (0%/25%/50%/75%/100%)", "Sourcing state", "Question Label", "Wholesale market within state (0%/25%/50%/75%/100%)", "राज्य के भीतर थोक बाजार", "राजस्थान रो थोक बाजार")
add_row("LBL_C7c", "Survey", "Sourcing_OutsideState_Pct", "QuestionPrompt, SectionC", "Text", "Wholesale market outside the state (0%/25%/50%/75%/100%)", "Sourcing outside state", "Question Label", "Wholesale market outside the state (0%/25%/50%/75%/100%)", "राज्य के बाहर थोक बाजार", "राजस्थान सूं बाहर रो थोक बाजार")
add_row("LBL_C7d", "Survey", "Sourcing_Online_Pct", "QuestionPrompt, SectionC", "Text", "Order online (Amazon/Misho) (0%/25%/50%/75%/100%)", "Sourcing online", "Question Label", "Order online (Amazon/Misho) (0%/25%/50%/75%/100%)", "ऑनलाइन ऑर्डर (Amazon/Meesho)", "ऑनलाइन ऑर्डर")
add_row("LBL_C8", "Survey", "MarketingMethods", "QuestionPrompt, SectionC", "Text", "Q8. How do you market your products/services? (Multiselect)", "Marketing Methods", "Question Label", "Q8. How do you market your products/services? (Multiselect)", "प्र.8 आप अपने उत्पादों/सेवाओं का विपणन कैसे करती हैं? (बहु-विकल्प)", "प्र.8 थे आपरा माल रो प्रचार कैयां करो हो? (बहु-विकल्प)")
add_row("LBL_C9", "Survey", "SeasonalSalesMethod", "QuestionPrompt, SectionC", "Text", "Q9. How do you sell your products/services?", "Sales Method", "Question Label", "Q9. How do you sell your products/services?", "प्र.9 आप अपने उत्पाद/सेवाएँ कैसे बेचती हैं?", "प्र.9 थे आपरो माल कैयां बेचो हो?")
add_row("LBL_C10a", "Survey", "SalesChannel_Online_Pct", "QuestionPrompt, SectionC", "Text", "Online platforms ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "Online Sales %", "Question Label", "Online platforms ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "ऑनलाइन प्लेटफॉर्म", "ऑनलाइन प्लेटफॉर्म")
add_row("LBL_C10b", "Survey", "SalesChannel_WhatsApp_Pct", "QuestionPrompt, SectionC", "Text", "Whatsapp ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "WhatsApp Sales %", "Question Label", "Whatsapp ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "व्हाट्सएप (WhatsApp)", "व्हाट्सएप")
add_row("LBL_C10c", "Survey", "SalesChannel_Instagram_Pct", "QuestionPrompt, SectionC", "Text", "Instagram ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "Instagram Sales %", "Question Label", "Instagram ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "इंस्टाग्राम (Instagram)", "इंस्टाग्राम")
add_row("LBL_C10d", "Survey", "SalesChannel_Premise_Pct", "QuestionPrompt, SectionC", "Text", "Your premise ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "Premise Sales %", "Question Label", "Your premise ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "आपकी दुकान / परिसर", "थारी खुद री दुकान")
add_row("LBL_C10e", "Survey", "SalesChannel_Traders_Pct", "QuestionPrompt, SectionC", "Text", "Local traders/shopkeepers ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "Traders Sales %", "Question Label", "Local traders/shopkeepers ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "स्थानीय व्यापारी / दुकानदार", "गांव रा व्यापारी / दुकानदार")
add_row("LBL_C10f", "Survey", "SalesChannel_Haat_Pct", "QuestionPrompt, SectionC", "Text", "Local haat/market ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "Haat Sales %", "Question Label", "Local haat/market ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "स्थानीय हाट / साप्ताहिक बाजार", "स्थानीय हाट बाजार")
add_row("LBL_C10g", "Survey", "SalesChannel_Saras_Pct", "QuestionPrompt, SectionC", "Text", "Saras fair ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "Saras Sales %", "Question Label", "Saras fair ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)", "सरस मेला / प्रदर्शनी", "सरस मेलो")
add_row("LBL_C11", "Survey", "RecordKeepingHabit", "QuestionPrompt, SectionC", "Text", "Q11. Do you maintain written records of business transactions?", "Record Keeping Habit", "Question Label", "Q11. Do you maintain written records of business transactions?", "प्र.11 क्या आप व्यावसायिक लेन-देन का लिखित रिकॉर्ड रखती हैं?", "प्र.11 कांई थे धंधा रा लेन-देन रो लिख्योड़ो रिकॉर्ड राखो हो?")
add_row("LBL_C12", "Survey", "RecordKeepingMethod", "QuestionPrompt, SectionC", "Text", "Q12. How do you maintain business transactions?", "Record Keeping Method", "Question Label", "Q12. How do you maintain business transactions?", "प्र.12 आप व्यावसायिक लेन-देन का रिकॉर्ड कैसे रखती हैं?", "प्र.12 थे धंधा रा लेन-देन रो हिसाब कैयां राखो हो?")
add_row("LBL_C13", "Survey", "Related_Q15_Turnover", "QuestionPrompt, SectionC", "Text", "Q13. Turnover and income from the enterprise", "Turnover & Income", "Question Label", "Q13. Turnover and income from the enterprise", "प्र.13 उद्यम से बिक्री एवं आय (टर्नओवर)", "प्र.13 धंधा सूं बिक्री अर कमाई (टर्नओवर)")

# Options Section C
# Q1 ReasonsStartingBusiness (100% Word-for-Word Verbatim)
c1_reasons = [
    ("My family faced a financial setback, and I needed to earn", "मेरे परिवार को वित्तीय संकट का सामना करना पड़ा, और मुझे कमाने की आवश्यकता थी", "म्हारे परिवार माथे आर्थिक संकट आयो, अर मने कमावण री जरूरत पड़ी"),
    ("Our expenses were rising, and my family needed an alternate source of income", "हमारे खर्च बढ़ रहे थे, और मेरे परिवार को आय के एक वैकल्पिक स्रोत की आवश्यकता थी", "म्हारा खर्चा बढ़ रह्या हा, अर म्हारे परिवार ने कमाई रा दूजे जरिये री जरूरत ही"),
    ("I always wanted to own/run my own business", "मैं हमेशा से अपना खुद का व्यवसाय शुरू/संचालित करना चाहती थी", "म्हारी हमेशा सूं खुद रो धंधो करण री इच्छा ही"),
    ("I learnt the skill and wanted to start my own venture.", "मैंने हुनर सीखा और अपना खुद का व्यवसाय शुरू करना चाहती थी।", "मैं हुनर सीख्यो अर खुद रो काम शुरू करणो चावती ही।"),
    ("I was doing the same work as wage labour and later decided to start own venture", "मैं वही काम मजदूरी के रूप में कर रही थी और बाद में अपना उद्यम शुरू करने का फैसला किया", "मैं ओ ही काम मजूरी में करती ही अर पछै खुद रो काम शुरू कर दियो"),
    ("All SHG members were getting loans for enterprise so I also decided to take and start enterprise", "सभी एसएचजी सदस्यों को उद्यम के लिए ऋण मिल रहा था इसलिए मैंने भी ऋण लेने और उद्यम शुरू करने का निर्णय लिया", "सगळी समूह री बायां ने लोन मिल रह्यो हो तो मैं भी लोन लेर धंधो शुरू कियो"),
    ("The OSF/SVEP CRP encouraged me to start the enterprise", "OSF/SVEP CRP ने मुझे उद्यम शुरू करने के लिए प्रोत्साहित किया", "OSF/SVEP CRP मने उद्यम शुरू करण खातर हिंमत बंधाई"),
    ("The CLF encouraged me to start the enterprise", "CLF ने मुझे उद्यम शुरू करने के लिए प्रोत्साहित किया", "CLF मने उद्यम शुरू करण खातर कह्यो"),
    ("Any other (Specify)", "अन्य कोई (विवरण दें)", "दूजो कोई (बतावो)")
]
for idx, (rsn, rsn_hi, rsn_raj) in enumerate(c1_reasons, 1):
    add_row(f"RSN_{idx:02d}", "Survey", "ReasonsStartingBusiness", "SectionC_Option, SubOption", "EnumList", rsn, rsn, "Dropdown Option", rsn, rsn_hi, rsn_raj)

# Q2 BusinessCycle
c2_cycles = [
    ("Operational for regular hours throughout the year", "साल भर नियमित घंटों के लिए संचालित", "साल भर तय घंटां सारू चालू"),
    ("Operational whenever the customer arrives throughout the year", "साल भर जब भी ग्राहक आता है तब संचालित", "साल भर जद भी गिराहक आवै जद चालू"),
    ("Both production and sales operational throughout the year", "साल भर उत्पादन और बिक्री दोनों संचालित", "साल भर माल बणावणो अर बेचान दोनूं चालू"),
    ("Production and sale only on receiving order", "केवल ऑर्डर मिलने पर ही उत्पादन और बिक्री", "खाली ऑर्डर मिलण माथे ही माल बणावणो अर बेचान"),
    ("Seasonal production and sale throughout the year", "मौसमी उत्पादन और साल भर बिक्री", "सीजन माथे उत्पादन अर साल भर बेचान"),
    ("Production and sale is limited to few months", "उत्पादन और बिक्री कुछ महीनों तक ही सीमित है", "माल बणावणो अर बेचान कुछ महीनां तांई ही सीमित"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (cyc, cyc_hi, cyc_raj) in enumerate(c2_cycles, 1):
    add_row(f"CYC_{idx:02d}", "Survey", "BusinessCycle", "SectionC_Option, SubOption", "Enum", cyc, cyc, "Dropdown Option", cyc, cyc_hi, cyc_raj)

# Q3 BusinessPlaceType
add_row("PLC_OWN", "Survey", "BusinessPlaceType", "SectionC_Option, SubOption", "Enum", "Own", "Own premises", "Dropdown Option", "Own", "स्वयं का", "खुद रो")
add_row("PLC_RENTED", "Survey", "BusinessPlaceType", "SectionC_Option, SubOption", "Enum", "Rented", "Rented premises", "Dropdown Option", "Rented", "किराए का", "भाड़े रो")

# Q5 LocationConvenience
c5_locs = [
    ("Yes", "हाँ", "हाँ"),
    ("No", "नहीं", "ना"),
    ("Yes, my location is very convenient to attract customers", "हाँ, मेरा स्थान ग्राहकों को आकर्षित करने के लिए बहुत सुविधाजनक है", "हाँ, म्हारी जगां गिराहकां खातर घणी सुभीते री है"),
    ("Yes, I changed my location to get the clients", "हाँ, मैंने ग्राहकों को आकर्षित करने के लिए अपना स्थान बदला", "हाँ, मैं गिराहक लावण खातर जगां बदली"),
    ("No, but I operate from home and can’t move to other location", "नहीं, लेकिन मैं घर से काम करती हूँ और दूसरी जगह नहीं जा सकती", "ना, पण मैं घर सूं काम करूं अर दूजी जगां कोनी जा सकूं"),
    ("No, but I can afford only this space", "नहीं, लेकिन मैं केवल इसी जगह का खर्च उठा सकती हूँ", "ना, पण मैं खाली इणी जगां रो भाड़ो भुगत सकूं"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (loc, loc_hi, loc_raj) in enumerate(c5_locs, 1):
    add_row(f"LOC_{idx:02d}", "Survey", "LocationConvenience", "SectionC_Option, SubOption", "Enum", loc, loc, "Dropdown Option", loc, loc_hi, loc_raj)

# Sourcing % Options for Q7
for pct in ["0%", "25%", "50%", "75%", "100%"]:
    for col in ["Sourcing_NearbyTown_Pct", "Sourcing_Jaipur_Pct", "Sourcing_OutsideState_Pct", "Sourcing_Online_Pct"]:
        add_row(f"PCT_{pct[:2]}_{col[:10]}", "Survey", col, "SectionC_Option, SubOption", "Enum", pct, pct, "Dropdown Option", pct, pct, pct)

# Q8 MarketingMethods
c8_mkts = [
    ("My shop is the only place where I talk about my products/services", "मेरी दुकान ही एकमात्र ऐसी जगह है जहाँ मैं अपने उत्पादों/सेवाओं की बात करती हूँ", "म्हारी दुकान ही एक जगां है जठै मैं आपरा माल री बात करूं"),
    ("I have name board outside my premises with details of my products/services", "मेरे परिसर के बाहर उत्पादों/सेवाओं के विवरण के साथ नेम बोर्ड लगा है", "म्हारी दुकान बाहर नाम रो बोर्ड लाग्योड़ो है"),
    ("I visit local traders/shopkeepers with my samples", "मैं अपने नमूनों (सैंपल) के साथ स्थानीय व्यापारियों/दुकानदारों के पास जाती हूँ", "मैं सैंपल लेर गांव रा दुकानदारां पासे जाऊं"),
    ("I talk about my products/services in SHG meetings", "मैं एसएचजी की बैठकों में अपने उत्पादों/सेवाओं के बारे में बात करती हूँ", "मैं समूह री बैठकां में आपरा माल री बात करूं"),
    ("I visit local traders/shopkeepers with samples of my products", "मैं अपने उत्पादों के नमूनों के साथ स्थानीय व्यापारियों/दुकानदारों के पास जाती हूँ", "मैं माल रा सैंपल लेर दुकानदारां पासे जाऊं"),
    ("I market actively on instagram and whatsapp", "मैं इंस्टाग्राम और व्हाट्सएप पर सक्रिय रूप से प्रचार करती हूँ", "मैं इंस्टाग्राम अर व्हाट्सएप माथे प्रचार करूं"),
    ("I wait for people to make enquiries", "मैं लोगों द्वारा पूछताछ करने का इंतजार करती हूँ", "मैं लोगां री पूछपरछ रो इंतज़ार करूं"),
    ("I do not know how to market my products/services", "मुझे नहीं पता कि अपने उत्पादों/सेवाओं का विपणन कैसे किया जाए", "मने ठा कोनी कै माल रो प्रचार कैयां करूँ"),
    ("I don't feel the need to market my products/services", "मुझे अपने उत्पादों/सेवाओं के विपणन की आवश्यकता महसूस नहीं होती", "मने प्रचार करण री जरूरत महसूस कोनी होवै"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (mkt, mkt_hi, mkt_raj) in enumerate(c8_mkts, 1):
    add_row(f"MKT_{idx:02d}", "Survey", "MarketingMethods", "SectionC_Option, SubOption", "EnumList", mkt, mkt, "Dropdown Option", mkt, mkt_hi, mkt_raj)

# Q9 SeasonalSalesMethod
c9_sales = [
    ("Not relevant", "लागू नहीं", "लागू कोनी"),
    ("In case of production related business, I  produce slightly more than my last year sales and wait for orders", "उत्पादन व्यवसाय में, मैं पिछले साल की बिक्री से थोड़ा अधिक उत्पादन करती हूँ और ऑर्डर का इंतजार करती हूँ", "उत्पादन में, मैं गेल्या साल सूं थोड़ो बत्तो माल बणाऊं अर ऑर्डर रो इंतज़ार करूं"),
    ("I visit local traders/shopkeepers with my products and do door to door selling", "मैं अपने उत्पादों के साथ स्थानीय व्यापारियों से मिलती हूँ और घर-घर जाकर बेचती हूँ", "मैं माल लेर दुकानदारां पासे जाऊं अर घरे-घरे जा'र बेचूं"),
    ("I take orders from my usual clients few weeks prior to production/peak season and then sell", "मैं सीजन से कुछ सप्ताह पहले अपने नियमित ग्राहकों से ऑर्डर लेती हूँ और फिर बेचती हूँ", "मैं सीजन सूं पेली गिराहकां सूं ऑर्डर ल्यूं अर पछै बेचूं"),
    ("I sell in local haat/weekly market", "मैं स्थानीय हाट / साप्ताहिक बाजार में बेचती हूँ", "मैं हाट बाजार में बेचूं"),
    ("I sell in Saras fair", "मैं सरस मेले में बेचती हूँ", "मैं सरस मेला में बेचूं"),
    ("I get orders via instagram", "मुझे इंस्टाग्राम के माध्यम से ऑर्डर मिलते हैं", "मने इंस्टाग्राम सूं ऑर्डर मिलै"),
    ("I get orders via whatsapp", "मुझे व्हाट्सएप के माध्यम से ऑर्डर मिलते हैं", "मने व्हाट्सएप सूं ऑर्डर मिलै"),
    ("I use online platforms like Amazon", "मैं अमेज़न (Amazon) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "मैं अमेज़न माथे बेचूं"),
    ("I use online platform like Meesho", "मैं मीशो (Meesho) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "मैं मीशो माथे बेचूं"),
    ("I use any other online platform", "मैं किसी अन्य ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ", "मैं दूजे ऑनलाइन प्लेटफॉर्म माथे बेचूं"),
    ("I use RAJEEVIKA website", "मैं राजीविका (RAJEEVIKA) वेबसाइट का उपयोग करती हूँ", "मैं राजीविका री वेबसाइट माथे बेचूं"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (sl, sl_hi, sl_raj) in enumerate(c9_sales, 1):
    add_row(f"SLM_{idx:02d}", "Survey", "SeasonalSalesMethod", "SectionC_Option, SubOption", "EnumList", sl, sl, "Dropdown Option", sl, sl_hi, sl_raj)

# SalesChannel % Options for Q10
for pct in ["0%", "upto 15%", "upto 30%", "upto 45%", "upto 60%", "upto 75%", "upto 90%", "100%"]:
    for col in ["SalesChannel_Online_Pct", "SalesChannel_WhatsApp_Pct", "SalesChannel_Instagram_Pct", "SalesChannel_Premise_Pct", "SalesChannel_Traders_Pct", "SalesChannel_Haat_Pct", "SalesChannel_Saras_Pct"]:
        add_row(f"PCT_{pct[:4].replace(' ', '_')}_{col[:10]}", "Survey", col, "SectionC_Option, SubOption", "Enum", pct, pct, "Dropdown Option", pct, pct, pct)

# Q11 RecordKeepingHabit
c11_habits = [
    ("Yes, I have always been doing it", "हाँ, मैं हमेशा से ऐसा करती आ रही हूँ", "हाँ, मैं हमेशा सूं ही हिसाब लिखूं"),
    ("Yes, I started doing after being trained by OSF/SVEP CRP", "हाँ, मैंने OSF/SVEP CRP द्वारा प्रशिक्षित होने के बाद शुरू किया", "हाँ, OSF/SVEP CRP री ट्रेनिंग पछै लिखणो शुरू कियो"),
    ("Yes, my family member maintains  but i dont check", "हाँ, मेरे परिवार का सदस्य हिसाब रखता है लेकिन मैं जाँच नहीं करती", "हाँ, घरवाळा हिसाब राखै पण मैं कोनी देखूं"),
    ("Yes, I have hired help to do that", "हाँ, मैंने इसके लिए कर्मचारी / सहायक रखा हुआ है", "हाँ, मैं हिसाब खातर माणस राख्योड़ो है"),
    ("I don't record regularly", "मैं नियमित रूप से रिकॉर्ड नहीं रखती हूँ", "मैं रोज हिसाब कोनी लिखूं"),
    ("I don't maintain any records at all", "मैं कोई रिकॉर्ड बिल्कुल नहीं रखती हूँ", "मैं कतई कोई हिसाब कोनी राखूं")
]
for idx, (hb, hb_hi, hb_raj) in enumerate(c11_habits, 1):
    add_row(f"REC_{idx:02d}", "Survey", "RecordKeepingHabit", "SectionC_Option, SubOption", "Enum", hb, hb, "Dropdown Option", hb, hb_hi, hb_raj)

# Q12 RecordKeepingMethod
c12_methods = [
    ("Receipt book/bills", "रसीद बुक / बिल", "रसीद बुक / बिल"),
    ("purchase and sale register", "खरीद और बिक्री रजिस्टर", "खरीद-बेचान रजिस्टर"),
    ("Only debt register", "केवल उधार (बाकी) रजिस्टर", "खाली उधारी रो रजिस्टर"),
    ("Maintain daily diary", "दैनिक डायरी रखना", "रोज री डायरी"),
    ("Maintain daily diary as taught by OSF/SVEP CRP", "OSF/SVEP CRP द्वारा सिखाए अनुसार दैनिक डायरी रखना", "OSF/SVEP CRP सिखाया मुजब डायरी लिखणी"),
    ("Maintain digital records using Mera Bill, Bahi Khata", "मेरा बिल, बही खाता आदि से डिजिटल रिकॉर्ड रखना", "मेरा बिल, बही खाता ऐप सूं हिसाब"),
    ("Don’t record regularly", "नियमित रूप से दर्ज नहीं करते", "रोज कोनी लिखूं"),
    ("My family member maintains a book", "मेरे परिवार का सदस्य एक बही रखता है", "घरवाळा बही राखै"),
    ("I don't maintain any record", "मैं कोई रिकॉर्ड नहीं रखती", "मैं कोई हिसाब कोनी राखूं"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (mth, mth_hi, mth_raj) in enumerate(c12_methods, 1):
    add_row(f"MTH_{idx:02d}", "Survey", "RecordKeepingMethod", "SectionC_Option, SubOption", "EnumList", mth, mth, "Dropdown Option", mth, mth_hi, mth_raj)

# ==========================================
# SECTION D: Enterprise financing and income
# ==========================================
# Question Prompts
add_row("LBL_D1", "Survey", "SHGAssociationAssistance", "QuestionPrompt, SectionD", "Text", "Q1. How has the SHG association helped in your enterprise? ( Multiselect)", "SHG Assistance", "Question Label", "Q1. How has the SHG association helped in your enterprise? ( Multiselect)", "प्र.1 स्वयं सहायता समूह (SHG) ने आपके उद्यम में कैसे मदद की है? (बहु-विकल्प)", "प्र.1 समूह सूं जुड़ण सूं थारे धंधा में कांई-कांई मदद मिली? (बहु-विकल्प)")
add_row("LBL_D2", "Survey", "Related_Q19_Capital", "QuestionPrompt, SectionD", "Text", "Q2. How have you arranged capital over the enterprise duration? ( Ask for each option. Put 0 if the source is not used)", "Arranged Capital", "Question Label", "Q2. How have you arranged capital over the enterprise duration? ( Ask for each option. Put 0 if the source is not used)", "प्र.2 उद्यम के दौरान आपने पूँजी की व्यवस्था कैसे की?", "प्र.2 धंधा सारू पूँजी रो जुगाड़ कैयां कियो?")
add_row("LBL_D3", "Survey", "Related_Q20_Loan_Usage", "QuestionPrompt, SectionD", "Text", "Q3. How did you use the loans taken from different sources?", "Loan Usage", "Question Label", "Q3. How did you use the loans taken from different sources?", "प्र.3 विभिन्न स्रोतों से लिए गए ऋण का उपयोग आपने कैसे किया?", "प्र.3 न्यारे-न्यारे जरिया सूं लीधोड़े लोन रो उपयोग कैयां कियो?")
add_row("LBL_D4", "Survey", "FundingExperience", "QuestionPrompt, SectionD", "Text", "Q4. What has been your experience in funding your business? (Multi select)", "Funding Experience", "Question Label", "Q4. What has been your experience in funding your business? (Multi select)", "प्र.4 अपने व्यवसाय के वित्तपोषण में आपका क्या अनुभव रहा है? (बहु-विकल्प)", "प्र.4 धंधा सारू रुपिया जुटावण में आपरो कांई अनुभव रह्यो? (बहु-विकल्प)")
add_row("LBL_D5", "Survey", "Related_Q22_Trajectory", "QuestionPrompt, SectionD", "Text", "Q5. What changes have happened in your business? ( The SHG member may not be able to give an exact number. In such a case ask for rough estimates but don’t pressure )", "Business Changes Trajectory", "Question Label", "Q5. What changes have happened in your business? ( The SHG member may not be able to give an exact number. In such a case ask for rough estimates but don’t pressure )", "प्र.5 आपके व्यवसाय में क्या बदलाव आए हैं? (प्रगति पथ)", "प्र.5 थारे धंधा में कांई-कांई बदलाव आया?")
add_row("LBL_D6", "Survey", "FinancialHelpFromIncome", "QuestionPrompt, SectionD", "Text", "Q6. How has the income from the enterprise helped you financially? (Multiselect)", "Income Benefits", "Question Label", "Q6. How has the income from the enterprise helped you financially? (Multiselect)", "प्र.6 उद्यम से होने वाली आय ने आपको वित्तीय रूप से कैसे मदद की है? (बहु-विकल्प)", "प्र.6 धंधा री कमाई सूं थारे घर-परिवार में कांई आर्थिक मदद मिली? (बहु-विकल्प)")

# Options Section D
# Q1 SHGAssociationAssistance
d1_helps = [
    ("Attended the skill training offered by SHG", "एसएचजी द्वारा दिए गए कौशल प्रशिक्षण में भाग लिया", "समूह रा हुनर प्रशिक्षण में भाग लियो"),
    ("Got information about the scope of business from SHG meetings", "एसएचजी बैठकों से व्यवसाय के दायरे के बारे में जानकारी मिली", "समूह री बैठकां सूं धंधा री जानकारी मिली"),
    ("Got required registration/documents made", "आवश्यक पंजीकरण / दस्तावेज बनवाए", "जरूरी कागजात बणवाया"),
    ("Got subsidy/grant due to SHG.", "एसएचजी के कारण सब्सिडी / अनुदान मिला।", "समूह री वजह सूं अनुदान/सब्सिडी मिली।"),
    ("Took loan from SHG to buy material to initiate the business", "व्यवसाय शुरू करने के लिए सामग्री खरीदने हेतु एसएचजी से ऋण लिया", "धंधो शुरू करण खातर सामान लावण सारू समूह सूं लोन लियो"),
    ("Take loans from SHG regularly as per business requirements", "व्यवसाय की आवश्यकतानुसार एसएचजी से नियमित रूप से ऋण लेते हैं", "धंधा री जरूरत मुजब समूह सूं नियमित लोन लेवां हां"),
    ("OSF/SVEP CRP guided me in setting up the business", "OSF/SVEP CRP ने व्यवसाय स्थापित करने में मेरा मार्गदर्शन किया", "OSF/SVEP CRP धंधो जमावण में मने सीख दी"),
    ("OSF/SVEP CRP helped me to get Mudra loan", "OSF/SVEP CRP ने मुद्रा ऋण प्राप्त करने में मेरी मदद की", "OSF/SVEP CRP मुद्रा लोन दिवावण में मदद करी"),
    ("OSF/SVEP CRP helped me to get bank loan", "OSF/SVEP CRP ने बैंक ऋण प्राप्त करने में मेरी मदद की", "OSF/SVEP CRP बैंक लोन दिवावण में मदद करी")
]
for idx, (hlp, hlp_hi, hlp_raj) in enumerate(d1_helps, 1):
    add_row(f"SHG_HLP_{idx:02d}", "Survey", "SHGAssociationAssistance", "SectionD_Option, SubOption", "EnumList", hlp, hlp, "Dropdown Option", hlp, hlp_hi, hlp_raj)

# Q4 FundingExperience
d4_exp = [
    ("SHG loan is sufficient for the current scale of my business", "एसएचजी ऋण मेरे व्यवसाय के वर्तमान स्तर के लिए पर्याप्त है", "समूह रो लोन म्हारे धंधा खातर पूरो है"),
    ("I regularly plough in my business earnings", "मैं नियमित रूप से अपनी व्यावसायिक कमाई को पुनः व्यवसाय में लगाती हूँ", "मैं धंधा री कमाई पाछी धंधा में लगाऊं"),
    ("SHG loan size is smaller than my requirement", "एसएचजी ऋण का आकार मेरी आवश्यकता से कम है", "समूह रो लोन म्हारी जरूरत सूं छोटो है"),
    ("I get the required loan easily from the moneylender/NBFIs.", "मुझे साहूकार/एनबीएफसी से आवश्यक ऋण आसानी से मिल जाता है।", "साहूकार/एनबीएफसी सूं लोन सोजो मिल जावै।"),
    ("My family members help me with funds and loans", "मेरे परिवार के सदस्य धनराशि और ऋण में मेरी मदद करते हैं", "घरवाळा रुपिया-पैसां री मदद करै"),
    ("I don't prefer money lender or NBFIs as the interest rate is high", "मैं साहूकार या एनबीएफआई को प्राथमिकता नहीं देती क्योंकि ब्याज दर अधिक है", "साहूकार रो ब्याज घणो होवण सूं मैं लोन कोनी ल्यूं"),
    ("I don't prefer money lender or NBFIs as the repayment time is shorter for my convenience", "मैं साहूकार या एनबीएफआई को प्राथमिकता नहीं देती क्योंकि चुकौती का समय बहुत कम होता है", "साहूकार पाछा रुपिया घणा जल्दी मांगै इण वास्ते कोनी ल्यूं")
]
for idx, (fnd, fnd_hi, fnd_raj) in enumerate(d4_exp, 1):
    add_row(f"FND_EXP_{idx:02d}", "Survey", "FundingExperience", "SectionD_Option, SubOption", "EnumList", fnd, fnd, "Dropdown Option", fnd, fnd_hi, fnd_raj)

# Q6 FinancialHelpFromIncome
d6_fin = [
    ("I don’t need to ask money from my husband/family for my needs.", "मुझे अपनी जरूरतों के लिए अपने पति/परिवार से पैसे मांगने की जरूरत नहीं पड़ती।", "मने आपरे खरचे खातर घरवाळां पासे हाथ कोनी पसारणो पड़ै।"),
    ("The income from enterprise is the biggest source of income for my family", "उद्यम से होने वाली आय मेरे परिवार के लिए आय का सबसे बड़ा स्रोत है", "धंधा री कमाई म्हारे परिवार री कमाई रो सबसूं बड़ो जिरयो है"),
    ("The income from enterprise is used in covering education related expenses for my children. Specify amount", "उद्यम से होने वाली आय का उपयोग मेरे बच्चों की शिक्षा के खर्च को पूरा करने में किया जाता है। राशि बताएं", "धंधा री कमाई टाबरां री पढ़ाई में काम आवै। रुपिया बतावो"),
    ("I have been able to pay the family debts. Specify amount", "मैं पारिवारिक ऋण चुकाने में सक्षम रही हूँ। राशि बताएं", "मैं परिवार रो कूर चुकावण में मदद करी। रुपिया बतावो"),
    ("I have contributed money in acquiring assets for my family Specify amount", "मैंने अपने परिवार के लिए संपत्ति खरीदने में धन का योगदान दिया है। राशि बताएं", "मैं परिवार सारू संपत्ति / सामान खरीदण में मदद करी। रुपिया बतावो"),
    ("I have contributed money for marriage expenses. Specify amount", "मैंने शादी के खर्च में धन का योगदान दिया है। राशि बताएं", "मैं ब्याह-शादी रा खरचा में मदद करी। रुपिया बतावो"),
    ("Any other (Please specify)", "अन्य कोई (कृपया विवरण दें)", "दूजो कोई (बतावो)")
]
for idx, (fin, fin_hi, fin_raj) in enumerate(d6_fin, 1):
    add_row(f"FIN_HLP_{idx:02d}", "Survey", "FinancialHelpFromIncome", "SectionD_Option, SubOption", "EnumList", fin, fin, "Dropdown Option", fin, fin_hi, fin_raj)

# ==========================================
# SECTION E: Ease of doing business and challenges
# ==========================================
# Question Prompts
add_row("LBL_E1", "Survey", "HusbandFamilyResponse", "QuestionPrompt, SectionE", "Text", "Q1. How has been your husband’s response towards your enterprise? (Multiselect)", "Husband Family Response", "Question Label", "Q1. How has been your husband’s response towards your enterprise? (Multiselect)", "प्र.1 आपके उद्यम के प्रति आपके पति/परिवार का क्या रुख रहा है? (बहु-विकल्प)", "प्र.1 थारे धंधा माथे थारे घरवाळा रो कांई रवैयो रह्यो? (बहु-विकल्प)")
add_row("LBL_E2", "Survey", "MaterialSourcingComfort", "QuestionPrompt, SectionE", "Text", "Q2. What is your level of comfort in sourcing material?", "Material Sourcing Comfort", "Question Label", "Q2. What is your level of comfort in sourcing material?", "प्र.2 कच्चा माल/सामग्री खरीदने में आपकी सहजता का स्तर क्या है?", "प्र.2 सामान लावण में थे कित्ता सहज हो?")
add_row("LBL_E3", "Survey", "CustomerPaymentRecovery", "QuestionPrompt, SectionE", "Text", "Q3. Are you able to recover money from customers?", "Payment Recovery", "Question Label", "Q3. Are you able to recover money from customers?", "प्र.3 क्या आप ग्राहकों से बकाया पैसा वसूल कर पाती हैं?", "प्र.3 कांई थे गिराहकां सूं उधारी पाछी ले पावो हो?")
add_row("LBL_E4", "Survey", "CurrentChallenges", "QuestionPrompt, SectionE", "Text", "Q4. What are the challenges you are facing now? (Multiselect)", "Current Challenges", "Question Label", "Q4. What are the challenges you are facing now? (Multiselect)", "प्र.4 वर्तमान में आप किन चुनौतियों का सामना कर रही हैं? (बहु-विकल्प)", "प्र.4 हाल थारे साम्ही कांई-कांई दिक्कत आवे है? (बहु-विकल्प)")
add_row("LBL_E5a", "Survey", "Competitors_Similar_Scale", "QuestionPrompt, SectionE", "Text", "Same business scale ______", "Same scale count", "Question Label", "Same business scale ______", "समान व्यवसाय स्तर के लोग", "बराबर रा धंधा वाळा")
add_row("LBL_E5b", "Survey", "Competitors_Smaller_Scale", "QuestionPrompt, SectionE", "Text", "Smaller business scale than yours_______", "Smaller scale count", "Question Label", "Smaller business scale than yours_______", "आपसे छोटे स्तर के व्यवसाय वाले लोग", "आप सूं छोटा धंधा वाळा")
add_row("LBL_E5c", "Survey", "Competitors_Higher_Scale", "QuestionPrompt, SectionE", "Text", "Higher business scale than yours_________", "Higher scale count", "Question Label", "Higher business scale than yours_________", "आपसे बड़े स्तर के व्यवसाय वाले लोग", "आप सूं बड़ा धंधा वाळा")
add_row("LBL_E6", "Survey", "CompetitorAdvantages", "QuestionPrompt, SectionE", "Text", "Q6. What advantage do you have over your competitors? (Multiselect)", "Competitor Advantages", "Question Label", "Q6. What advantage do you have over your competitors? (Multiselect)", "प्र.6 अपने प्रतिस्पर्धियों की तुलना में आपके पास क्या लाभ है? (बहु-विकल्प)", "प्र.6 दूजे दुकानदारां री तुलना में थारे पासे कांई खूबी है? (बहु-विकल्प)")

# Options Section E
# Q1 HusbandFamilyResponse
e1_resp = [
    ("I need help from my family in running my enterprise more effectively", "मुझे अपने उद्यम को अधिक प्रभावी ढंग से चलाने के लिए अपने परिवार की मदद की आवश्यकता है", "धंधो चोखो चलावण खातर मने घरवाळां री मदद चाहीजै"),
    ("My husband was not supportive initially, but now helps when required", "मेरे पति शुरू में समर्थन नहीं करते थे, लेकिन अब जरूरत पड़ने पर मदद करते हैं", "घरवाळा पेली साथ कोनी देता, पण अब जरूरत माथे मदद करै"),
    ("My husband supports/supported me financially", "मेरे पति मुझे वित्तीय रूप से सहयोग करते हैं/किया है", "घरवाळा रुपिया-पैसां री मदद करै"),
    ("I have full support of my husband/family and helped me in every possible way", "मुझे अपने पति/परिवार का पूरा समर्थन प्राप्त है और उन्होंने हर संभव तरीके से मेरी मदद की", "मने घरवाळा रो पूरो साथ है अर हर काम में मदद करै"),
    ("I am running my enterprise without anyone’s support", "मैं किसी के समर्थन के बिना अपना उद्यम चला रही हूँ", "मैं किणी रे सहारे बिना आपरो धंधो चला रही हूँ")
]
for idx, (res, res_hi, res_raj) in enumerate(e1_resp, 1):
    add_row(f"HUSB_{idx:02d}", "Survey", "HusbandFamilyResponse", "SectionE_Option, SubOption", "EnumList", res, res, "Dropdown Option", res, res_hi, res_raj)

# Q2 MaterialSourcingComfort
e2_src = [
    ("I travel alone and I handle negotiations independently", "मैं अकेले यात्रा करती हूँ और बातचीत/मोलभाव स्वतंत्र रूप से संभालती हूँ", "मैं एकली जाऊं अर मोलभाव खुद कर ल्यूं"),
    ("I need travel companion but I handle negotiations independently", "मुझे साथ जाने के लिए साथी चाहिए लेकिन बातचीत/मोलभाव मैं खुद संभालती हूँ", "जावण खातर सागे साथी चाहीजै पण मोलभाव खुद करूँ"),
    ("My family member handles the purchase", "मेरे परिवार का सदस्य खरीद संभालता है", "खरीद म्हारे घरवाळा संभालै"),
    ("OSF/SVEP CRP helps in sourcing material", "OSF/SVEP CRP सामग्री की खरीद में मदद करते हैं", "OSF/SVEP CRP सामान लावण में मदद करै"),
    ("I want to source material from different places but I need support", "मैं अलग-अलग जगहों से सामग्री खरीदना चाहती हूँ लेकिन मुझे सहयोग चाहिए", "मैं न्यारी जगां सूं सामान लावणो चावूं पण मदद चाहीजै"),
    ("I am content to source material from nearby market", "मैं पास के बाजार से सामग्री खरीदने में संतुष्ट हूँ", "मैं पास रा बाजार सूं सामान लावण में राजी हूँ")
]
for idx, (src, src_hi, src_raj) in enumerate(e2_src, 1):
    add_row(f"SRC_COMF_{idx:02d}", "Survey", "MaterialSourcingComfort", "SectionE_Option, SubOption", "Enum", src, src, "Dropdown Option", src, src_hi, src_raj)

# Q3 CustomerPaymentRecovery
e3_rec = [
    ("Yes, I don’t face any issues", "हाँ, मुझे कोई समस्या नहीं आती", "हाँ, मने कोई दिक्कत कोनी आवै"),
    ("Yes, but I conduct only cash transactions", "हाँ, लेकिन मैं केवल नकद लेन-देन ही करती हूँ", "हाँ, पण मैं खाली रोकड़ लेन-देन ही करूं"),
    ("Yes, eventually everyone pays", "हाँ, अंततः सब लोग भुगतान कर देते हैं", "हाँ, धीमे-धीमे सब चुकता कर देवै"),
    ("Yes, but I have learnt over the years how to negotiate.", "हाँ, लेकिन मैंने वर्षों में मोलभाव और बात करना सीख लिया है।", "हाँ, पण मैं सालां में बात करणो सीख लियो।"),
    ("No, but my husband is able to recover", "नहीं, लेकिन मेरे पति वसूली कर लेते हैं", "ना, पण म्हारा घरवाळा वसूली कर लेवै"),
    ("No, my business has suffered losses due to debt.", "नहीं, उधारी/कर्ज के कारण मेरे व्यवसाय को नुकसान हुआ है।", "ना, उधारी री वजह सूं म्हारे धंधा में घाटो लाग्यो।")
]
for idx, (rec, rec_hi, rec_raj) in enumerate(e3_rec, 1):
    add_row(f"PAY_REC_{idx:02d}", "Survey", "CustomerPaymentRecovery", "SectionE_Option, SubOption", "Enum", rec, rec, "Dropdown Option", rec, rec_hi, rec_raj)

# Q4 CurrentChallenges
e4_chal = [
    ("OSF is phased out now which has affected fund sufficiency. Specify amount", "OSF अब समाप्त हो गया है जिससे धन की पर्याप्तता प्रभावित हुई है। राशि बताएं", "OSF अब बंद हो गयो जिण सूं रुपिया री कमी आगी। रुपिया बतावो"),
    ("I need timely access to funds to buy inputs before the production/peak season begins. Specify amount", "सीजन शुरू होने से पहले माल खरीदने के लिए मुझे समय पर धन की आवश्यकता है। राशि बताएं", "सीजन सूं पेली सामान लावण खातर टेम सिर रुपिया चाहीजै। रुपिया बतावो"),
    ("I need support to access bigger market to source material/inputs at lower cost", "कम लागत पर सामान प्राप्त करने के लिए बड़े बाजार तक पहुँचने हेतु मुझे सहयोग चाहिए", "सस्तो सामान लावण खातर बड़ा बजार तांई पहुंचण में मदद चाहीजै"),
    ("I need help in selling my inventory.", "मुझे अपना तैयार माल बेचने में मदद चाहिए।", "मने माल बेचान में मदद चाहीजै।"),
    ("I need help in learning use of social media", "मुझे सोशल मीडिया का उपयोग सीखने में मदद चाहिए", "मने सोशल मीडिया सीखण में मदद चाहीजै"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (chl, chl_hi, chl_raj) in enumerate(e4_chal, 1):
    add_row(f"CHAL_{idx:02d}", "Survey", "CurrentChallenges", "SectionE_Option, SubOption", "EnumList", chl, chl, "Dropdown Option", chl, chl_hi, chl_raj)

# Q6 CompetitorAdvantages
e6_adv = [
    ("I operate from a better location", "मैं बेहतर स्थान से व्यवसाय संचालित करती हूँ", "म्हारी दुकान घणी चोखी जगां माथे है"),
    ("I operate from a shop while they operate from home", "मैं दुकान से काम करती हूँ जबकि वे घर से काम करते हैं", "मैं दुकान सूं काम करूं अर वो घरे सूं"),
    ("I offer a wide variety of products/services", "मैं उत्पादों/सेवाओं की विस्तृत श्रृंखला पेश करती हूँ", "म्हारे पासे घणी भांत रो सामान है"),
    ("I offer discounts and still able to make profit", "मैं छूट (डिस्काउंट) देती हूँ और फिर भी लाभ कमाने में सक्षम हूँ", "मैं छूट दे'र भी नफो कमा लेवूं"),
    ("I offer better quality of products/services", "मैं उत्पादों/सेवाओं की बेहतर गुणवत्ता प्रदान करती हूँ", "म्हारो माल सबसूं चोखो है"),
    ("I sell my products/services on credit", "मैं अपने उत्पाद/सेवाएँ उधार पर बेचती हूँ", "मैं उधारी माथे माल बेचूं"),
    ("I take less time to supply products/deliver services", "मैं उत्पाद की आपूर्ति/सेवा वितरण में कम समय लेती हूँ", "मैं फटाफट माल पूरो कर द्यूं"),
    ("I use social media to market my products/services", "मैं उत्पादों/सेवाओं के प्रचार के लिए सोशल मीडिया का उपयोग करती हूँ", "मैं प्रचार सारू सोशल मीडिया रो उपयोग करूं"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो"),
    ("I don't have any advantage", "मेरे पास कोई विशेष लाभ नहीं है", "म्हारे पासे कोई खास खूबी कोनी")
]
for idx, (adv, adv_hi, adv_raj) in enumerate(e6_adv, 1):
    add_row(f"COMP_ADV_{idx:02d}", "Survey", "CompetitorAdvantages", "SectionE_Option, SubOption", "EnumList", adv, adv, "Dropdown Option", adv, adv_hi, adv_raj)

# ==========================================
# SECTION F: Growth plans and aspirations
# ==========================================
# Question Prompts
add_row("LBL_F1", "Survey", "FutureExpansionPlans", "QuestionPrompt, SectionF", "Text", "Q1. For next one year, what are your plans to increase the scale of your business?", "Expansion Plans", "Question Label", "Q1. For next one year, what are your plans to increase the scale of your business?", "प्र.1 अगले एक वर्ष के लिए, अपने व्यवसाय का दायरा बढ़ाने की आपकी क्या योजनाएँ हैं?", "प्र.1 आगिले एक साल खातर, धंधो बधावण री आपरी कांई योजना है?")
add_row("LBL_F2", "Survey", "AspirationBottlenecks", "QuestionPrompt, SectionF", "Text", "Q2. What is holding you back from pursuing these aspirations? (Multiselect, don't prompt)", "Aspiration Bottlenecks", "Question Label", "Q2. What is holding you back from pursuing these aspirations? (Multiselect, don't prompt)", "प्र.2 इन आकांक्षाओं को पूरा करने से आपको क्या रोक रहा है? (बहु-विकल्प, संकेत न दें)", "प्र.2 इण सपनां ने पूरो करण सूं थने कांई रोक रह्यो है? (बहु-विकल्प)")
add_row("LBL_F3", "Survey", "FutureFundsRequired", "QuestionPrompt, SectionF", "Text", "Q3. How much funds do you need to fund your plan?", "Future Funds Required", "Question Label", "Q3. How much funds do you need to fund your plan?", "प्र.3 अपनी योजना को पूरा करने के लिए आपको कितने धन की आवश्यकता है?", "प्र.3 आपरी योजना सारू थने कित्ता रुपिया री जरूरत है?")

# Options Section F
# Q1 FutureExpansionPlans
f1_plans = [
    ("I want to shift to a better location", "मैं बेहतर स्थान पर जाना चाहती हूँ", "मैं चोखी जगां माथे दुकान लेवणो चावूं"),
    ("I want to make my shop/premise more attractive to customers", "मैं ग्राहकों के लिए अपनी दुकान/परिसर को अधिक आकर्षक बनाना चाहती हूँ", "मैं आपरी दुकान ने गिराहकां खातर और फुटरी बणावणो चावूं"),
    ("I want to expand my current business at the same location (more stock/customers/scale)", "मैं उसी स्थान पर अपने वर्तमान व्यवसाय का विस्तार करना चाहती हूँ (अधिक स्टॉक/ग्राहक/पैमाना)", "मैं इणी जगां माथे माल अर धंधो बधावणो चावूं"),
    ("I want to open a branch/second unit of the same business elsewhere", "मैं अन्यत्र उसी व्यवसाय की एक शाखा/दूसरी इकाई खोलना चाहती हूँ", "मैं दूजी जगां एक और दुकान खोलणी चावूं"),
    ("I want to diversify into a related product/service (e.g., add new items to sell)", "मैं संबंधित उत्पाद/सेवा में विविधता लाना चाहती हूँ (जैसे, बेचने के लिए नई वस्तुएँ जोड़ना)", "मैं धंधा में नयो माल जोड़नो चावूं"),
    ("I want to start a completely different, second enterprise", "मैं पूरी तरह से अलग, दूसरा उद्यम शुरू करना चाहती हूँ", "मैं एक दूसरो न्यारो धंधो शुरू करणो चावूं"),
    ("I want to formalise my business (registration, GST, etc.) to access more/larger customers", "मैं बड़े ग्राहकों तक पहुँचने के लिए अपने व्यवसाय को औपचारिक (पंजीकरण, जीएसटी आदि) बनाना चाहती हूँ", "मैं धंधा रो पंजीकरण/जीएसटी करावणो चावूं"),
    ("I want to move from local/door-to-door sales to online or wider markets", "मैं स्थानीय/घर-घर बिक्री से ऑनलाइन या व्यापक बाजारों की ओर बढ़ना चाहती हूँ", "मैं ऑनलाइन या बडे बाजार में बेचणो चावूं"),
    ("I want to hire more people to help run the business", "मैं व्यवसाय चलाने में मदद के लिए अधिक लोगों को काम पर रखना चाहती हूँ", "मैं काम सारू और माणस राखणो चावूं"),
    ("I want to hand over the business to a family member and reduce my own involvement", "मैं व्यवसाय परिवार के किसी सदस्य को सौंपना चाहती हूँ और अपनी भागीदारी कम करना चाहती हूँ", "मैं काम घरवाळां ने सौंपणो चावूं"),
    ("I am satisfied with the current scale and don't want to expand", "मैं वर्तमान स्तर से संतुष्ट हूँ और विस्तार नहीं करना चाहती", "मैं हाल रा काम सूं राजी हूँ, बधावणो कोनी चावूं"),
    ("I want to shut down or exit this enterprise", "मैं इस उद्यम को बंद करना या इससे बाहर निकलना चाहती हूँ", "मैं ओ काम बंद करणो चावूं"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो"),
    ("Can't say / haven't thought about it", "कह नहीं सकते / इस बारे में सोचा नहीं है", "कह कोनी सका / सोचेड़ो कोनी")
]
for idx, (pln, pln_hi, pln_raj) in enumerate(f1_plans, 1):
    add_row(f"FUT_PLN_{idx:02d}", "Survey", "FutureExpansionPlans", "SectionF_Option, SubOption", "Enum", pln, pln, "Dropdown Option", pln, pln_hi, pln_raj)

# Q2 AspirationBottlenecks
f2_bots = [
    ("Lack of capital/funds", "पूँजी / धन की कमी", "रुपिया-पैसां री कमी"),
    ("Lack of family support/time due to household responsibilities", "घरेलू जिम्मेदारियों के कारण परिवार के समर्थन/समय की कमी", "घर रा कामां री वजह सूं टेम अर साथ री कमी"),
    ("Lack of market access/demand beyond current customer base", "वर्तमान ग्राहकों से परे बाजार तक पहुँच/मांग की कमी", "नया गिराहकां अर बजार री कमी"),
    ("Lack of skills/training needed for the next step", "अगले कदम के लिए आवश्यक कौशल/प्रशिक्षण की कमी", "हुनर अर ट्रेनिंग री कमी"),
    ("Health or personal constraints", "स्वास्थ्य या व्यक्तिगत बाधाएं", "तबियत या निजी अड़चन"),
    ("Nothing is holding me back, I am already working towards it", "मुझे कुछ भी नहीं रोक रहा है, मैं पहले से ही इस दिशा में काम कर रही हूँ", "मने कोई कोनी रोक रह्यो, मैं काम में लाग्योड़ी हूँ"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (bot, bot_hi, bot_raj) in enumerate(f2_bots, 1):
    add_row(f"ASP_BOT_{idx:02d}", "Survey", "AspirationBottlenecks", "SectionF_Option, SubOption", "EnumList", bot, bot, "Dropdown Option", bot, bot_hi, bot_raj)

# Q3 FutureFundsRequired
f3_funds = [
    ("Upto Rs 1,00,000", "1,00,000 रुपये तक", "1,00,000 रुपिया तांई"),
    ("Rs 1,00,001-Rs 3,00,000", "1,00,001 से 3,00,000 रुपये", "1,00,001 सूं 3,00,000 रुपिया"),
    ("Rs 3,00,001-Rs 5,00,000", "3,00,001 से 5,00,000 रुपये", "3,00,001 सूं 5,00,000 रुपिया"),
    ("Rs 5,00,001-Rs 7,00,000", "5,00,001 से 7,00,000 रुपये", "5,00,001 सूं 7,00,000 रुपिया"),
    ("Rs 7,00,001-Rs 9,00,000", "7,00,001 से 9,00,000 रुपये", "7,00,001 सूं 9,00,000 रुपिया"),
    ("More than 9,00,000", "9,00,000 रुपये से अधिक", "9,00,000 रुपिया सूं बत्ती")
]
for idx, (fnd, fnd_hi, fnd_raj) in enumerate(f3_funds, 1):
    add_row(f"FUT_FND_{idx:02d}", "Survey", "FutureFundsRequired", "SectionF_Option, SubOption", "Enum", fnd, fnd, "Dropdown Option", fnd, fnd_hi, fnd_raj)

# ==========================================
# SECTION G: Impact of SVEP/OSF schemes on women-led enterprises
# ==========================================
# Question Prompts
add_row("LBL_G1", "Survey", "AttendedTraining", "QuestionPrompt, SectionG", "Text", "Q1. Have you attended any training under SVEP/OSF?", "Attended Training", "Question Label", "Q1. Have you attended any training under SVEP/OSF?", "प्र.1 क्या आपने SVEP/OSF के तहत कोई प्रशिक्षण लिया है?", "प्र.1 कांई थे SVEP/OSF में कोई ट्रेनिंग लीधी?")
add_row("LBL_G2", "Survey", "TrainingDetails", "QuestionPrompt, SectionG", "Text", "Q2. If Yes, specify__________", "Training Details", "Question Label", "Q2. If Yes, specify__________", "प्र.2 यदि हाँ, तो विवरण दें", "प्र.2 जे हाँ, तो बतावो")
add_row("LBL_G3", "Survey", "UsedTrainingComponent", "QuestionPrompt, SectionG", "Text", "Q3. Did you use any training component in your enterprise?", "Used Training Component", "Question Label", "Q3. Did you use any training component in your enterprise?", "प्र.3 क्या आपने अपने उद्यम में प्रशिक्षण के किसी घटक का उपयोग किया?", "प्र.3 कांई थे ट्रेनिंग री सीख आपरे धंधा में काम लीधी?")
add_row("LBL_G4", "Survey", "UsedTrainingDetails", "QuestionPrompt, SectionG", "Text", "Q4. If Yes, specify__________", "Used Training Details", "Question Label", "Q4. If Yes, specify__________", "प्र.4 यदि हाँ, तो विवरण दें", "प्र.4 जे हाँ, तो बतावो")
add_row("LBL_G5a", "Survey", "MonthlyIncomeBeforeLoan", "QuestionPrompt, SectionG", "Text", "Income before the changes: Rs-------", "Income before changes", "Question Label", "Income before the changes: Rs-------", "बदलाव से पहले आय: रुपये", "बदलाव सूं पेली री कमाई: रुपिया")
add_row("LBL_G5b", "Survey", "MonthlyIncomeAfterLoan", "QuestionPrompt, SectionG", "Text", "Income after the changes: Rs---------", "Income after changes", "Question Label", "Income after the changes: Rs---------", "बदलाव के बाद आय: रुपये", "बदलाव रे बाद री कमाई: रुपिया")
add_row("LBL_G6", "Survey", "MonthlyIncomeIncreaseByOSFSVEP", "QuestionPrompt, SectionG", "Text", "Q6. Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?", "Income Increase Amount", "Question Label", "Q6. Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?", "प्र.6 क्या आप वह राशि बता सकती हैं जिससे आपकी औसत मासिक आय में OSF/SVEP ऋण द्वारा सीधे वृद्धि हुई है?", "प्र.6 कांई थे बता सको हो कै OSF/SVEP लोन सूं थारी महीनवारी कमाई कित्ती बधी?")
add_row("LBL_G7", "Survey", "CRPContributions", "QuestionPrompt, SectionG", "Text", "Q7. What has been the contribution of SVEP/OSF CRP in your enterprise? ( Multisepect)", "CRP Contributions", "Question Label", "Q7. What has been the contribution of SVEP/OSF CRP in your enterprise? ( Multisepect)", "प्र.7 आपके उद्यम में SVEP/OSF CRP का क्या योगदान रहा है? (बहु-विकल्प)", "प्र.7 थारे धंधा में SVEP/OSF CRP रो कांई सहयोग रह्यो? (बहु-विकल्प)")
add_row("LBL_G8", "Survey", "ExpectationsFromScheme", "QuestionPrompt, SectionG", "Text", "Q8. What are your expectations from the SVEP/OSF scheme? (Please prompt)", "Scheme Expectations", "Question Label", "Q8. What are your expectations from the SVEP/OSF scheme? (Please prompt)", "प्र.8 SVEP/OSF योजना से आपकी क्या अपेक्षाएं हैं? (कृपया संकेत दें)", "प्र.8 SVEP/OSF योजना सूं थारी कांई उम्मीद है? (बतावो)")

# Options Section G
# Q1 & Q3 Yes/No
for qcol in ["AttendedTraining", "UsedTrainingComponent"]:
    add_row(f"OPT_YES_{qcol[:10]}", "Survey", qcol, "SectionG_Option, SubOption", "Enum", "Yes", "Yes", "Dropdown Option", "Yes", "हाँ", "हाँ")
    add_row(f"OPT_NO_{qcol[:10]}", "Survey", qcol, "SectionG_Option, SubOption", "Enum", "No", "No", "Dropdown Option", "No", "नहीं", "ना")

# Q6 MonthlyIncomeIncreaseByOSFSVEP
g6_inc = [
    ("Upto Rs 2000", "2000 रुपये तक", "2000 रुपिया तांई"),
    ("Rs 2000 to Rs 3000", "2000 से 3000 रुपये", "2000 सूं 3000 रुपिया"),
    ("Rs 3000 to Rs 4000", "3000 से 4000 रुपये", "3000 सूं 4000 रुपिया"),
    ("Rs 4000 to Rs 5000", "4000 से 5000 रुपये", "4000 सूं 5000 रुपिया"),
    ("Rs 5000 to Rs 6000", "5000 से 6000 रुपये", "5000 सूं 6000 रुपिया"),
    ("Above Rs 6000", "6000 रुपये से अधिक", "6000 रुपिया सूं बत्ती"),
    ("Cant say", "कह नहीं सकते", "कह कोनी सका")
]
for idx, (inc, inc_hi, inc_raj) in enumerate(g6_inc, 1):
    add_row(f"INC_INC_{idx:02d}", "Survey", "MonthlyIncomeIncreaseByOSFSVEP", "SectionG_Option, SubOption", "Enum", inc, inc, "Dropdown Option", inc, inc_hi, inc_raj)

# Q7 CRPContributions
g7_crp = [
    ("Accessing subsidy", "सब्सिडी प्राप्त करने में", "सब्सिडी दिवावण में"),
    ("Getting necessary documents. Specify Aadhar/PAN Card/Income certificate/Caste certificate/Udhayam aadhar/ FSSAI certificate/Shop registration/", "आवश्यक दस्तावेज बनवाने में। (आधार/पैन/आय/जाति/उद्यम आधार/FSSAI/दुकान पंजीकरण)", "जरूरी कागजात बणवावण में"),
    ("They helped us to understand business plans", "उन्होंने हमें व्यावसायिक योजनाओं को समझने में मदद की", "वांपे धंधा री योजना समझावण में मदद करी"),
    ("They gave us new ideas to improve our profit.", "उन्होंने हमें लाभ बढ़ाने के लिए नए विचार दिए।", "वांपे नफा बधावण रा नवा तरीका बताया।"),
    ("They trained us on maintaining records which we didn’t know earlier", "उन्होंने हमें रिकॉर्ड रखने का प्रशिक्षण दिया जो हम पहले नहीं जानते थे", "वांपे हिसाब लिखण री ट्रेनिंग दी"),
    ("They helped in accessing loans from bank", "उन्होंने बैंक से ऋण प्राप्त करने में मदद की", "वांपे बैंक सूं लोन दिवावण में मदद करी"),
    ("They helped in our communication skills", "उन्होंने हमारे बातचीत के कौशल में सुधार किया", "वांपे बोलचाल री सीख दी"),
    ("They helped in marketing", "उन्होंने विपणन (मार्केटिंग) में मदद की", "वांपे माल प्रचार में मदद करी"),
    ("They helped in learning use of instagram", "उन्होंने इंस्टाग्राम का उपयोग सीखने में मदद की", "वांपे इंस्टाग्राम चलावणो सिखायो"),
    ("They helped us to understand our competitors and suggested ways to beat the competition.", "उन्होंने प्रतिस्पर्धियों को समझने और प्रतिस्पर्धा में आगे रहने के तरीके बताए।", "वांपे दूजे दुकानदारां सूं आगे निकलण रा तरीका बताया।")
]
for idx, (crp, crp_hi, crp_raj) in enumerate(g7_crp, 1):
    add_row(f"CRP_CON_{idx:02d}", "Survey", "CRPContributions", "SectionG_Option, SubOption", "EnumList", crp, crp, "Dropdown Option", crp, crp_hi, crp_raj)

# Q8 ExpectationsFromScheme
g8_exp = [
    ("Need bigger loan amount", "बड़ी ऋण राशि की आवश्यकता है", "बड़ा लोन री जरूरत है"),
    ("Need help in accessing Mudra loan", "मुद्रा ऋण प्राप्त करने में मदद चाहिए", "मुद्रा लोन दिवावण में मदद चाहीजै"),
    ("Need more guidance of SBDP/SVEP CRPs", "SBDP/SVEP CRPs के अधिक मार्गदर्शन की आवश्यकता है", "CRPs री और सीख चाहीजै"),
    ("Need help to access bigger markets", "बड़े बाजारों तक पहुँचने में मदद चाहिए", "बड़ा बजार तांई पहुंचण में मदद चाहीजै"),
    ("Need help with online purchase", "ऑनलाइन खरीदारी में मदद चाहिए", "ऑनलाइन खरीद में मदद चाहीजै"),
    ("Need help with instagram", "इंस्टाग्राम के उपयोग में मदद चाहिए", "इंस्टाग्राम चलावण में मदद चाहीजै"),
    ("Need my business specific trainings", "मेरे व्यवसाय से संबंधित विशेष प्रशिक्षण की आवश्यकता है", "धंधा री खास ट्रेनिंग चाहीजै"),
    ("Any other, Specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (exp, exp_hi, exp_raj) in enumerate(g8_exp, 1):
    add_row(f"SCH_EXP_{idx:02d}", "Survey", "ExpectationsFromScheme", "SectionG_Option, SubOption", "EnumList", exp, exp, "Dropdown Option", exp, exp_hi, exp_raj)

# ==========================================
# SECTION H: Use of online transactions and social media
# ==========================================
# Question Prompts
add_row("LBL_H1", "Survey", "SmartphoneOwnership", "QuestionPrompt, SectionH", "Text", "Q1. Do you own a smart phone?", "Smartphone Ownership", "Question Label", "Q1. Do you own a smart phone?", "प्र.1 क्या आपके पास अपना स्मार्ट फोन है?", "प्र.1 कांई थारे पासे आपरो खुद रो स्मार्ट फोन है?")
add_row("LBL_H2", "Survey", "UseQRUPI", "QuestionPrompt, SectionH", "Text", "Q2. Do you use QR code/mobile banking for money transactions?", "Use QR UPI", "Question Label", "Q2. Do you use QR code/mobile banking for money transactions?", "प्र.2 क्या आप पैसों के लेन-देन के लिए क्यूआर कोड/मोबाइल बैंकिंग का उपयोग करती हैं?", "प्र.2 कांई थे लेन-देन सारू क्यूआर कोड/फोन पे रो उपयोग करो हो?")
add_row("LBL_H3", "Survey", "QRDailyTransactions", "QuestionPrompt, SectionH", "Text", "Q3. If yes, daily how many transactions in your business are done using QR code/mobile banking?", "QR Daily Transactions", "Question Label", "Q3. If yes, daily how many transactions in your business are done using QR code/mobile banking?", "प्र.3 यदि हाँ, तो आपके व्यवसाय में प्रतिदिन क्यूआर कोड/मोबाइल बैंकिंग से कितने लेन-देन होते हैं?", "प्र.3 जे हाँ, तो रोज कित्ता लेन-देन क्यूआर कोड सूं होवै?")
add_row("LBL_H4", "Survey", "QRNonUseReason", "QuestionPrompt, SectionH", "Text", "Q4. If no, reason for not using QR code/mobile banking for money related transactions", "QR Non Use Reason", "Question Label", "Q4. If no, reason for not using QR code/mobile banking for money related transactions", "प्र.4 यदि नहीं, तो पैसों के लेन-देन के लिए क्यूआर कोड/मोबाइल बैंकिंग का उपयोग न करने का कारण", "प्र.4 जे ना, तो क्यूआर कोड कोनी वापरण रो कांई कारण है?")
add_row("LBL_H5", "Survey", "SocialMediaForMarketing", "QuestionPrompt, SectionH", "Text", "Q5. Do you use social media for marketing?", "Social Media Marketing", "Question Label", "Q5. Do you use social media for marketing?", "प्र.5 क्या आप प्रचार के लिए सोशल मीडिया का उपयोग करती हैं?", "प्र.5 कांई थे प्रचार खातर सोशल मीडिया रो उपयोग करो हो?")
add_row("LBL_H6", "Survey", "SocialPlatformsUsed", "QuestionPrompt, SectionH", "Text", "Q6. Which social media platforms do you use for your business? (Multiselect)", "Social Platforms Used", "Question Label", "Q6. Which social media platforms do you use for your business? (Multiselect)", "प्र.6 आप अपने व्यवसाय के लिए किन सोशल मीडिया प्लेटफॉर्म का उपयोग करती हैं? (बहु-विकल्प)", "प्र.6 थे आपरे धंधा सारू किण-किण सोशल मीडिया रो उपयोग करो हो? (बहु-विकल्प)")
add_row("LBL_H7", "Survey", "SocialPlatformUsageMode", "QuestionPrompt, SectionH", "Text", "Q7. How do you use these platforms in your business?", "Platform Usage Mode", "Question Label", "Q7. How do you use these platforms in your business?", "प्र.7 आप अपने व्यवसाय में इन प्लेटफॉर्म का उपयोग कैसे करती हैं?", "प्र.7 थे आपरे धंधा में इण प्लेटफॉर्म रो उपयोग कैयां करो हो?")
add_row("LBL_H8", "Survey", "SocialMediaFrequency", "QuestionPrompt, SectionH", "Text", "Q8. How often do you use social media for your business?", "Social Media Frequency", "Question Label", "Q8. How often do you use social media for your business?", "प्र.8 आप अपने व्यवसाय के लिए सोशल मीडिया का कितनी बार उपयोग करती हैं?", "प्र.8 थे आपरे धंधा खातर सोशल मीडिया रो उपयोग कित्ती बार करो हो?")

# Options Section H
# Q1 SmartphoneOwnership
h1_phn = [
    ("Yes", "हाँ", "हाँ"),
    ("No", "नहीं", "ना"),
    ("No, but i have access to smart phone", "नहीं, लेकिन मुझे स्मार्ट फोन इस्तेमाल करने की सुविधा है", "ना, पण परिवार रो फोन वापर सकूं")
]
for idx, (ph, ph_hi, ph_raj) in enumerate(h1_phn, 1):
    add_row(f"PHN_{idx:02d}", "Survey", "SmartphoneOwnership", "SectionH_Option, SubOption", "Enum", ph, ph, "Dropdown Option", ph, ph_hi, ph_raj)

# Q2 UseQRUPI
add_row("OPT_YES_QR", "Survey", "UseQRUPI", "SectionH_Option, SubOption", "Enum", "Yes", "Yes", "Dropdown Option", "Yes", "हाँ", "हाँ")
add_row("OPT_NO_QR", "Survey", "UseQRUPI", "SectionH_Option, SubOption", "Enum", "No", "No", "Dropdown Option", "No", "नहीं", "ना")

# Q3 QRDailyTransactions
for tx in ["1-4", "5-10", "10-20", "20-40", "More than 40"]:
    add_row(f"TX_{tx.replace('-', '_').replace(' ', '_').upper()}", "Survey", "QRDailyTransactions", "SectionH_Option, SubOption", "Enum", tx, tx, "Dropdown Option", tx, f"{tx} लेन-देन", f"{tx} लेन-देन")

# Q4 QRNonUseReason
h4_noqr = [
    ("Since I don’t own smart phone, it is difficult to transact", "चूंकि मेरे पास स्मार्ट फोन नहीं है, इसलिए लेन-देन करना कठिन है", "म्हारे पासे फोन कोनी इण वास्ते कोनी करूं"),
    ("Not many customers use smart phone for payments", "ज्यादा ग्राहक भुगतान के लिए स्मार्ट फोन का उपयोग नहीं करते", "घणा गिराहक फोन सूं रुपिया कोनी देवे"),
    ("I don’t know how to use and monitor transactions with QR code/mobile banking", "मुझे क्यूआर कोड/मोबाइल बैंकिंग से लेन-देन करना और देखना नहीं आता", "मने क्यूआर कोड सूं हिसाब देखणो कोनी आवै"),
    ("Not applicable", "लागू नहीं", "लागू कोनी")
]
for idx, (nq, nq_hi, nq_raj) in enumerate(h4_noqr, 1):
    add_row(f"NO_QR_{idx:02d}", "Survey", "QRNonUseReason", "SectionH_Option, SubOption", "Enum", nq, nq, "Dropdown Option", nq, nq_hi, nq_raj)

# Q5 SocialMediaForMarketing
h5_sm = [
    ("I regularly share images on whatsapp to get orders", "मैं ऑर्डर पाने के लिए व्हाट्सएप पर नियमित रूप से फोटो साझा करती हूँ", "मैं ऑर्डर लेवण खातर व्हाट्सएप माथे फोटो भेजूं"),
    ("I regularly share images/reels on instagram to get orders", "मैं ऑर्डर पाने के लिए इंस्टाग्राम पर नियमित रूप से फोटो/रील्स साझा करती हूँ", "मैं इंस्टाग्राम माथे फोटो/रील भेजूं"),
    ("It is important but I don’t have access to smart phone", "यह महत्वपूर्ण है लेकिन मेरे पास स्मार्ट फोन की सुविधा नहीं है", "जरूरी तो है पण म्हारे पासे फोन कोनी"),
    ("I do not use because I don't know how to use whatsapp/ instagram", "मैं उपयोग नहीं करती क्योंकि मुझे व्हाट्सएप/इंस्टाग्राम का उपयोग करना नहीं आता", "मने व्हाट्सएप/इंस्टाग्राम चलावणो कोनी आवै"),
    ("I don't have time to learn and use social media", "मेरे पास सोशल मीडिया सीखने और उपयोग करने का समय नहीं है", "म्हारे पासे सोशल मीडिया सारू टेम कोनी"),
    ("I don't want to use social media", "मैं सोशल मीडिया का उपयोग नहीं करना चाहती", "मैं सोशल मीडिया कोनी वापरणी चावूं"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (sm, sm_hi, sm_raj) in enumerate(h5_sm, 1):
    add_row(f"SM_MKT_{idx:02d}", "Survey", "SocialMediaForMarketing", "SectionH_Option, SubOption", "Enum", sm, sm, "Dropdown Option", sm, sm_hi, sm_raj)

# Q6 SocialPlatformsUsed
h6_plats = [
    ("Whatsapp", "व्हाट्सएप (WhatsApp)", "व्हाट्सएप"),
    ("Instagram", "इंस्टाग्राम (Instagram)", "इंस्टाग्राम"),
    ("Pinterest", "पिंटरेस्ट (Pinterest)", "पिंटरेस्ट"),
    ("Facebook", "फेसबुक (Facebook)", "फेसबुक"),
    ("Snapchat", "स्नैपचैट (Snapchat)", "स्नैपचैट"),
    ("Don’t use social media", "सोशल मीडिया का उपयोग नहीं करते", "सोशल मीडिया कोनी वापरां")
]
for idx, (plt, plt_hi, plt_raj) in enumerate(h6_plats, 1):
    add_row(f"PLT_{idx:02d}", "Survey", "SocialPlatformsUsed", "SectionH_Option, SubOption", "EnumList", plt, plt, "Dropdown Option", plt, plt_hi, plt_raj)

# Q7 SocialPlatformUsageMode
h7_modes = [
    ("Use texts to ask/share prices and book orders", "कीमत पूछने/साझा करने और ऑर्डर बुक करने के लिए संदेशों (टेक्स्ट) का उपयोग", "भाव पूछण/बतावण अर ऑर्डर बुक करण सारू"),
    ("Share images to promote business", "व्यवसाय को बढ़ावा देने के लिए फोटो साझा करना", "धंधा रो प्रचार करण खातर फोटो भेजणी"),
    ("Share images to enquire about the availability of products to vendors", "विक्रेताओं से उत्पादों की उपलब्धता जानने के लिए फोटो साझा करना", "व्यापारियां सूं माल री पूछपरछ खातर फोटो भेजणी"),
    ("Get new ideas and information about new products/services", "नए उत्पादों/सेवाओं के बारे में नए विचार और जानकारी प्राप्त करना", "नवा माल री जानकारी अर आइडिया लेवण खातर"),
    ("Don’t use social media", "सोशल मीडिया का उपयोग नहीं करते", "सोशल मीडिया कोनी वापरां")
]
for idx, (mod, mod_hi, mod_raj) in enumerate(h7_modes, 1):
    add_row(f"SM_MOD_{idx:02d}", "Survey", "SocialPlatformUsageMode", "SectionH_Option, SubOption", "Enum", mod, mod, "Dropdown Option", mod, mod_hi, mod_raj)

# Q8 SocialMediaFrequency
h8_freq = [
    ("Daily", "प्रतिदिन (Daily)", "रोज"),
    ("Twice or thrice a week", "सप्ताह में दो या तीन बार", "हफ्ते में दो-तीन बार"),
    ("Four-five times a month", "महीने में चार-पांच बार", "महीने में चार-पांच बार"),
    ("Only on occasions", "केवल विशेष अवसरों पर", "खाली कदे-कदा"),
    ("Don’t use social media", "सोशल मीडिया का उपयोग नहीं करते", "सोशल मीडिया कोनी वापरां")
]
for idx, (frq, frq_hi, frq_raj) in enumerate(h8_freq, 1):
    add_row(f"SM_FRQ_{idx:02d}", "Survey", "SocialMediaFrequency", "SectionH_Option, SubOption", "Enum", frq, frq, "Dropdown Option", frq, frq_hi, frq_raj)

# ==========================================
# SECTION I: Status of post-exit OSF intervention in Baran and Ratangadh
# ==========================================
# Question Prompts
add_row("LBL_I1", "Survey", "OSFInterventionYear", "QuestionPrompt, SectionI", "Text", "Q1. In which year was the OSF intervention made?-------", "OSF Intervention Year", "Question Label", "Q1. In which year was the OSF intervention made?-------", "प्र.1 OSF हस्तक्षेप किस वर्ष में किया गया था?", "प्र.1 OSF हस्तक्षेप किण साल में कियो गयो?")
add_row("LBL_I2", "Survey", "BusinessOperationalStatus", "QuestionPrompt, SectionI", "Text", "Q2. Is your business still operational?", "Operational Status", "Question Label", "Q2. Is your business still operational?", "प्र.2 क्या आपका व्यवसाय अभी भी चालू है?", "प्र.2 कांई आपरो धंधो हाल भी चालू है?")
add_row("LBL_I3", "Survey", "ScalingDownClosingReasons", "QuestionPrompt, SectionI", "Text", "Q3. What are the reasons for scaling down the business/closing the business? ( Don’t prompt)", "Closing Reasons", "Question Label", "Q3. What are the reasons for scaling down the business/closing the business? ( Don’t prompt)", "प्र.3 व्यवसाय को कम करने / बंद करने के क्या कारण हैं? (संकेत न दें)", "प्र.3 काम कम करण या बंद करण रा कांई कारण है?")
add_row("LBL_I4", "Survey", "SupportNeededForSustenance", "QuestionPrompt, SectionI", "Text", "Q4. What kind of support could have helped you to manage your business?", "Support Needed", "Question Label", "Q4. What kind of support could have helped you to manage your business?", "प्र.4 किस प्रकार का सहयोग आपको अपना व्यवसाय चलाने में मदद कर सकता था?", "प्र.4 किण भांत री मदद सूं थारो धंधो चल सकतो हो?")

# Options Section I
# Q2 BusinessOperationalStatus
i2_ops = [
    ("Yes but the sale has reduced", "हाँ, लेकिन बिक्री कम हो गई है", "हाँ, पण बिक्री कम होगी"),
    ("Yes but the scale has increased", "हाँ, और दायरा/पैमाना बढ़ गया है", "हाँ, अर काम बध गयो"),
    ("Yes, but the scale has remained the same.", "हाँ, लेकिन दायरा पहले जैसा ही रहा है।", "हाँ, पण काम पैली जत्तो ही है।"),
    ("No. If no, specify the year when it was closed……..", "नहीं। यदि नहीं, तो वह वर्ष बताएं जब यह बंद हुआ था", "ना। जे ना, तो बंद होवण रो साल बतावो")
]
for idx, (op, op_hi, op_raj) in enumerate(i2_ops, 1):
    add_row(f"OPS_{idx:02d}", "Survey", "BusinessOperationalStatus", "SectionI_Option, SubOption", "Enum", op, op, "Dropdown Option", op, op_hi, op_raj)

# Q3 ScalingDownClosingReasons
i3_rsns = [
    ("Sales reduced over the years as there was no one guiding us.", "वर्षों में बिक्री कम हो गई क्योंकि हमारा मार्गदर्शन करने वाला कोई नहीं था।", "सालां में बिक्री घटगी क्यूंकी सीख देवणिया कोई कोनी हा।"),
    ("Needed more capital to source material but there was no source of loan", "सामग्री खरीदने के लिए अधिक पूँजी की आवश्यकता थी लेकिन ऋण का कोई स्रोत नहीं था", "सामान लावण खातर रुपिया चाहीजै हा पण लोन कोनी मिल्यो"),
    ("Banks refused to give us loan", "बैंकों ने हमें ऋण देने से मना कर दिया", "बैंक लोन देण सूं मना कर दियो"),
    ("Unable to reach new customers.", "नए ग्राहकों तक पहुँचने में असमर्थ रहे।", "नया गिराहकां तांई कोनी पहुंच पाया।"),
    ("New competitors in the market offering discounts", "बाजार में छूट (डिस्काउंट) देने वाले नए प्रतिस्पर्धी आ गए", "बजार में छूट देवणिया नवा दुकानदार आग्या"),
    ("Any other, specify……..", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो"),
    ("Don’t know", "पता नहीं", "ठा कोनी")
]
for idx, (rsn, rsn_hi, rsn_raj) in enumerate(i3_rsns, 1):
    add_row(f"CLS_RSN_{idx:02d}", "Survey", "ScalingDownClosingReasons", "SectionI_Option, SubOption", "EnumList", rsn, rsn, "Dropdown Option", rsn, rsn_hi, rsn_raj)

# Q4 SupportNeededForSustenance
i4_sups = [
    ("Continued access to OSF loan", "OSF ऋण की निरंतर उपलब्धता", "OSF लोन लगातार मिलणो"),
    ("Continued support by OSF CRPs", "OSF CRP द्वारा निरंतर सहयोग", "OSF CRP रो लगातार साथ"),
    ("Any other, specify", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो")
]
for idx, (sup, sup_hi, sup_raj) in enumerate(i4_sups, 1):
    add_row(f"SUP_{idx:02d}", "Survey", "SupportNeededForSustenance", "SectionI_Option, SubOption", "Enum", sup, sup, "Dropdown Option", sup, sup_hi, sup_raj)

# ==========================================
# SUBTABLE OPTIONS (Survey_Tables)
# ==========================================
# Q6 Labor Row Items
q6_items = [
    ("Purchase of material", "सामग्री की खरीद", "सामान री खरीद"),
    ("Production", "उत्पादन", "माल बणावणो"),
    ("Servicing", "सेवा (सर्विसिंग)", "सेवा काम"),
    ("Social media marketing", "सोशल मीडिया प्रचार", "सोशल मीडिया प्रचार"),
    ("Sale (from shop/door to door/Saras fair/haat)", "बिक्री (दुकान/घर-घर/सरस मेला/हाट)", "बेचान (दुकान/घरे-घरे/मेला/हाट)"),
    ("Record keeping", "रिकॉर्ड रखना / हिसाब-किताब", "हिसाब-किताब राखणो")
]
for idx, (it, it_hi, it_raj) in enumerate(q6_items, 1):
    add_row(f"SUB_Q6_ACT_{idx:02d}", "Survey_Tables", "Row_Item", "SubTable_Q6_Labor", "Enum", it, it, "Dropdown Option", it, it_hi, it_raj)

# Q6 Involvement Types
for inv, inv_hi, inv_raj in [("Regular", "नियमित", "नियमित"), ("Occasional", "कभी-कभार", "कदे-कदा"), ("Only respondent", "केवल उत्तरदाता", "खाली उत्तरदाता"), ("Not relevant", "लागू नहीं", "लागू कोनी")]:
    add_row(f"SUB_Q6_INV_{inv[:3].upper()}", "Survey_Tables", "Involvement_Type", "SubTable_Q6_Labor", "Enum", inv, inv, "Dropdown Option", inv, inv_hi, inv_raj)

# Q6 Paid Amount ranges
q6_paid = [
    ("Not relevant", "लागू नहीं", "लागू कोनी"),
    ("Upto Rs 5000", "5000 रुपये तक", "5000 रुपिया तांई"),
    ("Rs 6000 Rs 10,000", "6000 से 10,000 रुपये", "6000 सूं 10,000 रुपिया"),
    ("Rs 11,000 to Rs 30,000", "11,000 से 30,000 रुपये", "11,000 सूं 30,000 रुपिया"),
    ("Rs 31,000 to Rs 50,000", "31,000 से 50,000 रुपये", "31,000 सूं 50,000 रुपिया"),
    ("Rs 51,000 to Rs 70,000", "51,000 से 70,000 रुपये", "51,000 सूं 70,000 रुपिया"),
    ("Rs 71000 to Rs 90,000", "71,000 से 90,000 रुपये", "71,000 सूं 90,000 रुपिया"),
    ("Rs 90,0000 to Rs 1,10,000", "90,000 से 1,10,000 रुपये", "90,000 सूं 1,10,000 रुपिया"),
    ("Rs 1,11,000 to Rs 1,30,000", "1,11,000 से 1,30,000 रुपये", "1,11,000 सूं 1,30,000 रुपिया"),
    ("Rs, 1,31,000 to Rs 1,50,000", "1,31,000 से 1,50,000 रुपये", "1,31,000 सूं 1,50,000 रुपिया"),
    ("Above Rs 1,50,000", "1,50,000 रुपये से अधिक", "1,50,000 रुपिया सूं बत्ती")
]
for idx, (pd, pd_hi, pd_raj) in enumerate(q6_paid, 1):
    add_row(f"SUB_Q6_PD_{idx:02d}", "Survey_Tables", "Paid_Last_Year", "SubTable_Q6_Labor", "Enum", pd, pd, "Dropdown Option", pd, pd_hi, pd_raj)

# Q15 Turnover Seasons
for ssn, ssn_hi, ssn_raj in [("Peak season", "पीक सीजन (अधिकतम बिक्री)", "पीक सीजन (सबसूं बत्ती बिक्री)"), ("Average", "औसत सीजन (सामान्य बिक्री)", "औसत सीजन"), ("Lean", "लीन सीजन (कम बिक्री)", "मंदा रो सीजन")]:
    add_row(f"SUB_Q15_SSN_{ssn[:3].upper()}", "Survey_Tables", "Row_Item", "SubTable_Q15_Turnover", "Enum", ssn, ssn, "Dropdown Option", ssn, ssn_hi, ssn_raj)

# Q19 Capital & Q20 Loan Usage Sources
cap_sources = [
    ("Own Savings", "स्वयं की बचत", "खुद री बचत"),
    ("Financed by family member", "परिवार के सदस्य द्वारा वित्तपोषित", "घरवाळां री मदद"),
    ("Profit from business", "व्यवसाय से प्राप्त लाभ", "धंधा रो नफो"),
    ("Mortgaged gold/silver", "सोना/चांदी गिरवी रखा", "सोना-चांदी गिरवी राख्यो"),
    ("Sold gold/silver", "सोना/चांदी बेचा", "सोना-चांदी बेच्यो"),
    ("Loan from family", "परिवार से ऋण", "कुटुंब सूं उधार"),
    ("Loan from moneylender", "साहूकार से ऋण", "साहूकार सूं कर्ज"),
    ("Loan from SHG", "एसएचजी से ऋण", "समूह सूं लोन"),
    ("Loan from OSF/SVEP", "OSF/SVEP से ऋण", "OSF/SVEP सूं लोन"),
    ("Subsidy/grant under OSF/SVEP", "OSF/SVEP के तहत सब्सिडी/अनुदान", "OSF/SVEP सूं अनुदान"),
    ("Loan from private saving groups/BC", "निजी बचत समूह / बीसी से ऋण", "निजी बचत समूह सूं लोन"),
    ("Loan from NBFC", "एनबीएफसी (NBFC) से ऋण", "NBFC सूं लोन"),
    ("Mudra loan", "मुद्रा ऋण", "मुद्रा लोन"),
    ("Loan from banks", "बैंक से ऋण", "बैंक सूं लोन")
]
for idx, (src, src_hi, src_raj) in enumerate(cap_sources, 1):
    add_row(f"SUB_CAP_SRC_{idx:02d}", "Survey_Tables", "Row_Item", "SubTable_Q19_Capital", "Enum", src, src, "Dropdown Option", src, src_hi, src_raj)

# Q20 Loan Usage Options
q20_uses = [
    ("Seed capital to buy material and set up the shop", "सामग्री खरीदने और दुकान स्थापित करने के लिए शुरुआती पूँजी", "सामान लावण अर दुकान जमावण सारू पूँजी"),
    ("Buy new machine to increase the production capacity ( eg: sewing machine)", "उत्पादन क्षमता बढ़ाने के लिए नई मशीन खरीदना (जैसे: सिलाई मशीन)", "उत्पादन बधावण सारू नई मशीन खरीदणी"),
    ("Buy assets to store and sell new products ( eg: fridge)", "नए उत्पादों को रखने और बेचने के लिए संपत्ति खरीदना (जैसे: फ्रिज)", "नया सामान राखण सारू साधन खरीदणो (जैसे: फ्रिज)"),
    ("Get additional space to expand my business ( eg: addition of flour mill)", "अपने व्यवसाय के विस्तार के लिए अतिरिक्त जगह लेना (जैसे: आटा चक्की जोड़ना)", "धंधो बधावण सारू और जगां लेवणी"),
    ("Buy more material to increase the product range offered (eg: clothes in a fancy store)", "उत्पाद श्रृंखला बढ़ाने के लिए अधिक सामग्री खरीदना (जैसे: कपड़े)", "और माल लावण सारू"),
    ("Buy more material/inputs to increase scale of business/production", "व्यवसाय/उत्पादन का पैमाना बढ़ाने के लिए अधिक सामग्री खरीदना", "धंधो बधावण खातर और माल खरीदणो"),
    ("Buy vehicle to access new market to buy/sell goods", "सामान खरीदने/बेचने के लिए नए बाजार तक पहुँचने हेतु वाहन खरीदना", "सामान लावण-लैजावण सारू साधन खरीदणो"),
    ("Access better transport services to access new market to buy/sell goods", "सामान खरीदने/बेचने के लिए बेहतर परिवहन सेवाओं का उपयोग करना", "परिवहन साधन रो उपयोग करणो"),
    ("Buy mobile phone to promote/sell my goods online", "सामान को ऑनलाइन प्रचारित करने/बेचने के लिए मोबाइल फोन खरीदना", "ऑनलाइन काम सारू फोन खरीदणो"),
    ("Any other, specify……….", "अन्य कोई, विवरण दें", "दूजो कोई, बतावो"),
    ("Not used the source", "स्रोत का उपयोग नहीं किया", "उपयोग कोनी कियो")
]
for idx, (us, us_hi, us_raj) in enumerate(q20_uses, 1):
    add_row(f"SUB_Q20_USE_{idx:02d}", "Survey_Tables", "Loan_Usage", "SubTable_Q20_Loan_Usage", "Enum", us, us, "Dropdown Option", us, us_hi, us_raj)

# Q22 Trajectory Headings
q22_heads = [
    ("Average sales/month", "औसत बिक्री / माह", "औसत बिक्री / महिना"),
    ("Average monthly income", "औसत मासिक आय", "औसत मासिक कमाई"),
    ("Value of stock/finished goods", "स्टॉक / तैयार माल का मूल्य", "स्टॉक / तैयार माल रो मोल"),
    ("In case of servicing, value of enterprise related assets", "सेवा के मामले में, उद्यम से संबंधित संपत्तियों का मूल्य", "सर्विसिंग में, धंधा री संपत्ति रो मोल")
]
for idx, (hd, hd_hi, hd_raj) in enumerate(q22_heads, 1):
    add_row(f"SUB_Q22_HD_{idx:02d}", "Survey_Tables", "Row_Item", "SubTable_Q22_Trajectory", "Enum", hd, hd, "Dropdown Option", hd, hd_hi, hd_raj)

print(f"ALL SECTIONS COMPILED! Total rows: {len(rows)}")

# Output Files
base_dir = r"projects/CmF_SHG_Women_Entrepreneurs"
os.makedirs(os.path.join(base_dir, "data"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "scripts"), exist_ok=True)

csv_path = os.path.join(base_dir, "data", "AppVariables_VERBATIM_DOCX.csv")
tsv_path = os.path.join(base_dir, "data", "AppVariables_VERBATIM_DOCX.tsv")
gs_path = os.path.join(base_dir, "scripts", "UPDATE_APPVARIABLES_VERBATIM_DOCX.gs")

headers = [
    "ID", "Table", "Column", "Tags", "ValueControl", "Title", "Description", "UsedFor",
    "Decimal", "EnumValue", "EnumList", "VariableList", "DateValue", "Photo", "URL",
    "File", "Title_hi", "Title_raj", "ActionIcon", "LastEditBy", "LastEditOn"
]

# Write CSV
with open(csv_path, "w", encoding="utf-8-sig", newline="") as f:
    writer = csv.DictWriter(f, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)
print(f"[OK] Wrote CSV: {csv_path} ({len(rows)} rows)")

# Write TSV
with open(tsv_path, "w", encoding="utf-8", newline="") as f:
    f.write("\t".join(headers) + "\n")
    for r in rows:
        row_str = "\t".join([str(r.get(h, "")).replace("\t", " ").replace("\n", " ") for h in headers])
        f.write(row_str + "\n")
print(f"[OK] Wrote TSV: {tsv_path} ({len(rows)} rows)")

# Write Google Apps Script (.gs)
gs_code = """function syncVerbatimDocxAppVariables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("AppVariables");
  if (!sheet) {
    sheet = ss.insertSheet("AppVariables");
  }
  
  var data = """ + json.dumps([[h for h in headers]] + [[r.get(h, "") for h in headers] for r in rows], ensure_ascii=False, indent=2) + """;
  
  sheet.clearContents();
  sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  SpreadsheetApp.getUi().alert('SUCCESS: AppVariables updated with 100% Word-for-Word Verbatim DOCX text for all ' + (data.length - 1) + ' rows!');
}
"""
with open(gs_path, "w", encoding="utf-8") as f:
    f.write(gs_code)
print(f"[OK] Wrote Apps Script: {gs_path}")
'''

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/generate_all_verbatim_files.py', 'a', encoding='utf-8') as f:
    f.write(code_to_append)

print("generate_all_verbatim_files.py successfully updated!")
