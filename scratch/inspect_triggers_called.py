with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

idx = text.find('TriggersCalledFromApp')
print('Found TriggersCalledFromApp:', idx)
if idx != -1:
    print(text[idx-200:idx+2500])
