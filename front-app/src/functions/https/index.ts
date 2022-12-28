import axios from 'axios'
import {InterProductos , InterVentas, ProductoVendido} from '../../../interface'
import { mostrarProductoId } from './Productos'
import { ventaId } from './ventas'

const pathVentas = 'http://localhost:7890/Ventas/' 
const pathProductos = 'http://localhost:7890/Productos/' 

export const ResetDataBase = async():Promise<void> => {
    const ventas = await axios.get(pathVentas)
    const productos = await axios.get(pathProductos)
    const infoVentas:InterVentas[] = ventas.data
    const infoProductos:InterProductos[] = productos.data
    const idVentas = infoVentas.map(n => n.id)
    const idProductos = infoProductos.map(n => n.id)

    for(let i = 0; i < idVentas.length; i++)  await axios.delete(pathVentas+idVentas[i])
    for(let i = 0; i < idProductos.length; i++)  await axios.delete(pathProductos+idProductos[i])
}

export const cargaVenta = async (
    id:number , 
    setVenta: React.Dispatch<React.SetStateAction<InterProductos[]>>,
    setPrecioTotal: React.Dispatch<React.SetStateAction<number>>,
    setCantidadTotal: React.Dispatch<React.SetStateAction<number>>,
) => {
    const aux:InterVentas = await ventaId(id)
    const productos:ProductoVendido[] = JSON.parse(aux.venta)
    const retorno:InterProductos[] = []

    let precio = 0
    let cantidad = 0
    
    if(aux === undefined) return

    for(let i = 0 ; i < productos.length; i++){
        const auxProducto:InterProductos[] = await mostrarProductoId(productos[i].id) 
        const Producto:InterProductos = auxProducto[0]
        Producto.vendidos = productos[i].vendidos;
        retorno.push(Producto)
        precio += Producto.precio*productos[i].vendidos;
        cantidad += productos[i].vendidos
    }
    
    setVenta(retorno)
    setPrecioTotal(precio)
    setCantidadTotal(cantidad)     
}