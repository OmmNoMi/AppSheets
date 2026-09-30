import csv

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

all_10_mkt = [
    'MKT_SHOP_ONLY', 'MKT_NAME_BOARD', 'MKT_DOOR_TO_DOOR', 'MKT_SHG_MEETINGS',
    'MKT_TRADERS_SAMPLES', 'MKT_INSTA_WHATSAPP', 'MKT_WAIT_ENQUIRIES',
    'MKT_DONT_KNOW_HOW', 'MKT_NO_NEED', 'MKT_OTHER'
]
vlist_str = " , ".join(all_10_mkt)

new_opt = {
    'ID': 'MKT_INSTA_WHATSAPP',
    'Table': 'Survey',
    'Column': 'MarketingMethods',
    'Tags': 'MarketingMethodOption, SubOption',
    'ValueControl': 'Enum',
    'Title': 'I market actively on instagram and whatsapp',
    'Description': 'Marketing actively on Instagram and WhatsApp',
    'UsedFor': 'Marketing Method Option',
    'Decimal': '',
    'EnumValue': 'I market actively on instagram and whatsapp',
    'EnumList': '',
    'VariableList': '',
    'DateValue': '',
    'Photo': '',
    'URL': '',
    'File': '',
    'Title_hi': 'मैं इंस्टाग्राम और व्हाट्सएप पर सक्रिय रूप से प्रचार/मार्केटिंग करती हूँ',
    'Title_raj': 'म्हे इंस्टाग्राम अर व्हाट्सएप पै प्रचार करां',
    'ActionIcon': '',
    'LastEditBy': 'Antigravity',
    'LastEditOn': '09/26/2026 09:40:00'
}

existing_ids = {r['ID']: i for i, r in enumerate(rows)}

# Update Q_C_08_00
if 'Q_C_08_00' in existing_ids:
    idx = existing_ids['Q_C_08_00']
    rows[idx]['VariableList'] = vlist_str
    print("Updated Q_C_08_00 VariableList with 10 options")

# Insert MKT_INSTA_WHATSAPP right after MKT_TRADERS_SAMPLES
if 'MKT_INSTA_WHATSAPP' in existing_ids:
    rows[existing_ids['MKT_INSTA_WHATSAPP']] = new_opt
    print("Updated existing MKT_INSTA_WHATSAPP")
else:
    ins_pos = len(rows)
    if 'MKT_TRADERS_SAMPLES' in existing_ids:
        ins_pos = existing_ids['MKT_TRADERS_SAMPLES'] + 1
    rows.insert(ins_pos, new_opt)
    print(f"Inserted MKT_INSTA_WHATSAPP at pos {ins_pos}")

with open(appvar_path, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

tsv_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_EXACT_SYNC.tsv'
with open(tsv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(rows)

print(f"Saved updated AppVariables.csv (Total rows: {len(rows)})")
