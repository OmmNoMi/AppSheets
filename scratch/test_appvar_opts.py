import pandas as pd

appvars = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - AppVariables.csv")
for col in ['EducationStatus', 'AttendedTraining', 'UsedTrainingComponent', 'LeadershipRole', 'LocationConvenience', 'ReasonsStartingBusiness']:
    sub = appvars[appvars['Column'] == col]
    print(f"\n=== Column: {col} ({len(sub)} rows) ===")
    for _, r in sub.iterrows():
        print(f"  {r['ID']} -> EnumValue: '{r['EnumValue']}' | Title: '{r['Title']}'")
