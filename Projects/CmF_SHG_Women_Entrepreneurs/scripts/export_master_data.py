import os
import json
import pandas as pd

BASE_DIR = r"c:\Users\hardi\AppSheets"
CMF_DIR = os.path.join(BASE_DIR, r"projects\CmF_SHG_Women_Entrepreneurs")
REPORTS_DIR = os.path.join(CMF_DIR, "reports")

SURVEY_CSV = r"C:\Users\hardi\Downloads\WCH - Survey.csv"
SUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubTable.csv"
SUBSUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv"
APPVARS_CSV = r"C:\Users\hardi\Downloads\WCH - AppVariables.csv"

df_survey = pd.read_csv(SURVEY_CSV)
df_sub = pd.read_csv(SUBTABLE_CSV)
df_subsub = pd.read_csv(SUBSUBTABLE_CSV)
df_appvars = pd.read_csv(APPVARS_CSV)

appvar_map = {}
for _, r in df_appvars.iterrows():
    vid = str(r.get('ID', '')).strip()
    if vid:
        appvar_map[vid] = {
            'Title': str(r.get('Title', '')) if pd.notna(r.get('Title')) else '',
            'Title_hi': str(r.get('Title_hi', '')) if pd.notna(r.get('Title_hi')) else '',
            'EnumValue': str(r.get('EnumValue', '')) if pd.notna(r.get('EnumValue')) else ''
        }

def resolve_val(code):
    if pd.isna(code) or code is None:
        return ""
    code_str = str(code).strip()
    if "," in code_str:
        parts = [p.strip() for p in code_str.split(",")]
        return ", ".join([resolve_val(p) for p in parts if p])
    if code_str in appvar_map:
        ev = appvar_map[code_str]['EnumValue']
        t = appvar_map[code_str]['Title']
        if ev and ev != 'nan':
            return ev
        return t
    return code_str

targets = [
    ("KAT-3", "Pushpa_Bdhurv"),
    ("KUM-6", "Sunita_Sharma"),
    ("KUM-7", "Geeta_Devi"),
    ("KAT-7", "Urmila_Devi"),
    ("KUM-9", "Monika"),
    ("VRI-5", "Hina_Bairwa")
]

