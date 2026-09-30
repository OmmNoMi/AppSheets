# SHG Women Entrepreneurs Survey - Complete Trilingual Options & Show_If Reference Matrix

> **Purpose**: Exact reference for all Questions, Enum Options (Option ID, Stored Value, English, Hindi, Rajasthani), and Copy-Paste `Show_If` / `Valid_If` AppSheet Formulas.

### Q1. District
- **Physical Column**: `District`
- **Question ID**: `Q_A_01_00`
- **Type / ValueControl**: `VariableList`
- **Hindi Title**: Q1. जिला
- **Rajasthani Title**: Q1. जिलो
- **Display Name Formula**: `=LOOKUP("Q_A_01_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `DIST_BARAN` | `Baran` | Baran | बारां | बारां |
| `DIST_CHURU` | `Churu` | Churu | चूरू | चूरू |
| `DIST_DAUSA` | `Dausa` | Dausa | दौसा | दौसा |
| `DIST_DUNGARPUR` | `Dungarpur` | Dungarpur | डूंगरपुर | डूंगरपुर |
| `DIST_JODHPUR` | `Jodhpur` | Jodhpur | जोधपुर | जोधपुर |

---

### Q2. Block
- **Physical Column**: `Block`
- **Question ID**: `Q_A_02_00`
- **Type / ValueControl**: `VariableList`
- **Hindi Title**: Q2. ब्लॉक
- **Rajasthani Title**: Q2. ब्लॉक
- **Display Name Formula**: `=LOOKUP("Q_A_02_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `BLK_CHHIPABAROD` | `Chhipabarod` | Chhipabarod | छीपाबड़ौद | छीपाबड़ौद |
| `BLK_BARAN` | `Baran` | Baran | बारां | बारां |
| `BLK_RATANGARH` | `Ratangarh` | Ratangarh | रतनगढ़ | रतनगढ़ |
| `BLK_SUJANGARH` | `Sujangarh` | Sujangarh | सुजानगढ़ | सुजानगढ़ |
| `BLK_SIKANDRA` | `Sikandra` | Sikandra | सिकंदरा | सिकंदरा |
| `BLK_SAGWARA` | `Sagwara` | Sagwara | सागवाड़ा | सागवाड़ा |
| `BLK_GALIAKOT` | `Galiakot` | Galiakot | गलियाकोट | गलियाकोट |
| `BLK_MANDOR` | `Mandor` | Mandor | मंडोर | मंडोर |
| `BLK_LUNI` | `Luni` | Luni | लूणी | लूणी |
| `BLK_SHERGADH` | `Shergadh` | Shergadh | शेरगढ़ | शेरगढ़ |

---

### Q3. Village/GP
- **Physical Column**: `VillageGP`
- **Question ID**: `Q_A_03_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q3. गांव / ग्राम पंचायत
- **Rajasthani Title**: Q3. गांव / ग्राम पंचायत
- **Display Name Formula**: `=LOOKUP("Q_A_03_00", "AppVariables", "ID", "Label")`

---

### Q4. Respondent Name
- **Physical Column**: `RespondentName`
- **Question ID**: `Q_A_04_00`
- **Type / ValueControl**: `Name`
- **Hindi Title**: Q4. उत्तरदाता का नाम
- **Rajasthani Title**: Q4. उत्तरदाता रो नाम
- **Display Name Formula**: `=LOOKUP("Q_A_04_00", "AppVariables", "ID", "Label")`

---

### Q5. Respondent’s phone number
- **Physical Column**: `ContactNumber`
- **Question ID**: `Q_A_04_01`
- **Type / ValueControl**: `Phone`
- **Hindi Title**: Q5. उत्तरदाता का फोन नंबर
- **Rajasthani Title**: Q5. उत्तरदाता रो फोन नंबर
- **Display Name Formula**: `=LOOKUP("Q_A_04_01", "AppVariables", "ID", "Label")`

---

### Q5. Respondent’s phone number
- **Physical Column**: `RespondentPhone`
- **Question ID**: `Q_A_04_01_PHONE`
- **Type / ValueControl**: `Phone`
- **Hindi Title**: Q5. उत्तरदाता का फोन नंबर
- **Rajasthani Title**: Q5. उत्तरदाता रो फोन नंबर
- **Display Name Formula**: `=LOOKUP("Q_A_04_01_PHONE", "AppVariables", "ID", "Label")`

---

### Q6. SHG Name
- **Physical Column**: `SHGName`
- **Question ID**: `Q_A_05_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q6. एसएचजी (समूह) का नाम
- **Rajasthani Title**: Q6. समूह रो नाम
- **Display Name Formula**: `=LOOKUP("Q_A_05_00", "AppVariables", "ID", "Label")`

---

### Q7. VO Name
- **Physical Column**: `VOName`
- **Question ID**: `Q_A_06_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q7. ग्राम संगठन (VO) का नाम
- **Rajasthani Title**: Q7. ग्राम संगठन रो नाम
- **Display Name Formula**: `=LOOKUP("Q_A_06_00", "AppVariables", "ID", "Label")`

---

### Q8. CLF Name
- **Physical Column**: `CLFName`
- **Question ID**: `Q_A_07_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q8. क्लस्टर लेवल फेडरेशन (CLF) का नाम
- **Rajasthani Title**: Q8. CLF रो नाम
- **Display Name Formula**: `=LOOKUP("Q_A_07_00", "AppVariables", "ID", "Label")`

---

### Q9. Years of SHG membership
- **Physical Column**: `SHGMembershipYears`
- **Question ID**: `Q_A_08_00`
- **Type / ValueControl**: `Number`
- **Hindi Title**: Q9. एसएचजी सदस्यता के वर्ष
- **Rajasthani Title**: Q9. समूह में कित्ता साल सूं हो?
- **Display Name Formula**: `=LOOKUP("Q_A_08_00", "AppVariables", "ID", "Label")`

---

### Q10. Have you been in a leadership role in SHG/CLF/VO?
- **Physical Column**: `LeadershipRole`
- **Question ID**: `Q_A_09_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q10. क्या आप SHG/CLF/VO में किसी नेतृत्वकारी पद पर रही हैं?
- **Rajasthani Title**: Q10. का थे समूह/VO/CLF में किसी पद माथे रह्या हो?
- **Display Name Formula**: `=LOOKUP("Q_A_09_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `OPT_YES` | `Yes` | Yes | हाँ | हाँ |
| `OPT_NO` | `No` | No | नहीं | कोनी / ना |

---

### Q11. Years of experience in leadership roles?
- **Physical Column**: `LeadershipYears`
- **Question ID**: `Q_A_10_00`
- **Type / ValueControl**: `Number`
- **Hindi Title**: Q11. नेतृत्वकारी पद पर कितने वर्षों का अनुभव है?
- **Rajasthani Title**: Q11. पद माथे कित्ता साल रो अनुभव है?
- **Display Name Formula**: `=LOOKUP("Q_A_10_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[LeadershipRole] = "OPT_YES" (or [LeadershipRole] = "Yes")`

---

### Q12. Are you related to any of the SVEP/OSF CRP?
- **Physical Column**: `RelatedToCRP`
- **Question ID**: `Q_A_11_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q12. क्या आप SVEP/OSF CRP की रिश्तेदार/संबंधित हैं?
- **Rajasthani Title**: Q12. का थे SVEP/OSF CRP रा रिश्तेदार हो?
- **Display Name Formula**: `=LOOKUP("Q_A_11_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `OPT_YES` | `Yes` | Yes | हाँ | हाँ |
| `OPT_NO` | `No` | No | नहीं | कोनी / ना |

---

### Q13. Type of Enterprise Promotion (EP) intervention
- **Physical Column**: `EPInterventionType`
- **Question ID**: `Q_A_12_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q13. उद्यम प्रोत्साहन (EP) हस्तक्षेप का प्रकार
- **Rajasthani Title**: Q13. उद्यम प्रोत्साहन रो तरीको
- **Display Name Formula**: `=LOOKUP("Q_A_12_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `INT_SVEP` | `SVEP` | SVEP | SVEP | SVEP |
| `INT_OSF` | `OSF` | OSF | OSF | OSF |
| `INT_OSF_PHASED` | `OSF phased out` | OSF phased out | OSF समाप्त (Phased out) | OSF बंद होग्यो |
| `INT_DONT_KNOW` | `Don't know` | Don't know | पता नहीं | ठा कोनी |

---

### Q14. Enterprise Name
- **Physical Column**: `EnterpriseName`
- **Question ID**: `Q_A_13_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q14. उद्यम / व्यवसाय का नाम
- **Rajasthani Title**: Q14. काम-धंधे रो नाम
- **Display Name Formula**: `=LOOKUP("Q_A_13_00", "AppVariables", "ID", "Label")`

---

### Parallel Enterprise Name (if running two businesses)
- **Physical Column**: `ParallelEnterpriseName`
- **Question ID**: `Q_A_13_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: समानांतर दूसरे व्यवसाय का नाम (यदि 2 व्यवसाय हैं)
- **Rajasthani Title**: दूजे काम-धंधे रो नाम
- **Display Name Formula**: `=LOOKUP("Q_A_13_01", "AppVariables", "ID", "Label")`

---

### Q15. Years of setting up enterprise
- **Physical Column**: `EnterpriseSetupYear`
- **Question ID**: `Q_A_14_00`
- **Type / ValueControl**: `Number`
- **Hindi Title**: Q15. उद्यम स्थापित करने का वर्ष / कितने वर्ष हुए
- **Rajasthani Title**: Q15. धंधो सुरू करयां कित्ता साल होया?
- **Display Name Formula**: `=LOOKUP("Q_A_14_00", "AppVariables", "ID", "Label")`

---

### Q16. Type of business enterprise (Multiselect)
- **Physical Column**: `BusinessType`
- **Question ID**: `Q_A_16_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q16. व्यवसाय का प्रकार (बहु-चयन)
- **Rajasthani Title**: Q16. काम-धंधे रो तरीको
- **Display Name Formula**: `=LOOKUP("Q_A_16_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `BTY_TRADING` | `Trading` | Trading | व्यापार / ट्रेडिंग | खरीद-बिक्री (ट्रेडिंग) |
| `BTY_SERVICING` | `Servicing` | Servicing | सेवा / सर्विसिंग | सेवा (सर्विसिंग) |
| `BTY_MANUFACTURING` | `Manufacturing / production` | Manufacturing / production | उत्पादन / विनिर्माण | बणावण रो काम (उत्पादन) |

---

### Q17. Main business activities of the enterprise (Multiselect)
- **Physical Column**: `BusinessActivities`
- **Question ID**: `Q_A_17_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q17. उद्यम की मुख्य व्यावसायिक गतिविधियां (बहु-चयन)
- **Rajasthani Title**: Q17. उद्यम री मुख्य गतिविधियां
- **Display Name Formula**: `=LOOKUP("Q_A_17_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `ACT_VEG_FRUIT` | `Vegetable / Fruit` | [T] Vegetable / Fruit | [T] सब्जी / फल | [T] सब्जी / फल |
| `ACT_GROCERY` | `Grocery` | [T] Grocery | [T] किराना | [T] किराणा |
| `ACT_FANCY_STORE` | `Fancy / Cosmetic / General store` | [T] Fancy / Cosmetic / General store | [T] फैंसी / कॉस्मेटिक / जनरल स्टोर | [T] प्रसाधन / जनरल स्टोर |
| `ACT_APPAREL` | `Apparel / fabric` | [T] Apparel / fabric | [T] कपड़ा / रेडीमेड वस्त्र | [T] कपड़ा / वेशभूषा |
| `ACT_ELECTRIC_GOODS` | `Electric goods` | [T] Electric goods | [T] इलेक्ट्रिक सामान | [T] बिजली रो सामान |
| `ACT_STONE_SHOP` | `Stone shop` | [T] Stone shop | [T] पत्थर की दुकान | [T] भाटां/पत्थर री दुकान |
| `ACT_AGRI_INPUT` | `Agri-input retail` | [T] Agri-input retail | [T] कृषि आदान खुदरा (Agri-input retail) | [T] खाद-बीज री दुकान |
| `ACT_AI_BREEDING` | `AI/breeding kits` | [T] AI / breeding kits | [T] कृत्रिम गर्भाधान (AI) / ब्रीडिंग किट | [T] पशु गर्भाधान / ब्रीडिंग किट |
| `ACT_GOAT_TRADING` | `Goat trading` | [T] Goat trading | [T] बकरी व्यापार / पशु क्रय-विक्रय | [T] बकरी लेन-देन / बकरा व्यापार |
| `ACT_FLOUR_MILL` | `Flour mill (Chakki)` | [S] Flour mill (Chakki) | [S] आटा चक्की | [S] आटा चक्की |
| `ACT_TAILORING` | `Tailoring` | [S] Tailoring | [S] सिलाई / टेलरिंग | [S] सिलाई / दर्जी काम |
| `ACT_BEAUTY_PARLOUR` | `Beauty parlour` | [S] Beauty parlour | [S] ब्यूटी पार्लर | [S] ब्यूटी पार्लर |
| `ACT_AUTO_REPAIR` | `Auto-mechanic / two-wheeler repair` | [S] Auto-mechanic / two-wheeler repair | [S] ऑटो मैकेनिक / दोपहिया मरम्मत | [S] गाड़ी/मोटरसाइकिल मिस्त्री |
| `ACT_EMITRA` | `E-mitra / Online kiosk` | [S] E-mitra / Online kiosk | [S] ई-मित्र / ऑनलाइन केंद्र | [S] ई-मित्र केंद्र |
| `ACT_TRANSPORT` | `Transport` | [S] Transport | [S] परिवहन / वाहन | [S] गाड़ी भाड़ा / परिवहन |
| `ACT_TENT_HOUSE` | `Tent house` | [S] Tent house | [S] टेंट हाउस | [S] टेंट हाउस |
| `ACT_MOBILE_REPAIR` | `Mobile repair shop` | [S] Mobile repair shop | [S] मोबाइल रिपेयर दुकान | [S] मोबाइल ठीक करण री दुकान |
| `ACT_STONE_CUTTING` | `Stone cutting` | [S] Stone cutting | [S] पत्थर कटाई | [S] पत्थर कटाई |
| `ACT_SANITARY_NAPKIN` | `Sanitary napkin making` | [P] Sanitary napkin making | [P] सैनिटरी नैपकिन निर्माण | [P] सैनिटरी पैड बणावण |
| `ACT_HANDICRAFT` | `Handicraft` | [P] Handicraft | [P] हस्तशिल्प / कसीदाकारी | [P] हाथ रो काम / कसीदाकारी |
| `ACT_DAIRY_MILK` | `Dairy shop / Milk collection centre` | [P] Dairy shop / Milk collection centre | [P] डेयरी दुकान / दुग्ध संकलन केंद्र | [P] दूध डेरी / संकलन केंद्र |
| `ACT_JUICE` | `Juice` | [P] Juice | [P] जूस की दुकान | [P] जूस री दुकान |
| `ACT_FOOD_PROCESSING` | `Food processing (pickle/badi/papad)` | [P] Food processing (pickle/badi/papad) | [P] खाद्य प्रसंस्करण (अचार/बड़ी/पापड़ निर्माण) | [P] अचार, पापड़, बड़ी बणावण |
| `ACT_FOOD_MAKING` | `Food making (Sweets/Namkeen/hotel)` | [P] Food making (Sweets/Namkeen/hotel) | [P] मिठाई / नमकीन / ढाबा / होटल | [P] मिठाई / नमकीन / होटल |
| `ACT_SWEET_BOX` | `Sweet box making` | [P] Sweet box making | [P] मिठाई के डिब्बे बनाना | [P] मिठाई रा डिब्बा बणावण |
| `ACT_FLAG_MAKING` | `Flag making` | [P] Flag making | [P] झंडा निर्माण | [P] झंडा बणावण |
| `ACT_LEATHER_PRODUCTS` | `Leather products` | [P] Leather products | [P] चमड़े के उत्पाद / जूते | [P] चामड़ा रो काम / जूता |
| `ACT_STONE_IDOLS` | `Stone idols` | [P] Stone idols | [P] पत्थर की मूर्तियां | [P] पत्थर री मूर्तियां बणावण |
| `ACT_ANY_OTHER` | `Any other activity` | Any other activity | अन्य कोई गतिविधि | दूजो कोई काम |

---

### Specify other business activity
- **Physical Column**: `BusinessActivitiesOther`
- **Question ID**: `Q_A_17_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य व्यावसायिक गतिविधि बताएं
- **Rajasthani Title**: दूजी गतिविधि बताओ
- **Display Name Formula**: `=LOOKUP("Q_A_17_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("ACT_ANY_OTHER", [BusinessActivities])`

---

### Q18. Years of receiving SVEP/OSF loan?
- **Physical Column**: `LoanReceivedYear`
- **Question ID**: `Q_A_15_00`
- **Type / ValueControl**: `Number`
- **Hindi Title**: Q18. SVEP/OSF ऋण प्राप्त करने का वर्ष
- **Rajasthani Title**: Q18. SVEP/OSF लोन किण साल मिल्यो?
- **Display Name Formula**: `=LOOKUP("Q_A_15_00", "AppVariables", "ID", "Label")`

---

### Q19. Do you maintain separate records for all the businesses
- **Physical Column**: `MaintainSeparateRecords`
- **Question ID**: `Q_A_18_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q19. क्या आप सभी व्यवसायों के लिए अलग-अलग रिकॉर्ड रखती हैं?
- **Rajasthani Title**: Q19. का थे सगळा धंधां रो अलग-अलग खातो रखो हो?
- **Display Name Formula**: `=LOOKUP("Q_A_18_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `OPT_YES` | `Yes` | Yes | हाँ | हाँ |
| `OPT_NO` | `No` | No | नहीं | कोनी / ना |

---

### Q20. Do you have the following registrations/documents?
- **Physical Column**: `RegistrationsDocuments`
- **Question ID**: `Q_A_19_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q20. क्या आपके पास निम्नलिखित पंजीकरण / दस्तावेज हैं?
- **Rajasthani Title**: Q20. का थारे कनै ये कागज-पत्तर / रजिस्ट्रेशन है?
- **Display Name Formula**: `=LOOKUP("Q_A_19_00", "AppVariables", "ID", "Label")`

---

### Q1. What is the age of the respondent?
- **Physical Column**: `RespondentAge`
- **Question ID**: `Q_B_01_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q1. उत्तरदाता की आयु क्या है?
- **Rajasthani Title**: Q1. उत्तरदाता री उमर कित्ती है?
- **Display Name Formula**: `=LOOKUP("Q_B_01_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `AGE_18_25` | `18-25` | 18-25 | 18-25 वर्ष | 18-25 साल |
| `AGE_26_35` | `26-35` | 26-35 | 26-35 वर्ष | 26-35 साल |
| `AGE_36_45` | `36-45` | 36-45 | 36-45 वर्ष | 36-45 साल |
| `AGE_46_55` | `46-55` | 46-55 | 46-55 वर्ष | 46-55 साल |
| `AGE_ABOVE_55` | `Above 55` | Above 55 | 55 वर्ष से अधिक | 55 साल सूं बत्ता |

---

### Q2. What is the marital status?
- **Physical Column**: `MaritalStatus`
- **Question ID**: `Q_B_02_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q2. वैवाहिक स्थिति क्या है?
- **Rajasthani Title**: Q2. ब्याव री स्थिति काईं है?
- **Display Name Formula**: `=LOOKUP("Q_B_02_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `MAR_SINGLE` | `Single` | Single | अविवाहित | अणपरणी / कुंवारी |
| `MAR_MARRIED` | `Married` | Married | विवाहित | परणी |
| `MAR_WIDOWED` | `Widowed` | Widowed | विधवा | रांड/विधवा |
| `MAR_SEPARATED` | `Separated` | Separated | परित्यक्ता / अलग | अलग रहवै |
| `MAR_DIVORCED` | `Divorced` | Divorced | तलाकशुदा | तलाकशुदा |

---

### Q3. What is the social category?
- **Physical Column**: `SocialCategory`
- **Question ID**: `Q_B_03_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q3. सामाजिक वर्ग / श्रेणी क्या है?
- **Rajasthani Title**: Q3. सामाजिक वर्ग काईं है?
- **Display Name Formula**: `=LOOKUP("Q_B_03_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `CST_SC` | `SC` | SC | अनुसूचित जाति (SC) | अनुसूचित जाति (SC) |
| `CST_ST` | `ST` | ST | अनुसूचित जनजाति (ST) | अनुसूचित जनजाति (ST) |
| `CST_OBC` | `OBC` | OBC | अन्य पिछड़ा वर्ग (OBC) | अन्य पिछड़ा वर्ग (OBC) |
| `CST_GEN` | `General` | General | सामान्य (General) | सामान्य (General) |

---

### Q4. What is the education status?
- **Physical Column**: `EducationStatus`
- **Question ID**: `Q_B_04_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q4. शैक्षणिक योग्यता क्या है?
- **Rajasthani Title**: Q4. पढ़ाई-लिखाई कित्ती है?
- **Display Name Formula**: `=LOOKUP("Q_B_04_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `EDU_ILLITERATE` | `Illiterate` | Illiterate | निरक्षर | अणपढ़ |
| `EDU_ILLITERATE_CALC` | `Illiterate but able to calculate` | Illiterate but able to calculate | निरक्षर लेकिन हिसाब-किताब में सक्षम | अणपढ़ पण हिसाब-किताब जांणै |
| `EDU_5TH` | `Upto 5th` | Upto 5th | 5वीं तक | 5वीं तांई |
| `EDU_8TH` | `Upto 8th` | Upto 8th | 8वीं तक | 8वीं तांई |
| `EDU_10TH` | `Upto 10th` | Upto 10th | 10वीं तक | 10वीं तांई |
| `EDU_12TH` | `Upto 12th` | Upto 12th | 12वीं तक | 12वीं तांई |
| `EDU_DIPLOMA` | `Diploma` | Diploma | डिप्लोमा | डिप्लोमा |
| `EDU_GRADUATE` | `Graduate` | Graduate | स्नातक (Graduate) | कॉलेज पास (ग्रेजुएट) |
| `EDU_BED` | `B.Ed` | B.Ed | बी.एड (B.Ed) | बी.एड |

---

### Q5. How many members are in the family? ------- (count)
- **Physical Column**: `FamilyMemberCount`
- **Question ID**: `Q_B_05_00`
- **Type / ValueControl**: `Number`
- **Hindi Title**: Q5. परिवार में कुल कितने सदस्य हैं? ------- (संख्या)
- **Rajasthani Title**: Q5. कुटुंब में कुल कित्ता जणा है? ------- (गिनती)
- **Display Name Formula**: `=LOOKUP("Q_B_05_00", "AppVariables", "ID", "Label")`

---

### Q6. Give details of the family members? (count)
- **Physical Column**: `SubTable_FamilyCount`
- **Question ID**: `Q_B_05`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q6. परिवार के सदस्यों का विवरण दें? (गिनती)
- **Rajasthani Title**: Q6. घर रा जणां रो ब्योरो देवो? (गिनती)
- **Display Name Formula**: `=LOOKUP("Q_B_05", "AppVariables", "ID", "Label")`

---

### Adults (Above 18)-------
- **Physical Column**: `FamilyAdultsCount`
- **Question ID**: `Q_B_06_01`
- **Type / ValueControl**: `Number`
- **Hindi Title**: वयस्क (18 वर्ष से अधिक)-------
- **Rajasthani Title**: बड़ा जणा (18 सूं ऊपर)-------
- **Display Name Formula**: `=LOOKUP("Q_B_06_01", "AppVariables", "ID", "Label")`

---

### Children —-------
- **Physical Column**: `FamilyChildrenCount`
- **Question ID**: `Q_B_06_02`
- **Type / ValueControl**: `Number`
- **Hindi Title**: बच्चे (18 वर्ष से कम)-------
- **Rajasthani Title**: टाबर (18 सूं कम)-------
- **Display Name Formula**: `=LOOKUP("Q_B_06_02", "AppVariables", "ID", "Label")`

---

### Total earning members ------
- **Physical Column**: `FamilyTotalEarning`
- **Question ID**: `Q_B_06_03`
- **Type / ValueControl**: `Number`
- **Hindi Title**: कुल कमाने वाले सदस्य ------
- **Rajasthani Title**: कुल कमावणिया जणा ------
- **Display Name Formula**: `=LOOKUP("Q_B_06_03", "AppVariables", "ID", "Label")`

---

### Male earning members—----
- **Physical Column**: `FamilyMaleEarning`
- **Question ID**: `Q_B_06_04`
- **Type / ValueControl**: `Number`
- **Hindi Title**: पुरुष कमाने वाले सदस्य ------
- **Rajasthani Title**: कमावणिया पुरुष ------
- **Display Name Formula**: `=LOOKUP("Q_B_06_04", "AppVariables", "ID", "Label")`

---

### Female earning members—----
- **Physical Column**: `FamilyFemaleEarning`
- **Question ID**: `Q_B_06_05`
- **Type / ValueControl**: `Number`
- **Hindi Title**: महिला कमाने वाली सदस्य ------
- **Rajasthani Title**: कमावणिया लुगायां ------
- **Display Name Formula**: `=LOOKUP("Q_B_06_05", "AppVariables", "ID", "Label")`

---

### Members with disability-------
- **Physical Column**: `FamilyDisabledCount`
- **Question ID**: `Q_B_06_06`
- **Type / ValueControl**: `Number`
- **Hindi Title**: दिव्यांग सदस्य -------
- **Rajasthani Title**: दिव्यांग जणा -------
- **Display Name Formula**: `=LOOKUP("Q_B_06_06", "AppVariables", "ID", "Label")`

---

### Q7. What are your family’s sources of income? (Multiselect)
- **Physical Column**: `FamilyIncomeSources`
- **Question ID**: `Q_B_07_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q7. आपके परिवार की आय के स्रोत क्या हैं? (बहु-चयन)
- **Rajasthani Title**: Q7. थारे घर री कमाई रा साधन काईं है?
- **Display Name Formula**: `=LOOKUP("Q_B_07_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `INC_AGRI` | `Agricultural income` | Agricultural income | कृषि आय | खेती-बाड़ी री कमाई |
| `INC_SALARY` | `Fixed Salary` | Fixed Salary | नियमित वेतन / नौकरी | पक्की तनख्वाह / नौकरी |
| `INC_WAGES` | `Wages` | Wages | दैनिक मजदूरी | मजूरी |
| `INC_SELF_EMP` | `Self employed` | Self employed | स्वरोजगार | खुद रो रोजगार |
| `INC_NTFP` | `NTFP sale` | NTFP sale | लघु वनोपज (NTFP) बिक्री | जंगल री उपज बेचान |
| `INC_DAIRY` | `Dairying` | Dairying | डेयरी व्यवसाय | दूध-डेरी रो काम |
| `INC_ANIMAL_SALE` | `Sale of animals` | Sale of animals | पशु बिक्री (जानवरों का बेचना) | पशु बेचना / लेन-देन |
| `INC_ANIMAL_PROD` | `Animal products` | Animal products | पशु उत्पाद बिक्री | पशु उत्पाद बेचान |
| `INC_FAMILY_ENT` | `Family/husband's enterprise` | Family/husband's enterprise | परिवार / पति का उद्यम | घर रो / धणी रो धंधो |
| `INC_RESP_ENT` | `Respondent's enterprise` | Respondent's enterprise | उत्तरदाता का स्वयं का उद्यम | थारो खुद रो धंधो |
| `INC_MNREGA` | `MNREGA` | MNREGA | मनरेगा | नरेगा मजूरी |
| `INC_PENSION` | `Pension` | Pension | पेंशन | पेंशन |
| `INC_RENT` | `Rent from properties` | Rent from properties | मकान / दुकान किराया | किरायो |
| `INC_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई स्रोत (विवरण दें) | दूजो कोई स्रोत |

---

### Q7.1 Sale of animals (Specify details / type of animals)
- **Physical Column**: `FamilyIncome_AnimalSale_Specify`
- **Question ID**: `Q_B_07_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q7.1 पशु बिक्री का विवरण (कौन से पशु / विवरण दें)
- **Rajasthani Title**: Q7.1 पशु बिक्री रो विवरण (कुणसा पशु / ब्यौरो)
- **Display Name Formula**: `=LOOKUP("Q_B_07_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("INC_ANIMAL_SALE", [FamilyIncomeSources]) (or IN("Sale of animals", [FamilyIncomeSources]))`

---

### Q7.2 Any other source of income (Specify)
- **Physical Column**: `FamilyIncomeSourcesOther`
- **Question ID**: `Q_B_07_02`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q7.2 अन्य आय का स्रोत (विवरण दें)
- **Rajasthani Title**: Q7.2 दूजी आमदनी रो स्रोत (ब्यौरो दो)
- **Display Name Formula**: `=LOOKUP("Q_B_07_02", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("INC_OTHER", [FamilyIncomeSources]) (or IN("Any other, specify", [FamilyIncomeSources]))`

---

### Q8. What is your annual household income and monetary benefits from all sources (including respondent’s enterprise)?
- **Physical Column**: `AnnualHouseholdIncome`
- **Question ID**: `Q_B_08_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q8. सभी स्रोतों से आपकी वार्षिक पारिवारिक आय कितनी है (उद्यम सहित)?
- **Rajasthani Title**: Q8. सगळा साधनां सूं साल री कुल कमाई कित्ती है?
- **Display Name Formula**: `=LOOKUP("Q_B_08_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `INC_LT_80K` | `Less than Rs 80,000` | Less than Rs 80,000 | रु 80,000 से कम | 80 हजार सूं कम |
| `INC_80K_120K` | `Rs 80,000 to Rs 1,20,000` | Rs 80,000 to Rs 1,20,000 | रु 80,000 से रु 1,20,000 | 80 हजार सूं 1 लाख 20 हजार |
| `INC_120K_160K` | `Rs 1,20,000 to Rs 1,60,000` | Rs 1,20,000 to Rs 1,60,000 | रु 1,20,000 से रु 1,60,000 | 1.20 लाख सूं 1.60 लाख |
| `INC_160K_200K` | `Rs 1,60,000 to Rs 2,00,000` | Rs 1,60,000 to Rs 2,00,000 | रु 1,60,000 से रु 2,00,000 | 1.60 लाख सूं 2 लाख |
| `INC_200K_240K` | `Rs 2,00,000 to Rs 2,40,000` | Rs 2,00,000 to Rs 2,40,000 | रु 2,00,000 से रु 2,40,000 | 2 लाख सूं 2.40 लाख |
| `INC_240K_280K` | `Rs 2,40,000 to Rs 2,80,000` | Rs 2,40,000 to Rs 2,80,000 | रु 2,40,000 से रु 2,80,000 | 2.40 लाख सूं 2.80 लाख |
| `INC_280K_320K` | `Rs 2,80,000 to Rs 3,20,000` | Rs 2,80,000 to Rs 3,20,000 | रु 2,80,000 से रु 3,20,000 | 2.80 लाख सूं 3.20 लाख |
| `INC_320K_360K` | `Rs 3,20,000 to Rs 3,60,000` | Rs 3,20,000 to Rs 3,60,000 | रु 3,20,000 से रु 3,60,000 | 3.20 लाख सूं 3.60 लाख |
| `INC_GT_360K` | `Above Rs 3,60,000` | Above Rs 3,60,000 | रु 3,60,000 से अधिक | 3 लाख 60 हजार सूं बत्ता |

---

### Q1. Reasons for starting the business? (Multiselect)
- **Physical Column**: `ReasonsStartingBusiness`
- **Question ID**: `Q_C_01_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q1. व्यवसाय शुरू करने के क्या कारण थे? (बहु-चयन)
- **Rajasthani Title**: Q1. काम-धंधो सुरू करण रा काईं कारण हा?
- **Display Name Formula**: `=LOOKUP("Q_C_01_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `RSN_SETBACK` | `My family faced a financial setback, and I needed to earn` | My family faced a financial setback, and I needed to earn | परिवार को आर्थिक संकट का सामना करना पड़ा और मुझे कमाना पड़ा | घर में तंगी आग्यी ही, इस वास्ते कमावणो पड़्यो |
| `RSN_RISING_EXP` | `Our expenses were rising, and my family needed an alternate source of income` | Our expenses were rising, and my family needed an alternate source of income | खर्च बढ़ रहे थे और परिवार को अतिरिक्त आय की आवश्यकता थी | खर्चा बढ़ग्या हा और दूजी कमाई री जरूरत ही |
| `RSN_OWN_VENTURE` | `I always wanted to own/run my own business` | I always wanted to own/run my own business | मेरी हमेशा से अपना व्यवसाय चलाने की इच्छा थी | म्हारी खुद रो धंधो चलावण री इच्छा ही |
| `RSN_LEARNT_SKILL` | `I learnt the skill and wanted to start my own venture` | I learnt the skill and wanted to start my own venture | मैंने हुनर सीखा और अपना काम शुरू करना चाहा | काम सीख्यो और खुद रो धंधो सुरू करयो |
| `RSN_FROM_WAGE` | `I was doing the same work as wage labour and later decided to start own venture` | I was doing the same work as wage labour and later decided to start own venture | मैं मजदूरी करती थी और बाद में खुद का उद्यम शुरू करने का फैसला किया | पैली मजूरी करती ही, फेर खुद रो काम सुरू करयो |
| `RSN_ALL_SHG_LOAN` | `All SHG members were getting loans for enterprise so I also decided to take and start` | All SHG members were getting loans for enterprise so I also decided to take and start | सभी SHG सदस्यों को लोन मिल रहा था तो मैंने भी उद्यम शुरू किया | सगळी बाईयां लोन लेवती ही तो म्हैं भी लोन लियो |
| `RSN_CRP_ENCOURAGED` | `The OSF/SVEP CRP encouraged me to start the enterprise` | The OSF/SVEP CRP encouraged me to start the enterprise | OSF/SVEP सीआरपी ने मुझे उद्यम शुरू करने के लिए प्रेरित किया | सीआरपी दीदी हौसलो दियो और काम सुरू करवायो |
| `RSN_CLF_ENCOURAGED` | `The CLF encouraged me to start the enterprise` | The CLF encouraged me to start the enterprise | सीएलएफ ने मुझे उद्यम शुरू करने के लिए प्रेरित किया | सीएलएफ सूं प्रेरणा मिली |

---

### Q2. Describe your business cycle?
- **Physical Column**: `BusinessCycle`
- **Question ID**: `Q_C_02_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q2. अपने व्यवसाय चक्र का विवरण दें?
- **Rajasthani Title**: Q2. काम-धंधो किण चक्र में चालै?
- **Display Name Formula**: `=LOOKUP("Q_C_02_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `CYC_REGULAR_HOURS` | `Operational for regular hours throughout the year` | Operational for regular hours throughout the year | पूरे वर्ष नियमित घंटों तक संचालित | पूरे साल रोज बंध्या टेम पर खुलै |
| `CYC_WHENEVER_CUSTOMER` | `Operational whenever the customer arrives throughout the year` | Operational whenever the customer arrives throughout the year | पूरे वर्ष जब भी ग्राहक आए तब संचालित | पूरे साल जद भी ग्राहक आवै जद खुलै |
| `CYC_BOTH_ROUND_YEAR` | `Both production and sales operational throughout the year` | Both production and sales operational throughout the year | पूरे वर्ष उत्पादन और बिक्री दोनों चालू रहते हैं | पूरे साल माल बणावण और बेचण रो काम चालै |
| `CYC_ON_ORDER_ONLY` | `Production and sale only on receiving order` | Production and sale only on receiving order | केवल ऑर्डर मिलने पर उत्पादन और बिक्री | ऑर्डर मिल्या पर ही माल बणावै और बेचै |
| `CYC_SEASONAL_ROUND` | `Seasonal production and sale throughout the year` | Seasonal production and sale throughout the year | मौसमी उत्पादन लेकिन पूरे साल बिक्री | मौसम में माल बणै पण पूरे साल बिकै |
| `CYC_FEW_MONTHS` | `Production and sale is limited to few months` | Production and sale is limited to few months | उत्पादन और बिक्री कुछ महीनों तक सीमित | साल में बस कुछेक महिना ही काम चालै |
| `CYC_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई, विवरण दें | दूजो कोई प्रकार |

---

### Specify other business cycle
- **Physical Column**: `BusinessCycleOther`
- **Question ID**: `Q_C_02_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य व्यवसाय चक्र बताएं
- **Rajasthani Title**: दूजो तरीको बताओ
- **Display Name Formula**: `=LOOKUP("Q_C_02_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[BusinessCycle] = "CYC_OTHER"`

---

### Q3. What is the type of business place?
- **Physical Column**: `BusinessPlaceType`
- **Question ID**: `Q_C_03_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q3. व्यावसायिक स्थान किस प्रकार का है?
- **Rajasthani Title**: Q3. दुकान/काम री जगह किकण री है?
- **Display Name Formula**: `=LOOKUP("Q_C_03_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PLC_OWN` | `Own` | Own | स्वयं की जगह / दुकान | खुद री जगह |
| `PLC_RENTED` | `Rented` | Rented | किराए की जगह / दुकान | किराये री जगह |

---

### Q4. If rented, what is monthly rent? Rs______( mention in numbers)
- **Physical Column**: `AnnualRent`
- **Question ID**: `Q_C_04_00`
- **Type / ValueControl**: `Decimal`
- **Hindi Title**: Q4. यदि किराए पर है तो मासिक किराया कितना है? (रु)
- **Rajasthani Title**: Q4. किराए री है तो महिना रो कित्तो भाड़ो है? (रु)
- **Display Name Formula**: `=LOOKUP("Q_C_04_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[BusinessPlaceType] = "PLC_RENTED"`

---

### Q5. Is the location of your premise convenient for your customers?
- **Physical Column**: `LocationConvenience`
- **Question ID**: `Q_C_05_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q5. क्या आपके परिसर का स्थान ग्राहकों के लिए सुविधाजनक है?
- **Rajasthani Title**: Q5. का दुकान री जगह ग्राहकां खातर ठीक है?
- **Display Name Formula**: `=LOOKUP("Q_C_05_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `LOC_CONVENIENT` | `Yes, my location is very convenient to attract customers` | Yes, my location is very convenient to attract customers | हाँ, ग्राहकों को आकर्षित करने के लिए स्थान बहुत सुविधाजनक है | हाँ, गिराहक आराम सूं आवै, बढ़िया जगह छै |
| `LOC_CHANGED_LOC` | `Yes, I changed my location to get the clients` | Yes, I changed my location to get the clients | हाँ, ग्राहकों के लिए मैंने अपना स्थान बदला | हाँ, गिराहकां खातर जगह बदली |
| `LOC_HOME_CANT_MOVE` | `No, but I operate from home and can’t move to other location` | No, but I operate from home and can’t move to other location | नहीं, लेकिन मैं घर से काम करती हूँ और दूसरी जगह नहीं जा सकती | ना, पण घर सूं काम करां, बाहर नीं जा सका |
| `LOC_AFFORD_ONLY` | `No, but I can afford only this space` | No, but I can afford only this space | नहीं, लेकिन मैं केवल इसी जगह का खर्च उठा सकती हूँ | ना, पण म्हारे बजट में आ ही जगह ही |
| `LOC_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई, विवरण दें | दूजी कोई बात |

---

### Specify other location convenience remark
- **Physical Column**: `LocationConvenienceOther`
- **Question ID**: `Q_C_05_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य स्थान टिप्पणी बताएं
- **Rajasthani Title**: दूजी बात बताओ
- **Display Name Formula**: `=LOOKUP("Q_C_05_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[LocationConvenience] = "LOC_OTHER"`

---

### Q6. Involvement of family members and hired help in business operations
- **Physical Column**: `Related_Q6_Labor`
- **Question ID**: `Q_C_06_00`
- **Type / ValueControl**: `InlineTable`
- **Hindi Title**: Q6. व्यवसाय में परिवार के सदस्यों और hired help की भागीदारी
- **Rajasthani Title**: Q6. काम-धंधे में घर रा जणां अर मजूरां री भागीदारी
- **Display Name Formula**: `=LOOKUP("Q_C_06_00", "AppVariables", "ID", "Label")`

---

### Nearby town/district         (0%/25%/50%/75%/100%)
- **Physical Column**: `Sourcing_NearbyTown_Pct`
- **Question ID**: `Q_C_07_01`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: आसपास के कस्बे / जिले से कच्चा माल (0%/25%/50%/75%/100%)
- **Rajasthani Title**: नेड़े रा कस्बा/जिले सूं माल (0%/25%/50%/75%/100%)
- **Display Name Formula**: `=LOOKUP("Q_C_07_01", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT_0` | `0%` | 0% | 0% | 0% |
| `PCT_25` | `25%` | 25% | 25% | 25% |
| `PCT_50` | `50%` | 50% | 50% | 50% |
| `PCT_75` | `75%` | 75% | 75% | 75% |
| `PCT_100` | `100%` | 100% | 100% | 100% |

---

### Wholesale market within state    (0%/25%/50%/75%/100%)
- **Physical Column**: `Sourcing_Jaipur_Pct`
- **Question ID**: `Q_C_07_02`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: राज्य के भीतर थोक बाजार से कच्चा माल (0%/25%/50%/75%/100%)
- **Rajasthani Title**: राजस्थान रा थोक बाजार सूं माल (0%/25%/50%/75%/100%)
- **Display Name Formula**: `=LOOKUP("Q_C_07_02", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT_0` | `0%` | 0% | 0% | 0% |
| `PCT_25` | `25%` | 25% | 25% | 25% |
| `PCT_50` | `50%` | 50% | 50% | 50% |
| `PCT_75` | `75%` | 75% | 75% | 75% |
| `PCT_100` | `100%` | 100% | 100% | 100% |

---

### Wholesale market outside the state    (0%/25%/50%/75%/100%)
- **Physical Column**: `Sourcing_OutsideState_Pct`
- **Question ID**: `Q_C_07_03`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: राज्य के बाहर थोक बाजार से कच्चा माल (0%/25%/50%/75%/100%)
- **Rajasthani Title**: बाहर रा थोक बाजार सूं माल (0%/25%/50%/75%/100%)
- **Display Name Formula**: `=LOOKUP("Q_C_07_03", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT_0` | `0%` | 0% | 0% | 0% |
| `PCT_25` | `25%` | 25% | 25% | 25% |
| `PCT_50` | `50%` | 50% | 50% | 50% |
| `PCT_75` | `75%` | 75% | 75% | 75% |
| `PCT_100` | `100%` | 100% | 100% | 100% |

---

### Order online (Amazon/Misho)   (0%/25%/50%/75%/100%)
- **Physical Column**: `Sourcing_Online_Pct`
- **Question ID**: `Q_C_07_04`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: ऑनलाइन ऑर्डर (Amazon/Meesho) से कच्चा माल (0%/25%/50%/75%/100%)
- **Rajasthani Title**: ऑनलाइन ऑर्डर सूं माल (0%/25%/50%/75%/100%)
- **Display Name Formula**: `=LOOKUP("Q_C_07_04", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT_0` | `0%` | 0% | 0% | 0% |
| `PCT_25` | `25%` | 25% | 25% | 25% |
| `PCT_50` | `50%` | 50% | 50% | 50% |
| `PCT_75` | `75%` | 75% | 75% | 75% |
| `PCT_100` | `100%` | 100% | 100% | 100% |

---

### Q8. How do you market your products/services? (Multiselect)
- **Physical Column**: `MarketingMethods`
- **Question ID**: `Q_C_08_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q8. आप अपने उत्पादों / सेवाओं का विपणन (मार्केटिंग) कैसे करती हैं?
- **Rajasthani Title**: Q8. थे आपरे माल री मार्केटिंग किकण करो हो?
- **Display Name Formula**: `=LOOKUP("Q_C_08_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `MKT_SHOP_ONLY` | `My shop is the only place where I talk about my products/services` | My shop is the only place where I talk about my products/services | दुकान ही एकमात्र जगह है जहाँ मैं प्रचार करती हूँ | दुकान पर ही माल री बात करां |
| `MKT_NAME_BOARD` | `I have name board outside my premises with details of my products/services` | I have name board outside my premises with details of my products/services | दुकान/घर के बाहर बोर्ड लगा है जिस पर मेरे उत्पादों/सेवाओं का विवरण है | दुकान/घर रै बारै बोर्ड लाग्यो है जिण पै म्हारे माल/सेवावां रो ब्यौरो है |
| `MKT_DOOR_TO_DOOR` | `I visit local traders/shopkeepers and do door to door selling` | I visit local traders/shopkeepers and do door to door selling | व्यापारियों के पास जाती हूँ और घर-घर जाकर बेचती हूँ | घर-घर जा र माल बेचां |
| `MKT_SHG_MEETINGS` | `I talk about my products/services in SHG meetings` | I talk about my products/services in SHG meetings | SHG बैठकों में अपने उत्पादों/सेवाओं की बात करती हूँ | समूह री मीटिंग में बात करां |
| `MKT_TRADERS_SAMPLES` | `I visit local traders/shopkeepers with samples of my products` | I visit local traders/shopkeepers with samples of my products | व्यापारियों को उत्पाद के नमूने (सैंपल) दिखाती हूँ | व्यापारियां नें सैंपल दिखावां |
| `MKT_INSTA_WHATSAPP` | `I market actively on instagram and whatsapp` | I market actively on instagram and whatsapp | मैं इंस्टाग्राम और व्हाट्सएप पर सक्रिय रूप से प्रचार/मार्केटिंग करती हूँ | म्हे इंस्टाग्राम अर व्हाट्सएप पै प्रचार करां |
| `MKT_WAIT_ENQUIRIES` | `I wait for people to make enquiries` | I wait for people to make enquiries | ग्राहकों के स्वयं पूछताछ करने का इंतजार करती हूँ | गिराहक आवै जद ही बात करां |
| `MKT_DONT_KNOW_HOW` | `I do not know how to market my products/services` | I do not know how to market my products/services | मुझे नहीं पता कि मार्केटिंग/प्रचार कैसे करें | म्हानें प्रचार करणो कोनी आवै |
| `MKT_NO_NEED` | `I don't feel the need to market my products/services` | I don't feel the need to market my products/services | मुझे प्रचार करने की आवश्यकता महसूस नहीं होती | प्रचार करण री जरूरत कोनी लागै |
| `MKT_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई, विवरण दें | दूजो कोई तरीको |

---

### Specify other marketing method
- **Physical Column**: `MarketingMethodsOther`
- **Question ID**: `Q_C_08_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य मार्केटिंग तरीका बताएं
- **Rajasthani Title**: दूजो तरीको बताओ
- **Display Name Formula**: `=LOOKUP("Q_C_08_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("MKT_OTHER", [MarketingMethods])`

---

### Q9. How do you sell your products/services?
- **Physical Column**: `SeasonalSalesMethod`
- **Question ID**: `Q_C_09_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q9. आप अपने उत्पादों/सेवाओं को कैसे बेचते हैं?
- **Rajasthani Title**: Q9. थे आपरा उत्पाद/सेवावां किकण बेचो हो?
- **Display Name Formula**: `=LOOKUP("Q_C_09_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `SEL_NOT_REL` | `Not relevant` | Not relevant | लागू नहीं / प्रासंगिक नहीं | लागू कोनी |
| `SEL_PRODUCE_WAIT_ORDERS` | `In case of production related business, I produce slightly more than my last year sales and wait for orders` | In case of production related business, I produce slightly more than my last year sales and wait for orders | उत्पादन से जुड़े व्यवसाय में, मैं पिछले साल की बिक्री से थोड़ा अधिक उत्पादन करती हूँ और ऑर्डर का इंतजार करती हूँ | उत्पादन काम में, म्हे पाछले साल सूं थोड़ो बत्ती माल बणा’र आर्डर री बाट जोवां |
| `SEL_DOOR_TO_DOOR` | `I visit local traders/shopkeepers with my products and do door to door selling` | I visit local traders/shopkeepers with my products and do door to door selling | मैं अपने उत्पादों के साथ स्थानीय व्यापारियों/दुकानदारों के पास जाती हूँ और घर-घर जाकर बिक्री करती हूँ | म्हे माल ले’र दुकानदारां कनै अर घरे-घरे जा’र बेचण रो काम करां |
| `SEL_PRIOR_ORDERS` | `I take orders from my usual clients few weeks prior to production/peak season and then sell` | I take orders from my usual clients few weeks prior to production/peak season and then sell | मैं उत्पादन/पीक सीजन से कुछ हफ्ते पहले अपने नियमित ग्राहकों से ऑर्डर लेती हूँ और फिर बेचती हूँ | म्हे सीजन सूं पैली ई गिरायकां सूं आर्डर ले’र पछै माल बेचां |
| `SEL_LOCAL_HAAT` | `I sell in local haat/weekly market` | I sell in local haat/weekly market | मैं स्थानीय हाट / साप्ताहिक बाजार में बेचती हूँ | म्हे लोकल हाट / सातावारिया बजार में बेचां |
| `SEL_SARAS_FAIR` | `I sell in Saras fair` | I sell in Saras fair | मैं सरस मेले में बेचती हूँ | म्हे सरस मेला में बेचां |
| `SEL_INSTAGRAM` | `I get orders via instagram` | I get orders via instagram | मुझे इंस्टाग्राम के माध्यम से ऑर्डर मिलते हैं | म्हाने इंस्टाग्राम पै आर्डर मिलै |
| `SEL_WHATSAPP` | `I get orders via whatsapp` | I get orders via whatsapp | मुझे व्हाट्सएप के माध्यम से ऑर्डर मिलते हैं | म्हाने व्हाट्सएप पै आर्डर मिलै |
| `SEL_ONLINE_AMAZON` | `I use online platforms like Amazon` | I use online platforms like Amazon | मैं अमेज़न (Amazon) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ | म्हे अमेज़न (Amazon) जैसी ऑनलाइन साइट रो उपयोग करां |
| `SEL_ONLINE_MEESHO` | `I use online platform like Meesho` | I use online platform like Meesho | मैं मीशो (Meesho) जैसे ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ | म्हे मीशो (Meesho) जैसी ऑनलाइन साइट रो उपयोग करां |
| `SEL_ONLINE_OTHER` | `I use any other online platform` | I use any other online platform | मैं किसी अन्य ऑनलाइन प्लेटफॉर्म का उपयोग करती हूँ | म्हे दूजी कोई ऑनलाइन साइट रो उपयोग करां |
| `SEL_RAJEEVIKA` | `I use RAJEEVIKA website` | I use RAJEEVIKA website | मैं राजीविका (RAJEEVIKA) वेबसाइट / पोर्टल का उपयोग करती हूँ | म्हे राजीविका वेबसाइट रो उपयोग करां |
| `SEL_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई तरीका (विवरण दें) | दूजो कोई तरीको (ब्यौरो दो) |

---

### Specify online platform used
- **Physical Column**: `SeasonalSalesOnlinePlatform`
- **Question ID**: `Q_C_09_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: उपयोग किए जाने वाले ऑनलाइन प्लेटफॉर्म बताएं
- **Rajasthani Title**: ऑनलाइन प्लेटफॉर्म रो नाम बताओ
- **Display Name Formula**: `=LOOKUP("Q_C_09_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[SeasonalSalesMethod] = "SSM_ONLINE"`

---

### Specify other selling method
- **Physical Column**: `SeasonalSalesOther`
- **Question ID**: `Q_C_09_02`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य बिक्री तरीका बताएं
- **Rajasthani Title**: दूजो बेचण रो तरीको बताओ
- **Display Name Formula**: `=LOOKUP("Q_C_09_02", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[SeasonalSalesMethod] = "SSM_OTHER"`

---

### Online platforms ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)
- **Physical Column**: `SalesChannel_Online_Pct`
- **Question ID**: `Q_C_10_01`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: ऑनलाइन प्लेटफॉर्म के माध्यम से बिक्री (%)
- **Rajasthani Title**: ऑनलाइन प्लेटफॉर्म सूं बिक्री (%)
- **Display Name Formula**: `=LOOKUP("Q_C_10_01", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT15_0` | `0%` | 0% | 0% | 0% |
| `PCT15_15` | `upto 15%` | upto 15% | 15% तक | 15% तांई |
| `PCT15_30` | `upto 30%` | upto 30% | 30% तक | 30% तांई |
| `PCT15_45` | `upto 45%` | upto 45% | 45% तक | 45% तांई |
| `PCT15_60` | `upto 60%` | upto 60% | 60% तक | 60% तांई |
| `PCT15_75` | `upto 75%` | upto 75% | 75% तक | 75% तांई |
| `PCT15_90` | `upto 90%` | upto 90% | 90% तक | 90% तांई |
| `PCT15_100` | `100%` | 100% | 100% | 100% |

---

### Whatsapp ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)
- **Physical Column**: `SalesChannel_WhatsApp_Pct`
- **Question ID**: `Q_C_10_02`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: व्हाट्सएप के माध्यम से बिक्री (%)
- **Rajasthani Title**: WhatsApp सूं बिक्री (%)
- **Display Name Formula**: `=LOOKUP("Q_C_10_02", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT15_0` | `0%` | 0% | 0% | 0% |
| `PCT15_15` | `upto 15%` | upto 15% | 15% तक | 15% तांई |
| `PCT15_30` | `upto 30%` | upto 30% | 30% तक | 30% तांई |
| `PCT15_45` | `upto 45%` | upto 45% | 45% तक | 45% तांई |
| `PCT15_60` | `upto 60%` | upto 60% | 60% तक | 60% तांई |
| `PCT15_75` | `upto 75%` | upto 75% | 75% तक | 75% तांई |
| `PCT15_90` | `upto 90%` | upto 90% | 90% तक | 90% तांई |
| `PCT15_100` | `100%` | 100% | 100% | 100% |

---

### Instagram ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)
- **Physical Column**: `SalesChannel_Instagram_Pct`
- **Question ID**: `Q_C_10_03`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: इंस्टाग्राम के माध्यम से बिक्री (%)
- **Rajasthani Title**: Instagram सूं बिक्री (%)
- **Display Name Formula**: `=LOOKUP("Q_C_10_03", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT15_0` | `0%` | 0% | 0% | 0% |
| `PCT15_15` | `upto 15%` | upto 15% | 15% तक | 15% तांई |
| `PCT15_30` | `upto 30%` | upto 30% | 30% तक | 30% तांई |
| `PCT15_45` | `upto 45%` | upto 45% | 45% तक | 45% तांई |
| `PCT15_60` | `upto 60%` | upto 60% | 60% तक | 60% तांई |
| `PCT15_75` | `upto 75%` | upto 75% | 75% तक | 75% तांई |
| `PCT15_90` | `upto 90%` | upto 90% | 90% तक | 90% तांई |
| `PCT15_100` | `100%` | 100% | 100% | 100% |

---

### Your premise ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)
- **Physical Column**: `SalesChannel_Premise_Pct`
- **Question ID**: `Q_C_10_04`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: अपनी दुकान / परिसर से बिक्री (%)
- **Rajasthani Title**: खुद री दुकान सूं बिक्री (%)
- **Display Name Formula**: `=LOOKUP("Q_C_10_04", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT15_0` | `0%` | 0% | 0% | 0% |
| `PCT15_15` | `upto 15%` | upto 15% | 15% तक | 15% तांई |
| `PCT15_30` | `upto 30%` | upto 30% | 30% तक | 30% तांई |
| `PCT15_45` | `upto 45%` | upto 45% | 45% तक | 45% तांई |
| `PCT15_60` | `upto 60%` | upto 60% | 60% तक | 60% तांई |
| `PCT15_75` | `upto 75%` | upto 75% | 75% तक | 75% तांई |
| `PCT15_90` | `upto 90%` | upto 90% | 90% तक | 90% तांई |
| `PCT15_100` | `100%` | 100% | 100% | 100% |

---

### Local traders/shopkeepers ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)
- **Physical Column**: `SalesChannel_Traders_Pct`
- **Question ID**: `Q_C_10_05`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: स्थानीय व्यापारियों / दुकानदारों को बिक्री (%)
- **Rajasthani Title**: व्यापारियां नै बिक्री (%)
- **Display Name Formula**: `=LOOKUP("Q_C_10_05", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT15_0` | `0%` | 0% | 0% | 0% |
| `PCT15_15` | `upto 15%` | upto 15% | 15% तक | 15% तांई |
| `PCT15_30` | `upto 30%` | upto 30% | 30% तक | 30% तांई |
| `PCT15_45` | `upto 45%` | upto 45% | 45% तक | 45% तांई |
| `PCT15_60` | `upto 60%` | upto 60% | 60% तक | 60% तांई |
| `PCT15_75` | `upto 75%` | upto 75% | 75% तक | 75% तांई |
| `PCT15_90` | `upto 90%` | upto 90% | 90% तक | 90% तांई |
| `PCT15_100` | `100%` | 100% | 100% | 100% |

---

### Local haat/market ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)
- **Physical Column**: `SalesChannel_Haat_Pct`
- **Question ID**: `Q_C_10_06`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: स्थानीय हाट / साप्ताहिक बाजार में बिक्री (%)
- **Rajasthani Title**: हाट बाजार में बिक्री (%)
- **Display Name Formula**: `=LOOKUP("Q_C_10_06", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT15_0` | `0%` | 0% | 0% | 0% |
| `PCT15_15` | `upto 15%` | upto 15% | 15% तक | 15% तांई |
| `PCT15_30` | `upto 30%` | upto 30% | 30% तक | 30% तांई |
| `PCT15_45` | `upto 45%` | upto 45% | 45% तक | 45% तांई |
| `PCT15_60` | `upto 60%` | upto 60% | 60% तक | 60% तांई |
| `PCT15_75` | `upto 75%` | upto 75% | 75% तक | 75% तांई |
| `PCT15_90` | `upto 90%` | upto 90% | 90% तक | 90% तांई |
| `PCT15_100` | `100%` | 100% | 100% | 100% |

---

### Saras fair ( 0%/ upto 15%/upto 30%/upto 45%/upto 60%/upto 75%/upto 90%/100%)
- **Physical Column**: `SalesChannel_Saras_Pct`
- **Question ID**: `Q_C_10_07`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: सरस मेले में बिक्री (%)
- **Rajasthani Title**: सरस मेला में बिक्री (%)
- **Display Name Formula**: `=LOOKUP("Q_C_10_07", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PCT15_0` | `0%` | 0% | 0% | 0% |
| `PCT15_15` | `upto 15%` | upto 15% | 15% तक | 15% तांई |
| `PCT15_30` | `upto 30%` | upto 30% | 30% तक | 30% तांई |
| `PCT15_45` | `upto 45%` | upto 45% | 45% तक | 45% तांई |
| `PCT15_60` | `upto 60%` | upto 60% | 60% तक | 60% तांई |
| `PCT15_75` | `upto 75%` | upto 75% | 75% तक | 75% तांई |
| `PCT15_90` | `upto 90%` | upto 90% | 90% तक | 90% तांई |
| `PCT15_100` | `100%` | 100% | 100% | 100% |

---

### Q11. Do you maintain written records of business transactions?
- **Physical Column**: `RecordKeepingHabit`
- **Question ID**: `Q_C_11_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q11. क्या आप व्यावसायिक लेन-देन का लिखित रिकॉर्ड रखती हैं?
- **Rajasthani Title**: Q11. का थे हिसाब-किताब लिख र रखो हो?
- **Display Name Formula**: `=LOOKUP("Q_C_11_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `OPT_YES` | `Yes` | Yes | हाँ | हाँ |
| `OPT_NO` | `No` | No | नहीं | कोनी / ना |

---

### Q12. How do you maintain business transactions?
- **Physical Column**: `RecordKeepingMethod`
- **Question ID**: `Q_C_12_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q12. आप व्यावसायिक लेन-देन का रिकॉर्ड कैसे रखती हैं?
- **Rajasthani Title**: Q12. थे हिसाब-किताब किकण रखो हो?
- **Display Name Formula**: `=LOOKUP("Q_C_12_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[RecordKeepingHabit] = "OPT_YES"`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `RKT_RECEIPT_BILLS` | `Receipt book/bills` | Receipt book/bills | रसीद बुक / बिल | रसीद बही / बिल |
| `RKT_PURCHASE_SALE_REG` | `purchase and sale register` | purchase and sale register | क्रय-विक्रय (खरीद-बिक्री) रजिस्टर | खरीद-बेचान रो रजिस्टर |
| `RKT_ONLY_DEBT` | `Only debt register` | Only debt register | केवल उधार / बही खाता रजिस्टर | खाली उधारी रो खातो |
| `RKT_DAILY_DIARY` | `Maintain daily diary` | Maintain daily diary | दैनिक डायरी मेंटेन करती हूँ | रोज री डायरी राखूं |
| `RKT_CRP_DIARY` | `Maintain daily diary as taught by OSF/SVEP CRP` | Maintain daily diary as taught by OSF/SVEP CRP | OSF/SVEP CRP द्वारा सिखाए अनुसार दैनिक डायरी रखती हूँ | सीआरपी दीदी रै सिखाये मुजब रोज डायरी राखूं |
| `RKT_DIGITAL_APPS` | `Maintain digital records using Mera Bill, Bahi Khata` | Maintain digital records using Mera Bill, Bahi Khata | मेरा बिल, बही खाता जैसे ऐप से डिजिटल रिकॉर्ड रखती हूँ | मेरा बिल / बही खाता ऐप सूं हिसाब राखूं |
| `RKT_NOT_REGULAR` | `Don’t record regularly` | Don’t record regularly | नियमित रूप से रिकॉर्ड नहीं रखती | रोज-रोज हिसाब कोनी राखूं |
| `RKT_FAMILY_BOOK` | `My family member maintains a book` | My family member maintains a book | परिवार का कोई सदस्य हिसाब की किताब रखता है | घर रो कोई दूजो सदस्य हिसाब राखै |
| `RKT_NO_RECORD` | `I don’t maintain any record` | I don’t maintain any record | मैं कोई रिकॉर्ड / हिसाब नहीं रखती | म्हे कोई हिसाब-किताब कोनी राखां |
| `RKT_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई तरीका (विवरण दें) | दूजो कोई तरीको (ब्यौरो दो) |

---

### Specify other record keeping method
- **Physical Column**: `RecordKeepingOther`
- **Question ID**: `Q_C_12_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य रिकॉर्ड रखने का तरीका बताएं
- **Rajasthani Title**: दूजो तरीको बताओ
- **Display Name Formula**: `=LOOKUP("Q_C_12_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("REC_OTHER", [RecordKeepingMethod])`

---

### Q13. Turnover and income from the enterprise
- **Physical Column**: `Related_Q15_Turnover`
- **Question ID**: `Q_C_13_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q13. उद्यम का टर्नओवर और शुद्ध मुनाफा (मासिक)
- **Rajasthani Title**: Q13. उद्यम री बिक्री अर नफो
- **Display Name Formula**: `=LOOKUP("Q_C_13_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `RKH_ALWAYS_DONE` | `Yes, I have always been doing it` | Yes, I have always been doing it | हाँ, मैं हमेशा से लिखित हिसाब रखती आई हूँ | हाँ, म्हैं पैली सूं ही हिसाब राखूं |
| `RKH_AFTER_CRP_TRAIN` | `Yes, I started doing after being trained by OSF/SVEP CRP` | Yes, I started doing after being trained by OSF/SVEP CRP | हाँ, OSF/SVEP सीआरपी से प्रशिक्षण मिलने के बाद शुरू किया | हाँ, सीआरपी दीदी सिखायो जद सूं हिसाब राखूं |
| `RKH_FAMILY_MAINTAINS` | `Yes, my family member maintains but I don’t check` | Yes, my family member maintains but I don’t check | हाँ, परिवार का सदस्य हिसाब रखता है पर मैं नहीं देखती | घर रा जणां हिसाब राखै, म्हैं नीं देखूं |
| `RKH_HIRED_HELP` | `Yes, I have hired help to do that` | Yes, I have hired help to do that | हाँ, हिसाब रखने के लिए मुनीम/सहायक रखा है | हिसाब सारु सहायक राख्यो छै |
| `RKH_NOT_REGULAR` | `I don’t record regularly` | I don’t record regularly | नियमित रूप से हिसाब नहीं रखती | रोज हिसाब कोनी राखूं |
| `RKH_NO_RECORD` | `I don’t maintain any records at all` | I don’t maintain any records at all | मैं कोई लिखित रिकॉर्ड नहीं रखती | कोई हिसाब कोनी राखूं |

---

### Q1. How has the SHG association helped in your enterprise? ( Multiselect)
- **Physical Column**: `SHGAssociationAssistance`
- **Question ID**: `Q_D_01_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q1. एसएचजी (समूह) से जुड़ने से आपके उद्यम में क्या मदद मिली?
- **Rajasthani Title**: Q1. समूह सूं जुड़ण सूं धंधे में काईं मदद मिली?
- **Display Name Formula**: `=LOOKUP("Q_D_01_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `FAM_INDEPENDENT` | `I am able to run my enterprise independently` | I am able to run my enterprise independently | मैं अपना उद्यम पूरी तरह स्वतंत्र रूप से चलाने में सक्षम हूँ | म्हैं खुद अकेली धंधो चलाऊं |
| `FAM_NOT_IN_FAVOUR` | `My husband was not in favour of starting the business` | My husband was not in favour of starting the business | शुरुआत में पति व्यवसाय शुरू करने के पक्ष में नहीं थे | पैली धणी राजी कोनी हा |
| `FAM_NOT_SUPPORTIVE_INITIAL` | `Husband not supportive initially, but now helps when required` | Husband not supportive initially, but now helps when required | पति पहले असहयोगी थे पर अब जरूरत पड़ने पर मदद करते हैं | पैली साथ कोनी देता पण अबै मदद करै |
| `FAM_SUPPORTED_SHG_LOAN` | `Since enterprise started with SHG loan, husband supported` | Since enterprise started with SHG loan, husband supported | क्योंकि काम SHG लोन से शुरू हुआ, पति ने पूरा समर्थन दिया | समूह सूं लोन मिल्यो तो धणी साथ दियो |
| `FAM_INITIAL_INVESTMENT` | `My husband/family supported me with initial investment` | My husband/family supported me with initial investment | पति/परिवार ने शुरुआती पूंजी में पूरा सहयोग दिया | शुरुआती पीसा घर का दिया |
| `FAM_FULL_SUPPORT` | `I have full support of husband/family and helped in every way` | I have full support of husband/family and helped in every way | पति व परिवार का हर संभव तरीके से पूरा समर्थन मिला | घर का रो पूरो सहयोग मिल्यो |
| `FAM_EFFECTIVE_WITH_SUPPORT` | `I run/could run enterprise more effectively with family support` | I run/could run enterprise more effectively with family support | परिवार के सहयोग से व्यवसाय और बेहतर चला पा रही हूँ | घर रा जणां रे सहयोग सूं काम बढ़िया चालै |

---

### Q2. How have you arranged capital over the enterprise duration? ( Ask for each option. Put 0 if the source is not used)
- **Physical Column**: `Related_Q19_Capital`
- **Question ID**: `Q_D_02_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q2. आपने उद्यम के दौरान पूंजी की व्यवस्था कैसे की? (प्रत्येक विकल्प पूछें)
- **Rajasthani Title**: Q2. पूंजी रो प्रबंध किकण कियो?
- **Display Name Formula**: `=LOOKUP("Q_D_02_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `SRC_TRAVEL_ALONE` | `I travel alone and I handle negotiations independently` | I travel alone and I handle negotiations independently | मैं अकेले यात्रा करती हूँ और मोलभाव खुद स्वतंत्र रूप से करती हूँ | अकेली जा र सौदो कर ल्याऊं |
| `SRC_TRAVEL_COMPANION` | `I need travel companion but I handle negotiations independently` | I need travel companion but I handle negotiations independently | साथी चाहिए पर मोलभाव खुद स्वतंत्र रूप से करती हूँ | साथी चाहिजे पण मोलतोल खुद करूं |
| `SRC_FAMILY_HANDLES` | `My family member handles the purchase` | My family member handles the purchase | परिवार का सदस्य सामग्री खरीद का काम संभालता है | घर रो जणो माल लावै |
| `SRC_CRP_HELPS` | `OSF/SVEP CRP helps in sourcing material` | OSF/SVEP CRP helps in sourcing material | OSF/SVEP सीआरपी सामग्री जुटाने में मदद करती हैं | सीआरपी दीदी माल मंगावण में मदद करै |
| `SRC_WANT_DIFF_NEED_SUPP` | `Want to source from different places but need support` | Want to source from different places but need support | अलग-अलग जगहों से माल लाना चाहती हूँ पर सहयोग चाहिए | दूजी जगां सूं माल लावणो चाहूं पण मदद चाहिजे |
| `SRC_CONTENT_NEARBY` | `I am content to source material from nearby market` | I am content to source material from nearby market | पास के बाजार से ही सामग्री लेने में संतुष्ट हूँ | नेड़ले बाजार सूं माल लेवण में ही राजी हूँ |

---

### Q3. How did you use the loans taken from different sources?
- **Physical Column**: `Related_Q20_Loan_Usage`
- **Question ID**: `Q_D_03_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q3. विभिन्न स्रोतों से लिए गए ऋण का उपयोग कैसे किया?
- **Rajasthani Title**: Q3. लोन रो उपयोग किकण कियो?
- **Display Name Formula**: `=LOOKUP("Q_D_03_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `REC_NO_ISSUES` | `Yes, I don’t face any issues` | Yes, I don’t face any issues | हाँ, मुझे कोई समस्या नहीं आती | हाँ, कोई तकलीफ कोनी आवै |
| `REC_CASH_ONLY` | `Yes, but I conduct only cash transactions` | Yes, but I conduct only cash transactions | हाँ, क्योंकि मैं केवल नकद लेन-देन ही करती हूँ | हाँ, क्यूंकि नकद ही काम करां |
| `REC_EVENTUALLY_PAYS` | `Yes, eventually everyone pays` | Yes, eventually everyone pays | हाँ, देर-सबेर सभी भुगतान कर देते हैं | हाँ, आज नीं तो काल सगळा दे देवै |
| `REC_LEARNT_NEGOTIATE` | `Yes, but I have learnt over the years how to negotiate` | Yes, but I have learnt over the years how to negotiate | हाँ, समय के साथ मैंने तकादा करना सीख लिया है | हाँ, टेम रे सागे समझ आगी किकण तगादो करणो |
| `REC_HUSBAND_RECOVERS` | `No, but my husband is able to recover` | No, but my husband is able to recover | नहीं, लेकिन मेरे पति वसूली कर लेते हैं | ना, पण धणी वसूली कर ल्यावै |
| `REC_LOSSES_DEBT` | `No, my business has suffered losses due to debt` | No, my business has suffered losses due to debt | नहीं, उधारी डूबने के कारण व्यवसाय को नुकसान हुआ है | ना, उधारी डूबबा सूं नुकसान हुयो |

---

### Q4. What has been your experience in funding your business? (Multi select)
- **Physical Column**: `FundingExperience`
- **Question ID**: `Q_D_04_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q4. व्यवसाय के लिए फंडिंग का आपका अनुभव कैसा रहा?
- **Rajasthani Title**: Q4. फंडिंग रो अनुभव किकण रो रह्यो?
- **Display Name Formula**: `=LOOKUP("Q_D_04_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `FND_SHG_SUFFICIENT` | `SHG loan is sufficient for current scale of business` | SHG loan is sufficient for current scale of business | व्यवसाय के वर्तमान पैमाने के लिए SHG लोन पर्याप्त है | अबार रा काम सारु समूह रो लोन घणो छै |
| `FND_PLOUGH_EARNINGS` | `I regularly plough in my business earnings` | I regularly plough in my business earnings | मैं अपने व्यवसाय की कमाई को दोबारा व्यवसाय में लगाती हूँ | कमाई पाछी धंधे में ही लगावां |
| `FND_SHG_SMALL` | `SHG loan size is smaller than my requirement` | SHG loan size is smaller than my requirement | SHG ऋण की राशि मेरी जरूरत से कम है | समूह रो लोन म्हारी जरूरत सूं कम पड़ै |
| `FND_EASY_MFI` | `I get required loan easily from moneylender/NBFIs` | I get required loan easily from moneylender/NBFIs | साहूकार/NBFI से जरूरत के अनुसार आसानी से कर्ज मिल जाता है | साहूकार/कंपनी सूं लोन असानी सूं मिल जावै |
| `FND_FAMILY_HELPS` | `My family members help me with funds and loans` | My family members help me with funds and loans | परिवार के सदस्य पूंजी और ऋण में मेरी मदद करते हैं | घर का पीसा री मदद करै |
| `FND_AVOID_HIGH_INT` | `Don’t prefer moneylender/NBFIs as interest rate is high` | Don’t prefer moneylender/NBFIs as interest rate is high | साहूकार/NBFI नहीं लेती क्योंकि ब्याज दर बहुत अधिक है | साहूकार/कंपनी रो ब्याज घणो लागै इस वास्ते नीं लेवां |
| `FND_AVOID_SHORT_TIME` | `Don’t prefer moneylender/NBFIs as repayment time is shorter` | Don’t prefer moneylender/NBFIs as repayment time is shorter | साहूकार/NBFI नहीं लेती क्योंकि चुकाने का समय बहुत कम होता है | चुकावण रो टेम घणो कम मिलै |

---

### Q5. What changes have happened in your business? ( The SHG member may not be able to give an exact number. In such a case ask for rough estimates but don’t pressure )
- **Physical Column**: `Related_Q22_Trajectory`
- **Question ID**: `Q_D_05_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q5. आपके व्यवसाय में क्या बदलाव आए हैं? (अनुमानित आंकड़ा पूछें)
- **Rajasthani Title**: Q5. काम-धंधे में काईं फेरबदल होया?
- **Display Name Formula**: `=LOOKUP("Q_D_05_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `CHL_OSF_PHASED` | `OSF phased out which affected fund sufficiency (Specify amount)` | OSF phased out which affected fund sufficiency (Specify amount) | OSF समाप्त हो गया जिससे फंड की कमी हो गई (राशि लिखें) | OSF बंद होग्यो जिणसूं पीसा री तंगी होगी |
| `CHL_SCALE_UP_FUNDS` | `Need more funds to scale up business (Specify amount)` | Need more funds to scale up business (Specify amount) | व्यवसाय बढ़ाने के लिए और पूंजी चाहिए (राशि लिखें) | काम बढ़ावण खातर और पीसा चाहिजे |
| `CHL_RENOVATE_FUNDS` | `Need large funds to renovate shop/premise (Specify amount)` | Need large funds to renovate shop/premise (Specify amount) | दुकान की मरम्मत/सजावट हेतु बड़ी राशि चाहिए (राशि लिखें) | दुकान सुधारण खातर पीसा चाहिजे |
| `CHL_TIMELY_INPUTS` | `Need timely access to funds before production begins (Specify amount)` | Need timely access to funds before production begins (Specify amount) | उत्पादन शुरू होने से पहले समय पर पूंजी चाहिए (राशि लिखें) | सीजन सूं पैली टेम पर पीसा चाहिजे |
| `CHL_ACCESS_MARKET` | `Need support to access bigger market at lower cost` | Need support to access bigger market at lower cost | कम लागत पर माल पाने हेतु बड़े बाजार तक पहुँच का समर्थन चाहिए | बड़ा बाजार सूं सस्ता में माल लेवण री मदद चाहिजे |
| `CHL_SELL_INVENTORY` | `Need help in selling my inventory (Specify current value)` | Need help in selling my inventory (Specify current value) | बचा हुआ स्टॉक/इन्वेंटरी बेचने में मदद चाहिए (मूल्य लिखें) | पड़्यो माल बेचण में मदद चाहिजे |
| `CHL_LEARN_SOCIAL_MEDIA` | `Need help in learning use of social media` | Need help in learning use of social media | सोशल मीडिया का उपयोग सीखने में मदद चाहिए | मोबाइल/सोशल मीडिया सीखण में मदद चाहिजे |
| `CHL_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई, विवरण दें | दूजी कोई अड़चन |

---

### Q6. How has the income from the enterprise helped you financially? (Multiselect)
- **Physical Column**: `FinancialHelpFromIncome`
- **Question ID**: `Q_D_06_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q6. उद्यम की आय ने आपको वित्तीय रूप से कैसे मदद की?
- **Rajasthani Title**: Q6. धंधे री कमाई सूं थानै काईं मदद मिली?
- **Display Name Formula**: `=LOOKUP("Q_D_06_00", "AppVariables", "ID", "Label")`

---

### The income from enterprise is used in covering education related expenses for my children. Specify amount
- **Physical Column**: `FinancialHelp_EducationAmt`
- **Question ID**: `Q_D_06_ED`
- **Type / ValueControl**: `Text`
- **Hindi Title**: बच्चों की शिक्षा खर्च राशि (रु)
- **Rajasthani Title**: टाबरां री पढ़ाई रो खरचो (रु)
- **Display Name Formula**: `=LOOKUP("Q_D_06_ED", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("ED", [FinancialHelpFromIncome])`

---

### I have been able to pay the family debts. Specify amount
- **Physical Column**: `FinancialHelp_DebtsAmt`
- **Question ID**: `Q_D_06_DB`
- **Type / ValueControl**: `Text`
- **Hindi Title**: पारिवारिक कर्ज चुकाई गई राशि (रु)
- **Rajasthani Title**: कर्ज चुकावण री रकम (रु)
- **Display Name Formula**: `=LOOKUP("Q_D_06_DB", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("DB", [FinancialHelpFromIncome])`

---

### I have contributed money in acquiring assets for my family Specify amount
- **Physical Column**: `FinancialHelp_AssetsAmt`
- **Question ID**: `Q_D_06_AS`
- **Type / ValueControl**: `Text`
- **Hindi Title**: परिसंपत्तियां (Assets) खरीदने में खर्च (रु)
- **Rajasthani Title**: संपत्ति खरीदण में खरचो (रु)
- **Display Name Formula**: `=LOOKUP("Q_D_06_AS", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("AS", [FinancialHelpFromIncome])`

---

### I have contributed money for marriage expenses. Specify amount
- **Physical Column**: `FinancialHelp_MarriageAmt`
- **Question ID**: `Q_D_06_MR`
- **Type / ValueControl**: `Text`
- **Hindi Title**: शादी / विवाह खर्च राशि (रु)
- **Rajasthani Title**: ब्याव-शादी रो खरचो (रु)
- **Display Name Formula**: `=LOOKUP("Q_D_06_MR", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("MR", [FinancialHelpFromIncome])`

---

### Q1. How has been your husband’s response towards your enterprise? (Multiselect)
- **Physical Column**: `HusbandFamilyResponse`
- **Question ID**: `Q_E_01_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q1. आपके उद्यम के प्रति आपके पति/परिवार का क्या रुख रहा है?
- **Rajasthani Title**: Q1. धंधे माथे पति/घर आळां रो काईं रुख रह्यो?
- **Display Name Formula**: `=LOOKUP("Q_E_01_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `OPT_YES` | `Yes` | Yes | हाँ | हाँ |
| `OPT_NO` | `No` | No | नहीं | कोनी / ना |

---

### Q2. What is your level of comfort in sourcing material?
- **Physical Column**: `MaterialSourcingComfort`
- **Question ID**: `Q_E_02_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q2. कच्चा माल खरीदने में आपकी सहूलियत का स्तर क्या है?
- **Rajasthani Title**: Q2. कच्चो माल लावण में कित्ती सहूलियत है?
- **Display Name Formula**: `=LOOKUP("Q_E_02_00", "AppVariables", "ID", "Label")`

---

### Q3. Are you able to recover money from customers?
- **Physical Column**: `CustomerPaymentRecovery`
- **Question ID**: `Q_E_03_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q3. क्या आप ग्राहकों से समय पर भुगतान वसूल पाती हैं?
- **Rajasthani Title**: Q3. का ग्राहकां सूं पईसा वसूल हो जावै?
- **Display Name Formula**: `=LOOKUP("Q_E_03_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `OPT_YES` | `Yes` | Yes | हाँ | हाँ |
| `OPT_NO` | `No` | No | नहीं | कोनी / ना |

---

### Q4. What are the challenges you are facing now? (Multiselect)
- **Physical Column**: `CurrentChallenges`
- **Question ID**: `Q_E_04_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q4. वर्तमान में आप किन चुनौतियों का सामना कर रही हैं?
- **Rajasthani Title**: Q4. अबार थानै काईं-काईं दिक्कतां आवे है?
- **Display Name Formula**: `=LOOKUP("Q_E_04_00", "AppVariables", "ID", "Label")`

---

### OSF is phased out now which has affected fund sufficiency. Specify amount
- **Physical Column**: `Challenge_OSFPhasedOutAmt`
- **Question ID**: `Q_E_04_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: OSF समाप्त होने पर आवश्यक फंड राशि (रु)
- **Rajasthani Title**: फंड री जरूरत (रु)
- **Display Name Formula**: `=LOOKUP("Q_E_04_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("CH_OSF_PHASED", [CurrentChallenges])`

---

### I need timely access to funds to buy inputs before the production/peak season begins. Specify amount
- **Physical Column**: `Challenge_ScaleUpFundAmt`
- **Question ID**: `Q_E_04_02`
- **Type / ValueControl**: `Text`
- **Hindi Title**: पीक सीजन से पहले आवश्यक फंड राशि (रु)
- **Rajasthani Title**: जरूरी फंड री रकम (रु)
- **Display Name Formula**: `=LOOKUP("Q_E_04_02", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("CH_FUND_DEFICIT", [CurrentChallenges])`

---

### I need support to access bigger market to source material/inputs at lower cost
- **Physical Column**: `Challenge_TimelyInputsAmt`
- **Question ID**: `Q_E_04_03`
- **Type / ValueControl**: `Text`
- **Hindi Title**: दुकान मरम्मत / इनपुट फंड राशि (रु)
- **Rajasthani Title**: मरम्मत खातर पईसा (रु)
- **Display Name Formula**: `=LOOKUP("Q_E_04_03", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("CH_RAW_MATERIAL", [CurrentChallenges])`

---

### Any other, specify
- **Physical Column**: `Challenge_Other`
- **Question ID**: `Q_E_04_04`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य चुनौती का विवरण
- **Rajasthani Title**: दूजी दिक्कत बताओ
- **Display Name Formula**: `=LOOKUP("Q_E_04_04", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("CH_OTHER", [CurrentChallenges])`

---

### Same business scale ______
- **Physical Column**: `Competitors_Similar_Scale`
- **Question ID**: `Q_D_06_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: समान व्यवसाय स्तर वाले लोग (संख्या)
- **Rajasthani Title**: बराबर रा धंधे आळा (संख्या)
- **Display Name Formula**: `=LOOKUP("Q_D_06_01", "AppVariables", "ID", "Label")`

---

### Smaller business scale than yours_______
- **Physical Column**: `Competitors_Smaller_Scale`
- **Question ID**: `Q_D_06_02`
- **Type / ValueControl**: `Text`
- **Hindi Title**: आपसे छोटे व्यवसाय स्तर वाले लोग (संख्या)
- **Rajasthani Title**: छोटा धंधे आळा (संख्या)
- **Display Name Formula**: `=LOOKUP("Q_D_06_02", "AppVariables", "ID", "Label")`

---

### Higher business scale than yours_________
- **Physical Column**: `Competitors_Higher_Scale`
- **Question ID**: `Q_D_06_03`
- **Type / ValueControl**: `Text`
- **Hindi Title**: आपसे बड़े व्यवसाय स्तर वाले लोग (संख्या)
- **Rajasthani Title**: बड़ा धंधे आळा (संख्या)
- **Display Name Formula**: `=LOOKUP("Q_D_06_03", "AppVariables", "ID", "Label")`

---

### Q6. What advantage do you have over your competitors? (Multiselect)
- **Physical Column**: `CompetitorAdvantages`
- **Question ID**: `Q_E_06_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q6. प्रतिस्पर्धियों की तुलना में आपको क्या बढ़त/फायदा है?
- **Rajasthani Title**: Q6. दूजां सूं थानै काईं बढ़त/फायदो है?
- **Display Name Formula**: `=LOOKUP("Q_E_06_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `CRP_SUBSIDY` | `Accessing subsidy` | Accessing subsidy | सब्सिडी प्राप्त करने में सहायता | सब्सिडी दिलावण में मदद |
| `CRP_DOCUMENTS` | `Getting necessary documents (Aadhar, PAN, Udyam, FSSAI)` | Getting necessary documents (Aadhar, PAN, Udyam, FSSAI) | आवश्यक दस्तावेज (आधार, पैन, उद्यम, FSSAI) बनवाना | जरूरी कागज (आधार, पैन, उद्यम) बणावण में |
| `CRP_BIZ_PLANS` | `They helped in preparing Business Plan` | They helped in preparing Business Plan | उन्होंने Business Plan (व्यावसायिक योजना) बनाने में मदद की | Business Plan बणावण में मदद करी |
| `CRP_FEEDBACK` | `Gave critical feedback on business idea to improve operations` | Gave critical feedback on business idea to improve operations | व्यावसायिक विचार पर महत्वपूर्ण सुझाव दिए जिससे काम सुधरा | सुझाव दिया जिणसूं काम सुधर्यो |
| `CRP_RECORDS` | `Trained us on maintaining records which we didn’t know earlier` | Trained us on maintaining records which we didn’t know earlier | बही-खाता और लिखित रिकॉर्ड रखने का प्रशिक्षण दिया | हिसाब-किताब रखणो सिखायो |
| `CRP_NEW_IDEAS` | `Gave us new ideas to increase our income from enterprise` | Gave us new ideas to increase our income from enterprise | आय बढ़ाने के नए विचार और तरीके बताए | कमाई बढ़ावण रा नवा विचार दिया |
| `CRP_BANK_LOANS` | `Helped in accessing loans from bank` | Helped in accessing loans from bank | बैंक से ऋण प्राप्त करने में सहयोग किया | बैंक सूं लोन करवायो |
| `CRP_COMMUNICATION` | `Helped in our communication skills` | Helped in our communication skills | बातचीत और आत्मविश्वास में सुधार कराया | बोलचाल और आत्मविश्वास बढ़ायो |
| `CRP_MARKETING` | `Helped in marketing` | Helped in marketing | मार्केटिंग और प्रचार में मदद की | मार्केटिंग में मदद करी |
| `CRP_COMPETITORS` | `Helped understand competitors and suggested ways to beat competition` | Helped understand competitors and suggested ways to beat competition | प्रतिस्पर्धा समझने और बेहतर सेवा देने के तरीके बताए | प्रतिस्पर्धा सूं निपटण रा तरीका बताया |
| `CRP_INSTAGRAM` | `CRP_INSTAGRAM` | CRP_INSTAGRAM |  |  |
| `CRP_PROFIT_IDEAS` | `They gave us new ideas to improve our profit` | They gave us new ideas to improve our profit | उन्होंने मुनाफा बढ़ाने के नए विचार और तरीके बताए | मुनाफो बढ़ावण रा नवा उपाय बताया |

---

### Q1. For next one year, what are your plans to increase the scale of your business?
- **Physical Column**: `FutureExpansionPlans`
- **Question ID**: `Q_F_01_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q1. अगले एक वर्ष में व्यवसाय बढ़ाने की आपकी क्या योजनाएं हैं?
- **Rajasthani Title**: Q1. आगले एक साल में धंधो बढ़ावण री काईं योजना है?
- **Display Name Formula**: `=LOOKUP("Q_F_01_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `PHN_YES` | `Yes` | Yes | हाँ, खुद का स्मार्टफोन है | हाँ, खुद रो स्मार्टफोन छै |
| `PHN_NO` | `No` | No | नहीं, स्मार्टफोन नहीं है | ना, स्मार्टफोन कोनी |
| `PHN_ACCESS` | `No, but I have access to smart phone` | No, but I have access to smart phone | नहीं, लेकिन परिवार के स्मार्टफोन तक पहुंच है | ना, पण घर रा फोन सूं काम चालै |

---

### Q2. What is holding you back from pursuing these aspirations? (Multiselect, don't prompt)
- **Physical Column**: `AspirationBottlenecks`
- **Question ID**: `Q_F_02_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q2. इन आकांक्षाओं को पूरा करने में क्या बाधा आ रही है?
- **Rajasthani Title**: Q2. योजना पूरी करण में काईं रुकावट है?
- **Display Name Formula**: `=LOOKUP("Q_F_02_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `OPT_YES` | `Yes` | Yes | हाँ | हाँ |
| `OPT_NO` | `No` | No | नहीं | कोनी / ना |

---

### Q3. How much funds do you need to fund your plan?
- **Physical Column**: `FutureFundsRequired`
- **Question ID**: `Q_F_03_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q3. अपनी योजना को पूरा करने के लिए कितने फंड की आवश्यकता है?
- **Rajasthani Title**: Q3. योजना खातर कित्ता पईसां री जरूरत है?
- **Display Name Formula**: `=LOOKUP("Q_F_03_00", "AppVariables", "ID", "Label")`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `QRC_1_4` | `1-4` | 1-4 | प्रतिदिन 1-4 लेन-देन | रोज 1-4 बार |
| `QRC_5_10` | `5-10` | 5-10 | प्रतिदिन 5-10 लेन-देन | रोज 5-10 बार |
| `QRC_10_20` | `10-20` | 10-20 | प्रतिदिन 10-20 लेन-देन | रोज 10-20 बार |
| `QRC_20_40` | `20-40` | 20-40 | प्रतिदिन 20-40 लेन-देन | रोज 20-40 बार |
| `QRC_GT_40` | `More than 40` | More than 40 | प्रतिदिन 40 से अधिक | रोज 40 सूं बत्ती बार |

---

### Q1. Have you attended any training under SVEP/OSF?
- **Physical Column**: `AttendedTraining`
- **Question ID**: `Q_G_01_00`
- **Type / ValueControl**: `Number`
- **Hindi Title**: Q1. क्या आपने SVEP/OSF के तहत कोई प्रशिक्षण लिया है?
- **Rajasthani Title**: Q1. का थे कोई ट्रेनिंग ली है?
- **Display Name Formula**: `=LOOKUP("Q_G_01_00", "AppVariables", "ID", "Label")`

---

### Q2. If Yes, specify__________
- **Physical Column**: `TrainingDetails`
- **Question ID**: `Q_G_02_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q2. यदि हाँ, तो प्रशिक्षण का विवरण दें
- **Rajasthani Title**: Q2. ट्रेनिंग रो ब्योरो देवो
- **Display Name Formula**: `=LOOKUP("Q_G_02_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[AttendedTraining] = "OPT_YES"`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `BOS_SALE_REDUCED` | `Yes but the sale has reduced` | Yes but the sale has reduced | हाँ, लेकिन बिक्री कम हो गई है | हाँ, पण बिक्री घटगी |
| `BOS_SCALE_INCREASED` | `Yes but the scale has increased` | Yes but the scale has increased | हाँ, और व्यवसाय का दायरा/बिक्री बढ़ी है | हाँ, और काम बढ़ग्यो |
| `BOS_SCALE_SAME` | `Yes, but the scale has remained the same` | Yes, but the scale has remained the same | हाँ, लेकिन दायरा पहले जैसा ही रहा है | हाँ, पण काम पैली जेड़ो ही छै |
| `BOS_CLOSED` | `No, enterprise closed` | No, enterprise closed | नहीं, व्यवसाय बंद हो गया है | ना, काम-धंधो बंद होग्यो |

---

### Q3. Did you use any training component in your enterprise?
- **Physical Column**: `UsedTrainingComponent`
- **Question ID**: `Q_G_03_00`
- **Type / ValueControl**: `EnumList`
- **Hindi Title**: Q3. क्या आपने प्रशिक्षण के किसी घटक का उपयोग उद्यम में किया?
- **Rajasthani Title**: Q3. का ट्रेनिंग रो फायदो धंधे में लियो?
- **Display Name Formula**: `=LOOKUP("Q_G_03_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[AttendedTraining] = "OPT_YES"`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `CLR_NO_GUIDE` | `Sales reduced over the years as there was no one guiding us` | Sales reduced over the years as there was no one guiding us | मार्गदर्शन न मिलने से बिक्री कम होती गई | कोई समझावण वाळो कोनी हो जिणसूं बिक्री घटगी |
| `CLR_NO_CAPITAL` | `Needed more capital to source material but there was no source of loan` | Needed more capital to source material but there was no source of loan | माल लाने के लिए पूंजी चाहिए थी लेकिन कोई ऋण नहीं मिला | माल लावण सारु पूंजी कोनी मिली |
| `CLR_BANK_REFUSED` | `Banks refused to give us loan` | Banks refused to give us loan | बैंकों ने ऋण देने से मना कर दिया | बैंक लोन देबा सूं मना कर दियो |
| `CLR_NO_NEW_CUSTOMERS` | `Unable to reach new customers` | Unable to reach new customers | नए ग्राहकों तक पहुँचने में असमर्थ रहे | नवा गिराहक कोनी मिल्या |
| `CLR_COMPETITORS` | `New competitors in the market offering discounts` | New competitors in the market offering discounts | बाजार में नए प्रतिस्पर्धियों ने छूट देकर ग्राहक तोड़ लिए | नवा दुकानदार छूट दे र गिराहक तोड़ लिया |
| `CLR_OTHER` | `Any other, specify` | Any other, specify | अन्य कोई कारण, विवरण दें | दूजो कोई कारण |
| `CLR_DONT_KNOW` | `Don’t know` | Don’t know | पता नहीं | ठा कोनी |

---

### Q4. If Yes, specify__________
- **Physical Column**: `UsedTrainingDetails`
- **Question ID**: `Q_G_04_00`
- **Type / ValueControl**: `Enum`
- **Hindi Title**: Q4. यदि हाँ, तो उपयोग का विवरण दें
- **Rajasthani Title**: Q4. उपयोग रो ब्योरो देवो
- **Display Name Formula**: `=LOOKUP("Q_G_04_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[UsedTrainingComponent] = "OPT_YES"`

| Option ID | Stored / Enum Value | English Label | हिन्दी (Hindi) | राजस्थानी (Rajasthani) |
|---|---|---|---|---|
| `SUPP_HUSBAND_ENCOURAGE` | `Husband actively encourages and supports the enterprise` | Husband actively encourages and supports the enterprise | पति सक्रिय रूप से उद्यम को प्रोत्साहित और समर्थन करते हैं | धणी जोश सूं काम-धंधे ने आगे बढ़ावण में मदद करे |
| `SUPP_HUSBAND_FINANCE` | `Husband provides financial support for the enterprise` | Husband provides financial support for the enterprise | पति उद्यम के लिए वित्तीय सहायता प्रदान करते हैं | धणी काम-धंधे खातर पईसां री मदद करे |
| `SUPP_FAMILY_CHORES` | `Family members share household chores to support the enterprise` | Family members share household chores to support the enterprise | परिवार के सदस्य उद्यम में मदद के लिए घरेलू काम साझा करते हैं | घर रा बाकी जणा घर रो काम बांटर धंधे में मदद करे |
| `SUPP_NEUTRAL_NO_INTERFERENCE` | `Neutral - no interference, no active support` | Neutral - no interference, no active support | तटस्थ - न कोई हस्तक्षेप, न कोई सक्रिय समर्थन | न रोके न मदद करे - बस देखते रे |
| `SUPP_INITIAL_OPPOSITION` | `Initially opposed, but now accepts and supports` | Initially opposed, but now accepts and supports | शुरू में विरोध किया लेकिन अब स्वीकार कर लिया और समर्थन करते हैं | पहले रोक्यो पण अब मान ग्यो अर मदद करे |
| `SUPP_NO_SUPPORT_OPPOSED` | `Does not support and is opposed to the enterprise` | Does not support and is opposed to the enterprise | उद्यम को समर्थन नहीं करते और विरोध में हैं | न मदद करे न पसंद करे - विरोध करे |

---

### Income before the changes: Rs-------
- **Physical Column**: `MonthlyIncomeBeforeLoan`
- **Question ID**: `Q_G_05_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: बदलाव से पहले मासिक आय (रु)
- **Rajasthani Title**: लोन सूं पहले महिना री कमाई (रु)
- **Display Name Formula**: `=LOOKUP("Q_G_05_01", "AppVariables", "ID", "Label")`

---

### Income after the changes: Rs---------
- **Physical Column**: `MonthlyIncomeAfterLoan`
- **Question ID**: `Q_G_05_02`
- **Type / ValueControl**: `Text`
- **Hindi Title**: बदलाव के बाद मासिक आय (रु)
- **Rajasthani Title**: लोन पाछै महिना री कमाई (रु)
- **Display Name Formula**: `=LOOKUP("Q_G_05_02", "AppVariables", "ID", "Label")`

---

### Q6. Can you specify the amount by which your average monthly income has increased directly due to changes brought by OSF/SVEP loans?
- **Physical Column**: `MonthlyIncomeIncreaseByOSFSVEP`
- **Question ID**: `Q_G_06_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q6. OSF/SVEP ऋण से आपकी औसत मासिक आय में कितनी वृद्धि हुई?
- **Rajasthani Title**: Q6. महिना री कमाई में कित्ती बढ़ोतरी होई?
- **Display Name Formula**: `=LOOKUP("Q_G_06_00", "AppVariables", "ID", "Label")`

---

### Q7. What has been the contribution of SVEP/OSF CRP in your enterprise? ( Multisepect)
- **Physical Column**: `CRPContributions`
- **Question ID**: `Q_G_07_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q7. आपके उद्यम में SVEP/OSF CRP का क्या योगदान रहा है?
- **Rajasthani Title**: Q7. धंधे में CRP रो काईं योगदान रह्यो?
- **Display Name Formula**: `=LOOKUP("Q_G_07_00", "AppVariables", "ID", "Label")`

---

### Q8. What are your expectations from the SVEP/OSF scheme? (Please prompt)
- **Physical Column**: `ExpectationsFromScheme`
- **Question ID**: `Q_G_08_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q8. SVEP/OSF योजना से आपकी क्या अपेक्षाएं हैं?
- **Rajasthani Title**: Q8. योजना सूं थारी काईं उम्मीद है?
- **Display Name Formula**: `=LOOKUP("Q_G_08_00", "AppVariables", "ID", "Label")`

---

### Any other, Specify
- **Physical Column**: `Other_Specify`
- **Question ID**: `Q_G_08_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य अपेक्षाएं बताएं
- **Rajasthani Title**: दूजी उम्मीद बताओ
- **Display Name Formula**: `=LOOKUP("Q_G_08_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[ExpectationsFromScheme] = "EXP_OTHER"`

---

### Q1. Do you own a smart phone?
- **Physical Column**: `SmartphoneOwnership`
- **Question ID**: `Q_H_01_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q1. क्या आपके पास स्मार्टफोन है?
- **Rajasthani Title**: Q1. का थारे कनै स्मार्टफोन है?
- **Display Name Formula**: `=LOOKUP("Q_H_01_00", "AppVariables", "ID", "Label")`

---

### Q2. Do you use QR code/mobile banking for money transactions?
- **Physical Column**: `UseQRUPI`
- **Question ID**: `Q_H_02_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q2. क्या आप पैसे के लेन-देन के लिए QR कोड/मोबाइल बैंकिंग का उपयोग करती हैं?
- **Rajasthani Title**: Q2. का थे QR कोड सूं लेन-देन करो हो?
- **Display Name Formula**: `=LOOKUP("Q_H_02_00", "AppVariables", "ID", "Label")`

---

### Q3. If yes, daily how many transactions in your business are done using QR code/mobile banking?
- **Physical Column**: `QRDailyTransactions`
- **Question ID**: `Q_H_03_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q3. QR कोड से रोजाना कितने लेन-देन होते हैं?
- **Rajasthani Title**: Q3. रोज रा कित्ता लेन-देन QR सूं होवे?
- **Display Name Formula**: `=LOOKUP("Q_H_03_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[UseQRUPI] = "OPT_YES"`

---

### Q4. If no, reason for not using QR code/mobile banking for money related transactions
- **Physical Column**: `QRNonUseReason`
- **Question ID**: `Q_H_04_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q4. QR कोड/मोबाइल बैंकिंग का उपयोग न करने का कारण
- **Rajasthani Title**: Q4. QR कोड न वापरण रो कारण
- **Display Name Formula**: `=LOOKUP("Q_H_04_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[UseQRUPI] = "OPT_NO"`

---

### Q5. Do you use social media for marketing?
- **Physical Column**: `SocialMediaForMarketing`
- **Question ID**: `Q_H_05_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q5. क्या आप मार्केटिंग के लिए सोशल मीडिया का उपयोग करती हैं?
- **Rajasthani Title**: Q5. का मार्केटिंग खातर सोशल मीडिया वापरों हो?
- **Display Name Formula**: `=LOOKUP("Q_H_05_00", "AppVariables", "ID", "Label")`

---

### Q6. Which social media platforms do you use for your business? (Multiselect)
- **Physical Column**: `SocialPlatformsUsed`
- **Question ID**: `Q_H_06_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q6. व्यवसाय के लिए किन सोशल मीडिया प्लेटफॉर्म का उपयोग करती हैं?
- **Rajasthani Title**: Q6. किण-किण सोशल मीडिया रो उपयोग करो हो?
- **Display Name Formula**: `=LOOKUP("Q_H_06_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[SocialMediaForMarketing] = "OPT_YES"`

---

### Q7. How do you use these platforms in your business?
- **Physical Column**: `SocialPlatformUsageMode`
- **Question ID**: `Q_H_07_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q7. आप अपने व्यवसाय में इन प्लेटफॉर्म का उपयोग कैसे करती हैं?
- **Rajasthani Title**: Q7. सोशल मीडिया रो उपयोग किकण करो हो?
- **Display Name Formula**: `=LOOKUP("Q_H_07_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[SocialMediaForMarketing] = "OPT_YES"`

---

### Q8. How often do you use social media for your business?
- **Physical Column**: `SocialMediaFrequency`
- **Question ID**: `Q_H_08_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q8. आप अपने व्यवसाय के लिए सोशल मीडिया का कितनी बार उपयोग करती हैं?
- **Rajasthani Title**: Q8. सोशल मीडिया कित्ती बार वापरों हो?
- **Display Name Formula**: `=LOOKUP("Q_H_08_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[SocialMediaForMarketing] = "OPT_YES"`

---

### Q1. In which year was the OSF intervention made?-------
- **Physical Column**: `OSFInterventionYear`
- **Question ID**: `Q_I_01_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q1. OSF हस्तक्षेप किस वर्ष किया गया था?
- **Rajasthani Title**: Q1. OSF हस्तक्षेप किण साल होयो हो?
- **Display Name Formula**: `=LOOKUP("Q_I_01_00", "AppVariables", "ID", "Label")`

---

### Q2. Is your business still operational?
- **Physical Column**: `BusinessOperationalStatus`
- **Question ID**: `Q_I_02_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q2. क्या आपका व्यवसाय अभी भी चालू है?
- **Rajasthani Title**: Q2. का थारो धंधो अबै भी चालै है?
- **Display Name Formula**: `=LOOKUP("Q_I_02_00", "AppVariables", "ID", "Label")`

---

### Q3. What are the reasons for scaling down the business/closing the business? ( Don’t prompt)
- **Physical Column**: `ScalingDownClosingReasons`
- **Question ID**: `Q_I_03_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q3. व्यवसाय को कम करने / बंद करने के क्या कारण हैं?
- **Rajasthani Title**: Q3. धंधो घटायो या बंद करयो क्यूं?
- **Display Name Formula**: `=LOOKUP("Q_I_03_00", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `[BusinessOperationalStatus] = "BSTAT_CLOSED" OR [BusinessOperationalStatus] = "BSTAT_SCALED_DOWN"`

---

### Any other, specify……..
- **Physical Column**: `ScalingDownOtherReason`
- **Question ID**: `Q_I_03_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य कारण बताएं
- **Rajasthani Title**: दूजो कारण बताओ
- **Display Name Formula**: `=LOOKUP("Q_I_03_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("SDR_OTHER", [ScalingDownClosingReasons])`

---

### Q4. What kind of support could have helped you to manage your business?
- **Physical Column**: `SupportNeededForSustenance`
- **Question ID**: `Q_I_04_00`
- **Type / ValueControl**: `Text`
- **Hindi Title**: Q4. किस प्रकार की सहायता से आप व्यवसाय को संभाल सकती थीं?
- **Rajasthani Title**: Q4. किण मदद सूं धंधो संभल सकतो हो?
- **Display Name Formula**: `=LOOKUP("Q_I_04_00", "AppVariables", "ID", "Label")`

---

### Any other, specify
- **Physical Column**: `SupportNeededOther`
- **Question ID**: `Q_I_04_01`
- **Type / ValueControl**: `Text`
- **Hindi Title**: अन्य सहायता बताएं
- **Rajasthani Title**: दूजी मदद बताओ
- **Display Name Formula**: `=LOOKUP("Q_I_04_01", "AppVariables", "ID", "Label")`
- **Show_If Expression**: `IN("SUP_OTHER", [SupportNeededForSustenance])`

---
