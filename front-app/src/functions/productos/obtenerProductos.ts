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