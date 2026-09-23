import os
import json

local_state_path = os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\User Data\Local State")
print(f"Checking Local State: {local_state_path} (Exists: {os.path.exists(local_state_path)})")

if os.path.exists(local_state_path):
    try:
        with open(local_state_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        profiles = data.get("profile", {}).get("info_cache", {})
        print(f"Found {len(profiles)} Chrome profiles:")
        for prof_dir, prof_info in profiles.items():
            name = prof_info.get("name")
            email = prof_info.get("user_name")
            print(f"  - Directory: '{prof_dir}' | Name: '{name}' | Email: '{email}'")
    except Exception as e:
        print(f"Error reading Local State: {e}")
