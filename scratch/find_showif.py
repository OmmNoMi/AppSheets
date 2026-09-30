import glob, re

for fpath in glob.glob('projects/**/AppDoc.html', recursive=True):
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    # find where Show_If is followed by something other than null
    matches = re.findall(r'Show_If[\\"\':\s]+([^,}\\"]+)', text)
    non_null = [x for x in matches if x != 'null']
    if non_null:
        print(fpath, len(non_null), non_null[:5])
