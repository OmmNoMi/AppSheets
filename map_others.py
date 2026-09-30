import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

# Let's find all questions that have an 'other' option and their corresponding 'other specify' text column
other_options = []
other_fields = []

for r in rows:
    rid = r.get('ID') or r.get('\ufeffID', '')
    title = r.get('Title', '')
    col = r.get('Column', '')
    if 'other' in title.lower() and 'Specify' not in title:
        other_options.append((rid, col, title))
    elif 'Specify' in title or 'Other' in col:
        other_fields.append((rid, col, title))

print("=== DROPDOWN 'OTHER' OPTIONS IN APPVARIABLES ===")
for rid, col, title in other_options:
    print(f"Option ID: {rid:<22} | Column: {col:<25} | Title: {title}")

print("\n=== CONDITIONAL 'OTHER SPECIFY' TEXT FIELDS IN APPVARIABLES ===")
for rid, col, title in other_fields[:25]:
    print(f"Field ID: {rid:<22} | Column: {col:<25} | Title: {title}")
