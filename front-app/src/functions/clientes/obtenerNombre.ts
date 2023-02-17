import { Cliente } from "../../../interface"

export const nombreClienteId = (id:number , clientes:Cliente[]):string => {    
    if(clientes.length === 0 || id === -1) return ""
    let aux:string = clientes.filter(n => n.id === id)[0].nombre

    return aux.length < 10 ? aux : aux.slice(0 , 9) 
}