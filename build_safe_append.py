import csv
import json

# Read existing AppVariables.csv (the 770 production rows)
with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    existing_rows = list(reader)
    fieldnames = reader.fieldnames

existing_ids = set()
for r in existing_rows:
    rid = r.get('ID') or r.get('\ufeffID', '')
    if rid:
        existing_ids.add(rid.strip())

print(f"Loaded {len(existing_rows)} existing production rows. Unique IDs: {len(existing_ids)}")

# Let's inspect the headers
clean_headers = [h.replace('\ufeff', '') for h in fieldnames]
print("Headers:", clean_headers)
