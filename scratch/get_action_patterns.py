with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

for act_name in ['Sync this LeaveAllocation Action - 1', 'Change CheckIn & CheckOut Action - 1', 'Delete']:
    idx = text.find(f'Action name</label>\n          {act_name}')
    if idx == -1:
        idx = text.find(act_name)
    print(f"=== Action: {act_name} (idx: {idx}) ===")
    if idx != -1:
        # print snippet
        print(text[idx:idx+1200])
