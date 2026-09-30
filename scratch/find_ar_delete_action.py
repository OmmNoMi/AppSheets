with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find the section in AppDoc.html that lists Actions/Controls
# Let's see how Controls are dumped in AppDoc.html
# Look for data-type="Controls"
matches = re.findall(r'<table class="react-bridge-group" data-type="Controls" data-index="(\d+)">([\s\S]*?)<\/table>', text)
print('Total action controls in AppDoc:', len(matches))

# Look for Delete on AttendanceRequest
for idx, body in matches:
    if 'AttendanceRequest' in body and 'Delete' in body:
        name_m = re.search(r'for="Name"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        type_m = re.search(r'for="ActionType"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        table_m = re.search(r'for="Table"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        settings_m = re.search(r'for="ActionSettings"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        cond_m = re.search(r'for="Condition"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        print(f"Index: {idx} | Name: {name_m.group(1) if name_m else '?'} | Type: {type_m.group(1) if type_m else '?'} | Table: {table_m.group(1) if table_m else '?'}")
        if settings_m:
            print(f"  Settings: {settings_m.group(1)[:200]}")
        if cond_m:
            print(f"  Condition: {cond_m.group(1)[:200]}")
