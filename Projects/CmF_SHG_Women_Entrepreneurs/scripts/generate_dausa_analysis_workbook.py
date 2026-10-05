import pandas as pd
import numpy as np
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import os

SURVEY_CSV = "C:/Users/hardi/Downloads/WCH - Survey.csv"
SUB_CSV = "C:/Users/hardi/Downloads/WCH - SubTable (1).csv"
SUBSUB_CSV = "C:/Users/hardi/Downloads/WCH - SubSubTable (1).csv"
APPVARS_CSV = "C:/Users/hardi/Downloads/WCH - AppVariables (1).csv"
OUTPUT_XLSX = "projects/CmF_SHG_Women_Entrepreneurs/reports/Dausa_Survey_Analysis_Master.xlsx"
FMT_CURRENCY = '"Rs " #,##0'

print("Loading raw survey data...")
df_survey = pd.read_csv(SURVEY_CSV)
df_sub = pd.read_csv(SUB_CSV)
df_subsub = pd.read_csv(SUBSUB_CSV)
df_vars = pd.read_csv(APPVARS_CSV)

# Filter for Dausa district
dausa = df_survey[df_survey['District'] == 'DIST_DAUSA'].copy()
N_DAUSA = len(dausa)
print(f"Total Dausa respondents: {N_DAUSA}")

dausa_ids = set(dausa['ID'])
dausa_sub = df_sub[df_sub['Survey'].isin(dausa_ids)].copy()
dausa_subsub = df_subsub[df_subsub['Survey'].isin(dausa_ids)].copy()

# AppVariables lookup dictionary
var_dict = {}
for _, r in df_vars.iterrows():
    vid = str(r['ID']).strip() if pd.notna(r['ID']) else ''
    vtitle = str(r['Title']).strip() if pd.notna(r['Title']) else ''
    if vid:
        var_dict[vid] = vtitle

def resolve_val(val):
    if pd.isna(val):
        return ""
    val_str = str(val).strip()
    return var_dict.get(val_str, val_str)

def resolve_list(val):
    if pd.isna(val):
        return []
    items = [x.strip() for x in str(val).split(',') if x.strip()]
    return [var_dict.get(it, it) for it in items]

# 29 Business Activities Definition
ACTIVITIES = [
    # Trading (1-9)
    ("Trading", 1, "Vegetable/Fruit", ["ACT_VEG_FRUIT"]),
    ("Trading", 2, "Grocery", ["ACT_GROCERY"]),
    ("Trading", 3, "Fancy/Cosmetic/General store", ["ACT_FANCY_STORE"]),
    ("Trading", 4, "Apparel/fabric", ["ACT_APPAREL"]),
    ("Trading", 5, "Electric goods", ["ACT_ELECTRIC"]),
    ("Trading", 6, "Stone shop", ["ACT_STONE"]),
    ("Trading", 7, "Agri-input retail,", ["ACT_AGRI_INPUT"]),
    ("Trading", 8, "AI/breeding kits", ["ACT_AI_KITS"]),
    ("Trading", 9, "Goat trading", ["ACT_GOAT"]),
    
    # Service (10-18)
    ("Service", 10, "Flour mill", ["ACT_FLOUR_MILL"]),
    ("Service", 11, "Tailoring", ["ACT_TAILORING"]),
    ("Service", 12, "Beauty parlour", ["ACT_BEAUTY_PARLOUR"]),
    ("Service", 13, "Auto-mechanic/ two-wheeler repair", ["ACT_AUTO_MECHANIC"]),
    ("Service", 14, "E-mitra", ["ACT_EMITRA"]),
    ("Service", 15, "Transport", ["ACT_TRANSPORT"]),
    ("Service", 16, "Tent house", ["ACT_TENT_HOUSE"]),
    ("Service", 17, "Mobile repair shop", ["ACT_MOBILE_REPAIR"]),
    ("Service", 18, "Stone cutting", ["ACT_STONE_CUTTING"]),
    
    # Production (19-29)
    ("Production", 19, "Sanitary napkin making", ["ACT_SANITARY_NAPKIN"]),
    ("Production", 20, "Handicraft", ["ACT_HANDICRAFT"]),
    ("Production", 21, "Dairy shop/Milk collection centre", ["ACT_DAIRY_MILK"]),
    ("Production", 22, "Juice", ["ACT_JUICE"]),
    ("Production", 23, "Food processing (pickle/badi/papad making)", ["ACT_FOOD_PROCESSING"]),
    ("Production", 24, "Food making (Sweets/Namkeen/hotel)", ["ACT_FOOD_MAKING"]),
    ("Production", 25, "Sweet box making", ["ACT_SWEET_BOX"]),
    ("Production", 26, "Flag making", ["ACT_FLAG_MAKING"]),
    ("Production", 27, "Leather products", ["ACT_LEATHER"]),
    ("Production", 28, "Stone idols", ["ACT_STONE_IDOLS"]),
    ("Production", 29, "Any other", ["ACT_ANY_OTHER", "ACT_JUTEBAG"])
]

# Capital Sources
CAPITAL_SOURCES = [
    ("Own Savings", "SubTable_LoanUsage_Own"),
    ("Financed by family member", "SubTable_LoanUsage_Family"),
    ("Profit from business", "SubTable_LoanUsage_Profit"),
    ("Mortgaged gold/silver", "SubTable_LoanUsage_Mortgaged"),
    ("Sold gold/silver", "SubTable_LoanUsage_Gold"),
    ("Loan from family", "SubTable_LoanUsage_FamilyLoan"),
    ("Moneylender", "SubTable_LoanUsage_MoneyLender"),
    ("SHG", "SubTable_LoanUsage_SHG"),
    ("OSF/SVEP", "SubTable_LoanUsage_OSFLoan"),
    ("Subsidy/grant", "SubTable_LoanUsage_OSFGrant"),
    ("Private saving groups/BC", "SubTable_LoanUsage_LoanPrivate"),
    ("NBFC", "SubTable_LoanUsage_LoanNBFC"),
    ("Mudra loan", "SubTable_LoanUsage_Mudra"),
    ("Banks", "SubTable_LoanUsage_Bank")
]

# Loan Usages
LOAN_USAGES = [
    (1, "Seed capital to buy material and set up the shop", "SubTable_LoanUsage_Opt_a"),
    (2, "Buy new machine to increase the production capacity ", "SubTable_LoanUsage_Opt_b"),
    (3, "Buy assets to store and sell new products", "SubTable_LoanUsage_Opt_c"),
    (4, "Get additional space to expand my business ", "SubTable_LoanUsage_Opt_d"),
    (5, "Buy more material to increase the product range offered ", "SubTable_LoanUsage_Opt_e"),
    (6, "Buy more material/inputs to increase scale of business/production", "SubTable_LoanUsage_Opt_f"),
    (7, "Buy vehicle to access new market to buy/sell goods", "SubTable_LoanUsage_Opt_g"),
    (8, "Access better transport services to access new market to buy/sell goods", "SubTable_LoanUsage_Opt_h"),
    (9, "Buy mobile phone to promote/sell my goods online", "SubTable_LoanUsage_Opt_i"),
    (10, "Any other, specify……….", "SubTable_LoanUsage_Opt_j"),
    (11, "Not used the source", "SubTable_LoanUsage_Opt_k")
]

def respondent_matches_activity(resp_act_str, act_codes):
    if pd.isna(resp_act_str):
        return False
    r_codes = [c.strip() for c in resp_act_str.split(',') if c.strip()]
    return any(c in act_codes for c in r_codes)

