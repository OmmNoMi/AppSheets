import pandas as pd

sub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubTable.csv")
subsub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv")

for tid in ['KAT-3', 'KUM-6', 'KUM-7']:
    print(f"\n=================== ALL SUBTABLE FOR {tid} ===================")
    st = sub_df[sub_df['Survey'] == tid].dropna(subset=['Answer_Number', 'Answer_Enum'], how='all')
    for _, r in st.iterrows():
        print(f"  [{r['Question_Group']}] {r['Question']} -> num={r['Answer_Number']}, enum={r['Answer_Enum']}")

    print(f"\n=================== ALL SUBSUBTABLE FOR {tid} ===================")
    sst = subsub_df[subsub_df['Survey'] == tid].dropna(subset=['Answer_Number', 'Answer_Enum'], how='all')
    for _, r in sst.iterrows():
        print(f"  [{r['Question_Group']}] {r['Question']} -> num={r['Answer_Number']}, enum={r['Answer_Enum']}")
