import re

with open('projects/Orbit/_AppDoc/AppDoc.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's inspect the first Action control in Orbit AppDoc
matches = re.findall(r'<table class="react-bridge-group" data-type="Controls"[^>]*>([\s\S]*?)</table>', html)
if matches:
    print("=== FIRST ACTION CONTROL IN ORBIT ===")
    print(matches[0])
