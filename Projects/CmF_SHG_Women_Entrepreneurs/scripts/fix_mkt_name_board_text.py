import csv

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'

with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    fieldnames = reader.fieldnames
    rows = list(reader)

full_text = "I have name board outside my premises with details of my products/services"

for r in rows:
    if r['ID'] == 'MKT_NAME_BOARD':
        r['Title'] = full_text
        r['Description'] = full_text
        r['EnumValue'] = full_text
        r['Title_hi'] = 'दुकान/घर के बाहर बोर्ड लगा है जिस पर मेरे उत्पादों/सेवाओं का विवरण है'
        r['Title_raj'] = 'दुकान/घर रै बारै बोर्ड लाग्यो है जिण पै म्हारे माल/सेवावां रो ब्यौरो है'
        r['LastEditBy'] = 'Antigravity'
        r['LastEditOn'] = '09/26/2026 09:45:00'
        print(f"Updated MKT_NAME_BOARD to: {r['Title']}")

with open(appvar_path, 'w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)

tsv_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables_EXACT_SYNC.tsv'
with open(tsv_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, delimiter='\t')
    writer.writeheader()
    writer.writerows(rows)

print("Saved updated AppVariables.csv & AppVariables_EXACT_SYNC.tsv")
