import { Venta } from "../../../interface";

export const ordenarPorDueda = (ventas:Venta[]):Venta[] => {
    let retorno:Venta[] = []
    
    let deudoras:Venta[] = ventas.filter(n => n.valor_abonado !== n.valor_total)
    let pagadas:Venta[] = ventas.filter(n => n.valor_abonado === n.valor_total)

    deudoras.map(n => retorno.push(n))
    pagadas.map(n => retorno.push(n))
    
    return retorno;
}