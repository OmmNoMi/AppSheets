"""
Shared Data Evaluation & Multi-District Calculation Engine.
Consolidates frequency distributions, activity matching, and district data bundles
to ensure 100% mathematical consistency across Excel and HTML outputs.
Strictly adheres to <= 300 lines per file policy.
"""

from typing import List, Tuple, Dict, Any, Set
import pandas as pd


def matches_activity(resp_act_str: Any, act_codes: List[str]) -> bool:
    """Parses comma-separated AppSheet EnumLists and checks for code matching."""
    if pd.isna(resp_act_str):
        return False
    r_codes = [c.strip() for c in str(resp_act_str).split(',') if c.strip()]
    return any(c in act_codes for c in r_codes)


def compute_frequency(
    df: pd.DataFrame,
    column: str,
    items: List[Tuple[str, Any]],
    is_multiselect: bool = False
) -> List[Dict[str, Any]]:
    """Calculates frequency distributions (counts & percentages) for single- or multi-select columns."""
    n = len(df)
    results = []
    for lbl, code in items:
        if is_multiselect:
            if isinstance(code, list):
                cnt = int(df[column].astype(str).apply(
                    lambda x, cd=code: any(c in [s.strip() for s in x.split(',')] for c in cd)
                ).sum())
            else:
                cnt = int(df[column].astype(str).str.contains(str(code), na=False).sum())
        else:
            if isinstance(code, list):
                cnt = int(df[column].isin(code).sum())
            else:
                cnt = int((df[column] == code).sum())
        pct = (cnt / n * 100) if n > 0 else 0.0
        results.append({'label': lbl, 'code': code, 'count': cnt, 'pct': pct})
    return results


