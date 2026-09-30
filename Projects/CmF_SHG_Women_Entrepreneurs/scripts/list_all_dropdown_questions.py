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
        enum_cols.append({'col': col, 'qid': qid, 'type': typ, 'is_multi': is_multi, 'sec': r['Section']})

print(f"Total dropdown questions in ALL_SURVEY_QUESTIONS: {len(enum_cols)}")
for i, c in enumerate(enum_cols, 1):
    print(f"{i:2d}. {c['col']:<32} | {c['qid']:<25} | multi={str(c['is_multi']):<5} | {c['sec'][:30]}")
