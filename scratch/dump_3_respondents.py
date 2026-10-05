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

for tid in target_ids:
    s_row = df_survey[df_survey['ID'] == tid].iloc[0].to_dict()
    print(f"\n{'='*30} RESPONDENT {tid} {'='*30}")
    print(f"Name: {s_row.get('RespondentName')}")
    print(f"District: {resolve_val(s_row.get('District'))}, Block: {resolve_val(s_row.get('Block'))}, Village: {s_row.get('VillageGP')}")
    print(f"Enterprise: {s_row.get('EnterpriseName')}, Type: {resolve_val(s_row.get('BusinessType'))}, Activity: {resolve_val(s_row.get('BusinessActivities'))}")
    
    # Check SubTable questions
    st = df_sub[df_sub['Survey'] == tid]
    print(f"\nSubTable entries ({len(st)}):")
    for qg, grp in st.groupby('Question_Group'):
        print(f"  Group: {qg}")
        for _, row in grp.iterrows():
            q = row['Question']
            num = row['Answer_Number']
            enum = row['Answer_Enum']
            if pd.notna(num) or pd.notna(enum):
                res_enum = resolve_val(enum) if pd.notna(enum) else ""
                print(f"    {q}: num={num}, enum={res_enum} ({enum})")
                
    # Check SubSubTable questions
    sst = df_subsub[df_subsub['Survey'] == tid]
    print(f"\nSubSubTable entries ({len(sst)}):")
    for qg, grp in sst.groupby('Question_Group'):
        print(f"  Group: {qg}")
        for _, row in grp.iterrows():
            q = row['Question']
            num = row['Answer_Number']
            enum = row['Answer_Enum']
            if pd.notna(num) or pd.notna(enum):
                res_enum = resolve_val(enum) if pd.notna(enum) else ""
                print(f"    {q}: num={num}, enum={res_enum} ({enum})")
