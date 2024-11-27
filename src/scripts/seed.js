const { sequelize } = require("@/config/db");
const {
  Rol,
  Usuario,
  Administrador,
  Categoria,
  Marca,
  Proveedor,
  Cliente,
  ImagenProducto,
  Producto,
  Comprador,
  Distrito,
} = require("@/models");
const colors = require("colors");

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    await Rol.bulkCreate([
      {
        nombre: "Administrador",
      },
      {
        nombre: "Vendedor",
      },
      {
        nombre: "Comprador",
      },
    ]);
    await Usuario.bulkCreate([
      {
        nombre: "Bryan Avalos Loa y pardo Administrador",
        correo: "admin@admin.com",
        contrasenia: "admin",
        rolId: 1,
      },
      {
        nombre: "Bryan Avalos Loa y pardo Comprador",
        correo: "comprador@comprador.com",
        contrasenia: "comprador",
        rolId: 3,
      },
    ]);
    await Administrador.bulkCreate([
      {
        usuarioId: 1,
      },
    ]);
    await Comprador.bulkCreate([
      {
        usuarioId: 2,
      },
    ]);
    await Distrito.bulkCreate([
      { nombre: "Lima" },
      { nombre: "Callao" },
      { nombre: "Ate Vitarte" },
      { nombre: "Barranco" },
      { nombre: "Breña" },
      { nombre: "Carabayllo" },
      { nombre: "Chaclacayo" },
      { nombre: "Chorrillos" },
      { nombre: "Cieneguilla" },
      { nombre: "Comas" },
      { nombre: "El Agustino" },
      { nombre: "Independencia" },
      { nombre: "Jesús María" },
      { nombre: "La Molina" },
      { nombre: "La Victoria" },
      { nombre: "Lince" },
      { nombre: "Los Olivos" },
      { nombre: "Lurín" },
      { nombre: "Magdalena del Mar" },
      { nombre: "Miraflores" },
      { nombre: "Pachacamac" },
      { nombre: "Pucusana" },
      { nombre: "Pueblo Libre" },
      { nombre: "Puente Piedra" },
      { nombre: "Punta Hermosa" },
      { nombre: "Punta Negra" },
      { nombre: "Rímac" },
      { nombre: "San Bartolo" },
      { nombre: "San Borja" },
      { nombre: "San Isidro" },
      { nombre: "San Juan de Lurigancho" },
      { nombre: "San Juan de Miraflores" },
      { nombre: "San Luis" },
      { nombre: "San Martín de Porres" },
      { nombre: "San Miguel" },
      { nombre: "Santa Anita" },
      { nombre: "Santa María del Mar" },
      { nombre: "Santa Rosa" },
      { nombre: "Surquillo" },
      { nombre: "Villa El Salvador" },
      { nombre: "Villa María del Triunfo" },
      { nombre: "Ancón" },
    ]);
    await Categoria.bulkCreate([
      {
        nombre: "Harina",
      },
      {
        nombre: "Manteca",
      },
    ]);
    await Marca.bulkCreate([
      {
        nombre: "Anita",
      },
      {
        nombre: "Gordito",
      },
    ]);
    await Proveedor.bulkCreate([
      {
        nombre: "Alicorp S.A.C",
        ruc: "20600007522",
        direccion: "Av. Argentina 721",
        telefono: "4746922",
        celular: "915115894",
        correo: "alicorp@gmail.com",
      },
      {
        nombre: "D'Masa S.A.C",
        ruc: "20600007523",
        direccion: "Av. Javier Prado 212",
        telefono: "4746922",
        celular: "915115894",
        correo: "dmasa@gmail.com",
      },
    ]);
    await Cliente.bulkCreate([
      {
        nombre: "Representaciones Nataly S.A.C",
        ruc: "20600007522",
        direccion: "Av. Aviacion 721",
        celular: "915115894",
        telefono: "4746922",
        correo: "representacionesnataly@gmail.com",
      },
    ]);
    await Producto.bulkCreate([
      {
        nombre: "Harina Anita x 50 Kg",
        descripcion: "Descripcion de Harina Anita",
        precioCosto: 100,
        precioVenta: 200,
        stock: 100,
        categoriaId: 1,
        marcaId: 1,
      },
      {
        nombre: "Manteca Vegetal Gordito x 14 Kg",
        descripcion: "Descripcion de Manteca Gordito",
        precioCosto: 200,
        precioVenta: 300,
        stock: 100,
        categoriaId: 2,
        marcaId: 2,
      },
    ]);
    await ImagenProducto.bulkCreate([
      {
        url: "https://res.cloudinary.com/bryanavalossistemas/image/upload/v1730655238/rn-system/jqkzopsns8fjlldnrkww.webp",
        publicId: "rn-system/jqkzopsns8fjlldnrkww",
        productoId: 1,
      },
      {
        url: "https://res.cloudinary.com/bryanavalossistemas/image/upload/v1730756412/rn-system/cbktfjznnhsbtnfxnazp.webp",
        publicId: "rn-system/cbktfjznnhsbtnfxnazp",
        productoId: 2,
      },
      {
        url: "https://res.cloudinary.com/bryanavalossistemas/image/upload/v1730655238/rn-system/jqkzopsns8fjlldnrkww.webp",
        publicId: "rn-system/jqkzopsns8fjlldnrkww",
        productoId: 2,
      },
      {
        url: "https://res.cloudinary.com/bryanavalossistemas/image/upload/v1730756412/rn-system/cbktfjznnhsbtnfxnazp.webp",
        publicId: "rn-system/cbktfjznnhsbtnfxnazp",
        productoId: 1,
      },
    ]);
    console.log(colors.blue.bold("SEED EJECUTADO CORRECTAMENTE"));
    process.exit(0);
  } catch (error) {
    console.error(colors.red.bold("ERROR AL INSERTAR LOS DATOS", error));
    process.exit(1);
  }
};

seedDatabase();
