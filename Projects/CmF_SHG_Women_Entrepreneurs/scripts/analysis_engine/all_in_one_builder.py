"""
All-In-One Single Sheet Builder for Survey Analysis Engine.
Stacks all 4 analytical sections (Finance, Social Matrix, Agency, and Demographics)
sequentially onto a single consolidated Excel worksheet.
Strictly adheres to <= 300 lines per file policy.
"""

from typing import Dict, List, Any
import pandas as pd
import numpy as np
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

from .data_evaluator import matches_activity, compute_frequency, get_primary_activity
from .excel_styler import (
    font_title, font_head, font_subhead, font_bold, font_regular, font_italic,
    fill_header, fill_subhead, fill_total, fill_highlight,
    border_cell, border_total, align_center, align_left, align_right,
    FMT_CURRENCY, FMT_PERCENT, FMT_INT, autofit_columns, render_table_block
)
from .indicators_config import (
    T1_DEF, T2_DEF, T3_DEF, T4_DOCS, T5_AGES, T6_MARITAL, T7_CATS, T8_EDU,
    T14_EXPS, T15_USES, T16_FUNDS, T17_DEF, T18_DEF, T20_CRP, T21_EXP,
    T22_PHONES, T23_DEF, T24_TXNS, T25_SM, T26_PLAT, T27_MODES
)

fill_section_banner = PatternFill(start_color="174EA6", end_color="174EA6", fill_type="solid")
font_section_banner = Font(name="Calibri", size=11, bold=True, color="FFFFFF")


def render_section_divider(ws, row: int, title: str, max_col: int = 21) -> int:
    """Renders a wide branded section header band across the sheet."""
    ws.row_dimensions[row].height = 24
    ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=max_col)
    cell = ws.cell(row=row, column=1, value=title)
    cell.font = font_section_banner
    cell.fill = fill_section_banner
    cell.alignment = Alignment(horizontal="left", vertical="center", indent=1)
    return row + 2


def _eval_counts(df: pd.DataFrame, col: str, items: List[Any], multi: bool = False) -> List[tuple]:
    return [(r['label'], r['count']) for r in compute_frequency(df, col, items, is_multiselect=multi)]


