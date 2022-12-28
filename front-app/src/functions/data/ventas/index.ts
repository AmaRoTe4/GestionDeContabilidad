import { cantidadTotal, precioTotal } from "..";
import { InterProductos, InterVentas, ProductoVendido } from "../../../../interface";
import { eliminarVenta, realizarVenta, todasVentas } from "../../https/ventas";

//esta lo que hace es limpiar las ventas que se pueden calcular
//retorno las ventas 
//y sus valores totales
export const valoresAbsolutosPorVenta = async ():Promise<InterVentas[]> => {
    const ventas:InterVentas[] = await todasVentas();
    let retorno:InterVentas[] = []

    for(let i = 0 ; i < ventas.length; i++){
        if(ventas[i].id === undefined || typeof(ventas[i].venta) !== "string") break;

        const venta:ProductoVendido[] = JSON.parse(ventas[i].venta)
        const cantidad:number = cantidadTotal(venta)
        const precio:number = await precioTotal(venta)

        //@ts-ignore
        if(precio <= 0) await eliminarVenta(ventas[i].id) 
        else{
            retorno.push(
                {
                    id: ventas[i].id,
                    cantidad:cantidad,
                    precio:precio,
                    productos: venta,
                    venta:""
                }
            )
        }
    }

    return retorno
}


export const RealizarVenta = (prtsPorVender:ProductoVendido[] , limpiar:Function) => {
    if(prtsPorVender.length <= 0) return

    let aux:ProductoVendido[] = [];
    
    prtsPorVender.forEach((n:ProductoVendido) => {
        aux.push({id: n.id, vendidos: n.vendidos})
    })

    realizarVenta([...aux])
    limpiar()
}

//estas dos dos de ventas
export const BorrarProducto = (
    id:number , 
    prtsPorVender:InterProductos[] ,  
    setPrtsPorVender: React.Dispatch<React.SetStateAction<InterProductos[]>>,
    setTotal: React.Dispatch<React.SetStateAction<number[]>>
) => {
    let aux = prtsPorVender
    let eliminar:InterProductos = prtsPorVender.splice(id , 1)[0]
    setPrtsPorVender(aux);
    setTotal(n => 
        [n[0]-eliminar.vendidos,
        n[1]-eliminar.vendidos*eliminar.precio]
    )
}

export const cargaVentas = async (
    setVentas:React.Dispatch<React.SetStateAction<InterVentas[]>>,
    setPrecioTotal:React.Dispatch<React.SetStateAction<number>>,
    setCantidadTotal:React.Dispatch<React.SetStateAction<number>>,
) => {
    const retorno:InterVentas[] = await valoresAbsolutosPorVenta()

    let precio = 0
    let cantidad = 0
    retorno.map(n => precio += n.precio ? n.precio : 0)
    retorno.map(n => cantidad += n.cantidad ? n.cantidad : 0)

    setVentas(retorno)
    setPrecioTotal(precio)
    setCantidadTotal(cantidad)
}