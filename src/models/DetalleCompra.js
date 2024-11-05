const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Producto = require("./Producto");
const Compra = require("./Compra");

const DetalleCompra = sequelize.define(
  "DetalleCompra",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precioCosto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("precioCosto");
        return valor === null ? null : parseFloat(valor);
      },
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Producto,
        key: "id",
      },
    },
    compraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Compra,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = DetalleCompra;
