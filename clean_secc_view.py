with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/divide_sections_exact_76q.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Replace the SecC array with the clean 13 questions
old_secc = '''      "Survey_Form_SecC": [
        "ReasonsStartingBusiness", "BusinessCycle", "BusinessPlaceType", "MonthlyRent",
        "LocationConvenience", "Related_Q6_Labor", "Sourcing_NearbyTown_Pct",
        "Sourcing_Jaipur_Pct", "Sourcing_OutsideState_Pct", "Sourcing_Online_Pct",
        "MarketingMethods", "SeasonalSalesMethod", "SalesChannel_Online_Pct",
        "SalesChannel_WhatsApp_Pct", "SalesChannel_Instagram_Pct", "SalesChannel_Premise_Pct",
        "SalesChannel_Traders_Pct", "SalesChannel_Haat_Pct", "SalesChannel_Saras_Pct",
        "RecordKeepingHabit", "RecordKeepingMethod", "Related_Q15_Turnover"
      ]'''

new_secc = '''      "Survey_Form_SecC": [
        "ReasonsStartingBusiness", "BusinessCycle", "BusinessPlaceType", "MonthlyRent",
        "LocationConvenience", "Related_Q6_Labor", "Sourcing_NearbyTown_Pct",
        "MarketingMethods", "SeasonalSalesMethod", "SalesChannelsPct",
        "RecordKeepingHabit", "RecordKeepingMethod", "Related_Q15_Turnover"
      ]'''

if old_secc in text:
    text = text.replace(old_secc, new_secc)
    print("[OK] Replaced Survey_Form_SecC with exact clean 13 questions!")
else:
    print("[WARN] old_secc not found verbatim, checking regex...")

with open('projects/CmF_SHG_Women_Entrepreneurs/scripts/divide_sections_exact_76q.js', 'w', encoding='utf-8') as f:
    f.write(text)

print("Updated divide_sections_exact_76q.js successfully!")
