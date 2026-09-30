with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/divide_sections_exact_76q.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
# print columns in Section C, D, E, F, G, H, I
for sec in ['secA', 'secB', 'secC', 'secD', 'secE', 'secF', 'secG', 'secH', 'secI']:
    m = re.search(r'const ' + sec + r'Cols\s*=\s*\[(.*?)\];', text, re.DOTALL)
    if m:
        cols = [c.strip().strip("'\"") for c in m.group(1).split(',') if c.strip()]
        print(f"{sec}: {len(cols)} columns -> {cols[:6]} ...")
