import { Producto } from "../../../interface"

//funcion de filtro de buscador
export const filtroNombre = (data:string , categoria:number , producto:Producto[]):Producto[] => {    
    if(producto.length === 0) return []

    let aux:Producto[] = []
    
    if(categoria !== 0){
        producto.map(n => n.categoria === categoria ? aux.push(n) : "")
    }else{
        producto.map(n => aux.push(n))
    }
    
    if(data === "") return aux
    
    //filtro por nombre
    return aux
}

export const nombreProductoId = (id:number , producto:Producto[]):string => {    
    if(producto.length === 0) return ""
    const aux:Producto = producto.filter(n => n.id === id)[0]
    if(aux === undefined) return ""
    return aux.nombre
}

export const nombreProductoNombre = (nombre:string , producto:Producto[]):number => {    
    if(producto.length === 0) return 0
    const aux:Producto = producto.filter(n => n.nombre === nombre)[0]
    if(aux === undefined || aux.id === undefined) return 0
    return aux.id
}