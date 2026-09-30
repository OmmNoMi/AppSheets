#!/usr/bin/env python3
"""
build_single_child_engine.py
============================
Creates a 2-Table Dynamic Question-Response Survey Engine:
  1. Survey (Parent Table)
  2. SurveyResponse (Single Child Table for ALL Questions & Answers across all Sections)
  3. AppVariables (System Dictionary & Multilingual Master)
"""

import os
import csv
from datetime import datetime

OUTPUT_DIR = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data"
os.makedirs(OUTPUT_DIR, exist_ok=True)
NOW_STR = datetime.now().strftime("%m/%d/%Y %H:%M:%S")

STANDARD_HEADERS = [
    'ID', 'Table', 'Column', 'Tags', 'ValueControl', 'Title', 'Description', 'UsedFor',
    'Decimal', 'EnumValue', 'EnumList', 'VariableList', 'DateValue', 'Photo', 'URL', 'File',
    'Title_hi', 'Title_mr', 'ActionIcon', 'LastEditBy', 'LastEditOn'
]

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

# Base AppVariables
add_var('CompanyName', 'AppVariables', '', 'System, Config', 'Enum', 'Company Name', 'CmF & RAJEEVIKA Study', 'Header title in reports', 'Centre for microFinance (CmF)', title_hi='सेंटर फॉर माइक्रोफाइनेंस (CmF)')
add_var('AppName', 'AppVariables', '', 'System, Config', 'Enum', 'App Name', 'SHG Women Entrepreneurs Survey', 'Application Title', 'SHG Women Entrepreneurs Study', title_hi='एसएचजी महिला उद्यमी अध्ययन')

# Sections list for SurveyResponse grouping
sections_list = [
    ('SEC_B_PROFILE', 'Section B: Respondent & Household Profile', 'खंड ब: उत्तरदाता एवं परिवार प्रोफ़ाइल'),
    ('SEC_C_OPERATIONS', 'Section C: Enterprise Operations & Capital', 'खंड स: उद्यम संचालन एवं पूंजी'),
    ('SEC_D_CHALLENGES', 'Section D: Enterprise Challenges & Coping', 'खंड द: उद्यम चुनौतियां एवं समाधान'),
    ('SEC_E_SCHEME_IMPACT', 'Section E: Impact of SVEP / OSF Schemes', 'खंड ई: SVEP / OSF योजनाओं का प्रभाव'),
    ('SEC_F_DIGITAL_MEDIA', 'Section F: Online Transactions & Social Media', 'खंड फ: डिजिटल लेन-देन एवं सोशल मीडिया'),
    ('SEC_G_BARAN_EXIT', 'Section G: Status of Post-Exit OSF in Baran', 'खंड ग: बारां में पोस्ट-एग्जिट OSF स्थिति')
]
sec_ids = []
for sid, sname, shi in sections_list:
    add_var(sid, 'AppVariables', 'Section', 'Option, Section', 'Enum', sname, '', 'Survey Section Option', sname, title_hi=shi)
    sec_ids.append(sid)

add_var('Q_SECTIONS_LIST', 'SurveyResponse', 'Section', 'QuestionPrompt, SurveyResponse', 'VariableList', 'Survey Sections', 'Master section list', var_list=' , '.join(sec_ids), title_hi='सर्वे के भाग')

# Districts
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

# Blocks
blocks = [
    ('BLK_CHHIPABAROD', 'Chhipabarod', 'छीपाबड़ौद', 'DIST_BARAN'),
    ('BLK_BARAN', 'Baran', 'बारां', 'DIST_BARAN'),
    ('BLK_KISHANGANJ', 'Kishanganj', 'किशनगंज', 'DIST_BARAN'),
    ('BLK_SHAHBAD', 'Shahbad', 'शाहबाद', 'DIST_BARAN'),
    ('BLK_ANTA', 'Anta', 'अंता', 'DIST_BARAN'),
    ('BLK_SARDARSHEHER', 'Sardarshahar', 'सरदारशहर', 'DIST_CHURU'),
    ('BLK_BIDASAR', 'Bidasar', 'बीदासर', 'DIST_CHURU'),
    ('BLK_RATANGARH', 'Ratangarh', 'रतनगढ़', 'DIST_CHURU'),
    ('BLK_SIKANDRA', 'Sikandra', 'सिकंदरा', 'DIST_DAUSA'),
    ('BLK_BANDIKUI', 'Bandikui', 'बांदीकुई', 'DIST_DAUSA'),
    ('BLK_DAUSA', 'Dausa', 'दौसा', 'DIST_DAUSA'),
    ('BLK_SAGWARA', 'Sagwara', 'सागवाड़ा', 'DIST_DUNGARPUR'),
    ('BLK_GALIAKOT', 'Galiakot', 'गलियाकोट', 'DIST_DUNGARPUR'),
    ('BLK_BICHHIWARA', 'Bichhiwara', 'बिछीवाड़ा', 'DIST_DUNGARPUR'),
    ('BLK_MANDORE', 'Mandore', 'मंडोर', 'DIST_JODHPUR'),
    ('BLK_LUNI', 'Luni', 'लूणी', 'DIST_JODHPUR'),
    ('BLK_BILARA', 'Bilara', 'बिलाड़ा', 'DIST_JODHPUR')
]
blk_ids = []
for bid, bname, bhi, parent_dist in blocks:
    add_var(bid, 'AppVariables', 'Block', f'Option, Geography, Parent:{parent_dist}', 'Enum', bname, parent_dist, 'Block Option', bname, title_hi=bhi)
    blk_ids.append(bid)

add_var('Q_A_02_00', 'Survey', 'Block', 'QuestionPrompt, Survey, Block', 'VariableList', 'Block', 'Section A Q2', 'Block selector', var_list=' , '.join(blk_ids), title_hi='ब्लॉक / खंड')

# Survey Header Fields Prompts
add_var('Q_A_03_00', 'Survey', 'VillageGP', 'QuestionPrompt, Survey', 'Text', 'Village / Gram Panchayat', 'Section A Q3', 'Village name', title_hi='गांव / ग्राम पंचायत')
add_var('Q_A_04_00', 'Survey', 'CLFName', 'QuestionPrompt, Survey', 'Text', 'CLF Name', 'Section A Q4', 'Cluster Level Federation', title_hi='सीएलएफ का नाम')
add_var('Q_A_05_00', 'Survey', 'VOName', 'QuestionPrompt, Survey', 'Text', 'VO Name', 'Section A Q5', 'Village Organization', title_hi='ग्राम संगठन (VO) का नाम')
add_var('Q_A_06_00', 'Survey', 'SHGName', 'QuestionPrompt, Survey', 'Text', 'SHG Name', 'Section A Q6', 'Self Help Group', title_hi='स्वयं सहायता समूह (SHG) का नाम')
add_var('Q_A_07_00', 'Survey', 'RespondentName', 'QuestionPrompt, Survey', 'Name', 'Respondent Name', 'Section A Q7', 'Name of woman entrepreneur', title_hi='उत्तरदाता का नाम')
add_var('Q_A_08_00', 'Survey', 'EnterpriseName', 'QuestionPrompt, Survey', 'Text', 'Enterprise Name', 'Section A Q8', 'Trade / Shop name', title_hi='उद्यम / दुकान का नाम')
add_var('Q_A_09_00', 'Survey', 'SetupYear', 'QuestionPrompt, Survey', 'Number', 'Year of Setting Up Enterprise', 'Section A Q9', 'Enterprise setup year', title_hi='उद्यम शुरू करने का वर्ष')

