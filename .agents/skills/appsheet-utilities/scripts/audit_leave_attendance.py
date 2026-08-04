#!/usr/bin/env python3
"""
================================================================================
OmmNoMi AppSheet Audit Utility: Attendance & Leave Cross-Table Reconciliation
================================================================================
Company: OmmNoMi
Script: audit_leave_attendance.py

Purpose:
  Automates the cross-table audit of 3 exported AppSheet tables:
    1. AttendanceDaily.csv
    2. AttendanceRequest.csv
    3. LeaveAllocation.csv

  Verifies:
    - AttendanceRequest -> AttendanceDaily row creation and child reference matching.
    - AttendanceRequest -> LeaveAllocation balance deductions (Sum of LeaveUsed vs Allocation.Used & Available).
    - Date anomalies (StartDate > EndDate / negative day calculations).
    - Half Day calculation glitches (Leave = 'Half Day' but LeaveUsed != 0.5).
    - Unprocessed Approved requests (PendingRow > 0).

Usage:
  python audit_leave_attendance.py [AttendanceDaily.csv] [AttendanceRequest.csv] [LeaveAllocation.csv] [--html report.html]
================================================================================
"""

import sys
import os
import argparse
from datetime import datetime
import pandas as pd
import numpy as np

def parse_args():
    parser = argparse.ArgumentParser(description="OmmNoMi Attendance & Leave Audit Script")
    parser.add_argument("daily_csv", nargs="?", help="Path to AttendanceDaily.csv")
    parser.add_argument("request_csv", nargs="?", help="Path to AttendanceRequest.csv")
    parser.add_argument("alloc_csv", nargs="?", help="Path to LeaveAllocation.csv")
    parser.add_argument("--html", default="audit_report.html", help="Path to output HTML audit report")
    return parser.parse_args()

def locate_default_files():
    downloads = os.path.expanduser(r"~\Downloads")
    daily_path = os.path.join(downloads, "BLR World HR - AttendanceDaily.csv")
    request_path = os.path.join(downloads, "BLR World HR - AttendanceRequest.csv")
    alloc_path = os.path.join(downloads, "BLR World HR - LeaveAllocation.csv")
    return daily_path, request_path, alloc_path

