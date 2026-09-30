import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8', errors='ignore') as f:
    reader = csv.DictReader(f)
    for row in reader:
        sec = row.get('Section', '')
        col_name = row.get('Column', '')
        q_type = row.get('Type', '')
        prompt = row.get('English Prompt', '')
        opts = row.get('Dropdown / Options', '')
        
        if any(w in prompt.lower() for w in ['training', 'qr', 'smart phone', 'expectation', 'scheme', 'digital', 'media']):
            print(f"[{sec}] Col: {col_name} | Type: {q_type} | Prompt: {prompt[:70]}")
            if opts:
                print(f"   Options: {opts[:120]}")
