const send = require(`../src/urlsender`);
const loadForm = require(`../src/formloader`);
const formatter = require(`../src/dataformatter.js`);

const TEST_PAGE = `
<!doctype html>
<html lang="en">
<head><title>Test Form Post</title></head>
<body>
  <form action="" method="POST" enctype="multipart/form-data" accept-charset="utf-8">
    <input type="text" name="textfield"><br />
    <input type="file" name="filefield"><br />
    <input type="submit">\
  </form>
</body>
</html>`;

module.exports = (req, res) => {
  switch (req.method) {
    case `GET`:
      res.writeHead(200, {Connection: `close`});
      res.end(TEST_PAGE);
      break;
    case `POST`:
      loadForm(req, (data) => {
        const formatted = formatter.toUserFriendly(data);
        console.log(formatted);
        const sent = send(formatted);
        console.log(sent);
        sent.then((data) => {
          res.send(data);
          res.end();
        }).catch((err) => {
          res.status(503).send(err);
          res.end();
        });
      });
      break;
    default:
      // Do nothing by default
  }
};
