const cloudinary = require("@/config/cloudinary");

class CloudinaryService {
  create = ({ buffer }) => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto", folder: process.env.CLOUDINARY_FOLDER },
        (error, result) => {
          if (error) {
            reject({
              statusCode: error.http_code,
              message: "Error de cloudinary",
              errors: [
                {
                  message: error.message,
                  path: "imagen",
                },
              ],
            });
          }
          resolve(result);
        }
      );

      uploadStream.end(buffer);
    });
  };

  delete = async ({ public_id }) => {
    await cloudinary.uploader.destroy(public_id);
  };
}

module.exports = new CloudinaryService();
