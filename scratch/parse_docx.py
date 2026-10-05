import zipfile
import xml.etree.ElementTree as ET

docx_path = r"C:\Users\hardi\Downloads\Questionnaire_SHG_Performance_CMF_Reorganised.docx"
ns = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
}

with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read("word/document.xml")
    root = ET.fromstring(xml_content)

lines = []
body = root.find('w:body', ns)

for elem in body:
    tag = elem.tag.split('}')[-1]
    if tag == 'p':
        p_text = "".join(node.text for node in elem.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text)
        if p_text.strip():
            lines.append(f"[P] {p_text.strip()}")
    elif tag == 'tbl':
        lines.append("[TABLE START]")
        for row in elem.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tr'):
            row_cells = []
            for cell in row.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}tc'):
                cell_text = " ".join(node.text for node in cell.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text)
                row_cells.append(cell_text.strip())
            lines.append("  | " + " | ".join(row_cells) + " |")
        lines.append("[TABLE END]")

with open(r"c:\Users\hardi\AppSheets\scratch\docx_full.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"Parsed docx: {len(lines)} lines written.")
