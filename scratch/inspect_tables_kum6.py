import pandas as pd

sub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubTable.csv")
subsub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv")

surv = "KUM-6"
print(f"=== SubTable for {surv} ===")
s_rows = sub_df[sub_df['Survey'] == surv]
for qg, group in s_rows.groupby('Question_Group'):
    print(f"\n--- Group: {qg} ---")
    for _, r in group.iterrows():
        print(f"  {r['Question']}: num={r['Answer_Number']}, enum={r['Answer_Enum']}")

print(f"\n=== SubSubTable for {surv} ===")
ss_rows = subsub_df[subsub_df['Survey'] == surv]
for qg, group in ss_rows.groupby('Question_Group'):
    print(f"\n--- Group: {qg} ---")
    for _, r in group.iterrows():
        print(f"  {r['Question']}: num={r['Answer_Number']}, enum={r['Answer_Enum']}")
