const { Vendedor, Usuario } = require("@/models");

class VendedorService {
  async create({ nombre, correo, contrasenia, dni, celular, telefono }) {
    let errors = [];

    const usuarioWithCorreoExists = await Usuario.findOne({
      where: { correo },
    });
    if (usuarioWithCorreoExists) {
      errors.push({
        message: "El correo ya está en uso.",
        path: "correo",
      });
    }

    const vendedorWithDNIExists = await Vendedor.findOne({ where: { dni } });
    if (vendedorWithDNIExists) {
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
      correo,
      contrasenia,
      rolId: 2,
    });

    const vendedor = await Vendedor.create({
      dni,
      celular,
      telefono,
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

  async update({ id, correo, contrasenia, nombre, dni, celular, telefono }) {
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

    if (correo) {
      const usuarioWithCorreoExists = await Usuario.findOne({
        where: { correo },
      });
      if (
        usuarioWithCorreoExists &&
        usuarioWithCorreoExists.id !== vendedor.usuarioId
      ) {
        errors.push({
          message: "El correo ya está en uso.",
          path: "correo",
        });
      }
    }

    if (dni) {
      const vendedorWithDNIExists = await Vendedor.findOne({ where: { dni } });
      if (vendedorWithDNIExists && vendedorWithDNIExists.id !== vendedor.id) {
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
    await usuario.update({ nombre, correo, contrasenia });

    await vendedor.update({ dni, celular, telefono });

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
