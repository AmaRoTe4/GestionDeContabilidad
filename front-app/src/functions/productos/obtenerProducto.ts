import { Producto } from "../../../interface";

export const obtenerProducto = (id:number , productos:Producto[]):string => {
    const producto:Producto | undefined = productos.filter(n => n.id === id)[0]
    return producto === undefined ? "null" : producto.nombre 
}