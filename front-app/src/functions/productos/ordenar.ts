import { Producto } from "../../../interface";


export const ordenarCantidad = (productos:Producto[]):Producto[] => {
    let retorno:Producto[] = [];

    let sinStock:Producto[] = productos.filter(n => n.cantidad === 0);
    let conStock:Producto[] = productos.filter(n => n.cantidad !== 0);

    while(sinStock.length > 0 || conStock.length > 0){
        if(sinStock.length > 0) {
            let aux = sinStock.shift()
            if(aux !== undefined) retorno.push(aux)
        }else{
            let aux = conStock.shift()
            if(aux !== undefined) retorno.push(aux)
        }
    }
    
    return retorno
}