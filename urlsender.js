const send = require(`./loader`);

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;
const rootId = process.env.ROOT_ID;

const sendToRoot = (message) => {
  console.log(`Token length: ${token.length}`);
  console.log(`Root id: ${rootId}`);

  const data = {
    chat_id: rootId,
    text: message
  };

  const msgData = JSON.stringify(data);

  console.log(`Sending message: ${msgData}`);

  return send(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(msgData)
    }
  }, msgData).then((data) => {
    console.log(data);
    return data;
  });
};

module.exports = sendToRoot;
