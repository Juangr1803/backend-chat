const express = require("express");
const controller = require("./controller");
const response = require("../../network/response");
const router = express.Router();

// GET
router.get("/:userId", (req, res) => {
  controller
    .getChats(req.params.userId)
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((err) => {
      response.error(req, res, "Internal error", 500, err);
    });
});

// POST
router.post("/", (req, res) => {
  controller
    .addChat(req.body.users)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => {
      response.error(req, res, "Internal error", 500, err);
    });
});

module.exports = router;
