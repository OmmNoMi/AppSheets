# -*- coding: utf-8 -*-
import os, sys, json, csv

# Load base sections data
sys.path.append(r'projects\CmF_SHG_Women_Entrepreneurs\scripts')
from build_refined_76q_master import sections_data
from generate_verbatim_76q import system_rows

print('Original sections data count:', len(sections_data))

# Standardize Survey Column Names to ALWAYS start with Q_
# Map internal col name to standardized Q_ prefixed name
col_rename_map = {
    # Section A
    'District': 'Q_A_01_District',
    'Block': 'Q_A_02_Block',
    'VillageGP': 'Q_A_03_VillageGP',
    'RespondentName': 'Q_A_04_RespondentName',
    'RespondentPhone': 'Q_A_05_RespondentPhone',
    'SHGName': 'Q_A_06_SHGName',
    'VOName': 'Q_A_07_VOName',
    'CLFName': 'Q_A_08_CLFName',
    'SHGMembershipYears': 'Q_A_09_SHGMembershipYears',
    'LeadershipRole': 'Q_A_10_LeadershipRole',
    'LeadershipYears': 'Q_A_11_LeadershipYears',
    'RelatedToCRP': 'Q_A_12_RelatedToCRP',
    'EPInterventionType': 'Q_A_13_EPInterventionType',
    'EnterpriseName': 'Q_A_14_EnterpriseName',
    'EnterpriseSetupYear': 'Q_A_15_EnterpriseSetupYear',
    'BusinessType': 'Q_A_16_BusinessType',
    'BusinessActivities': 'Q_A_17_BusinessActivities',
    'LoanReceivedYear': 'Q_A_18_LoanReceivedYear',
    'MaintainSeparateRecords': 'Q_A_19_MaintainSeparateRecords',
    'RegistrationsDocuments': 'Q_A_20_RegistrationsDocuments',
    
    # Section B
    'RespondentAge': 'Q_B_01_RespondentAge',
    'MaritalStatus': 'Q_B_02_MaritalStatus',
    'SocialCategory': 'Q_B_03_SocialCategory',
    'EducationStatus': 'Q_B_04_EducationStatus',
    'FamilyMemberCount': 'Q_B_05_FamilyMemberCount',
    'FamilyAdultsCount': 'Q_B_06_01_Adults',
    'FamilyChildrenCount': 'Q_B_06_02_Children',
    'FamilyTotalEarning': 'Q_B_06_03_TotalEarning',
    'FamilyMaleEarning': 'Q_B_06_04_MaleEarning',
    'FamilyFemaleEarning': 'Q_B_06_05_FemaleEarning',
    'FamilyDisabledCount': 'Q_B_06_06_DisabledCount',
    'FamilyIncomeSources': 'Q_B_07_FamilyIncomeSources',
    'AnnualHouseholdIncome': 'Q_B_08_AnnualHouseholdIncome',
    
    # Section C
    'ReasonsStartingBusiness': 'Q_C_01_ReasonsStartingBusiness',
    'BusinessCycle': 'Q_C_02_BusinessCycle',
    'BusinessPlaceType': 'Q_C_03_BusinessPlaceType',
    'MonthlyRent': 'Q_C_04_MonthlyRent',
    'LocationConvenience': 'Q_C_05_LocationConvenience',
    'Related_Q6_Labor': 'Q_C_06_Labor_Involvement',
    'Sourcing_NearbyTown_Pct': 'Q_C_07_01_NearbyTown_Pct',
    'Sourcing_Jaipur_Pct': 'Q_C_07_02_WholesaleState_Pct',
    'Sourcing_OutsideState_Pct': 'Q_C_07_03_WholesaleOutside_Pct',
    'Sourcing_Online_Pct': 'Q_C_07_04_Online_Pct',
    'MarketingMethods': 'Q_C_08_MarketingMethods',
    'SeasonalSalesMethod': 'Q_C_09_SellingMethods',
    'SalesChannel_Online_Pct': 'Q_C_10_01_Online_Pct',
    'SalesChannel_WhatsApp_Pct': 'Q_C_10_02_WhatsApp_Pct',
    'SalesChannel_Instagram_Pct': 'Q_C_10_03_Instagram_Pct',
    'SalesChannel_Premise_Pct': 'Q_C_10_04_Premise_Pct',
    'SalesChannel_Traders_Pct': 'Q_C_10_05_Traders_Pct',
    'SalesChannel_Haat_Pct': 'Q_C_10_06_Haat_Pct',
    'SalesChannel_Saras_Pct': 'Q_C_10_07_Saras_Pct',
    'RecordKeepingHabit': 'Q_C_11_RecordKeepingHabit',
    'RecordKeepingMethod': 'Q_C_12_RecordKeepingMethod',
    'Related_Q15_Turnover': 'Q_C_13_Turnover_Income',
    
    # Section D
    'SHGAssociationAssistance': 'Q_D_01_SHGAssociationAssistance',
    'Related_Q19_Capital': 'Q_D_02_Capital_Arranged',
    'Related_Q20_Loan_Usage': 'Q_D_03_Loan_Usage',
    'FundingExperience': 'Q_D_04_FundingExperience',
    'Related_Q22_Trajectory': 'Q_D_05_Business_Trajectory',
    'FinancialHelpFromIncome': 'Q_D_06_FinancialHelpFromIncome',
    
    # Section E
    'HusbandFamilyResponse': 'Q_E_01_HusbandFamilyResponse',
    'MaterialSourcingComfort': 'Q_E_02_MaterialSourcingComfort',
    'CustomerPaymentRecovery': 'Q_E_03_CustomerPaymentRecovery',
    'CurrentChallenges': 'Q_E_04_CurrentChallenges',
    'Competitors_Similar_Scale': 'Q_E_05_Competitors_Count',
    'Competitors_Smaller_Scale': 'Q_E_05_Competitors_Smaller',
    'Competitors_Higher_Scale': 'Q_E_05_Competitors_Higher',
    'CompetitorAdvantages': 'Q_E_06_CompetitorAdvantages',
    
    # Section F
    'FutureExpansionPlans': 'Q_F_01_FutureExpansionPlans',
    'AspirationBottlenecks': 'Q_F_02_AspirationBottlenecks',
    'FutureFundsRequired': 'Q_F_03_FutureFundsRequired',
    
    # Section G
    'AttendedTraining': 'Q_G_01_AttendedTraining',
    'TrainingDetails': 'Q_G_02_TrainingDetails',
    'UsedTrainingComponent': 'Q_G_03_UsedTrainingComponent',
    'UsedTrainingDetails': 'Q_G_04_UsedTrainingDetails',
    'MonthlyIncomeBeforeLoan': 'Q_G_05_MonthlyIncomeBeforeLoan',
    'MonthlyIncomeAfterLoan': 'Q_G_05_MonthlyIncomeAfterLoan',
    'MonthlyIncomeIncreaseByOSFSVEP': 'Q_G_06_MonthlyIncomeIncreaseByOSFSVEP',
    'CRPContributions': 'Q_G_07_CRPContributions',
    'ExpectationsFromScheme': 'Q_G_08_ExpectationsFromScheme',
    
    # Section H
    'SmartphoneOwnership': 'Q_H_01_SmartphoneOwnership',
    'UseQRUPI': 'Q_H_02_UseQRUPI',
    'QRDailyTransactions': 'Q_H_03_QRDailyTransactions',
    'QRNonUseReason': 'Q_H_04_QRNonUseReason',
    'SocialMediaForMarketing': 'Q_H_05_SocialMediaForMarketing',
    'SocialPlatformsUsed': 'Q_H_06_SocialPlatformsUsed',
    'SocialPlatformUsageMode': 'Q_H_07_SocialPlatformUsageMode',
    'SocialMediaFrequency': 'Q_H_08_SocialMediaFrequency',
    
    # Section I
    'OSFInterventionYear': 'Q_I_01_OSFInterventionYear',
    'BusinessOperationalStatus': 'Q_I_02_BusinessOperationalStatus',
    'ScalingDownClosingReasons': 'Q_I_03_ReasonsScalingDown',
    'SupportNeededForSustenance': 'Q_I_04_SupportNeeded'
}

