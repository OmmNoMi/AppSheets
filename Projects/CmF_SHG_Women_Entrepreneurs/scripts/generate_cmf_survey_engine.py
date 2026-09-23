#!/usr/bin/env python3
"""
generate_cmf_survey_engine.py
=============================
Processes the 'Study on Performance of SHG-led Women Entrepreneurs in Rajasthan'
Questionnaire Word Doc into complete OmmNoMi Standard AppVariables, Data Tables,
and AppSheet Schemas.
"""

import os
import sys
import csv
import json
import re
from datetime import datetime

STANDARD_HEADERS = [
    'ID', 'Table', 'Column', 'Tags', 'ValueControl', 'Title', 'Description', 'UsedFor',
    'Decimal', 'EnumValue', 'EnumList', 'VariableList', 'DateValue', 'Photo', 'URL', 'File',
    'Title_hi', 'Title_mr', 'ActionIcon', 'LastEditBy', 'LastEditOn'
]

OUTPUT_DIR = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data"
os.makedirs(OUTPUT_DIR, exist_ok=True)
NOW_STR = datetime.now().strftime("%m/%d/%Y %H:%M:%S")

app_vars = []

def add_var(id_val, table='', col='', tags='', vc='Enum', title='', desc='', used_for='', 
            enum_val='', var_list='', enum_list='', title_hi='', title_mr='', icon='', decimal=None):
    row = {h: '' for h in STANDARD_HEADERS}
    row['ID'] = str(id_val).strip()
    row['Table'] = str(table).strip()
    row['Column'] = str(col).strip()
    row['Tags'] = str(tags).strip()
    row['ValueControl'] = str(vc).strip()
    row['Title'] = str(title).strip()
    row['Description'] = str(desc).strip()
    row['UsedFor'] = str(used_for).strip()
    row['EnumValue'] = str(enum_val if enum_val else title).strip()
    row['VariableList'] = str(var_list).strip()
    row['EnumList'] = str(enum_list).strip()
    row['Title_hi'] = str(title_hi).strip()
    row['Title_mr'] = str(title_mr).strip()
    row['ActionIcon'] = str(icon).strip()
    if decimal is not None:
        row['Decimal'] = str(decimal)
    row['LastEditBy'] = 'DevNoMi'
    row['LastEditOn'] = NOW_STR
    app_vars.append(row)

# 1. Base AppVariables
add_var('CompanyName', 'AppVariables', '', 'System, Config', 'Enum', 'Company Name', 'CmF & RAJEEVIKA Study', 'Header title in reports', 'Centre for microFinance (CmF)', title_hi='सेंटर फॉर माइक्रोफाइनेंस (CmF)')
add_var('AppName', 'AppVariables', '', 'System, Config', 'Enum', 'App Name', 'SHG Women Entrepreneurs Survey', 'Application Title', 'SHG Women Entrepreneurs Study', title_hi='एसएचजी महिला उद्यमी अध्ययन')
add_var('AppVersion', 'AppVariables', '', 'System, Config', 'Enum', 'Version', '1.0.0', 'Version identifier', '1.0.0')

# 2. Action Grid Navigation Buttons
actions = [
    ('ACT_Profile', 'Survey', 'ActionGrid', 'UI, Navigation', 'Enum', 'Profile & Agency', 'Lens 1: Respondent & Household Profile', 'Navigate to Profile sub-module', 'प्रोफ़ाइल एवं परिवार', '👩'),
    ('ACT_Operations', 'Survey', 'ActionGrid', 'UI, Navigation', 'Enum', 'Enterprise Operations', 'Lens 2: Operations, Capital & Record Keeping', 'Navigate to Operations sub-module', 'उद्यम संचालन', '🏪'),
    ('ACT_Challenges', 'Survey', 'ActionGrid', 'UI, Navigation', 'Enum', 'Challenges & Coping', 'Lens 3: Sourcing, Suppliers, Recovery & Strategies', 'Navigate to Challenges sub-module', 'चुनौतियां एवं समाधान', '⚡'),
    ('ACT_SchemeImpact', 'Survey', 'ActionGrid', 'UI, Navigation', 'Enum', 'SVEP & OSF Impact', 'Lens 4: Loan Usage, Income Changes & CRP Guidance', 'Navigate to Scheme Impact sub-module', 'SVEP/OSF प्रभाव', '📈'),
    ('ACT_OnlineMedia', 'Survey', 'ActionGrid', 'UI, Navigation', 'Enum', 'Digital & Social Media', 'Lens 5: Smartphone, QR Code, UPI & Social Media', 'Navigate to Digital sub-module', 'डिजिटल एवं सोशल मीडिया', '📱'),
    ('ACT_BaranPostExit', 'Survey', 'ActionGrid', 'UI, Navigation', 'Enum', 'Baran Post-Exit', 'Lens 6: Post-exit OSF assessment in Baran', 'Navigate to Baran Post-Exit sub-module', 'बारां पोस्ट-एग्जिट स्थिति', '🏛️'),
    ('ACT_Complete', 'Survey', 'ActionGrid', 'UI, Action', 'Enum', 'Submit Survey', 'Finalize & lock survey entry', 'Submit completed survey', 'सर्वे पूर्ण करें', '✅'),
]
for act in actions:
    add_var(act[0], act[1], act[2], act[3], act[4], act[5], act[6], act[7], title_hi=act[8], icon=act[9])

# 3. Districts, Blocks, and Geography
districts = [
    ('DIST_BARAN', 'Baran', 'बारां', 'Fertile East'),
    ('DIST_CHURU', 'Churu', 'चूरू', 'Arid West'),
    ('DIST_DAUSA', 'Dausa', 'दौसा', 'Semi-Arid'),
    ('DIST_DUNGARPUR', 'Dungarpur', 'डूंगरपुर', 'Southern Tribal'),
    ('DIST_JODHPUR', 'Jodhpur', 'जोधपुर', 'Western Arid')
]
dist_ids = []
for did, dname, dhi, zone in districts:
    add_var(did, 'AppVariables', 'District', 'Option, Geography', 'Enum', dname, zone, 'District Option', dname, title_hi=dhi)
    dist_ids.append(did)

add_var('Q_A_01_00', 'Survey', 'District', 'QuestionPrompt, Survey, District', 'VariableList', 'District', 'Section A Q1', 'District selector', var_list=' , '.join(dist_ids), title_hi='जिला')

blocks = [
    # Baran
    ('BLK_CHHIPABAROD', 'Chhipabarod', 'छीपाबड़ौद', 'DIST_BARAN'),
    ('BLK_BARAN', 'Baran', 'बारां', 'DIST_BARAN'),
    ('BLK_KISHANGANJ', 'Kishanganj', 'किशनगंज', 'DIST_BARAN'),
    ('BLK_SHAHBAD', 'Shahbad', 'शाहबाद', 'DIST_BARAN'),
    ('BLK_ANTA', 'Anta', 'अंता', 'DIST_BARAN'),
    ('BLK_ATRU', 'Atru', 'अटरू', 'DIST_BARAN'),
    ('BLK_CHHABRA', 'Chhabra', 'छबड़ा', 'DIST_BARAN'),
    ('BLK_MANGROL', 'Mangrol', 'मांगरोल', 'DIST_BARAN'),
    # Churu
    ('BLK_SARDARSHEHER', 'Sardarshahar', 'सरदारशहर', 'DIST_CHURU'),
    ('BLK_BIDASAR', 'Bidasar', 'बीदासर', 'DIST_CHURU'),
    ('BLK_RATANGARH', 'Ratangarh', 'रतनगढ़', 'DIST_CHURU'),
    ('BLK_SUJANGARH', 'Sujangarh', 'सुजानगढ़', 'DIST_CHURU'),
    ('BLK_CHURU', 'Churu', 'चूरू', 'DIST_CHURU'),
    ('BLK_RAJGARH', 'Rajgarh', 'राजगढ़', 'DIST_CHURU'),
    ('BLK_TARANAGAR', 'Taranagar', 'तारानगर', 'DIST_CHURU'),
    # Dausa
    ('BLK_SIKANDRA', 'Sikandra', 'सिकंदरा', 'DIST_DAUSA'),
    ('BLK_BANDIKUI', 'Bandikui', 'बांदीकुई', 'DIST_DAUSA'),
    ('BLK_DAUSA', 'Dausa', 'दौसा', 'DIST_DAUSA'),
    ('BLK_LALSOT', 'Lalsot', 'लालसोट', 'DIST_DAUSA'),
    ('BLK_MAHWA', 'Mahwa', 'महवा', 'DIST_DAUSA'),
    # Dungarpur
    ('BLK_SAGWARA', 'Sagwara', 'सागवाड़ा', 'DIST_DUNGARPUR'),
    ('BLK_GALIAKOT', 'Galiakot', 'गलियाकोट', 'DIST_DUNGARPUR'),
    ('BLK_BICHHIWARA', 'Bichhiwara', 'बिछीवाड़ा', 'DIST_DUNGARPUR'),
    ('BLK_DUNGARPUR', 'Dungarpur', 'डूंगरपुर', 'DIST_DUNGARPUR'),
    ('BLK_ASPUR', 'Aspur', 'आसपुर', 'DIST_DUNGARPUR'),
    ('BLK_SIMALWARA', 'Simalwara', 'सीमलवाड़ा', 'DIST_DUNGARPUR'),
    # Jodhpur
    ('BLK_MANDORE', 'Mandore', 'मंडोर', 'DIST_JODHPUR'),
    ('BLK_LUNI', 'Luni', 'लूणी', 'DIST_JODHPUR'),
    ('BLK_BILARA', 'Bilara', 'बिलाड़ा', 'DIST_JODHPUR'),
    ('BLK_OSIAN', 'Osian', 'ओसियां', 'DIST_JODHPUR'),
    ('BLK_PHALODI', 'Phalodi', 'फलोदी', 'DIST_JODHPUR'),
    ('BLK_BAORI', 'Baori', 'बावड़ी', 'DIST_JODHPUR'),
    ('BLK_BHOPALGARH', 'Bhopalgarh', 'भोपालगढ़', 'DIST_JODHPUR')
]
blk_ids = []
for bid, bname, bhi, parent_dist in blocks:
    add_var(bid, 'AppVariables', 'Block', f'Option, Geography, Parent:{parent_dist}', 'Enum', bname, parent_dist, 'Block Option', bname, title_hi=bhi)
    blk_ids.append(bid)

