import json

with open('scripts/production_react_injector.js', 'r', encoding='utf-8') as f:
    prod_script = f.read()

json_script = json.dumps(prod_script)

with open('Display_Name_Copy_Tool.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
in_script = False
for line in lines:
    if line.strip().startswith('const FULL_SCRIPT = '):
        new_lines.append(f'const FULL_SCRIPT = {json_script};\n')
    else:
        new_lines.append(line)

with open('Display_Name_Copy_Tool.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('Updated Display_Name_Copy_Tool.html with clean production React script!')
