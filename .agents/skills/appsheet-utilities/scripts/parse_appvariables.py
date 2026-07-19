#!/usr/bin/env python3
"""
parse_appvariables.py — AppVariables Processor for OmmNoMi AppSheet Projects
=============================================================================
Parses the standard AppSheet AppVariables CSV export and produces a clean,
AI-context-optimized Markdown document, enriching the schema produced by
parse_appdoc.py with the full variable configuration layer.

AppVariables are the "global constants" of an AppSheet app — they store all
dynamic Enum lists, company configuration, rate tables, URL links, and file
resources.  The appdoc alone does NOT capture their values.  This processor
fills that gap.

Usage:
    # Minimal — writes output next to the CSV
    python3 parse_appvariables.py <AppVariables.csv>

    # Custom output path
    python3 parse_appvariables.py <AppVariables.csv> --output <output.md>

    # Also emit JSON (machine-readable, useful for linting / cross-ref)
    python3 parse_appvariables.py <AppVariables.csv> --json

    # Only show variables belonging to a specific Tag group
    python3 parse_appvariables.py <AppVariables.csv> --filter-tag Options

Output columns consumed from the CSV
-------------------------------------
  ID            — Variable ID (key used in AppSheet formulas, e.g. AppVar("StationDSP"))
  Type          — Logical category bucket (Company, Scorecard, Options, Email, …)
  Tags          — Sub-classification tags (comma-separated)
  ValueControl  — Control type: Enum, Multi, Decimal, URL, Photo, File, Date
  Title         — Human-readable label
  UsedFor       — Free-text description of where/how this variable is used
  Decimal       — Value when ValueControl = Decimal
  EnumValue     — Value (label/header) when ValueControl = Enum
  MultiValues   — Comma-separated list when ValueControl = Multi
  DateValue     — Value when ValueControl = Date
  Photo         — AppResources path when ValueControl = Photo
  URL           — URL string when ValueControl = URL
  File          — AppResources path when ValueControl = File
  Description   — Additional notes
  EnumList      — Secondary dependent list (used with Enum headers)
  LastEditBy    — UID of last editor
  LastEditOn    — Timestamp of last edit
"""

import csv
import sys
import os
import json
import argparse
from collections import defaultdict, OrderedDict
from datetime import datetime

# ─── ANSI Color Codes (for terminal summary) ─────────────────────────────────
RED    = "\033[91m"
YELLOW = "\033[93m"
GREEN  = "\033[92m"
CYAN   = "\033[96m"
BOLD   = "\033[1m"
RESET  = "\033[0m"

# ─── VALUE CONTROL GROUPS ────────────────────────────────────────────────────
# Maps ValueControl → which CSV field carries the actual value
VALUE_FIELD_MAP = {
    "Decimal":  "Decimal",
    "Enum":     "EnumValue",
    "Multi":    "MultiValues",
    "Date":     "DateValue",
    "Photo":    "Photo",
    "URL":      "URL",
    "File":     "File",
}

# Friendly emoji prefix per control type (purely cosmetic in Markdown)
CONTROL_ICON = {
    "Decimal": "🔢",
    "Enum":    "🏷️",
    "Multi":   "📋",
    "Date":    "📅",
    "Photo":   "🖼️",
    "URL":     "🔗",
    "File":    "📄",
}

# ─── Helpers ─────────────────────────────────────────────────────────────────

def clean(val: str) -> str:
    """Strip surrounding whitespace and leading/trailing commas from a value."""
    return val.strip().strip(",").strip()


def parse_multi(val: str) -> list:
    """Parse a Multi value string (space-separated commas) into a clean list."""
    if not val:
        return []
    parts = [p.strip() for p in val.split(",") if p.strip()]
    return parts


def resolve_value(row: dict) -> tuple:
    """
    Returns (resolved_value, source_field) for a row based on ValueControl.
    Falls back to scanning all value fields if ValueControl is unmapped.
    """
    vc = row.get("ValueControl", "").strip()
    field = VALUE_FIELD_MAP.get(vc)
    if field:
        val = row.get(field, "").strip()
        return val, field

    # Fallback: scan all value fields and return first non-empty
    for f in VALUE_FIELD_MAP.values():
        val = row.get(f, "").strip()
        if val:
            return val, f
    return "", "—"


def format_multi_as_md_list(multi_str: str) -> str:
    """Convert a Multi value string into a markdown bullet list."""
    items = parse_multi(multi_str)
    if not items:
        return "  _empty_"
    return "\n".join("  - `" + item + "`" for item in items)


# ─── CSV Parser ──────────────────────────────────────────────────────────────

