import csv

with open('projects/CmF_SHG_Women_Entrepreneurs/data/AppVariables_VERBATIM_DOCX.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    rows = list(reader)

cols_to_check = ['ReasonsStartingBusiness', 'BusinessCycle', 'MarketingMethods', 'SeasonalSalesMethod', 'SHGAssociationAssistance', 'FundingExperience', 'HusbandFamilyResponse', 'FutureExpansionPlans', 'CRPContributions', 'SocialMediaForMarketing']

for col in cols_to_check:
    print(f"\n=================== {col} ===================")
    c_rows = [r for r in rows if r['Column'] == col]
    for r in c_rows:
        rid = r.get('ID') or r.get('\ufeffID')
        print(f"[{rid}] Title: {r['Title']}")
        print(f"       EnumValue: {r['EnumValue']}")
        print(f"       Hindi: {r['Title_hi']}")
        print(f"       Rajasthani: {r['Title_raj']}")
