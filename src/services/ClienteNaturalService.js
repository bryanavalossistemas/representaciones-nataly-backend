const { ClienteNatural, Cliente } = require("@/models");

class ClienteNaturalService {
  async create({ nombre, dni, direccion, celular, correo }) {
    const clienteNaturalExiste = await ClienteNatural.findOne({
      where: { dni },
    });
    if (clienteNaturalExiste) {
      throw {
        message: "Error de conflicto",
        statusCode: 409,
        errors: [
          {
            message: "El dni ya está en uso.",
            path: "dni",
          },
        ],
      };
    }

    const cliente = await Cliente.create({
      nombre,
      direccion,
      celular,
      correo,
    });
    const clienteNatural = await ClienteNatural.create({
      dni,
      clienteId: cliente.id,
    });

    return { cliente, clienteNatural };
  }

  async getAll() {
    return await ClienteNatural.findAll({
      include: [{ model: Cliente, as: "cliente" }],
    });
  }

  async getById({ id }) {
    const clienteNatural = await ClienteNatural.findByPk(id);
    if (!clienteNatural) {
      throw {
        message: "Error de recurso no encontrado",
        statusCode: 404,
        errors: [
          {
            message: "Cliente natural no encontrado.",
            path: "id",
          },
        ],
      };
    }

    return clienteNatural;
  }

  async update({ id, nombre, dni, direccion, celular, correo }) {
    const clienteNatural = await this.getById({ id });
    if (dni) {
      const clienteNaturalExiste = await ClienteNatural.findOne({
        where: { dni },
      });

      if (
        clienteNaturalExiste &&
        clienteNaturalExiste.id !== clienteNatural.id
      ) {
        throw {
          message: "Error de conflicto",
          statusCode: 409,
          errors: [
            {
              message: "El dni ya está en uso.",
              path: "dni",
            },
          ],
        };
      }
    }

    const cliente = await Cliente.findByPk(clienteNatural.clienteId);
    await cliente.update({
      nombre,
      direccion,
      celular,
      correo,
    });
    await clienteNatural.update({ dni });

    return { cliente, clienteNatural };
  }

  async delete({ id }) {
    const clienteNatural = await this.getById({ id });
    const cliente = await Cliente.findByPk(clienteNatural.clienteId);
    await clienteNatural.destroy();
    await cliente.destroy();

    return "Cliente Natural eliminado correctamente";
  }
}

module.exports = new ClienteNaturalService();
