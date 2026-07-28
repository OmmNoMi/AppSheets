async function fillDWCForm1(name, dateOfInjuryReported, addressOfAdjuster, policyNumber) {
  const pdfLibUrl = "https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js";
  eval(
    UrlFetchApp.fetch(pdfLibUrl).getContentText().replace(
      /setTimeout\(.*?,.*?(\d*?)\)/g,
      "Utilities.sleep($1);return t();"
    )
  );

  const fileId = "1962g1s7oJJ2ndlRc8Ucv96E8ksU9Riqn"; // Original template
  const folderId = "1J_6ZkOOjADgBHNAbX-bvzFVrNYDG8Byc"; // Output folder
  const file = DriveApp.getFileById(fileId);
  const pdfBytes = file.getBlob().getBytes();
  const pdfDoc = await PDFLib.PDFDocument.load(new Uint8Array(pdfBytes));
  const page = pdfDoc.getPages()[3]; // Page 4
  const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
  const fontSize = 10;

  // EMPLOYEE SECTION
  page.drawText(name, { x: 130, y: 455, size: fontSize, font });
  // page.drawText("456 Punjab Ave", { x: 175, y: y, size: fontSize, font });
  // page.drawText("San Jose", { x: 130, y: y, size: fontSize, font });
  // page.drawText("CA", { x: 260, y: y, size: fontSize, font });
  // page.drawText("95128", { x: 310, y: y, size: fontSize, font });
  // page.drawText(dateOfInjuryReported, { x: 130, y: y, size: fontSize, font });
  // page.drawText("10:30 AM", { x: 310, y: y, size: fontSize, font });
  // page.drawText("Warehouse Dock", { x: 130, y: y, size: fontSize, font });
  // page.drawText("Back strain, lower spine", { x: 130, y: y, size: fontSize, font });
  // page.drawText("123-45-6789", { x: 130, y: y, size: fontSize, font });
  // page.drawText("davinder@example.com", { x: 130, y: y, size: fontSize, font });
  // page.drawText(name, { x: 130, y: y, size: fontSize, font });

  // EMPLOYER SECTION
  page.drawText("Bluejay Delivery LLC", { x: 192, y: 268, size: fontSize, font });
  page.drawText("3400 Cottage Way, Ste G2 #6117, Sacramento, CA 95825", { x: 120, y: 255, size: fontSize, font });
  page.drawText(dateOfInjuryReported, { x: 420, y: 242, size: fontSize, font });
  // page.drawText("07/08/2025", { x: 420, y: 234, size: fontSize, font });
  // page.drawText("07/11/2025", { x: 420, y: 222, size: fontSize, font });
  page.drawText(addressOfAdjuster, { x: 80, y: 187, size: fontSize, font });
  page.drawText(policyNumber, { x: 300, y: 175, size: fontSize, font }); 
  
  // page.drawText(name, { x: 130, y: y, size: fontSize, font });
  // page.drawText("HR Manager", { x: 130, y: y, size: fontSize, font });
  // page.drawText("5109009052", { x: 420, y: y, size: fontSize, font });

  // Save and upload to Drive
  const pdfBytesOut = await pdfDoc.save();
  const blob = Utilities.newBlob([...new Int8Array(pdfBytesOut)], MimeType.PDF, "Filled_DWCForm1_Final_Accurate.pdf");
  DriveApp.getFolderById(folderId).createFile(blob);
}

function testDWC1(){
  fillDWCForm1("Davinderjit Kaur","07/07/2025","CCMSI 550 W Van Buren #1200 Chicago, IL 60607","T70250760");
}
