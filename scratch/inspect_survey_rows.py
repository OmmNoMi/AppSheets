import pandas as pd

df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - Survey.csv")

for surv_id in ['KUM-1', 'KAT-3', 'KUM-6']:
    row = df[df['ID'] == surv_id]
    if not row.empty:
        r = row.iloc[0].to_dict()
        print(f"\n=================== SURVEY {surv_id} ({r.get('RespondentName')}) ===================")
        for col, val in r.items():
            if pd.notna(val) and str(val).strip() != '':
                print(f"  {col}: {val}")
