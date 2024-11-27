const { DataTypes } = require("sequelize");
const { sequelize } = require("@/config/db");

const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
		nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
		googleId: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: true,
		},
    rolId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

module.exports = Usuario;
