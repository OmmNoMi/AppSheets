import csv
import sys
import os
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import datetime

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TOKEN_PATH = os.path.join(SCRIPT_DIR, '..', 'token.json')
SPREADSHEET_ID = '1nRndK8NWSoaLuPhOOkIgN7a2kGzFXAyQ-KN0NpPIb_Q'

def main():
    if not os.path.exists(TOKEN_PATH):
        print("Please run sheets_api.py first to authenticate.")
        return

    if len(sys.argv) < 2:
        print("Usage: python3 import_timesheets.py <data.tsv>")
        return

    creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)
    service = build('sheets', 'v4', credentials=creds)
    
    # New columns: ID, Employee, Project, Date, StartTime, EndTime, Description, Status, CreatedBy, CreatedOn, LastEditBy, LastEditOn
    rows_to_insert = []
    
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f, delimiter='\t')
        for row in reader:
            # Safely get values, fallback to empty string
            def get_val(key): return row.get(key, '').strip()
            
            # Map columns
            rec_id = get_val('ID')
            employee = get_val('Employee') or get_val('Associate')
            project = get_val('Project') or get_val('DD_Project')
            date = get_val('Date')
            start_time = get_val('Start_Time')
            end_time = get_val('End_Time')
            
            desc_parts = []
            if get_val('Description'): desc_parts.append(get_val('Description'))
            if get_val('Notes'): desc_parts.append(f"Notes: {get_val('Notes')}")
            if get_val('Remark'): desc_parts.append(f"Remark: {get_val('Remark')}")
            description = "\n".join(desc_parts)
            
            status = "Approved" # Defaulting migrated records to Approved
            
            created_by = get_val('LastEditBy') or "System_Migration"
            created_on = get_val('LastEditOn') or datetime.datetime.now().strftime("%d/%m/%Y %H:%M:%S")
            last_edit_by = created_by
            last_edit_on = created_on
            
            new_row = [
                rec_id, employee, project, date, start_time, end_time, 
                description, status, created_by, created_on, last_edit_by, last_edit_on
            ]
            rows_to_insert.append(new_row)
            
    if not rows_to_insert:
        print("No valid data found to import.")
        return

    print(f"Uploading {len(rows_to_insert)} records to 'Timesheet' tab...")
    
    body = {'values': rows_to_insert}
    result = service.spreadsheets().values().append(
        spreadsheetId=SPREADSHEET_ID,
        range='Timesheet!A2',
        valueInputOption='USER_ENTERED',
        insertDataOption='INSERT_ROWS',
        body=body
    ).execute()
    
    print(f"{result.get('updates').get('updatedCells')} cells appended successfully!")

if __name__ == '__main__':
    main()
