const send = require(`../src/urlsender`);
const loadForm = require(`../src/formloader`);
const formatter = require(`../src/dataformatter.js`);

const GET_RESPONSE = `
<!doctype html>
<html lang="en">
<head><title>Not allowed</title></head>
<body>
  <h2>Method is not allowed</h2>
</body>
</html>`;

const SUCCESS_SEND_RESPONSE = `
<!doctype html>
<html lang="en">
<head><title>Form successfully sent!</title></head>
<body>
  <h2>Data has been sent!</h2>
</body>
</html>`;

module.exports = (req, res) => {
  switch (req.method) {
    case `GET`:
      res.writeHead(405, {Connection: `close`});
      res.end(GET_RESPONSE);
      break;
    case `POST`:
      loadForm(req, (data) => {
        const redirectUri = data['redirect_uri'];
        delete data['redirect_uri'];

        const formatted = formatter.toUserFriendly(data);
        const sent = send(formatted);
        sent.then(() => {
          if (redirectUri) {
            res.writeHead(302, {
              'location': redirectUri
            });
          } else {
            res.send(SUCCESS_SEND_RESPONSE);
          }
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
