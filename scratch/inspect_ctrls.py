with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

for idx_target in ['236', '250']:
    pattern = f'<table class="react-bridge-group" data-type="Controls" data-index="{idx_target}">([\\s\\S]*?)<\\/table>'
    m = re.search(pattern, text)
    if m:
        print(f"=== Controls {idx_target} ===")
        print(m.group(1)[:1500])
