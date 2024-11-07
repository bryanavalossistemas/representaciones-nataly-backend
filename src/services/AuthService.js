const { Usuario } = require("@/models");
const { generateToken } = require("@/utils/tokenUtil");

class AuthService {
  async login({ correo, contrasenia }) {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      throw {
        message: "Error de autenticación",
        statusCode: 401,
        errors: [
          {
            message: "No pudimos encontrar tu cuenta.",
            path: "correo",
          },
        ],
      };
    }
    if (contrasenia !== usuario.contrasenia) {
      throw {
        message: "Error de autenticación",
        statusCode: 401,
        errors: [
          {
            message: "La contraseña es incorrecta.",
            path: "contrasenia",
          },
        ],
      };
    }
    return generateToken(usuario);
  }
}

module.exports = new AuthService();
