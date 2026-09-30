with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find columns in columns19Section
m = re.search(r'class="columns19Section">([\s\S]*?)<\/div>\s*<\/div>', text)
if m:
    cols = re.findall(r'<h3[^>]*>Column \d+:\s*([^<]+)<\/h3>', m.group(1))
    print('Total columns in AttendanceDaily:', len(cols))
    for i, c in enumerate(cols):
        print(f"  {i+1}: {c.strip()}")
