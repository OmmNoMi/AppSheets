import csv
import os

DATA_DIR = r"c:\Users\hardi\AppSheets\projects\CmF_SHG_Women_Entrepreneurs\data"
os.makedirs(DATA_DIR, exist_ok=True)

# 1. AppUser.csv
app_user_headers = ["ID", "Name", "Email", "Role", "District", "Status"]
app_user_data = [
    {"ID": "USER_001", "Name": "Nomeshwer Sharma", "Email": "nomeshwer@ommnomi.com", "Role": "ROLE_RESEARCHER", "District": "All", "Status": "Active"},
    {"ID": "USER_002", "Name": "Archana Londhe", "Email": "archana@cmf.org.in", "Role": "ROLE_RESEARCHER", "District": "All", "Status": "Active"},
    {"ID": "USER_003", "Name": "Shehnaz Jahan", "Email": "shehnaz.qa@cmf.org.in", "Role": "ROLE_SUPERVISOR", "District": "Jaipur / Central", "Status": "Active"},
    {"ID": "USER_004", "Name": "Krishna Singh", "Email": "krishna.lead@shaishavi.in", "Role": "ROLE_SUPERVISOR", "District": "All", "Status": "Active"},
    {"ID": "USER_005", "Name": "Churu Investigator", "Email": "surveyor.churu@cmf.org.in", "Role": "ROLE_INVESTIGATOR", "District": "Churu", "Status": "Active"},
    {"ID": "USER_006", "Name": "Dausa Investigator", "Email": "surveyor.dausa@cmf.org.in", "Role": "ROLE_INVESTIGATOR", "District": "Dausa", "Status": "Active"},
    {"ID": "USER_007", "Name": "Dungarpur Investigator", "Email": "surveyor.dungarpur@cmf.org.in", "Role": "ROLE_INVESTIGATOR", "District": "Dungarpur", "Status": "Active"},
    {"ID": "USER_008", "Name": "Baran Investigator", "Email": "surveyor.baran@cmf.org.in", "Role": "ROLE_INVESTIGATOR", "District": "Baran", "Status": "Active"},
]

# 2. AppViews.csv
app_views_headers = ["ID", "ViewName", "DisplayName", "Icon", "TargetRole", "SortOrder"]
app_views_data = [
    {"ID": "VIEW_01", "ViewName": "Survey_Primary", "DisplayName": "Entrepreneur Survey", "Icon": "assignment_turned_in", "TargetRole": "ROLE_INVESTIGATOR", "SortOrder": "1"},
    {"ID": "VIEW_02", "ViewName": "Supervisor_Audit", "DisplayName": "Quality Verification", "Icon": "fact_check", "TargetRole": "ROLE_SUPERVISOR", "SortOrder": "2"},
    {"ID": "VIEW_03", "ViewName": "SamplingFrame_View", "DisplayName": "District Quotas", "Icon": "analytics", "TargetRole": "ROLE_RESEARCHER", "SortOrder": "3"},
    {"ID": "VIEW_04", "ViewName": "AppVariables_View", "DisplayName": "Question Dictionary", "Icon": "menu_book", "TargetRole": "ROLE_RESEARCHER", "SortOrder": "4"},
]

# 3. AppSettings.csv
app_settings_headers = ["ID", "SettingName", "SettingValue", "Description"]
app_settings_data = [
    {"ID": "SETTING_01", "SettingName": "PilotTargetTotal", "SettingValue": "220", "Description": "Total quantitative sample quota"},
    {"ID": "SETTING_02", "SettingName": "DistrictTargetQuota", "SettingValue": "55", "Description": "Sample quota per pilot district"},
    {"ID": "SETTING_03", "SettingName": "NewEnterpriseFloorPct", "SettingValue": "50", "Description": "Minimum percentage floor for post-2024 new enterprises"},
    {"ID": "SETTING_04", "SettingName": "MinEnterpriseAgeYears", "SettingValue": "2", "Description": "Minimum enterprise operating age for eligibility"},
]

