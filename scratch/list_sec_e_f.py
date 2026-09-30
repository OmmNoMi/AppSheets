import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for row in reader:
        sec = row.get('Section', '')
        if 'Section E' in sec or 'Section F' in sec:
            col = row.get('Column', '')
            q_type = row.get('Type', '')
            prompt = row.get('English Prompt', '')
            print(f"[{sec[:9]}] {col} ({q_type}) : {prompt}")
