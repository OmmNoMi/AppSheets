with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

target = 'Sync this LeaveAllocation Action - 1'
idx = text.find(target)
print('Found target:', idx)
if idx != -1:
    print(text[max(0, idx-300):idx+1500])
