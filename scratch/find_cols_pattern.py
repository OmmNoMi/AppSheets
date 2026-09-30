with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Look for AttendanceDaily schema in AppDoc.html
m = re.search(r'data-type="DataSchemas"[^>]*>[\s\S]*?AttendanceDaily[\s\S]*?<\/table>', text)
if m:
    print('Found DataSchema table:')
    print(m.group(0)[:1000])

# Or search for "AttendanceDaily" in the context of column definitions
idx = text.find('id="column_AttendanceDaily_')
if idx != -1:
    print('Found column id:')
    print(text[idx:idx+500])
else:
    # search for "column_"
    cols = re.findall(r'id="column_([a-zA-Z0-9_]+)"', text[:100000])
    print('Sample column IDs:', cols[:10])
