import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { Producto } from "../../../interface"
import { useNavigate } from "react-router-dom";
import { filtroNombre } from "../../functions/productos/obtenerProductos";
import { getAllProductos } from "../../api/productos";

interface Props{
    categoria:number;
    data:string;
}

export const Tabla = ({data , categoria}:Props) => {
    const navigate = useNavigate();
    const [productos , setProductos] = useState<Producto[]>([])
    const [productosVer, setProductosVer] = useState<Producto[]>([])
    
    useEffect(() => {
        if(productos.length === 0) cargaDeProductos()
        setProductosVer(filtroNombre(data , categoria , productos))
    }, [data , categoria , productos])

    const cargaDeProductos = async () => {
        //@ts-ignore
        const data:Productos[] | undefined = await getAllProductos()
        if(data !== undefined) setProductos(data)
    }
    
    return (
        <div style={{width: '100vw'}}>
            <Table striped bordered hover>
                <thead>
                    <tr className='table-dark'>
                        <th>N°</th>
                        <th>Producto</th>
                        <th className="text-end">Cantidad</th>
                        <th className="text-end">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {productosVer.map((n ,i ) => 
                        <tr key={i} onClick={(e) => {e.preventDefault(); navigate(`/Productos/producto/${n.id}`)}}>
                            <td>{i+1}</td>
                            <td>{n.nombre}</td>
                            <td className='text-end'>{n.cantidad}</td>
                            <td className='text-end'>${n.precio}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}