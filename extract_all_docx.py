import json

with open('docx_text.txt', 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

# Let's inspect each section's questions and options
# We will write a script to extract all text under each Q
import re

sections = {}
curr_sec = None
curr_q = None

for l in lines:
    if l.startswith("Section "):
        curr_sec = l
        sections[curr_sec] = {}
        curr_q = None
        continue
    m = re.match(r'^(Q\d+[\.\:]?\s*.*)', l)
    if m and curr_sec:
        curr_q = l
        sections[curr_sec][curr_q] = []
        continue
    if curr_sec and curr_q:
        sections[curr_sec][curr_q].append(l)

with open('extracted_questions_and_options.json', 'w', encoding='utf-8') as f:
    json.dump(sections, f, ensure_ascii=False, indent=2)

print("Saved to extracted_questions_and_options.json")
for s, qs in sections.items():
    print(f"\n{s}: {len(qs)} questions")
    for q, opts in qs.items():
        print(f"  {q[:60]} -> {len(opts)} options")
