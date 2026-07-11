#!/usr/bin/env python3
"""
linter.py — AppSheet Schema Linter for OmmNoMi Projects
=========================================================
Analyzes a parsed AppSheet schema markdown file and produces a technical
debt report, flagging violations of established OmmNoMi standards.

USAGE:
  python3 linter.py <path_to_schema.md>

  Example:
  python3 linter.py /Users/ommnomi/AppSheets/Projects/Navi/_AppDoc/Navi_schema.md

OUTPUT:
  A color-coded report of warnings and errors, grouped by rule violation.
"""

import sys
import re

# ─── ANSI Color Codes ─────────────────────────────────────────────────────────
RED    = "\033[91m"
YELLOW = "\033[93m"
GREEN  = "\033[92m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"


# ─── Rule Definitions ─────────────────────────────────────────────────────────
# Each rule is a function that receives a list of line strings and returns
# a list of (line_no, message) tuples.

def rule_hardcoded_enum(lines):
    """
    RULE: Enum/EnumList columns should NOT have hardcoded values.
    They should use the AppVariables pattern via Valid_If.
    Detects: [Values: '...'] pattern in schema output.
    """
    issues = []
    table_name = None
    for i, line in enumerate(lines):
        if line.startswith("### ") and "(cols)" in line:
            table_name = line.strip("# \n").split("(")[0].strip()
        match = re.search(r'\[Values: (.+?)\]', line)
        if match:
            col_match = re.match(r'\s+(\w[\w ]+):', line)
            col = col_match.group(1).strip() if col_match else "Unknown Column"
            values = match.group(1)
            issues.append((i + 1, f"HARDCODED ENUM  [{table_name}].[{col}] has hardcoded values: {values} → Migrate to AppVariables pattern"))
    return issues


def rule_dereference_without_ref(lines):
    """
    RULE: Any column whose formula contains a dereference (e.g. [Col].[Field])
    should only appear if the base column is a Ref type.
    Detects formulas that dereference but the column type is not Ref.
    """
    issues = []
    table_name = None
    # Collect all Ref columns per table
    ref_cols = set()
    current_table = None
    for i, line in enumerate(lines):
        if line.startswith("### ") and "(cols)" in line:
            current_table = line.strip("# \n").split("(")[0].strip()
            ref_cols = set()
        col_match = re.match(r'\s+(\w[\w ]+):\s+Ref', line)
        if col_match:
            ref_cols.add(col_match.group(1).strip())

    # Second pass: look for dereference formulas on non-Ref columns
    current_table = None
    ref_cols_by_table = {}
    for i, line in enumerate(lines):
        if line.startswith("### ") and "(cols)" in line:
            current_table = line.strip("# \n").split("(")[0].strip()
            if current_table not in ref_cols_by_table:
                ref_cols_by_table[current_table] = set()
        col_ref_match = re.match(r'\s+(\w[\w ]+):\s+Ref', line)
        if col_ref_match and current_table:
            ref_cols_by_table[current_table].add(col_ref_match.group(1).strip())

    current_table = None
    local_refs = set()
    for i, line in enumerate(lines):
        if line.startswith("### ") and "(cols)" in line:
            current_table = line.strip("# \n").split("(")[0].strip()
            local_refs = ref_cols_by_table.get(current_table, set())
        # Look for =[ColName].[Something] in formulas
        formula_match = re.search(r'=\[(\w[\w ]*)\]\.', line)
        if formula_match and current_table:
            base_col = formula_match.group(1)
            if base_col not in local_refs:
                col_match = re.match(r'\s+(\w[\w ]+):', line)
                col = col_match.group(1).strip() if col_match else "Unknown"
                issues.append((i + 1, f"INVALID DEREF    [{current_table}].[{col}] dereferences [{base_col}] but it is not a Ref column"))
    return issues


def rule_missing_key_column(lines):
    """
    RULE: Every real table should have exactly one Key column.
    """
    issues = []
    table_name = None
    key_count = 0
    for i, line in enumerate(lines):
        if line.startswith("### ") and "(cols)" in line:
            if table_name and key_count == 0 and not table_name.startswith("Process"):
                issues.append((i + 1, f"MISSING KEY      [{table_name}] has no column marked as Key"))
            table_name = line.strip("# \n").split("(")[0].strip()
            key_count = 0
        if "[KEY]" in line or "= =uniqueid()" in line.lower() or "= =max(" in line.lower():
            key_count += 1
    return issues


def rule_no_label_column(lines):
    """
    RULE: Every table should have a Label column set for proper display in Refs.
    """
    issues = []
    table_name = None
    has_label = False
    for i, line in enumerate(lines):
        if line.startswith("### ") and "(cols)" in line:
            if table_name and not has_label and not table_name.startswith("Process"):
                issues.append((i + 1, f"MISSING LABEL    [{table_name}] has no column marked as Label → Refs to this table will show raw IDs"))
            table_name = line.strip("# \n").split("(")[0].strip()
            has_label = False
        if "[LABEL]" in line or "(→\"=" in line:
            has_label = True
    return issues


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    if len(sys.argv) < 2:
        print(f"{YELLOW}Usage: python3 linter.py <path_to_schema.md>{RESET}")
        sys.exit(1)

    schema_path = sys.argv[1]
    try:
        with open(schema_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except FileNotFoundError:
        print(f"{RED}❌ File not found: {schema_path}{RESET}")
        sys.exit(1)

    print(f"\n{BOLD}{CYAN}╔══════════════════════════════════════════════════╗{RESET}")
    print(f"{BOLD}{CYAN}║      AppSheet Schema Linter — OmmNoMi v1.0       ║{RESET}")
    print(f"{BOLD}{CYAN}╚══════════════════════════════════════════════════╝{RESET}")
    print(f"  Analyzing: {schema_path}\n")

    rules = [
        rule_hardcoded_enum,
        rule_dereference_without_ref,
        rule_missing_key_column,
        rule_no_label_column,
    ]

    all_issues = []
    for rule in rules:
        issues = rule(lines)
        all_issues.extend(issues)

    if not all_issues:
        print(f"{GREEN}✅ No issues found! Schema looks clean.{RESET}\n")
        return

    # Sort by line number
    all_issues.sort(key=lambda x: x[0])

    error_count   = sum(1 for _, m in all_issues if "MISSING KEY" in m or "INVALID DEREF" in m)
    warning_count = len(all_issues) - error_count

    print(f"  Found {RED}{error_count} Errors{RESET} and {YELLOW}{warning_count} Warnings{RESET}\n")
    print(f"  {'Line':<6} {'Issue'}")
    print(f"  {'─'*4}   {'─'*60}")

    for line_no, message in all_issues:
        if "MISSING KEY" in message or "INVALID DEREF" in message:
            color = RED
            prefix = "❌"
        else:
            color = YELLOW
            prefix = "⚠️ "
        print(f"  {str(line_no):<6} {color}{prefix} {message}{RESET}")

    print(f"\n{BOLD}Summary: {RED}{error_count} errors{RESET}, {BOLD}{YELLOW}{warning_count} warnings{RESET} found.\n")


if __name__ == '__main__':
    main()
