import { Producto, ProductoDeVenta, Venta } from "../../../interface"
import { getProducto, updateProducto } from "../../api/productos"
import { createVenta } from "../../api/ventas"

export const realizarVenta = async (
    id:number,
    seleccionado:string,
    valorTotalVenta:number,
    cantidad:number,
    sales:ProductoDeVenta[]
) => {

    for(let i = 0 ; i < sales.length ; i++) {
        await adaptarDatosDeStock(sales[i].id , sales[i].cantidad)
    }

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
}

//@ts-ignore
const adaptarDatosDeStock = async (id:number , cantidadMenos:number):boolean => {
    let producto:Producto | undefined = await getProducto(id)
    if(producto === undefined) return false
    producto.cantidad -= cantidadMenos 
    const resultado:boolean = await updateProducto(id , producto)
    return resultado;
}