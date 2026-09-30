import re, json, html

with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

matches = re.finditer(r'<h3[^>]*>Column \d+:\s*([^\<]+)</h3>([\s\S]*?)(?=<h3[^>]*>Column \d+:|<h5|$)', text)
count = 0
for m in matches:
    col = m.group(1).strip()
    block = m.group(2)
    tq_m = re.search(r'Type Qualifier</label>\s*</td>\s*<td>(.*?)</td>', block, re.DOTALL)
    if tq_m:
        try:
            data = json.loads(html.unescape(tq_m.group(1)))
            # check if data has Valid_If or EnumValues
            if 'Valid_If' in data or 'EnumValues' in data:
                print(f"Column: {col}")
                print(json.dumps(data, indent=2))
                count += 1
                if count >= 3:
                    break
        except Exception as e:
            pass
