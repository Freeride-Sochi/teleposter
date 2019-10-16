module.exports = {
  toUserFriendly(data) {
    return `Новая заявка.\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join(`\n`)}`;
  },
  toDebug(data) {
    return JSON.stringify(data);
  }
};
