"""
Provenance and Data Lineage Registry for CmF/RAJEEVIKA Women Entrepreneurs Dashboard.
Maps every question and analytical indicator to its exact source Google Sheets column,
master Excel workbook sheet, table number, and question type.
Strictly adheres to <= 300 lines per file policy and OmmNoMi standards.
"""

from typing import Dict, Any


def get_provenance_registry() -> Dict[str, Dict[str, str]]:
    """Returns the provenance mapping dictionary for all 28 survey tables & matrices."""
    return {
        'qContent_1': {
            'table_no': 'Table 1.0',
            'title': 'Leadership Role in SHG / VO / CLF',
            'source_col': 'In leadership role in SHG',
            'sheet_name': '1.0_SHG_Leadership',
            'category': 'Governance & SVEP',
            'type': 'Single-Select'
        },
        'qContent_2': {
            'table_no': 'Table 2.0',
            'title': 'Familial Relation with BDSP / SVEP CRPs',
            'source_col': 'In relation with BDSP/SVEP CRPs',
            'sheet_name': '2.0_CRP_Relation',
            'category': 'Governance & SVEP',
            'type': 'Single-Select'
        },
        'qContent_3': {
            'table_no': 'Table 3.0',
            'title': 'Business Categories (Trading / Service / Production)',
            'source_col': 'Business categories',
            'sheet_name': '3.0_Business_Categories',
            'category': 'Enterprise & Sectors',
            'type': 'Multi-Select'
        },
        'qContent_4': {
            'table_no': 'Table 4.0',
            'title': 'Access to Formal Registrations & Documents',
            'source_col': 'Access to registration/documents',
            'sheet_name': '4.0_Registrations_Docs',
            'category': 'Enterprise & Sectors',
            'type': 'Multi-Select'
        },
        'qContent_5': {
            'table_no': 'Table 5.0',
            'title': 'Age-Group Demographics',
            'source_col': 'Age-group',
            'sheet_name': '5.0_Age_Group',
            'category': 'Demographics',
            'type': 'Single-Select'
        },
        'qContent_6': {
            'table_no': 'Table 6.0',
            'title': 'Marital Status',
            'source_col': 'Marital status',
            'sheet_name': '6.0_Marital_Status',
            'category': 'Demographics',
            'type': 'Single-Select'
        },
        'qContent_7': {
            'table_no': 'Table 7.0',
            'title': 'Social Category (Caste Group)',
            'source_col': 'Social category',
            'sheet_name': '7.0_Social_Category',
            'category': 'Demographics',
            'type': 'Single-Select'
        },
        'qContent_8': {
            'table_no': 'Table 8.0',
            'title': 'Education Attainment Status',
            'source_col': 'Education status',
            'sheet_name': '8.0_Education_Status',
            'category': 'Demographics',
            'type': 'Single-Select'
        },
        'qContent_9': {
            'table_no': 'Table 9.0',
            'title': 'Family Members Count (Household Size)',
            'source_col': 'Family members',
            'sheet_name': '9.0_Family_Members',
            'category': 'Demographics',
            'type': 'Continuous (Binned)'
        },
        'qContent_10': {
            'table_no': 'Table 10.0',
            'title': 'Number of Earning Members in Family',
            'source_col': 'Earning members',
            'sheet_name': '10.0_Earning_Members',
            'category': 'Demographics',
            'type': 'Discrete Count'
        },
        'qContent_11': {
            'table_no': 'Table 11.0',
            'title': 'Annual Household Income',
            'source_col': 'Annual household income',
            'sheet_name': '11.0_Household_Income',
            'category': 'Demographics',
            'type': 'Single-Select'
        },
        'qContent_12': {
            'table_no': 'Table 12.0',
            'title': 'Access to Different Capital Sources',
            'source_col': 'Access to different sources of funds',
            'sheet_name': '12.0_Capital_Sources',
            'category': 'Capital & Financing',
            'type': 'Multi-Select'
        },
        'qContent_13': {
            'table_no': 'Table 13.0',
            'title': 'Purpose of Utilizing Arranged Capital / Loans',
            'source_col': 'Used the funds for following purpose',
            'sheet_name': '13.0_Loan_Usages',
            'category': 'Capital & Financing',
            'type': 'Multi-Select'
        },
        'qContent_14': {
            'table_no': 'Table 14.0',
            'title': 'Experience with Funding Sources',
            'source_col': 'Experience with existing sources',
            'sheet_name': '14.0_Funding_Experience',
            'category': 'Capital & Financing',
            'type': 'Multi-Select'
        },
        'qContent_15': {
            'table_no': 'Table 15.0',
            'title': 'Enterprise Income Relief & Family Welfare',
            'source_col': 'Usage of income from enterprise',
            'sheet_name': '15.0_Financial_Relief',
            'category': 'Capital & Financing',
            'type': 'Multi-Select (SubTable)'
        },
        'qContent_16': {
            'table_no': 'Table 16.0',
            'title': 'Future Fund Requirements for Expansion',
            'source_col': 'Fund requirements for future plan',
            'sheet_name': '16.0_Future_Funds',
            'category': 'Capital & Financing',
            'type': 'Single-Select'
        },
        'qContent_17': {
            'table_no': 'Table 17.0',
            'title': 'Attended SVEP / OSF Entrepreneurship Training',
            'source_col': 'Attending trainings under SVEP/OSF',
            'sheet_name': '17.0_Training_Attended',
            'category': 'Governance & SVEP',
            'type': 'Single-Select'
        },
        'qContent_18': {
            'table_no': 'Table 18.0',
            'title': 'Implemented Training Learnings in Enterprise',
            'source_col': 'Usage of training component in enterprise',
            'sheet_name': '18.0_Training_Usage',
            'category': 'Governance & SVEP',
            'type': 'Single-Select'
        },
        'qContent_19': {
            'table_no': 'Table 19.0',
            'title': 'Increase in Monthly Income Directly Due to SVEP/OSF',
            'source_col': 'Increase in monthly income due to SVEP/OSF loan',
            'sheet_name': '19.0_Income_Increase',
            'category': 'Capital & Financing',
            'type': 'Single-Select'
        },
        'qContent_20': {
            'table_no': 'Table 20.0',
            'title': 'Tangible Benefits & Support from SVEP/OSF CRPs',
            'source_col': 'Benefitting from SVEP/OSF',
            'sheet_name': '20.0_CRP_Benefits',
            'category': 'Governance & SVEP',
            'type': 'Multi-Select'
        },
        'qContent_21': {
            'table_no': 'Table 21.0',
            'title': 'Future Support Expectations from SVEP / OSF',
            'source_col': 'Expectation from SVEP/OSF',
            'sheet_name': '21.0_Expectations',
            'category': 'Governance & SVEP',
            'type': 'Multi-Select'
        },
        'qContent_22': {
            'table_no': 'Table 22.0',
            'title': 'Smartphone Ownership Status',
            'source_col': 'Own smart phone',
            'sheet_name': '22.0_Smartphone_Access',
            'category': 'Digital & Social',
            'type': 'Single-Select'
        },
        'qContent_23': {
            'table_no': 'Table 23.0',
            'title': 'Adoption of QR Code / Mobile Banking',
            'source_col': 'Use QR code or mobile banking for customer payments',
            'sheet_name': '23.0_QR_Adoption',
            'category': 'Digital & Social',
            'type': 'Single-Select'
        },
        'qContent_24': {
            'table_no': 'Table 24.0',
            'title': 'Daily Digital Transaction Volume',
            'source_col': 'No of transactions done through QR code daily',
            'sheet_name': '24.0_Daily_QR_Txns',
            'category': 'Digital & Social',
            'type': 'Single-Select'
        },
        'qContent_25': {
            'table_no': 'Table 25.0',
            'title': 'Social Media Orientation & Attitude',
            'source_col': 'Social media uses',
            'sheet_name': '25.0_Social_Media_Orientation',
            'category': 'Digital & Social',
            'type': 'Multi-Select'
        },
        'qContent_26': {
            'table_no': 'Table 26.0',
            'title': 'Social Media Platforms Used',
            'source_col': 'Social media plateforms used',
            'sheet_name': '26.0_Social_Platforms',
            'category': 'Digital & Social',
            'type': 'Multi-Select'
        },
        'qContent_27': {
            'table_no': 'Table 27.0',
            'title': 'Purpose & Modalities of Social Media Use',
            'source_col': 'How do you use social media for business',
            'sheet_name': '27.0_Social_Media_Purpose',
            'category': 'Digital & Social',
            'type': 'Multi-Select'
        },
        't28_vintage': {
            'table_no': 'Table 28.0',
            'title': 'Key Tenure & Vintage Indicators (Averages)',
            'source_col': 'Years of enterprise / Years of loan / Years in SHG',
            'sheet_name': '28.0_Tenure_Vintage',
            'category': 'Tenure & Matrix',
            'type': 'Calculated Averages'
        },
        'tblTopActivities': {
            'table_no': 'Table 3.1',
            'title': 'Top Enterprise Activities by Frequency',
            'source_col': 'SubTable_Activity / Activities',
            'sheet_name': '3.0_Business_Categories',
            'category': 'Enterprise & Sectors',
            'type': 'Activity Aggregation'
        },
        'tblCasteMatrix': {
            'table_no': 'Matrix 7.1',
            'title': 'Social Category Inclusivity Matrix',
            'source_col': 'Social category (SC/ST/OBC/GEN)',
            'sheet_name': '7.0_Social_Category',
            'category': 'Tenure & Matrix',
            'type': 'Caste Breakdown'
        }
    }