# Add Section Headers in Survey Form
section_headers = [
    ('SEC_A_HEADER', 'SectionA', 'Section A: Basic Details', 'भाग क: सामान्य विवरण', 'भाग क: सामान्य ब्योरो'),
    ('SEC_B_HEADER', 'SectionB', 'Section B: Respondent & Household Profile', 'भाग ख: उत्तरदाता एवं पारिवारिक विवरण', 'भाग ख: उत्तरदाता अर घर रो ब्योरो'),
    ('SEC_C_HEADER', 'SectionC', 'Section C: Enterprise Operations', 'भाग ग: उद्यम संचालन', 'भाग ग: धंधो संचालन'),
    ('SEC_D_HEADER', 'SectionD', 'Section D: Enterprise Financing and Income', 'भाग घ: उद्यम वित्तपोषण एवं आय', 'भाग घ: पैशां रो बंदोबस्त अर आमदनी'),
    ('SEC_E_HEADER', 'SectionE', 'Section E: Ease of Doing Business and Challenges', 'भाग ङ: व्यवसाय की सुगमता एवं चुनौतियाँ', 'भाग ङ: काम री सुगमता अर मुश्किलां'),
    ('SEC_F_HEADER', 'SectionF', 'Section F: Growth Plans and Aspirations', 'भाग च: विकास योजनाएं एवं आकांक्षाएं', 'भाग च: आगे री योजनावां'),
    ('SEC_G_HEADER', 'SectionG', 'Section G: Impact of SVEP/OSF Schemes', 'भाग छ: SVEP/OSF योजनाओं का प्रभाव', 'भाग छ: योजना रो असर'),
    ('SEC_H_HEADER', 'SectionH', 'Section H: Use of Online Transactions and Social Media', 'भाग ज: ऑनलाइन लेनदेन एवं सोशल मीडिया का उपयोग', 'भाग ज: ऑनलाइन लेन-देन अर सोशल मीडिया'),
    ('SEC_I_HEADER', 'SectionI', 'Section I: Post-Exit OSF Intervention Status', 'भाग झ: पोस्ट-एग्जिट OSF स्थिति (बारां एवं रतनगढ़)', 'भाग झ: काम री वर्तमान स्थिति')
]

