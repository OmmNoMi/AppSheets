import glob
import re

for f in glob.glob('projects/**/*.js', recursive=True):
    try:
        with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
            txt = fp.read()
            m = re.findall(r'ActionType[\'"]?\s*[:=]\s*[\'"]([^\'"]+)[\'"]', txt)
            if m:
                print(f, set(m))
    except Exception as e:
        pass
