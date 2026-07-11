#!/usr/bin/env python3
"""
sheets_api.py — Auto Column Builder for AppSheet/Google Sheets
=============================================================
Safely appends new column headers to row 1 of a Google Sheet tab.

USAGE:
  # Dry-run (default — safe, shows what WOULD happen, touches nothing)
  python3 sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "Col1,Col2,Col3"

  # Live execution (actually writes to the sheet)
  python3 sheets_api.py --sheet <SPREADSHEET_ID> --tab <TAB_NAME> --columns "Col1,Col2,Col3" --execute

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


def get_existing_headers(service, spreadsheet_id: str, tab: str) -> list:
    """Fetch current row 1 headers from the tab."""
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheet_id,
        range=f"'{tab}'!1:1"
    ).execute()
    return result.get('values', [[]])[0]


def append_columns(
    service,
    spreadsheet_id: str,
    tab: str,
    new_columns: list,
    existing_headers: list,
    execute: bool
):
    """Append new columns to row 1 after the last used header."""
    to_add = [col for col in new_columns if col not in existing_headers]
    skipped = [col for col in new_columns if col in existing_headers]

    if skipped:
        print(f"\n⏭️  Already exist (will skip): {', '.join(skipped)}")

    if not to_add:
        print("\n✅ No new columns to add. Sheet is already up to date.")
        return

    start_col = len(existing_headers) + 1  # 1-indexed
    start_col_letter = col_number_to_letter(start_col)
    target_range = f"'{tab}'!{start_col_letter}1"

    print(f"\n📋 DRY-RUN — What would be written:")
    print(f"   Target Sheet:  {spreadsheet_id}")
    print(f"   Target Tab:    {tab}")
    print(f"   Target Range:  {target_range}")
    print(f"   New Columns:   {to_add}")

    if not execute:
        print("\n⚠️  DRY-RUN MODE — Nothing was written.")
        print("    Re-run with --execute to apply changes to the live sheet.")
        return

    # Safety confirmation before writing
    print(f"\n⚠️  LIVE MODE — About to write to PRODUCTION sheet!")
    confirm = input("    Type 'YES' to confirm: ").strip()
    if confirm != 'YES':
        print("❌ Aborted by user.")
        return

    body = {'values': [to_add]}
    service.spreadsheets().values().update(
        spreadsheetId=spreadsheet_id,
        range=target_range,
        valueInputOption='RAW',
        body=body
    ).execute()
    print(f"\n✅ Successfully added {len(to_add)} columns: {', '.join(to_add)}")


def col_number_to_letter(n: int) -> str:
    """Convert column number (1-indexed) to spreadsheet letter (A, B, ... Z, AA)."""
    result = ""
    while n > 0:
        n, remainder = divmod(n - 1, 26)
        result = chr(65 + remainder) + result
    return result


def main():
    parser = argparse.ArgumentParser(description='AppSheet Auto-Column Builder')
    parser.add_argument('--sheet', required=True, help='Google Spreadsheet ID (from the URL)')
    parser.add_argument('--tab', required=True, help='Sheet tab name (e.g., EmployeeAudit)')
    parser.add_argument('--columns', required=True, help='Comma-separated list of columns to add')
    parser.add_argument('--execute', action='store_true', help='Actually write to the sheet (default is dry-run)')
    args = parser.parse_args()

    columns = [c.strip() for c in args.columns.split(',') if c.strip()]

    print("🔐 Authenticating with Google...")
    creds = get_credentials()
    service = build('sheets', 'v4', credentials=creds)

    print(f"📊 Fetching existing headers from '{args.tab}'...")
    existing = get_existing_headers(service, args.sheet, args.tab)
    print(f"   Found {len(existing)} existing columns.")

    append_columns(service, args.sheet, args.tab, columns, existing, args.execute)


if __name__ == '__main__':
    main()
