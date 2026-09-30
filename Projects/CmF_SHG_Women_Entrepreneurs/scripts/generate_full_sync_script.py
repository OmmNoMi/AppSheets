import json

# Define all questions with: ID, Scope, Name, Category, Type, Label, VariableList
variables_data = [
    # Metadata
    ["ID", "Survey", "ID", "Metadata", "Text", "Survey Unique ID", ""],
    ["Status", "Survey", "Status", "Metadata", "Enum", "Survey Status", "DRAFT , COMPLETED , VERIFIED"],
    ["InvestigatorID", "Survey", "InvestigatorID", "Metadata", "Text", "Investigator ID / Name", ""],
    ["CreatedOn", "Survey", "CreatedOn", "Metadata", "DateTime", "Submission Timestamp", ""],
    ["Latitude", "Survey", "Latitude", "Metadata", "Decimal", "GPS Latitude", ""],
    ["Longitude", "Survey", "Longitude", "Metadata", "Decimal", "GPS Longitude", ""],

    # Section A: Respondent & Enterprise Profile
    ["District", "Survey", "District", "Section A", "Enum", "Q1. District", "Baran , Churu , Dausa , Dungarpur , Jodhpur"],
    ["Block", "Survey", "Block", "Section A", "Enum", "Q2. Block", "Chhipabarod , Baran , Ratangarh , Sujangarh , Sikandra , Sagwara , Galiakot , Mandor , Luni , Shergadh"],
    ["VillageGP", "Survey", "VillageGP", "Section A", "Text", "Q3. Village/GP", ""],
    ["RespondentName", "Survey", "RespondentName", "Section A", "Text", "Q4. Respondent Name", ""],
    ["SHGName", "Survey", "SHGName", "Section A", "Text", "Q5. SHG Name", ""],
    ["VOName", "Survey", "VOName", "Section A", "Text", "Q6. VO Name", ""],
    ["CLFName", "Survey", "CLFName", "Section A", "Text", "Q7. CLF Name", ""],
    ["SHGMembershipYears", "Survey", "SHGMembershipYears", "Section A", "Number", "Q8. Years of SHG membership", ""],
    ["LeadershipRole", "Survey", "LeadershipRole", "Section A", "Enum", "Q9. Have you been in a leadership role in SHG/CLF/VO?", "Yes , No"],
    ["LeadershipYears", "Survey", "LeadershipYears", "Section A", "Number", "Q10. Years of experience in leadership roles?", ""],
    ["RelatedToCRP", "Survey", "RelatedToCRP", "Section A", "Enum", "Q11. Are you related to any of the SVEP/OSF CRP?", "Yes , No"],
    ["EPInterventionType", "Survey", "EPInterventionType", "Section A", "Enum", "Q12. Type of Enterprise Promotion (EP) intervention", "SVEP , OSF , OSF phased out , Don't know"],
    ["EnterpriseName", "Survey", "EnterpriseName", "Section A", "Text", "Q13. Enterprise Name", ""],
    ["EnterpriseSetupYear", "Survey", "EnterpriseSetupYear", "Section A", "Number", "Q14. Years of setting up enterprise", ""],
    ["LoanReceivedYear", "Survey", "LoanReceivedYear", "Section A", "Number", "Q15. Years of receiving SVEP/OSF loan?", ""],
    ["BusinessType", "Survey", "BusinessType", "Section A", "EnumList", "Q16. Type of business enterprise (Multiselect)", "Trading , Servicing , Manufacturing/production"],
    ["BusinessActivities", "Survey", "BusinessActivities", "Section A", "EnumList", "Q17. Main business activities of the enterprise (Multiselect)", "Vegetable/Fruit , Grocery , Fancy/Cosmetic/General store , Apparel/fabric , Electric goods , Stone shop , Agri-input retail , AI/breeding kits , Goat trading , Flour mill , Tailoring , Beauty parlour , Auto-mechanic/two-wheeler repair , E-mitra , Transport , Tent house , Mobile repair shop , Stone cutting , Sanitary napkin making , Handicraft , Dairy shop/Milk collection centre , Juice , Food processing (pickle/badi/papad making) , Food making (Sweets/Namkeen/hotel) , Sweet box making , Flag making , Leather products , Stone idols , Any other"],
    ["BusinessActivitiesOther", "Survey", "BusinessActivitiesOther", "Section A", "Text", "Q17. Main business activities - Other specify", ""],
    ["MaintainSeparateRecords", "Survey", "MaintainSeparateRecords", "Section A", "Enum", "Q18. Do you maintain separate records for all the businesses?", "Yes , No"],
    ["RespondentPhone", "Survey", "RespondentPhone", "Section A", "Phone", "Q19. Respondent phone number", ""],
    ["RegistrationsDocuments", "Survey", "RegistrationsDocuments", "Section A", "EnumList", "Q20. Do you have the following registrations/documents?", "PAN card , Aadhar card , Udyam Aadhar , Shop and Establishment registration , FSSAI , Caste certificate , Income certificate"],
    ["RegistrationsDocumentsOther", "Survey", "RegistrationsDocumentsOther", "Section A", "Text", "Q20. Registrations/documents - Other specify", ""],

    # Section B: Socio-Economic Profile
    ["RespondentAge", "Survey", "RespondentAge", "Section B", "Enum", "Q1. What is the age of the respondent?", "18-25 , 26-35 , 36-45 , 46-55 , Above 55"],
    ["MaritalStatus", "Survey", "MaritalStatus", "Section B", "Enum", "Q2. What is the marital status?", "Single , Married , Widowed , Separated , Divorced"],
    ["SocialCategory", "Survey", "SocialCategory", "Section B", "Enum", "Q3. What is the social category?", "SC , ST , OBC , General"],
    ["EducationStatus", "Survey", "EducationStatus", "Section B", "Enum", "Q4. What is the education status?", "Illiterate , Illiterate but able to calculate , Upto 5th , Upto 8th , Upto 10th , Upto 12th , Diploma , Graduate , B.Ed"],
    ["FamilyMemberCount", "Survey", "FamilyMemberCount", "Section B", "Number", "Q5. How many members are in the family?", ""],
    ["FamilyAdultsCount", "Survey", "FamilyAdultsCount", "Section B", "Number", "Q6. Details of family members - Adults (Above 18)", ""],
    ["FamilyChildrenCount", "Survey", "FamilyChildrenCount", "Section B", "Number", "Q6. Details of family members - Children", ""],
    ["FamilyTotalEarning", "Survey", "FamilyTotalEarning", "Section B", "Number", "Q6. Details of family members - Total earning members", ""],
    ["FamilyMaleEarning", "Survey", "FamilyMaleEarning", "Section B", "Number", "Q6. Details of family members - Male earning members", ""],
    ["FamilyFemaleEarning", "Survey", "FamilyFemaleEarning", "Section B", "Number", "Q6. Details of family members - Female earning members", ""],
    ["FamilyDisabledCount", "Survey", "FamilyDisabledCount", "Section B", "Number", "Q6. Details of family members - Members with disability", ""],
    ["FamilyIncomeSources", "Survey", "FamilyIncomeSources", "Section B", "EnumList", "Q7. What are your family's sources of income? (Multiselect)", "Agricultural income , Fixed Salary , Wages , Self employed , NTFP sale , Dairying , Animal products , Family/husband's enterprise , Respondent's enterprise , MNREGA , Pension , Rent from properties"],
    ["AnnualHouseholdIncome", "Survey", "AnnualHouseholdIncome", "Section B", "Enum", "Q8. What is your annual household income and monetary benefits?", "Less than Rs 80,000 , Rs 80,000 to Rs 1,20,000 , Rs 1,20,001 to Rs 1,60,000 , Rs 1,60,001 to Rs 2,00,000 , Rs 2,00,001 to Rs 2,40,000 , Rs 2,40,001 to Rs 2,80,000 , Rs 2,80,001 to Rs 3,20,000 , Rs 3,20,001 to Rs 3,60,000 , Rs 3,60,001 to Rs 4,00,000 , Above Rs 4,00,001"],

    # Section C: Enterprise Operations
    ["ReasonsStartingBusiness", "Survey", "ReasonsStartingBusiness", "Section C", "EnumList", "Q1. Reasons for starting the business? (Multiselect)", "Family faced financial setback , Expenses rising needed alternate income , Always wanted own business , Learnt skill wanted own venture , Doing wage labour decided own venture , SHG members getting loans so decided to take , OSF/SVEP CRP encouraged me , CLF encouraged me , Any other (Specify)"],
    ["ReasonsStartingBusinessOther", "Survey", "ReasonsStartingBusinessOther", "Section C", "Text", "Q1. Reasons for starting business - Other specify", ""],
    ["BusinessCycle", "Survey", "BusinessCycle", "Section C", "Enum", "Q2. Describe your business cycle?", "Operational regular hours all year , Operational when customer arrives all year , Both production and sales all year , Production and sale only on receiving order , Seasonal production and sale all year , Production and sale limited to few months , Any other"],
    ["BusinessCycleOther", "Survey", "BusinessCycleOther", "Section C", "Text", "Q2. Business cycle - Other specify", ""],
    ["BusinessPlaceType", "Survey", "BusinessPlaceType", "Section C", "Enum", "Q3. What is the type of business place?", "Own , Rented"],
    ["MonthlyRent", "Survey", "MonthlyRent", "Section C", "Price", "Q4. If rented, what is monthly rent?", ""],
    ["LocationConvenience", "Survey", "LocationConvenience", "Section C", "Enum", "Q5. Is the location of your premise convenient for your customers?", "Yes location is very convenient , Yes changed location to get clients , No operate from home can't move , No can afford only this space , Any other"],
    ["LocationConvenienceOther", "Survey", "LocationConvenienceOther", "Section C", "Text", "Q5. Location convenience - Other specify", ""],
    ["MaterialSourcingPct", "Survey", "MaterialSourcingPct", "Section C", "EnumList", "Q8. What percentage of material do you source from these places?", "Nearby town/district , Wholesale market within state , Wholesale market outside state , Order online (Amazon/Meesho)"],
    ["MarketingMethods", "Survey", "MarketingMethods", "Section C", "EnumList", "Q9. How do you market your products/services? (Multiselect)", "Shop is only place I talk , Name board outside premises , Visit traders door to door , Talk in SHG meetings , Visit traders with samples , Wait for enquiries , Do not know how to market , Don't feel need to market , Any other"],
    ["MarketingMethodsOther", "Survey", "MarketingMethodsOther", "Section C", "Text", "Q9. Marketing methods - Other specify", ""],
    ["SeasonalSalesMethod", "Survey", "SeasonalSalesMethod", "Section C", "Enum", "Q10. In case of seasonal production, how do you sell your products/services?", "Not relevant , Produce as per last year sales , Visit traders door to door , Prior orders from traders , Sell in local haat/market , Sell in Saras fair , Use online platforms , Any other"],
    ["SeasonalSalesOther", "Survey", "SeasonalSalesOther", "Section C", "Text", "Q10. Seasonal sales - Other specify", ""],
    ["SocialMediaForMarketing", "Survey", "SocialMediaForMarketing", "Section C", "Enum", "Q11. Do you use social media for marketing?", "Regularly share on WhatsApp , Regularly share on Instagram , Important but no smartphone , Don't know how to use , Don't have time , Don't want to use , Any other"],
    ["SocialMediaForMarketingOther", "Survey", "SocialMediaForMarketingOther", "Section C", "Text", "Q11. Social media marketing - Other specify", ""],
    ["SalesChannelsPct", "Survey", "SalesChannelsPct", "Section C", "EnumList", "Q12. What percentage of your products/services get sold through following channels?", "Online platforms , WhatsApp , Instagram , Your premise , Local traders/shopkeepers , Local haat/market , Saras fair"],
    ["RecordKeepingHabit", "Survey", "RecordKeepingHabit", "Section C", "Enum", "Q13. Do you maintain written records of business transactions?", "Always been doing it , Started after OSF/SVEP CRP training , Family member maintains , Hired help , Don't record regularly , Don't maintain any records"],
    ["RecordKeepingMethod", "Survey", "RecordKeepingMethod", "Section C", "Enum", "Q14. How do you maintain business transactions?", "Receipt book/bills , Purchase and sale register , Only debt register , Daily diary , Daily diary taught by CRP , Digital records (Mera Bill/Bahi Khata) , Don't record regularly , Family member maintains , Don't maintain record , Any other"],
    ["RecordKeepingOther", "Survey", "RecordKeepingOther", "Section C", "Text", "Q14. Record keeping - Other specify", ""],
    ["SHGAssociationAssistance", "Survey", "SHGAssociationAssistance", "Section C", "EnumList", "Q16. How has the SHG association helped in your enterprise? (Multiselect)", "Attended skill training , Information from meetings , Registrations/documents made , Got subsidy/grant , Took loan to initiate , Take loans regularly , CRP guided setup , CRP helped Mudra loan , CRP helped bank loan"],
    ["MonthlyIncomeIncreaseByOSFSVEP", "Survey", "MonthlyIncomeIncreaseByOSFSVEP", "Section C", "Enum", "Q19. Monthly income increase directly due to OSF/SVEP loans?", "Upto Rs 2000 , Rs 2000 to Rs 3000 , Rs 3000 to Rs 4000 , Rs 4000 to Rs 5000 , Rs 5000 to Rs 6000 , Above Rs 6000 , Can't say"],
    ["FinancialHelpFromIncome", "Survey", "FinancialHelpFromIncome", "Section C", "EnumList", "Q21. How has the income from the enterprise helped you financially? (Multiselect)", "Don't ask money from husband/family , Biggest source of income for family , Education expenses for children , Pay family debts , Acquiring assets for family , Marriage expenses , Any other"],
    ["FinancialHelpOther", "Survey", "FinancialHelpOther", "Section C", "Text", "Q21. Financial help - Other specify", ""],

    # Section D: Business Dynamics & Challenges
    ["HusbandFamilyResponse", "Survey", "HusbandFamilyResponse", "Section D", "EnumList", "Q1. How has been your husband's response towards your enterprise? (Multiselect)", "Running enterprise on own without husband support , Husband supports financially , Husband helps purchase and sales , Not supportive initially now helps , Full support of husband/family , Need help to run more effectively"],
    ["MaterialSourcingComfort", "Survey", "MaterialSourcingComfort", "Section D", "Enum", "Q2. What is your level of comfort in sourcing material?", "Travel alone and negotiate independently , Need travel companion negotiate independently , Family member handles purchase , CRP helps in sourcing , Want to source different places with support , Content to source from nearby"],
    ["CustomerPaymentRecovery", "Survey", "CustomerPaymentRecovery", "Section D", "Enum", "Q3. Are you able to recover money from customers?", "Don't face issues , Conduct only cash transactions , Eventually everyone pays , Learnt how to negotiate , Husband able to recover , Suffered losses due to debt"],
    ["FundingExperience", "Survey", "FundingExperience", "Section D", "EnumList", "Q4. What has been your experience in funding your business? (Multiselect)", "SHG loan sufficient , Regularly plough in earnings , SHG loan smaller than requirement , Moneylender/NBFI loan easily , Family members help , Don't prefer moneylender high interest , Don't prefer moneylender shorter repayment"],
    ["CurrentChallenges", "Survey", "CurrentChallenges", "Section D", "EnumList", "Q5. What are the challenges you are facing now? (Multiselect)", "OSF phased out affected funds , Need more funds to scale , Need large funds to renovate , Timely access before production , Support to access bigger market , Help in selling inventory , Help learning social media , Any other"],
    ["CurrentChallengesOther", "Survey", "CurrentChallengesOther", "Section D", "Text", "Q5. Challenges - Other specify", ""],
    ["Competitors_Same_Scale", "Survey", "Competitors_Same_Scale", "Section D", "Number", "Q6. Same business scale count in village", ""],
    ["Competitors_Smaller_Scale", "Survey", "Competitors_Smaller_Scale", "Section D", "Number", "Q6. Smaller business scale count in village", ""],
    ["Competitors_Higher_Scale", "Survey", "Competitors_Higher_Scale", "Section D", "Number", "Q6. Higher business scale count in village", ""],
    ["CompetitorAdvantages", "Survey", "CompetitorAdvantages", "Section D", "EnumList", "Q7. What advantage do you have over your competitors? (Multiselect)", "Better location , Operate from shop not home , Wide variety of products/services , Offer discounts and make profit , Better quality , Sell on credit , Less time to supply/deliver , Use social media , Any other , Don't have any advantage"],
    ["CompetitorAdvantagesOther", "Survey", "CompetitorAdvantagesOther", "Section D", "Text", "Q7. Competitor advantages - Other specify", ""],
    ["FutureExpansionPlans", "Survey", "FutureExpansionPlans", "Section D", "EnumList", "Q8. What are your future plans to increase the scale of your business?", "Shift to better location , Make shop/premise attractive , Expand current business at same location , Open branch/second unit elsewhere , Diversify into related product/service , Start completely different second enterprise , Formalise business (registration/GST) , Move to online or wider markets , Hire more people , Hand over to family member , Satisfied with current scale , Shut down or exit , Any other , Can't say"],
    ["FutureExpansionPlansOther", "Survey", "FutureExpansionPlansOther", "Section D", "Text", "Q8. Future plans - Other specify", ""],
    ["AspirationBottlenecks", "Survey", "AspirationBottlenecks", "Section D", "EnumList", "Q9. What is holding you back from pursuing these aspirations? (Multiselect)", "Lack of capital/funds , Lack of family support/time , Lack of market access/demand , Lack of skills/training , Health or personal constraints , Nothing holding back , Any other"],
    ["AspirationBottlenecksOther", "Survey", "AspirationBottlenecksOther", "Section D", "Text", "Q9. Aspiration bottlenecks - Other specify", ""],

    # Section E: Scheme Impact
    ["AttendedTraining", "Survey", "AttendedTraining", "Section E", "Enum", "Q1. Have you attended any training under SVEP/OSF?", "Yes , No"],
    ["TrainingDetails", "Survey", "TrainingDetails", "Section E", "Text", "Q2. If Yes, specify training details", ""],
    ["UsedTrainingComponent", "Survey", "UsedTrainingComponent", "Section E", "Enum", "Q3. Did you use any training component in your enterprise?", "Yes , No"],
    ["UsedTrainingDetails", "Survey", "UsedTrainingDetails", "Section E", "Text", "Q4. If Yes, specify training components used", ""],
    ["MonthlyIncomeBeforeLoan", "Survey", "MonthlyIncomeBeforeLoan", "Section E", "Price", "Q5. Income before the changes (Rs)", ""],
    ["MonthlyIncomeAfterLoan", "Survey", "MonthlyIncomeAfterLoan", "Section E", "Price", "Q5. Income after the changes (Rs)", ""],
    ["CRPContributions", "Survey", "CRPContributions", "Section E", "EnumList", "Q6. Contribution of SVEP/OSF CRP in enterprise? (Multiselect)", "Accessing subsidy , Getting necessary documents , Understood business plans , Critical feedback on idea , Trained on maintaining records , New ideas to increase income , Accessing bank loans , Communication skills , Marketing , Understand competitors"],
    ["CRPContributionDocDetails", "Survey", "CRPContributionDocDetails", "Section E", "Text", "Q6. Getting documents - Specify document details", ""],
    ["ExpectationsFromScheme", "Survey", "ExpectationsFromScheme", "Section E", "Text", "Q7. What are your expectations from the SVEP/OSF scheme?", ""],

    # Section F: Digital & Social Media
    ["SmartphoneOwnership", "Survey", "SmartphoneOwnership", "Section F", "Enum", "Q1. Do you own a smart phone?", "Yes , No , No but have access"],
    ["UseQRUPI", "Survey", "UseQRUPI", "Section F", "Enum", "Q2. Do you use QR code/mobile banking for money transactions?", "Yes , No"],
    ["QRDailyTransactions", "Survey", "QRDailyTransactions", "Section F", "Enum", "Q3. Daily how many transactions are done using QR code/mobile banking?", "5-10 , 10-20 , 20-40 , More than 40"],
    ["QRNonUseReason", "Survey", "QRNonUseReason", "Section F", "Enum", "Q4. Reason for not using QR code/mobile banking", "Don't own smartphone , Not many customers use smartphone , Don't know how to use and monitor"],
    ["SocialPlatformsUsed", "Survey", "SocialPlatformsUsed", "Section F", "EnumList", "Q5. Which social media platforms do you use for your business? (Multiselect)", "Whatsapp , Instagram , Pinterest , Facebook , Snapchat , Don't use social media"],
    ["SocialPlatformUsageMode", "Survey", "SocialPlatformUsageMode", "Section F", "Enum", "Q6. How do you use these platforms in your business?", "Texts to ask prices and book orders , Share images to promote business , Share images to enquire vendor availability , Get new ideas and info , Don't use social media"],
    ["SocialMediaFrequency", "Survey", "SocialMediaFrequency", "Section F", "Enum", "Q7. How often do you use social media for your business?", "Daily , Twice or thrice a week , Four-five times a month , Only on occasions , Don't use social media"],

    # Section G: Post-Exit Status
    ["OSFInterventionYear", "Survey", "OSFInterventionYear", "Section G", "Number", "Q1. In which year was the OSF intervention made?", ""],
    ["BusinessOperationalStatus", "Survey", "BusinessOperationalStatus", "Section G", "Enum", "Q2. Is your business still operational?", "Yes but sale has reduced , Yes but scale has increased , Yes but scale remained same , No"],
    ["BusinessClosureYear", "Survey", "BusinessClosureYear", "Section G", "Number", "Q2. If closed, specify year when it was closed", ""],
    ["ScalingDownClosingReasons", "Survey", "ScalingDownClosingReasons", "Section G", "Enum", "Q3. What are the reasons for scaling down/closing the business?", "Sales reduced no guidance , Needed more capital no loan , Banks refused loan , Unable to reach new customers , New competitors offering discounts , Any other , Don't know"],
    ["ScalingDownOtherReason", "Survey", "ScalingDownOtherReason", "Section G", "Text", "Q3. Reasons for scaling down/closing - Other specify", ""],
    ["SupportNeededForSustenance", "Survey", "SupportNeededForSustenance", "Section G", "Enum", "Q5. What kind of support could have helped you to manage your business?", "Continued access to OSF loan , Continued support by OSF CRPs , Any other"],
    ["SupportNeededOther", "Survey", "SupportNeededOther", "Section G", "Text", "Q5. Support needed - Other specify", ""]
]

