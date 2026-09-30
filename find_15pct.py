import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    found = False
    for r in reader:
        if '15%' in r.get('Title', '') or '15%' in r.get('EnumValue', ''):
            rid = r.get('ID') or r.get('\ufeffID')
            print(f"ID: {rid} | Col: {r.get('Column')} | Title: {r.get('Title')} | Enum: {r.get('EnumValue')}")
            found = True
    if not found:
        print("NO 15% rows found in AppVariables.csv!")
