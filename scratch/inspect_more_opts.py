import pandas as pd

appvars = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - AppVariables.csv")
for pattern in ['ProductsServices', 'ChangeInMonthlyIncome', 'BuisenesHelp', 'MaterialSourcing']:
    sub = appvars[appvars['ID'].str.contains(pattern, na=False)]
    print(f"\n--- {pattern} ({len(sub)}) ---")
    for _, r in sub.iterrows():
        print(f"  {r['ID']} -> EnumValue: {r['EnumValue']} | Title: {r['Title']}")