add_var('Q_A_02_00', 'Survey', 'Block', 'QuestionPrompt, Survey, Block', 'VariableList', 'Block', 'Section A Q2', 'Block selector', var_list=' , '.join(blk_ids), title_hi='ब्लॉक / खंड')

# Section A other questions
add_var('Q_A_03_00', 'Survey', 'VillageGP', 'QuestionPrompt, Survey', 'Text', 'Village / Gram Panchayat', 'Section A Q3', 'Village name', title_hi='गांव / ग्राम पंचायत')
add_var('Q_A_04_00', 'Survey', 'CLFName', 'QuestionPrompt, Survey', 'Text', 'CLF Name', 'Section A Q4', 'Cluster Level Federation', title_hi='सीएलएफ का नाम')
add_var('Q_A_05_00', 'Survey', 'VOName', 'QuestionPrompt, Survey', 'Text', 'VO Name', 'Section A Q5', 'Village Organization', title_hi='ग्राम संगठन (VO) का नाम')
add_var('Q_A_06_00', 'Survey', 'SHGName', 'QuestionPrompt, Survey', 'Text', 'SHG Name', 'Section A Q6', 'Self Help Group', title_hi='स्वयं सहायता समूह (SHG) का नाम')
add_var('Q_A_07_00', 'Survey', 'RespondentName', 'QuestionPrompt, Survey', 'Name', 'Respondent Name', 'Section A Q7', 'Name of woman entrepreneur / respondent', title_hi='उत्तरदाता का नाम')
add_var('Q_A_08_00', 'Survey', 'EnterpriseName', 'QuestionPrompt, Survey', 'Text', 'Enterprise Name', 'Section A Q8', 'Trade / Shop name', title_hi='उद्यम / दुकान का नाम')
add_var('Q_A_09_00', 'Survey', 'SetupYear', 'QuestionPrompt, Survey', 'Number', 'Year of Setting Up Enterprise', 'Section A Q9', 'Enterprise setup year (e.g. 2020)', title_hi='उद्यम शुरू करने का वर्ष')

# Q10 Main business activities (Multi-select)
activities = [
    ('ACT_GROCERY', 'Grocery', 'किराना'),
    ('ACT_GENSTORE', 'General store', 'जनरल स्टोर / प्रसाधन सामग्री'),
    ('ACT_LEATHER', 'Leather work / footwear', 'चमड़े का काम / जूते-चप्पल'),
    ('ACT_FLOURMILL', 'Flour mill (Chakki)', 'आटा चक्की'),
    ('ACT_TAILORING', 'Tailoring', 'सिलाई / टेलरिंग'),
    ('ACT_APPAREL', 'Apparel / readymade garments', 'कपड़ा / रेडीमेड वस्त्र'),
    ('ACT_BEAUTY', 'Beauty parlour', 'ब्यूटी पार्लर'),
    ('ACT_HANDICRAFT', 'Handicraft', 'हस्तशिल्प / कसीदाकारी'),
    ('ACT_DAIRY', 'Dairy shop / milk collection', 'डेयरी दुकान / दुग्ध संकलन'),
    ('ACT_AUTOMECH', 'Auto-mechanic / puncture repair', 'ऑटो मैकेनिक / पंक्चर'),
    ('ACT_EMITRA', 'E-Mitra / CSC kiosk', 'ई-मित्र / ऑनलाइन सेवा केंद्र'),
    ('ACT_MOBILEREPAIR', 'Mobile repair shop', 'मोबाइल रिपेयर एवं रिचार्ज'),
    ('ACT_TRANSPORT', 'Transport / loading vehicle', 'परिवहन / लोडिंग वाहन'),
    ('ACT_OTHER', 'Other business activity', 'अन्य व्यावसायिक गतिविधि')
]
act_ids = []
for aid, aname, ahi in activities:
    add_var(aid, 'AppVariables', 'Activity', 'Option, Trade', 'Enum', aname, '', 'Trade Activity Option', aname, title_hi=ahi)
    act_ids.append(aid)

add_var('Q_A_10_00', 'Survey', 'BusinessActivities', 'QuestionPrompt, Survey, MultiSelect', 'VariableList', 'Main Business Activities of the Enterprise (Tick all applicable)', 'Section A Q10', 'Main enterprise activities', var_list=' , '.join(act_ids), title_hi='उद्यम की मुख्य व्यावसायिक गतिविधियां (सभी लागू विकल्पों पर टिक करें)')

# ==========================================
# SECTION B: RESPONDENT & HOUSEHOLD PROFILE
# ==========================================
relations = [
    ('REL_SELF', 'Self', 'स्वयं'),
    ('REL_HUSBAND', 'Husband', 'पति'),
    ('REL_SON', 'Son', 'पुत्र'),
    ('REL_DAUGHTER', 'Daughter', 'पुत्री'),
    ('REL_OTHER', 'Any other', 'अन्य कोई')
]
rel_ids = [r[0] for r in relations]
for rid, rname, rhi in relations:
    add_var(rid, 'AppVariables', 'Relation', 'Option', 'Enum', rname, '', 'Relation Option', rname, title_hi=rhi)

add_var('Q_B_01_00', 'ProfileAgency', 'RelationWithSHGMember', 'QuestionPrompt, Profile', 'VariableList', 'What is respondent’s relation with SHG member?', 'Section B Q1', 'Respondent relation', var_list=' , '.join(rel_ids), title_hi='उत्तरदाता का SHG सदस्य से क्या संबंध है?')

age_cohorts = [
    ('AGE_18_25', '18-25', '18-25 वर्ष'),
    ('AGE_25_35', '25-35', '25-35 वर्ष'),
    ('AGE_35_45', '35-45', '35-45 वर्ष'),
    ('AGE_45_55', '45-55', '45-55 वर्ष'),
    ('AGE_ABOVE_55', 'Above 55', '55 वर्ष से अधिक')
]
age_ids = [a[0] for a in age_cohorts]
for aid, aname, ahi in age_cohorts:
    add_var(aid, 'AppVariables', 'AgeCohort', 'Option', 'Enum', aname, '', 'Age Cohort Option', aname, title_hi=ahi)

add_var('Q_B_02_00', 'ProfileAgency', 'AgeCohort', 'QuestionPrompt, Profile', 'VariableList', 'What is the age of SHG member?', 'Section B Q2', 'Age cohort', var_list=' , '.join(age_ids), title_hi='SHG सदस्य की आयु क्या है?')

marital_statuses = [
    ('MAR_SINGLE', 'Single', 'अविवाहित'),
    ('MAR_MARRIED', 'Married', 'विवाहित'),
    ('MAR_WIDOWED', 'Widowed', 'विधवा'),
    ('MAR_SEPARATED', 'Separated', 'परित्यक्ता / अलग'),
    ('MAR_DIVORCED', 'Divorced', 'तलाकशुदा')
]
mar_ids = [m[0] for m in marital_statuses]
for mid, mname, mhi in marital_statuses:
    add_var(mid, 'AppVariables', 'MaritalStatus', 'Option', 'Enum', mname, '', 'Marital Status Option', mname, title_hi=mhi)

add_var('Q_B_03_00', 'ProfileAgency', 'MaritalStatus', 'QuestionPrompt, Profile', 'VariableList', 'What is the marital status of the SHG member?', 'Section B Q3', 'Marital status', var_list=' , '.join(mar_ids), title_hi='SHG सदस्य की वैवाहिक स्थिति क्या है?')

castes = [
    ('CST_SC', 'SC (Scheduled Caste)', 'अनुसूचित जाति (SC)'),
    ('CST_ST', 'ST (Scheduled Tribe)', 'अनुसूचित जनजाति (ST)'),
    ('CST_OBC', 'OBC (Other Backward Class)', 'अन्य पिछड़ा वर्ग (OBC)'),
    ('CST_GEN', 'General', 'सामान्य (General)')
]
cst_ids = [c[0] for c in castes]
for cid, cname, chi in castes:
    add_var(cid, 'AppVariables', 'Caste', 'Option', 'Enum', cname, '', 'Caste Option', cname, title_hi=chi)

add_var('Q_B_04_00', 'ProfileAgency', 'CasteCategory', 'QuestionPrompt, Profile', 'VariableList', 'What is the caste?', 'Section B Q4', 'Caste category', var_list=' , '.join(cst_ids), title_hi='जाति वर्ग क्या है?')

