const store = require("./store");

const getChats = (userId) => {
  return store.list(userId);
};

const addChat = (users) => {
  if (!users || !Array.isArray(users)) {
    return Promise.reject("Invalid user list");
  }

  const chat = {
    users: users,
  };
  return store.add(chat);
};

module.exports = {
  getChats,
  addChat,
};
