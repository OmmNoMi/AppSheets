import glob, re

for p in glob.glob('projects/CmF_SHG_Women_Entrepreneurs/scripts/*.js'):
    with open(p, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    matches = re.findall(r'[\'"][^\'"]*Business Activity[^\'"]*[\'"]', text)
    if matches:
        print(p, matches[:5])
