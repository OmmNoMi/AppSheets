import sys
import os
import pandas as pd
import numpy as np

sys.path.insert(0, 'projects/CmF_SHG_Women_Entrepreneurs/scripts')
from analysis_engine.schema_loader import SchemaRegistry
from analysis_engine.file_resolver import resolve_all_files

files = resolve_all_files(data_dir='projects/CmF_SHG_Women_Entrepreneurs/data')
schema = SchemaRegistry(files['appvars'])
df_survey = pd.read_csv(files['survey'])
df_sub = pd.read_csv(files['subtable']) if files['subtable'] else pd.DataFrame()
df_subsub = pd.read_csv(files['subsubtable']) if files['subsubtable'] else pd.DataFrame()

def build_questions_registry(schema):

    from analysis_engine.indicators_config import (
        T1_DEF, T2_DEF, T3_DEF, T4_DOCS, T5_AGES, T6_MARITAL, T7_CATS, T8_EDU,
        T14_EXPS, T15_USES, T16_FUNDS, T17_DEF, T18_DEF, T20_CRP, T21_EXP,
        T22_PHONES, T23_DEF, T24_TXNS, T25_SM, T26_PLAT, T27_MODES
    )
    docs_colors = {'DOC_AADHAR': '#34A853', 'DOC_PAN': '#34A853', 'DOC_CASTE': '#34A853', 'DOC_UDYAM': '#4285F4', 'DOC_INCOME': '#4285F4', 'DOC_FSSAI': '#EA4335', 'DOC_SHOP_EST': '#EA4335'}
    docs_tags = {'DOC_AADHAR': 'Identity', 'DOC_PAN': 'Identity', 'DOC_CASTE': 'Social', 'DOC_UDYAM': 'MSME', 'DOC_INCOME': 'Welfare', 'DOC_FSSAI': 'Safety', 'DOC_SHOP_EST': 'Municipal'}

    q_map = [
        {'id': 'qContent_1', 'col': 'q1', 'opts': [{'label': 'Holds Leadership Office', 'code': 'OPT_YES', 'color': '#34A853'}, {'label': 'General SHG Member', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_2', 'col': 'q2', 'opts': [{'label': 'Independent Linkage', 'code': 'OPT_NO', 'color': '#4285F4'}, {'label': 'Related to BDSP / CRPs', 'code': 'OPT_YES', 'color': '#EA4335'}]},
        {'id': 'qContent_3', 'col': 'q3', 'isMulti': True, 'opts': [{'label': 'Service', 'code': 'BTY_SERVICING', 'color': '#4285F4'}, {'label': 'Trading', 'code': 'BTY_TRADING', 'color': '#34A853'}, {'label': 'Production', 'code': 'BTY_MANUFACTURING', 'color': '#FBBC05'}]},
        {'id': 'qContent_4', 'col': 'q4', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': docs_colors.get(c, '#4285F4'), 'tag': docs_tags.get(c, '')} for lbl, c in T4_DOCS]},
        {'id': 'qContent_5', 'col': 'q5', 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4' if '26-35' in lbl or '36-45' in lbl else '#9AA0A6'} for lbl, c in T5_AGES]},
        {'id': 'qContent_6', 'col': 'q6', 'opts': [{'label': lbl, 'code': c, 'color': '#34A853' if c == 'MAR_MARRIED' else '#673AB7'} for lbl, c in T6_MARITAL]},
        {'id': 'qContent_7', 'col': 'q7', 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4' if c == 'CST_SC' else ('#34A853' if c == 'CST_ST' else ('#FBBC05' if c == 'CST_OBC' else '#673AB7'))} for lbl, c in T7_CATS]},
        {'id': 'qContent_8', 'col': 'q8', 'opts': [{'label': lbl, 'code': codes, 'color': '#34A853'} for lbl, codes in T8_EDU]},
        {'id': 'qContent_11', 'col': 'q11', 'opts': [{'label': lbl, 'code': codes, 'color': '#4285F4'} for lbl, codes in schema.get_income_bracket_mappings()]},
        {'id': 'qContent_12', 'col': 'q12', 'isMulti': True, 'opts': [{'label': s[0], 'code': s[0], 'color': '#34A853'} for s in schema.get_capital_sources()]},
        {'id': 'qContent_13', 'col': 'q13', 'isMulti': True, 'opts': [{'label': u[1], 'code': u[1], 'color': '#FBBC05'} for u in schema.get_loan_usages()]},
        {'id': 'qContent_14', 'col': 'q14', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#EA4335'} for lbl, c in T14_EXPS]},
        {'id': 'qContent_15', 'col': 'q15', 'isMulti': True, 'opts': [{'label': lbl, 'code': lbl, 'color': '#673AB7'} for lbl, _ in T15_USES]},
        {'id': 'qContent_16', 'col': 'q16', 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4'} for lbl, c in T16_FUNDS]},
        {'id': 'qContent_17', 'col': 'q17', 'opts': [{'label': 'Attended Training', 'code': 'OPT_YES', 'color': '#673AB7'}, {'label': 'Not Attended', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_18', 'col': 'q18', 'opts': [{'label': 'Implemented Learnings', 'code': 'OPT_YES', 'color': '#34A853'}, {'label': 'Not Implemented', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_19', 'col': 'q19', 'opts': [{'label': lbl, 'code': codes, 'color': '#34A853'} for lbl, codes in schema.get_monthly_income_increase_mappings()]},
        {'id': 'qContent_20', 'col': 'q20', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4'} for lbl, c in T20_CRP]},
        {'id': 'qContent_21', 'col': 'q21', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#EA4335'} for lbl, c in T21_EXP]},
        {'id': 'qContent_22', 'col': 'q22', 'opts': [{'label': lbl, 'code': c, 'color': '#34A853' if c == 'PHN_OWN' else ('#FBBC05' if c == 'PHN_FAMILY_ACCESS' else '#EA4335')} for lbl, c in T22_PHONES]},
        {'id': 'qContent_23', 'col': 'q23', 'opts': [{'label': 'Adopts QR / Digital Payments', 'code': 'OPT_YES', 'color': '#34A853'}, {'label': 'Cash Only Operations', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_24', 'col': 'q24', 'opts': [{'label': lbl + ' Txns/Day', 'code': c, 'color': '#FBBC05'} for lbl, c in T24_TXNS]},
        {'id': 'qContent_25', 'col': 'q25', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#673AB7'} for lbl, c in T25_SM]},
        {'id': 'qContent_26', 'col': 'q26', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#EA4335'} for lbl, c in T26_PLAT]},
        {'id': 'qContent_27', 'col': 'q27', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4'} for lbl, c in T27_MODES]},
    ]
    return q_map

reg = build_questions_registry(schema)
print(f"Built registry with {len(reg)} question mappings!")


# Map SubTable Q10 earning members
earn_sub = df_sub[(df_sub['Question_Group'] == 'Q_B_05') & (df_sub['Question'] == 'Q_B_06_03')]
earn_map = earn_sub.set_index('Survey')['Question_Enum'].dropna().to_dict()

# Map SubSubTable Q12 Sources of funds
sources = schema.get_capital_sources()
q12_map = {}
for src_name, src_qg in sources:
    sst_src = df_subsub[(df_subsub['Question_Group'] == src_qg) & (df_subsub['Question'].isin([
        'SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear', 'SubSubTable_CapitalArranged_ThisYear'
    ]))]
    pos_recs = sst_src[sst_src['Answer_Number'] > 0]
    for sid in pos_recs['Survey'].unique():
        if sid not in q12_map:
            q12_map[sid] = []
        q12_map[sid].append(src_name)

# Map SubSubTable Q13 Loan usages
usages = schema.get_loan_usages()
q13_map = {}
for _, u_title, u_code in usages:
    u_recs = df_subsub[(df_subsub['Question'] == 'SubTable_CapitalLoanUsage_LoanUsage') & (df_subsub['Answer_Enum'] == u_code)]
    for sid in u_recs['Survey'].unique():
        if sid not in q13_map:
            q13_map[sid] = []
        q13_map[sid].append(u_title)

# Map SubTable Q15 Income usage & financial relief
q15_map = {}
for lbl, q_id in T15_USES:
    sub_h = df_sub[(df_sub['Question_Group'] == 'SubTable_BuisenesHelp') & (df_sub['Question'] == q_id)]
    pos = sub_h[(sub_h['Answer_Enum'] == 'OPT_YES') | (pd.to_numeric(sub_h['Question_Enum'], errors='coerce') > 0) | (pd.to_numeric(sub_h['Answer_Number'], errors='coerce') > 0)]
    for sid in pos['Survey'].unique():
        if sid not in q15_map:
            q15_map[sid] = []
        q15_map[sid].append(lbl)

def is_num(val):
    try:
        float(str(val))
        return True
    except:
        return False

# Capital per respondent
sids = set(df_survey['ID'])
cap_map = {}
if not df_subsub.empty:
    sst_q = df_subsub[df_subsub['Question'].isin([
        'SubSubTable_CapitalArranged_FirstYear',
        'SubSubTable_CapitalArranged_MidYear',
        'SubSubTable_CapitalArranged_ThisYear'
    ])]
    for sid, grp in sst_q.groupby('Survey'):
        cap_map[sid] = float(grp['Answer_Number'].dropna().sum())

respondents = []
for _, row in df_survey.iterrows():
    sid = row['ID']
    r = {
        'id': sid,
        'district': str(row.get('District', '')),
        'block': str(row.get('Block', '')),
        'tot_cap': cap_map.get(sid, 0.0),
        'q1': str(row.get('LeadershipRole', '')),
        'q2': str(row.get('RelatedToCRP', '')),
        'q3': [c for c in ['BTY_TRADING', 'BTY_SERVICING', 'BTY_MANUFACTURING'] if c in str(row.get('BusinessType', ''))],
        'q4': [c for c in ['DOC_AADHAR', 'DOC_PAN', 'DOC_CASTE', 'DOC_UDYAM', 'DOC_INCOME', 'DOC_FSSAI', 'DOC_SHOP_EST'] if c in str(row.get('RegistrationsDocuments', ''))],
        'q5': str(row.get('RespondentAge', '')),
        'q6': str(row.get('MaritalStatus', '')),
        'q7': str(row.get('SocialCategory', '')),
        'q8': str(row.get('EducationStatus', '')),
        'q9': float(row.get('FamilyMemberCount')) if is_num(row.get('FamilyMemberCount')) else None,
        'q10': earn_map.get(sid),
        'q11': str(row.get('AnnualHouseholdIncome', '')),
        'q12': q12_map.get(sid, []),
        'q13': q13_map.get(sid, []),
        'q14': [c for c in [x[1] for x in T14_EXPS] if c in str(row.get('FundingExperience', ''))],
        'q15': q15_map.get(sid, []),
        'q16': str(row.get('FutureFundsRequired', '')),
        'q17': str(row.get('AttendedTraining', '')),
        'q18': str(row.get('UsedTrainingComponent', '')),
        'q19': str(row.get('MonthlyIncomeIncreaseByOSFSVEP', '')),
        'q20': [c for c in [x[1] for x in T20_CRP] if c in str(row.get('CRPContributions', ''))],
        'q21': [c for c in [x[1] for x in T21_EXP] if c in str(row.get('ExpectationsFromScheme', ''))],
        'q22': str(row.get('SmartphoneOwnership', '')),
        'q23': str(row.get('UseQRUPI', '')),
        'q24': str(row.get('QRDailyTransactions', '')),
        'q25': [c for c in [x[1] for x in T25_SM] if c in str(row.get('SocialMediaForMarketing', ''))],
        'q26': [c for c in [x[1] for x in T26_PLAT] if c in str(row.get('SocialPlatformsUsed', ''))],
        'q27': [c for c in [x[1] for x in T27_MODES] if c in str(row.get('SocialPlatformUsageMode', ''))],
        't28_setup': float(row.get('EnterpriseSetupYear')) if is_num(row.get('EnterpriseSetupYear')) else None,
        't28_loan': float(row.get('LoanReceivedYear')) if is_num(row.get('LoanReceivedYear')) else None,
        't28_shg': float(row.get('SHGMembershipYears')) if is_num(row.get('SHGMembershipYears')) else None,
        'activities': [c.strip() for c in str(row.get('BusinessActivities', '')).split(',') if c.strip()],
    }
    respondents.append(r)

print(f"Successfully extracted {len(respondents)} respondent records!")
print(f"Sample respondent record keys: {list(respondents[0].keys())}")
print(f"Respondent 0 District: {respondents[0]['district']}, Block: {respondents[0]['block']}, Capital: {respondents[0]['tot_cap']}")


