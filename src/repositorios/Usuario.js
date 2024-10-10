import RepositorioBase from "./Base.js";
import ModeloUsuario from "../modelos/Usuario.js";

class RepositorioUsuario extends RepositorioBase {
  constructor() {
    super(ModeloUsuario);
  }

  obtenerPorUsuario = async (usuario) => {
    try {
      return await this.model.findOne({ where: { usuario } });
    } catch (error) {
      throw new Error(
        `Error de Base de datos: error al obtener el usuario con usuario: ${usuario}: ${error.message}`
      );
    }
  };
}

const repositorioUsuario = new RepositorioUsuario();

export default repositorioUsuario;