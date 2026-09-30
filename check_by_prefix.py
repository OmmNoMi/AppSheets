import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

prefixes = ['Q_A_', 'Q_B_', 'Q_C_', 'Q_D_', 'Q_E_', 'Q_F_', 'Q_G_', 'Q_H_', 'Q_I_']
for p in prefixes:
    p_rows = [r for r in rows if (r.get('ID') or r.get('\ufeffID', '')).startswith(p)]
    print(f"\nPrefix {p}: {len(p_rows)} rows")
    for r in p_rows:
        rid = r.get('ID') or r.get('\ufeffID')
        col = r.get('Column')
        title = r.get('Title')
        print(f"  {rid:<22} | Col: {col:<25} | Title: {title[:50]}")
