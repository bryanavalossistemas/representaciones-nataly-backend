const express = require("express");
const compraController = require("@/controllers/CompraController");
const {
  createValidation,
  updateValidation,
} = require("@/validations/compraValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const validateId = require("@/middlewares/validateIdMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");
const authorize = require("@/middlewares/authorizeMiddleware");

const router = express.Router();

// router.use(authenticate, authorize({ rolesId: [1] }));

router
  .route("/")
  .get(compraController.getAll)
  .post(createValidation, validateFields, compraController.create);
router
  .route("/:id")
  .get(validateId, compraController.getById)
  .put(validateId, updateValidation, validateFields, compraController.update)
  .delete(validateId, compraController.delete);

module.exports = router;
