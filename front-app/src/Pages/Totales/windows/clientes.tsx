import { useSelector } from "react-redux"
import "../styles.css"
import { Table } from "react-bootstrap";
import { nombreLocalidadId } from "../../../functions/localidad/obtenerLocalidad";
import { useNavigate } from "react-router-dom";
import { Cliente, Localidad } from "../../../../interface";
import { useEffect, useState } from "react";
import { ordenarPorDeuda } from "../../../functions/clientes/ordenarPorDeuda";

export default function index(){
    const [vistas , setVistas] = useState<Cliente[]>([])
    const navigate = useNavigate()
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    //@ts-ignore
    const localidades:Localidad[] = useSelector((state) => state.localidades)

    useEffect(() => {
        if(clientes === undefined) return 
        setVistas(ordenarPorDeuda(clientes))
    },[])

    return (
        <div>
            <div className="d-flex align-items-center flex-column" style={{width:"100vw" , height:"20vh"}}>

                <h1>Clientes</h1>

            </div>
            <div style={{width:"100vw" , maxHeight: "70vh" , overflowX:"hidden" , overflowY:"auto"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr className='table-dark'>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Localidad</th>
                            <th className="text-end">Debe</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {vistas.map((n ,i) => 
                            <tr
                                className={`${n.debe !== 0 ? "ColorRed" : ""}`}
                                key={i} 
                                onClick={(e) => {e.preventDefault(); navigate(`/Clientes/cliente/${n.id}`)}}
                            >
                                <td>{n.nombre}</td>
                                <td>{n.apellido}</td>
                                <td>{nombreLocalidadId(n.localidad , localidades)}</td>
                                <td className='text-end'>${n.debe}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}