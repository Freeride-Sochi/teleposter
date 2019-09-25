const TelegramBot = require(`node-telegram-bot-api`);

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN;
const rootId = process.env.ROOT_ID;

// Create a bot that uses `polling` to fetch new updates
const bot = new TelegramBot(token);

// Listen for any kind of message. There are different kinds of
// messages.
bot.on(`message`, (msg) => {
  const me = msg.from;
  let message;
  if (!me) {
    message = `You are anonymous =(`;
  } else {
    message = `Here what I know about you:
id:${me.id} ${me.first_name || ``} ${me.last_name || ``}${me.username ? ` @${me.username}` : ``}`;
  }
  bot.sendMessage(msg.chat.id, message, {parse_mode: `Markdown`});
});

module.exports = (message) => {
  bot.sendMessage(rootId, message);
};
