const existImages = (req, res, next) => {
  if (!req.files || req.files.length < 2) {
    return next({
      statusCode: 400,
      message: "Error de validación",
      errors: [
        { message: "Debes colocar por lo menos 2 imágenes.", path: "imagen" },
      ],
    });
  }

  next();
};

module.exports = existImages;
