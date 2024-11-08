const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Usuario = require("./Usuario");

const Vendedor = sequelize.define(
  "Vendedor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    celular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
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
    freezeTableName: true,
    timestamps: false,
    defaultScope: {
      order: [["id", "DESC"]],
    },
  }
);

module.exports = Vendedor;
