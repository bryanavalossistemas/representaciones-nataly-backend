const { Usuario } = require("@/models");
const { generateToken } = require("@/utils/tokenUtil");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
  "673950667836-buf9i3qlfoke3npebq1hf2dimmu0vqmb.apps.googleusercontent.com"
);

class AuthService {
  async signup({ nombre, correo, contrasenia }) {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (usuario && !usuario.contrasenia) {
      await usuario.update({ contrasenia });
    } else if (!usuario) {
      usuario = await User.create({
        nombre,
        correo,
        contrasenia,
      });
    } else {
      throw {
        message: "Error de autenticación",
        statusCode: 401,
        errors: [
          {
            message: "El usuario ya existe.",
            path: "correo",
          },
        ],
      };
    }

    return generateToken(usuario);
  }

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

  async google({ googleToken }) {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience:
        "673950667836-buf9i3qlfoke3npebq1hf2dimmu0vqmb.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const correo = payload.email;
    const googleId = payload.sub;
    const nombre = payload.name;

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      usuario = await Usuario.create({
        correo,
        googleId,
        nombre,
        rolId: 3,
      });
    } else if (!usuario.googleId) {
      usuario.update({
        googleId,
      });
    }
    return generateToken(usuario);
  }
}

module.exports = new AuthService();
