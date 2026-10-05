import pandas as pd

sub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubTable.csv")
subsub_df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv")

print("SubTable total rows:", len(sub_df))
print("SubTable surveys:", sub_df['Survey'].unique())
print("SubTable Question_Groups:", sub_df['Question_Group'].value_counts())

print("\nSubSubTable total rows:", len(subsub_df))
print("SubSubTable surveys:", subsub_df['Survey'].unique())
print("SubSubTable Question_Groups:", subsub_df['Question_Group'].value_counts())

# Let's inspect for a specific survey, e.g., KUM-1 or KUM-3
for surv_id in ['KUM-1', 'KAT-3', 'KUM-6']:
    print(f"\n=================== SURVEY {surv_id} ===================")
    sub_for_surv = sub_df[sub_df['Survey'] == surv_id]
    print(f"SubTable rows count: {len(sub_for_surv)}")
    print("SubTable non-null answers:")
    non_null_sub = sub_for_surv.dropna(subset=['Answer_Number', 'Answer_Enum'], how='all')
    print(non_null_sub[['Question_Group', 'Question', 'Answer_Number', 'Answer_Enum']].to_string())
    
    subsub_for_surv = subsub_df[subsub_df['Survey'] == surv_id]
    print(f"\nSubSubTable rows count: {len(subsub_for_surv)}")
    print("SubSubTable non-null answers:")
    non_null_subsub = subsub_for_surv.dropna(subset=['Answer_Number', 'Answer_Enum'], how='all')
    print(non_null_subsub[['Question_Group', 'Question', 'Answer_Number', 'Answer_Enum']].to_string())