# Helper to find respondents for each activity
activity_respondents = {}
for sector, num, title, codes in ACTIVITIES:
    matching = dausa[dausa['BusinessActivities'].apply(lambda x: respondent_matches_activity(x, codes))]
    activity_respondents[num] = matching

# -------------------------------------------------------------
# Initialize Workbook
# -------------------------------------------------------------
wb = openpyxl.Workbook()
# Remove default sheet
wb.remove(wb.active)

# Styles
font_title = Font(name="Calibri", size=13, bold=True, color="1A73E8")
font_head = Font(name="Calibri", size=10, bold=True, color="FFFFFF")
font_subhead = Font(name="Calibri", size=9.5, bold=True, color="174EA6")
font_bold = Font(name="Calibri", size=9.5, bold=True)
font_regular = Font(name="Calibri", size=9.5)
font_italic = Font(name="Calibri", size=9, italic=True, color="5F6368")

fill_header = PatternFill(start_color="1A73E8", end_color="1A73E8", fill_type="solid")
fill_subhead = PatternFill(start_color="E8F0FE", end_color="E8F0FE", fill_type="solid")
fill_total = PatternFill(start_color="F1F3F4", end_color="F1F3F4", fill_type="solid")
fill_highlight = PatternFill(start_color="CEEAD6", end_color="CEEAD6", fill_type="solid")

thin_side = Side(border_style="thin", color="DADCE0")
border_cell = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
border_total = Border(top=Side(border_style="thin", color="5F6368"), bottom=Side(border_style="double", color="202124"))

align_center = Alignment(horizontal="center", vertical="center", wrap_text=True)
align_left = Alignment(horizontal="left", vertical="center")
align_right = Alignment(horizontal="right", vertical="center")

# =============================================================
# 1. TAB: Finance
# =============================================================
print("Generating Finance sheet...")
ws_fin = wb.create_sheet(title="Finance")
ws_fin.views.sheetView[0].showGridLines = True

# Part A Header
ws_fin.cell(row=1, column=4, value="No. of enterprises").font = font_head
ws_fin.cell(row=1, column=4).fill = fill_header
ws_fin.cell(row=1, column=4).alignment = align_center

ws_fin.cell(row=1, column=5, value="Total funds invested").font = font_head
ws_fin.cell(row=1, column=5).fill = fill_header
ws_fin.cell(row=1, column=5).alignment = align_center

ws_fin.cell(row=1, column=6, value="Average funds invested").font = font_head
ws_fin.cell(row=1, column=6).fill = fill_header
ws_fin.cell(row=1, column=6).alignment = align_center

ws_fin.merge_cells(start_row=1, start_column=7, end_row=1, end_column=20)
cell_t_loan = ws_fin.cell(row=1, column=7, value="Total loan amount from different sources")
cell_t_loan.font = font_head
cell_t_loan.fill = fill_header
cell_t_loan.alignment = align_center

ws_fin.cell(row=1, column=21, value="Total business performance observations for current year (No.)").font = font_head
ws_fin.cell(row=1, column=21).fill = fill_header
ws_fin.cell(row=1, column=21).alignment = align_center

# Subheader Row 2
subheaders_fin = [
    (1, "Sector"),
    (2, "#"),
    (3, "Business activities"),
    (4, "Count"),
    (5, "Total (Rs)"),
    (6, "Average (Rs)"),
    (7, "Own Savings"),
    (8, "Financed by family member"),
    (9, "Profit from business"),
    (10, "Mortgaged gold/silver"),
    (11, "Sold gold/silver"),
    (12, "Loan from family"),
    (13, "Moneylender"),
    (14, "SHG"),
    (15, "OSF/SVEP"),
    (16, "Subsidy/grant"),
    (17, "Private saving groups/BC"),
    (18, "NBFC"),
    (19, "Mudra loan"),
    (20, "Banks"),
    (21, "Current Year Obs (No.)")
]

for col_idx, text in subheaders_fin:
    c = ws_fin.cell(row=2, column=col_idx, value=text)
    c.font = font_subhead
    c.fill = fill_subhead
    c.alignment = align_center
    c.border = border_cell

# Calculate Capital Data for Part A
sector_ranges = {"Trading": [], "Service": [], "Production": []}
cur_r = 3

for sector, num, act_title, codes in ACTIVITIES:
    r_matches = activity_respondents[num]
    n_ent = len(r_matches)
    sids = set(r_matches['ID'])
    
    # Capital amounts for each source (sum of FirstYear + MidYear + ThisYear)
    source_sums = []
    tot_invested = 0.0
    
    for src_name, src_qg in CAPITAL_SOURCES:
        # Get capital rows for these respondents in this source
        sub_sst = dausa_subsub[(dausa_subsub['Survey'].isin(sids)) & (dausa_subsub['Question_Group'] == src_qg)]
        ans_nums = sub_sst[sub_sst['Question'].isin(['SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear', 'SubSubTable_CapitalArranged_ThisYear'])]['Answer_Number'].dropna()
        s_val = float(ans_nums.sum())
        source_sums.append(s_val)
        tot_invested += s_val
        
    avg_invested = tot_invested / n_ent if n_ent > 0 else 0.0
    
    # Column U: Total business performance observations for current year (No.)
    # Count respondents reporting positive current year performance metrics
    perf_sst = dausa_subsub[(dausa_subsub['Survey'].isin(sids)) & (dausa_subsub['Question_Group'].isin([
        'SubTable_BusinessChanges_AvSales', 'SubTable_BusinessChanges_AvIncome',
        'SubTable_BusinessChanges_Value', 'SubTable_BusinessChanges_Assets'
    ]))]
    cur_yr_pos = perf_sst[(perf_sst['Question'] == 'SubSubTable_BusinessChanges_CurrentYear') & (perf_sst['Answer_Number'] > 0)]
    n_perf = len(cur_yr_pos['Survey'].unique())
    
    # Write row
    ws_fin.cell(row=cur_r, column=1, value=sector if num in [1, 10, 19] else "").font = font_bold
    ws_fin.cell(row=cur_r, column=2, value=num).font = font_regular
    ws_fin.cell(row=cur_r, column=3, value=act_title).font = font_regular
    ws_fin.cell(row=cur_r, column=4, value=n_ent).font = font_bold if n_ent > 0 else font_regular
    ws_fin.cell(row=cur_r, column=5, value=tot_invested).font = font_bold if tot_invested > 0 else font_regular
    ws_fin.cell(row=cur_r, column=6, value=avg_invested).font = font_regular
    
    ws_fin.cell(row=cur_r, column=4).number_format = '#,##0'
    ws_fin.cell(row=cur_r, column=5).number_format = FMT_CURRENCY
    ws_fin.cell(row=cur_r, column=6).number_format = FMT_CURRENCY
    
    for c_idx, s_val in enumerate(source_sums, start=7):
        cell_src = ws_fin.cell(row=cur_r, column=c_idx, value=s_val)
        cell_src.font = font_regular
        cell_src.number_format = FMT_CURRENCY
        if s_val > 0:
            cell_src.font = font_bold
            
    cell_perf = ws_fin.cell(row=cur_r, column=21, value=n_perf)
    cell_perf.font = font_bold if n_perf > 0 else font_regular
    cell_perf.number_format = '#,##0'
    
    for col_c in range(1, 22):
        ws_fin.cell(row=cur_r, column=col_c).border = border_cell
        if col_c in [1, 2]:
            ws_fin.cell(row=cur_r, column=col_c).alignment = align_center
        elif col_c == 3:
            ws_fin.cell(row=cur_r, column=col_c).alignment = align_left
        else:
            ws_fin.cell(row=cur_r, column=col_c).alignment = align_right
            
    sector_ranges[sector].append(cur_r)
    cur_r += 1
    
    # Subtotals after 9 (Trading), 18 (Service), 29 (Production)
    if num in [9, 18, 29]:
        ws_fin.cell(row=cur_r, column=1, value=f"{sector} TOTAL").font = font_bold
        ws_fin.cell(row=cur_r, column=3, value=f"TOTAL {sector.upper()}").font = font_bold
        
        # Formulas for sector total
        start_row = sector_ranges[sector][0]
        end_row = sector_ranges[sector][-1]
        
        ws_fin.cell(row=cur_r, column=4, value=f"=SUM(D{start_row}:D{end_row})").font = font_bold
        ws_fin.cell(row=cur_r, column=5, value=f"=SUM(E{start_row}:E{end_row})").font = font_bold
        ws_fin.cell(row=cur_r, column=6, value=f"=IF(D{cur_r}>0, E{cur_r}/D{cur_r}, 0)").font = font_bold
        
        ws_fin.cell(row=cur_r, column=4).number_format = '#,##0'
        ws_fin.cell(row=cur_r, column=5).number_format = FMT_CURRENCY
        ws_fin.cell(row=cur_r, column=6).number_format = FMT_CURRENCY
        
        for c_idx in range(7, 21):
            col_letter = get_column_letter(c_idx)
            ws_fin.cell(row=cur_r, column=c_idx, value=f"=SUM({col_letter}{start_row}:{col_letter}{end_row})").font = font_bold
            ws_fin.cell(row=cur_r, column=c_idx).number_format = FMT_CURRENCY
            
        ws_fin.cell(row=cur_r, column=21, value=f"=SUM(U{start_row}:U{end_row})").font = font_bold
        ws_fin.cell(row=cur_r, column=21).number_format = '#,##0'
        
        for col_c in range(1, 22):
            ws_fin.cell(row=cur_r, column=col_c).fill = fill_total
            ws_fin.cell(row=cur_r, column=col_c).border = border_cell
        cur_r += 1

