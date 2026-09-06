import csv
import json

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'
with open(appvar_path, 'r', encoding='utf-8-sig') as f:
    rows = list(csv.DictReader(f))

id_to_row = {r['ID']: r for r in rows if r.get('ID')}

# Map questions in Survey table or UsedFor containing Question
questions = []
for r in rows:
    used = r.get('UsedFor', '')
    tbl = r.get('Table', '')
    col = r.get('Column', '')
    if tbl == 'Survey' or 'Question' in used or r['ID'].startswith('Q_'):
        questions.append(r)

print(f"Total Questions Identified: {len(questions)}")

# Prepare detailed matrix
matrix = []
for q in questions:
    qid = q['ID']
    col = q.get('Column', '')
    tags = q.get('Tags', '')
    vtype = q.get('ValueControl', '')
    title_en = q.get('Title', '')
    title_hi = q.get('Title_hi', '')
    title_raj = q.get('Title_raj', '')
    vlist_str = q.get('VariableList', '')
    
    options = []
    if vlist_str:
        opt_ids = [o.strip() for o in vlist_str.split(',') if o.strip()]
        for oid in opt_ids:
            if oid in id_to_row:
                opt_row = id_to_row[oid]
                options.append({
                    'id': oid,
                    'enum_value': opt_row.get('EnumValue', ''),
                    'title': opt_row.get('Title', ''),
                    'title_hi': opt_row.get('Title_hi', ''),
                    'title_raj': opt_row.get('Title_raj', '')
                })
            else:
                options.append({
                    'id': oid,
                    'enum_value': oid,
                    'title': oid,
                    'title_hi': '',
                    'title_raj': ''
                })
                
    matrix.append({
        'id': qid,
        'column': col,
        'tags': tags,
        'type': vtype,
        'title_en': title_en,
        'title_hi': title_hi,
        'title_raj': title_raj,
        'options': options
    })

# Output JSON & CSV summary
out_json_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\SURVEY_QUESTIONS_AND_OPTIONS_MATRIX.json'
with open(out_json_path, 'w', encoding='utf-8') as f:
    json.dump(matrix, f, ensure_ascii=False, indent=2)

print(f"Exported JSON matrix to: {out_json_path}")
