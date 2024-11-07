const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Se produjo un error inesperado";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: message,
    errors: err.errors || [{ message }],
  });
};

module.exports = errorHandler;