# Main Business Activities (Multi-Select)
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

add_var('Q_A_10_00', 'Survey', 'BusinessActivities', 'QuestionPrompt, Survey', 'EnumList', 'Main Business Activities of the Enterprise (Tick all applicable)', 'Section A Q10', 'Main enterprise activities', var_list=' , '.join(act_ids), title_hi='उद्यम की मुख्य व्यावसायिक गतिविधियां')

# ==========================================
# SECTION B: RESPONDENT & HOUSEHOLD PROFILE
# ==========================================
relations = [('REL_SELF', 'Self', 'स्वयं'), ('REL_HUSBAND', 'Husband', 'पति'), ('REL_SON', 'Son', 'पुत्र'), ('REL_DAUGHTER', 'Daughter', 'पुत्री'), ('REL_OTHER', 'Any other', 'अन्य कोई')]
rel_ids = [r[0] for r in relations]
for rid, rname, rhi in relations:
    add_var(rid, 'AppVariables', 'Relation', 'Option', 'Enum', rname, '', 'Relation Option', rname, title_hi=rhi)
add_var('Q_B_01_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:1', 'Enum', 'What is respondent’s relation with SHG member?', 'Section B Q1', 'Respondent relation', var_list=' , '.join(rel_ids), title_hi='उत्तरदाता का SHG सदस्य से क्या संबंध है?')

age_cohorts = [('AGE_18_25', '18-25', '18-25 वर्ष'), ('AGE_25_35', '25-35', '25-35 वर्ष'), ('AGE_35_45', '35-45', '35-45 वर्ष'), ('AGE_45_55', '45-55', '45-55 वर्ष'), ('AGE_ABOVE_55', 'Above 55', '55 वर्ष से अधिक')]
age_ids = [a[0] for a in age_cohorts]
for aid, aname, ahi in age_cohorts:
    add_var(aid, 'AppVariables', 'AgeCohort', 'Option', 'Enum', aname, '', 'Age Cohort Option', aname, title_hi=ahi)
add_var('Q_B_02_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:2', 'Enum', 'What is the age of SHG member?', 'Section B Q2', 'Age cohort', var_list=' , '.join(age_ids), title_hi='SHG सदस्य की आयु क्या है?')

marital_statuses = [('MAR_SINGLE', 'Single', 'अविवाहित'), ('MAR_MARRIED', 'Married', 'विवाहित'), ('MAR_WIDOWED', 'Widowed', 'विधवा'), ('MAR_SEPARATED', 'Separated', 'परित्यक्ता / अलग'), ('MAR_DIVORCED', 'Divorced', 'तलाकशुदा')]
mar_ids = [m[0] for m in marital_statuses]
for mid, mname, mhi in marital_statuses:
    add_var(mid, 'AppVariables', 'MaritalStatus', 'Option', 'Enum', mname, '', 'Marital Status Option', mname, title_hi=mhi)
add_var('Q_B_03_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:3', 'Enum', 'What is the marital status of the SHG member?', 'Section B Q3', 'Marital status', var_list=' , '.join(mar_ids), title_hi='SHG सदस्य की वैवाहिक स्थिति क्या है?')

castes = [('CST_SC', 'SC (Scheduled Caste)', 'अनुसूचित जाति (SC)'), ('CST_ST', 'ST (Scheduled Tribe)', 'अनुसूचित जनजाति (ST)'), ('CST_OBC', 'OBC (Other Backward Class)', 'अन्य पिछड़ा वर्ग (OBC)'), ('CST_GEN', 'General', 'सामान्य (General)')]
cst_ids = [c[0] for c in castes]
for cid, cname, chi in castes:
    add_var(cid, 'AppVariables', 'Caste', 'Option', 'Enum', cname, '', 'Caste Option', cname, title_hi=chi)
add_var('Q_B_04_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:4', 'Enum', 'What is the caste?', 'Section B Q4', 'Caste category', var_list=' , '.join(cst_ids), title_hi='जाति वर्ग क्या है?')

educations = [('EDU_ILLITERATE', 'Illiterate', 'निरक्षर'), ('EDU_ILLITERATE_CALC', 'Illiterate but able to calculate', 'निरक्षर लेकिन हिसाब-किताब में सक्षम'), ('EDU_5TH', '5th pass', '5वीं पास'), ('EDU_8TH', '8th pass', '8वीं पास'), ('EDU_10TH', '10th pass', '10वीं पास'), ('EDU_12TH', '12th pass', '12वीं पास'), ('EDU_GRADUATE', 'Graduate & above', 'स्नातक एवं उच्च शिक्षा')]
edu_ids = [e[0] for e in educations]
for eid, ename, ehi in educations:
    add_var(eid, 'AppVariables', 'Education', 'Option', 'Enum', ename, '', 'Education Option', ename, title_hi=ehi)
add_var('Q_B_05_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:5', 'Enum', 'What is the education status of SHG member?', 'Section B Q5', 'Education level', var_list=' , '.join(edu_ids), title_hi='SHG सदस्य की शैक्षणिक योग्यता क्या है?')

