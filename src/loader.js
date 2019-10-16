const https = require(`https`);

const getData = (url, opts = {method: `GET`}, postData) => {
  return new Promise((onSuccess, onError) => {
    console.log(`Requesting url`);

    const req = https.request(url, opts, (res) => {
      const {statusCode} = res;
      console.log(`Got response: ${statusCode}`);

      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

      let errMessage;
      if (statusCode !== 200) {
        errMessage = `Request Failed.\nStatus Code: ${statusCode}`;
      }

      if (errMessage) {
        // consume response data to free up memory
        res.resume();
        onError(errMessage);
        return;
      }

      res.setEncoding('utf8');
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        onSuccess(data);
        console.log(data);
      });
    });
    req.on('error', (e) => {
      onError(`Got error: ${e.message}`);
    });

    // write data to request body
    req.write(postData);
    req.end();
  })
};

module.exports = getData;
