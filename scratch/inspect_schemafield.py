with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
# Find a table with data-type="SchemaField"
m = re.findall(r'<table class="react-bridge-group" data-type="SchemaField"[^>]*>([\s\S]*?)</table>', text)
print("SchemaField count:", len(m))
if m:
    # check first 5
    for block in m[:5]:
        labels = re.findall(r'for="([^"]+)"', block)
        print("Labels:", labels)
