"""
Executive HTML Report Builder for District Survey Analysis.
Strictly adheres to OmmNoMi documentation style guide (sop-html-reports):
Vibrant color palette, Roboto/Roboto Serif typography, KPI cards, and symmetrical footer.
"""

import os
from datetime import datetime
import pandas as pd
from .data_evaluator import matches_activity
from .html_questions_builder import build_questions_explorer_html


def _compute_metrics(df_survey: pd.DataFrame, df_subsub: pd.DataFrame, schema):
    n_tot = len(df_survey)
    cap_nums = df_subsub[df_subsub['Question'].isin([
        'SubSubTable_CapitalArranged_FirstYear',
        'SubSubTable_CapitalArranged_MidYear',
        'SubSubTable_CapitalArranged_ThisYear'
    ])]['Answer_Number'].dropna()
    tot_cap = float(cap_nums.sum())
    avg_cap = (tot_cap / n_tot) if n_tot > 0 else 0.0
    qr_cnt = len(df_survey[df_survey['UseQRUPI'] == 'OPT_YES'])
    qr_pct = (qr_cnt / n_tot * 100) if n_tot > 0 else 0.0

    # Caste breakdown
    caste_data = [
        ("SC", len(df_survey[df_survey['SocialCategory'] == 'CST_SC'])),
        ("ST", len(df_survey[df_survey['SocialCategory'] == 'CST_ST'])),
        ("OBC", len(df_survey[df_survey['SocialCategory'] == 'CST_OBC'])),
        ("General", len(df_survey[df_survey['SocialCategory'] == 'CST_GEN']))
    ]

    # Top Activities
    acts = schema.get_business_activities()
    act_counts = []
    for sector, num, title, codes in acts:
        cnt = len(df_survey[df_survey['BusinessActivities'].astype(str).apply(
            lambda x, c=codes: matches_activity(x, c)
        )])
        if cnt > 0:
            act_counts.append((title, sector, cnt))
    act_counts.sort(key=lambda x: x[2], reverse=True)

    return {
        'n_tot': n_tot, 'tot_cap': tot_cap, 'avg_cap': avg_cap,
        'qr_cnt': qr_cnt, 'qr_pct': qr_pct, 'caste_data': caste_data,
        'top_acts': act_counts[:5]
    }


