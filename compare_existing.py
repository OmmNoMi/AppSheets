import csv
import json

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    existing_rows = list(reader)

print(f"Existing rows in AppVariables.csv: {len(existing_rows)}")

existing_ids = set()
for r in existing_rows:
    rid = r.get('ID') or r.get('\ufeffID', '')
    if rid:
        existing_ids.add(rid.strip())

print(f"Unique existing IDs: {len(existing_ids)}")

with open('extracted_questions_and_options.json', 'r', encoding='utf-8') as f:
    docx_data = json.load(f)

# Let's inspect which questions from docx exist in AppVariables.csv
for sec_name, questions in docx_data.items():
    print(f"\n=================== {sec_name} ===================")
    for q_text, opts in questions.items():
        # Match by text in existing titles
        matched_rows = [r for r in existing_rows if q_text.split('.')[0].strip() in (r.get('Title', ''))]
        if matched_rows:
            r0 = matched_rows[0]
            rid = r0.get('ID') or r0.get('\ufeffID')
            print(f"  [EXISTS] {q_text[:45]} -> ID: {rid}")
        else:
            print(f"  [MISSING] {q_text[:45]}")
