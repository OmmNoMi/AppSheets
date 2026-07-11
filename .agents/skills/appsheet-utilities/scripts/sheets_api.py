#!/usr/bin/env python3
"""
sheets_api.py — Auto Column Builder for AppSheet/Google Sheets
=============================================================
Safely appends new column headers to row 1 of a Google Sheet tab,
with optional advanced formatting (colors, bold, freeze, auto-resize).

USAGE:
  # Dry-run (default — safe, shows what WOULD happen, touches nothing)
  python3 sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "Col1,Col2,Col3"

  # Live execution (writes headers + applies OmmNoMi standard formatting)
  python3 sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "Col1,Col2,Col3" --execute

  # Live execution without formatting
  python3 sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "Col1,Col2,Col3" --execute --no-format

  # Format ONLY (re-apply formatting to an existing sheet without adding columns)
  python3 sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "" --execute --format-only

FIRST-TIME SETUP:
  Place your credentials.json (from Google Cloud Console) at:
    .agents/skills/appsheet-utilities/credentials.json
  The script will open a browser window once for OAuth login and save a token.
"""

import os
import sys
import argparse
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CREDS_PATH = os.path.join(SCRIPT_DIR, '..', 'credentials.json')
TOKEN_PATH = os.path.join(SCRIPT_DIR, '..', 'token.json')

# ─── OmmNoMi Standard Header Colors ──────────────────────────────────────────
# Dark navy header background with white bold text
HEADER_BG   = {'red': 0.067, 'green': 0.094, 'blue': 0.153}  # #111825
HEADER_TEXT = {'red': 1.0,   'green': 1.0,   'blue': 1.0}    # White

# Key column (first col): teal accent
KEY_BG   = {'red': 0.0,   'green': 0.502, 'blue': 0.502}  # Teal
KEY_TEXT = {'red': 1.0,   'green': 1.0,   'blue': 1.0}

# Timestamp columns (LastUpdate*, *Date, *On): subtle purple tint
TS_BG   = {'red': 0.38, 'green': 0.18, 'blue': 0.56}
TS_TEXT = {'red': 1.0,  'green': 1.0,  'blue': 1.0}

TIMESTAMP_KEYWORDS = ['date', 'on', 'time', 'created', 'updated', 'lastupdate']
KEY_KEYWORDS       = ['id', 'uid', 'key', 'rowid']


def get_credentials():
    """Get or refresh OAuth credentials."""
    creds = None
    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not os.path.exists(CREDS_PATH):
                print(f"❌ ERROR: credentials.json not found at {CREDS_PATH}")
                print("   Follow setup instructions in the appsheet-utilities skill.")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(CREDS_PATH, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(TOKEN_PATH, 'w') as token:
            token.write(creds.to_json())
    return creds


def get_sheet_id(service, spreadsheet_id: str, tab: str) -> int:
    """Get the numeric sheetId for a tab name."""
    meta = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
    for sheet in meta.get('sheets', []):
        if sheet['properties']['title'] == tab:
            return sheet['properties']['sheetId']
    raise ValueError(f"Tab '{tab}' not found in spreadsheet.")


def get_existing_headers(service, spreadsheet_id: str, tab: str) -> list:
    """Fetch current row 1 headers from the tab."""
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheet_id,
        range=f"'{tab}'!1:1"
    ).execute()
    return result.get('values', [[]])[0]


def col_number_to_letter(n: int) -> str:
    """Convert column number (1-indexed) to spreadsheet letter."""
    result = ""
    while n > 0:
        n, remainder = divmod(n - 1, 26)
        result = chr(65 + remainder) + result
    return result


def classify_column(name: str) -> str:
    """Classify a column as 'key', 'timestamp', or 'normal'."""
    lower = name.lower()
    if any(lower == kw or lower.endswith(kw) for kw in KEY_KEYWORDS):
        return 'key'
    if any(kw in lower for kw in TIMESTAMP_KEYWORDS):
        return 'timestamp'
    return 'normal'


