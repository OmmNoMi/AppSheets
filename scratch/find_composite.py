with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find COMPOSITE actions in AppDoc.html
m = re.findall(r'<table class="react-bridge-group" data-type="Controls"[^>]*>[\s\S]*?COMPOSITE[\s\S]*?<\/table>', text)
print('Total COMPOSITE action tables:', len(m))
if m:
    print('First COMPOSITE:')
    print(m[0])
