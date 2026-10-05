"""
Declarative Configuration and Enum Mappings for Indicators Sheet (Tables 1 to 27).
Keeps definitions cleanly decoupled from the rendering engine.
"""

from typing import List, Tuple

# Table 1 & 2: Leadership & CRP
T1_DEF = ("1.0", "In leadership role in SHG/VO/CLF", "LeadershipRole", [("Yes", "OPT_YES"), ("No", "OPT_NO")])
T2_DEF = ("2.0", "In relation with BDSP/SVEP CRPs", "RelatedToCRP", [("Yes", "OPT_YES"), ("No", "OPT_NO")])

# Table 3: Business categories (contains)
T3_DEF = ("3.0", "Business Categories", "BusinessType", [
    ("In Trading", "BTY_TRADING"), ("In Service", "BTY_SERVICING"), ("In Production", "BTY_MANUFACTURING")
])

# Table 4: Formal registrations (contains)
T4_DOCS = [
    ("PAN card", "DOC_PAN"), ("Aadhar card", "DOC_AADHAR"), ("Udyam Aadhar", "DOC_UDYAM"),
    ("Shop and Establishment registration", "DOC_SHOP_EST"), ("FSSAI", "DOC_FSSAI"),
    ("Caste certificate", "DOC_CASTE"), ("Income certificate", "DOC_INCOME")
]

# Demographics (5 to 8)
T5_AGES = [("18-25", "AGE_18_25"), ("26-35", "AGE_26_35"), ("36-45", "AGE_36_45"), ("46-55", "AGE_46_55"), ("Above 55", "AGE_ABOVE_55")]
T6_MARITAL = [("Single", "MAR_SINGLE"), ("Married", "MAR_MARRIED"), ("Widowed", "MAR_WIDOWED"), ("Separated", "MAR_SEPARATED"), ("Divorced", "MAR_DIVORCED")]
T7_CATS = [("SC", "CST_SC"), ("ST", "CST_ST"), ("OBC", "CST_OBC"), ("General", "CST_GEN")]
T8_EDU = [
    ("Illiterate", ["EDU_ILLITERATE"]), ("Illiterate but able to calculate", ["EDU_ILLITERATE_CALC"]),
    ("Upto 5th", ["EDU_5TH"]), ("Upto 8th", ["EDU_8TH"]), ("Upto 10th", ["EDU_10TH"]),
    ("Upto 12th", ["EDU_12TH"]), ("Diploma", ["EDU_DIPLOMA"]), ("Graduate", ["EDU_GRADUATE"]), ("B.Ed", ["EDU_BED"])
]

# Experience & Relief (14 & 15)
T14_EXPS = [
    ("SHG loan is sufficient for the current scale of my business", "FEX_SHG_SUFFICIENT"),
    ("I regularly plough in my business earnings", "FEX_PLOUGH_EARNINGS"),
    ("SHG loan size is smaller than my requirement", "FEX_SHG_SMALLER"),
    ("I get the required loan easily from the moneylender/NBFIs.", "FEX_MONEYLENDER_EASY"),
    ("My family members help me with funds and loans", "FEX_FAMILY_HELP"),
    ("I don't prefer money lender or NBFIs as the interest rate is high", "FEX_HIGH_INTEREST"),
    ("I don't prefer money lender or NBFIs as the repayment time is shorter for my convenience", "FEX_SHORT_REPAY")
]
T15_USES = [
    ("I don’t need to ask money from my husband/family for my needs.", "SubTable_NoHubbyMony"),
    ("The income from enterprise is the biggest source of income for my family", "SubTable_FamlyMainEncm"),
    ("The income from enterprise is used in covering education related expenses for my children.", "SubTable_ChildEducExp"),
    ("I have been able to pay the family debts.", "SubTable_FamlyDebt"),
    ("I have contributed money in acquiring assets for my family ", "SubTable_AcqrAsset"),
    ("I have contributed money for marriage expenses. ", "SubTable_MerrageExp"),
    ("Any other (Please specify)", "SubTable_ANyOthr")
]

