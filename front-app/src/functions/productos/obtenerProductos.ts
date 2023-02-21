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

    if(!isNaN(Number(data))) return filtroDeStock(filtroNumeros(Number(data) , aux))
    if(data === "") return filtroDeStock(aux)
    return filtroDeStock(filtroLetras(data, aux))
}

const filtroNumeros = (data:number, producto:Producto[]):Producto[] => {
    let retorno:Producto[] = []
    let auxData = data;
    
    const dataFinal = (data:number):number[] => {
        let aux:number[] = []

        while(data >= 1){
            data /= 10;
            let resto:number = Math.trunc((data - Math.trunc(data)) * 10);
            aux.unshift(resto);
        }

        return aux
    }
    
    let numeros:number[] = dataFinal(auxData);

    for(let i = 0 ; i < producto.length ; i++){
        let estado:boolean = true
        let aux:number[] = dataFinal(producto[i].codigo)

        if(aux.length < numeros.length) estado = false

        for(let j = 0 ; j < aux.length && numeros.length > j ; j++){
            if(!(aux[j] === numeros[j]) && estado){
                estado = false;
                break;
            }
        }

        if(estado) retorno.push(producto[i]);
    }

    return retorno;
}

const filtroLetras = (data:string, producto:Producto[]):Producto[] => {
    const comprobacion = (letra:string , pos:number , cliente:string):boolean => {
        return cliente[pos].normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase()
        === letra.normalize('NFD').replace(/[\u0300-\u036f]/g,"").toLowerCase() 
    }

    let retorno:Producto[] = []

    for(let i = 0 ; i < producto.length ; i++){
        let estadoNombre:boolean = true

        for(let j = 0 ; j < data.length ; j++){
            let nombre:boolean = false 
            if(estadoNombre) nombre = comprobacion(data[j] , j , producto[i].nombre)
        
            if(!nombre) estadoNombre = nombre
        
            if(!(estadoNombre)) break;
        }

        if(estadoNombre) retorno.push(producto[i]);
    }

    return retorno;
}

const filtroDeStock = (producto:Producto[]):Producto[] => {
    const productosSinStock:Producto[] = producto.filter(n => n.cantidad === 0)
    const productosConStock:Producto[] = producto.filter(n => n.cantidad !== 0)

    productosSinStock.map(n => productosConStock.push(n))

    return productosConStock
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