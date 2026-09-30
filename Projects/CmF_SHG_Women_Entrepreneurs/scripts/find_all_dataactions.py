import os, glob, re

matches = []
for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith(('.js', '.py', '.html', '.md', '.json')):
            p = os.path.join(root, f)
            try:
                with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                    for m in re.finditer(r'DataAction[A-Za-z0-9_]+', content):
                        matches.append((m.group(0), p))
            except:
                pass

types = set([m[0] for m in matches])
print("All DataAction types found in repo:")
for t in sorted(types):
    files_with_t = set([m[1] for m in matches if m[0] == t])
    print(f"  {t} (in {len(files_with_t)} files)")
