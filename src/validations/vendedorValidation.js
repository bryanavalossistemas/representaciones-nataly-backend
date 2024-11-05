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
  body("correo").optional().isEmail().withMessage("El correo no es válido."),
];

const updateValidation = [
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede ser una cadena vacía."),
  body("username")
    .optional()
    .isString()
    .withMessage("El username debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El username no puede ser una cadena vacía."),
  body("password")
    .optional()
    .isString()
    .withMessage("El password debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El password no puede ser una cadena vacía."),
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
  body("correo").optional().isEmail().withMessage("El correo no es válido."),
];

module.exports = { createValidation, updateValidation };
