import { Categoria, Producto } from "../../../interface"
import { comprobandoConexion } from "../../api/comprobador"
import { createProducto } from "../../api/productos"
import { cartelError } from "../carteles/cartelError"

export const CrearProducto = async (
    productos:Producto[] , 
    producto:Producto ,
    //@ts-ignore
):boolean => {
    const nombreRep:Producto[] = productos.filter(n => n.nombre.toLowerCase() === producto.nombre.toLowerCase())
    const codigoRep:Producto[] = productos.filter(n => n.codigo === producto.codigo)

    if(nombreRep.length > 0){
        cartelError("Error Nombre Repetido")
        return false
    }

    if(codigoRep.length > 0){
        cartelError("Error Codigo Repetido")
        return false
    }

    if(!(await comprobandoConexion())) {
        cartelError("Error De Conexion")
        return false
    }

    const respuesta:boolean = await createProducto(producto)
    
    if(!(respuesta)) {
        cartelError("Error a la Hora De Crear")
        return false
    } 

    return true
}