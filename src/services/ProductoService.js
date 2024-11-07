const { Producto, ImagenProducto, Categoria, Marca } = require("@/models");
const cloudinaryService = require("@/services/CloudinaryService");

class ProductoService {
  async create({
    nombre,
    descripcion,
    precioCosto,
    precioVenta,
    stock,
    categoriaId,
    marcaId,
    files,
  }) {
    const productoWithNombreExists = await Producto.findOne({
      where: { nombre },
    });
    if (productoWithNombreExists) {
      throw {
        message: "Error de conflicto",
        statusCode: 409,
        errors: [
          {
            message: "El nombre ya está en uso.",
            path: "nombre",
          },
        ],
      };
    }

    if (categoriaId) {
      const categoriaExists = await Categoria.findByPk(categoriaId);
      if (!categoriaExists) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "La categoría no existe.",
              path: "categoriaId",
            },
          ],
        };
      }
    }

    if (marcaId) {
      const marcaExists = await Marca.findByPk(marcaId);
      if (!marcaExists) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "La marca no existe.",
              path: "marcaId",
            },
          ],
        };
      }
    }

    const producto = await Producto.create({
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoriaId,
      marcaId,
    });

    const uploadPromises = files.map((file) => {
      return cloudinaryService.create({
        buffer: file.buffer,
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    const savePromises = uploadResults.map((result) => {
      return ImagenProducto.create({
        url: result.url,
        publicId: result.public_id,
        productoId: producto.id,
      });
    });

    await Promise.all(savePromises);

    return producto;
  }

  async getAll() {
    return await Producto.findAll({
      include: [
        { model: Categoria, as: "categoria" },
        { model: Marca, as: "marca" },
        { model: ImagenProducto, as: "imagenesProducto" },
      ],
    });
  }

  async getAllPublic() {
    return await Producto.findAll({
      attributes: ["id", "nombre", "descripcion", "precioVenta", "stock"],
      include: [
        { model: Categoria, as: "categoria" },
        { model: Marca, as: "marca" },
        {
          model: ImagenProducto,
          as: "imagenesProducto",
          attributes: ["id", "url"],
        },
      ],
    });
  }

  async getById({ id }) {
    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: ImagenProducto,
          as: "imagenesProducto",
        },
      ],
    });
    if (!producto) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Producto no encontrado.",
            path: "id",
          },
        ],
      };
    }

    return producto;
  }

  async getByIdPublic({ id }) {
    const producto = await Producto.findByPk(id, {
      attributes: ["id", "nombre", "descripcion", "precioVenta", "stock"],
      include: [
        {
          model: ImagenProducto,
          as: "imagenesProducto",
        },
      ],
    });
    if (!producto) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Producto no encontrado.",
            path: "id",
          },
        ],
      };
    }

    return producto;
  }

  async update({
    id,
    nombre,
    descripcion,
    precioCosto,
    precioVenta,
    stock,
    categoriaId,
    marcaId,
    imagenesProducto,
    files,
  }) {
    const producto = await this.getById({ id });

    if (nombre) {
      const productoWithNombreExists = await Producto.findOne({
        where: { nombre },
      });

      if (
        productoWithNombreExists &&
        productoWithNombreExists.id !== producto.id
      ) {
        throw {
          message: "Error de conflicto",
          statusCode: 409,
          errors: [
            {
              message: "El nombre ya está en uso.",
              path: "nombre",
            },
          ],
        };
      }
    }

    if (categoriaId) {
      const categoriaExists = await Categoria.findByPk(categoriaId);
      if (!categoriaExists) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "La categoría no existe.",
              path: "categoriaId",
            },
          ],
        };
      }
    }

    if (marcaId) {
      const marcaExists = await Marca.findByPk(marcaId);
      if (!marcaExists) {
        throw {
          message: "Error de recurso no encontrado",
          statusCode: 404,
          errors: [
            {
              message: "La marca no existe.",
              path: "marcaId",
            },
          ],
        };
      }
    }

    if (files) {
      const uploadPromises = files.map((file) => {
        return cloudinaryService.create({
          buffer: file.buffer,
        });
      });

      const uploadResults = await Promise.all(uploadPromises);

      const savePromises = uploadResults.map((result) => {
        return ImagenProducto.create({
          url: result.url,
          publicId: result.public_id,
          productoId: producto.id,
        });
      });

      await Promise.all(savePromises);
    }

    if (imagenesProducto) {
      const imagenesProductoToDelete = imagenesProducto.filter(
        (imagenProducto) => imagenProducto.toDelete
      );

      await Promise.all(
        imagenesProductoToDelete.map(async (imagenProductoToDelete) => {
          const imagenProducto = await ImagenProducto.findByPk(
            imagenProductoToDelete.id
          );
          if (!imagenProducto) {
            throw {
              message: "Error de recurso no encontrado",
              statusCode: 404,
              errors: [
                {
                  message: "La imagen del producto no existe.",
                  path: "imagenesProducto",
                },
              ],
            };
          }

          await cloudinaryService.delete({
            public_id: imagenProducto.publicId,
          });

          await imagenProducto.destroy();
        })
      );
    }

    return await producto.update({
      nombre,
      descripcion,
      precioCosto,
      precioVenta,
      stock,
      categoriaId: categoriaId || null,
      marcaId: marcaId || null,
    });
  }

  async delete({ id }) {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Producto no encontrado.",
            path: "id",
          },
        ],
      };
    }
    const imagenesProducto = await ImagenProducto.findAll({
      where: { productoId: producto.id },
    });

    await Promise.all(
      imagenesProducto.map(async (imagenProducto) => {
        await cloudinaryService.delete({
          public_id: imagenProducto.publicId,
        });
      })
    );

    await producto.destroy();

    return producto;
  }
}

module.exports = new ProductoService();
