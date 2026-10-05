import os
import re
import json
import base64
import subprocess
import pandas as pd

# Paths
BASE_DIR = r"c:\Users\hardi\AppSheets"
CMF_DIR = os.path.join(BASE_DIR, r"projects\CmF_SHG_Women_Entrepreneurs")
REPORTS_DIR = os.path.join(CMF_DIR, "reports")
SCRIPTS_DIR = os.path.join(CMF_DIR, "scripts")
LOGO_PATH = os.path.join(BASE_DIR, r".agents\brand\ommnomi_logo.png")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

SURVEY_CSV = r"C:\Users\hardi\Downloads\WCH - Survey.csv"
SUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubTable.csv"
SUBSUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv"
APPVARS_CSV = r"C:\Users\hardi\Downloads\WCH - AppVariables.csv"

os.makedirs(REPORTS_DIR, exist_ok=True)

# Load Logo as base64
with open(LOGO_PATH, "rb") as f:
    LOGO_B64 = base64.b64encode(f.read()).decode("utf-8")
LOGO_DATA_URI = f"data:image/png;base64,{LOGO_B64}"

# Load CSVs
df_survey = pd.read_csv(SURVEY_CSV)
df_sub = pd.read_csv(SUBTABLE_CSV)
df_subsub = pd.read_csv(SUBSUBTABLE_CSV)
df_appvars = pd.read_csv(APPVARS_CSV)

# AppVariables lookup
appvar_map = {}
for _, r in df_appvars.iterrows():
    vid = str(r.get('ID', '')).strip()
    if vid:
        appvar_map[vid] = {
            'Title': str(r.get('Title', '')) if pd.notna(r.get('Title')) else '',
            'Title_hi': str(r.get('Title_hi', '')) if pd.notna(r.get('Title_hi')) else '',
            'EnumValue': str(r.get('EnumValue', '')) if pd.notna(r.get('EnumValue')) else ''
        }

def resolve_val(code):
    if pd.isna(code) or code is None:
        return ""
    code_str = str(code).strip()
    if "," in code_str:
        parts = [p.strip() for p in code_str.split(",")]
        return ", ".join([resolve_val(p) for p in parts if p])
    if code_str in appvar_map:
        ev = appvar_map[code_str]['EnumValue']
        t = appvar_map[code_str]['Title']
        if ev and ev != 'nan':
            return ev
        return t
    return code_str

def resolve_list(code):
    if pd.isna(code) or code is None:
        return []
    code_str = str(code).strip()
    if "," in code_str:
        parts = [p.strip() for p in code_str.split(",")]
        return [resolve_val(p) for p in parts if p]
    return [resolve_val(code_str)]

def is_selected(option_label, selected_list):
    """Fuzzy or exact match if an option label is selected in respondent's answers."""
    norm_opt = option_label.lower().strip()
    for s in selected_list:
        norm_s = s.lower().strip()
        if norm_opt in norm_s or norm_s in norm_opt:
            return True
        # remove punctuation and check
        clean_opt = re.sub(r'[^a-z0-9]', '', norm_opt)
        clean_s = re.sub(r'[^a-z0-9]', '', norm_s)
        if clean_opt and clean_s and (clean_opt in clean_s or clean_s in clean_opt):
            return True
    return False

def fmt_inr(val):
    if val is None or pd.isna(val):
        return "0"
    try:
        val_f = float(val)
        if val_f.is_integer():
            return f"{int(val_f):,}"
        return f"{val_f:,.2f}"
    except:
        return str(val)

print("Setup completed successfully.")
