import sys
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
TOKEN_PATH = 'token.json'
creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
service = build('sheets', 'v4', credentials=creds)

spreadsheet_id = '1nRndK8NWSoaLuPhOOkIgN7a2kGzFXAyQ-KN0NpPIb_Q'
meta = service.spreadsheets().get(spreadsheetId=spreadsheet_id).execute()
for sheet in meta.get('sheets', []):
    print(f"Tab found: '{sheet['properties']['title']}'")

