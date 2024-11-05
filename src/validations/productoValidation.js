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
  body("descripcion")
    .exists()
    .withMessage("La descripcion es requerida.")
    .isString()
    .withMessage("La descripcion debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no puede ser una cadena vacía."),
  body("precioCosto")
    .exists()
    .withMessage("El precio de costo es requerido.")
    .isFloat({ min: 0.01 })
    .withMessage("El precio de costo debe ser un número decimal mayor a 0.")
    .toFloat(),
  body("precioVenta")
    .exists()
    .withMessage("El precio de venta es requerido.")
    .isFloat({ min: 0.01 })
    .withMessage("El precio de venta debe ser un número decimal mayor a 0.")
    .toFloat(),
  body("stock")
    .exists()
    .withMessage("El stock es requerido.")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero no negativo")
    .toInt(),
  body("categoriaId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de la categoría debe ser un número entero mayor a 0")
    .toInt(),
  body("marcaId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de la marca debe ser un número entero mayor a 0")
    .toInt(),
];

const updateValidation = [
  body("nombre")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede ser una cadena vacía."),
  body("descripcion")
    .optional()
    .isString()
    .withMessage("La descripcion debe ser una cadena.")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no puede ser una cadena vacía."),
  body("precioCosto")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("El precio de costo debe ser un número decimal mayor a 0.")
    .toFloat(),
  body("precioVenta")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("El precio de venta debe ser un número decimal mayor a 0.")
    .toFloat(),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero no negativo")
    .toInt(),
  body("categoriaId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de la categoría debe ser un número entero mayor a 0")
    .toInt(),
  body("marcaId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El ID de la marca debe ser un número entero mayor a 0")
    .toInt(),
  body("imagenesProducto")
    .optional()
    .custom((value) => {
      try {
        const parsedValue = JSON.parse(value);
        if (!Array.isArray(parsedValue)) {
          throw new Error("Las imágenes deben ser un arreglo.");
        }
        parsedValue.forEach((image) => {
          if (typeof image.id !== "number") {
            throw new Error("El id debe ser un número entero.");
          }
          if (!image.url || !/^https?:\/\/.+\..+/.test(image.url)) {
            throw new Error("La URL debe ser válida.");
          }
          if (typeof image.toDelete !== "boolean") {
            throw new Error("toDelete debe ser un valor booleano.");
          }
        });
        return true;
      } catch (err) {
        throw new Error("El formato de las imágenes es incorrecto.");
      }
    })
    .customSanitizer((value) => {
      const parsedValue = JSON.parse(value);
      return parsedValue.map((image) => ({
        id: image.id,
        url: image.url.trim(),
        toDelete: image.toDelete,
      }));
    }),
];

module.exports = { createValidation, updateValidation };
