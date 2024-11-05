const authorize = ({ rolesId }) => {
  return async (req, res, next) => {
    if (!req.usuario) {
      return next({
        statusCode: 401,
        message: "Error de autenticación.",
        errors: [{ message: "No autenticado." }],
      });
    }

    if (!rolesId.includes(req.usuario.rolId)) {
      return next({
        statusCode: 403,
        message: "Error de autorización.",
        errors: [
          { message: "No tienes permisos para acceder a este recurso." },
        ],
      });
    }

    next();
  };
};

module.exports = authorize;
