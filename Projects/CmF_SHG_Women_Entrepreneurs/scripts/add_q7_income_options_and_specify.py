import csv

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

print(f"Initial rows: {len(rows)}")

# Define the new options and questions
new_items = [
    {
        'ID': 'INC_ANIMAL_SALE',
        'Table': 'Survey',
        'Column': 'IncomeSource',
        'Tags': 'IncomeSourceOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Sale of animals',
        'Description': 'Income from sale of livestock / animals',
        'UsedFor': 'Income Source Option',
        'Decimal': '',
        'EnumValue': 'Sale of animals',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'पशु बिक्री (जानवरों का बेचना)',
        'Title_raj': 'पशु बेचना / लेन-देन',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 08:45:00'
    },
    {
        'ID': 'INC_OTHER',
        'Table': 'Survey',
        'Column': 'IncomeSource',
        'Tags': 'IncomeSourceOption, SubOption',
        'ValueControl': 'Enum',
        'Title': 'Any other, specify',
        'Description': 'Any other source of household income',
        'UsedFor': 'Income Source Option',
        'Decimal': '',
        'EnumValue': 'Any other, specify',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'अन्य कोई स्रोत (विवरण दें)',
        'Title_raj': 'दूजो कोई स्रोत',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 08:45:00'
    },
    {
        'ID': 'Q_B_07_01',
        'Table': 'Survey',
        'Column': 'FamilyIncome_AnimalSale_Specify',
        'Tags': 'QuestionPrompt, SectionB, Order:35.1',
        'ValueControl': 'Text',
        'Title': 'Q7.1 Sale of animals (Specify details / type of animals)',
        'Description': 'Specify details and type of animals sold',
        'UsedFor': 'Survey Question',
        'Decimal': '35.1',
        'EnumValue': 'Q7.1 Sale of animals (Specify details / type of animals)',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'Q7.1 पशु बिक्री का विवरण (कौन से पशु / विवरण दें)',
        'Title_raj': 'Q7.1 पशु बिक्री रो विवरण (कुणसा पशु / ब्यौरो)',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 08:45:00'
    },
    {
        'ID': 'Q_B_07_02',
        'Table': 'Survey',
        'Column': 'FamilyIncomeSourcesOther',
        'Tags': 'QuestionPrompt, SectionB, Order:35.2',
        'ValueControl': 'Text',
        'Title': 'Q7.2 Any other source of income (Specify)',
        'Description': 'Specify any other source of family income',
        'UsedFor': 'Survey Question',
        'Decimal': '35.2',
        'EnumValue': 'Q7.2 Any other source of income (Specify)',
        'EnumList': '',
        'VariableList': '',
        'DateValue': '',
        'Photo': '',
        'URL': '',
        'File': '',
        'Title_hi': 'Q7.2 अन्य आय का स्रोत (विवरण दें)',
        'Title_raj': 'Q7.2 दूजी आमदनी रो स्रोत (ब्यौरो दो)',
        'ActionIcon': '',
        'LastEditBy': 'Antigravity',
        'LastEditOn': '09/26/2026 08:45:00'
    }
]

# All 14 Income options in exact order
all_14_income = [
    'INC_AGRI', 'INC_SALARY', 'INC_WAGES', 'INC_SELF_EMP', 'INC_NTFP', 'INC_DAIRY',
    'INC_ANIMAL_SALE', 'INC_ANIMAL_PROD', 'INC_FAMILY_ENT', 'INC_RESP_ENT',
    'INC_MNREGA', 'INC_PENSION', 'INC_RENT', 'INC_OTHER'
]
vlist_income = " , ".join(all_14_income)

existing_ids = {r['ID']: i for i, r in enumerate(rows)}

# Update Q_B_07_00
if 'Q_B_07_00' in existing_ids:
    idx = existing_ids['Q_B_07_00']
    rows[idx]['VariableList'] = vlist_income
    print(f"Updated Q_B_07_00 VariableList with 14 options")

# Insert items
for item in new_items:
    iid = item['ID']
    if iid in existing_ids:
        rows[existing_ids[iid]] = item
        print(f"Updated {iid}")
    else:
        # Insert near INC_DAIRY or Q_B_07_00
        if iid == 'INC_ANIMAL_SALE' and 'INC_DAIRY' in existing_ids:
            ins_pos = existing_ids['INC_DAIRY'] + 1
            rows.insert(ins_pos, item)
            # rebuild existing_ids
            existing_ids = {r['ID']: i for i, r in enumerate(rows)}
        elif iid == 'INC_OTHER' and 'INC_RENT' in existing_ids:
            ins_pos = existing_ids['INC_RENT'] + 1
            rows.insert(ins_pos, item)
            existing_ids = {r['ID']: i for i, r in enumerate(rows)}
        elif 'Q_B_07_00' in existing_ids:
            ins_pos = existing_ids['Q_B_07_00'] + 1
            rows.insert(ins_pos, item)
            existing_ids = {r['ID']: i for i, r in enumerate(rows)}
        else:
            rows.append(item)
            existing_ids = {r['ID']: i for i, r in enumerate(rows)}
        print(f"Inserted {iid}")

# Save AppVariables.csv
with open(appvar_path, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

print(f"Saved AppVariables.csv (Total rows: {len(rows)})")

# Save TSV
tsv_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_EXACT_SYNC.tsv'
with open(tsv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(rows)

# Also update SURVEY_QUESTIONS_TRILINGUAL_MASTER.csv
master_q_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_QUESTIONS_TRILINGUAL_MASTER.csv'
with open(master_q_path, 'r', encoding='utf-8-sig') as f:
    q_rows = list(csv.DictReader(f))

# Check if Q_B_07_01 and Q_B_07_02 are in master_q_path
q_ids = {r['ID']: i for i, r in enumerate(q_rows)}

if 'Q_B_07_00' in q_ids:
    q7_pos = q_ids['Q_B_07_00']
    
    if 'Q_B_07_01' not in q_ids:
        q_rows.insert(q7_pos + 1, {
            'ID': 'Q_B_07_01',
            'Column': 'FamilyIncome_AnimalSale_Specify',
            'Title': 'Q7.1 Sale of animals (Specify details / type of animals)',
            'Title_hi': 'Q7.1 पशु बिक्री का विवरण (कौन से पशु / विवरण दें)',
            'Title_raj': 'Q7.1 पशु बिक्री रो विवरण (कुणसा पशु / ब्यौरो)'
        })
    if 'Q_B_07_02' not in q_ids:
        q_rows.insert(q7_pos + 2, {
            'ID': 'Q_B_07_02',
            'Column': 'FamilyIncomeSourcesOther',
            'Title': 'Q7.2 Any other source of income (Specify)',
            'Title_hi': 'Q7.2 अन्य आय का स्रोत (विवरण दें)',
            'Title_raj': 'Q7.2 दूजी आमदनी रो स्रोत (ब्यौरो दो)'
        })

with open(master_q_path, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['ID', 'Column', 'Title', 'Title_hi', 'Title_raj'])
    writer.writeheader()
    writer.writerows(q_rows)

print(f"Updated SURVEY_QUESTIONS_TRILINGUAL_MASTER.csv with {len(q_rows)} questions")
