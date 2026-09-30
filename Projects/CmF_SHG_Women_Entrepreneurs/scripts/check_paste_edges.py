import json
f = open(r'C:\Users\hardi\.gemini\antigravity\brain\902768de-ef5a-4c8c-931d-d1e42bb1152b\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8')
for line in f:
    d = json.loads(line)
    if d.get('step_index') == 2038:
        c = d.get('content', '')
        print('START 200:')
        print(c[:200])
        print('END 200:')
        print(c[-200:])
        break
f.close()
