import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    existing_rows = list(reader)

print(f"Total existing rows: {len(existing_rows)}")

# Let's check how many rows each Table has
tables = {}
for r in existing_rows:
    t = r.get('Table', '')
    tables[t] = tables.get(t, 0) + 1
for t, cnt in tables.items():
    print(f"  Table '{t}': {cnt} rows")

# Let's inspect percentage rows currently in existing AppVariables.csv
pct_rows = [r for r in existing_rows if '%' in r.get('Title', '') or '%' in r.get('EnumValue', '') or 'Pct' in r.get('Column', '') or 'Percent' in r.get('ID', '')]
print(f"\nExisting Percentage rows: {len(pct_rows)}")
for r in pct_rows[:15]:
    rid = r.get('ID') or r.get('\ufeffID')
    print(f"ID: {rid:<25} | Col: {r.get('Column'):<25} | Title: {r.get('Title')[:40]} | Enum: {r.get('EnumValue')}")
