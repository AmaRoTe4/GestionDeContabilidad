import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { Cliente, Localidad } from "../../../interface"
import { useNavigate } from "react-router-dom";
import { getAllClientes } from "../../api/clientes"
import { filtroNombre } from "../../functions/clientes/obtenerClientes";
import { nombreLocalidadId } from "../../functions/localidad/obtenerLocalidad";
import { useSelector } from "react-redux";

interface Props{
    data:string;
    localidad:number;
}

export const Tabla = ({data , localidad}:Props) => {
    const navigate = useNavigate();
    //@ts-ignore
    const localidades:Localidad[] = useSelector((state) => state.localidades)
    //@ts-ignore
    const clientes:Cliente[] = useSelector((state) => state.clientes)
    const [clientesVer, setClientesVer] = useState<Cliente[]>([])
    
    useEffect(() => {
        setClientesVer(filtroNombre(data , localidad , clientes))
    }, [data , localidad , clientes])

    return (
        <div style={{width: '100vw'}}>
            <Table striped bordered hover>
                <thead>
                    <tr className='table-dark'>
                        <th>N°</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th className="text-end">Localidad</th>
                        <th className="text-end">Debe</th>
                    </tr>
                </thead>
                <tbody> 
                    {clientesVer.map((n ,i) => 
                        <tr key={i} onClick={(e) => {e.preventDefault(); navigate(`/Clientes/cliente/${n.id}`)}}>
                            <td>{i+1}</td>
                            <td>{n.nombre}</td>
                            <td>{n.apellido}</td>
                            <td className='text-end'>{nombreLocalidadId(n.localidad , localidades)}</td>
                            <td className='text-end'>${n.debe}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}