# Future Plans & SVEP (16 to 18)
T16_FUNDS = [
    ("Upto Rs 1,00,000", "FND_UPTO_1L"), ("Rs 1,00,001-Rs 3,00,000", "FND_1L_3L"),
    ("Rs 3,00,001-Rs 5,00,000", "FND_3L_5L"), ("Rs 5,00,001-Rs 7,00,000", "FND_5L_7L"),
    ("Rs 7,00,001-Rs 9,00,000", "FND_7L_9L"), ("More than 9,00,000", "FND_GT_9L")
]
T17_DEF = ("17.0", "Attended Training under SVEP / OSF", "AttendedTraining", [("Yes", "OPT_YES"), ("No", "OPT_NO")])
T18_DEF = ("18.0", "Implemented Training Component in Business", "UsedTrainingComponent", [("Yes", "OPT_YES"), ("No", "OPT_NO")])

# Ecosystem Contributions & Expectations (20 & 21)
T20_CRP = [
    ("Accessing subsidy", "CRP_SUBSIDY"), ("Getting necessary documents (Aadhar/PAN/Udyam/FSSAI)", "CRP_DOCS"),
    ("They helped us to understand business plans", "CRP_BIZ_PLAN"), ("They gave us new ideas to improve our profit.", "CRP_PROFIT_IDEAS"),
    ("They trained us on maintaining records which we didn’t know earlier", "CRP_RECORDS"),
    ("They helped in accessing loans from bank", "CRP_BANK_LOAN"), ("They helped in our communication skills", "CRP_COMM_SKILLS"),
    ("They helped in marketing", "CRP_MARKETING"), ("They helped in learning use of instagram", "CRP_INSTAGRAM"),
    ("They helped us to understand our competitors and suggested ways to beat the competition", "CRP_COMPETITORS")
]
T21_EXP = [
    ("Need bigger loan amount", "EXP_BIGGER_LOAN"), ("Need help in accessing Mudra loan", "EXP_MUDRA_HELP"),
    ("Need more guidance of SBDP/SVEP CRPs", "EXP_CRP_GUIDANCE"), ("Need help to access bigger markets", "EXP_BIGGER_MARKETS"),
    ("Need help with online purchase", "EXP_ONLINE_PURCHASE"), ("Need help with instagram", "EXP_INSTA_HELP"),
    ("Need my business specific trainings", "EXP_BIZ_TRAININGS"), ("Any other, Specify", "EXP_OTHER")
]

# Digital & Payments (22 to 24)
T22_PHONES = [("Yes", "PHN_OWN"), ("No, but access to smart phone", "PHN_FAMILY_ACCESS"), ("No", "PHN_NO")]
T23_DEF = ("23.0", "Adoption of QR Code / Mobile Banking for Payments", "UseQRUPI", [("Yes", "OPT_YES"), ("No", "OPT_NO")])
T24_TXNS = [("1-4", "QR_1_4"), ("5-10", "QR_5_10"), ("10-20", "QR_10_20"), ("20-40", "QR_20_40"), ("More than 40", "QR_GT_40")]

