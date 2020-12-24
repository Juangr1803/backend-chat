const Model = require("./model");

const getMesages = (filterChat) => {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterChat !== null) {
      filter = {
        chat: filterChat,
      };
    }
    Model.find(filter)
      .populate("user")
      .exec((error, populated) => {
        if (error) {
          reject(error);
          return false;
        }
        resolve(populated);
      });
  });
};

const addMessage = (message) => {
  const myMessage = new Model(message);
  myMessage.save();
};

const updateText = async (id, message) => {
  const foundMessage = await Model.findOne({
    _id: id,
  });
  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
};

const removeMessage = (id) => {
  return Model.deleteOne({
    _id: id,
  });
};

module.exports = {
  list: getMesages,
  add: addMessage,
  updateText: updateText,
  remove: removeMessage,
};
