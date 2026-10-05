import pandas as pd
import json

survey_path = r"C:\Users\hardi\Downloads\WCH - Survey.csv"
subtable_path = r"C:\Users\hardi\Downloads\WCH - SubTable.csv"
subsubtable_path = r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv"
appvars_path = r"C:\Users\hardi\Downloads\WCH - AppVariables.csv"

df_survey = pd.read_csv(survey_path)
print("=== SURVEY ===")
print("Shape:", df_survey.shape)
print("Columns count:", len(df_survey.columns))
print("First 10 columns:", list(df_survey.columns[:10]))
print("\nFirst 5 respondents:")
for idx, r in df_survey.head(5).iterrows():
    print(f"Row {idx}: ID={r.get('ID', '')}, Name={r.get('RespondentName', '')}, District={r.get('District', '')}, Enterprise={r.get('EnterpriseName', '')}")

print("\n=== SUBTABLE ===")
df_sub = pd.read_csv(subtable_path, nrows=50)
print("Shape (sample):", df_sub.shape)
print("Columns:", list(df_sub.columns))
print("\nFirst 3 rows of SubTable:")
print(df_sub.head(3).to_dict(orient="records"))

print("\n=== SUBSUBTABLE ===")
df_subsub = pd.read_csv(subsubtable_path, nrows=50)
print("Shape (sample):", df_subsub.shape)
print("Columns:", list(df_subsub.columns))
print("\nFirst 3 rows of SubSubTable:")
print(df_subsub.head(3).to_dict(orient="records"))

print("\n=== APPVARIABLES ===")
df_appvars = pd.read_csv(appvars_path, nrows=20)
print("Columns:", list(df_appvars.columns))
print("Sample rows:")
for idx, r in df_appvars.head(5).iterrows():
    print(dict(r))
