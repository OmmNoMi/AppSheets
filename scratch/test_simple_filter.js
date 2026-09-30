// Testing simple, bulletproof filter
const simpleFilter = '=FILTER("AttendanceDaily", [AttendanceRequest] = [_THISROW].[ID])';
console.log("Simple filter:", simpleFilter);

const openCount = (simpleFilter.match(/\(/g) || []).length;
const closeCount = (simpleFilter.match(/\)/g) || []).length;
console.log(`Balanced: ${openCount === closeCount} (Open: ${openCount}, Close: ${closeCount})`);
