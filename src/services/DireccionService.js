const { Direccion } = require("@/models");

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
    const direccion = Direccion.findOne({ where: { usuarioId } });

    if (direccion) {
      (await direccion).destroy();
    }

    return direccion;
  }
}

module.exports = new DireccionService();
