import { InterProductos } from './../../../interface';
import { ProductoVendido , InterVentas } from "../../../interface";
import { mostrarProductoId } from "../https/Productos";

export const cantidadTotal = (array:ProductoVendido[]):number => {
    let aux = 0;
    for(let i = 0; i < array.length; i++) {
        aux += array[i].vendidos
    }
    return aux;
}  

export const precioTotal = async (array:ProductoVendido[]):Promise<number> => {
    let aux = 0;
    for(let i = 0; i < array.length; i++) {
        let precio:InterProductos[] = await mostrarProductoId(array[i].id)
        if(precio.length < 1) break;
        aux += precio[0].precio*array[i].vendidos
    }
    return aux;
} 