def compute_district_bundle(
    df_survey: pd.DataFrame,
    df_subsub: pd.DataFrame,
    schema,
    district_name: str
) -> Dict[str, Any]:
    """Pre-computes complete metrics bundle for a specific district or all districts combined."""
    n = len(df_survey)
    sids = set(df_survey['ID'])
    subsub_dist = df_subsub[df_subsub['Survey'].isin(sids)] if not df_subsub.empty else pd.DataFrame()

    # Capital sums
    if not subsub_dist.empty:
        cap_nums = subsub_dist[subsub_dist['Question'].isin([
            'SubSubTable_CapitalArranged_FirstYear',
            'SubSubTable_CapitalArranged_MidYear',
            'SubSubTable_CapitalArranged_ThisYear'
        ])]['Answer_Number'].dropna()
        tot_cap = float(cap_nums.sum())
    else:
        tot_cap = 0.0
    avg_cap = (tot_cap / n) if n > 0 else 0.0

    # Digital payments
    qr_yes = int((df_survey['UseQRUPI'] == 'OPT_YES').sum())
    qr_pct = (qr_yes / n * 100) if n > 0 else 0.0

    # Q1 & Q2
    q1_yes = int((df_survey['LeadershipRole'] == 'OPT_YES').sum())
    q1_no = int((df_survey['LeadershipRole'] == 'OPT_NO').sum())
    q2_yes = int((df_survey['RelatedToCRP'] == 'OPT_YES').sum())
    q2_no = int((df_survey['RelatedToCRP'] == 'OPT_NO').sum())

    # Q3 Sectors
    q3_trd = int(df_survey['BusinessType'].astype(str).str.contains('BTY_TRADING', na=False).sum())
    q3_mfg = int(df_survey['BusinessType'].astype(str).str.contains('BTY_MANUFACTURING', na=False).sum())
    q3_srv = int(df_survey['BusinessType'].astype(str).str.contains('BTY_SERVICING', na=False).sum())

    # Q4 Documents
    docs_def = [
        ("Aadhar Card", "DOC_AADHAR", "Universal Identity", "#34A853"),
        ("PAN Card", "DOC_PAN", "Universal Identity", "#34A853"),
        ("Caste Certificate", "DOC_CASTE", "Social Identity", "#34A853"),
        ("Udyam Aadhar", "DOC_UDYAM", "Enterprise MSME", "#4285F4"),
        ("Income Certificate", "DOC_INCOME", "Welfare Verification", "#4285F4"),
        ("FSSAI License", "DOC_FSSAI", "Commercial Safety", "#EA4335"),
        ("Shop & Establishment", "DOC_SHOP_EST", "Municipal License", "#EA4335"),
    ]
    docs_stats = []
    for lbl, code, tag, col in docs_def:
        cnt = int(df_survey['RegistrationsDocuments'].astype(str).str.contains(code, na=False).sum())
        pct = (cnt / n * 100) if n > 0 else 0.0
        docs_stats.append({'label': lbl, 'count': cnt, 'pct': pct, 'tag': tag, 'color': col})

    # Q5 Ages
    ages_def = [("18-25", "AGE_18_25"), ("26-35", "AGE_26_35"), ("36-45", "AGE_36_45"), ("46-55", "AGE_46_55"), ("Above 55", "AGE_ABOVE_55")]
    ages_stats = []
    for lbl, code in ages_def:
        cnt = int((df_survey['RespondentAge'] == code).sum())
        pct = (cnt / n * 100) if n > 0 else 0.0
        ages_stats.append({'bracket': lbl, 'count': cnt, 'pct': pct})

    # Top Activities
    acts = schema.get_business_activities()
    act_counts = []
    for sector, num, title, codes in acts:
        cnt = int(df_survey['BusinessActivities'].astype(str).apply(lambda x, c=codes: matches_activity(x, c)).sum())
        if cnt > 0:
            act_counts.append({'title': title, 'sector': sector, 'count': cnt, 'pct': (cnt / n * 100) if n > 0 else 0.0})
    act_counts.sort(key=lambda x: x['count'], reverse=True)

    # Social Category Matrix
    caste_stats = [
        {'label': 'SC', 'count': int((df_survey['SocialCategory'] == 'CST_SC').sum()), 'pct': (int((df_survey['SocialCategory'] == 'CST_SC').sum()) / n * 100) if n > 0 else 0.0},
        {'label': 'ST', 'count': int((df_survey['SocialCategory'] == 'CST_ST').sum()), 'pct': (int((df_survey['SocialCategory'] == 'CST_ST').sum()) / n * 100) if n > 0 else 0.0},
        {'label': 'OBC', 'count': int((df_survey['SocialCategory'] == 'CST_OBC').sum()), 'pct': (int((df_survey['SocialCategory'] == 'CST_OBC').sum()) / n * 100) if n > 0 else 0.0},
        {'label': 'General', 'count': int((df_survey['SocialCategory'] == 'CST_GEN').sum()), 'pct': (int((df_survey['SocialCategory'] == 'CST_GEN').sum()) / n * 100) if n > 0 else 0.0}
    ]

    return {
        'name': district_name,
        'n_tot': n,
        'tot_cap': tot_cap,
        'avg_cap': avg_cap,
        'qr_cnt': qr_yes,
        'qr_pct': qr_pct,
        'q1': {'yes': q1_yes, 'no': q1_no, 'pct_yes': (q1_yes / n * 100) if n > 0 else 0.0},
        'q2': {'yes': q2_yes, 'no': q2_no, 'pct_no': (q2_no / n * 100) if n > 0 else 0.0},
        'q3': {
            'trd': q3_trd, 'mfg': q3_mfg, 'srv': q3_srv,
            'trd_pct': (q3_trd / n * 100) if n > 0 else 0.0,
            'mfg_pct': (q3_mfg / n * 100) if n > 0 else 0.0,
            'srv_pct': (q3_srv / n * 100) if n > 0 else 0.0
        },
        'q4': docs_stats,
        'q5': ages_stats,
        'top_activities': act_counts[:5],
        'caste_matrix': caste_stats
    }


