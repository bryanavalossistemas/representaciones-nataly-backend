const { Usuario } = require("@/models");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return next({
      statusCode: 401,
      message: "Error de autenticación.",
      errors: [{ message: "Token faltante o inválido.", path: "token" }],
    });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const usuario = await Usuario.findByPk(decoded.id, {
      attributes: ["id", "rolId"],
    });
    if (!usuario)
      return next({
        statusCode: 404,
        message: "Error de recurso no encontrado.",
        errors: [{ message: "Usuario no encontrado.", path: "id" }],
      });

    req.usuario = usuario;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next({
        statusCode: 403,
        message: "Error de autenticación.",
        errors: [{ message: "Token expirado.", path: "token" }],
      });
    }
    return next({
      statusCode: 403,
      message: "Error de autenticación.",
      errors: [{ message: "Token inválido.", path: "token" }],
    });
  }
};

module.exports = authenticate;
