import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { Cliente } from "../../../interface"
import { useNavigate } from "react-router-dom";
import { getAllClientes } from "../../api/clientes"
import { filtroNombre } from "../../functions/clientes/obtenerClientes";

interface Props{
    data:string;
    localidad:number;
}

export const Tabla = ({data , localidad}:Props) => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [clientesVer, setClientesVer] = useState<Cliente[]>([])
    
    useEffect(() => {
        if(clientes.length === 0) cargaDeClietes()
        setClientesVer(filtroNombre(data , localidad , clientes))
    }, [data , localidad , clientes])

    const cargaDeClietes = async () => {
        //@ts-ignore
        const data:Clientes[] | undefined = await getAllClientes()
        if(data !== undefined) setClientes(data)
    }

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
                            <td className='text-end'>{n.localidad}</td>
                            <td className='text-end'>{n.debe}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}