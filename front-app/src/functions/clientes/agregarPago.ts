import { Venta } from "../../../interface"
import { createCliente, updateCliente } from "../../api/clientes"
import { comprobandoConexion } from "../../api/comprobador"
import { updateVenta } from "../../api/ventas"
import { cartelError } from "../carteles/cartelError"

//@ts-ignore
export const AgregarPago = async (venta:Venta , id_venta:number , cliente:Cliente):boolean => {
    if(!(await comprobandoConexion())) {
        cartelError("Error De Conexion")
        return false
    }

    const resultadoVenta = await updateVenta(id_venta , venta)
    
    if(!(resultadoVenta)) {
        cartelError("Error a la Hora De Cargar el Pago")
        return false
    }
    
    const resultadoCliente = await updateCliente(cliente.id , cliente)

    if(!(resultadoCliente)) {
        cartelError("Error a la Hora De Cargar el Pago")
        return false
    }

    return true
}