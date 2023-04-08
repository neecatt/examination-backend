/**
 * *It's a function which extracts the content of the docx file for desired sure.*
 *
 * @param {Express.Multer.File} file
 * @returns {Promise<string[]>}
 */
function contentExtractor(file: Express.Multer.File): Promise<string[]> {
  const mammoth = require('mammoth');
  return mammoth
    .extractRawText({ path: file.path })
    .then(function (result: any) {
      const text = result.value; // The raw text

      //split text by new line
      const lines = text.split('\n');

      //if line contains '' then remove it
      for (let i = 0; i < lines.length + 1; i++) {
        if (lines[i] == '' || lines[i] == ' ') {
          lines.splice(i, 1);
        }
      }

      //if last line is empty remove it
      if (lines[lines.length - 1] == '' || lines[lines.length - 1] == ' ') {
        lines.pop();
      }

      //Iterate over lines and if last line contains in one of them get this line
      const length = lines.length;
      const lastLine = lines[length - 1];
      for (let i = 0; i < length - 2; i++) {
        if (lines[i].includes(lastLine)) {
        }
      }
      const messages = result.messages; // Any messages, such as warnings during conversion
      return lines;
    })
    .catch((error: Error) => {
      console.log(error);
    });
}

export default contentExtractor;
