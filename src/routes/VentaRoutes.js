const express = require("express");
const ventaController = require("@/controllers/VentaController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/ventaValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(ventaController.getAll)
  .post(createValidation, validateFields, ventaController.create);
router
  .route("/:id")
  .get(validateId, ventaController.getById)
  .put(validateId, updateValidation, validateFields, ventaController.update)
  .delete(validateId, ventaController.delete);

module.exports = router;
