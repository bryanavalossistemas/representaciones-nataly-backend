const { body } = require("express-validator");

const createValidation = [
  body("nombre")
    .exists()
    .withMessage("El nombre es requerido.")
    .isString()
    .withMessage("El nombre debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede ser una cadena vacía."),
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
  body("dni")
    .exists()
    .withMessage("El dni es requerido.")
    .isString()
    .withMessage("El dni debe ser una cadena.")
    .matches(/^\d{8}$/)
    .withMessage(
      "El dni debe ser una cadena con exactamente 8 dígitos numéricos."
    ),
  body("telefono")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser una cadena.")
    .matches(/^\d{7}$/)
    .withMessage(
      "El teléfono debe ser una cadena con exactamente 7 dígitos numéricos."
    ),
  body("celular")
    .optional()
    .isString()
    .withMessage("El celular debe ser una cadena.")
    .matches(/^\d{9}$/)
    .withMessage(
      "El celular debe ser una cadena con exactamente 9 dígitos numéricos."
    ),
];

const updateValidation = [
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede ser una cadena vacía."),
  body("correo")
    .optional()
    .isString()
    .withMessage("El correo debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El correo no puede ser una cadena vacía."),
  body("contrasenia")
    .optional()
    .isString()
    .withMessage("La contrasenia debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("La contrasenia no puede ser una cadena vacía."),
  body("dni")
    .optional()
    .isString()
    .withMessage("El dni debe ser una cadena.")
    .matches(/^\d{8}$/)
    .withMessage(
      "El dni debe ser una cadena con exactamente 8 dígitos numéricos."
    ),
  body("telefono")
    .optional()
    .isString()
    .withMessage("El teléfono debe ser una cadena.")
    .matches(/^\d{7}$/)
    .withMessage(
      "El teléfono debe ser una cadena con exactamente 7 dígitos numéricos."
    ),
  body("celular")
    .optional()
    .isString()
    .withMessage("El celular debe ser una cadena.")
    .matches(/^\d{9}$/)
    .withMessage(
      "El celular debe ser una cadena con exactamente 9 dígitos numéricos."
    ),
];

module.exports = { createValidation, updateValidation };
