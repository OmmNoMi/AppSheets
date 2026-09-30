import os

for root, dirs, files in os.walk('projects/CmF_SHG_Women_Entrepreneurs'):
    for f in files:
        if f.endswith(('.js', '.gs', '.csv', '.md')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                txt = fp.read()
            if 'ऋण का स्रोत' in txt:
                print(p)
