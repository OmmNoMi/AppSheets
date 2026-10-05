import pandas as pd

df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - Survey.csv")
print(f"Total rows: {len(df)}")
for idx, r in df.iterrows():
    name = r.get("RespondentName", "")
    eid = r.get("ID", "")
    status = r.get("Status", "")
    dist = r.get("District", "")
    block = r.get("Block", "")
    village = r.get("VillageGP", "")
    ent = r.get("EnterpriseName", "")
    shg = r.get("SHGName", "")
    print(f"Row {idx:2d} | ID: {str(eid):8s} | Status: {str(status):10s} | Name: {str(name):20s} | District: {str(dist):15s} | Block: {str(block):15s} | Enterprise: {str(ent)}")
