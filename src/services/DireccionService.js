const { Direccion, Distrito } = require("@/models");

class DireccionService {
  async getDireccionByUsuarioId({ usuarioId }) {
    const direccion = Direccion.findOne({ where: { usuarioId } });

    return direccion;
  }

  async createOrUpdateDireccionByUsuarioId({
    usuarioId,
    nombre,
    apellido,
    direccion,
    celular,
    distritoId,
  }) {
    const distritoFinded = await Distrito.findOne({
      where: { id: distritoId },
    });

    if (!distritoFinded) {
      throw {
        message: "Error de distrito no encontrado",
        statusCode: 404,
      };
    }

    const direccionFinded = await Direccion.findOne({ where: { usuarioId } });

    if (direccionFinded) {
      (await direccionFinded).update({
        nombre,
        apellido,
        direccion,
        celular,
        distritoId,
      });
    } else {
      await Direccion.create({
        nombre,
        apellido,
        direccion,
        celular,
        distritoId,
        usuarioId,
      });
    }

    return direccionFinded;
  }

  async deleteDireccionByUsuarioId({ usuarioId }) {
    const direccion = await Direccion.findOne({ where: { usuarioId } });

    if (direccion) {
      (await direccion).destroy();
    }

    return direccion;
  }
}

module.exports = new DireccionService();
