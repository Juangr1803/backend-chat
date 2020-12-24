const Model = require("./model");

const getUsers = () => {
  return Model.find();
};

const addUser = (user) => {
  const myUser = new Model(user);
  return myUser.save();
};

module.exports = {
  list: getUsers,
  add: addUser,
};
