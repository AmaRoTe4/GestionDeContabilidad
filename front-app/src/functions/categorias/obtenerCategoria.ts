import { Categoria } from './../../../interface';

export const nombreCategoria = (id:number , categoria:Categoria[]):string => {    
    if(categoria.length === 0 || id === -1) return ""
    let aux:string = categoria.filter(n => n.id === id)[0].nombre

    return aux
}