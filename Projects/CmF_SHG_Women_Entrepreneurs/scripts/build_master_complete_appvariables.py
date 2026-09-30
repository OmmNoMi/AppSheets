import csv

# 1. Read existing AppVariables.csv
with open('c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.reader(f)
    headers = next(reader)
    rows = list(reader)

existing_ids = set(r[0] for r in rows)
print(f"Initial rows in AppVariables.csv: {len(rows)}")

# 2. Check and merge missing rows from all TSVs
tsv_files = [
    'Missing_AppVariables_57_Rows.tsv',
    'Missing_AppVariables_26_Rows.tsv',
    'Missing_AppVariables_23_Rows.tsv'
]

added_count = 0
for tsv in tsv_files:
    path = 'c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/data/' + tsv
    try:
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.reader(f, delimiter='\t')
            t_headers = next(reader)
            for r in reader:
                if not r or not r[0]:
                    continue
                if r[0] not in existing_ids:
                    # Pad to headers length
                    while len(r) < len(headers):
                        r.append("")
                    # Ensure Label is populated if empty
                    if len(r) >= 22 and not r[21]:
                        r[21] = r[5] # copy Title to Label
                    rows.append(r[:len(headers)])
                    existing_ids.add(r[0])
                    added_count += 1
    except Exception as e:
        print(f"Error reading {tsv}: {e}")

print(f"Added {added_count} missing rows from TSVs. Total rows now: {len(rows)}")

# 3. Save master file
master_csv = 'c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_COMPLETE.csv'
with open(master_csv, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

# Also overwrite AppVariables.csv so it's always the latest
with open('c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

print(f"Successfully wrote {len(rows)} rows to AppVariables_MASTER_COMPLETE.csv and AppVariables.csv!")
