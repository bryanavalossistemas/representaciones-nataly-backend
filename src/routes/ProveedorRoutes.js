const express = require("express");
const proveedorController = require("@/controllers/ProveedorController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/proveedorValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

// router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(proveedorController.getAll)
  .post(createValidation, validateFields, proveedorController.create);
router
  .route("/:id")
  .get(validateId, proveedorController.getById)
  .put(validateId, updateValidation, validateFields, proveedorController.update)
  .delete(validateId, proveedorController.delete);

module.exports = router;
