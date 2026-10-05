"""
Reusable HTML Visual UI Components & Client-Side Dashboard Engine.
Generates responsive visual bars, KPI cards, sector blocks, and client-side reactive scripts.
Strictly adheres to <= 300 lines per file policy.
"""

from typing import Optional


def render_progress_bar(
    label: str,
    count: int,
    pct: float,
    color: str,
    tag: Optional[str] = None,
    badge: Optional[str] = None
) -> str:
    """Renders a responsive progress bar with optional metadata tags and badges."""
    tag_html = f'<span style="font-size:8px;font-weight:500;color:#5f6368;background:#f1f3f4;padding:1px 5px;border-radius:3px;margin-left:4px;">{tag}</span>' if tag else ''
    badge_html = f'<span style="font-size:8px;background:#ceead6;color:#137333;padding:1px 5px;border-radius:3px;margin-left:4px;">{badge}</span>' if badge else ''
    return f"""
    <div style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:600;margin-bottom:2px;">
        <span>{label}{tag_html}{badge_html}</span>
        <span>{count} WE ({pct:.1f}%)</span>
      </div>
      <div style="height:6px;background:#e8eaed;border-radius:3px;overflow:hidden;">
        <div style="width:{pct}%;height:100%;background:{color};border-radius:3px;"></div>
      </div>
    </div>"""


def render_kpi_card(title: str, num_str: str, desc: str, border_color: str = "#4285F4") -> str:
    """Renders an executive KPI metric card."""
    return f"""
    <div class="kpi-card" style="border-top:3px solid {border_color};">
      <div class="kpi-num" style="color:{border_color};">{num_str}</div>
      <div class="kpi-desc">{desc}</div>
    </div>"""


def render_sector_card(sector_title: str, count: int, pct: float, color: str = "#4285F4") -> str:
    """Renders a broad business sector footprint card."""
    return f"""
    <div style="background:#f8f9fa;padding:8px 10px;border-radius:4px;border-left:3px solid {color};">
      <div style="font-size:9px;color:#5f6368;font-weight:600;text-transform:uppercase;">{sector_title}</div>
      <div style="font-size:16px;font-weight:900;color:{color};">{count} WE <span style="font-size:10px;font-weight:500;">({pct:.1f}%)</span></div>
    </div>"""