# Grand Total Row for Part A
ws_fin.cell(row=cur_r, column=1, value="GRAND TOTAL").font = font_bold
ws_fin.cell(row=cur_r, column=3, value="OVERALL ENTERPRISE TOTAL").font = font_bold
subtotal_rows = [12, 22, 34] # Trading, Service, Production subtotal row indices
for c_idx in range(4, 22):
    col_letter = get_column_letter(c_idx)
    sum_terms = "+".join([f"{col_letter}{sr}" for sr in subtotal_rows])
    if c_idx == 6:
        ws_fin.cell(row=cur_r, column=c_idx, value=f"=IF(D{cur_r}>0, E{cur_r}/D{cur_r}, 0)").font = font_bold
    else:
        ws_fin.cell(row=cur_r, column=c_idx, value=f"={sum_terms}").font = font_bold
        
    ws_fin.cell(row=cur_r, column=c_idx).number_format = FMT_CURRENCY if c_idx in range(5, 21) else '#,##0'
    ws_fin.cell(row=cur_r, column=c_idx).alignment = align_right
    
for col_c in range(1, 22):
    ws_fin.cell(row=cur_r, column=col_c).fill = fill_highlight
    ws_fin.cell(row=cur_r, column=col_c).border = border_total
cur_r += 4

# -------------------------------------------------------------
# Part B: Distribution of loan amount from different sources as per the usage
# -------------------------------------------------------------
ws_fin.merge_cells(start_row=cur_r, start_column=3, end_row=cur_r, end_column=18)
part_b_hdr = ws_fin.cell(row=cur_r, column=3, value="Distribution of loan amount from different sources as per the usage")
part_b_hdr.font = font_head
part_b_hdr.fill = fill_header
part_b_hdr.alignment = align_center
cur_r += 1

# Subheaders for Part B
ws_fin.cell(row=cur_r, column=2, value="#").font = font_subhead
ws_fin.cell(row=cur_r, column=2).fill = fill_subhead
ws_fin.cell(row=cur_r, column=2).alignment = align_center
ws_fin.cell(row=cur_r, column=2).border = border_cell

ws_fin.cell(row=cur_r, column=3, value="Loan Usage Purpose").font = font_subhead
ws_fin.cell(row=cur_r, column=3).fill = fill_subhead
ws_fin.cell(row=cur_r, column=3).alignment = align_left
ws_fin.cell(row=cur_r, column=3).border = border_cell

for c_idx, (src_name, _) in enumerate(CAPITAL_SOURCES, start=4):
    c = ws_fin.cell(row=cur_r, column=c_idx, value=src_name)
    c.font = font_subhead
    c.fill = fill_subhead
    c.alignment = align_center
    c.border = border_cell

ws_fin.cell(row=cur_r, column=18, value="Total loan (Rs)").font = font_subhead
ws_fin.cell(row=cur_r, column=18).fill = fill_subhead
ws_fin.cell(row=cur_r, column=18).alignment = align_center
ws_fin.cell(row=cur_r, column=18).border = border_cell
cur_r += 1

start_usage_row = cur_r
for u_num, u_title, u_code in LOAN_USAGES:
    ws_fin.cell(row=cur_r, column=2, value=u_num).font = font_regular
    ws_fin.cell(row=cur_r, column=2).alignment = align_center
    ws_fin.cell(row=cur_r, column=2).border = border_cell
    
    ws_fin.cell(row=cur_r, column=3, value=u_title).font = font_regular
    ws_fin.cell(row=cur_r, column=3).alignment = align_left
    ws_fin.cell(row=cur_r, column=3).border = border_cell
    
    for c_idx, (src_name, src_qg) in enumerate(CAPITAL_SOURCES, start=4):
        # Find surveys where this source had this usage
        usage_matches = dausa_subsub[(dausa_subsub['Question_Group'] == src_qg) & 
                                     (dausa_subsub['Question'] == 'SubTable_CapitalLoanUsage_LoanUsage') & 
                                     (dausa_subsub['Answer_Enum'] == u_code)]
        matching_surveys = usage_matches['Survey'].unique()
        
        # Sum loan amounts for these surveys under this source
        loan_recs = dausa_subsub[(dausa_subsub['Survey'].isin(matching_surveys)) & 
                                 (dausa_subsub['Question_Group'] == src_qg) & 
                                 (dausa_subsub['Question'].isin(['SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear', 'SubSubTable_CapitalArranged_ThisYear']))]
        sum_usage = float(loan_recs['Answer_Number'].dropna().sum())
        
        c_cell = ws_fin.cell(row=cur_r, column=c_idx, value=sum_usage)
        c_cell.font = font_bold if sum_usage > 0 else font_regular
        c_cell.number_format = FMT_CURRENCY
        c_cell.alignment = align_right
        c_cell.border = border_cell
        
    # Row Total
    tot_cell = ws_fin.cell(row=cur_r, column=18, value=f"=SUM(D{cur_r}:Q{cur_r})")
    tot_cell.font = font_bold
    tot_cell.number_format = FMT_CURRENCY
    tot_cell.alignment = align_right
    tot_cell.border = border_cell
    cur_r += 1

end_usage_row = cur_r - 1

# Total Usage Row
ws_fin.cell(row=cur_r, column=3, value="TOTAL ALL USAGES").font = font_bold
ws_fin.cell(row=cur_r, column=3).alignment = align_left
ws_fin.cell(row=cur_r, column=3).fill = fill_highlight
ws_fin.cell(row=cur_r, column=3).border = border_total

for c_idx in range(4, 19):
    col_letter = get_column_letter(c_idx)
    tot_c = ws_fin.cell(row=cur_r, column=c_idx, value=f"=SUM({col_letter}{start_usage_row}:{col_letter}{end_usage_row})")
    tot_c.font = font_bold
    tot_c.fill = fill_highlight
    tot_c.number_format = FMT_CURRENCY
    tot_c.alignment = align_right
    tot_c.border = border_total

