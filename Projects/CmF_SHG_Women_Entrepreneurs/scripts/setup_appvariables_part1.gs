function setupAppVariablesPart1() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var vSh = ss.getSheetByName("AppVariables") || ss.insertSheet("AppVariables");
  var vCols = ["ID", "Scope", "Name", "Category", "Type", "Label", "VariableList"];
  var rows = [
    ["ID", "Survey", "ID", "Metadata", "Text", "Survey Unique ID", ""],
    ["Status", "Survey", "Status", "Metadata", "Enum", "Survey Status", "DRAFT , COMPLETED , VERIFIED"],
    ["InvestigatorID", "Survey", "InvestigatorID", "Metadata", "Text", "Investigator ID / Name", ""],
    ["CreatedOn", "Survey", "CreatedOn", "Metadata", "DateTime", "Submission Timestamp", ""],
    ["Latitude", "Survey", "Latitude", "Metadata", "Decimal", "GPS Latitude", ""],
    ["Longitude", "Survey", "Longitude", "Metadata", "Decimal", "GPS Longitude", ""],
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
    ["MaintainSeparateRecords", "Survey", "MaintainSeparateRecords", "Section A", "Enum", "Q18. Do you maintain separate records for all the businesses?", "Yes , No"],
    ["RespondentPhone", "Survey", "RespondentPhone", "Section A", "Phone", "Q19. Respondent phone number", ""],
    ["RegistrationsDocuments", "Survey", "RegistrationsDocuments", "Section A", "EnumList", "Q20. Do you have the following registrations/documents?", "PAN card , Aadhar card , Udyam Aadhar , Shop and Establishment registration , FSSAI , Caste certificate , Income certificate"],
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
    ["ReasonsStartingBusiness", "Survey", "ReasonsStartingBusiness", "Section C", "EnumList", "Q1. Reasons for starting the business? (Multiselect)", "Family faced financial setback , Expenses rising needed alternate income , Always wanted own business , Learnt skill wanted own venture , Doing wage labour decided own venture , SHG members getting loans so decided to take , OSF/SVEP CRP encouraged me , CLF encouraged me , Any other (Specify)"],
    ["BusinessCycle", "Survey", "BusinessCycle", "Section C", "Enum", "Q2. Describe your business cycle?", "Operational regular hours all year , Operational when customer arrives all year , Both production and sales all year , Production and sale only on receiving order , Seasonal production and sale all year , Production and sale limited to few months , Any other, specify"],
    ["BusinessPlaceType", "Survey", "BusinessPlaceType", "Section C", "Enum", "Q3. What is the type of business place?", "Own , Rented"],
    ["MonthlyRent", "Survey", "MonthlyRent", "Section C", "Price", "Q4. If rented, what is monthly rent?", ""],
    ["LocationConvenience", "Survey", "LocationConvenience", "Section C", "Enum", "Q5. Is the location of your premise convenient for your customers?", "Yes location is very convenient , Yes changed location to get clients , No operate from home can't move , No can afford only this space , Any other, specify"],
    ["MaterialSourcingPct", "Survey", "MaterialSourcingPct", "Section C", "EnumList", "Q8. What percentage of material do you source from these places?", "Nearby town/district , Wholesale market within state , Wholesale market outside the state , Order online (Amazon/Meesho)"],
    ["MarketingMethods", "Survey", "MarketingMethods", "Section C", "EnumList", "Q9. How do you market your products/services? (Multiselect)", "Shop is only place I talk , Name board outside premises , Visit traders door to door , Talk in SHG meetings , Visit traders with samples , Wait for enquiries , Do not know how to market , Don't feel need to market , Any other, specify"],
    ["SeasonalSalesMethod", "Survey", "SeasonalSalesMethod", "Section C", "Enum", "Q10. In case of seasonal production, how do you sell your products/services?", "Not relevant , Produce as per last year sales , Visit traders door to door , Prior orders from traders , Sell in local haat/market , Sell in Saras fair , Use online platforms , Any other, specify"],
    ["SocialMediaForMarketing", "Survey", "SocialMediaForMarketing", "Section C", "Enum", "Q11. Do you use social media for marketing?", "Regularly share on WhatsApp , Regularly share on Instagram , Important but no smartphone , Don't know how to use , Don't have time , Don't want to use , Any other, specify"],
    ["SalesChannelsPct", "Survey", "SalesChannelsPct", "Section C", "EnumList", "Q12. What percentage of your products/services get sold through following channels?", "Online platforms , WhatsApp , Instagram , Your premise , Local traders/shopkeepers , Local haat/market , Saras fair"],
    ["RecordKeepingHabit", "Survey", "RecordKeepingHabit", "Section C", "Enum", "Q13. Do you maintain written records of business transactions?", "Always been doing it , Started after OSF/SVEP CRP training , Family member maintains , Hired help , Don't record regularly , Don't maintain any records"],
    ["RecordKeepingMethod", "Survey", "RecordKeepingMethod", "Section C", "Enum", "Q14. How do you maintain business transactions?", "Receipt book/bills , Purchase and sale register , Only debt register , Daily diary , Daily diary taught by CRP , Digital records (Mera Bill/Bahi Khata) , Don't record regularly , Family member maintains , Don't maintain record , Any other, specify"],
    ["SHGAssociationAssistance", "Survey", "SHGAssociationAssistance", "Section C", "EnumList", "Q16. How has the SHG association helped in your enterprise? (Multiselect)", "Attended skill training , Information from meetings , Registrations/documents made , Got subsidy/grant , Took loan to initiate , Take loans regularly , CRP guided setup , CRP helped Mudra loan , CRP helped bank loan"],
    ["MonthlyIncomeIncreaseByOSFSVEP", "Survey", "MonthlyIncomeIncreaseByOSFSVEP", "Section C", "Enum", "Q19. Monthly income increase directly due to OSF/SVEP loans?", "Upto Rs 2000 , Rs 2000 to Rs 3000 , Rs 3000 to Rs 4000 , Rs 4000 to Rs 5000 , Rs 5000 to Rs 6000 , Above Rs 6000 , Can't say"],
    ["FinancialHelpFromIncome", "Survey", "FinancialHelpFromIncome", "Section C", "EnumList", "Q21. How has the income from the enterprise helped you financially? (Multiselect)", "Don't ask money from husband/family , Biggest source of income for family , Education expenses for children , Pay family debts , Acquiring assets for family , Marriage expenses , Any other (Please specify)"]
  ];
  vSh.clear();
  vSh.getRange(1, 1, 1, vCols.length).setValues([vCols]).setBackground("#34a853").setFontColor("#fff").setFontWeight("bold");
  vSh.setRowHeight(1, 35).setFrozenRows(1);
  vSh.getRange(2, 1, rows.length, vCols.length).setValues(rows);
  SpreadsheetApp.getUi().alert("SUCCESS: AppVariables Part 1 (Sections A, B, C) written!");
}
