with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

pos = 21809978
# Find start of table
tbl_start = html.rfind('<table', 0, pos)
tbl_end = html.find('</table>', pos)
print(html[tbl_start:tbl_end+8])