def load_appvariables(csv_path: str) -> list:
    """
    Load and normalise the AppVariables CSV export.
    Returns a list of row dicts with all fields stripped.
    """
    rows = []
    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row in reader:
            normalised = {k.strip(): v.strip() for k, v in row.items() if k}
            rows.append(normalised)
    return rows


# ─── Markdown Generator ──────────────────────────────────────────────────────

def render_variable_block(row: dict) -> str:
    """Render a single AppVariable as a Markdown sub-section."""
    var_id      = row.get("ID", "—")
    type_       = row.get("Type", "—")
    tags        = clean(row.get("Tags", ""))
    vc          = row.get("ValueControl", "—")
    title       = row.get("Title", "")
    used_for    = row.get("UsedFor", "")
    description = row.get("Description", "")
    enum_list   = row.get("EnumList", "")
    last_edit   = row.get("LastEditOn", "")

    icon = CONTROL_ICON.get(vc, "⚙️")
    val, src = resolve_value(row)

    lines = []
    lines.append("#### `" + var_id + "` " + icon + " " + title)
    lines.append("")

    # Core metadata table
    meta_rows = []
    if tags:
        meta_rows.append(("Type / Tags", "`" + type_ + "`  ·  " + tags))
    else:
        meta_rows.append(("Type / Tags", "`" + type_ + "`"))
    meta_rows.append(("Control", "`" + vc + "`"))
    if used_for:
        meta_rows.append(("Used For", used_for))
    if description:
        meta_rows.append(("Notes", description))
    if last_edit:
        meta_rows.append(("Last Edit", last_edit))

    lines.append("| Field | Value |")
    lines.append("|-------|-------|")
    for k, v in meta_rows:
        lines.append("| " + k + " | " + v + " |")
    lines.append("")

    # Value block
    if vc == "Multi":
        lines.append("**Options:**")
        lines.append(format_multi_as_md_list(val))
    elif vc == "Decimal":
        lines.append("**Value:** `" + val + "`" if val else "**Value:** _not set_")
    elif vc == "Enum":
        lines.append("**Label / Header:** `" + val + "`" if val else "**Label:** _not set_")
        if enum_list:
            lines.append("")
            lines.append("**Dependent List (EnumList):**")
            lines.append(format_multi_as_md_list(enum_list))
    elif vc == "Photo":
        lines.append("**AppResources Path:** `" + val + "`" if val else "**AppResources Path:** _not set_")
        url = row.get("URL", "").strip()
        if url:
            lines.append("**Source URL:** [" + url + "](" + url + ")")
    elif vc == "URL":
        lines.append("**URL:** [" + val + "](" + val + ")" if val else "**URL:** _not set_")
    elif vc == "File":
        lines.append("**AppResources Path:** `" + val + "`" if val else "**AppResources Path:** _not set_")
    elif vc == "Date":
        lines.append("**Date:** `" + val + "`" if val else "**Date:** _not set_")
    else:
        lines.append("**Value:** `" + val + "`" if val else "**Value:** _not set_")

    lines.append("")
    return "\n".join(lines)


def render_markdown(rows: list, app_name: str, csv_path: str,
                    filter_tag=None) -> str:
    """
    Produce the full Markdown document from a list of AppVariable rows.
    Groups variables by their Type bucket.
    """
    if filter_tag:
        rows = [r for r in rows if filter_tag.lower() in r.get("Tags", "").lower()
                or filter_tag.lower() in r.get("Type", "").lower()]

    # Group by Type
    groups = defaultdict(list)
    for row in rows:
        groups[row.get("Type", "Uncategorised")].append(row)

    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    lines = []

    lines.append("# " + app_name + " — AppVariables Reference")
    lines.append("")
    lines.append("> **Source:** `" + os.path.basename(csv_path) + "`  ")
    lines.append("> **Generated:** " + now + "  ")
    lines.append("> **Total Variables:** " + str(len(rows)))
    lines.append("")
    lines.append("AppVariables are the **global configuration layer** of the AppSheet app.")
    lines.append("They define Enum options, rate tables, company data, links, and file resources.")
    lines.append("Reference them in formulas with: `AppVar(\"<ID>\")`")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Table of Contents
    lines.append("## Table of Contents")
    lines.append("")
    for type_name in sorted(groups.keys()):
        count = len(groups[type_name])
        anchor = type_name.lower().replace(" ", "-").replace("/", "")
        plural = "s" if count != 1 else ""
        lines.append("- [" + type_name + "](#" + anchor + ") — " + str(count) + " variable" + plural)
    lines.append("")
    lines.append("---")
    lines.append("")

    # Per-group sections
    for type_name in sorted(groups.keys()):
        group_rows = groups[type_name]
        lines.append("## " + type_name)
        lines.append("")
        plural = "s" if len(group_rows) != 1 else ""
        lines.append("_" + str(len(group_rows)) + " variable" + plural + "_")
        lines.append("")

        for row in group_rows:
            lines.append(render_variable_block(row))

        lines.append("---")
        lines.append("")

    return "\n".join(lines)


