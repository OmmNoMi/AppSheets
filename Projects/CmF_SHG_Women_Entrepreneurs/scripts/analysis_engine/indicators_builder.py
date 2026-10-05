"""
Demographics & Analytical Indicators Sheet Builder (Tables 1.0 to 28.0).
Evaluates single-select, multi-select, SubTable and SubSubTable frequencies.
"""

from typing import List, Tuple, Any
import pandas as pd
import numpy as np
from .excel_styler import (
    font_title, font_bold, font_regular, font_subhead,
    fill_highlight, border_cell, border_total, align_left, align_right, align_center,
    render_table_block, autofit_columns, FMT_INT
)
from .indicators_config import (
    T1_DEF, T2_DEF, T3_DEF, T4_DOCS, T5_AGES, T6_MARITAL, T7_CATS, T8_EDU,
    T14_EXPS, T15_USES, T16_FUNDS, T17_DEF, T18_DEF, T20_CRP, T21_EXP,
    T22_PHONES, T23_DEF, T24_TXNS, T25_SM, T26_PLAT, T27_MODES
)


from .data_evaluator import compute_frequency


def _eval_counts(df: pd.DataFrame, col: str, items: List[Tuple[str, Any]], multi: bool = False) -> List[Tuple[str, int]]:
    return [(r['label'], r['count']) for r in compute_frequency(df, col, items, is_multiselect=multi)]


