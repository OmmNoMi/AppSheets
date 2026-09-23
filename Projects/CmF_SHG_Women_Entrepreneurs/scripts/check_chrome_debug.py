import urllib.request
import json
import subprocess

print("=== Checking Chrome Remote Debugging Ports ===")
for port in [9222, 9223, 9333, 9876]:
    try:
        url = f"http://127.0.0.1:{port}/json"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=2) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"Port {port} is active! Open targets: {len(data)}")
            for t in data:
                print(f"  - [{t.get('type')}] {t.get('title')} ({t.get('url')})")
    except Exception as e:
        pass

print("\n=== Checking Running Chrome Processes ===")
try:
    cmd = 'powershell "Get-Process chrome | Select-Object Id, ProcessName, MainWindowTitle"'
    out = subprocess.check_output(cmd, shell=True).decode('utf-8', errors='ignore')
    print(out)
except Exception as e:
    print(e)
