"""
Multi-Location File Discovery and Suffix Normalization Module.
Finds survey files across CLI args, custom dirs, Downloads, and data/ folder.
Automatically detects latest files and cleans browser duplicate suffixes.
"""

import os
import glob
import shutil
from typing import Dict, Optional, List


DEFAULT_SEARCH_DIRS = [
    "projects/CmF_SHG_Women_Entrepreneurs/data",
    r"C:\Users\hardi\Downloads",
    "data",
    "."
]

CANONICAL_NAMES = {
    "survey": "WCH - Survey.csv",
    "subtable": "WCH - SubTable.csv",
    "subsubtable": "WCH - SubSubTable.csv",
    "appvars": "WCH - AppVariables.csv"
}

SEARCH_PATTERNS = {
    "survey": ["*Survey*.csv"],
    "subtable": ["*SubTable*.csv"],
    "subsubtable": ["*SubSubTable*.csv"],
    "appvars": ["*AppVariables*.csv"]
}


def find_latest_file(key: str, search_dirs: List[str]) -> Optional[str]:
    """Find the newest file matching the key pattern across search directories."""
    candidates = []
    patterns = SEARCH_PATTERNS[key]
    for d in search_dirs:
        if not os.path.exists(d):
            continue
        for pat in patterns:
            matches = glob.glob(os.path.join(d, pat))
            for m in matches:
                # Exclude SubSubTable when searching for SubTable
                if key == "subtable" and "subsubtable" in os.path.basename(m).lower():
                    continue
                candidates.append(m)
    if not candidates:
        return None
    return max(candidates, key=os.path.getmtime)


def sync_and_clean_downloads(
    downloads_dir: str = r"C:\Users\hardi\Downloads",
    target_data_dir: str = "projects/CmF_SHG_Women_Entrepreneurs/data"
) -> None:
    """Detect files with duplicate suffixes in Downloads and sync clean versions to data."""
    if not os.path.exists(downloads_dir):
        return
    os.makedirs(target_data_dir, exist_ok=True)
    for key, cname in CANONICAL_NAMES.items():
        latest = find_latest_file(key, [downloads_dir])
        if latest and os.path.exists(latest):
            dest = os.path.join(target_data_dir, cname)
            if not os.path.exists(dest) or os.path.getmtime(latest) > os.path.getmtime(dest):
                shutil.copy2(latest, dest)


def resolve_all_files(
    custom_survey: Optional[str] = None,
    custom_subtable: Optional[str] = None,
    custom_subsubtable: Optional[str] = None,
    custom_appvars: Optional[str] = None,
    custom_dir: Optional[str] = None,
    data_dir: Optional[str] = None,
    custom_paths: Optional[Dict[str, str]] = None
) -> Dict[str, str]:
    """
    Resolve all 4 required CSV files from CLI args, custom directories, or defaults.
    Returns dictionary with keys: 'survey', 'subtable', 'subsubtable', 'appvars' (plus 'sub', 'subsub').
    """
    search_dirs = []
    target_dir = data_dir or custom_dir
    if target_dir:
        search_dirs.append(target_dir)
    search_dirs.extend(DEFAULT_SEARCH_DIRS)

    sync_and_clean_downloads()

    c_paths = custom_paths or {}
    custom_map = {
        "survey": custom_survey or c_paths.get("survey"),
        "subtable": custom_subtable or c_paths.get("subtable") or c_paths.get("sub"),
        "subsubtable": custom_subsubtable or c_paths.get("subsubtable") or c_paths.get("subsub"),
        "appvars": custom_appvars or c_paths.get("appvars")
    }

    resolved = {}
    for key, cname in CANONICAL_NAMES.items():
        if custom_map[key] and os.path.exists(custom_map[key]):
            resolved[key] = custom_map[key]
            continue
        found = find_latest_file(key, search_dirs)
        if not found or not os.path.exists(found):
            raise FileNotFoundError(
                f"Missing required file for '{key}' (expected '{cname}'). "
                f"Searched across: {search_dirs}"
            )
        resolved[key] = found

    # Aliases
    resolved["sub"] = resolved["subtable"]
    resolved["subsub"] = resolved["subsubtable"]
    return resolved
