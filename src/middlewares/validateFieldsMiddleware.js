const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      statusCode: 400,
      message: "Error de validación",
      errors: errors.array().map((error) => ({
        message: error.msg,
        path: error.path,
      })),
    });
  }
  next();
};

module.exports = validateFields;
