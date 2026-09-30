import json

path = r'C:\Users\hardi\.gemini\antigravity\brain\d4653ad0-1406-43a7-951b-529bb7f164a9\.system_generated\logs\transcript.jsonl'
with open(path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        if data.get('type') == 'USER_INPUT':
            time = data.get('created_at', '')
            content = data.get('content', '')
            print(f"[{time}] {content[:150]}...")
