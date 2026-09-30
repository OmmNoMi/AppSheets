import glob, os

files = glob.glob('projects/CmF_SHG_Women_Entrepreneurs/**/*.csv', recursive=True)
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        lines = fp.readlines()
    for idx, l in enumerate(lines):
        ll = l.lower()
        if 'expectation' in ll or 'training' in ll or 'svep' in ll:
            print(f"{os.path.basename(f)} line {idx+1}: {l.strip()[:140]}")
