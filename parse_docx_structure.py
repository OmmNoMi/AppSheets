import re

with open('docx_text.txt', 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

sections = []
current_sec = None
current_q = None

for line in lines:
    if line.startswith('Section '):
        current_sec = {'title': line, 'questions': []}
        sections.append(current_sec)
        current_q = None
        continue
    
    q_match = re.match(r'^(Q\d+[\.\:]?\s*.*)', line)
    if q_match and current_sec:
        current_q = {'title': line, 'items': []}
        current_sec['questions'].append(current_q)
        continue
    
    if current_q:
        current_q['items'].append(line)

print(f"Total sections found: {len(sections)}")
for sec in sections:
    print(f"\n=== {sec['title']} ({len(sec['questions'])} questions) ===")
    for q in sec['questions']:
        print(f"  {q['title']} -> {len(q['items'])} lines/options")
        for it in q['items'][:3]:
            print(f"     * {it}")
        if len(q['items']) > 3:
            print(f"     ... (+{len(q['items'])-3} more)")
