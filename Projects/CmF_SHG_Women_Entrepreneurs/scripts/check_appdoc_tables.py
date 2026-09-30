import re

with open('SHG_Women_AppDoc.html', 'r', encoding='utf-8') as f:
    content = f.read()

# find Table names in AppDoc
tables = re.findall(r'<h[234][^>]*>\s*Table:\s*([A-Za-z0-9_ ]+)', content, re.IGNORECASE)
if not tables:
    tables = re.findall(r'Table Name:\s*([A-Za-z0-9_ ]+)', content, re.IGNORECASE)
if not tables:
    tables = re.findall(r'class="tableName">([^<]+)<', content)

print("Tables found:", tables[:20])
if not tables:
    # let's search for some known tables like Survey or AppVariables
    for m in re.finditer(r'(Survey|AppVariables|CapitalTrajectory|SeasonalTurnover)', content):
        print(m.group(0), m.start())
        break
