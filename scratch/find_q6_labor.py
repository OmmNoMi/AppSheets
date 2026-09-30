with open('projects/CmF_SHG_Women_Entrepreneurs/questionnaire_audit_and_separation_report.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

pos = text.find('Labor')
while pos != -1:
    print('--- MATCH ---')
    print(text[max(0, pos-100):min(len(text), pos+400)])
    pos = text.find('Labor', pos+200)
    if pos > 3000: break
