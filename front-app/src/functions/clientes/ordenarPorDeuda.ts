import { Cliente } from "../../../interface";


export const ordenarPorDeuda = (clientes:Cliente[]):Cliente[] => {
    let retorno:Cliente[] = [];

    let clientesDeudores:Cliente[] = clientes.filter(n => n.debe !== 0);
    let clientesNoDuedores:Cliente[] = clientes.filter(n => n.debe === 0);

    while(clientesDeudores.length > 0 || clientesNoDuedores.length > 0){
        if(clientesDeudores.length > 0) {
            let aux = clientesDeudores.shift()
            if(aux !== undefined) retorno.push(aux)
        }else{
            let aux = clientesNoDuedores.shift()
            if(aux !== undefined) retorno.push(aux)
        }
    }
    
    return retorno
}