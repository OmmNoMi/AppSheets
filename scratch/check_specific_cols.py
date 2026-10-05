import pandas as pd

df = pd.read_csv(r"C:\Users\hardi\Downloads\WCH - Survey.csv")
targets = ['KAT-3', 'KUM-6', 'KUM-7']

cols_to_check = [
    'FamilyMemberCount', 'FamilyAdultsCount', 'FamilyChildrenCount', 'FamilyTotalEarning',
    'FamilyMaleEarning', 'FamilyFemaleEarning', 'FamilyDisabledCount',
    'MonthlyRent',
    'SalesChannel_Online_Pct', 'SalesChannel_WhatsApp_Pct', 'SalesChannel_Instagram_Pct',
    'SalesChannel_Premise_Pct', 'SalesChannel_Traders_Pct', 'SalesChannel_Haat_Pct', 'SalesChannel_Saras_Pct',
    'FinancialHelp_EducationAmt', 'FinancialHelp_DebtsAmt', 'FinancialHelp_AssetsAmt', 'FinancialHelp_MarriageAmt',
    'Challenge_OSFPhasedOutAmt', 'Challenge_ScaleUpFundAmt', 'Challenge_RenovationFundAmt', 'Challenge_TimelyInputsAmt', 'Challenge_InventoryHelpAmt', 'Challenge_Other',
    'Competitors_Similar_Scale', 'Competitors_Smaller_Scale', 'Competitors_Higher_Scale',
    'MonthlyIncomeBeforeLoan', 'MonthlyIncomeAfterLoan'
]

print("Survey specific columns check:")
for tid in targets:
    r = df[df['ID'] == tid].iloc[0]
    print(f"\n--- {tid} ({r.get('RespondentName')}) ---")
    for c in cols_to_check:
        if c in df.columns:
            val = r.get(c)
            if pd.notna(val):
                print(f"  {c}: {val}")
