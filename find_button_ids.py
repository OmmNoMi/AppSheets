import csv

with open('Projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        rid = r.get('ID', '')
        if any(k in rid for k in ['TBL_', 'LABOR', 'TURNOVER', 'CAP_ARRANGE', 'LOAN_USE', 'BUSINESS_CHANGES', 'SEC_C_TBL']):
            print(f"{rid:30} | {r['Title']:35} | {r['Title_hi']:30}")
