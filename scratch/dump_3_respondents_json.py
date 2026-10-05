import pandas as pd
import json

survey_path = r"C:\Users\hardi\Downloads\WCH - Survey.csv"
subtable_path = r"C:\Users\hardi\Downloads\WCH - SubTable.csv"
subsubtable_path = r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv"
appvars_path = r"C:\Users\hardi\Downloads\WCH - AppVariables.csv"

df_survey = pd.read_csv(survey_path)
df_sub = pd.read_csv(subtable_path)
df_subsub = pd.read_csv(subsubtable_path)
df_appvars = pd.read_csv(appvars_path)

# Build AppVariables lookup dict: ID -> {Title, Title_hi, EnumValue}
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
    if pd.isna(code):
        return ""
    code_str = str(code).strip()
    if "," in code_str:
        parts = [p.strip() for p in code_str.split(",")]
        return ", ".join([resolve_val(p) for p in parts])
    if code_str in appvar_map:
        ev = appvar_map[code_str]['EnumValue']
        t = appvar_map[code_str]['Title']
        return ev if ev and ev != 'nan' else t
    return code_str

target_ids = ['KAT-3', 'KUM-6', 'KUM-7']
result = {}

for tid in target_ids:
    s_row = df_survey[df_survey['ID'] == tid].iloc[0].to_dict()
    s_clean = {k: (s_row[k] if pd.notna(s_row[k]) else None) for k in s_row}
    
    # SubTable
    st = df_sub[df_sub['Survey'] == tid]
    st_dict = {}
    for _, row in st.iterrows():
        qg = row['Question_Group']
        q = row['Question']
        num = row['Answer_Number'] if pd.notna(row['Answer_Number']) else None
        enum_val = row['Answer_Enum'] if pd.notna(row['Answer_Enum']) else None
        if num is not None or enum_val is not None:
            if qg not in st_dict:
                st_dict[qg] = {}
            st_dict[qg][q] = {'num': num, 'enum': enum_val, 'resolved_enum': resolve_val(enum_val) if enum_val else None}
            
    # SubSubTable
    sst = df_subsub[df_subsub['Survey'] == tid]
    sst_dict = {}
    for _, row in sst.iterrows():
        qg = row['Question_Group']
        q = row['Question']
        num = row['Answer_Number'] if pd.notna(row['Answer_Number']) else None
        enum_val = row['Answer_Enum'] if pd.notna(row['Answer_Enum']) else None
        if num is not None or enum_val is not None:
            if qg not in sst_dict:
                sst_dict[qg] = {}
            sst_dict[qg][q] = {'num': num, 'enum': enum_val, 'resolved_enum': resolve_val(enum_val) if enum_val else None}
            
    result[tid] = {
        'Survey': s_clean,
        'SubTable': st_dict,
        'SubSubTable': sst_dict
    }

with open(r"c:\Users\hardi\AppSheets\scratch\dump_3_respondents.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print("Saved JSON successfully!")
