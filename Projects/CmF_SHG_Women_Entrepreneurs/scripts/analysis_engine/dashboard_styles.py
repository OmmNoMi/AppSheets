"""
Master Responsive Stylesheet Module for CmF Rajasthan Analytics Dashboard.
Provides pixel-perfect desktop and mobile responsive CSS, touch-friendly UI,
and brand styling. Strictly adheres to <= 300 lines rule.
"""


def get_master_dashboard_css(auth_styles: str) -> str:
    """Returns complete CSS styles including media queries for mobile responsiveness."""
    return f"""
    *, *::before, *::after {{ box-sizing: border-box; margin: 0; padding: 0; }}
    html {{ -webkit-text-size-adjust: 100%; }}
    body {{ font-family: 'Roboto Serif', Georgia, serif; background: #f0f2f5; color: #202124; font-size: 11px; line-height: 1.5; padding: 30px 15px; -webkit-print-color-adjust: exact; }}
    .page {{ display: none; width: 100%; max-width: 210mm; margin: 0 auto; background: #fff; border-radius: 6px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }}
    {auth_styles}
    .stripe {{ height: 5px; background: linear-gradient(to right, #4285F4 25%, #34A853 25% 50%, #EA4335 50% 75%, #FBBC05 75%); }}
    .hero {{ padding: 20px 28px 16px; border-bottom: 1px solid #dadce0; display: flex; justify-content: space-between; align-items: flex-start; }}
    .logo-img {{ height: 26px; width: auto; display: block; }}
    .hero-title {{ font-family: 'Roboto', sans-serif; font-size: 20px; font-weight: 900; color: #202124; line-height: 1.25; }}
    .badge {{ font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; background: #e8f0fe; color: #1a73e8; }}
    .f-panel {{ background: #f8fafd; padding: 12px 28px; border-bottom: 1px solid #dadce0; }}
    .dropdown-wrapper {{ display: flex; align-items: center; gap: 8px; }}
    .dd-label {{ font-family: 'Roboto', sans-serif; font-size: 10px; font-weight: 700; color: #174ea6; text-transform: uppercase; }}
    .custom-dropdown {{ position: relative; width: 230px; }}
    .dd-btn {{ width: 100%; display: flex; justify-content: space-between; align-items: center; background: #fff; border: 1.5px solid #1a73e8; border-radius: 6px; padding: 6px 12px; font-family: 'Roboto', sans-serif; font-size: 11px; font-weight: 700; color: #1a73e8; cursor: pointer; text-align: left; }}
    .dd-arrow {{ font-size: 9px; margin-left: 6px; }}
    .dd-menu {{ display: none; position: absolute; top: calc(100% + 4px); left: 0; width: 100%; background: #fff; border: 1px solid #dadce0; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.15); z-index: 1000; padding: 6px; }}
    .dd-menu.open {{ display: block; }}
    .dd-actions {{ display: flex; justify-content: space-between; padding: 4px 6px 6px; border-bottom: 1px solid #f1f3f4; margin-bottom: 4px; }}
    .dd-act-btn {{ font-size: 9px; font-weight: 600; color: #1a73e8; background: none; border: none; cursor: pointer; text-decoration: underline; }}
    .dd-list {{ max-height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }}
    .dd-item {{ display: flex; align-items: center; gap: 8px; padding: 4px 6px; border-radius: 4px; cursor: pointer; font-family: 'Roboto', sans-serif; font-size: 10.5px; font-weight: 500; color: #3c4043; }}
    .dd-item:hover {{ background: #f8f9fa; }}
    .dd-item input {{ cursor: pointer; }}
    .filter-badge {{ display: inline-block; font-family: 'Roboto', sans-serif; font-size: 9px; font-weight: 700; background: #ceead6; color: #137333; padding: 5px 12px; border-radius: 12px; }}
    .meta-grid {{ background: #f8f9fa; border-bottom: 1px solid #dadce0; padding: 10px 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }}
    .meta-lbl {{ font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 700; text-transform: uppercase; color: #5f6368; }}
    .meta-val {{ font-size: 11px; font-weight: 600; color: #202124; }}
    .body {{ padding: 20px 28px; }}
    .kpi-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }}
    .kpi-card {{ background: #f8f9fa; border: 1px solid #dadce0; border-radius: 6px; padding: 12px; border-top: 3px solid #4285F4; }}
    .kpi-num {{ font-family: 'Roboto', sans-serif; font-size: 18px; font-weight: 900; color: #1a73e8; }}
    .kpi-desc {{ font-size: 9.5px; color: #5f6368; margin-top: 2px; }}

    /* Executive 4-Card View Switcher Bar */
    .view-switcher-bar {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; padding: 6px; background: #f8f9fa; border: 1px solid #dadce0; border-radius: 10px; }}
    .view-tab-btn {{ display: flex; align-items: center; gap: 10px; padding: 9px 12px; background: #ffffff; border: 1px solid #dadce0; border-radius: 8px; cursor: pointer; text-align: left; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); position: relative; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }}
    .view-tab-btn:hover {{ border-color: #4285f4; background: #f8fafd; transform: translateY(-1px); box-shadow: 0 3px 8px rgba(66, 133, 244, 0.08); }}
    .view-tab-btn.active {{ background: #ffffff; border: 2px solid #4285F4; box-shadow: 0 4px 12px rgba(66, 133, 244, 0.16); transform: translateY(-1px); }}
    .view-tab-btn.active::after {{ content: ''; position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%); width: 28px; height: 3px; background: #4285F4; border-radius: 2px; }}
    .vtab-icon-box {{ width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: #f1f3f4; color: #5f6368; transition: all 0.2s ease; }}
    .vtab-icon-box svg {{ width: 16px; height: 16px; }}
    .vtab-ico-blue {{ background: #e8f0fe; color: #1a73e8; }}
    .vtab-ico-green {{ background: #e6f4ea; color: #137333; }}
    .vtab-ico-purple {{ background: #f3e8fd; color: #673ab7; }}
    .vtab-ico-amber {{ background: #fef7e0; color: #b06000; }}
    .view-tab-btn.active .vtab-icon-box {{ box-shadow: 0 1px 3px rgba(0,0,0,0.12); }}
    .vtab-content {{ display: flex; flex-direction: column; gap: 2px; min-width: 0; overflow: hidden; }}
    .vtab-title {{ font-family: 'Roboto', sans-serif; font-size: 11px; font-weight: 700; color: #202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color 0.2s ease; }}
    .view-tab-btn.active .vtab-title {{ color: #1a73e8; }}
    .vtab-sub {{ display: flex; align-items: center; }}
    .vtab-badge {{ font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 600; color: #5f6368; background: #f1f3f4; padding: 1px 5px; border-radius: 3px; white-space: nowrap; }}
    .view-tab-btn.active .vtab-badge {{ background: #e8f0fe; color: #174ea6; font-weight: 700; }}


    /* View Headers & Containers */
    .view-header {{ display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; gap: 8px; }}
    .view-title {{ font-family: 'Roboto', sans-serif; font-size: 13.5px; font-weight: 700; color: #202124; }}
    .view-sub {{ font-size: 10px; color: #5f6368; margin-top: 2px; }}
    .view-actions {{ display: flex; align-items: center; gap: 6px; }}

    /* Analysis Interpretation Cards */
    .analysis-card {{ background: #f8fafd; border: 1px solid #dadce0; border-left: 4px solid #4285F4; border-radius: 6px; padding: 14px 16px; margin-top: 16px; }}
    .analysis-header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e8eaed; }}
    .analysis-title {{ font-family: 'Roboto', sans-serif; font-size: 12px; font-weight: 700; color: #202124; }}
    .analysis-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 12px; }}
    .analysis-kpi-box {{ background: #ffffff; border: 1px solid #dadce0; border-radius: 6px; padding: 9px 12px; }}
    .analysis-kpi-lbl {{ font-family: 'Roboto', sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; color: #5f6368; }}
    .analysis-kpi-val {{ font-family: 'Roboto', sans-serif; font-size: 15px; font-weight: 900; color: #202124; margin: 2px 0; }}
    .analysis-kpi-sub {{ font-size: 9px; color: #70757a; }}
    .analysis-narrative p {{ font-size: 10.5px; line-height: 1.55; color: #3c4043; margin-bottom: 6px; }}
    .analysis-narrative p:last-child {{ margin-bottom: 0; }}

    /* Matrix Subtotals & Grand Totals */
    .tr-subtotal td {{ font-weight: 800 !important; font-size: 10px; }}
    .tr-subtotal-trading td {{ background: #eaf7ed !important; color: #137333 !important; border-top: 2px solid #34a853 !important; border-bottom: 2px solid #34a853 !important; }}
    .tr-subtotal-service td {{ background: #ebf3fe !important; color: #1a73e8 !important; border-top: 2px solid #4285f4 !important; border-bottom: 2px solid #4285f4 !important; }}
    .tr-subtotal-production td {{ background: #fef8e7 !important; color: #b06000 !important; border-top: 2px solid #fbbc05 !important; border-bottom: 2px solid #fbbc05 !important; }}
    .tr-grandtotal td {{ background: linear-gradient(90deg, #1a73e8, #673ab7) !important; color: #ffffff !important; font-weight: 900 !important; font-size: 10.5px !important; border: none !important; }}

    /* Sector & Matrix Badges */
    .sec-badge {{ display: inline-block; padding: 2px 7px; border-radius: 10px; font-family: 'Roboto', sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }}
    .sec-badge-trading {{ background: #e6f4ea; color: #137333; border: 1px solid #a8dab5; }}
    .sec-badge-service {{ background: #e8f0fe; color: #1a73e8; border: 1px solid #b3d1ff; }}
    .sec-badge-production {{ background: #fef7e0; color: #b06000; border: 1px solid #fedc9b; }}

    .cell-zero {{ color: #bdc1c6; font-size: 9px; }}
    .pill-cnt {{ display: inline-block; min-width: 20px; text-align: center; padding: 1px 5px; border-radius: 4px; font-weight: 700; font-size: 9.5px; }}
    .pill-sc {{ background: #e6f4ea; color: #137333; }}
    .pill-st {{ background: #e0f2fe; color: #0284c7; }}
    .pill-obc {{ background: #fef7e0; color: #b06000; }}
    .pill-gen {{ background: #e8f0fe; color: #1a73e8; }}
    .pill-tot {{ background: #f1f3f4; color: #202124; font-weight: 800; border: 1px solid #dadce0; }}

    /* Mini Progress Bar for Table Columns */
    .mini-bar-wrap {{ display: flex; align-items: center; justify-content: flex-end; gap: 7px; }}
    .mini-bar-track {{ width: 50px; height: 6px; background: #e8eaed; border-radius: 3px; overflow: hidden; display: inline-block; flex-shrink: 0; }}
    .mini-bar-fill {{ height: 100%; border-radius: 3px; }}
    .mini-bar-lbl {{ font-size: 9.5px; font-weight: 700; min-width: 38px; text-align: right; }}

    /* Category & Rank Badges */
    .cat-tag {{ display: inline-block; font-family: 'Roboto', sans-serif; font-size: 7.5px; font-weight: 700; text-transform: uppercase; padding: 1px 5px; border-radius: 3px; margin-left: 6px; vertical-align: middle; }}
    .tag-green {{ background: #e6f4ea; color: #137333; }}
    .tag-blue {{ background: #e8f0fe; color: #1a73e8; }}
    .tag-amber {{ background: #fef7e0; color: #b06000; }}
    .tag-purple {{ background: #f3e8fd; color: #673ab7; }}
    .tag-red {{ background: #fce8e6; color: #c5221f; }}
    .tag-grey {{ background: #f1f3f4; color: #5f6368; }}

    .rank-badge {{ display: inline-block; width: 18px; height: 18px; line-height: 18px; border-radius: 50%; text-align: center; font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 800; margin-right: 5px; vertical-align: middle; }}
    .rank-1 {{ background: #fef7e0; color: #b06000; border: 1px solid #fbbc05; box-shadow: 0 1px 2px rgba(251,188,5,0.2); }}
    .rank-2 {{ background: #f1f3f4; color: #3c4043; border: 1px solid #dadce0; }}
    .rank-3 {{ background: #fce8e6; color: #c5221f; border: 1px solid #ea4335; }}
    .rank-sub {{ background: #e8f0fe; color: #1a73e8; border: 1px solid #d2e3fc; }}

    .sh {{ font-family: 'Roboto', sans-serif; font-size: 9.5px; font-weight: 700; text-transform: uppercase; color: #202124; margin: 16px 0 8px; padding-bottom: 3px; border-bottom: 1.5px solid #dadce0; display: flex; align-items: center; gap: 6px; }}
    .sh::before {{ content: ''; width: 3px; height: 11px; background: #4285f4; border-radius: 2px; }}
    .cat-bar {{ display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #e8eaed; }}
    .cat-btn {{ background: #f1f3f4; border: 1px solid #dadce0; border-radius: 14px; font-size: 9.5px; font-weight: 600; padding: 3px 10px; cursor: pointer; color: #5f6368; }}
    .active-btn {{ background: #e8f0fe !important; border-color: #1a73e8 !important; color: #1a73e8 !important; font-weight: 700 !important; }}
    .grid-2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }}
    .grid-3 {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }}
    .q-card {{ background: #fff; border: 1px solid #dadce0; border-radius: 6px; padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.03); }}
    .q-card-top {{ display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 6px; }}
    .q-header {{ font-family: 'Roboto', sans-serif; font-size: 10px; font-weight: 700; text-transform: uppercase; margin-bottom: 0; }}
    .q-actions {{ display: flex; align-items: center; gap: 6px; }}
    .prov-badge {{ font-family: 'Roboto', sans-serif; font-size: 8.5px; font-weight: 700; color: #5f6368; background: #e8eaed; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.3px; }}
    .btn-copy-tbl {{ font-family: 'Roboto', sans-serif; font-size: 8.5px; font-weight: 600; color: #1a73e8; background: #f8f9fa; border: 1px solid #dadce0; padding: 2px 7px; border-radius: 4px; cursor: pointer; transition: all 0.15s ease; white-space: nowrap; }}
    .btn-copy-tbl:hover {{ background: #e8f0fe; border-color: #4285F4; color: #1967d2; }}
    .btn-copy-tbl.copied {{ background: #e6f4ea !important; border-color: #34A853 !important; color: #137333 !important; font-weight: 700; }}
    .table-container {{ width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin-bottom: 14px; }}
    table {{ width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 14px; border: 1.5px solid #d2d6dc; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }}
    th {{ font-family: 'Roboto', sans-serif; font-size: 8.5px; font-weight: 700; text-transform: uppercase; color: #fff; background: #1e293b; padding: 7px 10px; text-align: left; letter-spacing: 0.3px; }}
    td {{ padding: 6px 10px; font-size: 10px; border-bottom: 1px solid #e8eaed; color: #3c4043; vertical-align: middle; }}
    tr:last-child td {{ border-bottom: none; }}
    tbody tr:nth-child(even) {{ background: #f9fafb; }}
    tbody tr:hover {{ background: #f0f7ff !important; transition: background 0.15s ease; }}

    /* Specific Branded Table Headers */
    #tblSocialMatrixComplete thead tr:first-child th {{ background: #1e293b; color: #f8fafc; border-right: 1px solid rgba(255,255,255,0.08); }}
    #tblSocialMatrixComplete thead tr:nth-child(2) th {{ background: #334155; color: #f8fafc; border-right: 1px solid rgba(255,255,255,0.08); }}
    #tblSocialMatrixComplete th.col-sc {{ background: #137333 !important; color: #ffffff !important; }}
    #tblSocialMatrixComplete th.col-st {{ background: #0284c7 !important; color: #ffffff !important; }}
    #tblSocialMatrixComplete th.col-obc {{ background: #b06000 !important; color: #ffffff !important; }}
    #tblSocialMatrixComplete th.col-gen {{ background: #1a73e8 !important; color: #ffffff !important; }}
    #tblSocialMatrixComplete th.col-tot {{ background: #4338ca !important; color: #ffffff !important; }}

    #tblCapitalSources thead th {{ background: linear-gradient(135deg, #1a73e8, #1557b0); color: #ffffff; }}
    #tblLoanUsages thead th {{ background: linear-gradient(135deg, #b06000, #d97706); color: #ffffff; }}
    #tblFamilySupport thead th {{ background: linear-gradient(135deg, #137333, #188038); color: #ffffff; }}
    #tblSourcingComfort thead th {{ background: linear-gradient(135deg, #1a73e8, #185abc); color: #ffffff; }}
    .sig-section {{ display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-top: 20px; padding-top: 14px; border-top: 1px solid #dadce0; }}
    .sig-title {{ font-family: 'Roboto', sans-serif; font-size: 9px; font-weight: 700; color: #1a73e8; text-decoration: none; }}
    .footer {{ background: #fff; padding: 12px 28px; border-top: 1.5px solid #dadce0; display: flex; flex-direction: column; gap: 6px; }}
    .footer-row {{ display: flex; justify-content: space-between; align-items: center; min-height: 22px; }}
    .footer-logo {{ height: 20px; }}
    .footer-txt {{ font-family: 'Roboto', sans-serif; font-size: 9.5px; color: #5f6368; }}
    .socials {{ display: flex; gap: 6px; }}
    .s-link {{ width: 20px; height: 20px; border-radius: 50%; background: #f1f3f4; display: inline-flex; align-items: center; justify-content: center; }}
    .s-link svg {{ width: 11px; height: 11px; fill: currentColor; }}

    /* Mobile & Tablet Responsive Media Queries */
    @media (max-width: 768px) {{
      body {{ padding: 8px 6px; }}
      .page {{ border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }}
      .hero {{ padding: 14px 16px 12px; flex-direction: column; gap: 12px; align-items: stretch; }}
      .hero-title {{ font-size: 17px; }}
      .hero > div:last-child {{ display: flex; justify-content: space-between; align-items: center; text-align: left; }}
      .f-panel {{ padding: 10px 14px; }}
      .f-panel > div {{ flex-direction: column; align-items: stretch !important; gap: 10px !important; }}
      .dropdown-wrapper {{ flex-direction: column; align-items: stretch; gap: 4px; width: 100%; }}
      .custom-dropdown {{ width: 100%; }}
      .dd-btn {{ padding: 8px 12px; min-height: 38px; }}
      .dd-menu {{ width: 100%; }}
      .filter-badge {{ width: 100%; text-align: center; padding: 6px 10px; font-size: 10px; }}
      .meta-grid {{ padding: 10px 14px; grid-template-columns: repeat(2, 1fr); gap: 8px; }}
      .body {{ padding: 14px 12px; }}
      .kpi-grid {{ grid-template-columns: repeat(2, 1fr); gap: 8px; }}
      .kpi-card {{ padding: 10px; }}
      .kpi-num {{ font-size: 16px; }}
      .view-switcher-bar {{ grid-template-columns: repeat(2, 1fr); gap: 8px; }}
      .view-tab-btn {{ padding: 8px 10px; }}

      .analysis-grid {{ grid-template-columns: repeat(2, 1fr); gap: 8px; }}
      .view-header {{ flex-direction: column; gap: 8px; }}
      .cat-bar {{ flex-wrap: nowrap; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 6px; }}
      .cat-btn {{ white-space: nowrap; flex-shrink: 0; padding: 4px 10px; font-size: 10px; }}
      .grid-2, .grid-3 {{ grid-template-columns: 1fr; gap: 10px; }}
      .q-card {{ padding: 10px; }}
      .q-card-top {{ flex-direction: column; gap: 6px; align-items: flex-start; }}
      .q-actions {{ width: 100%; justify-content: space-between; }}
      .sig-section {{ grid-template-columns: 1fr; gap: 16px; }}
      .footer {{ padding: 12px 14px; }}
      .footer-row {{ flex-direction: column; gap: 6px; align-items: flex-start; }}
      .footer-row:last-child {{ flex-direction: row; justify-content: space-between; align-items: center; }}
      table {{ font-size: 9.5px; }}
      th, td {{ padding: 5px 8px; }}
    }}

    @media (max-width: 480px) {{
      body {{ padding: 0; background: #fff; }}
      .page {{ border-radius: 0; box-shadow: none; }}
      .kpi-grid {{ grid-template-columns: 1fr; }}
      .meta-grid {{ grid-template-columns: 1fr; }}
      .view-switcher-bar {{ grid-template-columns: 1fr; gap: 6px; }}
      .analysis-grid {{ grid-template-columns: 1fr; }}

      .auth-card {{ max-width: 95vw; }}
      .auth-body {{ padding: 22px 18px; }}
      .auth-input {{ font-size: 16px; }}
    }}
    """