educations = [
    ('EDU_ILLITERATE', 'Illiterate', 'निरक्षर'),
    ('EDU_ILLITERATE_CALC', 'Illiterate but able to calculate', 'निरक्षर लेकिन हिसाब-किताब में सक्षम'),
    ('EDU_5TH', '5th pass', '5वीं पास'),
    ('EDU_8TH', '8th pass', '8वीं पास'),
    ('EDU_10TH', '10th pass', '10वीं पास'),
    ('EDU_12TH', '12th pass', '12वीं पास'),
    ('EDU_GRADUATE', 'Graduate & above', 'स्नातक एवं उच्च शिक्षा')
]
edu_ids = [e[0] for e in educations]
for eid, ename, ehi in educations:
    add_var(eid, 'AppVariables', 'Education', 'Option', 'Enum', ename, '', 'Education Option', ename, title_hi=ehi)

add_var('Q_B_05_00', 'ProfileAgency', 'EducationStatus', 'QuestionPrompt, Profile', 'VariableList', 'What is the education status of SHG member?', 'Section B Q5', 'Education level', var_list=' , '.join(edu_ids), title_hi='SHG सदस्य की शैक्षणिक योग्यता क्या है?')

add_var('Q_B_06_00', 'ProfileAgency', 'TotalFamilyMembers', 'QuestionPrompt, Profile', 'Number', 'How many members are in the family?', 'Section B Q6', 'Total family count', title_hi='परिवार में कुल कितने सदस्य हैं?')
add_var('Q_B_07_01', 'ProfileAgency', 'EarningMembers', 'QuestionPrompt, Profile', 'Number', 'Earning members', 'Section B Q7.1', 'Earning count', title_hi='कमाने वाले सदस्य')
add_var('Q_B_07_02', 'ProfileAgency', 'PensionMembers', 'QuestionPrompt, Profile', 'Number', 'Members with pension', 'Section B Q7.2', 'Pensioner count', title_hi='पेंशन प्राप्त सदस्य')
add_var('Q_B_07_03', 'ProfileAgency', 'NonEarningMembers', 'QuestionPrompt, Profile', 'Number', 'Non-earning members', 'Section B Q7.3', 'Non-earning count', title_hi='गैर-कमाने वाले / आश्रित सदस्य')
add_var('Q_B_07_04', 'ProfileAgency', 'DisabledMembers', 'QuestionPrompt, Profile', 'Number', 'Members with disability', 'Section B Q7.4', 'Disabled count', title_hi='दिव्यांग सदस्य')

incomes = [
    ('INC_LT_120K', 'Less than Rs 1,20,000', 'रु 1,20,000 से कम'),
    ('INC_120K_160K', 'Rs 1,20,000 to Rs 1,60,000', 'रु 1,20,000 से रु 1,60,000'),
    ('INC_160K_200K', 'Rs 1,60,000 to Rs 2,00,000', 'रु 1,60,000 से रु 2,00,000'),
    ('INC_200K_250K', 'Rs 2,00,000 to Rs 2,50,000', 'रु 2,00,000 से रु 2,50,000'),
    ('INC_250K_300K', 'Rs 2,50,000 to Rs 3,00,000', 'रु 2,50,000 से रु 3,00,000'),
    ('INC_300K_350K', 'Rs 3,00,000 to Rs 3,50,000', 'रु 3,00,000 से रु 3,50,000'),
    ('INC_GT_350K', 'Above Rs 3,50,000', 'रु 3,50,000 से अधिक')
]
inc_ids = [i[0] for i in incomes]
for iid, iname, ihi in incomes:
    add_var(iid, 'AppVariables', 'AnnualIncomeBracket', 'Option', 'Enum', iname, '', 'Income Bracket Option', iname, title_hi=ihi)

add_var('Q_B_08_00', 'ProfileAgency', 'AnnualHouseholdIncome', 'QuestionPrompt, Profile', 'VariableList', 'What is your annual household income?', 'Section B Q8', 'Annual household income', var_list=' , '.join(inc_ids), title_hi='आपके परिवार की कुल वार्षिक आय कितनी है?')

# Q9 Members with monetary contribution options
income_sources = [
    ('INCSRC_AGRI', 'Agricultural income', 'कृषि आय'),
    ('INCSRC_SALARY', 'Fixed Salary', 'नियमित वेतन / नौकरी'),
    ('INCSRC_WAGES', 'Wages / Daily labor', 'दैनिक मजदूरी'),
    ('INCSRC_SELFEMP', 'Self employed / skilled service', 'स्वरोजगार / कुशल कारीगर'),
    ('INCSRC_SHOP', 'Other Shop / Trade', 'अन्य दुकान / व्यापार'),
    ('INCSRC_NTFP', 'NTFP sale (Minor Forest Produce)', 'वनोपज (NTFP) संकलन व बिक्री'),
    ('INCSRC_DAIRY', 'Dairy / Milk sale', 'डेयरी / दुग्ध विक्रय'),
    ('INCSRC_ANIMAL', 'Sale of animals / livestock', 'पशुधन / पशु विक्रय'),
    ('INCSRC_MNREGA', 'MNREGA wages', 'मनरेगा मजदूरी'),
    ('INCSRC_PENSION', 'Pension', 'सरकारी / सामाजिक पेंशन'),
    ('INCSRC_OTHER', 'Other income source', 'अन्य आय स्रोत')
]
incsrc_ids = [s[0] for s in income_sources]
for sid, sname, shi in income_sources:
    add_var(sid, 'AppVariables', 'IncomeSourceType', 'Option', 'Enum', sname, '', 'Income Source Type', sname, title_hi=shi)

add_var('Q_B_09_00', 'HouseholdIncomeSources', 'IncomeSourceType', 'QuestionPrompt, Profile', 'VariableList', 'Type of Income Source', 'Section B Q9', 'Income type', var_list=' , '.join(incsrc_ids), title_hi='आय का प्रकार')

roles = [
    ('ROL_MEMBER', 'Member', 'साधारण सदस्य'),
    ('ROL_LEADERSHIP', 'Leadership role (President/Secretary/Treasurer/CRP)', 'नेतृत्व पद (अध्यक्ष/सचिव/कोषाध्यक्ष/सीआरपी)')
]
rol_ids = [r[0] for r in roles]
for rid, rname, rhi in roles:
    add_var(rid, 'AppVariables', 'SHGRole', 'Option', 'Enum', rname, '', 'SHG Role Option', rname, title_hi=rhi)

add_var('Q_B_10_00', 'ProfileAgency', 'RoleInSHG', 'QuestionPrompt, Profile', 'VariableList', 'What is your role in SHG?', 'Section B Q10', 'SHG Role', var_list=' , '.join(rol_ids), title_hi='SHG में आपकी क्या भूमिका है?')
add_var('Q_B_11_01', 'ProfileAgency', 'DurationAsMemberYears', 'QuestionPrompt, Profile', 'Number', 'Duration of SHG association as Member (in years)', 'Section B Q11.1', 'Member duration', title_hi='सदस्य के रूप में जुड़ाव अवधि (वर्षों में)')
add_var('Q_B_11_02', 'ProfileAgency', 'DurationInLeadershipYears', 'QuestionPrompt, Profile', 'Number', 'Duration of SHG association in Leadership role (in years)', 'Section B Q11.2', 'Leadership duration', title_hi='नेतृत्व पद के रूप में जुड़ाव अवधि (वर्षों में)')
add_var('Q_B_12_00', 'ProfileAgency', 'RelatedToCRP', 'QuestionPrompt, Profile', 'Enum', 'Are you related to any SVEP/OSF CRP?', 'Section B Q12', 'Related to CRP', title_hi='क्या आप किसी SVEP/OSF सीआरपी से संबंधित/रिश्तेदार हैं?')

# ==========================================
# SECTION C: ENTERPRISE OPERATIONS
# ==========================================
who_started_opts = [
    ('STR_SELF', 'Self', 'स्वयं'),
    ('STR_HUSBAND', 'Husband', 'पति'),
    ('STR_FAMILY', 'Family enterprise', 'पारिवारिक उद्यम')
]
str_ids = [s[0] for s in who_started_opts]
for sid, sname, shi in who_started_opts:
    add_var(sid, 'AppVariables', 'WhoStarted', 'Option', 'Enum', sname, '', 'Who Started Option', sname, title_hi=shi)

add_var('Q_C_01_00', 'EnterpriseOperations', 'WhoStartedEnterprise', 'QuestionPrompt, Operations', 'VariableList', 'Who started the enterprise?', 'Section C Q1', 'Founder of enterprise', var_list=' , '.join(str_ids), title_hi='उद्यम किसने शुरू किया?')
add_var('Q_C_02_00', 'EnterpriseOperations', 'StartDateYear', 'QuestionPrompt, Operations', 'Number', 'When was it started? (Year)', 'Section C Q2', 'Start year', title_hi='यह कब शुरू हुआ था? (वर्ष)')

operators = [
    ('OPR_SELF_ALONE', 'Self alone', 'स्वयं अकेले'),
    ('OPR_SELF_OCCASIONAL', 'Self with occasional support from family', 'स्वयं, परिवार के कभी-कभार सहयोग से'),
    ('OPR_SELF_REGULAR', 'Self with regular support from family', 'स्वयं, परिवार के नियमित सहयोग से'),
    ('OPR_HUSBAND_ONLY', 'Only husband', 'केवल पति'),
    ('OPR_JOINT', 'Husband and wife (joint management)', 'पति और पत्नी (संयुक्त प्रबंधन)'),
    ('OPR_FAMILY_MEMBERS', 'Family members', 'परिवार के अन्य सदस्य')
]
opr_ids = [o[0] for o in operators]
for oid, oname, ohi in operators:
    add_var(oid, 'AppVariables', 'WhoOperates', 'Option', 'Enum', oname, '', 'Operator Option', oname, title_hi=ohi)

