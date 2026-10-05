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
    # Clean selected_list of any empty/whitespace items
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
        # If longer text (e.g. sentence options in multiselect), check meaningful containment
        # but ONLY if string is at least 4 characters long and not a short word like 'no' or 'yes'
        if len(c_s) >= 4 and len(c_opt) >= 4:
            if c_s in c_opt or c_opt in c_s:
                return True
    return False

print("Strict selector defined. Now auditing for KAT-3, KUM-6, KUM-7...")

for tid in ['KAT-3', 'KUM-6', 'KUM-7']:
    r = df_survey[df_survey['ID'] == tid].iloc[0]
    print(f"\n=================== {tid} ===================")
    
    # Audit yes/no questions
    for col, q_name in [
        ('LeadershipRole', 'A Q10. Leadership role'),
        ('RelatedToCRP', 'A Q12. Related to CRP'),
        ('MaintainSeparateRecords', 'A Q19. Separate records'),
        ('AttendedTraining', 'G Q1. Attended training'),
        ('UsedTrainingComponent', 'G Q3. Used training component'),
        ('UseQRUPI', 'H Q2. Use QR/UPI'),
        ('BusinessOperationalStatus', 'I Q2. Still operational')
    ]:
        raw = r.get(col)
        res_list = resolve_list(raw)
        print(f"  {q_name}: raw='{raw}', resolved={res_list}")
        yes_chk = is_selected_strict("Yes", res_list)
        no_chk = is_selected_strict("No", res_list)
        print(f"    -> [Yes: {yes_chk}], [No: {no_chk}]")
