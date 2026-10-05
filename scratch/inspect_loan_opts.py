import pandas as pd

appvars = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - AppVariables.csv")
lu_opts = appvars[appvars['ID'].str.contains('LoanUsage', na=False)]
for _, r in lu_opts.iterrows():
    print(f"{r['ID']} -> EnumValue: {r['EnumValue']} | Title: {r['Title']}")
