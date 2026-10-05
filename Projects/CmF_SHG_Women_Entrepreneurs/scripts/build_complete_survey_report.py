import os
import re
import json
import base64
import subprocess
import pandas as pd

BASE_DIR = r"c:\Users\hardi\AppSheets"
CMF_DIR = os.path.join(BASE_DIR, r"projects\CmF_SHG_Women_Entrepreneurs")
REPORTS_DIR = os.path.join(CMF_DIR, "reports")
LOGO_PATH = os.path.join(BASE_DIR, r".agents\brand\ommnomi_logo.png")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

SURVEY_CSV = r"C:\Users\hardi\Downloads\WCH - Survey.csv"
SUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubTable.csv"
SUBSUBTABLE_CSV = r"C:\Users\hardi\Downloads\WCH - SubSubTable.csv"
APPVARS_CSV = r"C:\Users\hardi\Downloads\WCH - AppVariables.csv"

os.makedirs(REPORTS_DIR, exist_ok=True)

# Load Logo as base64
with open(LOGO_PATH, "rb") as f:
    LOGO_B64 = base64.b64encode(f.read()).decode("utf-8")
LOGO_DATA_URI = f"data:image/png;base64,{LOGO_B64}"

df_survey = pd.read_csv(SURVEY_CSV)
df_sub = pd.read_csv(SUBTABLE_CSV)
df_subsub = pd.read_csv(SUBSUBTABLE_CSV)
df_appvars = pd.read_csv(APPVARS_CSV)

# Build AppVariables lookup dict
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

def resolve_list(code):
    if pd.isna(code) or code is None:
        return []
    code_str = str(code).strip()
    if "," in code_str:
        parts = [p.strip() for p in code_str.split(",")]
        return [resolve_val(p) for p in parts if p]
    return [resolve_val(code_str)]

def is_selected(opt_label, selected_list):
    if not selected_list:
        return False
    norm_opt = opt_label.lower().strip()
    for s in selected_list:
        norm_s = s.lower().strip()
        if norm_opt in norm_s or norm_s in norm_opt:
            return True
        c_opt = re.sub(r'[^a-z0-9]', '', norm_opt)
        c_s = re.sub(r'[^a-z0-9]', '', norm_s)
        if c_opt and c_s and (c_opt in c_s or c_s in c_opt):
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
    <div class="sec-hdr" style="border-left-color: {badge_color};">
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
                <div class="social-circles">
                    <span class="soc-circle">🌐</span>
                    <span class="soc-circle">in</span>
                    <span class="soc-circle">▶</span>
                    <span class="soc-circle">GH</span>
                    <span class="soc-circle">📸</span>
                    <span class="soc-circle">𝕏</span>
                    <span class="soc-circle">💬</span>
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

print("Extraction helpers ready.")
