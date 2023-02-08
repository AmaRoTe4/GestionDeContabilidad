import db from '../db/db.js'
import DataTypes from 'sequelize'

export const ModelProductos = db.define('Productos',{
    nombre: {type: DataTypes.STRING },
    descripcion: {type: DataTypes.STRING },
    categoria: {type: DataTypes.INTEGER },
    cantidad: {type: DataTypes.INTEGER },
    precio: {type: DataTypes.DOUBLE },
    codigo: {type: DataTypes.INTEGER }
})

export const ModelVentas = db.define('Ventas',{
    cliente: {type: DataTypes.INTEGER },
    articulos: {type: DataTypes.STRING },
    tipo_de_venta: {type: DataTypes.STRING },
    valor_total: {type: DataTypes.DOUBLE },
    valor_abonado: {type: DataTypes.DOUBLE },
})

export const ModelClientes = db.define('Clientes',{
    nombre: {type: DataTypes.STRING },
    apellido: {type: DataTypes.STRING },
    localidad: {type: DataTypes.INTEGER },
    telefono: {type: DataTypes.STRING },
    debe: {type: DataTypes.DOUBLE },
})

export const ModelCategorias = db.define('Categorias',{
    nombre: {type: DataTypes.STRING }
})

export const ModelLocalidades = db.define('Localidades',{
    nombre: {type: DataTypes.STRING }
})