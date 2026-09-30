import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        if r.get('Column') == 'ReasonsStartingBusiness':
            rid = r.get('ID') or r.get('\ufeffID')
            print(f"ID: {rid:<20} | Title: '{r.get('Title')}' | Enum: '{r.get('EnumValue')}'")
