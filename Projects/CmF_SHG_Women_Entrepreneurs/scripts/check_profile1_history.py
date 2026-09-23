import os
import sqlite3
import shutil

history_path = os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\User Data\Profile 1\History")
temp_history = os.path.expandvars(r"%LOCALAPPDATA%\Google\Chrome\User Data\Profile 1\History_temp_copy")

print(f"Checking History for Profile 1 (nomeshwer@ommnomi.in): {history_path}")

if os.path.exists(history_path):
    try:
        shutil.copy2(history_path, temp_history)
        conn = sqlite3.connect(temp_history)
        cursor = conn.cursor()
        
        query = """
        SELECT url, title, last_visit_time 
        FROM urls 
        WHERE url LIKE '%appsheet.com%' OR url LIKE '%docs.google.com/spreadsheets%'
        ORDER BY last_visit_time DESC 
        LIMIT 25
        """
        cursor.execute(query)
        rows = cursor.fetchall()
        
        print(f"\nFound {len(rows)} recent AppSheet / Google Sheet URLs in Profile 1:")
        for r in rows:
            print(f"  - Title: {r[1]}")
            print(f"    URL:   {r[0]}\n")
            
        conn.close()
        if os.path.exists(temp_history):
            os.remove(temp_history)
    except Exception as e:
        print(f"Error: {e}")
