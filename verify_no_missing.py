import csv
import json

with open('extracted_questions_and_options.json', 'r', encoding='utf-8') as f:
    docx_data = json.load(f)

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_VERBATIM_DOCX.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    appvar_titles = [r['Title'] for r in reader]

print('=== CHECKING ALL QUESTIONS FROM DOCX AFTER FIX ===')
missing_count = 0
for sec, qs in docx_data.items():
    print(f'\n--- {sec} ---')
    for q in qs.keys():
        q_clean = q.split('?')[0].split('(')[0].strip()
        matched = any(q_clean.lower() in t.lower() for t in appvar_titles)
        if matched:
            print(f'[FOUND] {q}')
        else:
            print(f'[MISSING] {q}')
            missing_count += 1

print(f'\nTotal Missing Questions: {missing_count}')
