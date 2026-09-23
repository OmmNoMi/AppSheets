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
        enum_cols.append({'col': col, 'qid': qid, 'type': typ, 'is_multi': is_multi})

print(f"Total dropdown cols: {len(enum_cols)}")
empty_varlist = []
for c in enum_cols:
    row = id_map.get(c['qid'])
    if not row:
        print(f"❌ QID {c['qid']} NOT in AppVariables!")
    else:
        vl = row.get('VariableList', '').strip()
        if not vl:
            empty_varlist.append(c)

print(f"Cols with empty VariableList in AppVariables: {len(empty_varlist)}")
for e in empty_varlist:
    print(f"  {e['col']} ({e['qid']})")
