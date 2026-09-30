with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# Find DataSchemas where Schema Name is AttendanceDaily_Schema
matches = re.finditer(r'<table class="react-bridge-group" data-type="DataSchemas" data-index="(\d+)">[\s\S]*?<td>([^<]+)<\/td>[\s\S]*?<\/table>', text)
schema_idx = None
for m in matches:
    idx = m.group(1)
    name = m.group(2)
    if 'AttendanceDaily' in name:
        print(f"DataSchema index: {idx}, Name: {name}")
        schema_idx = idx
        break

if schema_idx:
    # Now find the Attributes table for this DataSchema
    # Look for data-type="Attributes" or similar
    section_start = text.find(f'data-type="DataSchemas" data-index="{schema_idx}"')
    snippet = text[section_start:section_start+30000]
    col_names = re.findall(r'for="Name"[^>]*><\/label><\/td><td>([^<]+)<\/td>', snippet)
    print("Found columns in AttendanceDaily:", col_names[:30])
