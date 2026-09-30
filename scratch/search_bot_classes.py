with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

for term in ['AppBot', 'AppProcess', 'AppEvent', 'RunActionNode', 'Jeenee.DataTypes', 'Behavior']:
    m = re.findall(term, text)
    print(f'{term}: {len(m)}')

# Search for the string "Process for AttendanceRequestApproval" in the rest of the file
matches = [m.start() for m in re.finditer(re.escape('Process for AttendanceRequestApproval'), text)]
print('Occurrences of Process for AttendanceRequestApproval:', len(matches), matches)
