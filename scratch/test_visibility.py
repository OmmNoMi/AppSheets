with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
m = re.findall(r'for="Visibility"[^>]*>[^<]*</label>\s*</td>\s*<td>(.*?)</td>', text)
print("Unique Visibility values:", set(m))
