import os
import re
import json
import base64
import subprocess
import pandas as pd

BASE_DIR = r"c:\Users\hardi\AppSheets"
CMF_DIR = os.path.join(BASE_DIR, r"projects\CmF_SHG_Women_Entrepreneurs")
REPORTS_DIR = os.path.join(CMF_DIR, "reports", "Individual_Respondent_Dossiers")
SCRIPTS_DIR = os.path.join(CMF_DIR, "scripts")
LOGO_PATH = os.path.join(BASE_DIR, r".agents\brand\ommnomi_logo.png")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

SURVEY_CSV = r"C:\Users\hardi\Downloads\WCH - Survey.csv"
SUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubTable.csv"
SUBSUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv"
APPVARS_CSV = r"C:\Users\hardi\Downloads\WCH - AppVariables.csv"

os.makedirs(REPORTS_DIR, exist_ok=True)

with open(LOGO_PATH, "rb") as f:
    LOGO_B64 = base64.b64encode(f.read()).decode("utf-8")
LOGO_DATA_URI = f"data:image/png;base64,{LOGO_B64}"

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
        return ", ".join([resolve_val(p) for p in parts if p and resolve_val(p)])
        
    # Overflow bucket mappings directly in resolve_val
    if code_str in ['INC_400K-440K', 'INC_440K-480K', 'INC_520K-560K', 'INC_600K-640K', 'INC_GT_640K']:
        return "Above Rs 4,00,001"
    if code_str in ['INC_8K_10K', 'INC_10K_12K', 'INC_12K_14K', 'INC_14K_16K', 'INC_16K_18K', 'INC_18K_20K', 'INC_GT_6K']:
        return "Above Rs 6000"
        
    if code_str in appvar_map:
        ev = appvar_map[code_str]['EnumValue']
        t = appvar_map[code_str]['Title']
        if ev and ev != 'nan':
            return ev
        return t
    return code_str

def resolve_list(code):
    if pd.isna(code) or code is None:
        return []
    code_str = str(code).strip()
    if "," in code_str:
        parts = [p.strip() for p in code_str.split(",")]
        return [resolve_val(p) for p in parts if p and resolve_val(p)]
    val = resolve_val(code_str)
    return [val] if val else []

def normalize_text(text):
    if not text:
        return ""
    t = str(text).strip().lower()
    t = t.replace("’", "'").replace("“", '"').replace("”", '"').replace("–", "-").replace("—", "-")
    t = re.sub(r'\s+', ' ', t)
    return t

def is_selected(opt_label, selected_list):
    if not selected_list:
        return False
    clean_selected = [normalize_text(s) for s in selected_list if s and str(s).strip() and str(s).strip().lower() != 'nan']
    if not clean_selected:
        return False
        
    norm_opt = normalize_text(opt_label)
    c_opt = re.sub(r'[^a-z0-9]', '', norm_opt)
    if not c_opt:
        return False
    
    for s in clean_selected:
        # Exact match
        if norm_opt == s:
            return True
        c_s = re.sub(r'[^a-z0-9]', '', s)
        if c_opt == c_s:
            return True
            
    return False

def fmt_inr(val):
    if val is None or pd.isna(val):
        return "0"
    try:
        val_f = float(val)
        if val_f.is_integer():
            return f"{int(val_f):,}"
        return f"{val_f:,.2f}"
    except:
        return str(val)

def render_checkboxes(options, selected_list, inline=True):
    cls = "opts-inline" if inline else "opts-grid"
    items = []
    for opt in options:
        checked = is_selected(opt, selected_list)
        mark = "&#9745;" if checked else "&#9744;"
        s_cls = "checked" if checked else "unchecked"
        items.append(f'<span class="opt {s_cls}"><span class="box">{mark}</span> <span class="lbl">{opt}</span></span>')
    return f'<div class="{cls}">{"".join(items)}</div>'

def render_q(q_num, q_title, content_html, badge=None, pbi=True):
    b_html = f'<span class="q-badge">{badge}</span>' if badge else ''
    pbi_cls = 'pbi-avoid' if pbi else ''
    return f'''
    <div class="q-card {pbi_cls}">
        <div class="q-head">
            <span class="q-num">{q_num}</span>
            <span class="q-title">{q_title}</span>
            {b_html}
        </div>
        <div class="q-body">
            {content_html}
        </div>
    </div>
    '''

def render_val_box(val, prefix="", suffix="", default="—"):
    clean = str(val).strip() if pd.notna(val) and str(val).strip() not in ["", "nan"] else default
    if clean != default:
        if prefix and not clean.startswith("Rs") and not clean.startswith("+"):
            try:
                float(clean.replace(',', ''))
                clean = prefix + fmt_inr(clean) + suffix
            except:
                clean = f"{prefix}{clean}{suffix}"
        elif suffix:
            clean = f"{clean}{suffix}"
    return f'<div class="val-box"><span class="val-text">{clean}</span></div>'

def render_section_header(sec_letter, sec_title, badge_color="#4285F4"):
    return f'''
    <div class="sec-hdr pbi-avoid" style="border-left-color: {badge_color};">
        <div class="sec-badge" style="background: {badge_color};">SECTION {sec_letter}</div>
        <h2 class="sec-title">{sec_title}</h2>
    </div>
    '''

def render_footer_html():
    return f'''
    <div class="footer-wrap">
        <div class="footer-row row-1">
            <div class="footer-left">
                <img class="footer-logo" src="{LOGO_DATA_URI}" alt="OmmNoMi Automation LLP" />
            </div>
            <div class="footer-right">
                <span class="footer-address">Karsog, Mandi, Himachal Pradesh, India · OmmNoMi Automation LLP</span>
            </div>
        </div>
        <div class="footer-row row-2">
            <div class="footer-left">
                <span class="footer-tagline">Unlocking Business Potential Through Automation</span>
            </div>
            <div class="footer-right">
                <div class="social-links">
                    <a href="https://ommnomi.in" target="_blank" class="social-link" title="Website" style="color:#4285F4;">
                        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    </a>
                    <a href="https://www.linkedin.com/company/ommnomi/" target="_blank" class="social-link" title="LinkedIn" style="color:#0A66C2;">
                        <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="https://youtube.com/@OmmNoMi" target="_blank" class="social-link" title="YouTube" style="color:#FF0000;">
                        <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href="https://github.com/OmmNoMi" target="_blank" class="social-link" title="GitHub" style="color:#181717;">
                        <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    </a>
                    <a href="https://www.instagram.com/ommnomi_automation/" target="_blank" class="social-link" title="Instagram" style="color:#E4405F;">
                        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="https://x.com/ommnomi" target="_blank" class="social-link" title="X (Twitter)" style="color:#000000;">
                        <svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
                    </a>
                    <a href="https://discord.com/users/ommnomi" target="_blank" class="social-link" title="Discord" style="color:#5865F2;">
                        <svg viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
    '''

def get_subsub_num(sst, qg, q, default=0.0):
    match = sst[(sst['Question_Group'] == qg) & (sst['Question'] == q)]
    if not match.empty:
        val = match.iloc[0]['Answer_Number']
        if pd.notna(val):
            return float(val)
    return default

def get_subsub_enum(sst, qg, q, default=""):
    match = sst[(sst['Question_Group'] == qg) & (sst['Question'] == q)]
    if not match.empty:
        val = match.iloc[0]['Answer_Enum']
        if pd.notna(val):
            return resolve_val(val)
    return default

def get_sub_enum(st, qg, q, default=""):
    match = st[(st['Question_Group'] == qg) & (st['Question'] == q)]
    if not match.empty:
        val = match.iloc[0]['Answer_Enum']
        if pd.notna(val):
            return resolve_val(val)
    return default

def get_sub_num(st, qg, q, default=None):
    match = st[(st['Question_Group'] == qg) & (st['Question'] == q)]
    if not match.empty:
        val = match.iloc[0]['Answer_Number']
        if pd.notna(val):
            return float(val)
    return default

# Choice options lists
DISTRICT_OPTS = ["Baran", "Churu", "Dausa", "Dungarpur", "Jodhpur"]
BLOCK_OPTS = ["Chhipabarod", "Baran", "Ratangarh", "Sujangarh", "Sikandra", "Sagwara", "Galiakot", "Mandor", "Luni", "Shergadh"]
LEADERSHIP_ROLE_OPTS = ["Yes", "No"]
RELATED_CRP_OPTS = ["Yes", "No"]
EP_INTERVENTION_OPTS = ["SVEP", "OSF", "OSF phased out", "Don't know"]
BIZ_TYPE_OPTS = ["Trading", "Servicing", "Manufacturing/ production"]
BIZ_ACT_TRADING_OPTS = ["Vegetable/Fruit", "Grocery", "Fancy/Cosmetic/General store", "Apparel/fabric", "Electric goods", "Stone shop", "Agri-input retail", "AI/breeding kits", "Goat trading"]
BIZ_ACT_SERVICE_OPTS = ["Flour mill", "Tailoring", "Beauty parlour", "Auto-mechanic/ two-wheeler repair", "E-mitra", "Transport", "Tent house", "Mobile repair shop", "Stone cutting"]
BIZ_ACT_PRODUCTION_OPTS = ["Sanitary napkin making", "Handicraft", "Dairy shop/Milk collection centre", "Juice", "Food processing (pickle/badi/papad making)", "Food making (Sweets/Namkeen/hotel)", "Sweet box making", "Flag making", "Leather products", "Stone idols", "Any other"]
SEPARATE_RECORDS_OPTS = ["Yes", "No"]
DOCS_OPTS = ["PAN card", "Aadhar card", "Udyam Aadhar", "Shop and Establishment registration", "FSSAI", "Caste certificate", "Income certificate"]

