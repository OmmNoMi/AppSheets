import json

with open('extracted_questions_and_options.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for sec_name, questions in data.items():
    print(f"==================================================")
    print(f"{sec_name}")
    print(f"==================================================")
    for q_name, items in questions.items():
        print(f"\n[QUESTION] {q_name}")
        for idx, item in enumerate(items, 1):
            print(f"   ({idx}) {item}")
