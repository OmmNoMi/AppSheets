with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_COMPLETE.csv', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

headers = lines[0].strip().split(',')
print("Headers:", headers)

print("\nSample Rows with Option tag:")
for line in lines[1:]:
    if 'Option' in line:
        parts = line.strip().split(',')
        if len(parts) >= 6:
            print(f"ID: {parts[0]} | Table: {parts[1]} | Col: {parts[2]} | Title: {parts[5][:30]}")
