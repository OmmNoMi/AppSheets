import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    r = csv.DictReader(f)
    for row in r:
        t = row.get('Type')
        if t in ('Enum', 'EnumList'):
            print(f"{row.get('Column'):<30} | {row.get('QuestionID'):<25} | {t}")
