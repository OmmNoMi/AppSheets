import re

with open('projects/CmF_SHG_Women_Entrepreneurs/SHG_Women_AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

tables = re.findall(r'<h5 id="table_([^"]+)">', text)
print('Tables in AppDoc:', tables)

# Print columns for Survey table
m = re.search(r'<h5 id="table_Survey">([\s\S]*?)(?=<h5 id="table_|<div class="flexContainer pageBreak")', text)
if m:
    cols = re.findall(r'<h3[^>]*>Column \d+:\s*([^\<]+)</h3>', m.group(1))
    print(f'Total cols in Survey: {len(cols)}')
    for c in cols[:40]:
        print(' ', c.strip())