# 1. Summary sheet
summary_rows = []
for sid, cname in targets:
    r = df_survey[df_survey['ID'] == sid].iloc[0]
    summary_rows.append({
        'SurveyID': sid,
        'RespondentName': r.get('RespondentName'),
        'Phone': r.get('RespondentPhone') or r.get('ContactNumber'),
        'EnterpriseName': r.get('EnterpriseName'),
        'District': resolve_val(r.get('District')),
        'Block': resolve_val(r.get('Block')),
        'VillageGP': r.get('VillageGP'),
        'SHGName': r.get('SHGName'),
        'VOName': r.get('VOName'),
        'CLFName': r.get('CLFName'),
        'SHGMembershipYears': r.get('SHGMembershipYears'),
        'LeadershipRole': resolve_val(r.get('LeadershipRole')),
        'LeadershipYears': r.get('LeadershipYears'),
        'RelatedToCRP': resolve_val(r.get('RelatedToCRP')),
        'EPInterventionType': resolve_val(r.get('EPInterventionType')),
        'EnterpriseSetupYear': r.get('EnterpriseSetupYear'),
        'BusinessType': resolve_val(r.get('BusinessType')),
        'BusinessActivities': resolve_val(r.get('BusinessActivities')),
        'LoanReceivedYear': r.get('LoanReceivedYear'),
        'MaintainSeparateRecords': resolve_val(r.get('MaintainSeparateRecords')),
        'RegistrationsDocuments': resolve_val(r.get('RegistrationsDocuments')),
        'Age': resolve_val(r.get('RespondentAge')),
        'MaritalStatus': resolve_val(r.get('MaritalStatus')),
        'SocialCategory': resolve_val(r.get('SocialCategory')),
        'Education': resolve_val(r.get('EducationStatus')),
        'FamilyMembersCount': r.get('FamilyMemberCount'),
        'FamilyIncomeSources': resolve_val(r.get('FamilyIncomeSources')),
        'AnnualHouseholdIncome': resolve_val(r.get('AnnualHouseholdIncome')),
        'BusinessCycle': resolve_val(r.get('BusinessCycle')),
        'BusinessPlaceType': resolve_val(r.get('BusinessPlaceType')),
        'MonthlyRent': r.get('MonthlyRent'),
        'LocationConvenience': resolve_val(r.get('LocationConvenience')),
        'MarketingMethods': resolve_val(r.get('MarketingMethods')),
        'SellingMethods': resolve_val(r.get('SeasonalSalesMethod')),
        'RecordKeepingHabit': resolve_val(r.get('RecordKeepingHabit')),
        'RecordKeepingMethod': resolve_val(r.get('RecordKeepingMethod')),
        'SHGAssociationAssistance': resolve_val(r.get('SHGAssociationAssistance')),
        'FundingExperience': resolve_val(r.get('FundingExperience')),
        'HusbandFamilyResponse': resolve_val(r.get('HusbandFamilyResponse')),
        'MaterialSourcingComfort': resolve_val(r.get('MaterialSourcingComfort')),
        'CustomerPaymentRecovery': resolve_val(r.get('CustomerPaymentRecovery')),
        'CurrentChallenges': resolve_val(r.get('CurrentChallenges')),
        'CompetitorAdvantages': resolve_val(r.get('CompetitorAdvantages')),
        'FutureExpansionPlans': resolve_val(r.get('FutureExpansionPlans')),
        'AspirationBottlenecks': resolve_val(r.get('AspirationBottlenecks')),
        'FutureFundsRequired': resolve_val(r.get('FutureFundsRequired')),
        'AttendedTraining': resolve_val(r.get('AttendedTraining')),
        'MonthlyIncomeIncreaseByOSFSVEP': resolve_val(r.get('MonthlyIncomeIncreaseByOSFSVEP')),
        'CRPContributions': resolve_val(r.get('CRPContributions')),
        'ExpectationsFromScheme': resolve_val(r.get('ExpectationsFromScheme')),
        'SmartphoneOwnership': resolve_val(r.get('SmartphoneOwnership')),
        'UseQRUPI': resolve_val(r.get('UseQRUPI')),
        'QRDailyTransactions': resolve_val(r.get('QRDailyTransactions')),
        'SocialPlatformsUsed': resolve_val(r.get('SocialPlatformsUsed')),
        'SocialMediaFrequency': resolve_val(r.get('SocialMediaFrequency')),
        'BusinessOperationalStatus': resolve_val(r.get('BusinessOperationalStatus'))
    })
df_sum = pd.DataFrame(summary_rows)

# 2. Labor Involvement
labor_rows = []
inv_activities = [
    ("Purchase of material", "SubTable_Involvement_PurchaseMaterial"),
    ("Production", "SubTable_Involvement_Production"),
    ("Servicing", "SubTable_Involvement_Servicing"),
    ("Social media marketing", "SubTable_Involvement_Social_media"),
    ("Sale", "SubTable_Involvement_Sales"),
    ("Record keeping", "SubTable_Involvement_RecordKeeping")
]
for sid, cname in targets:
    sst = df_subsub[df_subsub['Survey'] == sid]
    for act_title, act_qg in inv_activities:
        fam_inv = sst[(sst['Question_Group'] == act_qg) & (sst['Question'] == 'SubSubTable_Involvement_Family')]
        fam_inv_val = resolve_val(fam_inv.iloc[0]['Answer_Enum']) if not fam_inv.empty and pd.notna(fam_inv.iloc[0]['Answer_Enum']) else "Not relevant"
        
        f_mem = sst[(sst['Question_Group'] == act_qg) & (sst['Question'] == 'SubSubTable_Involvement_Member')]
        f_mem_val = float(f_mem.iloc[0]['Answer_Number']) if not f_mem.empty and pd.notna(f_mem.iloc[0]['Answer_Number']) else 0
        
        h_mem = sst[(sst['Question_Group'] == act_qg) & (sst['Question'] == 'SubSubTable_Involvement_Hired')]
        h_mem_val = float(h_mem.iloc[0]['Answer_Number']) if not h_mem.empty and pd.notna(h_mem.iloc[0]['Answer_Number']) else 0
        
        sal = sst[(sst['Question_Group'] == act_qg) & (sst['Question'] == 'SubSubTable_Involvement_Salary')]
        sal_val = resolve_val(sal.iloc[0]['Answer_Enum']) if not sal.empty and pd.notna(sal.iloc[0]['Answer_Enum']) else "Not relevant"
        
        labor_rows.append({
            'SurveyID': sid,
            'Activity': act_title,
            'FamilyInvolvement': fam_inv_val,
            'FamilyMembersCount': f_mem_val,
            'HiredHelpCount': h_mem_val,
            'AmountPaidLast1Year': sal_val
        })