survey_cols = [v[0] for v in variables_data]

# Format variables as readable 1-line-per-entry array
lines = []
for v in variables_data:
    lines.append("    " + json.dumps(v))
formatted_vars = "[\n" + ",\n".join(lines) + "\n  ]"

gs_code = f"""// ==============================================================================
// OmmNoMi: Master Database & AppVariables Sync
// Exact 102 Questions, 100% Pure ASCII, Zero Truncation
// ==============================================================================
function syncMasterSurveyAndVariables() {{
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. EXACT SURVEY COLUMNS
  var surveyCols = {json.dumps(survey_cols)};

  // 2. CLEAN SURVEY TABLE (Preserve existing data)
  var sh = ss.getSheetByName("Survey") || ss.insertSheet("Survey");
  var lr = sh.getLastRow(), lc = sh.getLastColumn();
  var oldH = (lr >= 1 && lc >= 1) ? sh.getRange(1, 1, 1, lc).getValues()[0] : [];
  var oldD = (lr > 1) ? sh.getRange(2, 1, lr - 1, lc).getValues() : [];

  var newD = oldD.map(function(r) {{
    var m = {{}};
    oldH.forEach(function(h, i) {{ m[h] = r[i]; }});
    return surveyCols.map(function(c) {{
      if (m[c] !== undefined) return m[c];
      if (c === "RespondentPhone" && m["ContactNumber"] !== undefined) return m["ContactNumber"];
      if (c === "MonthlyRent" && m["AnnualRent"] !== undefined) return m["AnnualRent"];
      return "";
    }});
  }});

  sh.clear();
  sh.getRange(1, 1, 1, surveyCols.length).setValues([surveyCols]);
  sh.getRange(1, 1, 1, surveyCols.length).setBackground("#1a73e8").setFontColor("#fff").setFontWeight("bold");
  sh.setRowHeight(1, 35).setFrozenRows(1);
  if (newD.length > 0) sh.getRange(2, 1, newD.length, surveyCols.length).setValues(newD);

  // 3. POPULATE APPVARIABLES SHEET
  var vSh = ss.getSheetByName("AppVariables") || ss.insertSheet("AppVariables");
  var vCols = ["ID", "Scope", "Name", "Category", "Type", "Label", "VariableList"];
  var rawVars = {formatted_vars};

  vSh.clear();
  vSh.getRange(1, 1, 1, vCols.length).setValues([vCols]);
  vSh.getRange(1, 1, 1, vCols.length).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
  vSh.setRowHeight(1, 35).setFrozenRows(1);

  if (rawVars.length > 0) {{
    vSh.getRange(2, 1, rawVars.length, vCols.length).setValues(rawVars);
  }}

  // 4. VERIFY 5 SUB-TABLES
  var sub = {{
    "Survey_Labor": ["ID", "Survey_ID", "Activity", "Involvement_Type", "Family_Members_Count", "Hired_Help_Count", "Amount_Paid_Last_Year", "Remarks"],
    "Survey_Turnover": ["ID", "Survey_ID", "Season", "Duration_Months", "Monthly_Sales", "Monthly_Net_Profit", "Remarks"],
    "Survey_Capital_Arrangement": ["ID", "Survey_ID", "Source", "Amount_First_Year", "Amount_In_Between_Years", "Amount_Current_Year_2026_27", "Amount_Pending", "Remarks"],
    "Survey_Loan_Usage": ["ID", "Survey_ID", "Source", "Loan_Usage_Purpose", "Remarks"],
    "Survey_Business_Changes": ["ID", "Survey_ID", "Indicator_Heading", "First_Year_Value", "Current_Year_Value", "Remarks"]
  }};
  for (var k in sub) {{
    var s = ss.getSheetByName(k) || ss.insertSheet(k);
    if (s.getLastRow() === 0) {{
      s.getRange(1, 1, 1, sub[k].length).setValues([sub[k]]).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
      s.setRowHeight(1, 35).setFrozenRows(1);
    }}
  }}

  SpreadsheetApp.getUi().alert("SUCCESS: Survey (102 columns) and AppVariables fully updated!");
}}
"""

with open("c:/Users/hardi/AppSheets/Projects/CmF_SHG_Women_Entrepreneurs/scripts/master_survey_and_variables_update.gs", "w", encoding="ascii") as f:
    f.write(gs_code)

print("Regenerated master_survey_and_variables_update.gs successfully!")
