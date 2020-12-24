const express = require("express");
const app = express();
const server = require("http").Server(app);

const bodyParser = require("body-parser");
const socket = require("./socket");
const router = require("./network/routes");
const db = require("./db");
const { config } = require("./config/index");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
db(
  `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`
);

// Midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

socket.connect(server);

router(app);

// Server static
app.use("/app", express.static("public"));

// app.use("/", (req, res) => {
//   res.send("hello");
// });

server.listen(config.port, () => {
  console.log(`The app is  listening in http://localhost:${config.port}/`);
});