# Build AppVariables rows with 100% unique IDs, full descriptions, and clean connections
app_vars = []
seen_ids = set()

def add_var(r):
    rid = r['ID']
    if rid in seen_ids:
        # Disambiguate if duplicate
        suffix = 2
        while f'{rid}_{suffix}' in seen_ids:
            suffix += 1
        r['ID'] = f'{rid}_{suffix}'
    seen_ids.add(r['ID'])
    app_vars.append(r)

# 1. System rows
for s in system_rows:
    add_var(s)

# 2. Section Headers
for hid, sec, title, title_hi, title_raj in section_headers:
    add_var({
        'ID': hid,
        'Table': 'Survey',
        'Column': '',
        'Tags': f'SectionHeader, {sec}',
        'ValueControl': 'Header',
        'Title': title,
        'Description': f'Section header for {sec}',
        'UsedFor': 'Section Header',
        'Decimal': '', 'EnumValue': '', 'EnumList': '', 'VariableList': '',
        'DateValue': '', 'Photo': '', 'URL': '', 'File': '',
        'Title_hi': title_hi,
        'Title_raj': title_raj,
        'ActionIcon': '', 'LastEditBy': 'Antigravity', 'LastEditOn': '09/26/2026 14:00:00'
    })

# 3. Master Percentage Scales
add_var({
    'ID': 'MAIN_PCT_SCALE_5',
    'Table': 'Survey',
    'Column': 'MaterialSourcingPct',
    'Tags': 'PercentageScale, MainScale, Sourcing',
    'ValueControl': 'Enum',
    'Title': 'Percentage Scale (0%, 25%, 50%, 75%, 100%)',
    'Description': 'Master scale powering 5-step material sourcing percentage options',
    'UsedFor': 'Scale Definition',
    'Decimal': '', 'EnumValue': 'MAIN_PCT_SCALE_5',
    'EnumList': 'PCT_0 , PCT_25 , PCT_50 , PCT_75 , PCT_100',
    'VariableList': 'PCT_0 , PCT_25 , PCT_50 , PCT_75 , PCT_100',
    'DateValue': '', 'Photo': '', 'URL': '', 'File': '',
    'Title_hi': 'प्रतिशत पैमाना (0%, 25%, 50%, 75%, 100%)',
    'Title_raj': 'प्रतिशत पैमानो (0%, 25%, 50%, 75%, 100%)',
    'ActionIcon': '', 'LastEditBy': 'Antigravity', 'LastEditOn': '09/26/2026 14:00:00'
})

