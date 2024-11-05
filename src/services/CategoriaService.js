const { Categoria } = require("@/models");

class CategoriaService {
  async create({ nombre }) {
    const categoriaExists = await Categoria.findOne({
      where: { nombre },
    });

    if (categoriaExists) {
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

    const categoria = await Categoria.create({ nombre });

    return categoria;
  }

  async getAll() {
    const categorias = await Categoria.findAll();

    return categorias;
  }

  async getById({ id }) {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Categoría no encontrada.",
            path: "id",
          },
        ],
      };
    }

    return categoria;
  }

  async update({ id, nombre }) {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Categoría no encontrada.",
            path: "id",
          },
        ],
      };
    }

    if (nombre) {
      const categoriaExists = await Categoria.findOne({
        where: { nombre },
      });

      if (categoriaExists && categoriaExists.id !== categoria.id) {
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

    await categoria.update({ nombre });

    return categoria;
  }

  async delete({ id }) {
    const categoria = await Categoria.findByPk(id);

    if (!categoria) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Categoría no encontrada.",
            path: "id",
          },
        ],
      };
    }

    await categoria.destroy();

    return categoria;
  }
}

module.exports = new CategoriaService();
