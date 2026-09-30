with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re

# In AppDoc.html, look for the react-bridge-group data-type="Controls"
# Notice that Controls has data-index="354"
# Are Actions called Controls in AppSheet Redux, or DataActions?
print('Has "AppData.Actions":', 'AppData.Actions' in text)
print('Has "DataActions":', 'DataActions' in text)
print('Has "Controls":', 'Controls' in text)

# Let's check how many Controls are in AppDoc.html
ctrls = re.findall(r'data-type="Controls" data-index="(\d+)"', text)
print('Max Control index:', max([int(x) for x in ctrls]) if ctrls else 'None')
