import { Venta } from "../../../interface";

export const estadoDeCompra = (cantidad:number , deuda:Venta[] , setVentaPos:React.Dispatch<React.SetStateAction<Venta[]>>):Venta[] => {
    let auxDeuda:Venta[] = deuda.map(n => {
        return {
            id:n.id,
            createdAt:n.createdAt,
            cliente: n.cliente,
            articulos: n.articulos,
            tipo_de_venta: n.tipo_de_venta,
            valor_total: n.valor_total,
            valor_abonado: n.valor_abonado
        }
    })
    let auxVenta:Venta[] = []
    let auxCantidad:number = cantidad

    while(auxDeuda.length > 0) {
        let aux:Venta | undefined = auxDeuda.pop()

        if(aux === undefined) return []
        if(auxCantidad > 0){
            let valorMax:number = aux.valor_total - aux.valor_abonado 
            
            if(auxCantidad <= valorMax){
                aux.valor_abonado += auxCantidad 
                auxCantidad = 0
            }else{
                aux.valor_abonado += valorMax
                auxCantidad -= valorMax
            }
        }
        
        auxVenta.unshift(aux)
    }

    return auxVenta
}