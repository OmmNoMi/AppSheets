"""
Sheet 2: Social Category Matrix HTML View Component.
Renders the 29 Business Activities x SC / ST / OBC / Gen Cross-Tabulation
Matrix with sector subtotals, grand total, and executive analytical insights.
Strictly adheres to <= 300 lines rule and OmmNoMi brand standards.
"""


def render_matrix_view_html() -> str:
    """Returns the complete HTML markup for Sheet 2 Social Category Matrix View."""
    return """
  <div id="view_sheet2" class="dash-view" style="display:none;">
    <div class="view-header">
      <div>
        <div class="view-title">Sheet 2: Distribution of Enterprises Across Business Activities by Social Category</div>
        <div class="view-sub">Cross-tabulation of 29 activities across SC, ST, OBC, and General categories with sector subtotals</div>
      </div>
      <div class="view-actions">
        <span class="prov-badge">MATRIX 2.0</span>
        <button type="button" class="btn-copy-tbl" onclick="copyMatrixTable(this)">Copy Matrix Table</button>
      </div>
    </div>

    <!-- 29 BUSINESS ACTIVITIES CROSS-TABULATION MATRIX TABLE -->
    <div class="table-container" id="matrixTableWrapper">
      <table id="tblSocialMatrixComplete">
        <thead>
          <tr>
            <th rowspan="2" style="vertical-align:middle;text-align:center;width:90px;">Sector</th>
            <th rowspan="2" style="vertical-align:middle;text-align:center;width:30px;">#</th>
            <th rowspan="2" style="vertical-align:middle;min-width:210px;">Business activities</th>
            <th colspan="4" style="text-align:center;border-bottom:1px solid rgba(255,255,255,0.2);">Social Category #</th>
            <th rowspan="2" style="vertical-align:middle;text-align:right;width:120px;">Total number of enterprises</th>
          </tr>
          <tr>
            <th style="text-align:right;width:55px;">SC</th>
            <th style="text-align:right;width:55px;">ST</th>
            <th style="text-align:right;width:55px;">OBC</th>
            <th style="text-align:right;width:55px;">Gen</th>
          </tr>
        </thead>
        <tbody id="tblMatrixBody">
          <!-- Dynamically populated by client JavaScript -->
        </tbody>
      </table>
    </div>

    <!-- EXECUTIVE ANALYTICAL INTERPRETATION CARD -->
    <div class="analysis-card" id="cardMatrixAnalysis">
      <div class="analysis-header">
        <div class="analysis-title">
          <span style="color:#4285F4;">Executive Analysis:</span> Sectoral Concentration &amp; Caste Representation
        </div>
        <span class="badge" style="background:#e8f0fe;color:#1a73e8;">STRATEGIC INSIGHTS</span>
      </div>
      <div class="analysis-grid">
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Dominant Sector</div>
          <div class="analysis-kpi-val" id="matKpiTopSector">Service</div>
          <div class="analysis-kpi-sub" id="matKpiTopSectorSub">Led by Tailoring &amp; Grocery</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Marginalized Share (SC+ST)</div>
          <div class="analysis-kpi-val" id="matKpiScStShare" style="color:#137333;">37.5%</div>
          <div class="analysis-kpi-sub" id="matKpiScStSub">21 of 56 Enterprises</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">OBC Representation</div>
          <div class="analysis-kpi-val" id="matKpiObcShare" style="color:#b06000;">39.3%</div>
          <div class="analysis-kpi-sub" id="matKpiObcSub">Largest Single Cohort</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Activity Concentration</div>
          <div class="analysis-kpi-val" id="matKpiDiversity" style="color:#673AB7;">Top 3: 53.6%</div>
          <div class="analysis-kpi-sub">Clustering in Low-Cap Vocations</div>
        </div>
      </div>
      <div class="analysis-narrative" id="matNarrativeText">
        <!-- Dynamically injected interpretation based on active district/block filter -->
      </div>
    </div>
  </div>
"""
