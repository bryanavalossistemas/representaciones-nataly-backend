function validateId(req, res, next) {
  const { id } = req.params;

  if (!id) {
    return next({
      statusCode: 400,
      message: "El ID es requerido.",
    });
  }

  const idNumber = Number(id);

  if (!Number.isInteger(idNumber) || idNumber <= 0) {
    return next({
      statusCode: 400,
      message: "El ID debe ser un número entero positivo.",
    });
  }

  req.params.id = idNumber;
  next();
}

module.exports = validateId;
