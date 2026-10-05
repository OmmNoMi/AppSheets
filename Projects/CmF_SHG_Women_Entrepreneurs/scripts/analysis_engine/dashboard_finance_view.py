"""
Finance & Capital HTML View Component.
Renders Capital Mobilization by Source, Purpose of Loan Utilization,
and executive financial inclusion insights.
Strictly adheres to <= 300 lines rule and OmmNoMi brand standards.
"""


def render_finance_view_html() -> str:
    """Returns the complete HTML markup for Finance & Capital Analysis View."""
    return """
  <div id="view_finance" class="dash-view" style="display:none;">
    <div class="view-header">
      <div>
        <div class="view-title">Finance &amp; Capital: Credit Mobilization &amp; Loan Deployment</div>
        <div class="view-sub">Deconstruction of capital sources, debt vs equity structure, and working capital utilization across enterprises</div>
      </div>
      <div class="view-actions">
        <span class="prov-badge">SHEET 1 · FINANCE MASTER</span>
      </div>
    </div>

    <!-- FINANCE TABLES GRID -->
    <div class="grid-2">
      <!-- CAPITAL SOURCES BREAKDOWN -->
      <div class="q-card" style="border-top:3px solid #4285F4;">
        <div class="q-card-top">
          <div class="q-header" style="color:#1a73e8;">Capital Mobilization Across Financing Sources</div>
          <div class="q-actions">
            <span class="prov-badge">SOURCES (14)</span>
            <button type="button" class="btn-copy-tbl" onclick="copyGenericTable('tblCapitalSources', this)">Copy Table</button>
          </div>
        </div>
        <div class="table-container">
          <table id="tblCapitalSources">
            <thead>
              <tr>
                <th>Capital Source</th>
                <th style="text-align:right;width:60px;">WE (No.)</th>
                <th style="text-align:right;width:95px;">Total Mobilized (Rs)</th>
                <th style="text-align:right;width:80px;">Avg / WE (Rs)</th>
                <th style="text-align:right;width:65px;">% Capital</th>
              </tr>
            </thead>
            <tbody id="tblCapitalSourcesBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- LOAN UTILIZATION PURPOSE -->
      <div class="q-card" style="border-top:3px solid #34A853;">
        <div class="q-card-top">
          <div class="q-header" style="color:#137333;">Table 13: Purpose of Loan / Capital Utilization</div>
          <div class="q-actions">
            <span class="prov-badge">TABLE 13.0</span>
            <button type="button" class="btn-copy-tbl" onclick="copyGenericTable('tblLoanUsages', this)">Copy Table</button>
          </div>
        </div>
        <div class="table-container">
          <table id="tblLoanUsages">
            <thead>
              <tr>
                <th>Utilization Purpose</th>
                <th style="text-align:right;width:75px;">Enterprises</th>
                <th style="text-align:right;width:70px;">% Share</th>
              </tr>
            </thead>
            <tbody id="tblLoanUsagesBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- EXECUTIVE FINANCIAL INCLUSION ANALYSIS CARD -->
    <div class="analysis-card" id="cardFinanceAnalysis" style="margin-top:16px;">
      <div class="analysis-header">
        <div class="analysis-title">
          <span style="color:#1a73e8;">Executive Analysis:</span> Capital Structure &amp; Credit Bottlenecks
        </div>
        <span class="badge" style="background:#e8f0fe;color:#1a73e8;">CAPITAL AUDIT</span>
      </div>
      <div class="analysis-grid">
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Total Funds Mobilized</div>
          <div class="analysis-kpi-val" id="finKpiTotalCap" style="color:#1a73e8;">Rs 0</div>
          <div class="analysis-kpi-sub" id="finKpiTotalCapSub">All Capital Sources</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">SHG &amp; SVEP Share</div>
          <div class="analysis-kpi-val" id="finKpiShgShare" style="color:#137333;">0.0%</div>
          <div class="analysis-kpi-sub" id="finKpiShgShareSub">Community Credit Backbone</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Formal Bank Credit</div>
          <div class="analysis-kpi-val" id="finKpiBankShare" style="color:#c5221f;">0.0%</div>
          <div class="analysis-kpi-sub" id="finKpiBankShareSub">Severe Under-Penetration</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Reinvested Business Profit</div>
          <div class="analysis-kpi-val" id="finKpiProfitShare" style="color:#673AB7;">0.0%</div>
          <div class="analysis-kpi-sub">Self-Financing Resilience</div>
        </div>
      </div>
      <div class="analysis-narrative" id="finNarrativeText">
        <!-- Dynamically injected interpretation based on active district/block filter -->
      </div>
    </div>
  </div>
"""
