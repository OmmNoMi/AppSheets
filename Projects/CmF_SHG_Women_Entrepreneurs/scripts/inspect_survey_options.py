import csv

appvars_path = 'projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv'
survey_path = 'projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv'

with open(appvars_path, encoding='utf-8') as f:
    appvar_rows = list(csv.DictReader(f))

with open(survey_path, encoding='utf-8-sig') as f:
    survey_rows = list(csv.DictReader(f))

id_map = {r['ID']: r for r in appvar_rows}

# Check all survey rows that have Enum or EnumList or options
enum_questions = []
for r in survey_rows:
    col = r['Column'].strip()
    qid = r['QuestionID'].strip()
    typ = r['Type'].strip()
    options_raw = r['Dropdown / Options'].strip()
    if typ in ('Enum', 'EnumList', 'VariableList') or (options_raw and '•' in options_raw):
        enum_questions.append({
            'num': r['#'],
            'col': col,
            'qid': qid,
            'type': typ,
            'section': r['Section'],
            'options_raw': options_raw
        })

print(f"Total Enum/EnumList/VariableList questions in Survey: {len(enum_questions)}")

missing_prompts = []
for q in enum_questions:
    if q['qid'] not in id_map:
        missing_prompts.append(q)

print(f"Missing QuestionPrompt in AppVariables: {len(missing_prompts)}")
if missing_prompts:
    for m in missing_prompts:
        print(f"  Missing: {m['num']} | {m['col']} | {m['qid']} | {m['type']}")

# For the ones present, let's verify their VariableList and Option items
ready_questions = []
for q in enum_questions:
    if q['qid'] in id_map:
        row = id_map[q['qid']]
        varlist = [x.strip() for x in row.get('VariableList', '').split(',') if x.strip()]
        missing_opts = [opt for opt in varlist if opt not in id_map]
        ready_questions.append({
            'col': q['col'],
            'qid': q['qid'],
            'type': q['type'],
            'section': q['section'],
            'opts_count': len(varlist),
            'missing_opts': missing_opts
        })

print(f"\nChecked {len(ready_questions)} questions:")
has_missing = False
for q in ready_questions:
    if q['missing_opts']:
        has_missing = True
        print(f"⚠️ {q['col']} ({q['qid']}) missing options: {q['missing_opts']}")

if not has_missing:
    print(" ALL question options are 100% matched and present in AppVariables!")

print("\nSummary by Section:")
sections = {}
for q in ready_questions:
    sec = q['section']
    sections[sec] = sections.get(sec, 0) + 1

for sec, count in sections.items():
    print(f"  {sec}: {count} dropdown columns")
