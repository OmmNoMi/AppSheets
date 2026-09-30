with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find actions where Table is AttendanceDaily
matches = re.finditer(r'<h5 id="action_([^"]+)">[\s\S]*?<table class="react-bridge-group" data-type="Controls"[^>]*>([\s\S]*?)<\/table>', text)

for m in matches:
    act_name = m.group(1)
    body = m.group(2)
    if 'AttendanceDaily' in body:
        type_m = re.search(r'for="ActionType"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        table_m = re.search(r'for="Table"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        t_val = table_m.group(1) if table_m else '?'
        act_val = type_m.group(1) if type_m else '?'
        if t_val == 'AttendanceDaily':
            print(f'Action: {act_name} | Table: {t_val} | Type: {act_val}')
