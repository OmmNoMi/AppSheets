with open('projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

for l in lines:
    if 'Section E' in l:
        print(l.strip())
