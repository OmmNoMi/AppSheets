import csv
import re

appvar_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data\AppVariables.csv'
setup_path = r'c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\scripts\master_one_hit_appsheet_setup.js'

appvars = {}
with open(appvar_path, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    headers = next(reader)
    id_idx = headers.index('ID')
    ctrl_idx = headers.index('ValueControl')
    title_idx = headers.index('Title')
    thi_idx = headers.index('Title_hi')
    traj_idx = headers.index('Title_raj')
    tags_idx = headers.index('Tags')
    for r in reader:
        cid = r[id_idx].strip()
        appvars[cid] = {
            'ctrl': r[ctrl_idx].strip(),
            'title': r[title_idx].strip(),
            'title_hi': r[thi_idx].strip(),
            'title_raj': r[traj_idx].strip(),
            'tags': r[tags_idx].strip()
        }

with open(setup_path, 'r', encoding='utf-8') as f:
    setup_code = f.read()

# Extract surveyCols
m = re.search(r'var surveyCols = \[([^\]]+)\];', setup_code, re.DOTALL)
if m:
    raw_cols = m.group(1)
    cols = re.findall(r"'([^']+)'", raw_cols)
    print(f'Total surveyCols in setup: {len(cols)}')
else:
    print('surveyCols not found')