def run_audit(daily_path, request_path, alloc_path, html_output=None):
    print("=" * 80)
    print("OmmNoMi AppSheet Audit Utility: Attendance & Leave Reconciliation")
    print("=" * 80)
    print(f"[*] AttendanceDaily:   {daily_path}")
    print(f"[*] AttendanceRequest: {request_path}")
    print(f"[*] LeaveAllocation:   {alloc_path}")
    print("-" * 80)

    if not os.path.exists(daily_path) or not os.path.exists(request_path) or not os.path.exists(alloc_path):
        print("[ERROR] One or more input CSV files do not exist. Please check file paths.")
        sys.exit(1)

    df_daily = pd.read_csv(daily_path)
    df_req = pd.read_csv(request_path)
    df_alloc = pd.read_csv(alloc_path)

    # --------------------------------------------------------------------------
    # Date Pre-processing
    # --------------------------------------------------------------------------
    df_req['StartDate_dt'] = pd.to_datetime(df_req['StartDate'], format='%d/%m/%Y', errors='coerce')
    df_req['EndDate_dt'] = pd.to_datetime(df_req['EndDate'], format='%d/%m/%Y', errors='coerce')

    # Fill NaNs for safety
    df_req['LeaveUsed'] = df_req['LeaveUsed'].fillna(0.0)
    df_req['PendingRow'] = df_req['PendingRow'].fillna(0.0)
    df_req['Status'] = df_req['Status'].fillna('Unknown')
    df_req['RequestType'] = df_req['RequestType'].fillna('Unknown')

    df_alloc['Quantity'] = df_alloc['Quantity'].fillna(0.0)
    df_alloc['Used'] = df_alloc['Used'].fillna(0.0)
    df_alloc['Available'] = df_alloc['Available'].fillna(0.0)

    # --------------------------------------------------------------------------
    # 1. Date Range Anomalies (StartDate > EndDate or Invalid Format)
    # --------------------------------------------------------------------------
    date_anomalies = df_req[df_req['EndDate_dt'] < df_req['StartDate_dt']].copy()
    if not date_anomalies.empty:
        date_anomalies['CalcDays'] = (date_anomalies['EndDate_dt'] - date_anomalies['StartDate_dt']).dt.days + 1

    # --------------------------------------------------------------------------
    # 2. Half Day Calculation Anomalies
    # --------------------------------------------------------------------------
    half_days = df_req[df_req['Leave'] == 'Half Day'].copy()
    half_day_glitches = half_days[
        (half_days['StartDate'] != half_days['EndDate']) | 
        ((half_days['Status'] == 'Approved') & (half_days['LeaveUsed'] != 0.5))
    ].copy()

    # --------------------------------------------------------------------------
    # 3. Approved Requests with PendingRow > 0 (Unprocessed Bot Steps)
    # --------------------------------------------------------------------------
    pending_approved = df_req[(df_req['Status'] == 'Approved') & (df_req['PendingRow'] > 0)].copy()

    # --------------------------------------------------------------------------
    # 4. Approved Leave Applications with LeaveUsed == 0
    # --------------------------------------------------------------------------
    zero_leave_approved = df_req[
        (df_req['Status'] == 'Approved') & 
        (df_req['RequestType'] == 'Leave Application') & 
        (df_req['LeaveUsed'] == 0.0)
    ].copy()

    # --------------------------------------------------------------------------
    # 5. AttendanceDaily Child Row Reconciliation
    # --------------------------------------------------------------------------
    # Group AttendanceDaily by linked AttendanceRequest ID
    daily_linked = df_daily.dropna(subset=['AttendanceRequest'])
    daily_counts = daily_linked.groupby('AttendanceRequest').size().to_dict()

    approved_leaves = df_req[(df_req['Status'] == 'Approved') & (df_req['RequestType'] == 'Leave Application')].copy()
    approved_leaves['ChildDailyCount'] = approved_leaves['ID'].map(daily_counts).fillna(0).astype(int)

    missing_child_rows = approved_leaves[approved_leaves['ChildDailyCount'] == 0].copy()

    # --------------------------------------------------------------------------
    # 6. LeaveAllocation Balance Audit
    # --------------------------------------------------------------------------
    # Sum LeaveUsed per LeaveAllocation ID for Approved requests
    approved_reqs = df_req[df_req['Status'] == 'Approved']
    used_by_alloc = approved_reqs.groupby('LeaveAllocation')['LeaveUsed'].sum().to_dict()

    df_alloc['Calculated_Used'] = df_alloc['ID'].map(used_by_alloc).fillna(0.0)
    df_alloc['Diff_Used'] = df_alloc['Used'] - df_alloc['Calculated_Used']
    df_alloc['Calculated_Available'] = df_alloc['Quantity'] - df_alloc['Used']
    df_alloc['Diff_Available'] = df_alloc['Available'] - df_alloc['Calculated_Available']

    bad_alloc_used = df_alloc[df_alloc['Diff_Used'].abs() > 0.01].copy()
    bad_alloc_avail = df_alloc[df_alloc['Diff_Available'].abs() > 0.01].copy()

    # --------------------------------------------------------------------------
    # Terminal CLI Reporting
    # --------------------------------------------------------------------------
    print("\n[SUMMARY METRICS]")
    print(f"  Total Attendance Requests:         {len(df_req)}")
    print(f"  Approved Requests:                 {len(approved_reqs)}")
    print(f"  Total Approved Leave Applications: {len(approved_leaves)}")
    print(f"  Total AttendanceDaily Records:     {len(df_daily)}")
    print(f"  Total Leave Allocations:           {len(df_alloc)}")

    print("\n[DISCREPANCY SUMMARY]")
    print(f"  [!] Date Range Anomalies (Start > End):           {len(date_anomalies)}")
    print(f"  [!] Half Day Calculation Glitches:                {len(half_day_glitches)}")
    print(f"  [!] Approved Requests with PendingRow > 0:        {len(pending_approved)}")
    print(f"  [!] Approved Leave Applications with LeaveUsed=0: {len(zero_leave_approved)}")
    print(f"  [!] Approved Leaves with 0 Daily Child Rows:      {len(missing_child_rows)}")
    print(f"  [!] Leave Allocation Used Mismatches:             {len(bad_alloc_used)}")
    print(f"  [!] Leave Allocation Available Mismatches:        {len(bad_alloc_avail)}")
    print("-" * 80)

    # --------------------------------------------------------------------------
    # HTML Report Generation (OmmNoMi Standard)
    # --------------------------------------------------------------------------
    if html_output:
        generate_html_report(
            html_output, df_req, df_daily, df_alloc,
            date_anomalies, half_day_glitches, pending_approved,
            zero_leave_approved, missing_child_rows, bad_alloc_used, bad_alloc_avail
        )
        print(f"[SUCCESS] Audit report successfully written to: {os.path.abspath(html_output)}")

