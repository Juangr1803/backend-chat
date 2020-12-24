const express = require("express");
const multer = require("multer");

const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

// Midleware
const upload = multer({
  dest: "public/files/",
});

// GET
router.get("/", (req, res) => {
  const filterMessages = req.query.chat || null;
  controller
    .getMessages(filterMessages)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((err) => {
      response.error(req, res, "Unexpected Error", 500, err);
    });
});

// POST
router.post("/", upload.single("file"), (req, res) => {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
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

// PATCH
router.patch("/:id", (req, res) => {
  console.log(req.params.id);

  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, "Internal error", 500, err);
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  controller
    .deleteMessages(req.params.id)
    .then(() => {
      response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
    })
    .catch((err) => {
      response.error(req, res, "Internal error", 500, err);
    });
});

module.exports = router;
