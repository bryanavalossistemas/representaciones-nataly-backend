const { Vendedor, Usuario } = require("@/models");

class VendedorService {
  async create({ nombre, username, password, dni, telefono, celular, correo }) {
    let errors = [];

    const usuarioExists = await Usuario.findOne({
      where: { username },
    });
    if (usuarioExists) {
      errors.push({
        message: "El nombre de usuario ya está en uso.",
        path: "username",
      });
    }

    const vendedorExists = await Vendedor.findOne({ where: { dni } });
    if (vendedorExists) {
      errors.push({
        message: "El dni ya está en uso.",
        path: "dni",
      });
    }

    if (errors.length > 0) {
      throw {
        message: "Error de conflicto",
        statusCode: 409,
        errors,
      };
    }

    const usuario = await Usuario.create({
      nombre,
      username,
      password,
      rolId: 2,
    });

    const vendedor = await Vendedor.create({
      dni,
      telefono,
      celular,
      correo,
      usuarioId: usuario.id,
    });

    return vendedor;
  }

  async getAll() {
    const vendedores = await Vendedor.findAll({
      include: [{ model: Usuario, as: "usuario" }],
    });

    return vendedores;
  }

  async getById({ id }) {
    const vendedor = await Vendedor.findByPk(id);

    if (!vendedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Vendedor no encontrado.",
            path: "id",
          },
        ],
      };
    }

    return vendedor;
  }

  async update({
    id,
    nombre,
    username,
    password,
    dni,
    telefono,
    celular,
    correo,
  }) {
    let errors = [];

    const vendedor = await Vendedor.findByPk(id);
    if (!vendedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Vendedor no encontrado.",
            path: "id",
          },
        ],
      };
    }

    if (username) {
      const usuarioExists = await Usuario.findOne({ where: { username } });
      if (usuarioExists && usuarioExists.id !== vendedor.usuarioId) {
        errors.push({
          message: "El nombre de usuario ya está en uso.",
          path: "username",
        });
      }
    }

    if (dni) {
      const vendedorExists = await Vendedor.findOne({ where: { dni } });
      if (vendedorExists && vendedorExists.id !== vendedor.id) {
        errors.push({
          message: "El dni ya está en uso.",
          path: "dni",
        });
      }
    }

    if (errors.length > 0) {
      throw {
        message: "Error de conflicto",
        statusCode: 409,
        errors,
      };
    }

    const usuario = await Usuario.findByPk(vendedor.usuarioId);
    await usuario.update({ nombre, username, password });

    await vendedor.update({ dni, telefono, celular, correo });

    return vendedor;
  }

  async delete({ id }) {
    const vendedor = await Vendedor.findByPk(id);
    if (!vendedor) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Vendedor no encontrado.",
            path: "id",
          },
        ],
      };
    }

    const usuario = await Usuario.findByPk(vendedor.usuarioId);
    await usuario.destroy();

    return vendedor;
  }
}

module.exports = new VendedorService();
