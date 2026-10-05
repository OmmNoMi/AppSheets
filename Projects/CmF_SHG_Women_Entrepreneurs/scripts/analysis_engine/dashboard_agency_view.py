"""
Sheet 3: Agency & Sourcing Independence HTML View Component.
Renders Table 16 (Family Support) and Table 17 (Comfort with Sourcing Method & Negotiation)
with dynamic calculation and executive analytical interpretation.
Strictly adheres to <= 300 lines rule and OmmNoMi brand standards.
"""


def render_agency_view_html() -> str:
    """Returns the complete HTML markup for Sheet 3 Agency & Sourcing View."""
    return """
  <div id="view_sheet3" class="dash-view" style="display:none;">
    <div class="view-header">
      <div>
        <div class="view-title">Sheet 3: Empowerment, Agency &amp; Sourcing Independence</div>
        <div class="view-sub">Assessment of intra-household support dynamics, travel mobility, and supply-chain negotiation autonomy</div>
      </div>
      <div class="view-actions">
        <span class="prov-badge">SHEET 3 · TABLES 16 &amp; 17</span>
      </div>
    </div>

    <!-- 2 TABLES GRID -->
    <div class="grid-2">
      <!-- TABLE 16: FAMILY SUPPORT -->
      <div class="q-card" style="border-top:3px solid #34A853;">
        <div class="q-card-top">
          <div class="q-header" style="color:#137333;">Table 16: Family Support (Husband &amp; Household Dynamics)</div>
          <div class="q-actions">
            <span class="prov-badge">TABLE 16.0</span>
            <button type="button" class="btn-copy-tbl" onclick="copyGenericTable('tblFamilySupport', this)">Copy Table</button>
          </div>
        </div>
        <div class="table-container">
          <table id="tblFamilySupport">
            <thead>
              <tr>
                <th>Statement / Dynamic</th>
                <th style="text-align:right;width:75px;">Number (WE)</th>
                <th style="text-align:right;width:70px;">% Cohort</th>
              </tr>
            </thead>
            <tbody id="tblFamilySupportBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- TABLE 17: SOURCING METHOD & NEGOTIATION -->
      <div class="q-card" style="border-top:3px solid #4285F4;">
        <div class="q-card-top">
          <div class="q-header" style="color:#1a73e8;">Table 17: Comfort with Sourcing Method &amp; Negotiation</div>
          <div class="q-actions">
            <span class="prov-badge">TABLE 17.0</span>
            <button type="button" class="btn-copy-tbl" onclick="copyGenericTable('tblSourcingComfort', this)">Copy Table</button>
          </div>
        </div>
        <div class="table-container">
          <table id="tblSourcingComfort">
            <thead>
              <tr>
                <th>Sourcing Method / Mobility Level</th>
                <th style="text-align:right;width:75px;">Number (WE)</th>
                <th style="text-align:right;width:70px;">% Cohort</th>
              </tr>
            </thead>
            <tbody id="tblSourcingComfortBody">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- EXECUTIVE AGENCY ANALYSIS CARD -->
    <div class="analysis-card" id="cardAgencyAnalysis" style="margin-top:16px;">
      <div class="analysis-header">
        <div class="analysis-title">
          <span style="color:#34A853;">Executive Analysis:</span> Gender Mobility &amp; Supply-Chain Autonomy
        </div>
        <span class="badge" style="background:#e6f4ea;color:#137333;">EMPOWERMENT AUDIT</span>
      </div>
      <div class="analysis-grid">
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Autonomous Sourcing</div>
          <div class="analysis-kpi-val" id="agKpiSoloTravel" style="color:#1a73e8;">0.0%</div>
          <div class="analysis-kpi-sub">Travels alone &amp; negotiates</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Family Proxy Sourcing</div>
          <div class="analysis-kpi-val" id="agKpiFamilyProxy" style="color:#c5221f;">0.0%</div>
          <div class="analysis-kpi-sub">Male relative purchases</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">Full Domestic Backing</div>
          <div class="analysis-kpi-val" id="agKpiFullSupport" style="color:#137333;">0.0%</div>
          <div class="analysis-kpi-sub">Husband/family full support</div>
        </div>
        <div class="analysis-kpi-box">
          <div class="analysis-kpi-lbl">External Supply Desire</div>
          <div class="analysis-kpi-val" id="agKpiSupportNeed" style="color:#673AB7;">0.0%</div>
          <div class="analysis-kpi-sub">Wants multi-market access</div>
        </div>
      </div>
      <div class="analysis-narrative" id="agNarrativeText">
        <!-- Dynamically injected interpretation based on active district/block filter -->
      </div>
    </div>
  </div>
"""
