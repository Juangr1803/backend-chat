const store = require("./store");

const getMessages = () => {
  return new Promise((resolve, reject) => {
    resolve(store.list());
  });
};

const addMessage = (user, message) => {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      console.error("[messageController] There is not user or message");
      reject("The data incorrect");
      return false;
    }

    const fullMessage = {
      user: user,
      message: message,
      date: new Date(),
    };

    store.add(fullMessage);

    resolve(fullMessage);
  });
};

module.exports = {
  getMessages,
  addMessage,
};
