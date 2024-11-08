const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Usuario = require("./Usuario");

const Orden = sequelize.define(
  "Orden",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("total");
        return valor === null ? null : parseFloat(valor);
      },
    },
    igv: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("igv");
        return valor === null ? null : parseFloat(valor);
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("subtotal");
        return valor === null ? null : parseFloat(valor);
      },
    },
    estaPagado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    nombreUsuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

module.exports = Orden;
