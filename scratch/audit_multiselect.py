import os
import re
import pandas as pd

SURVEY_CSV = r"C:\Users\hardi\Downloads\WCH - Survey.csv"
APPVARS_CSV = r"C:\Users\hardi\Downloads\WCH - AppVariables.csv"

df_survey = pd.read_csv(SURVEY_CSV)
df_appvars = pd.read_csv(APPVARS_CSV)

appvar_map = {}
for _, r in df_appvars.iterrows():
    vid = str(r.get('ID', '')).strip()
    if vid:
        appvar_map[vid] = {
            'Title': str(r.get('Title', '')) if pd.notna(r.get('Title')) else '',
            'EnumValue': str(r.get('EnumValue', '')) if pd.notna(r.get('EnumValue')) else ''
        }

def resolve_val(code):
    if pd.isna(code) or code is None:
        return ""
    code_str = str(code).strip()
    if "," in code_str:
        parts = [p.strip() for p in code_str.split(",")]
        return ", ".join([resolve_val(p) for p in parts if p and resolve_val(p)])
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
        return [resolve_val(p) for p in parts if p and resolve_val(p)]
    val = resolve_val(code_str)
    return [val] if val else []

def normalize_text(text):
    if not text:
        return ""
    t = str(text).strip().lower()
    t = t.replace("’", "'").replace("“", '"').replace("”", '"').replace("–", "-").replace("—", "-")
    t = re.sub(r'\s+', ' ', t)
    return t

def is_selected_perfect(opt_label, selected_list):
    if not selected_list:
        return False
    clean_selected = [normalize_text(s) for s in selected_list if s and str(s).strip() and str(s).strip().lower() != 'nan']
    if not clean_selected:
        return False
        
    norm_opt = normalize_text(opt_label)
    c_opt = re.sub(r'[^a-z0-9]', '', norm_opt)
    
    for s in clean_selected:
        if norm_opt == s:
            return True
        c_s = re.sub(r'[^a-z0-9]', '', s)
        if c_opt == c_s and c_opt != "":
            return True
        if len(c_s) >= 15 and len(c_opt) >= 15:
            if c_s.startswith(c_opt[:20]) or c_opt.startswith(c_s[:20]) or (c_s in c_opt) or (c_opt in c_s):
                return True
    return False

DOCS_OPTS = ["PAN card", "Aadhar card", "Udyam Aadhar", "Shop and Establishment registration", "FSSAI", "Caste certificate", "Income certificate"]
INCOME_SOURCES_OPTS = ["Agricultural income", "Fixed Salary", "Wages", "Self employed", "NTFP sale", "Dairying", "Sale of animals", "Animal products", "Family/husband’s enterprise", "Respondent’s enterprise", "MNREGA", "Pension", "Rent from properties", "Any other, specify"]

for tid in ['KAT-3', 'KUM-6', 'KUM-7']:
    r = df_survey[df_survey['ID'] == tid].iloc[0]
    print(f"\n=================== MULTISELECT AUDIT FOR {tid} ===================")
    
    docs_raw = r.get('RegistrationsDocuments')
    docs_res = resolve_list(docs_raw)
    docs_chk = [o for o in DOCS_OPTS if is_selected_perfect(o, docs_res)]
    print(f"Registrations (raw: {docs_raw}) -> Checked: {docs_chk}")
    
    inc_raw = r.get('FamilyIncomeSources')
    inc_res = resolve_list(inc_raw)
    inc_chk = [o for o in INCOME_SOURCES_OPTS if is_selected_perfect(o, inc_res)]
    print(f"Income Sources (raw: {inc_raw}) -> Checked: {inc_chk}")
