import csv
import json

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

print(f"Initial rows: {len(rows)}")

# Define the 3 new options
new_options = [
    {
        'ID': 'ACT_AGRI_INPUT',
        'Table': 'Survey',
        'Column': 'BusinessActivities',
        'Tags': 'Activity_Trading, ActivityOption, SubOption',
        'ValueControl': 'Enum',
        'Title': '[T] Agri-input retail',
        'Description': 'Trading in seeds, fertilizers, pesticides, and farming inputs',
        'UsedFor': 'Trading Activity Option',
        'Decimal': '',
        'EnumValue': 'Agri-input retail',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '[T] कृषि आदान खुदरा (Agri-input retail)',
        'Title_raj': '[T] खाद-बीज री दुकान',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 08:30:00'
    },
    {
        'ID': 'ACT_AI_BREEDING',
        'Table': 'Survey',
        'Column': 'BusinessActivities',
        'Tags': 'Activity_Trading, ActivityOption, SubOption',
        'ValueControl': 'Enum',
        'Title': '[T] AI / breeding kits',
        'Description': 'Trading in artificial insemination & cattle breeding equipment',
        'UsedFor': 'Trading Activity Option',
        'Decimal': '',
        'EnumValue': 'AI/breeding kits',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '[T] कृत्रिम गर्भाधान (AI) / ब्रीडिंग किट',
        'Title_raj': '[T] पशु गर्भाधान / ब्रीडिंग किट',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 08:30:00'
    },
    {
        'ID': 'ACT_GOAT_TRADING',
        'Table': 'Survey',
        'Column': 'BusinessActivities',
        'Tags': 'Activity_Trading, ActivityOption, SubOption',
        'ValueControl': 'Enum',
        'Title': '[T] Goat trading',
        'Description': 'Trading and livestock dealing in goats',
        'UsedFor': 'Trading Activity Option',
        'Decimal': '',
        'EnumValue': 'Goat trading',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '[T] बकरी व्यापार / पशु क्रय-विक्रय',
        'Title_raj': '[T] बकरी लेन-देन / बकरा व्यापार',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 08:30:00'
    }
]

# The complete 29 options for Q_A_17_00
all_29_opts = [
    'ACT_VEG_FRUIT', 'ACT_GROCERY', 'ACT_FANCY_STORE', 'ACT_APPAREL', 'ACT_ELECTRIC_GOODS', 'ACT_STONE_SHOP',
    'ACT_AGRI_INPUT', 'ACT_AI_BREEDING', 'ACT_GOAT_TRADING',
    'ACT_FLOUR_MILL', 'ACT_TAILORING', 'ACT_BEAUTY_PARLOUR', 'ACT_AUTO_REPAIR', 'ACT_EMITRA', 'ACT_TRANSPORT',
    'ACT_TENT_HOUSE', 'ACT_MOBILE_REPAIR', 'ACT_STONE_CUTTING',
    'ACT_SANITARY_NAPKIN', 'ACT_HANDICRAFT', 'ACT_DAIRY_MILK', 'ACT_JUICE', 'ACT_FOOD_PROCESSING', 'ACT_FOOD_MAKING',
    'ACT_SWEET_BOX', 'ACT_FLAG_MAKING', 'ACT_LEATHER_PRODUCTS', 'ACT_STONE_IDOLS', 'ACT_ANY_OTHER'
]

vlist_str = " , ".join(all_29_opts)

# Update existing rows or insert new
existing_ids = {r['ID']: i for i, r in enumerate(rows)}

# Update Q_A_17_00
if 'Q_A_17_00' in existing_ids:
    q17_idx = existing_ids['Q_A_17_00']
    rows[q17_idx]['VariableList'] = vlist_str
    print(f"Updated Q_A_17_00 VariableList with {len(all_29_opts)} options")

# Insert the 3 new options right after ACT_STONE_SHOP if possible
insert_idx = len(rows)
if 'ACT_STONE_SHOP' in existing_ids:
    insert_idx = existing_ids['ACT_STONE_SHOP'] + 1

# Check if new options already exist, if not insert
new_to_insert = []
for opt in new_options:
    if opt['ID'] in existing_ids:
        rows[existing_ids[opt['ID']]] = opt
        print(f"Updated existing option: {opt['ID']}")
    else:
        new_to_insert.append(opt)

for opt in reversed(new_to_insert):
    rows.insert(insert_idx, opt)
    print(f"Inserted new option at index {insert_idx}: {opt['ID']}")

# Save AppVariables.csv
with open(appvar_path, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Saved updated AppVariables.csv (Total rows: {len(rows)})")

# Also save TSV for quick paste
tsv_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_EXACT_SYNC.tsv'
with open(tsv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(rows)
print(f"Saved updated AppVariables_EXACT_SYNC.tsv")