def build_format_requests(sheet_id: int, all_headers: list) -> list:
    """Build batchUpdate requests for OmmNoMi standard formatting."""
    requests = []

    # 1. Freeze row 1
    requests.append({
        'updateSheetProperties': {
            'properties': {
                'sheetId': sheet_id,
                'gridProperties': {'frozenRowCount': 1}
            },
            'fields': 'gridProperties.frozenRowCount'
        }
    })

    # 2. Set row 1 height to 28px
    requests.append({
        'updateDimensionProperties': {
            'range': {
                'sheetId': sheet_id,
                'dimension': 'ROWS',
                'startIndex': 0,
                'endIndex': 1
            },
            'properties': {'pixelSize': 28},
            'fields': 'pixelSize'
        }
    })

    # 3. Apply cell-by-cell formatting for each header
    for i, col_name in enumerate(all_headers):
        kind = classify_column(col_name)
        if kind == 'key':
            bg, fg = KEY_BG, KEY_TEXT
        elif kind == 'timestamp':
            bg, fg = TS_BG, TS_TEXT
        else:
            bg, fg = HEADER_BG, HEADER_TEXT

        requests.append({
            'repeatCell': {
                'range': {
                    'sheetId': sheet_id,
                    'startRowIndex': 0, 'endRowIndex': 1,
                    'startColumnIndex': i, 'endColumnIndex': i + 1
                },
                'cell': {
                    'userEnteredFormat': {
                        'backgroundColor': bg,
                        'textFormat': {
                            'foregroundColor': fg,
                            'bold': True,
                            'fontSize': 10,
                            'fontFamily': 'Inter'
                        },
                        'horizontalAlignment': 'CENTER',
                        'verticalAlignment': 'MIDDLE'
                    }
                },
                'fields': 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)'
            }
        })

    # 4. Auto-resize all columns
    requests.append({
        'autoResizeDimensions': {
            'dimensions': {
                'sheetId': sheet_id,
                'dimension': 'COLUMNS',
                'startIndex': 0,
                'endIndex': len(all_headers)
            }
        }
    })

    return requests


def append_columns(service, spreadsheet_id, tab, new_columns, existing_headers, execute, apply_format):
    """Append new columns and optionally format the header row."""
    to_add  = [c for c in new_columns if c not in existing_headers]
    skipped = [c for c in new_columns if c in existing_headers]
    all_headers = existing_headers + to_add

    if skipped:
        print(f"\n⏭️  Already exist (will skip): {', '.join(skipped)}")

    if not to_add and not apply_format:
        print("\n✅ No new columns to add and no formatting requested. Sheet is up to date.")
        return

    start_col_letter = col_number_to_letter(len(existing_headers) + 1)
    target_range = f"'{tab}'!{start_col_letter}1"

    print(f"\n📋 DRY-RUN — What would happen:")
    if to_add:
        print(f"   Add columns at {target_range}: {to_add}")
    if apply_format:
        print(f"   Format row 1 ({len(all_headers)} columns): navy headers, teal key cols, purple timestamps, freeze row 1, auto-resize")

    if not execute:
        print("\n⚠️  DRY-RUN MODE — Nothing was written.")
        print("    Re-run with --execute to apply changes.")
        return

    print(f"\n⚠️  LIVE MODE — About to write to PRODUCTION sheet!")
    confirm = input("    Type 'YES' to confirm: ").strip()
    if confirm != 'YES':
        print("❌ Aborted by user.")
        return

    # Write headers
    if to_add:
        body = {'values': [to_add]}
        service.spreadsheets().values().update(
            spreadsheetId=spreadsheet_id,
            range=target_range,
            valueInputOption='RAW',
            body=body
        ).execute()
        print(f"\n✅ Added {len(to_add)} columns: {', '.join(to_add)}")

    # Apply formatting
    if apply_format:
        sheet_id = get_sheet_id(service, spreadsheet_id, tab)
        fmt_requests = build_format_requests(sheet_id, all_headers)
        service.spreadsheets().batchUpdate(
            spreadsheetId=spreadsheet_id,
            body={'requests': fmt_requests}
        ).execute()
        print(f"🎨 Applied OmmNoMi formatting to {len(all_headers)} columns.")

    print("\n✅ Done!")


def main():
    parser = argparse.ArgumentParser(description='AppSheet Auto-Column Builder')
    parser.add_argument('--sheet',       required=True,  help='Google Spreadsheet ID')
    parser.add_argument('--tab',         required=True,  help='Sheet tab name')
    parser.add_argument('--columns',     required=True,  help='Comma-separated column names')
    parser.add_argument('--execute',     action='store_true', help='Actually write (default: dry-run)')
    parser.add_argument('--no-format',   action='store_true', help='Skip header formatting')
    parser.add_argument('--format-only', action='store_true', help='Only format, do not add columns')
    args = parser.parse_args()

    columns     = [c.strip() for c in args.columns.split(',') if c.strip()]
    apply_format = not args.no_format

    print("🔐 Authenticating with Google...")
    creds   = get_credentials()
    service = build('sheets', 'v4', credentials=creds)

    print(f"📊 Fetching existing headers from '{args.tab}'...")
    existing = get_existing_headers(service, args.sheet, args.tab)
    print(f"   Found {len(existing)} existing columns.")

    if args.format_only:
        columns = []

    append_columns(service, args.sheet, args.tab, columns, existing, args.execute, apply_format)


if __name__ == '__main__':
    main()