add_var('Q_C_03_00', 'EnterpriseOperations', 'WhoOperatesEnterprise', 'QuestionPrompt, Operations', 'VariableList', 'Who operates the enterprise? (Major decision making & operations)', 'Section C Q3', 'Operator of enterprise', var_list=' , '.join(opr_ids), title_hi='उद्यम का संचालन और मुख्य निर्णय कौन करता है?')

operating_hours = [
    ('HRS_LT_4', 'Less than 4 hours', '4 घंटे से कम'),
    ('HRS_4_5', '4-5 hours', '4-5 घंटे'),
    ('HRS_5_8', '5-8 hours', '5-8 घंटे'),
    ('HRS_8_10', '8-10 hours', '8-10 घंटे'),
    ('HRS_GT_10', 'More than 10 hours', '10 घंटे से अधिक')
]
hrs_ids = [h[0] for h in operating_hours]
for hid, hname, hhi in operating_hours:
    add_var(hid, 'AppVariables', 'OperatingHours', 'Option', 'Enum', hname, '', 'Hours Option', hname, title_hi=hhi)

add_var('Q_C_04_00', 'EnterpriseOperations', 'DailyOperatingHours', 'QuestionPrompt, Operations', 'VariableList', 'For how many hours in a day the shop/enterprise remains open?', 'Section C Q4', 'Daily operating hours', var_list=' , '.join(hrs_ids), title_hi='दुकान/उद्यम प्रतिदिन कितने घंटे खुला रहता है?')

places = [
    ('PLC_OWN_SHOP', 'Own shop', 'खुद की दुकान'),
    ('PLC_OWN_HOUSE', 'Operating from own house', 'खुद के घर से संचालन'),
    ('PLC_RENT_SHOP', 'Rented shop', 'किराए की दुकान'),
    ('PLC_RENT_HOUSE', 'Operating from rented house', 'किराए के मकान से संचालन')
]
plc_ids = [p[0] for p in places]
for pid, pname, phi in places:
    add_var(pid, 'AppVariables', 'BusinessPlace', 'Option', 'Enum', pname, '', 'Business Place Option', pname, title_hi=phi)

add_var('Q_C_05_00', 'EnterpriseOperations', 'BusinessPlaceType', 'QuestionPrompt, Operations', 'VariableList', 'Type of business place?', 'Section C Q5', 'Premises type', var_list=' , '.join(plc_ids), title_hi='कार्यस्थल / व्यवसाय स्थल का प्रकार?')

reasons_starting = [
    ('RSN_ALT_INCOME', 'My family needed an alternate source of income', 'परिवार को अतिरिक्त आय स्रोत की आवश्यकता थी'),
    ('RSN_OWN_BUSINESS', 'I wanted to own/run my own business', 'मेरी खुद का व्यवसाय चलाने की इच्छा थी'),
    ('RSN_SKILL_TRAINED', 'I/my husband learnt the skill/got trained and wanted to start venture', 'मैंने/पति ने हुनर सीखा/प्रशिक्षण लिया और उद्यम शुरू करना चाहा'),
    ('RSN_PRIOR_EXP', 'I/my husband had prior experience in the same field', 'मुझे/पति को इस कार्य का पुराना अनुभव था'),
    ('RSN_CRP_ENCOURAGED', 'The OSF/SVEP CRP encouraged and supported us to start', 'OSF/SVEP सीआरपी ने प्रोत्साहित किया और सहायता दी')
]
rsn_ids = [r[0] for r in reasons_starting]
for rid, rname, rhi in reasons_starting:
    add_var(rid, 'AppVariables', 'ReasonStarting', 'Option', 'Enum', rname, '', 'Reason Option', rname, title_hi=rhi)

add_var('Q_C_06_00', 'EnterpriseOperations', 'ReasonsForStarting', 'QuestionPrompt, Operations, MultiSelect', 'VariableList', 'Reasons for starting the business (Tick all relevant)', 'Section C Q6', 'Reasons for starting', var_list=' , '.join(rsn_ids), title_hi='उद्यम शुरू करने के मुख्य कारण (सभी लागू विकल्पों पर टिक करें)')

factors_helping = [
    ('FCT_OWN_SPACE', 'My family owned the space so it was easy to start', 'परिवार के पास खुद की जगह उपलब्ध थी'),
    ('FCT_FAMILY_SUPPORT', 'My family was supportive of my running the business', 'परिवार का पूरा सहयोग और समर्थन था'),
    ('FCT_SAVINGS', 'We had sufficient savings to start the business', 'शुरुआत के लिए हमारे पास पर्याप्त बचत थी'),
    ('FCT_SHG_LOAN', 'The SHG loan was made available timely', 'SHG से समय पर ऋण उपलब्ध हो गया'),
    ('FCT_LOW_INTEREST', 'Loan was available at low interest rates', 'कम ब्याज दर पर ऋण मिला'),
    ('FCT_CRP_GUIDANCE', 'The OSF/SVEP CRP was ready to guide, their guidance was very important', 'OSF/SVEP सीआरपी का मार्गदर्शन बहुत महत्वपूर्ण साबित हुआ')
]
fct_ids = [f[0] for f in factors_helping]
for fid, fname, fhi in factors_helping:
    add_var(fid, 'AppVariables', 'FactorHelping', 'Option', 'Enum', fname, '', 'Helping Factor Option', fname, title_hi=fhi)

add_var('Q_C_07_00', 'EnterpriseOperations', 'FactorsHelpedStarting', 'QuestionPrompt, Operations, MultiSelect', 'VariableList', 'Which factors helped in starting the business? (Tick all relevant)', 'Section C Q7', 'Enabling factors', var_list=' , '.join(fct_ids), title_hi='उद्यम शुरू करने में किन कारकों ने मदद की? (सभी लागू विकल्पों पर टिक करें)')

record_habits = [
    ('REC_YES_SELF', 'Yes, self maintains written records regularly', 'हाँ, स्वयं नियमित लिखित हिसाब रखती हैं'),
    ('REC_YES_FAMILY', 'Yes, with help of family member', 'हाँ, परिवार के सदस्य की मदद से'),
    ('REC_YES_HUSBAND', 'Yes, husband maintains (in joint management)', 'हाँ, पति हिसाब-किताब रखते हैं'),
    ('REC_NO', 'No, do not record', 'नहीं, कोई लिखित हिसाब नहीं रखते'),
    ('REC_IRREGULAR', 'Don’t record regularly / irregular', 'नियमित रूप से दर्ज नहीं करते')
]
rec_ids = [r[0] for r in record_habits]
for rid, rname, rhi in record_habits:
    add_var(rid, 'AppVariables', 'RecordHabit', 'Option', 'Enum', rname, '', 'Record Habit Option', rname, title_hi=rhi)

add_var('Q_C_08_00', 'EnterpriseOperations', 'MaintainsWrittenRecords', 'QuestionPrompt, Operations', 'VariableList', 'Does SHG member maintain written records of business transactions regularly?', 'Section C Q8', 'Record keeping habit', var_list=' , '.join(rec_ids), title_hi='क्या SHG सदस्य व्यावसायिक लेन-देन का नियमित लिखित रिकॉर्ड रखती हैं?')

record_methods = [
    ('MTH_RECEIPT_BILLS', 'Receipt book / bills', 'रसीद बुक / बिल'),
    ('MTH_DAILY_DIARY', 'Maintain daily diary', 'दैनिक डायरी / बही-खाता'),
    ('MTH_CRP_DIARY', 'Maintain daily diary as taught by OSF/SVEP CRP', 'OSF/SVEP सीआरपी द्वारा सिखाई गई दैनिक डायरी'),
    ('MTH_NOT_REGULAR', 'Don’t record regularly', 'नियमित रिकॉर्ड नहीं रखते')
]
mth_ids = [m[0] for m in record_methods]
for mid, mname, mhi in record_methods:
    add_var(mid, 'AppVariables', 'RecordMethod', 'Option', 'Enum', mname, '', 'Record Method Option', mname, title_hi=mhi)

add_var('Q_C_09_00', 'EnterpriseOperations', 'RecordKeepingMethod', 'QuestionPrompt, Operations', 'VariableList', 'How do you maintain business transactions?', 'Section C Q9', 'Record keeping method', var_list=' , '.join(mth_ids), title_hi='आप व्यावसायिक लेन-देन का रिकॉर्ड कैसे रखती हैं?')

add_var('Q_C_10_00', 'EnterpriseOperations', 'FirstYearSeedCapital', 'QuestionPrompt, Operations', 'Decimal', 'In the first year of your enterprise, what was the amount of seed capital? (Rs)', 'Section C Q10', 'First year seed capital', title_hi='उद्यम के पहले वर्ष में प्रारंभिक पूंजी (बीज पूंजी) की राशि कितनी थी? (रु)')

