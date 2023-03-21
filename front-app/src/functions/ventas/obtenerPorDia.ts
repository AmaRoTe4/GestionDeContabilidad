import { Venta } from "../../../interface";

export const obtenerPorDia = (ventas:Venta[] , dia:string):Venta[] => {
    let retorno:Venta[] = []
    
    let ventasDay:Venta[] = ventas.filter((n) => n.createdAt === dia)

    let deudoras:Venta[] = ventasDay.filter(n => n.valor_abonado !== n.valor_total)
    let pagadas:Venta[] = ventasDay.filter(n => n.valor_abonado === n.valor_total)

    deudoras.map(n => retorno.push(n))
    pagadas.map(n => retorno.push(n))
    
    return retorno;
}