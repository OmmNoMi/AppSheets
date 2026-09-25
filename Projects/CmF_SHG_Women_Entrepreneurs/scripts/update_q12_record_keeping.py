import csv

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

all_10_rkt = [
    'RKT_RECEIPT_BILLS',
    'RKT_PURCHASE_SALE_REG',
    'RKT_ONLY_DEBT',
    'RKT_DAILY_DIARY',
    'RKT_CRP_DIARY',
    'RKT_DIGITAL_APPS',
    'RKT_NOT_REGULAR',
    'RKT_FAMILY_BOOK',
    'RKT_NO_RECORD',
    'RKT_OTHER'
]
vlist_rkt = " , ".join(all_10_rkt)

new_options = [
    {
        'ID': 'RKT_RECEIPT_BILLS',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Receipt book/bills',
        'Description': 'Receipt book or printed/written bills',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'Receipt book/bills',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'रसीद बुक / बिल',
        'Title_raj': 'रसीद बही / बिल',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_PURCHASE_SALE_REG',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'purchase and sale register',
        'Description': 'Purchase and sale register for business',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'purchase and sale register',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'क्रय-विक्रय (खरीद-बिक्री) रजिस्टर',
        'Title_raj': 'खरीद-बेचान रो रजिस्टर',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_ONLY_DEBT',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Only debt register',
        'Description': 'Only maintain debt / credit register (Udhar Khata)',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'Only debt register',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'केवल उधार / बही खाता रजिस्टर',
        'Title_raj': 'खाली उधारी रो खातो',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_DAILY_DIARY',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Maintain daily diary',
        'Description': 'Maintain daily handwritten diary',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'Maintain daily diary',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'दैनिक डायरी मेंटेन करती हूँ',
        'Title_raj': 'रोज री डायरी राखूं',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_CRP_DIARY',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Maintain daily diary as taught by OSF/SVEP CRP',
        'Description': 'Maintain daily diary as trained by CRP',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'Maintain daily diary as taught by OSF/SVEP CRP',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'OSF/SVEP CRP द्वारा सिखाए अनुसार दैनिक डायरी रखती हूँ',
        'Title_raj': 'सीआरपी दीदी रै सिखाये मुजब रोज डायरी राखूं',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_DIGITAL_APPS',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Maintain digital records using Mera Bill, Bahi Khata',
        'Description': 'Maintain digital records using bookkeeping apps',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'Maintain digital records using Mera Bill, Bahi Khata',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मेरा बिल, बही खाता जैसे ऐप से डिजिटल रिकॉर्ड रखती हूँ',
        'Title_raj': 'मेरा बिल / बही खाता ऐप सूं हिसाब राखूं',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_NOT_REGULAR',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Don’t record regularly',
        'Description': 'Do not record business transactions regularly',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'Don’t record regularly',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'नियमित रूप से रिकॉर्ड नहीं रखती',
        'Title_raj': 'रोज-रोज हिसाब कोनी राखूं',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_FAMILY_BOOK',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'My family member maintains a book',
        'Description': 'A family member maintains the accounts book',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'My family member maintains a book',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'परिवार का कोई सदस्य हिसाब की किताब रखता है',
        'Title_raj': 'घर रो कोई दूजो सदस्य हिसाब राखै',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_NO_RECORD',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'I don’t maintain any record',
        'Description': 'Do not maintain any records',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'I don’t maintain any record',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'मैं कोई रिकॉर्ड / हिसाब नहीं रखती',
        'Title_raj': 'म्हे कोई हिसाब-किताब कोनी राखां',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    },
    {
        'ID': 'RKT_OTHER',
        'Table': 'Survey',
        'Column': 'RecordKeepingMethod',
        'Tags': 'RecordKeepingOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Any other, specify',
        'Description': 'Any other record keeping method',
        'UsedFor': 'Record Keeping Option',
        'Decimal': '',
        'EnumValue': 'Any other, specify',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'अन्य कोई तरीका (विवरण दें)',
        'Title_raj': 'दूजो कोई तरीको (ब्यौरो दो)',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 10:35:00'
    }
]

existing_ids = {r['ID']: i for i, r in enumerate(rows)}

# Update Q_C_11_00 to OPT_YES, OPT_NO
if 'Q_C_11_00' in existing_ids:
    rows[existing_ids['Q_C_11_00']]['VariableList'] = 'OPT_YES , OPT_NO'
    rows[existing_ids['Q_C_11_00']]['ValueControl'] = 'Enum'

# Update Q_C_12_00
if 'Q_C_12_00' in existing_ids:
    idx = existing_ids['Q_C_12_00']
    rows[idx]['Title'] = 'Q12. How do you maintain business transactions?'
    rows[idx]['Description'] = 'Q12. How do you maintain business transactions?'
    rows[idx]['EnumValue'] = 'Q12. How do you maintain business transactions?'
    rows[idx]['Title_hi'] = 'Q12. आप व्यावसायिक लेन-देन का हिसाब कैसे रखती हैं?'
    rows[idx]['Title_raj'] = 'Q12. थे लेन-देन रो हिसाब कियां राखो हो?'
    rows[idx]['VariableList'] = vlist_rkt
    rows[idx]['ValueControl'] = 'EnumList'
    print("Updated Q_C_12_00 with 10 Record Keeping Options")

for opt in new_options:
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
