with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('Delete the AttendnaceDaily')
if idx != -1:
    print('Found action Delete the AttendnaceDaily:')
    print(text[idx-200:idx+2000])
