import { Localidad } from "../../../interface"

export const nombreLocalidadId = (id:number , localidad:Localidad[]):string => {    
    if(localidad.length === 0 || id === -1) return ""
    let aux:string = localidad.filter(n => n.id === id)[0].nombre

    return aux
}