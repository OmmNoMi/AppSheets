with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

import re
matches = re.findall(r'<table class="react-bridge-group" data-type="SchemaField"[^>]*>([\s\S]*?)</table>', html)
print(f"Total SchemaField found: {len(matches)}")
if matches:
    # Print all labels in the first 2 fields
    for i in range(min(3, len(matches))):
        labels = re.findall(r'for="([^"]+)"', matches[i])
        print(f"Field {i} properties:", labels)