def get_client_dashboard_script() -> str:
    """Returns the pure vanilla JavaScript engine for live client-side district filtering."""
    return """
    function switchDistrict(distKey) {
      const data = window.DASHBOARD_DATA[distKey];
      if (!data) return;

      // Update Header & Meta
      document.getElementById('lblDistrictTitle').innerText = data.name + ' Analysis';
      document.getElementById('metaDistrictVal').innerText = data.name;
      document.getElementById('metaSampleVal').innerText = data.n_tot + ' WE';

      // Update KPI Cards
      document.getElementById('kpiTotalWE').innerText = data.n_tot;
      document.getElementById('kpiTotalFunds').innerText = 'Rs ' + Math.round(data.tot_cap).toLocaleString();
      document.getElementById('kpiAvgFunds').innerText = 'Rs ' + Math.round(data.avg_cap).toLocaleString();
      document.getElementById('kpiDigitalQR').innerText = data.qr_pct.toFixed(1) + '%';

      // Update Q1 & Q2
      document.getElementById('q1Pct').innerText = data.q1.pct_yes.toFixed(1) + '%';
      document.getElementById('q1Detail').innerHTML = '<strong>' + data.q1.yes + ' of ' + data.n_tot + '</strong> entrepreneurs hold active leadership office.<br><span style="color:#5f6368;">Members without office: ' + data.q1.no + ' (' + (100 - data.q1.pct_yes).toFixed(1) + '%)</span>';

      document.getElementById('q2Pct').innerText = data.q2.pct_no.toFixed(1) + '%';
      document.getElementById('q2Detail').innerHTML = '<strong>' + data.q2.no + ' of ' + data.n_tot + '</strong> beneficiaries have independent program linkage.<br><span style="color:#5f6368;">Related to BDSP/CRP: ' + data.q2.yes + ' (' + (100 - data.q2.pct_no).toFixed(1) + '%)</span>';

      // Update Q3 Sectors
      document.getElementById('q3Service').innerHTML = data.q3.srv + ' WE <span style="font-size:10px;font-weight:500;">(' + data.q3.srv_pct.toFixed(1) + '%)</span>';
      document.getElementById('q3Trading').innerHTML = data.q3.trd + ' WE <span style="font-size:10px;font-weight:500;">(' + data.q3.trd_pct.toFixed(1) + '%)</span>';
      document.getElementById('q3Mfg').innerHTML = data.q3.mfg + ' WE <span style="font-size:10px;font-weight:500;">(' + data.q3.mfg_pct.toFixed(1) + '%)</span>';

      // Update Q4 Documents
      let q4Html = '';
      data.q4.forEach(doc => {
        q4Html += `<div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:600;margin-bottom:2px;">
            <span>${doc.label} <span style="font-size:8px;font-weight:500;color:#5f6368;background:#f1f3f4;padding:1px 5px;border-radius:3px;">${doc.tag}</span></span>
            <span>${doc.count} WE (${doc.pct.toFixed(1)}%)</span>
          </div>
          <div style="height:6px;background:#e8eaed;border-radius:3px;overflow:hidden;">
            <div style="width:${doc.pct}%;height:100%;background:${doc.color};border-radius:3px;"></div>
          </div>
        </div>`;
      });
      document.getElementById('q4Container').innerHTML = q4Html;

      // Update Q5 Ages
      let q5Html = '';
      data.q5.forEach(ag => {
        const peakBadge = ag.bracket === '26-35' ? '<span style="font-size:8px;background:#ceead6;color:#137333;padding:1px 5px;border-radius:3px;margin-left:4px;">Peak Cohort</span>' : '';
        const barColor = (ag.bracket === '26-35' || ag.bracket === '36-45') ? '#4285F4' : '#9AA0A6';
        q5Html += `<div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;font-size:10px;font-weight:600;margin-bottom:2px;">
            <span>${ag.bracket} Years ${peakBadge}</span>
            <span>${ag.count} WE (${ag.pct.toFixed(1)}%)</span>
          </div>
          <div style="height:6px;background:#e8eaed;border-radius:3px;overflow:hidden;">
            <div style="width:${ag.pct}%;height:100%;background:${barColor};border-radius:3px;"></div>
          </div>
        </div>`;
      });
      document.getElementById('q5Container').innerHTML = q5Html;

      // Update Top Activities Table
      let actHtml = '';
      data.top_activities.forEach(act => {
        actHtml += `<tr><td>${act.title}</td><td>${act.sector}</td><td>${act.count}</td><td>${act.pct.toFixed(1)}%</td></tr>`;
      });
      document.getElementById('tblTopActivities').innerHTML = actHtml || '<tr><td colspan="4">No activity records.</td></tr>';

      // Update Caste Matrix Table
      let casteHtml = '';
      data.caste_matrix.forEach(c => {
        casteHtml += `<tr><td>${c.label}</td><td>${c.count}</td><td>${c.pct.toFixed(1)}%</td></tr>`;
      });
      document.getElementById('tblCasteMatrix').innerHTML = casteHtml;
    }

    function filterQuestions(filter) {
      document.querySelectorAll('.q-btn').forEach(b => b.classList.remove('active-btn'));
      const btn = document.getElementById('btn-' + filter);
      if (btn) btn.classList.add('active-btn');
      document.querySelectorAll('.q-card').forEach(c => {
        c.style.display = (filter === 'all' || c.classList.contains(filter)) ? 'block' : 'none';
      });
    }
    """


def render_view_switcher_bar_html() -> str:
    """Renders the executive 4-dimension module navigation bar."""
    return """
    <div class="view-switcher-bar">
      <button type="button" class="view-tab-btn active" id="btn_view_sheet4" onclick="switchDashboardView('sheet4')">
        <div class="vtab-icon-box vtab-ico-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </div>
        <div class="vtab-content">
          <div class="vtab-title">Survey Indicators</div>
          <div class="vtab-sub"><span class="vtab-badge">Q1–Q28 Findings</span></div>
        </div>
      </button>

      <button type="button" class="view-tab-btn" id="btn_view_sheet2" onclick="switchDashboardView('sheet2')">
        <div class="vtab-icon-box vtab-ico-green">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </div>
        <div class="vtab-content">
          <div class="vtab-title">Social Category Matrix</div>
          <div class="vtab-sub"><span class="vtab-badge">29 Activities × Caste</span></div>
        </div>
      </button>

      <button type="button" class="view-tab-btn" id="btn_view_sheet3" onclick="switchDashboardView('sheet3')">
        <div class="vtab-icon-box vtab-ico-purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <div class="vtab-content">
          <div class="vtab-title">Agency &amp; Sourcing</div>
          <div class="vtab-sub"><span class="vtab-badge">Support &amp; Mobility</span></div>
        </div>
      </button>

      <button type="button" class="view-tab-btn" id="btn_view_finance" onclick="switchDashboardView('finance')">
        <div class="vtab-icon-box vtab-ico-amber">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div class="vtab-content">
          <div class="vtab-title">Capital &amp; Credit</div>
          <div class="vtab-sub"><span class="vtab-badge">14 Sources &amp; Usages</span></div>
        </div>
      </button>
    </div>
    """

