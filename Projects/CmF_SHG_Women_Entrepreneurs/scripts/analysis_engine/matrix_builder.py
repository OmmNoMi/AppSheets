"""
Matrix & Sourcing Sheets Builder for Survey Analysis Engine.
Builds the Social Category Matrix sheet and the Agency & Sourcing sheet.
"""

from typing import Dict, List, Any
import pandas as pd
from openpyxl.utils import get_column_letter
from .data_evaluator import matches_activity
from .excel_styler import (
    font_title, font_head, font_subhead, font_bold, font_regular,
    fill_header, fill_subhead, fill_total, fill_highlight,
    border_cell, border_total, align_center, align_left, align_right,
    FMT_INT, FMT_PERCENT, autofit_columns
)


def build_social_matrix_sheet(ws, df_survey: pd.DataFrame, schema, district_name: str) -> None:
    """Builds the Business Activities x Social Category cross-tabulation worksheet."""
    ws.views.sheetView[0].showGridLines = True
    activities = schema.get_business_activities()

    # Title block
    ws.merge_cells("A1:H1")
    t4 = ws.cell(row=1, column=1, value=f"Distribution of Enterprises Across Business Activities by Social Category ({district_name} District)")
    t4.font, t4.alignment = font_title, align_left

    # Header row 2
    ws.merge_cells("D2:G2")
    c_soc = ws.cell(row=2, column=4, value="Social Category #")
    c_soc.font, c_soc.fill, c_soc.alignment = font_head, fill_header, align_center

    c_tot = ws.cell(row=2, column=8, value="Total number of enterprises")
    c_tot.font, c_tot.fill, c_tot.alignment = font_head, fill_header, align_center

    # Subheaders row 3
    headers = [(1, "Sector"), (2, "#"), (3, "Business activities"), (4, "SC"), (5, "ST"), (6, "OBC"), (7, "Gen"), (8, "Total")]
    for col_idx, text in headers:
        c = ws.cell(row=3, column=col_idx, value=text)
        c.font, c.fill, c.alignment, c.border = font_subhead, fill_subhead, align_center, border_cell

    cur_r = 4
    sector_ranges: Dict[str, List[int]] = {}
    subtotal_rows: List[int] = []

    for i, (sector, num, title, codes) in enumerate(activities):
        if sector not in sector_ranges:
            sector_ranges[sector] = []
        r_matches = df_survey[df_survey['BusinessActivities'].apply(lambda x, c=codes: matches_activity(x, c))]

        counts = [
            len(r_matches[r_matches['SocialCategory'] == 'CST_SC']),
            len(r_matches[r_matches['SocialCategory'] == 'CST_ST']),
            len(r_matches[r_matches['SocialCategory'] == 'CST_OBC']),
            len(r_matches[r_matches['SocialCategory'] == 'CST_GEN']),
            len(r_matches)
        ]

        ws.cell(row=cur_r, column=1, value=sector if not sector_ranges[sector] else "").font = font_bold
        ws.cell(row=cur_r, column=2, value=num).font = font_regular
        ws.cell(row=cur_r, column=3, value=title).font = font_regular

        for c_idx, cnt in enumerate(counts, start=4):
            c_val = ws.cell(row=cur_r, column=c_idx, value=cnt)
            c_val.font = font_bold if cnt > 0 else font_regular
            c_val.number_format, c_val.alignment = FMT_INT, align_right

        for col_c in range(1, 9):
            ws.cell(row=cur_r, column=col_c).border = border_cell
            if col_c in [1, 2]:
                ws.cell(row=cur_r, column=col_c).alignment = align_center

        sector_ranges[sector].append(cur_r)
        cur_r += 1

        is_last = (i == len(activities) - 1) or (activities[i + 1][0] != sector)
        if is_last:
            ws.cell(row=cur_r, column=1, value=f"{sector} TOTAL").font = font_bold
            ws.cell(row=cur_r, column=3, value=f"TOTAL {sector.upper()}").font = font_bold
            st_r, end_r = sector_ranges[sector][0], sector_ranges[sector][-1]

            for c_idx in range(4, 9):
                cl = get_column_letter(c_idx)
                c_sub = ws.cell(row=cur_r, column=c_idx, value=f"=SUM({cl}{st_r}:{cl}{end_r})")
                c_sub.font, c_sub.number_format, c_sub.alignment = font_bold, FMT_INT, align_right

            for col_c in range(1, 9):
                ws.cell(row=cur_r, column=col_c).fill = fill_total
                ws.cell(row=cur_r, column=col_c).border = border_cell
            subtotal_rows.append(cur_r)
            cur_r += 1

    # Grand Total Row
    ws.cell(row=cur_r, column=1, value="GRAND TOTAL").font = font_bold
    ws.cell(row=cur_r, column=3, value="TOTAL ALL ENTERPRISES").font = font_bold
    for c_idx in range(4, 9):
        cl = get_column_letter(c_idx)
        sum_str = "+".join([f"{cl}{sr}" for sr in subtotal_rows])
        c_gt = ws.cell(row=cur_r, column=c_idx, value=f"={sum_str}")
        c_gt.font, c_gt.number_format, c_gt.alignment = font_bold, FMT_INT, align_right

    for col_c in range(1, 9):
        ws.cell(row=cur_r, column=col_c).fill = fill_highlight
        ws.cell(row=cur_r, column=col_c).border = border_total

    autofit_columns(ws, min_width=11, padding=3, custom_widths={'C': 38})