def build_district_html_report(
    df_survey: pd.DataFrame,
    df_sub: pd.DataFrame,
    df_subsub: pd.DataFrame,
    schema,
    district_name: str,
    output_html_path: str
) -> None:
    """Generates the single-page executive HTML report."""
    m = _compute_metrics(df_survey, df_subsub, schema)
    rel_logo = os.path.relpath('.agents/brand/ommnomi_logo.png', os.path.dirname(output_html_path)).replace('\\', '/')
    date_str = datetime.now().strftime("%d %B %Y")

    caste_rows = "".join(f"<tr><td>{lbl}</td><td>{cnt}</td><td>{(cnt/m['n_tot']*100 if m['n_tot']>0 else 0):.1f}%</td></tr>" for lbl, cnt in m['caste_data'])
    top_act_rows = "".join(f"<tr><td>{t}</td><td>{s}</td><td>{c}</td><td>{(c/m['n_tot']*100 if m['n_tot']>0 else 0):.1f}%</td></tr>" for t, s, c in m['top_acts'])
    questions_explorer_html = build_questions_explorer_html(df_survey)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{district_name} District — Executive Survey Analysis</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&family=Roboto+Serif:wght@400;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{ font-family: 'Roboto Serif', Georgia, serif; background: #f0f2f5; color: #202124; font-size: 11px; line-height: 1.5; padding: 30px 15px; -webkit-print-color-adjust: exact; }}
    .page {{ max-width: 210mm; margin: 0 auto; background: #fff; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }}
    .stripe {{ height: 5px; background: linear-gradient(to right, #4285F4 25%, #34A853 25% 50%, #EA4335 50% 75%, #FBBC05 75%); }}
    .hero {{ padding: 20px 28px 16px; border-bottom: 1px solid #dadce0; display: flex; justify-content: space-between; align-items: flex-start; }}
    .logo-row {{ display: flex; align-items: center; margin-bottom: 6px; }}
    .logo-img {{ height: 26px; width: auto; display: block; }}
    .hero-title {{ font-family: 'Roboto', sans-serif; font-size: 20px; font-weight: 900; color: #202124; }}
    .hero-sub {{ font-size: 10.5px; color: #5f6368; }}
    .badge {{ font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; background: #e8f0fe; color: #1a73e8; }}
    .meta-grid {{ background: #f8f9fa; border-bottom: 1px solid #dadce0; padding: 12px 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }}
    .meta-item {{ display: flex; flex-direction: column; }}
    .meta-lbl {{ font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; color: #5f6368; }}
    .meta-val {{ font-size: 11px; font-weight: 600; color: #202124; }}
    .body {{ padding: 20px 28px; }}
    .kpi-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }}
    .kpi-card {{ background: #f8f9fa; border: 1px solid #dadce0; border-radius: 6px; padding: 12px; border-top: 3px solid #4285F4; }}
    .kpi-num {{ font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 900; color: #1a73e8; }}
    .kpi-desc {{ font-size: 9.5px; color: #5f6368; margin-top: 2px; }}
    .sh {{ font-family: 'Roboto', sans-serif; font-size: 9.5px; font-weight: 700; text-transform: uppercase; color: #202124; margin: 16px 0 8px; padding-bottom: 3px; border-bottom: 1.5px solid #dadce0; display: flex; align-items: center; gap: 6px; }}
    .sh::before {{ content: ''; width: 3px; height: 11px; background: #4285f4; border-radius: 2px; }}
    table {{ width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 14px; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden; }}
    th {{ font-family: 'Roboto', sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; color: #fff; background: #5f6368; padding: 6px 10px; text-align: left; }}
    td {{ padding: 6px 10px; font-size: 10px; border-bottom: 1px solid #e8eaed; color: #3c4043; }}
    tr:last-child td {{ border-bottom: none; }}
    tr:nth-child(even) {{ background: #f8f9fa; }}
    .sig-section {{ display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px; padding-top: 14px; border-top: 1px solid #dadce0; }}
    .sig-title {{ font-family: 'Roboto', sans-serif; font-size: 9px; font-weight: 700; color: #1a73e8; text-decoration: none; }}
    .sig-sub {{ font-size: 8.5px; color: #5f6368; }}
    .footer {{ background: #fff; padding: 12px 28px; border-top: 1.5px solid #dadce0; display: flex; flex-direction: column; gap: 6px; }}
    .footer-row {{ display: flex; justify-content: space-between; align-items: center; min-height: 22px; }}
    .footer-logo {{ height: 20px; }}
    .footer-txt {{ font-family: 'Roboto', sans-serif; font-size: 9.5px; color: #5f6368; }}
    .socials {{ display: flex; gap: 6px; }}
    .s-link {{ width: 20px; height: 20px; border-radius: 50%; background: #f1f3f4; display: inline-flex; align-items: center; justify-content: center; }}
    .s-link svg {{ width: 11px; height: 11px; fill: currentColor; }}
  </style>
</head>
<body>
<div class="page">
  <div class="stripe"></div>
  <div class="hero">
    <div>
      <div class="logo-row"><img class="logo-img" src="{rel_logo}" alt="OmmNoMi Automation LLP"></div>
      <div class="hero-title">{district_name} District Analysis</div>
      <div class="hero-sub">CmF / RAJEEVIKA Women Entrepreneurs Assessment · Field Findings</div>
    </div>
    <div style="text-align:right;">
      <span class="badge">EXECUTIVE AUDIT</span>
      <div style="font-size:9px;color:#9aa0a6;margin-top:4px;">Date: {date_str}</div>
    </div>
  </div>
  <div class="meta-grid">
    <div class="meta-item"><span class="meta-lbl">District</span><span class="meta-val">{district_name}</span></div>
    <div class="meta-item"><span class="meta-lbl">Total Sample</span><span class="meta-val">{m['n_tot']} WE</span></div>
    <div class="meta-item"><span class="meta-lbl">Partner</span><span class="meta-val">CmF / RAJEEVIKA</span></div>
    <div class="meta-item"><span class="meta-lbl">Status</span><span class="meta-val" style="color:#137333;">✓ Complete & Verified</span></div>
  </div>
  <div class="body">
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-num">{m['n_tot']}</div><div class="kpi-desc">Total Entrepreneurs</div></div>
      <div class="kpi-card"><div class="kpi-num">Rs {m['tot_cap']:,.0f}</div><div class="kpi-desc">Total Funds Mobilized</div></div>
      <div class="kpi-card"><div class="kpi-num">Rs {m['avg_cap']:,.0f}</div><div class="kpi-desc">Avg Investment / Enterprise</div></div>
      <div class="kpi-card"><div class="kpi-num">{m['qr_pct']:.1f}%</div><div class="kpi-desc">Digital Payment Adoption</div></div>
    </div>
    {questions_explorer_html}
    <div class="sh">Top Enterprise Activities in {district_name}</div>
    <table>
      <thead><tr><th>Business Activity</th><th>Sector</th><th>Count</th><th>% Cohort</th></tr></thead>
      <tbody>{top_act_rows}</tbody>
    </table>
    <div class="sh">Social Category Inclusivity Matrix</div>
    <table>
      <thead><tr><th>Social Category</th><th>Respondents</th><th>Share (%)</th></tr></thead>
      <tbody>{caste_rows}</tbody>
    </table>
    <div class="sig-section">
      <div>
        <a href="https://ommnomi.in/associate/nomeshwer" target="_blank" class="sig-title">Nomeshwer Sharma</a>
        <div class="sig-sub">Business Process Developer & Implementor</div>
      </div>
      <div>
        <a href="https://ommnomi.in/associate/whardiksharma" target="_blank" class="sig-title">Hardik Sharma</a>
        <div class="sig-sub">Assistant Developer · Product R&D</div>
      </div>
    </div>
  </div>
  <div class="footer">
    <div class="footer-row">
      <img class="footer-logo" src="{rel_logo}" alt="OmmNoMi Automation LLP">
      <div class="footer-txt">Karsog, Mandi, Himachal Pradesh, India</div>
    </div>
    <div class="footer-row">
      <div class="footer-txt" style="font-style:italic;">Unlocking Business Potential Through Automation</div>
      <div class="socials">
        <a href="https://ommnomi.in" target="_blank" class="s-link" style="color:#4285F4;"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg></a>
        <a href="https://www.linkedin.com/company/ommnomi/" target="_blank" class="s-link" style="color:#0A66C2;"><svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
        <a href="https://youtube.com/@OmmNoMi" target="_blank" class="s-link" style="color:#FF0000;"><svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        <a href="https://github.com/OmmNoMi" target="_blank" class="s-link" style="color:#181717;"><svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></a>
        <a href="https://www.instagram.com/ommnomi_automation/" target="_blank" class="s-link" style="color:#E4405F;"><svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
        <a href="https://x.com/ommnomi" target="_blank" class="s-link" style="color:#000000;"><svg viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg></a>
        <a href="https://discord.com/users/ommnomi" target="_blank" class="s-link" style="color:#5865F2;"><svg viewBox="0 0 24 24"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg></a>
      </div>
    </div>
  </div>
</div>
</body>
</html>"""

    os.makedirs(os.path.dirname(output_html_path), exist_ok=True)
    with open(output_html_path, 'w', encoding='utf-8') as f:
        f.write(html)
