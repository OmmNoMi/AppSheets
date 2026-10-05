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

print(f"Total AppVariables mapped: {len(appvar_map)}")

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

# Test resolution for KUM-6
r_kum6 = df_survey[df_survey['ID'] == 'KUM-6'].iloc[0].to_dict()
print("\n--- Testing KUM-6 resolution ---")
print("District:", resolve_val(r_kum6.get('District')))
print("Block:", resolve_val(r_kum6.get('Block')))
print("BusinessType:", resolve_val(r_kum6.get('BusinessType')))
print("BusinessActivities:", resolve_val(r_kum6.get('BusinessActivities')))
print("Registrations:", resolve_val(r_kum6.get('RegistrationsDocuments')))
print("Age:", resolve_val(r_kum6.get('RespondentAge')))
print("Education:", resolve_val(r_kum6.get('EducationStatus')))
print("Reasons:", resolve_val(r_kum6.get('ReasonsStartingBusiness')))
print("Marketing:", resolve_val(r_kum6.get('MarketingMethods')))
print("Future Plans:", resolve_val(r_kum6.get('FutureExpansionPlans')))
