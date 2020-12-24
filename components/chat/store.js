const Model = require("./model");

const getChats = (userId) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (userId) {
      filter = {
        users: userId,
      };
    }

    Model.find(filter)
      .populate("users")
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
};

const addChat = (chat) => {
  const myChat = new Model(chat);
  return myChat.save();
};

module.exports = {
  list: getChats,
  add: addChat,
};
