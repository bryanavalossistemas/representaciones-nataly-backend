const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");
const Producto = require("@/models/Producto");
const Orden = require("@/models/Orden");

const DetalleOrden = sequelize.define(
  "DetalleOrden",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombreProducto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioVenta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const valor = this.getDataValue("precioVenta");
        return valor === null ? null : parseFloat(valor);
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
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
    ordenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Orden,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = DetalleOrden;