# Social Media (25 to 27)
T25_SM = [
    ("I regularly share images on whatsapp to get orders", "SMM_WHATSAPP_ORDERS"),
    ("I regularly share images/reels on instagram to get orders", "SMM_INSTA_ORDERS"),
    ("It is important but I don’t have access to smart phone", "SMM_NO_SMARTPHONE"),
    ("I do not use because I don't know how to use whatsapp/ instagram", "SMM_DONT_KNOW_USE"),
    ("I don't have time to learn and use social media", "SMM_NO_TIME_LEARN"),
    ("I don't want to use social media", "SMM_DONT_WANT"), ("Any other, specify", "SMM_OTHER")
]
T26_PLAT = [
    ("Whatsapp", "SMP_WHATSAPP"), ("Instagram", "SMP_INSTAGRAM"), ("Pinterest", "SMP_PINTEREST"),
    ("Facebook", "SMP_FACEBOOK"), ("Snapchat", "SMP_SNAPCHAT"), ("Don’t use social media", "SMP_NONE")
]
T27_MODES = [
    ("Use texts to ask/share prices and book orders", "SMU_PRICE_ORDERS"),
    ("Share images to promote business", "SMU_SHARE_IMAGES"),
    ("Share images to enquire about the availability of products to vendors", "SMU_VENDOR_ENQUIRY"),
    ("Get new ideas and information about new products/services", "SMU_NEW_IDEAS"),
    ("Don’t use social media", "SMU_DONT_USE")
]

# Household & Earning Members (9 & 10)
T9_DEF = ("9.0", "Household Size (Family Members)", "FamilyMemberCount", [
    ("Upto 4", "<=4"), ("4-6", "4-6"), ("6-8", "6-8"), ("8-10", "8-10"), ("More than 10", ">10")
])
T10_DEF = ("10.0", "Number of Earning Members in Family", "EarningMembers", [
    ("1", "1"), ("2", "2"), ("3", "3"), ("4", "4"), ("5", "5"), ("6", "6"), ("More than 6", ">6")
])

# Tenure & Vintage (28)
T28_DEF = ("28.0", "Key Tenure & Vintage Indicators (Averages)", "TenureAverages", [
    ("Average Years of Enterprise Operation", "setup"),
    ("Average Years Since SVEP / OSF Loan Disbursement", "loan"),
    ("Average Years of SHG Membership", "shg")
])

# Brand Colors for Visual Visualizations
COLOR_BLUE = "#4285F4"
COLOR_GREEN = "#34A853"
COLOR_RED = "#EA4335"
COLOR_YELLOW = "#FBBC05"
COLOR_PURPLE = "#673AB7"