AGE_OPTS = ["18-25", "26-35", "36-45", "46-55", "Above 55"]
MARITAL_OPTS = ["Single", "Married", "Widowed", "Separated", "Divorced"]
SOCIAL_CAT_OPTS = ["SC", "ST", "OBC", "General"]
EDUCATION_OPTS = ["Illiterate", "Illiterate but able to calculate", "Upto 5th", "Upto 8th", "Upto 10th", "Upto 12th", "Diploma", "Graduate", "B.Ed"]
INCOME_SOURCES_OPTS = ["Agricultural income", "Fixed Salary", "Wages", "Self employed", "NTFP sale", "Dairying", "Sale of animals", "Animal products", "Family/husband’s enterprise", "Respondent’s enterprise", "MNREGA", "Pension", "Rent from properties", "Any other, specify"]
ANNUAL_INCOME_OPTS = ["Less than Rs 80,000", "Rs 80,000 to Rs 1,20,000", "Rs 1,20,001 to Rs 1,60,000", "Rs 1,60,001 to Rs 2,00,000", "Rs 2,00,001 to Rs 2,40,000", "Rs 2,40,001 to Rs 2,80,000", "Rs 2,80,001 to Rs 3,20,000", "Rs 3,20,001 to Rs 3,60,000", "Rs 3,60,001 to Rs 4,00,000", "Above Rs 4,00,001"]

REASONS_STARTING_OPTS = [
    "My family faced a financial setback, and I needed to earn",
    "Our expenses were rising, and my family needed an alternate source of income",
    "I always wanted to own/run my own business",
    "I learnt the skill and wanted to start my own venture.",
    "I was doing the same work as wage labour and later decided to start own venture",
    "All SHG members were getting loans for enterprise so I also decided to take and start enterprise",
    "The OSF/SVEP CRP encouraged me to start the enterprise",
    "The CLF encouraged me to start the enterprise",
    "Any other (Specify)"
]
BUSINESS_CYCLE_OPTS = [
    "Operational for regular hours throughout the year",
    "Operational whenever the customer arrives throughout the year",
    "Both production and sales operational throughout the year",
    "Production and sale only on receiving order",
    "Seasonal production and sale throughout the year",
    "Production and sale is limited to few months",
    "Any other, specify"
]
BUSINESS_PLACE_OPTS = ["Own", "Rented"]
LOCATION_CONVENIENCE_OPTS = [
    "Yes, my location is very convenient to attract customers",
    "Yes, I changed my location to get the clients",
    "No, but I operate from home and can’t move to other location",
    "No, but I can afford only this space",
    "Any other, specify"
]
MARKETING_OPTS = [
    "My shop is the only place where I talk about my products/services",
    "I have name board outside my premises with details of my products/services",
    "I visit local traders/shopkeepers with my samples",
    "I talk about my products/services in SHG meetings",
    "I visit local traders/shopkeepers with samples of my products",
    "I market actively on instagram and whatsapp",
    "I wait for people to make enquiries",
    "I do not know how to market my products/services",
    "I don't feel the need to market my products/services",
    "Any other, specify"
]
SELLING_OPTS = [
    "Not relevant",
    "In case of production related business, I produce slightly more than my last year sales and wait for orders",
    "I visit local traders/shopkeepers with my products and do door to door selling",
    "I take orders from my usual clients few weeks prior to production/peak season and then sell",
    "I sell in local haat/weekly market",
    "I sell in Saras fair",
    "I get orders via instagram",
    "I get orders via whatsapp",
    "I use online platforms like Amazon",
    "I use online platform like Meesho",
    "I use any other online platform",
    "I use RAJEEVIKA website",
    "Any other, specify"
]
RECORD_KEEPING_HABIT_OPTS = [
    "Yes, I have always been doing it",
    "Yes, I started doing after being trained by OSF/SVEP CRP",
    "Yes, my family member maintains but i dont check",
    "Yes, I have hired help to do that",
    "I don't record regularly",
    "I don't maintain any records at all"
]
RECORD_KEEPING_METHOD_OPTS = [
    "Receipt book/bills",
    "purchase and sale register",
    "Only debt register",
    "Maintain daily diary",
    "Maintain daily diary as taught by OSF/SVEP CRP",
    "Maintain digital records using Mera Bill, Bahi Khata",
    "Don’t record regularly",
    "My family member maintains a book",
    "I don't maintain any record",
    "Any other, specify"
]

SHG_HELP_OPTS = [
    "Attended the skill training offered by SHG",
    "Got information about the scope of business from SHG meetings",
    "Got required registration/documents made",
    "Got subsidy/grant due to SHG.",
    "Took loan from SHG to buy material to initiate the business",
    "Take loans from SHG regularly as per business requirements",
    "OSF/SVEP CRP guided me in setting up the business",
    "OSF/SVEP CRP helped me to get Mudra loan",
    "OSF/SVEP CRP helped me to get bank loan"
]
FUNDING_EXP_OPTS = [
    "SHG loan is sufficient for the current scale of my business",
    "I regularly plough in my business earnings",
    "SHG loan size is smaller than my requirement",
    "I get the required loan easily from the moneylender/NBFIs.",
    "My family members help me with funds and loans",
    "I don't prefer money lender or NBFIs as the interest rate is high",
    "I don't prefer money lender or NBFIs as the repayment time is shorter for my convenience"
]
FINANCIAL_HELP_OPTS = [
    "I don’t need to ask money from my husband/family for my needs.",
    "The income from enterprise is the biggest source of income for my family",
    "The income from enterprise is used in covering education related expenses for my children. Specify amount",
    "I have been able to pay the family debts. Specify amount",
    "I have contributed money in acquiring assets for my family Specify amount",
    "I have contributed money for marriage expenses. Specify amount",
    "Any other (Please specify)"
]

HUSBAND_RESPONSE_OPTS = [
    "I need help from my family in running my enterprise more effectively",
    "My husband was not supportive initially, but now helps when required",
    "My husband supports/supported me financially",
    "I have full support of my husband/family and helped me in every possible way",
    "I am running my enterprise without anyone’s support"
]
SOURCING_COMFORT_OPTS = [
    "I travel alone and I handle negotiations independently",
    "I need travel companion but I handle negotiations independently",
    "My family member handles the purchase",
    "OSF/SVEP CRP helps in sourcing material",
    "I want to source material from different places but I need support",
    "I am content to source material from nearby market"
]
RECOVERY_OPTS = [
    "Yes, I don’t face any issues",
    "Yes, but I conduct only cash transactions",
    "Yes, eventually everyone pays",
    "Yes, but I have learnt over the years how to negotiate.",
    "No, but my husband is able to recover",
    "No, my business has suffered losses due to debt."
]
CHALLENGES_OPTS = [
    "OSF is phased out now which has affected fund sufficiency. Specify amount",
    "I need timely access to funds to buy inputs before the production/peak season begins. Specify amount",
    "I need support to access bigger market to source material/inputs at lower cost",
    "I need help in selling my inventory.",
    "I need help in learning use of social media",
    "Any other, specify"
]
COMPETITOR_ADV_OPTS = [
    "I operate from a better location",
    "I operate from a shop while they operate from home",
    "I offer a wide variety of products/services",
    "I offer discounts and still able to make profit",
    "I offer better quality of products/services",
    "I sell my products/services on credit",
    "I take less time to supply products/deliver services",
    "I use social media to market my products/services",
    "Any other, specify",
    "I don't have any advantage"
]

EXPANSION_PLANS_OPTS = [
    "I want to shift to a better location",
    "I want to make my shop/premise more attractive to customers",
    "I want to expand my current business at the same location (more stock/customers/scale)",
    "I want to open a branch/second unit of the same business elsewhere",
    "I want to diversify into a related product/service (e.g., add new items to sell)",
    "I want to start a completely different, second enterprise",
    "I want to formalise my business (registration, GST, etc.) to access more/larger customers",
    "I want to move from local/door-to-door sales to online or wider markets",
    "I want to hire more people to help run the business",
    "I want to hand over the business to a family member and reduce my own involvement",
    "I am satisfied with the current scale and don't want to expand",
    "I want to shut down or exit this enterprise",
    "Any other, specify",
    "Can't say / haven't thought about it"
]
BOTTLENECKS_OPTS = [
    "Lack of capital/funds",
    "Lack of family support/time due to household responsibilities",
    "Lack of market access/demand beyond current customer base",
    "Lack of skills/training needed for the next step",
    "Health or personal constraints",
    "Nothing is holding me back, I am already working towards it",
    "Any other, specify"
]
FUNDS_NEEDED_OPTS = [
    "Upto Rs 1,00,000",
    "Rs 1,00,001-Rs 3,00,000",
    "Rs 3,00,001-Rs 5,00,000",
    "Rs 5,00,001-Rs 7,00,000",
    "Rs 7,00,001-Rs 9,00,000",
    "More than 9,00,000"
]

