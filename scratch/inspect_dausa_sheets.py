import pandas as pd

files = ['Dausa - Sheet1.csv', 'Dausa - Sheet4.csv', 'Dausa - Sheet3.csv', 'Dausa - Finance.csv']

for fname in files:
    path = f'C:/Users/hardi/Downloads/{fname}'
    df = pd.read_csv(path, header=None)
    print(f"\n{'='*30} {fname} ({df.shape[0]} rows, {df.shape[1]} cols) {'='*30}")
    for idx, row in df.iterrows():
        non_empty = [f"Col{c}: {str(v).strip()}" for c, v in enumerate(row) if pd.notna(v) and str(v).strip() not in ['', 'nan']]
        if non_empty:
            print(f"R{idx:3d} | " + " | ".join(non_empty))
