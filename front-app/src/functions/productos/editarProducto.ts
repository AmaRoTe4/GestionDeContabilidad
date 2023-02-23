import { Producto } from "../../../interface"
import { comprobandoConexion } from "../../api/comprobador"
import { updateProducto } from "../../api/productos"
import { cartelError } from "../carteles/cartelError"

export const EditarProducto = async (
    productos:Producto[] , 
    producto:Producto , 
    id:number
    //@ts-ignore
):boolean => {
    const nombreOriginal:string = productos.filter(n => n.id === id)[0].nombre
    const nombreRep:Producto[] = productos.filter(n => n.nombre.toLowerCase() === producto.nombre.toLowerCase() && nombreOriginal.toLowerCase() !== n.nombre.toLowerCase())

    if(nombreRep.length > 0){
        cartelError("Error Nombre Repetido")
        return false
    }

    if(!(await comprobandoConexion())) {
        cartelError("Error De Conexion")
        return false
    }

    const respuesta:boolean = await updateProducto(id ,producto)

    if(!(respuesta)) {
        cartelError("Error a la Hora De Editar")
        return false
    }
    
    return true
}