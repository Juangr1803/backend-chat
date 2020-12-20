const express = require("express");
const message = require("../components/messages/network");

const router = (server) => {
  server.use("/message", message);
};

module.exports = router;
