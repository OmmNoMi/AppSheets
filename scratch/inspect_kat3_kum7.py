import pandas as pd

subsub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv")

for surv in ["KAT-3", "KUM-7"]:
    ss = subsub_df[subsub_df['Survey'] == surv]
    non_null = ss.dropna(subset=['Answer_Number', 'Answer_Enum'], how='all')
    print(f"\n{surv} non-null subsub entries: {len(non_null)}")
    turnover = ss[ss['Question_Group'].str.contains('Turnover', na=False)].dropna(subset=['Answer_Number'])
    print(f"Turnover rows for {surv}:")
    for _, r in turnover.iterrows():
        print(f"  {r['Question_Group']} -> {r['Question']}: {r['Answer_Number']}")