add_var('Q_B_06_00', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_B_PROFILE, Order:6', 'Number', 'How many members are in the family?', 'Section B Q6', 'Total family count', title_hi='परिवार में कुल कितने सदस्य हैं?')
add_var('Q_B_07_01', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_B_PROFILE, Order:7', 'Number', 'Earning members in family', 'Section B Q7.1', 'Earning count', title_hi='कमाने वाले सदस्य')
add_var('Q_B_07_02', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_B_PROFILE, Order:8', 'Number', 'Members with pension', 'Section B Q7.2', 'Pensioner count', title_hi='पेंशन प्राप्त सदस्य')
add_var('Q_B_07_03', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_B_PROFILE, Order:9', 'Number', 'Non-earning members (Dependents)', 'Section B Q7.3', 'Non-earning count', title_hi='गैर-कमाने वाले / आश्रित सदस्य')
add_var('Q_B_07_04', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_B_PROFILE, Order:10', 'Number', 'Members with disability', 'Section B Q7.4', 'Disabled count', title_hi='दिव्यांग सदस्य')

incomes = [('INC_LT_120K', 'Less than Rs 1,20,000', 'रु 1,20,000 से कम'), ('INC_120K_160K', 'Rs 1,20,000 to Rs 1,60,000', 'रु 1,20,000 से रु 1,60,000'), ('INC_160K_200K', 'Rs 1,60,000 to Rs 2,00,000', 'रु 1,60,000 से रु 2,00,000'), ('INC_200K_250K', 'Rs 2,00,000 to Rs 2,50,000', 'रु 2,00,000 से रु 2,50,000'), ('INC_250K_300K', 'Rs 2,50,000 to Rs 3,00,000', 'रु 2,50,000 से रु 3,00,000'), ('INC_300K_350K', 'Rs 3,00,000 to Rs 3,50,000', 'रु 3,00,000 से रु 3,50,000'), ('INC_GT_350K', 'Above Rs 3,50,000', 'रु 3,50,000 से अधिक')]
inc_ids = [i[0] for i in incomes]
for iid, iname, ihi in incomes:
    add_var(iid, 'AppVariables', 'AnnualIncomeBracket', 'Option', 'Enum', iname, '', 'Income Bracket Option', iname, title_hi=ihi)
add_var('Q_B_08_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:11', 'Enum', 'What is your annual household income?', 'Section B Q8', 'Annual household income', var_list=' , '.join(inc_ids), title_hi='आपके परिवार की कुल वार्षिक आय कितनी है?')

roles = [('ROL_MEMBER', 'Member', 'साधारण सदस्य'), ('ROL_LEADERSHIP', 'Leadership role (President/Secretary/Treasurer/CRP)', 'नेतृत्व पद (अध्यक्ष/सचिव/कोषाध्यक्ष/सीआरपी)')]
rol_ids = [r[0] for r in roles]
for rid, rname, rhi in roles:
    add_var(rid, 'AppVariables', 'SHGRole', 'Option', 'Enum', rname, '', 'SHG Role Option', rname, title_hi=rhi)
add_var('Q_B_10_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:12', 'Enum', 'What is your role in SHG?', 'Section B Q10', 'SHG Role', var_list=' , '.join(rol_ids), title_hi='SHG में आपकी क्या भूमिका है?')
add_var('Q_B_11_01', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_B_PROFILE, Order:13', 'Number', 'Duration of SHG association as Member (years)', 'Section B Q11.1', 'Member duration', title_hi='सदस्य के रूप में जुड़ाव अवधि (वर्षों में)')
add_var('Q_B_11_02', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_B_PROFILE, Order:14', 'Number', 'Duration of SHG association in Leadership role (years)', 'Section B Q11.2', 'Leadership duration', title_hi='नेतृत्व पद के रूप में जुड़ाव अवधि (वर्षों में)')

yes_no_opts = [('OPT_YES', 'Yes', 'हाँ'), ('OPT_NO', 'No', 'नहीं')]
for yid, yname, yhi in yes_no_opts:
    add_var(yid, 'AppVariables', 'YesNo', 'Option', 'Enum', yname, '', 'Yes/No Option', yname, title_hi=yhi)
add_var('Q_B_12_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_B_PROFILE, Order:15', 'Enum', 'Are you related to any SVEP/OSF CRP?', 'Section B Q12', 'Related to CRP', var_list='OPT_YES , OPT_NO', title_hi='क्या आप किसी SVEP/OSF सीआरपी से संबंधित/रिश्तेदार हैं?')

# ==========================================
# SECTION C: ENTERPRISE OPERATIONS & CAPITAL
# ==========================================
who_started_opts = [('STR_SELF', 'Self', 'स्वयं'), ('STR_HUSBAND', 'Husband', 'पति'), ('STR_FAMILY', 'Family enterprise', 'पारिवारिक उद्यम')]
str_ids = [s[0] for s in who_started_opts]
for sid, sname, shi in who_started_opts:
    add_var(sid, 'AppVariables', 'WhoStarted', 'Option', 'Enum', sname, '', 'Who Started Option', sname, title_hi=shi)
add_var('Q_C_01_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_C_OPERATIONS, Order:16', 'Enum', 'Who started the enterprise?', 'Section C Q1', 'Founder of enterprise', var_list=' , '.join(str_ids), title_hi='उद्यम किसने शुरू किया?')
add_var('Q_C_02_00', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_C_OPERATIONS, Order:17', 'Number', 'When was the enterprise started? (Year)', 'Section C Q2', 'Start year', title_hi='यह कब शुरू हुआ था? (वर्ष)')

operators = [('OPR_SELF_ALONE', 'Self alone', 'स्वयं अकेले'), ('OPR_SELF_OCCASIONAL', 'Self with occasional support from family', 'स्वयं, परिवार के कभी-कभार सहयोग से'), ('OPR_SELF_REGULAR', 'Self with regular support from family', 'स्वयं, परिवार के नियमित सहयोग से'), ('OPR_HUSBAND_ONLY', 'Only husband', 'केवल पति'), ('OPR_JOINT', 'Husband and wife (joint management)', 'पति और पत्नी (संयुक्त प्रबंधन)'), ('OPR_FAMILY_MEMBERS', 'Family members', 'परिवार के अन्य सदस्य')]
opr_ids = [o[0] for o in operators]
for oid, oname, ohi in operators:
    add_var(oid, 'AppVariables', 'WhoOperates', 'Option', 'Enum', oname, '', 'Operator Option', oname, title_hi=ohi)
add_var('Q_C_03_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_C_OPERATIONS, Order:18', 'Enum', 'Who operates the enterprise? (Major decision making & operations)', 'Section C Q3', 'Operator of enterprise', var_list=' , '.join(opr_ids), title_hi='उद्यम का संचालन और मुख्य निर्णय कौन करता है?')

operating_hours = [('HRS_LT_4', 'Less than 4 hours', '4 घंटे से कम'), ('HRS_4_5', '4-5 hours', '4-5 घंटे'), ('HRS_5_8', '5-8 hours', '5-8 घंटे'), ('HRS_8_10', '8-10 hours', '8-10 घंटे'), ('HRS_GT_10', 'More than 10 hours', '10 घंटे से अधिक')]
hrs_ids = [h[0] for h in operating_hours]
for hid, hname, hhi in operating_hours:
    add_var(hid, 'AppVariables', 'OperatingHours', 'Option', 'Enum', hname, '', 'Hours Option', hname, title_hi=hhi)
add_var('Q_C_04_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_C_OPERATIONS, Order:19', 'Enum', 'For how many hours in a day does shop/enterprise remain open?', 'Section C Q4', 'Daily operating hours', var_list=' , '.join(hrs_ids), title_hi='दुकान/उद्यम प्रतिदिन कितने घंटे खुला रहता है?')

places = [('PLC_OWN_SHOP', 'Own shop', 'खुद की दुकान'), ('PLC_OWN_HOUSE', 'Operating from own house', 'खुद के घर से संचालन'), ('PLC_RENT_SHOP', 'Rented shop', 'किराए की दुकान'), ('PLC_RENT_HOUSE', 'Operating from rented house', 'किराए के मकान से संचालन')]
plc_ids = [p[0] for p in places]
for pid, pname, phi in places:
    add_var(pid, 'AppVariables', 'BusinessPlace', 'Option', 'Enum', pname, '', 'Business Place Option', pname, title_hi=phi)
add_var('Q_C_05_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_C_OPERATIONS, Order:20', 'Enum', 'Type of business place?', 'Section C Q5', 'Premises type', var_list=' , '.join(plc_ids), title_hi='कार्यस्थल / व्यवसाय स्थल का प्रकार?')

reasons_starting = [('RSN_ALT_INCOME', 'My family needed an alternate source of income', 'परिवार को अतिरिक्त आय स्रोत की आवश्यकता थी'), ('RSN_OWN_BUSINESS', 'I wanted to own/run my own business', 'मेरी खुद का व्यवसाय चलाने की इच्छा थी'), ('RSN_SKILL_TRAINED', 'I/my husband learnt skill/got trained and wanted to start venture', 'मैंने/पति ने हुनर सीखा/प्रशिक्षण लिया और उद्यम शुरू करना चाहा'), ('RSN_PRIOR_EXP', 'I/my husband had prior experience in the same field', 'मुझे/पति को इस कार्य का पुराना अनुभव था'), ('RSN_CRP_ENCOURAGED', 'The OSF/SVEP CRP encouraged and supported us to start', 'OSF/SVEP सीआरपी ने प्रोत्साहित किया और सहायता दी')]
rsn_ids = [r[0] for r in reasons_starting]
for rid, rname, rhi in reasons_starting:
    add_var(rid, 'AppVariables', 'ReasonStarting', 'Option', 'Enum', rname, '', 'Reason Option', rname, title_hi=rhi)
add_var('Q_C_06_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_C_OPERATIONS, Order:21', 'EnumList', 'Reasons for starting the business (Tick all relevant)', 'Section C Q6', 'Reasons for starting', var_list=' , '.join(rsn_ids), title_hi='उद्यम शुरू करने के मुख्य कारण')

factors_helping = [('FCT_OWN_SPACE', 'My family owned the space so it was easy to start', 'परिवार के पास खुद की जगह उपलब्ध थी'), ('FCT_FAMILY_SUPPORT', 'My family was supportive of my running the business', 'परिवार का पूरा सहयोग और समर्थन था'), ('FCT_SAVINGS', 'We had sufficient savings to start the business', 'शुरुआत के लिए हमारे पास पर्याप्त बचत थी'), ('FCT_SHG_LOAN', 'The SHG loan was made available timely', 'SHG से समय पर ऋण उपलब्ध हो गया'), ('FCT_LOW_INTEREST', 'Loan was available at low interest rates', 'कम ब्याज दर पर ऋण मिला'), ('FCT_CRP_GUIDANCE', 'The OSF/SVEP CRP guidance was very important', 'OSF/SVEP सीआरपी का मार्गदर्शन बहुत महत्वपूर्ण साबित हुआ')]
fct_ids = [f[0] for f in factors_helping]
for fid, fname, fhi in factors_helping:
    add_var(fid, 'AppVariables', 'FactorHelping', 'Option', 'Enum', fname, '', 'Helping Factor Option', fname, title_hi=fhi)
add_var('Q_C_07_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_C_OPERATIONS, Order:22', 'EnumList', 'Which factors helped in starting the business? (Tick all relevant)', 'Section C Q7', 'Enabling factors', var_list=' , '.join(fct_ids), title_hi='उद्यम शुरू करने में किन कारकों ने मदद की?')

record_habits = [('REC_YES_SELF', 'Yes, self maintains written records regularly', 'हाँ, स्वयं नियमित लिखित हिसाब रखती हैं'), ('REC_YES_FAMILY', 'Yes, with help of family member', 'हाँ, परिवार के सदस्य की मदद से'), ('REC_YES_HUSBAND', 'Yes, husband maintains (in joint management)', 'हाँ, पति हिसाब-किताब रखते हैं'), ('REC_NO', 'No, do not record', 'नहीं, कोई लिखित हिसाब नहीं रखते'), ('REC_IRREGULAR', 'Don’t record regularly / irregular', 'नियमित रूप से दर्ज नहीं करते')]
rec_ids = [r[0] for r in record_habits]
for rid, rname, rhi in record_habits:
    add_var(rid, 'AppVariables', 'RecordHabit', 'Option', 'Enum', rname, '', 'Record Habit Option', rname, title_hi=rhi)
add_var('Q_C_08_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_C_OPERATIONS, Order:23', 'Enum', 'Does SHG member maintain written records of business transactions regularly?', 'Section C Q8', 'Record keeping habit', var_list=' , '.join(rec_ids), title_hi='क्या SHG सदस्य व्यावसायिक लेन-देन का नियमित लिखित रिकॉर्ड रखती हैं?')

record_methods = [('MTH_RECEIPT_BILLS', 'Receipt book / bills', 'रसीद बुक / बिल'), ('MTH_DAILY_DIARY', 'Maintain daily diary', 'दैनिक डायरी / बही-खाता'), ('MTH_CRP_DIARY', 'Maintain daily diary as taught by OSF/SVEP CRP', 'OSF/SVEP सीआरपी द्वारा सिखाई गई दैनिक डायरी'), ('MTH_NOT_REGULAR', 'Don’t record regularly', 'नियमित रिकॉर्ड नहीं रखते')]
mth_ids = [m[0] for m in record_methods]
for mid, mname, mhi in record_methods:
    add_var(mid, 'AppVariables', 'RecordMethod', 'Option', 'Enum', mname, '', 'Record Method Option', mname, title_hi=mhi)
add_var('Q_C_09_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_C_OPERATIONS, Order:24', 'Enum', 'How do you maintain business transactions?', 'Section C Q9', 'Record keeping method', var_list=' , '.join(mth_ids), title_hi='आप व्यावसायिक लेन-देन का रिकॉर्ड कैसे रखती हैं?')

add_var('Q_C_10_00', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_C_OPERATIONS, Order:25', 'Decimal', 'In the first year of enterprise, what was seed capital amount? (Rs)', 'Section C Q10', 'First year seed capital', title_hi='उद्यम के पहले वर्ष में प्रारंभिक पूंजी (बीज पूंजी) की राशि कितनी थी? (रु)')

peak_cap_mgmt = [('PKM_SHG_BORROW', 'Borrow money from SHG to purchase material', 'सामग्री खरीदने के लिए SHG से ऋण लेती हूँ'), ('PKM_MONEYLENDER', 'Borrow money from moneylender/NBFIs', 'साहूकार/एनबीएफआई से उधार लेती हूँ'), ('PKM_BANKS', 'Borrow money from banks', 'बैंकों से ऋण लेती हूँ'), ('PKM_CREDIT_PURCHASE', 'Buy material on credit from suppliers', 'सप्लायर से उधारी पर माल लेती हूँ')]
pkm_ids = [p[0] for p in peak_cap_mgmt]
for pid, pname, phi in peak_cap_mgmt:
    add_var(pid, 'AppVariables', 'PeakCapMgmt', 'Option', 'Enum', pname, '', 'Peak Management Option', pname, title_hi=phi)
add_var('Q_C_13_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_C_OPERATIONS, Order:26', 'EnumList', 'How do you manage capital during peak season? (Tick all relevant)', 'Section C Q13', 'Peak season management', var_list=' , '.join(pkm_ids), title_hi='पीक सीजन में पूंजी का प्रबंध कैसे करती हैं?')

# Business Trajectory First vs Current year
add_var('Q_C_14_01', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_C_OPERATIONS, Order:27', 'Decimal', 'Average monthly sales in FIRST year (Rs)', 'Section C Q14.1', 'First year sales', title_hi='पहले वर्ष में औसत मासिक बिक्री (रु)')
add_var('Q_C_14_02', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_C_OPERATIONS, Order:28', 'Decimal', 'Average monthly sales in CURRENT year (Rs)', 'Section C Q14.2', 'Current year sales', title_hi='वर्तमान वर्ष में औसत मासिक बिक्री (रु)')
add_var('Q_C_14_03', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_C_OPERATIONS, Order:29', 'Decimal', 'Average monthly income in FIRST year (Rs)', 'Section C Q14.3', 'First year income', title_hi='पहले वर्ष में औसत मासिक आय (रु)')
add_var('Q_C_14_04', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_C_OPERATIONS, Order:30', 'Decimal', 'Average monthly income in CURRENT year (Rs)', 'Section C Q14.4', 'Current year income', title_hi='वर्तमान वर्ष में औसत मासिक आय (रु)')

# ==========================================
# SECTION D: ENTERPRISE CHALLENGES & COPING
# ==========================================
loc_convenience = [('LOC_OWN_EASY', 'Yes, I own space and get clients easily', 'हाँ, खुद की जगह है और ग्राहक आसानी से मिल जाते हैं'), ('LOC_RENT_EASY', 'Yes, found space easily on rent and get clients', 'हाँ, आसानी से किराए पर जगह मिल गई और ग्राहक आते हैं'), ('LOC_RENT_HIGH', 'Yes, but compared to others I was charged higher rent', 'हाँ, लेकिन दूसरों की तुलना में अधिक किराया लिया जाता है'), ('LOC_OWN_CANTMOVE', 'No, but I own space and cannot move', 'नहीं, लेकिन खुद की जगह है इसलिए बदल नहीं सकते'), ('LOC_AFFORD_ONLY', 'No, but I could afford only this space', 'नहीं, लेकिन केवल यही जगह बजट में थी')]
loc_ids = [l[0] for l in loc_convenience]
for lid, lname, lhi in loc_convenience:
    add_var(lid, 'AppVariables', 'LocConvenience', 'Option', 'Enum', lname, '', 'Location Option', lname, title_hi=lhi)
add_var('Q_CH_01_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_D_CHALLENGES, Order:31', 'Enum', 'Is location of space convenient for your business?', 'Section D Q1', 'Location convenience', var_list=' , '.join(loc_ids), title_hi='क्या आपके व्यवसाय स्थल का स्थान सुविधाजनक है?')

supp_satisfaction = [('SUP_NEARBY_DEMAND', 'Yes, supplier is nearby and supplies on demand', 'हाँ, सप्लायर पास का है और मांग पर माल देता है'), ('SUP_CREDIT_DISCOUNT', 'Yes, supplier offers credit purchase and discounts', 'हाँ, सप्लायर उधारी और छूट देता है'), ('SUP_MULTIPLE', 'I buy from different suppliers as per need/season', 'आवश्यकतानुसार अलग-अलग सप्लायरों से खरीदती हूँ'), ('SUP_OLD_RELY', 'No, but he is our old supplier and we rely on him', 'नहीं, लेकिन पुराना सप्लायर है इसलिए निर्भर हैं')]
sup_ids = [s[0] for s in supp_satisfaction]
for sid, sname, shi in supp_satisfaction:
    add_var(sid, 'AppVariables', 'SuppSatisfaction', 'Option', 'Enum', sname, '', 'Supplier Option', sname, title_hi=shi)
add_var('Q_CH_02_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_D_CHALLENGES, Order:32', 'Enum', 'Are you happy with the supplier?', 'Section D Q2', 'Supplier satisfaction', var_list=' , '.join(sup_ids), title_hi='क्या आप अपने सप्लायर से संतुष्ट हैं?')

recovery_opts = [('REC_NO_ISSUES', 'Yes, I don’t face any issues in recovery', 'हाँ, वसूली में कोई समस्या नहीं आती'), ('REC_CASH_ONLY', 'Yes, but I conduct only cash transactions', 'हाँ, क्योंकि केवल नकद लेन-देन ही करती हूँ'), ('REC_LEARNT_NEGOTIATE', 'Yes, but I have learnt over years how to negotiate', 'हाँ, समय के साथ बातचीत और तकादा करना सीख लिया है'), ('REC_HUSBAND_RECOVERS', 'No, but my husband is able to recover', 'नहीं, लेकिन पति वसूली कर लेते हैं'), ('REC_LOSSES_DEBT', 'No, my business has suffered losses due to bad debt', 'नहीं, उधारी डूबने से व्यवसाय को नुकसान हुआ है')]
recov_ids = [r[0] for r in recovery_opts]
for rid, rname, rhi in recovery_opts:
    add_var(rid, 'AppVariables', 'CustomerRecovery', 'Option', 'Enum', rname, '', 'Recovery Option', rname, title_hi=rhi)
add_var('Q_CH_03_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_D_CHALLENGES, Order:33', 'Enum', 'Are you able to recover money from customers?', 'Section D Q3', 'Customer payment recovery', var_list=' , '.join(recov_ids), title_hi='क्या आप ग्राहकों से उधारी/पैसे की वसूली आसानी से कर पाती हैं?')

sourcing_indep = [('SRC_YES_VISIT', 'Yes, I can visit market and buy material independently', 'हाँ, मैं खुद बाजार जाकर स्वतंत्र रूप से माल खरीद सकती हूँ'), ('SRC_NO_UNKNOWSELLER', 'No, because I don’t know sellers/market', 'नहीं, क्योंकि मुझे बाजार/विक्रेताओं की जानकारी नहीं है'), ('SRC_NO_TRANSPORT', 'No, because transporting goods is difficult for women', 'नहीं, क्योंकि महिलाओं के लिए माल परिवहन कठिन है'), ('SRC_NO_HUSBAND_DISAPPROVE', 'No, because husband/family doesn’t approve', 'नहीं, क्योंकि पति/परिवार अनुमति नहीं देता'), ('SRC_NO_CONDITIONAL', 'No, but I can if husband is unavailable', 'नहीं, लेकिन पति के अनुपलब्ध होने पर कर लेती हूँ')]
src_ids = [s[0] for s in sourcing_indep]
for sid, sname, shi in sourcing_indep:
    add_var(sid, 'AppVariables', 'SourcingIndependence', 'Option', 'Enum', sname, '', 'Sourcing Independence Option', sname, title_hi=shi)
add_var('Q_CH_04_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_D_CHALLENGES, Order:34', 'Enum', 'Do you source material from market independently?', 'Section D Q4', 'Independent sourcing', var_list=' , '.join(src_ids), title_hi='क्या आप (SHG सदस्य) बाजार से सामग्री स्वतंत्र रूप से लाती हैं?')

sourcing_methods = [('SRCM_SELF_ALL', 'I handle everything on my own', 'मैं खुद सारा प्रबंध करती हूँ'), ('SRCM_MALE_MEMBERS', 'Husband or male members of family source material', 'पति या परिवार के पुरुष सदस्य माल लाते हैं'), ('SRCM_DOOR_DELIVERY', 'I pay higher price for door delivery', 'डोर डिलीवरी के लिए अतिरिक्त कीमत देती हूँ'), ('SRCM_STOPPED_STOCK', 'I have stopped keeping material even when required', 'परेशानी के कारण माल रखना ही बंद कर दिया है')]
srcm_ids = [s[0] for s in sourcing_methods]
for sid, sname, shi in sourcing_methods:
    add_var(sid, 'AppVariables', 'SourcingMethod', 'Option', 'Enum', sname, '', 'Sourcing Method Option', sname, title_hi=shi)
add_var('Q_CH_05_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_D_CHALLENGES, Order:35', 'Enum', 'How do you source material from market?', 'Section D Q5', 'Material sourcing mode', var_list=' , '.join(srcm_ids), title_hi='आप बाजार से सामग्री किस प्रकार मंगवाती हैं?')

attract_strategies = [('ATT_SIGNAGE', 'Use of signage boards clearly displaying name of store', 'दुकान के नाम का स्पष्ट साइन बोर्ड लगाना'), ('ATT_WHATSAPP', 'Use of WhatsApp to share images of products with customers', 'ग्राहकों को व्हाट्सएप पर फोटो भेजना'), ('ATT_BEAUTIFY', 'Beautifying shop and attractive displays', 'दुकान की सजावट और सुंदर डिस्प्ले'), ('ATT_POSTERS_DEALS', 'Use of posters/A-frame announcing discounts or special deals', 'छूट/विशेष ऑफर के पोस्टर लगाना'), ('ATT_COMFORT_SEATING', 'Use of comfortable seating / fans for customers', 'ग्राहकों के लिए बैठने व पंखे की अच्छी व्यवस्था')]
att_ids = [a[0] for a in attract_strategies]
for aid, aname, ahi in attract_strategies:
    add_var(aid, 'AppVariables', 'AttractStrategy', 'Option', 'Enum', aname, '', 'Attract Strategy Option', aname, title_hi=ahi)
add_var('Q_CH_06_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_D_CHALLENGES, Order:36', 'EnumList', 'Strategies used to attract more customers (Tick all relevant)', 'Section D Q6', 'Customer attraction strategies', var_list=' , '.join(att_ids), title_hi='ग्राहकों को आकर्षित करने के लिए क्या रणनीतियां अपनाती हैं?')

loan_access = [('LN_EASY_SHG', 'Yes, I get required amount easily from SHG', 'हाँ, SHG से जरूरत के अनुसार आसानी से ऋण मिल जाता है'), ('LN_EASY_MONEYLENDER', 'Yes, I get required loan easily from moneylender/NBFIs', 'हाँ, साहूकार/एनबीएफआई से आसानी से ऋण मिल जाता है'), ('LN_DIFF_SHG_SMALL', 'No, loan amount is smaller than demand in SHGs', 'नहीं, SHG से मिलने वाली ऋण राशि मांग से कम होती है'), ('LN_DIFF_MFI_SMALL', 'No, loan amount is smaller than demand in moneylender/NBFIs', 'नहीं, साहूकार/एनबीएफआई से कम राशि मिलती है'), ('LN_DIFF_MFI_SHORT', 'No, repayment time is too short in moneylender/NBFIs', 'नहीं, साहूकार/एनबीएफआई में चुकाने की अवधि बहुत कम होती है'), ('LN_DIFF_MFI_HIGH_INT', 'No, installment is high due to high interest in NBFIs', 'नहीं, अधिक ब्याज दर के कारण किस्त बहुत भारी पड़ती है')]
ln_ids = [l[0] for l in loan_access]
for lid, lname, lhi in loan_access:
    add_var(lid, 'AppVariables', 'LoanAccess', 'Option', 'Enum', lname, '', 'Loan Accessibility Option', lname, title_hi=lhi)
add_var('Q_CH_07_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_D_CHALLENGES, Order:37', 'Enum', 'Do you have easy access to loans from different sources?', 'Section D Q7', 'Credit accessibility', var_list=' , '.join(ln_ids), title_hi='क्या आपको विभिन्न स्रोतों से आसानी से ऋण मिल जाता है?')
add_var('Q_CH_08_00', 'SurveyResponse', 'AnswerText', 'QuestionPrompt, SEC_D_CHALLENGES, Order:38', 'LongText', 'Other challenges faced in conducting business', 'Section D Q8', 'Open remarks on obstacles', title_hi='व्यवसाय संचालन में आने वाली अन्य चुनौतियां साझा करें')

# ==========================================
# SECTION E: IMPACT OF SVEP / OSF SCHEMES
# ==========================================
add_var('Q_D_01_00', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_E_SCHEME_IMPACT, Order:39', 'Decimal', 'How much loan taken under SVEP/OSF scheme? (Rs)', 'Section E Q1', 'Scheme loan amount', title_hi='आपने SVEP/OSF योजना के तहत कितना ऋण लिया है? (रु)')

loan_usages = [('USE_SEED_CAPITAL', 'Seed capital to buy material and set up shop', 'शुरुआती सामग्री खरीदने और दुकान स्थापित करने हेतु बीज पूंजी'), ('USE_NEW_MACHINE', 'Buy new machine to increase production (e.g. sewing machine)', 'उत्पादन क्षमता बढ़ाने हेतु नई मशीन खरीदना (उदा. सिलाई मशीन)'), ('USE_ASSETS_STORE', 'Buy assets to store and sell new products (e.g. fridge)', 'उत्पाद सुरक्षित रखने/बेचने हेतु उपकरण (उदा. फ्रिज)'), ('USE_EXPAND_SPACE', 'Get additional space to expand business (e.g. flour mill shed)', 'व्यवसाय विस्तार हेतु अतिरिक्त जगह लेना (उदा. चक्की का कमरा)'), ('USE_RANGE_VARIETY', 'Buy more material to increase product range', 'उत्पादों की विविधता बढ़ाने हेतु सामग्री खरीदना'), ('USE_SCALE_VOLUME', 'Buy more material to increase scale of business', 'व्यवसाय का दायरा और स्टॉक बढ़ाने हेतु'), ('USE_VEHICLE_MARKET', 'Buy vehicle to access new market to buy/sell goods', 'माल लाने-ले जाने हेतु वाहन खरीदना'), ('USE_TRANSPORT_SVCS', 'Access better transport services to reach markets', 'बेहतर परिवहन सेवाओं की व्यवस्था करना'), ('USE_MOBILE_PHONE', 'Buy smartphone to promote/sell goods online', 'ऑनलाइन प्रचार व बिक्री हेतु स्मार्टफोन खरीदना'), ('USE_OTHER', 'Any other usage', 'अन्य कोई उपयोग')]
use_ids = [u[0] for u in loan_usages]
for uid, uname, uhi in loan_usages:
    add_var(uid, 'AppVariables', 'LoanUsage', 'Option', 'Enum', uname, '', 'Loan Usage Option', uname, title_hi=uhi)
add_var('Q_D_02_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_E_SCHEME_IMPACT, Order:40', 'EnumList', 'How did you use loan from SHG/Scheme for enterprise? (Tick all relevant)', 'Section E Q2', 'Loan utilization', var_list=' , '.join(use_ids), title_hi='आपने SHG/योजना के ऋण का उपयोग उद्यम के लिए कैसे किया?')

add_var('Q_D_03_01', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_E_SCHEME_IMPACT, Order:41', 'Decimal', 'Average monthly income BEFORE changes (Rs)', 'Section E Q3.1', 'Pre-loan income', title_hi='ऋण से हुए बदलाव से पहले औसत मासिक आय (रु)')
add_var('Q_D_03_02', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_E_SCHEME_IMPACT, Order:42', 'Decimal', 'Average monthly income AFTER changes (Rs)', 'Section E Q3.2', 'Post-loan income', title_hi='ऋण से हुए बदलाव के बाद औसत मासिक आय (रु)')

crp_contributions = [('CRP_ACCESS_LOANS', 'Helped in accessing loans to setup business', 'व्यवसाय शुरू करने के लिए ऋण प्राप्त कराने में मदद की'), ('CRP_BIZ_PLANS', 'Helped us understand and prepare business plans', 'व्यावसायिक योजना बनाने और समझने में मदद की'), ('CRP_CRITICAL_FEEDBACK', 'Gave critical feedback on business idea which improved operations', 'व्यावसायिक विचार पर महत्वपूर्ण सुझाव दिए जिससे काम सुधरा'), ('CRP_RECORD_KEEPING', 'Trained us on maintaining written records regularly', 'बही-खाता और लिखित रिकॉर्ड रखने का प्रशिक्षण दिया'), ('CRP_NEW_IDEAS', 'Gave us new ideas to increase enterprise income', 'आय बढ़ाने के नए विचार और सुझाव दिए'), ('CRP_BANK_LOANS', 'Helped in accessing loans from commercial banks', 'बैंक से ऋण प्राप्त करने में सहयोग किया'), ('CRP_COMMUNICATION', 'Helped improve communication and negotiation skills', 'बातचीत और आत्मविश्वास में सुधार कराया'), ('CRP_MARKETING', 'Helped in marketing and customer outreach', 'मार्केटिंग और ग्राहक जोड़ने में मदद की'), ('CRP_COMPETITOR_STUDY', 'Helped understand competitors and suggested ways to compete', 'प्रतिस्पर्धा समझने और बेहतर सेवा देने के तरीके बताए')]
crp_ids = [c[0] for c in crp_contributions]
for cid, cname, chi in crp_contributions:
    add_var(cid, 'AppVariables', 'CRPContribution', 'Option', 'Enum', cname, '', 'CRP Contribution Option', cname, title_hi=chi)
add_var('Q_D_04_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_E_SCHEME_IMPACT, Order:43', 'EnumList', 'Contribution of SVEP/OSF CRPs in enterprise (Tick all relevant)', 'Section E Q4', 'CRP assistance types', var_list=' , '.join(crp_ids), title_hi='आपके उद्यम में SVEP/OSF सीआरपी का क्या योगदान रहा?')
add_var('Q_D_05_00', 'SurveyResponse', 'AnswerText', 'QuestionPrompt, SEC_E_SCHEME_IMPACT, Order:44', 'LongText', 'Expectations from SVEP/OSF scheme', 'Section E Q5', 'Future expectations', title_hi='SVEP/OSF योजना से आपकी क्या अपेक्षाएं हैं?')

# ==========================================
# SECTION F: DIGITAL, QR CODE & SOCIAL MEDIA
# ==========================================
phone_ownership = [('PHN_YES_OWN', 'Yes, owns personal smartphone', 'हाँ, खुद का स्मार्टफोन है'), ('PHN_NO', 'No, does not own smartphone', 'नहीं, स्मार्टफोन नहीं है'), ('PHN_FAMILY_OWNS', 'No, but family owns smartphone', 'नहीं, लेकिन परिवार के पास है')]
phn_ids = [p[0] for p in phone_ownership]
for pid, pname, phi in phone_ownership:
    add_var(pid, 'AppVariables', 'PhoneOwnership', 'Option', 'Enum', pname, '', 'Phone Ownership Option', pname, title_hi=phi)
add_var('Q_E_01_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_F_DIGITAL_MEDIA, Order:45', 'Enum', 'Do you (SHG member) own a smartphone?', 'Section F Q1', 'Smartphone access', var_list=' , '.join(phn_ids), title_hi='क्या आपके पास स्मार्टफोन है?')
add_var('Q_E_02_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_F_DIGITAL_MEDIA, Order:46', 'Enum', 'Do you use QR code / mobile banking for money transactions?', 'Section F Q2', 'QR / UPI usage', var_list='OPT_YES , OPT_NO', title_hi='क्या आप पैसों के लेन-देन के लिए क्यूआर कोड / यूपीआई का उपयोग करती हैं?')

qr_volumes = [('QRV_5_10', '5-10 transactions daily', 'प्रतिदिन 5-10 लेन-देन'), ('QRV_10_20', '10-20 transactions daily', 'प्रतिदिन 10-20 लेन-देन'), ('QRV_20_40', '20-40 transactions daily', 'प्रतिदिन 20-40 लेन-देन'), ('QRV_GT_40', 'More than 40 transactions daily', 'प्रतिदिन 40 से अधिक लेन-देन')]
qrv_ids = [q[0] for q in qr_volumes]
for qid, qname, qhi in qr_volumes:
    add_var(qid, 'AppVariables', 'QRVolume', 'Option', 'Enum', qname, '', 'QR Volume Option', qname, title_hi=qhi)
add_var('Q_E_03_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_F_DIGITAL_MEDIA, Order:47', 'Enum', 'If yes, daily how many transactions done using QR / UPI?', 'Section F Q3', 'QR transaction frequency', var_list=' , '.join(qrv_ids), title_hi='प्रतिदिन कितने लेन-देन क्यूआर कोड/मोबाइल बैंकिंग से होते हैं?')

qr_non_reasons = [('QRN_NO_PHONE', 'Since I don’t own smartphone, difficult to transact', 'स्मार्टफोन न होने के कारण लेन-देन कठिन है'), ('QRN_FEW_CUSTOMERS', 'Not many customers use smartphone for payments in area', 'हमारे क्षेत्र में ग्राहक ऑनलाइन भुगतान का उपयोग नहीं करते'), ('QRN_LACK_KNOWLEDGE', 'Don’t know how to use and monitor QR/UPI transactions', 'मुझे क्यूआर कोड/यूपीआई का उपयोग और जांच करना नहीं आता')]
qrn_ids = [q[0] for q in qr_non_reasons]
for qid, qname, qhi in qr_non_reasons:
    add_var(qid, 'AppVariables', 'QRNonReason', 'Option', 'Enum', qname, '', 'QR Non Use Reason Option', qname, title_hi=qhi)
add_var('Q_E_04_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_F_DIGITAL_MEDIA, Order:48', 'Enum', 'If no, reason for not using QR code / mobile banking', 'Section F Q4', 'QR non-use rationale', var_list=' , '.join(qrn_ids), title_hi='क्यूआर कोड/मोबाइल बैंकिंग का उपयोग न करने का मुख्य कारण?')

social_platforms = [('SOC_WHATSAPP', 'WhatsApp / WhatsApp Business', 'व्हाट्सएप / व्हाट्सएप बिजनेस'), ('SOC_INSTAGRAM', 'Instagram', 'इंस्टाग्राम'), ('SOC_FACEBOOK', 'Facebook', 'फेसबुक'), ('SOC_PINTEREST', 'Pinterest', 'पिंटरेस्ट'), ('SOC_SNAPCHAT', 'Snapchat', 'स्नैपचैट'), ('SOC_NONE', 'Don’t use social media', 'सोशल मीडिया का उपयोग नहीं करतीं')]
soc_ids = [s[0] for s in social_platforms]
for sid, sname, shi in social_platforms:
    add_var(sid, 'AppVariables', 'SocialPlatform', 'Option', 'Enum', sname, '', 'Platform Option', sname, title_hi=shi)
add_var('Q_E_05_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_F_DIGITAL_MEDIA, Order:49', 'EnumList', 'Social media platforms used for business (Tick all relevant)', 'Section F Q5', 'Social platforms', var_list=' , '.join(soc_ids), title_hi='व्यवसाय के लिए कौन-से सोशल मीडिया प्लेटफॉर्म का उपयोग करती हैं?')

platform_uses = [('USOC_TEXTS_ORDERS', 'Use texts to ask/share prices and book orders', 'कीमत साझा करने और ऑर्डर बुक करने के लिए मैसेजिंग'), ('USOC_SHARE_IMAGES', 'Share product images to promote business', 'व्यवसाय प्रचार के लिए उत्पादों के फोटो साझा करना'), ('USOC_VENDOR_INQUIRY', 'Share images to enquire about product availability to vendors', 'सप्लायर से माल की उपलब्धता पूछने हेतु फोटो भेजना'), ('USOC_NEW_IDEAS', 'Get new ideas and information about trends/products', 'नए डिजाइन और उत्पादों की जानकारी प्राप्त करना'), ('USOC_DONT_USE', 'Don’t use social media for business', 'व्यावसायिक उपयोग नहीं करतीं')]
usoc_ids = [u[0] for u in platform_uses]
for uid, uname, uhi in platform_uses:
    add_var(uid, 'AppVariables', 'PlatformUsage', 'Option', 'Enum', uname, '', 'Platform Usage Option', uname, title_hi=uhi)
add_var('Q_E_06_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_F_DIGITAL_MEDIA, Order:50', 'EnumList', 'How do you use these platforms in business? (Tick all relevant)', 'Section F Q6', 'Social media use mode', var_list=' , '.join(usoc_ids), title_hi='आप अपने व्यवसाय में इन प्लेटफॉर्म्स का उपयोग कैसे करती हैं?')

media_freqs = [('FRQ_DAILY', 'Daily', 'प्रतिदिन'), ('FRQ_2_3_WEEK', 'Twice or thrice a week', 'सप्ताह में 2-3 बार'), ('FRQ_4_5_MONTH', 'Four-five times a month', 'महीने में 4-5 बार'), ('FRQ_OCCASIONAL', 'Only on special occasions / festivals', 'केवल विशेष अवसरों/त्योहारों पर'), ('FRQ_DONT_USE', 'Don’t use social media', 'सोशल मीडिया का उपयोग नहीं करतीं')]
frq_ids = [f[0] for f in media_freqs]
for fid, fname, fhi in media_freqs:
    add_var(fid, 'AppVariables', 'MediaFrequency', 'Option', 'Enum', fname, '', 'Frequency Option', fname, title_hi=fhi)
add_var('Q_E_07_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_F_DIGITAL_MEDIA, Order:51', 'Enum', 'How often do you use social media for business?', 'Section F Q7', 'Frequency of social engagement', var_list=' , '.join(frq_ids), title_hi='व्यवसाय के लिए सोशल मीडिया का उपयोग कितनी बार करती हैं?')

# ==========================================
# SECTION G: STATUS OF POST-EXIT OSF IN BARAN
# ==========================================
add_var('Q_F_01_00', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_G_BARAN_EXIT, Order:52', 'Number', 'In which year was OSF intervention made? (Year)', 'Section G Q1', 'Intervention year', title_hi='OSF योजना का हस्तक्षेप किस वर्ष हुआ था?')

operational_statuses = [('OPS_YES_REDUCED', 'Yes, but sales have reduced', 'हाँ, लेकिन बिक्री कम हो गई है'), ('OPS_YES_INCREASED', 'Yes, and scale/sales have increased', 'हाँ, और व्यवसाय का दायरा/बिक्री बढ़ी है'), ('OPS_CLOSED', 'No, enterprise closed down', 'नहीं, व्यवसाय बंद हो गया है')]
ops_ids = [o[0] for o in operational_statuses]
for oid, oname, ohi in operational_statuses:
    add_var(oid, 'AppVariables', 'OperationalStatus', 'Option', 'Enum', oname, '', 'Operational Status Option', oname, title_hi=ohi)
add_var('Q_F_02_00', 'SurveyResponse', 'AnswerOption', 'QuestionPrompt, SEC_G_BARAN_EXIT, Order:53', 'Enum', 'Is your business still operational?', 'Section G Q2', 'Current status', var_list=' , '.join(ops_ids), title_hi='क्या आपका व्यवसाय अभी भी चालू है?')
add_var('Q_F_02_01', 'SurveyResponse', 'AnswerNumber', 'QuestionPrompt, SEC_G_BARAN_EXIT, Order:54', 'Number', 'If closed, specify year when it was closed', 'Section G Q2.1', 'Closure year', title_hi='यदि बंद हुआ, तो किस वर्ष में बंद हुआ?')

exit_reasons = [('EXT_NO_GUIDANCE', 'Sales reduced over years as there was no one guiding us', 'मार्गदर्शन न मिलने से बिक्री कम होती गई'), ('EXT_NO_LOAN_CAPITAL', 'Needed more capital to source material but no source of loan', 'माल लाने के लिए पूंजी चाहिए थी लेकिन ऋण नहीं मिला'), ('EXT_BANK_REFUSED', 'Banks refused to give us loan', 'बैंकों ने ऋण देने से मना कर दिया'), ('EXT_NO_NEW_CUSTOMERS', 'Unable to reach new customers', 'नए ग्राहकों तक पहुँचने में असमर्थ रहे'), ('EXT_NEW_COMPETITION', 'New competitors entered offering discounts', 'बाजार में नए प्रतिस्पर्धी आ गए'), ('EXT_OTHER', 'Any other reason', 'अन्य कोई कारण'), ('EXT_DONT_KNOW', 'Don’t know / cannot specify', 'पता नहीं')]
ext_ids = [e[0] for e in exit_reasons]
for eid, ename, ehi in exit_reasons:
    add_var(eid, 'AppVariables', 'ExitReason', 'Option', 'Enum', ename, '', 'Exit Reason Option', ename, title_hi=ehi)
add_var('Q_F_03_00', 'SurveyResponse', 'AnswerOptionList', 'QuestionPrompt, SEC_G_BARAN_EXIT, Order:55', 'EnumList', 'Reasons for scaling down or closing business (Tick all relevant)', 'Section G Q3', 'Scale down / exit reasons', var_list=' , '.join(ext_ids), title_hi='व्यवसाय घटने या बंद होने के क्या कारण रहे?')
add_var('Q_F_04_00', 'SurveyResponse', 'AnswerText', 'QuestionPrompt, SEC_G_BARAN_EXIT, Order:56', 'LongText', 'Strategies adopted by you to maintain business', 'Section G Q4', 'Coping mechanisms adopted', title_hi='व्यवसाय बनाए रखने के लिए आपने क्या रणनीतियां अपनाई थीं?')
add_var('Q_F_05_00', 'SurveyResponse', 'AnswerText', 'QuestionPrompt, SEC_G_BARAN_EXIT, Order:57', 'LongText', 'Support that could have helped manage & sustain business', 'Section G Q5', 'Support needed', title_hi='किस प्रकार की सहायता मिलने पर आप अपना व्यवसाय संभाल पातीं?')

# Export AppVariables.csv
appvars_file = os.path.join(OUTPUT_DIR, 'AppVariables.csv')
with open(appvars_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=STANDARD_HEADERS)
    writer.writeheader()
    writer.writerows(app_vars)

print(f"✅ Generated unified AppVariables.csv ({len(app_vars)} rows) at {appvars_file}")

# 2. Generate Survey.csv (Parent Table)
survey_cols = [
    'ID', 'District', 'Block', 'VillageGP', 'CLFName', 'VOName', 'SHGName',
    'RespondentName', 'EnterpriseName', 'SetupYear', 'BusinessActivities',
    'Status', 'InvestigatorID', 'CreatedOn', 'Latitude', 'Longitude'
]
survey_file = os.path.join(OUTPUT_DIR, 'Survey.csv')
with open(survey_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(survey_cols)
print(f"✅ Generated Survey.csv ({len(survey_cols)} columns)")

# 3. Generate SurveyResponse.csv (Single Child Table)
response_cols = [
    'ID', 'Survey', 'Section', 'Question', 'AnswerOption', 'AnswerOptionList',
    'AnswerNumber', 'AnswerText', 'QuestionOrder'
]
response_file = os.path.join(OUTPUT_DIR, 'SurveyResponse.csv')
with open(response_file, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow(response_cols)
print(f"✅ Generated SurveyResponse.csv ({len(response_cols)} columns)")

print("\n🎉 2-TABLE QUESTION-RESPONSE SURVEY ENGINE SETUP COMPLETE!")
