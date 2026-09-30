import pandas as pd

df = pd.read_csv('data/AppVariables.csv')
act_df = df[df['ID'].str.startswith('ACT_')]
print("=== ACT_ Activities ===")
for idx, row in act_df.iterrows():
    print(f"{row['ID']}\t{row['Title']}\t{row['Title_hi']}\t{row['Title_raj']}")

print("\n=== Matrix Question Options in AppVariables ===")
# Labor involvement
print("\nLabor Involvement:")
inv = df[df['ID'].str.startswith('INV_')]
for idx, row in inv.iterrows():
    print(f"{row['ID']}\t{row['Title']}\t{row['Title_hi']}")

# Percentages
print("\nPercentages:")
pct = df[df['ID'].str.startswith('PCT_')]
for idx, row in pct.iterrows():
    print(f"{row['ID']}\t{row['Title']}")

# Usage purposes
print("\nUsage purposes:")
use = df[df['ID'].str.startswith('USE_')]
for idx, row in use.iterrows():
    print(f"{row['ID']}\t{row['Title']}\t{row['Title_hi']}")
