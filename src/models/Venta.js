const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Cliente = require("./Cliente");

const Venta = sequelize.define(
  "Venta",
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
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("subtotal");
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
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("total");
        return valor === null ? null : parseFloat(valor);
      },
    },
    utilidad: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("utilidad");
        return valor === null ? null : parseFloat(valor);
      },
    },
    nombreCliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Cliente,
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

module.exports = Venta;
