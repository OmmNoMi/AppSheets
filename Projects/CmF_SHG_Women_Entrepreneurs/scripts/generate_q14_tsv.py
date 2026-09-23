import csv

cols = ["ID", "Table", "Column", "Tags", "ValueControl", "Title", "Description", "UsedFor", "Decimal", "EnumValue", "EnumList", "VariableList", "DateValue", "Photo", "URL", "File", "Title_hi", "Title_raj", "ActionIcon", "LastEditBy", "LastEditOn"]

with open('data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

act_rows = [r for r in rows if r['ID'].startswith('ACT_') and r['ID'] != 'ACT_Complete' and not r['ID'].startswith('ACT_Profile') and not r['ID'].startswith('ACT_Operations') and not r['ID'].startswith('ACT_Challenges') and not r['ID'].startswith('ACT_Scheme') and not r['ID'].startswith('ACT_Digital') and not r['ID'].startswith('ACT_Post')]

with open('scripts/q14_activities_tsv.tsv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f, delimiter='\t')
    writer.writerow(cols)
    for r in act_rows:
        row_vals = [r.get(c, '') for c in cols]
        writer.writerow(row_vals)

print(f"Exported {len(act_rows)} activity rows to TSV.")
