import json

with open('extracted_questions_and_options.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for s, qs in data.items():
    print(f"=== {s} ===")
    for q in qs.keys():
        print("  " + q)
