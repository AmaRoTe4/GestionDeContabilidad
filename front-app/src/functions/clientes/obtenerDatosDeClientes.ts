import { getAllVentas } from './../../api/ventas';
import { DataFullCustomar, Localidad, Venta } from "../../../interface"
import { getLocalidad } from '../../api/localidades';

//@ts-ignore
export const DataOfTheCustomer = async (id:number):DataFullCustomar => {
    let retorno:DataFullCustomar = {
        cantidad_de_facturas_sin_pagar:0,
        cantidad_de_compras:0,
        valorVentasTotal:0,
        cantidadPVT:0,
        ventas:[],
        localidad: ""
    }

    const localidad:Localidad | undefined = await getLocalidad(id)
    if(localidad === undefined) return retorno 
    retorno.localidad = localidad.nombre


    const aux:Venta[] | undefined = await getAllVentas()
    if(aux === undefined) return retorno 
    let data:Venta[] = aux.filter(n => n.id === id)

    //esta funcion la tendremos que hacer con un traductos de string a data venta
    //por eso lo vamos adejar pra mas adelante (cantidadPVT:0) -> problema 
    data.map(n => {
        retorno.ventas.push(n)
        retorno.cantidad_de_compras += 1
        retorno.valorVentasTotal += n.valor_total
        
        if(n.valor_total > n.valor_abonado) retorno.cantidad_de_facturas_sin_pagar += 1
    });

    return retorno;
}