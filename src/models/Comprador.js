const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Usuario = require("./Usuario");

const Comprador = sequelize.define(
  "Comprador",
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

module.exports = Comprador;