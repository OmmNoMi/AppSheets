const filter = '=FILTER("AttendanceDaily", AND([Employee] = [_THISROW].[Employee], OR([AttendanceRequest] = [_THISROW].[ID], AND([Date] >= [_THISROW].[StartDate], [Date] <= [_THISROW].[EndDate], [Status] = "On Leave"))))';
console.log('Filter length:', filter.length);
console.log('Filter formula:', filter);
