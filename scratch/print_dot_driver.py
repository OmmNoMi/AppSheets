with open('projects/Navi/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = re.finditer(r'<table class="react-bridge-group" data-type="SchemaField"[^>]*>([\s\S]*?)</table>', text)
for m in matches:
    block = m.group(1)
    if 'DOT Driver' in block:
        print("FOUND IT:")
        print(block)
        break
