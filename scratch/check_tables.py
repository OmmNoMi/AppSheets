with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/master_database_setup_v2.gs', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = re.findall(r'\[\"(SEC_C_TBL_[^\"]+)\",\s*\"([^\"]+)\",\s*\"([^\"]+)\",\s*\"([^\"]+)\"', text)
for m in matches:
    print(m)
