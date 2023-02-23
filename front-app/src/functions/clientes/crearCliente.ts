import { Cliente } from "../../../interface"
import { createCliente } from "../../api/clientes"
import { comprobandoConexion } from "../../api/comprobador"
import { cartelError } from "../carteles/cartelError"

//@ts-ignore
export const CrearCliente = async (cliente:Cliente):boolean => {
    if(!(await comprobandoConexion())) {
        cartelError("Error De Conexion")
        return false
    }

    const resultado = await createCliente(cliente)

    if(!(resultado)) {
        cartelError("Error a la Hora De Crear")
        return false
    }
    
    return true
}