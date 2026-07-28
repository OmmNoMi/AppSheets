function doPostTest(e) {
  var data = JSON.parse(e.postData.contents);
  var ids = data.rowIds; // This will be the list from AppSheet
  
  // Your logic here (e.g., creating PDFs, updating other sheets)
  console.log("Received IDs: " + ids);
  
  return ContentService.createTextOutput("Success");
}
