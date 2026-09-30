import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

for r in rows:
    rid = r.get('ID') or r.get('\ufeffID', '')
    if any(k in rid for k in ['Q_C_07', 'Q_C_08', 'Q_C_09', 'Q_C_10', 'Q_C_11', 'Q_C_12', 'Q_C_13']):
        print(f"ID: {rid:<25} | Col: {r.get('Column'):<25} | Title: {r.get('Title')}")
