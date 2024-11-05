const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Verifica si el archivo es una imagen revisando el tipo MIME
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // Acepta el archivo
    } else {
      cb(new Error("Solo se permiten archivos de imagen")); // Rechaza el archivo si no es una imagen
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño del archivo a 5 MB
});

module.exports = upload;
