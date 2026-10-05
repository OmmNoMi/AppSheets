import zipfile
import xml.etree.ElementTree as ET

docx_path = r"C:\Users\hardi\Downloads\Questionnaire_SHG_Performance_CMF_Reorganised.docx"
with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read("word/document.xml")
    root = ET.fromstring(xml_content)
    # namespaces
    ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    texts = [elem.text for elem in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if elem.text]
    print("Found text tokens:", len(texts))
    full_text = " ".join(texts[:100])
    print("Sample text:", full_text[:500])
