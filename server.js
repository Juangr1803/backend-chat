const express = require("express");
const bodyParser = require("body-parser");

const response = require("./network/response");

const router = express.Router();

const app = express();

// Midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

router.get("/message", (req, res) => {
  console.log(req.headers);
  res.header({
    "custom-header": " We value personalization",
  });
  response.success(req, res, "Messages List");
});

router.post("/message", (req, res) => {
  console.log(req.body);
  console.log(req.query);
  if (req.query.error == "ok") {
    response.error(req, res, "Error simulated", 400);
  } else {
    response.success(req, res, "Create Success", 201);
  }
});

app.use("/app", express.static("public"));

router.delete("/message", (req, res) => {
  response.success(req, res, "Create Success", 201);
});

// app.use("/", (req, res) => {
//   res.send("hello");
// });

app.listen(3000, () => {
  console.log(`The app is listening in http://localhost:3000/`);
});