def build_agency_sourcing_sheet(ws, df_survey: pd.DataFrame, schema, district_name: str) -> None:
    """Builds the Agency, Empowerment & Sourcing Independence worksheet."""
    ws.views.sheetView[0].showGridLines = True
    total_n = len(df_survey)

    ws.merge_cells("A1:D1")
    t3 = ws.cell(row=1, column=1, value=f"Empowerment, Agency & Sourcing Independence ({district_name} District)")
    t3.font, t3.alignment = font_title, align_left

    # Table 16: Family Support
    ws.cell(row=3, column=1, value="Table 16").font = font_bold
    ws.cell(row=3, column=2, value="Family Support (Husband & Household)").font = font_bold
    for c_idx, hdr in [(3, "Number of WE"), (4, "% of Total WE")]:
        c = ws.cell(row=3, column=c_idx, value=hdr)
        c.font, c.fill, c.alignment = font_subhead, fill_subhead, align_center

    family_stmts = [
        ("HRESP_NEED_HELP", "I need help from my family in running my enterprise more effectively"),
        ("HRESP_LATER_SUPPORT", "My husband was not supportive initially, but now helps when required"),
        ("HRESP_FINANCIAL", "My husband supports/supported me financially"),
        ("HRESP_FULL_SUPPORT", "I have full support of my husband/family and helped me in every possible way"),
        ("HRESP_NO_SUPPORT", "I am running my enterprise without anyone’s support")
    ]

    cur_r = 4
    st_f = cur_r
    for code, stmt in family_stmts:
        cnt = len(df_survey[df_survey['HusbandFamilyResponse'].str.contains(code, na=False)])
        pct = (cnt / total_n) if total_n > 0 else 0.0

        ws.cell(row=cur_r, column=2, value=stmt).font = font_regular
        c_cnt = ws.cell(row=cur_r, column=3, value=cnt)
        c_cnt.font = font_bold if cnt > 0 else font_regular
        c_cnt.number_format, c_cnt.alignment = FMT_INT, align_right

        c_pct = ws.cell(row=cur_r, column=4, value=pct)
        c_pct.font, c_pct.number_format, c_pct.alignment = font_regular, FMT_PERCENT, align_right

        for c_idx in range(2, 5):
            ws.cell(row=cur_r, column=c_idx).border = border_cell
        cur_r += 1

    end_f = cur_r - 1
    ws.cell(row=cur_r, column=2, value="TOTAL RESPONSES").font = font_bold
    ws.cell(row=cur_r, column=3, value=f"=SUM(C{st_f}:C{end_f})").font = font_bold
    ws.cell(row=cur_r, column=4, value=f"=SUM(D{st_f}:D{end_f})").font = font_bold
    ws.cell(row=cur_r, column=3).number_format = FMT_INT
    ws.cell(row=cur_r, column=4).number_format = FMT_PERCENT
    ws.cell(row=cur_r, column=3).alignment = align_right
    ws.cell(row=cur_r, column=4).alignment = align_right
    for c_idx in range(2, 5):
        ws.cell(row=cur_r, column=c_idx).fill, ws.cell(row=cur_r, column=c_idx).border = fill_highlight, border_total
    cur_r += 3

    # Table 17: Comfort with Sourcing Method
    ws.cell(row=cur_r, column=1, value="Table 17").font = font_bold
    ws.cell(row=cur_r, column=2, value="Comfort with Existing Sourcing Method & Negotiation").font = font_bold
    for c_idx, hdr in [(3, "Number of WE"), (4, "% of Total WE")]:
        c = ws.cell(row=cur_r, column=c_idx, value=hdr)
        c.font, c.fill, c.alignment = font_subhead, fill_subhead, align_center
    cur_r += 1

    sourcing_stmts = [
        ("SRC_TRAVEL_ALONE", "I travel alone and I handle negotiations independently"),
        ("SRC_NEED_COMPANION", "I need travel companion but I handle negotiations independently"),
        ("SRC_FAMILY_HANDLES", "My family member handles the purchase"),
        ("SRC_CRP_HELPS", "OSF/SVEP CRP helps in sourcing material"),
        ("SRC_WANT_DIFF_PLACES", "I want to source material from different places but I need support"),
        ("SRC_CONTENT_NEARBY", "I am content to source material from nearby market")
    ]

    st_s = cur_r
    for code, stmt in sourcing_stmts:
        cnt = len(df_survey[df_survey['MaterialSourcingComfort'].str.contains(code, na=False)])
        pct = (cnt / total_n) if total_n > 0 else 0.0

        ws.cell(row=cur_r, column=2, value=stmt).font = font_regular
        c_cnt = ws.cell(row=cur_r, column=3, value=cnt)
        c_cnt.font = font_bold if cnt > 0 else font_regular
        c_cnt.number_format, c_cnt.alignment = FMT_INT, align_right

        c_pct = ws.cell(row=cur_r, column=4, value=pct)
        c_pct.font, c_pct.number_format, c_pct.alignment = font_regular, FMT_PERCENT, align_right

        for c_idx in range(2, 5):
            ws.cell(row=cur_r, column=c_idx).border = border_cell
        cur_r += 1

    end_s = cur_r - 1
    ws.cell(row=cur_r, column=2, value="TOTAL RESPONDENTS").font = font_bold
    ws.cell(row=cur_r, column=3, value=f"=SUM(C{st_s}:C{end_s})").font = font_bold
    ws.cell(row=cur_r, column=4, value=f"=SUM(D{st_s}:D{end_s})").font = font_bold
    ws.cell(row=cur_r, column=3).number_format = FMT_INT
    ws.cell(row=cur_r, column=4).number_format = FMT_PERCENT
    ws.cell(row=cur_r, column=3).alignment = align_right
    ws.cell(row=cur_r, column=4).alignment = align_right
    for c_idx in range(2, 5):
        ws.cell(row=cur_r, column=c_idx).fill, ws.cell(row=cur_r, column=c_idx).border = fill_highlight, border_total

    autofit_columns(ws, min_width=16, padding=3, custom_widths={'A': 12, 'B': 70})
