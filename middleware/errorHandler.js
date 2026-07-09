const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "fail",
      message: err.message,
      data: null,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
      data: null,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      status: "fail",
      message: "Duplicate value entered",
      data: null,
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
      data: null,
    });
  }

  return res.status(500).json({
    status: "error",
    message: err.message,
    stack: err.stack,
    data: null,
  });
}

module.exports = errorHandler;