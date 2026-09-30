import json
import re

with open('docx_text.txt', 'r', encoding='utf-8') as f:
    docx_lines = [l.strip() for l in f.readlines() if l.strip()]

with open('survey_columns_map.json', 'r', encoding='utf-8') as f:
    cols_map = json.load(f)

print(f"Docx lines: {len(docx_lines)}, Cols map: {len(cols_map)}")

# Let's verify how each column maps to its docx question
for sec, qnum, prompt, col, ctype in cols_map[:25]:
    print(f"[{sec}] {qnum} -> {col} ({ctype}): '{prompt}'")