def extract_respondent_records(
    df_survey: pd.DataFrame,
    df_sub: pd.DataFrame,
    df_subsub: pd.DataFrame,
    schema
) -> Dict[str, Any]:
    """Extracts granular respondent records and metadata for client-side multi-filter engine."""
    from .indicators_config import T14_EXPS, T15_USES, T20_CRP, T21_EXP, T25_SM, T26_PLAT, T27_MODES

    import math

    def _num(v):
        if v is None or pd.isna(v):
            return None
        try:
            val = float(str(v))
            return None if (math.isnan(val) or math.isinf(val)) else val
        except (ValueError, TypeError):
            return None

    # Earning members from SubTable
    earn_map = {}
    if not df_sub.empty:
        esub = df_sub[(df_sub['Question_Group'] == 'Q_B_05') & (df_sub['Question'] == 'Q_B_06_03')]
        earn_map = esub.set_index('Survey')['Question_Enum'].dropna().to_dict()

    # Capital arranged per respondent
    cap_map = {}
    q12_map = {}
    q13_map = {}
    if not df_subsub.empty:
        cq = df_subsub[df_subsub['Question'].isin([
            'SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear', 'SubSubTable_CapitalArranged_ThisYear'
        ])]
        for sid, grp in cq.groupby('Survey'):
            cap_map[sid] = float(grp['Answer_Number'].dropna().sum())

        cap_src_map = {}
        for src_name, src_qg in schema.get_capital_sources():
            sst_src = df_subsub[(df_subsub['Question_Group'] == src_qg) & (df_subsub['Question'].isin([
                'SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear', 'SubSubTable_CapitalArranged_ThisYear'
            ]))]
            for sid, grp in sst_src.groupby('Survey'):
                s_amt = float(grp['Answer_Number'].dropna().sum())
                if s_amt > 0:
                    q12_map.setdefault(sid, []).append(src_name)
                    cap_src_map.setdefault(sid, {})[src_name] = s_amt

        for _, u_title, u_code in schema.get_loan_usages():
            urecs = df_subsub[(df_subsub['Question'] == 'SubTable_CapitalLoanUsage_LoanUsage') & (df_subsub['Answer_Enum'] == u_code)]
            for sid in urecs['Survey'].unique():
                q13_map.setdefault(sid, []).append(u_title)

    # SubTable Q15 relief
    q15_map = {}
    if not df_sub.empty:
        for lbl, q_id in T15_USES:
            sub_h = df_sub[(df_sub['Question_Group'] == 'SubTable_BuisenesHelp') & (df_sub['Question'] == q_id)]
            pos = sub_h[(sub_h['Answer_Enum'] == 'OPT_YES') | (pd.to_numeric(sub_h['Question_Enum'], errors='coerce') > 0) | (pd.to_numeric(sub_h['Answer_Number'], errors='coerce') > 0)]
            for sid in pos['Survey'].unique():
                q15_map.setdefault(sid, []).append(lbl)

    # Build respondents array
    respondents = []
    for _, row in df_survey.iterrows():
        sid = row['ID']
        r = {
            'id': sid,
            'district': str(row.get('District', '')),
            'block': str(row.get('Block', '')),
            'tot_cap': cap_map.get(sid, 0.0),
            'cap_sources': cap_src_map.get(sid, {}),
            'q1': str(row.get('LeadershipRole', '')),
            'q2': str(row.get('RelatedToCRP', '')),
            'q3': [c for c in ['BTY_TRADING', 'BTY_SERVICING', 'BTY_MANUFACTURING'] if c in str(row.get('BusinessType', ''))],
            'q4': [c for c in ['DOC_AADHAR', 'DOC_PAN', 'DOC_CASTE', 'DOC_UDYAM', 'DOC_INCOME', 'DOC_FSSAI', 'DOC_SHOP_EST'] if c in str(row.get('RegistrationsDocuments', ''))],
            'q5': str(row.get('RespondentAge', '')),
            'q6': str(row.get('MaritalStatus', '')),
            'q7': str(row.get('SocialCategory', '')),
            'q8': str(row.get('EducationStatus', '')),
            'q9': _num(row.get('FamilyMemberCount')),
            'q10': _num(earn_map.get(sid)),
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
            't28_setup': _num(row.get('EnterpriseSetupYear')),
            't28_loan': _num(row.get('LoanReceivedYear')),
            't28_shg': _num(row.get('SHGMembershipYears')),
            'activities': [c.strip() for c in str(row.get('BusinessActivities', '')).split(',') if c.strip()],
            'family_support': [c.strip() for c in str(row.get('HusbandFamilyResponse', '')).split(',') if c.strip()],
            'sourcing_comfort': [c.strip() for c in str(row.get('MaterialSourcingComfort', '')).split(',') if c.strip()],
        }
        respondents.append(r)

    # Distinct districts & blocks metadata
    districts = []
    for dcode in sorted(df_survey['District'].dropna().unique()):
        cnt = int((df_survey['District'] == dcode).sum())
        clean_d = str(dcode).replace("DIST_", "").replace("_", " ").title()
        districts.append({'code': dcode, 'name': clean_d, 'count': cnt})

    blocks = []
    for bcode in sorted(df_survey['Block'].dropna().unique()):
        df_b = df_survey[df_survey['Block'] == bcode]
        dcode = df_b['District'].iloc[0] if not df_b.empty else ''
        clean_b = str(bcode).replace("BLK_", "").replace("_", " ").title()
        blocks.append({'code': bcode, 'name': clean_b, 'district': dcode, 'count': len(df_b)})

    return {'respondents': respondents, 'districts': districts, 'blocks': blocks}