pct5_steps = [
    ('PCT_0', '0%', '0% allocation', '0%'),
    ('PCT_25', '25%', '25% allocation', '25%'),
    ('PCT_50', '50%', '50% allocation', '50%'),
    ('PCT_75', '75%', '75% allocation', '75%'),
    ('PCT_100', '100%', '100% allocation', '100%')
]
for pid, val, desc, hi in pct5_steps:
    add_var({
        'ID': pid,
        'Table': 'Survey',
        'Column': 'MaterialSourcingPct',
        'Tags': 'PercentageOption, 5Step',
        'ValueControl': 'Enum',
        'Title': val,
        'Description': desc,
        'UsedFor': 'Dropdown Option',
        'Decimal': '', 'EnumValue': pid, 'EnumList': '', 'VariableList': '',
        'DateValue': '', 'Photo': '', 'URL': '', 'File': '',
        'Title_hi': hi,
        'Title_raj': hi,
        'ActionIcon': '', 'LastEditBy': 'Antigravity', 'LastEditOn': '09/26/2026 14:00:00'
    })

add_var({
    'ID': 'MAIN_PCT_SCALE_SALES',
    'Table': 'Survey',
    'Column': 'SalesChannelsPct',
    'Tags': 'PercentageScale, MainScale, SalesChannels',
    'ValueControl': 'Enum',
    'Title': 'Percentage Scale (0%, upto 15%, upto 30%, upto 45%, upto 60%, upto 75%, upto 90%, 100%)',
    'Description': 'Master scale powering 8-step sales channel percentage options',
    'UsedFor': 'Scale Definition',
    'Decimal': '', 'EnumValue': 'MAIN_PCT_SCALE_SALES',
    'EnumList': 'PCT15_0 , PCT15_15 , PCT15_30 , PCT15_45 , PCT15_60 , PCT15_75 , PCT15_90 , PCT15_100',
    'VariableList': 'PCT15_0 , PCT15_15 , PCT15_30 , PCT15_45 , PCT15_60 , PCT15_75 , PCT15_90 , PCT15_100',
    'DateValue': '', 'Photo': '', 'URL': '', 'File': '',
    'Title_hi': 'बिक्री प्रतिशत पैमाना (0% से 100%)',
    'Title_raj': 'बिक्री प्रतिशत पैमानो (0% सूं 100%)',
    'ActionIcon': '', 'LastEditBy': 'Antigravity', 'LastEditOn': '09/26/2026 14:00:00'
})

pct8_steps = [
    ('PCT15_0', '0%', '0% sales', '0%'),
    ('PCT15_15', 'upto 15%', 'Up to 15% sales', '15% तक'),
    ('PCT15_30', 'upto 30%', 'Up to 30% sales', '30% तक'),
    ('PCT15_45', 'upto 45%', 'Up to 45% sales', '45% तक'),
    ('PCT15_60', 'upto 60%', 'Up to 60% sales', '60% तक'),
    ('PCT15_75', 'upto 75%', 'Up to 75% sales', '75% तक'),
    ('PCT15_90', 'upto 90%', 'Up to 90% sales', '90% तक'),
    ('PCT15_100', '100%', '100% sales', '100%')
]
for pid, val, desc, hi in pct8_steps:
    add_var({
        'ID': pid,
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'PercentageOption, SalesChannels',
        'ValueControl': 'Enum',
        'Title': val,
        'Description': desc,
        'UsedFor': 'Dropdown Option',
        'Decimal': '', 'EnumValue': pid, 'EnumList': '', 'VariableList': '',
        'DateValue': '', 'Photo': '', 'URL': '', 'File': '',
        'Title_hi': hi,
        'Title_raj': hi,
        'ActionIcon': '', 'LastEditBy': 'Antigravity', 'LastEditOn': '09/26/2026 14:00:00'
    })

# 4. Questions & Options from sections_data
survey_columns = [
    'ID', 'Status', 'InvestigatorID', 'CreatedOn', 'Date', 'Latitude', 'Longitude', 'Language'
]