def generate_html_report(
    filepath, df_req, df_daily, df_alloc,
    date_anomalies, half_day_glitches, pending_approved,
    zero_leave_approved, missing_child_rows, bad_alloc_used, bad_alloc_avail
):
    timestamp = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    # Load brand logo as base64 if available
    logo_b64 = ""
    logo_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "brand", "ommnomi_full_logo.png")
    if os.path.exists(logo_path):
        import base64
        with open(logo_path, "rb") as lf:
            logo_b64 = base64.b64encode(lf.read()).decode("utf-8")

    logo_img_html = f'<img class="logo-img" src="data:image/png;base64,{logo_b64}" alt="OmmNoMi Logo" style="height: 28px; width: auto;" />' if logo_b64 else '<div style="font-size: 20px; font-weight: 700; color: #202124;">OmmNoMi Integrations</div>'

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>OmmNoMi - Leave & Attendance Cross-Table Audit Report</title>
<style>
  body {{ font-family: 'Roboto', 'Open Sans', sans-serif; color: #202124; background-color: #f8f9fa; margin: 0; padding: 24px; }}
  .container {{ max-width: 1200px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.12); }}
  
  .hero {{ display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }}
  .logo-row {{ margin-bottom: 8px; }}
  .hero-title {{ font-size: 26px; font-weight: 700; color: #4285F4; margin-top: 4px; }}
  .hero-sub {{ font-size: 14px; color: #5f6368; margin-top: 4px; }}
  
  .doc-control {{ text-align: right; font-family: sans-serif; }}
  .control-badge {{ display: inline-block; background-color: #673AB7; color: #ffffff; font-weight: bold; font-size: 11px; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; margin-bottom: 6px; }}
  .control-text {{ display: block; font-size: 12px; color: #5f6368; }}
  
  .stripe {{ height: 4px; background: linear-gradient(90deg, #4285F4 25%, #34A853 25% 50%, #EA4335 50% 75%, #FBBC05 75%); margin-bottom: 24px; border-radius: 2px; }}
  
  .grid-metrics {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }}
  .metric-card {{ background: #f1f3f4; padding: 16px; border-radius: 6px; text-align: center; border-left: 4px solid #4285F4; }}
  .metric-card.warn {{ border-left-color: #EA4335; background: #fce8e6; }}
  .metric-card.alert {{ border-left-color: #FBBC05; background: #fef7e0; }}
  .metric-num {{ font-size: 28px; font-weight: 700; color: #202124; }}
  .metric-label {{ font-size: 12px; color: #5f6368; font-weight: 600; text-transform: uppercase; margin-top: 4px; }}
  
  h2 {{ font-size: 18px; color: #202124; border-bottom: 2px solid #e8eaed; padding-bottom: 8px; margin-top: 32px; }}
  
  table {{ width: 100%; border-collapse: collapse; margin-top: 12px; margin-bottom: 24px; font-size: 13px; }}
  th {{ background-color: #f1f3f4; color: #3c4043; font-weight: 600; text-align: left; padding: 10px 12px; border-bottom: 2px solid #dadce0; }}
  td {{ padding: 10px 12px; border-bottom: 1px solid #e8eaed; vertical-align: top; }}
  tr:nth-child(even) {{ background-color: #fafafa; }}
  
  .footer {{ margin-top: 40px; border-top: 1px solid #e8eaed; text-align: center; font-size: 12px; color: #70757a; padding-top: 20px; line-height: 1.6; }}
</style>
</head>
<body>
<div class="container">
  <div class="hero">
    <div>
      <div class="logo-row">
        {logo_img_html}
      </div>
      <div class="hero-title">AppSheet Cross-Table Audit Report</div>
      <div class="hero-sub">Attendance & Leave Allocation Reconciliation &nbsp;·&nbsp; Operational Management</div>
    </div>
    <div class="doc-control">
      <span class="control-badge">LEAVE AUDIT</span>
      <span class="control-text">Doc Ref: ONM-AUD-2026-001</span>
      <span class="control-text">Generated: {timestamp}</span>
    </div>
  </div>
  <div class="stripe"></div>

  <div class="grid-metrics">
    <div class="metric-card">
      <div class="metric-num">{len(df_req)}</div>
      <div class="metric-label">Total Requests</div>
    </div>
    <div class="metric-card">
      <div class="metric-num">{len(df_req[df_req['Status'] == 'Approved'])}</div>
      <div class="metric-label">Approved Requests</div>
    </div>
    <div class="metric-card warn">
      <div class="metric-num">{len(date_anomalies)}</div>
      <div class="metric-label">Date Anomalies</div>
    </div>
    <div class="metric-card alert">
      <div class="metric-num">{len(half_day_glitches)}</div>
      <div class="metric-label">Half Day Errors</div>
    </div>
    <div class="metric-card warn">
      <div class="metric-num">{len(zero_leave_approved)}</div>
      <div class="metric-label">Approved Leaves (0 Used)</div>
    </div>
    <div class="metric-card alert">
      <div class="metric-num">{len(bad_alloc_used)}</div>
      <div class="metric-label">Alloc Mismatches</div>
    </div>
  </div>

  <!-- 1. Date Anomalies -->
  <h2>1. Date Range Anomalies (StartDate > EndDate)</h2>
  {render_table(date_anomalies, ['ID', 'RequestType', 'Employee', 'StartDate', 'EndDate', 'Status', 'PendingRow', 'Remarks'])}

  <!-- 2. Half Day Anomalies -->
  <h2>2. Half Day Calculation Glitches (Leave = 'Half Day')</h2>
  {render_table(half_day_glitches, ['ID', 'RequestType', 'Employee', 'StartDate', 'EndDate', 'LeaveUsed', 'Status', 'PendingRow'])}

  <!-- 3. Approved Leaves with 0 Used -->
  <h2>3. Approved Leave Applications with 0 Days Deducted</h2>
  {render_table(zero_leave_approved, ['ID', 'Employee', 'StartDate', 'EndDate', 'LeaveType', 'LeaveAllocation', 'LeaveUsed', 'PendingRow', 'Remarks'])}

  <!-- 4. Unprocessed Approved Requests (PendingRow > 0) -->
  <h2>4. Approved Requests Stuck with Unprocessed Bot Steps (PendingRow > 0)</h2>
  {render_table(pending_approved.head(15), ['ID', 'RequestType', 'Employee', 'StartDate', 'EndDate', 'LeaveUsed', 'PendingRow', 'Status'])}

  <!-- 5. Leave Allocation Used Mismatches -->
  <h2>5. Leave Allocation Balance Mismatches</h2>
  {render_table(bad_alloc_used, ['ID', 'Employee', 'LeaveType', 'Quantity', 'Used', 'Calculated_Used', 'Diff_Used', 'Available'])}

  <div class="footer">
    <div style="margin-bottom: 6px;">{logo_img_html}</div>
    <strong>© OmmNoMi</strong> &nbsp;·&nbsp; Unlocking Business Potential Through Automation<br>
    Headquarters: 1/1 Vill. Kalouta PO Mahun Teh. Karsog Distt. Mandi Himachal Pradesh, India 175010
  </div>
</div>
</body>
</html>
"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_content)

def render_table(df, columns):
    if df.empty:
        return "<p style='color: #5f6368; font-style: italic;'>No discrepancies found in this category. System clean.</p>"
    
    headers = "".join([f"<th>{col}</th>" for col in columns])
    rows = []
    for _, row in df.iterrows():
        cells = []
        for col in columns:
            val = row.get(col, '')
            if pd.isna(val):
                val = '-'
            cells.append(f"<td>{val}</td>")
        rows.append(f"<tr>{''.join(cells)}</tr>")
    
    return f"<table><thead><tr>{headers}</tr></thead><tbody>{''.join(rows)}</tbody></table>"

if __name__ == "__main__":
    args = parse_args()
    if args.daily_csv and args.request_csv and args.alloc_csv:
        daily_p, req_p, alloc_p = args.daily_csv, args.request_csv, args.alloc_csv
    else:
        daily_p, req_p, alloc_p = locate_default_files()

    run_audit(daily_p, req_p, alloc_p, html_output=args.html)
