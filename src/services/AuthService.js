const { Usuario } = require("@/models");
const { generateToken } = require("@/utils/tokenUtil");

class AuthService {
  async login({ username, password }) {
    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario) {
      throw {
        message: "Error de autenticación",
        statusCode: 401,
        errors: [
          {
            message: "No pudimos encontrar tu cuenta.",
            path: "username",
          },
        ],
      };
    }
    if (password !== usuario.password) {
      throw {
        message: "Error de autenticación",
        statusCode: 401,
        errors: [
          {
            message: "La contraseña es incorrecta.",
            path: "password",
          },
        ],
      };
    }
    return generateToken(usuario);
  }
}

module.exports = new AuthService();
