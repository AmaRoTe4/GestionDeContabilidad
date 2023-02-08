import { Cliente } from "../../../interface"

//funcion de filtro de buscador
export const filtroNombre = (data:string , localidad:number , clientes:Cliente[]):Cliente[] => {    
    if(clientes.length === 0) return []
    
    let aux:Cliente[] = []
    
    if(localidad !== 0){
        clientes.map(n => n.localidad === localidad ? aux.push(n) : "")
    }else{
        clientes.map(n => aux.push(n))
    }
    
    if(data === "") return aux
    
    //filtro por nombre
    return aux
}