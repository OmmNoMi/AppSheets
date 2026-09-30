with open('projects/Navi/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
pos = text.find('<td>ADVANCED</td>')
if pos != -1:
    print(text[max(0, pos-300):min(len(text), pos+400)])