# Q11 Capital sources options
cap_sources = [
    ('CAP_OWN_SAVINGS', 'Own Savings', 'व्यक्तिगत बचत'),
    ('CAP_FAMILY_FINANCE', 'Financed by family member', 'परिवार के सदस्य द्वारा वित्तपोषित'),
    ('CAP_PROFIT', 'Profit from business', 'व्यवसाय का पुनर्निवेशित लाभ'),
    ('CAP_MORTGAGE_GOLD', 'Mortgaged gold / silver', 'सोना/चांदी गिरवी रखकर'),
    ('CAP_SOLD_GOLD', 'Sold gold / silver', 'सोना/चांदी बेचकर'),
    ('CAP_LOAN_FAMILY', 'Loan from relatives / friends', 'रिश्तेदारों/मित्रों से ऋण'),
    ('CAP_LOAN_MONEYLENDER', 'Loan from local moneylender', 'साहूकार/महाजन से ऋण'),
    ('CAP_LOAN_SHG', 'Loan from SHG', 'SHG से ऋण'),
    ('CAP_LOAN_OSF_SVEP', 'Loan from OSF / SVEP / CIF', 'OSF / SVEP / CIF से ऋण'),
    ('CAP_LOAN_BC_GROUPS', 'Loan from private saving groups / BC', 'निजी बचत समूह / बीसी से ऋण'),
    ('CAP_LOAN_NBFC', 'Loan from MFI / NBFC', 'एमएफआई / एनबीएफसी से ऋण'),
    ('CAP_LOAN_BANK', 'Loan from Commercial / Gramin Banks', 'बैंक से ऋण')
]
capsrc_ids = [c[0] for c in cap_sources]
for cid, cname, chi in cap_sources:
    add_var(cid, 'AppVariables', 'CapitalSource', 'Option', 'Enum', cname, '', 'Capital Source', cname, title_hi=chi)

add_var('Q_C_11_00', 'CapitalTrajectory', 'SourceType', 'QuestionPrompt, Operations', 'VariableList', 'Capital Sources Trajectory', 'Section C Q11', 'Capital source type', var_list=' , '.join(capsrc_ids), title_hi='पूंजी स्रोत का प्रकार')

peak_cap_mgmt = [
    ('PKM_SHG_BORROW', 'I borrow money from SHG to purchase material', 'सामग्री खरीदने के लिए SHG से ऋण लेती हूँ'),
    ('PKM_MONEYLENDER', 'I borrow money from moneylender/NBFIs to purchase material', 'साहूकार/एनबीएफआई से उधार लेती हूँ'),
    ('PKM_BANKS', 'I borrow money from banks', 'बैंकों से ऋण लेती हूँ'),
    ('PKM_CREDIT_PURCHASE', 'I buy material on credit from suppliers', 'सप्लायर से उधारी पर माल लेती हूँ')
]
pkm_ids = [p[0] for p in peak_cap_mgmt]
for pid, pname, phi in peak_cap_mgmt:
    add_var(pid, 'AppVariables', 'PeakCapMgmt', 'Option', 'Enum', pname, '', 'Peak Management Option', pname, title_hi=phi)

add_var('Q_C_13_00', 'EnterpriseOperations', 'PeakSeasonCapitalManagement', 'QuestionPrompt, Operations, MultiSelect', 'VariableList', 'How do you manage capital during peak season? (Tick all relevant)', 'Section C Q13', 'Peak season management', var_list=' , '.join(pkm_ids), title_hi='पीक सीजन (त्योहारों/तेजी) में पूंजी का प्रबंध कैसे करती हैं? (सभी लागू विकल्पों पर टिक करें)')

# ==========================================
# SECTION D: ENTERPRISE CHALLENGES & COPING
# ==========================================
loc_convenience = [
    ('LOC_OWN_EASY', 'Yes, I own the space and get clients easily', 'हाँ, खुद की जगह है और ग्राहक आसानी से मिल जाते हैं'),
    ('LOC_RENT_EASY', 'Yes, found space easily on rent and get clients', 'हाँ, आसानी से किराए पर जगह मिल गई और ग्राहक आते हैं'),
    ('LOC_RENT_HIGH', 'Yes, but compared to others I was charged higher rent', 'हाँ, लेकिन दूसरों की तुलना में अधिक किराया लिया जाता है'),
    ('LOC_OWN_CANTMOVE', 'No, but I own the space and cannot move', 'नहीं, लेकिन खुद की जगह है इसलिए बदल नहीं सकते'),
    ('LOC_AFFORD_ONLY', 'No, but I could afford only this space', 'नहीं, लेकिन केवल यही जगह बजट में थी')
]
loc_ids = [l[0] for l in loc_convenience]
for lid, lname, lhi in loc_convenience:
    add_var(lid, 'AppVariables', 'LocConvenience', 'Option', 'Enum', lname, '', 'Location Option', lname, title_hi=lhi)

add_var('Q_CH_01_00', 'EnterpriseChallenges', 'LocationConvenience', 'QuestionPrompt, Challenges', 'VariableList', 'Is the location of your space convenient for your business?', 'Section C/D Q1', 'Location convenience', var_list=' , '.join(loc_ids), title_hi='क्या आपके व्यवसाय स्थल का स्थान सुविधाजनक है?')

supp_satisfaction = [
    ('SUP_NEARBY_DEMAND', 'Yes, supplier is nearby and supplies on demand', 'हाँ, सप्लायर पास का है और मांग पर माल देता है'),
    ('SUP_CREDIT_DISCOUNT', 'Yes, supplier offers credit purchase and discounts', 'हाँ, सप्लायर उधारी और छूट देता है'),
    ('SUP_MULTIPLE', 'I buy from different suppliers as per need/season', 'आवश्यकतानुसार अलग-अलग सप्लायरों से खरीदती हूँ'),
    ('SUP_OLD_RELY', 'No, but he is our old supplier and we rely on him', 'नहीं, लेकिन पुराना सप्लायर है इसलिए निर्भर हैं')
]
sup_ids = [s[0] for s in supp_satisfaction]
for sid, sname, shi in supp_satisfaction:
    add_var(sid, 'AppVariables', 'SuppSatisfaction', 'Option', 'Enum', sname, '', 'Supplier Option', sname, title_hi=shi)

add_var('Q_CH_02_00', 'EnterpriseChallenges', 'SupplierSatisfaction', 'QuestionPrompt, Challenges', 'VariableList', 'Are you happy with the supplier?', 'Section C/D Q2', 'Supplier satisfaction', var_list=' , '.join(sup_ids), title_hi='क्या आप अपने सप्लायर से संतुष्ट हैं?')

recovery_opts = [
    ('REC_NO_ISSUES', 'Yes, I don’t face any issues in recovery', 'हाँ, वसूली में कोई समस्या नहीं आती'),
    ('REC_CASH_ONLY', 'Yes, but I conduct only cash transactions', 'हाँ, क्योंकि केवल नकद लेन-देन ही करती हूँ'),
    ('REC_LEARNT_NEGOTIATE', 'Yes, but I have learnt over years how to negotiate', 'हाँ, समय के साथ बातचीत और तकादा करना सीख लिया है'),
    ('REC_HUSBAND_RECOVERS', 'No, but my husband is able to recover', 'नहीं, लेकिन पति वसूली कर लेते हैं'),
    ('REC_LOSSES_DEBT', 'No, my business has suffered losses due to bad debt', 'नहीं, उधारी डूबने से व्यवसाय को नुकसान हुआ है')
]
recov_ids = [r[0] for r in recovery_opts]
for rid, rname, rhi in recovery_opts:
    add_var(rid, 'AppVariables', 'CustomerRecovery', 'Option', 'Enum', rname, '', 'Recovery Option', rname, title_hi=rhi)

add_var('Q_CH_03_00', 'EnterpriseChallenges', 'CustomerRecovery', 'QuestionPrompt, Challenges', 'VariableList', 'Are you able to recover money from customers?', 'Section C/D Q3', 'Customer payment recovery', var_list=' , '.join(recov_ids), title_hi='क्या आप ग्राहकों से उधारी/पैसे की वसूली आसानी से कर पाती हैं?')

sourcing_indep = [
    ('SRC_YES_VISIT', 'Yes, I can visit market and buy material independently', 'हाँ, मैं खुद बाजार जाकर स्वतंत्र रूप से माल खरीद सकती हूँ'),
    ('SRC_NO_UNKNOWSELLER', 'No, because I don’t know the sellers/market', 'नहीं, क्योंकि मुझे बाजार/विक्रेताओं की जानकारी नहीं है'),
    ('SRC_NO_TRANSPORT', 'No, because transporting goods is difficult for women', 'नहीं, क्योंकि महिलाओं के लिए माल परिवहन कठिन है'),
    ('SRC_NO_HUSBAND_DISAPPROVE', 'No, because my husband/family doesn’t approve', 'नहीं, क्योंकि पति/परिवार अनुमति नहीं देता'),
    ('SRC_NO_CONDITIONAL', 'No, but I can if husband is unavailable', 'नहीं, लेकिन पति के अनुपलब्ध होने पर कर लेती हूँ')
]
src_ids = [s[0] for s in sourcing_indep]
for sid, sname, shi in sourcing_indep:
    add_var(sid, 'AppVariables', 'SourcingIndependence', 'Option', 'Enum', sname, '', 'Sourcing Independence Option', sname, title_hi=shi)

add_var('Q_CH_04_00', 'EnterpriseChallenges', 'SourcingIndependence', 'QuestionPrompt, Challenges', 'VariableList', 'Do you (SHG member) source material from the market independently?', 'Section C/D Q4', 'Independent sourcing', var_list=' , '.join(src_ids), title_hi='क्या आप (SHG सदस्य) बाजार से कच्चा माल/सामग्री स्वतंत्र रूप से लाती हैं?')

sourcing_methods = [
    ('SRCM_SELF_ALL', 'I handle everything on my own', 'मैं खुद सारा प्रबंध करती हूँ'),
    ('SRCM_MALE_MEMBERS', 'Husband or other male members of family source material', 'पति या परिवार के पुरुष सदस्य माल लाते हैं'),
    ('SRCM_DOOR_DELIVERY', 'I pay higher price for door delivery', 'डोर डिलीवरी के लिए अतिरिक्त कीमत देती हूँ'),
    ('SRCM_STOPPED_STOCK', 'I have stopped keeping material even when required', 'परेशानी के कारण माल रखना ही बंद कर दिया है')
]
srcm_ids = [s[0] for s in sourcing_methods]
for sid, sname, shi in sourcing_methods:
    add_var(sid, 'AppVariables', 'SourcingMethod', 'Option', 'Enum', sname, '', 'Sourcing Method Option', sname, title_hi=shi)

