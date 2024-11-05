const { Marca } = require("@/models");

class MarcaService {
  async create({ nombre }) {
    const marcaExiste = await Marca.findOne({
      where: { nombre },
    });
    if (marcaExiste) {
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

    return await Marca.create({ nombre });
  }

  async getAll() {
    return await Marca.findAll();
  }

  async getById({ id }) {
    const marca = await Marca.findByPk(id);
    if (!marca) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Marca no encontrada.",
            path: "id",
          },
        ],
      };
    }

    return marca;
  }

  async update({ id, nombre }) {
    const marca = await this.getById({ id });
    if (nombre) {
      const marcaExiste = await Marca.findOne({
        where: { nombre },
      });

      if (marcaExiste && marcaExiste.id !== marca.id) {
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

    return await marca.update({ nombre });
  }

  async delete({ id }) {
    const marca = await this.getById({ id });
    await marca.destroy();

    return "Marca eliminada correctamente";
  }
}

module.exports = new MarcaService();
