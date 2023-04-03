// const Docx = require('docx');
// const fs = require('fs');

// async function deleteLastLine(docxFilePath: string) {
//   // Load the document
//   const doc = await Docx.Document.createFromFilePath(docxFilePath);

//   // Get the last paragraph
//   const lastParagraph = doc.getLastParagraph();

//   // Check if the last paragraph is not empty
//   if (lastParagraph.text.trim() !== '') {
//     // Remove the last paragraph
//     const lastSection = doc.getLastSection();
//     lastSection.removeChild(lastParagraph);
//   }

//   // Save the updated document
//   const buffer = await Docx.Packer.toBuffer(doc);
//   await fs.promises.writeFile(docxFilePath, buffer);
// }

// export default deleteLastLine;
