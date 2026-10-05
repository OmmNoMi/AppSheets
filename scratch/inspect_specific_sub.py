import pandas as pd

sub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubTable.csv")
targets = ['KAT-3', 'KUM-6', 'KUM-7']

for tid in targets:
    st = sub_df[sub_df['Survey'] == tid]
    print(f"\n=================== SUBTABLE FOR {tid} ===================")
    for qg in ['SubTable_MaterialSourcing', 'SubTable_ProductsServices', 'SubTable_ChangeInMonthlyIncome', 'SubTable_BuisenesHelp', 'Q_B_05', 'SubTable_Competitor']:
        matching = st[st['Question_Group'] == qg]
        if not matching.empty:
            print(f"Group: {qg}")
            for _, r in matching.iterrows():
                print(f"  {r['Question']} -> num={r['Answer_Number']}, enum={r['Answer_Enum']}")
