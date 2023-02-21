import { getCliente, updateCliente } from './../../api/clientes';
import { Cliente, Producto, ProductoDeVenta, Venta } from "../../../interface"
import { getProducto, updateProducto } from "../../api/productos"
import { createVenta } from "../../api/ventas"

//@ts-ignore
export const realizarVenta = async (id:number,seleccionado:string,valorTotalVenta:number,cantidad:number,sales:ProductoDeVenta[]):boolean => {
    try{
        for(let i = 0 ; i < sales.length ; i++) {
            await adaptarDatosDeStock(sales[i].id , sales[i].cantidad)
        }
    
        if(seleccionado === "parcial") await agregarDueda(id  , valorTotalVenta - cantidad)
        else if(seleccionado !== "completo") await agregarDueda(id  , valorTotalVenta)
    
        const venta:Venta = {
            cliente: id,
            //@ts-ignore
            articulos: JSON.stringify(sales),
            tipo_de_venta: seleccionado,
            valor_total: valorTotalVenta,
            valor_abonado: 
            seleccionado === "completo" 
            ? valorTotalVenta
            : seleccionado === "parcial"
            ? cantidad
            : 0
        } 
    
        await createVenta(venta)
    
        return true
    }catch(error) {
        return false
    }
}

//@ts-ignore
const adaptarDatosDeStock = async (id:number , cantidadMenos:number):boolean => {
    let producto:Producto | undefined = await getProducto(id)
    if(producto === undefined) return false
    producto.cantidad -= cantidadMenos 
    const resultado:boolean = await updateProducto(id , producto)
    return resultado;
}

//@ts-ignore
const agregarDueda = async (id:number , cantidad:number):boolean => {
    let cliente:Cliente | undefined = await getCliente(id)
    if(cliente === undefined) return false
    cliente.debe += cantidad 
    const resultado:boolean = await updateCliente(id , cliente)
    return resultado;
}