add_var('Q_CH_05_00', 'EnterpriseChallenges', 'SourcingMethod', 'QuestionPrompt, Challenges', 'VariableList', 'How do you source material from the market?', 'Section C/D Q5', 'Material sourcing mode', var_list=' , '.join(srcm_ids), title_hi='आप बाजार से सामग्री किस प्रकार मंगवाती हैं?')

attract_strategies = [
    ('ATT_SIGNAGE', 'Use of signage boards clearly displaying name of store', 'दुकान के नाम का स्पष्ट साइन बोर्ड लगाना'),
    ('ATT_WHATSAPP', 'Use of WhatsApp to share images of products with customers', 'ग्राहकों को व्हाट्सएप पर फोटो भेजना'),
    ('ATT_BEAUTIFY', 'Beautifying shop and attractive product displays', 'दुकान की सजावट और सुंदर डिस्प्ले'),
    ('ATT_POSTERS_DEALS', 'Use of posters/A-frame announcing discounts or special deals', 'छूट/विशेष ऑफर के पोस्टर लगाना'),
    ('ATT_COMFORT_SEATING', 'Use of comfortable seating / fans for customers', 'ग्राहकों के लिए बैठने व पंखे की अच्छी व्यवस्था')
]
att_ids = [a[0] for a in attract_strategies]
for aid, aname, ahi in attract_strategies:
    add_var(aid, 'AppVariables', 'AttractStrategy', 'Option', 'Enum', aname, '', 'Attract Strategy Option', aname, title_hi=ahi)

add_var('Q_CH_06_00', 'EnterpriseChallenges', 'CustomerAttractionStrategies', 'QuestionPrompt, Challenges, MultiSelect', 'VariableList', 'What strategies do you use to attract more customers? (Tick all relevant)', 'Section C/D Q6', 'Customer attraction strategies', var_list=' , '.join(att_ids), title_hi='ग्राहकों को आकर्षित करने के लिए क्या रणनीतियां अपनाती हैं? (सभी लागू विकल्पों पर टिक करें)')

loan_access = [
    ('LN_EASY_SHG', 'Yes, I get required amount easily from SHG', 'हाँ, SHG से जरूरत के अनुसार आसानी से ऋण मिल जाता है'),
    ('LN_EASY_MONEYLENDER', 'Yes, I get required loan easily from moneylender/NBFIs', 'हाँ, साहूकार/एनबीएफआई से आसानी से ऋण मिल जाता है'),
    ('LN_DIFF_SHG_SMALL', 'No, the loan amount is smaller than my demand in SHGs', 'नहीं, SHG से मिलने वाली ऋण राशि मांग से कम होती है'),
    ('LN_DIFF_MFI_SMALL', 'No, the loan amount is smaller than my demand in moneylender/NBFIs', 'नहीं, साहूकार/एनबीएफआई से कम राशि मिलती है'),
    ('LN_DIFF_MFI_SHORT', 'No, the repayment time is too short in moneylender/NBFIs', 'नहीं, साहूकार/एनबीएफआई में चुकाने की अवधि बहुत कम होती है'),
    ('LN_DIFF_MFI_HIGH_INT', 'No, installment amount is high due to high interest in NBFIs', 'नहीं, अधिक ब्याज दर के कारण किस्त बहुत भारी पड़ती है')
]
ln_ids = [l[0] for l in loan_access]
for lid, lname, lhi in loan_access:
    add_var(lid, 'AppVariables', 'LoanAccess', 'Option', 'Enum', lname, '', 'Loan Accessibility Option', lname, title_hi=lhi)

add_var('Q_CH_07_00', 'EnterpriseChallenges', 'LoanAccessibility', 'QuestionPrompt, Challenges', 'VariableList', 'Do you have easy access to loans from different sources?', 'Section C/D Q7', 'Credit accessibility', var_list=' , '.join(ln_ids), title_hi='क्या आपको विभिन्न स्रोतों से आसानी से ऋण मिल जाता है?')
add_var('Q_CH_08_00', 'EnterpriseChallenges', 'OtherChallengesRemarks', 'QuestionPrompt, Challenges', 'Text', 'Please share any other challenges you face in conducting business', 'Section C/D Q8', 'Open remarks on obstacles', title_hi='व्यवसाय संचालन में आने वाली अन्य चुनौतियां साझा करें')

# ==========================================
# SECTION E: IMPACT OF SVEP / OSF SCHEMES
# ==========================================
add_var('Q_D_01_00', 'SchemeImpact', 'SVEPOSFLoanAmount', 'QuestionPrompt, SchemeImpact', 'Decimal', 'How much loan have you taken under SVEP/OSF scheme? (Rs)', 'Section D Q1', 'Scheme loan amount', title_hi='आपने SVEP/OSF योजना के तहत कितना ऋण लिया है? (रु)')

loan_usages = [
    ('USE_SEED_CAPITAL', 'Seed capital to buy material and set up shop', 'शुरुआती सामग्री खरीदने और दुकान स्थापित करने हेतु बीज पूंजी'),
    ('USE_NEW_MACHINE', 'Buy new machine to increase production capacity (e.g. sewing machine)', 'उत्पादन क्षमता बढ़ाने हेतु नई मशीन खरीदना (उदा. सिलाई मशीन)'),
    ('USE_ASSETS_STORE', 'Buy assets to store and sell new products (e.g. fridge)', 'उत्पाद सुरक्षित रखने/बेचने हेतु उपकरण (उदा. फ्रिज)'),
    ('USE_EXPAND_SPACE', 'Get additional space to expand business (e.g. flour mill shed)', 'व्यवसाय विस्तार हेतु अतिरिक्त जगह लेना (उदा. चक्की का कमरा)'),
    ('USE_RANGE_VARIETY', 'Buy more material to increase product range (e.g. clothes variety)', 'उत्पादों की विविधता बढ़ाने हेतु सामग्री खरीदना'),
    ('USE_SCALE_VOLUME', 'Buy more material to increase scale of business', 'व्यवसाय का दायरा और स्टॉक बढ़ाने हेतु'),
    ('USE_VEHICLE_MARKET', 'Buy vehicle to access new market to buy/sell goods', 'माल लाने-ले जाने हेतु वाहन खरीदना'),
    ('USE_TRANSPORT_SVCS', 'Access better transport services to reach markets', 'बेहतर परिवहन सेवाओं की व्यवस्था करना'),
    ('USE_MOBILE_PHONE', 'Buy smartphone to promote/sell goods online', 'ऑनलाइन प्रचार व बिक्री हेतु स्मार्टफोन खरीदना'),
    ('USE_OTHER', 'Any other usage', 'अन्य कोई उपयोग')
]
use_ids = [u[0] for u in loan_usages]
for uid, uname, uhi in loan_usages:
    add_var(uid, 'AppVariables', 'LoanUsage', 'Option', 'Enum', uname, '', 'Loan Usage Option', uname, title_hi=uhi)

add_var('Q_D_02_00', 'SchemeImpact', 'LoanUtilizationPurposes', 'QuestionPrompt, SchemeImpact, MultiSelect', 'VariableList', 'How did you use the loan from SHG/Scheme for your enterprise? (Tick all relevant)', 'Section D Q2', 'Loan utilization', var_list=' , '.join(use_ids), title_hi='आपने SHG/योजना के ऋण का उपयोग उद्यम के लिए कैसे किया? (सभी लागू विकल्पों पर टिक करें)')

add_var('Q_D_03_01', 'SchemeImpact', 'MonthlyIncomeBeforeLoan', 'QuestionPrompt, SchemeImpact', 'Decimal', 'Average monthly income BEFORE the changes (Rs)', 'Section D Q3.1', 'Pre-loan income', title_hi='ऋण से हुए बदलाव से पहले औसत मासिक आय (रु)')
add_var('Q_D_03_02', 'SchemeImpact', 'MonthlyIncomeAfterLoan', 'QuestionPrompt, SchemeImpact', 'Decimal', 'Average monthly income AFTER the changes (Rs)', 'Section D Q3.2', 'Post-loan income', title_hi='ऋण से हुए बदलाव के बाद औसत मासिक आय (रु)')

crp_contributions = [
    ('CRP_ACCESS_LOANS', 'Helped in accessing loans to setup business', 'व्यवसाय शुरू करने के लिए ऋण प्राप्त कराने में मदद की'),
    ('CRP_BIZ_PLANS', 'Helped us to understand and prepare business plans', 'व्यावसायिक योजना बनाने और समझने में मदद की'),
    ('CRP_CRITICAL_FEEDBACK', 'Gave critical feedback on business idea which improved operations', 'व्यावसायिक विचार पर महत्वपूर्ण सुझाव दिए जिससे काम सुधरा'),
    ('CRP_RECORD_KEEPING', 'Trained us on maintaining written records regularly', 'बही-खाता और लिखित रिकॉर्ड रखने का प्रशिक्षण दिया'),
    ('CRP_NEW_IDEAS', 'Gave us new ideas to increase our enterprise income', 'आय बढ़ाने के नए विचार और सुझाव दिए'),
    ('CRP_BANK_LOANS', 'Helped in accessing loans from commercial banks', 'बैंक से ऋण प्राप्त करने में सहयोग किया'),
    ('CRP_COMMUNICATION', 'Helped improve our communication and negotiation skills', 'बातचीत और आत्मविश्वास में सुधार कराया'),
    ('CRP_MARKETING', 'Helped in marketing and customer outreach', 'मार्केटिंग और ग्राहक जोड़ने में मदद की'),
    ('CRP_COMPETITOR_STUDY', 'Helped understand competitors and suggested ways to compete', 'प्रतिस्पर्धा समझने और बेहतर सेवा देने के तरीके बताए')
]
crp_ids = [c[0] for c in crp_contributions]
for cid, cname, chi in crp_contributions:
    add_var(cid, 'AppVariables', 'CRPContribution', 'Option', 'Enum', cname, '', 'CRP Contribution Option', cname, title_hi=chi)

