import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    found = []
    for r in reader:
        rid = r.get('ID') or r.get('\ufeffID', '')
        col = r.get('Column', '')
        tag = r.get('Tags', '')
        title = r.get('Title', '')
        if 'RSN' in rid or 'Reason' in col or 'Reason' in tag or 'financial setback' in title.lower():
            found.append(r)

print(f"Total matching rows: {len(found)}")
for r in found:
    rid = r.get('ID') or r.get('\ufeffID')
    print(f"ID: {rid:<20} | Col: {r.get('Column'):<22} | Title: {r.get('Title')}")
