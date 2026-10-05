import pandas as pd

appvars = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - AppVariables.csv")
inv_opts = appvars[appvars['ID'].str.contains('Involvement', na=False)]
for _, r in inv_opts.iterrows():
    print(f"{r['ID']} -> EnumValue: {r['EnumValue']} | Title: {r['Title']}")
