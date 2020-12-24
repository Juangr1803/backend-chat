const store = require("./store");
const socket = require("../../socket").socket;

const getMessages = (filterChat) => {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat));
  });
};

const addMessage = (chat, user, message, file) => {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error("[messageController] There is not user or message");
      reject("The data incorrect");
      return false;
    }

    let fileUrl = "";
    if (file) {
      fileUrl = "http://localhost:3000/app/files/" + file.filename;
    }

    const fullMessage = {
      chat: chat,
      user: user,
      message: message,
      date: new Date(),
      file: fileUrl,
    };

    store.add(fullMessage);

    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
};

const updateMessage = (id, message) => {
  return new Promise(async (resolve, reject) => {
    console.log(id);
    console.log(message);
    if (!id || !message) {
      reject("Invalid data");
      return false;
    }
    const result = await store.updateText(id, message);
    resolve(result);
  });
};

const deleteMessages = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject("Id invalid");
    }
    store
      .remove(id)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessages,
};
