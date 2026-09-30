with open('projects/Navi/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
pos = text.find('[Position]=')
if pos != -1:
    print(text[max(0, pos-400):min(len(text), pos+400)])