df_labor = pd.DataFrame(labor_rows)

# 3. Turnover & Profit
turnover_rows = []
for sid, cname in targets:
    sst = df_subsub[df_subsub['Survey'] == sid]
    for season, qg in [('Peak', 'SubTable_Turnover_Peak'), ('Average', 'SubTable_Turnover_Average'), ('Lean', 'SubTable_Turnover_Lean')]:
        dur = sst[(sst['Question_Group'] == qg) & (sst['Question'] == 'SubSubTable_Turnover_Duration')]
        dur_val = float(dur.iloc[0]['Answer_Number']) if not dur.empty and pd.notna(dur.iloc[0]['Answer_Number']) else 0
        
        sales = sst[(sst['Question_Group'] == qg) & (sst['Question'] == 'SubSubTable_Turnover_Sales')]
        sales_val = float(sales.iloc[0]['Answer_Number']) if not sales.empty and pd.notna(sales.iloc[0]['Answer_Number']) else 0
        
        inc = sst[(sst['Question_Group'] == qg) & (sst['Question'] == 'SubSubTable_Turnover_Income')]
        inc_val = float(inc.iloc[0]['Answer_Number']) if not inc.empty and pd.notna(inc.iloc[0]['Answer_Number']) else 0
        
        turnover_rows.append({
            'SurveyID': sid,
            'Season': season,
            'DurationMonths': dur_val,
            'MonthlySales': sales_val,
            'MonthlyNetProfit': inc_val
        })
df_turnover = pd.DataFrame(turnover_rows)

# 4. Capital Arranged & Usage
cap_sources = [
    ("Own Savings", "SubTable_LoanUsage_Own"),
    ("Financed by family member", "SubTable_LoanUsage_Family"),
    ("Profit from business", "SubTable_LoanUsage_Profit"),
    ("Mortgaged gold/silver", "SubTable_LoanUsage_Mortgaged"),
    ("Sold gold/silver", "SubTable_LoanUsage_Gold"),
    ("Loan from family", "SubTable_LoanUsage_FamilyLoan"),
    ("Loan from moneylender", "SubTable_LoanUsage_MoneyLender"),
    ("Loan from SHG", "SubTable_LoanUsage_SHG"),
    ("Loan from OSF/SVEP", "SubTable_LoanUsage_OSFLoan"),
    ("Subsidy/grant under OSF/SVEP", "SubTable_LoanUsage_OSFGrant"),
    ("Loan from private saving groups/BC", "SubTable_LoanUsage_LoanPrivate"),
    ("Loan from NBFC", "SubTable_LoanUsage_LoanNBFC"),
    ("Mudra loan", "SubTable_LoanUsage_Mudra"),
    ("Loan from banks", "SubTable_LoanUsage_Bank")
]
cap_rows = []
for sid, cname in targets:
    sst = df_subsub[df_subsub['Survey'] == sid]
    for c_title, c_qg in cap_sources:
        y1 = sst[(sst['Question_Group'] == c_qg) & (sst['Question'] == 'SubSubTable_CapitalArranged_FirstYear')]
        y1_v = float(y1.iloc[0]['Answer_Number']) if not y1.empty and pd.notna(y1.iloc[0]['Answer_Number']) else 0
        
        ym = sst[(sst['Question_Group'] == c_qg) & (sst['Question'] == 'SubSubTable_CapitalArranged_MidYear')]
        ym_v = float(ym.iloc[0]['Answer_Number']) if not ym.empty and pd.notna(ym.iloc[0]['Answer_Number']) else 0
        
        yc = sst[(sst['Question_Group'] == c_qg) & (sst['Question'] == 'SubSubTable_CapitalArranged_ThisYear')]
        yc_v = float(yc.iloc[0]['Answer_Number']) if not yc.empty and pd.notna(yc.iloc[0]['Answer_Number']) else 0
        
        yp = sst[(sst['Question_Group'] == c_qg) & (sst['Question'] == 'SubSubTable_CapitalArranged_ThisPending')]
        yp_v = float(yp.iloc[0]['Answer_Number']) if not yp.empty and pd.notna(yp.iloc[0]['Answer_Number']) else 0
        
        lu = sst[(sst['Question_Group'] == c_qg) & (sst['Question'] == 'SubTable_CapitalLoanUsage_LoanUsage')]
        lu_v = resolve_val(lu.iloc[0]['Answer_Enum']) if not lu.empty and pd.notna(lu.iloc[0]['Answer_Enum']) else "Not used the source"
        
        cap_rows.append({
            'SurveyID': sid,
            'Source': c_title,
            'FirstYearAmount': y1_v,
            'MidYearsAmount': ym_v,
            'CurrentYearAmount': yc_v,
            'PendingAmount': yp_v,
            'LoanUsage': lu_v
        })
