#!/usr/bin/env python3
"""
OmmNoMi Autonomous SOP Learning Updater
Allows agents or developers to record new learnings, anti-patterns, and rules
directly into workspace SOPs and AGENTS.md automatically.

Usage:
    python3 update_sop_learning.py --sop sop-console-automation --title "Payload Chunking" --learning "Never exceed 60 lines per block to prevent Windows clipboard truncation."
    python3 update_sop_learning.py --log "Discovered that unquoted DisplayNames with / are evaluated as division."
"""

import os
import sys
import argparse
from datetime import datetime

WORKSPACE_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../.."))
SKILLS_DIR = os.path.join(WORKSPACE_ROOT, ".agents", "skills")
AGENTS_MD = os.path.join(WORKSPACE_ROOT, ".agents", "AGENTS.md")
LEARNINGS_LOG = os.path.join(WORKSPACE_ROOT, ".agents", "LEARNINGS_LOG.md")

def append_to_sop(sop_name: str, title: str, learning: str):
    sop_file = os.path.join(SKILLS_DIR, sop_name, "SKILL.md")
    if not os.path.exists(sop_file):
        print(f"[WARN] SOP file not found: {sop_file}. Creating or falling back to general log.")
        target_file = LEARNINGS_LOG
    else:
        target_file = sop_file

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    entry = f"\n\n### [Learning] {title} ({timestamp})\n- **Rule / Observation**: {learning}\n"

    with open(target_file, "a", encoding="utf-8") as f:
        f.write(entry)
    print(f"[OK] Successfully appended learning to: {target_file}")

    # Also record in centralized log
    with open(LEARNINGS_LOG, "a", encoding="utf-8") as f:
        f.write(f"\n- **[{timestamp}] [{sop_name}] {title}**: {learning}")

def main():
    parser = argparse.ArgumentParser(description="Update SOP with new learning")
    parser.add_argument("--sop", default="sop-ommnomi-standard", help="Target SOP skill name")
    parser.add_argument("--title", required=True, help="Short title of the learning")
    parser.add_argument("--learning", required=True, help="Detailed explanation, root cause, and preventive rule")

    args = parser.parse_args()
    append_to_sop(args.sop, args.title, args.learning)

if __name__ == "__main__":
    main()
