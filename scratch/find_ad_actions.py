import re

with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Search for actions on AttendanceDaily that have ActionType DELETE or similar
matches = re.findall(r'<table class="react-bridge-group" data-type="Controls"[^>]*>[\s\S]*?AttendanceDaily[\s\S]*?<\/table>', text)
print('Found AttendanceDaily controls:', len(matches))
for m in matches:
    name_m = re.search(r'for="Name"[^>]*><\/label><\/td><td>([^<]+)<\/td>', m)
    type_m = re.search(r'for="ActionType"[^>]*><\/label><\/td><td>([^<]+)<\/td>', m)
    if name_m and type_m:
        print(f"Action: {name_m.group(1)} | Type: {type_m.group(1)}")
