"""
Client-Side Reactive Filtering & Calculation Script Engine for Master Web Dashboard.
Manages multi-district and multi-block dropdown selections and real-time DOM updates.
Strictly adheres to <= 300 lines per file policy, pure ASCII only (Rule A5).
"""


from .dashboard_copy_script import get_copy_client_script


def get_master_client_script() -> str:
    """Returns the pure vanilla JavaScript engine for multi-district filtering and table copying."""
    filter_js = """
    let selectedDistricts = [];
    let selectedBlocks = [];
    let currentCategory = 'all';

    function initFilters() {
      selectAllDistricts(false);
      selectAllBlocks(false);
      applyFilters();
    }

    function toggleDropdown(menuId) {
      const menu = document.getElementById(menuId);
      const isOpen = menu.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) menu.classList.add('open');
    }

    function closeAllDropdowns() {
      document.querySelectorAll('.dd-menu').forEach(m => m.classList.remove('open'));
    }

    document.addEventListener('click', function(e) {
      if (!e.target.closest('.custom-dropdown')) {
        closeAllDropdowns();
      }
    });

    function toggleDistrict(code) {
      const idx = selectedDistricts.indexOf(code);
      if (idx > -1) selectedDistricts.splice(idx, 1);
      else selectedDistricts.push(code);
      updateFilterUI();
      applyFilters();
    }

    function selectAllDistricts(refresh = true) {
      selectedDistricts = window.FILTER_DISTRICTS.map(d => d.code);
      updateFilterUI();
      if (refresh) applyFilters();
    }

    function clearAllDistricts() {
      selectedDistricts = [];
      updateFilterUI();
      applyFilters();
    }

    function toggleBlock(code) {
      const idx = selectedBlocks.indexOf(code);
      if (idx > -1) selectedBlocks.splice(idx, 1);
      else selectedBlocks.push(code);
      updateFilterUI();
      applyFilters();
    }

    function selectAllBlocks(refresh = true) {
      selectedBlocks = window.FILTER_BLOCKS.map(b => b.code);
      updateFilterUI();
      if (refresh) applyFilters();
    }

    function clearAllBlocks() {
      selectedBlocks = [];
      updateFilterUI();
      applyFilters();
    }

    function renderDropdownItems() {
      const dList = document.getElementById('ddDistList');
      if (dList) {
        let html = '';
        window.FILTER_DISTRICTS.forEach(d => {
          const checked = selectedDistricts.includes(d.code) ? 'checked' : '';
          html += '<label class="dd-item">' +
            '<input type="checkbox" value="' + d.code + '" ' + checked + ' onchange="toggleDistrict(this.value)">' +
            '<span>' + d.name + ' (' + d.count + ')</span>' +
          '</label>';
        });
        dList.innerHTML = html;
      }

      const bList = document.getElementById('ddBlkList');
      if (bList) {
        let html = '';
        window.FILTER_BLOCKS.forEach(b => {
          const checked = selectedBlocks.includes(b.code) ? 'checked' : '';
          const distActive = selectedDistricts.length === 0 || selectedDistricts.includes(b.district);
          const style = distActive ? '' : 'style="opacity:0.4;"';
          html += '<label class="dd-item" ' + style + '>' +
            '<input type="checkbox" value="' + b.code + '" ' + checked + ' onchange="toggleBlock(this.value)">' +
            '<span>' + b.name + ' (' + b.count + ')</span>' +
          '</label>';
        });
        bList.innerHTML = html;
      }
    }

    function updateFilterUI() {
      renderDropdownItems();

      const dLabel = document.getElementById('ddDistLabel');
      if (dLabel) {
        if (selectedDistricts.length === window.FILTER_DISTRICTS.length) {
          dLabel.innerText = 'All Districts (' + window.FILTER_DISTRICTS.reduce((a, b) => a + b.count, 0) + ')';
        } else if (selectedDistricts.length === 1) {
          const dObj = window.FILTER_DISTRICTS.find(d => d.code === selectedDistricts[0]);
          dLabel.innerText = dObj ? dObj.name + ' (' + dObj.count + ')' : '1 District';
        } else if (selectedDistricts.length === 0) {
          dLabel.innerText = 'None Selected (0)';
        } else {
          dLabel.innerText = selectedDistricts.length + ' Districts Selected';
        }
      }

      const bLabel = document.getElementById('ddBlkLabel');
      if (bLabel) {
        if (selectedBlocks.length === window.FILTER_BLOCKS.length) {
          bLabel.innerText = 'All Blocks (' + window.FILTER_BLOCKS.reduce((a, b) => a + b.count, 0) + ')';
        } else if (selectedBlocks.length === 1) {
          const bObj = window.FILTER_BLOCKS.find(b => b.code === selectedBlocks[0]);
          bLabel.innerText = bObj ? bObj.name + ' (' + bObj.count + ')' : '1 Block';
        } else if (selectedBlocks.length === 0) {
          bLabel.innerText = 'None Selected (0)';
        } else {
          bLabel.innerText = selectedBlocks.length + ' Blocks Selected';
        }
      }
    }

    function filterCategory(cat) {
      currentCategory = cat;
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active-btn'));
      const activeBtn = document.getElementById('btn_cat_' + cat);
      if (activeBtn) activeBtn.classList.add('active-btn');
      document.querySelectorAll('.sec-group').forEach(g => {
        g.style.display = (cat === 'all' || g.classList.contains(cat)) ? 'block' : 'none';
      });
    }

    function renderBars(containerId, items, n) {
      const el = document.getElementById(containerId);
      if (!el) return;
      let html = '';
      items.forEach(it => {
        const pct = n > 0 ? (it.count / n * 100) : 0;
        const color = it.color || '#4285F4';
        const tagHtml = it.tag ? ' <span style="font-size:8px;font-weight:500;color:#5f6368;background:#f1f3f4;padding:1px 5px;border-radius:3px;">' + it.tag + '</span>' : '';
        html += '<div style="margin-bottom:7px;">' +
          '<div style="display:flex;justify-content:space-between;font-size:10px;font-weight:600;margin-bottom:2px;">' +
            '<span>' + it.label + tagHtml + '</span>' +
            '<span>' + it.count + ' WE (' + pct.toFixed(1) + '%)</span>' +
          '</div>' +
          '<div style="height:6px;background:#e8eaed;border-radius:3px;overflow:hidden;">' +
            '<div style="width:' + pct.toFixed(1) + '%;height:100%;background:' + color + ';border-radius:3px;"></div>' +
          '</div>' +
        '</div>';
      });
      el.innerHTML = html;
    }

    function applyFilters() {
      const rows = window.SURVEY_ROWS.filter(r => {
        const dMatch = selectedDistricts.length === 0 || selectedDistricts.includes(r.district);
        const bMatch = selectedBlocks.length === 0 || selectedBlocks.includes(r.block);
        return dMatch && bMatch;
      });

      const n = rows.length;
      const distNames = [...new Set(rows.map(r => r.district))].map(d => d.replace('DIST_', '').replace('_', ' '));
      const blkNames = [...new Set(rows.map(r => r.block))].map(b => b.replace('BLK_', '').replace('_', ' '));

      document.getElementById('metaSampleVal').innerText = n + ' WE';
      document.getElementById('metaDistrictVal').innerText = distNames.length > 0 ? distNames.join(', ') : 'None';
      document.getElementById('metaBlockVal').innerText = blkNames.length > 0 ? blkNames.join(', ') : 'None';
      document.getElementById('lblDistrictTitle').innerText = (distNames.length === 1 ? distNames[0] : (distNames.length > 1 ? distNames.length + ' Districts' : 'No Data')) + ' Analysis';
      document.getElementById('filterSummaryBadge').innerText = n + ' Women Entrepreneurs (' + distNames.length + ' Districts · ' + blkNames.length + ' Blocks selected)';

      const totCap = rows.reduce((acc, r) => acc + (r.tot_cap || 0), 0);
      const avgCap = n > 0 ? (totCap / n) : 0;
      const qrCnt = rows.filter(r => r.q23 === 'OPT_YES').length;
      const qrPct = n > 0 ? (qrCnt / n * 100) : 0;

      document.getElementById('kpiTotalWE').innerText = n;
      document.getElementById('kpiTotalFunds').innerText = 'Rs ' + Math.round(totCap).toLocaleString();
      document.getElementById('kpiAvgFunds').innerText = 'Rs ' + Math.round(avgCap).toLocaleString();
      document.getElementById('kpiDigitalQR').innerText = qrPct.toFixed(1) + '%';

      (window.QUESTIONS_MAP || []).forEach(qm => {
        const items = qm.opts.map(opt => {
          let cnt = 0;
          if (qm.isMulti) {
            cnt = rows.filter(r => r[qm.col] && r[qm.col].includes(opt.code)).length;
          } else if (Array.isArray(opt.code)) {
            cnt = rows.filter(r => opt.code.includes(r[qm.col])).length;
          } else {
            cnt = rows.filter(r => r[qm.col] === opt.code).length;
          }
          return { label: opt.label, count: cnt, color: opt.color || '#4285F4', tag: opt.tag };
        });
        renderBars(qm.id, items, n);
      });

      const famB = [
        { label: 'Upto 4', count: rows.filter(r => r.q9 !== null && r.q9 <= 4).length, color: '#4285F4' },
        { label: '4 to 6', count: rows.filter(r => r.q9 !== null && r.q9 > 4 && r.q9 <= 6).length, color: '#4285F4' },
        { label: '6 to 8', count: rows.filter(r => r.q9 !== null && r.q9 > 6 && r.q9 <= 8).length, color: '#4285F4' },
        { label: '8 to 10', count: rows.filter(r => r.q9 !== null && r.q9 > 8 && r.q9 <= 10).length, color: '#4285F4' },
        { label: 'More than 10', count: rows.filter(r => r.q9 !== null && r.q9 > 10).length, color: '#4285F4' }
      ];
      renderBars('qContent_9', famB, n);

      const earnB = [1, 2, 3, 4, 5, 6].map(k => ({ label: k + ' Earning Members', count: rows.filter(r => r.q10 == k).length, color: '#673AB7' }));
      renderBars('qContent_10', earnB, n);

      const setV = rows.filter(r => r.t28_setup !== null).map(r => r.t28_setup);
      const loanV = rows.filter(r => r.t28_loan !== null).map(r => r.t28_loan);
      const shgV = rows.filter(r => r.t28_shg !== null).map(r => r.t28_shg);
      document.getElementById('t28Setup').innerText = (setV.length > 0 ? (setV.reduce((a, b) => a + b, 0) / setV.length) : 0).toFixed(1) + ' Yrs';
      document.getElementById('t28Loan').innerText = (loanV.length > 0 ? (loanV.reduce((a, b) => a + b, 0) / loanV.length) : 0).toFixed(1) + ' Yrs';
      document.getElementById('t28Shg').innerText = (shgV.length > 0 ? (shgV.reduce((a, b) => a + b, 0) / shgV.length) : 0).toFixed(1) + ' Yrs';

      const actMap = {};
      rows.forEach(r => (r.activities || []).forEach(act => actMap[act] = (actMap[act] || 0) + 1));
      const topActs = Object.entries(actMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
      let actHtml = '';
      topActs.forEach(([act, cnt]) => {
        const cleanAct = act.replace(/^ACT_/, '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
        const pct = n > 0 ? (cnt / n * 100) : 0;
        actHtml += '<tr><td>' + cleanAct + '</td><td>Enterprise</td><td>' + cnt + '</td><td>' + pct.toFixed(1) + '%</td></tr>';
      });
      document.getElementById('tblTopActivities').innerHTML = actHtml || '<tr><td colspan="4">No activities found.</td></tr>';

      const csts = [
        { label: 'SC', code: 'CST_SC' }, { label: 'ST', code: 'CST_ST' },
        { label: 'OBC', code: 'CST_OBC' }, { label: 'General', code: 'CST_GEN' }
      ];
      let cHtml = '';
      csts.forEach(c => {
        const cnt = rows.filter(r => r.q7 === c.code).length;
        const pct = n > 0 ? (cnt / n * 100) : 0;
        cHtml += '<tr><td>' + c.label + '</td><td>' + cnt + '</td><td>' + pct.toFixed(1) + '%</td></tr>';
      });
      document.getElementById('tblCasteMatrix').innerHTML = cHtml;
    }
    """
    return filter_js + "\n" + get_copy_client_script()
