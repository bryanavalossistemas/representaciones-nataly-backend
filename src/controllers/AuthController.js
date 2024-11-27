const asyncHandler = require("@/middlewares/asyncHandlerMiddleware");
const authService = require("@/services/AuthService");

class AuthController {
  signup = asyncHandler(async (req, res) => {
    const { nombre, correo, contrasenia } = req.body;

    return res.status(201).json({
      success: true,
      token: await authService.signup({ nombre, correo, contrasenia }),
    });
  });

  login = asyncHandler(async (req, res) => {
    const { correo, contrasenia } = req.body;

    return res.status(200).json({
      success: true,
      token: await authService.login({ correo, contrasenia }),
    });
  });

  google = asyncHandler(async (req, res) => {
    const { googleToken } = req.body;

    console.log(googleToken);

    return res.status(200).json({
      success: true,
      token: await authService.google({ googleToken }),
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
