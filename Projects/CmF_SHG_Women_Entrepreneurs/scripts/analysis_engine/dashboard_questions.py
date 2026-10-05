"""
Question Cards & Thematic Sections Generator for Master Interactive Web Dashboard.
Renders responsive cards for Questions 1 to 28 across 6 thematic analytical lenses
with 1-click 'Copy Table' buttons and data provenance badges.
Strictly adheres to <= 300 lines per file policy and OmmNoMi visual standards.
"""


def _card(q_num: int, table_no: str, title: str, col_bar: str, col_txt: str) -> str:
    """Helper to render a standardized question card with provenance badge and copy button."""
    cid = f"qContent_{q_num}"
    return f"""        <div class="q-card" style="border-top:3px solid {col_bar};">
          <div class="q-card-top">
            <div class="q-header" style="color:{col_txt};">Q{q_num}: {title}</div>
            <div class="q-actions">
              <span class="prov-badge">{table_no}</span>
              <button type="button" class="btn-copy-tbl" onclick="copyQuestionTable('{cid}', this)">Copy Table</button>
            </div>
          </div>
          <div id="{cid}" class="q-content"></div>
        </div>"""


def render_all_question_cards_html() -> str:
    """Generates the HTML containers and card structures for all 28 survey questions."""
    c1 = _card(1, 'Table 1.0', 'Leadership Role in SHG / VO / CLF', '#34A853', '#137333')
    c2 = _card(2, 'Table 2.0', 'Familial Relation with BDSP / SVEP CRPs', '#4285F4', '#1a73e8')
    c17 = _card(17, 'Table 17.0', 'Attended SVEP / OSF Training', '#673AB7', '#673AB7')
    c18 = _card(18, 'Table 18.0', 'Implemented Training in Enterprise', '#34A853', '#137333')
    c20 = _card(20, 'Table 20.0', 'Tangible Benefits from SVEP / OSF CRPs', '#4285F4', '#1a73e8')
    c21 = _card(21, 'Table 21.0', 'Future Expectations from SVEP / OSF', '#EA4335', '#c5221f')

    c5 = _card(5, 'Table 5.0', 'Age-Group Demographics', '#4285F4', '#1a73e8')
    c6 = _card(6, 'Table 6.0', 'Marital Status', '#673AB7', '#673AB7')
    c7 = _card(7, 'Table 7.0', 'Social Category (Caste Group)', '#FBBC05', '#b06000')
    c8 = _card(8, 'Table 8.0', 'Education Attainment Status', '#34A853', '#137333')
    c9 = _card(9, 'Table 9.0', 'Family Members Count', '#4285F4', '#1a73e8')
    c10 = _card(10, 'Table 10.0', 'Earning Members in Family', '#673AB7', '#673AB7')
    c11 = _card(11, 'Table 11.0', 'Annual Household Income', '#EA4335', '#c5221f')

    c3 = _card(3, 'Table 3.0', 'Broad Business Categories', '#FBBC05', '#b06000')
    c4 = _card(4, 'Table 4.0', 'Access to Registrations & Documents', '#673AB7', '#673AB7')

    c12 = _card(12, 'Table 12.0', 'Access to Different Capital Sources', '#4285F4', '#1a73e8')
    c13 = _card(13, 'Table 13.0', 'Purpose of Utilizing Capital / Loans', '#34A853', '#137333')
    c14 = _card(14, 'Table 14.0', 'Experience with Funding Sources', '#EA4335', '#c5221f')
    c15 = _card(15, 'Table 15.0', 'Enterprise Income Relief & Welfare', '#673AB7', '#673AB7')
    c16 = _card(16, 'Table 16.0', 'Future Fund Requirements', '#FBBC05', '#b06000')
    c19 = _card(19, 'Table 19.0', 'Monthly Income Increase Due to Loan', '#34A853', '#137333')

    c22 = _card(22, 'Table 22.0', 'Smartphone Ownership', '#4285F4', '#1a73e8')
    c23 = _card(23, 'Table 23.0', 'QR Code / Mobile Banking', '#34A853', '#137333')
    c24 = _card(24, 'Table 24.0', 'Daily Digital Txn Volume', '#FBBC05', '#b06000')
    c25 = _card(25, 'Table 25.0', 'Social Media Orientation', '#673AB7', '#673AB7')
    c26 = _card(26, 'Table 26.0', 'Social Platforms Used', '#EA4335', '#c5221f')
    c27 = _card(27, 'Table 27.0', 'Purpose of Social Media Use', '#4285F4', '#1a73e8')

    return f"""
    <!-- THEMATIC SECTION 1: GOVERNANCE & SVEP ECOSYSTEM (Q1, Q2, Q17, Q18, Q20, Q21) -->
    <div class="sec-group sec-gov">
      <div class="sh">Governance, Agency &amp; SVEP Ecosystem (Q1, Q2, Q17, Q18, Q20, Q21)</div>
      <div class="grid-2">
{c1}
{c2}
      </div>
      <div class="grid-2" style="margin-top:10px;">
{c17}
{c18}
      </div>
      <div class="grid-2" style="margin-top:10px;">
{c20}
{c21}
      </div>
    </div>

    <!-- THEMATIC SECTION 2: DEMOGRAPHICS & HOUSEHOLD (Q5 to Q11) -->
    <div class="sec-group sec-demo">
      <div class="sh">Demographics, Family &amp; Household Profile (Q5 to Q11)</div>
      <div class="grid-2">
{c5}
{c6}
      </div>
      <div class="grid-2" style="margin-top:10px;">
{c7}
{c8}
      </div>
      <div class="grid-3" style="margin-top:10px;">
{c9}
{c10}
{c11}
      </div>
    </div>

    <!-- THEMATIC SECTION 3: ENTERPRISE, SECTORS & REGISTRATIONS (Q3, Q4 & Activities) -->
    <div class="sec-group sec-ent">
      <div class="sh">Enterprise Sectors, Registrations &amp; Activities (Q3, Q4)</div>
      <div class="grid-2">
{c3}
{c4}
      </div>
      <div style="margin-top:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <div class="sh" style="margin-bottom:0;">Top Enterprise Activities</div>
          <div class="q-actions">
            <span class="prov-badge">Table 3.1</span>
            <button type="button" class="btn-copy-tbl" onclick="copyQuestionTable('tblTopActivities', this)">Copy Table</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Business Activity</th><th>Sector</th><th>Count</th><th>% Share</th></tr></thead>
          <tbody id="tblTopActivities"></tbody>
        </table>
      </div>
    </div>

    <!-- THEMATIC SECTION 4: CAPITAL, FINANCING & INCOME RELIEF (Q12 to Q16, Q19) -->
    <div class="sec-group sec-fin">
      <div class="sh">Capital Mobilization, Usages &amp; Financial Relief (Q12 to Q16, Q19)</div>
      <div class="grid-2">
{c12}
{c13}
      </div>
      <div class="grid-2" style="margin-top:10px;">
{c14}
{c15}
      </div>
      <div class="grid-2" style="margin-top:10px;">
{c16}
{c19}
      </div>
    </div>

    <!-- THEMATIC SECTION 5: DIGITAL & SOCIAL MEDIA ADOPTION (Q22 to Q27) -->
    <div class="sec-group sec-dig">
      <div class="sh">Digital Payments &amp; Social Media Adoption (Q22 to Q27)</div>
      <div class="grid-3">
{c22}
{c23}
{c24}
      </div>
      <div class="grid-3" style="margin-top:10px;">
{c25}
{c26}
{c27}
      </div>
    </div>

    <!-- THEMATIC SECTION 6: ENTERPRISE TENURE & SOCIAL MATRIX (Table 28 & Matrix) -->
    <div class="sec-group sec-vin">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <div class="sh" style="margin-bottom:0;">Key Tenure Indicators &amp; Social Inclusivity Matrix (Table 28)</div>
        <div class="q-actions">
          <span class="prov-badge">Table 28.0</span>
          <button type="button" class="btn-copy-tbl" onclick="copyQuestionTable('t28_vintage', this)">Copy Table</button>
        </div>
      </div>
      <div class="grid-3" style="margin-bottom:12px;">
        <div class="kpi-card" style="border-top:3px solid #4285F4;">
          <div class="kpi-num" id="t28Setup">0.0 Yrs</div>
          <div class="kpi-desc">Avg Enterprise Operation Vintage</div>
        </div>
        <div class="kpi-card" style="border-top:3px solid #34A853;">
          <div class="kpi-num" id="t28Loan">0.0 Yrs</div>
          <div class="kpi-desc">Avg Years Since Loan Disbursement</div>
        </div>
        <div class="kpi-card" style="border-top:3px solid #673AB7;">
          <div class="kpi-num" id="t28Shg">0.0 Yrs</div>
          <div class="kpi-desc">Avg Years of SHG Membership</div>
        </div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <div class="sh" style="margin-bottom:0;">Social Category Inclusivity Matrix</div>
          <div class="q-actions">
            <span class="prov-badge">Matrix 7.1</span>
            <button type="button" class="btn-copy-tbl" onclick="copyQuestionTable('tblCasteMatrix', this)">Copy Table</button>
          </div>
        </div>
        <table>
          <thead><tr><th>Social Category</th><th>Respondents</th><th>Share (%)</th></tr></thead>
          <tbody id="tblCasteMatrix"></tbody>
        </table>
      </div>
    </div>
    """
