import json

with open('extracted_questions_and_options.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for s, qs in data.items():
    print(f"\n=== {s} ===")
    for q, opts in qs.items():
        if opts:
            print(f"  {q[:50]} ({len(opts)} opts):")
            for o in opts[:3]:
                print(f"    - {o}")
            if len(opts) > 3:
                print(f"    ... +{len(opts)-3} more")