def build_indicators_sheet(
    ws,
    df_survey: pd.DataFrame,
    df_sub: pd.DataFrame,
    df_subsub: pd.DataFrame,
    schema,
    district_name: str
) -> None:
    """Builds the complete Demographics & Indicators sheet (Tables 1.0 to 28.0)."""
    ws.views.sheetView[0].showGridLines = True
    n_total = len(df_survey)

    # Title & Overview
    ws.merge_cells("A1:F1")
    t1 = ws.cell(row=1, column=1, value=f"General & Demographic Indicators of Women Entrepreneurs ({district_name} District)")
    t1.font, t1.alignment = font_title, align_left

    ws.cell(row=2, column=2, value="Total Number of Women Entrepreneurs Surveyed").font = font_bold
    c_tot = ws.cell(row=2, column=3, value=n_total)
    c_tot.font, c_tot.number_format, c_tot.fill, c_tot.border = font_bold, FMT_INT, fill_highlight, border_total

    cur_r = 4
    # Tables 1, 2, 3, 4
    for num, title, col, opts in [T1_DEF, T2_DEF]:
        cur_r = render_table_block(ws, cur_r, num, title, _eval_counts(df_survey, col, opts), n_total)
    cur_r = render_table_block(ws, cur_r, T3_DEF[0], T3_DEF[1], _eval_counts(df_survey, T3_DEF[2], T3_DEF[3], True), n_total, True)
    cur_r = render_table_block(ws, cur_r, "4.0", "Access to Registrations / Formal Documents", _eval_counts(df_survey, 'RegistrationsDocuments', T4_DOCS, True), n_total, True)

    # Tables 5 to 8
    cur_r = render_table_block(ws, cur_r, "5.0", "Age-Group Distribution", _eval_counts(df_survey, 'RespondentAge', T5_AGES), n_total)
    cur_r = render_table_block(ws, cur_r, "6.0", "Marital Status", _eval_counts(df_survey, 'MaritalStatus', T6_MARITAL), n_total)
    cur_r = render_table_block(ws, cur_r, "7.0", "Social Category (Caste Group)", _eval_counts(df_survey, 'SocialCategory', T7_CATS), n_total)
    t8_items = [(lbl, len(df_survey[df_survey['EducationStatus'].isin(codes)])) for lbl, codes in T8_EDU]
    cur_r = render_table_block(ws, cur_r, "8.0", "Education Status of Women Entrepreneurs", t8_items, n_total)

    # Table 9: Household Size
    fam_cnts = df_survey['FamilyMemberCount'].dropna().apply(lambda x: float(x) if str(x).replace('.', '', 1).isdigit() else np.nan)
    t9_items = [
        ("Upto 4", len(fam_cnts[fam_cnts <= 4])), ("4-6", len(fam_cnts[(fam_cnts > 4) & (fam_cnts <= 6)])),
        ("6-8", len(fam_cnts[(fam_cnts > 6) & (fam_cnts <= 8)])), ("8-10", len(fam_cnts[(fam_cnts > 8) & (fam_cnts <= 10)])),
        ("More than 10", len(fam_cnts[fam_cnts > 10]))
    ]
    cur_r = render_table_block(ws, cur_r, "9.0", "Household Size (Family Members)", t9_items, n_total)

    # Table 10: Earning Members
    earn_sub = df_sub[(df_sub['Question_Group'] == 'Q_B_05') & (df_sub['Question'] == 'Q_B_06_03')]
    earn_map = earn_sub.set_index('Survey')['Question_Enum'].dropna().apply(lambda x: float(x) if str(x).replace('.', '', 1).isdigit() else np.nan)
    earn_cnts = df_survey['ID'].map(earn_map).dropna()
    t10_items = [(str(k), len(earn_cnts[earn_cnts == k])) for k in range(1, 7)] + [("More than 6", len(earn_cnts[earn_cnts > 6]))]
    cur_r = render_table_block(ws, cur_r, "10.0", "Number of Earning Members in Family", t10_items, n_total)

    # Table 11: Annual Household Income
    t11_items = [(lbl, len(df_survey[df_survey['AnnualHouseholdIncome'].isin(codes)])) for lbl, codes in schema.get_income_bracket_mappings()]
    cur_r = render_table_block(ws, cur_r, "11.0", "Annual Household Income Brackets", t11_items, n_total)

    # Table 12: Sources of Funds
    t12_items = []
    for src_name, src_qg in schema.get_capital_sources():
        sst_src = df_subsub[(df_subsub['Question_Group'] == src_qg) & (df_subsub['Question'].isin([
            'SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear', 'SubSubTable_CapitalArranged_ThisYear'
        ]))]
        pos_recs = sst_src[sst_src['Answer_Number'] > 0]
        t12_items.append((src_name, len(pos_recs['Survey'].unique())))
    cur_r = render_table_block(ws, cur_r, "12.0", "Access to Different Sources of Funds", t12_items, n_total, True)

    # Table 13: Purpose of Loan Usages
    t13_items = []
    for _, u_title, u_code in schema.get_loan_usages():
        u_recs = df_subsub[(df_subsub['Question'] == 'SubTable_CapitalLoanUsage_LoanUsage') & (df_subsub['Answer_Enum'] == u_code)]
        t13_items.append((u_title, len(u_recs['Survey'].unique())))
    cur_r = render_table_block(ws, cur_r, "13.0", "Purpose of Utilizing Arranged Capital / Loans", t13_items, n_total, True)

    # Tables 14 & 15
    cur_r = render_table_block(ws, cur_r, "14.0", "Experience with Existing Funding Sources", _eval_counts(df_survey, 'FundingExperience', T14_EXPS, True), n_total, True)
    t15_items = []
    for lbl, q_id in T15_USES:
        sub_h = df_sub[(df_sub['Question_Group'] == 'SubTable_BuisenesHelp') & (df_sub['Question'] == q_id)]
        pos = sub_h[(sub_h['Answer_Enum'] == 'OPT_YES') | (pd.to_numeric(sub_h['Question_Enum'], errors='coerce') > 0) | (pd.to_numeric(sub_h['Answer_Number'], errors='coerce') > 0)]
        t15_items.append((lbl, len(pos['Survey'].unique())))
    cur_r = render_table_block(ws, cur_r, "15.0", "Financial Relief & Income Utilization from Enterprise", t15_items, n_total, True)

    # Tables 16 to 19
    cur_r = render_table_block(ws, cur_r, "16.0", "Future Capital & Fund Requirements for Expansion", _eval_counts(df_survey, 'FutureFundsRequired', T16_FUNDS), n_total)
    cur_r = render_table_block(ws, cur_r, T17_DEF[0], T17_DEF[1], _eval_counts(df_survey, T17_DEF[2], T17_DEF[3]), n_total)
    cur_r = render_table_block(ws, cur_r, T18_DEF[0], T18_DEF[1], _eval_counts(df_survey, T18_DEF[2], T18_DEF[3]), n_total)
    t19_items = [(lbl, len(df_survey[df_survey['MonthlyIncomeIncreaseByOSFSVEP'].isin(codes)])) for lbl, codes in schema.get_monthly_income_increase_mappings()]
    cur_r = render_table_block(ws, cur_r, "19.0", "Increase in Monthly Income Directly Due to SVEP/OSF Loan", t19_items, n_total)

    # Tables 20 to 27
    cur_r = render_table_block(ws, cur_r, "20.0", "Contribution of SVEP / OSF CRPs to Enterprise", _eval_counts(df_survey, 'CRPContributions', T20_CRP, True), n_total, True)
    cur_r = render_table_block(ws, cur_r, "21.0", "Expectations from SVEP / OSF Scheme", _eval_counts(df_survey, 'ExpectationsFromScheme', T21_EXP, True), n_total, True)
    cur_r = render_table_block(ws, cur_r, "22.0", "Ownership & Access to Smartphone", _eval_counts(df_survey, 'SmartphoneOwnership', T22_PHONES), n_total)
    cur_r = render_table_block(ws, cur_r, T23_DEF[0], T23_DEF[1], _eval_counts(df_survey, T23_DEF[2], T23_DEF[3]), n_total)
    cur_r = render_table_block(ws, cur_r, "24.0", "Daily Digital Transaction Volume (QR / UPI)", _eval_counts(df_survey, 'QRDailyTransactions', T24_TXNS), n_total)
    cur_r = render_table_block(ws, cur_r, "25.0", "Social Media Marketing Orientation & Habits", _eval_counts(df_survey, 'SocialMediaForMarketing', T25_SM, True), n_total, True)
    cur_r = render_table_block(ws, cur_r, "26.0", "Social Media Platforms Utilized", _eval_counts(df_survey, 'SocialPlatformsUsed', T26_PLAT, True), n_total, True)
    cur_r = render_table_block(ws, cur_r, "27.0", "Functional Purpose of Social Media in Business", _eval_counts(df_survey, 'SocialPlatformUsageMode', T27_MODES, True), n_total, True)

    # Table 28.0: Key Tenure & Vintage Indicators (Averages)
    avg_biz = df_survey['EnterpriseSetupYear'].dropna().apply(lambda x: float(x) if str(x).replace('.', '', 1).isdigit() else np.nan).mean()
    avg_loan = df_survey['LoanReceivedYear'].dropna().apply(lambda x: float(x) if str(x).replace('.', '', 1).isdigit() else np.nan).mean()
    avg_shg = df_survey['SHGMembershipYears'].dropna().apply(lambda x: float(x) if str(x).replace('.', '', 1).isdigit() else np.nan).mean()

    ws.cell(row=cur_r, column=1, value="Table 28.0").font = font_bold
    ws.cell(row=cur_r, column=2, value="Key Tenure & Vintage Indicators (Averages)").font = font_bold
    c_m = ws.cell(row=cur_r, column=3, value="Metric Value")
    c_m.font, c_m.fill, c_m.alignment = font_subhead, fill_highlight, align_center
    cur_r += 1

    t28_stats = [
        ("Average Years of Enterprise Operation", f"{avg_biz:.1f} Years" if pd.notna(avg_biz) else "N/A"),
        ("Average Years Since SVEP / OSF Loan Disbursement", f"{avg_loan:.1f} Years" if pd.notna(avg_loan) else "N/A"),
        ("Average Years of SHG Membership", f"{avg_shg:.1f} Years" if pd.notna(avg_shg) else "N/A")
    ]
    for lbl, val_s in t28_stats:
        ws.cell(row=cur_r, column=2, value=lbl).font = font_regular
        c_v = ws.cell(row=cur_r, column=3, value=val_s)
        c_v.font, c_v.alignment = font_bold, align_right
        for col_idx in range(2, 4):
            ws.cell(row=cur_r, column=col_idx).border = border_cell
        cur_r += 1

    autofit_columns(ws, min_width=16, padding=3, custom_widths={'A': 12, 'B': 75, 'C': 16, 'D': 16})
