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

# Test for KAT-3
r_kat3 = df_survey[df_survey['ID'] == 'KAT-3'].iloc[0]

print("=== KAT-3 AUDIT WITH PERFECT MATCHER ===")
print("Q10 Leadership (raw:", r_kat3.get('LeadershipRole'), ") -> Yes:", is_selected_perfect("Yes", resolve_list(r_kat3.get('LeadershipRole'))), "No:", is_selected_perfect("No", resolve_list(r_kat3.get('LeadershipRole'))))
print("Q12 Related to CRP (raw:", r_kat3.get('RelatedToCRP'), ") -> Yes:", is_selected_perfect("Yes", resolve_list(r_kat3.get('RelatedToCRP'))), "No:", is_selected_perfect("No", resolve_list(r_kat3.get('RelatedToCRP'))))
print("Q19 Separate records (raw:", r_kat3.get('MaintainSeparateRecords'), ") -> Yes:", is_selected_perfect("Yes", resolve_list(r_kat3.get('MaintainSeparateRecords'))), "No:", is_selected_perfect("No", resolve_list(r_kat3.get('MaintainSeparateRecords'))))
print("B Q4 Education (raw:", r_kat3.get('EducationStatus'), ")")
for edu in ["Illiterate", "Illiterate but able to calculate", "Upto 5th", "Upto 8th", "Upto 10th", "Upto 12th"]:
    print(f"  {edu:35s}: {is_selected_perfect(edu, resolve_list(r_kat3.get('EducationStatus')))}")

print("G Q1 Attended training (raw:", r_kat3.get('AttendedTraining'), ") -> Yes:", is_selected_perfect("Yes", resolve_list(r_kat3.get('AttendedTraining'))), "No:", is_selected_perfect("No", resolve_list(r_kat3.get('AttendedTraining'))))
print("G Q3 Used training component (raw:", r_kat3.get('UsedTrainingComponent'), ") -> Yes:", is_selected_perfect("Yes", resolve_list(r_kat3.get('UsedTrainingComponent'))), "No:", is_selected_perfect("No", resolve_list(r_kat3.get('UsedTrainingComponent'))))
print("H Q2 QR/UPI (raw:", r_kat3.get('UseQRUPI'), ") -> Yes:", is_selected_perfect("Yes", resolve_list(r_kat3.get('UseQRUPI'))), "No:", is_selected_perfect("No", resolve_list(r_kat3.get('UseQRUPI'))))
