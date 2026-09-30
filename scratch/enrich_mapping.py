import json

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_AUTHORITATIVE.tsv', 'r', encoding='utf-8') as f:
    av_lines = f.readlines()

av_headers = av_lines[0].strip().split('\t')
av_by_id = {}
for l in av_lines[1:]:
    parts = l.strip().split('\t')
    while len(parts) < len(av_headers): parts.append('')
    d = dict(zip(av_headers, parts))
    av_by_id[d['ID']] = d

with open('scratch/full_authoritative_survey_mapping.json', 'r', encoding='utf-8') as f:
    mapping = json.load(f)

for m in mapping:
    qid = m['AppVariable_ID']
    if qid in av_by_id:
        row = av_by_id[qid]
        if not m['Title_hi'] or m['Title_hi'] == '-':
            m['Title_hi'] = row.get('Title_hi', '')
        if not m['Title'] or m['Title'] == '-':
            m['Title'] = row.get('Title', '')

with open('scratch/full_authoritative_survey_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(mapping, f, indent=2, ensure_ascii=False)

print("Updated Title_hi across all rows!")
