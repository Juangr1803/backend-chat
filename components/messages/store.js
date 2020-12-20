const list = [];

const getMesages = () => {
  return list;
};

const addMessage = (message) => {
  list.push(message);
};

module.exports = {
  list: getMesages,
  add: addMessage,
};
