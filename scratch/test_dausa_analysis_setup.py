import pandas as pd
import numpy as np
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
import os

# Paths
SURVEY_CSV = "C:/Users/hardi/Downloads/WCH - Survey.csv"
SUB_CSV = "C:/Users/hardi/Downloads/WCH - SubTable (1).csv"
SUBSUB_CSV = "C:/Users/hardi/Downloads/WCH - SubSubTable (1).csv"
APPVARS_CSV = "C:/Users/hardi/Downloads/WCH - AppVariables (1).csv"
OUTPUT_XLSX = "projects/CmF_SHG_Women_Entrepreneurs/reports/Dausa_Survey_Analysis_Master.xlsx"

print("Loading datasets...")
df_survey = pd.read_csv(SURVEY_CSV)
df_sub = pd.read_csv(SUB_CSV)
df_subsub = pd.read_csv(SUBSUB_CSV)
df_vars = pd.read_csv(APPVARS_CSV)

# Filter for Dausa district
dausa = df_survey[df_survey['District'] == 'DIST_DAUSA'].copy()
print(f"Total Dausa Survey respondents: {len(dausa)}")

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

print("Datasets loaded successfully.")
