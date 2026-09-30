function setupAppVariablesPart2() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var vSh = ss.getSheetByName("AppVariables") || ss.insertSheet("AppVariables");
  var vCols = ["ID", "Scope", "Name", "Category", "Type", "Label", "VariableList"];
  var rows = [
    ["HusbandFamilyResponse", "Survey", "HusbandFamilyResponse", "Section D", "EnumList", "Q1. How has been your husband's response towards your enterprise? (Multiselect)", "Running enterprise on own without husband support , Husband supports financially , Husband helps purchase and sales , Not supportive initially now helps , Full support of husband/family , Need help to run more effectively"],
    ["MaterialSourcingComfort", "Survey", "MaterialSourcingComfort", "Section D", "Enum", "Q2. What is your level of comfort in sourcing material?", "Travel alone and negotiate independently , Need travel companion negotiate independently , Family member handles purchase , CRP helps in sourcing , Want to source different places with support , Content to source from nearby"],
    ["CustomerPaymentRecovery", "Survey", "CustomerPaymentRecovery", "Section D", "Enum", "Q3. Are you able to recover money from customers?", "Don't face issues , Conduct only cash transactions , Eventually everyone pays , Learnt how to negotiate , Husband able to recover , Suffered losses due to debt"],
    ["FundingExperience", "Survey", "FundingExperience", "Section D", "EnumList", "Q4. What has been your experience in funding your business? (Multiselect)", "SHG loan sufficient , Regularly plough in earnings , SHG loan smaller than requirement , Moneylender/NBFI loan easily , Family members help , Don't prefer moneylender high interest , Don't prefer moneylender shorter repayment"],
    ["CurrentChallenges", "Survey", "CurrentChallenges", "Section D", "EnumList", "Q5. What are the challenges you are facing now? (Multiselect)", "OSF phased out affected funds , Need more funds to scale , Need large funds to renovate , Timely access before production , Support to access bigger market , Help in selling inventory , Help learning social media , Any other, specify"],
    ["Competitors_Same_Scale", "Survey", "Competitors_Same_Scale", "Section D", "Number", "Q6. Same business scale count in village", ""],
    ["Competitors_Smaller_Scale", "Survey", "Competitors_Smaller_Scale", "Section D", "Number", "Q6. Smaller business scale count in village", ""],
    ["Competitors_Higher_Scale", "Survey", "Competitors_Higher_Scale", "Section D", "Number", "Q6. Higher business scale count in village", ""],
    ["CompetitorAdvantages", "Survey", "CompetitorAdvantages", "Section D", "EnumList", "Q7. What advantage do you have over your competitors? (Multiselect)", "Better location , Operate from shop not home , Wide variety of products/services , Offer discounts and make profit , Better quality , Sell on credit , Less time to supply/deliver , Use social media , Any other, specify , Don't have any advantage"],
    ["FutureExpansionPlans", "Survey", "FutureExpansionPlans", "Section D", "EnumList", "Q8. What are your future plans to increase the scale of your business?", "Shift to better location , Make shop/premise attractive , Expand current business at same location , Open branch/second unit elsewhere , Diversify into related product/service , Start completely different second enterprise , Formalise business (registration/GST) , Move to online or wider markets , Hire more people , Hand over to family member , Satisfied with current scale , Shut down or exit , Any other, specify , Can't say"],
    ["AspirationBottlenecks", "Survey", "AspirationBottlenecks", "Section D", "EnumList", "Q9. What is holding you back from pursuing these aspirations? (Multiselect)", "Lack of capital/funds , Lack of family support/time , Lack of market access/demand , Lack of skills/training , Health or personal constraints , Nothing holding back , Any other, specify"],
    ["AttendedTraining", "Survey", "AttendedTraining", "Section E", "Enum", "Q1. Have you attended any training under SVEP/OSF?", "Yes , No"],
    ["TrainingDetails", "Survey", "TrainingDetails", "Section E", "Text", "Q2. If Yes, specify training details", ""],
    ["UsedTrainingComponent", "Survey", "UsedTrainingComponent", "Section E", "Enum", "Q3. Did you use any training component in your enterprise?", "Yes , No"],
    ["UsedTrainingDetails", "Survey", "UsedTrainingDetails", "Section E", "Text", "Q4. If Yes, specify training components used", ""],
    ["MonthlyIncomeBeforeLoan", "Survey", "MonthlyIncomeBeforeLoan", "Section E", "Price", "Q5. Income before the changes (Rs)", ""],
    ["MonthlyIncomeAfterLoan", "Survey", "MonthlyIncomeAfterLoan", "Section E", "Price", "Q5. Income after the changes (Rs)", ""],
    ["CRPContributions", "Survey", "CRPContributions", "Section E", "EnumList", "Q6. Contribution of SVEP/OSF CRP in enterprise? (Multiselect)", "Accessing subsidy , Getting necessary documents , Understood business plans , Critical feedback on idea , Trained on maintaining records , New ideas to increase income , Accessing bank loans , Communication skills , Marketing , Understand competitors"],
    ["ExpectationsFromScheme", "Survey", "ExpectationsFromScheme", "Section E", "Text", "Q7. What are your expectations from the SVEP/OSF scheme?", ""],
    ["SmartphoneOwnership", "Survey", "SmartphoneOwnership", "Section F", "Enum", "Q1. Do you own a smart phone?", "Yes , No , No but have access to smart phone"],
    ["UseQRUPI", "Survey", "UseQRUPI", "Section F", "Enum", "Q2. Do you use QR code/mobile banking for money transactions?", "Yes , No"],
    ["QRDailyTransactions", "Survey", "QRDailyTransactions", "Section F", "Enum", "Q3. Daily how many transactions are done using QR code/mobile banking?", "5-10 , 10-20 , 20-40 , More than 40"],
    ["QRNonUseReason", "Survey", "QRNonUseReason", "Section F", "Enum", "Q4. Reason for not using QR code/mobile banking", "Don't own smartphone , Not many customers use smart phone , Don't know how to use and monitor"],
    ["SocialPlatformsUsed", "Survey", "SocialPlatformsUsed", "Section F", "EnumList", "Q5. Which social media platforms do you use for your business? (Multiselect)", "Whatsapp , Instagram , Pinterest , Facebook , Snapchat , Don't use social media"],
    ["SocialPlatformUsageMode", "Survey", "SocialPlatformUsageMode", "Section F", "Enum", "Q6. How do you use these platforms in your business?", "Texts to ask prices and book orders , Share images to promote business , Share images to enquire vendor availability , Get new ideas and info , Don't use social media"],
    ["SocialMediaFrequency", "Survey", "SocialMediaFrequency", "Section F", "Enum", "Q7. How often do you use social media for your business?", "Daily , Twice or thrice a week , Four-five times a month , Only on occasions , Don't use social media"],
    ["OSFInterventionYear", "Survey", "OSFInterventionYear", "Section G", "Number", "Q1. In which year was the OSF intervention made?", ""],
    ["BusinessOperationalStatus", "Survey", "BusinessOperationalStatus", "Section G", "Enum", "Q2. Is your business still operational?", "Yes but the sale has reduced , Yes but the scale has increased , Yes, but the scale has remained the same , No"],
    ["BusinessClosureYear", "Survey", "BusinessClosureYear", "Section G", "Number", "Q2. If closed, specify year when it was closed", ""],
    ["ScalingDownClosingReasons", "Survey", "ScalingDownClosingReasons", "Section G", "Enum", "Q3. What are the reasons for scaling down the business/closing the business?", "Sales reduced no guidance , Needed more capital no loan , Banks refused loan , Unable to reach new customers , New competitors offering discounts , Any other, specify , Don't know"],
    ["SupportNeededForSustenance", "Survey", "SupportNeededForSustenance", "Section G", "Enum", "Q5. What kind of support could have helped you to manage your business?", "Continued access to OSF loan , Continued support by OSF CRPs , Any other, specify"]
  ];
  var lr = vSh.getLastRow();
  vSh.getRange(lr + 1, 1, rows.length, vCols.length).setValues(rows);
  SpreadsheetApp.getUi().alert("SUCCESS: AppVariables Part 2 (Sections D, E, F, G) appended!");
}
