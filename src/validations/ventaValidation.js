const { body } = require("express-validator");

const createValidation = [
  body("clienteId")
    .exists()
    .withMessage("El ID del cliente es requerido.")
    .isInt({ min: 1 })
    .withMessage("El ID del cliente debe ser un número entero mayor a 0")
    .toInt(),
  body("detallesVenta")
    .exists()
    .withMessage("Los detalles de la venta son requeridos.")
    .isArray()
    .withMessage("Debe ser un arreglo de detalles de venta")
    .bail()
    .custom((detallesVenta) => {
      if (detallesVenta.length === 0) {
        throw new Error("Los detalles de venta no puede estar vacío");
      }
      return true;
    }),
  body("detallesVenta.*.cantidad")
    .exists()
    .withMessage("La cantidad es requerida.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero mayor a 0")
    .toInt(),
  body("detallesVenta.*.precioVenta")
    .exists()
    .withMessage("El precio de venta es requerido.")
    .isFloat({ min: 0.01 })
    .withMessage("El precio de venta debe ser un número decimal mayor a 0.")
    .toFloat(),
  body("detallesVenta.*.productoId")
    .exists()
    .withMessage("El ID del producto es requerido.")
    .isInt({ min: 1 })
    .withMessage("El ID del producto debe ser un número entero mayor a 0")
    .toInt(),
];

const updateValidation = [
  body("clienteId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID del cliente debe ser un número entero mayor a 0")
    .toInt(),
  body("detallesVenta")
    .optional()
    .isArray()
    .withMessage("Debe ser un arreglo de detalles de venta"),
];

module.exports = { createValidation, updateValidation };
