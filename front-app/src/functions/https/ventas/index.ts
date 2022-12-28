import axios from "axios";
import { InterProductos , InterVentas, ProductoVendido } from "../../../../interface"

const pathVentas = 'http://localhost:7890/Ventas/' 
//const pathProductos = 'http://localhost:7890/Productos/'

export const realizarVenta = async (venta:ProductoVendido[]):Promise<void> => {
    await axios.post(pathVentas , {
        venta:venta
    })
}

export const eliminarVenta = async (id:number):Promise<void> => {
    await axios.delete(pathVentas+id)
}

export const todasVentas = async ():Promise<InterVentas[]> => {
    const aux = await axios.get(pathVentas)
    const retorno:InterVentas[] = aux.data;
    return retorno;
}

export const ventaId = async (id:number):Promise<InterVentas> => {
    const aux = await axios.get(pathVentas+id)
    const retorno:InterVentas = aux.data[0];
    return retorno;
}