# ─── JSON Export ─────────────────────────────────────────────────────────────

def to_json(rows: list) -> list:
    """
    Produce a cleaned JSON representation of all variables.
    Adds a `resolved_value` key with the primary value regardless of control type.
    """
    out = []
    for row in rows:
        val, src = resolve_value(row)
        entry = {
            "id":            row.get("ID", ""),
            "type":          row.get("Type", ""),
            "tags":          [t.strip() for t in row.get("Tags", "").split(",") if t.strip()],
            "control":       row.get("ValueControl", ""),
            "title":         row.get("Title", ""),
            "used_for":      row.get("UsedFor", ""),
            "description":   row.get("Description", ""),
            "resolved_value": val,
            "value_source":  src,
            "enum_list":     parse_multi(row.get("EnumList", "")),
            "last_edit_on":  row.get("LastEditOn", ""),
            "last_edit_by":  row.get("LastEditBy", ""),
        }
        # Include raw multi values as a list for convenience
        if row.get("ValueControl", "").strip() == "Multi":
            entry["options"] = parse_multi(row.get("MultiValues", ""))
        out.append(entry)
    return out


# ─── Summary Printer ─────────────────────────────────────────────────────────

def print_summary(rows: list):
    """Print a colour-coded terminal summary."""
    groups = defaultdict(int)
    control_counts = defaultdict(int)
    for row in rows:
        groups[row.get("Type", "Uncategorised")] += 1
        control_counts[row.get("ValueControl", "—")] += 1

    print("\n" + BOLD + CYAN + "AppVariables Summary" + RESET)
    print("  Total variables: " + BOLD + str(len(rows)) + RESET + "\n")

    print(BOLD + "  By Type:" + RESET)
    for t, cnt in sorted(groups.items(), key=lambda x: -x[1]):
        print("    " + CYAN + t.ljust(30) + RESET + str(cnt).rjust(4))

    print("\n" + BOLD + "  By Control:" + RESET)
    for c, cnt in sorted(control_counts.items(), key=lambda x: -x[1]):
        icon = CONTROL_ICON.get(c, "⚙️")
        print("    " + icon + " " + YELLOW + c.ljust(20) + RESET + str(cnt).rjust(4))
    print()


# ─── CLI Entry Point ──────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Parse an AppSheet AppVariables CSV export into Markdown + optional JSON."
    )
    parser.add_argument("csv_path", help="Path to the AppVariables CSV file")
    parser.add_argument(
        "--output", "-o",
        help="Output path for the Markdown file. Defaults to <csv_name>_appvars.md next to the CSV."
    )
    parser.add_argument(
        "--json", action="store_true",
        help="Also emit a <csv_name>_appvars.json file alongside the Markdown."
    )
    parser.add_argument(
        "--filter-tag", metavar="TAG",
        help="Only include variables whose Type or Tags contain this string (case-insensitive)."
    )
    parser.add_argument(
        "--app-name", metavar="NAME",
        help="Override the app name used in the Markdown header. Defaults to CSV filename stem."
    )
    args = parser.parse_args()

    csv_path = args.csv_path
    if not os.path.isfile(csv_path):
        print(RED + "ERROR: File not found: " + csv_path + RESET, file=sys.stderr)
        sys.exit(1)

    # Derive app name from the filename if not supplied
    # e.g. "NaviMain - AppVariables (1).csv" → "NaviMain"
    stem = os.path.splitext(os.path.basename(csv_path))[0]
    app_name = args.app_name or stem.split(" - ")[0].strip()

    # Determine output path
    if args.output:
        out_md = args.output
    else:
        out_dir = os.path.dirname(os.path.abspath(csv_path))
        safe_stem = stem.replace(" ", "_").replace("(", "").replace(")", "")
        out_md = os.path.join(out_dir, safe_stem + "_appvars.md")

    # Load
    rows = load_appvariables(csv_path)
    print_summary(rows)

    # Render Markdown
    md = render_markdown(rows, app_name=app_name, csv_path=csv_path,
                         filter_tag=args.filter_tag)
    with open(out_md, "w", encoding="utf-8") as f:
        f.write(md)
    print(GREEN + "✓ Markdown written to:" + RESET + " " + out_md)

    # Optionally emit JSON
    if args.json:
        json_rows = to_json(rows)
        out_json = out_md.replace(".md", ".json")
        with open(out_json, "w", encoding="utf-8") as f:
            json.dump(json_rows, f, indent=2, ensure_ascii=False)
        print(GREEN + "✓ JSON written to:     " + RESET + " " + out_json)


if __name__ == "__main__":
    main()
