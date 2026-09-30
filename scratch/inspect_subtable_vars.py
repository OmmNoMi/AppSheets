with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_COMPLETE.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

tables = ['Survey_Labor', 'Survey_Turnover', 'Survey_Capital', 'Survey_Loan', 'Survey_Business']
found = {}
for line in lines:
    for t in tables:
        if t in line:
            found.setdefault(t, []).append(line.strip())

for t, rows in found.items():
    print(f"=== {t} ({len(rows)} entries) ===")
    for r in rows[:5]:
        print("  ", r[:120])
