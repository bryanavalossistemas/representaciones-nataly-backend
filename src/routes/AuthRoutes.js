const express = require("express");
const authController = require("@/controllers/AuthController");
const { loginValidation } = require("@/validations/authValidation");
const validateFields = require("@/middlewares/validateFieldsMiddleware");
const authenticate = require("@/middlewares/authenticateMiddleware");

const router = express.Router();

router.post("/login", loginValidation, validateFields, authController.login);
router.get("/usuario", authenticate, authController.usuario);

module.exports = router;
