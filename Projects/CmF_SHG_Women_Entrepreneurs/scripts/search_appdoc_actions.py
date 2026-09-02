import os, glob, re, json

files = glob.glob('**/_AppDoc/AppDoc.html', recursive=True)
print("Files:", files)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    
    # Find all Action definitions
    # Look for ActionType or LINKTO or LINKTOFORM or DataActions
    idx = 0
    while True:
        pos = html.find('ActionType', idx)
        if pos == -1:
            break
        snippet = html[max(0, pos-200):min(len(html), pos+600)]
        print(f"=== Found in {filepath} at {pos} ===")
        print(snippet)
        print("="*50)
        idx = pos + 400
        if idx > pos + 2000: # just first few
            break