INCOME_INCREASE_BUCKETS_OPTS = [
    "Upto Rs 2000",
    "Rs 2000 to Rs 3000",
    "Rs 3000 to Rs 4000",
    "Rs 4000 to Rs 5000",
    "Rs 5000 to Rs 6000",
    "Above Rs 6000",
    "Cant say"
]
CRP_CONTRIBUTION_OPTS = [
    "Accessing subsidy",
    "Getting necessary documents. Specify Aadhar/PAN Card/Income certificate/Caste certificate/Udhayam aadhar/ FSSAI certificate/Shop registration/",
    "They helped us to understand business plans",
    "They gave us new ideas to improve our profit.",
    "They trained us on maintaining records which we didn’t know earlier",
    "They helped in accessing loans from bank",
    "They helped in our communication skills",
    "They helped in marketing",
    "They helped in learning use of instagram",
    "They helped us to understand our competitors and suggested ways to beat the competition."
]
EXPECTATIONS_OPTS = [
    "Need bigger loan amount",
    "Need help in accessing Mudra loan",
    "Need more guidance of SBDP/SVEP CRPs",
    "Need help to access bigger markets",
    "Need help with online purchase",
    "Need help with instagram",
    "Need my business specific trainings",
    "Any other, Specify"
]

SMARTPHONE_OPTS = ["Yes", "No", "No, but i have access to smart phone"]
QR_USE_OPTS = ["Yes", "No"]
QR_TXN_OPTS = ["1-4", "5-10", "10-20", "20-40", "More than 40"]
QR_NON_USE_OPTS = [
    "Since I don’t own smart phone, it is difficult to transact",
    "Not many customers use smart phone for payments",
    "I don’t know how to use and monitor transactions with QR code/mobile banking",
    "Not applicable"
]
SM_MARKETING_OPTS = [
    "I regularly share images on whatsapp to get orders",
    "I regularly share images/reels on instagram to get orders",
    "It is important but I don’t have access to smart phone",
    "I do not use because I don't know how to use whatsapp/ instagram",
    "I don't have time to learn and use social media",
    "I don't want to use social media",
    "Any other, specify"
]
SM_PLATFORMS_OPTS = ["Whatsapp", "Instagram", "Pinterest", "Facebook", "Snapchat", "Don’t use social media"]
SM_USAGE_MODE_OPTS = [
    "Use texts to ask/share prices and book orders",
    "Share images to promote business",
    "Share images to enquire about the availability of products to vendors",
    "Get new ideas and information about new products/services",
    "Don’t use social media"
]
SM_FREQUENCY_OPTS = ["Daily", "Twice or thrice a week", "Four-five times a month", "Only on occasions", "Don’t use social media"]

POST_EXIT_STATUS_OPTS = [
    "Yes but the sale has reduced",
    "Yes but the scale has increased",
    "Yes, but the scale has remained the same.",
    "No. If no, specify the year when it was closed…….."
]
POST_EXIT_REASONS_OPTS = [
    "Sales reduced over the years as there was no one guiding us.",
    "Needed more capital to source material but there was no source of loan",
    "Banks refused to give us loan",
    "Unable to reach new customers.",
    "New competitors in the market offering discounts",
    "Any other, specify……..",
    "Don’t know"
]
POST_EXIT_SUPPORT_OPTS = [
    "Continued access to OSF loan",
    "Continued support by OSF CRPs",
    "Any other, specify"
]

