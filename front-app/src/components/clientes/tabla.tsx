import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { Producto } from "../../../interface"
import { useNavigate } from "react-router-dom";

interface Props{
    categoria:string;
    data:string;
}

export const Tabla = ({data , categoria}:Props) => {
    const navigate = useNavigate();
    const [clientes] = useState<Producto[]>([
        {
            id:3,
            nombre: "persona",
            categoria: "animales",
            descripcion: "es un persona para animales en general",
            cantidad: 1000,
            precio: 100,
            codigo: 1
        },
        {
            id:1,
            nombre: "persona",
            categoria: "animales",
            descripcion: "es un persona para animales en general",
            cantidad: 1000,
            precio: 100,
            codigo: 1
        },
        {
            id:2,
            nombre: "persona",
            categoria: "animales",
            descripcion: "es un persona para animales en general",
            cantidad: 1000,
            precio: 100,
            codigo: 1
        }
    ])
    
    useEffect(() => {
        console.log(data)
        console.log(categoria)
    }, [])
    
    return (
        <div style={{width: '100vw'}}>
            <Table striped bordered hover>
                <thead>
                    <tr className='table-dark'>
                        <th>N°</th>
                        <th>Nombre</th>
                        <th className="text-end">Localidad</th>
                        <th className="text-end">Venta Realizadas</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((n ,i ) => 
                        <tr key={i} onClick={(e) => {e.preventDefault(); navigate(`/Clientes/cliente/${n.id}`)}}>
                            <td>{i+1}</td>
                            <td>{n.nombre}</td>
                            <td className='text-end'>{n.categoria}</td>
                            <td className='text-end'>${n.precio}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}