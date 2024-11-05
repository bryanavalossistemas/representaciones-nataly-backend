const { body } = require("express-validator");

const createValidation = [
  body("proveedorId")
    .exists()
    .withMessage("El ID del proveedor es requerido.")
    .isInt({ min: 1 })
    .withMessage("El ID del proveedor debe ser un número entero mayor a 0")
    .toInt(),
  body("detallesCompra")
    .exists()
    .withMessage("Los detalles de la compra son requeridos.")
    .isArray()
    .withMessage("Debe ser un arreglo de detalles de compra")
    .bail()
    .custom((detallesCompra) => {
      if (detallesCompra.length === 0) {
        throw new Error("Los detalles de compra no puede estar vacío");
      }
      return true;
    }),
  body("detallesCompra.*.cantidad")
    .exists()
    .withMessage("La cantidad es requerida.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero mayor a 0")
    .toInt(),
  body("detallesCompra.*.precioCosto")
    .exists()
    .withMessage("El precio de costo es requerido.")
    .isFloat({ min: 0.01 })
    .withMessage("El precio de costo debe ser un número decimal mayor a 0.")
    .toFloat(),
  body("detallesCompra.*.productoId")
    .exists()
    .withMessage("El ID del producto es requerido.")
    .isInt({ min: 1 })
    .withMessage("El ID del producto debe ser un número entero mayor a 0")
    .toFloat(),
];

const updateValidation = [
  body("proveedorId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID del proveedor debe ser un número entero mayor a 0")
    .toInt(),
  body("detallesCompra")
    .optional()
    .isArray()
    .withMessage("Debe ser un arreglo de detalles de compra"),
];

module.exports = { createValidation, updateValidation };