add_var('Q_D_04_00', 'SchemeImpact', 'CRPContributionTypes', 'QuestionPrompt, SchemeImpact, MultiSelect', 'VariableList', 'What has been the contribution of SVEP/OSF CRPs in your enterprise? (Tick all relevant)', 'Section D Q4', 'CRP assistance types', var_list=' , '.join(crp_ids), title_hi='आपके उद्यम में SVEP/OSF सीआरपी का क्या योगदान रहा? (सभी लागू विकल्पों पर टिक करें)')
add_var('Q_D_05_00', 'SchemeImpact', 'ExpectationsFromScheme', 'QuestionPrompt, SchemeImpact', 'Text', 'What are your expectations from SVEP/OSF scheme?', 'Section D Q5', 'Future expectations', title_hi='SVEP/OSF योजना से आपकी क्या अपेक्षाएं हैं?')

# ==========================================
# SECTION F: DIGITAL, QR CODE & SOCIAL MEDIA
# ==========================================
phone_ownership = [
    ('PHN_YES_OWN', 'Yes, owns personal smartphone', 'हाँ, खुद का स्मार्टफोन है'),
    ('PHN_NO', 'No, does not own smartphone', 'नहीं, स्मार्टफोन नहीं है'),
    ('PHN_FAMILY_OWNS', 'No, but family owns smartphone', 'नहीं, लेकिन परिवार के पास है')
]
phn_ids = [p[0] for p in phone_ownership]
for pid, pname, phi in phone_ownership:
    add_var(pid, 'AppVariables', 'PhoneOwnership', 'Option', 'Enum', pname, '', 'Phone Ownership Option', pname, title_hi=phi)

add_var('Q_E_01_00', 'OnlineMedia', 'SmartphoneOwnership', 'QuestionPrompt, OnlineMedia', 'VariableList', 'Do you (SHG member) own a smartphone?', 'Section E Q1', 'Smartphone access', var_list=' , '.join(phn_ids), title_hi='क्या आपके (SHG सदस्य) पास स्मार्टफोन है?')
add_var('Q_E_02_00', 'OnlineMedia', 'UsesQRCodeBanking', 'QuestionPrompt, OnlineMedia', 'Enum', 'Do you use QR code / mobile banking for money transactions?', 'Section E Q2', 'QR / UPI usage', title_hi='क्या आप पैसों के लेन-देन के लिए क्यूआर कोड / यूपीआई / मोबाइल बैंकिंग का उपयोग करती हैं?')

qr_volumes = [
    ('QRV_5_10', '5-10 transactions daily', 'प्रतिदिन 5-10 लेन-देन'),
    ('QRV_10_20', '10-20 transactions daily', 'प्रतिदिन 10-20 लेन-देन'),
    ('QRV_20_40', '20-40 transactions daily', 'प्रतिदिन 20-40 लेन-देन'),
    ('QRV_GT_40', 'More than 40 transactions daily', 'प्रतिदिन 40 से अधिक लेन-देन')
]
qrv_ids = [q[0] for q in qr_volumes]
for qid, qname, qhi in qr_volumes:
    add_var(qid, 'AppVariables', 'QRVolume', 'Option', 'Enum', qname, '', 'QR Volume Option', qname, title_hi=qhi)

add_var('Q_E_03_00', 'OnlineMedia', 'DailyQRTransactionsCount', 'QuestionPrompt, OnlineMedia', 'VariableList', 'If yes, daily how many transactions are done using QR code / mobile banking?', 'Section E Q3', 'QR transaction frequency', var_list=' , '.join(qrv_ids), title_hi='यदि हाँ, तो प्रतिदिन कितने लेन-देन क्यूआर कोड/मोबाइल बैंकिंग से होते हैं?')

qr_non_reasons = [
    ('QRN_NO_PHONE', 'Since I don’t own smartphone, it is difficult to transact', 'स्मार्टफोन न होने के कारण लेन-देन कठिन है'),
    ('QRN_FEW_CUSTOMERS', 'Not many customers use smartphone for payments in our area', 'हमारे क्षेत्र में ग्राहक ऑनलाइन भुगतान का उपयोग नहीं करते'),
    ('QRN_LACK_KNOWLEDGE', 'I don’t know how to use and monitor transactions with QR/UPI', 'मुझे क्यूआर कोड/यूपीआई का उपयोग और जांच करना नहीं आता')
]
qrn_ids = [q[0] for q in qr_non_reasons]
for qid, qname, qhi in qr_non_reasons:
    add_var(qid, 'AppVariables', 'QRNonReason', 'Option', 'Enum', qname, '', 'QR Non Use Reason Option', qname, title_hi=qhi)

add_var('Q_E_04_00', 'OnlineMedia', 'ReasonForNotUsingQR', 'QuestionPrompt, OnlineMedia', 'VariableList', 'If no, reason for not using QR code / mobile banking', 'Section E Q4', 'QR non-use rationale', var_list=' , '.join(qrn_ids), title_hi='यदि नहीं, तो क्यूआर कोड/मोबाइल बैंकिंग का उपयोग न करने का मुख्य कारण?')

social_platforms = [
    ('SOC_WHATSAPP', 'WhatsApp / WhatsApp Business', 'व्हाट्सएप / व्हाट्सएप बिजनेस'),
    ('SOC_INSTAGRAM', 'Instagram', 'इंस्टाग्राम'),
    ('SOC_FACEBOOK', 'Facebook', 'फेसबुक'),
    ('SOC_PINTEREST', 'Pinterest', 'पिंटरेस्ट'),
    ('SOC_SNAPCHAT', 'Snapchat', 'स्नैपचैट'),
    ('SOC_NONE', 'Don’t use social media', 'सोशल मीडिया का उपयोग नहीं करतीं')
]
soc_ids = [s[0] for s in social_platforms]
for sid, sname, shi in social_platforms:
    add_var(sid, 'AppVariables', 'SocialPlatform', 'Option', 'Enum', sname, '', 'Platform Option', sname, title_hi=shi)

add_var('Q_E_05_00', 'OnlineMedia', 'SocialMediaPlatformsUsed', 'QuestionPrompt, OnlineMedia, MultiSelect', 'VariableList', 'Which social media platforms do you use for your business? (Tick all relevant)', 'Section E Q5', 'Social platforms', var_list=' , '.join(soc_ids), title_hi='आप अपने व्यवसाय के लिए कौन-से सोशल मीडिया प्लेटफॉर्म का उपयोग करती हैं? (सभी लागू विकल्पों पर टिक करें)')

platform_uses = [
    ('USOC_TEXTS_ORDERS', 'Use texts to ask/share prices and book orders', 'कीमत साझा करने और ऑर्डर बुक करने के लिए मैसेजिंग'),
    ('USOC_SHARE_IMAGES', 'Share product images to promote business', 'व्यवसाय प्रचार के लिए उत्पादों के फोटो साझा करना'),
    ('USOC_VENDOR_INQUIRY', 'Share images to enquire about product availability to vendors', 'होलसेलर/सप्लायर से माल की उपलब्धता पूछने हेतु फोटो भेजना'),
    ('USOC_NEW_IDEAS', 'Get new ideas and information about trends/products', 'नए डिजाइन और उत्पादों की जानकारी प्राप्त करना'),
    ('USOC_DONT_USE', 'Don’t use social media for business', 'व्यावसायिक उपयोग नहीं करतीं')
]
usoc_ids = [u[0] for u in platform_uses]
for uid, uname, uhi in platform_uses:
    add_var(uid, 'AppVariables', 'PlatformUsage', 'Option', 'Enum', uname, '', 'Platform Usage Option', uname, title_hi=uhi)

add_var('Q_E_06_00', 'OnlineMedia', 'SocialMediaUseMode', 'QuestionPrompt, OnlineMedia, MultiSelect', 'VariableList', 'How do you use these platforms in your business? (Tick all relevant)', 'Section E Q6', 'Social media use mode', var_list=' , '.join(usoc_ids), title_hi='आप अपने व्यवसाय में इन प्लेटफॉर्म्स का उपयोग कैसे करती हैं? (सभी लागू विकल्पों पर टिक करें)')

media_freqs = [
    ('FRQ_DAILY', 'Daily', 'प्रतिदिन'),
    ('FRQ_2_3_WEEK', 'Twice or thrice a week', 'सप्ताह में 2-3 बार'),
    ('FRQ_4_5_MONTH', 'Four-five times a month', 'महीने में 4-5 बार'),
    ('FRQ_OCCASIONAL', 'Only on special occasions / festivals', 'केवल विशेष अवसरों/त्योहारों पर'),
    ('FRQ_DONT_USE', 'Don’t use social media', 'सोशल मीडिया का उपयोग नहीं करतीं')
]
frq_ids = [f[0] for f in media_freqs]
for fid, fname, fhi in media_freqs:
    add_var(fid, 'AppVariables', 'MediaFrequency', 'Option', 'Enum', fname, '', 'Frequency Option', fname, title_hi=fhi)

