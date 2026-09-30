import csv
from collections import defaultdict
import html

sections = defaultdict(list)
with open('ALL_SURVEY_QUESTIONS.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for r in reader:
        col = r.get('Column')
        qid = r.get('QuestionID')
        sec = r.get('Section')
        eng = r.get('English Prompt')
        hi = r.get('Hindi Prompt')
        if col and qid:
            sections[sec].append({
                'col': col.strip(),
                'qid': qid.strip(),
                'eng': eng.strip() if eng else '',
                'hi': hi.strip() if hi else ''
            })

html_out = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>OmmNoMi AppSheet Survey Engine — Display Name Copy Tool</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8f9fa; margin: 0; padding: 20px; color: #202124; }
  .header { background: white; padding: 20px; border-radius: 8px; border: 1px solid #dadce0; margin-bottom: 20px; }
  h1 { margin: 0 0 10px 0; font-size: 24px; color: #1a73e8; }
  .search-box { width: 100%; padding: 12px; font-size: 15px; border: 1px solid #dadce0; border-radius: 6px; box-sizing: border-box; margin-bottom: 20px; }
  .section-card { background: white; border-radius: 8px; border: 1px solid #dadce0; margin-bottom: 20px; overflow: hidden; }
  .section-header { background: #e8f0fe; padding: 12px 20px; font-weight: bold; font-size: 16px; color: #1967d2; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 10px 15px; text-align: left; border-bottom: 1px solid #f1f3f4; font-size: 14px; }
  th { background: #fafafa; font-weight: 600; color: #5f6368; }
  .formula-cell { font-family: monospace; background: #f1f3f4; padding: 6px 10px; border-radius: 4px; display: inline-block; font-size: 13px; color: #137333; }
  .btn-copy { background: #1a73e8; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: 500; transition: background 0.2s; }
  .btn-copy:hover { background: #155724; }
  .btn-copied { background: #34a853 !important; }
  .toast { position: fixed; bottom: 20px; right: 20px; background: #323232; color: white; padding: 12px 24px; border-radius: 4px; display: none; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
</style>
</head>
<body>

<div class="header">
  <h1>🚀 OmmNoMi AppSheet Survey Engine — Display Name Copy Tool</h1>
  <p>Click <b>"Copy Formula"</b> on any column to immediately copy its exact AppSheet expression to your clipboard.</p>
  <input type="text" id="searchInput" class="search-box" placeholder="🔍 Search column name or question text..." onkeyup="filterTable()">
</div>

<div id="sectionsContainer">
"""

for sec, items in sections.items():
    html_out += f"""
<div class="section-card">
  <div class="section-header">
    <span>📁 {html.escape(sec)} ({len(items)} Columns)</span>
  </div>
  <table>
    <thead>
      <tr>
        <th style="width: 50px;">#</th>
        <th style="width: 200px;">Column Name</th>
        <th>Question Text (English / Hindi)</th>
        <th>Display Name Formula</th>
        <th style="width: 120px;">Action</th>
      </tr>
    </thead>
    <tbody>
"""
    for idx, item in enumerate(items, 1):
        col = html.escape(item['col'])
        qid = html.escape(item['qid'])
        eng = html.escape(item['eng'])
        hi = html.escape(item['hi'])
        formula = f'=LOOKUP("{qid}", "AppVariables", "ID", "Label")'
        html_out += f"""
      <tr class="row-item" data-search="{col.lower()} {eng.lower()} {hi.lower()}">
        <td>{idx}</td>
        <td><b><code>{col}</code></b></td>
        <td>{eng}<br><span style="color:#5f6368;font-size:12px;">{hi}</span></td>
        <td><span class="formula-cell">{html.escape(formula)}</span></td>
        <td><button class="btn-copy" onclick="copyText('{formula}', this)">Copy Formula</button></td>
      </tr>
"""
    html_out += """
    </tbody>
  </table>
</div>
"""

html_out += """
</div>

<div id="toast" class="toast">Copied to clipboard!</div>

<script>
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.innerText;
    btn.innerText = "✓ Copied!";
    btn.classList.add("btn-copied");
    showToast("Copied: " + text);
    setTimeout(() => {
      btn.innerText = originalText;
      btn.classList.remove("btn-copied");
    }, 1500);
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.style.display = "block";
  setTimeout(() => { toast.style.display = "none"; }, 2000);
}

function filterTable() {
  const q = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll(".row-item");
  rows.forEach(r => {
    const text = r.getAttribute("data-search");
    if (text.includes(q)) {
      r.style.display = "";
    } else {
      r.style.display = "none";
    }
  });
}
</script>
</body>
</html>
"""

with open('Display_Name_Copy_Tool.html', 'w', encoding='utf-8') as f:
    f.write(html_out)

print("Generated Display_Name_Copy_Tool.html successfully!")
