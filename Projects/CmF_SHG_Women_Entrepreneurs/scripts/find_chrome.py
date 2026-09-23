import os
import subprocess

paths = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe")
]

chrome_path = None
for p in paths:
    if os.path.exists(p):
        chrome_path = p
        print(f"Found Chrome at: {p}")
        break

if not chrome_path:
    print("Chrome not found in standard paths.")
