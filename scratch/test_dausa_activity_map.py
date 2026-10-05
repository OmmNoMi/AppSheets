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

print("Activity mapping completed.")
