import pandas as pd

appvars = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - AppVariables.csv")
print("Total app variables:", len(appvars))
print("Sample mappings:")

sample_codes = ['INT_SVEP', 'BTY_SERVICING', 'ACT_TAILORING', 'DOC_AADHAR', 'AGE_26_35', 'RSN_SETBACK', 'CYC_REGULAR_HOURS', 'DIST_DAUSA', 'BLK_SIKANDRA']
for code in sample_codes:
    match = appvars[appvars['ID'] == code]
    if not match.empty:
        r = match.iloc[0]
        print(f"  {code} -> Title: {r.get('Title')}, Title_hi: {r.get('Title_hi')}, EnumValue: {r.get('EnumValue')}")
    else:
        print(f"  {code} -> NOT FOUND")
