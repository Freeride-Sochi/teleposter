const inspect = require(`util`).inspect;
const Busboy = require(`busboy`);

const ifTruncated = (truncated) => {
  return truncated ? ` (truncated)` : ``;
};

const loadForm = (req, onSuccess) => {
  const busboy = new Busboy({headers: req.headers});
  const data = {};
  busboy.on(`file`, function (fieldname, file, filename, encoding, mimetype) {
    console.log(`File [${fieldname}]: filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`);
    let size = 0;
    file.on(`data`, function (data) {
      size += data.length;
      console.log(`File [${fieldname}] got ${data.length} bytes`);
    });
    file.on(`end`, function () {
      console.log(`File [${fieldname}] Finished`);
      if (filename) {
        data[fieldname] = `File: ${filename}. Size: ${size} bytes`;
      }
    });
  });
  busboy.on(`field`, function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log(`Field [${fieldname}]${ifTruncated(fieldnameTruncated)}: value: ${inspect(val)}${ifTruncated(valTruncated)}, encoding: ${encoding}, mimetype: ${mimetype}`);
    data[fieldname] = val;
  });
  busboy.on(`finish`, function () {
    console.log(`Done parsing form!`);
    onSuccess(data);
  });
  req.pipe(busboy);
};

module.exports = loadForm;
