with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_COMPLETE.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for line in lines:
    if 'Q_A_17' in line or 'ACT_' in line or 'COL_LABOR_ACTIVITY' in line:
        print(line.strip()[:140])
