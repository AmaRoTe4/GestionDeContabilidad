import { Venta } from "../../../interface"
import { createCliente, updateCliente } from "../../api/clientes"
import { comprobandoConexion } from "../../api/comprobador"
import { updateVenta } from "../../api/ventas"
import { cartelError } from "../carteles/cartelError"

//@ts-ignore
export const CargarPagoGeneal = async (ventas:Venta[] , cliente:Cliente):boolean => {
    if(!(await comprobandoConexion())) {
        cartelError("Error De Conexion")
        return false
    }

    let resultadoVenta = true

    for(let i = 0; i < ventas.length; i++) {
        if(resultadoVenta){
            //@ts-ignore
            if(ventas[i].id !== undefined) resultadoVenta = await updateVenta(ventas[i].id , ventas[i])
        }
    }
    
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