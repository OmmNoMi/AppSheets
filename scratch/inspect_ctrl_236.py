with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

pattern = '<table class="react-bridge-group" data-type="Controls" data-index="236">([\\s\\S]*?)<\\/table>'
m = re.search(pattern, text)
if m:
    print(m.group(1))
