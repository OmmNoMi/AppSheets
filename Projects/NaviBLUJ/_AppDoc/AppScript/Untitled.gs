async function logAllFieldTypes() {
  const pdfLibUrl = "https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js";
  eval(
    UrlFetchApp.fetch(pdfLibUrl).getContentText().replace(
      /setTimeout\(.*?,.*?(\d*?)\)/g,
      "Utilities.sleep($1);return t();"
    )
  );

  const fileId = "1QzFnwLRQWECaC-P0tzFYM2_RUJS05Fvo";
  const file = DriveApp.getFileById(fileId);
  const pdfBytes = file.getBlob().getBytes();
  const pdfDoc = await PDFLib.PDFDocument.load(new Uint8Array(pdfBytes));

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  fields.forEach(field => {
    const name = field.getName();
    const type = field.constructor.name;
    Logger.log(`Field: ${name} — Type: ${type}`);
  });
}
