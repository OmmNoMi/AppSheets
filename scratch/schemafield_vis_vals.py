with open('projects/Navi/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = re.finditer(r'<table class="react-bridge-group" data-type="SchemaField"[^>]*>([\s\S]*?)</table>', text)
vals = set()
for m in matches:
    block = m.group(1)
    vm = re.search(r'for="Visibility"[^>]*>[^<]*</label>\s*</td>\s*<td>(.*?)</td>', block)
    if vm:
        vals.add(vm.group(1))
print("SchemaField Visibility values:", vals)