def build_all_in_one_sheet(
    ws,
    df_survey: pd.DataFrame,
    df_sub: pd.DataFrame,
    df_subsub: pd.DataFrame,
    schema,
    district_name: str = "Dausa"
) -> None:
    """Consolidates all 4 survey sections onto a single continuous worksheet."""
    ws.views.sheetView[0].showGridLines = True
    n_resp = len(df_survey)
    activities = schema.get_business_activities()
    cap_sources = schema.get_capital_sources()
    df_eval = df_survey.copy()
    if 'PrimaryActivity' not in df_eval.columns:
        df_eval['PrimaryActivity'] = df_eval.apply(get_primary_activity, axis=1)

    # Master Title Block
    ws.row_dimensions[1].height = 30
    ws.merge_cells("A1:U1")
    t1 = ws.cell(row=1, column=1, value=f"OmmNoMi Automation LLP - Women Entrepreneurship Comprehensive Survey Analysis ({district_name} District)")
    t1.font = Font(name="Calibri", size=14, bold=True, color="1A73E8")
    t1.alignment = Alignment(horizontal="left", vertical="center")

    ws.merge_cells("A2:U2")
    t2 = ws.cell(row=2, column=1, value=f"Target Cohort: {district_name} District | Active Working Sample Size: N = {n_resp} Women Entrepreneurs")
    t2.font = font_italic
    t2.alignment = Alignment(horizontal="left", vertical="center")

    cur_r = 4

    # =========================================================================
    # SECTION 1: FINANCE & CAPITAL MOBILIZATION
    # =========================================================================
    cur_r = render_section_divider(ws, cur_r, "SECTION 1: FINANCE & CAPITAL MOBILIZATION (INVESTMENTS & CREDIT SOURCES)")
    
    # Header Row 1
    for col_i, text in [(4, "No. of enterprises"), (5, "Total funds invested"), (6, "Average funds invested")]:
        c = ws.cell(row=cur_r, column=col_i, value=text)
        c.font, c.fill, c.alignment = font_head, fill_header, align_center

    ws.merge_cells(f"G{cur_r}:T{cur_r}")
    c_src = ws.cell(row=cur_r, column=7, value="Total loan amount from different sources")
    c_src.font, c_src.fill, c_src.alignment = font_head, fill_header, align_center

    c_obs = ws.cell(row=cur_r, column=21, value="Total business performance observations for current year (No.)")
    c_obs.font, c_obs.fill, c_obs.alignment = font_head, fill_header, align_center

    # Subheaders
    cur_r += 1
    subheaders = [(1, "Sector"), (2, "#"), (3, "Business activities"), (4, "Count"), (5, "Total (Rs)"), (6, "Average (Rs)")]
    for c_idx, s_name in enumerate([s[0] for s in cap_sources], start=7):
        subheaders.append((c_idx, s_name))
    subheaders.append((21, "Current Year Obs (No.)"))

    for c_idx, s_text in subheaders:
        c = ws.cell(row=cur_r, column=c_idx, value=s_text)
        c.font, c.fill, c.alignment, c.border = font_subhead, fill_subhead, align_center, border_cell

    cur_r += 1
    fin_start_r = cur_r
    sector_ranges = {}
    for i, (sector, num, title, codes) in enumerate(activities):
        if sector not in sector_ranges:
            sector_ranges[sector] = []
        r_matches = df_eval[df_eval['PrimaryActivity'].isin(codes)]
        cnt = len(r_matches)
        sids = set(r_matches['ID'])

        src_amounts = []
        for s_name, s_qg in cap_sources:
            if not df_subsub.empty and sids:
                recs = df_subsub[
                    (df_subsub['Survey'].isin(sids)) &
                    (df_subsub['Question_Group'] == s_qg) &
                    (df_subsub['Question'].isin([
                        'SubSubTable_CapitalArranged_FirstYear',
                        'SubSubTable_CapitalArranged_MidYear',
                        'SubSubTable_CapitalArranged_ThisYear'
                    ]))
                ]
                amt = float(recs['Answer_Number'].dropna().sum())
            else:
                amt = 0.0
            src_amounts.append(amt)

        tot_invest = sum(src_amounts)
        avg_invest = f"=IF(D{cur_r}>0, E{cur_r}/D{cur_r}, 0)"

        ws.cell(row=cur_r, column=1, value=sector if not sector_ranges[sector] else "").font = font_bold
        ws.cell(row=cur_r, column=2, value=num).font = font_regular
        ws.cell(row=cur_r, column=3, value=title).font = font_regular
        ws.cell(row=cur_r, column=4, value=cnt).font = font_regular
        
        c_e = ws.cell(row=cur_r, column=5, value=tot_invest)
        c_e.font, c_e.number_format = font_regular, FMT_CURRENCY
        
        c_f = ws.cell(row=cur_r, column=6, value=avg_invest)
        c_f.font, c_f.number_format = font_regular, FMT_CURRENCY

        for c_idx, amt in enumerate(src_amounts, start=7):
            c_val = ws.cell(row=cur_r, column=c_idx, value=amt)
            c_val.font, c_val.number_format = font_regular, FMT_CURRENCY
            c_val.alignment = align_right

        c_u = ws.cell(row=cur_r, column=21, value=cnt)
        c_u.font, c_u.alignment = font_regular, align_center
        sector_ranges[sector].append(cur_r)
        cur_r += 1

    fin_end_r = cur_r - 1
    # Total Row for Section 1
    ws.merge_cells(f"A{cur_r}:C{cur_r}")
    c_tot = ws.cell(row=cur_r, column=1, value="Grand Total (Finance)")
    c_tot.font, c_tot.fill, c_tot.alignment = font_bold, fill_total, align_left
    ws.cell(row=cur_r, column=4, value=f"=SUM(D{fin_start_r}:D{fin_end_r})").font = font_bold
    ws.cell(row=cur_r, column=4).fill = fill_total
    ws.cell(row=cur_r, column=5, value=f"=SUM(E{fin_start_r}:E{fin_end_r})").font = font_bold
    ws.cell(row=cur_r, column=5).number_format = FMT_CURRENCY
    ws.cell(row=cur_r, column=5).fill = fill_total
    ws.cell(row=cur_r, column=6, value=f"=IF(D{cur_r}>0, E{cur_r}/D{cur_r}, 0)").font = font_bold
    ws.cell(row=cur_r, column=6).number_format = FMT_CURRENCY
    ws.cell(row=cur_r, column=6).fill = fill_total
    for c_idx in range(7, 21):
        c_ltr = get_column_letter(c_idx)
        c_tot_s = ws.cell(row=cur_r, column=c_idx, value=f"=SUM({c_ltr}{fin_start_r}:{c_ltr}{fin_end_r})")
        c_tot_s.font, c_tot_s.number_format, c_tot_s.fill = font_bold, FMT_CURRENCY, fill_total
    ws.cell(row=cur_r, column=21, value=f"=SUM(U{fin_start_r}:U{fin_end_r})").font = font_bold
    ws.cell(row=cur_r, column=21).fill = fill_total
    cur_r += 3

    # =========================================================================
    # SECTION 2: SOCIAL CATEGORY MATRIX
    # =========================================================================
    cur_r = render_section_divider(ws, cur_r, "SECTION 2: SOCIAL CATEGORY MATRIX (CASTE DISTRIBUTION ACROSS 29 BUSINESS ACTIVITIES)")
    
    ws.merge_cells(f"D{cur_r}:G{cur_r}")
    c_soc = ws.cell(row=cur_r, column=4, value="Social Category #")
    c_soc.font, c_soc.fill, c_soc.alignment = font_head, fill_header, align_center
    ws.cell(row=cur_r, column=8, value="Total number of enterprises").font = font_head
    ws.cell(row=cur_r, column=8).fill = fill_header
    ws.cell(row=cur_r, column=8).alignment = align_center

    cur_r += 1
    m_headers = [(1, "Sector"), (2, "#"), (3, "Business activities"), (4, "SC"), (5, "ST"), (6, "OBC"), (7, "Gen"), (8, "Total")]
    for c_idx, s_text in m_headers:
        c = ws.cell(row=cur_r, column=c_idx, value=s_text)
        c.font, c.fill, c.alignment, c.border = font_subhead, fill_subhead, align_center, border_cell

    cur_r += 1
    mat_start_r = cur_r
    s_ranges_m = {}
    for i, (sector, num, title, codes) in enumerate(activities):
        if sector not in s_ranges_m:
            s_ranges_m[sector] = []
        r_matches = df_eval[df_eval['PrimaryActivity'].isin(codes)]
        sc_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_SC'])
        st_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_ST'])
        obc_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_OBC'])
        gen_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_GEN'])
        tot_cnt = sc_cnt + st_cnt + obc_cnt + gen_cnt

        ws.cell(row=cur_r, column=1, value=sector if not s_ranges_m[sector] else "").font = font_bold
        ws.cell(row=cur_r, column=2, value=num).font = font_regular
        ws.cell(row=cur_r, column=3, value=title).font = font_regular
        for c_idx, v in enumerate([sc_cnt, st_cnt, obc_cnt, gen_cnt, tot_cnt], start=4):
            c = ws.cell(row=cur_r, column=c_idx, value=v)
            c.font, c.alignment, c.border = font_regular, align_center, border_cell
        s_ranges_m[sector].append(cur_r)
        cur_r += 1

    mat_end_r = cur_r - 1
    ws.merge_cells(f"A{cur_r}:C{cur_r}")
    c_mtot = ws.cell(row=cur_r, column=1, value="Grand Total (Matrix)")
    c_mtot.font, c_mtot.fill, c_mtot.alignment = font_bold, fill_total, align_left
    for c_idx in range(4, 9):
        c_ltr = get_column_letter(c_idx)
        c = ws.cell(row=cur_r, column=c_idx, value=f"=SUM({c_ltr}{mat_start_r}:{c_ltr}{mat_end_r})")
        c.font, c.fill, c.alignment, c.border = font_bold, fill_total, align_center, border_total
    cur_r += 3

    # =========================================================================
    # SECTION 3: EMPOWERMENT & SOURCING INDEPENDENCE
    # =========================================================================
    cur_r = render_section_divider(ws, cur_r, "SECTION 3: EMPOWERMENT, AGENCY & SOURCING INDEPENDENCE")
    
    t16_opts = [
        ("I need help from my family in running my enterprise more effectively", "HRESP_NEED_HELP"),
        ("My husband was not supportive initially, but now helps when required", "HRESP_INIT_NO_HELP"),
        ("My husband was supportive from the beginning", "HRESP_ALWAYS_SUPPORT"),
        ("My husband helped initially, but now I manage most things myself", "HRESP_HELPED_INITIALLY"),
        ("My husband does not support me, so I run it entirely independently", "HRESP_NO_SUPPORT"),
    ]
    t16_items = [(lbl, int(df_survey['HusbandFamilyResponse'].astype(str).str.contains(c, na=False).sum())) for lbl, c in t16_opts]
    cur_r = render_table_block(ws, cur_r, "Table 16", "Family Support (Husband & Household Dynamics)", t16_items, n_resp, is_multiselect=True)

    t17_opts = [
        ("I travel outside the village/block alone to purchase raw materials", "SRC_TRAVEL_ALONE"),
        ("I travel outside accompanied by husband or male family member", "SRC_TRAVEL_ACCOMPANIED"),
        ("My husband / family handles all material purchasing from market", "SRC_FAMILY_HANDLES"),
        ("Suppliers / vendors deliver raw materials directly to my doorstep", "SRC_VENDOR_DELIVERY"),
        ("Other material sourcing arrangement", "SRC_OTHER"),
    ]
    t17_items = [(lbl, int(df_survey['MaterialSourcingComfort'].astype(str).str.contains(c, na=False).sum())) for lbl, c in t17_opts]
    cur_r = render_table_block(ws, cur_r, "Table 17", "Material Sourcing Comfort & Mobility Independence", t17_items, n_resp, is_multiselect=True)
    cur_r += 2

    # =========================================================================
    # SECTION 4: DEMOGRAPHICS & SURVEY INDICATORS (TABLES 1 - 28)
    # =========================================================================
    cur_r = render_section_divider(ws, cur_r, "SECTION 4: GENERAL DEMOGRAPHICS & STANDARD SURVEY INDICATORS (TABLES 1 TO 28)")
    
    for num, title, col, opts in [T1_DEF, T2_DEF]:
        cur_r = render_table_block(ws, cur_r, num, title, _eval_counts(df_survey, col, opts), n_resp)
    cur_r = render_table_block(ws, cur_r, T3_DEF[0], T3_DEF[1], _eval_counts(df_survey, T3_DEF[2], T3_DEF[3], True), n_resp, True)
    cur_r = render_table_block(ws, cur_r, "4.0", "Access to Registrations / Formal Documents", _eval_counts(df_survey, 'RegistrationsDocuments', T4_DOCS, True), n_resp, True)
    cur_r = render_table_block(ws, cur_r, "5.0", "Age-Group Distribution", _eval_counts(df_survey, 'RespondentAge', T5_AGES), n_resp)
    cur_r = render_table_block(ws, cur_r, "6.0", "Marital Status", _eval_counts(df_survey, 'MaritalStatus', T6_MARITAL), n_resp)
    cur_r = render_table_block(ws, cur_r, "7.0", "Social Category (Caste Group)", _eval_counts(df_survey, 'SocialCategory', T7_CATS), n_resp)
    
    t8_items = [(lbl, len(df_survey[df_survey['EducationStatus'].isin(codes)])) for lbl, codes in T8_EDU]
    cur_r = render_table_block(ws, cur_r, "8.0", "Education Status of Women Entrepreneurs", t8_items, n_resp)

    t11_items = [(lbl, len(df_survey[df_survey['AnnualHouseholdIncome'].isin(codes)])) for lbl, codes in schema.get_income_bracket_mappings()]
    cur_r = render_table_block(ws, cur_r, "11.0", "Annual Household Income Brackets", t11_items, n_resp)
    cur_r = render_table_block(ws, cur_r, "14.0", "Funding Experience of Entrepreneurs", _eval_counts(df_survey, 'FundingExperience', T14_EXPS, True), n_resp, True)
    cur_r = render_table_block(ws, cur_r, "16.0", "Future Requirement of Funds", _eval_counts(df_survey, 'FutureFundsRequired', T16_FUNDS), n_resp)
    cur_r = render_table_block(ws, cur_r, T17_DEF[0], T17_DEF[1], _eval_counts(df_survey, T17_DEF[2], T17_DEF[3]), n_resp)
    cur_r = render_table_block(ws, cur_r, T18_DEF[0], T18_DEF[1], _eval_counts(df_survey, T18_DEF[2], T18_DEF[3]), n_resp)
    
    t19_items = [(lbl, len(df_survey[df_survey['MonthlyIncomeIncreaseByOSFSVEP'].isin(codes)])) for lbl, codes in schema.get_monthly_income_increase_mappings()]
    cur_r = render_table_block(ws, cur_r, "19.0", "Increase in Monthly Income by OSF / SVEP Intervention", t19_items, n_resp)
    cur_r = render_table_block(ws, cur_r, "20.0", "Key Contributions of BDSP / SVEP CRPs", _eval_counts(df_survey, 'CRPContributions', T20_CRP, True), n_resp, True)
    cur_r = render_table_block(ws, cur_r, "21.0", "Expectations from OSF / SVEP Scheme", _eval_counts(df_survey, 'ExpectationsFromScheme', T21_EXP, True), n_resp, True)
    cur_r = render_table_block(ws, cur_r, "22.0", "Smart Phone Ownership & Access", _eval_counts(df_survey, 'SmartphoneOwnership', T22_PHONES), n_resp)
    cur_r = render_table_block(ws, cur_r, T23_DEF[0], T23_DEF[1], _eval_counts(df_survey, T23_DEF[2], T23_DEF[3]), n_resp)
    cur_r = render_table_block(ws, cur_r, "24.0", "Daily Transactions using QR Code / Mobile Banking", _eval_counts(df_survey, 'QRDailyTransactions', T24_TXNS), n_resp)
    cur_r = render_table_block(ws, cur_r, "25.0", "Social Media for Business Marketing", _eval_counts(df_survey, 'SocialMediaForMarketing', T25_SM, True), n_resp, True)
    cur_r = render_table_block(ws, cur_r, "26.0", "Social Media Platforms Used", _eval_counts(df_survey, 'SocialPlatformsUsed', T26_PLAT, True), n_resp, True)
    cur_r = render_table_block(ws, cur_r, "27.0", "Mode of Using Social Media for Business", _eval_counts(df_survey, 'SocialPlatformUsageMode', T27_MODES, True), n_resp, True)

    autofit_columns(ws)
