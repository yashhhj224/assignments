const errorMiddleware = (err, req, res, next) => {
  console.log("ERROR:", err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    stack: err.stack
  });
};

module.exports = errorMiddleware;
