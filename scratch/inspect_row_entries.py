with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_COMPLETE.csv', 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        if line.startswith('ROW_'):
            print(line.strip()[:140])
