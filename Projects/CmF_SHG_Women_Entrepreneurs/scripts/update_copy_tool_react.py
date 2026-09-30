import re
import json

with open('scripts/production_react_injector.js', 'r', encoding='utf-8') as f:
    react_script = f.read()

json_react_script = json.dumps(react_script)

with open('Display_Name_Copy_Tool.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace FULL_SCRIPT in Display_Name_Copy_Tool.html
marker_start = 'const FULL_SCRIPT = '
marker_end = ';\nfunction copyFullScript()'

start_idx = html.find(marker_start)
if start_idx != -1:
    end_idx = html.find(marker_end, start_idx)
    if end_idx != -1:
        new_html = html[:start_idx + len(marker_start)] + json_react_script + html[end_idx:]
        with open('Display_Name_Copy_Tool.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print('Successfully updated Display_Name_Copy_Tool.html!')
    else:
        print('marker_end not found!')
else:
    print('marker_start not found!')
