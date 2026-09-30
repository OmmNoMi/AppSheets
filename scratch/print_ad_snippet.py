with open(r'c:\Users\hardi\AppSheets\projects\Orbit\_AppDoc\AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

section_start = text.find('data-type="DataSchemas" data-index="19"')
print(text[section_start:section_start+3000])
