const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Distrito = require("./Distrito");
const Orden = require("./Orden");

const DireccionOrden = sequelize.define(
  "DireccionOrden",
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
      allowNull: true,
      references: {
        model: Distrito,
        key: "id",
      },
    },
    ordenId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Orden,
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

module.exports = DireccionOrden;
