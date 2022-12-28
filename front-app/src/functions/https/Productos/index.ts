import axios from "axios";
import { InterProductos, ProductoVendido } from "../../../../interface"

//const pathVentas = 'http://localhost:7890/Ventas/' 
const pathProductos = 'http://localhost:7890/Productos/' 


export const crearProducto = async(nombre:string , precio:number):Promise<void> => {    
    await axios.post(pathProductos ,{
        nombre,
        precio,
        vendidos:0
    });
}


export const editarProducto = async(nombre:string , precio:number , vendidos:number , id:number):Promise<void> => {
    await axios.put(pathProductos+id , {
        nombre,
        precio,
        vendidos:vendidos
});}


export const mostrarTodosLosProductos = async():Promise<InterProductos[]> => {
    const aux = await axios.get(pathProductos)
    return aux.data
}


export const eliminarProducto = async(id:number):Promise<void> => {
    await axios.delete(pathProductos+id)
}


export const mostrarProductoId = async(id:number):Promise<InterProductos[]> => {
    const aux = await axios.get(pathProductos+id);
    const data:InterProductos[] = aux.data
    return data
}


export const mostrarProductoNombre = async(id:string):Promise<InterProductos> => {
    const productos:InterProductos[] = await mostrarTodosLosProductos()
    const newId:number = productos.filter(n => n.nombre === id)[0].id
    const aux = await axios.get(pathProductos+newId);
    const data:InterProductos = aux.data[0]
    return data
}

export const comprobarNombre = async (nombre:string , id:number):Promise<boolean> => {
    const productos:InterProductos[] = await mostrarTodosLosProductos()
    const aux = productos.filter(n => n.id !== id)
    const nombres:string[] = aux.map(n => n.nombre)
    return !nombres.includes(nombre)
}

