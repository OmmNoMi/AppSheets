import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    q7_rows = []
    other_rows = []
    for r in reader:
        rid = r.get('ID') or r.get('\ufeffID', '')
        title = r.get('Title', '')
        col = r.get('Column', '')
        if '07' in rid or 'Sourcing' in col or 'material' in title.lower() or 'Nearby town' in title:
            q7_rows.append(r)
        if 'other' in title.lower() or 'Other' in col or 'Other' in rid:
            other_rows.append(r)

print(f"Total Q7 related rows in AppVariables.csv: {len(q7_rows)}")
for r in q7_rows:
    rid = r.get('ID') or r.get('\ufeffID')
    print(f"ID: {rid:<25} | Col: {r.get('Column'):<25} | Title: {r.get('Title')[:50]}")

print(f"\nTotal 'Other' related rows in AppVariables.csv: {len(other_rows)}")
for r in other_rows[:20]:
    rid = r.get('ID') or r.get('\ufeffID')
    print(f"ID: {rid:<25} | Col: {r.get('Column'):<25} | Title: {r.get('Title')[:50]}")
