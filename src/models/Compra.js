const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Proveedor = require("./Proveedor");

const Compra = sequelize.define(
  "Compra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombreProveedor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proveedorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Proveedor,
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

module.exports = Compra;