# Set column widths for Finance
for col in ws_fin.columns:
    max_len = max(len(str(cell.value or '')) for cell in col)
    col_letter = get_column_letter(col[0].column)
    ws_fin.column_dimensions[col_letter].width = max(max_len + 3, 12)
ws_fin.column_dimensions['C'].width = 38
ws_fin.column_dimensions['U'].width = 25

print("[OK] Finance sheet generated.")

# =============================================================
# 2. TAB: Sheet4 (Business Activities x Social Category)
# =============================================================
print("Generating Sheet4 (Activities x Social Category)...")
ws_s4 = wb.create_sheet(title="Sheet4")
ws_s4.views.sheetView[0].showGridLines = True

# Title block
ws_s4.merge_cells("A1:H1")
t4 = ws_s4.cell(row=1, column=1, value="Distribution of Enterprises Across Business Activities by Social Category (Dausa District)")
t4.font = font_title
t4.alignment = align_left

# Header row 2
ws_s4.merge_cells("D2:G2")
c_soc = ws_s4.cell(row=2, column=4, value="Social Category #")
c_soc.font = font_head
c_soc.fill = fill_header
c_soc.alignment = align_center

ws_s4.cell(row=2, column=8, value="Total number of enterprises").font = font_head
ws_s4.cell(row=2, column=8).fill = fill_header
ws_s4.cell(row=2, column=8).alignment = align_center

# Subheaders row 3
headers_s4 = [
    (1, "Sector"),
    (2, "#"),
    (3, "Business activities"),
    (4, "SC"),
    (5, "ST"),
    (6, "OBC"),
    (7, "Gen"),
    (8, "Total")
]
for col_idx, text in headers_s4:
    c = ws_s4.cell(row=3, column=col_idx, value=text)
    c.font = font_subhead
    c.fill = fill_subhead
    c.alignment = align_center
    c.border = border_cell

cur_r = 4
s4_ranges = {"Trading": [], "Service": [], "Production": []}

for sector, num, act_title, codes in ACTIVITIES:
    r_matches = activity_respondents[num]
    
    sc_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_SC'])
    st_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_ST'])
    obc_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_OBC'])
    gen_cnt = len(r_matches[r_matches['SocialCategory'] == 'CST_GEN'])
    tot_cnt = len(r_matches)
    
    ws_s4.cell(row=cur_r, column=1, value=sector if num in [1, 10, 19] else "").font = font_bold
    ws_s4.cell(row=cur_r, column=2, value=num).font = font_regular
    ws_s4.cell(row=cur_r, column=3, value=act_title).font = font_regular
    
    ws_s4.cell(row=cur_r, column=4, value=sc_cnt).font = font_bold if sc_cnt > 0 else font_regular
    ws_s4.cell(row=cur_r, column=5, value=st_cnt).font = font_bold if st_cnt > 0 else font_regular
    ws_s4.cell(row=cur_r, column=6, value=obc_cnt).font = font_bold if obc_cnt > 0 else font_regular
    ws_s4.cell(row=cur_r, column=7, value=gen_cnt).font = font_bold if gen_cnt > 0 else font_regular
    ws_s4.cell(row=cur_r, column=8, value=tot_cnt).font = font_bold if tot_cnt > 0 else font_regular
    
    for c_idx in range(4, 9):
        ws_s4.cell(row=cur_r, column=c_idx).number_format = '#,##0'
        ws_s4.cell(row=cur_r, column=c_idx).alignment = align_right
        
    for col_c in range(1, 9):
        ws_s4.cell(row=cur_r, column=col_c).border = border_cell
        if col_c in [1, 2]:
            ws_s4.cell(row=cur_r, column=col_c).alignment = align_center
            
    s4_ranges[sector].append(cur_r)
    cur_r += 1
    
    # Subtotal row
    if num in [9, 18, 29]:
        ws_s4.cell(row=cur_r, column=1, value=f"{sector} TOTAL").font = font_bold
        ws_s4.cell(row=cur_r, column=3, value=f"TOTAL {sector.upper()}").font = font_bold
        
        start_row = s4_ranges[sector][0]
        end_row = s4_ranges[sector][-1]
        
        for c_idx in range(4, 9):
            col_letter = get_column_letter(c_idx)
            cell_sub = ws_s4.cell(row=cur_r, column=c_idx, value=f"=SUM({col_letter}{start_row}:{col_letter}{end_row})")
            cell_sub.font = font_bold
            cell_sub.number_format = '#,##0'
            cell_sub.alignment = align_right
            
        for col_c in range(1, 9):
            ws_s4.cell(row=cur_r, column=col_c).fill = fill_total
            ws_s4.cell(row=cur_r, column=col_c).border = border_cell
        cur_r += 1

# Grand Total Row
ws_s4.cell(row=cur_r, column=1, value="GRAND TOTAL").font = font_bold
ws_s4.cell(row=cur_r, column=3, value="TOTAL ALL ENTERPRISES").font = font_bold
s4_subtotals = [13, 23, 35] # Trading, Service, Production subtotal row indices
for c_idx in range(4, 9):
    col_letter = get_column_letter(c_idx)
    sum_str = "+".join([f"{col_letter}{sr}" for sr in s4_subtotals])
    cell_tot = ws_s4.cell(row=cur_r, column=c_idx, value=f"={sum_str}")
    cell_tot.font = font_bold
    cell_tot.number_format = '#,##0'
    cell_tot.alignment = align_right
    
for col_c in range(1, 9):
    ws_s4.cell(row=cur_r, column=col_c).fill = fill_highlight
    ws_s4.cell(row=cur_r, column=col_c).border = border_total

for col in ws_s4.columns:
    max_len = max(len(str(cell.value or '')) for cell in col)
    col_letter = get_column_letter(col[0].column)
    ws_s4.column_dimensions[col_letter].width = max(max_len + 3, 11)
ws_s4.column_dimensions['C'].width = 38

print("[OK] Sheet4 generated.")

# =============================================================
# 3. TAB: Sheet3 (Family Support & Sourcing Independence)
# =============================================================
print("Generating Sheet3 (Family Support & Sourcing Independence)...")
ws_s3 = wb.create_sheet(title="Sheet3")
ws_s3.views.sheetView[0].showGridLines = True

# Title
ws_s3.merge_cells("A1:D1")
t3 = ws_s3.cell(row=1, column=1, value="Empowerment, Agency & Sourcing Independence (Dausa District)")
t3.font = font_title
t3.alignment = align_left

# Table 16: Family Support
ws_s3.cell(row=3, column=1, value="Table 16").font = font_bold
ws_s3.cell(row=3, column=2, value="Family Support (Husband & Household)").font = font_bold
ws_s3.cell(row=3, column=3, value="Number of WE").font = font_subhead
ws_s3.cell(row=3, column=3).fill = fill_subhead
ws_s3.cell(row=3, column=4, value="% of Total WE").font = font_subhead
ws_s3.cell(row=3, column=4).fill = fill_subhead

FAMILY_SUPPORT_STMTS = [
    ("HRESP_NEED_HELP", "I need help from my family in running my enterprise more effectively"),
    ("HRESP_LATER_SUPPORT", "My husband was not supportive initially, but now helps when required"),
    ("HRESP_FINANCIAL", "My husband supports/supported me financially"),
    ("HRESP_FULL_SUPPORT", "I have full support of my husband/family and helped me in every possible way"),
    ("HRESP_NO_SUPPORT", "I am running my enterprise without anyone’s support")
]

