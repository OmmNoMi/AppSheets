with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('Process for AttendanceRequestApproval')
print('Index:', idx)
if idx != -1:
    snippet = text[max(0, idx-500):idx+2500]
    print(snippet)
