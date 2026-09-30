import os, re

for root, dirs, files in os.walk('projects/CmF_SHG_Women_Entrepreneurs'):
    for f in files:
        if f.endswith(('.gs', '.csv', '.md', '.json', '.html')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
            if 'Business Activity' in content:
                print(p)
                for line in content.splitlines():
                    if 'Business Activity' in line:
                        print("  ", line[:120])
