const express = require("express");
const vendedorController = require("@/controllers/VendedorController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/vendedorValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(vendedorController.getAll)
  .post(createValidation, validateFields, vendedorController.create);
router
  .route("/:id")
  .get(validateId, vendedorController.getById)
  .put(validateId, updateValidation, validateFields, vendedorController.update)
  .delete(validateId, vendedorController.delete);

module.exports = router;