cur_r = 4
start_f_row = cur_r
for code, stmt in FAMILY_SUPPORT_STMTS:
    cnt = len(dausa[dausa['HusbandFamilyResponse'].str.contains(code, na=False)])
    pct = cnt / N_DAUSA if N_DAUSA > 0 else 0.0
    
    ws_s3.cell(row=cur_r, column=2, value=stmt).font = font_regular
    ws_s3.cell(row=cur_r, column=3, value=cnt).font = font_bold if cnt > 0 else font_regular
    ws_s3.cell(row=cur_r, column=4, value=pct).font = font_regular
    
    ws_s3.cell(row=cur_r, column=3).number_format = '#,##0'
    ws_s3.cell(row=cur_r, column=4).number_format = '0.0%'
    
    for c_idx in range(2, 5):
        ws_s3.cell(row=cur_r, column=c_idx).border = border_cell
    cur_r += 1

end_f_row = cur_r - 1
ws_s3.cell(row=cur_r, column=2, value="TOTAL RESPONSES").font = font_bold
ws_s3.cell(row=cur_r, column=3, value=f"=SUM(C{start_f_row}:C{end_f_row})").font = font_bold
ws_s3.cell(row=cur_r, column=4, value=f"=SUM(D{start_f_row}:D{end_f_row})").font = font_bold
ws_s3.cell(row=cur_r, column=3).number_format = '#,##0'
ws_s3.cell(row=cur_r, column=4).number_format = '0.0%'
for c_idx in range(2, 5):
    ws_s3.cell(row=cur_r, column=c_idx).fill = fill_highlight
    ws_s3.cell(row=cur_r, column=c_idx).border = border_total
cur_r += 3

# Table 17: Comfort with Sourcing Method
ws_s3.cell(row=cur_r, column=1, value="Table 17").font = font_bold
ws_s3.cell(row=cur_r, column=2, value="Comfort with Existing Sourcing Method & Negotiation").font = font_bold
ws_s3.cell(row=cur_r, column=3, value="Number of WE").font = font_subhead
ws_s3.cell(row=cur_r, column=3).fill = fill_subhead
ws_s3.cell(row=cur_r, column=4, value="% of Total WE").font = font_subhead
ws_s3.cell(row=cur_r, column=4).fill = fill_subhead
cur_r += 1

SOURCING_STMTS = [
    ("SRC_TRAVEL_ALONE", "I travel alone and I handle negotiations independently"),
    ("SRC_NEED_COMPANION", "I need travel companion but I handle negotiations independently"),
    ("SRC_FAMILY_HANDLES", "My family member handles the purchase"),
    ("SRC_CRP_HELPS", "OSF/SVEP CRP helps in sourcing material"),
    ("SRC_WANT_DIFF_PLACES", "I want to source material from different places but I need support"),
    ("SRC_CONTENT_NEARBY", "I am content to source material from nearby market")
]

start_s_row = cur_r
for code, stmt in SOURCING_STMTS:
    cnt = len(dausa[dausa['MaterialSourcingComfort'].str.contains(code, na=False)])
    pct = cnt / N_DAUSA if N_DAUSA > 0 else 0.0
    
    ws_s3.cell(row=cur_r, column=2, value=stmt).font = font_regular
    ws_s3.cell(row=cur_r, column=3, value=cnt).font = font_bold if cnt > 0 else font_regular
    ws_s3.cell(row=cur_r, column=4, value=pct).font = font_regular
    
    ws_s3.cell(row=cur_r, column=3).number_format = '#,##0'
    ws_s3.cell(row=cur_r, column=4).number_format = '0.0%'
    
    for c_idx in range(2, 5):
        ws_s3.cell(row=cur_r, column=c_idx).border = border_cell
    cur_r += 1

end_s_row = cur_r - 1
ws_s3.cell(row=cur_r, column=2, value="TOTAL RESPONDENTS").font = font_bold
ws_s3.cell(row=cur_r, column=3, value=f"=SUM(C{start_s_row}:C{end_s_row})").font = font_bold
ws_s3.cell(row=cur_r, column=4, value=f"=SUM(D{start_s_row}:D{end_s_row})").font = font_bold
ws_s3.cell(row=cur_r, column=3).number_format = '#,##0'
ws_s3.cell(row=cur_r, column=4).number_format = '0.0%'
for c_idx in range(2, 5):
    ws_s3.cell(row=cur_r, column=c_idx).fill = fill_highlight
    ws_s3.cell(row=cur_r, column=c_idx).border = border_total

ws_s3.column_dimensions['A'].width = 12
ws_s3.column_dimensions['B'].width = 70
ws_s3.column_dimensions['C'].width = 16
ws_s3.column_dimensions['D'].width = 16

print("[OK] Sheet3 generated.")

# =============================================================
# 4. TAB: Sheet1 (Demographic & Analytical Indicator Tables 1 to 28)
# =============================================================
print("Generating Sheet1 (Indicator Tables 1 to 28)...")
ws_s1 = wb.create_sheet(title="Sheet1")
ws_s1.views.sheetView[0].showGridLines = True

# Title
ws_s1.merge_cells("A1:F1")
t1 = ws_s1.cell(row=1, column=1, value="General & Demographic Indicators of Women Entrepreneurs (Dausa District)")
t1.font = font_title
t1.alignment = align_left

# Overview Row
ws_s1.cell(row=2, column=2, value="Total Number of Women Entrepreneurs Surveyed").font = font_bold
ws_s1.cell(row=2, column=3, value=N_DAUSA).font = font_bold
ws_s1.cell(row=2, column=3).number_format = '#,##0'
ws_s1.cell(row=2, column=3).fill = fill_highlight
ws_s1.cell(row=2, column=3).border = border_total

# Helper to render a frequency table
cur_r = 4

def render_table_block(ws, start_row, tbl_num, tbl_title, items, is_multiselect=False):
    r = start_row
    # Table header
    ws.cell(row=r, column=1, value=f"Table {tbl_num}").font = font_bold
    ws.cell(row=r, column=2, value=tbl_title).font = font_bold
    ws.cell(row=r, column=3, value="Number of WE").font = font_subhead
    ws.cell(row=r, column=3).fill = fill_subhead
    ws.cell(row=r, column=3).alignment = align_center
    ws.cell(row=r, column=4, value="% of Total WE").font = font_subhead
    ws.cell(row=r, column=4).fill = fill_subhead
    ws.cell(row=r, column=4).alignment = align_center
    r += 1
    
    first_data_row = r
    for label, count in items:
        pct = count / N_DAUSA if N_DAUSA > 0 else 0.0
        ws.cell(row=r, column=2, value=label).font = font_regular
        ws.cell(row=r, column=3, value=count).font = font_bold if count > 0 else font_regular
        ws.cell(row=r, column=4, value=pct).font = font_regular
        
        ws.cell(row=r, column=3).number_format = '#,##0'
        ws.cell(row=r, column=4).number_format = '0.0%'
        ws.cell(row=r, column=3).alignment = align_right
        ws.cell(row=r, column=4).alignment = align_right
        
        for c_idx in range(2, 5):
            ws.cell(row=r, column=c_idx).border = border_cell
        r += 1
        
    last_data_row = r - 1
    # Total row
    tot_label = "TOTAL RESPONSES" if is_multiselect else "TOTAL"
    ws.cell(row=r, column=2, value=tot_label).font = font_bold
    ws.cell(row=r, column=3, value=f"=SUM(C{first_data_row}:C{last_data_row})").font = font_bold
    ws.cell(row=r, column=4, value=f"=SUM(D{first_data_row}:D{last_data_row})").font = font_bold
    ws.cell(row=r, column=3).number_format = '#,##0'
    ws.cell(row=r, column=4).number_format = '0.0%'
    ws.cell(row=r, column=3).alignment = align_right
    ws.cell(row=r, column=4).alignment = align_right
    
    for c_idx in range(2, 5):
        ws.cell(row=r, column=c_idx).fill = fill_total
        ws.cell(row=r, column=c_idx).border = border_total
    r += 2
    return r

