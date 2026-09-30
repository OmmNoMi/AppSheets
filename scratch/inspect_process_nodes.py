with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find Process nodes in AppDoc.html
# Look for data-type="Nodes" or "AppProcesses"
idx = text.find('Process for AttendanceRequestApproval')
print('Index:', idx)
if idx != -1:
    snippet = text[idx:idx+15000]
    # find all node types and names
    nodes = re.findall(r'<table class="react-bridge-group" data-type="([^"]+)" data-index="(\d+)">([\s\S]*?)<\/table>', snippet)
    print('Found tables in process section:', len(nodes))
    for dt, d_idx, body in nodes[:15]:
        name_m = re.search(r'for="Name"[^>]*><\/label><\/td><td>([^<]+)<\/td>', body)
        print(f"data-type: {dt} | index: {d_idx} | name: {name_m.group(1) if name_m else '?'}")
