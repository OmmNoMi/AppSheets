import re

with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

print('File size:', len(text))
for kw in ['Bot', 'Process', 'Automation', 'Rule', 'Workflow', 'Rules', 'Behavior', 'AppProcess']:
    found = len(re.findall(re.escape(kw), text))
    print(f'{kw}: {found}')

# Search for the Process table we saw earlier: "Process for AttendanceRequestApproval"
for m in re.finditer(r'Process for AttendanceRequestApproval[^\<\>\"\n]*', text):
    print('Found process:', m.group(0)[:100])