# Table 1: In leadership role in SHG
t1_items = [
    ("Yes", len(dausa[dausa['LeadershipRole'] == 'OPT_YES'])),
    ("No", len(dausa[dausa['LeadershipRole'] == 'OPT_NO']))
]
cur_r = render_table_block(ws_s1, cur_r, "1.0", "In leadership role in SHG/VO/CLF", t1_items)

# Table 2: In relation with BDSP/SVEP CRPs
t2_items = [
    ("Yes", len(dausa[dausa['RelatedToCRP'] == 'OPT_YES'])),
    ("No", len(dausa[dausa['RelatedToCRP'] == 'OPT_NO']))
]
cur_r = render_table_block(ws_s1, cur_r, "2.0", "In relation with BDSP/SVEP CRPs", t2_items)

# Table 3: Business categories
t3_items = [
    ("In Trading", len(dausa[dausa['BusinessType'].str.contains('BTY_TRADING', na=False)])),
    ("In Service", len(dausa[dausa['BusinessType'].str.contains('BTY_SERVICING', na=False)])),
    ("In Production", len(dausa[dausa['BusinessType'].str.contains('BTY_MANUFACTURING', na=False)]))
]
cur_r = render_table_block(ws_s1, cur_r, "3.0", "Business Categories", t3_items, is_multiselect=True)

# Table 4: Access to registration/documents
t4_docs = [
    ("PAN card", "DOC_PAN"),
    ("Aadhar card", "DOC_AADHAR"),
    ("Udyam Aadhar", "DOC_UDYAM"),
    ("Shop and Establishment registration", "DOC_SHOP_EST"),
    ("FSSAI", "DOC_FSSAI"),
    ("Caste certificate", "DOC_CASTE"),
    ("Income certificate", "DOC_INCOME")
]
t4_items = [(label, len(dausa[dausa['RegistrationsDocuments'].str.contains(code, na=False)])) for label, code in t4_docs]
cur_r = render_table_block(ws_s1, cur_r, "4.0", "Access to Registrations / Formal Documents", t4_items, is_multiselect=True)

# Table 5: Age-group
t5_ages = [
    ("18-25", "AGE_18_25"),
    ("26-35", "AGE_26_35"),
    ("36-45", "AGE_36_45"),
    ("46-55", "AGE_46_55"),
    ("Above 55", "AGE_ABOVE_55")
]
t5_items = [(label, len(dausa[dausa['RespondentAge'] == code])) for label, code in t5_ages]
cur_r = render_table_block(ws_s1, cur_r, "5.0", "Age-Group Distribution", t5_items)

# Table 6: Marital status
t6_marital = [
    ("Single", "MAR_SINGLE"),
    ("Married", "MAR_MARRIED"),
    ("Widowed", "MAR_WIDOWED"),
    ("Separated", "MAR_SEPARATED"),
    ("Divorced", "MAR_DIVORCED")
]
t6_items = [(label, len(dausa[dausa['MaritalStatus'] == code])) for label, code in t6_marital]
cur_r = render_table_block(ws_s1, cur_r, "6.0", "Marital Status", t6_items)

# Table 7: Social category
t7_cats = [
    ("SC", "CST_SC"),
    ("ST", "CST_ST"),
    ("OBC", "CST_OBC"),
    ("General", "CST_GEN")
]
t7_items = [(label, len(dausa[dausa['SocialCategory'] == code])) for label, code in t7_cats]
cur_r = render_table_block(ws_s1, cur_r, "7.0", "Social Category (Caste Group)", t7_items)

# Table 8: Education status
t8_edu = [
    ("Illiterate", ["EDU_ILLITERATE"]),
    ("Illiterate but able to calculate", ["EDU_ILLITERATE_CALC"]),
    ("Upto 5th", ["EDU_5TH"]),
    ("Upto 8th", ["EDU_8TH"]),
    ("Upto 10th", ["EDU_10TH"]),
    ("Upto 12th", ["EDU_12TH"]),
    ("Diploma", ["EDU_DIPLOMA"]),
    ("Graduate", ["EDU_GRADUATE"]),
    ("B.Ed", ["EDU_BED"])
]
t8_items = [(label, len(dausa[dausa['EducationStatus'].isin(codes)])) for label, codes in t8_edu]
cur_r = render_table_block(ws_s1, cur_r, "8.0", "Education Status of Women Entrepreneurs", t8_items)

# Table 9: Family members
dausa_fam_counts = dausa['FamilyMemberCount'].dropna().apply(lambda x: float(x) if str(x).replace('.','',1).isdigit() else np.nan)
t9_items = [
    ("Upto 4", len(dausa_fam_counts[dausa_fam_counts <= 4])),
    ("4-6", len(dausa_fam_counts[(dausa_fam_counts > 4) & (dausa_fam_counts <= 6)])),
    ("6-8", len(dausa_fam_counts[(dausa_fam_counts > 6) & (dausa_fam_counts <= 8)])),
    ("8-10", len(dausa_fam_counts[(dausa_fam_counts > 8) & (dausa_fam_counts <= 10)])),
    ("More than 10", len(dausa_fam_counts[dausa_fam_counts > 10]))
]
cur_r = render_table_block(ws_s1, cur_r, "9.0", "Household Size (Family Members)", t9_items)

# Table 10: Earning members
earn_sub = dausa_sub[(dausa_sub['Question_Group'] == 'Q_B_05') & (dausa_sub['Question'] == 'Q_B_06_03')]
earn_map = earn_sub.set_index('Survey')['Question_Enum'].dropna().apply(lambda x: float(x) if str(x).replace('.','',1).isdigit() else np.nan)
dausa_earn_counts = dausa['ID'].map(earn_map).dropna()
t10_items = [
    ("1", len(dausa_earn_counts[dausa_earn_counts == 1])),
    ("2", len(dausa_earn_counts[dausa_earn_counts == 2])),
    ("3", len(dausa_earn_counts[dausa_earn_counts == 3])),
    ("4", len(dausa_earn_counts[dausa_earn_counts == 4])),
    ("5", len(dausa_earn_counts[dausa_earn_counts == 5])),
    ("6", len(dausa_earn_counts[dausa_earn_counts == 6])),
    ("More than 6", len(dausa_earn_counts[dausa_earn_counts > 6]))
]
cur_r = render_table_block(ws_s1, cur_r, "10.0", "Number of Earning Members in Family", t10_items)

# Table 11: Annual household income
t11_inc = [
    ("Less than Rs 80,000", ["INC_LT_80K"]),
    ("Rs 80,000 to Rs 1,20,000", ["INC_80K_120K"]),
    ("Rs 1,20,001 to Rs 1,60,000", ["INC_120K_160K"]),
    ("Rs 1,60,001 to Rs 2,00,000", ["INC_160K_200K"]),
    ("Rs 2,00,001 to Rs 2,40,000", ["INC_200K_240K"]),
    ("Rs 2,40,001 to Rs 2,80,000", ["INC_240K_280K"]),
    ("Rs 2,80,001 to Rs 3,20,000", ["INC_280K_320K"]),
    ("Rs 3,20,001 to Rs 3,60,000", ["INC_320K_360K"]),
    ("Rs 3,60,001 to Rs 4,00,000", ["INC_360K_400K"]),
    ("Above Rs 4,00,001", ["INC_GT_400K", "INC_400K-440K", "INC_440K-480K", "INC_480K-520K", "INC_520K-560K", "INC_560K-600K", "INC_600K-640K", "INC_GT_640K"])
]
t11_items = [(label, len(dausa[dausa['AnnualHouseholdIncome'].isin(codes)])) for label, codes in t11_inc]
cur_r = render_table_block(ws_s1, cur_r, "11.0", "Annual Household Income Brackets", t11_items)

