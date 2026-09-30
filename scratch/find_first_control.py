with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find the heading right above the first data-type="Controls"
idx = text.find('data-type="Controls" data-index="0"')
if idx != -1:
    print('Found Controls data-index 0:')
    print(text[max(0, idx-500):idx+500])
