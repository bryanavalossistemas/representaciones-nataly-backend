const { body } = require("express-validator");

const loginValidation = [
  body("correo")
    .exists()
    .withMessage("El correo es requerido.")
    .isString()
    .withMessage("El correo debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El correo no puede ser una cadena vacía."),
  body("contrasenia")
    .exists()
    .withMessage("La contrasenia es requerida.")
    .isString()
    .withMessage("La contrasenia debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("La contrasenia no puede ser una cadena vacía."),
];

module.exports = { loginValidation };
