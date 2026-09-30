import re

with open('Projects/Navi/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    txt = f.read()

types = set(re.findall(r'"\$type":\s*"([^"]+)"', txt))
for t in sorted(types):
    print(t)