# Table 12: Access to different sources of funds
t12_items = []
for src_name, src_qg in CAPITAL_SOURCES:
    # Count respondents who arranged > 0 funds from this source
    sst_src = dausa_subsub[(dausa_subsub['Question_Group'] == src_qg) & 
                           (dausa_subsub['Question'].isin(['SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear', 'SubSubTable_CapitalArranged_ThisYear']))]
    pos_recs = sst_src[sst_src['Answer_Number'] > 0]
    cnt = len(pos_recs['Survey'].unique())
    t12_items.append((src_name, cnt))
cur_r = render_table_block(ws_s1, cur_r, "12.0", "Access to Different Sources of Funds", t12_items, is_multiselect=True)

# Table 13: Used funds for following purpose
t13_items = []
for u_num, u_title, u_code in LOAN_USAGES:
    u_recs = dausa_subsub[(dausa_subsub['Question'] == 'SubTable_CapitalLoanUsage_LoanUsage') & (dausa_subsub['Answer_Enum'] == u_code)]
    cnt = len(u_recs['Survey'].unique())
    t13_items.append((u_title, cnt))
cur_r = render_table_block(ws_s1, cur_r, "13.0", "Purpose of Utilizing Arranged Capital / Loans", t13_items, is_multiselect=True)

# Table 14: Experience with existing sources
t14_exps = [
    ("SHG loan is sufficient for the current scale of my business", "FEX_SHG_SUFFICIENT"),
    ("I regularly plough in my business earnings", "FEX_PLOUGH_EARNINGS"),
    ("SHG loan size is smaller than my requirement", "FEX_SHG_SMALLER"),
    ("I get the required loan easily from the moneylender/NBFIs.", "FEX_MONEYLENDER_EASY"),
    ("My family members help me with funds and loans", "FEX_FAMILY_HELP"),
    ("I don't prefer money lender or NBFIs as the interest rate is high", "FEX_HIGH_INTEREST"),
    ("I don't prefer money lender or NBFIs as the repayment time is shorter for my convenience", "FEX_SHORT_REPAY")
]
t14_items = [(label, len(dausa[dausa['FundingExperience'].str.contains(code, na=False)])) for label, code in t14_exps]
cur_r = render_table_block(ws_s1, cur_r, "14.0", "Experience with Existing Funding Sources", t14_items, is_multiselect=True)

# Table 15: Usage of income from enterprise
t15_uses = [
    ("I don’t need to ask money from my husband/family for my needs.", "SubTable_NoHubbyMony"),
    ("The income from enterprise is the biggest source of income for my family", "SubTable_FamlyMainEncm"),
    ("The income from enterprise is used in covering education related expenses for my children.", "SubTable_ChildEducExp"),
    ("I have been able to pay the family debts.", "SubTable_FamlyDebt"),
    ("I have contributed money in acquiring assets for my family ", "SubTable_AcqrAsset"),
    ("I have contributed money for marriage expenses. ", "SubTable_MerrageExp"),
    ("Any other (Please specify)", "SubTable_ANyOthr")
]
t15_items = []
for label, q_id in t15_uses:
    sub_help = dausa_sub[(dausa_sub['Question_Group'] == 'SubTable_BuisenesHelp') & (dausa_sub['Question'] == q_id)]
    pos_recs = sub_help[(sub_help['Answer_Enum'] == 'OPT_YES') | 
                        (pd.to_numeric(sub_help['Question_Enum'], errors='coerce') > 0) | 
                        (pd.to_numeric(sub_help['Answer_Number'], errors='coerce') > 0)]
    t15_items.append((label, len(pos_recs['Survey'].unique())))
cur_r = render_table_block(ws_s1, cur_r, "15.0", "Financial Relief & Income Utilization from Enterprise", t15_items, is_multiselect=True)

# Table 16: Fund requirements for future plan
t16_funds = [
    ("Upto Rs 1,00,000", "FND_UPTO_1L"),
    ("Rs 1,00,001-Rs 3,00,000", "FND_1L_3L"),
    ("Rs 3,00,001-Rs 5,00,000", "FND_3L_5L"),
    ("Rs 5,00,001-Rs 7,00,000", "FND_5L_7L"),
    ("Rs 7,00,001-Rs 9,00,000", "FND_7L_9L"),
    ("More than 9,00,000", "FND_GT_9L")
]
t16_items = [(label, len(dausa[dausa['FutureFundsRequired'] == code])) for label, code in t16_funds]
cur_r = render_table_block(ws_s1, cur_r, "16.0", "Future Capital & Fund Requirements for Expansion", t16_items)

# Table 17: Attending trainings under SVEP/OSF
t17_items = [
    ("Yes", len(dausa[dausa['AttendedTraining'] == 'OPT_YES'])),
    ("No", len(dausa[dausa['AttendedTraining'] == 'OPT_NO']))
]
cur_r = render_table_block(ws_s1, cur_r, "17.0", "Attended Training under SVEP / OSF", t17_items)

# Table 18: Usage of training component in enterprise
t18_items = [
    ("Yes", len(dausa[dausa['UsedTrainingComponent'] == 'OPT_YES'])),
    ("No", len(dausa[dausa['UsedTrainingComponent'] == 'OPT_NO']))
]
cur_r = render_table_block(ws_s1, cur_r, "18.0", "Implemented Training Component in Business", t18_items)

# Table 19: Increase in monthly income due to SVEP/OSF loan
t19_inc = [
    ("Upto Rs 2000", ["INC_UPTO_2K"]),
    ("Rs 2000 to Rs 3000", ["INC_2K_4K"]),
    ("Rs 3000 to Rs 4000", []),
    ("Rs 4000 to Rs 5000", ["INC_4K_6K"]),
    ("Rs 5000 to Rs 6000", []),
    ("Above Rs 6000", ["INC_GT_6K", "INC_6K_8K", "INC_8K_10K", "INC_10K_12K", "INC_12K_14K", "INC_14K_16K", "INC_16K_18K", "INC_18K_20K"]),
    ("Cant say", ["INC_CANT_SAY"])
]
t19_items = [(label, len(dausa[dausa['MonthlyIncomeIncreaseByOSFSVEP'].isin(codes)])) for label, codes in t19_inc]
cur_r = render_table_block(ws_s1, cur_r, "19.0", "Increase in Monthly Income Directly Due to SVEP/OSF Loan", t19_items)

# Table 20: Benefitting from SVEP/OSF
t20_crp = [
    ("Accessing subsidy", "CRP_SUBSIDY"),
    ("Getting necessary documents (Aadhar/PAN/Udyam/FSSAI)", "CRP_DOCS"),
    ("They helped us to understand business plans", "CRP_BIZ_PLAN"),
    ("They gave us new ideas to improve our profit.", "CRP_PROFIT_IDEAS"),
    ("They trained us on maintaining records which we didn’t know earlier", "CRP_RECORDS"),
    ("They helped in accessing loans from bank", "CRP_BANK_LOAN"),
    ("They helped in our communication skills", "CRP_COMM_SKILLS"),
    ("They helped in marketing", "CRP_MARKETING"),
    ("They helped in learning use of instagram", "CRP_INSTAGRAM"),
    ("They helped us to understand our competitors and suggested ways to beat the competition", "CRP_COMPETITORS")
]
t20_items = [(label, len(dausa[dausa['CRPContributions'].str.contains(code, na=False)])) for label, code in t20_crp]
cur_r = render_table_block(ws_s1, cur_r, "20.0", "Contribution of SVEP / OSF CRPs to Enterprise", t20_items, is_multiselect=True)

