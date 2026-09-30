import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for row in reader:
        col = row.get('Column', '')
        prompt = row.get('English Prompt', '')
        sec = row.get('Section', '')
        p_lower = prompt.lower()
        if 'if yes' in p_lower or 'if no' in p_lower or 'if other' in p_lower or 'if not' in p_lower:
            print(f"[{sec}] Col: {col} | Prompt: {prompt}")
