const express = require("express");
const bodyParser = require("body-parser");

// const router = require("./components/messages/network");
const router = require("./network/routes");

const app = express();

// Midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router);

router(app);

// Server static
app.use("/app", express.static("public"));

// app.use("/", (req, res) => {
//   res.send("hello");
// });

app.listen(3000, () => {
  console.log(`The app is listening in http://localhost:3000/`);
});
