import glob

files = glob.glob('projects/CmF_SHG_Women_Entrepreneurs/**/*.csv', recursive=True)
for f in files:
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        for idx, line in enumerate(fp):
            if 'ExpectationsFromScheme' in line or 'expectation' in line.lower():
                print(f"{f}:{idx+1}: {line.strip()[:160]}")
