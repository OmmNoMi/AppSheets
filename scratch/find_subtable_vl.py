import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_MASTER_COMPLETE.csv', 'r', encoding='utf-8', errors='ignore') as f:
    r = csv.DictReader(f)
    for row in r:
        id_ = row.get('ID', '')
        vl = row.get('VariableList', '')
        tbl = row.get('Table', '')
        col = row.get('Column', '')
        if vl and any(k in id_ or k in tbl or k in col for k in ['LABOR', 'TURN', 'CAP', 'LOAN', 'TRAJ', 'CHG', 'Q_C_17', 'Q_C_18', 'Q_C_20']):
            print(f"ID: {id_} | Tbl: {tbl} | Col: {col}")
            print(f"   VL: {vl[:120]}")
