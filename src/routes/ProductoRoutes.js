const express = require("express");
const productoController = require("@/controllers/ProductoController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/productoValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const upload = require("@/middlewares/multerMiddleware");
const imagesExists = require("@/middlewares/imagesExistsMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

router.route("/public").get(productoController.getAllPublic);

router.route("/:id/public").get(validateId, productoController.getByIdPublic);

router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(productoController.getAll)
  .get(productoController.getAllMasVendidos)
  .post(
    upload.array("imagenes", 10),
    createValidation,
    validateFields,
    imagesExists,
    productoController.create
  );

router.route("/masVendidos").get(productoController.getAllMasVendidos);

router
  .route("/:id")
  .get(validateId, productoController.getById)
  .put(
    upload.array("imagenes", 10),
    validateId,
    updateValidation,
    validateFields,
    productoController.update
  )
  .delete(validateId, productoController.delete);

module.exports = router;
