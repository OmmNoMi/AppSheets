import os, glob, json

json_files = glob.glob('**/*.json', recursive=True)
for jf in json_files:
    if 'node_modules' in jf or '.git' in jf or '.vscode' in jf:
        continue
    try:
        with open(jf, 'r', encoding='utf-8', errors='ignore') as f:
            c = f.read()
            if 'NAVIGATE_APP' in c or 'DataAction' in c:
                print("Found in JSON file:", jf)
    except:
        pass
