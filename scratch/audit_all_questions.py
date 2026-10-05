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
        return [resolve_val(p) for p in parts if p and resolve_val(p)]
    val = resolve_val(code_str)
    return [val] if val else []

def is_selected_strict(opt_label, selected_list):
    if not selected_list:
        return False
    valid_selected = [s.strip().lower() for s in selected_list if s and str(s).strip()]
    if not valid_selected:
        return False
        
    norm_opt = opt_label.lower().strip()
    c_opt = re.sub(r'[^a-z0-9]', '', norm_opt)
    
    for s in valid_selected:
        if norm_opt == s:
            return True
        c_s = re.sub(r'[^a-z0-9]', '', s)
        if c_opt == c_s:
            return True
        # For longer option sentences (>= 8 chars), check substring match
        if len(c_s) >= 8 and len(c_opt) >= 8:
            if c_s in c_opt or c_opt in c_s:
                return True
    return False

# Test for all questions
questions_to_test = [
    ("District", ["Baran", "Churu", "Dausa", "Dungarpur", "Jodhpur"]),
    ("Block", ["Chhipabarod", "Baran", "Ratangarh", "Sujangarh", "Sikandra", "Sagwara", "Galiakot", "Mandor", "Luni", "Shergadh"]),
    ("LeadershipRole", ["Yes", "No"]),
    ("RelatedToCRP", ["Yes", "No"]),
    ("EPInterventionType", ["SVEP", "OSF", "OSF phased out", "Don't know"]),
    ("BusinessType", ["Trading", "Servicing", "Manufacturing/ production"]),
    ("MaintainSeparateRecords", ["Yes", "No"]),
    ("RespondentAge", ["18-25", "26-35", "36-45", "46-55", "Above 55"]),
    ("MaritalStatus", ["Single", "Married", "Widowed", "Separated", "Divorced"]),
    ("SocialCategory", ["SC", "ST", "OBC", "General"]),
    ("EducationStatus", ["Illiterate", "Illiterate but able to calculate", "Upto 5th", "Upto 8th", "Upto 10th", "Upto 12th", "Diploma", "Graduate", "B.Ed"]),
    ("AttendedTraining", ["Yes", "No"]),
    ("UsedTrainingComponent", ["Yes", "No"]),
    ("SmartphoneOwnership", ["Yes", "No", "No, but i have access to smart phone"]),
    ("UseQRUPI", ["Yes", "No"]),
    ("BusinessOperationalStatus", ["Yes but the sale has reduced", "Yes but the scale has increased", "Yes, but the scale has remained the same.", "No. If no, specify the year when it was closed…….."])
]

for tid in ['KAT-3', 'KUM-6', 'KUM-7']:
    r = df_survey[df_survey['ID'] == tid].iloc[0]
    print(f"\n=================== AUDIT ALL FOR {tid} ===================")
    for col, opts in questions_to_test:
        raw = r.get(col)
        res_list = resolve_list(raw)
        checked_opts = [opt for opt in opts if is_selected_strict(opt, res_list)]
        print(f"{col:25s} | raw: {str(raw):25s} | checked: {checked_opts}")
