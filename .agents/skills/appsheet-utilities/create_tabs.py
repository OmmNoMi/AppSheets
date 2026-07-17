import sys
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
TOKEN_PATH = 'token.json'
creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
service = build('sheets', 'v4', credentials=creds)

spreadsheet_id = '1nRndK8NWSoaLuPhOOkIgN7a2kGzFXAyQ-KN0NpPIb_Q'

requests = [
    {
        'addSheet': {
            'properties': {
                'title': 'Project'
            }
        }
    },
    {
        'addSheet': {
            'properties': {
                'title': 'Timesheet'
            }
        }
    }
]

body = {
    'requests': requests
}
response = service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body=body).execute()
print("Tabs created successfully!")
