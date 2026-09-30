import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

print(f"Total rows in AppVariables.csv: {len(rows)}")

# Print unique IDs and their titles
id_map = {}
for r in rows:
    rid = r.get('ID') or r.get('\ufeffID', '')
    id_map[rid] = r

# Let's see Section C questions in existing AppVariables.csv
sec_c_rows = [r for r in rows if 'Q_C_' in (r.get('ID') or r.get('\ufeffID', '')) or 'Section C' in r.get('Tags', '') or r.get('Table') == 'Survey' and 'C' in (r.get('ID') or r.get('\ufeffID', ''))]
print(f"\nExisting rows related to Section C: {len(sec_c_rows)}")
for r in sec_c_rows[:35]:
    rid = r.get('ID') or r.get('\ufeffID')
    print(f"ID: {rid:<20} | Col: {r.get('Column'):<22} | Title: {r.get('Title')[:55]}")