def build_questions_registry(schema) -> List[dict]:
    """Builds a declarative JSON-ready mapping of survey questions for client-side rendering."""
    docs_colors = {'DOC_AADHAR': '#34A853', 'DOC_PAN': '#34A853', 'DOC_CASTE': '#34A853', 'DOC_UDYAM': '#4285F4', 'DOC_INCOME': '#4285F4', 'DOC_FSSAI': '#EA4335', 'DOC_SHOP_EST': '#EA4335'}
    docs_tags = {'DOC_AADHAR': 'Identity', 'DOC_PAN': 'Identity', 'DOC_CASTE': 'Social', 'DOC_UDYAM': 'MSME', 'DOC_INCOME': 'Welfare', 'DOC_FSSAI': 'Safety', 'DOC_SHOP_EST': 'Municipal'}

    return [
        {'id': 'qContent_1', 'col': 'q1', 'opts': [{'label': 'Holds Leadership Office', 'code': 'OPT_YES', 'color': '#34A853'}, {'label': 'General SHG Member', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_2', 'col': 'q2', 'opts': [{'label': 'Independent Linkage', 'code': 'OPT_NO', 'color': '#4285F4'}, {'label': 'Related to BDSP / CRPs', 'code': 'OPT_YES', 'color': '#EA4335'}]},
        {'id': 'qContent_3', 'col': 'q3', 'isMulti': True, 'opts': [{'label': 'Service', 'code': 'BTY_SERVICING', 'color': '#4285F4'}, {'label': 'Trading', 'code': 'BTY_TRADING', 'color': '#34A853'}, {'label': 'Production', 'code': 'BTY_MANUFACTURING', 'color': '#FBBC05'}]},
        {'id': 'qContent_4', 'col': 'q4', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': docs_colors.get(c, '#4285F4'), 'tag': docs_tags.get(c, '')} for lbl, c in T4_DOCS]},
        {'id': 'qContent_5', 'col': 'q5', 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4' if '26-35' in lbl or '36-45' in lbl else '#9AA0A6'} for lbl, c in T5_AGES]},
        {'id': 'qContent_6', 'col': 'q6', 'opts': [{'label': lbl, 'code': c, 'color': '#34A853' if c == 'MAR_MARRIED' else '#673AB7'} for lbl, c in T6_MARITAL]},
        {'id': 'qContent_7', 'col': 'q7', 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4' if c == 'CST_SC' else ('#34A853' if c == 'CST_ST' else ('#FBBC05' if c == 'CST_OBC' else '#673AB7'))} for lbl, c in T7_CATS]},
        {'id': 'qContent_8', 'col': 'q8', 'opts': [{'label': lbl, 'code': codes, 'color': '#34A853'} for lbl, codes in T8_EDU]},
        {'id': 'qContent_11', 'col': 'q11', 'opts': [{'label': lbl, 'code': codes, 'color': '#4285F4'} for lbl, codes in schema.get_income_bracket_mappings()]},
        {'id': 'qContent_12', 'col': 'q12', 'isMulti': True, 'opts': [{'label': s[0], 'code': s[0], 'color': '#34A853'} for s in schema.get_capital_sources()]},
        {'id': 'qContent_13', 'col': 'q13', 'isMulti': True, 'opts': [{'label': u[1], 'code': u[1], 'color': '#FBBC05'} for u in schema.get_loan_usages()]},
        {'id': 'qContent_14', 'col': 'q14', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#EA4335'} for lbl, c in T14_EXPS]},
        {'id': 'qContent_15', 'col': 'q15', 'isMulti': True, 'opts': [{'label': lbl, 'code': lbl, 'color': '#673AB7'} for lbl, _ in T15_USES]},
        {'id': 'qContent_16', 'col': 'q16', 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4'} for lbl, c in T16_FUNDS]},
        {'id': 'qContent_17', 'col': 'q17', 'opts': [{'label': 'Attended Training', 'code': 'OPT_YES', 'color': '#673AB7'}, {'label': 'Not Attended', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_18', 'col': 'q18', 'opts': [{'label': 'Implemented Learnings', 'code': 'OPT_YES', 'color': '#34A853'}, {'label': 'Not Implemented', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_19', 'col': 'q19', 'opts': [{'label': lbl, 'code': codes, 'color': '#34A853'} for lbl, codes in schema.get_monthly_income_increase_mappings()]},
        {'id': 'qContent_20', 'col': 'q20', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4'} for lbl, c in T20_CRP]},
        {'id': 'qContent_21', 'col': 'q21', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#EA4335'} for lbl, c in T21_EXP]},
        {'id': 'qContent_22', 'col': 'q22', 'opts': [{'label': lbl, 'code': c, 'color': '#34A853' if c == 'PHN_OWN' else ('#FBBC05' if c == 'PHN_FAMILY_ACCESS' else '#EA4335')} for lbl, c in T22_PHONES]},
        {'id': 'qContent_23', 'col': 'q23', 'opts': [{'label': 'Adopts QR / Digital Payments', 'code': 'OPT_YES', 'color': '#34A853'}, {'label': 'Cash Only Operations', 'code': 'OPT_NO', 'color': '#9AA0A6'}]},
        {'id': 'qContent_24', 'col': 'q24', 'opts': [{'label': lbl + ' Txns/Day', 'code': c, 'color': '#FBBC05'} for lbl, c in T24_TXNS]},
        {'id': 'qContent_25', 'col': 'q25', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#673AB7'} for lbl, c in T25_SM]},
        {'id': 'qContent_26', 'col': 'q26', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#EA4335'} for lbl, c in T26_PLAT]},
        {'id': 'qContent_27', 'col': 'q27', 'isMulti': True, 'opts': [{'label': lbl, 'code': c, 'color': '#4285F4'} for lbl, c in T27_MODES]},
    ]


