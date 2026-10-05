"""
Client-Side Reactive Script Engine for Multi-Sheet View Switcher.
Computes Social Category Matrix (Sheet 2), Agency & Sourcing (Sheet 3),
and Finance & Capital views dynamically.
Strictly adheres to <= 300 lines rule and pure ASCII standard (Rule A5).
"""


def get_views_client_script() -> str:
    """Returns pure vanilla JavaScript for the multi-sheet switcher and table calculators."""
    return """
    let activeDashboardView = 'sheet4';

    function switchDashboardView(viewId) {
      activeDashboardView = viewId;
      document.querySelectorAll('.view-tab-btn').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById('btn_view_' + viewId);
      if (activeBtn) activeBtn.classList.add('active');

      document.querySelectorAll('.dash-view').forEach(v => v.style.display = 'none');
      const targetView = document.getElementById('view_' + viewId);
      if (targetView) targetView.style.display = 'block';
    }

    function updateSocialMatrix(rows) {
      const tbody = document.getElementById('tblMatrixBody');
      if (!tbody || !window.ACTIVITIES_CONFIG) return;

      const n = rows.length;
      let html = '';
      let curSector = '';
      let secSC = 0, secST = 0, secOBC = 0, secGEN = 0, secTot = 0;
      let grandSC = 0, grandST = 0, grandOBC = 0, grandGEN = 0, grandTot = 0;
      const sectorTotals = { 'Trading': 0, 'Service': 0, 'Production': 0 };
      const topActivityTracker = [];

      window.ACTIVITIES_CONFIG.forEach((act, idx) => {
        if (curSector && curSector !== act.sector) {
          html += '<tr class="tr-subtotal">' +
            '<td colspan="3" style="font-weight:700;text-transform:uppercase;">TOTAL ' + curSector + '</td>' +
            '<td style="text-align:right;font-weight:700;">' + secSC + '</td>' +
            '<td style="text-align:right;font-weight:700;">' + secST + '</td>' +
            '<td style="text-align:right;font-weight:700;">' + secOBC + '</td>' +
            '<td style="text-align:right;font-weight:700;">' + secGEN + '</td>' +
            '<td style="text-align:right;font-weight:700;">' + secTot + '</td>' +
          '</tr>';
          secSC = 0; secST = 0; secOBC = 0; secGEN = 0; secTot = 0;
        }

        curSector = act.sector;
        const matching = rows.filter(r => (r.activities || []).some(c => act.codes.includes(c)));
        const sc = matching.filter(r => r.q7 === 'CST_SC').length;
        const st = matching.filter(r => r.q7 === 'CST_ST').length;
        const obc = matching.filter(r => r.q7 === 'CST_OBC').length;
        const gen = matching.filter(r => r.q7 === 'CST_GEN').length;
        const tot = matching.length;

        secSC += sc; secST += st; secOBC += obc; secGEN += gen; secTot += tot;
        grandSC += sc; grandST += st; grandOBC += obc; grandGEN += gen; grandTot += tot;
        sectorTotals[act.sector] = (sectorTotals[act.sector] || 0) + tot;
        if (tot > 0) topActivityTracker.push({ title: act.title, count: tot, sector: act.sector });

        const isNewSector = idx === 0 || window.ACTIVITIES_CONFIG[idx - 1].sector !== act.sector;
        const sectorSpan = isNewSector ? '<td rowspan="10" class="sector-td">' + act.sector + '</td>' : '';

        html += '<tr>' +
          '<td style="text-align:center;font-weight:700;color:#5f6368;">' + act.sector + '</td>' +
          '<td style="text-align:center;color:#5f6368;">' + act.num + '</td>' +
          '<td style="font-weight:500;">' + act.title + '</td>' +
          '<td style="text-align:right;' + (sc > 0 ? 'font-weight:700;color:#137333;' : 'color:#9aa0a6;') + '">' + sc + '</td>' +
          '<td style="text-align:right;' + (st > 0 ? 'font-weight:700;color:#137333;' : 'color:#9aa0a6;') + '">' + st + '</td>' +
          '<td style="text-align:right;' + (obc > 0 ? 'font-weight:700;color:#b06000;' : 'color:#9aa0a6;') + '">' + obc + '</td>' +
          '<td style="text-align:right;' + (gen > 0 ? 'font-weight:700;color:#1a73e8;' : 'color:#9aa0a6;') + '">' + gen + '</td>' +
          '<td style="text-align:right;' + (tot > 0 ? 'font-weight:700;background:#f8f9fa;' : 'color:#9aa0a6;') + '">' + tot + '</td>' +
        '</tr>';
      });

      if (curSector) {
        html += '<tr class="tr-subtotal">' +
          '<td colspan="3" style="font-weight:700;text-transform:uppercase;">TOTAL ' + curSector + '</td>' +
          '<td style="text-align:right;font-weight:700;">' + secSC + '</td>' +
          '<td style="text-align:right;font-weight:700;">' + secST + '</td>' +
          '<td style="text-align:right;font-weight:700;">' + secOBC + '</td>' +
          '<td style="text-align:right;font-weight:700;">' + secGEN + '</td>' +
          '<td style="text-align:right;font-weight:700;">' + secTot + '</td>' +
        '</tr>';
      }

      html += '<tr class="tr-grandtotal">' +
        '<td colspan="3" style="font-weight:900;text-transform:uppercase;">GRAND TOTAL (ALL ENTERPRISES)</td>' +
        '<td style="text-align:right;font-weight:900;">' + grandSC + '</td>' +
        '<td style="text-align:right;font-weight:900;">' + grandST + '</td>' +
        '<td style="text-align:right;font-weight:900;">' + grandOBC + '</td>' +
        '<td style="text-align:right;font-weight:900;">' + grandGEN + '</td>' +
        '<td style="text-align:right;font-weight:900;">' + grandTot + '</td>' +
      '</tr>';

      tbody.innerHTML = html;

      // Update Matrix Analysis Card
      const topSec = Object.entries(sectorTotals).sort((a,b) => b[1] - a[1])[0] || ['Service', 0];
      const scStPct = n > 0 ? ((rows.filter(r => r.q7 === 'CST_SC' || r.q7 === 'CST_ST').length / n) * 100).toFixed(1) : '0.0';
      const obcPct = n > 0 ? ((rows.filter(r => r.q7 === 'CST_OBC').length / n) * 100).toFixed(1) : '0.0';
      topActivityTracker.sort((a,b) => b.count - a.count);
      const top3Count = topActivityTracker.slice(0, 3).reduce((acc, t) => acc + t.count, 0);
      const top3Pct = n > 0 ? ((top3Count / n) * 100).toFixed(1) : '0.0';

      document.getElementById('matKpiTopSector').innerText = topSec[0] + ' (' + topSec[1] + ')';
      document.getElementById('matKpiScStShare').innerText = scStPct + '%';
      document.getElementById('matKpiObcShare').innerText = obcPct + '%';
      document.getElementById('matKpiDiversity').innerText = 'Top 3: ' + top3Pct + '%';

      const narrativeEl = document.getElementById('matNarrativeText');
      if (narrativeEl) {
        const top3Names = topActivityTracker.slice(0, 3).map(t => t.title + ' (' + t.count + ')').join(', ');
        narrativeEl.innerHTML = '<p><strong>Sectoral Distribution:</strong> The active enterprise cohort is primarily concentrated in the <strong>' + topSec[0] + '</strong> sector (' + topSec[1] + ' activities logged). Key vocational anchors are ' + (top3Names || 'none') + '.</p>' +
          '<p><strong>Social Inclusivity:</strong> Marginalized communities (SC and ST) represent <strong>' + scStPct + '%</strong> of total surveyed entrepreneurs, while OBCs constitute <strong>' + obcPct + '%</strong>. SVEP interventions demonstrate robust equity reach across marginalized social strata, with high participation in tailoring, grocery, and local value-addition trades.</p>';
      }
    }

    function updateAgencyView(rows) {
      const n = rows.length;
      const famDefs = [
        { code: 'HRESP_FULL_SUPPORT', label: 'Full support of husband/family in every possible way' },
        { code: 'HRESP_FINANCIAL', label: 'Husband supports/supported financially' },
        { code: 'HRESP_LATER_SUPPORT', label: 'Not supportive initially, but now helps when required' },
        { code: 'HRESP_NO_SUPPORT', label: 'Running enterprise without anyone support' },
        { code: 'HRESP_NEED_HELP', label: 'Need help from family in running enterprise more effectively' }
      ];

      const fBody = document.getElementById('tblFamilySupportBody');
      if (fBody) {
        let fHtml = '';
        let fTot = 0;
        famDefs.forEach(fd => {
          const cnt = rows.filter(r => (r.family_support || []).some(c => c.includes(fd.code))).length;
          fTot += cnt;
          const pct = n > 0 ? (cnt / n * 100).toFixed(1) : '0.0';
          fHtml += '<tr><td>' + fd.label + '</td><td style="text-align:right;font-weight:600;">' + cnt + '</td><td style="text-align:right;">' + pct + '%</td></tr>';
        });
        fHtml += '<tr style="background:#f1f3f4;font-weight:700;"><td>TOTAL RESPONSES</td><td style="text-align:right;">' + fTot + '</td><td style="text-align:right;">-</td></tr>';
        fBody.innerHTML = fHtml;
      }

      const srcDefs = [
        { code: 'SRC_TRAVEL_ALONE', label: 'Travel alone & handle negotiations independently' },
        { code: 'SRC_NEED_COMPANION', label: 'Need travel companion but handle negotiations independently' },
        { code: 'SRC_FAMILY_HANDLES', label: 'Family member handles purchase' },
        { code: 'SRC_CONTENT_NEARBY', label: 'Content to source material from nearby market' },
        { code: 'SRC_CRP_HELPS', label: 'OSF/SVEP CRP helps in sourcing material' },
        { code: 'SRC_WANT_DIFF_PLACES', label: 'Want to source from different places but need support' }
      ];

      const sBody = document.getElementById('tblSourcingComfortBody');
      if (sBody) {
        let sHtml = '';
        let sTot = 0;
        srcDefs.forEach(sd => {
          const cnt = rows.filter(r => (r.sourcing_comfort || []).some(c => c.includes(sd.code))).length;
          sTot += cnt;
          const pct = n > 0 ? (cnt / n * 100).toFixed(1) : '0.0';
          sHtml += '<tr><td>' + sd.label + '</td><td style="text-align:right;font-weight:600;">' + cnt + '</td><td style="text-align:right;">' + pct + '%</td></tr>';
        });
        sHtml += '<tr style="background:#f1f3f4;font-weight:700;"><td>TOTAL RESPONSES</td><td style="text-align:right;">' + sTot + '</td><td style="text-align:right;">-</td></tr>';
        sBody.innerHTML = sHtml;
      }

      // KPIs and Narrative
      const soloCnt = rows.filter(r => (r.sourcing_comfort || []).some(c => c.includes('SRC_TRAVEL_ALONE'))).length;
      const proxyCnt = rows.filter(r => (r.sourcing_comfort || []).some(c => c.includes('SRC_FAMILY_HANDLES'))).length;
      const fullSuppCnt = rows.filter(r => (r.family_support || []).some(c => c.includes('HRESP_FULL_SUPPORT'))).length;
      const needExtCnt = rows.filter(r => (r.sourcing_comfort || []).some(c => c.includes('SRC_WANT_DIFF_PLACES'))).length;

      document.getElementById('agKpiSoloTravel').innerText = (n > 0 ? (soloCnt / n * 100).toFixed(1) : '0.0') + '%';
      document.getElementById('agKpiFamilyProxy').innerText = (n > 0 ? (proxyCnt / n * 100).toFixed(1) : '0.0') + '%';
      document.getElementById('agKpiFullSupport').innerText = (n > 0 ? (fullSuppCnt / n * 100).toFixed(1) : '0.0') + '%';
      document.getElementById('agKpiSupportNeed').innerText = (n > 0 ? (needExtCnt / n * 100).toFixed(1) : '0.0') + '%';

      const agNarr = document.getElementById('agNarrativeText');
      if (agNarr) {
        agNarr.innerHTML = '<p><strong>Mobility & Negotiation Agency:</strong> <strong>' + (n > 0 ? (soloCnt / n * 100).toFixed(1) : '0.0') + '%</strong> of women entrepreneurs travel completely alone to wholesale markets and handle price negotiations independently, marking substantial gender empowerment. However, <strong>' + (n > 0 ? (proxyCnt / n * 100).toFixed(1) : '0.0') + '%</strong> still rely on male family proxies for procurement.</p>' +
          '<p><strong>Intra-Household Dynamics:</strong> <strong>' + (n > 0 ? (fullSuppCnt / n * 100).toFixed(1) : '0.0') + '%</strong> of entrepreneurs report complete spousal and family cooperation. Strategic priority: expand CRP-assisted bulk procurement linkages to enable the <strong>' + (n > 0 ? (needExtCnt / n * 100).toFixed(1) : '0.0') + '%</strong> of women desiring wider supplier access to bypass local retail markups.</p>';
      }
    }

    function updateFinanceView(rows) {
      const n = rows.length;
      const srcAgg = {};
      let totalAllCap = 0;

      rows.forEach(r => {
        Object.entries(r.cap_sources || {}).forEach(([src, amt]) => {
          if (!srcAgg[src]) srcAgg[src] = { count: 0, amount: 0 };
          srcAgg[src].count += 1;
          srcAgg[src].amount += amt;
          totalAllCap += amt;
        });
      });

      const capBody = document.getElementById('tblCapitalSourcesBody');
      if (capBody) {
        let capHtml = '';
        const sortedSrcs = Object.entries(srcAgg).sort((a,b) => b[1].amount - a[1].amount);
        sortedSrcs.forEach(([src, data]) => {
          const avg = data.count > 0 ? (data.amount / data.count) : 0;
          const pct = totalAllCap > 0 ? (data.amount / totalAllCap * 100).toFixed(1) : '0.0';
          capHtml += '<tr>' +
            '<td style="font-weight:600;">' + src + '</td>' +
            '<td style="text-align:right;">' + data.count + '</td>' +
            '<td style="text-align:right;font-weight:700;">Rs ' + Math.round(data.amount).toLocaleString() + '</td>' +
            '<td style="text-align:right;">Rs ' + Math.round(avg).toLocaleString() + '</td>' +
            '<td style="text-align:right;font-weight:600;color:#1a73e8;">' + pct + '%</td>' +
          '</tr>';
        });
        capHtml += '<tr style="background:#e8f0fe;font-weight:700;">' +
          '<td>TOTAL CAPITAL MOBILIZED</td>' +
          '<td style="text-align:right;">' + n + '</td>' +
          '<td style="text-align:right;font-weight:900;">Rs ' + Math.round(totalAllCap).toLocaleString() + '</td>' +
          '<td style="text-align:right;">Rs ' + (n > 0 ? Math.round(totalAllCap / n).toLocaleString() : '0') + '</td>' +
          '<td style="text-align:right;">100.0%</td>' +
        '</tr>';
        capBody.innerHTML = capHtml || '<tr><td colspan="5">No capital data logged.</td></tr>';
      }

      // Table 13: Loan Usages
      const uMap = {};
      rows.forEach(r => (r.q13 || []).forEach(u => uMap[u] = (uMap[u] || 0) + 1));
      const uBody = document.getElementById('tblLoanUsagesBody');
      if (uBody) {
        let uHtml = '';
        const sortedU = Object.entries(uMap).sort((a,b) => b[1] - a[1]);
        sortedU.forEach(([u, cnt]) => {
          const pct = n > 0 ? (cnt / n * 100).toFixed(1) : '0.0';
          uHtml += '<tr><td>' + u + '</td><td style="text-align:right;font-weight:600;">' + cnt + '</td><td style="text-align:right;">' + pct + '%</td></tr>';
        });
        uBody.innerHTML = uHtml || '<tr><td colspan="3">No loan usage logged.</td></tr>';
      }

      // Finance KPIs & Narrative
      const shgAmt = (srcAgg['SHG'] ? srcAgg['SHG'].amount : 0) + (srcAgg['OSF/SVEP'] ? srcAgg['OSF/SVEP'].amount : 0);
      const bankAmt = (srcAgg['Banks'] ? srcAgg['Banks'].amount : 0) + (srcAgg['Mudra loan'] ? srcAgg['Mudra loan'].amount : 0);
      const profitAmt = srcAgg['Profit from business'] ? srcAgg['Profit from business'].amount : 0;

      const shgPct = totalAllCap > 0 ? (shgAmt / totalAllCap * 100).toFixed(1) : '0.0';
      const bankPct = totalAllCap > 0 ? (bankAmt / totalAllCap * 100).toFixed(1) : '0.0';
      const profitPct = totalAllCap > 0 ? (profitAmt / totalAllCap * 100).toFixed(1) : '0.0';

      document.getElementById('finKpiTotalCap').innerText = 'Rs ' + Math.round(totalAllCap).toLocaleString();
      document.getElementById('finKpiShgShare').innerText = shgPct + '%';
      document.getElementById('finKpiBankShare').innerText = bankPct + '%';
      document.getElementById('finKpiProfitShare').innerText = profitPct + '%';

      const finNarr = document.getElementById('finNarrativeText');
      if (finNarr) {
        finNarr.innerHTML = '<p><strong>Community Credit Reliance:</strong> SHG and OSF/SVEP institutional credit accounts for <strong>' + shgPct + '%</strong> of total debt capital, demonstrating that the community institutional architecture is the lifeblood of rural female micro-enterprises.</p>' +
          '<p><strong>Commercial Banking Gap:</strong> Formal banking institutions (including Mudra schemes) account for only <strong>' + bankPct + '%</strong> of deployed capital. Enterprise growth is largely buffered by reinvested profits (<strong>' + profitPct + '%</strong>) and family assistance. Critical intervention: bridge the collateral and paperwork gap to unlock formal bank branch credit.</p>';
      }
    }
"""
