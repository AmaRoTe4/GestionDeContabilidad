import { Table } from "react-bootstrap";
import { Venta } from "../../../../interface";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CargarPago(){
    const id:string = useLocation().pathname.split('/')[3]
    const [ventas , setVentas] = useState<Venta[]>([])
    const [valorVentasTotal , setValorVentasTotal] = useState<number>(0);
    const [pago , setPago] = useState<number>(0);

    useEffect(() =>{
        
    },[])

    return (
        <div style={{width: '100vw'}}>
            <div className="centrado" style={{height: '20vh'}}>
                <Link to={`/Clientes/cliente/${id}`} className='btn btn-danger'>
                    Volver
                </Link>
            </div>
        </div>
    )
}

//if(!(await comprobandoConexion())) {
//    cartelError("Error De Conexion")
//    return
//}

//if(!(respuesta)) {
//    cartelError("Error a la Hora De Editar")
//    return
//}