# 4. SamplingFrame.csv
sampling_frame_headers = ["ID", "DistrictName", "AgroZone", "EnterpriseDatasetRecords", "TargetQuota", "ModelCLFStatus", "TotalCLFs", "RegisteredCLFs", "NRETPFoundingDistrict"]
sampling_frame_data = [
    {"ID": "DIST_CHURU", "DistrictName": "Churu", "AgroZone": "Arid West (Desert)", "EnterpriseDatasetRecords": "921", "TargetQuota": "55", "ModelCLFStatus": "TRUE", "TotalCLFs": "26", "RegisteredCLFs": "26", "NRETPFoundingDistrict": "TRUE"},
    {"ID": "DIST_DAUSA", "DistrictName": "Dausa", "AgroZone": "Semi-Arid Central", "EnterpriseDatasetRecords": "493", "TargetQuota": "55", "ModelCLFStatus": "TRUE", "TotalCLFs": "23", "RegisteredCLFs": "21", "NRETPFoundingDistrict": "FALSE"},
    {"ID": "DIST_DUNGARPUR", "DistrictName": "Dungarpur", "AgroZone": "Southern Tribal Belt", "EnterpriseDatasetRecords": "211", "TargetQuota": "55", "ModelCLFStatus": "TRUE", "TotalCLFs": "34", "RegisteredCLFs": "30", "NRETPFoundingDistrict": "TRUE"},
    {"ID": "DIST_BARAN", "DistrictName": "Baran", "AgroZone": "Fertile East (Hadoti)", "EnterpriseDatasetRecords": "117", "TargetQuota": "55", "ModelCLFStatus": "TRUE", "TotalCLFs": "27", "RegisteredCLFs": "27", "NRETPFoundingDistrict": "TRUE"},
]

# 5. Survey.csv
survey_headers = [
    "ID", "SamplingID", "BlockName", "GramPanchyat", "VillageName", "CLFName",
    "EntrepreneurName", "ContactNumber", "EnterpriseTrade", "EnterpriseAgeCohort",
    "EnterpriseCategory", "Status", "InvestigatorID", "CreatedOn", "Latitude", "Longitude"
]
survey_data = [
    {
        "ID": "SRV_DEMO_001",
        "SamplingID": "DIST_CHURU",
        "BlockName": "Sardarshahar",
        "GramPanchyat": "Ratasar",
        "VillageName": "Ratasar",
        "CLFName": "Jai Ambe CLF",
        "EntrepreneurName": "Suman Devi",
        "ContactNumber": "9829012345",
        "EnterpriseTrade": "Tailoring & Boutique",
        "EnterpriseAgeCohort": "3-4 yrs",
        "EnterpriseCategory": "New",
        "Status": "Verified",
        "InvestigatorID": "USER_005",
        "CreatedOn": "2026-08-15 10:30:00",
        "Latitude": "28.4406",
        "Longitude": "74.4930"
    }
]

# 6. ProfileAgency.csv (Lens 1)
profile_headers = [
    "ID", "SurveyID", "CasteCategory", "EducationLevel", "OwnershipType",
    "EmploymentPattern", "SmartphoneUsage", "InstitutionalRole", "FirstGenStatus",
    "SHGAgeYears", "CreditDoseLevel"
]
profile_data = [
    {
        "ID": "PRF_DEMO_001",
        "SurveyID": "SRV_DEMO_001",
        "CasteCategory": "OBC",
        "EducationLevel": "Secondary",
        "OwnershipType": "Self",
        "EmploymentPattern": "Only Woman",
        "SmartphoneUsage": "Calls, Banking, SHG groups, UPI",
        "InstitutionalRole": "SHG Member",
        "FirstGenStatus": "First-generation entrepreneur",
        "SHGAgeYears": "3 - 5 years",
        "CreditDoseLevel": "3rd Credit Dose"
    }
]

# 7. BusinessInclination.csv (Lens 2)
business_headers = [
    "ID", "SurveyID", "PrimaryMotivation", "PushPullType", "TopBusinessChallenge",
    "CompetitorPerception", "GrowthAspiration3Yr"
]
business_data = [
    {
        "ID": "BIZ_DEMO_001",
        "SurveyID": "SRV_DEMO_001",
        "PrimaryMotivation": "Opportunity/Pull: Identified clear market gap",
        "PushPullType": "Opportunity (Pull)",
        "TopBusinessChallenge": "Working Capital Deficit",
        "CompetitorPerception": "Moderate Competition",
        "GrowthAspiration3Yr": "Expand to neighbouring villages & add embroidery machine"
    }
]

# 8. GenderObstacles.csv (Lens 2b)
gender_headers = [
    "ID", "SurveyID", "FacedGenderObstacles", "ObstacleAreas", "AdoptedSolutions"
]
gender_data = [
    {
        "ID": "GND_DEMO_001",
        "SurveyID": "SRV_DEMO_001",
        "FacedGenderObstacles": "Yes",
        "ObstacleAreas": "Safety & Mobility, Higher raw material cost",
        "AdoptedSolutions": "Husband handles wholesale purchase"
    }
]