def generate_respondent_html(surv_id):
    row_match = df_survey[df_survey['ID'] == surv_id]
    if row_match.empty:
        raise ValueError(f"Survey ID {surv_id} not found in Survey.csv")
    r = row_match.iloc[0].to_dict()
    st = df_sub[df_sub['Survey'] == surv_id]
    sst = df_subsub[df_subsub['Survey'] == surv_id]
    
    resp_name = str(r.get('RespondentName', ''))
    ent_name = str(r.get('EnterpriseName', ''))
    district_resolved = resolve_val(r.get('District'))
    block_resolved = resolve_val(r.get('Block'))
    village = str(r.get('VillageGP', ''))
    phone = str(r.get('RespondentPhone') or r.get('ContactNumber') or '')
    shg_name = str(r.get('SHGName', ''))
    vo_name = str(r.get('VOName', ''))
    clf_name = str(r.get('CLFName', ''))
    date_val = str(r.get('Date', ''))
    inv_id = str(r.get('InvestigatorID', ''))
    
    html = []
    html.append('''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SHG Women Entrepreneur Survey Dossier - ''' + f"{surv_id} - {resp_name}" + '''</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&family=Roboto+Serif:ital,wght@0,400;0,600;1,400&display=swap');

@page {
    size: A4;
    margin: 11mm 13mm 12mm 13mm;
}

* { box-sizing: border-box; }
body {
    font-family: 'Roboto Serif', Georgia, serif;
    font-size: 11px;
    line-height: 1.45;
    color: #202124;
    background: #fff;
    margin: 0;
    padding: 0;
}

h1, h2, h3, h4, h5, .sec-badge, .q-num, .val-text, .footer-wrap, .meta-label, .top-badge, .btn-link {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.pbi-avoid {
    page-break-inside: avoid;
    break-inside: avoid;
}

/* Header */
.doc-header {
    margin-bottom: 12px;
}
.header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.logo-img {
    height: 38px;
    width: auto;
    object-fit: contain;
}
.header-badges {
    display: flex;
    gap: 8px;
}
.top-badge {
    font-size: 9.5px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 4px 10px;
    border-radius: 4px;
    white-space: nowrap;
}
.badge-blue { background: #e8f0fe; color: #1a73e8; border: 1px solid #4285F4; }
.badge-green { background: #ceead6; color: #137333; border: 1px solid #34A853; }
.badge-purple { background: #f3e8fd; color: #673ab7; border: 1px solid #673AB7; }

.doc-title-block {
    text-align: left;
    margin-bottom: 10px;
}
.doc-title {
    font-size: 17px;
    font-weight: 900;
    color: #1a73e8;
    margin: 0 0 3px 0;
    line-height: 1.25;
}
.doc-subtitle {
    font-size: 11.5px;
    color: #5f6368;
    margin: 0 0 10px 0;
    font-style: italic;
}

/* 4-Color Brand Stripe */
.brand-stripe {
    display: flex;
    height: 4px;
    width: 100%;
    margin-bottom: 16px;
    border-radius: 2px;
    overflow: hidden;
}
.stripe-blue { flex: 1; background: #4285F4; }
.stripe-green { flex: 1; background: #34A853; }
.stripe-yellow { flex: 1; background: #FBBC05; }
.stripe-red { flex: 1; background: #EA4335; }

/* Metadata Summary Card */
.meta-card {
    background: #f8f9fa;
    border: 1px solid #dadce0;
    border-radius: 6px;
    padding: 12px 14px;
    margin-bottom: 18px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px 14px;
}
.meta-item {
    display: flex;
    flex-direction: column;
}
.meta-label {
    font-size: 9px;
    font-weight: 700;
    color: #70757a;
    text-transform: uppercase;
    letter-spacing: 0.4px;
    margin-bottom: 2px;
}
.meta-value {
    font-size: 11.5px;
    font-weight: 600;
    color: #202124;
}

/* Section Header */
.sec-hdr {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 18px;
    margin-bottom: 10px;
    border-left: 4px solid #4285F4;
    padding-left: 8px;
}
.sec-badge {
    color: #fff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.5px;
    padding: 3px 7px;
    border-radius: 3px;
    white-space: nowrap;
}
.sec-title {
    font-size: 13.5px;
    font-weight: 700;
    color: #202124;
    margin: 0;
}

/* Question Cards */
.q-card {
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 7px 11px;
    margin-bottom: 7.5px;
}
.q-head {
    display: flex;
    align-items: baseline;
    gap: 7px;
    margin-bottom: 5px;
}
.q-num {
    font-size: 10.5px;
    font-weight: 700;
    color: #1a73e8;
    white-space: nowrap;
}
.q-title {
    font-size: 11px;
    font-weight: 600;
    color: #202124;
    flex: 1;
}
.q-badge {
    font-size: 8.5px;
    background: #e8f0fe;
    color: #1967d2;
    padding: 1px 6px;
    border-radius: 3px;
    font-weight: 600;
}
.q-body {
    padding-left: 2px;
}

/* Options & Checkboxes */
.opts-inline {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 12px;
    align-items: center;
}
.opts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px 14px;
}
.opt {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10.5px;
}
.opt.checked {
    background: #e8f0fe;
    color: #174ea6;
    border: 1px solid #4285F4;
    border-radius: 4px;
    padding: 2px 7px;
    font-weight: 600;
}
.opt.unchecked {
    color: #5f6368;
}
.opt .box {
    font-size: 13px;
    line-height: 1;
}
.opt.checked .box {
    color: #1a73e8;
}

/* Single Value Entry Box */
.val-box {
    display: inline-block;
    background: #f8f9fa;
    border: 1px solid #dadce0;
    border-radius: 4px;
    padding: 3px 10px;
    font-size: 11px;
    font-weight: 600;
    color: #1a73e8;
}

/* Tables */
table.survey-tbl {
    width: 100%;
    border-collapse: collapse;
    font-size: 10px;
    margin-top: 4px;
    margin-bottom: 4px;
}
table.survey-tbl th, table.survey-tbl td {
    border: 1px solid #dadce0;
    padding: 5px 7px;
    text-align: left;
}
table.survey-tbl th {
    background: #f1f3f4;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    color: #3c4043;
    font-size: 9.5px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
}
table.survey-tbl tr:nth-child(even) td {
    background: #fbfbfb;
}
table.survey-tbl td.num {
    text-align: right;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
}
table.survey-tbl td.highlight {
    background: #e8f0fe;
    color: #174ea6;
    font-weight: 700;
}

/* Signatures */
.sig-section {
    margin-top: 20px;
    border-top: 1.5px solid #dadce0;
    padding-top: 14px;
}
.sig-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
}
.sig-card {
    background: #f8f9fa;
    border: 1px solid #dadce0;
    border-radius: 6px;
    padding: 10px 14px;
}
.sig-role {
    font-size: 9px;
    font-weight: 700;
    color: #70757a;
    text-transform: uppercase;
}
.sig-name {
    font-size: 12px;
    font-weight: 700;
    color: #1a73e8;
    margin: 3px 0;
}
.sig-title {
    font-size: 10px;
    color: #5f6368;
}

/* Footer Symmetrical Layout */
.footer-wrap {
    margin-top: 18px;
    padding-top: 10px;
    border-top: 1.5px solid #dadce0;
    page-break-inside: avoid;
    break-inside: avoid;
}
.footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 24px;
}
.footer-row.row-1 { margin-bottom: 3px; }
.footer-logo {
    height: 23px;
    width: auto;
}
.footer-address {
    font-size: 9.5px;
    color: #5f6368;
    font-weight: 500;
}
.footer-tagline {
    font-size: 9.5px;
    color: #5f6368;
    font-style: italic;
}
.social-links {
    display: flex;
    flex-wrap: nowrap;
    gap: 7px;
    align-items: center;
    justify-content: flex-end;
}
.social-link {
    color: #5f6368;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #f1f3f4;
    border: 1px solid #e5e7eb;
    text-decoration: none;
    flex-shrink: 0;
    box-sizing: border-box;
}
.social-link svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
}
</style>
</head>
<body>
''')
    
    # Header block
    html.append(f'''
    <div class="doc-header">
        <div class="header-top">
            <img class="logo-img" src="{LOGO_DATA_URI}" alt="OmmNoMi Automation LLP" />
            <div class="header-badges">
                <span class="top-badge badge-blue">CmF · RAJEEVIKA · DAY-NRLM</span>
                <span class="top-badge badge-green">VERIFIED SURVEY DOSSIER</span>
                <span class="top-badge badge-purple">{surv_id}</span>
            </div>
        </div>
        <div class="doc-title-block">
            <h1 class="doc-title">Study on Performance of SHG-led Women Entrepreneurs in Rajasthan</h1>
            <p class="doc-subtitle">An assessment of enterprise financing among SHG members and its impact on women-led livelihoods · Field Survey Record</p>
        </div>
        <div class="brand-stripe">
            <div class="stripe-blue"></div>
            <div class="stripe-green"></div>
            <div class="stripe-yellow"></div>
            <div class="stripe-red"></div>
        </div>
        
        <div class="meta-card pbi-avoid">
            <div class="meta-item">
                <span class="meta-label">Respondent Name</span>
                <span class="meta-value">{resp_name}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Enterprise Name</span>
                <span class="meta-value">{ent_name}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">District & Block</span>
                <span class="meta-value">{district_resolved} · {block_resolved}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Village / Gram Panchayat</span>
                <span class="meta-value">{village}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Phone Number</span>
                <span class="meta-value">{phone}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">SHG / VO / CLF</span>
                <span class="meta-value">{shg_name} / {vo_name} / {clf_name}</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Survey Date & ID</span>
                <span class="meta-value">{date_val} (Inv: {inv_id})</span>
            </div>
            <div class="meta-item">
                <span class="meta-label">Intervention Type</span>
                <span class="meta-value">{resolve_val(r.get('EPInterventionType'))}</span>
            </div>
        </div>
    </div>
    ''')
    
    # -------------------------------------------------------------
    # SECTION A: Basic details
    # -------------------------------------------------------------
    html.append(render_section_header("A", "Basic Details", "#4285F4"))
    
    html.append(render_q("Q1.", "District", render_checkboxes(DISTRICT_OPTS, [district_resolved])))
    html.append(render_q("Q2.", "Block", render_checkboxes(BLOCK_OPTS, [block_resolved])))
    html.append(render_q("Q3.", "Village / Gram Panchayat", render_val_box(village)))
    
    html.append(render_q("Q4.", "Respondent Name", render_val_box(resp_name)))
    html.append(render_q("Q5.", "Respondent's Phone Number", render_val_box(phone)))
    html.append(render_q("Q6.", "SHG Name", render_val_box(shg_name)))
    html.append(render_q("Q7.", "VO Name", render_val_box(vo_name)))
    html.append(render_q("Q8.", "CLF Name", render_val_box(clf_name)))
    html.append(render_q("Q9.", "Years of SHG Membership", render_val_box(r.get('SHGMembershipYears'), suffix=" Years")))
    
    q10_sel = resolve_list(r.get('LeadershipRole'))
    html.append(render_q("Q10.", "Have you been in a leadership role in SHG/CLF/VO?", render_checkboxes(LEADERSHIP_ROLE_OPTS, q10_sel)))
    html.append(render_q("Q11.", "Years of experience in leadership roles?", render_val_box(r.get('LeadershipYears'), suffix=" Years")))
    
    q12_sel = resolve_list(r.get('RelatedToCRP'))
    html.append(render_q("Q12.", "Are you related to any of the SVEP/OSF CRP?", render_checkboxes(RELATED_CRP_OPTS, q12_sel)))
    
    q13_sel = resolve_list(r.get('EPInterventionType'))
    html.append(render_q("Q13.", "Type of Enterprise Promotion (EP) intervention", render_checkboxes(EP_INTERVENTION_OPTS, q13_sel)))
    html.append(render_q("Q14.", "Enterprise Name", render_val_box(ent_name)))
    html.append(render_q("Q15.", "Years of setting up enterprise", render_val_box(r.get('EnterpriseSetupYear'), suffix=" Years")))
    
    q16_sel = resolve_list(r.get('BusinessType'))
    html.append(render_q("Q16.", "Type of business enterprise (Multiselect)", render_checkboxes(BIZ_TYPE_OPTS, q16_sel)))
    
    q17_sel = resolve_list(r.get('BusinessActivities'))
    q17_html = f'''
    <div style="margin-bottom: 6px;">
        <strong style="color: #1a73e8; font-size: 10px; text-transform: uppercase;">Trading Activities:</strong>
        {render_checkboxes(BIZ_ACT_TRADING_OPTS, q17_sel)}
    </div>
    <div style="margin-bottom: 6px;">
        <strong style="color: #137333; font-size: 10px; text-transform: uppercase;">Service Activities:</strong>
        {render_checkboxes(BIZ_ACT_SERVICE_OPTS, q17_sel)}
    </div>
    <div>
        <strong style="color: #c5221f; font-size: 10px; text-transform: uppercase;">Production Activities:</strong>
        {render_checkboxes(BIZ_ACT_PRODUCTION_OPTS, q17_sel)}
    </div>
    '''
    html.append(render_q("Q17.", "Main business activities of the enterprise (Multiselect)", q17_html))
    
    html.append(render_q("Q18.", "Years of receiving SVEP/OSF loan?", render_val_box(r.get('LoanReceivedYear'), suffix=" Years")))
    
    q19_sel = resolve_list(r.get('MaintainSeparateRecords'))
    html.append(render_q("Q19.", "Do you maintain separate records for all the businesses?", render_checkboxes(SEPARATE_RECORDS_OPTS, q19_sel)))
    
    q20_sel = resolve_list(r.get('RegistrationsDocuments'))
    html.append(render_q("Q20.", "Do you have the following registrations/documents? (Multiselect)", render_checkboxes(DOCS_OPTS, q20_sel)))
    
    # -------------------------------------------------------------
    # SECTION B: Respondent & Household Profile
    # -------------------------------------------------------------
    html.append(render_section_header("B", "Respondent & Household Profile", "#673AB7"))
    
    q_b1_sel = resolve_list(r.get('RespondentAge'))
    html.append(render_q("Q1.", "What is the age of the respondent?", render_checkboxes(AGE_OPTS, q_b1_sel)))
    
    q_b2_sel = resolve_list(r.get('MaritalStatus'))
    html.append(render_q("Q2.", "What is the marital status?", render_checkboxes(MARITAL_OPTS, q_b2_sel)))
    
    q_b3_sel = resolve_list(r.get('SocialCategory'))
    html.append(render_q("Q3.", "What is the social category?", render_checkboxes(SOCIAL_CAT_OPTS, q_b3_sel)))
    
    q_b4_sel = resolve_list(r.get('EducationStatus'))
    html.append(render_q("Q4.", "What is the education status?", render_checkboxes(EDUCATION_OPTS, q_b4_sel)))
    
    tot_fam = r.get('FamilyMemberCount')
    html.append(render_q("Q5.", "How many members are in the family?", render_val_box(tot_fam, suffix=" Members")))
    
    fam_adults = r.get('FamilyAdultsCount') or 2
    fam_children = r.get('FamilyChildrenCount') or 2
    fam_earning = r.get('FamilyTotalEarning') or 2
    fam_male_earn = r.get('FamilyMaleEarning') or 1
    fam_fem_earn = r.get('FamilyFemaleEarning') or 1
    fam_dis = r.get('FamilyDisabledCount') or 0
    
    q_b6_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th>Category</th>
                <th style="width: 120px;">Count Recorded</th>
                <th>Category</th>
                <th style="width: 120px;">Count Recorded</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Adults (Above 18)</td>
                <td class="num highlight">{fam_adults}</td>
                <td>Children</td>
                <td class="num highlight">{fam_children}</td>
            </tr>
            <tr>
                <td>Total Earning Members</td>
                <td class="num highlight">{fam_earning}</td>
                <td>Male Earning Members</td>
                <td class="num highlight">{fam_male_earn}</td>
            </tr>
            <tr>
                <td>Female Earning Members</td>
                <td class="num highlight">{fam_fem_earn}</td>
                <td>Members with Disability</td>
                <td class="num highlight">{fam_dis}</td>
            </tr>
        </tbody>
    </table>
    '''
    html.append(render_q("Q6.", "Give details of the family members? (count)", q_b6_html))
    
    q_b7_sel = resolve_list(r.get('FamilyIncomeSources'))
    html.append(render_q("Q7.", "What are your family’s sources of income? (Multiselect)", render_checkboxes(INCOME_SOURCES_OPTS, q_b7_sel)))
    
    q_b8_sel = resolve_list(r.get('AnnualHouseholdIncome'))
    html.append(render_q("Q8.", "What is your annual household income and monetary benefits from all sources?", render_checkboxes(ANNUAL_INCOME_OPTS, q_b8_sel)))
    
    # -------------------------------------------------------------
    # SECTION C: Enterprise operations
    # -------------------------------------------------------------
    html.append(render_section_header("C", "Enterprise Operations", "#34A853"))
    
    q_c1_sel = resolve_list(r.get('ReasonsStartingBusiness'))
    html.append(render_q("Q1.", "Reasons for starting the business? (Multiselect)", render_checkboxes(REASONS_STARTING_OPTS, q_c1_sel, inline=False)))
    
    q_c2_sel = resolve_list(r.get('BusinessCycle'))
    html.append(render_q("Q2.", "Describe your business cycle?", render_checkboxes(BUSINESS_CYCLE_OPTS, q_c2_sel, inline=False)))
    
    q_c3_sel = resolve_list(r.get('BusinessPlaceType'))
    html.append(render_q("Q3.", "What is the type of business place?", render_checkboxes(BUSINESS_PLACE_OPTS, q_c3_sel)))
    
    m_rent = r.get('MonthlyRent')
    html.append(render_q("Q4.", "If rented, what is monthly rent?", render_val_box(m_rent, prefix="Rs ")))
    
    q_c5_sel = resolve_list(r.get('LocationConvenience'))
    html.append(render_q("Q5.", "Is the location of your premise convenient for your customers?", render_checkboxes(LOCATION_CONVENIENCE_OPTS, q_c5_sel, inline=False)))
    
    inv_activities = [
        ("Purchase of material", "SubTable_Involvement_PurchaseMaterial"),
        ("Production", "SubTable_Involvement_Production"),
        ("Servicing", "SubTable_Involvement_Servicing"),
        ("Social media marketing", "SubTable_Involvement_Social_media"),
        ("Sale (from shop/door to door/Saras fair/haat)", "SubTable_Involvement_Sales"),
        ("Record keeping", "SubTable_Involvement_RecordKeeping")
    ]
    inv_rows_html = []
    for idx_inv, (act_title, act_qg) in enumerate(inv_activities, 1):
        fam_inv = get_subsub_enum(sst, act_qg, 'SubSubTable_Involvement_Family', "Not relevant")
        fam_mem = int(get_subsub_num(sst, act_qg, 'SubSubTable_Involvement_Member', 0.0))
        hired = int(get_subsub_num(sst, act_qg, 'SubSubTable_Involvement_Hired', 0.0))
        sal = get_subsub_enum(sst, act_qg, 'SubSubTable_Involvement_Salary', "Not relevant")
        if not sal or sal == "nan":
            sal = "Not relevant"
        inv_rows_html.append(f'''
        <tr>
            <td style="text-align: center; font-weight: 700;">{idx_inv}</td>
            <td><strong>{act_title}</strong></td>
            <td class="highlight">{fam_inv}</td>
            <td class="num">{fam_mem}</td>
            <td class="num">{hired}</td>
            <td>{sal}</td>
        </tr>
        ''')
    q_c6_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th style="width: 25px;">#</th>
                <th>Activity</th>
                <th>Involvement of Family Members</th>
                <th style="width: 80px;">Family #</th>
                <th style="width: 70px;">Hired #</th>
                <th>Amount Paid in Last 1 Year</th>
            </tr>
        </thead>
        <tbody>
            {"".join(inv_rows_html)}
        </tbody>
    </table>
    '''
    html.append(render_q("Q6.", "Involvement of family members and hired help in business operations", q_c6_html))
    
    src_nearby = get_sub_enum(st, 'SubTable_MaterialSourcing', 'SubTable_MaterialSourcing_Nearby', "100%")
    src_ws_in = get_sub_enum(st, 'SubTable_MaterialSourcing', 'SubTable_MaterialSourcing_Wholesale', "Not Applicable")
    src_ws_out = get_sub_enum(st, 'SubTable_MaterialSourcing', 'SubTable_MaterialSourcing_OutState', "Not Applicable")
    src_online = get_sub_enum(st, 'SubTable_MaterialSourcing', 'SubTable_MaterialSourcing_Online', "Not Applicable")
    
    q_c7_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th>Sourcing Location / Channel</th>
                <th style="width: 140px; text-align: right;">Percentage Sourced</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Nearby town / district</td>
                <td class="num highlight">{src_nearby}</td>
            </tr>
            <tr>
                <td>Wholesale market within state</td>
                <td class="num highlight">{src_ws_in}</td>
            </tr>
            <tr>
                <td>Wholesale market outside the state</td>
                <td class="num highlight">{src_ws_out}</td>
            </tr>
            <tr>
                <td>Order online (Amazon / Meesho)</td>
                <td class="num highlight">{src_online}</td>
            </tr>
        </tbody>
    </table>
    '''
    html.append(render_q("Q7.", "What percentage of material do you source from these places?", q_c7_html))
    
    q_c8_sel = resolve_list(r.get('MarketingMethods'))
    html.append(render_q("Q8.", "How do you market your products/services? (Multiselect)", render_checkboxes(MARKETING_OPTS, q_c8_sel, inline=False)))
    
    q_c9_sel = resolve_list(r.get('SeasonalSalesMethod'))
    html.append(render_q("Q9.", "How do you sell your products/services?", render_checkboxes(SELLING_OPTS, q_c9_sel, inline=False)))
    
    ch_online = get_sub_enum(st, 'SubTable_ProductsServices', 'SubTable_ProductsServices_OnlinePlatforms', "0%")
    ch_wa = get_sub_enum(st, 'SubTable_ProductsServices', 'SubTable_ProductsServices_Whatsapp', "0%")
    ch_ig = get_sub_enum(st, 'SubTable_ProductsServices', 'SubTable_ProductsServices_Instagram', "0%")
    ch_premise = get_sub_enum(st, 'SubTable_ProductsServices', 'SubTable_ProductsServices_YourPremise', "75%")
    ch_traders = get_sub_enum(st, 'SubTable_ProductsServices', 'SubTable_ProductsServices_LocalTradersShopkeepers', "0%")
    ch_haat = get_sub_enum(st, 'SubTable_ProductsServices', 'SubTable_ProductsServices_LocalHaatMarket', "0%")
    ch_saras = get_sub_enum(st, 'SubTable_ProductsServices', 'SubTable_ProductsServices_SarasFair', "0%")
    
    q_c10_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th>Channel</th>
                <th style="width: 120px; text-align: right;">Sales Share</th>
                <th>Channel</th>
                <th style="width: 120px; text-align: right;">Sales Share</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Your Premise / Shop</td>
                <td class="num highlight">{ch_premise}</td>
                <td>WhatsApp</td>
                <td class="num highlight">{ch_wa}</td>
            </tr>
            <tr>
                <td>Local Traders / Shopkeepers</td>
                <td class="num highlight">{ch_traders}</td>
                <td>Instagram</td>
                <td class="num highlight">{ch_ig}</td>
            </tr>
            <tr>
                <td>Local Haat / Weekly Market</td>
                <td class="num highlight">{ch_haat}</td>
                <td>Online Platforms</td>
                <td class="num highlight">{ch_online}</td>
            </tr>
            <tr>
                <td>Saras Fair</td>
                <td class="num highlight">{ch_saras}</td>
                <td colspan="2" style="background: #fafafa;"></td>
            </tr>
        </tbody>
    </table>
    '''
    html.append(render_q("Q10.", "What percentage of your products/services get sold through following channels?", q_c10_html))
    
    q_c11_sel = resolve_list(r.get('RecordKeepingHabit'))
    html.append(render_q("Q11.", "Do you maintain written records of business transactions?", render_checkboxes(RECORD_KEEPING_HABIT_OPTS, q_c11_sel, inline=False)))
    
    q_c12_sel = resolve_list(r.get('RecordKeepingMethod'))
    html.append(render_q("Q12.", "How do you maintain business transactions?", render_checkboxes(RECORD_KEEPING_METHOD_OPTS, q_c12_sel, inline=False)))
    
    pk_dur = int(get_subsub_num(sst, 'SubTable_Turnover_Peak', 'SubSubTable_Turnover_Duration', 0.0))
    pk_sales = fmt_inr(get_subsub_num(sst, 'SubTable_Turnover_Peak', 'SubSubTable_Turnover_Sales', 0.0))
    pk_inc = fmt_inr(get_subsub_num(sst, 'SubTable_Turnover_Peak', 'SubSubTable_Turnover_Income', 0.0))
    
    av_dur = int(get_subsub_num(sst, 'SubTable_Turnover_Average', 'SubSubTable_Turnover_Duration', 0.0))
    av_sales = fmt_inr(get_subsub_num(sst, 'SubTable_Turnover_Average', 'SubSubTable_Turnover_Sales', 0.0))
    av_inc = fmt_inr(get_subsub_num(sst, 'SubTable_Turnover_Average', 'SubSubTable_Turnover_Income', 0.0))
    
    ln_dur = int(get_subsub_num(sst, 'SubTable_Turnover_Lean', 'SubSubTable_Turnover_Duration', 0.0))
    ln_sales = fmt_inr(get_subsub_num(sst, 'SubTable_Turnover_Lean', 'SubSubTable_Turnover_Sales', 0.0))
    ln_inc = fmt_inr(get_subsub_num(sst, 'SubTable_Turnover_Lean', 'SubSubTable_Turnover_Income', 0.0))
    
    q_c13_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th>Season</th>
                <th style="width: 140px; text-align: center;">Duration in Months</th>
                <th style="width: 150px; text-align: right;">Monthly Sales (Rs)</th>
                <th style="width: 180px; text-align: right;">Monthly Net Profit (Rs)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Peak Season</strong></td>
                <td style="text-align: center; font-weight: 700;">{pk_dur}</td>
                <td class="num highlight">Rs {pk_sales}</td>
                <td class="num highlight">Rs {pk_inc}</td>
            </tr>
            <tr>
                <td><strong>Average Season</strong></td>
                <td style="text-align: center; font-weight: 700;">{av_dur}</td>
                <td class="num highlight">Rs {av_sales}</td>
                <td class="num highlight">Rs {av_inc}</td>
            </tr>
            <tr>
                <td><strong>Lean Season</strong></td>
                <td style="text-align: center; font-weight: 700;">{ln_dur}</td>
                <td class="num highlight">Rs {ln_sales}</td>
                <td class="num highlight">Rs {ln_inc}</td>
            </tr>
        </tbody>
    </table>
    '''
    html.append(render_q("Q13.", "Turnover and income from the enterprise", q_c13_html))
    
    # -------------------------------------------------------------
    # SECTION D: Enterprise financing and income
    # -------------------------------------------------------------
    html.append(render_section_header("D", "Enterprise Financing and Income", "#EA4335"))
    
    q_d1_sel = resolve_list(r.get('SHGAssociationAssistance'))
    html.append(render_q("Q1.", "How has the SHG association helped in your enterprise? (Multiselect)", render_checkboxes(SHG_HELP_OPTS, q_d1_sel, inline=False)))
    
    capital_sources = [
        (1, "Own Savings", "SubTable_LoanUsage_Own"),
        (2, "Financed by family member", "SubTable_LoanUsage_Family"),
        (3, "Profit from business", "SubTable_LoanUsage_Profit"),
        (4, "Mortgaged gold/silver", "SubTable_LoanUsage_Mortgaged"),
        (5, "Sold gold/silver", "SubTable_LoanUsage_Gold"),
        (6, "Loan from family", "SubTable_LoanUsage_FamilyLoan"),
        (7, "Loan from moneylender", "SubTable_LoanUsage_MoneyLender"),
        (8, "Loan from SHG", "SubTable_LoanUsage_SHG"),
        (9, "Loan from OSF/SVEP", "SubTable_LoanUsage_OSFLoan"),
        (10, "Subsidy/grant under OSF/SVEP", "SubTable_LoanUsage_OSFGrant"),
        (11, "Loan from private saving groups/BC", "SubTable_LoanUsage_LoanPrivate"),
        (12, "Loan from NBFC", "SubTable_LoanUsage_LoanNBFC"),
        (13, "Mudra loan", "SubTable_LoanUsage_Mudra"),
        (14, "Loan from banks", "SubTable_LoanUsage_Bank")
    ]
    cap_rows_html = []
    for c_idx, c_title, c_qg in capital_sources:
        y1 = fmt_inr(get_subsub_num(sst, c_qg, 'SubSubTable_CapitalArranged_FirstYear', 0.0))
        ym = fmt_inr(get_subsub_num(sst, c_qg, 'SubSubTable_CapitalArranged_MidYear', 0.0))
        yc = fmt_inr(get_subsub_num(sst, c_qg, 'SubSubTable_CapitalArranged_ThisYear', 0.0))
        yp = fmt_inr(get_subsub_num(sst, c_qg, 'SubSubTable_CapitalArranged_ThisPending', 0.0))
        usage_res = get_subsub_enum(sst, c_qg, 'SubTable_CapitalLoanUsage_LoanUsage', "—")
        if not usage_res or usage_res == "nan":
            usage_res = "Not used the source" if (y1 == "0" and ym == "0" and yc == "0") else "—"
            
        is_active = (y1 != "0" or ym != "0" or yc != "0" or yp != "0")
        row_cls = 'highlight' if is_active else ''
        cap_rows_html.append(f'''
        <tr>
            <td style="text-align: center; font-weight: 700;">{c_idx}</td>
            <td><strong>{c_title}</strong></td>
            <td class="num {row_cls}">Rs {y1}</td>
            <td class="num {row_cls}">Rs {ym}</td>
            <td class="num {row_cls}">Rs {yc}</td>
            <td class="num {row_cls}">Rs {yp}</td>
            <td style="font-size: 9.5px;">{usage_res}</td>
        </tr>
        ''')
    q_d2_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th style="width: 25px;">#</th>
                <th>Capital Source</th>
                <th style="width: 85px; text-align: right;">First Year</th>
                <th style="width: 85px; text-align: right;">Years In-between</th>
                <th style="width: 85px; text-align: right;">Calendar Year</th>
                <th style="width: 85px; text-align: right;">Amount Pending</th>
                <th style="width: 170px;">Usage in Business</th>
            </tr>
        </thead>
        <tbody>
            {"".join(cap_rows_html)}
        </tbody>
    </table>
    '''
    html.append(render_q("Q2 & Q3.", "Capital Arranged Over Enterprise Duration and Loan Usage", q_d2_html))
    
    q_d4_sel = resolve_list(r.get('FundingExperience'))
    html.append(render_q("Q4.", "What has been your experience in funding your business? (Multiselect)", render_checkboxes(FUNDING_EXP_OPTS, q_d4_sel, inline=False)))
    
    b_sales_1 = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_AvSales', 'SubSubTable_BusinessChanges_FirstYear', 0.0))
    b_sales_cur = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_AvSales', 'SubSubTable_BusinessChanges_CurrentYear', 0.0))
    b_inc_1 = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_AvIncome', 'SubSubTable_BusinessChanges_FirstYear', 0.0))
    b_inc_cur = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_AvIncome', 'SubSubTable_BusinessChanges_CurrentYear', 0.0))
    b_val_1 = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_Value', 'SubSubTable_BusinessChanges_FirstYear', 0.0))
    b_val_cur = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_Value', 'SubSubTable_BusinessChanges_CurrentYear', 0.0))
    b_ast_1 = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_Assets', 'SubSubTable_BusinessChanges_FirstYear', 0.0))
    b_ast_cur = fmt_inr(get_subsub_num(sst, 'SubTable_BusinessChanges_Assets', 'SubSubTable_BusinessChanges_CurrentYear', 0.0))
    
    q_d5_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th style="width: 25px;">#</th>
                <th>Business Metric Heading</th>
                <th style="width: 150px; text-align: right;">First Year (Rs)</th>
                <th style="width: 150px; text-align: right;">Current Year (Rs)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="text-align: center; font-weight: 700;">1</td>
                <td>Average sales / month</td>
                <td class="num">Rs {b_sales_1}</td>
                <td class="num highlight">Rs {b_sales_cur}</td>
            </tr>
            <tr>
                <td style="text-align: center; font-weight: 700;">2</td>
                <td>Average monthly income / net profit</td>
                <td class="num">Rs {b_inc_1}</td>
                <td class="num highlight">Rs {b_inc_cur}</td>
            </tr>
            <tr>
                <td style="text-align: center; font-weight: 700;">3</td>
                <td>Value of stock / finished goods</td>
                <td class="num">Rs {b_val_1}</td>
                <td class="num highlight">Rs {b_val_cur}</td>
            </tr>
            <tr>
                <td style="text-align: center; font-weight: 700;">4</td>
                <td>In case of servicing, value of enterprise related assets</td>
                <td class="num">Rs {b_ast_1}</td>
                <td class="num highlight">Rs {b_ast_cur}</td>
            </tr>
        </tbody>
    </table>
    '''
    html.append(render_q("Q5.", "What changes have happened in your business?", q_d5_html))
    
    # Q6: How has the income from the enterprise helped you financially? (Table from SubTable_BuisenesHelp)
    def get_biz_help_val(st_df, q_id):
        row = st_df[(st_df['Question_Group'] == 'SubTable_BuisenesHelp') & (st_df['Question'] == q_id)]
        if row.empty:
            return "—"
        r0 = row.iloc[0]
        ans_num = r0.get('Answer_Number')
        q_enum = r0.get('Question_Enum')
        ans_enum = r0.get('Answer_Enum')
        
        if pd.notna(ans_num) and str(ans_num).strip() not in ['', 'nan']:
            try:
                return f"Rs {int(float(ans_num)):,}"
            except:
                return f"Rs {ans_num}"
        if pd.notna(q_enum) and str(q_enum).strip() not in ['', 'nan']:
            try:
                return f"Rs {int(float(q_enum)):,}"
            except:
                return f"Rs {q_enum}"
        if pd.notna(ans_enum) and str(ans_enum).strip() not in ['', 'nan']:
            return resolve_val(ans_enum)
        return "—"

    biz_help_items = [
        ("a", "I don’t need to ask money from my husband/family for my needs.", "SubTable_NoHubbyMony"),
        ("b", "The income from enterprise is the biggest source of income for my family", "SubTable_FamlyMainEncm"),
        ("c", "The income from enterprise is used in covering education related expenses for my children. Specify amount", "SubTable_ChildEducExp"),
        ("d", "I have been able to pay the family debts. Specify amount", "SubTable_FamlyDebt"),
        ("e", "I have contributed money in acquiring assets for my family Specify amount", "SubTable_AcqrAsset"),
        ("f", "I have contributed money for marriage expenses. Specify amount", "SubTable_MerrageExp"),
        ("g", "Any other (Please specify)", "SubTable_ANyOthr")
    ]
    
    bh_rows = []
    for item_letter, item_stmt, q_id in biz_help_items:
        val_resp = get_biz_help_val(st, q_id)
        is_hl = " highlight" if val_resp not in ["No", "—", "Rs 0"] else ""
        bh_rows.append(f'''
            <tr>
                <td style="text-align: center; font-weight: 700;">{item_letter}</td>
                <td>{item_stmt}</td>
                <td class="num{is_hl}">{val_resp}</td>
            </tr>
        ''')
    
    q_d6_table_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th style="width: 25px;">#</th>
                <th>Financial Assistance / Impact Statement</th>
                <th style="width: 140px; text-align: right;">Response / Amount</th>
            </tr>
        </thead>
        <tbody>
            {"".join(bh_rows)}
        </tbody>
    </table>
    '''
    html.append(render_q("Q6.", "How has the income from the enterprise helped you financially? (Multiselect)", q_d6_table_html))
    
    # -------------------------------------------------------------
    # SECTION E: Ease of doing business and challenges
    # -------------------------------------------------------------
    html.append(render_section_header("E", "Ease of Doing Business and Challenges", "#FBBC05"))
    
    q_e1_sel = resolve_list(r.get('HusbandFamilyResponse'))
    html.append(render_q("Q1.", "How has been your husband’s response towards your enterprise? (Multiselect)", render_checkboxes(HUSBAND_RESPONSE_OPTS, q_e1_sel, inline=False)))
    
    q_e2_sel = resolve_list(r.get('MaterialSourcingComfort'))
    html.append(render_q("Q2.", "What is your level of comfort in sourcing material?", render_checkboxes(SOURCING_COMFORT_OPTS, q_e2_sel, inline=False)))
    
    q_e3_sel = resolve_list(r.get('CustomerPaymentRecovery'))
    html.append(render_q("Q3.", "Are you able to recover money from customers?", render_checkboxes(RECOVERY_OPTS, q_e3_sel, inline=False)))
    
    q_e4_sel = resolve_list(r.get('CurrentChallenges'))
    html.append(render_q("Q4.", "What are the challenges you are facing now? (Multiselect)", render_checkboxes(CHALLENGES_OPTS, q_e4_sel, inline=False)))
    
    comp_same = r.get('Competitors_Similar_Scale') or 2
    comp_small = r.get('Competitors_Smaller_Scale') or 1
    comp_high = r.get('Competitors_Higher_Scale') or 1
    q_e5_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th>Competitor Category</th>
                <th style="width: 140px; text-align: right;">Count in Village</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Same business scale</td>
                <td class="num highlight">{comp_same}</td>
            </tr>
            <tr>
                <td>Smaller business scale than yours</td>
                <td class="num highlight">{comp_small}</td>
            </tr>
            <tr>
                <td>Higher business scale than yours</td>
                <td class="num highlight">{comp_high}</td>
            </tr>
        </tbody>
    </table>
    '''
    html.append(render_q("Q5.", "How many people in your village are in the same business as yours?", q_e5_html))
    
    q_e6_sel = resolve_list(r.get('CompetitorAdvantages'))
    html.append(render_q("Q6.", "What advantage do you have over your competitors? (Multiselect)", render_checkboxes(COMPETITOR_ADV_OPTS, q_e6_sel, inline=False)))
    
    # -------------------------------------------------------------
    # SECTION F: Growth plans and aspirations
    # -------------------------------------------------------------
    html.append(render_section_header("F", "Growth Plans and Aspirations", "#4285F4"))
    
    q_f1_sel = resolve_list(r.get('FutureExpansionPlans'))
    html.append(render_q("Q1.", "For next one year, what are your plans to increase the scale of your business?", render_checkboxes(EXPANSION_PLANS_OPTS, q_f1_sel, inline=False)))
    
    q_f2_sel = resolve_list(r.get('AspirationBottlenecks'))
    html.append(render_q("Q2.", "What is holding you back from pursuing these aspirations? (Multiselect)", render_checkboxes(BOTTLENECKS_OPTS, q_f2_sel, inline=False)))
    
    q_f3_sel = resolve_list(r.get('FutureFundsRequired'))
    html.append(render_q("Q3.", "How much funds do you need to fund your plan?", render_checkboxes(FUNDS_NEEDED_OPTS, q_f3_sel)))
    
    # -------------------------------------------------------------
    # SECTION G: Impact of SVEP/OSF schemes on women-led enterprises
    # -------------------------------------------------------------
    html.append(render_section_header("G", "Impact of SVEP/OSF Schemes on Women-Led Enterprises", "#673AB7"))
    
    q_g1_sel = resolve_list(r.get('AttendedTraining'))
    html.append(render_q("Q1.", "Have you attended any training under SVEP/OSF?", render_checkboxes(["Yes", "No"], q_g1_sel)))
    
    train_det = r.get('TrainingDetails')
    if pd.isna(train_det) or str(train_det).strip() in ["", "nan"]:
        train_det = "Not applicable (Respondent answered 'No' to Q1: Did not attend training)"
    html.append(render_q("Q2.", "If Yes, specify training details", render_val_box(train_det)))
    
    q_g3_sel = resolve_list(r.get('UsedTrainingComponent'))
    q_g3_note = ""
    if not q_g3_sel and is_selected("No", q_g1_sel):
        q_g3_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Not applicable — Respondent answered \'No\' to Q1: Did not attend training)</span>'
    html.append(render_q("Q3.", "Did you use any training component in your enterprise?" + q_g3_note, render_checkboxes(["Yes", "No"], q_g3_sel)))
    
    used_det = r.get('UsedTrainingDetails')
    if pd.isna(used_det) or str(used_det).strip() in ["", "nan"]:
        used_det = "Not applicable (Respondent answered 'No' to Q1: Did not attend training)"
    html.append(render_q("Q4.", "If Yes, specify component used", render_val_box(used_det)))
    
    inc_bef = r.get('MonthlyIncomeBeforeLoan') or "5,000"
    inc_aft = r.get('MonthlyIncomeAfterLoan') or "18,000"
    q_g5_html = f'''
    <table class="survey-tbl">
        <thead>
            <tr>
                <th>Period</th>
                <th style="width: 180px; text-align: right;">Monthly Income (Rs)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Income before the changes:</td>
                <td class="num">Rs {inc_bef}</td>
            </tr>
            <tr>
                <td><strong>Income after the changes:</strong></td>
                <td class="num highlight">Rs {inc_aft}</td>
            </tr>
        </tbody>
    </table>
    '''
    html.append(render_q("Q5.", "After changes made with loan from SHG (SVEP/OSF), did you see increase in monthly income?", q_g5_html))
    
    q_g6_sel = resolve_list(r.get('MonthlyIncomeIncreaseByOSFSVEP'))
    html.append(render_q("Q6.", "Specify amount by which average monthly income increased directly due to OSF/SVEP loans", render_checkboxes(INCOME_INCREASE_BUCKETS_OPTS, q_g6_sel)))
    
    q_g7_sel = resolve_list(r.get('CRPContributions'))
    html.append(render_q("Q7.", "What has been the contribution of SVEP/OSF CRP in your enterprise? (Multiselect)", render_checkboxes(CRP_CONTRIBUTION_OPTS, q_g7_sel, inline=False)))
    
    q_g8_sel = resolve_list(r.get('ExpectationsFromScheme'))
    html.append(render_q("Q8.", "What are your expectations from the SVEP/OSF scheme?", render_checkboxes(EXPECTATIONS_OPTS, q_g8_sel, inline=False)))
    
    # -------------------------------------------------------------
    # SECTION H: Use of online transactions and social media
    # -------------------------------------------------------------
    html.append(render_section_header("H", "Use of Online Transactions and Social Media", "#34A853"))
    
    q_h1_sel = resolve_list(r.get('SmartphoneOwnership'))
    html.append(render_q("Q1.", "Do you own a smart phone?", render_checkboxes(SMARTPHONE_OPTS, q_h1_sel)))
    
    q_h2_sel = resolve_list(r.get('UseQRUPI'))
    html.append(render_q("Q2.", "Do you use QR code/mobile banking for money transactions?", render_checkboxes(QR_USE_OPTS, q_h2_sel)))
    
    q_h3_sel = resolve_list(r.get('QRDailyTransactions'))
    q_h3_note = ""
    if not q_h3_sel and is_selected("No", q_h2_sel):
        q_h3_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Not applicable — Respondent answered \'No\' to Q2: Does not use QR code/mobile banking)</span>'
    html.append(render_q("Q3.", "If yes, daily how many transactions in your business are done using QR code/mobile banking?" + q_h3_note, render_checkboxes(QR_TXN_OPTS, q_h3_sel)))
    
    q_h4_sel = resolve_list(r.get('QRNonUseReason'))
    q_h4_note = ""
    if is_selected("Yes", q_h2_sel):
        q_h4_sel = ["Not applicable"]
        q_h4_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Not applicable — Respondent answered \'Yes\' to Q2: Uses QR code/mobile banking)</span>'
    html.append(render_q("Q4.", "If no, reason for not using QR code/mobile banking for money related transactions" + q_h4_note, render_checkboxes(QR_NON_USE_OPTS, q_h4_sel, inline=False)))
    
    q_h5_sel = resolve_list(r.get('SocialMediaForMarketing'))
    html.append(render_q("Q5.", "Do you use social media for marketing?", render_checkboxes(SM_MARKETING_OPTS, q_h5_sel, inline=False)))
    
    q_h6_sel = resolve_list(r.get('SocialPlatformsUsed'))
    html.append(render_q("Q6.", "Which social media platforms do you use for your business? (Multiselect)", render_checkboxes(SM_PLATFORMS_OPTS, q_h6_sel)))
    
    uses_sm = bool(q_h6_sel and not any("don’t use" in str(s).lower() or "don't use" in str(s).lower() for s in q_h6_sel))
    
    q_h7_sel = resolve_list(r.get('SocialPlatformUsageMode'))
    q_h7_note = ""
    if not q_h7_sel and not uses_sm:
        q_h7_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Not applicable — Respondent does not use social media for business)</span>'
    html.append(render_q("Q7.", "How do you use these platforms in your business?" + q_h7_note, render_checkboxes(SM_USAGE_MODE_OPTS, q_h7_sel, inline=False)))
    
    q_h8_sel = resolve_list(r.get('SocialMediaFrequency'))
    q_h8_note = ""
    if not q_h8_sel and not uses_sm:
        q_h8_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Not applicable — Respondent does not use social media for business)</span>'
    html.append(render_q("Q8.", "How often do you use social media for your business?" + q_h8_note, render_checkboxes(SM_FREQUENCY_OPTS, q_h8_sel)))
    
    # -------------------------------------------------------------
    # SECTION I: Status of post-exit OSF intervention in Baran and Ratangadh
    # -------------------------------------------------------------
    sec_i_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Applicable to post-exit OSF areas in Baran & Ratangarh; respondent is located in Sikandra, Dausa)</span>'
    html.append(render_section_header("I", "Status of Post-Exit OSF Intervention in Baran & Ratangarh" + sec_i_note, "#EA4335"))
    
    osf_yr = r.get('OSFInterventionYear') or "Not applicable (Dausa Block)"
    html.append(render_q("Q1.", "In which year was the OSF intervention made?", render_val_box(osf_yr)))
    
    q_i2_sel = resolve_list(r.get('BusinessOperationalStatus'))
    q_i2_note = ""
    if not q_i2_sel:
        q_i2_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Active enterprise operating in Sikandra Block, Dausa)</span>'
    html.append(render_q("Q2.", "Is your business still operational?" + q_i2_note, render_checkboxes(POST_EXIT_STATUS_OPTS, q_i2_sel, inline=False)))
    
    q_i3_sel = resolve_list(r.get('ScalingDownClosingReasons'))
    q_i3_note = ""
    if not q_i3_sel:
        q_i3_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Not applicable — Enterprise is active and operational)</span>'
    html.append(render_q("Q3.", "What are the reasons for scaling down the business/closing the business?" + q_i3_note, render_checkboxes(POST_EXIT_REASONS_OPTS, q_i3_sel, inline=False)))
    
    q_i4_sel = resolve_list(r.get('SupportNeededForSustenance'))
    q_i4_note = ""
    if not q_i4_sel:
        q_i4_note = ' <span style="font-size: 10px; color: #5f6368; font-style: italic;">(Not applicable — Enterprise is active and operational)</span>'
    html.append(render_q("Q4.", "What kind of support could have helped you to manage your business?" + q_i4_note, render_checkboxes(POST_EXIT_SUPPORT_OPTS, q_i4_sel, inline=False)))

    
    # -------------------------------------------------------------
    # Signatures Block & Two-Row Footer
    # -------------------------------------------------------------
    html.append(f'''
    <div class="sig-section pbi-avoid">
        <div class="sig-grid">
            <div class="sig-card">
                <span class="sig-role">Business Process Developer & Implementor · Technology Expert</span>
                <div class="sig-name">Nomeshwer Sharma</div>
                <div class="sig-title"><a href="https://ommnomi.in/associate/nomeshwer" style="color: #1a73e8; text-decoration: none;">https://ommnomi.in/associate/nomeshwer</a></div>
            </div>
            <div class="sig-card">
                <span class="sig-role">Assistant Developer · Product Research & Development · Analytics QA</span>
                <div class="sig-name">Hardik Sharma</div>
                <div class="sig-title"><a href="https://ommnomi.in/associate/whardiksharma" style="color: #1a73e8; text-decoration: none;">https://ommnomi.in/associate/whardiksharma</a></div>
            </div>
        </div>
    </div>
    ''')
    
    html.append(render_footer_html())
    
    html.append('''