df_cap = pd.DataFrame(cap_rows)

# 5. Business Trajectory Changes
traj_rows = []
metrics = [
    ("Average sales / month", "SubTable_BusinessChanges_AvSales"),
    ("Average monthly income / net profit", "SubTable_BusinessChanges_AvIncome"),
    ("Value of stock / finished goods", "SubTable_BusinessChanges_Value"),
    ("Value of enterprise assets", "SubTable_BusinessChanges_Assets")
]
for sid, cname in targets:
    sst = df_subsub[df_subsub['Survey'] == sid]
    for m_title, m_qg in metrics:
        y1 = sst[(sst['Question_Group'] == m_qg) & (sst['Question'] == 'SubSubTable_BusinessChanges_FirstYear')]
        y1_v = float(y1.iloc[0]['Answer_Number']) if not y1.empty and pd.notna(y1.iloc[0]['Answer_Number']) else 0
        
        cur = sst[(sst['Question_Group'] == m_qg) & (sst['Question'] == 'SubSubTable_BusinessChanges_CurrentYear')]
        cur_v = float(cur.iloc[0]['Answer_Number']) if not cur.empty and pd.notna(cur.iloc[0]['Answer_Number']) else 0
        
        delta = cur_v - y1_v
        pct_growth = ((cur_v - y1_v) / y1_v * 100) if y1_v > 0 else 0
        
        traj_rows.append({
            'SurveyID': sid,
            'Metric': m_title,
            'FirstYearAmount': y1_v,
            'CurrentYearAmount': cur_v,
            'AbsoluteGrowth': delta,
            'PercentageGrowth': round(pct_growth, 1)
        })
df_traj = pd.DataFrame(traj_rows)

# Save Master Excel
excel_out = os.path.join(REPORTS_DIR, "6_SHG_Entrepreneurs_Survey_Data_Master.xlsx")
with pd.ExcelWriter(excel_out, engine='openpyxl') as writer:
    df_sum.to_excel(writer, sheet_name='Survey_Summary', index=False)
    df_labor.to_excel(writer, sheet_name='Labor_Involvement', index=False)
    df_turnover.to_excel(writer, sheet_name='Turnover_NetProfit', index=False)
    df_cap.to_excel(writer, sheet_name='Capital_Arranged', index=False)
    df_traj.to_excel(writer, sheet_name='Business_Trajectory', index=False)

print(f"[OK] Generated Master Excel: {excel_out}")

# Save JSON exports
for sid, cname in targets:
    s_row = df_sum[df_sum['SurveyID'] == sid].to_dict(orient='records')[0]
    l_rows = df_labor[df_labor['SurveyID'] == sid].to_dict(orient='records')
    t_rows = df_turnover[df_turnover['SurveyID'] == sid].to_dict(orient='records')
    c_rows = df_cap[df_cap['SurveyID'] == sid].to_dict(orient='records')
    tr_rows = df_traj[df_traj['SurveyID'] == sid].to_dict(orient='records')
    
    full_export = {
        'SurveyID': sid,
        'Summary': s_row,
        'SectionC_LaborInvolvement': l_rows,
        'SectionC_TurnoverAndIncome': t_rows,
        'SectionD_CapitalArrangedAndLoanUsage': c_rows,
        'SectionD_BusinessTrajectory': tr_rows
    }
    j_file = os.path.join(REPORTS_DIR, f"{sid}_{cname}_data.json")
    with open(j_file, 'w', encoding='utf-8') as f:
        json.dump(full_export, f, indent=2, ensure_ascii=False)
    print(f"[OK] Generated JSON: {j_file}")
