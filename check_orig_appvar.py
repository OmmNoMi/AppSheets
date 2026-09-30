import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f"Total rows in existing AppVariables.csv: {len(rows)}")

# Check question prompts in existing AppVariables
labels = [r for r in rows if 'LBL_' in (r.get('ID') or r.get('\ufeffID', '')) or 'Q_' in (r.get('ID') or r.get('\ufeffID', ''))]
print(f"Total labels/questions found: {len(labels)}")

for l in labels[:25]:
    rid = l.get('ID') or l.get('\ufeffID')
    print(f"ID: {rid:<20} | Col: {l.get('Column'):<25} | Title: {l.get('Title')[:40]}")