# Table 21: Expectation from SVEP/OSF
t21_exp = [
    ("Need bigger loan amount", "EXP_BIGGER_LOAN"),
    ("Need help in accessing Mudra loan", "EXP_MUDRA_HELP"),
    ("Need more guidance of SBDP/SVEP CRPs", "EXP_CRP_GUIDANCE"),
    ("Need help to access bigger markets", "EXP_BIGGER_MARKETS"),
    ("Need help with online purchase", "EXP_ONLINE_PURCHASE"),
    ("Need help with instagram", "EXP_INSTA_HELP"),
    ("Need my business specific trainings", "EXP_BIZ_TRAININGS"),
    ("Any other, Specify", "EXP_OTHER")
]
t21_items = [(label, len(dausa[dausa['ExpectationsFromScheme'].str.contains(code, na=False)])) for label, code in t21_exp]
cur_r = render_table_block(ws_s1, cur_r, "21.0", "Expectations from SVEP / OSF Scheme", t21_items, is_multiselect=True)

# Table 22: Ownership of smart phone
t22_items = [
    ("Yes", len(dausa[dausa['SmartphoneOwnership'] == 'PHN_OWN'])),
    ("No, but access to smart phone", len(dausa[dausa['SmartphoneOwnership'] == 'PHN_FAMILY_ACCESS'])),
    ("No", len(dausa[dausa['SmartphoneOwnership'] == 'PHN_NO']))
]
cur_r = render_table_block(ws_s1, cur_r, "22.0", "Ownership & Access to Smartphone", t22_items)

# Table 23: Use of QR code/mobile banking
t23_items = [
    ("Yes", len(dausa[dausa['UseQRUPI'] == 'OPT_YES'])),
    ("No", len(dausa[dausa['UseQRUPI'] == 'OPT_NO']))
]
cur_r = render_table_block(ws_s1, cur_r, "23.0", "Adoption of QR Code / Mobile Banking for Payments", t23_items)

# Table 24: Number of transactions using QR code/mobile banking
t24_txns = [
    ("1-4", "QR_1_4"),
    ("5-10", "QR_5_10"),
    ("10-20", "QR_10_20"),
    ("20-40", "QR_20_40"),
    ("More than 40", "QR_GT_40")
]
t24_items = [(label, len(dausa[dausa['QRDailyTransactions'] == code])) for label, code in t24_txns]
cur_r = render_table_block(ws_s1, cur_r, "24.0", "Daily Digital Transaction Volume (QR / UPI)", t24_items)

# Table 25: Use of social media
t25_sm = [
    ("I regularly share images on whatsapp to get orders", "SMM_WHATSAPP_ORDERS"),
    ("I regularly share images/reels on instagram to get orders", "SMM_INSTA_ORDERS"),
    ("It is important but I don’t have access to smart phone", "SMM_NO_SMARTPHONE"),
    ("I do not use because I don't know how to use whatsapp/ instagram", "SMM_DONT_KNOW_USE"),
    ("I don't have time to learn and use social media", "SMM_NO_TIME_LEARN"),
    ("I don't want to use social media", "SMM_DONT_WANT"),
    ("Any other, specify", "SMM_OTHER")
]
t25_items = [(label, len(dausa[dausa['SocialMediaForMarketing'].str.contains(code, na=False)])) for label, code in t25_sm]
cur_r = render_table_block(ws_s1, cur_r, "25.0", "Social Media Marketing Orientation & Habits", t25_items, is_multiselect=True)

# Table 26: Using different social media platforms
t26_plat = [
    ("Whatsapp", "SMP_WHATSAPP"),
    ("Instagram", "SMP_INSTAGRAM"),
    ("Pinterest", "SMP_PINTEREST"),
    ("Facebook", "SMP_FACEBOOK"),
    ("Snapchat", "SMP_SNAPCHAT"),
    ("Don’t use social media", "SMP_NONE")
]
t26_items = [(label, len(dausa[dausa['SocialPlatformsUsed'].str.contains(code, na=False)])) for label, code in t26_plat]
cur_r = render_table_block(ws_s1, cur_r, "26.0", "Social Media Platforms Utilized", t26_items, is_multiselect=True)

# Table 27: Purpose of social media
t27_modes = [
    ("Use texts to ask/share prices and book orders", "SMU_PRICE_ORDERS"),
    ("Share images to promote business", "SMU_SHARE_IMAGES"),
    ("Share images to enquire about the availability of products to vendors", "SMU_VENDOR_ENQUIRY"),
    ("Get new ideas and information about new products/services", "SMU_NEW_IDEAS"),
    ("Don’t use social media", "SMU_DONT_USE")
]
t27_items = [(label, len(dausa[dausa['SocialPlatformUsageMode'].str.contains(code, na=False)])) for label, code in t27_modes]
cur_r = render_table_block(ws_s1, cur_r, "27.0", "Functional Purpose of Social Media in Business", t27_items, is_multiselect=True)

# Table 28: Summary statistics
avg_biz_yrs = dausa['EnterpriseSetupYear'].dropna().apply(lambda x: float(x) if str(x).replace('.','',1).isdigit() else np.nan).mean()
avg_loan_yrs = dausa['LoanReceivedYear'].dropna().apply(lambda x: float(x) if str(x).replace('.','',1).isdigit() else np.nan).mean()
avg_shg_yrs = dausa['SHGMembershipYears'].dropna().apply(lambda x: float(x) if str(x).replace('.','',1).isdigit() else np.nan).mean()

ws_s1.cell(row=cur_r, column=1, value="Table 28.0").font = font_bold
ws_s1.cell(row=cur_r, column=2, value="Key Tenure & Vintage Indicators (Averages)").font = font_bold
ws_s1.cell(row=cur_r, column=3, value="Metric Value").font = font_subhead
ws_s1.cell(row=cur_r, column=3).fill = fill_subhead
ws_s1.cell(row=cur_r, column=3).alignment = align_center
cur_r += 1

t28_stats = [
    ("Average Years of Enterprise Operation", f"{avg_biz_yrs:.1f} Years"),
    ("Average Years Since SVEP / OSF Loan Disbursement", f"{avg_loan_yrs:.1f} Years"),
    ("Average Years of SHG Membership", f"{avg_shg_yrs:.1f} Years")
]
for lbl, val_str in t28_stats:
    ws_s1.cell(row=cur_r, column=2, value=lbl).font = font_regular
    ws_s1.cell(row=cur_r, column=3, value=val_str).font = font_bold
    ws_s1.cell(row=cur_r, column=3).alignment = align_right
    for c_idx in range(2, 4):
        ws_s1.cell(row=cur_r, column=c_idx).border = border_cell
    cur_r += 1

ws_s1.column_dimensions['A'].width = 12
ws_s1.column_dimensions['B'].width = 75
ws_s1.column_dimensions['C'].width = 16
ws_s1.column_dimensions['D'].width = 16

print("[OK] Sheet1 generated.")

# Save Workbook
os.makedirs(os.path.dirname(OUTPUT_XLSX), exist_ok=True)
wb.save(OUTPUT_XLSX)
print(f"\n================ SUCCESS ================")
print(f"Master Analysis Workbook generated at: {OUTPUT_XLSX} ({os.path.getsize(OUTPUT_XLSX):,} bytes)")
