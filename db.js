const db = require("mongoose");

db.Promise = global.Promise;

const connect = async (uri) => {
  await db
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "chat_db",
    })
    .then(() => console.log("[db] Connect Success"))
    .catch((err) => console.log(`[db] ${err}`));
};

module.exports = connect;
