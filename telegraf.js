const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram')

const token = process.env.BOT_TOKEN;
const rootId = process.env.ROOT_ID;


const sendToRoot = (message) => {
  console.log(`Token length: ${token.length}`);
  console.log(`Root id: ${rootId}`);
  // Create a bot that uses `polling` to fetch new updates
  const bot = new Telegram(token);

  console.log(`Sending message: ${message}`);
  bot.sendMessage(rootId, message).then(() => {
    console.log(`Message sent!`);
  }).catch((err) => con);
};

module.exports = sendToRoot;
