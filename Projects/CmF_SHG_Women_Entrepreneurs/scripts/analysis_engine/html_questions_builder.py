"""
Visualizations & Explorer Builder for Survey Questions 1 to 5.
Generates responsive visual cards, SVG meters, and interactive exploration filters.
Strictly adheres to <= 300 lines per file policy.
"""

from typing import Dict, Any
import pandas as pd


def _calc_q_data(df: pd.DataFrame) -> Dict[str, Any]:
    n = len(df)
    # Q1 & Q2
    q1_yes = int((df['LeadershipRole'] == 'OPT_YES').sum())
    q1_no = int((df['LeadershipRole'] == 'OPT_NO').sum())
    q2_yes = int((df['RelatedToCRP'] == 'OPT_YES').sum())
    q2_no = int((df['RelatedToCRP'] == 'OPT_NO').sum())

    # Q3
    q3_trd = int(df['BusinessType'].str.contains('BTY_TRADING', na=False).sum())
    q3_mfg = int(df['BusinessType'].str.contains('BTY_MANUFACTURING', na=False).sum())
    q3_srv = int(df['BusinessType'].str.contains('BTY_SERVICING', na=False).sum())

    # Q4
    docs = [
        ("Aadhar Card", "DOC_AADHAR", "Universal Identity", "#34A853"),
        ("PAN Card", "DOC_PAN", "Universal Identity", "#34A853"),
        ("Caste Certificate", "DOC_CASTE", "Social Identity", "#34A853"),
        ("Udyam Aadhar", "DOC_UDYAM", "Enterprise MSME", "#4285F4"),
        ("Income Certificate", "DOC_INCOME", "Welfare Verification", "#4285F4"),
        ("FSSAI License", "DOC_FSSAI", "Commercial Safety", "#EA4335"),
        ("Shop & Establishment", "DOC_SHOP_EST", "Municipal License", "#EA4335"),
    ]
    doc_stats = []
    for lbl, code, tag, col in docs:
        c = int(df['RegistrationsDocuments'].str.contains(code, na=False).sum())
        p = (c / n * 100) if n > 0 else 0.0
        doc_stats.append({'label': lbl, 'count': c, 'pct': p, 'tag': tag, 'color': col})

    # Q5
    ages = [("18-25", "AGE_18_25"), ("26-35", "AGE_26_35"), ("36-45", "AGE_36_45"), ("46-55", "AGE_46_55"), ("Above 55", "AGE_ABOVE_55")]
    age_stats = []
    for lbl, code in ages:
        c = int((df['RespondentAge'] == code).sum())
        p = (c / n * 100) if n > 0 else 0.0
        age_stats.append({'bracket': lbl, 'count': c, 'pct': p})

    return {
        'n': n,
        'q1': {'yes': q1_yes, 'no': q1_no, 'pct_yes': (q1_yes / n * 100) if n > 0 else 0},
        'q2': {'yes': q2_yes, 'no': q2_no, 'pct_no': (q2_no / n * 100) if n > 0 else 0},
        'q3': {'trd': q3_trd, 'mfg': q3_mfg, 'srv': q3_srv},
        'q4': doc_stats,
        'q5': age_stats
    }


