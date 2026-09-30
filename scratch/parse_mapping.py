import json

with open('scratch/last_user_prompt.txt', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('survey table data and i want')
survey_text = text[:pos].strip()
appvar_text = text[pos + len('survey table data and i want'):].strip()

# Survey columns (handle tab separation and newlines)
survey_cols_raw = [c.strip() for c in survey_text.replace('\n', '\t').split('\t') if c.strip() and not c.startswith('<')]
# Deduplicate while preserving order
survey_cols = []
for c in survey_cols_raw:
    if c not in survey_cols:
        survey_cols.append(c)

print(f"Total unique Survey columns: {len(survey_cols)}")
print(survey_cols)

lines = appvar_text.split('\n')
header_line = lines[0]
# Clean up header
h_parts = [h.strip() for h in header_line.split('\t')]
# The first element might have "appverible id and tittle  ID"
if 'ID' in h_parts[0]:
    h_parts[0] = 'ID'

rows = []
for l in lines[1:]:
    if not l.strip():
        continue
    parts = [p.strip() for p in l.split('\t')]
    while len(parts) < len(h_parts):
        parts.append('')
    d = dict(zip(h_parts, parts))
    rows.append(d)

print(f"Total AppVariables rows: {len(rows)}")

# Build lookup by Column for Table == 'Survey'
col_to_row = {}
for r in rows:
    col = r.get('Column')
    tbl = r.get('Table')
    vc = r.get('ValueControl')
    tags = r.get('Tags', '')
    # If it's a question prompt or section header
    if tbl == 'Survey' or 'QuestionPrompt' in tags or 'Question' in tags:
        if col and col not in col_to_row:
            col_to_row[col] = r

# Let's map each Survey column to its AppVariable ID and Title
mapping = []
for c in survey_cols:
    matched = None
    if c in col_to_row:
        matched = col_to_row[c]
    else:
        # Search by partial or alternative name
        for r in rows:
            if r.get('Column') == c:
                matched = r
                break
    if matched:
        mapping.append({
            'Survey_Column': c,
            'AppVariable_ID': matched.get('ID', ''),
            'Title': matched.get('Title', ''),
            'ValueControl': matched.get('ValueControl', ''),
            'VariableList': matched.get('VariableList', ''),
            'Title_hi': matched.get('Title_hi', ''),
            'Title_raj': matched.get('Title_raj', '')
        })
    else:
        mapping.append({
            'Survey_Column': c,
            'AppVariable_ID': '-',
            'Title': '-',
            'ValueControl': '-',
            'VariableList': '-',
            'Title_hi': '-',
            'Title_raj': '-'
        })

print(f"Mapped {sum(1 for m in mapping if m['AppVariable_ID'] != '-')} / {len(survey_cols)} columns directly!")

# Print table
print("\n" + "="*100)
print(f"{'Survey Column':<32} | {'AppVariable ID':<18} | {'ValueControl':<12} | {'Title (Question Prompt)'}")
print("="*100)
for m in mapping:
    print(f"{m['Survey_Column']:<32} | {m['AppVariable_ID']:<18} | {m['ValueControl']:<12} | {m['Title'][:45]}")

with open('scratch/survey_to_appvariable_mapping.json', 'w', encoding='utf-8') as f_out:
    json.dump(mapping, f_out, indent=2, ensure_ascii=False)
