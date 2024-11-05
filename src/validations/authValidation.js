const { body } = require("express-validator");

const loginValidation = [
  body("username")
    .exists()
    .withMessage("El username es requerido.")
    .isString()
    .withMessage("El username debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El username no puede ser una cadena vacía."),
  body("password")
    .exists()
    .withMessage("El password es requerido.")
    .isString()
    .withMessage("El password debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El password no puede ser una cadena vacía."),
];

module.exports = { loginValidation };
