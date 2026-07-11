import re, json
with open('parse_appdoc.py') as f:
    code = f.read()
    code = re.sub(r'if __name__ == .__main__.:.*', '', code, flags=re.DOTALL)
    exec(code)
with open('/Users/ommnomi/AppSheets/Projects/Transcend/Transcend-259840489 Documentation 0.000009.html', 'r', encoding='utf-8') as f:
    content = f.read()
tables = extract_tables(content)
all_cols = {t['name']: [c['name'] for c in extract_columns_for_schema(content, t['name'])] for t in tables}
t1 = set(all_cols['Therapy Intake'])
t2 = set(all_cols['FormIntake'])
overlap = t1 & t2
print(f'Therapy: {len(t1)}, Form: {len(t2)}, Overlap: {len(overlap)}')
print('Missing in FormIntake:', sorted(t1 - t2))
print('Missing in Therapy:', sorted(t2 - t1))
