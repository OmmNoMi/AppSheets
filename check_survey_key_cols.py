import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/Survey.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    survey_cols = next(reader)

cols_set = set(survey_cols)

print("Checking presence of key columns in Survey.csv:")
for c in ['MaterialSourcingPct', 'SalesChannelsPct', 'Sourcing_NearbyTown_Pct', 'SalesChannel_Online_Pct', 'ReasonsStartingBusiness', 'MonthlyRent', 'AnnualRent']:
    print(f"  {c}: {'EXISTS' if c in cols_set else 'NOT FOUND'}")