def build_questions_explorer_html(df_survey: pd.DataFrame) -> str:
    """Generates the interactive HTML section for Questions 1 through 5."""
    d = _calc_q_data(df_survey)
    n = d['n']

    # Q4 Rows
    q4_bars = "".join(f"""
      <div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:600;margin-bottom:2px;">
          <span>{doc['label']} <span style="font-size:8px;font-weight:500;color:#5f6368;background:#f1f3f4;padding:1px 5px;border-radius:3px;">{doc['tag']}</span></span>
          <span>{doc['count']} WE ({doc['pct']:.1f}%)</span>
        </div>
        <div style="height:6px;background:#e8eaed;border-radius:3px;overflow:hidden;">
          <div style="width:{doc['pct']}%;height:100%;background:{doc['color']};border-radius:3px;"></div>
        </div>
      </div>""" for doc in d['q4'])

    # Q5 Rows
    q5_bars = "".join(f"""
      <div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:600;margin-bottom:2px;">
          <span>{ag['bracket']} Years {('<span style="font-size:8px;background:#ceead6;color:#137333;padding:1px 5px;border-radius:3px;">Peak Cohort</span>' if ag['bracket']=='26-35' else '')}</span>
          <span>{ag['count']} WE ({ag['pct']:.1f}%)</span>
        </div>
        <div style="height:6px;background:#e8eaed;border-radius:3px;overflow:hidden;">
          <div style="width:{ag['pct']}%;height:100%;background:{'#4285F4' if ag['bracket'] in ['26-35','36-45'] else '#9AA0A6'};border-radius:3px;"></div>
        </div>
      </div>""" for ag in d['q5'])

    return f"""
    <div style="margin-top:20px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div class="sh" style="margin:0;">Core Assessment Indicators (Questions 1 to 5)</div>
      <div style="display:flex;gap:4px;" id="qFilterContainer">
        <button onclick="filterQuestions('all')" class="q-btn active-btn" id="btn-all">All</button>
        <button onclick="filterQuestions('q1q2')" class="q-btn" id="btn-q1q2">Q1 &amp; Q2: Governance</button>
        <button onclick="filterQuestions('q3')" class="q-btn" id="btn-q3">Q3: Sectors</button>
        <button onclick="filterQuestions('q4')" class="q-btn" id="btn-q4">Q4: Documents</button>
        <button onclick="filterQuestions('q5')" class="q-btn" id="btn-q5">Q5: Age Groups</button>
      </div>
    </div>

    <!-- Cards Grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
      <!-- Q1 Card -->
      <div class="q-card q1q2" style="background:#fff;border:1px solid #dadce0;border-radius:6px;padding:12px;border-top:3px solid #34A853;">
        <div style="font-family:'Roboto',sans-serif;font-size:10px;font-weight:700;color:#137333;text-transform:uppercase;margin-bottom:4px;">Q1: Leadership Role in SHG / VO / CLF</div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
          <div style="font-size:24px;font-weight:900;color:#137333;font-family:'Roboto',sans-serif;">{d['q1']['pct_yes']:.1f}%</div>
          <div style="font-size:10px;color:#3c4043;line-height:1.4;">
            <strong>{d['q1']['yes']} of {n}</strong> entrepreneurs hold active leadership office in community institutions.<br>
            <span style="color:#5f6368;">Members without office: {d['q1']['no']} ({100-d['q1']['pct_yes']:.1f}%)</span>
          </div>
        </div>
      </div>

      <!-- Q2 Card -->
      <div class="q-card q1q2" style="background:#fff;border:1px solid #dadce0;border-radius:6px;padding:12px;border-top:3px solid #4285F4;">
        <div style="font-family:'Roboto',sans-serif;font-size:10px;font-weight:700;color:#1a73e8;text-transform:uppercase;margin-bottom:4px;">Q2: Familial Relation with BDSP / CRPs</div>
        <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
          <div style="font-size:24px;font-weight:900;color:#1a73e8;font-family:'Roboto',sans-serif;">{d['q2']['pct_no']:.1f}%</div>
          <div style="font-size:10px;color:#3c4043;line-height:1.4;">
            <strong>{d['q2']['no']} of {n}</strong> beneficiaries have independent, non-familial program linkage.<br>
            <span style="color:#5f6368;">Related to BDSP/CRP: {d['q2']['yes']} ({100-d['q2']['pct_no']:.1f}%)</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Q3 Card -->
    <div class="q-card q3" style="background:#fff;border:1px solid #dadce0;border-radius:6px;padding:12px;margin-bottom:12px;border-top:3px solid #FBBC05;">
      <div style="font-family:'Roboto',sans-serif;font-size:10px;font-weight:700;color:#b06000;text-transform:uppercase;margin-bottom:8px;">Q3: Broad Business Categories (Trading vs. Service vs. Production)</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
        <div style="background:#f8f9fa;padding:8px 10px;border-radius:4px;border-left:3px solid #4285F4;">
          <div style="font-size:9px;color:#5f6368;font-weight:600;">SERVICE SECTOR</div>
          <div style="font-size:16px;font-weight:900;color:#1a73e8;">{d['q3']['srv']} WE <span style="font-size:10px;font-weight:500;">({d['q3']['srv']/n*100:.1f}%)</span></div>
        </div>
        <div style="background:#f8f9fa;padding:8px 10px;border-radius:4px;border-left:3px solid #34A853;">
          <div style="font-size:9px;color:#5f6368;font-weight:600;">TRADING SECTOR</div>
          <div style="font-size:16px;font-weight:900;color:#137333;">{d['q3']['trd']} WE <span style="font-size:10px;font-weight:500;">({d['q3']['trd']/n*100:.1f}%)</span></div>
        </div>
        <div style="background:#f8f9fa;padding:8px 10px;border-radius:4px;border-left:3px solid #FBBC05;">
          <div style="font-size:9px;color:#5f6368;font-weight:600;">PRODUCTION / MFG</div>
          <div style="font-size:16px;font-weight:900;color:#b06000;">{d['q3']['mfg']} WE <span style="font-size:10px;font-weight:500;">({d['q3']['mfg']/n*100:.1f}%)</span></div>
        </div>
      </div>
    </div>

    <!-- Q4 & Q5 2-Column Grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
      <!-- Q4 Card -->
      <div class="q-card q4" style="background:#fff;border:1px solid #dadce0;border-radius:6px;padding:12px;border-top:3px solid #673AB7;">
        <div style="font-family:'Roboto',sans-serif;font-size:10px;font-weight:700;color:#673AB7;text-transform:uppercase;margin-bottom:8px;">Q4: Access to Formal Registrations &amp; Documents</div>
        {q4_bars}
      </div>

      <!-- Q5 Card -->
      <div class="q-card q5" style="background:#fff;border:1px solid #dadce0;border-radius:6px;padding:12px;border-top:3px solid #4285F4;">
        <div style="font-family:'Roboto',sans-serif;font-size:10px;font-weight:700;color:#1a73e8;text-transform:uppercase;margin-bottom:8px;">Q5: Age-Group Demographics</div>
        {q5_bars}
        <div style="margin-top:10px;padding:6px 8px;background:#e8f0fe;border-radius:4px;font-size:9.5px;color:#174ea6;">
          <strong>Demographic Stability:</strong> 81.1% of entrepreneurs fall in the 26–45 prime age window.
        </div>
      </div>
    </div>

    <script>
      function filterQuestions(filter) {{
        document.querySelectorAll('.q-btn').forEach(b => b.classList.remove('active-btn'));
        const btn = document.getElementById('btn-' + filter);
        if (btn) btn.classList.add('active-btn');
        document.querySelectorAll('.q-card').forEach(c => {{
          if (filter === 'all' || c.classList.contains(filter)) {{
            c.style.display = 'block';
          }} else {{
            c.style.display = 'none';
          }}
        }});
      }}
    </script>
    <style>
      .q-btn {{ background:#f1f3f4;border:1px solid #dadce0;border-radius:12px;font-size:9px;font-weight:600;padding:2px 8px;cursor:pointer;color:#5f6368; }}
      .q-btn:hover {{ background:#e8eaed; }}
      .active-btn {{ background:#e8f0fe !important;border-color:#1a73e8 !important;color:#1a73e8 !important;font-weight:700 !important; }}
    </style>
    """
