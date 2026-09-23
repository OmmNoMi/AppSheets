import csv
from collections import defaultdict

sections = defaultdict(list)
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        col = r.get('Column')
        qid = r.get('QuestionID')
        sec = r.get('Section')
        eng = r.get('English Prompt')
        hi = r.get('Hindi Prompt')
        if col and qid:
            sections[sec].append({
                'col': col.strip(),
                'qid': qid.strip(),
                'eng': eng.strip() if eng else '',
                'hi': hi.strip() if hi else ''
            })

out = []
out.append("# OmmNoMi AppSheet Survey Engine — Display Name Formulas Reference\n")
out.append("This document contains all 227 column Display Name formulas for the `Survey` table in Google AppSheet.\n")
out.append("Each formula dynamically looks up the trilingual label from `AppVariables` based on the logged-in surveyor's language.\n\n")

for sec, items in sections.items():
    out.append(f"## {sec} ({len(items)} Columns)\n")
    out.append("| # | Column Name | Question / Meaning | AppSheet Display Name Formula |")
    out.append("|---|---|---|---|")
    for idx, item in enumerate(items, 1):
        col = item['col']
        qid = item['qid']
        eng = item['eng'][:60]
        formula = f"`=LOOKUP(\"{qid}\", \"AppVariables\", \"ID\", \"Label\")`"
        out.append(f"| {idx} | `{col}` | {eng} | {formula} |")
    out.append("\n---\n")

with open('ALL_DISPLAY_NAME_FORMULAS.md', 'w', encoding='utf-8') as f:
    f.write("\n".join(out))

print(f"Generated ALL_DISPLAY_NAME_FORMULAS.md with {sum(len(v) for v in sections.values())} formulas!")
