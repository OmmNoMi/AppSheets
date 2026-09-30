with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'AppFormula', text)]
print(text[matches[0]-1200:matches[0]-600])
