import db from '../db/db.js'
import DataTypes from 'sequelize'

export const ModelProdcutos = db.define('Producto',{
    nombre: {type: DataTypes.STRING },
    precio: {type: DataTypes.DOUBLE },
    vendidos: {type: DataTypes.INTEGER },
})

export const ModelVentas = db.define('Ventas',{
    venta: {type: DataTypes.JSON }
})