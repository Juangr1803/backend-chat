const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

// GET
router.get("/", (req, res) => {
  controller
    .getMessages()
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((err) => {
      response.error(req, res, "Unexpected Error", 500, err);
    });
});

// POST
router.post("/", (req, res) => {
  controller
    .addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch(() => {
      response.error(
        req,
        res,
        "Invalid Information",
        400,
        "Error in the controller"
      );
    });
});

router.delete("/", (req, res) => {
  response.success(req, res, "Create Success", 201);
});

module.exports = router;
