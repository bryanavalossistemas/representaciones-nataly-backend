const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");
const authService = require("@/services/AuthService");

class AuthController {
  login = asyncHandler(async (req, res) => {
    const { correo, contrasenia } = req.body;

    return res.status(200).json({
      success: true,
      token: await authService.login({ correo, contrasenia }),
    });
  });

  usuario = asyncHandler(async (req, res) => {
    return res.status(200).json({
      success: true,
      data: req.usuario,
    });
  });
}

module.exports = new AuthController();
