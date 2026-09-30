with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find columns of AttendanceDaily
idx = text.find('table_AttendanceDaily')
if idx != -1:
    snippet = text[idx:idx+8000]
    cols = re.findall(r'id="table_AttendanceDaily_column_([^"]+)"', snippet)
    print('AttendanceDaily columns:', cols[:25])
    # Also check Employee vs EmployeeID
    for col in ['Employee', 'EmployeeID', 'Date', 'Status']:
        print(f"Has column '{col}':", f'table_AttendanceDaily_column_{col}' in text)
