expr = '=FILTER("AttendanceDaily", AND([Employee] = [_THISROW].[Employee], OR([AttendanceRequest] = [_THISROW].[ID], AND([Date] >= [_THISROW].[StartDate], [Date] <= [_THISROW].[EndDate], [Status] = "On Leave"))))'
open_count = expr.count('(')
close_count = expr.count(')')
print(f'Open: {open_count}, Close: {close_count}, Balanced: {open_count == close_count}')
