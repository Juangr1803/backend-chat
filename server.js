const express = require("express");
const app = express();
const server = require("http").Server(app);

const { config } = require("./config/index");

const cors = require("cors");
const bodyParser = require("body-parser");
const socket = require("./socket");
const router = require("./network/routes");
const db = require("./db");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
db(
  `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`
);

// Midlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Websockets
socket.connect(server);

router(app);

// Server static
app.use(config.publicRoute, express.static("public"));

server.listen(config.port, () => {
  console.log(`The app is listening in ${config.host}:${config.port}/`);
});