for q in sections_data:
    raw_col = q.get('col', '')
    std_col = col_rename_map.get(raw_col, raw_col)
    if std_col and std_col not in survey_columns and not raw_col.startswith('Related_') and q.get('type') != 'Ref_Table':
        survey_columns.append(std_col)
    elif raw_col.startswith('Related_') or q.get('type') == 'Ref_Table':
        # Virtual column linking to child table
        survey_columns.append(std_col)
    
    qid = q.get('id')
    sec = q.get('sec', 'General')
    title = q.get('title', '')
    title_hi = q.get('title_hi', '')
    title_raj = q.get('title_raj', '')
    qtype = q.get('type', 'Text')
    
    # Options list for VariableList and EnumList using IDs for Ref navigation
    opts = q.get('options', [])
    opt_ids = []
    for o in opts:
        oid = o[0]
        if oid in ['OPT_YES', 'OPT_NO', 'EXP_OTHER', 'RSN_OTHER', 'MKT_OTHER', 'SEL_OTHER']:
            oid = f'{oid}_{qid}'
        opt_ids.append(oid)
    var_list = ' , '.join(opt_ids) if opt_ids else ''
    
    # Add Question Definition row
    add_var({
        'ID': qid,
        'Table': 'Survey',
        'Column': std_col,
        'Tags': f'QuestionPrompt, {sec}',
        'ValueControl': qtype,
        'Title': title,
        'Description': f'{sec} - {title}',
        'UsedFor': 'Question Label',
        'Decimal': '', 'EnumValue': qid, 'EnumList': var_list, 'VariableList': var_list,
        'DateValue': '', 'Photo': '', 'URL': '', 'File': '',
        'Title_hi': title_hi,
        'Title_raj': title_raj,
        'ActionIcon': '', 'LastEditBy': 'Antigravity', 'LastEditOn': '09/26/2026 14:00:00'
    })
    
    # Add Options rows
    for opt in opts:
        opt_id = opt[0]
        opt_val = opt[1]
        opt_desc = opt[2]
        opt_hi = opt[3]
        opt_raj = opt[4]
        
        # Disambiguate if needed
        full_opt_id = opt_id
        if opt_id in ['OPT_YES', 'OPT_NO']:
            full_opt_id = f'{opt_id}_{qid}'
        elif opt_id in ['EXP_OTHER', 'RSN_OTHER', 'MKT_OTHER', 'SEL_OTHER']:
            full_opt_id = f'{opt_id}_{qid}'
            
        add_var({
            'ID': full_opt_id,
            'Table': 'Survey',
            'Column': std_col,
            'Tags': f'{sec}_Option, DropdownOption',
            'ValueControl': 'Enum',
            'Title': opt_val,
            'Description': opt_desc,
            'UsedFor': 'Dropdown Option',
            'Decimal': '', 'EnumValue': full_opt_id, 'EnumList': '', 'VariableList': '',
            'DateValue': '', 'Photo': '', 'URL': '', 'File': '',
            'Title_hi': opt_hi,
            'Title_raj': opt_raj,
            'ActionIcon': '', 'LastEditBy': 'Antigravity', 'LastEditOn': '09/26/2026 14:00:00'
        })

print(f'Total Generated AppVariables Rows: {len(app_vars)}')
print(f'Total Survey Table Columns: {len(survey_columns)}')

# Check for duplicate IDs
ids = [r['ID'] for r in app_vars]
dups = [i for i in ids if ids.count(i) > 1]
print('Duplicate IDs in final output:', set(dups))

# Save TSV and CSV
out_tsv = r'projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_MASTER_AUTHORITATIVE.tsv'
out_csv = r'projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_MASTER_AUTHORITATIVE.csv'
fieldnames = [
    'ID', 'Table', 'Column', 'Tags', 'ValueControl', 'Title', 'Description', 'UsedFor',
    'Decimal', 'EnumValue', 'EnumList', 'VariableList', 'DateValue', 'Photo', 'URL', 'File',
    'Title_hi', 'Title_raj', 'ActionIcon', 'LastEditBy', 'LastEditOn'
]

with open(out_tsv, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(app_vars)

with open(out_csv, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(app_vars)

print(f'Saved TSV to: {out_tsv}')
print(f'Saved CSV to: {out_csv}')

# Save Survey Columns JSON & TSV
survey_cols_path = r'projects\CmF_SHG_Women_Entrepreneurs\data\Survey_Columns_MASTER.json'
with open(survey_cols_path, 'w', encoding='utf-8') as f:
    json.dump(survey_columns, f, indent=2)

survey_cols_tsv = r'projects\CmF_SHG_Women_Entrepreneurs\data\Survey_Columns_MASTER.tsv'
with open(survey_cols_tsv, 'w', encoding='utf-8') as f:
    f.write('\t'.join(survey_columns) + '\n')

print(f'Saved Survey columns JSON to: {survey_cols_path}')
print(f'Saved Survey columns TSV to: {survey_cols_tsv}')
