import csv

csv_path = 'projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_REFINED_76Q.csv'
with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

options = [r for r in rows if 'Option' in r.get('Tags', '') and 'SectionC' in r.get('Tags', '')]
print(f"Section C Options count: {len(options)}")
for r in options[:15]:
    col = r.get('Column')
    rid = r.get('\ufeffID') or r.get('ID')
    title = r.get('Title')
    enum_val = r.get('EnumValue')
    print(f"Col: {col:<22} | ID: {rid:<16} | Title: {title}")
