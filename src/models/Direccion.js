const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Distrito = require("./Distrito");
const Usuario = require("./Usuario");

const Direccion = sequelize.define(
  "Direccion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		celular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		distritoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Distrito,
        key: "id",
      },
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    defaultScope: {
      order: [["id", "DESC"]],
    },
  }
);

module.exports = Direccion;
