import { Cliente } from "../../../interface"

//funcion de filtro de buscador
export const filtroNombre = (data:string , localidad:number , clientes:Cliente[]):Cliente[] => {    
    if(clientes.length === 0) return []
    
    let aux:Cliente[] = []
    
    if(localidad !== 0 && localidad !== 5){
        clientes.map(n => n.localidad === localidad ? aux.push(n) : "")
    }else{
        clientes.map(n => aux.push(n))
    }
    
    if(data === "") return aux
    
    const comprobacion = (letra:string , pos:number , cliente:string):boolean => {
        return cliente[pos].normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        === letra.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase() 
    }

    let retorno:Cliente[] = []

    for(let i = 0 ; i < aux.length ; i++){
        let estadoNombre:boolean = true
        let estadoApellido:boolean = true

        for(let j = 0 ; j < data.length ; j++){
            let nombre:boolean = false 
            let apellido:boolean = false 
            if(estadoNombre) nombre = comprobacion(data[j] , j , aux[i].nombre)
            if(estadoApellido) apellido = comprobacion(data[j] , j , aux[i].apellido)
        
            if(!nombre) estadoNombre = nombre
            if(!apellido) estadoApellido = apellido
        
            if(!(estadoNombre || estadoApellido)) break;
        }

        if(estadoNombre || estadoApellido) retorno.push(aux[i]);
    }

    return retorno
}