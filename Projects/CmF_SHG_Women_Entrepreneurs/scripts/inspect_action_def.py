with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

import re

pos = html.find('NAVIGATE_APP')
if pos != -1:
    tbl_start = html.rfind('<table', 0, pos)
    tbl_end = html.find('</table>', pos)
    table_content = html[tbl_start:tbl_end+8]
    rows = re.findall(r'<tr><td><label[^>]*>(.*?)</label></td><td>(.*?)</td></tr>', table_content)
    for r in rows:
        print(f"{r[0]}: {r[1]}")
