import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    subtable_rows = [r for r in reader if r.get('Table') == 'Survey_Tables']

print(f"Total existing Survey_Tables rows in AppVariables.csv: {len(subtable_rows)}")
for r in subtable_rows[:25]:
    rid = r.get('ID') or r.get('\ufeffID')
    print(f"ID: {rid:<25} | Col: {r.get('Column'):<20} | Tag: {r.get('Tags'):<25} | Title: {r.get('Title')}")
