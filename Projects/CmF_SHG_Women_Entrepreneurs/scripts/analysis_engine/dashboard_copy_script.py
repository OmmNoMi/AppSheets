"""
Client-side Dual-MIME Table Copy & Provenance Clipboard Engine.
Formats question data into TSV and HTML tables with source metadata for Google Sheets & Excel.
Strictly adheres to <= 300 lines per file policy and Rule A5 (Pure ASCII only).
"""


def get_copy_client_script() -> str:
    """Returns JavaScript engine for dual-MIME clipboard copying and table provenance."""
    return """
    function getActiveRows() {
      return window.SURVEY_ROWS.filter(r => {
        const dMatch = selectedDistricts.length === 0 || selectedDistricts.includes(r.district);
        const bMatch = selectedBlocks.length === 0 || selectedBlocks.includes(r.block);
        return dMatch && bMatch;
      });
    }

    function extractQuestionRows(qId, rows, n) {
      const qm = (window.QUESTIONS_MAP || []).find(q => q.id === qId);
      if (qm) {
        return qm.opts.map(opt => {
          let cnt = 0;
          if (qm.isMulti) {
            cnt = rows.filter(r => r[qm.col] && r[qm.col].includes(opt.code)).length;
          } else if (Array.isArray(opt.code)) {
            cnt = rows.filter(r => opt.code.includes(r[qm.col])).length;
          } else {
            cnt = rows.filter(r => r[qm.col] === opt.code).length;
          }
          const pct = n > 0 ? (cnt / n * 100).toFixed(1) : '0.0';
          return { label: opt.label, count: cnt, pct: pct };
        });
      }

      if (qId === 'qContent_9') {
        const bins = [
          { label: 'Upto 4', count: rows.filter(r => r.q9 !== null && r.q9 <= 4).length },
          { label: '4 to 6', count: rows.filter(r => r.q9 !== null && r.q9 > 4 && r.q9 <= 6).length },
          { label: '6 to 8', count: rows.filter(r => r.q9 !== null && r.q9 > 6 && r.q9 <= 8).length },
          { label: '8 to 10', count: rows.filter(r => r.q9 !== null && r.q9 > 8 && r.q9 <= 10).length },
          { label: 'More than 10', count: rows.filter(r => r.q9 !== null && r.q9 > 10).length }
        ];
        return bins.map(b => ({ label: b.label, count: b.count, pct: n > 0 ? (b.count / n * 100).toFixed(1) : '0.0' }));
      }

      if (qId === 'qContent_10') {
        return [1, 2, 3, 4, 5, 6].map(k => {
          const cnt = rows.filter(r => r.q10 == k).length;
          return { label: k + ' Earning Members', count: cnt, pct: n > 0 ? (cnt / n * 100).toFixed(1) : '0.0' };
        });
      }

      if (qId === 'tblTopActivities') {
        const actMap = {};
        rows.forEach(r => (r.activities || []).forEach(act => actMap[act] = (actMap[act] || 0) + 1));
        return Object.entries(actMap).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([act, cnt]) => {
          const cleanAct = act.replace(/^ACT_/, '').replace(/_/g, ' ').toLowerCase().replace(/\\b\\w/g, l => l.toUpperCase());
          return { label: cleanAct, count: cnt, pct: n > 0 ? (cnt / n * 100).toFixed(1) : '0.0' };
        });
      }

      if (qId === 'tblCasteMatrix') {
        const csts = [{ label: 'SC', code: 'CST_SC' }, { label: 'ST', code: 'CST_ST' }, { label: 'OBC', code: 'CST_OBC' }, { label: 'General', code: 'CST_GEN' }];
        return csts.map(c => {
          const cnt = rows.filter(r => r.q7 === c.code).length;
          return { label: c.label, count: cnt, pct: n > 0 ? (cnt / n * 100).toFixed(1) : '0.0' };
        });
      }

      if (qId === 't28_vintage') {
        const setV = rows.filter(r => r.t28_setup !== null).map(r => r.t28_setup);
        const loanV = rows.filter(r => r.t28_loan !== null).map(r => r.t28_loan);
        const shgV = rows.filter(r => r.t28_shg !== null).map(r => r.t28_shg);
        const aSet = setV.length > 0 ? (setV.reduce((a, b) => a + b, 0) / setV.length).toFixed(1) : '0.0';
        const aLoan = loanV.length > 0 ? (loanV.reduce((a, b) => a + b, 0) / loanV.length).toFixed(1) : '0.0';
        const aShg = shgV.length > 0 ? (shgV.reduce((a, b) => a + b, 0) / shgV.length).toFixed(1) : '0.0';
        return [
          { label: 'Average Enterprise Operation Vintage', count: aSet + ' Yrs', pct: '-' },
          { label: 'Average Years Since Loan Disbursement', count: aLoan + ' Yrs', pct: '-' },
          { label: 'Average Years of SHG Membership', count: aShg + ' Yrs', pct: '-' }
        ];
      }

      return [];
    }

    function copyQuestionTable(qId, btnEl) {
      const meta = (window.PROVENANCE_MAP && window.PROVENANCE_MAP[qId]) || {
        table_no: 'Table', title: 'Survey Indicator', source_col: 'Survey Column', sheet_name: 'Master_Sheet'
      };
      const rows = getActiveRows();
      const n = rows.length;
      const items = extractQuestionRows(qId, rows, n);
      const scopeBadge = document.getElementById('filterSummaryBadge') ? document.getElementById('filterSummaryBadge').innerText : n + ' WE';

      // 1. Plain Text TSV Format for Google Sheets / Excel
      let tsv = meta.table_no + ': ' + meta.title + '\\n';
      tsv += 'Source Column: [' + meta.source_col + '] | Master Sheet: ' + meta.sheet_name + '\\n';
      tsv += 'Filter Scope: ' + scopeBadge + '\\n\\n';
      tsv += 'Category / Indicator\\tCount (WE)\\tShare (%)\\n';
      items.forEach(it => {
        tsv += it.label + '\\t' + it.count + '\\t' + it.pct + '%\\n';
      });
      if (qId !== 't28_vintage') {
        tsv += 'Total Sample\\t' + n + '\\t100.0%\\n';
      }

      // 2. Styled HTML Table Format
      let html = '<table border="1" style="font-family:Arial,sans-serif;border-collapse:collapse;font-size:11px;">';
      html += '<tr><th colspan="3" style="background:#e8f0fe;color:#1a73e8;text-align:left;padding:8px;font-size:12px;"><b>' + meta.table_no + ': ' + meta.title + '</b><br>' +
        '<span style="font-size:10px;color:#5f6368;font-weight:normal;">Source Column: [' + meta.source_col + '] &middot; Master Sheet: ' + meta.sheet_name + '<br>Filter Scope: ' + scopeBadge + '</span></th></tr>';
      html += '<tr style="background:#f1f3f4;font-weight:bold;"><th style="padding:6px;text-align:left;">Category / Indicator</th><th style="padding:6px;text-align:right;">Count (WE)</th><th style="padding:6px;text-align:right;">Share (%)</th></tr>';
      items.forEach(it => {
        html += '<tr><td style="padding:5px 6px;">' + it.label + '</td><td style="padding:5px 6px;text-align:right;">' + it.count + '</td><td style="padding:5px 6px;text-align:right;">' + it.pct + '%</td></tr>';
      });
      if (qId !== 't28_vintage') {
        html += '<tr style="background:#f8f9fa;font-weight:bold;"><td style="padding:6px;">Total Sample</td><td style="padding:6px;text-align:right;">' + n + '</td><td style="padding:6px;text-align:right;">100.0%</td></tr>';
      }
      html += '</table>';

      writeClipboardData(tsv, html, btnEl);
    }

    function writeClipboardData(tsv, html, btnEl) {
      if (navigator.clipboard && window.ClipboardItem) {
        const blobHtml = new Blob([html], { type: 'text/html' });
        const blobText = new Blob([tsv], { type: 'text/plain' });
        navigator.clipboard.write([new ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })]).then(() => {
          triggerCopyFeedback(btnEl);
        }).catch(() => fallbackCopyExec(tsv, btnEl));
      } else {
        fallbackCopyExec(tsv, btnEl);
      }
    }

    function fallbackCopyExec(text, btnEl) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        triggerCopyFeedback(btnEl);
      } catch (e) {
        console.error('Fallback copy failed', e);
      }
      document.body.removeChild(ta);
    }

    function triggerCopyFeedback(btnEl) {
      if (!btnEl) return;
      const originalText = btnEl.innerText;
      btnEl.innerText = 'Copied!';
      btnEl.classList.add('copied');
      setTimeout(() => {
        btnEl.innerText = originalText;
        btnEl.classList.remove('copied');
      }, 1800);
    }
    """