# 9. EnterprisePerformance.csv (Lens 3)
perf_headers = [
    "ID", "SurveyID", "InitialStartCapital", "CurrentTotalCapital",
    "FinancingSourcesReceived", "MonthlySalesAvg", "MonthlyProfitAvg",
    "ProfitAllocation", "GrowthTrajectoryTag"
]
perf_data = [
    {
        "ID": "PRF_PERF_001",
        "SurveyID": "SRV_DEMO_001",
        "InitialStartCapital": "25000",
        "CurrentTotalCapital": "75000",
        "FinancingSourcesReceived": "SHG loan, CIF",
        "MonthlySalesAvg": "18000",
        "MonthlyProfitAvg": "6500",
        "ProfitAllocation": "Children's education, Reinvested in own enterprise",
        "GrowthTrajectoryTag": "High Growth"
    }
]

# 10. InstitutionalSupport.csv (Lens 4)
inst_headers = [
    "ID", "SurveyID", "TrainingReceived", "TrainingTypes",
    "PerceivedTrainingUtility", "MarketLinkageSupport", "WorkingCapitalSufficiency"
]
inst_data = [
    {
        "ID": "INS_DEMO_001",
        "SurveyID": "SRV_DEMO_001",
        "TrainingReceived": "Yes",
        "TrainingTypes": "Technical skill, Bookkeeping",
        "PerceivedTrainingUtility": "Very Useful",
        "MarketLinkageSupport": "Saras Mela",
        "WorkingCapitalSufficiency": "No"
    }
]

# 11. MultiSelect.csv (Universal Junction)
multi_headers = ["ID", "SurveyID", "QuestionID", "SelectedOptionID", "ModuleTag"]
multi_data = [
    {"ID": "MS_001", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_P_06_00", "SelectedOptionID": "OPT_USE_CALL", "ModuleTag": "Profile"},
    {"ID": "MS_002", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_P_06_00", "SelectedOptionID": "OPT_USE_BANK", "ModuleTag": "Profile"},
    {"ID": "MS_003", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_P_06_00", "SelectedOptionID": "OPT_USE_SHG", "ModuleTag": "Profile"},
    {"ID": "MS_004", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_P_06_00", "SelectedOptionID": "OPT_USE_UPI", "ModuleTag": "Profile"},
    {"ID": "MS_005", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_G_02_00", "SelectedOptionID": "OPT_GBO_SAFETY", "ModuleTag": "GenderObstacles"},
    {"ID": "MS_006", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_G_02_00", "SelectedOptionID": "OPT_GBO_MAT_COST", "ModuleTag": "GenderObstacles"},
    {"ID": "MS_007", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_G_03_00", "SelectedOptionID": "OPT_SOL_MALE_PURCH", "ModuleTag": "GenderObstacles"},
    {"ID": "MS_008", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_E_05_00", "SelectedOptionID": "OPT_PRF_EDU", "ModuleTag": "Performance"},
    {"ID": "MS_009", "SurveyID": "SRV_DEMO_001", "QuestionID": "Q_E_05_00", "SelectedOptionID": "OPT_PRF_BIZ_REINVEST", "ModuleTag": "Performance"},
]

# 12. SupervisorAudit.csv
audit_headers = ["ID", "SurveyID", "SupervisorID", "AuditDate", "AuditResult", "SpotCheckNotes", "GPSMatchConfirmed"]
audit_data = [
    {
        "ID": "AUD_001",
        "SurveyID": "SRV_DEMO_001",
        "SupervisorID": "USER_003",
        "AuditDate": "2026-08-16 14:15:00",
        "AuditResult": "Approved",
        "SpotCheckNotes": "Back-check completed. Enterprise age and credit dose verified with CLF register.",
        "GPSMatchConfirmed": "TRUE"
    }
]

TABLES = [
    ("AppUser.csv", app_user_headers, app_user_data),
    ("AppViews.csv", app_views_headers, app_views_data),
    ("AppSettings.csv", app_settings_headers, app_settings_data),
    ("SamplingFrame.csv", sampling_frame_headers, sampling_frame_data),
    ("Survey.csv", survey_headers, survey_data),
    ("ProfileAgency.csv", profile_headers, profile_data),
    ("BusinessInclination.csv", business_headers, business_data),
    ("GenderObstacles.csv", gender_headers, gender_data),
    ("EnterprisePerformance.csv", perf_headers, perf_data),
    ("InstitutionalSupport.csv", inst_headers, inst_data),
    ("MultiSelect.csv", multi_headers, multi_data),
    ("SupervisorAudit.csv", audit_headers, audit_data),
]

def main():
    print("Generating all CSV database templates for CmF SHG Women Entrepreneurs Study...")
    for filename, headers, rows in TABLES:
        filepath = os.path.join(DATA_DIR, filename)
        with open(filepath, mode="w", encoding="utf-8", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            for row in rows:
                writer.writerow(row)
        print(f"  [✓] Written {filename} ({len(rows)} row(s), {len(headers)} columns)")
    print("All 12 backend CSV data tables successfully generated.")

if __name__ == "__main__":
    main()
