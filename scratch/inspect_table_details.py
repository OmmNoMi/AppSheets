import json

with open(r"c:\Users\hardi\AppSheets\scratch\dump_3_respondents.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for tid, d in data.items():
    print(f"\n==================== {tid} ====================")
    print("Survey Respondent:", d['Survey'].get('RespondentName'))
    print("SubTable groups:", list(d['SubTable'].keys()))
    print("SubSubTable groups:", list(d['SubSubTable'].keys()))
    
    # Check Section B family counts
    if 'Q_B_05' in d['SubTable']:
        print("Family members (Q_B_05):", d['SubTable']['Q_B_05'])
    elif 'SubTable_Family' in d['SubTable']:
        print("Family members (SubTable_Family):", d['SubTable']['SubTable_Family'])
        
    # Check Section C Q6 Involvement
    inv = {k: v for k, v in d['SubSubTable'].items() if 'Involvement' in k}
    print(f"Involvement count: {len(inv)}")
    
    # Check Sourcing
    src = {k: v for k, v in d['SubTable'].items() if 'Sourcing' in k or 'Q_C_07' in k}
    print(f"Sourcing groups: {list(src.keys())}")
    for k, v in src.items():
        print(f"  {k}: {v}")
        
    # Check Sales channels
    sal = {k: v for k, v in d['SubTable'].items() if 'Sales' in k or 'Q_C_10' in k or 'Channel' in k}
    print(f"Sales channels groups: {list(sal.keys())}")
    for k, v in sal.items():
        print(f"  {k}: {v}")
        
    # Check Turnover
    turn = {k: v for k, v in d['SubSubTable'].items() if 'Turnover' in k}
    print(f"Turnover groups: {list(turn.keys())}")
    for k, v in turn.items():
        print(f"  {k}: {v}")
        
    # Check Capital Arranged & Loan usage
    cap = {k: v for k, v in d['SubSubTable'].items() if 'LoanUsage' in k or 'Capital' in k}
    print(f"Capital/Loan groups: {list(cap.keys())}")
    
    # Check Business Trajectory
    traj = {k: v for k, v in d['SubSubTable'].items() if 'BusinessChanges' in k or 'Trajectory' in k}
    print(f"Trajectory groups: {list(traj.keys())}")
    for k, v in traj.items():
        print(f"  {k}: {v}")

    # Check Competitors
    comp = {k: v for k, v in d['SubTable'].items() if 'Competitor' in k or 'Q_E_05' in k}
    print(f"Competitor groups: {list(comp.keys())}")
    for k, v in comp.items():
        print(f"  {k}: {v}")
