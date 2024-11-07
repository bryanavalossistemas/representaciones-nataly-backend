const jwt = require("jsonwebtoken");

const generateToken = (usuario) => {
  const payload = {
    id: usuario.id,
    rolId: usuario.rolId,
  };

  const options = {
    expiresIn: "24h",
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
  return token;
};

module.exports = {
  generateToken,
};
