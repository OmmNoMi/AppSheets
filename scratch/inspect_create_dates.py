with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('Create Attendance Rows for these Dates Action - 1')
if idx != -1:
    print('Found action:')
    print(text[idx-200:idx+2500])
