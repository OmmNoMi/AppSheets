with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_COMPLETE.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

cols = ['Row_Item_Labor', 'Row_Item_Turnover', 'Row_Item_Capital', 'Row_Item_Trajectory', 'COL_CAP_USAGE']

for c in cols:
    print(f"\n==================== {c} ====================")
    for line in lines:
        if c in line:
            parts = line.strip().split(',')
            # print ID, Title, Title_hi, Title_raj
            if len(parts) >= 8:
                print(f"ID: {parts[0]} | Title: {parts[5][:25]} | Hi: {parts[-3][:20] if len(parts)>15 else 'N/A'}")
