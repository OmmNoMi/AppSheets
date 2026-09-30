import json

path = r'C:\Users\hardi\.gemini\antigravity\brain\827b3c72-f468-4ddf-ba03-95b5fbd70cf5\.system_generated\logs\transcript.jsonl'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        try:
            data = json.loads(line)
            time = data.get('created_at', '')
            if data.get('type') == 'USER_INPUT':
                print(f"[{time}] {data.get('content', '')[:120]}")
        except:
            pass