add_var('Q_E_07_00', 'OnlineMedia', 'SocialMediaFrequency', 'QuestionPrompt, OnlineMedia', 'VariableList', 'How often do you use social media for your business?', 'Section E Q7', 'Frequency of social engagement', var_list=' , '.join(frq_ids), title_hi='आप अपने व्यवसाय के लिए सोशल मीडिया का उपयोग कितनी बार करती हैं?')

# ==========================================
# SECTION G: STATUS OF POST-EXIT OSF IN BARAN
# ==========================================
add_var('Q_F_01_00', 'BaranPostExit', 'OSFInterventionYear', 'QuestionPrompt, BaranPostExit', 'Number', 'In which year was the OSF intervention made? (e.g. 2021)', 'Section F Q1', 'Intervention year', title_hi='OSF योजना का हस्तक्षेप किस वर्ष हुआ था?')

operational_statuses = [
    ('OPS_YES_REDUCED', 'Yes, but sales have reduced', 'हाँ, लेकिन बिक्री कम हो गई है'),
    ('OPS_YES_INCREASED', 'Yes, and scale/sales have increased', 'हाँ, और व्यवसाय का दायरा/बिक्री बढ़ी है'),
    ('OPS_CLOSED', 'No, enterprise closed down', 'नहीं, व्यवसाय बंद हो गया है')
]
ops_ids = [o[0] for o in operational_statuses]
for oid, oname, ohi in operational_statuses:
    add_var(oid, 'AppVariables', 'OperationalStatus', 'Option', 'Enum', oname, '', 'Operational Status Option', oname, title_hi=ohi)

add_var('Q_F_02_00', 'BaranPostExit', 'OperationalStatus', 'QuestionPrompt, BaranPostExit', 'VariableList', 'Is your business still operational?', 'Section F Q2', 'Current status', var_list=' , '.join(ops_ids), title_hi='क्या आपका व्यवसाय अभी भी चालू है?')
add_var('Q_F_02_01', 'BaranPostExit', 'ClosureYear', 'QuestionPrompt, BaranPostExit', 'Number', 'If closed, specify the year when it was closed', 'Section F Q2.1', 'Closure year', title_hi='यदि बंद हुआ, तो किस वर्ष में बंद हुआ?')

exit_reasons = [
    ('EXT_NO_GUIDANCE', 'Sales reduced over the years as there was no one guiding us', 'मार्गदर्शन न मिलने से बिक्री कम होती गई'),
    ('EXT_NO_LOAN_CAPITAL', 'Needed more capital to source material but no source of loan', 'माल लाने के लिए पूंजी चाहिए थी लेकिन ऋण नहीं मिला'),
    ('EXT_BANK_REFUSED', 'Banks refused to give us loan', 'बैंकों ने ऋण देने से मना कर दिया'),
    ('EXT_NO_NEW_CUSTOMERS', 'Unable to reach new customers', 'नए ग्राहकों तक पहुँचने में असमर्थ रहे'),
    ('EXT_NEW_COMPETITION', 'New competitors entered offering discounts', 'बाजार में नए प्रतिस्पर्धी आ गए'),
    ('EXT_OTHER', 'Any other reason', 'अन्य कोई कारण'),
    ('EXT_DONT_KNOW', 'Don’t know / cannot specify', 'पता नहीं')
]
ext_ids = [e[0] for e in exit_reasons]
for eid, ename, ehi in exit_reasons:
    add_var(eid, 'AppVariables', 'ExitReason', 'Option', 'Enum', ename, '', 'Exit Reason Option', ename, title_hi=ehi)

add_var('Q_F_03_00', 'BaranPostExit', 'ReasonsForScalingDownOrClosing', 'QuestionPrompt, BaranPostExit, MultiSelect', 'VariableList', 'What are the reasons for scaling down or closing the business? (Tick all relevant)', 'Section F Q3', 'Scale down / exit reasons', var_list=' , '.join(ext_ids), title_hi='व्यवसाय घटने या बंद होने के क्या कारण रहे? (सभी लागू विकल्पों पर टिक करें)')
add_var('Q_F_04_00', 'BaranPostExit', 'StrategiesAdoptedToMaintain', 'QuestionPrompt, BaranPostExit', 'Text', 'What strategies were adopted by you to maintain your business?', 'Section F Q4', 'Coping mechanisms adopted', title_hi='व्यवसाय बनाए रखने के लिए आपने क्या रणनीतियां अपनाई थीं?')
add_var('Q_F_05_00', 'BaranPostExit', 'SupportNeededToSustain', 'QuestionPrompt, BaranPostExit', 'Text', 'What kind of support could have helped you to manage and sustain your business?', 'Section F Q5', 'Institutional support recommendations', title_hi='किस प्रकार की सहायता मिलने पर आप अपना व्यवसाय संभाल पातीं?')

# Write AppVariables.csv
appvars_file = os.path.join(OUTPUT_DIR, 'AppVariables.csv')
with open(appvars_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=STANDARD_HEADERS)
    writer.writeheader()
    writer.writerows(app_vars)

print(f"✅ Generated AppVariables.csv with {len(app_vars)} total entries at {appvars_file}")

# Write template CSVs for all tables
tables_def = {
    'Survey.csv': [
        'ID', 'District', 'Block', 'VillageGP', 'CLFName', 'VOName', 'SHGName', 
        'RespondentName', 'EnterpriseName', 'SetupYear', 'Status', 'InvestigatorID', 
        'CreatedOn', 'Latitude', 'Longitude'
    ],
    'ProfileAgency.csv': [
        'ID', 'Survey', 'RelationWithSHGMember', 'AgeCohort', 'MaritalStatus', 
        'CasteCategory', 'EducationStatus', 'TotalFamilyMembers', 'EarningMembers', 
        'PensionMembers', 'NonEarningMembers', 'DisabledMembers', 'AnnualHouseholdIncome', 
        'RoleInSHG', 'DurationAsMemberYears', 'DurationInLeadershipYears', 'RelatedToCRP'
    ],
    'HouseholdIncomeSources.csv': [
        'ID', 'Survey', 'MemberRelation', 'IncomeSourceType', 'AnnualIncome'
    ],
    'EnterpriseOperations.csv': [
        'ID', 'Survey', 'WhoStartedEnterprise', 'StartDateYear', 'WhoOperatesEnterprise', 
        'DailyOperatingHours', 'BusinessPlaceType', 'MaintainsWrittenRecords', 
        'RecordKeepingMethod', 'FirstYearSeedCapital'
    ],
    'CapitalTrajectory.csv': [
        'ID', 'Survey', 'SourceType', 'FirstYearAmount', 'InBetweenYearsAmount', 
        'CurrentYearAmount', 'AmountPending'
    ],
    'SeasonalTurnover.csv': [
        'ID', 'Survey', 'SeasonType', 'SeasonMonthsCount', 'MonthlySales', 
        'MonthlyExpenses', 'MonthlyIncome'
    ],
    'BusinessTrajectory.csv': [
        'ID', 'Survey', 'MonthlySalesFirstYear', 'MonthlySalesCurrentYear', 
        'MonthlyIncomeFirstYear', 'MonthlyIncomeCurrentYear', 'InventoryValueFirstYear', 
        'InventoryValueCurrentYear', 'CreditSalesFirstYear', 'CreditSalesCurrentYear', 
        'CreditPurchaseFirstYear', 'CreditPurchaseCurrentYear'
    ],
    'EnterpriseChallenges.csv': [
        'ID', 'Survey', 'LocationConvenience', 'SupplierSatisfaction', 'CustomerRecovery', 
        'SourcingIndependence', 'SourcingMethod', 'LoanAccessibility', 'OtherChallengesRemarks'
    ],
    'SchemeImpact.csv': [
        'ID', 'Survey', 'SVEPOSFLoanAmount', 'MonthlyIncomeBeforeLoan', 
        'MonthlyIncomeAfterLoan', 'ExpectationsFromScheme'
    ],
    'OnlineMedia.csv': [
        'ID', 'Survey', 'SmartphoneOwnership', 'UsesQRCodeBanking', 
        'DailyQRTransactionsCount', 'ReasonForNotUsingQR', 'SocialMediaFrequency'
    ],
    'BaranPostExit.csv': [
        'ID', 'Survey', 'OSFInterventionYear', 'OperationalStatus', 'ClosureYear', 
        'StrategiesAdoptedToMaintain', 'SupportNeededToSustain'
    ],
    'MultiSelect.csv': [
        'ID', 'Survey', 'Table', 'Column', 'Row', 'Value', 'Decimal'
    ],
    'SamplingFrame.csv': [
        'ID', 'DistrictName', 'AgroZone', 'EnterpriseDatasetRecords', 'TargetQuota', 'ModelCLFStatus'
    ],
    'AppUser.csv': [
        'ID', 'Name', 'Email', 'Role', 'Status', 'AssignedDistrict'
    ],
    'AppSettings.csv': [
        'ID', 'SettingKey', 'SettingValue', 'Description'
    ]
}

for fname, cols in tables_def.items():
    fpath = os.path.join(OUTPUT_DIR, fname)
    with open(fpath, 'w', newline='', encoding='utf-8-sig') as f:
        writer = csv.writer(f)
        writer.writerow(cols)
    print(f"  Created template table: {fname} ({len(cols)} columns)")

print("\n🎉 ALL TABLES & APPVARIABLES GENERATED SUCCESSFULLY!")
