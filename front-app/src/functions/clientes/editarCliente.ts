import { Cliente } from "../../../interface"
import { createCliente, updateCliente } from "../../api/clientes"
import { comprobandoConexion } from "../../api/comprobador"
import { cartelError } from "../carteles/cartelError"

//@ts-ignore
export const EditarCliente = async (cliente:Cliente , id:number):boolean => {
    if(!(await comprobandoConexion())) {
        cartelError("Error De Conexion")
        return false
    }

    const resultado = await updateCliente(id , cliente)

    if(!(resultado)) {
        cartelError("Error a la Hora De Editar")
        return false
    }

    return true
}