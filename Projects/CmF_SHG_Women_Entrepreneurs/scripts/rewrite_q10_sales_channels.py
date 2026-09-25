import csv

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

pct15_vlist = "PCT15_0 , PCT15_15 , PCT15_30 , PCT15_45 , PCT15_60 , PCT15_75 , PCT15_90 , PCT15_100"

pct15_options = [
    {
        'ID': 'PCT15_0',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': '0%',
        'Description': '0% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '0',
        'EnumValue': '0%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '0%',
        'Title_raj': '0%',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    },
    {
        'ID': 'PCT15_15',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'upto 15%',
        'Description': 'Upto 15% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '15',
        'EnumValue': 'upto 15%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '15% तक',
        'Title_raj': '15% तांई',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    },
    {
        'ID': 'PCT15_30',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'upto 30%',
        'Description': 'Upto 30% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '30',
        'EnumValue': 'upto 30%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '30% तक',
        'Title_raj': '30% तांई',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    },
    {
        'ID': 'PCT15_45',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'upto 45%',
        'Description': 'Upto 45% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '45',
        'EnumValue': 'upto 45%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '45% तक',
        'Title_raj': '45% तांई',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    },
    {
        'ID': 'PCT15_60',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'upto 60%',
        'Description': 'Upto 60% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '60',
        'EnumValue': 'upto 60%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '60% तक',
        'Title_raj': '60% तांई',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    },
    {
        'ID': 'PCT15_75',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'upto 75%',
        'Description': 'Upto 75% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '75',
        'EnumValue': 'upto 75%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '75% तक',
        'Title_raj': '75% तांई',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    },
    {
        'ID': 'PCT15_90',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'upto 90%',
        'Description': 'Upto 90% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '90',
        'EnumValue': 'upto 90%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '90% तक',
        'Title_raj': '90% तांई',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    },
    {
        'ID': 'PCT15_100',
        'Table': 'Survey',
        'Column': 'SalesChannelsPct',
        'Tags': 'SalesChannelPctOption, SubOption',
        'ValueControl': 'Enum',
        'Title': '100%',
        'Description': '100% of sales',
        'UsedFor': 'Sales Channel Percentage Option',
        'Decimal': '100',
        'EnumValue': '100%',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': '100%',
        'Title_raj': '100%',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:00:00'
    }
]

updates = {
    "Q_C_10_00": {
        "ValueControl": "Section_Header",
        "Title": "Q10. What percentage of your products/services get sold through following channels?",
        "Title_hi": "Q10. आपके उत्पादों/सेवाओं का कितना प्रतिशत निम्नलिखित माध्यमों से बिकता है?",
        "Title_raj": "Q10. थारे माल/सेवावां रो कित्तो प्रतिशत इण जरिया सूं बिकै है?",
        "Description": "Prompt for Sales Channels Percentage Breakdown",
        "EnumValue": "Q10. What percentage of your products/services get sold through following channels?",
        "VariableList": pct15_vlist
    },
    "Q_C_12_00_SUMMARY": {
        "ValueControl": "Section_Header",
        "Title": "Q10. What percentage of your products/services get sold through following channels?",
        "Title_hi": "Q10. आपके उत्पादों/सेवाओं का कितना प्रतिशत निम्नलिखित माध्यमों से बिकता है?",
        "Title_raj": "Q10. थारे माल/सेवावां रो कित्तो प्रतिशत इण जरिया सूं बिकै है?",
        "Description": "Summary for Sales Channels Percentage",
        "EnumValue": "Q10. What percentage of your products/services get sold through following channels?",
        "VariableList": pct15_vlist
    },
    "Q_C_10_01": {
        "ValueControl": "Enum",
        "Title": "a. Online platforms",
        "Title_hi": "a. ऑनलाइन प्लेटफॉर्म (Online platforms)",
        "Title_raj": "a. ऑनलाइन साइट्स",
        "Description": "Online platforms sales percentage",
        "EnumValue": "Online platforms",
        "VariableList": pct15_vlist
    },
    "Q_C_10_02": {
        "ValueControl": "Enum",
        "Title": "b. Whatsapp",
        "Title_hi": "b. व्हाट्सएप (WhatsApp)",
        "Title_raj": "b. व्हाट्सएप",
        "Description": "WhatsApp sales percentage",
        "EnumValue": "Whatsapp",
        "VariableList": pct15_vlist
    },
    "Q_C_10_03": {
        "ValueControl": "Enum",
        "Title": "c. Instagram",
        "Title_hi": "c. इंस्टाग्राम (Instagram)",
        "Title_raj": "c. इंस्टाग्राम",
        "Description": "Instagram sales percentage",
        "EnumValue": "Instagram",
        "VariableList": pct15_vlist
    },
    "Q_C_10_04": {
        "ValueControl": "Enum",
        "Title": "d. Your premise",
        "Title_hi": "d. आपकी अपनी दुकान / परिसर से",
        "Title_raj": "d. खुद् री दुकान सूं",
        "Description": "Own premise sales percentage",
        "EnumValue": "Your premise",
        "VariableList": pct15_vlist
    },
    "Q_C_10_05": {
        "ValueControl": "Enum",
        "Title": "e. Local traders/shopkeepers",
        "Title_hi": "e. स्थानीय व्यापारियों / दुकानदारों के माध्यम से",
        "Title_raj": "e. लोकल दुकानदारां सूं",
        "Description": "Local traders sales percentage",
        "EnumValue": "Local traders/shopkeepers",
        "VariableList": pct15_vlist
    },
    "Q_C_10_06": {
        "ValueControl": "Enum",
        "Title": "f. Local haat/market",
        "Title_hi": "f. स्थानीय हाट / साप्ताहिक बाजार",
        "Title_raj": "f. लोकल हाट / सातावारिया बजार",
        "Description": "Local haat sales percentage",
        "EnumValue": "Local haat/market",
        "VariableList": pct15_vlist
    },
    "Q_C_10_07": {
        "ValueControl": "Enum",
        "Title": "g. Saras fair",
        "Title_hi": "g. सरस मेला",
        "Title_raj": "g. सरस मेला",
        "Description": "Saras fair sales percentage",
        "EnumValue": "Saras fair",
        "VariableList": pct15_vlist
    }
}

existing_ids = {r['ID']: i for i, r in enumerate(rows)}

for rid, u in updates.items():
    if rid in existing_ids:
        r = rows[existing_ids[rid]]
        for k, v in u.items():
            r[k] = v
        r['LastEditBy'] = 'Antigravity'
        r['LastEditOn'] = '09/26/2026 10:00:00'
        print(f"Updated {rid}: {r['Title']}")

# Insert PCT15 options
for opt in pct15_options:
    oid = opt['ID']
    if oid in existing_ids:
        rows[existing_ids[oid]] = opt
        print(f"Updated {oid}")
    else:
        rows.append(opt)
        existing_ids[oid] = len(rows) - 1
        print(f"Inserted {oid}")

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
