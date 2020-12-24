const statusMessage = {
  200: "Done",
  201: "Created",
  400: "Invalid format",
  500: "Internal error",
};

exports.success = (req, res, message, status) => {
  let statusCode = status;
  statusMessage = message;
  if (!status) {
    status = 200;
  }

  if (!message) {
    statusMessage = statusMessages[status];
  }

  res.status(statusCode).send({
    error: "",
    body: message,
  });
};

exports.error = (req, res, message, status, details) => {
  console.log("[response.error] " + details);

  res.status(status || 500).send({
    error: message,
    body: "",
  });
};