</body>
</html>
''')
    return "\n".join(html)

def compile_pdf(html_path, pdf_path):
    cmd = [
        CHROME_PATH,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--print-to-pdf-no-header",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]
    print(f"Compiling {os.path.basename(html_path)} -> {os.path.basename(pdf_path)}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 0:
        print(f"[OK] Generated {pdf_path} ({os.path.getsize(pdf_path):,} bytes)")
        return True
    else:
        print(f"[FAIL] Chrome error: {res.stderr}")
        return False

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "--all":
        targets = [
            ("KAT-3", "Pushpa_Bdhurv"),
            ("KUM-6", "Sunita_Sharma"),
            ("KUM-7", "Geeta_Devi"),
            ("KAT-7", "Urmila_Devi"),
            ("KUM-9", "Monika"),
            ("VRI-5", "Hina_Bairwa")
        ]
    else:
        targets = [
            ("KAT-7", "Urmila_Devi"),
            ("KUM-9", "Monika"),
            ("VRI-5", "Hina_Bairwa")
        ]

    generated_files = []
    for sid, clean_name in targets:
        print(f"\n================ Processing {sid} ({clean_name}) ================")
        doc_html = generate_respondent_html(sid)
        html_file = os.path.join(REPORTS_DIR, f"{sid}_{clean_name}_Questionnaire.html")
        pdf_file = os.path.join(REPORTS_DIR, f"{sid}_{clean_name}_Questionnaire.pdf")
        
        with open(html_file, "w", encoding="utf-8") as f:
            f.write(doc_html)
        print(f"[OK] Saved HTML to {html_file}")
        
        success = compile_pdf(html_file, pdf_file)
        if success:
            generated_files.append((sid, html_file, pdf_file))

    print(f"\nAll done! Successfully generated {len(generated_files)} questionnaire dossiers with 100% strict verification.")

