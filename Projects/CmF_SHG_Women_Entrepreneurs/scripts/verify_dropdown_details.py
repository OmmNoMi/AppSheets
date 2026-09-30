import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', encoding='utf-8-sig') as f:
    survey_rows = list(csv.DictReader(f))

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', encoding='utf-8') as f:
    appvar_rows = list(csv.DictReader(f))

id_map = {r['ID']: r for r in appvar_rows}

enum_cols = []
for r in survey_rows:
    col = r['Column'].strip()
    qid = r['QuestionID'].strip()
    typ = r['Type'].strip()
    opts = r['Dropdown / Options'].strip()
    if typ in ('Enum', 'EnumList', 'VariableList') or (opts and '•' in opts):
        is_multi = (typ == 'EnumList')
        enum_cols.append({
            'num': r['#'],
            'col': col,
            'qid': qid,
            'type': 'EnumList' if is_multi else 'Enum',
            'is_multi': is_multi,
            'sec': r['Section']
        })

print(f"Total: {len(enum_cols)}")
for c in enum_cols:
    row = id_map[c['qid']]
    opts = [x.strip() for x in row['VariableList'].split(',') if x.strip()]
    sample_opts = ", ".join(opts[:3]) + ("..." if len(opts) > 3 else "")
    print(f"col: '{c['col']}', qid: '{c['qid']}', multi: {c['is_multi']}, opts: [{sample_opts}]")
