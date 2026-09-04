with open('projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for l in lines:
    if 'Section F' in l or 'smart phone' in l.lower() or 'qr code' in l.lower() or 'mobile banking' in l.lower():
        print(l.strip())
