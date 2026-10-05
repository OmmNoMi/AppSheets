import pandas as pd

df_survey = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - Survey.csv")
df_sub = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubTable.csv")
df_subsub = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv")

print("Respondent completeness summary:")
print("-" * 100)
print(f"{'Row':<4} | {'ID':<8} | {'Name':<22} | {'Enterprise':<25} | {'Filled Cols':<12} | {'SubTable Rows':<14} | {'SubSubTable Rows'}")
print("-" * 100)

for idx, r in df_survey.iterrows():
    sid = r.get("ID", "")
    name = str(r.get("RespondentName", ""))[:20]
    ent = str(r.get("EnterpriseName", ""))[:23]
    
    # count non-null columns in survey
    non_null_cols = r.dropna().count()
    
    sub_count = len(df_sub[df_sub['Survey'] == sid])
    subsub_count = len(df_subsub[df_subsub['Survey'] == sid])
    
    print(f"{idx:<4} | {str(sid):<8} | {name:<22} | {ent:<25} | {non_null_cols:<12} | {sub_count:<14} | {subsub_count}")
